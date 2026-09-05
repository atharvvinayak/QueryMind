from app.sql_validator import validate_sql


tests = [
    "SELECT * FROM QUERYMIND.PRODUCTS LIMIT 10",

    "DROP TABLE QUERYMIND.PRODUCTS",

    "DELETE FROM QUERYMIND.PRODUCTS",

    "SELECT PRODUCT_NAME FROM PRODUCTS LIMIT 10",
]


for sql in tests:

    valid, result = validate_sql(sql)

    print()
    print("SQL:")
    print(sql)

    print("VALID:", valid)
    print("RESULT:", result)