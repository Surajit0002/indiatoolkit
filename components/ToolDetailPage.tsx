import React, { useState, useEffect } from 'react';
import { AdvancedTool, getToolById, getRelatedTools } from '../data/advancedTools';
import * as Icons from 'lucide-react';
import { ArrowLeft, Brain, Star, Share2, Bookmark, Play, Settings } from 'lucide-react';
import Link from 'next/link';

interface ToolDetailPageProps {
  toolId: string;
}

export default function ToolDetailPage({ toolId }: ToolDetailPageProps) {
  const [tool, setTool] = useState<AdvancedTool | null>(null);
  const [relatedTools, setRelatedTools] = useState<AdvancedTool[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'performance' | 'integrations'>('overview');

  useEffect(() => {
    const loadToolData = () => {
      const toolData = getToolById(toolId);
      if (toolData) {
        setTool(toolData);
        setRelatedTools(getRelatedTools(toolId, 4));
      }
    };

    loadToolData();
  }, [toolId]);

  if (!tool) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading tool details...</p>
        </div>
      </div>
    );
  }

  const IconComponent = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  const getPerformanceColor = (score: number) => {
    if (score >= 95) return 'text-green-600 bg-green-50';
    if (score >= 85) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getSpeedColor = (speed: string) => {
    switch (speed) {
      case 'fast': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'slow': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/advanced-tools" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{tool.name}</h1>
              <p className="text-slate-600">{tool.description}</p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked 
                    ? 'bg-yellow-100 text-yellow-600' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Bookmark className="h-5 w-5" />
              </button>
              <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Tool Header Card */}
          <div className="bg-linear-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div 
                  className="h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-xl"
                  style={{ backgroundColor: tool.color }}
                >
                  <IconComponent className="h-8 w-8 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{tool.name}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{tool.popularity}/100</span>
                    </div>
                    <div className="text-sm opacity-80">
                      {tool.usageCount.toLocaleString()} users
                    </div>
                    {tool.aiPowered && (
                      <div className="flex items-center gap-1 bg-purple-500 px-2 py-1 rounded-full">
                        <Brain className="h-3 w-3" />
                        <span className="text-xs font-bold">AI</span>
                      </div>
                    )}
                    {tool.realTime && (
                      <div className="flex items-center gap-1 bg-green-500 px-2 py-1 rounded-full">
                        <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold">LIVE</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
                <Play className="h-5 w-5" />
                Launch Tool
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 mb-6">
              <div className="flex border-b border-slate-200">
                {[
                  { id: 'overview', label: 'Overview', icon: Icons.Info },
                  { id: 'features', label: 'Features', icon: Icons.List },
                  { id: 'performance', label: 'Performance', icon: Icons.BarChart3 },
                  { id: 'integrations', label: 'Integrations', icon: Icons.Plug }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'overview' | 'features' | 'performance' | 'integrations')}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">About this Tool</h3>
                      <p className="text-slate-700 leading-relaxed">{tool.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tool.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                            <span className="text-slate-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-blue-600 font-bold text-lg">{tool.version}</div>
                        <div className="text-sm text-blue-800">Current Version</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-green-600 font-bold">{tool.lastUpdated}</div>
                        <div className="text-sm text-green-800">Last Updated</div>
                      </div>
                      <div className={`p-4 rounded-lg ${getPerformanceColor(tool.performance.accuracy).split(' ')[1]}`}>
                        <div className={`font-bold text-lg ${getPerformanceColor(tool.performance.accuracy).split(' ')[0]}`}>
                          {tool.performance.accuracy}%
                        </div>
                        <div className="text-sm opacity-80">Accuracy Rate</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Detailed Features</h3>
                    <div className="space-y-3">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                          <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <Icons.Check className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{feature}</div>
                            <div className="text-sm text-slate-600 mt-1">
                              Detailed description of {feature.toLowerCase()} feature and its capabilities.
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'performance' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-slate-900">Performance Metrics</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className={`p-4 rounded-lg ${getPerformanceColor(tool.performance.accuracy)}`}>
                        <div className="text-2xl font-bold">Accuracy</div>
                        <div className="text-3xl font-bold mt-2">{tool.performance.accuracy}%</div>
                        <div className="text-sm opacity-80 mt-1">Processing accuracy rate</div>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${getPerformanceColor(tool.performance.reliability)}`}>
                        <div className="text-2xl font-bold">Reliability</div>
                        <div className="text-3xl font-bold mt-2">{tool.performance.reliability}%</div>
                        <div className="text-sm opacity-80 mt-1">System reliability score</div>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${getSpeedColor(tool.performance.speed)}`}>
                        <div className="text-2xl font-bold">Speed</div>
                        <div className="text-3xl font-bold mt-2 capitalize">{tool.performance.speed}</div>
                        <div className="text-sm opacity-80 mt-1">Processing speed category</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-bold text-slate-900 mb-3">Performance History</h4>
                      <div className="h-32 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-slate-500">Performance chart visualization</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'integrations' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Available Integrations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {tool.integrations.map((integration, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Icons.Plug className="h-5 w-5 text-slate-600" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{integration}</div>
                            <div className="text-sm text-slate-600">Integration available</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                  <Play className="h-4 w-4" />
                  Launch Tool
                </button>
                <button className="w-full bg-white border border-slate-300 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <Settings className="h-4 w-4" />
                  Configure
                </button>
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                  View Documentation
                </button>
              </div>
            </div>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  {relatedTools.map((relatedTool) => {
                    const RelatedIcon = Icons[relatedTool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                    return (
                      <Link 
                        key={relatedTool.id}
                        href={`/tools/${relatedTool.id}`}
                        className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <div 
                          className="h-10 w-10 rounded-lg flex items-center justify-center text-white"
                          style={{ backgroundColor: relatedTool.color }}
                        >
                          <RelatedIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{relatedTool.name}</div>
                          <div className="text-sm text-slate-600">{relatedTool.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag, index) => (
                  <span key={index} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}