"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Search, X, Zap, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { tools } from "@/data/tools";
import Fuse from "fuse.js";
import Link from "next/link";

interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon?: string;
  isPopular?: boolean;
  seo?: {
    keywords?: string[];
  };
}

export default function ModernSearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Tool[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Prepare tools for search with keywords
  const toolsWithKeywords = useMemo(() => 
    tools.map(tool => ({
      ...tool,
      keywords: tool.seo?.keywords?.join(' ') || ''
    })), 
  []);

  const fuse = useMemo(() => new Fuse(toolsWithKeywords, {
    keys: ['name', 'description', 'category', 'keywords'],
    includeScore: true,
    threshold: 0.4,
    minMatchCharLength: 1,
    shouldSort: true,
    findAllMatches: true,
  }), [toolsWithKeywords]);

  // Search effect
  useEffect(() => {
    if (query.length >= 2) {
      setIsSearching(true);
      const searchResults = fuse.search(query);
      const filtered = searchResults.slice(0, 6).map((result: any) => result.item);
      setResults(filtered);
      setActiveIndex(-1);
    } else {
      setIsSearching(false);
      setResults([]);
    }
  }, [query, fuse]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle result click
  const handleResultClick = useCallback((tool: Tool) => {
    router.push(`/tool/${tool.slug}`);
  }, [router]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          setIsOpen(true);
          inputRef.current?.focus();
        }
        return;
      }
      
      const totalItems = results.length;
      
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev < totalItems - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : totalItems - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (query.length >= 2 && results.length > 0) {
          if (activeIndex >= 0 && results[activeIndex]) {
            handleResultClick(results[activeIndex]);
          } else {
            handleResultClick(results[0]);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, query, results, activeIndex, handleResultClick]);

  // Get category color
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'converters': '#0ea5e9',
      'calculators': '#22c55e',
      'generators': '#8b5cf6',
      'ai-tools': '#f59e0b',
      'text-tools': '#ec4899',
      'developers': '#6366f1',
      'design': '#14b8a6',
      'media': '#ef4444',
      'data': '#8b5cf6',
    };
    return colors[category.toLowerCase()] || '#10b981';
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={wrapperRef}>
      {/* Search Input */}
      <div className={`
        relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300
        ${isOpen ? 'rounded-b-none' : 'border-slate-200'}
        ${isOpen ? 'ring-4 ring-green-500/10' : ''}
      `}>
        <div className="flex items-center px-5 py-4">
          <Search className={`h-6 w-6 transition-colors ${query ? 'text-green-500' : 'text-slate-400'}`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search 500+ tools..."
            className="flex-1 px-4 text-lg font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button 
              onClick={() => {
                setQuery("");
                setResults([]);
                inputRef.current?.focus();
              }}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-all"
              aria-label="Clear search"
            >
              <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
            </button>
          )}
          <kbd className="ml-2 px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-400">⌘K</kbd>
        </div>
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-b-2xl shadow-xl border-2 border-t-0 border-green-400 z-100 overflow-hidden animate-fade-in">
          {query.length < 2 ? (
            // Empty state - show hint
            <div className="p-8 text-center">
              <Sparkles className="h-12 w-12 mx-auto mb-3 text-slate-300" />
              <p className="text-slate-500 font-medium">Start typing to search for tools...</p>
              <p className="text-slate-400 text-sm mt-1">Try "image", "convert", "calculator", etc.</p>
            </div>
          ) : isSearching && results.length === 0 ? (
            // Loading state
            <div className="p-8 text-center">
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-green-500" />
              <p className="text-slate-500 font-medium mt-2">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            // Results
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                {results.length} Results for "{query}"
              </div>
              <div className="space-y-1 px-2">
                {results.map((tool, index) => (
                  <button
                    key={tool.id}
                    onClick={() => handleResultClick(tool)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left
                      ${index === activeIndex 
                        ? 'bg-green-50 border border-green-200 shadow-sm' 
                        : 'hover:bg-slate-50 border border-transparent'
                      }
                    `}
                  >
                    <div 
                      className="h-11 w-11 rounded-xl flex items-center justify-center text-white shadow-md shrink-0 transition-transform duration-200 hover:scale-105"
                      style={{ backgroundColor: getCategoryColor(tool.category) }}
                    >
                      <Zap className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {tool.name}
                        </h4>
                        {tool.isPopular && (
                          <span className="px-1.5 py-0.5 bg-amber-100 text-amber-600 rounded text-[9px] font-bold shrink-0">
                            HOT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {tool.description}
                      </p>
                    </div>
                    
                    <ArrowRight className={`h-5 w-5 shrink-0 transition-colors ${
                      index === activeIndex ? 'text-green-500' : 'text-slate-300'
                    }`} />
                  </button>
                ))}
              </div>
              
              {/* View All */}
              <div className="px-4 py-3 mt-2 border-t border-slate-100">
                <Link
                  href={`/tools?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-xl text-sm font-bold uppercase tracking-wide hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg"
                >
                  View All {results.length} Results
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            // No results
            <div className="p-8 text-center">
              <Search className="h-12 w-12 mx-auto mb-3 text-slate-300" />
              <h3 className="text-lg font-bold text-slate-700 mb-2">No results found</h3>
              <p className="text-sm text-slate-500 mb-4">
                We couldn't find any tools matching "{query}"
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setResults([]);
                  inputRef.current?.focus();
                }}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
