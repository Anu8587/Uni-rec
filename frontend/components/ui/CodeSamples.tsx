"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = ["JavaScript", "Python", "cURL"];

const codeBlocks: Record<string, string> = {
  JavaScript: `// JavaScript Example
import axios from "axios";

await axios.post("http://localhost:8000/items", {
  items: [
    {
      id: "item1",
      title: "Calm Piano Music",
      description: "Soft relaxing music",
      tags: ["calm", "music"]
    }
  ]
});

await axios.post("http://localhost:8000/events", {
  user_id: "user123",
  event_type: "view",
  item_id: "item1"
});

const rec = await axios.post("http://localhost:8000/recommend", {
  user_id: "user123",
  context: { time_of_day: "evening" }
});

console.log(rec.data);`,

  Python: `# Python Example
import requests

requests.post("http://localhost:8000/items", json={
    "items": [
        {
            "id": "item1",
            "title": "Calm Piano Music",
            "description": "Soft relaxing music",
            "tags": ["calm", "music"],
        }
    ]
})

requests.post("http://localhost:8000/events", json={
    "user_id": "user123",
    "event_type": "view",
    "item_id": "item1"
})

rec = requests.post("http://localhost:8000/recommend", json={
    "user_id": "user123",
    "context": {"time_of_day": "evening"}
})

print(rec.json())`,

  cURL: `# cURL Example
curl -X POST http://localhost:8000/items \\
  -H "Content-Type: application/json" \\
  -d '{
    "items": [
      {
        "id": "item1",
        "title": "Calm Piano Music",
        "description": "Soft relaxing music",
        "tags": ["calm", "music"]
      }
    ]
  }'

curl -X POST http://localhost:8000/events \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "user123",
    "event_type": "view",
    "item_id": "item1"
  }'

curl -X POST http://localhost:8000/recommend \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "user123",
    "context": {"time_of_day": "evening"}
  }'`
};

export default function CodeSamples() {
  const [activeTab, setActiveTab] = useState("JavaScript");

  return (
    <section className="py-28 bg-[#07000f] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Plug & Play in Minutes
        </h2>
        <p className="text-purple-200/80 max-w-2xl mx-auto mb-14">
          Drop our API into your stack — no model training, no infra setup.
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-full border text-sm transition",
                activeTab === tab
                  ? "bg-purple-600 text-white border-purple-500 shadow-lg"
                  : "bg-white/5 text-purple-200 border-white/10 hover:border-purple-400/50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Code Block */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_rgba(140,70,240,0.3)] text-left">
          <pre className="text-purple-200 text-sm overflow-x-auto whitespace-pre-wrap">
{codeBlocks[activeTab]}
          </pre>
        </div>
      </div>
    </section>
  );
}
