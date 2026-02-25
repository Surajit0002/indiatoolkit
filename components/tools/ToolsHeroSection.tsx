'use client';

import React from 'react';
import { Search, X, Grid, Sparkles, TrendingUp } from 'lucide-react';

// Helper for layers icon
function Layers({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

interface ToolsHeroSectionProps {
  totalTools: number;
  totalCategories: number;
  popularTools: number;
  newTools: number;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  urlQuery?: string;
  filteredToolsCount?: number;
}

export default function ToolsHeroSection({
  totalTools,
  totalCategories,
  popularTools,
  newTools,
  searchTerm,
  onSearchChange,
  urlQuery = "",
  filteredToolsCount
}: ToolsHeroSectionProps) {
  const stats = [
    { value: totalTools, label: "Total Tools", icon: Grid },
    { value: totalCategories, label: "Categories", icon: Layers },
    { value: popularTools, label: "Popular", icon: TrendingUp },
    { value: newTools, label: "New Tools", icon: Sparkles },
  ];

  return (
    <section className="relative pt-10 md:pt-12 pb-16 md:pb-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-100 md:w-125 h-100 md:h-125 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-[80px] md:blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-100 md:w-125 h-100 md:h-125 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-[80px] md:blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-80 md:w-100 h-80 md:h-100 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full blur-[60px] md:blur-[80px] animate-pulse delay-2000" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full mb-6 md:mb-8 border border-green-200 shadow-lg animate-fade-in-up">
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-ping"></div>
              <div className="absolute top-0 left-0 h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-700">
              {totalTools}+ Professional Tools
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6 leading-tight animate-fade-in-up delay-100">
            {urlQuery ? (
              <>
                <span className="text-slate-900">Search Results for </span>
                <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  &ldquo;{urlQuery}&rdquo;
                </span>
              </>
            ) : (
              <>
                <span className="text-slate-900">Explore All </span>
                <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Tools
                </span>
              </>
            )}
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-slate-600 mb-8 md:mb-10 max-w-2xl mx-auto font-medium animate-fade-in-up delay-200">
            {urlQuery 
              ? `Found ${filteredToolsCount} tools matching "${urlQuery}"`
              : `Discover ${totalTools}+ professional tools across ${totalCategories} categories. Boost your productivity with our free online toolkit.`
            }
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8 md:mb-10 animate-fade-in-up delay-300">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search tools by name, category, or keyword..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-12 md:h-14 pl-11 md:pl-12 pr-10 md:pr-12 bg-white border border-slate-200 rounded-xl md:rounded-2xl shadow-lg shadow-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute inset-y-0 right-3 md:right-4 flex items-center p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-4 md:h-5 w-4 md:w-5 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>

          {/* Quick Stats - Mobile Responsive */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 animate-fade-in-up delay-400">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-9 md:h-10 w-9 md:w-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                  <stat.icon className="h-4 md:h-5 w-4 md:w-5 text-white" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-[9px] md:text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
