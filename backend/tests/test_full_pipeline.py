from time import perf_counter

from app.llm import ask_llm
from app.sql_validator import validate_sql
from app.database import get_connection


question = "What are the top 10 most purchased products?"

print()
print("=" * 70)
print("QUERYMIND FULL PIPELINE")
print("=" * 70)

# --------------------------------------------------
# 1. Ask the LLM to generate SQL
# --------------------------------------------------

print()
print("1. USER QUESTION")
print(question)

print()
print("2. GENERATING SQL WITH GROQ...")

generated_sql = ask_llm(question)

print()
print("GENERATED SQL:")
print("-" * 70)
print(generated_sql)

# --------------------------------------------------
# 2. Validate SQL
# --------------------------------------------------

print()
print("3. VALIDATING SQL...")

valid, validated_sql = validate_sql(generated_sql)

if not valid:
    print("❌ SQL REJECTED")
    print("Reason:", validated_sql)
    raise SystemExit(1)

print("✅ SQL PASSED VALIDATION")

# --------------------------------------------------
# 3. Execute on Exasol
# --------------------------------------------------

print()
print("4. EXECUTING ON EXASOL...")

connection = get_connection()

try:
    start = perf_counter()

    result = connection.execute(validated_sql)

    execution_time = perf_counter() - start

    rows = result.fetchall()

finally:
    connection.close()

# --------------------------------------------------
# 4. Display results
# --------------------------------------------------

print()
print("5. RESULTS")
print("-" * 70)

for row in rows:
    print(row)

print("-" * 70)

print()
print(f"⚡ EXASOL EXECUTION TIME: {execution_time:.4f} seconds")

print()
print("=" * 70)
print("🎉 FULL PIPELINE SUCCESSFUL!")
print("=" * 70)