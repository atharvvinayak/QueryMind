import pandas as pd


def detect_column_type(series):
    """
    Detect a simple Exasol-compatible data type.
    """

    if pd.api.types.is_integer_dtype(series):
        return "INTEGER"

    if pd.api.types.is_float_dtype(series):
        return "DOUBLE"

    if pd.api.types.is_bool_dtype(series):
        return "BOOLEAN"

    if pd.api.types.is_datetime64_any_dtype(series):
        return "TIMESTAMP"

    return "VARCHAR(500)"


def inspect_csv(file_path: str) -> dict:
    """
    Inspect a CSV file and return dataset metadata.
    """

    # Read the CSV
    df = pd.read_csv(file_path)

    columns = []

    for column in df.columns:

        series = df[column]

        # Try to detect dates
        if series.dtype == "object":
            converted_dates = pd.to_datetime(
                series,
                errors="coerce"
            )

            if len(series) > 0:
                success_rate = converted_dates.notna().mean()

                if success_rate > 0.9:
                    data_type = "TIMESTAMP"
                else:
                    data_type = detect_column_type(series)
            else:
                data_type = "VARCHAR(500)"
        else:
            data_type = detect_column_type(series)

        columns.append(
            {
                "name": str(column),
                "type": data_type,
                "missing": int(series.isna().sum()),
                "unique": int(series.nunique()),
            }
        )

    return {
        "rows": len(df),
        "column_count": len(df.columns),
        "columns": columns,
    }
def build_llm_schema(table_name: str, columns: list) -> str:
    """
    Build a schema description for the LLM.
    """

    lines = [
        f"TABLE: QUERYMIND.{table_name}",
        "",
        "COLUMNS:"
    ]

    for column in columns:
        lines.append(
            f"- {column['name']} ({column['type']})"
        )

    return "\n".join(lines)