'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Grid, LucideIcon, PenTool, Palette, Sparkles, Text, Layout, Brain, Image, Briefcase, Square, Video } from 'lucide-react';

interface DesignCategoryCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  slug: string;
  toolCount: number;
}

function DesignCategoryCard({ name, description, icon: Icon, color, slug, toolCount }: DesignCategoryCardProps) {
  return (
    <Link
      href={`/category/${slug}`}
      className="group relative p-5 md:p-6 bg-white rounded-2xl border border-purple-100 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-200 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Tool Count Badge */}
      <div className="absolute top-4 right-4 px-2.5 py-1 bg-purple-100 text-purple-600 text-xs font-bold rounded-full">
        {toolCount} tools
      </div>

      <div className="flex items-start gap-4 relative z-10">
        <div 
          className="h-12 md:h-14 w-12 md:w-14 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
          style={{ backgroundColor: color }}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-1">
            {name}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      
      <div className="mt-5 flex items-center justify-between relative z-10">
        <span className="text-sm font-semibold text-purple-600 flex items-center gap-1">
          Explore <ChevronRight className="h-4 w-4" />
        </span>
        <div className="h-9 w-9 bg-purple-50 rounded-lg flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

export default function DesignToolsSection() {
  const designCategories = [
    { name: 'Graphic Design', description: 'Banners, logos, posters & visual assets', icon: Palette, color: '#8b5cf6', slug: 'graphic-design', toolCount: 15 },
    { name: 'Color Tools', description: 'Palettes, harmonies & accessibility', icon: Sparkles, color: '#ec4899', slug: 'color-tools', toolCount: 10 },
    { name: 'Text & Fonts', description: 'Typography & font pairing tools', icon: Text, color: '#f97316', slug: 'text-font-design', toolCount: 10 },
    { name: 'Layout & UI/UX', description: 'Wireframes & interface design', icon: Layout, color: '#06b6d4', slug: 'layout-ui-ux', toolCount: 10 },
    { name: 'AI Design', description: 'AI-powered creative tools', icon: Brain, color: '#a855f7', slug: 'ai-design', toolCount: 10 },
    { name: 'Image Editing', description: 'Enhance & transform images', icon: Image, color: '#22c55e', slug: 'image-editing', toolCount: 10 },
    { name: 'Brand & Marketing', description: 'Business cards & brand assets', icon: Briefcase, color: '#f59e0b', slug: 'brand-marketing-design', toolCount: 10 },
    { name: 'Icon & Shapes', description: 'Icons & vector shapes', icon: Square, color: '#3b82f6', slug: 'icon-shape-tools', toolCount: 8 },
    { name: 'Motion & Media', description: 'Animation & video tools', icon: Video, color: '#ef4444', slug: 'motion-media-design', toolCount: 7 },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background Effects - Animated */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-400/10 rounded-full blur-[80px] md:blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-400/10 rounded-full blur-[80px] md:blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-5 md:mb-6 border border-purple-200 shadow-sm">
            <PenTool className="h-4 w-4 text-purple-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-600">
              Creative Suite
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-3 md:mb-4">
            Design <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent">Tools</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Professional design tools for creators, designers & brand builders
          </p>
        </div>

        {/* Design Tools Categories Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {designCategories.map((category, i) => (
            <DesignCategoryCard key={i} {...category} />
          ))}
        </div>

        {/* View All Design Tools Link */}
        <div className="text-center mt-10">
          <Link 
            href="/category/design-tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
          >
            <Grid className="h-5 w-5" />
            View All Design Tools
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
