"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Copy, Check, RefreshCw } from "lucide-react";

interface Shade {
  hex: string;
  rgb: string;
  hsl: string;
  name: string;
}

export default function ColorShadeGenerator() {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [shades, setShades] = useState<Shade[]>([]);
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

  const generateShades = () => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const shadeNames = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
    const lightnessValues = [98, 94, 86, 74, 60, 48, 40, 32, 24, 16, 8];

    const newShades: Shade[] = shadeNames.map((name, i) => {
      const newL = lightnessValues[i];
      const newRgb = hslToRgb(hsl.h, hsl.s, newL);
      const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);

      return {
        hex,
        rgb: `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${newL}%)`,
        name: `Shade ${name}`
      };
    });

    setShades(newShades);
  };

  useEffect(() => {
    generateShades();
  }, [baseColor]);

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
            <div className="p-3 bg-amber-100 rounded-2xl">
              <Sun className="h-6 w-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Color Shade Generator</h2>
          </div>
          <p className="text-gray-500">Generate lighter and darker shades of a color</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-1 space-y-3 w-full">
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

            <button
              onClick={generateShades}
              className="h-14 px-6 bg-amber-600 text-white rounded-xl flex items-center gap-2 hover:bg-amber-700 transition-colors font-medium"
            >
              <RefreshCw className="h-5 w-5" />
              Generate Shades
            </button>
          </div>
        </div>

        {/* Shade Strip */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Moon className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">Generated Shades</h3>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {shades.map((shade, index) => (
              <div key={index} className="flex-1 group">
                <div
                  className="h-20 md:h-32 rounded-xl shadow-inner border border-gray-100 flex items-center justify-center cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: shade.hex }}
                  onClick={() => copyToClipboard(shade.hex, index)}
                >
                  <span
                    className="font-bold text-lg md:text-2xl opacity-0 group-hover:opacity-100 transition-opacity px-2"
                    style={{ color: getContrastColor(shade.hex) }}
                  >
                    {shade.hex}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{shade.name}</span>
                  <button
                    onClick={() => copyToClipboard(shade.hex, index)}
                    className="h-6 w-6 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    {copiedIndex === index ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Color Values */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">All Color Values</h3>
          <div className="space-y-3">
            {shades.map((shade, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div
                  className="w-12 h-12 rounded-xl shadow-inner border border-gray-200 shrink-0"
                  style={{ backgroundColor: shade.hex }}
                />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 uppercase w-16">Name</span>
                    <span className="text-sm font-medium text-gray-700">{shade.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 uppercase w-10">HEX</span>
                    <input
                      type="text"
                      readOnly
                      value={shade.hex}
                      className="flex-1 h-8 px-2 bg-white border border-gray-200 rounded-lg font-mono text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 uppercase w-10">RGB</span>
                    <input
                      type="text"
                      readOnly
                      value={shade.rgb}
                      className="flex-1 h-8 px-2 bg-white border border-gray-200 rounded-lg font-mono text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 uppercase w-10">HSL</span>
                    <input
                      type="text"
                      readOnly
                      value={shade.hsl}
                      className="flex-1 h-8 px-2 bg-white border border-gray-200 rounded-lg font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
