import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, History } from 'lucide-react';
import { Tool } from '@/types/tool';
import { toolAnalytics, useTrendingTools } from '@/lib/analytics/tool-analytics';

interface PersonalizedRecommendationsProps {
  allTools: Tool[];
  currentToolId?: string;
}

export default function PersonalizedRecommendations({ allTools, currentToolId }: PersonalizedRecommendationsProps) {
  const [recentTools, setRecentTools] = useState<Array<{ toolId: string; toolSlug: string; timestamp: string }>>([]);
  const [recommendedTools, setRecommendedTools] = useState<Tool[]>([]);
  const trendingTools = useTrendingTools();

  useEffect(() => {
    // Load recent usage
    const recent = toolAnalytics.getRecentUsage();
    setRecentTools(recent);

    // Get personalized recommendations
    const recommendations = toolAnalytics.getPersonalizedRecommendations(
      allTools.filter(t => t.id !== currentToolId),
      6
    );
    // Map to full Tool objects
    const tools = recommendations.map(t => {
      if ('clicks' in t) {
        // It's a ToolUsage, find the matching Tool
        return allTools.find(tool => tool.id === t.toolId);
      }
      // It's already a Tool-like object
      return (t as { id: string; slug: string; category: string; tags?: string[] });
    }).filter(Boolean) as Tool[];
    setRecommendedTools(tools);
  }, [allTools, currentToolId]);

  const clearHistory = () => {
    toolAnalytics.clearData();
    setRecentTools([]);
    setRecommendedTools([]);
  };

  const hasHistory = recentTools.length > 0;
  const hasRecommendations = recommendedTools.length > 0;

  return (
    <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-200">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-4">
                <History className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-bold text-indigo-700">Personalized For You</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                {hasHistory ? 'Based on Your Recent Activity' : 'Recommended For You'}
              </h2>
              <p className="text-slate-600 mt-2">
                {hasHistory 
                  ? 'Tools you might like based on your recent usage patterns'
                  : 'Discover tools that other users with similar interests enjoy'}
              </p>
            </div>
            {hasHistory && (
              <button
                onClick={clearHistory}
                className="text-xs text-slate-400 hover:text-slate-600 font-medium flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                Clear History
              </button>
            )}
          </div>

          {/* Recent Tools */}
          {hasHistory && (
            <div className="mb-10">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Recent Tools</h3>
              <div className="flex flex-wrap gap-3">
                {recentTools.slice(0, 5).map((recent) => {
                  const tool = allTools.find(t => t.id === recent.toolId);
                  if (!tool) return null;
                  
                  return (
                    <Link
                      key={recent.toolId}
                      href={`/tool/${recent.toolSlug}`}
                      className="group inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-indigo-300"
                    >
                      <div 
                        className="h-5 w-5 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: tool.accentColor || tool.backgroundColor || '#4f46e5' }}
                        dangerouslySetInnerHTML={{
                          __html: tool.svgIcon?.replace('<svg', `<svg class="h-3 w-3" fill="white"`).replace('"#000000"', '"white"') || 
                                 `<svg class="h-3 w-3" fill="white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`
                        }}
                      />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                        {tool.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

           {/* Recommended Tools Grid */}
           <div>
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
               {hasHistory ? 'Suggested Tools' : 'Popular Tools'}
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(hasRecommendations 
                  ? recommendedTools 
                  : trendingTools.slice(0, 6).map(t => allTools.find(tool => tool && tool.id === t.toolId)).filter(Boolean) as Tool[]
                ).map((tool: Tool) => (
                <Link
                  key={tool.id}
                  href={`/tool/${tool.slug}`}
                  className="group block bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div 
                      className="h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transform group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: tool.accentColor || tool.backgroundColor || '#4f46e5' }}
                      dangerouslySetInnerHTML={{
                        __html: tool.svgIcon?.replace('<svg', `<svg fill="white" class="h-7 w-7`).replace('"#000000"', '"white"') || 
                               `<svg fill="none" class="h-7 w-7" viewBox="0 0 24 24"><circle fill="white" cx="12" cy="12" r="10"/></svg>`
                      }}
                    />
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {tool.name}
                        </h3>
                         {(tool.usageCount ?? 0) > 1000 && (
                          <span className="text-red-500 text-sm flex-shrink-0 ml-2">🔥</span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                        {tool.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="font-bold text-slate-500">
                          {(tool.usageCount || 0).toLocaleString()}
                        </span>
                        <span>users</span>
                        <span className="text-slate-300">•</span>
                        <span className="capitalize">{tool.category}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Trending Tools Section */}
          {trendingTools.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                🔥 Trending Right Now
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {trendingTools.slice(0, 6).map((trending) => {
                  const tool = allTools.find(t => t.id === trending.toolId);
                  if (!tool) return null;
                  
                  return (
                    <Link
                      key={tool.id}
                      href={`/tool/${tool.slug}`}
                      className="group block bg-white rounded-xl p-4 border-2 border-red-100 shadow-sm hover:shadow-md transition-all animate-pulse"
                    >
                      <div className="text-center">
                        <div 
                          className="h-10 w-10 rounded-xl mx-auto mb-2 flex items-center justify-center"
                          style={{ backgroundColor: tool.accentColor || '#ef4444' }}
                          dangerouslySetInnerHTML={{
                            __html: tool.svgIcon?.replace('<svg', `<svg class="h-5 w-5" fill="white"`).replace('"#000000"', '"white"') || 
                                   `<svg class="h-5 w-5" fill="white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`
                          }}
                        />
                        <p className="text-xs font-bold text-slate-700 line-clamp-1">
                          {tool.name}
                        </p>
                         <p className="text-xs text-red-500 font-bold mt-1">
                           {trending.clicks24h || 0} today
                         </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </section>
  );
}
