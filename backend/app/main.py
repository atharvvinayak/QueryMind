import os
import shutil
from time import perf_counter

from fastapi import FastAPI, File, HTTPException, UploadFile
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from app.database import get_connection
from app.dataset import inspect_csv, build_llm_schema
from app.ingestion import create_table_from_csv, load_csv_into_exasol
from app.llm import ask_llm
from app.registry import (
    initialize_registry,
    register_dataset,
    get_dataset,
)
from app.sql_validator import validate_sql


UPLOAD_DIR = "data/uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


app = FastAPI(
    title="QueryMind API",
    description="AI-powered analytics API for Exasol",
    version="0.2.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
initialize_registry()

class QuestionRequest(BaseModel):
    dataset_id: str
    question: str


@app.get("/")
def root():
    return {
        "app": "QueryMind",
        "status": "running",
        "database": "Exasol",
    }


@app.get("/health")
def health():
    connection = get_connection()

    try:
        connection.execute("SELECT 1")

        return {
            "status": "healthy",
            "database": "Exasol",
        }

    finally:
        connection.close()


@app.post("/upload")
def upload_dataset(file: UploadFile = File(...)):

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="A file is required.",
        )

    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are currently supported.",
        )

    safe_filename = os.path.basename(file.filename)

    file_path = os.path.join(
        UPLOAD_DIR,
        safe_filename,
    )

    try:

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer,
            )

        # ------------------------------------------
        # Inspect dataset
        # ------------------------------------------

        dataset_info = inspect_csv(file_path)

        # ------------------------------------------
        # Create Exasol table
        # ------------------------------------------

        table_info = create_table_from_csv(
            file_path
        )

        table_name = table_info["table_name"]

        # ------------------------------------------
        # Load data
        # ------------------------------------------

        loaded_rows = load_csv_into_exasol(
            file_path,
            table_name,
        )

        # ------------------------------------------
        # Build LLM schema
        # ------------------------------------------

        schema = build_llm_schema(
            table_name,
            dataset_info["columns"],
        )

        # ------------------------------------------
        # Register dataset
        # ------------------------------------------

        dataset_id = register_dataset(
            filename=safe_filename,
            table_name=table_name,
            schema=schema,
        )

        return {
            "message": "Dataset uploaded successfully.",
            "dataset_id": dataset_id,
            "filename": safe_filename,
            "table_name": f"QUERYMIND.{table_name}",
            "rows": dataset_info["rows"],
            "rows_loaded": loaded_rows,
            "columns": dataset_info["columns"],
        }

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )

    finally:

        file.file.close()


@app.post("/ask")
def ask_question(request: QuestionRequest):

    dataset = get_dataset(request.dataset_id)

    if dataset is None:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found.",
        )

    start = perf_counter()

    # ------------------------------------------
    # Generate SQL
    # ------------------------------------------

    generated_sql = ask_llm(
        request.question,
        dataset["schema"],
    )

    # ------------------------------------------
    # Validate SQL
    # ------------------------------------------

    valid, result = validate_sql(
        generated_sql
    )

    if not valid:
        raise HTTPException(
            status_code=400,
            detail=f"Generated SQL rejected: {result}",
        )

    validated_sql = result

    # ------------------------------------------
    # Execute SQL
    # ------------------------------------------

    connection = get_connection()

    try:

        query_result = connection.execute(
            validated_sql
        )

        columns = [
            column
            for column in query_result.columns()
        ]

        rows = query_result.fetchall()

    finally:

        connection.close()

    execution_time = perf_counter() - start

    return {
        "question": request.question,
        "dataset_id": request.dataset_id,
        "sql": validated_sql,
        "execution_time_seconds": round(
            execution_time,
            4,
        ),
        "columns": columns,
        "rows": rows,
    }