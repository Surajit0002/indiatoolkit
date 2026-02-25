'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Grid, List, X } from 'lucide-react';
import { Tool, ToolCategory } from '@/types/tool';
import ToolCard from './ToolCard';

interface ToolsGridSectionProps {
  tools: Tool[];
  categories: ToolCategory[];
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy: string;
  onSortChange: (sort: 'popular' | 'name' | 'newest') => void;
  onClearFilters: () => void;
}

export default function ToolsGridSection({
  tools,
  categories,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  onClearFilters,
}: ToolsGridSectionProps) {
  // Get category info helper
  const getCategoryInfo = (categorySlug: string) => {
    return categories.find((c) => c.slug === categorySlug);
  };

  if (tools.length === 0) {
    return (
      /* Empty State */
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center py-16 md:py-20 px-6 md:px-8 bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-lg">
            <div className="w-20 md:w-24 h-20 md:h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6 animate-fade-in">
              <Search className="h-10 md:h-12 w-10 md:w-12 text-slate-300" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-700 mb-2 md:mb-3 animate-fade-in-up delay-100">No Tools Found</h3>
            <p className="text-slate-500 font-medium mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base animate-fade-in-up delay-200">
              We couldn&apos;t find any tools matching your search. Try different keywords or browse all categories.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 animate-fade-in-up delay-300">
              <button
                onClick={onClearFilters}
                className="px-5 md:px-6 py-2.5 md:py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all duration-300 shadow-lg shadow-green-200 hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 text-sm md:text-base"
              >
                <X className="h-4 md:h-5 w-4 md:w-5" />
                Clear Filters
              </button>
              <Link
                href="/tools"
                className="px-5 md:px-6 py-2.5 md:py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
              >
                <Grid className="h-4 md:h-5 w-4 md:w-5" />
                Browse All Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-12 px-4">
      <div className="container mx-auto">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-sm text-slate-500">Showing</span>
            <span className="px-2.5 md:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-bold">
              {tools.length}
            </span>
            <span className="text-sm text-slate-500 hidden sm:inline">tools</span>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'popular' | 'name' | 'newest')}
              className="px-3 md:px-4 py-2 md:py-2.5 bg-white border border-slate-200 rounded-xl text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer hover:border-green-300 transition-colors"
            >
              <option value="popular">🔥 Most Popular</option>
              <option value="name">📝 Name (A-Z)</option>
              <option value="newest">✨ Newest First</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-2 md:p-2.5 transition-all ${
                  viewMode === "grid" 
                    ? "bg-green-500 text-white shadow-md" 
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
                title="Grid View"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-2 md:p-2.5 transition-all ${
                  viewMode === "list" 
                    ? "bg-green-500 text-white shadow-md" 
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6"
              : "flex flex-col gap-3 md:gap-4"
          }
        >
          {tools.map((tool, index) => (
            <div
              key={tool.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
            >
              <ToolCard
                tool={tool}
                category={getCategoryInfo(tool.category)}
                viewMode={viewMode}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
