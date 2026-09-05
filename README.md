# 🚀 QueryMind

QueryMind is an AI-powered data analytics platform that enables users to interact with datasets using natural language. Instead of writing complex SQL queries or manually exploring data, users can simply ask questions and receive meaningful insights, generated queries, visualizations, and structured results instantly.

Built with a modern React frontend, FastAPI backend, and AI-driven query generation, QueryMind bridges the gap between raw data and actionable intelligence.

---

## ✨ Features

### 🤖 Natural Language to Insights
Ask questions such as:

- What are the top-selling products?
- Show monthly revenue trends.
- Which department has the highest sales?
- Compare performance across regions.

QueryMind interprets the request and generates analytical results automatically.

### 📊 Interactive Analytics
- Dynamic charts and visualizations
- Tabular result views
- AI-generated summaries
- Structured insights

### 🗄️ Intelligent Query Generation
- Natural language understanding
- Automated SQL generation
- Data exploration workflows
- Analytical reasoning pipelines

### 🌍 Multilingual Support (In Progress)
Designed to support multiple languages, allowing users to interact with data in their preferred language.

Planned support includes:
- English
- Hindi
- Spanish
- French
- German
- Chinese
- Japanese
- Arabic
- Portuguese
- Russian

### 🎨 Modern User Experience
- Responsive interface
- Dark and Light mode
- Glassmorphism-inspired design
- Smooth animations and transitions

---

## 🏗️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide Icons

### Backend
- FastAPI
- Python
- Pandas
- SQLAlchemy

### AI & Analytics
- LLM-powered query interpretation
- SQL generation
- Data analysis pipelines
- Insight generation

---

## 📂 Project Structure

```text
QueryMind
│
├── backend/
│   ├── app/
│   └── tests/
│
├── frontend-temp/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docs/
│
├── .gitignore
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/atharvvinayak/QueryMind.git
cd QueryMind
```

---

### Backend Setup

Create a virtual environment:

```bash
python -m venv .venv
```

Activate the environment:

```bash
# Windows
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the backend server:

```bash
uvicorn backend.app.main:app --reload
```

Backend API:

```text
http://localhost:8000
```

API Documentation:

```text
http://localhost:8000/docs
```

---

### Frontend Setup

Navigate to the frontend:

```bash
cd frontend-temp
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🎯 Vision

The goal of QueryMind is to make data analytics accessible to everyone, regardless of technical background. By combining AI-powered query understanding with modern analytics workflows, QueryMind enables users to derive insights from data through simple conversations.

---

## 🛣️ Roadmap

- [ ] Full multilingual query support
- [ ] CSV, Excel, JSON, and PDF ingestion
- [ ] Automated dashboard generation
- [ ] AI-generated analytical reports
- [ ] User authentication and workspace management
- [ ] Conversation history
- [ ] Export insights and visualizations
- [ ] Advanced chart recommendations

---

## 👨‍💻 Author

**Atharv Vinayak**

GitHub: https://github.com/atharvvinayak

---

## 📄 License

This project is licensed under the MIT License.
