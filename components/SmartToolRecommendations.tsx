"use client";

import React, { useState, useMemo } from "react";
import { 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Users, 
  Zap,
  Star,
  ChevronRight,
  
  Search,
  Settings
} from "lucide-react";
import { advancedTools, AdvancedTool } from "../data/advancedTools";

interface RecommendationEngineProps {
  userPreferences?: {
    categories: string[];
    usageHistory: string[];
    skillLevel: 'beginner' | 'intermediate' | 'advanced';
  };
  onToolSelect?: (tool: AdvancedTool) => void;
}

export default function SmartToolRecommendations({ 
  userPreferences, 
  onToolSelect 
}: RecommendationEngineProps) {
  const [activeFilter, setActiveFilter] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');

  // Use useMemo for derived recommendations instead of useEffect with setState
  const recommendations = useMemo(() => {
    // Base recommendation pool
    let pool = [...advancedTools];
    
    // Apply filters
    switch (activeFilter) {
      case 'trending':
        pool = pool.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'newest':
        pool = pool.sort((a, b) => 
          new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
        );
        break;
      case 'popular':
        pool = pool.sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));
        break;
      case 'ai-powered':
        pool = pool.filter(tool => tool.features?.includes('AI-Powered'));
        break;
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      pool = pool.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
      );
    }
    
    // Apply user preferences
    if (userPreferences?.categories?.length) {
      pool = pool.filter(tool => 
        userPreferences.categories.includes(tool.category)
      );
    }
    
    // Limit results
    return pool.slice(0, 12);
  }, [userPreferences, activeFilter, searchQuery]);

  // Loading is only true on initial mount when recommendations are empty
  const loading = useMemo(() => recommendations.length === 0, [recommendations.length]);

  const getRecommendationScore = (tool: AdvancedTool): number => {
    let score = 0;
    
    // Popularity boost
    score += (tool.popularity || 0) * 10;
    
    // Usage frequency boost
    score += (tool.usageCount || 0) * 5;
    
    // AI-powered boost
    if (tool.features?.includes('AI-Powered')) score += 50;
    
    // Real-time processing boost
    if (tool.features?.includes('Real-time')) score += 30;
    
    // User preference match
    if (userPreferences?.categories?.includes(tool.category)) score += 100;
    
    return score;
  };

  const getScoreColor = (score: number) => {
    if (score > 200) return 'text-green-600';
    if (score > 100) return 'text-blue-600';
    if (score > 50) return 'text-yellow-600';
    return 'text-gray-500';
  };

  const getScoreLabel = (score: number) => {
    if (score > 200) return 'Highly Recommended';
    if (score > 100) return 'Recommended';
    if (score > 50) return 'Good Choice';
    return 'Available';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Smart Recommendations</h2>
            <p className="text-sm text-gray-500">AI-powered tool suggestions for you</p>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
          <Settings className="h-4 w-4" />
          <span className="text-sm font-medium">Preferences</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'trending', label: 'Trending', icon: TrendingUp },
          { id: 'newest', label: 'Newest', icon: Clock },
          { id: 'popular', label: 'Popular', icon: Users },
          { id: 'ai-powered', label: 'AI Tools', icon: Zap }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeFilter === filter.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <filter.icon className="h-4 w-4" />
            {filter.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search recommended tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Recommendations Grid */}
      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((tool) => {
            const score = getRecommendationScore(tool);
            const scoreColor = getScoreColor(score);
            const scoreLabel = getScoreLabel(score);
            
            return (
              <div
                key={tool.id}
                onClick={() => onToolSelect?.(tool)}
                className="group p-5 bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl">
                    {tool.icon}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-bold text-gray-700">{tool.rating || 4.8}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {tool.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {tool.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.features?.slice(0, 2).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-lg"
                    >
                      {feature}
                    </span>
                  ))}
                  {tool.features && tool.features.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-lg">
                      +{tool.features.length - 2} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 ${scoreColor}`}>
                      <Sparkles className="h-4 w-4" />
                      <span className="text-xs font-bold">{scoreLabel}</span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      {tool.usageCount || 0}+ users
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Updated {new Date().toLocaleDateString()}
          </p>
          <button className="text-sm font-medium text-purple-600 hover:text-purple-700">
            View All Recommendations
          </button>
        </div>
      </div>
    </div>
  );
}