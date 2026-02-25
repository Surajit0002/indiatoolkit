"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
];

interface LanguageSelectorProps {
  isScrolled?: boolean;
  compact?: boolean;
}

export default function LanguageSelector({ isScrolled = false, compact = false }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language>(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem("preferred-language");
    if (saved) {
      const lang = languages.find(l => l.code === saved);
      if (lang) setSelectedLang(lang);
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle language selection
  const handleSelect = (lang: Language) => {
    setSelectedLang(lang);
    localStorage.setItem("preferred-language", lang.code);
    setIsOpen(false);
    
    // Dispatch event for other components to listen
    window.dispatchEvent(new CustomEvent("language-change", { detail: lang }));
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-1.5 p-2 rounded-xl transition-all
          ${isScrolled 
            ? "hover:bg-slate-100 text-slate-600" 
            : "hover:bg-white/10 text-slate-300 hover:text-white"
          }
          ${compact ? "p-1.5" : "px-3"}
        `}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <Globe className={`w-4 h-4 ${compact ? "w-4 h-4" : "w-4 h-4"}`} />
        {!compact && (
          <>
            <span className="text-sm font-medium hidden sm:inline">{selectedLang.nativeName}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div 
          className="
            absolute top-full right-0 mt-2
            w-48 bg-white rounded-xl shadow-xl border border-slate-200
            overflow-hidden z-50
            animate-fade-in-up
          "
          role="listbox"
          aria-label="Available languages"
        >
          {/* Header */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Select Language
            </span>
          </div>

          {/* Language List */}
          <div className="max-h-64 overflow-y-auto py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5
                  text-left transition-colors
                  ${selectedLang.code === lang.code 
                    ? "bg-green-50 text-green-700" 
                    : "text-slate-700 hover:bg-slate-50"
                  }
                `}
                role="option"
                aria-selected={selectedLang.code === lang.code}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{lang.nativeName}</p>
                  <p className="text-[10px] text-slate-400 truncate">{lang.name}</p>
                </div>
                {selectedLang.code === lang.code && (
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-3 py-2 bg-slate-50 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 text-center">
              More languages coming soon
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
