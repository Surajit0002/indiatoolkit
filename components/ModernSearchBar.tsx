"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Search, X, Zap, ArrowRight, Loader2, TrendingUp, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { tools } from "@/data/tools";
import Fuse from "fuse.js";

interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon?: string;
  isPopular?: boolean;
  isNew?: boolean;
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Categories for tabs
  const categories = [
    { id: null, label: 'All Tools' },
    { id: 'ai-tools', label: 'AI Tools' },
    { id: 'converters', label: 'Converters' },
    { id: 'calculators', label: 'Calculators' },
    { id: 'generators', label: 'Generators' },
  ];

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

  // Popular tools for quick access
  const popularTools = useMemo(() => 
    tools.filter(t => t.isPopular).slice(0, 6),
  []);

  // Search effect
  useEffect(() => {
    if (query.length >= 1) {
      setIsSearching(true);
      const searchResults = fuse.search(query);
      let filtered = searchResults.slice(0, 10).map((result: { item: typeof tools[0] }) => result.item);
      
      // Filter by category if selected
      if (selectedCategory) {
        filtered = filtered.filter(t => t.category.toLowerCase() === selectedCategory.toLowerCase());
      }
      
      const timeoutId = setTimeout(() => {
        setResults(filtered);
        setIsSearching(false);
        setActiveIndex(-1);
      }, 100);
      return () => clearTimeout(timeoutId);
    } else {
      setIsSearching(false);
      setResults([]);
      setActiveIndex(-1);
    }
  }, [query, fuse, selectedCategory]);

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

  // Auto open on focus
  const handleFocus = () => {
    setIsOpen(true);
  };

  // Handle result click
  const handleResultClick = useCallback((tool: Tool) => {
    router.push(`/tool/${tool.slug}`);
    setIsOpen(false);
    setQuery("");
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
        if (results.length > 0) {
          if (activeIndex >= 0 && results[activeIndex]) {
            handleResultClick(results[activeIndex]);
          } else if (results[0]) {
            handleResultClick(results[0]);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, activeIndex, handleResultClick]);

  return (
    <div className="relative w-full max-w-[800px] mx-auto" ref={wrapperRef}>
      {/* Search Input - Premium SaaS Style */}
      <div className={`
        relative bg-white rounded-2xl shadow-sm border transition-all duration-200 overflow-visible
        ${isOpen 
          ? 'rounded-b-none border-white ring-2 ring-green-500/20' 
          : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
        }
      `}>
        <div className="flex items-center px-6 py-4">
          <Search className={`h-5 w-5 transition-colors shrink-0 ${query ? 'text-green-500' : 'text-slate-400'}`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={handleFocus}
            placeholder="Search for tools, converters, calculators..."
            className="flex-1 px-4 text-[15px] font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none bg-transparent broder-0"
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
              <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
            </button>
          )}
          <kbd className="ml-2 hidden sm:flex items-center gap-1 px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-400">
            <span>⌘</span><span>K</span>
          </kbd>
        </div>
      </div>

      {/* Search Dropdown - Premium Modal */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-b-2xl shadow-xl border border-t-0 border-slate-200 z-[99999] overflow-visible"
          style={{ clipPath: 'none' }}
        >
          {/* Category Tabs */}
          <div className="px-4 py-3 border-b border-slate-100 flex gap-1 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat.id || 'all'}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat.id 
                    ? 'bg-green-500 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="max-h-[400px] overflow-y-auto">
            {query.length < 1 ? (
              // Trending Tools
              <div className="p-4">
                <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Trending Tools
                </div>
                <div className="space-y-1">
                  {popularTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleResultClick(tool)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 text-left group"
                    >
                      <div 
                        className="h-10 w-10 rounded-lg flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: getCategoryColor(tool.category) }}
                      >
                        <Zap className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800 text-sm">{tool.name}</span>
                          {tool.isNew && (
                            <span className="px-1.5 py-0.5 bg-green-100 text-green-600 text-[10px] font-bold rounded">NEW</span>
                          )}
                          {tool.isPopular && (
                            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                          )}
                        </div>
                        <span className="text-xs text-slate-500 truncate block">{tool.description}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            ) : isSearching && results.length === 0 ? (
              <div className="p-8 text-center">
                <Loader2 className="h-6 w-6 mx-auto animate-spin text-green-500" />
                <p className="text-slate-500 font-medium mt-2">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-medium text-slate-500">
                  {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
                </div>
                <div className="space-y-1">
                  {results.map((tool, index) => (
                    <button
                      key={tool.id}
                      onClick={() => handleResultClick(tool)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left
                        ${index === activeIndex 
                          ? 'bg-green-50 border border-green-200' 
                          : 'hover:bg-slate-50 border border-transparent'
                        }
                      `}
                    >
                      <div 
                        className="h-10 w-10 rounded-lg flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: getCategoryColor(tool.category) }}
                      >
                        <Zap className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800 text-sm">{tool.name}</span>
                          {tool.isNew && (
                            <span className="px-1.5 py-0.5 bg-green-100 text-green-600 text-[10px] font-bold rounded">NEW</span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500 truncate block">{tool.description}</span>
                      </div>
                      <ArrowRight className={`h-4 w-4 text-slate-300 transition-all ${index === activeIndex ? 'text-green-500 translate-x-1' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Search className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                <p className="text-slate-600 font-medium">No results found</p>
                <p className="text-slate-400 text-sm mt-1">Try different keywords</p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><ArrowRight className="h-3 w-3" /> select</span>
              <span className="flex items-center gap-1">↑↓ navigate</span>
            </div>
            <span>ESC close</span>
          </div>
        </div>
      )}
    </div>
  );
}

