'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, LucideIcon, Ruler, DollarSign, Braces, Binary, Image, FileText, Table, Palette, Thermometer, Weight, Clock, Code, FileCode, ArrowRight } from 'lucide-react';

interface QuickToolCardProps {
  name: string;
  icon: LucideIcon;
  color: string;
  slug: string;
}

function QuickToolCard({ name, icon: Icon, color, slug }: QuickToolCardProps) {
  return (
    <Link
      href={`/tool/${slug}`}
      className="flex flex-col items-center gap-2 p-3 md:p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:shadow-green-500/10 hover:border-green-200 transition-all duration-300 group"
    >
      <div 
        className="h-10 md:h-11 w-10 md:w-11 rounded-lg flex items-center justify-center text-white shadow group-hover:scale-110 transition-transform duration-300"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-xs font-semibold text-slate-600 group-hover:text-green-600 transition-colors text-center">
        {name}
      </span>
    </Link>
  );
}

export default function QuickAccessGrid() {
  const quickTools = [
    { name: 'Length', icon: Ruler, color: '#0ea5e9', slug: 'length-converter' },
    { name: 'Currency', icon: DollarSign, color: '#22c55e', slug: 'currency-converter' },
    { name: 'JSON', icon: Braces, color: '#f97316', slug: 'json-formatter' },
    { name: 'Base64', icon: Binary, color: '#8b5cf6', slug: 'base64-converter' },
    { name: 'Image', icon: Image, color: '#ec4899', slug: 'image-compressor' },
    { name: 'PDF', icon: FileText, color: '#ef4444', slug: 'pdf-to-word' },
    { name: 'CSV', icon: Table, color: '#10b981', slug: 'csv-to-excel' },
    { name: 'Color', icon: Palette, color: '#6366f1', slug: 'color-converter' },
    { name: 'Temperature', icon: Thermometer, color: '#f59e0b', slug: 'temperature-converter' },
    { name: 'Weight', icon: Weight, color: '#14b8a6', slug: 'weight-converter' },
    { name: 'Time Zone', icon: Clock, color: '#8b5cf6', slug: 'timezone-converter' },
    { name: 'Number Base', icon: Binary, color: '#ec4899', slug: 'base-converter' },
    { name: 'Markdown', icon: FileCode, color: '#06b6d4', slug: 'markdown-previewer' },
    { name: 'HTML', icon: Code, color: '#f97316', slug: 'html-formatter' },
    { name: 'XML', icon: Braces, color: '#84cc16', slug: 'xml-formatter' },
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="container px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Lightning Fast</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Quick Converters</h2>
            <p className="text-slate-500 font-medium">Instant conversions for everyday needs</p>
          </div>
        </div>

        {/* Quick Access Grid - Fully Responsive */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
          {quickTools.map((tool) => (
            <QuickToolCard key={tool.name} {...tool} />
          ))}
          
          {/* More Link */}
          <Link
            href="/category/converters"
            className="flex flex-col items-center gap-2 p-3 md:p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 group"
          >
            <div className="h-10 md:h-11 w-10 md:w-11 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors text-center">
              More →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
