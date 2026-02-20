"use client";

import { useState, useEffect, useCallback } from "react";
import { Palette, Copy, Check, Info, RefreshCw } from "lucide-react";

type HarmonyType = "complementary" | "analogous" | "triadic" | "tetradic" | "split-complementary" | "monochromatic";

interface HarmonyColor {
  hex: string;
  rgb: string;
  hsl: string;
  role: string;
}

interface HarmonyInfo {
  name: string;
  description: string;
  angle: number;
}

const harmonyInfo: Record<HarmonyType, HarmonyInfo> = {
  complementary: {
    name: "Complementary",
    description: "Colors opposite each other on the color wheel. Creates high contrast and vibrant looks.",
    angle: 180
  },
  analogous: {
    name: "Analogous",
    description: "Colors adjacent on the color wheel. Creates harmonious and cohesive designs.",
    angle: 30
  },
  triadic: {
    name: "Triadic",
    description: "Three colors equally spaced on the color wheel. Creates balanced and vibrant designs.",
    angle: 120
  },
  tetradic: {
    name: "Tetradic (Square)",
    description: "Four colors equally spaced on the color wheel. Creates rich and varied palettes.",
    angle: 90
  },
  "split-complementary": {
    name: "Split Complementary",
    description: "A color and the two colors adjacent to its complement. Creates contrast with less tension.",
    angle: 150
  },
  monochromatic: {
    name: "Monochromatic",
    description: "Different shades and tints of a single color. Creates clean and cohesive designs.",
    angle: 0
  }
};

export default function ColorHarmonyGenerator() {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [harmonyType, setHarmonyType] = useState<HarmonyType>("complementary");
  const [harmonyColors, setHarmonyColors] = useState<HarmonyColor[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r_norm: h = ((g_norm - b_norm) / d + (g_norm < b_norm ? 6 : 0)) / 6; break;
        case g_norm: h = ((b_norm - r_norm) / d + 2) / 6; break;
        case b_norm: h = ((r_norm - g_norm) / d + 4) / 6; break;
      }
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    const h_norm = h / 360, s_norm = s / 100, l_norm = l / 100;
    let r, g, b;

    if (s_norm === 0) {
      r = g = b = l_norm;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l_norm < 0.5 ? l_norm * (1 + s_norm) : l_norm + s_norm - l_norm * s_norm;
      const p = 2 * l_norm - q;
      r = hue2rgb(p, q, h_norm + 1/3);
      g = hue2rgb(p, q, h_norm);
      b = hue2rgb(p, q, h_norm - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  const generateHarmony = useCallback(() => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const angles: Record<HarmonyType, number[]> = {
      complementary: [0, 180],
      analogous: [-30, 0, 30],
      triadic: [0, 120, 240],
      tetradic: [0, 90, 180, 270],
      "split-complementary": [0, 150, 210],
      monochromatic: [0, 0, 0, 0, 0]
    };

    const selectedAngles = angles[harmonyType];
    const colors: HarmonyColor[] = selectedAngles.map((angle, index) => {
      let newH = hsl.h;
      let newS = hsl.s;
      let newL = hsl.l;

      if (harmonyType === "monochromatic") {
        newL = Math.max(10, Math.min(95, hsl.l + (index - 2) * 15));
        newS = Math.max(0, hsl.s - index * 5);
      } else {
        newH = (hsl.h + angle + 360) % 360;
      }

      const newRgb = hslToRgb(newH, newS, newL);
      const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);

      const roles = harmonyType === "complementary" 
        ? ["Base", "Complement"]
        : harmonyType === "triadic"
        ? ["Base", "Triad 1", "Triad 2"]
        : harmonyType === "tetradic"
        ? ["Base", "Tetrad 1", "Tetrad 2", "Tetrad 3"]
        : harmonyType === "monochromatic"
        ? ["Darkest", "Darker", "Base", "Lighter", "Lightest"]
        : ["Analogous 1", "Base", "Analogous 2"];

      return {
        hex,
        rgb: `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`,
        hsl: `hsl(${newH}, ${newS}%, ${newL}%)`,
        role: roles[index] || `Color ${index + 1}`
      };
    });

    setHarmonyColors(colors);
  }, [baseColor, harmonyType]);    
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateHarmony();
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [generateHarmony]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getContrastColor = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return "#000000";
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#FFFFFF";
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-linear-to-br from-pink-500 to-rose-500 rounded-2xl">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Color Harmony Generator</h2>
          </div>
          <p className="text-gray-500">Generate complementary, analogous, triadic, and other color harmonies</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Base Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="h-14 w-14 rounded-xl cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-1 h-14 px-4 bg-gray-50 border border-gray-100 rounded-xl font-mono text-sm uppercase"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Harmony Type</label>
              <select
                value={harmonyType}
                onChange={(e) => setHarmonyType(e.target.value as HarmonyType)}
                className="w-full h-14 px-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {Object.entries(harmonyInfo).map(([key, info]) => (
                  <option key={key} value={key}>{info.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Harmony Info */}
        <div className="bg-blue-50 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900">{harmonyInfo[harmonyType].name}</p>
              <p className="text-sm text-blue-800 mt-1">{harmonyInfo[harmonyType].description}</p>
            </div>
          </div>
        </div>

        {/* Color Wheel Preview */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Color Wheel Position</h3>
          <div className="flex justify-center">
            <div className="relative w-64 h-64 rounded-full border-4 border-gray-200">
              {harmonyColors.map((color, index) => {
                const hsl = color.hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
                if (!hsl) return null;
                const hue = parseInt(hsl[1]);
                const angle = (hue - 90) * (Math.PI / 180);
                const radius = 80;
                const x = 128 + radius * Math.cos(angle);
                const y = 128 + radius * Math.sin(angle);

                return (
                  <div
                    key={index}
                    className="absolute w-12 h-12 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125"
                    style={{
                      backgroundColor: color.hex,
                      left: x,
                      top: y
                    }}
                  />
                );
              })}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gray-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Generated Colors */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Generated Colors</h3>
            <button
              onClick={generateHarmony}
              className="h-10 px-4 bg-rose-600 text-white rounded-xl flex items-center gap-2 hover:bg-rose-700 transition-colors font-medium"
            >
              <RefreshCw className="h-4 w-4" /> Regenerate
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {harmonyColors.map((color, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <div
                  className="h-24 rounded-xl shadow-inner border border-gray-100 flex items-center justify-center mb-3"
                  style={{ backgroundColor: color.hex }}
                >
                  <span
                    className="font-bold text-xl"
                    style={{ color: getContrastColor(color.hex) }}
                  >
                    {color.hex}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{color.role}</span>
                    <button
                      onClick={() => copyToClipboard(color.hex, index)}
                      className="h-8 w-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-rose-600 hover:border-rose-300 transition-colors"
                    >
                      {copiedIndex === index ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      readOnly
                      value={color.hex}
                      className="h-8 px-2 bg-white border border-gray-200 rounded-lg font-mono text-xs text-center"
                    />
                    <input
                      type="text"
                      readOnly
                      value={color.rgb}
                      className="h-8 px-2 bg-white border border-gray-200 rounded-lg font-mono text-xs text-center"
                    />
                    <input
                      type="text"
                      readOnly
                      value={color.hsl}
                      className="h-8 px-2 bg-white border border-gray-200 rounded-lg font-mono text-xs text-center"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Tips */}
        <div className="bg-amber-50 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Palette className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800 space-y-2">
              <p className="font-semibold">Usage Tips</p>
              <p>• Use one color as dominant and others as accents</p>
              <p>• Complementary colors work best for highlights or call-to-action buttons</p>
              <p>• Analogous colors create a harmonious and comfortable feel</p>
              <p>• Triadic colors offer high contrast while retaining harmony</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
