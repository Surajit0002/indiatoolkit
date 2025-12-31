"use client";

import { useState } from "react";
import { Hash, Copy, Check, Sparkles } from "lucide-react";

const HASHTAG_MAP: Record<string, string[]> = {
  tech: ["#technology", "#tech", "#innovation", "#software", "#coding", "#developer", "#ai", "#gadgets", "#future"],
  fitness: ["#fitness", "#gym", "#workout", "#health", "#motivation", "#lifestyle", "#fit", "#training", "#goals"],
  food: ["#food", "#foodie", "#instafood", "#delicious", "#yummy", "#cooking", "#recipe", "#healthyfood", "#dinner"],
  travel: ["#travel", "#nature", "#adventure", "#photography", "#explore", "#wanderlust", "#vacation", "#travelgram"],
  business: ["#business", "#entrepreneur", "#marketing", "#success", "#startup", "#motivation", "#money", "#work"],
};

export default function HashtagGenerator() {
  const [keyword, setKeyword] = useState("");
  const [generated, setGenerated] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateHashtags = () => {
    const k = keyword.toLowerCase().trim();
    let results: string[] = [];
    
    if (HASHTAG_MAP[k]) {
      results = [...HASHTAG_MAP[k]];
    } else {
      // Basic fallback: just some generic tags if keyword doesn't match
      results = [
        `#${k}`,
        `#${k}life`,
        `#${k}gram`,
        `#${k}love`,
        "#trending",
        "#viral",
        "#explore",
        "#instagood"
      ];
    }
    
    // Shuffle and pick 15
    setGenerated(results.sort(() => 0.5 - Math.random()).slice(0, 15));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generated.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Hash className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold">Hashtag Generator</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Primary Keyword</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. tech, fitness, travel..."
                className="flex-1 h-14 px-6 rounded-2xl border-2 border-gray-100 focus:border-blue-500 outline-none font-bold"
              />
              <button
                onClick={generateHashtags}
                className="h-14 px-8 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100"
              >
                <Sparkles className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {["tech", "fitness", "food", "travel", "business"].map((tag) => (
              <button
                key={tag}
                onClick={() => setKeyword(tag)}
                className="px-3 py-1 bg-gray-50 text-gray-400 text-xs font-bold uppercase rounded-lg border border-gray-100 hover:text-blue-500 hover:border-blue-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {generated.length > 0 && (
          <div className="space-y-4">
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 relative group">
              <div className="flex flex-wrap gap-2">
                {generated.map((tag, i) => (
                  <span key={i} className="text-blue-600 font-bold">{tag}</span>
                ))}
              </div>
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 bg-white rounded-xl shadow-sm border border-blue-100 opacity-0 group-hover:opacity-100 transition-all"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
              Generated {generated.length} hashtags for your post
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
