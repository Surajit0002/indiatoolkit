"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Download, 
  Zap, 
  TrendingUp, 
  Clock, 
  Users,
  Tag,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Heart,
  Share2,
  BarChart3
} from "lucide-react";
import { advancedTools } from "../data/advancedTools";
import { ToolCategory } from "../types/tool";

interface MarketplaceFilters {
  category: string;
  rating: number;
  popularity: "all" | "trending" | "popular" | "new";
  price: "all" | "free" | "premium";
  features: string[];
}

interface ToolCardProps {
  tool: typeof advancedTools[0];
  viewMode: "grid" | "list";
  onUseTool: (toolId: string) => void;
}

export default function ToolMarketplace() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<MarketplaceFilters>({
    category: "all",
    rating: 0,
    popularity: "all",
    price: "all",
    features: []
  });
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<"popularity" | "rating" | "newest" | "name">("popularity");

  // Get unique categories
  const categories = [...new Set(advancedTools.map(tool => tool.category))];
  
  // Get all features
  const allFeatures = [...new Set(advancedTools.flatMap(tool => tool.features || []))];

  // Filter and sort tools
  const filteredTools = advancedTools
    .filter(tool => {
      // Search filter
      if (searchQuery && 
          !tool.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !tool.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (filters.category !== "all" && tool.category !== filters.category) {
        return false;
      }
      
      // Rating filter
      if (filters.rating > 0 && (tool.rating || 0) < filters.rating) {
        return false;
      }
      
      // Price filter
      if (filters.price !== "all") {
        const isFree = tool.pricing === "free";
        if (filters.price === "free" && !isFree) return false;
        if (filters.price === "premium" && isFree) return false;
      }
      
      // Features filter
      if (filters.features.length > 0) {
        const toolFeatures = tool.features || [];
        if (!filters.features.every(feature => toolFeatures.includes(feature))) {
          return false;
        }
      }
      
      // Popularity filter
      if (filters.popularity !== "all") {
        const daysSinceUpdate = Math.floor((Date.now() - new Date(tool.lastUpdated).getTime()) / (1000 * 60 * 60 * 24));
        const isTrending = (tool.users || 0) > 1000;
        const isNew = daysSinceUpdate < 30;
        
        switch (filters.popularity) {
          case "trending":
            if (!isTrending) return false;
            break;
          case "popular":
            if ((tool.users || 0) < 500) return false;
            break;
          case "new":
            if (!isNew) return false;
            break;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return (b.users || 0) - (a.users || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleFeature = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: "all",
      rating: 0,
      popularity: "all",
      price: "all",
      features: []
    });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Tool Marketplace
              </h1>
              <p className="text-slate-600 mt-1">
                Discover and access powerful tools for your workflow
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {viewMode === "grid" ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg text-slate-900">Filters</h2>
                <button 
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Reset
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-bold text-sm text-slate-900 mb-3 uppercase tracking-wider">Categories</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, category: "all" }))}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      filters.category === "all" 
                        ? "bg-blue-50 text-blue-700 border border-blue-200" 
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map(category => (
                    <div key={category}>
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, category }))}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                          filters.category === category
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span>{category}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h3 className="font-bold text-sm text-slate-900 mb-3 uppercase tracking-wider">Minimum Rating</h3>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setFilters(prev => ({ ...prev, rating }))}
                      className={`p-2 rounded-lg transition-colors ${
                        filters.rating === rating
                          ? "bg-yellow-100 text-yellow-700"
                          : "hover:bg-slate-100 text-slate-400"
                      }`}
                    >
                      <Star className={`h-4 w-4 ${filters.rating <= rating && filters.rating > 0 ? "fill-current" : ""}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <h3 className="font-bold text-sm text-slate-900 mb-3 uppercase tracking-wider">Price</h3>
                <div className="space-y-2">
                  {(["all", "free", "premium"] as const).map(price => (
                    <button
                      key={price}
                      onClick={() => setFilters(prev => ({ ...prev, price }))}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-colors ${
                        filters.price === price
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      {price === "all" ? "All Prices" : price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popularity */}
              <div className="mb-6">
                <h3 className="font-bold text-sm text-slate-900 mb-3 uppercase tracking-wider">Popularity</h3>
                <div className="space-y-2">
                  {(["all", "trending", "popular", "new"] as const).map(pop => (
                    <button
                      key={pop}
                      onClick={() => setFilters(prev => ({ ...prev, popularity: pop }))}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-colors flex items-center gap-2 ${
                        filters.popularity === pop
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      {pop === "trending" && <TrendingUp className="h-4 w-4" />}
                      {pop === "popular" && <Users className="h-4 w-4" />}
                      {pop === "new" && <Clock className="h-4 w-4" />}
                      {pop === "all" ? "All Tools" : pop}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-3 uppercase tracking-wider">Features</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {allFeatures.map(feature => (
                    <button
                      key={feature}
                      onClick={() => toggleFeature(feature)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                        filters.features.includes(feature)
                          ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className={`h-2 w-2 rounded-full ${filters.features.includes(feature) ? "bg-indigo-500" : "bg-slate-300"}`} />
                      {feature}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tools Grid/List */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-slate-600">
                  Showing <span className="font-bold text-slate-900">{filteredTools.length}</span> tools
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="popularity">Popularity</option>
                  <option value="rating">Rating</option>
                  <option value="newest">Newest</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

            {/* Tools Display */}
            {filteredTools.length === 0 ? (
              <div className="text-center py-16">
                <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">No tools found</h3>
                <p className="text-slate-600">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredTools.map(tool => (
                  <ToolCard 
                    key={tool.id} 
                    tool={tool} 
                    viewMode={viewMode}
                    onUseTool={(id) => console.log("Using tool:", id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolCard({ tool, viewMode, onUseTool }: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const isNew = Math.floor((Date.now() - new Date(tool.lastUpdated).getTime()) / (1000 * 60 * 60 * 24)) < 30;
  const isTrending = (tool.users || 0) > 1000;
  const isPopular = (tool.users || 0) > 500;

  if (viewMode === "list") {
    return (
      <div 
        className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: tool.color }}
            >
              {tool.icon}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-slate-900">{tool.name}</h3>
                  {isNew && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">
                      New
                    </span>
                  )}
                  {isTrending && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full uppercase">
                      Trending
                    </span>
                  )}
                </div>
                <p className="text-slate-600 text-sm mb-3">{tool.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {tool.features?.slice(0, 3).map(feature => (
                    <span 
                      key={feature} 
                      className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg"
                    >
                      {feature}
                    </span>
                  ))}
                  {tool.features && tool.features.length > 3 && (
                    <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-lg">
                      +{tool.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-sm text-slate-900">{tool.rating || 0}</span>
                  <span className="text-slate-500 text-sm">({tool.reviews || 0})</span>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-slate-500">Monthly Usage</div>
                  <div className="font-bold text-slate-900">
                    {(tool.users || 0).toLocaleString()}+
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-900">{tool.category}</span>
                {tool.pricing === "free" ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    FREE
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                    {tool.pricing === "subscription" ? "PRO" : "PREMIUM"}
                  </span>
                )}
              </div>
              
              <button
                onClick={() => onUseTool(tool.id)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                Use Tool
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent rounded-2xl z-10 flex items-end p-6">
          <button
            onClick={() => onUseTool(tool.id)}
            className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
          >
            <Zap className="h-4 w-4" />
            Use Tool
          </button>
        </div>
      )}
      
      {/* Tool Icon */}
      <div 
        className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg mb-4"
        style={{ backgroundColor: tool.color }}
      >
        {tool.icon}
      </div>
      
      {/* Tool Info */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-lg text-slate-900">{tool.name}</h3>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-sm text-slate-900">{tool.rating || 0}</span>
        </div>
      </div>
      
      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{tool.description}</p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tool.features?.slice(0, 2).map(feature => (
          <span 
            key={feature} 
            className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg"
          >
            {feature}
          </span>
        ))}
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-sm text-slate-500 font-medium">{tool.category}</span>
        
        <div className="flex items-center gap-2">
          {isTrending && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Trending
            </span>
          )}
          
          {tool.pricing === "free" ? (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
              FREE
            </span>
          ) : (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
              {tool.pricing === "subscription" ? "PRO" : "PREMIUM"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
