from time import perf_counter

from app.dataset import inspect_csv, build_llm_schema
from app.ingestion import create_table_from_csv, load_csv_into_exasol
from app.llm import ask_llm
from app.sql_validator import validate_sql
from app.database import get_connection


CSV_FILE = "data/raw/test_sales.csv"


print()
print("=" * 70)
print("QUERYMIND GENERIC DATASET PIPELINE")
print("=" * 70)


# --------------------------------------------------
# 1. Inspect dataset
# --------------------------------------------------

print()
print("1. INSPECTING DATASET...")

info = inspect_csv(CSV_FILE)

print(f"ROWS: {info['rows']}")
print(f"COLUMNS: {info['column_count']}")


# --------------------------------------------------
# 2. Create Exasol table
# --------------------------------------------------

print()
print("2. CREATING EXASOL TABLE...")

table_info = create_table_from_csv(CSV_FILE)

table_name = table_info["table_name"]

print(f"TABLE: QUERYMIND.{table_name}")


# --------------------------------------------------
# 3. Load dataset
# --------------------------------------------------

print()
print("3. LOADING DATA INTO EXASOL...")

loaded_rows = load_csv_into_exasol(
    CSV_FILE,
    table_name
)

print(f"ROWS LOADED: {loaded_rows}")


# --------------------------------------------------
# 4. Build dynamic schema
# --------------------------------------------------

print()
print("4. BUILDING DYNAMIC SCHEMA...")

schema = build_llm_schema(
    table_name,
    info["columns"]
)

print(schema)


# --------------------------------------------------
# 5. Ask Groq
# --------------------------------------------------

question = "Which region generated the most revenue?"

print()
print("5. ASKING GROQ...")
print(f"QUESTION: {question}")

generated_sql = ask_llm(
    question,
    schema
)

print()
print("GENERATED SQL:")
print("-" * 70)
print(generated_sql)


# --------------------------------------------------
# 6. Validate SQL
# --------------------------------------------------

print()
print("6. VALIDATING SQL...")

valid, validated_sql = validate_sql(generated_sql)

if not valid:
    print("❌ SQL REJECTED")
    print("REASON:", validated_sql)
    raise SystemExit(1)

print("✅ SQL PASSED VALIDATION")


# --------------------------------------------------
# 7. Execute SQL on Exasol
# --------------------------------------------------

print()
print("7. EXECUTING ON EXASOL...")

connection = get_connection()

try:

    start = perf_counter()

    result = connection.execute(validated_sql)

    execution_time = perf_counter() - start

    rows = result.fetchall()

finally:
    connection.close()


# --------------------------------------------------
# 8. Display results
# --------------------------------------------------

print()
print("8. RESULTS")
print("-" * 70)

for row in rows:
    print(row)

print("-" * 70)

print(f"EXASOL EXECUTION TIME: {execution_time:.4f} seconds")


print()
print("=" * 70)
print("🎉 GENERIC QUERYMIND PIPELINE SUCCESSFUL!")
print("=" * 70)