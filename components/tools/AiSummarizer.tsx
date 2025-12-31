"use client";

import { useState } from "react";
import { FileText, Send, Copy, Check, Loader2, List, RotateCcw, Zap, Terminal } from "lucide-react";
import { useAi } from "@/hooks/useAi";
import AiModelSelector from "@/components/ui/AiModelSelector";

export default function AiSummarizer() {
  const [text, setText] = useState("");
  const { result: summary, isGenerating: isProcessing, error, generate, reset, activeModel, setActiveModel } = useAi("ai-summarizer");
  const [copied, setCopied] = useState(false);
  const [length, setLength] = useState("Short");

  const summarize = () => {
    if (!text) return;
    generate(text, `You are an expert summarizer. Provide a ${length} summary of the input text, focusing on the most critical information and key takeaways.`);
  };

  return (
    <div className="space-y-8">
      {/* Model Selection Row */}
      <AiModelSelector activeModel={activeModel} onModelChange={setActiveModel} />

      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-blue-200">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Insight Extractor</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">AI-Powered Document Distillation</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Summary Depth</label>
            <div className="grid grid-cols-3 gap-3">
              {["Short", "Medium", "Detailed"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLength(l)}
                  className={`h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${
                    length === l 
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" 
                      : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Source Material</label>
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{text.length} Characters</span>
            </div>
            <div className="relative group">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste long text, articles, or reports here to summarize..."
                className="w-full h-64 p-8 bg-slate-50/50 border border-slate-100 rounded-[32px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-slate-700 resize-none text-lg leading-relaxed shadow-inner"
              />
              <button
                onClick={summarize}
                disabled={!text || isProcessing}
                className="absolute bottom-6 right-6 h-16 px-10 bg-slate-900 text-white rounded-[24px] hover:bg-blue-600 disabled:bg-slate-100 transition-all font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl active:scale-95"
              >
                {isProcessing ? <Loader2 className="h-6 w-6 animate-spin" /> : <List className="h-6 w-6" />}
                Distill
              </button>
            </div>
          </div>

          {error && (
            <div className="p-6 bg-red-50 border border-red-100 rounded-3xl text-red-600 text-xs font-black flex items-center gap-3 uppercase tracking-widest animate-shake">
              <Zap className="h-5 w-5" /> {error}
            </div>
          )}

          {summary && (
            <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex justify-between items-center px-4">
                <div className="flex items-center gap-3">
                    <Terminal className="h-5 w-5 text-blue-600" />
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Synthesized Summary</label>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                        navigator.clipboard.writeText(summary);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all text-[10px] font-black uppercase tracking-widest shadow-xl"
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
              <div className="p-10 bg-slate-50 border-2 border-slate-100 rounded-[40px] text-slate-700 leading-relaxed whitespace-pre-wrap font-bold text-lg shadow-inner relative overflow-hidden group/result">
                <div className="relative z-10">
                  {summary}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
