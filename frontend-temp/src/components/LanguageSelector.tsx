import { useState } from "react";

const languages = [
  "🇺🇸 English",
  "🇮🇳 Hindi",
  "🇪🇸 Spanish",
  "🇫🇷 French",
  "🇩🇪 German",
  "🇨🇳 Chinese",
  "🇯🇵 Japanese",
  "🇸🇦 Arabic",
  "🇵🇹 Portuguese",
  "🇷🇺 Russian",
];

export default function LanguageSelector() {
  const [language, setLanguage] =
    useState("🇺🇸 English");

  return (
    <div
      className="
        fixed
        top-6
        right-24
        z-50
        relative
      "
    >
      <select
        value={language}
        onChange={(e) =>
          setLanguage(
            e.target.value
          )
        }
        className="
          appearance-none
          px-5
          py-3
          pr-14
          rounded-2xl
          bg-slate-900/80
          text-cyan-300
          border
          border-cyan-500/30
          backdrop-blur-xl
          font-semibold
          shadow-lg
          hover:border-cyan-400
          hover:shadow-cyan-500/20
          focus:outline-none
          focus:border-cyan-400
          transition-all
          duration-300
          cursor-pointer
        "
      >
        {languages.map(
          (language) => (
            <option
              key={language}
              value={language}
              className="
                bg-slate-900
                text-cyan-300
              "
            >
              {language}
            </option>
          )
        )}
      </select>

      <div
        className="
          pointer-events-none
          absolute
          right-5
          top-1/2
          -translate-y-1/2
          text-cyan-400
          text-xs
          font-bold
        "
      >
        ▼
      </div>
    </div>
  );
}