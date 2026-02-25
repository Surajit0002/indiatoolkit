'use client';

import React from 'react';
import Link from 'next/link';
import { Terminal, LucideIcon, ArrowRight, Braces, Binary, Table, ArrowRightLeft, Code, FileCode, Database, Key, Globe, GitCompare } from 'lucide-react';

interface DevToolCardProps {
  name: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  slug: string;
  popular?: boolean;
}

function DevToolCard({ name, desc, icon: Icon, color, slug, popular }: DevToolCardProps) {
  return (
    <Link
      href={`/tool/${slug}`}
      className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-white hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group"
    >
      <div 
        className="h-11 md:h-12 w-11 md:w-12 rounded-lg flex items-center justify-center text-white shadow group-hover:scale-105 transition-transform shrink-0"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          {popular && (
            <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 text-[9px] font-bold rounded uppercase">
              Hot
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{desc}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 transition-colors mt-1 shrink-0" />
    </Link>
  );
}

export default function DeveloperToolsSection() {
  const devTools = [
    { name: 'JSON Formatter', desc: 'Format, validate & beautify JSON', icon: Braces, color: '#f97316', slug: 'json-formatter', popular: true },
    { name: 'Base64 Converter', desc: 'Encode & decode Base64 strings', icon: Binary, color: '#8b5cf6', slug: 'base64-converter' },
    { name: 'JSON to CSV', desc: 'Convert JSON data to CSV format', icon: Table, color: '#22c55e', slug: 'json-to-csv' },
    { name: 'CSV to JSON', desc: 'Convert CSV to JSON instantly', icon: ArrowRightLeft, color: '#3b82f6', slug: 'csv-to-json' },
    { name: 'HTML Formatter', desc: 'Format & minify HTML code', icon: Code, color: '#f97316', slug: 'html-formatter' },
    { name: 'CSS Formatter', desc: 'Format & beautify CSS styles', icon: FileCode, color: '#06b6d4', slug: 'css-formatter' },
    { name: 'JavaScript Formatter', desc: 'Format JavaScript code', icon: Terminal, color: '#f59e0b', slug: 'javascript-formatter' },
    { name: 'SQL Formatter', desc: 'Format SQL queries', icon: Database, color: '#14b8a6', slug: 'sql-formatter' },
    { name: 'JWT Decoder', desc: 'Decode JWT tokens', icon: Key, color: '#8b5cf6', slug: 'jwt-decoder' },
    { name: 'URL Encoder', desc: 'Encode URL components', icon: Globe, color: '#3b82f6', slug: 'url-encoder' },
    { name: 'Markdown Preview', desc: 'Live markdown preview', icon: FileCode, color: '#6366f1', slug: 'markdown-previewer' },
    { name: 'Diff Checker', desc: 'Compare text differences', icon: GitCompare, color: '#ec4899', slug: 'diff-checker' }
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-y border-slate-100">
      <div className="container px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-5 md:mb-6">
            <Terminal className="h-4 w-4 text-slate-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
              Built for Developers
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-3 md:mb-4">
            Developer <span className="text-blue-600">Utilities</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Essential tools for developers, programmers, and engineers
          </p>
        </div>

        {/* Developer Tools Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {devTools.map((tool) => (
            <DevToolCard key={tool.name} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
