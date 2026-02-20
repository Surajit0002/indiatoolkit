"use client";

import { useState } from "react";
import { Eye, Check, X, Info, AlertTriangle } from "lucide-react";

interface ContrastResult {
  ratio: number;
  wcagAA: { normal: boolean; large: boolean };
  wcagAAA: { normal: boolean; large: boolean };
  isPass: boolean;
}

export default function ColorContrastChecker() {
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#FFFFFF");
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const calculateContrast = (hex1: string, hex2: string): ContrastResult => {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);

    if (!rgb1 || !rgb2) {
      return { ratio: 1, wcagAA: { normal: false, large: false }, wcagAAA: { normal: false, large: false }, isPass: false };
    }

    const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    const ratio = (lighter + 0.05) / (darker + 0.05);

    return {
      ratio: Math.round(ratio * 100) / 100,
      wcagAA: {
        normal: ratio >= 4.5,
        large: ratio >= 3
      },
      wcagAAA: {
        normal: ratio >= 7,
        large: ratio >= 4.5
      },
      isPass: ratio >= 4.5
    };
  };

  const result = calculateContrast(foreground, background);


  const getWCAGStatus = (pass: boolean) => pass ? (
    <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-semibold">
      <Check className="h-3 w-3" /> Pass
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-lg text-xs font-semibold">
      <X className="h-3 w-3" /> Fail
    </span>
  );

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-emerald-100 rounded-2xl">
              <Eye className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Color Contrast Checker</h2>
          </div>
          <p className="text-gray-500">Check WCAG contrast ratios for accessibility compliance</p>
        </div>

        {/* Color Inputs */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Foreground Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={foreground}
                  onChange={(e) => setForeground(e.target.value)}
                  className="h-14 w-14 rounded-xl cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={foreground}
                  onChange={(e) => setForeground(e.target.value)}
                  className="flex-1 h-14 px-4 bg-gray-50 border border-gray-100 rounded-xl font-mono text-sm uppercase"
                />
              </div>
              <div className="p-4 rounded-xl border border-gray-200" style={{ backgroundColor: foreground }}>
                <p className="text-xs font-bold uppercase text-gray-500">Preview</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Background Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="h-14 w-14 rounded-xl cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="flex-1 h-14 px-4 bg-gray-50 border border-gray-100 rounded-xl font-mono text-sm uppercase"
                />
              </div>
              <div className="p-4 rounded-xl border border-gray-200" style={{ backgroundColor: background }}>
                <p className="text-xs font-bold uppercase text-gray-500">Preview</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
          <div
            className="p-8 rounded-2xl border-2 border-dashed border-gray-200 text-center"
            style={{ backgroundColor: background, color: foreground }}
          >
            <p className="text-2xl font-bold mb-2">Sample Text</p>
            <p className="text-lg">This is how your text will appear</p>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Contrast Analysis</h3>

          {/* Main Ratio */}
          <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Contrast Ratio</p>
              <p className="text-4xl font-bold text-gray-900 mt-1">{result.ratio}:1</p>
            </div>
            <div className={`h-16 w-16 rounded-full flex items-center justify-center text-xl font-bold ${
              result.ratio >= 4.5 ? "bg-emerald-100 text-emerald-700" :
              result.ratio >= 3 ? "bg-yellow-100 text-yellow-700" :
              "bg-red-100 text-red-700"
            }`}>
              {result.ratio >= 4.5 ? "AA" : result.ratio >= 3 ? "AA*" : "F"}
            </div>
          </div>

          {/* WCAG Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* WCAG AA */}
            <div className="p-5 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-blue-500" />
                <h4 className="font-semibold text-gray-900">WCAG 2.1 AA</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Normal Text (4.5:1)</span>
                  {getWCAGStatus(result.wcagAA.normal)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Large Text (3:1)</span>
                  {getWCAGStatus(result.wcagAA.large)}
                </div>
              </div>
            </div>

            {/* WCAG AAA */}
            <div className="p-5 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h4 className="font-semibold text-gray-900">WCAG 2.1 AAA</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Normal Text (7:1)</span>
                  {getWCAGStatus(result.wcagAAA.normal)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Large Text (4.5:1)</span>
                  {getWCAGStatus(result.wcagAAA.large)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Presets</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Black on White", fg: "#000000", bg: "#FFFFFF" },
              { name: "White on Black", fg: "#FFFFFF", bg: "#000000" },
              { name: "Navy on Cream", fg: "#001f3f", bg: "#fdf6e3" },
              { name: "Dark on Light", fg: "#1a1a2e", bg: "#f8f9fa" },
            ].map((preset) => (
              <button
                key={preset.name}
                onClick={() => { setForeground(preset.fg); setBackground(preset.bg); }}
                className="p-4 rounded-xl border border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all text-left"
              >
                <div className="flex gap-1 mb-3">
                  <div className="w-6 h-6 rounded-lg border border-gray-200" style={{ backgroundColor: preset.bg }}>
                    <div className="w-full h-full rounded-lg" style={{ backgroundColor: preset.fg }} />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">{preset.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800 space-y-2">
              <p className="font-semibold">About WCAG Contrast Guidelines</p>
              <p>• <strong>AA Normal:</strong> Minimum contrast of 4.5:1 for normal text</p>
              <p>• <strong>AA Large:</strong> Minimum contrast of 3:1 for large text (18pt+ or 14pt bold)</p>
              <p>• <strong>AAA Normal:</strong> Enhanced contrast of 7:1 for normal text</p>
              <p>• <strong>AAA Large:</strong> Enhanced contrast of 4.5:1 for large text</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
