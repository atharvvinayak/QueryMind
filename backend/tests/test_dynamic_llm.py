from app.dataset import inspect_csv, build_llm_schema
from app.llm import ask_llm


csv_file = "data/raw/test_sales.csv"

# Inspect dataset
info = inspect_csv(csv_file)

# Build dynamic schema
schema = build_llm_schema(
    "TEST_SALES",
    info["columns"]
)

question = "Which region generated the most revenue?"

print()
print("=" * 60)
print("QUERYMIND DATASET-INDEPENDENT LLM TEST")
print("=" * 60)

print()
print("QUESTION:")
print(question)

print()
print("SCHEMA SENT TO LLM:")
print("-" * 60)
print(schema)

print()
print("GENERATING SQL...")
print("-" * 60)

sql = ask_llm(
    question,
    schema
)

print(sql)

print()
print("=" * 60)