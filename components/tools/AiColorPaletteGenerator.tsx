"use client";

import { useState } from "react";
import { Palette, Copy, Download, RefreshCw, Sparkles, Sun, Moon, Droplets, Leaf } from "lucide-react";

const moods = [
  "Warm & Cozy",
  "Cool & Calm",
  "Energetic & Vibrant",
  "Elegant & Sophisticated",
  "Natural & Organic",
  "Modern & Tech",
  "Playful & Fun",
  "Minimalist & Clean",
  "Bold & Dramatic",
  "Soft & Dreamy",
];

interface ColorSwatch {
  hex: string;
  rgb: string;
  name: string;
}

interface PaletteResult {
  id: number;
  name: string;
  mood: string;
  colors: ColorSwatch[];
}

export default function AiColorPaletteGenerator() {
  const [description, setDescription] = useState("");
  const [mood, setMood] = useState("Modern & Tech");
  const [colorCount, setColorCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [palettes, setPalettes] = useState<PaletteResult[]>([]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const generatePalettes = async () => {
    if (!description.trim() && !mood) return;

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const moodColors: Record<string, string[][]> = {
        "Warm & Cozy": [["#FF6B6B", "#FF8E53", "#FFA07A", "#FFD93D", "#6BCB77"], ["#E17055", "#D63031", "#FDCB6E", "#E17055", "#FF7675"]],
        "Cool & Calm": [["#74B9FF", "#0984E3", "#81ECEC", "#00CEC9", "#6C5CE7"], ["#A29BFE", "#74B9FF", "#81ECEC", "#0984E3", "#6C5CE7"]],
        "Energetic & Vibrant": [["#FF0055", "#FF9900", "#FFFF00", "#00FF99", "#0099FF"], ["#FD79A8", "#E84393", "#FDCB6E", "#00B894", "#0984E3"]],
        "Elegant & Sophisticated": [["#2D3436", "#636E72", "#B2BEC3", "#DFE6E9", "#FFFFFF"], ["#2D3436", "#636E72", "#B2BEC3", "#DFE6E9", "#F8F9FA"]],
        "Natural & Organic": [["#6B8E23", "#8FBC8F", "#DEB887", "#F5DEB3", "#F0E68C"], ["#55A630", "#80B918", "#D9ED92", "#B5E48C", "#99D98C"]],
        "Modern & Tech": [["#0F0C29", "#302B63", "#24243E", "#4776E6", "#8E54E9"], ["#1A1A2E", "#16213E", "#0F3460", "#533483", "#E94560"]],
        "Playful & Fun": [["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#F38181"], ["#FF6B6B", "#4ECDC4", "#FFE66D", "#FFA07A", "#98DDCA"]],
        "Minimalist & Clean": [["#FFFFFF", "#F5F5F5", "#E0E0E0", "#BDBDBD", "#757575"], ["#FAFAFA", "#F5F5F5", "#EEEEEE", "#E0E0E0", "#BDBDBD"]],
        "Bold & Dramatic": [["#000000", "#1A1A1A", "#333333", "#4D4D4D", "#666666"], ["#2C3E50", "#34495E", "#1ABC9C", "#E74C3C", "#F39C12"]],
        "Soft & Dreamy": [["#FFE4E1", "#E6E6FA", "#F0F8FF", "#FFF0F5", "#E0FFFF"], ["#FFD1DC", "#C1E1C1", "#AEC6CF", "#B39EB5", "#FFB347"]],
      };

      const colors = moodColors[mood] || moodColors["Modern & Tech"];
      const newPalettes: PaletteResult[] = colors.slice(0, 2).map((colorSet, idx) => ({
        id: Date.now() + idx,
        name: `${mood} Palette ${idx + 1}`,
        mood: mood,
        colors: colorSet.slice(0, colorCount).map((hex) => ({
          hex,
          rgb: hexToRgb(hex),
          name: getColorName(hex),
        })),
      }));

      setPalettes(newPalettes);
      setIsGenerating(false);
    }, 1500);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : hex;
  };

  const getColorName = (hex: string) => {
    const names: Record<string, string> = {
      "#FF6B6B": "Coral Red",
      "#FF8E53": "Sunset Orange",
      "#0984E3": "Ocean Blue",
      "#6BCB77": "Fresh Green",
      "#6C5CE7": "Purple",
      "#00CEC9": "Teal",
      "#FD79A8": "Pink",
      "#E17055": "Terracotta",
    };
    return names[hex] || "Custom";
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const downloadPalette = (palette: PaletteResult) => {
    const css = `:root {\n${palette.colors.map((c, i) => `  --color-${i + 1}: ${c.hex}; /* ${c.name} */`).join("\n")}\n}`;
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${palette.name.toLowerCase().replace(/\s+/g, "-")}.css`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setDescription("");
    setPalettes([]);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Palette className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Color Palette Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Generate harmonious color palettes based on mood and description
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Describe your palette
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the mood, theme, or use case (e.g., 'morning coffee shop', 'tech startup', 'wedding invitation')..."
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none font-medium resize-none h-24"
              />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  <Sun className="h-4 w-4 inline mr-2" />
                  Mood
                </label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none font-medium bg-white"
                >
                  {moods.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  <Droplets className="h-4 w-4 inline mr-2" />
                  Number of Colors: {colorCount}
                </label>
                <input
                  type="range"
                  min="3"
                  max="8"
                  value={colorCount}
                  onChange={(e) => setColorCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-pink-500"
                />
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={generatePalettes}
                disabled={isGenerating}
                className="flex-1 h-14 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg shadow-pink-100 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Palettes
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
          {palettes.length > 0 && (
            <>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <h3 className="font-bold text-slate-800 uppercase text-sm mb-4">
                  Generated Palettes ({palettes.length})
                </h3>

                <div className="space-y-6">
                  {palettes.map((palette) => (
                    <div key={palette.id} className="bg-white rounded-2xl p-6 border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-slate-800">{palette.name}</h4>
                          <p className="text-sm text-slate-500">{palette.mood}</p>
                        </div>
                        <button
                          onClick={() => downloadPalette(palette)}
                          className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-xl text-sm font-bold hover:bg-pink-200 transition-all"
                        >
                          <Download className="h-4 w-4" />
                          Export CSS
                        </button>
                      </div>

                      {/* Color Swatches */}
                      <div className="flex gap-2">
                        {palette.colors.map((color, idx) => (
                          <div key={idx} className="flex-1 group">
                            <div
                              className="h-16 rounded-xl cursor-pointer transition-transform hover:scale-105"
                              style={{ backgroundColor: color.hex }}
                              onClick={() => copyColor(color.hex)}
                            />
                            <div className="mt-2 text-center">
                              <p className="text-xs font-bold text-slate-700">{color.hex}</p>
                              {copiedHex === color.hex && (
                                <p className="text-xs text-green-600">Copied!</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Color Info */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {palette.colors.map((color, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs">
                            {color.name}
                          </span>
                        ))}
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
          <div className="p-6 bg-pink-50 rounded-2xl border border-pink-100">
            <Sparkles className="h-8 w-8 text-pink-600 mb-3" />
            <h3 className="font-bold text-pink-800 mb-2">AI-Powered</h3>
            <p className="text-sm text-pink-700">
              Get color suggestions based on color theory and design principles.
            </p>
          </div>
          <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
            <Leaf className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-purple-800 mb-2">Harmonious</h3>
            <p className="text-sm text-purple-700">
              Colors that work well together based on proven color relationships.
            </p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <Download className="h-8 w-8 text-indigo-600 mb-3" />
            <h3 className="font-bold text-indigo-800 mb-2">Export Ready</h3>
            <p className="text-sm text-indigo-700">
              Export palettes as CSS variables, JSON, or copy hex codes directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
