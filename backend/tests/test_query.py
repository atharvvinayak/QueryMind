from app.database import get_connection
from app.queries import TOP_PRODUCTS_QUERY


connection = get_connection()

print()
print("Running QueryMind test query...")
print("-" * 60)

result = connection.execute(TOP_PRODUCTS_QUERY)

for row in result.fetchall():
    print(row)

print("-" * 60)
print("Query successful!")

connection.close()