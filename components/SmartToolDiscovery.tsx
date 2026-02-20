"use client";

import React, { useState, useEffect } from "react";
import { Search, Sparkles, TrendingUp, Clock, Users, Zap, Grid, List } from "lucide-react";
import { advancedTools } from "../data/advancedTools";
import { categories } from "../data/categories";

export default function SmartToolDiscovery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [filteredTools, setFilteredTools] = useState(advancedTools);

  // Smart filtering and sorting
  useEffect(() => {
    let result = [...advancedTools];
    
    // Search filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Category filtering
    if (selectedCategory !== "all") {
      result = result.filter(tool => tool.category === selectedCategory);
    }
    
    // Smart sorting
    switch (sortBy) {
      case "popularity":
        result.sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "trending":
        result.sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0));
        break;
      case "ai_powered":
        result.sort((a, b) => 
          (b.aiPowered ? 1 : 0) - (a.aiPowered ? 1 : 0) || 
          (b.usageCount || 0) - (a.usageCount || 0)
        );
        break;
    }
    
    const timeoutId = setTimeout(() => {
      setFilteredTools(result);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory, sortBy]);

  const getSortIcon = (type: string) => {
    switch (type) {
      case "popularity": return <Users className="h-4 w-4" />;
      case "newest": return <Clock className="h-4 w-4" />;
      case "trending": return <TrendingUp className="h-4 w-4" />;
      case "ai_powered": return <Sparkles className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Smart Search Header */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-slate-900 mb-3">
            Smart Tool Discovery
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            AI-powered recommendations and intelligent filtering to find exactly what you need
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search tools by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                >
                  <span className="text-slate-600 text-sm">×</span>
                </button>
              )}
            </div>
            
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            
            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="popularity">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="trending">Trending</option>
              <option value="ai_powered">AI Powered</option>
            </select>
            
            {/* View Toggle */}
            <div className="flex bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-slate-200"}`}
              >
                <Grid className="h-5 w-5 text-slate-600" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-slate-200"}`}
              >
                <List className="h-5 w-5 text-slate-600" />
              </button>
            </div>
          </div>
          
          {/* Smart Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
              🔍 {filteredTools.length} tools found
            </span>
            {searchQuery && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                💡 Smart search active
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
                📁 {categories.find(c => c.id === selectedCategory)?.name}
              </span>
            )}
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold">
              {getSortIcon(sortBy)} Sorted by {sortBy.replace("_", " ")}
            </span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredTools.map((tool) => (
          <div 
            key={tool.id}
            className={`bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${
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
                      style={{ backgroundColor: tool.color }}
                    >
                      {tool.icon}
                    </div>
                    <div className="flex gap-2">
                      {tool.aiPowered && (
                        <span className="px-2 py-1 bg-linear-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                          AI
                        </span>
                      )}
                      {tool.realTime && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                          LIVE
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-black text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {tool.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {(tool.usageCount || 0).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {tool.trendingScore || 0}%
                      </span>
                    </div>
                    <span className="text-blue-600 font-bold">Use Tool →</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* List View */}
                <div className="shrink-0 mr-4">
                  <div 
                    className="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: tool.color }}
                  >
                    {tool.icon}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-black text-lg text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    <div className="flex gap-2 ml-4">
                      {tool.aiPowered && (
                        <span className="px-2 py-1 bg-linear-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                          AI
                        </span>
                      )}
                      {tool.realTime && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                          LIVE
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-2 truncate">
                    {tool.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tool.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {(tool.usageCount || 0).toLocaleString()} uses
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {tool.trendingScore || 0}% trending
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Updated {new Date(tool.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-blue-600 font-bold text-sm">Open Tool →</span>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-slate-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Search className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">No tools found</h3>
          <p className="text-slate-600 mb-6">
            Try adjusting your search terms or filters
          </p>
          <button 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSortBy("popularity");
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}