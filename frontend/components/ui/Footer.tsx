import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="
        mt-32 
        border-t border-white/10 
        relative z-10
      "
      style={{
        background: "     <div className=w-[900px] h-[900px] rounded-full bg-purple-600/20 blur-[160px]",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Top */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-10">
          
          {/* Logo */}
          <div>
            <h3 className="text-2xl font-bold font-display">
              UniRec<span className="text-purple-400">AI</span>
            </h3>
            <p className="text-gray-400 text-sm mt-2 max-w-sm">
              Universal personalization engine that adapts to user behavior,
              mood, and context.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="text-gray-300 font-semibold mb-3">Product</h4>
              <ul className="space-y-2">
                <li><a className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a className="text-gray-400 hover:text-white transition">How It Works</a></li>
                <li><a className="text-gray-400 hover:text-white transition">Code Samples</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-300 font-semibold mb-3">Developers</h4>
              <ul className="space-y-2">
                <li><a className="text-gray-400 hover:text-white transition">Documentation</a></li>
                <li><a className="text-gray-400 hover:text-white transition">API Reference</a></li>
                <li><a className="text-gray-400 hover:text-white transition">Playground</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-300 font-semibold mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a className="text-gray-400 hover:text-white transition">About</a></li>
                <li><a className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Socials */}
          <div className="flex space-x-6 text-gray-400">
            <FaGithub className="hover:text-white transition" size={22} />
            <FaTwitter className="hover:text-white transition" size={22} />
            <FaLinkedin className="hover:text-white transition" size={22} />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/5 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} UniRec AI. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
