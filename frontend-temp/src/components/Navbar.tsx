import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(true);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-widest">
          QUERYMIND
        </h1>

        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}