import os

from dotenv import load_dotenv
from groq import Groq


load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise RuntimeError(
        "GROQ_API_KEY is not set. "
        "Create a .env file in the QueryMind project root."
    )


client = Groq(api_key=api_key)

MODEL = "openai/gpt-oss-20b"


def ask_llm(question: str, database_schema: str) -> str:

    prompt = f"""
You are QueryMind, an expert SQL generator for Exasol.

Convert the user's natural-language question into ONE
safe SQL SELECT query.

DATABASE SCHEMA
---------------
{database_schema}

RULES
-----
1. Return ONLY SQL.
2. Only generate SELECT queries.
3. Never use INSERT, UPDATE, DELETE, DROP, ALTER,
   CREATE, TRUNCATE, MERGE, GRANT or REVOKE.
4. Always use the QUERYMIND schema.
5. Only use tables and columns listed in the schema.
6. Never invent columns.
7. Use JOINs when information is stored in different tables.
8. Limit results to 10 rows unless the user asks for another number.
9. Prefer clear and efficient SQL.
10. If the question cannot be answered using the provided
    schema, return a safe SELECT query that clearly indicates
    the requested information is unavailable.

USER QUESTION
-------------
{question}

SQL:
"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": "You generate safe Exasol SQL.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0,
        max_tokens=1000,
    )

    return response.choices[0].message.content.strip()