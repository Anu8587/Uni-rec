from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import ItemsRequest, EventRequest, RecommendRequest
from app.engine import RecommenderEngine
from app.storage import Storage

app = FastAPI(title="Universal Recommendation API")



# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

storage = Storage()
engine = RecommenderEngine(storage)

@app.post("/items")
def add_items(req: ItemsRequest):
    engine.add_items(req.items)
    return {"status": "ok", "added": len(req.items)}

@app.post("/events")
def log_event(req: EventRequest):
    engine.log_event(req)
    return {"status": "ok"}

@app.post("/recommend")
def recommend(req: RecommendRequest):
    return engine.recommend(
        user_id=req.user_id,
        context=req.context,
        top_k=req.top_k
    )


@app.post("/reset")
def reset_db():
    storage.clear_all()
    return {"status": "database cleared"}
