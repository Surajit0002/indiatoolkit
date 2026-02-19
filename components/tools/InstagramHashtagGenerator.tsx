"use client";

import { useState } from "react";
import { Hash, Copy, Check, Sparkles, RefreshCw, TrendingUp, Eye, Target } from "lucide-react";

const nicheHashtags: Record<string, string[]> = {
  lifestyle: ["#lifestyle", "#lifestyleblogger", "#lifestylegoals", "#lifestylephotography", "#lifestylecoach", "#lifestyledesign", "#lifestyleinspo", "#lifstyle", "#lifestylemagic", "#lifestyle101"],
  fitness: ["#fitness", "#fitnessmotivation", "#fitnessjourney", "#fitnessgirl", "#fitnessboy", "#fitnessaddict", "#fitnesslife", "#fitnessgoals", "#fitnesscommunity", "#fitnessinspo"],
  food: ["#foodie", "#foodporn", "#foodphotography", "#foodblogger", "#foodstagram", "#foodlover", "#foodgasm", "#foodoftheday", "#foodart", "#foodmakesmehappy"],
  travel: ["#travel", "#travelgram", "#travelphotography", "#travelblogger", "#traveling", "#traveller", "#travelholic", "#traveltheworld", "#traveladdict", "#travelawesome"],
  fashion: ["#fashion", "#fashionblogger", "#fashionista", "#fashionstyle", "#fashionweek", "#fashiondesigner", "#fashionphotography", "#fashionmodel", "#fashionblog", "#fashiongram"],
  photography: ["#photography", "#photographer", "#photographylovers", "#photographyislife", "#photographyart", "#photographydaily", "#photographyeveryday", "#photographyislifee", "#photographystudio", "#photographylove"],
  beauty: ["#beauty", "#beautyblogger", "#beautygirl", "#beautyqueen", "#beautytips", "#beautyproducts", "#beautycare", "#beautyandthebeast", "#beautyful", "#beautygram"],
  business: ["#business", "#businessowner", "#businesswoman", "#businessmindset", "#businesstips", "#businessgrowth", "#businessmotivation", "#businesscoach", "#businessblog", "#businesstime"],
  tech: ["#technology", "#tech", "#techie", "#technews", "#techlover", "#techlife", "#techcommunity", "#techtrends", "#techgadgets", "#techstyle"],
  art: ["#art", "#artist", "#artwork", "#artistsoninstagram", "#artoftheday", "#artgallery", "#artistic", "#artdaily", "#artstudio", "#artcollector"],
};

export default function InstagramHashtagGenerator() {
  const [keyword, setKeyword] = useState("");
  const [niche, setNiche] = useState("lifestyle");
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [includeTrending, setIncludeTrending] = useState(true);
  const [includeNiche, setIncludeNiche] = useState(true);
  const [hashtagCount, setHashtagCount] = useState(15);

  const trendingHashtags = ["#viral", "#trending", "#instagood", "#photooftheday", "#picoftheday", "#instadaily", "#instamood", "#instagram", "#like4like", "#followme"];

  const generateHashtags = () => {
    let tags: string[] = [];
    
    if (includeNiche && nicheHashtags[niche]) {
      const shuffledNiche = [...nicheHashtags[niche]].sort(() => 0.5 - Math.random());
      tags = [...tags, ...shuffledNiche.slice(0, Math.floor(hashtagCount * 0.7))];
    }
    
    if (includeTrending) {
      const shuffledTrending = [...trendingHashtags].sort(() => 0.5 - Math.random());
      tags = [...tags, ...shuffledTrending.slice(0, Math.floor(hashtagCount * 0.3))];
    }
    
    if (keyword) {
      const keywordTag = `#${keyword.toLowerCase().replace(/\s+/g, '')}`;
      if (!tags.includes(keywordTag)) {
        tags.unshift(keywordTag);
      }
    }
    
    setGeneratedHashtags(tags.slice(0, hashtagCount));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedHashtags.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const randomizeNiche = () => {
    const niches = Object.keys(nicheHashtags);
    const randomNiche = niches[Math.floor(Math.random() * niches.length)];
    setNiche(randomNiche);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl mb-4 shadow-lg">
            <Hash className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Instagram Hashtag Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">Generate powerful hashtags to boost your reach and engagement</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Main Keyword</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter your main keyword"
                className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-pink-400 focus:outline-none"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Niche Category</label>
                <button onClick={randomizeNiche} className="flex items-center gap-1 text-xs text-pink-600 hover:text-pink-700 font-medium">
                  <RefreshCw className="h-3 w-3" /> Random
                </button>
              </div>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-pink-400 focus:outline-none"
              >
                {Object.keys(nicheHashtags).map((cat) => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Number of Hashtags</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={hashtagCount}
                  onChange={(e) => setHashtagCount(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-bold text-slate-700 w-12">{hashtagCount}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Include</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={includeNiche} onChange={(e) => setIncludeNiche(e.target.checked)} className="w-4 h-4 text-pink-600 rounded" />
                  <span className="text-sm text-slate-700">Niche Tags</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={includeTrending} onChange={(e) => setIncludeTrending(e.target.checked)} className="w-4 h-4 text-pink-600 rounded" />
                  <span className="text-sm text-slate-700">Trending</span>
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={generateHashtags}
            className="w-full h-14 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg shadow-pink-100"
          >
            <Sparkles className="h-5 w-5" />
            Generate Hashtags
          </button>

          {generatedHashtags.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-pink-600" />
                  <span className="font-bold text-slate-800">Generated Hashtags</span>
                  <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">{generatedHashtags.length}</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-medium text-sm hover:bg-slate-200 transition-all"
                >
                  {copied ? <><Check className="h-4 w-4 text-emerald-500" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy All</>}
                </button>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl">
                <div className="flex flex-wrap gap-2">
                  {generatedHashtags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium cursor-pointer hover:bg-pink-500/30 transition-all">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-pink-100 rounded-xl flex items-center justify-center"><Target className="h-5 w-5 text-pink-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">Targeted</h4><p className="text-xs text-slate-500">Niche-specific tags</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center"><TrendingUp className="h-5 w-5 text-purple-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">Trending</h4><p className="text-xs text-slate-500">Popular hashtags</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-indigo-100 rounded-xl flex items-center justify-center"><Eye className="h-5 w-5 text-indigo-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">More Reach</h4><p className="text-xs text-slate-500">Boost visibility</p></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
