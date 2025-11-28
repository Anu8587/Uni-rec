"use client";

type Item = {
  id: string;
  title: string;
  image?: string;
  description?: string;
  tags: string[];
};

export default function ItemGrid({
  items,
  onEvent,
}: {
  items: Item[];
  onEvent: (type: string, id: string) => void;
}) {
  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-3 
        gap-5
      "
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-xl bg-[#0f0f1c] border border-purple-800/40 p-4 flex flex-col hover:border-purple-500/60 transition"
        >
          {/* IMAGE */}
          <div className="h-40 w-full overflow-hidden rounded-lg mb-3 bg-black flex items-center justify-center">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-xs text-slate-600">No image</div>
            )}
          </div>

          {/* TITLE */}
          <h3 className="text-base font-semibold leading-tight text-white mb-1 line-clamp-2">
            {item.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-sm text-slate-400 mb-2 line-clamp-2">
            {item.description}
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-1 mb-4">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* BUTTONS — STAY AT BOTTOM */}
          <div className="mt-auto flex gap-2">
            <button
              onClick={() => onEvent("click", item.id)}
              className="flex-1 text-xs px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg"
            >
              Click
            </button>
            <button
              onClick={() => onEvent("like", item.id)}
              className="flex-1 text-xs px-3 py-2 bg-pink-600 hover:bg-pink-500 rounded-lg"
            >
              Like
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
