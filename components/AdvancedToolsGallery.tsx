import React, { useState, useEffect } from 'react';
import { AdvancedTool, getPopularTools } from '../data/advancedTools';
import * as Icons from 'lucide-react';
import { Search, Filter, Grid, List, Star, TrendingUp, Brain } from 'lucide-react';

interface ToolCardProps {
  tool: AdvancedTool;
  viewMode: 'grid' | 'list';
}

function ToolCard({ tool, viewMode }: ToolCardProps) {
  const IconComponent = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
  
  const getPerformanceColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition-all">
        <div className="flex items-center gap-4">
          <div 
            className="h-12 w-12 rounded-lg flex items-center justify-center text-white flex-shrink-0"
            style={{ backgroundColor: tool.color }}
          >
            <IconComponent className="h-6 w-6" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-slate-900 truncate">{tool.name}</h3>
              {tool.aiPowered && (
                <div className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs font-bold">
                  AI
                </div>
              )}
              {tool.realTime && (
                <div className="flex items-center gap-1 text-green-600">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium">LIVE</span>
                </div>
              )}
            </div>
            <p className="text-sm text-slate-600 mb-2 line-clamp-2">{tool.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {tool.features.slice(0, 2).map((feature, index) => (
                <span key={index} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">
                  {feature}
                </span>
              ))}
              {tool.features.length > 2 && (
                <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded text-xs">
                  +{tool.features.length - 2} more
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-4 text-sm">
              <div className="text-center">
                <div className={`font-bold ${getPerformanceColor(tool.performance.accuracy)}`}>
                  {tool.performance.accuracy}%
                </div>
                <div className="text-xs text-slate-500">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-slate-900">{tool.usageCount.toLocaleString()}</div>
                <div className="text-xs text-slate-500">Users</div>
              </div>
            </div>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors">
              Launch
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div 
              className="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform"
              style={{ backgroundColor: tool.color }}
            >
              <IconComponent className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">{tool.name}</h3>
              <p className="text-sm text-slate-600 mt-1">{tool.description}</p>
            </div>
          </div>
          {tool.aiPowered && (
            <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Brain className="h-3 w-3" />
              AI
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tool.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="bg-slate-100 text-slate-700 px-2 py-1 rounded-lg text-xs font-medium">
              {feature}
            </span>
          ))}
          {tool.features.length > 3 && (
            <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded-lg text-xs font-medium">
              +{tool.features.length - 3} more
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 text-center mb-4">
          <div>
            <div className={`text-lg font-bold ${getPerformanceColor(tool.performance.accuracy)}`}>
              {tool.performance.accuracy}%
            </div>
            <div className="text-xs text-slate-500">Accuracy</div>
          </div>
          <div>
            <div className={`text-lg font-bold ${getPerformanceColor(tool.performance.reliability)}`}>
              {tool.performance.reliability}%
            </div>
            <div className="text-xs text-slate-500">Reliability</div>
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900">
              {tool.usageCount.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">Users</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getComplexityColor(tool.complexity)}`}>
            {tool.complexity.charAt(0).toUpperCase() + tool.complexity.slice(1)}
          </span>
          
          <div className="flex items-center gap-2">
            {tool.realTime && (
              <div className="flex items-center gap-1 text-green-600">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">Live</span>
              </div>
            )}
            {tool.collaborative && (
              <div className="flex items-center gap-1 text-blue-600">
                <Icons.Users className="h-3 w-3" />
                <span className="text-xs font-medium">Team</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6">
        <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
          Launch Tool
        </button>
      </div>
    </div>
  );
}

export default function AdvancedToolsGallery() {
  const [tools, setTools] = useState<AdvancedTool[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popularity' | 'accuracy' | 'usage' | 'name'>('popularity');
  const [filterAI, setFilterAI] = useState(false);
  const [filterRealTime, setFilterRealTime] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTools = () => {
      setIsLoading(true);
      
      let filteredTools = getPopularTools(50);
      
      // Apply filters
      if (filterAI) {
        filteredTools = filteredTools.filter(tool => tool.aiPowered);
      }
      
      if (filterRealTime) {
        filteredTools = filteredTools.filter(tool => tool.realTime);
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredTools = filteredTools.filter(tool => 
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'popularity':
          filteredTools.sort((a, b) => b.popularity - a.popularity);
          break;
        case 'accuracy':
          filteredTools.sort((a, b) => b.performance.accuracy - a.performance.accuracy);
          break;
        case 'usage':
          filteredTools.sort((a, b) => b.usageCount - a.usageCount);
          break;
        case 'name':
          filteredTools.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
      
      setTools(filteredTools);
      setIsLoading(false);
    };

    loadTools();
  }, [sortBy, filterAI, filterRealTime, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Advanced Tools Gallery</h1>
              <p className="text-slate-600 mt-2">Explore our collection of professional-grade tools</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex border border-slate-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-slate-600" />
              <span className="font-medium text-slate-700">Filters:</span>
            </div>
            
            <button
              onClick={() => setFilterAI(!filterAI)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filterAI 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              <Brain className="h-3 w-3 inline mr-1" />
              AI Powered
            </button>
            
            <button
              onClick={() => setFilterRealTime(!filterRealTime)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filterRealTime 
                  ? 'bg-green-600 text-white' 
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              <div className="h-2 w-2 bg-white rounded-full inline-block mr-1 animate-pulse"></div>
              Real-time
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="accuracy">Sort by Accuracy</option>
              <option value="usage">Sort by Usage</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tools Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : tools.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No tools found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} viewMode={viewMode} />
            ))}
          </div>
        )}

        {/* Load More */}
        {!isLoading && tools.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-6 py-3 bg-white border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors">
              Load More Tools
            </button>
          </div>
        )}
      </div>
    </div>
  );
}