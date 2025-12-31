"use client";

import { useState, useEffect } from "react";
import { Copy, Trash2, FileText, Hash, AlignLeft, RefreshCw, BarChart3 } from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
  });

  useEffect(() => {
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const characters = text.length;
    const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(Boolean).length;

    setStats({ words, characters, sentences, paragraphs });
  }, [text]);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<FileText className="h-6 w-6" />} label="Total Words" value={stats.words} color="text-blue-600" bg="bg-blue-600/10" />
        <StatCard icon={<Hash className="h-6 w-6" />} label="Characters" value={stats.characters} color="text-purple-600" bg="bg-purple-600/10" />
        <StatCard icon={<AlignLeft className="h-6 w-6" />} label="Sentences" value={stats.sentences} color="text-emerald-600" bg="bg-emerald-600/10" />
        <StatCard icon={<BarChart3 className="h-6 w-6" />} label="Paragraphs" value={stats.paragraphs} color="text-amber-600" bg="bg-amber-600/10" />
      </div>

      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-8">
            <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Content Repository</label>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Analyzing in Real-time</span>
                </div>
            </div>
            
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[32px] blur opacity-0 group-focus-within:opacity-10 transition duration-500"></div>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your content here for instant analysis..."
                    className="relative w-full h-[450px] p-8 bg-slate-50/50 border border-slate-100 rounded-[32px] focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-700 resize-none text-xl leading-relaxed shadow-inner placeholder:text-slate-300"
                />
            </div>

            <div className="flex flex-wrap gap-4">
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(text);
                    }}
                    className="flex-1 h-16 bg-slate-900 text-white rounded-[24px] hover:bg-blue-600 transition-all font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95"
                >
                    <Copy className="h-5 w-5" /> Copy Analysis
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
    </div>
  );
}

function StatCard({ icon, label, value, color, bg }: { icon: any, label: string, value: number, color: string, bg: string }) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-[1.05] hover:shadow-xl transition-all duration-500">
      <div className={`h-14 w-14 ${bg} ${color} rounded-[20px] flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform shadow-inner`}>
        {icon}
      </div>
      <span className="text-4xl font-black leading-none mb-3 tabular-nums tracking-tighter">{value.toLocaleString()}</span>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">{label}</span>
    </div>
  );
}
