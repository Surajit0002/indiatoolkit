"use client";

import Link from "next/link";
import { Tool, ToolCategory } from "@/types/tool";
import * as Icons from "lucide-react";
import { ArrowRight, Zap, Star } from "lucide-react";

interface ToolGridProps {
  tools: Tool[];
  categories: ToolCategory[];
  title?: string;
  subtitle?: string;
}

export default function ToolGrid({ tools, categories, title, subtitle }: ToolGridProps) {
  return (
    <div className="space-y-10">
      {(title || subtitle) && (
        <div className="flex flex-col items-center md:items-start">
          {subtitle && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white mb-4 shadow-xl shadow-blue-200">
              <Zap className="h-2.5 w-2.5 fill-current" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em]">{subtitle}</span>
            </div>
          )}
          {title && <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase italic drop-shadow-sm">{title}</h2>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => {
          const category = categories.find(c => c.slug === tool.category);
          // @ts-ignore
          const Icon = Icons[category?.icon || "Zap"] || Icons.Zap;

          return (
            <Link 
              key={tool.id}
              href={`/tool/${tool.slug}`}
              className="group relative flex flex-col h-full bg-white rounded-[32px] p-6 border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: category?.color }}
              ></div>
              
              <div 
                className="h-14 w-14 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl"
                style={{ 
                  background: `linear-gradient(135deg, ${category?.color}, ${category?.color}dd)`,
                  boxShadow: `0 15px 30px -5px ${category?.color}66`
                }}
              >
                <Icon className="h-7 w-7 stroke-[2.5] drop-shadow-lg" />
              </div>
              
              <div className="flex-grow space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-black text-sm uppercase tracking-tight text-slate-900 italic leading-none">{tool.name}</h3>
                  {tool.isPopular && (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">
                      <Star className="h-2 w-2 fill-current" />
                      <span className="text-[6px] font-black uppercase">Popular</span>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  {tool.description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex flex-col -space-y-1">
                  <span className="text-[6px] font-black uppercase tracking-[0.2em] text-slate-400">Category</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-900 italic">
                    {category?.name}
                  </span>
                </div>
                <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-blue-600 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
