"use client";

import { useState } from "react";
import { Copy, Hash, RefreshCw, Check, Sparkles } from "lucide-react";

export default function HashtagGenerator() {
  const [keywords, setKeywords] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [count, setCount] = useState(10);
  const [style, setStyle] = useState("balanced");
  const [generated, setGenerated] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const hashtagDatabases: Record<string, Record<string, string[]>> = {
    instagram: {
      business: ["#business", "#entrepreneur", "#smallbusiness", "#businessowner", "#marketing", "#startup", "#success", "#motivation", "#branding", "#growth", "#leadership", "#innovation", "#hustle", "#money", "#career"],
      lifestyle: ["#lifestyle", "#life", "#living", "#daily", "#vibes", "#mood", "#inspiration", "#goals", "#goodvibes", "#positive", "#happy", "#blessed", "#grateful", "#livelife", "#enjoy"],
      travel: ["#travel", "#wanderlust", "#explore", "#adventure", "#travelgram", "#instatravel", "#travelphotography", "#vacation", "#holiday", "#trip", "#destination", "#travelblogger", "#nature", "#beautiful", "#places"],
      food: ["#food", "#foodie", "#foodporn", "#yummy", "#delicious", "#dinner", "#lunch", "#breakfast", "#foodphotography", "#homemade", "#cooking", "#recipe", "#foodstagram", "#instafood", "#tasty"],
      fitness: ["#fitness", "#fitnessmotivation", "#workout", "#gym", "#fit", "#health", "#training", "#fitlife", "#fitnessjourney", "#exercise", "#motivation", "#bodybuilding", "#strength", "#cardio", "#wellness"],
    },
    twitter: {
      business: ["#business", "#entrepreneur", "#marketing", "#startup", "#smallbiz", "#leadership", "#success", "#growth", "#innovation", "#strategy"],
      tech: ["#tech", "#technology", "#innovation", "#digital", "#ai", "#machinelearning", "#cloud", "#cybersecurity", "#coding", "#developer"],
      news: ["#news", "#breaking", "#update", "#trending", "#latest", "#world", "#politics", "#economy", "#global", "#current"],
    },
    linkedin: {
      professional: ["#professional", "#career", "#leadership", "#management", "#business", "#networking", "#success", "#motivation", "#entrepreneurship", "#innovation"],
      industry: ["#industry", "#trends", "#insights", "#thoughtleadership", "#expertise", "#knowledge", "#bestpractices", "#strategy", "#growth", "#development"],
    },
    tiktok: {
      viral: ["#fyp", "#foryou", "#foryoupage", "#viral", "#trending", "#tiktok", "#duet", "#challenge", "#viralvideo", "#explore"],
      content: ["#comedy", "#dance", "#tutorial", "#howto", "#lifestyle", "#humor", "#funny", "#music", "#food", "#fitness"],
    },
  };

  const categoryKeywords: Record<string, string[]> = {
    business: ["business", "company", "startup", "entrepreneur", "marketing", "sales", "branding"],
    lifestyle: ["life", "lifestyle", "living", "daily", "vibes", "mood"],
    travel: ["travel", "vacation", "trip", "adventure", "explore", "destination"],
    food: ["food", "recipe", "cooking", "restaurant", "meal", "delicious"],
    fitness: ["fitness", "gym", "workout", "health", "exercise", "training"],
  };

  const generateHashtags = () => {
    if (!keywords.trim()) {
      alert("Please enter at least one keyword");
      return;
    }

    const inputKeywords = keywords.toLowerCase().split(",").map(k => k.trim()).filter(k => k);
    let selectedCategory = "business";
    
    for (const [category, words] of Object.entries(categoryKeywords)) {
      if (inputKeywords.some(k => words.some(w => k.includes(w) || w.includes(k)))) {
        selectedCategory = category;
        break;
      }
    }

    const baseHashtags = hashtagDatabases[platform]?.[selectedCategory] || hashtagDatabases.instagram.business;
    
    let selected: string[];
    switch (style) {
      case "popular":
        selected = baseHashtags.slice(0, Math.min(count, 8));
        break;
      case "niche":
        selected = baseHashtags.slice(5, Math.min(count + 5, 15));
        break;
      default:
        selected = baseHashtags.slice(0, count);
    }

    const keywordHashtags = inputKeywords.map(k => `#${k.replace(/\s+/g, "")}`);
    const combined = [...new Set([...selected, ...keywordHashtags])].slice(0, count);
    
    setHashtags(combined);
    setGenerated(true);
  };

  const regenerate = () => {
    generateHashtags();
  };

  const copyToClipboard = () => {
    const hashtagString = hashtags.join(" ");
    navigator.clipboard.writeText(hashtagString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mb-4 shadow-lg">
            <Hash className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Hashtag Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Generate relevant hashtags for social media
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Hash className="h-5 w-5 text-pink-500" />
                Keywords
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Enter Keywords (comma separated)
                </label>
                <textarea
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g., coffee, morning, productivity, startup"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all font-medium"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-pink-500" />
                Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Platform</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all font-medium"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="twitter">Twitter</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="tiktok">TikTok</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Count: {count}</label>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Style</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all font-medium"
                  >
                    <option value="balanced">Balanced</option>
                    <option value="popular">Popular (High Competition)</option>
                    <option value="niche">Niche (Low Competition)</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={generateHashtags}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="h-5 w-5" />
              Generate Hashtags
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Hash className="h-5 w-5 text-pink-500" />
                Generated Hashtags
              </h3>
              
              <div className="bg-slate-50 rounded-xl p-4 min-h-[200px]">
                {generated ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {hashtags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium cursor-pointer hover:bg-pink-200 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 text-center">
                      {hashtags.length} hashtags generated for {platform}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-slate-400 text-center">
                      Enter keywords and click<br />"Generate Hashtags"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {generated && (
              <div className="space-y-3">
                <button
                  onClick={copyToClipboard}
                  className="w-full py-3 bg-pink-500 text-white font-semibold rounded-xl hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copied ? "Copied!" : "Copy Hashtags"}
                </button>
                <button
                  onClick={regenerate}
                  className="w-full py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  Regenerate
                </button>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-pink-500" />
                Tips
              </h3>
              
              <div className="space-y-2 text-sm text-slate-600">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-semibold text-slate-700">Instagram</p>
                  <p>Use 5-15 hashtags for best reach</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-semibold text-slate-700">Twitter</p>
                  <p>2-3 hashtags per tweet recommended</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-semibold text-slate-700">LinkedIn</p>
                  <p>3-5 relevant professional hashtags</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
