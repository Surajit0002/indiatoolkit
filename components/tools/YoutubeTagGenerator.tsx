"use client";

import { useState } from "react";
import { Youtube, Copy, Check, Hash } from "lucide-react";

export default function YoutubeTagGenerator() {
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateTags = () => {
    if (!keyword) return;
    const base = keyword.toLowerCase().trim();
    const results = [
      base,
      `how to ${base}`,
      `${base} tutorial`,
      `${base} guide`,
      `${base} for beginners`,
      `${base} 2024`,
      `${base} tips`,
      `${base} hacks`,
      `best ${base}`,
      `${base} explained`,
      "youtube",
      "trending",
      "viral"
    ];
    setTags(results);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(tags.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-8">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-lg">
            <Youtube className="h-5 w-5 text-red-600" />
          </div>
          <h3 className="text-xl font-bold">YouTube Tag Generator</h3>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter video topic..."
            className="flex-1 h-14 px-6 rounded-2xl border-2 border-gray-100 focus:border-red-500 outline-none font-bold"
          />
          <button
            onClick={generateTags}
            className="h-14 px-8 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
          >
            Generate
          </button>
        </div>

        {tags.length > 0 && (
          <div className="space-y-4">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 relative group">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 bg-white rounded-xl shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-all"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
              Total {tags.length} tags generated
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
