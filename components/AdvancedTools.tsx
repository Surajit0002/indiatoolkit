"use client";

import React, { useState } from "react";
import * as Icons from "lucide-react";
import { ToolCategory } from "../types/tool";

export default function AdvancedTools() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isGridView, setIsGridView] = useState(true);
  const [sortBy, setSortBy] = useState<"name" | "popularity" | "newest">("popularity");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentTools, setRecentTools] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({});

  // Enhanced categories with subcategories and tools
  const enhancedCategories: (ToolCategory & { 
    tools: Array<{
      id: string;
      name: string;
      description: string;
      icon: string;
      isNew?: boolean;
      isPopular?: boolean;
      isPro?: boolean;
      tags: string[];
      usageCount?: number;
    }>;
    subcategories?: Array<{
      id: string;
      name: string;
      icon: string;
      tools: string[];
    }>;
  })[] = [
    {
      id: "calculators",
      name: "Calculators",
      slug: "calculators",
      description: "Financial, mathematical, and health calculators.",
      icon: "Calculator",
      color: "#3B82F6",
      tools: [
        {
          id: "emi-calculator",
          name: "EMI Calculator",
          description: "Calculate monthly loan payments with detailed amortization schedule",
          icon: "Landmark",
          isNew: true,
          isPopular: true,
          tags: ["finance", "loan", "emi"],
          usageCount: 15420
        },
        {
          id: "sip-calculator",
          name: "SIP Calculator",
          description: "Calculate mutual fund returns with systematic investment plans",
          icon: "TrendingUp",
          isPopular: true,
          tags: ["investment", "sip", "mutual-fund"],
          usageCount: 12890
        },
        {
          id: "fd-calculator",
          name: "FD Calculator",
          description: "Calculate fixed deposit returns with compounding interest",
          icon: "PiggyBank",
          tags: ["finance", "fd", "interest"],
          usageCount: 9870
        },
        {
          id: "gst-calculator",
          name: "GST Calculator",
          description: "Calculate GST amounts for different tax slabs",
          icon: "Receipt",
          isPopular: true,
          tags: ["tax", "gst", "finance"],
          usageCount: 21560
        },
        {
          id: "scientific-calculator",
          name: "Scientific Calculator",
          description: "Advanced scientific calculations with multiple functions",
          icon: "Brain",
          tags: ["math", "science", "advanced"],
          usageCount: 7650
        },
        {
          id: "bmi-calculator",
          name: "BMI Calculator",
          description: "Calculate body mass index with health recommendations",
          icon: "Heart",
          tags: ["health", "fitness", "bmi"],
          usageCount: 18920
        }
      ]
    },
    {
      id: "converters",
      name: "Converters",
      slug: "converters",
      description: "Unit, currency, and data converters.",
      icon: "RefreshCw",
      color: "#10B981",
      tools: [
        {
          id: "currency-converter",
          name: "Currency Converter",
          description: "Real-time currency conversion with 180+ currencies",
          icon: "DollarSign",
          isPopular: true,
          isPro: true,
          tags: ["finance", "currency", "exchange"],
          usageCount: 34210
        },
        {
          id: "unit-converter",
          name: "Unit Converter",
          description: "Convert between various units of measurement",
          icon: "Ruler",
          isPopular: true,
          tags: ["measurement", "units", "conversion"],
          usageCount: 28760
        },
        {
          id: "temperature-converter",
          name: "Temperature Converter",
          description: "Convert between Celsius, Fahrenheit, and Kelvin",
          icon: "Thermometer",
          tags: ["temperature", "weather", "science"],
          usageCount: 15670
        },
        {
          id: "time-converter",
          name: "Time Converter",
          description: "Convert between different time formats and zones",
          icon: "Clock",
          tags: ["time", "timezone", "conversion"],
          usageCount: 12340
        },
        {
          id: "data-converter",
          name: "Data Converter",
          description: "Convert between data storage units (bytes, KB, MB, GB)",
          icon: "HardDrive",
          tags: ["data", "storage", "digital"],
          usageCount: 19870
        }
      ]
    },
    {
      id: "text-tools",
      name: "Text Tools",
      slug: "text-tools",
      description: "Case converter, word counter, and text cleaner.",
      icon: "Type",
      color: "#F59E0B",
      tools: [
        {
          id: "text-case-converter",
          name: "Text Case Converter",
          description: "Convert text between different cases (upper, lower, title, etc.)",
          icon: "CaseUpper",
          isPopular: true,
          tags: ["text", "case", "formatting"],
          usageCount: 25430
        },
        {
          id: "word-counter",
          name: "Word Counter",
          description: "Count words, characters, sentences, and paragraphs",
          icon: "Hash",
          isPopular: true,
          tags: ["text", "counting", "writing"],
          usageCount: 31240
        },
        {
          id: "text-cleaner",
          name: "Text Cleaner",
          description: "Remove extra spaces, formatting, and clean text",
          icon: "Eraser",
          tags: ["text", "cleaning", "formatting"],
          usageCount: 18760
        },
        {
          id: "text-to-speech",
          name: "Text to Speech",
          description: "Convert text to speech with multiple voice options",
          icon: "Volume2",
          isPro: true,
          tags: ["audio", "tts", "accessibility"],
          usageCount: 14560
        },
        {
          id: "text-summarizer",
          name: "Text Summarizer",
          description: "Summarize long texts using AI-powered algorithms",
          icon: "FileText",
          isPro: true,
          isNew: true,
          tags: ["ai", "summary", "content"],
          usageCount: 9870
        }
      ]
    }
  ];

  // Filter tools based on search and filters
  const filteredTools = enhancedCategories.flatMap(category => 
    category.tools
      .filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tool.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
        
        const matchesFilters = Object.keys(selectedFilters).length === 0 || 
                              Object.entries(selectedFilters)
                                .filter(([, selected]) => selected)
                                .some(([filter]) => tool.tags.includes(filter));
        
        return matchesSearch && matchesFilters;
      })
      .map(tool => ({ ...tool, category: category.name, categoryColor: category.color }))
  );

  // Sort tools
  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "popularity":
        return (b.usageCount || 0) - (a.usageCount || 0);
      case "newest":
        return (a.isNew ? 1 : 0) - (b.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  // Toggle favorite
  const toggleFavorite = (toolId: string) => {
    setFavorites(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  // Track tool usage
  const trackToolUsage = (toolId: string) => {
    setRecentTools(prev => [toolId, ...prev.filter(id => id !== toolId)].slice(0, 10));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Advanced Tools Suite</h1>
            <p className="text-slate-600">Professional-grade tools with enhanced features and dynamic capabilities</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsGridView(!isGridView)}
              className={`p-3 rounded-xl border transition-all ${
                isGridView 
                  ? "bg-slate-900 text-white border-slate-900" 
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {isGridView ? <Icons.Grid className="h-5 w-5" /> : <Icons.List className="h-5 w-5" />}
            </button>
            
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popularity' | 'name' | 'newest')}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm font-bold uppercase tracking-widest text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="popularity">POPULARITY</option>
                <option value="name">NAME</option>
                <option value="newest">NEWEST</option>
              </select>
              <Icons.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <Icons.Filter className="h-4 w-4" />
              Filters
              {Object.keys(selectedFilters).filter(key => selectedFilters[key]).length > 0 && (
                <span className="bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {Object.keys(selectedFilters).filter(key => selectedFilters[key]).length}
                </span>
              )}
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex flex-wrap gap-2">
                {["finance", "text", "conversion", "ai", "health", "productivity"].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedFilters(prev => ({
                      ...prev,
                      [tag]: !prev[tag]
                    }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                      selectedFilters[tag]
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tools Grid/List */}
      <div className="max-w-7xl mx-auto">
        {isGridView ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedTools.map((tool) => {
              const IconComponent = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
              return (
                <div 
                  key={tool.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110"
                      style={{ backgroundColor: tool.categoryColor }}
                    >
                      <IconComponent className="h-6 w-6 stroke-[2.5]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleFavorite(tool.id)}
                        className={`p-2 rounded-lg transition-all ${
                          favorites.includes(tool.id)
                            ? "text-red-500 bg-red-50"
                            : "text-slate-300 hover:text-red-500 hover:bg-red-50"
                        }`}
                      >
                        <Icons.Heart className={`h-4 w-4 ${favorites.includes(tool.id) ? "fill-current" : ""}`} />
                      </button>
                      {tool.isPro && (
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">
                          PRO
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-black text-lg text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                    {tool.name}
                    {tool.isNew && (
                      <span className="bg-green-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase ml-2">
                        NEW
                      </span>
                    )}
                    {tool.isPopular && (
                      <span className="bg-blue-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase ml-2">
                        POPULAR
                      </span>
                    )}
                  </h3>
                  
                  <p className="text-slate-600 text-sm mb-4">{tool.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {tool.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Icons.BarChart3 className="h-3 w-3 text-slate-400" />
                        <span className="text-[10px] text-slate-500">{tool.usageCount?.toLocaleString()}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => trackToolUsage(tool.id)}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2"
                    >
                      Use Tool
                      <Icons.ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 divide-y divide-slate-100">
            {sortedTools.map((tool) => {
              const IconComponent = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
              return (
                <div 
                  key={tool.id}
                  className="p-6 hover:bg-slate-50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: tool.categoryColor }}
                    >
                      <IconComponent className="h-6 w-6 stroke-[2.5]" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-black text-lg text-slate-900 group-hover:text-slate-700 transition-colors">
                          {tool.name}
                        </h3>
                        {tool.isNew && (
                          <span className="bg-green-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase">
                            NEW
                          </span>
                        )}
                        {tool.isPopular && (
                          <span className="bg-blue-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase">
                            POPULAR
                          </span>
                        )}
                        {tool.isPro && (
                          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase">
                            PRO
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 text-sm mb-2">{tool.description}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          {tool.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Icons.BarChart3 className="h-3 w-3 text-slate-400" />
                          <span className="text-[10px] text-slate-500">{tool.usageCount?.toLocaleString()} uses</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icons.Tag className="h-3 w-3 text-slate-400" />
                          <span className="text-[10px] text-slate-500">{tool.tags.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleFavorite(tool.id)}
                        className={`p-2 rounded-lg transition-all ${
                          favorites.includes(tool.id)
                            ? "text-red-500 bg-red-50"
                            : "text-slate-300 hover:text-red-500 hover:bg-red-50"
                        }`}
                      >
                        <Icons.Heart className={`h-5 w-5 ${favorites.includes(tool.id) ? "fill-current" : ""}`} />
                      </button>
                      <button 
                        onClick={() => trackToolUsage(tool.id)}
                        className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2"
                      >
                        Use
                        <Icons.ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {sortedTools.length === 0 && (
          <div className="text-center py-16">
            <Icons.SearchX className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-black text-slate-900 mb-2">No tools found</h3>
            <p className="text-slate-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Quick Access Panel */}
      {recentTools.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 max-w-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-black text-sm text-slate-900">Recently Used</h4>
              <button 
                onClick={() => setRecentTools([])}
                className="text-slate-400 hover:text-slate-600"
              >
                <Icons.X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              {recentTools.slice(0, 3).map(toolId => {
                const tool = enhancedCategories.flatMap(cat => cat.tools).find(t => t.id === toolId);
                if (!tool) return null;
                const IconComponent = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                return (
                  <button
                    key={toolId}
                    onClick={() => trackToolUsage(toolId)}
                    className="flex items-center gap-3 w-full p-2 hover:bg-slate-50 rounded-lg transition-all"
                  >
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: '#3B82F6' }}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-900 truncate">{tool.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}