import Link from "next/link";
import * as Icons from "lucide-react";
import { Tool } from "../types/tool";
import { getCategoryBySlug } from "../lib/utils";
import { ArrowUpRight, Zap } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const category = getCategoryBySlug(tool.category);
  // @ts-ignore
  const Icon = Icons[tool.icon] || Icons.HelpCircle;

  // Mock usage stats - in a real app this would come from analytics
  const usageStats = {
    "word-counter": "2.1M",
    "json-formatter": "1.8M",
    "password-generator": "3.2M",
    "qr-code-generator": "1.5M"
  };
  
  const usage = usageStats[tool.id as keyof typeof usageStats] || "1M+";

  return (
    <Link 
      href={`/tool/${tool.slug}`}
      className="group relative flex flex-col p-6 rounded-3xl transition-all duration-500 hover:-translate-y-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden active:scale-95 border border-slate-100 bg-white hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]"
    >
      {/* Enhanced Background Effects */}
      <div 
        className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-30 transition-all duration-700 group-hover:scale-150"
        style={{ backgroundColor: category?.color }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className="relative">
          <div 
            className="h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border-2 border-white/20"
            style={{ 
              background: `linear-gradient(135deg, ${category?.color}, ${category?.color}dd)`
            }}
          >
            <Icon className="h-7 w-7 stroke-[2.5] drop-shadow-lg" />
          </div>
          {/* Usage Badge */}
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[9px] font-black px-2 py-1 rounded-full shadow-lg border-2 border-white">
            {usage}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {tool.isPopular && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-[8px] font-black uppercase tracking-[0.2em] shadow-xl animate-pulse">
              <Zap className="h-3 w-3 fill-white" />
              TRENDING
            </div>
          )}
          <div className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[8px] font-bold uppercase tracking-wider">
            {tool.type}
          </div>
        </div>
      </div>

      <div className="flex-grow relative z-10">
        <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight tracking-tight group-hover:text-green-600 transition-colors duration-300">
          {tool.name}
        </h3>
        <p className="text-sm font-bold text-slate-500 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
          {tool.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between relative z-10 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category?.color }}
          ></div>
          <span className="text-xs font-black text-slate-400 group-hover:text-slate-700 transition-colors">
            {category?.name}
          </span>
        </div>
        <div className="h-9 w-9 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-slate-500 group-hover:from-green-500 group-hover:to-emerald-500 group-hover:text-white transition-all duration-500 shadow-md group-hover:shadow-lg group-hover:scale-110">
          <ArrowUpRight className="h-4 w-4 stroke-[3]" />
        </div>
      </div>
    </Link>
  );
}
