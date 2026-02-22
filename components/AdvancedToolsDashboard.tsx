import React, { useState, useEffect } from 'react';
import { AdvancedTool, getPopularTools, getAITools, getRealTimeTools, searchTools } from '../data/advancedTools';
import * as Icons from 'lucide-react';
import { Search, Zap, Brain, TrendingUp, Grid } from 'lucide-react';

export default function AdvancedToolsDashboard() {
  const [activeTab, setActiveTab] = useState<'popular' | 'ai' | 'realtime' | 'all'>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState<AdvancedTool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTools = () => {
      setIsLoading(true);
      
      let tools: AdvancedTool[] = [];
      
      if (searchQuery) {
        tools = searchTools(searchQuery);
      } else {
        switch (activeTab) {
          case 'popular':
            tools = getPopularTools(12);
            break;
          case 'ai':
            tools = getAITools();
            break;
          case 'realtime':
            tools = getRealTimeTools();
            break;
          case 'all':
            tools = getPopularTools(20);
            break;
        }
      }
      
      setFilteredTools(tools);
      setIsLoading(false);
    };

    loadTools();
  }, [activeTab, searchQuery]);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Advanced Tools Hub</h1>
              <p className="text-slate-600 mt-2">Professional-grade tools with AI-powered capabilities</p>
            </div>
            
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search advanced tools..."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              { id: 'popular', label: 'Popular Tools', icon: TrendingUp },
              { id: 'ai', label: 'AI Powered', icon: Brain },
              { id: 'realtime', label: 'Real-time', icon: Zap },
              { id: 'all', label: 'All Tools', icon: Grid }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'popular' | 'ai' | 'realtime' | 'all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No tools found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const IconComponent = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
              
              return (
                <div key={tool.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  {/* Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between">
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
                  </div>

                  {/* Features */}
                  <div className="px-6 pb-4">
                    <div className="flex flex-wrap gap-2">
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
                  </div>

                  {/* Stats */}
                  <div className="px-6 pb-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
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
                  </div>

                  {/* Footer */}
                  <div className="px-6 pb-6">
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
                    
                    <button className="w-full mt-4 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                      <span>Launch Tool</span>
                      <Icons.ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More */}
        {!searchQuery && !isLoading && (
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