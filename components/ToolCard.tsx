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

  return (
    <Link 
      href={`/tool/${tool.slug}`}
      className="group relative flex flex-col p-6 rounded-[24px] transition-all duration-500 hover:-translate-y-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden active:scale-95 border border-slate-100 bg-white"
    >
      {/* Background Category Glow */}
      <div 
        className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-all duration-700 group-hover:scale-150"
        style={{ backgroundColor: category?.color }}
      ></div>
      
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div 
          className="h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
          style={{ 
            background: `linear-gradient(135deg, ${category?.color}, ${category?.color}cc)`,
          }}
        >
          <Icon className="h-6 w-6 stroke-[2.5]" />
        </div>
        {tool.isPopular && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-white rounded-xl text-[8px] font-black uppercase tracking-[0.2em] shadow-2xl">
            <Zap className="h-3 w-3 fill-amber-400 text-amber-400" />
            TOP
          </div>
        )}
      </div>

      <div className="flex-grow relative z-10">
        <h3 className="text-xl font-black text-slate-900 mb-2 leading-none tracking-tighter uppercase italic group-hover:text-blue-600 transition-colors">
          {tool.name}
        </h3>
        <p className="text-[10px] font-bold text-slate-400 line-clamp-2 leading-relaxed uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity italic">
          {tool.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between relative z-10 pt-4 border-t border-slate-50">
        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-300 group-hover:text-slate-900 transition-colors">
          {category?.name}
        </span>
        <div className="h-8 w-8 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-sm">
          <ArrowUpRight className="h-4 w-4 stroke-[3]" />
        </div>
      </div>
    </Link>
  );
}
