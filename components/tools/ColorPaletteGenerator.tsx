"use client";

import { useState, useEffect } from "react";
import { Palette, Copy, Check, RefreshCw, Settings } from "lucide-react";

interface ColorPalette {
  hex: string;
  rgb: string;
  hsl: string;
}

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [paletteType, setPaletteType] = useState<"analogous" | "monochromatic" | "triadic" | "tetradic" | "complementary">("analogous");
  const [palette, setPalette] = useState<ColorPalette[]>([]);
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
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
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

  const generatePalette = () => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    let newPalette: ColorPalette[] = [];

    switch (paletteType) {
      case "analogous":
        for (let i = -2; i <= 2; i++) {
          const newHsl = { ...hsl, h: (hsl.h + i * 30 + 360) % 360 };
          const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
          const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
          newPalette.push({
            hex,
            rgb: `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`,
            hsl: `hsl(${newHsl.h}, ${newHsl.s}%, ${newHsl.l}%)`
          });
        }
        break;

      case "monochromatic":
        for (let i = 0; i < 5; i++) {
          const newL = Math.max(10, Math.min(95, hsl.l + (i - 2) * 15));
          const newRgb = hslToRgb(hsl.h, hsl.s, newL);
          const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
          newPalette.push({
            hex,
            rgb: `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`,
            hsl: `hsl(${hsl.h}, ${hsl.s}%, ${newL}%)`
          });
        }
        break;

      case "triadic":
        [0, 120, 240].forEach((offset, i) => {
          const newHsl = { ...hsl, h: (hsl.h + offset) % 360 };
          const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
          const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
          newPalette.push({
            hex,
            rgb: `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`,
            hsl: `hsl(${newHsl.h}, ${newHsl.s}%, ${newHsl.l}%)`
          });
        });
        // Add variations
        [-20, 20].forEach((offset, i) => {
          const newHsl = { ...hsl, h: (hsl.h + offset) % 360, s: Math.max(0, hsl.s - 10) };
          const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
          const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
          newPalette.push({
            hex,
            rgb: `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`,
            hsl: `hsl(${newHsl.h}, ${newHsl.s}%, ${newHsl.l}%)`
          });
        });
        break;

      case "tetradic":
        [0, 90, 180, 270].forEach((offset) => {
          const newHsl = { ...hsl, h: (hsl.h + offset) % 360 };
          const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
          const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
          newPalette.push({
            hex,
            rgb: `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`,
            hsl: `hsl(${newHsl.h}, ${newHsl.s}%, ${newHsl.l}%)`
          });
        });
        break;

      case "complementary":
        const compHsl = { ...hsl, h: (hsl.h + 180) % 360 };
        const compRgb = hslToRgb(compHsl.h, compHsl.s, compHsl.l);
        const compHex = rgbToHex(compRgb.r, compRgb.g, compRgb.b);
        
        newPalette = [
          {
            hex: baseColor,
            rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
            hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
          },
          {
            hex: compHex,
            rgb: `rgb(${compRgb.r}, ${compRgb.g}, ${compRgb.b})`,
            hsl: `hsl(${compHsl.h}, ${compHsl.s}%, ${compHsl.l}%)`
          }
        ];
        // Add shades
        [0.7, 0.85, 1.15].forEach((factor, i) => {
          const newL = Math.max(10, Math.min(95, hsl.l * factor));
          const newRgb = hslToRgb(hsl.h, hsl.s, newL);
          const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
          newPalette.push({
            hex,
            rgb: `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`,
            hsl: `hsl(${hsl.h}, ${hsl.s}%, ${Math.round(newL)}%)`
          });
        });
        break;
    }

    setPalette(newPalette);
  };

  useEffect(() => {
    generatePalette();
  }, [baseColor, paletteType]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-indigo-100 rounded-2xl">
              <Palette className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Color Palette Generator</h2>
          </div>
          <p className="text-gray-500">Generate harmonious color palettes based on a base color</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Base Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="h-12 w-12 rounded-xl cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-1 h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl font-mono text-sm uppercase"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Palette Type</label>
              <select
                value={paletteType}
                onChange={(e) => setPaletteType(e.target.value as any)}
                className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="analogous">Analogous</option>
                <option value="monochromatic">Monochromatic</option>
                <option value="triadic">Triadic</option>
                <option value="tetradic">Tetradic</option>
                <option value="complementary">Complementary</option>
              </select>
            </div>
          </div>

          <button
            onClick={generatePalette}
            className="w-full h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors font-medium"
          >
            <RefreshCw className="h-5 w-5" />
            Generate New Palette
          </button>
        </div>

        {/* Palette Display */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">Generated Palette</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {palette.map((color, index) => (
              <div key={index} className="space-y-3">
                <div
                  className="h-24 rounded-2xl shadow-inner border border-gray-100 transition-transform hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={color.hex}
                      className="flex-1 h-8 px-2 bg-gray-50 border border-gray-100 rounded-lg font-mono text-xs text-center"
                    />
                    <button
                      onClick={() => copyToClipboard(color.hex, index)}
                      className="h-8 w-8 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-black transition-colors"
                    >
                      {copiedIndex === index ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Color Values */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Color Values</h3>
          <div className="space-y-4">
            {palette.map((color, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div
                  className="w-12 h-12 rounded-xl shadow-inner border border-gray-200 shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 uppercase w-10">HEX</span>
                    <input
                      type="text"
                      readOnly
                      value={color.hex}
                      className="flex-1 h-8 px-2 bg-white border border-gray-200 rounded-lg font-mono text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 uppercase w-10">RGB</span>
                    <input
                      type="text"
                      readOnly
                      value={color.rgb}
                      className="flex-1 h-8 px-2 bg-white border border-gray-200 rounded-lg font-mono text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 uppercase w-10">HSL</span>
                    <input
                      type="text"
                      readOnly
                      value={color.hsl}
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
