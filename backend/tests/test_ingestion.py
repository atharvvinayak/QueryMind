from app.ingestion import (
    create_table_from_csv,
    load_csv_into_exasol,
)
from app.database import get_connection


csv_file = "data/raw/test_sales.csv"


print()
print("=" * 60)
print("QUERYMIND EXASOL INGESTION TEST")
print("=" * 60)


# --------------------------------------------------
# 1. Create table
# --------------------------------------------------

print()
print("1. CREATING TABLE...")

result = create_table_from_csv(csv_file)

table_name = result["table_name"]

print("TABLE:", table_name)
print("ROWS IN CSV:", result["rows"])


# --------------------------------------------------
# 2. Load CSV
# --------------------------------------------------

print()
print("2. LOADING CSV INTO EXASOL...")

loaded_rows = load_csv_into_exasol(
    csv_file,
    table_name,
)

print("ROWS LOADED:", loaded_rows)


# --------------------------------------------------
# 3. Verify
# --------------------------------------------------

print()
print("3. VERIFYING DATA...")

connection = get_connection()

try:

    result = connection.execute(
        f'''
        SELECT *
        FROM QUERYMIND."{table_name}"
        ORDER BY 1
        '''
    )

    rows = result.fetchall()

finally:
    connection.close()


print()
print("DATA INSIDE EXASOL:")
print("-" * 60)

for row in rows:
    print(row)


print()
print("=" * 60)
print("🎉 CSV → EXASOL SUCCESSFUL")
print("=" * 60)