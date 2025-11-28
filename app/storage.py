import sqlite3
import json
from typing import List, Dict, Any


class Storage:
    def __init__(self, db_path: str = "engine.db"):
        self.db_path = db_path
        self._init_db()

    # --------------------------
    def _init_db(self):
        con = sqlite3.connect(self.db_path)
        cur = con.cursor()

        cur.execute("""
            CREATE TABLE IF NOT EXISTS items (
                id TEXT PRIMARY KEY,
                title TEXT,
                description TEXT,
                tags TEXT,
                metadata TEXT,
                embedding TEXT
            )
        """)

        cur.execute("""
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT,
                event_type TEXT,
                item_id TEXT,
                timestamp TEXT,
                context TEXT
            )
        """)

        con.commit()
        con.close()

    # --------------------------
    def save_items(self, items: List[Dict], embeddings: List[List[float]]):
        con = sqlite3.connect(self.db_path)
        cur = con.cursor()

        for item, emb in zip(items, embeddings):
            cur.execute("""
                INSERT OR REPLACE INTO items (id, title, description, tags, metadata, embedding)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (
                item["id"],
                item["title"],
                item["description"],
                json.dumps(item["tags"]),
                json.dumps(item["metadata"]),
                json.dumps(emb)
            ))

        con.commit()
        con.close()

    # --------------------------
    def load_all_items(self):
        con = sqlite3.connect(self.db_path)
        cur = con.cursor()

        cur.execute("SELECT id, title, description, tags, metadata, embedding FROM items")
        rows = cur.fetchall()
        con.close()

        data = []
        for row in rows:
            data.append({
                "id": row[0],
                "title": row[1],
                "description": row[2],
                "tags": json.loads(row[3]),
                "metadata": json.loads(row[4]),
                "embedding": json.loads(row[5])
            })
        return data

    # --------------------------
    def save_event(self, event: Dict[str, Any]):
        con = sqlite3.connect(self.db_path)
        cur = con.cursor()

        cur.execute("""
            INSERT INTO events (user_id, event_type, item_id, timestamp, context)
            VALUES (?, ?, ?, ?, ?)
        """, (
            event["user_id"],
            event["event_type"],
            event["item_id"],
            event.get("timestamp"),
            json.dumps(event.get("context", {}))
        ))

        con.commit()
        con.close()

    # --------------------------
    def load_user_history(self, user_id: str, limit=100):
        con = sqlite3.connect(self.db_path)
        cur = con.cursor()

        cur.execute("""
            SELECT event_type, item_id FROM events
            WHERE user_id = ?
            ORDER BY id DESC
            LIMIT ?
        """, (user_id, limit))

        rows = cur.fetchall()
        con.close()

        return [{"event_type": r[0], "item_id": r[1]} for r in rows]

    # -------------
    def clear_all(self):
        con = sqlite3.connect(self.db_path)
        cur = con.cursor()

        cur.execute("DELETE FROM items")
        cur.execute("DELETE FROM events")

        con.commit()
        con.close()
