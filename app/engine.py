from typing import List, Dict, Optional
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

from app.models import Item, EventRequest, Context
from app.storage import Storage


class RecommenderEngine:
    def __init__(self, storage: Storage):
        self.storage = storage
        self.items: Dict[str, Item] = {}
        self.item_ids: List[str] = []
        self.item_matrix: Optional[np.ndarray] = None
        self.model = SentenceTransformer("all-MiniLM-L6-v2")
        self.mood_labels = ["happy", "sad", "calm", "energetic", "stressed"]
        self.mood_vectors = self.model.encode(self.mood_labels, convert_to_numpy=True, normalize_embeddings=True)
        self._ready = False
        self._load_from_storage()

    def _load_from_storage(self):
        data = self.storage.load_all_items()
        if not data:
            self._ready = False
            return

        self.items = {}
        self.item_ids = []
        embeddings = []

        for row in data:
            item = Item(
                id=row["id"],
                title=row["title"],
                description=row["description"],
                tags=row["tags"],
                metadata=row["metadata"]
            )
            self.items[item.id] = item
            self.item_ids.append(item.id)
            embeddings.append(np.array(row["embedding"], dtype="float32"))

        self.item_matrix = np.vstack(embeddings)
        self._ready = True

    def add_items(self, items: List[Item]):
        corpus = []
        serialised = []

        for it in items:
            text = " ".join([
                it.title or "",
                it.description or "",
                " ".join(it.tags),
                " ".join([f"{k}:{v}" for k, v in it.metadata.items()])
            ]).strip()

            corpus.append(text or it.id)

            serialised.append({
                "id": it.id,
                "title": it.title,
                "description": it.description,
                "tags": it.tags,
                "metadata": it.metadata
            })

        embeddings = self.model.encode(corpus, convert_to_numpy=True, normalize_embeddings=True).tolist()
        self.storage.save_items(serialised, embeddings)
        self._load_from_storage()

    def log_event(self, event: EventRequest):
        self.storage.save_event(event.model_dump())

    def _build_user_vector(self, user_id: str):
        history = self.storage.load_user_history(user_id)
        if not history or not self._ready:
            return None, set()

        seen = set()
        vectors = []

        for ev in history:
            item_id = ev["item_id"]
            if item_id not in self.items:
                continue

            idx = self.item_ids.index(item_id)
            seen.add(item_id)
            vectors.append(self.item_matrix[idx])

        if not vectors:
            return None, seen

        return np.mean(vectors, axis=0), seen

    def _infer_mood(self, user_vec):
        if user_vec is None:
            return None
        sims = cosine_similarity(user_vec.reshape(1, -1), self.mood_vectors)[0]
        return self.mood_labels[int(np.argmax(sims))]

    def recommend(self, user_id: str, context: Optional[Context], top_k=10):
        if not self._ready:
            return {"user_id": user_id, "inferred_mood": None, "recommendations": []}

        user_vec, seen = self._build_user_vector(user_id)
        if user_vec is None:
            user_vec = self.item_matrix.mean(axis=0)

        mood = self._infer_mood(user_vec)
        mood_vec = None
        if mood:
            mood_vec = self.model.encode([mood], convert_to_numpy=True, normalize_embeddings=True)[0]

        context_vec = None
        if context:
            ctx_text = " ".join([
                context.device or "",
                context.location_type or "",
                context.time_of_day or ""
            ])
            if ctx_text.strip():
                context_vec = self.model.encode([ctx_text], convert_to_numpy=True, normalize_embeddings=True)[0]

        base_scores = cosine_similarity(user_vec.reshape(1, -1), self.item_matrix)[0]
        mood_scores = cosine_similarity(mood_vec.reshape(1, -1), self.item_matrix)[0] if mood_vec is not None else np.zeros(len(self.item_ids))
        context_scores = cosine_similarity(context_vec.reshape(1, -1), self.item_matrix)[0] if context_vec is not None else np.zeros(len(self.item_ids))

        final_scores = (
            0.65 * base_scores +
            0.20 * context_scores +
            0.15 * mood_scores
        )

        for idx, item_id in enumerate(self.item_ids):
            if item_id in seen:
                final_scores[idx] -= 0.05

        top = np.argsort(final_scores)[::-1][:top_k]

        return {
            "user_id": user_id,
            "inferred_mood": mood,
            "recommendations": [
                {"item_id": self.item_ids[i], "score": float(final_scores[i])}
                for i in top
            ]
        }
