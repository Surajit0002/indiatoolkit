"use client";

import { useState, useMemo } from "react";
import { User, Settings, History, Star, Search, Bookmark, Trash2, Filter } from "lucide-react";
import Link from "next/link";
import { tools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import { useFavorites } from "@/hooks/useUserData";

function DashboardLink({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-5 py-4 rounded-[10px] font-black text-[10px] uppercase tracking-widest transition-all group ${active ? "bg-slate-900 text-white shadow-xl shadow-slate-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
    >
      <div className={`transition-transform group-hover:scale-110 ${active ? "text-blue-400" : "text-slate-400 group-hover:text-blue-600"}`}>
        {icon}
      </div>
      {label}
    </Link>
  );
}

export default function SavedToolsClient() {
  const { favorites, removeFavorite, isLoading: favoritesLoading } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "name" | "category">("recent");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Get favorite tools
  const favoriteTools = useMemo(() => {
    return tools.filter(tool => favorites.includes(tool.id));
  }, [favorites]);

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let result = [...favoriteTools];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filterCategory !== "all") {
      result = result.filter(tool => tool.category === filterCategory);
    }

    // Sort
    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "category") {
      result.sort((a, b) => a.category.localeCompare(b.category));
    }
    // recent is default (by order in favorites array)

    return result;
  }, [favoriteTools, searchQuery, sortBy, filterCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(favoriteTools.map(tool => tool.category))].sort();
  }, [favoriteTools]);

  const handleRemoveFavorite = (toolId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeFavorite(toolId);
  };

  if (favoritesLoading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-amber-400/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[30%] right-[-10%] w-[400px] h-[400px] bg-green-400/10 blur-[100px] rounded-full"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container px-4 pt-16 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-3 space-y-1 sticky top-24">
              <DashboardLink href="/profile" icon={<User className="h-4 w-4" />} label="My Profile" />
              <DashboardLink href="/saved-tools" icon={<Bookmark className="h-4 w-4" />} label="Saved Tools" active />
              <DashboardLink href="/history" icon={<History className="h-4 w-4" />} label="Usage History" />
              <DashboardLink href="/settings" icon={<Settings className="h-4 w-4" />} label="Settings" />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
              <div className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
                    <Bookmark className="h-6 w-6 text-white" />
                  </div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight">Saved Tools</h1>
                </div>
                <p className="text-slate-500 font-medium text-sm mt-1">
                  {favorites.length} {favorites.length === 1 ? 'tool' : 'tools'} saved • Your personalized collection
                </p>
              </div>
              
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-100">
                {/* Search */}
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search saved tools..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-6 py-3.5 bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 text-sm font-medium w-full md:w-72 shadow-lg shadow-black/5" 
                  />
                </div>
                
                {/* Filter by Category */}
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="pl-12 pr-8 py-3.5 bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 text-sm font-medium w-full shadow-lg shadow-black/5 appearance-none cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort by:</span>
              <button
                onClick={() => setSortBy("recent")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  sortBy === "recent" 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Most Recent
              </button>
              <button
                onClick={() => setSortBy("name")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  sortBy === "name" 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Name
              </button>
              <button
                onClick={() => setSortBy("category")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  sortBy === "category" 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Category
              </button>
            </div>

            {/* Tools Grid or Empty State */}
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTools.map((tool, index) => (
                  <div 
                    key={tool.id} 
                    className="animate-fade-in-up relative group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ToolCard tool={tool} />
                    {/* Remove button */}
                    <button
                      onClick={(e) => handleRemoveFavorite(tool.id, e)}
                      className="absolute top-3 right-3 z-10 h-8 w-8 bg-red-500 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 shadow-lg"
                      title="Remove from favorites"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-16 text-center border border-dashed border-slate-200">
                <div className="h-24 w-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6 transform hover:rotate-12 transition-transform duration-300">
                  <Bookmark className="h-12 w-12 text-slate-300" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  {favorites.length === 0 ? "No saved tools yet" : "No matching tools found"}
                </h3>
                <p className="text-slate-500 font-medium text-sm mb-8 max-w-md mx-auto">
                  {favorites.length === 0 
                    ? "Start adding tools to your favorites by clicking the bookmark icon while browsing. Your saved tools will appear here for quick access."
                    : `No tools match "${searchQuery}" in your saved tools.`
                  }
                </p>
                {favorites.length === 0 && (
                  <Link 
                    href="/tools"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                  >
                    Browse Tools
                    <Bookmark className="h-4 w-4" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
