from fastapi import FastAPI
from app.models import ItemsRequest, EventRequest, RecommendRequest
from app.engine import RecommenderEngine

app = FastAPI(title="Universal Recommendation API")

# ML engine 
engine = RecommenderEngine()

@app.post("/items")
def add_items(req: ItemsRequest):
    engine.add_items(req.items)
    return {"status": "ok", "num_items_added": len(req.items)}

@app.post("/events")
def log_event(req: EventRequest):
    engine.log_event(req)
    return {"status": "ok", "event_received": req.event_type}

@app.post("/recommend")
def recommend(req: RecommendRequest):
    recs = engine.recommend(
        user_id=req.user_id,
        context=req.context,
        top_k=req.top_k
    )
    return {"user_id": req.user_id, "recommendations": recs}
