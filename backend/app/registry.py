import uuid

from app.database import get_connection


REGISTRY_TABLE = "QUERYMIND.DATASETS"


def sql_string(value: str) -> str:
    """
    Safely convert a Python string into a SQL string literal.
    """
    return "'" + str(value).replace("'", "''") + "'"


def initialize_registry():
    """
    Create the dataset registry table if it does not already exist.
    """

    connection = get_connection()

    try:
        connection.execute(
            f"""
            CREATE TABLE IF NOT EXISTS {REGISTRY_TABLE} (
                DATASET_ID VARCHAR(36),
                FILENAME VARCHAR(500),
                TABLE_NAME VARCHAR(500),
                SCHEMA_TEXT VARCHAR(200000),
                CREATED_AT TIMESTAMP
            )
            """
        )

    finally:
        connection.close()


def register_dataset(
    filename: str,
    table_name: str,
    schema: str,
) -> str:
    """
    Store dataset metadata permanently in Exasol.
    """

    dataset_id = str(uuid.uuid4())

    connection = get_connection()

    try:
        connection.execute(
            f"""
            INSERT INTO {REGISTRY_TABLE}
            (
                DATASET_ID,
                FILENAME,
                TABLE_NAME,
                SCHEMA_TEXT,
                CREATED_AT
            )
            VALUES (
                {sql_string(dataset_id)},
                {sql_string(filename)},
                {sql_string(table_name)},
                {sql_string(schema)},
                CURRENT_TIMESTAMP
            )
            """
        )

    finally:
        connection.close()

    return dataset_id


def get_dataset(dataset_id: str) -> dict | None:
    """
    Retrieve dataset metadata from Exasol.
    """

    connection = get_connection()

    try:
        result = connection.execute(
            f"""
            SELECT
                FILENAME,
                TABLE_NAME,
                SCHEMA_TEXT
            FROM {REGISTRY_TABLE}
            WHERE DATASET_ID = {sql_string(dataset_id)}
            """
        )

        row = result.fetchone()

        if row is None:
            return None

        return {
            "filename": row[0],
            "table_name": row[1],
            "schema": row[2],
        }

    finally:
        connection.close()