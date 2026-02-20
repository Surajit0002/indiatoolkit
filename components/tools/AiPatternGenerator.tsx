"use client";

import { useState } from "react";
import { Layers, Download, RefreshCw, Sparkles, Grid, Hexagon, Circle as CircleIcon } from "lucide-react";

const patternStyles = [
  "Geometric",
  "Organic",
  "Floral",
  "Abstract",
  "Stripes",
  "Polka Dots",
  "Chevron",
  "Memphis",
  "Minimal",
  "Vintage",
];

const patternColors = [
  { name: "Ocean", value: "from-blue-400 to-cyan-300" },
  { name: "Sunset", value: "from-orange-400 to-pink-400" },
  { name: "Forest", value: "from-green-400 to-emerald-300" },
  { name: "Lavender", value: "from-purple-400 to-violet-300" },
  { name: "Monochrome", value: "from-slate-400 to-slate-200" },
];

interface PatternResult {
  id: number;
  description: string;
  style: string;
  colorTheme: string;
}

export default function AiPatternGenerator() {
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("Geometric");
  const [colorTheme, setColorTheme] = useState("Ocean");
  const [isGenerating, setIsGenerating] = useState(false);
  const [patterns, setPatterns] = useState<PatternResult[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const generatePatterns = async () => {
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const newPatterns: PatternResult[] = [
        {
          id: Date.now(),
          description: description || "Seamless pattern",
          style: style,
          colorTheme: colorTheme,
        },
        {
          id: Date.now() + 1,
          description: description || "Seamless pattern",
          style: style,
          colorTheme: "Sunset",
        },
        {
          id: Date.now() + 2,
          description: description || "Seamless pattern",
          style: "Abstract",
          colorTheme: colorTheme,
        },
        {
          id: Date.now() + 3,
          description: description || "Seamless pattern",
          style: "Geometric",
          colorTheme: "Lavender",
        },
      ];

      setPatterns(newPatterns);
      setIsGenerating(false);
    }, 2000);
  };

  const copyPattern = (id: number) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadPattern = (id: number) => {
    const link = document.createElement("a");
    link.download = `pattern-${id}.png`;
    link.click();
  };

  const resetForm = () => {
    setDescription("");
    setPatterns([]);
  };

  const getPatternGradient = (pattern: PatternResult) => {
    const colorObj = patternColors.find((c) => c.name === pattern.colorTheme);
    return colorObj?.value || "from-slate-400 to-slate-200";
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <Layers className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Pattern Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Generate seamless patterns based on descriptions and styles
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Describe your pattern
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the pattern (e.g., 'floating geometric shapes', 'interlocking circles', 'abstract waves')..."
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-rose-500 focus:outline-none font-medium resize-none h-24"
              />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  <Grid className="h-4 w-4 inline mr-2" />
                  Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-rose-500 focus:outline-none font-medium bg-white"
                >
                  {patternStyles.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  <Hexagon className="h-4 w-4 inline mr-2" />
                  Color Theme
                </label>
                <select
                  value={colorTheme}
                  onChange={(e) => setColorTheme(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-rose-500 focus:outline-none font-medium bg-white"
                >
                  {patternColors.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={generatePatterns}
                disabled={isGenerating}
                className="flex-1 h-14 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-100 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Patterns
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
          {patterns.length > 0 && (
            <>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <h3 className="font-bold text-slate-800 uppercase text-sm mb-4">
                  Generated Patterns ({patterns.length})
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {patterns.map((pattern) => (
                    <div
                      key={pattern.id}
                      className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-rose-200 transition-all"
                    >
                      {/* Pattern Preview */}
                      <div
                        className={`h-32 bg-gradient-to-br ${getPatternGradient(pattern)} flex items-center justify-center`}
                      >
                        <CircleIcon className="h-8 w-8 text-white opacity-30" />
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <p className="text-sm font-bold text-slate-800">{pattern.style}</p>
                        <p className="text-xs text-slate-500">{pattern.colorTheme}</p>
                      </div>

                      {/* Actions */}
                      <div className="px-4 pb-4 flex gap-2">
                        <button
                          onClick={() => copyPattern(pattern.id)}
                          className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all"
                        >
                          {copiedId === pattern.id ? "Copied!" : "Copy"}
                        </button>
                        <button
                          onClick={() => downloadPattern(pattern.id)}
                          className="flex-1 py-2 bg-rose-100 text-rose-700 rounded-xl text-xs font-bold hover:bg-rose-200 transition-all"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
            <Sparkles className="h-8 w-8 text-rose-600 mb-3" />
            <h3 className="font-bold text-rose-800 mb-2">AI-Powered</h3>
            <p className="text-sm text-rose-700">
              Generate unique seamless patterns from your descriptions.
            </p>
          </div>
          <div className="p-6 bg-pink-50 rounded-2xl border border-pink-100">
            <Layers className="h-8 w-8 text-pink-600 mb-3" />
            <h3 className="font-bold text-pink-800 mb-2">Seamless</h3>
            <p className="text-sm text-pink-700">
              All patterns are designed to tile perfectly without visible seams.
            </p>
          </div>
          <div className="p-6 bg-fuchsia-50 rounded-2xl border border-fuchsia-100">
            <Download className="h-8 w-8 text-fuchsia-600 mb-3" />
            <h3 className="font-bold text-fuchsia-800 mb-2">Export Ready</h3>
            <p className="text-sm text-fuchsia-700">
              Download patterns in high resolution for any use case.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
