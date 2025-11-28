from typing import List, Dict, Optional
from pydantic import BaseModel, Field


class Item(BaseModel):
    id: str
    title: Optional[str] = None
    description: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    metadata: Dict[str, str] = Field(default_factory=dict)


class ItemsRequest(BaseModel):
    items: List[Item]


class Context(BaseModel):
    device: Optional[str] = None        # "mobile", "desktop" etc.
    location_type: Optional[str] = None # "home", "work", "travel"...
    time_of_day: Optional[str] = None   # "morning", "evening", "night"...


class EventRequest(BaseModel):
    user_id: str
    event_type: str          # "view", "click", "add_to_cart", "purchase", "like", ...
    item_id: str
    timestamp: Optional[str] = None
    context: Optional[Context] = None


class RecommendRequest(BaseModel):
    user_id: str
    context: Optional[Context] = None
    top_k: int = 10
