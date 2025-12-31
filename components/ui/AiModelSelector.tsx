"use client";

import { Cpu, Zap, Sparkles } from "lucide-react";

interface AiModelSelectorProps {
  activeModel: string;
  onModelChange: (model: string) => void;
}

export const models = [
  { id: "gpt-4o-mini", name: "ChatGPT 4o-mini", icon: Zap, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500" },
  { id: "gpt-4o", name: "ChatGPT 4o", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500" },
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", icon: Cpu, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500" },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", icon: Cpu, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500" },
];

export default function AiModelSelector({ activeModel, onModelChange }: AiModelSelectorProps) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">AI Intelligence Level</label>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all text-left group ${
              activeModel === model.id 
                ? `${model.bg} ${model.border} shadow-lg shadow-black/5` 
                : "bg-white border-slate-100 hover:border-slate-200"
            }`}
          >
            <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${
              activeModel === model.id ? model.bg : "bg-slate-50"
            }`}>
              <model.icon className={`h-4 w-4 ${activeModel === model.id ? model.color : "text-slate-400"}`} />
            </div>
            <div className="min-w-0">
              <span className={`block text-[10px] font-black uppercase leading-none truncate ${
                activeModel === model.id ? "text-slate-900" : "text-slate-500"
              }`}>
                {model.name}
              </span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">
                {model.id.includes("mini") || model.id.includes("flash") ? "Fast & Efficient" : "High Reasoning"}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
