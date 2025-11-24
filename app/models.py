from typing import List, Dict, Optional
from pydantic import BaseModel

# ----------------------------
# ITEM SCHEMA
# ----------------------------
class Item(BaseModel):
    id: str
    title: Optional[str] = None
    description: Optional[str] = None
    tags: List[str] = []
    metadata: Dict[str, str] = {}


class ItemsRequest(BaseModel):
    items: List[Item]


# ----------------------------
# CONTEXT SCHEMA
# ----------------------------
class Context(BaseModel):
    device: Optional[str] = None
    location_type: Optional[str] = None
    time_of_day: Optional[str] = None


# ----------------------------
# EVENT SCHEMA
# ----------------------------
class EventRequest(BaseModel):
    user_id: str
    event_type: str
    item_id: str
    timestamp: Optional[str] = None
    context: Optional[Context] = None


# ----------------------------
# RECOMMENDATION REQUEST
# ----------------------------
class RecommendRequest(BaseModel):
    user_id: str
    context: Optional[Context] = None
    top_k: Optional[int] = 10
