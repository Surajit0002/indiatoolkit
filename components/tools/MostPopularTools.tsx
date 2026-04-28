import React from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Tool } from '@/types/tool';
import TrendingBadge from './TrendingBadge';

interface MostPopularToolsProps {
  tools: Tool[];
  onToolClick?: (tool: Tool) => void;
}

export default function MostPopularTools({ tools, onToolClick }: MostPopularToolsProps) {
  const popularTools = tools
    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
    .slice(0, 6);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-full border border-yellow-100 mb-4">
            <TrendingUp className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-700">Most Popular Tools</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
            Tools Loved by Millions
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover our most frequently used tools. Join thousands of users who trust these tools daily.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {popularTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tool/${tool.slug}`}
              onClick={() => onToolClick?.(tool)}
              className="group block"
            >
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                {/* Tool Icon */}
                <div 
                  className="h-12 w-12 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: tool.accentColor || tool.backgroundColor || '#4f46e5' }}
                  dangerouslySetInnerHTML={{
                    __html: tool.svgIcon?.replace('<svg', `<svg fill="white" class="h-6 w-6 stroke-[2.5]`).replace('"#000000"', '"currentColor"') || 
                           `<svg fill="none" class="h-6 w-6 stroke-[2.5]" viewBox="0 0 24 24"><path stroke="white" stroke-width="2" d="M12 6v6l4 2"/></svg>`
                  }}
                />

                {/* Tool Name */}
                <h3 className="font-bold text-slate-900 text-sm text-center mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                  {tool.name}
                </h3>

                {/* Trending Badge */}
                <div className="flex justify-center mb-3">
                  <TrendingBadge usageCount={tool.usageCount} />
                </div>

                {/* Usage Counter */}
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-1">Used by</div>
                  <div className="font-black text-slate-900 text-lg">
                    {(tool.usageCount || 0).toLocaleString()}
                    <span className="text-xs text-slate-500">+</span>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-1">
                    users today
                  </div>
                </div>

                {/* Category Tag */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 bg-slate-50 rounded-full">
                    {tool.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Browse All Tools
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
