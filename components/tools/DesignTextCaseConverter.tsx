"use client";

import { useState } from "react";
import { Copy, Check, Type, Trash2, AlignLeft, Palette, Eye, Sliders } from "lucide-react";

type CaseType = 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake' | 'kebab' | 'constant' | 'swap';

interface CasePreset {
  id: CaseType;
  label: string;
  description: string;
  example: string;
}

const casePresets: CasePreset[] = [
  { id: 'upper', label: 'UPPERCASE', description: 'All capital letters', example: 'THE QUICK BROWN FOX' },
  { id: 'lower', label: 'lowercase', description: 'All small letters', example: 'the quick brown fox' },
  { id: 'title', label: 'Title Case', description: 'First letter of each word capitalized', example: 'The Quick Brown Fox' },
  { id: 'sentence', label: 'Sentence case', description: 'First letter of sentence capitalized', example: 'The quick brown fox jumps' },
  { id: 'camel', label: 'camelCase', description: 'First word lowercase, others capitalized', example: 'theQuickBrownFox' },
  { id: 'snake', label: 'snake_case', description: 'Lowercase with underscores', example: 'the_quick_brown_fox' },
  { id: 'kebab', label: 'kebab-case', description: 'Lowercase with hyphens', example: 'the-quick-brown-fox' },
  { id: 'constant', label: 'CONSTANT_CASE', description: 'Uppercase with underscores', example: 'THE_QUICK_BROWN_FOX' },
  { id: 'swap', label: 'sWaP cAsE', description: 'Alternate case', example: 'tHe qUiCk bRoWn fOx' },
];

export default function DesignTextCaseConverter() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog");
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState<"single" | "compare">("single");
  const [compareCase] = useState<CaseType>("upper");
  const [fontSize, setFontSize] = useState(24);

  const convertCase = (inputText: string, caseType: CaseType): string => {
    switch (caseType) {
      case 'upper':
        return inputText.toUpperCase();
      case 'lower':
        return inputText.toLowerCase();
      case 'title':
        return inputText
          .toLowerCase()
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      case 'sentence':
        return inputText
          .toLowerCase()
          .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
      case 'camel':
        return inputText
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
          .replace(/^./, (str) => str.toLowerCase());
      case 'snake':
        return inputText
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '_')
          .replace(/^_|_$/g, '');
      case 'kebab':
        return inputText
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      case 'constant':
        return inputText
          .toUpperCase()
          .replace(/[^a-zA-Z0-9]+/g, '_')
          .replace(/^_|_$/g, '');
      case 'swap':
        return inputText
          .split('')
          .map((char) => {
            if (char >= 'a' && char <= 'z') return char.toUpperCase();
            if (char >= 'A' && char <= 'Z') return char.toLowerCase();
            return char;
          })
          .join('');
      default:
        return inputText;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  const stats = {
    characters: text.length,
    words: text.trim() === "" ? 0 : text.trim().split(/\s+/).length,
    lines: text.split('\n').length,
  };

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-violet-200">
                <Palette className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Design Case Converter</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Visual Typography</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Input Text</label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Live</span>
                </div>
              </div>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="relative w-full h-48 p-6 bg-slate-50/50 border border-slate-100 rounded-[32px] focus:outline-none focus:bg-white focus:ring-4 focus:ring-violet-500/10 transition-all font-bold text-slate-700 resize-none text-lg leading-relaxed shadow-inner placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Preview Options</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewMode(previewMode === "single" ? "compare" : "single")}
                    className="h-8 px-3 bg-slate-100 rounded-full flex items-center gap-2 hover:bg-violet-100 hover:text-violet-600 transition-all"
                  >
                    <Sliders className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase">{previewMode}</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-violet-500 uppercase tracking-wider">Preview</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-slate-400">Size:</span>
                    <input
                      type="range"
                      min={12}
                      max={48}
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-20 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-violet-500"
                    />
                  </div>
                </div>
                
                {previewMode === "single" ? (
                  <div 
                    className="text-center break-words min-h-[80px] flex items-center justify-center"
                    style={{ fontSize: `${fontSize}px`, fontWeight: 600 }}
                  >
                    {text || <span className="text-slate-300 italic">Your text here...</span>}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Original</span>
                      <div 
                        className="text-slate-700 break-words"
                        style={{ fontSize: `${fontSize}px`, fontWeight: 600 }}
                      >
                        {text || "..."}
                      </div>
                    </div>
                    <div className="text-center border-l border-slate-200 pl-4">
                      <span className="text-[9px] text-violet-500 font-bold uppercase tracking-wider block mb-2">Converted</span>
                      <div 
                        className="text-violet-700 break-words"
                        style={{ fontSize: `${fontSize}px`, fontWeight: 600 }}
                      >
                        {text ? convertCase(text, compareCase) : "..."}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Case Presets</label>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-violet-500"></div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">9 Options</span>
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {casePresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setText(convertCase(text, preset.id))}
                  className="h-16 rounded-xl bg-white border-2 border-slate-100 hover:border-violet-400 hover:bg-violet-50 transition-all text-left p-3 group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black text-slate-700 group-hover:text-violet-600 uppercase tracking-wider">
                      {preset.label}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 truncate">{preset.example}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-50">
            <button
              onClick={handleCopy}
              className="flex-1 h-16 bg-slate-900 text-white rounded-[24px] hover:bg-violet-600 transition-all font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95"
            >
              {copied ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
              {copied ? "COPIED TO CLIPBOARD" : "COPY TEXT"}
            </button>
            <button
              onClick={handleClear}
              className="h-16 px-8 bg-slate-100 text-slate-400 rounded-[24px] hover:bg-red-50 hover:text-red-600 transition-all shadow-sm active:scale-95"
            >
              <Trash2 className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-100 flex items-center gap-4">
              <div className="h-14 w-14 bg-violet-50 text-violet-600 rounded-[20px] flex items-center justify-center">
                <Type className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Characters</span>
                <span className="block text-2xl font-black text-slate-900 tabular-nums">{stats.characters}</span>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-100 flex items-center gap-4">
              <div className="h-14 w-14 bg-violet-50 text-violet-600 rounded-[20px] flex items-center justify-center">
                <AlignLeft className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Words</span>
                <span className="block text-2xl font-black text-slate-900 tabular-nums">{stats.words}</span>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-100 flex items-center gap-4">
              <div className="h-14 w-14 bg-violet-50 text-violet-600 rounded-[20px] flex items-center justify-center">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Lines</span>
                <span className="block text-2xl font-black text-slate-900 tabular-nums">{stats.lines}</span>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-100 flex items-center gap-4">
              <div className="h-14 w-14 bg-emerald-50 text-emerald-600 rounded-[20px] flex items-center justify-center">
                <Palette className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Presets</span>
                <span className="block text-2xl font-black text-slate-900 tabular-nums">9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
