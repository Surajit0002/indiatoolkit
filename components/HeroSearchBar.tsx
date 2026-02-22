"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Search, X, Zap, ArrowRight, Sparkles, ArrowUpRight, Clock, Flame, Grid, History } from "lucide-react";
import { useRouter } from "next/navigation";
import { tools } from "@/data/tools";
import { getCategoryBySlug } from "@/lib/utils";
import Link from "next/link";
import Fuse from "fuse.js";

export default function HeroSearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Prepare tools for search with keywords
  const toolsWithKeywords = useMemo(() => 
    tools.map(tool => ({
      ...tool,
      keywords: tool.seo.keywords?.join(' ') || ''
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

  // Popular tools (static, doesn't change)
  const popularTools = useMemo(() => 
    tools.filter(t => t.isPopular).slice(0, 6),
    []
  );

  // Load search history with lazy initialization
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const history = localStorage.getItem('searchHistory');
      return history ? JSON.parse(history) : [];
    } catch {
      return [];
    }
  });

  // Save search to history
  const saveToHistory = useCallback((searchTerm: string) => {
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      const newHistory = [searchTerm, ...searchHistory.slice(0, 9)];
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  }, [searchHistory]);

  // Use useMemo for derived search results instead of useEffect with setState
  const results = useMemo(() => {
    if (query.length >= 1) {
      const searchResults = fuse.search(query);
      return searchResults.slice(0, 8).map((result: { item: typeof tools[0] }) => result.item);
    }
    return [];
  }, [query, fuse]);

  // Derive isSearching from query length
  const isSearching = query.length >= 1;

  // Handle query change - also resets activeIndex
  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setActiveIndex(-1);
  }, []);

  // Handle modal open/close
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    handleQueryChange("");
  }, [handleQueryChange]);

  // Handle input focus
  const handleFocus = useCallback(() => {
    openModal();
  }, [openModal]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  }, [closeModal]);

  // Clear search
  const clearSearch = useCallback(() => {
    handleQueryChange("");
    inputRef.current?.focus();
  }, [handleQueryChange]);

  // Handle result click
  const handleResultClick = useCallback((tool: typeof tools[0]) => {
    saveToHistory(query);
    router.push(`/tool/${tool.slug}`);
    closeModal();
  }, [query, router, saveToHistory, closeModal]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        // Open modal on Ctrl+K or Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          openModal();
        }
        return;
      }
      
      const totalItems = query.length >= 1 ? results.length : 0;
      
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        inputRef.current?.blur();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev < totalItems - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : totalItems - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (query.length >= 1 && results.length > 0) {
          if (activeIndex >= 0) {
            handleResultClick(results[activeIndex]);
          } else {
            handleResultClick(results[0]);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, query, results, activeIndex, handleResultClick, openModal, closeModal]);

  // Click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node) && !isOpen) {
        // Only close if modal is open
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          // This is handled by backdrop click
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Highlight matched text
  const highlightMatch = (text: string, q: string) => {
    if (!q || !isSearching) return text;
    const regex = new RegExp(`(${q})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) 
        ? <span key={i} className="bg-green-200 text-green-800 font-bold px-0.5 rounded">{part}</span> 
        : part
    );
  };

  // Clear history
  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  }, []);

  return (
    <>
      {/* Hero Search Input */}
      <div className="relative w-full max-w-3xl mx-auto" ref={searchRef}>
        <div className="relative group">
          <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden transition-all duration-300 focus-within:ring-4 focus-within:ring-green-500/20 focus-within:border-green-400">
            <div className="flex items-center px-5 py-4">
              <Search className="h-6 w-6 text-slate-400 group-focus-within:text-green-500 transition-colors" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onFocus={handleFocus}
                placeholder="Search 500+ tools..."
                className="flex-1 px-4 text-lg font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none cursor-pointer"
              />
              <kbd className="px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-400">ESC</kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
          onClick={handleBackdropClick}
        />
      )}

      {/* Modal Container */}
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-[15vh] px-4 animate-fade-in">
          <div 
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-scale-in overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Search Input */}
            <div className="relative bg-linear-to-r from-slate-800 to-slate-700 p-4">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  placeholder="Search 500+ tools..."
                  className="flex-1 bg-transparent text-white text-lg font-semibold placeholder:text-slate-400 focus:outline-none"
                  autoFocus
                />
                {query ? (
                  <button 
                    onClick={clearSearch}
                    className="p-1.5 hover:bg-slate-600 rounded-lg transition-all"
                    aria-label="Clear search"
                  >
                    <X className="h-5 w-5 text-slate-400 hover:text-white" />
                  </button>
                ) : (
                  <kbd className="px-2 py-1 bg-slate-600 rounded text-xs font-medium text-slate-300">ESC</kbd>
                )}
              </div>
            </div>

            {/* Modal Content */}
            <div className="max-h-[60vh] overflow-y-auto">
              {isSearching ? (
                // Search Results
                <div className="p-4">
                  {/* Results Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-green-500" />
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                        {results.length} Results for &quot;{query}&quot;
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <kbd className="px-1.5 py-0.5 bg-slate-100 rounded">↑↓</kbd>
                      <kbd className="px-1.5 py-0.5 bg-slate-100 rounded">↵</kbd>
                    </div>
                  </div>

                  {results.length > 0 ? (
                    <>
                      <div className="space-y-2">
                        {results.map((tool: typeof tools[0], index: number) => {
                          const category = getCategoryBySlug(tool.category);
                          return (
                            <Link
                              key={tool.id}
                              href={`/tool/${tool.slug}`}
                              onClick={() => handleResultClick(tool)}
                              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                                index === activeIndex 
                                  ? 'bg-green-50 border border-green-200 shadow-sm' 
                                  : 'hover:bg-slate-50 border border-transparent hover:border-slate-100'
                              }`}
                            >
                              <div 
                                className="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-md shrink-0 transition-transform duration-200 hover:scale-105"
                                style={{ backgroundColor: category?.color || '#10b981' }}
                              >
                                <Zap className="h-6 w-6" />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-bold text-slate-900 truncate">
                                    {highlightMatch(tool.name, query)}
                                  </h4>
                                  {tool.isPopular && (
                                    <span className="px-1.5 py-0.5 bg-amber-100 text-amber-600 rounded text-[9px] font-bold shrink-0">
                                      HOT
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-500 truncate mt-0.5">
                                  {highlightMatch(tool.description, query)}
                                </p>
                              </div>
                              
                              <ArrowUpRight className={`h-5 w-5 shrink-0 ${
                                index === activeIndex ? 'text-green-500' : 'text-slate-300'
                              }`} />
                            </Link>
                          );
                        })}
                      </div>
                      
                      {/* View All Results */}
                      <Link
                        href={`/tools?q=${encodeURIComponent(query)}`}
                        onClick={() => { closeModal(); }}
                        className="flex items-center justify-center gap-2 w-full py-3 mt-4 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-xl text-sm font-bold uppercase tracking-wide hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg"
                      >
                        View All {results.length} Results
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </>
                  ) : (
                    // No Results
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <Search className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-700 mb-2">No results found</h3>
                      <p className="text-sm text-slate-500 mb-4">
                        We couldn&apos;t find any tools matching &quot;{query}&quot;
                      </p>
                      <button
                        onClick={clearSearch}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
                      >
                        Clear Search
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Empty State - Show Categories, Popular Tools, Recent Searches
                <div className="p-4">
                  {/* Quick Categories */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Grid className="h-4 w-4 text-blue-500" />
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quick Categories</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { name: 'Converters', slug: 'converters', color: '#0ea5e9' },
                        { name: 'Calculators', slug: 'calculators', color: '#22c55e' },
                        { name: 'Generators', slug: 'generators', color: '#8b5cf6' },
                        { name: 'AI Tools', slug: 'advanced-tools', color: '#f59e0b' },
                      ].map((cat) => (
                        <Link
                          key={cat.slug}
                          href={cat.slug === 'advanced-tools' ? `/${cat.slug}` : `/category/${cat.slug}`}
                          onClick={closeModal}
                          className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all"
                        >
                          <div 
                            className="h-10 w-10 rounded-lg flex items-center justify-center text-white shadow-sm"
                            style={{ backgroundColor: cat.color }}
                          >
                            <Zap className="h-5 w-5" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-600">{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Popular Tools & Recent Searches */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Popular Tools */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Popular Tools</span>
                      </div>
                      <div className="space-y-1">
                        {popularTools.slice(0, 4).map((tool: typeof tools[0]) => {
                          const category = getCategoryBySlug(tool.category);
                          return (
                            <Link
                              key={tool.id}
                              href={`/tool/${tool.slug}`}
                              onClick={closeModal}
                              className="flex items-center gap-2 p-2 rounded-lg border border-slate-100 bg-slate-50 hover:bg-white hover:border-green-200 hover:shadow-md transition-all"
                            >
                              <div 
                                className="h-8 w-8 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0"
                                style={{ backgroundColor: category?.color || '#10b981' }}
                              >
                                <Zap className="h-4 w-4" />
                              </div>
                              <span className="text-xs font-bold text-slate-700 truncate">{tool.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Recent Searches */}
                    {searchHistory.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <History className="h-4 w-4 text-blue-500" />
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Recent Searches</span>
                          </div>
                          <button 
                            onClick={clearHistory}
                            className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="flex flex-col gap-1">
                          {searchHistory.slice(0, 5).map((item, index) => (
                            <button
                              key={index}
                              onClick={() => handleQueryChange(item)}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 text-xs font-semibold text-slate-600 hover:bg-green-100 hover:text-green-700 transition-colors text-left"
                            >
                              <Clock className="h-3 w-3" />
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span>Press</span>
                <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600 font-medium">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600 font-medium">↓</kbd>
                <span>to navigate</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600 font-medium">↵</kbd>
                <span>to select</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation Keyframes (inline styles for Tailwind) */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}
