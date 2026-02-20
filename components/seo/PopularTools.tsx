"use client";

import Link from "next/link";
import { Star, TrendingUp,  ChevronRight, Sparkles } from "lucide-react";
import { Tool } from "@/types/tool";
import * as Icons from "lucide-react";

interface PopularToolsProps {
  tools: Tool[];
  limit?: number;
  showViewAll?: boolean;
}

/**
 * PopularTools Component
 * Displays the most popular tools for SEO internal linking
 */
export function PopularTools({
  tools,
  limit = 8,
  showViewAll = true,
}: PopularToolsProps) {
  const popularTools = tools
    .filter((t) => t.isPopular)
    .slice(0, limit);

  if (popularTools.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          <h2 className="text-xl font-bold text-slate-900">Popular Tools</h2>
        </div>
        {showViewAll && (
          <Link
            href="/tools?filter=popular"
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {popularTools.map((tool, index) => (
          <PopularToolCard key={tool.id} tool={tool} rank={index + 1} />
        ))}
      </div>
    </section>
  );
}

/**
 * PopularToolCard - Individual card for popular tools
 */
function PopularToolCard({ tool, rank }: { tool: Tool; rank: number }) {
  // @ts-expect-error - Dynamic icon access
  const ToolIcon = Icons[tool.icon] || Icons.Wrench;

  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="group relative p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
    >
      {/* Rank Badge */}
      {rank <= 3 && (
        <div
          className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
            rank === 1
              ? "bg-amber-500"
              : rank === 2
              ? "bg-slate-400"
              : "bg-amber-700"
          }`}
        >
          {rank}
        </div>
      )}

      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-linear-to-br from-slate-100 to-slate-50 rounded-xl group-hover:from-blue-50 group-hover:to-blue-100 transition-colors mb-3">
          <ToolIcon className="h-6 w-6 text-slate-600 group-hover:text-blue-600" />
        </div>
        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 text-sm">
          {tool.name}
        </h3>
        {tool.stats?.usageCount && (
          <p className="text-xs text-slate-500 mt-1">
            {formatUsageCount(tool.stats.usageCount)} uses
          </p>
        )}
      </div>
    </Link>
  );
}

/**
 * TrendingTools Component
 * Displays trending tools based on recent activity
 */
export function TrendingTools({
  tools,
  limit = 6,
}: {
  tools: Tool[];
  limit?: number;
}) {
  const trendingTools = tools
    .filter((t) => t.isTrending || t.isNew)
    .slice(0, limit);

  if (trendingTools.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <h2 className="text-xl font-bold text-slate-900">Trending Now</h2>
        </div>
        <Link
          href="/tools?filter=trending"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          View all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingTools.map((tool) => (
          <TrendingToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}

/**
 * TrendingToolCard - Individual card for trending tools
 */
function TrendingToolCard({ tool }: { tool: Tool }) {
  // @ts-expect-error - Dynamic icon access
  const ToolIcon = Icons[tool.icon] || Icons.Wrench;

  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-green-300 hover:shadow-md transition-all"
    >
      <div className="p-2.5 bg-linear-to-br from-green-50 to-emerald-50 rounded-lg group-hover:from-green-100 group-hover:to-emerald-100 transition-colors">
        <ToolIcon className="h-5 w-5 text-green-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-900 group-hover:text-green-600 truncate">
            {tool.name}
          </h3>
          {tool.isNew && (
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              New
            </span>
          )}
        </div>
        <p className="text-sm text-slate-500 truncate mt-0.5">
          {tool.description}
        </p>
      </div>
      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-green-600 transition-colors" />
    </Link>
  );
}

/**
 * NewTools Component
 * Displays newly added tools
 */
export function NewTools({ tools, limit = 4 }: { tools: Tool[]; limit?: number }) {
  const newTools = tools.filter((t) => t.isNew).slice(0, limit);

  if (newTools.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <h2 className="text-xl font-bold text-slate-900">New Tools</h2>
        </div>
        <Link
          href="/tools?filter=new"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          View all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {newTools.map((tool) => (
          <NewToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}

/**
 * NewToolCard - Individual card for new tools
 */
function NewToolCard({ tool }: { tool: Tool }) {
  // @ts-expect-error - Dynamic icon access
  const ToolIcon = Icons[tool.icon] || Icons.Wrench;

  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="group p-4 bg-linear-to-br from-purple-50 to-white rounded-xl border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
          <ToolIcon className="h-4 w-4 text-purple-600" />
        </div>
        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
          Just Added
        </span>
      </div>
      <h3 className="font-semibold text-slate-900 group-hover:text-purple-600">
        {tool.name}
      </h3>
      <p className="text-sm text-slate-500 line-clamp-2 mt-1">
        {tool.description}
      </p>
    </Link>
  );
}

/**
 * Helper function to format usage count
 */
function formatUsageCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}
