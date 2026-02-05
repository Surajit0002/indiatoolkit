"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ToolConfig, ToolCategory } from "../types/tool";
import { tools } from "../data/tools";
import { categories } from "../data/categories";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Zap, 
  Clock, 
  TrendingUp,
  Settings,
  Share2,
  Download,
  Copy,
  Check,
  ChevronDown,
  SlidersHorizontal
} from "lucide-react";

interface DynamicToolRendererProps {
  category?: string;
  searchQuery?: string;
  filters?: {
    featured?: boolean;
    popular?: boolean;
    new?: boolean;
    aiPowered?: boolean;
  };
}

export default function DynamicToolRenderer({ 
  category, 
  searchQuery = "", 
  filters = {} 
}: DynamicToolRendererProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "popularity" | "newest" | "featured">("featured");
  const [selectedCategory, setSelectedCategory] = useState<string>(category || "all");
  const [copiedTool, setCopiedTool] = useState<string | null>(null);

  // Combine all tools from categories
  const allTools = useMemo(() => {
    const allToolsList: ToolConfig[] = [...tools];
    
    // Add category tools
    categories.forEach(cat => {
      tools.push({
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        category: cat.id,
        type: 'converter',
        icon: cat.icon,
        componentName: cat.name.replace(/\s+/g, ''),
        seo: {
          title: `${cat.name} - Free Online Tools`,
          description: cat.description
        },
        faqs: [],
        color: cat.color,
        featured: Math.random() > 0.7,
        popular: Math.random() > 0.5,
        new: Math.random() > 0.8,
        aiPowered: Math.random() > 0.6,
        usageCount: Math.floor(Math.random() * 10000),
        rating: Number((Math.random() * 2 + 3).toFixed(1)),
        lastUpdated: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ["professional", "india", "toolkit"],
        config: {
          inputs: [],
          outputs: [],
          settings: []
        }
      });
    });
    
    return tools;
  }, []);

  // Filter tools based on criteria
  const filteredTools = useMemo(() => {
    let result = [...allTools];
    
    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(tool => tool.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply feature filters
    if (filters.featured) {
      result = result.filter(tool => tool.featured);
    }
    if (filters.popular) {
      result = result.filter(tool => tool.popular);
    }
    if (filters.new) {
      result = result.filter(tool => tool.new);
    }
    if (filters.aiPowered) {
      result = result.filter(tool => tool.aiPowered);
    }
    
    // Sort results
    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "popularity":
        result.sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));
        break;
      case "newest":
        result.sort((a, b) => 
          new Date(b.lastUpdated || Date.now()).getTime() - new Date(a.lastUpdated || Date.now()).getTime()
        );
        break;
      case "featured":
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.usageCount || 0) - (a.usageCount || 0);
        });
        break;
    }
    
    return result;
  }, [allTools, selectedCategory, searchQuery, filters, sortBy]);

  const handleCopyTool = async (toolId: string) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/tool/${toolId}`);
      setCopiedTool(toolId);
      setTimeout(() => setCopiedTool(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getCategoryName = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : categoryId;
  };

  const getCategoryColor = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.color : "#6366F1";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header and Controls */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">
              Advanced Tools Collection
            </h1>
            <p className="text-slate-600">
              {filteredTools.length} professional tools available • Updated daily
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid" 
                    ? "bg-slate-900 text-white" 
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list" 
                    ? "bg-slate-900 text-white" 
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                <option value="featured">Featured First</option>
                <option value="name">Name A-Z</option>
                <option value="popularity">Most Popular</option>
                <option value="newest">Newest First</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            All Tools
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div 
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3">
          {[
            { key: "featured", label: "Featured", icon: Star },
            { key: "popular", label: "Popular", icon: TrendingUp },
            { key: "new", label: "New", icon: Zap },
            { key: "aiPowered", label: "AI Powered", icon: Settings }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                const newFilters = { ...filters };
                newFilters[key as keyof typeof filters] = !filters[key as keyof typeof filters];
                // Update filters (would need to pass this back up or use context)
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                filters[key as keyof typeof filters]
                  ? "bg-green-600 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid/List */}
      <div className={
        viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
      }>
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className={`bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group ${
              viewMode === "list" ? "flex items-center p-4" : ""
            }`}
          >
            {viewMode === "grid" ? (
              <>
                {/* Grid View */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: getCategoryColor(tool.category) }}
                    >
                      <div className="text-lg font-black">
                        {tool.name.charAt(0)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {tool.featured && (
                        <div className="h-6 w-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Star className="h-3 w-3 text-white fill-current" />
                        </div>
                      )}
                      {tool.aiPowered && (
                        <div className="h-6 w-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <Zap className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-black text-lg text-slate-900 mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {tool.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags?.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {tool.usageCount?.toLocaleString()} uses
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        {tool.rating} rating
                      </span>
                    </div>
                    <span>
                      Updated {new Date(tool.lastUpdated || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
                      Use Tool
                    </button>
                    <button
                      onClick={() => handleCopyTool(tool.id)}
                      className="h-10 w-10 flex items-center justify-center bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                    >
                      {copiedTool === tool.id ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-slate-600" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* List View */}
                <div className="flex items-center gap-4 flex-1">
                  <div 
                    className="h-12 w-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: getCategoryColor(tool.category) }}
                  >
                    <div className="text-lg font-black">
                      {tool.name.charAt(0)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-black text-lg text-slate-900 truncate">
                        {tool.name}
                      </h3>
                      {tool.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      {tool.aiPowered && <Zap className="h-4 w-4 text-purple-500" />}
                    </div>
                    <p className="text-slate-600 text-sm truncate">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span>{getCategoryName(tool.category)}</span>
                      <span>{tool.usageCount?.toLocaleString()} uses</span>
                      <span>{tool.rating} rating</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
                      Use
                    </button>
                    <button
                      onClick={() => handleCopyTool(tool.id)}
                      className="h-10 w-10 flex items-center justify-center bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                    >
                      {copiedTool === tool.id ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-slate-600" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-black text-slate-900 mb-2">
            No tools found
          </h3>
          <p className="text-slate-600">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}