from typing import List, Dict
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.models import Item, EventRequest, Context


class RecommenderEngine:
    def __init__(self):
        # Store items and user history
        self.items: Dict[str, Item] = {}
        self.user_history: Dict[str, List[str]] = {}

        # For embeddings
        self.item_ids = []
        self.item_matrix = None
        self.vectorizer = TfidfVectorizer(max_features=5000)

        self._fitted = False
    

    # ------------------------------------------------------
    # 1. Add items and update item embeddings
    # ------------------------------------------------------
    def add_items(self, items: List[Item]):
        # Store items
        for it in items:
            self.items[it.id] = it

        # Update item id list
        self.item_ids = list(self.items.keys())

        # Build corpus (text for each item)
        corpus = []
        for iid in self.item_ids:
            it = self.items[iid]
            text = " ".join([
                it.title or "",
                it.description or "",
                " ".join(it.tags),
                " ".join([f"{k}:{v}" for k, v in it.metadata.items()])
            ])
            corpus.append(text)

        # Fit or update TF-IDF
        if not self._fitted:
            self.item_matrix = self.vectorizer.fit_transform(corpus).toarray()
            self._fitted = True
        else:
            self.item_matrix = self.vectorizer.transform(corpus).toarray()


    # ------------------------------------------------------
    # 2. Log user events
    # ------------------------------------------------------
    def log_event(self, event: EventRequest):
        history = self.user_history.get(event.user_id, [])
        history.append(event.item_id)

        # keep only recent 50 items
        self.user_history[event.user_id] = history[-50:]


    # ------------------------------------------------------
    # 3. Build user embedding from recent items
    # ------------------------------------------------------
    def _build_user_vector(self, user_id: str):
        if not self._fitted:
            return None
        
        if user_id not in self.user_history:
            return None

        hist = self.user_history[user_id]

        indices = []
        for itm in hist:
            if itm in self.item_ids:
                idx = self.item_ids.index(itm)
                indices.append(idx)

        if not indices:
            return None

        # mean embedding
        return self.item_matrix[indices].mean(axis=0)


    # ------------------------------------------------------
    # 4. Recommend items
    # ------------------------------------------------------
    def recommend(self, user_id: str, context: Context, top_k: int = 10):
        if not self._fitted:
            return []

        # build user embedding
        user_vec = self._build_user_vector(user_id)

        # if new user or no history: return popular/random items
        if user_vec is None:
            scores = np.ones(len(self.item_ids))
        else:
            scores = cosine_similarity(
                user_vec.reshape(1, -1),
                self.item_matrix
            )[0]

        # sort items
        sorted_idx = np.argsort(scores)[::-1][:top_k]

        recommendations = []
        for idx in sorted_idx:
            recommendations.append({
                "item_id": self.item_ids[idx],
                "score": float(scores[idx]),
                "reason": "similar to your past behaviour"
            })

        return recommendations
