"use client";

import { useState } from "react";
import { HelpCircle, Copy, Check, Loader2, Plus, RotateCcw, Zap, Terminal } from "lucide-react";
import { useAi } from "@/hooks/useAi";
import AiModelSelector from "@/components/ui/AiModelSelector";

export default function AiFaqGenerator() {
  const [description, setDescription] = useState("");
  const { result, isGenerating, error, generate, reset, activeModel, setActiveModel } = useAi("ai-faq-generator");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!description) return;
    generate(description, "You are a customer support expert. Create a set of 3-5 frequently asked questions and answers for the product or service described by the user. Format each as Q: [Question] followed by A: [Answer].");
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
              <div className="h-12 w-12 bg-indigo-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-indigo-200">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Support Logic Engine</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Automated Knowledge Synthesis</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
              <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Logic Core Online</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Product/Service Context</label>
              <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{description.length} Characters</span>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-[32px] blur opacity-0 group-focus-within:opacity-10 transition duration-500"></div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. A premium subscription service for AI-powered architectural design software that focuses on sustainability and energy efficiency..."
                className="relative w-full h-48 p-8 bg-slate-50/50 border border-slate-100 rounded-[32px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold text-slate-700 resize-none placeholder:text-slate-300 text-lg leading-relaxed shadow-inner"
              />
              <button
                onClick={handleGenerate}
                disabled={!description || isGenerating}
                className="absolute bottom-6 right-6 h-16 px-10 bg-slate-900 text-white rounded-[24px] hover:bg-indigo-600 disabled:bg-slate-100 disabled:text-slate-300 transition-all font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl active:scale-95"
              >
                {isGenerating ? <Loader2 className="h-6 w-6 animate-spin" /> : <Plus className="h-6 w-6" />}
                Generate FAQ
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
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Synthesized Knowledge Base</label>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-all text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy All"}
                  </button>
                  <button
                    onClick={reset}
                    className="p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all shadow-sm active:scale-95"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-10 bg-slate-900 rounded-[40px] text-slate-200 leading-relaxed whitespace-pre-wrap font-bold text-lg border-4 border-slate-800 shadow-2xl relative overflow-hidden group/result">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/result:opacity-20 transition-opacity">
                   <HelpCircle className="h-20 w-20 text-indigo-500" />
                </div>
                <div className="relative z-10">
                  {result}
                </div>
              </div>
            </div>
          )}
          
          {!result && !isGenerating && (
            <div className="py-20 text-center space-y-6 opacity-30 group-hover:opacity-50 transition-opacity">
              <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <HelpCircle className="h-10 w-10 text-slate-300" />
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Ready for support synthesis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
