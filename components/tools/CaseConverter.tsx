"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, Type, Trash2, AlignLeft } from "lucide-react";

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const convertCase = (type: string) => {
    switch (type) {
      case "upper":
        setText(text.toUpperCase());
        break;
      case "lower":
        setText(text.toLowerCase());
        break;
      case "title":
        setText(
          text
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        );
        break;
      case "sentence":
        setText(
          text
            .toLowerCase()
            .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase())
        );
        break;
      case "camel":
        setText(
          text
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
        );
        break;
    }
  };

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-blue-200">
                <Type className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Case Morph Engine</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Dynamic Text Transformation</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Text Stream</label>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Local Processing Active</span>
              </div>
            </div>
            
            <div className="relative group">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="relative w-full h-64 p-8 bg-slate-50/50 border border-slate-100 rounded-[32px] focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-700 resize-none text-xl leading-relaxed shadow-inner placeholder:text-slate-300"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { id: "upper", label: "UPPERCASE" },
                { id: "lower", label: "lowercase" },
                { id: "title", label: "Title Case" },
                { id: "sentence", label: "Sentence case" },
                { id: "camel", label: "camelCase" }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => convertCase(btn.id)}
                  className="h-12 rounded-2xl bg-white border-2 border-slate-100 hover:border-blue-500 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest transition-all shadow-sm active:scale-95"
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-50">
            <button
              onClick={handleCopy}
              className="flex-1 h-16 bg-slate-900 text-white rounded-[24px] hover:bg-blue-600 transition-all font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95"
            >
              {copied ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
              {copied ? "MORPHED & COPIED" : "COPY TRANSFORMATION"}
            </button>
            <button
              onClick={() => setText("")}
              className="h-16 px-8 bg-slate-100 text-slate-400 rounded-[24px] hover:bg-red-50 hover:text-red-600 transition-all shadow-sm active:scale-95"
            >
              <Trash2 className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-blue-200 transition-colors">
            <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-[20px] flex items-center justify-center shrink-0">
                <AlignLeft className="h-6 w-6" />
            </div>
            <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Character Density</span>
                <span className="block text-2xl font-black text-slate-900 tabular-nums">{text.length} <span className="text-xs text-slate-300 ml-1 italic font-bold">Units</span></span>
            </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-purple-200 transition-colors">
            <div className="h-14 w-14 bg-purple-50 text-purple-600 rounded-[20px] flex items-center justify-center shrink-0">
                <Type className="h-6 w-6" />
            </div>
            <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Word Volume</span>
                <span className="block text-2xl font-black text-slate-900 tabular-nums">{text.trim() === "" ? 0 : text.trim().split(/\s+/).length} <span className="text-xs text-slate-300 ml-1 italic font-bold">Lexemes</span></span>
            </div>
        </div>
      </div>
    </div>
  );
}
