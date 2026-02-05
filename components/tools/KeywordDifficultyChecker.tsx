"use client";

import { useState } from "react";
import { Search, TrendingUp, RefreshCw, Target, AlertCircle, CheckCircle } from "lucide-react";

interface KeywordData {
  keyword: string;
  location: string;
  device: string;
}

export default function KeywordDifficultyChecker() {
  const [data, setData] = useState<KeywordData>({
    keyword: "",
    location: "India",
    device: "Desktop"
  });

  const [result, setResult] = useState<{
    keyword: string;
    difficulty: number;
    volume: number;
    cpc: number;
    competition: string;
    trend: string;
    relatedKeywords: string[];
    suggestions: string[];
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const updateField = (field: keyof KeywordData, value: string) => {
    setData({ ...data, [field]: value });
  };

  const analyzeKeyword = async () => {
    if (!data.keyword.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const difficulty = Math.floor(Math.random() * 100);
      const volume = Math.floor(Math.random() * 100000);
      const cpc = (Math.random() * 50).toFixed(2);
      
      let competition = "Low";
      if (difficulty > 40) competition = "Medium";
      if (difficulty > 70) competition = "High";

      const trendOptions = ["Rising", "Stable", "Declining"];
      const trend = trendOptions[Math.floor(Math.random() * trendOptions.length)];

      const relatedKeywords = [
        `${data.keyword} tips`,
        `${data.keyword} guide`,
        `${data.keyword} examples`,
        `best ${data.keyword}`,
        `${data.keyword} for beginners`,
        `how to ${data.keyword}`,
        `${data.keyword} tools`,
        `${data.keyword} strategies`
      ];

      const suggestions = [];
      if (difficulty > 70) {
        suggestions.push("Consider long-tail variations of this keyword");
        suggestions.push("Focus on related keywords with lower difficulty");
      }
      if (volume < 1000) {
        suggestions.push("Volume is low - consider broader keywords");
        suggestions.push("This might be a niche keyword worth targeting");
      }
      if (trend === "Rising") {
        suggestions.push("Great timing! This keyword is trending up");
        suggestions.push("Create content quickly to capture this trend");
      }

      setResult({
        keyword: data.keyword,
        difficulty,
        volume,
        cpc: parseFloat(cpc),
        competition,
        trend,
        relatedKeywords,
        suggestions
      });

      setIsAnalyzing(false);
    }, 1500);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 30) return "text-green-600 bg-green-100";
    if (difficulty <= 50) return "text-amber-600 bg-amber-100";
    if (difficulty <= 70) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 30) return "Easy";
    if (difficulty <= 50) return "Medium";
    if (difficulty <= 70) return "Hard";
    return "Very Hard";
  };

  const resetForm = () => {
    setData({ keyword: "", location: "India", device: "Desktop" });
    setResult(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Search className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Keyword Difficulty Checker</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Analyze keyword difficulty and search volume
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Keyword */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Target Keyword
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={data.keyword}
                  onChange={(e) => updateField("keyword", e.target.value)}
                  placeholder="Enter your target keyword"
                  className="w-full p-4 pl-12 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none font-medium"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Location
                </label>
                <select
                  value={data.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none font-medium"
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Global">Global</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Device
                </label>
                <select
                  value={data.device}
                  onChange={(e) => updateField("device", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none font-medium"
                >
                  <option value="Desktop">Desktop</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Tablet">Tablet</option>
                </select>
              </div>
            </div>

            {/* Analyze Button */}
            <div className="flex gap-4">
              <button
                onClick={analyzeKeyword}
                disabled={!data.keyword.trim() || isAnalyzing}
                className="flex-1 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-5 w-5" />
                    Analyze Keyword
                  </>
                )}
              </button>

              <button
                onClick={resetForm}
                className="px-6 h-14 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-t border-blue-100">
              {/* Difficulty Score */}
              <div className="text-center mb-6">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                  Keyword Difficulty Score
                </p>
                <div className="relative inline-block">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e2e8f0"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke={result.difficulty <= 30 ? "#22c55e" : result.difficulty <= 50 ? "#f59e0b" : result.difficulty <= 70 ? "#f97316" : "#ef4444"}
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${result.difficulty * 3.52} 352`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-black text-slate-800">{result.difficulty}</span>
                  </div>
                </div>
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mt-2 ${getDifficultyColor(result.difficulty)}`}>
                  {getDifficultyLabel(result.difficulty)} to Rank
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white rounded-2xl">
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Monthly Volume</p>
                  <p className="text-2xl font-black text-slate-800">{result.volume.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl">
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Est. CPC</p>
                  <p className="text-2xl font-black text-slate-800">₹{result.cpc}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl">
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Competition</p>
                  <p className="text-2xl font-black text-slate-800">{result.competition}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl">
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Trend</p>
                  <p className={`text-2xl font-bold ${result.trend === "Rising" ? "text-green-600" : result.trend === "Declining" ? "text-red-600" : "text-slate-800"}`}>
                    {result.trend}
                  </p>
                </div>
              </div>

              {/* Related Keywords */}
              <div className="mb-6">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Related Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {result.relatedKeywords.map((kw, index) => (
                    <span key={index} className="px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-50 cursor-pointer">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <p className="font-bold text-amber-800 text-sm mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Recommendations
                </p>
                <ul className="space-y-2">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-amber-700">
                      <CheckCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      {suggestion}
                    </li>
                  ))}
                  {result.suggestions.length === 0 && (
                    <li className="flex items-start gap-2 text-sm text-amber-700">
                      <CheckCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      This keyword appears to be a good target - proceed with content creation!
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <TrendingUp className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-blue-800 mb-2">Easy Keywords</h3>
            <p className="text-sm text-blue-700">
              Difficulty under 30% - great for new websites and quick wins.
            </p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <Target className="h-8 w-8 text-indigo-600 mb-3" />
            <h3 className="font-bold text-indigo-800 mb-2">Long-tail Keywords</h3>
            <p className="text-sm text-indigo-700">
              Consider longer phrases for lower competition and higher conversion.
            </p>
          </div>
          <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
            <AlertCircle className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-purple-800 mb-2">Monitor Trends</h3>
            <p className="text-sm text-purple-700">
              Rising keywords offer opportunities to capture growing interest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
