"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { Tool, ToolCategory } from "@/types/tool";
import * as Icons from "lucide-react";
import { 
  ArrowRight, Zap, Star, TrendingUp, Users, Search, 
  Grid3X3, List, LayoutGrid, Sparkles, Heart, Copy,
  Check, ChevronDown, X, Filter, SortAsc, SortDesc, Eye,
  Flame, Layers, Maximize2, Minimize2, RefreshCw
} from "lucide-react";

// View modes for the grid
type ViewMode = 'grid' | 'list' | 'compact' | 'masonry' | 'carousel';

// Sort options
type SortOption = 'popular' | 'newest' | 'name-asc' | 'name-desc' | 'rating' | 'usage';

// Filter options
interface FilterState {
  type: string[];
  difficulty: string[];
  pricing: string[];
  rating: number | null;
  aiPowered: boolean | null;
}

interface DynamicToolGridProps {
  tools: Tool[];
  categories: ToolCategory[];
  title?: string;
  subtitle?: string;
  showStats?: boolean;
  staggerDelay?: boolean;
  defaultViewMode?: ViewMode;
  showViewToggle?: boolean;
  showFilters?: boolean;
  showSearch?: boolean;
  showSort?: boolean;
  maxItems?: number;
  currentToolSlug?: string;
  layout?: 'auto' | 'fixed' | 'fluid';
  columns?: number;
  groupByCategory?: boolean;
  showQuickActions?: boolean;
  enableComparison?: boolean;
  animateOnMount?: boolean;
  cardStyle?: 'default' | 'minimal' | 'detailed' | 'glass';
}

// Tool type configurations
const toolTypeConfig: Record<string, { 
  gradient: string; 
  bgPattern: string;
  accentIcon: typeof Zap;
  animation: string;
}> = {
  calculator: { 
    gradient: 'from-blue-500 to-cyan-500', 
    bgPattern: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    accentIcon: Zap,
    animation: 'animate-pulse'
  },
  converter: { 
    gradient: 'from-purple-500 to-pink-500', 
    bgPattern: 'bg-gradient-to-br from-purple-50 to-pink-50',
    accentIcon: RefreshCw,
    animation: 'animate-spin-slow'
  },
  analyzer: { 
    gradient: 'from-orange-500 to-red-500', 
    bgPattern: 'bg-gradient-to-br from-orange-50 to-red-50',
    accentIcon: Eye,
    animation: 'animate-bounce'
  },
  generator: { 
    gradient: 'from-green-500 to-emerald-500', 
    bgPattern: 'bg-gradient-to-br from-green-50 to-emerald-50',
    accentIcon: Sparkles,
    animation: 'animate-shimmer'
  },
  formatter: { 
    gradient: 'from-indigo-500 to-violet-500', 
    bgPattern: 'bg-gradient-to-br from-indigo-50 to-violet-50',
    accentIcon: Layers,
    animation: 'animate-slide'
  },
  validator: { 
    gradient: 'from-teal-500 to-cyan-500', 
    bgPattern: 'bg-gradient-to-br from-teal-50 to-cyan-50',
    accentIcon: Check,
    animation: 'animate-fade'
  },
  upload: { 
    gradient: 'from-amber-500 to-yellow-500', 
    bgPattern: 'bg-gradient-to-br from-amber-50 to-yellow-50',
    accentIcon: ArrowRight,
    animation: 'animate-upload'
  },
  chart: { 
    gradient: 'from-rose-500 to-pink-500', 
    bgPattern: 'bg-gradient-to-br from-rose-50 to-pink-50',
    accentIcon: TrendingUp,
    animation: 'animate-grow'
  },
  ai: { 
    gradient: 'from-fuchsia-500 to-purple-500', 
    bgPattern: 'bg-gradient-to-br from-fuchsia-50 to-purple-50',
    accentIcon: Sparkles,
    animation: 'animate-glow'
  },
};

export default function DynamicToolGrid({
  tools,
  categories,
  title,
  subtitle,
  showStats = false,
  staggerDelay = false,
  defaultViewMode = 'grid',
  showViewToggle = true,
  showFilters = true,
  showSearch = true,
  showSort = true,
  maxItems,
  currentToolSlug,
  columns = 4,
  groupByCategory = false,
  showQuickActions = true,
  enableComparison = false,
  animateOnMount = true,
  cardStyle = 'default',
}: DynamicToolGridProps) {
  // State management
  const [viewMode, setViewMode] = useState<ViewMode>(defaultViewMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState<FilterState>({
    type: [],
    difficulty: [],
    pricing: [],
    rating: null,
    aiPowered: null,
  });
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [compareList, setCompareList] = useState<Set<string>>(new Set());
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('tool-favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('tool-favorites', Array.from(favorites).join(','));
  }, [favorites]);

  // Filter and sort tools
  const processedTools = useMemo(() => {
    let result = [...tools];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        tool.features?.some(feature => feature.toLowerCase().includes(query))
      );
    }

    // Apply type filter
    if (filters.type.length > 0) {
      result = result.filter(tool => filters.type.includes(tool.type));
    }

    // Apply difficulty filter
    if (filters.difficulty.length > 0) {
      result = result.filter(tool => tool.difficulty && filters.difficulty.includes(tool.difficulty));
    }

    // Apply pricing filter
    if (filters.pricing.length > 0) {
      result = result.filter(tool => tool.pricing && filters.pricing.includes(tool.pricing));
    }

    // Apply rating filter
    if (filters.rating !== undefined && filters.rating !== null) {
      result = result.filter(tool => (tool.rating || 0) >= filters.rating!);
    }

    // Apply AI powered filter
    if (filters.aiPowered !== null) {
      result = result.filter(tool => tool.aiPowered === filters.aiPowered);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortOption) {
        case 'popular':
          comparison = (b.usageCount || 0) - (a.usageCount || 0);
          break;
        case 'newest':
          comparison = new Date(b.lastUpdated || 0).getTime() - new Date(a.lastUpdated || 0).getTime();
          break;
        case 'name-asc':
        case 'name-desc':
          comparison = a.name.localeCompare(b.name);
          if (sortOption === 'name-desc') comparison *= -1;
          break;
        case 'rating':
          comparison = (b.rating || 0) - (a.rating || 0);
          break;
        case 'usage':
          comparison = (b.stats?.uses || 0) - (a.stats?.uses || 0);
          break;
      }
      return sortDirection === 'desc' ? comparison : -comparison;
    });

    // Apply max items limit
    if (maxItems && !isExpanded) {
      result = result.slice(0, maxItems);
    }

    return result;
  }, [tools, searchQuery, filters, sortOption, sortDirection, maxItems, isExpanded]);

  // Group tools by category
  const groupedTools = useMemo(() => {
    if (!groupByCategory) return null;
    
    const groups: Record<string, Tool[]> = {};
    processedTools.forEach(tool => {
      if (!groups[tool.category]) {
        groups[tool.category] = [];
      }
      groups[tool.category].push(tool);
    });
    
    return groups;
  }, [processedTools, groupByCategory]);

  // Toggle favorite
  const toggleFavorite = useCallback((e: React.MouseEvent, toolId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(toolId)) {
        newSet.delete(toolId);
      } else {
        newSet.add(toolId);
      }
      return newSet;
    });
  }, []);

  // Toggle compare
  const toggleCompare = useCallback((e: React.MouseEvent, toolId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setCompareList(prev => {
      const newSet = new Set(prev);
      if (newSet.has(toolId)) {
        newSet.delete(toolId);
      } else if (newSet.size < 3) {
        newSet.add(toolId);
      }
      return newSet;
    });
  }, []);

  // Copy tool link
  const copyToolLink = useCallback((e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/tool/${slug}`);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  }, []);

  // Get grid columns class
  const getGridClass = useCallback(() => {
    if (viewMode === 'list') return 'grid-cols-1';
    if (viewMode === 'compact') return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';
    if (viewMode === 'masonry') return 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4';
    
    // Grid view with dynamic columns
    const colClasses: Record<number, string> = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
    };
    return colClasses[columns] || colClasses[4];
  }, [viewMode, columns]);

  // Render tool card
  const renderToolCard = (tool: Tool, index: number) => {
    const category = categories.find(c => c.slug === tool.category);
    // @ts-expect-error - Dynamic icon access
    const Icon = Icons[category?.icon || "Zap"] || Icons.Zap;
    const typeConfig = toolTypeConfig[tool.type] || toolTypeConfig.generator;
    const isFavorite = favorites.has(tool.id);
    const isComparing = compareList.has(tool.id);
    const isHovered = hoveredTool === tool.id;
    const isCopied = copiedSlug === tool.slug;

    // Card wrapper for masonry view
    if (viewMode === 'masonry') {
      return (
        <div 
          key={tool.id}
          className="break-inside-avoid mb-4"
          onMouseEnter={() => setHoveredTool(tool.id)}
          onMouseLeave={() => setHoveredTool(null)}
        >
          <Link
            href={`/tool/${tool.slug}`}
            className={`group relative flex flex-col bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
              animateOnMount ? 'animate-fade-in-up' : ''
            }`}
            style={animateOnMount ? { animationDelay: `${index * 50}ms` } : undefined}
          >
            {/* Card content */}
            <div className={`relative p-5 ${typeConfig.bgPattern}`}>
              {/* Icon */}
              <div 
                className={`h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br ${typeConfig.gradient}`}
              >
                <Icon className="h-6 w-6 stroke-[2.5]" />
              </div>
              
              {/* Badges */}
              <div className="absolute top-3 right-3 flex flex-col gap-1">
                {tool.isPopular && (
                  <span className="px-2 py-0.5 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center gap-1">
                    <Flame className="h-3 w-3" /> HOT
                  </span>
                )}
                {tool.aiPowered && (
                  <span className="px-2 py-0.5 bg-purple-500 text-white text-[9px] font-bold rounded-full flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> AI
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                {tool.name}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">{tool.description}</p>
              
              {/* Quick stats */}
              <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-400">
                {tool.rating && (
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {tool.rating}
                  </span>
                )}
                {tool.usageCount && (
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {tool.usageCount > 1000 ? `${(tool.usageCount / 1000).toFixed(1)}k` : tool.usageCount}
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>
      );
    }

    // List view
    if (viewMode === 'list') {
      return (
        <Link
          key={tool.id}
          href={`/tool/${tool.slug}`}
          className={`group relative flex items-center gap-4 bg-white rounded-xl border border-slate-100 p-4 hover:shadow-lg hover:border-blue-200 transition-all duration-300 ${
            animateOnMount ? 'animate-fade-in-up' : ''
          } ${currentToolSlug === tool.slug ? 'ring-2 ring-blue-500 border-blue-500' : ''}`}
          style={animateOnMount ? { animationDelay: `${index * 30}ms` } : undefined}
          onMouseEnter={() => setHoveredTool(tool.id)}
          onMouseLeave={() => setHoveredTool(null)}
        >
          {/* Icon */}
          <div 
            className={`h-12 w-12 rounded-xl flex-shrink-0 flex items-center justify-center text-white shadow-md bg-gradient-to-br ${typeConfig.gradient} transform group-hover:scale-105 transition-transform`}
          >
            <Icon className="h-6 w-6 stroke-[2.5]" />
          </div>
          
          {/* Content */}
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                {tool.name}
              </h3>
              {tool.verified && (
                <Check className="h-4 w-4 text-blue-500 flex-shrink-0" />
              )}
              {tool.isNew && (
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-bold rounded-full">NEW</span>
              )}
            </div>
            <p className="text-sm text-slate-500 truncate">{tool.description}</p>
          </div>
          
          {/* Meta info */}
          <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
            {tool.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium text-slate-600">{tool.rating}</span>
              </div>
            )}
            <div className="px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600">
              {category?.name}
            </div>
          </div>
          
          {/* Quick actions */}
          {showQuickActions && isHovered && (
            <div className="flex items-center gap-2 animate-fade-in">
              <button
                onClick={(e) => toggleFavorite(e, tool.id)}
                className={`p-2 rounded-lg transition-colors ${isFavorite ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'}`}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={(e) => copyToolLink(e, tool.slug)}
                className="p-2 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
              >
                {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          )}
          
          {/* Arrow */}
          <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
        </Link>
      );
    }

    // Compact view
    if (viewMode === 'compact') {
      return (
        <Link
          key={tool.id}
          href={`/tool/${tool.slug}`}
          className="group flex flex-col items-center p-3 bg-white rounded-xl border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all duration-200"
          onMouseEnter={() => setHoveredTool(tool.id)}
          onMouseLeave={() => setHoveredTool(null)}
        >
          <div 
            className={`h-10 w-10 rounded-lg flex items-center justify-center text-white shadow-sm bg-gradient-to-br ${typeConfig.gradient} mb-2 group-hover:scale-110 transition-transform`}
          >
            <Icon className="h-5 w-5 stroke-[2.5]" />
          </div>
          <h3 className="text-xs font-semibold text-slate-900 text-center line-clamp-1 group-hover:text-blue-600 transition-colors">
            {tool.name}
          </h3>
          {tool.isPopular && (
            <Zap className="h-3 w-3 text-amber-500 mt-1" />
          )}
        </Link>
      );
    }

    // Default grid view (enhanced)
    return (
      <Link 
        key={tool.id}
        href={`/tool/${tool.slug}`}
        className={`group relative flex flex-col h-full bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-500 overflow-hidden ${
          staggerDelay || animateOnMount ? 'animate-fade-in-up' : ''
        } ${currentToolSlug === tool.slug ? 'ring-2 ring-blue-500 border-blue-300' : ''} ${
          cardStyle === 'glass' ? 'bg-white/80 backdrop-blur-xl' : ''
        }`}
        style={(staggerDelay || animateOnMount) ? { animationDelay: `${index * 100}ms` } : undefined}
        onMouseEnter={() => setHoveredTool(tool.id)}
        onMouseLeave={() => setHoveredTool(null)}
      >
        {/* Animated Background Gradient */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-all duration-700"
          style={{ 
            background: `radial-gradient(circle at 100% 0%, ${category?.color}20, transparent 70%)`
          }}
        ></div>

        {/* Floating Particles */}
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-slate-200 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500"></div>
        <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-slate-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 delay-150"></div>
        
        {/* Glow effect */}
        <div 
          className="absolute top-0 right-0 w-40 h-40 blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
          style={{ backgroundColor: category?.color }}
        ></div>
        
        {/* Top Icon Section */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="relative">
            {/* Icon Glow */}
            <div 
              className="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500"
              style={{ backgroundColor: category?.color }}
            ></div>
            <div 
              className={`relative h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 bg-gradient-to-br ${typeConfig.gradient}`}
              style={{ boxShadow: `0 10px 25px -5px ${category?.color}66` }}
            >
              <Icon className="h-7 w-7 stroke-[2.5] drop-shadow-lg" />
            </div>
            {/* Badges */}
            {tool.isNew && (
              <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Star className="h-2.5 w-2.5 text-white fill-white" />
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-end gap-2">
            {tool.isPopular && (
              <div className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-[9px] font-black uppercase tracking-wider shadow-lg animate-pulse">
                <Zap className="h-3 w-3 fill-white" />
                HOT
              </div>
            )}
            {tool.aiPowered && (
              <div className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-full text-[9px] font-black uppercase tracking-wider shadow-lg">
                <Sparkles className="h-3 w-3" />
                AI
              </div>
            )}
            {!tool.isPopular && !tool.aiPowered && (
              <div className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[9px] font-bold uppercase tracking-wider">
                {tool.type}
              </div>
            )}
          </div>
        </div>
        
        {/* Content Section */}
        <div className="flex-grow space-y-3 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-black text-lg tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              {tool.name}
            </h3>
            {tool.verified && (
              <span className="inline-flex items-center justify-center h-4 w-4 bg-blue-100 rounded-full">
                <Check className="h-2.5 w-2.5 text-blue-500" />
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 group-hover:text-slate-700 transition-colors">
            {tool.description}
          </p>
          
          {/* Tags */}
          {tool.tags && tool.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tool.tags.slice(0, 3).map((tag, i) => (
                <span 
                  key={i}
                  className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-medium group-hover:bg-slate-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Stats */}
          {showStats && (
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
              {tool.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-bold text-slate-600">{tool.rating}</span>
                </div>
              )}
              {tool.usageCount && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-slate-400" />
                  <span className="text-[10px] font-medium text-slate-500">
                    {tool.usageCount > 1000 ? `${(tool.usageCount / 1000).toFixed(1)}k` : tool.usageCount}
                  </span>
                </div>
              )}
              {tool.difficulty && (
                <div className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                  tool.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                  tool.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {tool.difficulty}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 relative z-10">
          <div className="flex items-center gap-2">
            <div 
              className="w-2.5 h-2.5 rounded-full shadow-sm"
              style={{ backgroundColor: category?.color }}
            ></div>
            <span className="text-xs font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
              {category?.name}
            </span>
          </div>
          
          {/* Quick Actions */}
          {showQuickActions && isHovered ? (
            <div className="flex items-center gap-1 animate-fade-in">
              <button
                onClick={(e) => toggleFavorite(e, tool.id)}
                className={`p-2 rounded-lg transition-colors ${isFavorite ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'}`}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              {enableComparison && (
                <button
                  onClick={(e) => toggleCompare(e, tool.id)}
                  className={`p-2 rounded-lg transition-colors ${isComparing ? 'text-blue-500 bg-blue-50' : 'text-slate-400 hover:text-blue-500 hover:bg-blue-50'}`}
                  title={isComparing ? 'Remove from comparison' : 'Add to comparison'}
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={(e) => copyToolLink(e, tool.slug)}
                className="p-2 rounded-lg text-slate-400 hover:text-green-500 hover:bg-green-50 transition-colors"
                title="Copy link"
              >
                {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          ) : (
            <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-blue-500 group-hover:rotate-12 transition-all duration-500 shadow-xl">
              <ArrowRight className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Hover Border Effect */}
        <div 
          className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none border-2"
          style={{ 
            borderColor: category?.color,
            boxShadow: `0 0 30px ${category?.color}30, inset 0 0 30px ${category?.color}10`
          }}
        ></div>
        
        {/* Shimmer Effect */}
        <div 
          className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100"
        >
          <div className="absolute -top-full left-0 w-full h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-shimmer transform -skew-x-12"></div>
        </div>
      </Link>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      {(title || subtitle) && (
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex flex-col items-start">
            {subtitle && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-4 shadow-xl shadow-green-200 rounded-full">
                <Zap className="h-4 w-4 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{subtitle}</span>
              </div>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 flex items-center gap-3">
                {title}
                <span className="inline-flex items-center justify-center h-10 w-10 bg-green-100 rounded-full">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </span>
              </h2>
            )}
          </div>
          
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            {showSearch && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-48 md:w-64 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
            
            {/* Sort */}
            {showSort && (
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="appearance-none pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="rating">Highest Rated</option>
                  <option value="usage">Most Used</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            )}
            
            {/* Sort Direction */}
            {showSort && (
              <button
                onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
              >
                {sortDirection === 'asc' ? <SortAsc className="h-4 w-4 text-slate-600" /> : <SortDesc className="h-4 w-4 text-slate-600" />}
              </button>
            )}
            
            {/* Filter Toggle */}
            {showFilters && (
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-colors ${
                  showFilterPanel || Object.values(filters).some(v => v && (Array.isArray(v) ? v.length > 0 : true))
                    ? 'bg-blue-50 border-blue-300 text-blue-600'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>
            )}
            
            {/* View Mode Toggle */}
            {showViewToggle && (
              <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                  title="Grid view"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                  title="List view"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('compact')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'compact' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                  title="Compact view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'masonry' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                  title="Masonry view"
                >
                  <Layers className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Filter Panel */}
      {showFilterPanel && showFilters && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tool Type</label>
              <div className="flex flex-wrap gap-2">
                {['calculator', 'converter', 'analyzer', 'generator', 'formatter', 'validator', 'ai'].map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        type: prev.type.includes(type)
                          ? prev.type.filter(t => t !== type)
                          : [...prev.type, type]
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      filters.type.includes(type)
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {['beginner', 'intermediate', 'advanced'].map(diff => (
                  <button
                    key={diff}
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        difficulty: prev.difficulty.includes(diff)
                          ? prev.difficulty.filter(d => d !== diff)
                          : [...prev.difficulty, diff]
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      filters.difficulty.includes(diff)
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Minimum Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        rating: prev.rating === rating ? null : rating
                      }));
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      filters.rating === rating
                        ? 'bg-amber-100 text-amber-600'
                        : 'text-slate-300 hover:text-amber-400'
                    }`}
                  >
                    <Star className={`h-5 w-5 ${filters.rating && rating <= filters.rating ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                ))}
              </div>
            </div>
            
            {/* AI Powered Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">AI Powered</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setFilters(prev => ({
                      ...prev,
                      aiPowered: prev.aiPowered === true ? null : true
                    }));
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${
                    filters.aiPowered === true
                      ? 'bg-purple-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  AI Tools
                </button>
                <button
                  onClick={() => {
                    setFilters(prev => ({
                      ...prev,
                      aiPowered: prev.aiPowered === false ? null : false
                    }));
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    filters.aiPowered === false
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Non-AI
                </button>
              </div>
            </div>
          </div>
          
          {/* Clear Filters */}
          {(filters.type.length > 0 || filters.difficulty.length > 0 || filters.rating || filters.aiPowered !== null) && (
            <div className="mt-4 pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setFilters({
                  type: [],
                  difficulty: [],
                  pricing: [],
                  rating: null,
                  aiPowered: null,
                })}
                className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Results count */}
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>
          Showing {processedTools.length} of {tools.length} tools
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        {maxItems && tools.length > maxItems && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                <Minimize2 className="h-4 w-4" />
                Show less
              </>
            ) : (
              <>
                <Maximize2 className="h-4 w-4" />
                Show all ({tools.length})
              </>
            )}
          </button>
        )}
      </div>
      
      {/* Tool Grid */}
      <div ref={gridRef} className={viewMode === 'masonry' ? getGridClass() : `grid ${getGridClass()} gap-4 md:gap-6`}>
        {groupedTools ? (
          // Grouped by category
          Object.entries(groupedTools).map(([categorySlug, categoryTools]) => {
            const category = categories.find(c => c.slug === categorySlug);
            return (
              <div key={categorySlug} className="col-span-full">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: category?.color }}
                  >
                    {/* @ts-expect-error - Dynamic icon access */}
                    {(() => { const CatIcon = Icons[category?.icon || "Folder"] || Icons.Folder; return <CatIcon className="h-4 w-4" />; })()}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{category?.name}</h3>
                  <span className="text-sm text-slate-400">({categoryTools.length} tools)</span>
                </div>
                <div className={`grid ${getGridClass()} gap-4`}>
                  {categoryTools.map((tool, index) => renderToolCard(tool, index))}
                </div>
              </div>
            );
          })
        ) : (
          // Regular grid
          processedTools.map((tool, index) => renderToolCard(tool, index))
        )}
      </div>
      
      {/* Empty State */}
      {processedTools.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Search className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">No tools found</h3>
          <p className="text-slate-500 max-w-md">
            {searchQuery
              ? `No tools match your search "${searchQuery}". Try different keywords or clear your filters.`
              : 'No tools match your current filters. Try adjusting your criteria.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilters({
                type: [],
                difficulty: [],
                pricing: [],
                rating: null,
                aiPowered: null,
              });
            }}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
      
      {/* Comparison Bar */}
      {enableComparison && compareList.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 flex items-center gap-4 z-50 animate-slide-up">
          <div className="flex items-center gap-2">
            {Array.from(compareList).map(toolId => {
              const tool = tools.find(t => t.id === toolId);
              if (!tool) return null;
              return (
                <div key={toolId} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-700">{tool.name}</span>
                  <button
                    onClick={() => toggleCompare({ preventDefault: () => {}, stopPropagation: () => {} } as React.MouseEvent, toolId)}
                    className="text-blue-400 hover:text-blue-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
            Compare ({compareList.size})
          </button>
        </div>
      )}
    </div>
  );
}
