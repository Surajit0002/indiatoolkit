"use client";

import { useState } from "react";
import { Copy, Check, Type, Palette, Eye, RefreshCw, Sliders, Bold, Italic, Underline } from "lucide-react";

const webFonts = [
  { name: "Inter", family: "'Inter', sans-serif", category: "sans-serif" },
  { name: "Roboto", family: "'Roboto', sans-serif", category: "sans-serif" },
  { name: "Open Sans", family: "'Open Sans', sans-serif", category: "sans-serif" },
  { name: "Lato", family: "'Lato', sans-serif", category: "sans-serif" },
  { name: "Montserrat", family: "'Montserrat', sans-serif", category: "sans-serif" },
  { name: "Poppins", family: "'Poppins', sans-serif", category: "sans-serif" },
  { name: "Playfair Display", family: "'Playfair Display', serif", category: "serif" },
  { name: "Merriweather", family: "'Merriweather', serif", category: "serif" },
  { name: "Lora", family: "'Lora', serif", category: "serif" },
  { name: "PT Serif", family: "'PT Serif', serif", category: "serif" },
  { name: "Roboto Mono", family: "'Roboto Mono', monospace", category: "monospace" },
  { name: "Fira Code", family: "'Fira Code', monospace", category: "monospace" },
  { name: "Source Code Pro", family: "'Source Code Pro', monospace", category: "monospace" },
  { name: "Pacifico", family: "'Pacifico', cursive", category: "handwriting" },
  { name: "Dancing Script", family: "'Dancing Script', cursive", category: "handwriting" },
  { name: "Abril Fatface", family: "'Abril Fatface', cursive", category: "display" },
  { name: "Bebas Neue", family: "'Bebas Neue', cursive", category: "display" },
  { name: "Oswald", family: "'Oswald', sans-serif", category: "display" },
];

export default function FontPreviewTool() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog");
  const [selectedFont, setSelectedFont] = useState(webFonts[0]);
  const [fontSize, setFontSize] = useState(32);
  const [fontWeight, setFontWeight] = useState(400);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [copied, setCopied] = useState(false);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("left");
  const [fontStyle, setFontStyle] = useState<"normal" | "italic">("normal");
  const [textDecoration, setTextDecoration] = useState<"none" | "underline" | "line-through">("none");

  const categories = [...new Set(webFonts.map((f) => f.category))];

  const handleCopy = () => {
    const css = `font-family: ${selectedFont.family};
font-size: ${fontSize}px;
font-weight: ${fontWeight};
font-style: ${fontStyle};
text-decoration: ${textDecoration};
letter-spacing: ${letterSpacing}px;
line-height: ${lineHeight};
text-align: ${textAlign};`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateCSS = () => {
    return `.preview-text {
  font-family: ${selectedFont.family};
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  font-style: ${fontStyle};
  text-decoration: ${textDecoration};
  letter-spacing: ${letterSpacing}px;
  line-height: ${lineHeight};
  text-align: ${textAlign};
}`;
  };

  const fontWeights = [
    { value: 100, label: "Thin" },
    { value: 200, label: "Extra Light" },
    { value: 300, label: "Light" },
    { value: 400, label: "Regular" },
    { value: 500, label: "Medium" },
    { value: 600, label: "Semi Bold" },
    { value: 700, label: "Bold" },
    { value: 800, label: "Extra Bold" },
    { value: 900, label: "Black" },
  ];

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-orange-200">
                <Type className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Font Preview Tool</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Real-time Typography</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Preview Text</label>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter preview text..."
                className="w-full h-32 p-4 bg-slate-50 rounded-[24px] border border-slate-100 focus:outline-none focus:ring-4 focus:ring-orange-500/10 font-bold resize-none"
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Select Font</label>
              </div>
              <select
                value={selectedFont.name}
                onChange={(e) => {
                  const font = webFonts.find((f) => f.name === e.target.value);
                  if (font) setSelectedFont(font);
                }}
                className="w-full h-14 px-4 bg-slate-50 rounded-[24px] border border-slate-100 focus:outline-none focus:ring-4 focus:ring-orange-500/10 font-bold"
              >
                {categories.map((cat) => (
                  <optgroup key={cat} label={cat.toUpperCase()}>
                    {webFonts.filter((f) => f.category === cat).map((font) => (
                      <option key={font.name} value={font.name}>{font.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Font Size</label>
                <span className="text-[9px] font-black text-orange-600">{fontSize}px</span>
              </div>
              <input
                type="range"
                min={8}
                max={120}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Font Properties</label>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Weight</label>
                  <select
                    value={fontWeight}
                    onChange={(e) => setFontWeight(Number(e.target.value))}
                    className="w-full h-12 px-3 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none font-bold text-sm"
                  >
                    {fontWeights.map((w) => (
                      <option key={w.value} value={w.value}>{w.value}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Spacing</label>
                  <input
                    type="number"
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                    className="w-full h-12 px-3 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none font-bold text-center text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Line Height</label>
                  <input
                    type="number"
                    step={0.1}
                    value={lineHeight}
                    onChange={(e) => setLineHeight(Number(e.target.value))}
                    className="w-full h-12 px-3 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none font-bold text-center text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setFontStyle(fontStyle === "normal" ? "italic" : "normal")}
                  className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${
                    fontStyle === "italic" ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Italic className="h-5 w-5" />
                  Italic
                </button>
                <button
                  onClick={() => setTextDecoration(textDecoration === "none" ? "underline" : textDecoration === "underline" ? "line-through" : "none")}
                  className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${
                    textDecoration !== "none" ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Underline className="h-5 w-5" />
                  Style
                </button>
                <button
                  onClick={() => setTextAlign(textAlign === "left" ? "center" : textAlign === "center" ? "right" : "left")}
                  className="flex-1 h-12 rounded-xl flex items-center justify-center gap-2 font-bold bg-slate-100 text-slate-600 hover:bg-orange-100 hover:text-orange-600 transition-all"
                >
                  <Sliders className="h-5 w-5" />
                  Align
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Preview</label>
                <span className="text-[9px] font-black text-orange-600">{selectedFont.name}</span>
              </div>
              
              <div className="bg-slate-50 rounded-[24px] p-8 border border-slate-100 min-h-[200px] flex items-center justify-center">
                <p
                  className="text-center break-words"
                  style={{
                    fontFamily: selectedFont.family,
                    fontSize: `${fontSize}px`,
                    fontWeight,
                    fontStyle,
                    textDecoration,
                    letterSpacing: `${letterSpacing}px`,
                    lineHeight,
                    textAlign,
                  }}
                >
                  {text}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Quick Preview</label>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {webFonts.slice(0, 8).map((font) => (
                <button
                  key={font.name}
                  onClick={() => setSelectedFont(font)}
                  className={`h-16 rounded-xl p-2 flex items-center justify-center transition-all ${
                    selectedFont.name === font.name
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                      : "bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <span className="text-xs font-bold truncate">{font.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">CSS Output</label>
            </div>
            
            <div className="relative">
              <pre className="bg-slate-900 rounded-[24px] p-6 overflow-x-auto max-h-48">
                <code className="text-orange-400 font-mono text-sm">{generateCSS()}</code>
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-slate-700 transition-all"
              >
                {copied ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5 text-slate-400" />}
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-slate-50">
            <button
              onClick={() => {
                setText("The quick brown fox");
                setFontSize(32);
                setFontWeight(400);
                setLetterSpacing(0);
                setLineHeight(1.5);
                setFontStyle("normal");
                setTextDecoration("none");
                setTextAlign("left");
                setSelectedFont(webFonts[0]);
              }}
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
