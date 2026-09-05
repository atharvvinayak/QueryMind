from app.dataset import inspect_csv, build_llm_schema


csv_file = "data/raw/test_sales.csv"

info = inspect_csv(csv_file)

table_name = "TEST_SALES"

schema = build_llm_schema(
    table_name,
    info["columns"]
)

print()
print("=" * 60)
print("QUERYMIND DYNAMIC SCHEMA")
print("=" * 60)

print()
print(schema)

print()
print("=" * 60)