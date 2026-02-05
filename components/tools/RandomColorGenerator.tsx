"use client";

import { useState } from "react";
import { Dices, Copy, Check, RefreshCw, Sparkles } from "lucide-react";

type ColorSpace = "hex" | "rgb" | "hsl" | "hsv";

interface RandomColor {
  hex: string;
  rgb: string;
  hsl: string;
  hsv: string;
}

export default function RandomColorGenerator() {
  const [colorSpace, setColorSpace] = useState<ColorSpace>("hex");
  const [includeAlpha, setIncludeAlpha] = useState(false);
  const [generatedColors, setGeneratedColors] = useState<RandomColor[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [lockedIndices, setLockedIndices] = useState<number[]>([]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number, includeAlpha: boolean, alpha?: number) => {
    const hex = ((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1).toUpperCase();
    return includeAlpha && alpha !== undefined ? `#${hex}${Math.round(alpha * 255).toString(16).padStart(2, "0").toUpperCase()}` : `#${hex}`;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    const r_norm = r / 255, g_norm = g / 255, b_norm = b / 255;
    const max = Math.max(r_norm, g_norm, b_norm), min = Math.min(r_norm, g_norm, b_norm);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r_norm: h = ((g_norm - b_norm) / d + (g_norm < b_norm ? 6 : 0)) / 6; break;
        case g_norm: h = ((b_norm - r_norm) / d + 2) / 6; break;
        case b_norm: h = ((r_norm - g_norm) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgbToHsv = (r: number, g: number, b: number) => {
    const r_norm = r / 255, g_norm = g / 255, b_norm = b / 255;
    const max = Math.max(r_norm, g_norm, b_norm), min = Math.min(r_norm, g_norm, b_norm);
    let h = 0, s = 0, v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max !== min) {
      switch (max) {
        case r_norm: h = ((g_norm - b_norm) / d + (g_norm < b_norm ? 6 : 0)) / 6; break;
        case g_norm: h = ((b_norm - r_norm) / d + 2) / 6; break;
        case b_norm: h = ((r_norm - g_norm) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100)
    };
  };

  const generateRandomColor = (): RandomColor => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const alpha = Math.random();

    const hex = rgbToHex(r, g, b, includeAlpha, alpha);
    const hsl = rgbToHsl(r, g, b);
    const hsv = rgbToHsv(r, g, b);

    return {
      hex,
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      hsv: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`
    };
  };

  const generateColors = (count: number = 8) => {
    setGeneratedColors((prev) => {
      const newColors = [...prev];
      for (let i = 0; i < count; i++) {
        if (!lockedIndices.includes(i) || newColors[i] === undefined) {
          newColors[i] = generateRandomColor();
        }
      }
      return newColors.slice(0, count);
    });
  };

  const generateSingleColor = (index: number) => {
    const newColors = [...generatedColors];
    newColors[index] = generateRandomColor();
    setGeneratedColors(newColors);
  };

  const toggleLock = (index: number) => {
    setLockedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getOutputValue = (color: RandomColor): string => {
    switch (colorSpace) {
      case "hex": return color.hex;
      case "rgb": return color.rgb;
      case "hsl": return color.hsl;
      case "hsv": return color.hsv;
      default: return color.hex;
    }
  };

  const clearAll = () => {
    setGeneratedColors([]);
    setLockedIndices([]);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-cyan-100 rounded-2xl">
              <Dices className="h-6 w-6 text-cyan-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Random Color Generator</h2>
          </div>
          <p className="text-gray-500">Generate random colors with various color spaces support</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Color Space</label>
              <div className="flex gap-2">
                {(["hex", "rgb", "hsl", "hsv"] as ColorSpace[]).map((space) => (
                  <button
                    key={space}
                    onClick={() => setColorSpace(space)}
                    className={`flex-1 h-10 rounded-xl text-sm font-medium transition-colors uppercase ${
                      colorSpace === space
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {space}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Options</label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeAlpha}
                  onChange={(e) => setIncludeAlpha(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                />
                <span className="text-sm text-gray-600">Include Alpha Channel</span>
              </label>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Actions</label>
              <div className="flex gap-2">
                <button
                  onClick={() => generateColors(8)}
                  className="flex-1 h-10 bg-cyan-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-700 transition-colors font-medium"
                >
                  <Sparkles className="h-4 w-4" /> Generate
                </button>
                <button
                  onClick={clearAll}
                  className="h-10 px-4 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Color Grid */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Generated Colors</h3>
            <button
              onClick={() => generateColors(8)}
              className="h-10 px-4 bg-cyan-600 text-white rounded-xl flex items-center gap-2 hover:bg-cyan-700 transition-colors font-medium"
            >
              <RefreshCw className="h-4 w-4" /> Regenerate
            </button>
          </div>

          {generatedColors.length === 0 ? (
            <div className="text-center py-12">
              <Dices className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">Click Generate to create random colors</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {generatedColors.map((color, index) => (
                <div key={index} className="space-y-3 group">
                  <div className="relative">
                    <div
                      className="h-28 rounded-xl shadow-inner border border-gray-100 transition-transform hover:scale-105"
                      style={{ backgroundColor: color.hex }}
                    />
                    <button
                      onClick={() => toggleLock(index)}
                      className={`absolute top-2 right-2 h-8 w-8 rounded-lg flex items-center justify-center transition-all ${
                        lockedIndices.includes(index)
                          ? "bg-amber-500 text-white"
                          : "bg-white/80 text-gray-400 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <Sparkles className={`h-4 w-4 ${lockedIndices.includes(index) ? "" : "fill-current"}`} />
                    </button>
                    <button
                      onClick={() => generateSingleColor(index)}
                      className="absolute bottom-2 left-2 h-8 w-8 rounded-lg bg-white/80 text-gray-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:text-cyan-600"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={getOutputValue(color)}
                        className="flex-1 h-9 px-3 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm text-center"
                      />
                      <button
                        onClick={() => copyToClipboard(getOutputValue(color), index)}
                        className="h-9 w-9 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-black transition-all"
                      >
                        {copiedIndex === index ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => copyToClipboard(color.hex, index)}
                        className="flex-1 h-7 bg-gray-100 rounded-lg text-xs font-mono text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        HEX
                      </button>
                      <button
                        onClick={() => copyToClipboard(color.rgb, index)}
                        className="flex-1 h-7 bg-gray-100 rounded-lg text-xs font-mono text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        RGB
                      </button>
                      <button
                        onClick={() => copyToClipboard(color.hsl, index)}
                        className="flex-1 h-7 bg-gray-100 rounded-lg text-xs font-mono text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        HSL
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-4">Quick Generate</h4>
          <div className="flex flex-wrap gap-3">
            {[4, 8, 12, 16].map((count) => (
              <button
                key={count}
                onClick={() => generateColors(count)}
                className="h-10 px-6 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-cyan-500 hover:text-cyan-600 transition-colors"
              >
                {count} Colors
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
