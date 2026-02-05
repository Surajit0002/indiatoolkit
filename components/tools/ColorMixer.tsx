"use client";

import { useState } from "react";
import { Blend, Plus, Trash2, Copy, Check, RefreshCw } from "lucide-react";

interface ColorInput {
  id: string;
  hex: string;
  weight: number;
}

export default function ColorMixer() {
  const [colors, setColors] = useState<ColorInput[]>([
    { id: "1", hex: "#ff0000", weight: 1 },
    { id: "2", hex: "#0000ff", weight: 1 },
  ]);
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1).toUpperCase();
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

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const mixColors = () => {
    let totalWeight = 0;
    let r = 0, g = 0, b = 0;

    colors.forEach((color) => {
      const rgb = hexToRgb(color.hex);
      if (rgb) {
        r += rgb.r * color.weight;
        g += rgb.g * color.weight;
        b += rgb.b * color.weight;
        totalWeight += color.weight;
      }
    });

    if (totalWeight === 0) {
      return { hex: "#000000", rgb: "rgb(0, 0, 0)", hsl: "hsl(0, 0%, 0%)" };
    }

    const finalR = r / totalWeight;
    const finalG = g / totalWeight;
    const finalB = b / totalWeight;
    const hex = rgbToHex(finalR, finalG, finalB);

    return {
      hex,
      rgb: `rgb(${Math.round(finalR)}, ${Math.round(finalG)}, ${Math.round(finalB)})`,
      hsl: rgbToHsl(finalR, finalG, finalB)
    };
  };

  const addColor = () => {
    setColors([...colors, { id: Date.now().toString(), hex: "#808080", weight: 1 }]);
  };

  const removeColor = (id: string) => {
    if (colors.length > 2) {
      setColors(colors.filter((c) => c.id !== id));
    }
  };

  const updateColor = (id: string, hex: string) => {
    setColors(colors.map((c) => c.id === id ? { ...c, hex } : c));
  };

  const updateWeight = (id: string, weight: number) => {
    setColors(colors.map((c) => c.id === id ? { ...c, weight: Math.max(0.1, weight) } : c));
  };

  const resetColors = () => {
    setColors([
      { id: "1", hex: "#ff0000", weight: 1 },
      { id: "2", hex: "#0000ff", weight: 1 },
    ]);
  };

  const result = mixColors();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-purple-100 rounded-2xl">
              <Blend className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Color Mixer</h2>
          </div>
          <p className="text-gray-500">Mix two or more colors to create new shades</p>
        </div>

        {/* Color Inputs */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Colors to Mix</h3>
            <div className="flex gap-2">
              <button
                onClick={resetColors}
                className="h-10 px-4 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" /> Reset
              </button>
              <button
                onClick={addColor}
                className="h-10 px-4 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Add Color
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {colors.map((color, index) => (
              <div key={color.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-500 w-6">{index + 1}</span>
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e) => updateColor(color.id, e.target.value)}
                  className="h-12 w-12 rounded-xl cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={color.hex}
                  onChange={(e) => updateColor(color.id, e.target.value)}
                  className="w-28 h-12 px-3 bg-white border border-gray-200 rounded-xl font-mono text-sm uppercase"
                />
                <div className="flex-1 space-y-1">
                  <label className="text-xs font-medium text-gray-500">Weight: {color.weight}x</label>
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={color.weight}
                    onChange={(e) => updateWeight(color.id, parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <button
                  onClick={() => removeColor(color.id)}
                  disabled={colors.length <= 2}
                  className="h-10 w-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Mixed Result</h3>

          <div className="flex flex-col md:flex-row gap-8">
            <div
              className="w-full md:w-40 h-40 rounded-3xl shadow-inner border-4 border-gray-100 flex items-center justify-center transition-colors duration-300"
              style={{ backgroundColor: result.hex }}
            >
              <span className={`font-black text-2xl drop-shadow-sm ${parseInt(result.hex.slice(1), 16) > 0xFFFFFF / 2 ? "text-black" : "text-white"}`}>
                {result.hex}
              </span>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "HEX", value: result.hex },
                  { label: "RGB", value: result.rgb },
                  { label: "HSL", value: result.hsl }
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={item.value}
                        className="flex-1 h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl font-mono text-sm"
                      />
                      <button
                        onClick={() => copyToClipboard(item.value)}
                        className="h-12 w-12 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-black transition-all"
                      >
                        {copied ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Color Bars */}
              <div className="flex h-12 rounded-xl overflow-hidden mt-6">
                {colors.map((color, index) => (
                  <div
                    key={color.id}
                    className="flex-1 transition-all duration-300"
                    style={{
                      backgroundColor: color.hex,
                      flex: color.weight
                    }}
                  />
                ))}
              </div>
              <p className="text-xs text-center text-gray-400">Color proportions based on weights</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-amber-50 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Blend className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800 space-y-2">
              <p className="font-semibold">Mixing Tips</p>
              <p>• Higher weight values give a color more influence in the mix</p>
              <p>• Use equal weights for a balanced 50/50 mix</p>
              <p>• Complementary colors (opposite on color wheel) create neutral grays</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
