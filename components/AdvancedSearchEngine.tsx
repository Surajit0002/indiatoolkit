"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Search,
  X,
  Zap,
  ArrowRight,
  Sliders,
  TrendingUp,
  Clock,
  Star,
  Users,
  Globe,
  BarChart3,
  Cpu,
  RefreshCw,
  Bookmark,
  Share2,
  FileText,
  Briefcase,
  Sparkles,
  Palette,
  CheckCircle,
  Image as ImageIcon,
  Type,
  Database,
  Shield,
  History,
  List,
  Grid
} from "lucide-react";
import { useRouter } from "next/navigation";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  id: string;
  type: 'tool' | 'category' | 'tag' | 'feature';
  title: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  relevance: number;
  matches: string[];
  popularity: number;
  lastUpdated: string;
  tags: string[];
  features: string[];
  usageCount: number;
  rating: number;
  isTrending: boolean;
  isNew: boolean;
  isPopular: boolean;
  isRecommended: boolean;
  previewUrl?: string;
  quickActions: QuickAction[];
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
  requiresAuth?: boolean;
}

interface SearchFilter {
  categories: string[];
  tags: string[];
  features: string[];
  rating: [number, number];
  popularity: [number, number];
  dateRange: [string, string];
  sortBy: 'relevance' | 'popularity' | 'rating' | 'newest' | 'trending';
  searchIn: ('title' | 'description' | 'tags' | 'features')[];
  exclude: string[];
  include: string[];
}

interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: string;
  resultsCount: number;
  filters: SearchFilter;
}

export default function AdvancedSearchEngine() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilter>({
    categories: [],
    tags: [],
    features: [],
    rating: [0, 5],
    popularity: [0, 10000],
    dateRange: ['', ''],
    sortBy: 'relevance',
    searchIn: ['title', 'description', 'tags', 'features'],
    exclude: [],
    include: []
  });
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('searchHistory');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('recentSearches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [searchStats, setSearchStats] = useState({
    totalResults: 0,
    searchTime: 0,
    categoriesMatched: 0,
    toolsMatched: 0
  });

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevQueryRef = useRef<string>('');
  const router = useRouter();

  // Save search history and preferences
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    localStorage.setItem('searchPreferences', JSON.stringify(filters));
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [searchHistory, filters, recentSearches]);

  // Advanced search algorithm
  const performSearch = useCallback((searchQuery: string, currentFilters: SearchFilter): SearchResult[] => {
    if (!searchQuery.trim()) return [];
    
    const startTime = performance.now();
    const queryLower = searchQuery.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(word => word.length > 0);
    
    // Enhanced matching algorithm
    const matchedResults: SearchResult[] = [];
    
    // Search in tools
    tools.forEach(tool => {
      let relevanceScore = 0;
      const matches: string[] = [];
      
      // Title matching (highest weight)
      if (currentFilters.searchIn.includes('title')) {
          const titleLower = tool.name.toLowerCase();
          if (titleLower.includes(queryLower)) {
            relevanceScore += 100;
            matches.push(`Title: ${tool.name}`);
          } else {
            queryWords.forEach(word => {
              if (titleLower.includes(word)) {
                relevanceScore += 50;
                matches.push(`Title match: ${word}`);
              }
            });
          }
        }
        
        // Description matching
        if (currentFilters.searchIn.includes('description')) {
          const descLower = tool.description.toLowerCase();
          if (descLower.includes(queryLower)) {
            relevanceScore += 40;
            matches.push(`Description: ${tool.description.substring(0, 100)}...`);
          } else {
            queryWords.forEach(word => {
              if (descLower.includes(word)) {
                relevanceScore += 20;
                matches.push(`Description match: ${word}`);
              }
            });
          }
        }
        
        // Tags matching
        if (currentFilters.searchIn.includes('tags') && tool.tags) {
          tool.tags.forEach(tag => {
            const tagLower = tag.toLowerCase();
            if (tagLower.includes(queryLower)) {
              relevanceScore += 30;
              matches.push(`Tag: ${tag}`);
            } else {
              queryWords.forEach(word => {
                if (tagLower.includes(word)) {
                  relevanceScore += 15;
                  matches.push(`Tag match: ${tag}`);
                }
              });
            }
          });
        }
        
        // Features matching
        if (currentFilters.searchIn.includes('features') && tool.features) {
          tool.features.forEach(feature => {
            const featureLower = feature.toLowerCase();
            if (featureLower.includes(queryLower)) {
              relevanceScore += 25;
              matches.push(`Feature: ${feature}`);
            } else {
              queryWords.forEach(word => {
                if (featureLower.includes(word)) {
                  relevanceScore += 12;
                  matches.push(`Feature match: ${feature}`);
                }
              });
            }
          });
        }
        
        // Category filtering
        if (currentFilters.categories.length > 0) {
          const category = categories.find(cat => cat.id === tool.category);
          if (category && currentFilters.categories.includes(category.id)) {
            relevanceScore += 20;
          } else {
            return; // Skip if category doesn't match
          }
        }
        
        // Rating filtering
        if (tool.rating && (tool.rating < currentFilters.rating[0] || tool.rating > currentFilters.rating[1])) {
          return; // Skip if rating doesn't match
        }
        
        // Popularity filtering
        if (tool.usageCount && (tool.usageCount < currentFilters.popularity[0] || tool.usageCount > currentFilters.popularity[1])) {
          return; // Skip if popularity doesn't match
        }
        
        // Exclude filtering
        if (currentFilters.exclude.some(exclude => 
          tool.name.toLowerCase().includes(exclude.toLowerCase()) ||
          tool.description.toLowerCase().includes(exclude.toLowerCase())
        )) {
          return; // Skip excluded items
        }
        
        // Include filtering (must match)
        if (currentFilters.include.length > 0 && !currentFilters.include.some(include =>
          tool.name.toLowerCase().includes(include.toLowerCase()) ||
          tool.description.toLowerCase().includes(include.toLowerCase())
        )) {
          return; // Skip if doesn't include required terms
        }
        
        // Only include results with some relevance
        if (relevanceScore > 0) {
          const category = categories.find(cat => cat.id === tool.category);
          
          matchedResults.push({
            id: tool.id,
            type: 'tool',
            title: tool.name,
            description: tool.description,
            category: category?.name || 'Uncategorized',
            icon: tool.icon || 'Zap',
            color: category?.color || '#6366F1',
            relevance: relevanceScore,
            matches,
            popularity: tool.usageCount || 0,
            lastUpdated: tool.lastUpdated || new Date().toISOString(),
            tags: tool.tags || [],
            features: tool.features || [],
            usageCount: tool.usageCount || 0,
            rating: tool.rating || 0,
            isTrending: tool.isTrending || false,
            isNew: tool.isNew || false,
            isPopular: (tool.usageCount || 0) > 1000,
            isRecommended: (tool.rating || 0) > 4.5,
            previewUrl: tool.previewUrl,
            quickActions: [
              {
                id: 'open',
                label: 'Open Tool',
                icon: <ArrowRight className="h-3 w-3" />,
                action: () => router.push(`/tool/${tool.slug}`)
              },
              {
                id: 'bookmark',
                label: 'Save',
                icon: <Bookmark className="h-3 w-3" />,
                action: () => console.log('Bookmark', tool.id)
              },
              {
                id: 'share',
                label: 'Share',
                icon: <Share2 className="h-3 w-3" />,
                action: () => console.log('Share', tool.id)
              }
            ]
          });
        }
      });
      
      // Search in categories
      categories.forEach(category => {
        let relevanceScore = 0;
        const matches: string[] = [];
        
        const nameLower = category.name.toLowerCase();
        const descLower = category.description.toLowerCase();
        
        if (nameLower.includes(queryLower)) {
          relevanceScore += 80;
          matches.push(`Category: ${category.name}`);
        }
        
        if (descLower.includes(queryLower)) {
          relevanceScore += 30;
          matches.push(`Category description: ${category.description}`);
        }
        
        if (relevanceScore > 0) {
          matchedResults.push({
            id: category.id,
            type: 'category',
            title: category.name,
            description: category.description,
            category: 'Category',
            icon: category.icon,
            color: category.color,
            relevance: relevanceScore,
            matches,
            popularity: 0,
            lastUpdated: new Date().toISOString(),
            tags: [],
            features: [],
            usageCount: 0,
            rating: 0,
            isTrending: false,
            isNew: false,
            isPopular: false,
            isRecommended: false,
            quickActions: [
              {
                id: 'explore',
                label: 'Explore Category',
                icon: <ArrowRight className="h-3 w-3" />,
                action: () => router.push(`/category/${category.slug}`)
              }
            ]
          });
        }
      });
      
      // Sort results based on filters
      matchedResults.sort((a, b) => {
        switch (currentFilters.sortBy) {
          case 'popularity':
            return b.popularity - a.popularity;
          case 'rating':
            return (b.rating || 0) - (a.rating || 0);
          case 'newest':
            return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
          case 'trending':
            return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) || b.relevance - a.relevance;
          default: // relevance
            return b.relevance - a.relevance;
        }
      });
      
      const endTime = performance.now();
      setSearchStats({
        totalResults: matchedResults.length,
        searchTime: Math.round(endTime - startTime),
        categoriesMatched: matchedResults.filter(r => r.type === 'category').length,
        toolsMatched: matchedResults.filter(r => r.type === 'tool').length
      });
      
      return matchedResults.slice(0, 20); // Limit results
  }, [router]);

  // Real-time search with debouncing
  useEffect(() => {
    // Update the ref to track the current query
    prevQueryRef.current = query;
    
    if (query.length < 2) {
      // Only clear if we had a valid query before — defer to avoid
      // calling setState synchronously inside the effect body.
      const clearId = setTimeout(() => {
        setResults([]);
        setIsOpen(false);
      }, 0);
      return () => clearTimeout(clearId);
    }
    
    const timeoutId = setTimeout(() => {
      setIsLoading(true);
      const searchResults = performSearch(query, filters);
      setResults(searchResults);
      setIsOpen(true);
      setIsLoading(false);
      
      // Add to recent searches
      if (searchResults.length > 0) {
        setRecentSearches(prev => {
          const newRecent = [query, ...prev.filter(q => q !== query)].slice(0, 10);
          return newRecent;
        });
      }
    }, 300); // 300ms debounce
    
    return () => clearTimeout(timeoutId);
  }, [query, filters, performSearch]);

  // Generate search suggestions (derived state)
  const searchSuggestions = useMemo(() => {
    if (query.length > 0) {
      return [
        `${query} tool`,
        `${query} calculator`,
        `${query} converter`,
        `best ${query}`,
        `${query} online`,
        `${query} free`
      ].slice(0, 5);
    }
    return [];
  }, [query]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowFilters(false);
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          // Navigate down through results
          break;
        case 'ArrowUp':
          e.preventDefault();
          // Navigate up through results
          break;
        case 'Enter':
          e.preventDefault();
          // Select current result
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  }, []);

  const handleResultClick = useCallback((result: SearchResult) => {
    setIsOpen(false);
    setQuery("");
    
    // Add to search history
    const historyItem: SearchHistoryItem = {
      id: Date.now().toString(),
      query,
      timestamp: new Date().toISOString(),
      resultsCount: results.length,
      filters: { ...filters }
    };
    
    setSearchHistory(prev => [historyItem, ...prev.slice(0, 9)]);
    
    // Navigate based on result type
    switch (result.type) {
      case 'tool':
        router.push(`/tool/${result.id}`);
        break;
      case 'category':
        router.push(`/category/${result.id}`);
        break;
    }
  }, [query, results.length, filters, router]);

  const toggleFilter = (filterType: keyof SearchFilter, value: string) => {
    setFilters(prev => {
      const currentValue = prev[filterType];
      // Only process array types
      if (Array.isArray(currentValue)) {
        const arrayValue = currentValue as string[];
        return {
          ...prev,
          [filterType]: arrayValue.includes(value)
            ? arrayValue.filter((v: string) => v !== value)
            : [...arrayValue, value]
        } as SearchFilter;
      }
      return prev;
    });
  };

  const renderSearchResult = (result: SearchResult) => {
    const IconComponent = ({ className }: { className?: string }) => {
      const icons: Record<string, React.ReactNode> = {
        Zap: <Zap className={className} />,
        Calculator: <BarChart3 className={className} />,
        RefreshCw: <RefreshCw className={className} />,
        Type: <Type className={className} />,
        Code: <Cpu className={className} />,
        Image: <ImageIcon className={className} />,
        FileText: <FileText className={className} />,
        ShieldCheck: <Shield className={className} />,
        Globe: <Globe className={className} />,
        Search: <Search className={className} />,
        Database: <Database className={className} />,
        Briefcase: <Briefcase className={className} />,
        Sparkles: <Sparkles className={className} />,
        Palette: <Palette className={className} />,
        Share2: <Share2 className={className} />,
        CheckCircle: <CheckCircle className={className} />,
      };
      return icons[result.icon] || <Zap className={className} />;
    };

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex items-start gap-4 p-4 hover:bg-slate-50/80 rounded-[20px] transition-all group border border-transparent hover:border-slate-100/50 relative"
        onClick={() => handleResultClick(result)}
      >
        {/* Result Icon */}
        <div 
          className="h-12 w-12 rounded-[16px] flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 shadow-lg border-2"
          style={{ backgroundColor: result.color }}
        >
          <IconComponent className="h-6 w-6 stroke-[2.5]" />
        </div>
        
        {/* Result Content */}
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[12px] font-black text-slate-900 uppercase tracking-tight">
                {result.title}
              </span>
              <div className="flex items-center gap-1">
                {result.isTrending && (
                  <span className="flex items-center gap-1 text-[8px] font-black text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full uppercase">
                    <TrendingUp className="h-2.5 w-2.5" />
                    Trending
                  </span>
                )}
                {result.isNew && (
                  <span className="flex items-center gap-1 text-[8px] font-black text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full uppercase">
                    <Sparkles className="h-2.5 w-2.5" />
                    New
                  </span>
                )}
                {result.isPopular && (
                  <span className="flex items-center gap-1 text-[8px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full uppercase">
                    <Users className="h-2.5 w-2.5" />
                    Popular
                  </span>
                )}
                {result.isRecommended && (
                  <span className="flex items-center gap-1 text-[8px] font-black text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-full uppercase">
                    <Star className="h-2.5 w-2.5 fill-current" />
                    Recommended
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
              <span className="bg-slate-100 px-2 py-0.5 rounded-full">
                {result.category}
              </span>
              {result.rating > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {result.rating.toFixed(1)}
                </span>
              )}
            </div>
          </div>
          
          <p className="text-[10px] text-slate-500 font-medium mb-2 line-clamp-2">
            {result.description}
          </p>
          
          {result.matches.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {result.matches.slice(0, 3).map((match, index) => (
                <span 
                  key={index}
                  className="text-[8px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full border border-blue-100"
                >
                  {match}
                </span>
              ))}
              {result.matches.length > 3 && (
                <span className="text-[8px] font-bold text-slate-400">
                  +{result.matches.length - 3} more matches
                </span>
              )}
            </div>
          )}
          
          {result.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {result.tags.slice(0, 4).map(tag => (
                <span 
                  key={tag}
                  className="text-[8px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[9px] text-slate-400">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {result.popularity.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(result.lastUpdated).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="h-3 w-3 text-blue-600" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      {/* Search Input with Advanced Features */}
      <div className="relative group">
        {/* Animated Background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[18px] blur-md opacity-0 group-focus-within:opacity-20 transition-all duration-700"></div>
        
        {/* Glass Morphism Effect */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-[16px] pointer-events-none border border-white/10"></div>
        
        {/* Search Icon */}
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-all z-10 group-focus-within:scale-110" />
        
        {/* Main Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.length > 1) setIsOpen(true);
          }}
          onBlur={() => {}}
          placeholder="Search 100+ tools, categories, and features..."
          aria-label="Advanced search"
          className="relative w-full h-12 pl-11 pr-24 rounded-[16px] border border-slate-200/50 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/5 shadow-inner text-[10px] transition-all font-black uppercase tracking-widest placeholder:text-slate-400 placeholder:normal-case placeholder:font-bold"
        />
        
        {/* Action Buttons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
          {query && (
            <button 
              onClick={clearSearch}
              className="h-6 w-6 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all hover:rotate-90"
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </button>
          )}
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`h-6 w-6 flex items-center justify-center transition-all ${
              showFilters 
                ? 'text-blue-600 bg-blue-50 rotate-90' 
                : 'text-slate-400 hover:text-blue-500'
            }`}
            aria-label="Toggle filters"
          >
            <Sliders className="h-3 w-3" />
          </button>
          
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className={`h-6 w-6 flex items-center justify-center transition-all ${
              showHistory 
                ? 'text-purple-600 bg-purple-50' 
                : 'text-slate-400 hover:text-purple-500'
            }`}
            aria-label="Search history"
          >
            <History className="h-3 w-3" />
          </button>
        </div>
        
        {/* Search Stats */}
        {query && results.length > 0 && (
          <div className="absolute -bottom-6 left-0 right-0 text-center">
            <span className="text-[9px] font-bold text-slate-500 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
              {searchStats.totalResults} results • {searchStats.searchTime}ms • {searchStats.categoriesMatched} categories • {searchStats.toolsMatched} tools
            </span>
          </div>
        )}
      </div>

      {/* Advanced Search Results */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-2xl rounded-[28px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.2)] overflow-hidden z-[100] border border-white animate-in fade-in slide-in-from-top-4 duration-500"
          >
            {/* Search Header */}
            <div className="p-4 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                <span className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">
                  Advanced Discovery Engine
                </span>
                {isLoading && (
                  <div className="flex items-center gap-1">
                    <RefreshCw className="h-3 w-3 animate-spin text-blue-500" />
                    <span className="text-[9px] text-slate-500">Searching...</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="h-7 w-7 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                </button>
                
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-full">
                  {results.length} Results
                </div>
              </div>
            </div>

            {/* Search Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-slate-100 bg-slate-50/50 p-4"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2 block">
                        Sort By
                      </label>
                      <select 
                        value={filters.sortBy}
                        onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as 'relevance' | 'popularity' | 'rating' | 'newest' | 'trending' }))}
                        className="w-full text-[10px] font-bold uppercase tracking-widest bg-white border border-slate-200 rounded-lg px-3 py-2"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="popularity">Popularity</option>
                        <option value="rating">Rating</option>
                        <option value="newest">Newest</option>
                        <option value="trending">Trending</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2 block">
                        Categories
                      </label>
                      <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                        {categories.slice(0, 6).map(category => (
                          <button
                            key={category.id}
                            onClick={() => toggleFilter('categories', category.id)}
                            className={`text-[8px] font-bold px-2 py-1 rounded-full transition-all ${
                              filters.categories.includes(category.id)
                                ? 'bg-blue-500 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2 block">
                        Rating
                      </label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="range" 
                          min="0" 
                          max="5" 
                          step="0.5"
                          value={filters.rating[1]}
                          onChange={(e) => setFilters(prev => ({ ...prev, rating: [0, parseFloat(e.target.value)] }))}
                          className="flex-1"
                        />
                        <span className="text-[9px] font-bold text-slate-600 w-8">
                          {filters.rating[1]}+
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2 block">
                        Search In
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {(['title', 'description', 'tags', 'features'] as const).map(field => (
                          <button
                            key={field}
                            onClick={() => setFilters(prev => ({
                              ...prev,
                              searchIn: prev.searchIn.includes(field)
                                ? prev.searchIn.filter(f => f !== field)
                                : [...prev.searchIn, field]
                            }))}
                            className={`text-[8px] font-bold px-2 py-1 rounded-full transition-all ${
                              filters.searchIn.includes(field)
                                ? 'bg-green-500 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {field}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search Results */}
            <div className="max-h-[500px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200">
              <AnimatePresence>
                {results.length > 0 ? (
                  <motion.div
                    layout
                    className={viewMode === 'grid' ? 'grid grid-cols-1 gap-2' : 'space-y-2'}
                  >
                    {results.map(result => (
                      <motion.div
                        key={result.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        {renderSearchResult(result)}
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                      <Search className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-[12px] font-black text-slate-900 mb-2">
                      No results found
                    </h3>
                    <p className="text-[10px] text-slate-500 mb-4">
                      Try adjusting your search terms or filters
                    </p>
                    {searchSuggestions.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-2">
                        {searchSuggestions.map(suggestion => (
                          <button
                            key={suggestion}
                            onClick={() => setQuery(suggestion)}
                            className="text-[9px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Footer */}
            {results.length > 0 && (
              <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-slate-500">
                    Found what you&apos;re looking for?
                  </span>
                  <button className="text-[9px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest">
                    Save Search
                  </button>
                </div>
                
                <Link 
                  href="/tools" 
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-[18px] text-[10px] font-black uppercase tracking-[0.1em] hover:bg-blue-600 transition-all shadow-lg"
                >
                  Browse All Tools
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search History Panel */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-2xl rounded-[20px] shadow-xl border border-white p-4 z-50"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">
                Search History
              </h3>
              <button 
                onClick={() => setShowHistory(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {searchHistory.slice(0, 5).map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setQuery(item.query);
                    setShowHistory(false);
                    setIsOpen(true);
                  }}
                  className="w-full text-left p-2 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-700">{item.query}</span>
                    <span className="text-[8px] text-slate-400">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-[8px] text-slate-500 mt-1">
                    {item.resultsCount} results
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}