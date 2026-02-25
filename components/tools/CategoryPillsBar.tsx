'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Filter } from 'lucide-react';
import { ToolCategory } from '@/types/tool';

// Dynamic icon import
const IconRenderer = dynamic(() => import('@/components/IconRenderer'), {
  ssr: false,
  loading: () => <div className="h-3.5 w-3.5 bg-slate-200 rounded animate-pulse" />
});

interface CategoryPillsBarProps {
  categories: ToolCategory[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export default function CategoryPillsBar({
  categories,
  selectedCategory,
  onSelectCategory
}: CategoryPillsBarProps) {
  return (
    <section className="py-4 md:py-6 px-4 sticky top-16 z-40 bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {/* All Button */}
          <button
            onClick={() => onSelectCategory("all")}
            className={`shrink-0 px-3.5 md:px-4 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all flex items-center gap-2 ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Filter className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">All</span>
          </button>
          
          {/* Category Pills */}
          {categories.map((category) => {
            const isSelected = selectedCategory === category.slug;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.slug)}
                className={`shrink-0 px-3.5 md:px-4 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all flex items-center gap-2 ${
                    isSelected ? "text-white shadow-lg" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                style={isSelected ? { backgroundColor: category.color } : undefined}
              >
                <IconRenderer icon={category.icon} className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
