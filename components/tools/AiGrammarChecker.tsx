"use client";

import { useState } from "react";
import { CheckCircle2, Send, Copy, Check, Loader2, AlertCircle, RotateCcw, Zap, Terminal, Sparkles } from "lucide-react";
import { useAi } from "@/hooks/useAi";
import AiModelSelector from "@/components/ui/AiModelSelector";

export default function AiGrammarChecker() {
  const [text, setText] = useState("");
  const { result, isGenerating: isProcessing, error, generate, reset, activeModel, setActiveModel } = useAi("ai-grammar-checker");
  const [copied, setCopied] = useState(false);

  const checkGrammar = () => {
    if (!text) return;
    generate(text, "You are a professional proofreader. Fix any grammar, spelling, and punctuation errors in the provided text. Return ONLY the corrected version.");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Model Selection Row */}
      <AiModelSelector activeModel={activeModel} onModelChange={setActiveModel} />

      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-emerald-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-emerald-200">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Linguistic Precision Core</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Grammatical Correction & Polish</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Syntax Analysis Ready</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Source Text Segment</label>
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{text.length} Characters</span>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[32px] blur opacity-0 group-focus-within:opacity-10 transition duration-500"></div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your content here for deep linguistic analysis and real-time correction..."
                className="relative w-full h-56 p-8 bg-slate-50/50 border border-slate-100 rounded-[32px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold text-slate-700 resize-none placeholder:text-slate-300 text-lg leading-relaxed shadow-inner"
              />
              <button
                onClick={checkGrammar}
                disabled={!text || isProcessing}
                className="absolute bottom-6 right-6 h-16 px-10 bg-slate-900 text-white rounded-[24px] hover:bg-emerald-600 disabled:bg-slate-100 disabled:text-slate-300 transition-all font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl active:scale-95"
              >
                {isProcessing ? <Loader2 className="h-6 w-6 animate-spin" /> : <Sparkles className="h-6 w-6" />}
                Execute Check
              </button>
            </div>
          </div>

          {error && (
            <div className="p-6 bg-red-50 border border-red-100 rounded-3xl text-red-600 text-xs font-black flex items-center gap-3 uppercase tracking-widest animate-shake">
              <Zap className="h-5 w-5" /> {error}
            </div>
          )}

          {result && (
            <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex justify-between items-center px-4">
                <div className="flex items-center gap-3">
                    <Terminal className="h-5 w-5 text-emerald-600" />
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Refined Output</label>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-emerald-600 transition-all text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy Result"}
                  </button>
                  <button
                    onClick={reset}
                    className="p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all shadow-sm active:scale-95"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Historical Input</label>
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-[32px] text-slate-400 text-lg font-bold line-through italic leading-relaxed">
                    {text}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] px-4">Synthesized Correction</label>
                  <div className="p-10 bg-slate-900 rounded-[40px] text-slate-200 leading-relaxed whitespace-pre-wrap font-bold text-lg border-4 border-emerald-500/30 shadow-2xl relative overflow-hidden group/result">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/result:opacity-20 transition-opacity">
                      <CheckCircle2 className="h-20 w-20 text-emerald-500" />
                    </div>
                    <div className="relative z-10">
                      {result}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {!result && !isProcessing && (
            <div className="py-20 text-center space-y-6 opacity-30 group-hover:opacity-50 transition-opacity">
              <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <CheckCircle2 className="h-10 w-10 text-slate-300" />
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Awaiting linguistic context</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
