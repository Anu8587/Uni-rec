"use client";

import React, { useState } from "react";

const TABS = ["JavaScript", "Python", "cURL"];

const CODE_SAMPLES = {
  JavaScript: `// 1. Add Items
await uniRec.items.add({
  items: [
    {
      id: "item_123",
      title: "Chill Lo-Fi Beats",
      tags: ["relax", "study"]
    }
  ]
});

// 2. Add User Events
await uniRec.events.track({
  userId: "user_55",
  events: [
    {
      type: "view",
      itemId: "item_123",
      timestamp: Date.now()
    },
    {
      type: "click",
      itemId: "item_123",
      timestamp: Date.now()
    }
  ]
});

// 3. Get Recommendations
const recs = await uniRec.recommend({
  userId: "user_55",
  context: { timeOfDay: "night" },
  moodText: "I want to relax"
});

console.log(recs);`,


  Python: `# 1. Add Items
client.items.add(
    items=[
        {
            "id": "item_123",
            "title": "Chill Lo-Fi Beats",
            "tags": ["relax", "study"],
        }
    ]
)

# 2. Add Events
client.events.track(
    user_id="user_55",
    events=[
        {"type": "view", "item_id": "item_123"},
        {"type": "click", "item_id": "item_123"},
    ]
)

# 3. Get Recommendations
recs = client.recommend(
    user_id="user_55",
    context={"time_of_day": "night"},
    mood_text="I want to relax"
)

print(recs)`,


  cURL: `# 1. Add Items
curl -X POST https://api.uni-rec.com/v1/items \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "items": [
      {"id": "item_123", "title": "Chill Lo-Fi Beats"}
    ]
  }'

# 2. Add Events
curl -X POST https://api.uni-rec.com/v1/events \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "user_55",
    "events": [
      {"type": "view", "item_id": "item_123"},
      {"type": "click", "item_id": "item_123"}
    ]
  }'

# 3. Get Recommendations
curl -X POST https://api.uni-rec.com/v1/recommend \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "user_55",
    "context": {"time_of_day": "night"},
    "mood_text": "I want to relax"
  }'`
};


export default function CodeSamples() {
  const [activeTab, setActiveTab] = useState("JavaScript");

  return (
    <section className="py-24 bg-[#090011]/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

          {/* LEFT SIDE TEXT */}
          <div className="lg:col-span-5 mb-12 lg:mb-0">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6 font-display leading-snug">
              Three lines of code. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-400">
                Infinite personalization.
              </span>
            </h2>

            <p className="text-lg text-purple-200/80 mb-8 leading-relaxed">
              We removed the vector databases, training pipelines, and cold-start pain.
              Just push data and pull recommendations.
            </p>

            <div className="space-y-8">
              {[
                { num: "1", title: "Upload Catalog", desc: "Send your products, songs, or articles via API." },
                { num: "2", title: "Send Events", desc: "Track views, clicks, and purchases in real-time." },
                { num: "3", title: "Get Recommendations", desc: "Receive ranked results personalized for every user." }
              ].map((step, idx) => (
                <div key={idx} className="flex group">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-white/5 border border-white/10 text-purple-400 font-bold shadow-lg group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 font-display">
                      {step.num}
                    </div>
                  </div>

                  <div className="ml-6">
                    <h4 className="text-lg font-bold text-white font-display group-hover:text-purple-400 transition-colors">
                      {step.title}
                    </h4>
                    <p className="mt-1 text-purple-200/70 font-light">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE CODE BLOCK */}
          <div className="lg:col-span-7">
            <div className="rounded-xl bg-[#0d0d11] border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/5 transform transition hover:scale-[1.01] duration-500">
              
              {/* TOP BAR */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                <div className="flex bg-black/50 rounded-lg p-1">
                  {TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                        activeTab === tab
                          ? "bg-purple-600 text-white shadow-sm"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* CODE AREA */}
              <div className="p-8 overflow-x-auto min-h-[300px]">
                <pre className="font-mono text-sm leading-loose">
                  <code className="text-gray-300">
                   {CODE_SAMPLES[activeTab as keyof typeof CODE_SAMPLES]

                      .split("\n")
                      .map((line, i) => (
                        <div key={i} className="table-row">
                          <span className="table-cell text-gray-700 select-none text-right pr-4">
                            {i + 1}
                          </span>
                          <span
                            className="table-cell"
                            dangerouslySetInnerHTML={{
                              __html: line
                                .replace(
                                  /\b(const|await|import|from|return)\b/g,
                                  '<span class="text-purple-400 font-semibold">$1</span>'
                                )
                                .replace(
                                  /\b(function|class|=>)\b/g,
                                  '<span class="text-blue-400">$1</span>'
                                )
                                .replace(
                                  /"([^"]*)"|'([^']*)'/g,
                                  '<span class="text-green-400">$&</span>'
                                )
                                .replace(
                                  /(\/\/.*)/g,
                                  '<span class="text-gray-500 italic">$1</span>'
                                )
                            }}
                          ></span>
                        </div>
                      ))}
                  </code>
                </pre>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
