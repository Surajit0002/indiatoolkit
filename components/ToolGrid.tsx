"use client";

import Link from "next/link";
import { Tool, ToolCategory } from "@/types/tool";
import * as Icons from "lucide-react";
import { ArrowRight, Zap, Star, TrendingUp, Users } from "lucide-react";

interface ToolGridProps {
  tools: Tool[];
  categories: ToolCategory[];
  title?: string;
  subtitle?: string;
  showStats?: boolean;
  staggerDelay?: boolean;
}

export default function ToolGrid({ tools, categories, title, subtitle, showStats = false, staggerDelay = false }: ToolGridProps) {
  return (
    <div className="space-y-12">
      {(title || subtitle) && (
        <div className="flex flex-col items-center md:items-start">
          {subtitle && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-4 shadow-xl shadow-green-200 rounded-full">
              <Zap className="h-4 w-4 fill-current" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{subtitle}</span>
            </div>
          )}
          {title && (
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 flex items-center gap-3">
              {title}
              <span className="inline-flex items-center justify-center h-10 w-10 bg-green-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </span>
            </h2>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool, index) => {
          const category = categories.find(c => c.slug === tool.category);
          // @ts-expect-error - Dynamic icon access
          const Icon = Icons[category?.icon || "Zap"] || Icons.Zap;

          return (
            <Link 
              key={tool.id}
              href={`/tool/${tool.slug}`}
              className={`group relative flex flex-col h-full bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-500 overflow-hidden ${
                staggerDelay ? `animate-fade-in-up` : ''
              }`}
              style={staggerDelay ? { animationDelay: `${index * 100}ms` } : undefined}
            >
              {/* Animated Background Gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-all duration-700"
                style={{ 
                  background: `radial-gradient(circle at 100% 0%, ${category?.color}20, transparent 70%)`
                }}
              ></div>

              {/* Floating Particles */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-slate-200 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500"></div>
              <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-slate-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 delay-150"></div>
              
              <div 
                className="absolute top-0 right-0 w-40 h-40 blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: category?.color }}
              ></div>
              
              {/* Top Icon Section */}
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="relative">
                  {/* Icon Glow */}
                  <div 
                    className="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500"
                    style={{ backgroundColor: category?.color }}
                  ></div>
                  <div 
                    className="relative h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                    style={{ 
                      background: `linear-gradient(135deg, ${category?.color}, ${category?.color}dd)`,
                      boxShadow: `0 10px 25px -5px ${category?.color}66`
                    }}
                  >
                    <Icon className="h-7 w-7 stroke-[2.5] drop-shadow-lg" />
                  </div>
                  {/* Badge */}
                  {tool.isNew && (
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <Star className="h-2.5 w-2.5 text-white fill-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  {tool.isPopular && (
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-[9px] font-black uppercase tracking-wider shadow-lg animate-pulse">
                      <Zap className="h-3 w-3 fill-white" />
                      HOT
                    </div>
                  )}
                  <div className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[9px] font-bold uppercase tracking-wider">
                    {tool.type}
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="flex-grow space-y-3 relative z-10">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-black text-lg tracking-tight text-slate-900 group-hover:text-green-600 transition-colors">
                    {tool.name}
                  </h3>
                  {tool.verified && (
                    <span className="inline-flex items-center justify-center h-4 w-4 bg-blue-100 rounded-full">
                      <svg className="h-2.5 w-2.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 group-hover:text-slate-700 transition-colors">
                  {tool.description}
                </p>
                
                {/* Tags */}
                {tool.tags && tool.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tool.tags.slice(0, 2).map((tag, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-medium group-hover:bg-slate-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Stats */}
                {showStats && (
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
                    {tool.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                        <span className="text-[10px] font-bold text-slate-600">{tool.rating}</span>
                      </div>
                    )}
                    {tool.usageCount && (
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-slate-400" />
                        <span className="text-[10px] font-medium text-slate-500">
                          {tool.usageCount > 1000 ? `${(tool.usageCount / 1000).toFixed(1)}k` : tool.usageCount}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Section */}
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 relative z-10">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2.5 h-2.5 rounded-full shadow-sm"
                    style={{ backgroundColor: category?.color }}
                  ></div>
                  <span className="text-xs font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
                    {category?.name}
                  </span>
                </div>
                <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-green-500 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>

              {/* Hover Border Effect */}
              <div 
                className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none border-2"
                style={{ 
                  borderColor: category?.color,
                  boxShadow: `0 0 30px ${category?.color}30, inset 0 0 30px ${category?.color}10`
                }}
              ></div>
              
              {/* Shimmer Effect */}
              <div 
                className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100"
              >
                <div className="absolute -top-full left-0 w-full h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-shimmer transform -skew-x-12"></div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
