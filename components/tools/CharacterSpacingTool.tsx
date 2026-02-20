"use client";

import { useState } from "react";
import { Copy, Check, MoveHorizontal, Eye, Sliders, RefreshCw } from "lucide-react";

export default function CharacterSpacingTool() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog");
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [wordSpacing, setWordSpacing] = useState(0);
  const [previewMode, setPreviewMode] = useState<"compare" | "single">("single");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const css = `letter-spacing: ${letterSpacing}px;
word-spacing: ${wordSpacing}px;`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateCSS = () => {
    return `.text {
  letter-spacing: ${letterSpacing}px;
  word-spacing: ${wordSpacing}px;
  ${letterSpacing < 0 ? `/* Tight tracking for headings */` : letterSpacing > 2 ? `/* Extended spacing for emphasis */` : `/* Normal spacing */`}
}`;
  };

  const spacingPresets = [
    { label: "Very Tight", letter: -2, word: -2 },
    { label: "Tight", letter: -1, word: -1 },
    { label: "Normal", letter: 0, word: 0 },
    { label: "Wide", letter: 2, word: 4 },
    { label: "Very Wide", letter: 4, word: 8 },
    { label: "Poster", letter: 8, word: 16 },
  ];

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-pink-200">
                <MoveHorizontal className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Character Spacing</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Kerning & Tracking</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Preview Text</label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Live</span>
                </div>
              </div>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to adjust..."
                className="relative w-full h-32 px-6 py-4 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:outline-none focus:bg-white focus:ring-4 focus:ring-pink-500/10 transition-all font-bold text-slate-700 shadow-inner resize-none"
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Mode</label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">View</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPreviewMode("single")}
                  className={`h-14 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                    previewMode === "single"
                      ? "bg-pink-600 text-white shadow-lg shadow-pink-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Eye className="h-5 w-5" />
                  Single View
                </button>
                <button
                  onClick={() => setPreviewMode("compare")}
                  className={`h-14 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                    previewMode === "compare"
                      ? "bg-pink-600 text-white shadow-lg shadow-pink-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Sliders className="h-5 w-5" />
                  Compare
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Letter Spacing</label>
                    <span className="text-sm font-black text-pink-600">{letterSpacing}px</span>
                  </div>
                  <input
                    type="range"
                    min={-5}
                    max={20}
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-pink-500"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Word Spacing</label>
                    <span className="text-sm font-black text-pink-600">{wordSpacing}px</span>
                  </div>
                  <input
                    type="range"
                    min={-10}
                    max={40}
                    value={wordSpacing}
                    onChange={(e) => setWordSpacing(Number(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-pink-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Visual Preview</label>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Typography</span>
              </div>
            </div>

            {previewMode === "single" ? (
              <div className="bg-slate-50 rounded-[24px] p-8 border border-slate-100">
                <p 
                  className="text-4xl font-bold text-slate-800 text-center break-words"
                  style={{ 
                    letterSpacing: `${letterSpacing}px`,
                    wordSpacing: `${wordSpacing}px`
                  }}
                >
                  {text}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-[24px] p-8 border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-4">Normal</div>
                  <p className="text-3xl font-bold text-slate-800 text-center break-words">
                    {text}
                  </p>
                </div>
                <div className="bg-white rounded-[24px] p-8 border-2 border-pink-200">
                  <div className="text-[10px] text-pink-500 font-bold uppercase tracking-wider mb-4">Adjusted</div>
                  <p 
                    className="text-3xl font-bold text-slate-800 text-center break-words"
                    style={{ 
                      letterSpacing: `${letterSpacing}px`,
                      wordSpacing: `${wordSpacing}px`
                    }}
                  >
                    {text}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {spacingPresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => { setLetterSpacing(preset.letter); setWordSpacing(preset.word); }}
                className="h-12 rounded-xl bg-slate-100 hover:bg-pink-50 text-slate-600 hover:text-pink-600 font-bold text-[10px] uppercase tracking-wider transition-all"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">CSS Output</label>
            </div>
            
            <div className="relative">
              <pre className="bg-slate-900 rounded-[24px] p-6 overflow-x-auto max-h-48">
                <code className="text-pink-400 font-mono text-sm">{generateCSS()}</code>
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
              onClick={() => { setLetterSpacing(0); setWordSpacing(0); }}
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
