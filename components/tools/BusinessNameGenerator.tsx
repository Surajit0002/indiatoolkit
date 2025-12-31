"use client";

import { useState } from "react";
import { Lightbulb, Search, Sparkles, Copy, Check, RotateCcw } from "lucide-react";

const PREFIXES = ["Peak", "Swift", "Nova", "Elite", "Prime", "Global", "Core", "Zen", "Sky", "Bright"];
const SUFFIXES = ["Solutions", "Labs", "Hub", "Systems", "Direct", "Flow", "Sphere", "Logic", "Path", "Nest"];

export default function BusinessNameGenerator() {
  const [keywords, setKeywords] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const generateNames = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = [];
      const base = keywords.split(" ")[0] || "Startup";
      
      for (let i = 0; i < 12; i++) {
        const rand = Math.random();
        if (rand < 0.3) {
          generated.push(`${PREFIXES[Math.floor(Math.random() * PREFIXES.length)]}${base}`);
        } else if (rand < 0.6) {
          generated.push(`${base}${SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)]}`);
        } else {
          generated.push(`${PREFIXES[Math.floor(Math.random() * PREFIXES.length)]} ${base} ${SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)]}`);
        }
      }
      
      setNames([...new Set(generated)]);
      setIsGenerating(false);
    }, 1000);
  };

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6 text-center">
          <div className="h-20 w-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="h-10 w-10" />
          </div>
          <div className="max-w-xl mx-auto">
            <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Business Name Generator</h3>
            <p className="text-gray-500 font-medium mt-2">Enter keywords related to your business to get creative name ideas instantly.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. tech, eco, fashion..."
                className="w-full h-16 pl-16 pr-6 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-lg"
              />
            </div>
            <button
              onClick={generateNames}
              disabled={isGenerating}
              className="h-16 px-10 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? <RotateCcw className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
              Generate
            </button>
          </div>
        </div>

        {names.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {names.map((name, idx) => (
              <button
                key={idx}
                onClick={() => copyToClipboard(name)}
                className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-amber-200 transition-all text-center group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {copied === name ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-gray-300" />}
                </div>
                <span className="text-xl font-black text-gray-900 group-hover:text-amber-600 transition-colors">{name}</span>
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-2">Available</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
