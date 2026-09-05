from app.llm import ask_llm


questions = [
    "What are the top 10 most purchased products?",
    "Which products are reordered the most?",
    "What are the top 10 departments by number of products?",
]


for question in questions:

    print()
    print("=" * 70)
    print("QUESTION:")
    print(question)
    print()
    print("AI GENERATED SQL:")
    print("-" * 70)

    answer = ask_llm(question)

    print(answer)

    print("=" * 70)