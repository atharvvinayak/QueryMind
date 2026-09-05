import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    return (
      localStorage.getItem("theme") ===
      "dark"
    );
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }
  }, [dark]);

  return (
    <button
      onClick={() =>
        setDark((prev) => !prev)
      }
      className="
        fixed
        top-6
        right-6
        z-50
        flex
        items-center
        justify-center
        w-14
        h-14
        rounded-2xl
        backdrop-blur-xl
        bg-white/70
        dark:bg-slate-900/70
        border
        border-slate-200
        dark:border-slate-700
        shadow-lg
        hover:scale-110
        transition-all
        duration-300
      "
    >
      {dark ? (
        <Sun
          size={22}
          className="text-yellow-400"
        />
      ) : (
        <Moon
          size={22}
          className="text-slate-700"
        />
      )}
    </button>
  );
}