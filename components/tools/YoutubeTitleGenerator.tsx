"use client";

import { useState } from "react";
import { Youtube, Copy, Check, Sparkles } from "lucide-react";

const TITLE_TEMPLATES = [
  "How to [KEYWORD] in 2024 (Complete Guide)",
  "The Secret to [KEYWORD] Nobody Tells You",
  "I Tried [KEYWORD] for 30 Days and This Happened...",
  "Stop [KEYWORD] Until You Watch This!",
  "5 [KEYWORD] Hacks You Need to Know",
  "Why Most People Fail at [KEYWORD]",
  "Everything I Wish I Knew About [KEYWORD]",
  "The Ultimate [KEYWORD] Transformation",
];

export default function YoutubeTitleGenerator() {
  const [keyword, setKeyword] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateTitles = () => {
    if (!keyword) return;
    const results = TITLE_TEMPLATES.map(t => t.replace(/\[KEYWORD\]/g, keyword));
    setTitles(results);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-8">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-lg">
            <Youtube className="h-5 w-5 text-red-600" />
          </div>
          <h3 className="text-xl font-bold">YouTube Title Generator</h3>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter your video topic..."
            className="flex-1 h-14 px-6 rounded-2xl border-2 border-gray-100 focus:border-red-500 outline-none font-bold"
          />
          <button
            onClick={generateTitles}
            className="h-14 px-8 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
          >
            Generate
          </button>
        </div>

        {titles.length > 0 && (
          <div className="space-y-4">
            {titles.map((title, i) => (
              <div 
                key={i} 
                className="group flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all"
              >
                <span className="font-bold text-gray-700 group-hover:text-red-900">{title}</span>
                <button
                  onClick={() => handleCopy(title, i)}
                  className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100 transition-all"
                >
                  {copiedIndex === i ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-gray-400" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
