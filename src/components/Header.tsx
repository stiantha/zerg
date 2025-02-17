import { ChevronDown } from "lucide-react";
import { useState } from "react";

const languages = ["English", "Norwegian"];

const Header: React.FC<{ language: string; setLanguage: (lang: string) => void }> = ({ language, setLanguage }) => {
  const [showLanguages, setShowLanguages] = useState(false);

  return (
    <header className="border-b border-dashed border-gray-700 flex justify-between items-center px-6 py-3 w-full z-10">
      <div className="text-xl font-light tracking-wider"></div>
      <div className="relative">
        <button
          onClick={() => setShowLanguages(!showLanguages)}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-200"
        >
          {language} <ChevronDown size={16} />
        </button>
        {showLanguages && (
          <div className="absolute top-full right-0 mt-1 bg-neutral-800 border border-gray-700 rounded shadow-lg py-1 min-w-32">
            {languages.map((lang) => (
              <button
                key={lang}
                className="w-full px-4 py-2 text-left hover:bg-neutral-700 text-gray-300"
                onClick={() => {
                  setLanguage(lang);
                  setShowLanguages(false);
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
