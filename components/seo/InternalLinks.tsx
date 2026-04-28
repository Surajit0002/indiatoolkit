import React from 'react';
import Link from 'next/link';
import { Tool } from '@/types/tool';
import { getCategoryBySlug } from '@/lib/utils';

interface InternalLinksProps {
  currentTool: Tool;
  allTools: Tool[];
  maxLinks?: number;
}

export default function InternalLinks({ currentTool, allTools, maxLinks = 8 }: InternalLinksProps) {
  const relatedTools = getRelatedTools(currentTool, allTools, maxLinks);
  const categoryTools = getCategoryTools(currentTool, allTools, 4);
  const trendingTools = allTools.filter(t => t.isPopular || t.isTrending).slice(0, 3);

  return (
    <div className="mt-12 pt-8 border-t border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-6">You Might Also Like</h3>
      
      {/* Same Category Tools */}
      {categoryTools.length > 0 && (
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            More Tools in {getCategoryBySlug(currentTool.category)?.name}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categoryTools.map(tool => (
              <ToolLink key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Related Tools
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {relatedTools.map(tool => (
              <ToolLink key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      )}

      {/* Trending Tools */}
      {trendingTools.length > 0 && (
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Trending Now 🔥
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {trendingTools.map(tool => (
              <ToolLink key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href={`/category/${currentTool.category}`} className="hover:text-blue-600">
          {getCategoryBySlug(currentTool.category)?.name}
        </Link>
        <span>/</span>
        <span className="text-slate-700">{currentTool.name}</span>
      </div>
    </div>
  );
}

function ToolLink({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="block p-3 bg-white rounded-lg border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all group"
    >
      <div className="text-xs font-medium text-slate-700 group-hover:text-blue-600 truncate">
        {tool.name}
      </div>
      <div className="text-[10px] text-slate-400 mt-1">
        {tool.usageCount?.toLocaleString() || 0} uses
      </div>
    </Link>
  );
}

function getRelatedTools(currentTool: Tool, allTools: Tool[], maxLinks: number): Tool[] {
  // Find tools with overlapping tags
  const currentTags = new Set(currentTool.tags || []);
  
  const scoredTools = allTools
    .filter(t => t.id !== currentTool.id && t.category === currentTool.category)
    .map(tool => {
      const toolTags = new Set(tool.tags || []);
      const overlap = [...currentTags].filter(tag => toolTags.has(tag)).length;
      return { tool, score: overlap };
    })
    .sort((a, b) => b.score - b.score || (b.tool.usageCount || 0) - (a.tool.usageCount || 0));

  return scoredTools.slice(0, maxLinks).map(t => t.tool);
}

function getCategoryTools(currentTool: Tool, allTools: Tool[], limit: number): Tool[] {
  return allTools
    .filter(t => t.category === currentTool.category && t.id !== currentTool.id)
    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
    .slice(0, limit);
}
