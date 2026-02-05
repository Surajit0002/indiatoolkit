"use client";

import { useState, useEffect } from "react";
import { Star, Trash2, ExternalLink, Bookmark, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Tool } from "@/types/tool";
import { getToolBySlug, getCategoryBySlug } from "@/lib/utils";

interface SavedToolsProps {
  maxItems?: number;
  showTitle?: boolean;
}

export default function SavedTools({ maxItems = 6, showTitle = true }: SavedToolsProps) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [savedTools, setSavedTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved tools from localStorage
    const saved = localStorage.getItem("saved-tools");
    if (saved) {
      const slugs = JSON.parse(saved);
      setSavedSlugs(slugs);

      // Fetch tool details
      const tools = slugs
        .slice(0, maxItems)
        .map((slug: string) => getToolBySlug(slug))
        .filter(Boolean) as Tool[];
      setSavedTools(tools);
    }
    setIsLoading(false);
  }, [maxItems]);

  const removeTool = (slug: string) => {
    const newSlugs = savedSlugs.filter((s) => s !== slug);
    setSavedSlugs(newSlugs);
    localStorage.setItem("saved-tools", JSON.stringify(newSlugs));
    setSavedTools((prev) => prev.filter((t) => t.slug !== slug));
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (savedTools.length === 0) {
    return (
      <div className="text-center py-16 px-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl border border-slate-200">
        <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-slate-200">
          <Bookmark className="h-10 w-10 text-slate-300" />
        </div>
        <h3 className="font-black text-xl text-slate-800 mb-2">No Saved Tools Yet</h3>
        <p className="text-slate-500 font-medium mb-6 max-w-sm mx-auto">
          Star tools while browsing to save them here for quick access. Your saved tools will appear here.
        </p>
        <Link 
          href="/tools"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all duration-300 shadow-lg shadow-green-200 hover:shadow-xl hover:-translate-y-1"
        >
          <Sparkles className="h-5 w-5" />
          Explore Tools
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
              <Bookmark className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-xl text-slate-800">Saved Tools</h3>
              <p className="text-xs text-slate-500 font-medium">Your quick access collection</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wide">
            {savedTools.length} saved
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {savedTools.map((tool, index) => {
          const category = getCategoryBySlug(tool.category);
          return (
            <div
              key={tool.id}
              className="group relative flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at 100% 0%, ${category?.color}20, transparent 70%)` }}
              ></div>

              {/* Icon */}
              <div
                className="relative h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${category?.color}, ${category?.color}dd)`,
                }}
              >
                <Star className="h-6 w-6 fill-current" />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/tool/${tool.slug}`}
                  className="font-black text-slate-800 hover:text-green-600 transition-colors truncate block group-hover:text-green-600"
                >
                  {tool.name}
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category?.color }}
                  ></span>
                  <p className="text-xs text-slate-400 truncate font-medium">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/tool/${tool.slug}`}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-green-500 text-slate-500 hover:text-white transition-all duration-300 group-hover:shadow-lg"
                  aria-label={`Open ${tool.name}`}
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => removeTool(tool.slug)}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all duration-300"
                  aria-label={`Remove ${tool.name} from saved`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Hover Border Effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border-2"
                style={{ borderColor: category?.color }}
              ></div>
            </div>
          );
        })}
      </div>

      {savedSlugs.length > maxItems && (
        <Link
          href="/saved-tools"
          className="flex items-center justify-center gap-2 text-green-600 hover:text-green-700 font-bold py-4 px-6 bg-green-50 hover:bg-green-100 rounded-xl transition-all duration-300"
        >
          View all {savedSlugs.length} saved tools
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
