"use client";

import { useState } from "react";
import { RefreshCw, Copy, Check, Loader2, RotateCcw, Zap, Terminal } from "lucide-react";
import { useAi } from "@/hooks/useAi";
import AiModelSelector from "@/components/ui/AiModelSelector";

export default function AiParaphraser() {
  const [text, setText] = useState("");
  const { result, isGenerating: isProcessing, error, generate, reset, activeModel, setActiveModel } = useAi("ai-paraphraser");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState("Standard");

  const paraphrase = () => {
    if (!text) return;
    generate(text, `You are an expert editor. Rewrite the following text in a ${mode} style, ensuring the meaning is preserved while improving flow, clarity, and impact.`);
  };

  return (
    <div className="space-y-8">
      {/* Model Selection Row */}
      <AiModelSelector activeModel={activeModel} onModelChange={setActiveModel} />

      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-indigo-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-indigo-200">
                <RefreshCw className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Content Refiner</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Intelligent Paraphrasing Engine</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Writing Style Mode</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Standard", "Fluency", "Formal", "Creative"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${
                    mode === m 
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200" 
                      : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Original Text</label>
              <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{text.length} Characters</span>
            </div>
            <div className="relative group">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here to paraphrase and improve..."
                className="w-full h-56 p-8 bg-slate-50/50 border border-slate-100 rounded-[32px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold text-slate-700 resize-none text-lg leading-relaxed shadow-inner"
              />
              <button
                onClick={paraphrase}
                disabled={!text || isProcessing}
                className="absolute bottom-6 right-6 h-16 px-10 bg-slate-900 text-white rounded-[24px] hover:bg-indigo-600 disabled:bg-slate-100 transition-all font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl active:scale-95"
              >
                {isProcessing ? <Loader2 className="h-6 w-6 animate-spin" /> : <RefreshCw className="h-6 w-6" />}
                Refine
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
                    <Terminal className="h-5 w-5 text-indigo-600" />
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Refined Result</label>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(result);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-all text-[10px] font-black uppercase tracking-widest shadow-xl"
                    >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied" : "Copy"}
                    </button>
                    <button
                        onClick={reset}
                        className="p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
                    >
                        <RotateCcw className="h-5 w-5" />
                    </button>
                </div>
              </div>
              <div className="p-10 bg-indigo-50 border-2 border-indigo-100 rounded-[40px] text-slate-700 leading-relaxed whitespace-pre-wrap font-bold text-lg shadow-inner relative overflow-hidden group/result">
                <div className="relative z-10">
                  {result}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
