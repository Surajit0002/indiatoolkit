"use client";

import { useState } from "react";
import { FileUser, Loader2, RotateCcw, Zap, Terminal, Sparkles, Briefcase, ArrowRight, ArrowLeft, Printer } from "lucide-react";
import { useAi } from "@/hooks/useAi";
import AiModelSelector from "@/components/ui/AiModelSelector";

export default function AiResumeBuilder() {
  const [step, setStep] = useState(1);
  const { result, isGenerating, error, generate, reset: resetAi, activeModel, setActiveModel } = useAi("ai-resume-builder");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    skills: "",
  });

  const generateResume = () => {
    const prompt = `Create a professional resume for ${formData.name}.
    Target Role: ${formData.role}
    Experience Summary: ${formData.experience}
    Skills: ${formData.skills}
    Email: ${formData.email}
    Phone: ${formData.phone}
    
    Format it with clear sections: SUMMARY, EXPERIENCE, SKILLS.`;

    generate(prompt, "You are a professional resume writer and career coach.");
    setStep(3);
  };

  return (
    <div className="space-y-8">
      {/* Model Selection Row */}
      <AiModelSelector activeModel={activeModel} onModelChange={setActiveModel} />

      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-slate-900 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-slate-200">
                <FileUser className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Executive Resume Synthesis</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Tier-1 Professional Profile Generation</p>
              </div>
            </div>
            
            {/* Step Indicator */}
            <div className="flex items-center gap-3">
                {[1, 2, 3].map((s) => (
                    <div key={s} className={`h-2 w-8 rounded-full transition-all duration-500 ${step >= s ? "bg-slate-900" : "bg-slate-100"}`} />
                ))}
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Full Identity</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Alexander Pierce" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-slate-900/10 font-bold text-slate-700 placeholder:text-slate-300" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Strategic Target Role</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Chief Technology Officer" 
                    value={formData.role} 
                    onChange={e => setFormData({...formData, role: e.target.value})} 
                    className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-slate-900/10 font-bold text-slate-700 placeholder:text-slate-300" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Contact Email</label>
                  <input 
                    type="email" 
                    placeholder="alex@nexus.ai" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-slate-900/10 font-bold text-slate-700 placeholder:text-slate-300" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Direct Line</label>
                  <input 
                    type="text" 
                    placeholder="+1 (555) 000-1234" 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                    className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-slate-900/10 font-bold text-slate-700 placeholder:text-slate-300" 
                  />
                </div>
              </div>
              <button 
                onClick={() => setStep(2)} 
                className="w-full h-20 bg-slate-900 text-white rounded-[32px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:bg-indigo-600 transition-all active:scale-95"
              >
                Next Phase <ArrowRight className="h-6 w-6" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Professional Trajectory Summary</label>
                <textarea 
                    value={formData.experience} 
                    onChange={e => setFormData({...formData, experience: e.target.value})} 
                    placeholder="Briefly describe your career milestones, leadership roles, and major achievements..."
                    className="w-full h-48 p-8 bg-slate-50 border border-slate-100 rounded-[32px] focus:outline-none focus:ring-2 focus:ring-slate-900/10 font-bold text-slate-700 resize-none placeholder:text-slate-300 text-lg leading-relaxed shadow-inner" 
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Core Competencies (Skills)</label>
                <input 
                    type="text" 
                    value={formData.skills} 
                    onChange={e => setFormData({...formData, skills: e.target.value})} 
                    placeholder="e.g. Distributed Systems, Strategic Growth, ML Ops, Stakeholder Management..."
                    className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-slate-900/10 font-bold text-slate-700 placeholder:text-slate-300" 
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <button 
                    onClick={() => setStep(1)} 
                    className="flex-1 h-20 bg-slate-100 text-slate-400 rounded-[32px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-200 transition-all active:scale-95"
                >
                    <ArrowLeft className="h-6 w-6" /> Revert
                </button>
                <button 
                    onClick={generateResume} 
                    disabled={isGenerating} 
                    className="flex-[2] h-20 bg-slate-900 text-white rounded-[32px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:bg-emerald-600 transition-all active:scale-95 disabled:bg-slate-100 disabled:text-slate-300"
                >
                  {isGenerating ? <Loader2 className="h-8 w-8 animate-spin" /> : <Sparkles className="h-8 w-8" />}
                  Execute Synthesis
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {error && (
                <div className="p-6 bg-red-50 border border-red-100 rounded-3xl text-red-600 text-xs font-black flex items-center gap-3 uppercase tracking-widest animate-shake">
                  <Zap className="h-5 w-5" /> {error}
                </div>
              )}
              
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <Terminal className="h-5 w-5 text-slate-900" />
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Synthesized Document Preview</label>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest">High-Impact Verified</span>
                </div>
              </div>

              <div id="resume-preview" className="p-16 bg-slate-50 border-4 border-slate-100 rounded-[48px] font-serif text-slate-800 shadow-inner min-h-[700px] whitespace-pre-wrap leading-relaxed text-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Briefcase className="h-40 w-40" />
                </div>
                <div className="relative z-10">
                    {result || (isGenerating && "Calibrating professional trajectory for neural synthesis...")}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <button 
                    onClick={() => { setStep(1); resetAi(); }} 
                    className="flex-1 h-20 bg-slate-100 text-slate-400 rounded-[32px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
                >
                    <RotateCcw className="h-6 w-6" /> Reset
                </button>
                <button 
                    disabled={!result || isGenerating}
                    onClick={() => window.print()} 
                    className="flex-[2] h-20 bg-slate-900 text-white rounded-[32px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:bg-blue-600 transition-all active:scale-95 disabled:bg-slate-100 disabled:text-slate-300"
                >
                  <Printer className="h-6 w-6" />
                  Print / Export to PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
