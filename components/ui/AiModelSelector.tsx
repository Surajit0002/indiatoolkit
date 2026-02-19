"use client";

import { Cpu, Zap, Sparkles, Brain } from "lucide-react";

interface AiModelSelectorProps {
  activeModel: string;
  onModelChange: (model: string) => void;
}

// Updated models list with OpenRouter GLM model as primary
export const models = [
  { id: "z-ai/glm-4.5-air:free", name: "GLM-4.5 Air", icon: Brain, color: "text-violet-500", bg: "bg-violet-500/10", border: "border-violet-500", description: "Free & Fast" },
  { id: "z-ai/glm-5:free", name: "GLM-5 Free", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500", description: "Advanced Free" },
  { id: "openai/gpt-4o-mini", name: "GPT-4o Mini", icon: Zap, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500", description: "Fast & Efficient" },
  { id: "google/gemini-2.0-flash-exp:free", name: "Gemini 2.0 Flash", icon: Cpu, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500", description: "Free & Quick" },
];

export default function AiModelSelector({ activeModel, onModelChange }: AiModelSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">AI Model Selection</label>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className={`flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl md:rounded-2xl border-2 transition-all text-left group touch-manipulation ${
              activeModel === model.id 
                ? `${model.bg} ${model.border} shadow-lg shadow-black/5` 
                : "bg-white border-slate-100 hover:border-slate-200 active:scale-98"
            }`}
          >
            <div className={`h-7 w-7 md:h-8 md:w-8 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 ${
              activeModel === model.id ? model.bg : "bg-slate-50"
            }`}>
              <model.icon className={`h-3.5 w-3.5 md:h-4 md:w-4 ${activeModel === model.id ? model.color : "text-slate-400"}`} />
            </div>
            <div className="min-w-0 flex-1">
              <span className={`block text-[9px] md:text-[10px] font-black uppercase leading-none truncate ${
                activeModel === model.id ? "text-slate-900" : "text-slate-500"
              }`}>
                {model.name}
              </span>
              <span className="text-[7px] md:text-[8px] font-bold text-slate-400 uppercase tracking-tight">
                {model.description}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
