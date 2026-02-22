"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import * as Icons from "lucide-react";
import { ArrowRight, ChevronRight, Grid, Zap, Layers, Sparkles, Star } from "lucide-react";

// Dynamic icon import
const IconRenderer = dynamic(
  () => import("@/components/IconRenderer"),
  { ssr: false }
);

// Metadata for this page is handled in layout.tsx or use export const metadata in server component
// This is a client component

export default function CategoriesPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-4 pt-8 relative overflow-hidden">
      {/* Top Breadcrumbs - Absolute Top */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-slate-100">
        <div className="container px-4 py-3">
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-green-600 transition-colors flex items-center gap-1.5">
              <Icons.Home className="h-4 w-4" /> Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-900">Categories</span>
          </nav>
        </div>
      </div>

      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-purple-400/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[30%] right-[-10%] w-[400px] h-[400px] bg-green-400/10 blur-[100px] rounded-full"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="pt-8 pb-20 relative overflow-hidden">
        <div className="container px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full mb-8 border border-green-200 shadow-lg animate-fade-in-up">
            <div className="relative">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-ping"></div>
              <div className="absolute top-0 left-0 h-2.5 w-2.5 rounded-full bg-green-500"></div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-700">
              Browse Library
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight animate-fade-in-up delay-100">
            Explore <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">Categories</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium animate-fade-in-up delay-200">
            Find the perfect utility for your workflow. Browse {categories.length} categories with {tools.length}+ tools total.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-300">
            {[
              { value: categories.length, label: 'Categories', icon: Layers },
              { value: tools.length, label: 'Total Tools', icon: Grid },
              { value: 'Free', label: 'Forever', icon: Sparkles },
              { value: '24/7', label: 'Available', icon: Star },
            ].map((stat, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-10 w-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container px-4 relative z-10 mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
            <Grid className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">All Categories</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((category, index) => {
            // @ts-expect-error - Dynamic icon access
            const Icon = Icons[category.icon] || Icons.Folder;
            const categoryTools = tools.filter(t => t.category === category.id);

            return (
              <Link 
                key={category.id} 
                href={`/category/${category.slug}`}
                className="glass-card p-6 group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col items-center text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Background Accent */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 blur-3xl -z-10 opacity-0 group-hover:opacity-30 transition-all duration-500"
                  style={{ backgroundColor: category.color }}
                ></div>
                
                {/* Floating Particles */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-slate-200 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500"></div>
                
                <div className="relative mb-4">
                  {/* Icon Glow */}
                  <div 
                    className="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <div 
                    className="relative p-4 rounded-2xl text-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                    style={{ 
                      backgroundColor: category.color,
                      boxShadow: `0 10px 20px -5px ${category.color}88`
                    }}
                  >
                    <Icon className="h-7 w-7 stroke-[2.5]" />
                  </div>
                </div>
                
                <h2 className="text-lg font-black text-slate-900 leading-tight mb-1 group-hover:text-green-600 transition-colors">{category.name}</h2>
                <p className="text-[11px] font-bold text-green-600 uppercase tracking-wider mb-3">
                  {categoryTools.length} Tools
                </p>
                
                <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2 mb-4">
                  {category.description}
                </p>

                <div className="mt-auto pt-4 border-t border-black/5 w-full flex justify-center">
                  <span className="text-xs font-bold text-green-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </div>

                {/* Hover Border Effect */}
                <div 
                  className="absolute inset-0 rounded-[10px] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none border-2"
                  style={{ borderColor: category.color }}
                ></div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Popular Tools Section */}
      <div className="container px-4 relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Popular Tools</h2>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.filter(t => t.isPopular).slice(0, 8).map((tool, index) => {
            const category = categories.find(c => c.id === tool.category);
            const colorClass = getColorClass(tool.category);

            return (
              <Link
                key={tool.id}
                href={`/tool/${tool.slug}`}
                className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-white shadow-lg shadow-slate-100 border border-slate-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Background Glow */}
                <div
                  className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-15 transition-all duration-500 blur-2xl`}
                />

                {/* Content */}
                <div className="relative z-10 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      {/* Icon Glow */}
                      <div
                        className={`absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500`}
                        style={{ backgroundColor: category?.color }}
                      />
                      <div
                        className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <IconRenderer icon={tool.icon} className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    {tool.isPopular && (
                      <div className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white shadow-md">
                        <Zap className="h-3 w-3 fill-current" />
                        <span className="text-[10px] font-black">POPULAR</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 group-hover:text-slate-700 transition-colors duration-300">
                    {tool.description}
                  </p>

                  {/* Category Badge */}
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-7 px-3 rounded-full flex items-center gap-1.5 text-xs font-bold text-white"
                      style={{ backgroundColor: category?.color || '#64748B' }}
                    >
                      {category?.name || 'Tools'}
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none border-2"
                  style={{ 
                    borderColor: category?.color,
                    boxShadow: `0 0 30px ${category?.color}30`
                  }}
                ></div>

                {/* Shimmer Effect */}
                <div 
                  className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100"
                >
                  <div className="absolute -top-full left-0 w-full h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-shimmer transform -skew-x-12"></div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Tools Button */}
        <div className="text-center mt-12">
          <Link
            href="/tools"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-xl shadow-green-200 hover:shadow-2xl hover:-translate-y-1"
          >
            View All {tools.length}+ Tools
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function getColorClass(category: string): string {
  const colorMap: Record<string, string> = {
    calculators: "from-blue-500 to-cyan-500",
    converters: "from-emerald-500 to-teal-500",
    "text-tools": "from-amber-500 to-orange-500",
    "dev-tools": "from-violet-500 to-purple-500",
    "image-tools": "from-pink-500 to-rose-500",
    "pdf-tools": "from-red-500 to-orange-500",
    "security-tools": "from-indigo-500 to-blue-500",
    "web-tools": "from-sky-500 to-cyan-500",
    "seo-tools": "from-yellow-500 to-amber-500",
    "file-tools": "from-slate-500 to-gray-600",
    "business-tools": "from-emerald-600 to-green-500",
    "ai-tools": "from-purple-500 to-fuchsia-500",
    "design-tools": "from-fuchsia-500 to-pink-500",
    "social-tools": "from-blue-400 to-indigo-500",
    "productivity-tools": "from-teal-500 to-emerald-500",
  };
  return colorMap[category] || "from-slate-500 to-gray-600";
}
