"use client";

import React, { useState, useEffect } from "react";
import { 
  Settings, 

  Eye, 
  Download, 
  Upload, 
  Zap,
  Users,
  Search,
  Grid,
  List,
  Star,
  Share2,
  Copy,
  Check
} from "lucide-react";
import { Tool, UserToolConfig } from "../types/tool";
import { getAllDynamicTools } from "../data/dynamicTools";
import { advancedTools } from "../data/advancedTools";

interface ToolManagementSystemProps {
  userId?: string;
  onToolSelect?: (tool: Tool) => void;
}

export default function ToolManagementSystem({ userId, onToolSelect }: ToolManagementSystemProps) {
  const [tools, setTools] = useState<Tool[]>([
    ...getAllDynamicTools() as unknown as Tool[],
    ...advancedTools as unknown as Tool[]
  ]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "popularity" | "date" | "rating">("popularity");
  const [showFavorites, setShowFavorites] = useState(false);
  const [userTools, setUserTools] = useState<UserToolConfig[]>([]);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [showToolDetail, setShowToolDetail] = useState(false);
  const [copiedToolId, setCopiedToolId] = useState<string | null>(null);

  // Filter and sort tools
  useEffect(() => {
    let result = [...tools];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(tool => tool.category === selectedCategory);
    }
    
    // Apply favorites filter
    if (showFavorites) {
      const favoriteIds = userTools.filter(ut => ut.isFavorite).map(ut => ut.toolId);
      result = result.filter(tool => favoriteIds.includes(tool.id));
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "popularity":
          return (b.usageCount || 0) - (a.usageCount || 0);
        case "date":
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });
    
    const timeoutId = setTimeout(() => {
      setFilteredTools(result);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [tools, searchQuery, selectedCategory, sortBy, showFavorites, userTools]);

  // Load user tool configurations
  useEffect(() => {
    if (userId) {
      // Load user's tool preferences and configurations
      const savedTools = localStorage.getItem(`user-tools-${userId}`);
      if (savedTools) {
        const timeoutId = setTimeout(() => {
          setUserTools(JSON.parse(savedTools));
        }, 0);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [userId]);

  // Save user tool configurations
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`user-tools-${userId}`, JSON.stringify(userTools));
    }
  }, [userTools, userId]);

  const categories = Array.from(new Set(tools.map(tool => tool.category)));

  const handleToolSelect = (tool: Tool) => {
    setSelectedTool(tool);
    setShowToolDetail(true);
    if (onToolSelect) {
      onToolSelect(tool);
    }
  };

  const handleFavoriteToggle = (toolId: string) => {
    setUserTools(prev => {
      const existing = prev.find(ut => ut.toolId === toolId);
      if (existing) {
        return prev.map(ut => 
          ut.toolId === toolId ? { ...ut, isFavorite: !ut.isFavorite } : ut
        );
      } else {
        return [...prev, { 
          toolId, 
          isFavorite: true, 
          isPinned: false,
          customConfig: {} 
        }];
      }
    });
  };



  const isToolFavorite = (toolId: string) => {
    return userTools.find(ut => ut.toolId === toolId)?.isFavorite || false;
  };


  const handleCopyToolLink = async (toolId: string) => {
    try {
      const tool = tools.find(t => t.id === toolId);
      if (tool) {
        const url = `${window.location.origin}/tool/${tool.slug}`;
        await navigator.clipboard.writeText(url);
        setCopiedToolId(toolId);
        setTimeout(() => setCopiedToolId(null), 2000);
      }
    } catch (error) {
      console.error("Failed to copy tool link:", error);
    }
  };

  const handleExportConfig = () => {
    const config = {
      tools: userTools,
      preferences: {
        viewMode,
        sortBy,
        showFavorites
      },
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tool-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target?.result as string);
          if (config.tools) {
            setUserTools(config.tools);
          }
          if (config.preferences) {
            setViewMode(config.preferences.viewMode || "grid");
            setSortBy(config.preferences.sortBy || "popularity");
            setShowFavorites(config.preferences.showFavorites || false);
          }
        } catch (error) {
          console.error("Failed to import configuration:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
              <Settings className="h-8 w-8 text-green-600" />
              Tool Management Center
            </h1>
            <p className="text-slate-600 text-lg">
              Advanced tools management with AI-powered features and real-time collaboration
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white rounded-xl p-2 border border-slate-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-green-100 text-green-700" : "text-slate-400 hover:text-slate-600"}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-green-100 text-green-700" : "text-slate-400 hover:text-slate-600"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-2 bg-white rounded-xl p-2 border border-slate-200">
              <Upload className="h-4 w-4 text-slate-500" />
              <input 
                type="file" 
                accept=".json"
                onChange={handleImportConfig}
                className="hidden"
                id="import-config"
              />
              <label 
                htmlFor="import-config"
                className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Import
              </label>
              <button
                onClick={handleExportConfig}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors"
              >
                <Download className="h-3 w-3" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl p-6 mt-6 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tools, categories, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "popularity" | "date" | "rating")}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
          
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                showFavorites 
                  ? "bg-green-600 text-white" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Star className="h-4 w-4" />
              Show Favorites
            </button>
            
            <div className="text-xs text-slate-500">
              {filteredTools.length} tools found
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid/List */}
      <div className="max-w-7xl mx-auto">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <div key={tool.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110"
                    style={{ backgroundColor: tool.accentColor || tool.backgroundColor || '#64748b' }}
                  >
                    <div 
                      className="text-white h-6 w-6 stroke-[2.5]" 
                      dangerouslySetInnerHTML={{ __html: tool.svgIcon?.replace('<svg', `<svg fill="${tool.color}" stroke="none"`) || '' }}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleFavoriteToggle(tool.id)}
                      className={`p-2 rounded-lg transition-all ${
                        isToolFavorite(tool.id) 
                          ? "text-yellow-500 bg-yellow-50" 
                          : "text-slate-300 hover:text-yellow-500 hover:bg-yellow-50"
                      }`}
                    >
                      <Star className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => handleCopyToolLink(tool.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-green-600 hover:bg-green-50 transition-all"
                    >
                      {copiedToolId === tool.id ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <h3 className="font-black text-lg text-slate-900 mb-2">{tool.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{tool.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                    {tool.category}
                  </span>
                  {tool.tags?.slice(0, 2).map(tag => (
                    <span key={tag} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {tool.usageCount?.toLocaleString() || 0}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {tool.rating || 0}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleToolSelect(tool)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all"
                  >
                    <Eye className="h-4 w-4" />
                    View Tool
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {filteredTools.map((tool) => (
                <div key={tool.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div 
                      className="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: tool.accentColor || tool.backgroundColor || '#64748b' }}
                    >
                      <div 
                        className="text-white h-6 w-6 stroke-[2.5]" 
                        dangerouslySetInnerHTML={{ __html: tool.svgIcon?.replace('<svg', `<svg fill="${tool.color}" stroke="none"`) || '' }}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-black text-lg text-slate-900">{tool.name}</h3>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                          {tool.category}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm mb-2">{tool.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {tool.tags?.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right text-xs text-slate-500">
                        <div className="flex items-center gap-1 mb-1">
                          <Users className="h-3 w-3" />
                          {tool.usageCount?.toLocaleString() || 0} uses
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {tool.rating || 0} rating
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleFavoriteToggle(tool.id)}
                          className={`p-2 rounded-lg transition-all ${
                            isToolFavorite(tool.id) 
                              ? "text-yellow-500 bg-yellow-50" 
                              : "text-slate-300 hover:text-yellow-500 hover:bg-yellow-50"
                          }`}
                        >
                          <Star className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => handleToolSelect(tool)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No tools found</h3>
              <p className="text-slate-600">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>

      {/* Tool Detail Modal */}
      {showToolDetail && selectedTool && (
        <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900">{selectedTool.name}</h2>
              <button
                onClick={() => setShowToolDetail(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <svg className="h-6 w-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="prose max-w-none">
                    <p className="text-slate-600 mb-6">{selectedTool.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-slate-50 rounded-xl p-4">
                        <div className="text-2xl font-black text-slate-900">
                          {selectedTool.usageCount?.toLocaleString() || 0}
                        </div>
                        <div className="text-sm text-slate-600">Total Uses</div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4">
                        <div className="text-2xl font-black text-slate-900">
                          {selectedTool.rating || 0}
                        </div>
                        <div className="text-sm text-slate-600">Average Rating</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedTool.tags?.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-slate-50 rounded-2xl p-6">
                    <h3 className="font-black text-lg text-slate-900 mb-4">Tool Actions</h3>
                    
                    <div className="space-y-3">
                      <button className="w-full flex items-center gap-3 p-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors">
                        <Zap className="h-5 w-5" />
                        Use Tool
                      </button>
                      
                      <button 
                        onClick={() => handleFavoriteToggle(selectedTool.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-colors ${
                          isToolFavorite(selectedTool.id)
                            ? "bg-yellow-500 text-white hover:bg-yellow-600"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <Star className="h-5 w-5" />
                        {isToolFavorite(selectedTool.id) ? "Remove Favorite" : "Add Favorite"}
                      </button>
                      
                      <button 
                        onClick={() => handleCopyToolLink(selectedTool.id)}
                        className="w-full flex items-center gap-3 p-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                      >
                        <Share2 className="h-5 w-5" />
                        Share Tool
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
