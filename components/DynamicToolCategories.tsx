"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../data/categories";
import { ToolCategory } from "../types/tool";

interface DynamicToolCategoriesProps {
  className?: string;
  showAll?: boolean;
  maxItems?: number;
  onCategorySelect?: (category: ToolCategory) => void;
}

export default function DynamicToolCategories({
  className = "",
  showAll = false,
  maxItems = 8,
  onCategorySelect
}: DynamicToolCategoriesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "popularity" | "recent">("name");

  // Enhanced categories with dynamic data
  const enhancedCategories = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      toolCount: Math.floor(Math.random() * 50) + 10, // Simulated tool count
      popularity: Math.floor(Math.random() * 100), // Simulated popularity score
      isNew: Math.random() > 0.7, // 30% chance of being new
      isTrending: Math.random() > 0.8, // 20% chance of trending
      lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within 30 days
      featuredTools: Array.from({ length: 3 }, (_, i) => ({
        id: `tool-${i}`,
        name: `${cat.name.split(' ')[0]} Tool ${i + 1}`,
        description: `Advanced ${cat.name.toLowerCase()} functionality`,
        isNew: Math.random() > 0.8
      }))
    }));
  }, []);

  // Filtered and sorted categories
  const filteredCategories = useMemo(() => {
    let filtered = enhancedCategories.filter(cat => 
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply sorting
    switch (sortBy) {
      case "popularity":
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case "recent":
        filtered.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
        break;
      case "name":
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    if (!showAll) {
      filtered = filtered.slice(0, maxItems);
    }

    return filtered;
  }, [enhancedCategories, searchTerm, sortBy, showAll, maxItems]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category.id);
    onCategorySelect?.(category);
  };

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: maxItems }).map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Dynamic Tool Categories
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            {filteredCategories.length} categories available with advanced features
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-48"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="name">Sort by Name</option>
            <option value="popularity">Sort by Popularity</option>
            <option value="recent">Sort by Recent</option>
          </select>
          
          <div className="flex border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              <Icons.Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              <Icons.List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid/List */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredCategories.map((cat, index) => {
              const IconComponent = Icons[cat.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
              
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className={`relative group cursor-pointer rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                    selectedCategory === cat.id 
                      ? "border-blue-500 shadow-lg" 
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {/* Category Header */}
                  <div 
                    className="p-5 relative overflow-hidden"
                    style={{ backgroundColor: cat.color }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="h-12 w-12 rounded-xl bg-white/30 flex items-center justify-center backdrop-blur-sm">
                          <IconComponent className="h-6 w-6 text-white stroke-[2.5]" />
                        </div>
                        <div className="flex gap-1">
                          {cat.isNew && (
                            <span className="px-2 py-1 bg-white/30 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                              NEW
                            </span>
                          )}
                          {cat.isTrending && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                              🔥
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="font-black text-white text-lg tracking-tight mb-1">
                        {cat.name}
                      </h3>
                      <p className="text-white/80 text-xs font-medium">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Category Stats */}
                  <div className="p-4 bg-white">
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-center">
                        <div className="text-lg font-black text-slate-900">{cat.toolCount}</div>
                        <div className="text-xs text-slate-500">Tools</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-black text-slate-900">{cat.popularity}%</div>
                        <div className="text-xs text-slate-500">Popularity</div>
                      </div>
                    </div>

                    {/* Featured Tools Preview */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Featured Tools
                      </div>
                      {cat.featuredTools.map((tool, toolIndex) => (
                        <div 
                          key={tool.id} 
                          className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-lg"
                        >
                          <span className="font-medium text-slate-700">{tool.name}</span>
                          {tool.isNew && (
                            <span className="px-1.5 py-0.5 bg-green-500 text-white text-[8px] font-bold rounded-full">
                              NEW
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Link 
                      href={`/category/${cat.slug}`}
                      className="mt-4 block w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-center text-sm font-bold rounded-xl transition-all duration-200 group-hover:shadow-lg"
                    >
                      Explore Category
                    </Link>
                  </div>

                  {/* Selection Indicator */}
                  {selectedCategory === cat.id && (
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-2xl pointer-events-none"></div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {filteredCategories.map((cat, index) => {
              const IconComponent = Icons[cat.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
              
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
                    selectedCategory === cat.id 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  <div 
                    className="h-16 w-16 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  >
                    <IconComponent className="h-7 w-7 stroke-[2.5]" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-black text-slate-900 text-lg tracking-tight">
                        {cat.name}
                      </h3>
                      <div className="flex gap-1">
                        {cat.isNew && (
                          <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                            NEW
                          </span>
                        )}
                        {cat.isTrending && (
                          <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                            TRENDING
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">{cat.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>{cat.toolCount} tools</span>
                      <span>{cat.popularity}% popularity</span>
                      <span>Updated {cat.lastUpdated.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <Link 
                      href={`/category/${cat.slug}`}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all"
                    >
                      View Tools
                    </Link>
                    <div className="flex gap-1">
                      {cat.featuredTools.slice(0, 2).map(tool => (
                        <span 
                          key={tool.id}
                          className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg"
                        >
                          {tool.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Load More Button */}
      {!showAll && filteredCategories.length < enhancedCategories.length && (
        <div className="text-center pt-4">
          <button
            onClick={() => {}}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all hover:shadow-lg"
          >
            Load More Categories ({enhancedCategories.length - filteredCategories.length} remaining)
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="h-16 w-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icons.Search className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No categories found</h3>
          <p className="text-slate-600">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}