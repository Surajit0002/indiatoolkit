import Link from "next/link";
import * as Icons from "lucide-react";
import { Tool } from "../types/tool";
import { getCategoryBySlug } from "../lib/utils";
import { ArrowUpRight, Zap, Star } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const category = getCategoryBySlug(tool.category);
  // @ts-expect-error - Dynamic icon access
  const Icon = Icons[tool.icon] || Icons.HelpCircle;

  return (
    <Link 
      href={`/tool/${tool.slug}`}
      className="group relative flex flex-col h-full bg-white rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:shadow-xl hover:border-slate-300 hover:-translate-y-1"
    >
      {/* Header with icon and badges */}
      <div className="flex items-start justify-between mb-4">
        <div 
          className="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: category?.color || '#10b981' }}
        >
          <Icon className="h-6 w-6 stroke-2" />
        </div>
        
        <div className="flex items-center gap-2">
          {tool.isPopular && (
            <span className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-600 rounded-lg text-[10px] font-bold uppercase tracking-wide">
              <Zap className="h-3 w-3" />
              Hot
            </span>
          )}
          {tool.isNew && (
            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 rounded-lg text-[10px] font-bold uppercase tracking-wide">
              <Star className="h-3 w-3" />
              New
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors duration-200">
          {tool.name}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
        
        {/* Tags */}
        {tool.tags && tool.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tool.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div 
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: category?.color || '#10b981' }}
          />
          <span className="text-xs font-medium text-slate-500">
            {category?.name}
          </span>
        </div>
        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
