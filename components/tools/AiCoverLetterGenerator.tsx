"use client";

import { useState } from "react";
import { Mail, Copy, Check, Loader2, RotateCcw, Zap, Terminal, Sparkles, Briefcase } from "lucide-react";
import { useAi } from "@/hooks/useAi";
import AiModelSelector from "@/components/ui/AiModelSelector";

export default function AiCoverLetterGenerator() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    skills: "",
    experience: "",
  });
  const { result, isGenerating, error, generate, reset, activeModel, setActiveModel } = useAi("ai-cover-letter");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!formData.jobTitle) return;
    const prompt = `Write a professional cover letter for a ${formData.jobTitle} position at ${formData.company || 'a leading company'}. 
    My key skills are: ${formData.skills}. 
    My experience summary: ${formData.experience}. 
    The letter should be persuasive, professional, and well-structured.`;
    
    generate(prompt, "You are a professional career coach and expert resume/cover letter writer.");
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
              <div className="h-12 w-12 bg-orange-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-orange-200">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Career Catalyst AI</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">High-Conversion Professional Synthesis</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
              <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></div>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Professional Mode</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Target Job Title</label>
              <input 
                type="text" 
                placeholder="e.g. Senior Product Designer" 
                value={formData.jobTitle} 
                onChange={e => setFormData({...formData, jobTitle: e.target.value})} 
                className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-bold text-slate-700" 
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Target Company</label>
              <input 
                type="text" 
                placeholder="e.g. OpenAI" 
                value={formData.company} 
                onChange={e => setFormData({...formData, company: e.target.value})} 
                className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-bold text-slate-700" 
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Key Skills & Qualifications</label>
            <textarea 
              placeholder="e.g. React, Next.js, UI/UX Design, Team Leadership..." 
              value={formData.skills} 
              onChange={e => setFormData({...formData, skills: e.target.value})} 
              className="w-full h-32 p-6 bg-slate-50 border border-slate-100 rounded-[24px] focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-bold text-slate-700 resize-none" 
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Experience Summary</label>
            <textarea 
              placeholder="e.g. 5+ years building scalable web applications for Fortune 500 companies..." 
              value={formData.experience} 
              onChange={e => setFormData({...formData, experience: e.target.value})} 
              className="w-full h-32 p-6 bg-slate-50 border border-slate-100 rounded-[24px] focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-bold text-slate-700 resize-none" 
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!formData.jobTitle || isGenerating}
            className="w-full h-20 bg-slate-900 text-white rounded-[32px] hover:bg-orange-600 disabled:bg-slate-100 disabled:text-slate-300 transition-all font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl active:scale-95 text-lg"
          >
            {isGenerating ? <Loader2 className="h-8 w-8 animate-spin" /> : <Sparkles className="h-8 w-8" />}
            Synthesize Cover Letter
          </button>

          {error && (
            <div className="p-6 bg-red-50 border border-red-100 rounded-3xl text-red-600 text-xs font-black flex items-center gap-3 uppercase tracking-widest animate-shake">
              <Zap className="h-5 w-5" /> {error}
            </div>
          )}

          {result && (
            <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex justify-between items-center px-4">
                <div className="flex items-center gap-3">
                    <Terminal className="h-5 w-5 text-orange-600" />
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Professional Output</label>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-orange-600 transition-all text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy to Clipboard"}
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
                   <Mail className="h-20 w-20 text-orange-500" />
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
                <Mail className="h-10 w-10 text-slate-300" />
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Awaiting Professional Directives</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
