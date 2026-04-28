'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Tool } from '@/types/tool';
import { getPopularToolsByUsage } from '@/lib/utils';

export default function MostPopularTools() {
  const popularTools: Tool[] = getPopularToolsByUsage(6).filter(Boolean) as Tool[];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-indigo-50 to-purple-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <span className="text-sm font-bold text-white">🔥 TRENDING NOW</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-3 tracking-tight">
            Most Popular Tools
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join millions of users who trust these tools every day. Fast, free, and no signup required.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {popularTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tool/${tool.slug}`}
              className="group block bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Tool Icon */}
              <div 
                className="h-12 w-12 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform"
                style={{ backgroundColor: tool.accentColor || tool.backgroundColor || '#4f46e5' }}
                dangerouslySetInnerHTML={{
                  __html: tool.svgIcon?.replace('<svg', `<svg fill="white" class="h-6 w-6 stroke-[2.5]`).replace('"#000000"', '"white"') || 
                         `<svg fill="none" class="h-6 w-6" viewBox="0 0 24 24"><circle fill="white" cx="12" cy="12" r="10"/></svg>`
                }}
              />

              {/* Tool Name */}
              <h3 className="font-bold text-slate-900 text-sm text-center mb-2 leading-tight line-clamp-2">
                {tool.name}
              </h3>

              {/* Usage Counter */}
              <div className="text-center mb-2">
                <span className="text-xs text-slate-400">Used by</span>
                <span className="block font-black text-slate-900 text-lg">
                  {(tool.usageCount || 0).toLocaleString()}
                  <span className="text-xs text-slate-500">+</span>
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">users today</span>
              </div>

              {/* Category Tag */}
              <div className="text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 bg-slate-50 rounded-full">
                  {tool.category}
                </span>
              </div>

              {/* CTA */}
              <div className="mt-3 text-center">
                <span className="text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors flex items-center justify-center gap-1">
                  Use Now <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Browse All 1000+ Tools
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
