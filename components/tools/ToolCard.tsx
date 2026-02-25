'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Zap, Sparkles, ArrowUpRight, Star } from 'lucide-react';
import { Tool, ToolCategory } from '@/types/tool';

// Dynamic icon import
const IconRenderer = dynamic(() => import('@/components/IconRenderer'), {
  ssr: false,
  loading: () => <div className="h-6 w-6 bg-white/50 rounded-lg animate-pulse" />
});

interface ToolCardProps {
  tool: Tool;
  category?: ToolCategory;
  viewMode: 'grid' | 'list';
}

// Vibrant color palette for categories
const categoryConfig: Record<string, { color: string; lightColor: string; gradientFrom: string; gradientTo: string }> = {
  calculators: { color: "#0ea5e9", lightColor: "#e0f2fe", gradientFrom: "#3b82f6", gradientTo: "#06b6d4" },
  converters: { color: "#10b981", lightColor: "#d1fae5", gradientFrom: "#10b981", gradientTo: "#14b8a6" },
  "text-tools": { color: "#f59e0b", lightColor: "#fef3c7", gradientFrom: "#f59e0b", gradientTo: "#fb923c" },
  "dev-tools": { color: "#8b5cf6", lightColor: "#ede9fe", gradientFrom: "#8b5cf6", gradientTo: "#a78bfa" },
  "image-tools": { color: "#ec4899", lightColor: "#fce7f3", gradientFrom: "#ec4899", gradientTo: "#fb7185" },
  "pdf-tools": { color: "#ef4444", lightColor: "#fee2e2", gradientFrom: "#ef4444", gradientTo: "#fb923c" },
  "security-tools": { color: "#6366f1", lightColor: "#e0e7ff", gradientFrom: "#6366f1", gradientTo: "#3b82f6" },
  "web-tools": { color: "#0ea5e9", lightColor: "#e0f2fe", gradientFrom: "#0ea5e9", gradientTo: "#22d3ee" },
  "seo-tools": { color: "#eab308", lightColor: "#fef9c3", gradientFrom: "#eab308", gradientTo: "#fbbf24" },
  "file-tools": { color: "#64748b", lightColor: "#f1f5f9", gradientFrom: "#64748b", gradientTo: "#9ca3af" },
  "business-tools": { color: "#059669", lightColor: "#d1fae5", gradientFrom: "#059669", gradientTo: "#4ade80" },
  "ai-tools": { color: "#a855f7", lightColor: "#f3e8ff", gradientFrom: "#a855f7", gradientTo: "#e879f9" },
  "design-tools": { color: "#d946ef", lightColor: "#fae8ff", gradientFrom: "#d946ef", gradientTo: "#f472b6" },
  "social-tools": { color: "#3b82f6", lightColor: "#dbeafe", gradientFrom: "#3b82f6", gradientTo: "#818cf8" },
  "productivity-tools": { color: "#14b8a6", lightColor: "#ccfbf1", gradientFrom: "#14b8a6", gradientTo: "#34d399" },
};

const defaultConfig = { color: "#64748b", lightColor: "#f1f5f9", gradientFrom: "#64748b", gradientTo: "#9ca3af" };

export default function ToolCard({ tool, category, viewMode }: ToolCardProps) {
  const config = categoryConfig[tool.category] || defaultConfig;
  const { color, lightColor, gradientFrom, gradientTo } = config;

  return (
    <Link
      href={`/tool/${tool.slug}`}
      className={`
        group relative overflow-hidden rounded-2xl md:rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
        ${viewMode === "grid" ? "bg-white" : "flex items-center gap-4 bg-white p-4 md:p-5"}
      `}
    >
      {/* ==================== COLORFUL BACKGROUND ON HOVER ==================== */}
      
      {/* Full colorful gradient background */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-2xl md:rounded-3xl"
        style={{ 
          background: `linear-gradient(135deg, ${lightColor} 0%, white 50%, ${lightColor} 100%)`
        }}
      />

      {/* Top-left colored corner */}
      <div 
        className="absolute top-0 left-0 w-32 h-32 opacity-0 group-hover:opacity-30 transition-all duration-700 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${color}40 0%, transparent 70%)` }}
      />

      {/* Bottom-right colored corner */}
      <div 
        className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-20 transition-all duration-700 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${gradientTo}40 0%, transparent 70%)` }}
      />

      {/* ==================== CONTENT ==================== */}
      <div className="relative z-10 w-full p-4 md:p-5">
        
        {/* Header: Icon + Badges */}
        <div className="flex items-start justify-between mb-3 md:mb-4">
          {/* Icon Container */}
          <div className="relative">
            {/* Outer Glow Ring */}
            <div 
              className="absolute -inset-1.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
              style={{ 
                background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                filter: 'blur(8px)'
              }}
            />
            
            {/* Main Icon Box */}
            <div
              className={`relative w-12 md:w-14 h-12 md:h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
              style={{ 
                background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                boxShadow: `0 8px 20px -4px ${color}50`
              }}
            >
              <IconRenderer icon={tool.icon} className="h-5 md:h-6 w-5 md:w-6 text-white" />
              
              {/* Sparkle Effect on Hover */}
              <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-col items-end gap-1.5">
            {tool.isPopular && (
              <div 
                className="flex items-center gap-1 px-2 py-1 rounded-full text-white shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                  boxShadow: `0 4px 12px -2px ${color}40`
                }}
              >
                <Zap className="h-3 w-3 fill-current" />
                <span className="text-[9px] font-black tracking-wide">POPULAR</span>
              </div>
            )}
            {tool.isNew && (
              <div 
                className="flex items-center gap-1 px-2 py-1 rounded-full text-white shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                  boxShadow: '0 4px 12px -2px rgba(16, 185, 129, 0.4)'
                }}
              >
                <Sparkles className="h-3 w-3 fill-current" />
                <span className="text-[9px] font-black tracking-wide">NEW</span>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg font-black text-slate-900 mb-1.5 group-hover:text-green-600 transition-colors duration-300">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 group-hover:text-slate-700 transition-colors duration-300">
          {tool.description}
        </p>

        {/* Footer: Category + Arrow */}
        <div className="flex items-center justify-between">
          {/* Category Tag */}
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold group-hover:scale-105 transition-transform"
            style={{ 
              backgroundColor: `${color}15`,
              color: color,
            }}
          >
            <IconRenderer icon={category?.icon || "Folder"} className="h-3.5 w-3.5" />
            <span>{category?.name}</span>
          </span>

          {/* Arrow Button */}
          <div 
            className="h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-45"
            style={{ 
              backgroundColor: `${color}15`,
              color: color
            }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Subtle Border Glow on Hover */}
      <div 
        className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
        style={{ 
          border: `1px solid ${color}20`,
          boxShadow: `0 10px 40px -15px ${color}30`
        }}
      />
    </Link>
  );
}
