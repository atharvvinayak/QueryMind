import re


FORBIDDEN_KEYWORDS = [
    "INSERT",
    "UPDATE",
    "DELETE",
    "DROP",
    "ALTER",
    "CREATE",
    "TRUNCATE",
    "MERGE",
    "GRANT",
    "REVOKE",
]


def validate_sql(sql: str) -> tuple[bool, str]:

    cleaned = sql.strip()

    # Remove markdown code fences if the LLM adds them
    cleaned = re.sub(r"```sql", "", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"```", "", cleaned)
    cleaned = cleaned.strip()

    if not cleaned:
        return False, "AI returned empty SQL."

    # Only allow SELECT
    if not re.match(r"^SELECT\b", cleaned, re.IGNORECASE):
        return False, "Only SELECT queries are allowed."

    # Reject dangerous operations
    upper_sql = cleaned.upper()

    for keyword in FORBIDDEN_KEYWORDS:
        if re.search(rf"\b{keyword}\b", upper_sql):
            return False, f"Forbidden SQL keyword detected: {keyword}"

    # Only allow our database schema
    if "QUERYMIND." not in upper_sql:
        return False, "Query must use the QUERYMIND schema."

    return True, cleaned