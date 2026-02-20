"use client";

import { useState } from "react";
import { Copy, Check, AlignJustify, Eye, RefreshCw } from "lucide-react";

type LineHeightUnit = 'unitless' | 'px' | 'em' | 'percent';

export default function LineHeightCalculator() {
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [lineHeightUnit, setLineHeightUnit] = useState<LineHeightUnit>("unitless");
  const [copied, setCopied] = useState(false);
  const [previewText, setPreviewText] = useState("The quick brown fox jumps over the lazy dog. Typography is the art of arranging type to make written language legible, readable, and appealing when displayed.");
  const [fontFamily, setFontFamily] = useState("sans-serif");

  const calculatedLineHeightPx = lineHeightUnit === 'unitless' || lineHeightUnit === 'em' 
    ? fontSize * lineHeight 
    : lineHeightUnit === 'px' 
      ? lineHeight 
      : (lineHeight / 100) * fontSize;

  const calculateOptimalLineHeight = () => {
    // Optimal line height decreases as font size increases
    const optimalRatio = 1.4 + (1000 / (fontSize * 10)) * 0.1;
    return Math.min(Math.max(optimalRatio, 1.2), 2);
  };

  const generateCSS = () => {
    if (lineHeightUnit === 'px') {
      return `font-size: ${fontSize}px;
line-height: ${lineHeight}px;`;
    } else if (lineHeightUnit === 'em') {
      return `font-size: ${fontSize}px;
line-height: ${lineHeight}em;`;
    } else if (lineHeightUnit === 'percent') {
      return `font-size: ${fontSize}px;
line-height: ${lineHeight}%;`;
    }
    return `font-size: ${fontSize}px;
line-height: ${lineHeight};`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCSS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineHeightPresets = [
    { label: "Compact", ratio: 1.1 },
    { label: "Tight", ratio: 1.25 },
    { label: "Optimal", ratio: calculateOptimalLineHeight() },
    { label: "Standard", ratio: 1.5 },
    { label: "Relaxed", ratio: 1.75 },
    { label: "Double", ratio: 2 },
  ];

  const fontOptions = [
    { value: "sans-serif", label: "Sans Serif" },
    { value: "serif", label: "Serif" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Helvetica, sans-serif", label: "Helvetica" },
    { value: "Verdana, sans-serif", label: "Verdana" },
  ];

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-emerald-200">
                <AlignJustify className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Line Height Calculator</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Readability Engine</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Font Size</label>
                <span className="text-[9px] font-black text-emerald-600 uppercase">{fontSize}px</span>
              </div>
              
              <input
                type="range"
                min={8}
                max={72}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-20 h-10 px-3 bg-slate-50 rounded-xl font-bold text-center text-sm"
                />
                <span className="text-xs text-slate-400 font-bold">px</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Line Height</label>
                <span className="text-[9px] font-black text-emerald-600 uppercase">{lineHeight}</span>
              </div>
              
              <input
                type="range"
                min={0.8}
                max={3}
                step={0.05}
                value={lineHeight}
                onChange={(e) => setLineHeight(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
              />
              <select
                value={lineHeightUnit}
                onChange={(e) => setLineHeightUnit(e.target.value as LineHeightUnit)}
                className="w-full h-10 px-3 bg-slate-50 rounded-xl font-bold text-center text-sm"
              >
                <option value="unitless">Unitless</option>
                <option value="px">px</option>
                <option value="em">em</option>
                <option value="percent">%</option>
              </select>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Preview Font</label>
                <span className="text-[9px] font-black text-emerald-600 uppercase">Family</span>
              </div>
              
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full h-14 px-4 bg-slate-50 rounded-[24px] font-bold text-sm border border-slate-100"
              >
                {fontOptions.map((font) => (
                  <option key={font.value} value={font.value}>{font.label}</option>
                ))}
              </select>

              <div className="bg-emerald-50 rounded-[16px] p-4 border border-emerald-100">
                <div className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider mb-2">Calculated</div>
                <div className="text-2xl font-black text-emerald-700">{calculatedLineHeightPx.toFixed(1)}px</div>
                <div className="text-[9px] text-emerald-500">total line height</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Presets</label>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Quick Set</span>
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {lineHeightPresets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setLineHeight(preset.ratio)}
                  className="h-12 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 font-bold text-[10px] uppercase tracking-wider transition-all"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Preview</label>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-slate-300" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Typography</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-[24px] p-8 border border-slate-100">
              <textarea
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                className="w-full bg-transparent resize-none focus:outline-none"
                style={{
                  fontFamily: fontFamily,
                  fontSize: `${fontSize}px`,
                  lineHeight: lineHeightUnit === 'unitless' 
                    ? lineHeight 
                    : lineHeightUnit === 'px' 
                      ? `${lineHeight}px`
                      : lineHeightUnit === 'em'
                        ? `${lineHeight}em`
                        : `${lineHeight}%`
                }}
                rows={4}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">CSS Output</label>
              </div>
              
              <div className="relative">
                <pre className="bg-slate-900 rounded-[24px] p-6 overflow-x-auto">
                  <code className="text-emerald-400 font-mono text-sm">{generateCSS()}</code>
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-slate-700 transition-all"
                >
                  {copied ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5 text-slate-400" />}
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Readability Score</label>
              </div>
              
              <div className="bg-white rounded-[24px] p-6 border border-slate-100">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-32 h-16">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                      />
                      <circle
                        cx="64"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke={lineHeight >= 1.4 && lineHeight <= 1.8 ? "#10b981" : "#f59e0b"}
                        strokeWidth="8"
                        strokeDasharray={`${(lineHeight / 3) * 176} 176`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-slate-800">
                    {lineHeight >= 1.4 && lineHeight <= 1.8 ? "Excellent" : lineHeight >= 1.2 ? "Good" : "Poor"}
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                    {lineHeight >= 1.4 && lineHeight <= 1.8 ? "Optimal readability" : lineHeight >= 1.2 ? "Acceptable" : "Too tight"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-slate-50">
            <button
              onClick={() => { setLineHeight(1.5); setFontSize(16); }}
              className="h-16 px-8 bg-slate-100 text-slate-400 rounded-[24px] hover:bg-red-50 hover:text-red-600 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-3 font-black uppercase tracking-widest"
            >
              <RefreshCw className="h-6 w-6" />
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
