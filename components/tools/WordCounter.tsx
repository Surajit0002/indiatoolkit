"use client";

import { useState, useMemo } from "react";
import { Copy, Trash2, FileText, Hash, AlignLeft, BarChart3 } from "lucide-react";
import { ToolTextarea } from "@/components/ui/ToolInput";

export default function WordCounter() {
  const [text, setText] = useState("");

  // Compute stats directly using useMemo
  const stats = useMemo(() => {
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const characters = text.length;
    const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(Boolean).length;
    return { words, characters, sentences, paragraphs };
  }, [text]);

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 p-2 sm:p-0">
      {/* Stats Grid - 2x2 on mobile, 4 columns on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <StatCard icon={<FileText className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />} label="Total Words" value={stats.words} color="text-blue-600" bg="bg-blue-600/10" />
        <StatCard icon={<Hash className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />} label="Characters" value={stats.characters} color="text-purple-600" bg="bg-purple-600/10" />
        <StatCard icon={<AlignLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />} label="Sentences" value={stats.sentences} color="text-emerald-600" bg="bg-emerald-600/10" />
        <StatCard icon={<BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />} label="Paragraphs" value={stats.paragraphs} color="text-amber-600" bg="bg-amber-600/10" />
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl md:rounded-[40px] shadow-lg sm:shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8 lg:p-12 space-y-4 sm:space-y-6 md:space-y-8">
            <div className="flex items-center justify-between px-1 sm:px-2">
                <label className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-400">Content Repository</label>
                <div className="flex items-center gap-1 sm:gap-2">
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-[7px] sm:text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Analyzing in Real-time</span>
                </div>
            </div>
            
            <ToolTextarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your content here for instant analysis..."
                className="h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[450px] text-base sm:text-lg md:text-xl leading-relaxed resize-none"
                label="Content Repository"
            />

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(text);
                    }}
                    className="flex-1 h-12 sm:h-14 md:h-16 bg-slate-900 text-white rounded-xl sm:rounded-2xl md:rounded-[24px] hover:bg-blue-600 transition-all font-black uppercase tracking-widest flex items-center justify-center gap-2 sm:gap-3 shadow-lg sm:shadow-xl active:scale-95 text-sm sm:text-base touch-target"
                >
                    <Copy className="h-4 w-4 sm:h-5 sm:w-5" /> Copy Analysis
                </button>
                <button
                    onClick={() => setText("")}
                    className="h-12 sm:h-14 md:h-16 px-6 sm:px-8 bg-slate-100 text-slate-400 rounded-xl sm:rounded-2xl md:rounded-[24px] hover:bg-red-50 hover:text-red-600 transition-all shadow-sm active:scale-95 touch-target"
                >
                    <Trash2 className="h-5 w-5 sm:h-6 sm:w-6 mx-auto" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, bg }: { icon: React.ReactNode; label: string; value: number; color: string; bg: string }) {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl md:rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-[1.02] sm:hover:scale-[1.05] hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 sm:duration-500">
      <div className={`h-10 w-10 sm:h-12 md:h-14 sm:w-12 md:w-14 ${bg} ${color} rounded-xl sm:rounded-2xl md:rounded-[20px] flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:rotate-3 sm:group-hover:rotate-6 transition-transform shadow-inner`}>
        {icon}
      </div>
      <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-none mb-1 sm:mb-2 md:mb-3 tabular-nums tracking-tighter">{value.toLocaleString()}</span>
      <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-400 italic">{label}</span>
    </div>
  );
}
