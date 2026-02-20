"use client";

import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { Tool } from "@/types/tool";
import * as Icons from "lucide-react";

interface RelatedToolsProps {
  currentToolId: string;
  category: string;
  tags?: string[];
  limit?: number;
}

/**
 * RelatedTools Component
 * Displays related tools based on category and tags for internal linking
 * Helps with SEO by creating contextual internal links
 */
export function RelatedTools({

  category,

  limit = 6,
}: RelatedToolsProps) {
  // This would typically fetch from an API or use a context
  // For now, we'll use a placeholder that can be enhanced later
  const relatedTools: Tool[] = [];

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Related Tools</h2>
        <Link
          href={`/category/${category}`}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          View all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedTools.slice(0, limit).map((tool) => {
          // @ts-expect-error - Dynamic icon access
          const ToolIcon = Icons[tool.icon] || Icons.Wrench;

          return (
            <Link
              key={tool.id}
              href={`/tool/${tool.slug}`}
              className="group p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <ToolIcon className="h-5 w-5 text-slate-600 group-hover:text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 truncate">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mt-1">
                    {tool.description}
                  </p>
                </div>
              </div>

              {tool.isPopular && (
                <div className="flex items-center gap-1 mt-3 text-xs text-amber-600">
                  <Star className="h-3 w-3 fill-current" />
                  <span>Popular</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/**
 * ToolCardMini - A smaller card for related tools
 */
export function ToolCardMini({ tool }: { tool: Tool }) {
  // @ts-expect-error - Dynamic icon access
  const ToolIcon = Icons[tool.icon] || Icons.Wrench;

  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="group flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <div className="p-1.5 bg-slate-100 rounded-md group-hover:bg-blue-50 transition-colors">
        <ToolIcon className="h-4 w-4 text-slate-600 group-hover:text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-slate-900 group-hover:text-blue-600 truncate text-sm">
          {tool.name}
        </h4>
      </div>
      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
    </Link>
  );
}
