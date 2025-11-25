from typing import List, Dict
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from app.models import Item, EventRequest, Context


class RecommenderEngine:
    def __init__(self):
        # Store items + user history
        self.items: Dict[str, Item] = {}
        self.user_history: Dict[str, List[str]] = {}

        # Embedding structures
        self.item_ids: List[str] = []
        self.item_matrix: np.ndarray | None = None

        # Load MiniLM model
        self.model = SentenceTransformer("all-MiniLM-L6-v2")

        # Pre-defined moods
        self.mood_labels = ["happy", "sad", "calm", "energetic", "stressed"]

        # Create mood embeddings
        self.mood_vectors = self.model.encode(
            self.mood_labels,
            convert_to_numpy=True,
            normalize_embeddings=True
        )

        # holds last inferred mood for context
        self.last_inferred_mood: str | None = None

        self._ready = False

    # ----------------------------------------------------------
    # 1. Add items + build MiniLM embeddings
    # ----------------------------------------------------------
    def add_items(self, items: List[Item]):
        for it in items:
            self.items[it.id] = it

        self.item_ids = list(self.items.keys())

        # Build corpus text for each item
        corpus: List[str] = []
        for iid in self.item_ids:
            it = self.items[iid]
            text_parts = [
                it.title or "",
                it.description or "",
                " ".join(it.tags),
                " ".join([f"{k}:{v}" for k, v in it.metadata.items()])
            ]
            text = " ".join(text_parts).strip()
            corpus.append(text if text else iid)

        # Encode embeddings
        self.item_matrix = self.model.encode(
            corpus,
            convert_to_numpy=True,
            normalize_embeddings=True
        )

        self._ready = True

    # ----------------------------------------------------------
    # 2. Log user interaction
    # ----------------------------------------------------------
    def log_event(self, event: EventRequest):
        history = self.user_history.get(event.user_id, [])
        history.append(event.item_id)
        self.user_history[event.user_id] = history[-50:]

    # ----------------------------------------------------------
    # 3. Build user embedding (average of interacted items)
    # ----------------------------------------------------------
    def _build_user_vector(self, user_id: str):
        if not self._ready:
            return None

        if user_id not in self.user_history:
            return None

        hist = self.user_history[user_id]

        indices = []
        for item_id in hist:
            if item_id in self.item_ids:
                indices.append(self.item_ids.index(item_id))

        if not indices:
            return None

        return self.item_matrix[indices].mean(axis=0)

    # ----------------------------------------------------------
    # 4. Infer mood from user embedding using mood vectors
    # ----------------------------------------------------------
    def _infer_mood(self, user_vec):
        if user_vec is None:
            return None

        sims = cosine_similarity(
            user_vec.reshape(1, -1),
            self.mood_vectors
        )[0]

        best_index = int(np.argmax(sims))
        return self.mood_labels[best_index]

    # ----------------------------------------------------------
    # 5. Context-aware + mood-aware weight
    # ----------------------------------------------------------
    def _context_weight(self, context: Context | None, item_vector: np.ndarray) -> float:
        weight = 1.0

        # TIME-OF-DAY EFFECT
        if context and context.time_of_day:
            tod = context.time_of_day.lower()

            if "night" in tod:
                if np.linalg.norm(item_vector) < 1.0:
                    weight *= 1.10

            elif "morning" in tod:
                if np.linalg.norm(item_vector) >= 1.0:
                    weight *= 1.10

        # DEVICE EFFECT
        if context and context.device:
            dev = context.device.lower()

            if "mobile" in dev:
                weight *= 1.03
            if "desktop" in dev:
                weight *= 1.02

        # MOOD EFFECT
        if self.last_inferred_mood:

            mood = self.last_inferred_mood

            if mood == "sad":
                if np.linalg.norm(item_vector) < 1.0:
                    weight *= 1.12

            elif mood == "happy":
                weight *= 1.05

            elif mood == "calm":
                weight *= 1.08

            elif mood == "energetic":
                weight *= 1.10

            elif mood == "stressed":
                if np.linalg.norm(item_vector) < 1.0:
                    weight *= 1.15

        return weight

    # ----------------------------------------------------------
    # 6. Recommend items (MiniLM + mood + context)
    # ----------------------------------------------------------
    def recommend(self, user_id: str, context: Context | None, top_k: int = 10):
        if not self._ready or self.item_matrix is None:
            return []

        # Build user vector
        user_vec = self._build_user_vector(user_id)

        # Infer mood
        self.last_inferred_mood = self._infer_mood(user_vec)

        # COLD START: no user history
        if user_vec is None:
            base_scores = np.ones(len(self.item_ids))
        else:
            base_scores = cosine_similarity(
                user_vec.reshape(1, -1),
                self.item_matrix
            )[0]

        # Apply context + mood weights
        adjusted_scores = []
        for i, score in enumerate(base_scores):
            item_vec = self.item_matrix[i]
            w = self._context_weight(context, item_vec)
            adjusted_scores.append(score * w)

        adjusted_scores = np.array(adjusted_scores)

        # Top-K selection
        sorted_idx = np.argsort(adjusted_scores)[::-1][:top_k]

        recommendations = []
        for idx in sorted_idx:
            recommendations.append({
                "item_id": self.item_ids[idx],
                "score": float(adjusted_scores[idx]),
                "reason": f"semantic similarity + mood({self.last_inferred_mood}) + context"
            })

        return {
            "user_id": user_id,
            "inferred_mood": self.last_inferred_mood,
            "recommendations": recommendations
        }
