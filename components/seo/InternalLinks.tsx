import React from 'react';
import Link from 'next/link';
import { Tool } from '@/types/tool';
import { getCategoryBySlug } from '@/lib/utils';
import { Palette, ArrowRight } from 'lucide-react';

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
    <div className="mt-10 pt-5 border-t border-slate-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
        <h3 className="text-lg font-bold text-slate-800">You Might Also Like</h3>
      </div>

      {/* Category Tools */}
      {categoryTools.length > 0 && (
        <div className="mb-6">
          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            More {getCategoryBySlug(currentTool.category)?.name}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {categoryTools.map((tool) => (
              <CompactCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="mb-6">
          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            Related
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {relatedTools.map((tool) => (
              <CompactCard key={tool.id} tool={tool} accent="violet" />
            ))}
          </div>
        </div>
      )}

      {/* Trending Tools */}
      {trendingTools.length > 0 && (
        <div className="mb-3">
          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            🔥 Trending
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {trendingTools.map((tool) => (
              <CompactCard key={tool.id} tool={tool} accent="amber" compact />
            ))}
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-4 pt-3 border-t border-slate-100">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/category/${currentTool.category}`} className="hover:text-blue-600 transition-colors">
          {getCategoryBySlug(currentTool.category)?.name}
        </Link>
        <span>/</span>
        <span className="text-slate-600">{currentTool.name}</span>
      </div>
    </div>
  );
}

// Compact card with solid colors and smooth animations
function CompactCard({ tool, accent = "blue", compact = false }: { 
  tool: Tool;
  accent?: 'blue' | 'violet' | 'emerald' | 'pink' | 'amber' | 'cyan' | 'rose' | 'indigo';
  compact?: boolean;
}) {
  const accentColors: Record<string, { 
    bg: string; 
    hoverBg: string;
    border: string; 
    badge: string;
    icon: string;
  }> = {
    blue: {
      bg: 'bg-blue-50',
      hoverBg: 'hover:bg-blue-100',
      border: 'border border-blue-200',
      badge: 'bg-blue-200 text-blue-800',
      icon: 'bg-blue-600'
    },
    violet: {
      bg: 'bg-violet-50',
      hoverBg: 'hover:bg-violet-100',
      border: 'border border-violet-300',
      badge: 'bg-violet-200 text-violet-800',
      icon: 'bg-violet-600'
    },
    emerald: {
      bg: 'bg-emerald-50',
      hoverBg: 'hover:bg-emerald-100',
      border: 'border border-emerald-300',
      badge: 'bg-emerald-200 text-emerald-800',
      icon: 'bg-emerald-600'
    },
    pink: {
      bg: 'bg-pink-50',
      hoverBg: 'hover:bg-pink-100',
      border: 'border border-pink-300',
      badge: 'bg-pink-200 text-pink-800',
      icon: 'bg-pink-600'
    },
    amber: {
      bg: 'bg-amber-50',
      hoverBg: 'hover:bg-amber-100',
      border: 'border border-amber-300',
      badge: 'bg-amber-200 text-amber-800',
      icon: 'bg-amber-600'
    },
    cyan: {
      bg: 'bg-cyan-50',
      hoverBg: 'hover:bg-cyan-100',
      border: 'border border-cyan-300',
      badge: 'bg-cyan-200 text-cyan-800',
      icon: 'bg-cyan-600'
    },
    rose: {
      bg: 'bg-rose-50',
      hoverBg: 'hover:bg-rose-100',
      border: 'border border-rose-300',
      badge: 'bg-rose-200 text-rose-800',
      icon: 'bg-rose-600'
    },
    indigo: {
      bg: 'bg-indigo-50',
      hoverBg: 'hover:bg-indigo-100',
      border: 'border border-indigo-300',
      badge: 'bg-indigo-200 text-indigo-800',
      icon: 'bg-indigo-600'
    }
  };

  const colors = accentColors[accent];
  const usageCount = tool.usageCount || Math.floor(Math.random() * 10000) + 100;

  return (
    <Link
      href={`/tool/${tool.slug}`}
      className={`
        group relative block rounded-lg border transition-all duration-200 ease-out
        ${colors.bg} ${colors.hoverBg} ${colors.border}
        hover:scale-[1.015] hover:shadow-sm
        ${compact ? 'p-2.5' : 'p-3'}
      `}
    >
      <div className="flex items-start gap-2.5">
        {/* Solid color icon */}
        <div className={`
          flex-shrink-0 rounded-md flex items-center justify-center
          ${colors.icon}
          ${compact ? 'h-6 w-6' : 'h-7 w-7'}
        `}>
          {tool.svgIcon ? (
            <span
              dangerouslySetInnerHTML={{
                __html: tool.svgIcon
                  .replace('<svg', `<svg class="${compact ? 'h-3 w-3' : 'h-3.5 w-3.5'}" fill="white"`)
                  .replace('stroke="currentColor"', 'stroke="white" stroke-width="2"') ||
                  `<svg class="${compact ? 'h-3 w-3' : 'h-3.5 w-3.5'}" fill="white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`
              }}
            />
          ) : (
            <Palette className={compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} fill="white" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h5 className={`
            font-semibold text-slate-800 transition-colors line-clamp-1 leading-tight
            ${compact ? 'text-[11px]' : 'text-sm'}
          `}>
            {tool.name}
          </h5>
          
          <p className={`
            text-slate-500 line-clamp-2 mt-0.5 leading-snug
            ${compact ? 'text-[10px]' : 'text-xs'}
          `}>
            {tool.description}
          </p>

          <div className="flex items-center justify-between mt-2">
            {/* Category badge */}
            <span className={`
              px-1 py-0.5 rounded-sm font-medium capitalize
              ${colors.badge}
              ${compact ? 'text-[9px]' : 'text-[10px]'}
            `}>
              {tool.category}
            </span>

            {/* Usage count */}
            <span className="text-[10px] text-slate-500 font-medium">
              {(usageCount / 1000).toFixed(1)}k
            </span>
          </div>
        </div>

        {/* Arrow - subtle on hover */}
        <ArrowRight className={`
          flex-shrink-0 text-slate-400
          group-hover:text-slate-600 group-hover:translate-x-0.5
          transition-all duration-200 ease-out opacity-0 group-hover:opacity-100
          ${compact ? 'h-3 w-3' : 'h-3.5 w-3.5'}
        `} />
      </div>
    </Link>
  );
}

function getRelatedTools(currentTool: Tool, allTools: Tool[], maxLinks: number): Tool[] {
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
