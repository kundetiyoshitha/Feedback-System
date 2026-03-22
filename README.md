# 💬 FeedbackIQ — AI-Powered Feedback Platform

A full-stack web application that collects customer feedback and automatically analyzes sentiment using AI. Built with React, Node.js, Express, and MySQL.

---

## ✨ What It Does

FeedbackIQ lets users submit feedback and instantly see whether it's **Positive**, **Negative**, or **Neutral** — powered by real-time sentiment analysis. All feedback is stored in a database and displayed on a clean dashboard where it can be viewed, edited, or deleted.

---

## 🚀 Features

- 📝 **Submit Feedback** — Name, category, star rating, and message
- 🤖 **AI Sentiment Analysis** — Automatically detects Positive / Negative / Neutral tone
- 📊 **Dashboard** — View all feedback in a clean table with filters
- ✏️ **Edit Feedback** — Update your own feedback (verified by email)
- 🗑️ **Delete Feedback** — Remove your own feedback (verified by email)
- 🔒 **Privacy** — Email addresses are never shown publicly
- 📅 **Date Tracking** — See exactly when each feedback was submitted
- ⭐ **Star Ratings** — Visual rating display for each entry
- 🎯 **Sentiment Score** — Compound score shown for each feedback

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MySQL |
| Sentiment Analysis | VADER (rule-based NLP) |
| Styling | CSS with inline React styles |

---

## 📁 Project Structure

```
feedback-system/
├── backend/
│   ├── config/         → Database connection
│   ├── controllers/    → Business logic
│   ├── middleware/     → Error handling
│   ├── models/         → Database queries
│   ├── routes/         → API endpoints
│   ├── utils/          → Sentiment analyzer
│   ├── .env            → Environment variables
│   └── server.js       → Entry point
│
├── frontend/
│   └── src/
│       ├── components/ → FeedbackForm, FeedbackList, Dashboard
│       ├── pages/      → Home
│       ├── services/   → API calls
│       └── App.jsx     → Root component
│
└── database/           → SQL schema files
```

---

## ⚙️ How to Run Locally

### Prerequisites
- Node.js installed
- MySQL running locally

### Step 1 — Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=feedback_db
PORT=5000
```

### Step 2 — Set Up the Database

Run the SQL schema file in your MySQL client to create the required tables.

### Step 3 — Set Up the Frontend

```bash
cd frontend
npm install
```

### Step 4 — Run the App

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Open your browser and go to: **http://localhost:5173**

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/feedback` | Get all feedback |
| POST | `/api/feedback` | Submit new feedback |
| PUT | `/api/feedback/:id` | Update feedback (email verified) |
| DELETE | `/api/feedback/:id` | Delete feedback (email verified) |
| GET | `/api/feedback/analytics` | Get sentiment analytics |
| GET | `/api/health` | Health check |

---

## 🔐 Security Features

- Email ownership verification before editing or deleting
- Input validation on both frontend and backend
- Email addresses hidden from public dashboard view
- SQL injection prevention via parameterized queries

---

## 🧠 How Sentiment Analysis Works

When a user submits feedback, the message is passed through a **VADER (Valence Aware Dictionary and sEntiment Reasoner)** analyzer. It returns:

- A **label** — Positive, Negative, or Neutral
- A **compound score** — ranges from -1 (most negative) to +1 (most positive)
- Individual **positive**, **negative**, and **neutral** percentages

> Note: VADER is a rule-based model and works best with straightforward text. For more advanced analysis, a deep learning model like BERT could be integrated.

---

## 👤 Author

**Yoshitha Kundeti**  
B.Tech Data Science  
Vignan's LARA Institute of Technology & Science

---

## 📄 License

This project is for educational purposes.
