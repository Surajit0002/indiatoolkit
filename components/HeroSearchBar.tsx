"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Zap, ArrowRight, Filter, TrendingUp, Clock, Star, Mic, Settings, Grid, List, SlidersHorizontal, Sparkles, Hash, Tag, Calendar, Users, Eye, EyeOff, Heart, Share2, Bookmark, Download, Copy, RotateCcw, Volume2, VolumeX, Globe, Target, Shuffle, BarChart3, Database, Cpu, Brain, Lightbulb, Wand2, Rocket, Trophy, Crown, Gem, Flame, Zap as ZapIcon, Shield, Lock, Unlock, Key, Mail, Phone, MapPin, CalendarDays, Clock as ClockIcon, Timer, Stopwatch, AlarmClock, Hourglass, CalendarCheck, CalendarClock, CalendarRange, CalendarPlus, CalendarMinus, CalendarX, CalendarHeart, CalendarUser, CalendarCog, CalendarArrowUp, CalendarArrowDown, CalendarFold, CalendarOff, CalendarStar, CalendarSync, CalendarUp, CalendarDown, CalendarLeft, CalendarRight, CalendarMove, CalendarPen, CalendarPlus2, CalendarMinus2, CalendarX2, CalendarCheck2, CalendarClock2, CalendarRange2, CalendarStar2, CalendarSync2, CalendarUp2, CalendarDown2, CalendarLeft2, CalendarRight2, CalendarMove2, CalendarPen2, CalendarCog2, CalendarArrowUp2, CalendarArrowDown2, CalendarFold2, CalendarOff2, CalendarHeart2, CalendarUser2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { Tool } from "@/types/tool";
import Link from "next/link";
import * as Icons from "lucide-react";

interface SearchResult {
  id: string;
  type: 'tool' | 'category' | 'feature' | 'tag';
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
  category?: string;
  popularity?: number;
  isNew?: boolean;
  isTrending?: boolean;
  tags?: string[];
  matchScore?: number;
}

interface SearchFilter {
  categories: string[];
  toolTypes: string[];
  difficulty: string[];
  popularity: [number, number];
  dateRange: [string, string];
  hasVoiceSupport: boolean;
  isFree: boolean;
  isAI: boolean;
  sortBy: 'relevance' | 'popularity' | 'newest' | 'alphabetical';
}

export default function HeroSearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilter>({
    categories: [],
    toolTypes: [],
    difficulty: [],
    popularity: [0, 100],
    dateRange: ["", ""],
    hasVoiceSupport: false,
    isFree: true,
    isAI: false,
    sortBy: 'relevance'
  });
  const [activeTab, setActiveTab] = useState<'all' | 'tools' | 'categories' | 'features'>('all');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const router = useRouter();

  // Initialize voice recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      // @ts-ignore
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setQuery(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setIsVoiceActive(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Load search history
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Save search history
  useEffect(() => {
    if (query && !searchHistory.includes(query)) {
      const newHistory = [query, ...searchHistory.slice(0, 9)];
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  }, [query, searchHistory]);

  // Generate search suggestions
  useEffect(() => {
    if (query.length > 0) {
      const suggestions = [
        `${query} tool`,
        `${query} calculator`,
        `${query} converter`,
        `best ${query}`,
        `${query} online`,
        `${query} free`
      ].filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase()) && 
        !suggestion.toLowerCase().startsWith(query.toLowerCase())
      );
      setSearchSuggestions(suggestions.slice(0, 5));
    } else {
      setSearchSuggestions([]);
    }
  }, [query]);

  // Advanced search algorithm
  const performSearch = useCallback(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay for better UX
    setTimeout(() => {
      const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
      
      // Tool results
      const toolResults: SearchResult[] = tools
        .filter(tool => {
          const matchesSearch = searchTerms.some(term => 
            tool.name.toLowerCase().includes(term) ||
            tool.description.toLowerCase().includes(term) ||
            tool.category.toLowerCase().includes(term) ||
            (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(term)))
          );
          
          const matchesFilters = (
            (filters.categories.length === 0 || filters.categories.includes(tool.category)) &&
            (filters.isFree ? tool.isFree !== false : true) &&
            (filters.isAI ? tool.tags?.includes('AI') : true)
          );
          
          return matchesSearch && matchesFilters;
        })
        .map(tool => {
          const matchScore = calculateMatchScore(tool, searchTerms);
          return {
            id: tool.id,
            type: 'tool' as const,
            title: tool.name,
            description: tool.description,
            icon: <Zap className="h-5 w-5" />,
            url: `/tool/${tool.slug}`,
            category: tool.category,
            popularity: tool.popularity,
            isNew: tool.isNew,
            isTrending: tool.isTrending,
            tags: tool.tags,
            matchScore
          };
        });

      // Category results
      const categoryResults: SearchResult[] = categories
        .filter(category => 
          searchTerms.some(term => 
            category.name.toLowerCase().includes(term) ||
            category.description.toLowerCase().includes(term)
          )
        )
        .map(category => ({
          id: category.id,
          type: 'category' as const,
          title: category.name,
          description: category.description,
          icon: (() => {
            const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            return IconComponent ? <IconComponent className="h-5 w-5" /> : <Grid className="h-5 w-5" />;
          })(),
          url: `/category/${category.slug}`,
          matchScore: searchTerms.reduce((score, term) => 
            category.name.toLowerCase().includes(term) ? score + 2 : score, 0
          )
        }));

      // Feature results
      const featureResults: SearchResult[] = [
        { id: 'voice-search', title: 'Voice Search', description: 'Search using your voice', icon: <Mic className="h-5 w-5" />, url: '#', type: 'feature' as const },
        { id: 'ai-recommendations', title: 'AI Recommendations', description: 'Smart tool suggestions', icon: <Sparkles className="h-5 w-5" />, url: '#', type: 'feature' as const },
        { id: 'real-time', title: 'Real-time Processing', description: 'Instant results as you type', icon: <ZapIcon className="h-5 w-5" />, url: '#', type: 'feature' as const },
        { id: 'collaboration', title: 'Team Collaboration', description: 'Share and work together', icon: <Users className="h-5 w-5" />, url: '#', type: 'feature' as const },
        { id: 'analytics', title: 'Usage Analytics', description: 'Track your tool usage', icon: <BarChart3 className="h-5 w-5" />, url: '#', type: 'feature' as const }
      ].filter(feature => 
        searchTerms.some(term => 
          feature.title.toLowerCase().includes(term) ||
          feature.description.toLowerCase().includes(term)
        )
      );

      // Combine and sort results
      let allResults = [...toolResults, ...categoryResults, ...featureResults];
      
      // Apply sorting
      switch (filters.sortBy) {
        case 'popularity':
          allResults.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
          break;
        case 'newest':
          allResults.sort((a, b) => (a.isNew ? -1 : 1) - (b.isNew ? -1 : 1));
          break;
        case 'alphabetical':
          allResults.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'relevance':
        default:
          allResults.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
          break;
      }

      setResults(allResults.slice(0, 12));
      setIsLoading(false);
    }, 300);
  }, [query, filters]);

  // Calculate match score for ranking
  const calculateMatchScore = (tool: any, searchTerms: string[]): number => {
    let score = 0;
    
    searchTerms.forEach(term => {
      if (tool.name.toLowerCase().includes(term)) score += 3;
      if (tool.description.toLowerCase().includes(term)) score += 2;
      if (tool.category.toLowerCase().includes(term)) score += 1;
      if (tool.tags && tool.tags.some((tag: string) => tag.toLowerCase().includes(term))) score += 1;
    });
    
    // Boost for trending/popular tools
    if (tool.isTrending) score += 2;
    if (tool.isNew) score += 1;
    if (tool.popularity && tool.popularity > 50) score += 1;
    
    return score;
  };

  // Handle search input
  useEffect(() => {
    if (query.length > 1) {
      performSearch();
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, filters, performSearch]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Voice search toggle
  const toggleVoiceSearch = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Clear search
  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Apply filter
  const applyFilter = (filterType: keyof SearchFilter, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto" ref={searchRef}>
      {/* Search Input with Advanced Features */}
      <div className="relative group">
        {/* Animated Background */}
        <div className="absolute -inset-2 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl blur opacity-0 group-focus-within:opacity-25 transition-all duration-700"></div>
        
        {/* Main Search Container */}
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="flex items-center">
            {/* Search Icon */}
            <div className="pl-6 py-4">
              <Search className={`h-6 w-6 transition-all duration-300 ${
                isListening ? 'text-red-500 animate-pulse' : 
                query ? 'text-green-600' : 'text-slate-400 group-focus-within:text-green-600'
              }`} />
            </div>
            
            {/* Search Input */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.length > 1 && setIsOpen(true)}
              placeholder="Search 100+ professional tools, categories, and features..."
              aria-label="Search tools"
              className="flex-1 py-4 pr-4 bg-transparent border-none focus:outline-none text-lg font-black placeholder:text-slate-400 placeholder:font-bold placeholder:normal-case"
            />
            
            {/* Voice Search Button */}
            {typeof window !== 'undefined' && 'webkitSpeechRecognition' in window && (
              <button
                onClick={toggleVoiceSearch}
                className={`p-3 rounded-xl mr-2 transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
                }`}
                aria-label={isListening ? "Stop voice search" : "Start voice search"}
              >
                <Mic className="h-5 w-5" />
              </button>
            )}
            
            {/* Filter Button */}
            <button
              onClick={() => applyFilter('sortBy', filters.sortBy === 'relevance' ? 'popularity' : 'relevance')}
              className="p-3 rounded-xl mr-2 bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-all"
              aria-label="Toggle sorting"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
            
            {/* Clear Button */}
            {query && (
              <button
                onClick={clearSearch}
                className="p-3 rounded-xl mr-4 bg-slate-100 text-slate-400 hover:bg-red-100 hover:text-red-600 transition-all"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* Quick Suggestions */}
          {query.length > 0 && searchSuggestions.length > 0 && (
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50">
              <div className="flex flex-wrap gap-2">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(suggestion)}
                    className="px-3 py-1 bg-white rounded-full text-xs font-bold text-slate-600 hover:bg-green-100 hover:text-green-700 transition-all border border-slate-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Search Stats */}
          {query.length > 1 && (
            <div className="px-6 py-2 border-t border-slate-100 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                <div className="flex items-center gap-4">
                  <span className="text-slate-500">
                    {isLoading ? 'Searching...' : `${results.length} results found`}
                  </span>
                  {results.length > 0 && (
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-green-600">Trending</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="h-3 w-3" />
                  <span>Real-time</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Advanced Search Results */}
      {isOpen && (results.length > 0 || searchHistory.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.2)] overflow-hidden z-[100] border border-white animate-in fade-in slide-in-from-top-4 duration-500">
          
          {/* Search Tabs */}
          <div className="flex border-b border-slate-100 bg-gradient-to-r from-slate-50 to-slate-100">
            {[
              { id: 'all', label: 'All', icon: Grid, count: results.length },
              { id: 'tools', label: 'Tools', icon: Zap, count: results.filter(r => r.type === 'tool').length },
              { id: 'categories', label: 'Categories', icon: Folder, count: results.filter(r => r.type === 'category').length },
              { id: 'features', label: 'Features', icon: Sparkles, count: results.filter(r => r.type === 'feature').length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-black uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'text-green-600 bg-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.id 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Results Container */}
          <div className="max-h-[500px] overflow-y-auto">
            {/* Search History */}
            {query.length < 2 && searchHistory.length > 0 && (
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Recent Searches</h3>
                  <button 
                    onClick={() => {
                      setSearchHistory([]);
                      localStorage.removeItem('searchHistory');
                    }}
                    className="text-xs font-bold text-slate-400 hover:text-red-500"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(item)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-green-100 text-slate-700 hover:text-green-700 rounded-full text-xs font-bold transition-all"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filter Bar */}
            {query.length > 1 && (
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Filter:</span>
                    {[
                      { label: 'Free', key: 'isFree', icon: Tag },
                      { label: 'AI Tools', key: 'isAI', icon: Brain },
                      { label: 'Voice', key: 'hasVoiceSupport', icon: Mic }
                    ].map(filter => (
                      <button
                        key={filter.key}
                        onClick={() => applyFilter(filter.key as keyof SearchFilter, !(filters as any)[filter.key])}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          (filters as any)[filter.key]
                            ? 'bg-green-500 text-white'
                            : 'bg-white text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <filter.icon className="h-3 w-3" />
                        {filter.label}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Sort:</span>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => applyFilter('sortBy', e.target.value as any)}
                      className="px-2 py-1 bg-white rounded-lg text-xs font-bold border border-slate-200"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="popularity">Popular</option>
                      <option value="newest">Newest</option>
                      <option value="alphabetical">A-Z</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Search Results */}
            <div className="p-2">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 border-2 border-slate-200 border-t-green-600 rounded-full animate-spin"></div>
                    <span className="text-sm font-bold text-slate-500">Searching tools...</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {results
                    .filter(result => activeTab === 'all' || result.type === activeTab)
                    .map((result, index) => (
                      <Link
                        key={result.id}
                        href={result.url}
                        onClick={() => {
                          setIsOpen(false);
                          setQuery("");
                        }}
                        className="flex items-center gap-4 p-4 hover:bg-slate-50/80 rounded-2xl transition-all group border border-transparent hover:border-slate-100/50"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Result Icon */}
                        <div className="h-12 w-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:from-green-600 group-hover:to-emerald-600 group-hover:text-white group-hover:rotate-3 transition-all duration-500 shadow-sm border border-slate-200/50 group-hover:border-green-500">
                          {result.icon}
                        </div>
                        
                        {/* Result Content */}
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-black text-slate-900 group-hover:text-green-600 transition-colors">
                              {result.title}
                            </h4>
                            {result.isNew && (
                              <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-black rounded-full">NEW</span>
                            )}
                            {result.isTrending && (
                              <span className="px-2 py-0.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-black rounded-full">TRENDING</span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-bold group-hover:text-slate-700 transition-colors mb-2">
                            {result.description}
                          </p>
                          <div className="flex items-center gap-3">
                            {result.category && (
                              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                {result.category}
                              </span>
                            )}
                            {result.tags && result.tags.length > 0 && (
                              <div className="flex items-center gap-1">
                                {result.tags.slice(0, 2).map(tag => (
                                  <span key={tag} className="text-xs font-bold text-green-600">
                                    #{tag}
                                  </span>
                                ))}
                                {result.tags.length > 2 && (
                                  <span className="text-xs font-bold text-slate-400">
                                    +{result.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Result Actions */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-green-600 transition-colors">
                            <Bookmark className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-green-600 transition-colors">
                            <Share2 className="h-4 w-4" />
                          </button>
                          <ArrowRight className="h-4 w-4 text-green-600" />
                        </div>
                      </Link>
                    ))
                  }
                </div>
              )}
              
              {/* No Results */}
              {!isLoading && results.filter(r => activeTab === 'all' || r.type === activeTab).length === 0 && query.length > 1 && (
                <div className="text-center py-12">
                  <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">No results found</h3>
                  <p className="text-sm text-slate-500 font-bold max-w-md mx-auto">
                    Try adjusting your search terms or explore our categories to discover more tools.
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <Link 
                      href="/categories" 
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-black text-sm uppercase hover:scale-105 transition-all"
                    >
                      Browse Categories
                    </Link>
                    <button 
                      onClick={() => setQuery("")}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-black text-sm uppercase hover:bg-slate-200 transition-all"
                    >
                      Clear Search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action Bar */}
          {results.length > 0 && (
            <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs font-black text-slate-500 uppercase tracking-widest">
                  <span>Found {results.length} results</span>
                  <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
                  <button 
                    onClick={() => applyFilter('sortBy', 'popularity')}
                    className="hover:text-green-600 transition-colors"
                  >
                    Sort by Popular
                  </button>
                </div>
                <Link 
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-wider hover:scale-105 transition-all"
                >
                  View All Results
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Search Hotkey Indicator */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-widest">
          <span>Press</span>
          <kbd className="px-2 py-0.5 bg-slate-700 rounded text-[10px] font-black">/</kbd>
          <span>to search</span>
        </div>
      </div>
    </div>
  );
}