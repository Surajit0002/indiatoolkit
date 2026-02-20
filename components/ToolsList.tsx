"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Filter, X,  Zap, Settings2 } from "lucide-react";
import { Tool, ToolCategory } from "@/types/tool";
import ToolCard from "./ToolCard";

interface ToolsListProps {
  initialTools: Tool[];
  categories: ToolCategory[];
}

export default function ToolsList({ initialTools, categories }: ToolsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPopularOnly, setIsPopularOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Close filter drawer on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFilterOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const filteredTools = useMemo(() => {
    return initialTools.filter((tool) => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.seo.keywords?.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory ? tool.category === selectedCategory : true;
      const matchesPopular = isPopularOnly ? tool.isPopular : true;
      
      return matchesSearch && matchesCategory && matchesPopular;
    });
  }, [initialTools, searchQuery, selectedCategory, isPopularOnly]);

  return (
    <>
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 sticky top-20 z-50 py-4 bg-[#fcfdfe]/80 backdrop-blur-xl">
        <div className="relative grow group">
          <div className="absolute inset-0 bg-blue-600/5 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center">
            <Search className="absolute left-5 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across the global repository..."
              className="w-full h-16 pl-14 pr-12 rounded-[22px] bg-white border border-slate-200 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 text-sm font-bold uppercase tracking-widest text-slate-700 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-5 text-slate-400 hover:text-slate-600 p-2"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
        
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="h-16 px-8 rounded-[22px] bg-slate-900 text-white flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200/50 group shrink-0"
        >
          <Settings2 className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Filters</span>
          {selectedCategory && (
            <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></div>
          )}
        </button>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTools.map(tool => (
            <div key={tool.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-slate-200 shadow-sm">
          <div className="h-20 w-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-slate-300">
            <Search className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase italic tracking-tighter">No items detected</h3>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] opacity-60">Try adjusting your search parameters</p>
          <button 
            onClick={() => {setSearchQuery(""); setSelectedCategory(null);}}
            className="mt-10 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl"
          >
            Reset Matrix
          </button>
        </div>
      )}

      {/* Right-side Slide Filter Drawer */}
      <div 
        className={`fixed inset-0 z-1000 pointer-events-none ${isFilterOpen ? "pointer-events-auto" : ""}`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${
            isFilterOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsFilterOpen(false)}
        ></div>

        {/* Drawer Content */}
        <div 
          className={`absolute top-0 right-0 h-full w-full max-w-100 bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-out transform p-8 flex flex-col pointer-events-auto ${
            isFilterOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-12">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-1">Configuration</span>
              <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Filter Matrix</h2>
            </div>
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grow overflow-y-auto space-y-10">
            {/* Quick Filters */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <Zap className="h-3 w-3" /> Priority Access
              </h3>
              <button 
                onClick={() => setIsPopularOnly(!isPopularOnly)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${
                  isPopularOnly 
                    ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200" 
                    : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-white hover:border-blue-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${isPopularOnly ? "bg-white/20" : "bg-blue-600/10 text-blue-600"}`}>
                    <Zap className={`h-4 w-4 ${isPopularOnly ? "fill-white" : "fill-current"}`} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest italic">Popular Tools Only</span>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${isPopularOnly ? "bg-white/30" : "bg-slate-200"}`}>
                  <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform ${isPopularOnly ? "translate-x-5" : "translate-x-0"}`}></div>
                </div>
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <Filter className="h-3 w-3" /> Select Category
              </h3>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all border ${
                    selectedCategory === null 
                      ? "bg-slate-900 text-white border-slate-900 shadow-xl" 
                      : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-white hover:border-blue-200"
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest italic">All Collections</span>
                  <div className={`h-4 w-4 rounded-full border-2 ${selectedCategory === null ? "bg-blue-500 border-blue-400" : "border-slate-200"}`}></div>
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all border group ${
                      selectedCategory === cat.slug
                        ? "bg-slate-900 text-white border-slate-900 shadow-xl"
                        : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-white hover:border-blue-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                       <div 
                        className={`h-6 w-6 rounded-lg flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110 ${selectedCategory === cat.slug ? "opacity-100" : "opacity-80"}`}
                        style={{ backgroundColor: cat.color }}
                       >
                         {/* Dynamic Icon placeholder */}
                         <Zap className="h-3 w-3 fill-current" />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest italic">{cat.name}</span>
                    </div>
                    <div className={`h-4 w-4 rounded-full border-2 ${selectedCategory === cat.slug ? "bg-blue-500 border-blue-400" : "border-slate-200"}`}></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
             <button 
              onClick={() => {setSelectedCategory(null); setIsPopularOnly(false); setIsFilterOpen(false);}}
              className="py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-200 transition-all"
             >
               Reset
             </button>
             <button 
              onClick={() => setIsFilterOpen(false)}
              className="py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-900 transition-all shadow-xl shadow-blue-200"
             >
               Apply
             </button>
          </div>
        </div>
      </div>
    </>
  );
}
