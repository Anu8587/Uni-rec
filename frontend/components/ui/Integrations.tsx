import Image from "next/image";

const integrations = [
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Shopify", icon: "/icons/shopify.svg"  },
  { name: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
  { name: "iOS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" },
  { name: "REST API", icon: "/icons/rest-api.svg" },
];

export default function Integrations() {
  return (
    <section className="py-28 bg-[#0c0015] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <h2 className="text-4xl font-bold text-white mb-6">
          Integrates Everywhere
        </h2>

        <p className="text-purple-200/80 max-w-2xl mx-auto mb-14">
          Use our universal recommendation API with any framework, backend, or platform.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 place-items-center">
          {integrations.map((item) => (
            <div 
              key={item.name}
              className="flex flex-col items-center opacity-70 hover:opacity-100 transition group"
            >
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-md group-hover:shadow-[0_0_25px_rgba(120,60,200,0.5)] transition">
                <Image 
                  src={item.icon} 
                  alt={item.name}
                  width={50}
                  height={50}
                  className="invert opacity-90 group-hover:opacity-100 transition"
                />
              </div>
              <span className="text-purple-200 text-sm mt-3">{item.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
