from app.registry import register_dataset, get_dataset


dataset_id = register_dataset(
    filename="test_sales.csv",
    table_name="TEST_SALES",
    schema="""
TABLE: QUERYMIND.TEST_SALES

COLUMNS:
- date (VARCHAR(500))
- product (VARCHAR(500))
- region (VARCHAR(500))
- revenue (DOUBLE)
- quantity (INTEGER)
""",
)


print()
print("=" * 60)
print("QUERYMIND DATASET REGISTRY TEST")
print("=" * 60)

print()
print("DATASET ID:")
print(dataset_id)

print()
print("REGISTERED DATASET:")
print(get_dataset(dataset_id))

print()
print("=" * 60)