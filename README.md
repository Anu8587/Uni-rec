#  UniRec AI

**A Universal, Context-Aware, Cross-Industry Recommendation Engine API**

---

## Overview

**UniRec AI** is a universal recommendation engine designed to work across **multiple industries** (E-commerce, Movies/OTT, Blogs/News) using a single, efficient, **embedding-based engine**.

By leveraging a shared semantic vector space, it enables:
* **Universal Embedding Space:** One model for all domains.
* **Real-Time Personalization:** Dynamic updates after each user interaction.
* **Context-Aware Ranking:** Recommendations reweighted by device, time, and location.
* **Explainability:** Full transparency via an embedding map visualization.
* **Privacy-by-Design:** No PII stored, only anonymized vectors.

---

## Key Features

| Feature | Description |
| :--- | :--- |
| ** Universal Embedding** | Products, movies, and articles encoded using the same language model (`MiniLM-L6-v2`). |
| ** Real-Time Updates** | User embedding updates instantly on interaction. |
| **Context-Awareness** | Reweights recommendations based on **Device, Location type, and Time of day**. |
| **Explainability** | **2D Embedding Map** visualization showing domain clusters, user vector, and nearest neighbors. |
| **Privacy-by-Design** | Only anonymized vectors and metadata stored (GDPR-friendly). |
| **Plug-and-Play API** | Simple REST endpoints (FastAPI) for quick integration. |

---

##  Architecture

UniRec AI uses a modern, decoupled architecture:

`Frontend (Next.js) -> API Layer (FastAPI) -> ML Engine (SentenceTransformer + NumPy) -> Vector Storage (SQLite)`

**Core Components:**
* **Next.js Dashboard:** Provides multi-domain demos and the **embedding visualizer**.
* **FastAPI Backend:** Handles all API requests (`/items`, `/events`, `/recommend`).
* **ML Engine:** Manages embedding generation, user vector construction, and context weighting.
* **SQLite Storage:** Stores items, user events, and vectors.

---

## 🧪 Tech Stack

| Component | Technology | Key Libraries/Tools |
| :--- | :--- | :--- |
| **Frontend** | Next.js (React) | TypeScript, Tailwind CSS, Recharts |
| **Backend** | Python API | **FastAPI**, Uvicorn |
| **ML Core** | Python | **SentenceTransformers** (`MiniLM-L6-v2`), **NumPy**, scikit-learn |
| **Storage** | Database | SQLite |

> **Scaling Upgrades:** For production scale, consider **FAISS/Pinecone/Milvus** for vector search and **Docker + Kubernetes** deployment.

---

## 🔌 API Documentation & Endpoints

The FastAPI backend automatically generates interactive API documentation:
* **Swagger UI** → `http://localhost:8000/docs`
* **ReDoc** → `http://localhost:8000/redoc`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/items` | Upload new items (products, movies, blogs) to the engine. |
| `POST` | `/events` | Log user interactions (clicks, likes) with contextual data. |
| `POST` | `/recommend` | Get personalized top-K recommendations for a user. |
| `GET` | `/visualize_embeddings/{user_id}` | Fetch 2D embedding data for UI visualization. |
| `POST` | `/reset` | Clear all data for a fresh demo/testing start. |

---

##  Running the Project

### 1️ Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend runs at: http://127.0.0.1:8000

**Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```
The frontend runs at: http://localhost:3000
