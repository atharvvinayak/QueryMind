import re

import pandas as pd

from app.database import get_connection
from app.dataset import inspect_csv


def clean_table_name(filename: str) -> str:
    """
    Convert a filename into a safe Exasol table name.
    """

    name = filename.rsplit("\\", 1)[-1]
    name = name.rsplit("/", 1)[-1]

    if name.lower().endswith(".csv"):
        name = name[:-4]

    name = name.upper()

    name = re.sub(r"[^A-Z0-9_]", "_", name)

    if name and name[0].isdigit():
        name = "TABLE_" + name

    return name[:120]


def clean_column_name(column_name: str) -> str:
    """
    Convert a CSV column name into a safe SQL identifier.
    """

    name = str(column_name).strip().upper()

    name = re.sub(r"[^A-Z0-9_]", "_", name)

    if not name:
        name = "COLUMN"

    if name[0].isdigit():
        name = "COLUMN_" + name

    return name[:120]


def create_table_from_csv(file_path: str) -> dict:
    """
    Create an Exasol table based on a CSV's detected structure.
    """

    df = pd.read_csv(file_path)

    table_name = clean_table_name(file_path)

    columns = []

    for column in df.columns:

        safe_name = clean_column_name(column)

        # Reuse the same type detection logic
        from app.dataset import detect_column_type

        data_type = detect_column_type(df[column])

        columns.append(
            {
                "original_name": str(column),
                "name": safe_name,
                "type": data_type,
            }
        )

    column_sql = ",\n".join(
        f'"{column["name"]}" {column["type"]}'
        for column in columns
    )

    sql = f"""
    CREATE TABLE IF NOT EXISTS QUERYMIND."{table_name}" (
        {column_sql}
    )
    """

    connection = get_connection()

    try:
        connection.execute(sql)
    finally:
        connection.close()

    return {
        "table_name": table_name,
        "columns": columns,
        "rows": len(df),
    }

def load_csv_into_exasol(file_path: str, table_name: str) -> int:
    """
    Load CSV data into an existing Exasol table using
    pyexasol bulk import.
    """

    df = pd.read_csv(file_path)

    connection = get_connection()

    try:
        rows = df.itertuples(index=False, name=None)

        connection.import_from_iterable(
            rows,
            ("QUERYMIND", table_name),
        )

        return len(df)

    finally:
        connection.close()