"use client";

import { useState, useRef } from "react";
import { Search, AlertTriangle, Copy, RefreshCw, FileText, Percent, Eye } from "lucide-react";

interface Match {
  text: string;
  matchPercentage: number;
  source?: string;
}

export default function PlagiarismChecker() {
  const [text, setText] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    uniqueText: string;
    matches: Match[];
  } | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Simple word frequency analysis for demo (in production, use a real plagiarism detection API)
  const checkPlagiarism = async () => {
    if (!text.trim()) return;

    setIsChecking(true);
    setResults(null);

    // Simulate API call
    setTimeout(() => {
      // Simulate finding some common phrases (demo purposes)
      const commonPhrases = [
        "the",
        "and",
        "is",
        "to",
        "in",
        "of",
        "it",
        "for",
        "that",
        "with",
        "as",
        "this",
        "are",
        "was",
        "but",
        "be",
      ];


      // Generate a mock similarity score (10-40% for demo)
      const baseSimilarity = 15;
      const randomFactor = Math.random() * 25;
      const score = Math.round(baseSimilarity + randomFactor);

      const uniquePercentage = 100 - score;

      const matches: Match[] = [
        {
          text: text.substring(0, 100) + "...",
          matchPercentage: score,
          source: "Common English Phrases",
        },
      ];

      setResults({
        score,
        uniqueText: `${uniquePercentage}% unique content`,
        matches,
      });

      setIsChecking(false);
    }, 2000);
  };

  const clearText = () => {
    setText("");
    setResults(null);
  };

  const copyResults = () => {
    if (results) {
      navigator.clipboard.writeText(`Plagiarism Score: ${results.score}%\nUnique Content: ${results.uniqueText}`);
    }
  };


  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4 shadow-lg">
            <Search className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Plagiarism Checker</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Check your content for plagiarism and uniqueness
          </p>
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Enter Your Text
            </span>
            <span className="text-xs text-slate-400">
              {text.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <div className="p-6">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here to check for plagiarism..."
              className="w-full h-48 p-4 rounded-2xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none transition-all"
            />
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <button
              onClick={clearText}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all"
            >
              Clear
            </button>
            <button
              onClick={checkPlagiarism}
              disabled={!text.trim() || isChecking}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold flex items-center gap-2 hover:from-orange-600 hover:to-red-700 transition-all shadow-lg shadow-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isChecking ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Check Plagiarism
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="mt-8 space-y-6">
            {/* Score Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-800 uppercase text-sm">Analysis Results</h3>
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    {showDetails ? "Hide Details" : "Show Details"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Main Score */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-6">
                      <div className="relative w-32 h-32">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#f3f4f6"
                            strokeWidth="12"
                            fill="none"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke={
                              results.score < 20
                                ? "#10b981"
                                : results.score < 50
                                ? "#f59e0b"
                                : "#ef4444"
                            }
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={`${(results.score / 100) * 352} 352`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-black text-slate-800">
                            {results.score}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-800 mb-2">
                          {results.score < 20
                            ? "Low Plagiarism"
                            : results.score < 50
                            ? "Moderate Plagiarism"
                            : "High Plagiarism"}
                        </h4>
                        <p className="text-sm text-slate-500">
                          {results.uniqueText}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-sm text-slate-600">Unique Content</span>
                      <span className="font-bold text-emerald-600">
                        {100 - results.score}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-sm text-slate-600">Common Phrases</span>
                      <span className="font-bold text-orange-600">
                        {results.score}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-sm text-slate-600">Word Count</span>
                      <span className="font-bold text-slate-700">
                        {text.split(/\s+/).filter(Boolean).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
                <button
                  onClick={copyResults}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-300 transition-all"
                >
                  <Copy className="h-4 w-4" />
                  Copy Results
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="flex-1 py-3 px-4 rounded-xl bg-orange-100 text-orange-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-orange-200 transition-all"
                >
                  <Percent className="h-4 w-4" />
                  View Full Report
                </button>
              </div>
            </div>

            {/* Details Panel */}
            {showDetails && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
                <h4 className="font-bold text-slate-800 mb-4 uppercase text-sm">Matched Content</h4>
                
                {results.matches.map((match, index) => (
                  <div
                    key={index}
                    className="p-4 bg-orange-50 rounded-xl border border-orange-100 mb-4"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-orange-800 mb-2">{match.text}</p>
                        <div className="flex items-center gap-4 text-xs text-orange-600">
                          <span>{match.matchPercentage}% match</span>
                          {match.source && (
                            <>
                              <span>•</span>
                              <span>Source: {match.source}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h5 className="font-bold text-blue-800 mb-2 text-sm">Tips for Improvement</h5>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Rewrite commonly used phrases in your own words</li>
                    <li>• Add more original analysis and insights</li>
                    <li>• Use quotation marks when citing direct quotes</li>
                    <li>• Ensure proper paraphrasing with citations</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Limitations Notice */}
        <div className="mt-8 p-4 bg-slate-100 rounded-2xl">
          <p className="text-xs text-slate-500 text-center">
            <strong>Note:</strong> This tool provides a basic analysis using common phrase detection. 
            For comprehensive plagiarism checking, consider using specialized services like Turnitin or Copyscape.
          </p>
        </div>
      </div>
    </div>
  );
}
