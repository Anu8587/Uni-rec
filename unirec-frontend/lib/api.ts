const BASE_URL = "http://127.0.0.1:8000"; // your FastAPI backend

export async function uploadItems(items: any[]) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  }).then(r => r.json());
}

export async function logEvent(event: any) {
  return fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  }).then(r => r.json());
}

export async function getRecommendations(user_id: string, context?: any, top_k = 10) {
  return fetch(`${BASE_URL}/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, context, top_k }),
  }).then(r => r.json());
}
export async function getEmbeddingMap(user_id: string) {
  const res = await fetch(`http://127.0.0.1:8000/visualize_embeddings/${user_id}`);
  return res.json();
}
