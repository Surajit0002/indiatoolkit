"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Zap, ArrowRight, Grid, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { tools } from "@/data/tools";
import { Tool } from "@/types/tool";
import { getCategoryBySlug } from "@/lib/utils";
import Link from "next/link";
import Fuse from "fuse.js";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Tool[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Prepare tools data with flattened keywords for search
  const toolsWithKeywords = tools.map(tool => ({
    ...tool,
    keywords: tool.seo.keywords?.join(' ') || ''
  }));

  // Initialize Fuse.js for fuzzy search
  const fuse = new Fuse(toolsWithKeywords, {
    keys: ['name', 'description', 'category', 'keywords'],
    includeScore: true,
    threshold: 0.3,
    minMatchCharLength: 2,
    shouldSort: true,
    findAllMatches: true,
  });

  useEffect(() => {
    if (query.length > 1) {
      const fuseResults = fuse.search(query);
      const filtered = fuseResults.slice(0, 6).map(result => result.item);
      setResults(filtered);
      setIsOpen(true);
      setActiveIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        const selectedTool = results[activeIndex];
        router.push(`/tool/${selectedTool.slug}`);
        setIsOpen(false);
        setQuery("");
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, activeIndex, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Highlight matched terms
  const highlightMatch = (text: string, q: string) => {
    if (!q) return text;
    const regex = new RegExp(`(${q})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? <span key={i} className="bg-green-200 text-green-900 px-0.5 rounded font-bold">{part}</span> : part
    );
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition-all duration-500"></div>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-green-600 transition-all z-10" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          placeholder="Search tools..."
          aria-label="Search for tools"
          className="relative w-full h-10 pl-11 pr-10 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm"
        />
        {query && (
          <button 
            onClick={() => { setQuery(""); setIsOpen(false); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-all z-10"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Modal */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-green-500" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Search Results</span>
            </div>
            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{results.length} found</span>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto">
            {results.length > 0 ? (
              <div className="p-2">
                {results.map((tool, index) => (
                  <Link
                    key={tool.id}
                    href={`/tool/${tool.slug}`}
                    onClick={() => { setIsOpen(false); setQuery(""); }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                      index === activeIndex ? 'bg-green-50 ring-1 ring-green-200' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div 
                      className="h-10 w-10 rounded-lg flex items-center justify-center text-white shadow-md"
                      style={{ backgroundColor: getCategoryBySlug(tool.category)?.color || '#10b981' }}
                    >
                      <Zap className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-slate-900 truncate">
                        {highlightMatch(tool.name, query)}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {highlightMatch(tool.description, query)}
                      </div>
                    </div>
                    <ArrowRight className={`h-4 w-4 text-slate-300 transition-all ${index === activeIndex ? 'text-green-500 translate-x-1' : ''}`} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Search className="h-12 w-12 text-slate-200 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-600">No tools found</p>
                <p className="text-xs text-slate-400 mt-1">Try different keywords</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
            <Link
              href="/tools"
              onClick={() => { setIsOpen(false); setQuery(""); }}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wide hover:bg-green-600 transition-all"
            >
              <Grid className="h-4 w-4" />
              Browse All Tools
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
