"use client";

import { useState } from "react";
import { Grid, Copy, Download, RefreshCw, Sparkles, Square, Circle, Hexagon, Zap } from "lucide-react";

const iconStyles = [
  "Outline",
  "Filled",
  "Gradient",
  "3D",
  "Hand-drawn",
  "Pixel Art",
  "Neon",
  "Minimalist",
];

const iconSizes = [
  { label: "Small (24px)", value: "24" },
  { label: "Medium (32px)", value: "32" },
  { label: "Large (48px)", value: "48" },
  { label: "Extra Large (64px)", value: "64" },
];

interface IconResult {
  id: number;
  description: string;
  style: string;
  color: string;
  shape: string;
}

export default function AiIconGenerator() {
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("Outline");
  const [size, setSize] = useState("48");
  const [isGenerating, setIsGenerating] = useState(false);
  const [icons, setIcons] = useState<IconResult[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const generateIcons = async () => {
    if (!description.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const styles = [
        { style: "Outline", color: "from-slate-400 to-slate-600" },
        { style: "Filled", color: "from-blue-500 to-blue-700" },
        { style: "Gradient", color: "from-purple-500 to-pink-500" },
        { style: "3D", color: "from-amber-500 to-orange-600" },
      ];

      const newIcons: IconResult[] = styles.map((s, idx) => ({
        id: Date.now() + idx,
        description: description,
        style: s.style,
        color: s.color,
        shape: idx % 2 === 0 ? "square" : "circle",
      }));

      setIcons(newIcons);
      setIsGenerating(false);
    }, 2000);
  };

  const copyIcon = (id: number) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadIcon = (id: number) => {
    const link = document.createElement("a");
    link.download = `icon-${id}.svg`;
    link.click();
  };

  const resetForm = () => {
    setDescription("");
    setIcons([]);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <Grid className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Icon Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Generate custom icons based on descriptions and styles
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Describe the icon you need
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the icon (e.g., 'a camera for photography', 'heart for love', 'rocket for launch', 'gear for settings')..."
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none font-medium resize-none h-24"
              />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  <Zap className="h-4 w-4 inline mr-2" />
                  Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none font-medium bg-white"
                >
                  {iconStyles.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  <Square className="h-4 w-4 inline mr-2" />
                  Size
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none font-medium bg-white"
                >
                  {iconSizes.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={generateIcons}
                disabled={!description.trim() || isGenerating}
                className="flex-1 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-100 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Icons
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
          {icons.length > 0 && (
            <>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <h3 className="font-bold text-slate-800 uppercase text-sm mb-4">
                  Generated Icons ({icons.length})
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {icons.map((icon) => (
                    <div
                      key={icon.id}
                      className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-cyan-200 transition-all text-center"
                    >
                      {/* Icon Preview */}
                      <div className={`h-24 w-24 mx-auto rounded-xl bg-gradient-to-br ${icon.color} flex items-center justify-center mb-4`}>
                        {icon.shape === "circle" ? (
                          <Circle className="h-12 w-12 text-white" />
                        ) : (
                          <Hexagon className="h-12 w-12 text-white" />
                        )}
                      </div>

                      {/* Info */}
                      <p className="text-sm font-bold text-slate-700 mb-1">{icon.style}</p>
                      <p className="text-xs text-slate-500 mb-4">{size}px</p>

                      {/* Actions */}
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => copyIcon(icon.id)}
                          className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                          title="Copy"
                        >
                          {copiedId === icon.id ? (
                            <span className="text-xs text-green-600 font-bold">Copied!</span>
                          ) : (
                            <Copy className="h-4 w-4 text-slate-500" />
                          )}
                        </button>
                        <button
                          onClick={() => downloadIcon(icon.id)}
                          className="p-2 bg-cyan-100 rounded-lg hover:bg-cyan-200 transition-colors"
                          title="Download"
                        >
                          <Download className="h-4 w-4 text-cyan-600" />
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
          <div className="p-6 bg-cyan-50 rounded-2xl border border-cyan-100">
            <Sparkles className="h-8 w-8 text-cyan-600 mb-3" />
            <h3 className="font-bold text-cyan-800 mb-2">AI-Powered</h3>
            <p className="text-sm text-cyan-700">
              Generate unique icons from simple text descriptions.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <Grid className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-blue-800 mb-2">Multiple Styles</h3>
            <p className="text-sm text-blue-700">
              Choose from outline, filled, gradient, 3D, and more styles.
            </p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <Download className="h-8 w-8 text-indigo-600 mb-3" />
            <h3 className="font-bold text-indigo-800 mb-2">Export Ready</h3>
            <p className="text-sm text-indigo-700">
              Download icons in various sizes for web and mobile apps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
