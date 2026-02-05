"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { getAllTools, getAllCategories } from "@/lib/utils";

// Dynamic icon import to avoid issues
const IconRenderer = dynamic(
  () => import("@/components/IconRenderer"),
  { ssr: false }
);

import {
  Search,
  Grid,
  List,
  Star,
  ArrowRight,
  Zap,
  Crown,
  ArrowUpRight,
  X,
  Sparkles,
  TrendingUp,
  Clock,
  Filter,
} from "lucide-react";

// Helper for layers icon
function Layers({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

function ToolsContent() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || "";
  
  const allTools = getAllTools();
  const categories = getAllCategories();
  const [searchTerm, setSearchTerm] = useState(urlQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "popular" | "newest">("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Color palette for categories
  const categoryColors: Record<string, string> = {
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

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let tools = [...allTools];

    // Filter by search
    if (searchTerm) {
      tools = tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          categories.find((c) => c.slug === tool.category)?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      tools = tools.filter((tool) => tool.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case "name":
        tools.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "popular":
        tools.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
      case "newest":
        tools.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }

    return tools;
  }, [allTools, searchTerm, selectedCategory, sortBy]);

  // Get category info
  const getCategoryInfo = (categorySlug: string) => {
    return categories.find((c) => c.slug === categorySlug);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-125 h-125 bg-linear-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-linear-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-[100px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-100 h-100 bg-linear-to-r from-pink-400/20 to-rose-400/20 rounded-full blur-[80px] animate-pulse delay-2000" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full mb-8 border border-green-200 shadow-lg animate-fade-in-up">
              <div className="relative">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-ping"></div>
                <div className="absolute top-0 left-0 h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-700">
                {allTools.length}+ Professional Tools
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight animate-fade-in-up delay-100">
              {urlQuery ? (
                <>
                  <span className="text-slate-900">Search Results for </span>
                  <span className="bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    "{urlQuery}"
                  </span>
                </>
              ) : (
                <>
                  <span className="text-slate-900">Explore All </span>
                  <span className="bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    Tools
                  </span>
                </>
              )}
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium animate-fade-in-up delay-200">
              {urlQuery 
                ? `Found ${filteredTools.length} tools matching "${urlQuery}"`
                : `Discover ${allTools.length}+ professional tools across ${categories.length} categories. Boost your productivity with our free online toolkit.`
              }
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-10 animate-fade-in-up delay-300">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search tools by name, category, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-14 pl-12 pr-12 bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-4 flex items-center p-1 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                </button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-400">
              {[
                { value: allTools.length, label: "Total Tools", icon: Grid },
                { value: categories.length, label: "Categories", icon: Layers },
                { value: allTools.filter((t) => t.isPopular).length, label: "Popular", icon: TrendingUp },
                { value: allTools.filter((t) => t.isNew).length, label: "New Tools", icon: Sparkles },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-10 w-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="py-6 px-4 sticky top-16 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                selectedCategory === "all"
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Filter className="h-3.5 w-3.5" />
              All
            </button>
            {categories.map((category) => {
              const isSelected = selectedCategory === category.slug;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                      isSelected ? "text-white shadow-lg" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  style={isSelected ? { background: category.color } : undefined}
                >
                  <IconRenderer icon={category.icon} className="h-3.5 w-3.5" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">Showing</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                {filteredTools.length}
              </span>
              <span className="text-sm text-slate-500">tools</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer hover:border-green-300 transition-colors"
              >
                <option value="popular">🔥 Most Popular</option>
                <option value="name">📝 Name (A-Z)</option>
                <option value="newest">✨ Newest First</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 transition-all ${
                    viewMode === "grid" 
                      ? "bg-green-500 text-white shadow-md" 
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                  title="Grid View"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 transition-all ${
                    viewMode === "list" 
                      ? "bg-green-500 text-white shadow-md" 
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                  title="List View"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          {filteredTools.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {filteredTools.map((tool, index) => {
                const category = getCategoryInfo(tool.category);
                const colorClass = categoryColors[tool.category] || "from-slate-500 to-gray-600";

                return (
                  <Link
                    key={tool.id}
                    href={`/tool/${tool.slug}`}
                    className={`
                      group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
                      ${
                        viewMode === "grid"
                          ? "bg-white shadow-lg shadow-slate-100 border border-slate-100"
                          : "flex items-center gap-4 bg-white p-5 shadow-md border border-slate-100"
                      }
                      animate-fade-in-up
                    `}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Background Glow */}
                    <div
                      className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-linear-to-br ${colorClass} opacity-0 group-hover:opacity-15 transition-all duration-500 blur-2xl`}
                    />

                    {/* Floating Particles */}
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-slate-200 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500"></div>
                    <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-slate-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 delay-100"></div>

                    {/* Content */}
                    <div className="relative z-10 w-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="relative">
                          {/* Icon Glow */}
                          <div
                            className={`absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500`}
                            style={{ backgroundColor: category?.color }}
                          />
                          <div
                            className={`relative w-12 h-12 rounded-xl bg-linear-to-br ${colorClass} flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                          >
                            <IconRenderer icon={tool.icon} className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {tool.isPopular && (
                            <div className="flex items-center gap-1 px-2.5 py-1 bg-linear-to-r from-amber-400 to-orange-500 rounded-full text-white shadow-md">
                              <Zap className="h-3 w-3 fill-current" />
                              <span className="text-[10px] font-black">POPULAR</span>
                            </div>
                          )}
                          {tool.isNew && (
                            <div className="flex items-center gap-1 px-2.5 py-1 bg-linear-to-r from-green-500 to-emerald-500 rounded-full text-white shadow-md">
                              <Sparkles className="h-3 w-3 fill-current" />
                              <span className="text-[10px] font-black">NEW</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2 mb-4 group-hover:text-slate-700 transition-colors duration-300">
                        {tool.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                          style={{
                            backgroundColor: `${category?.color}15`,
                            color: category?.color,
                          }}
                        >
                          <IconRenderer icon={category?.icon || "Folder"} className="h-3.5 w-3.5" />
                          {category?.name}
                        </span>
                        <div className="h-9 w-9 bg-linear-to-r from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-slate-400 group-hover:from-green-500 group-hover:to-emerald-500 group-hover:text-white transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:scale-110">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    {/* Hover Border Effect */}
                    <div 
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none border-2"
                      style={{ 
                        borderColor: category?.color,
                        boxShadow: `0 0 30px ${category?.color}30, inset 0 0 30px ${category?.color}10`
                      }}
                    />

                    {/* Shimmer Effect */}
                    <div 
                      className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100"
                    >
                      <div className="absolute -top-full left-0 w-full h-full bg-linear-to-b from-transparent via-white/20 to-transparent animate-shimmer transform -skew-x-12"></div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 px-8 bg-white rounded-3xl border border-slate-100 shadow-lg">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in">
                <Search className="h-12 w-12 text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-slate-700 mb-3 animate-fade-in-up delay-100">No Tools Found</h3>
              <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto animate-fade-in-up delay-200">
                We couldn't find any tools matching your search. Try different keywords or browse all categories.
              </p>
              <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-300">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all duration-300 shadow-lg shadow-green-200 hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
                >
                  <X className="h-5 w-5" />
                  Clear Filters
                </button>
                <Link
                  href="/tools"
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all duration-300 flex items-center gap-2"
                >
                  <Grid className="h-5 w-5" />
                  Browse All Tools
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-linear-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
              
              {/* Pattern */}
              <div className="absolute inset-0 opacity-10" 
                style={{ 
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }}
              />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-8 shadow-xl">
                <Crown className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
                Need a Custom Tool?
              </h2>
              <p className="text-lg text-green-100 mb-10 max-w-xl mx-auto font-medium">
                We're constantly adding new tools to help you work smarter. Have a suggestion? Let us know and we'll build it for you!
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-2xl font-bold hover:bg-green-50 transition-all duration-300 shadow-2xl hover:shadow-xl hover:-translate-y-1"
              >
                Request a Tool
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AllToolsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading tools...</p>
        </div>
      </div>
    }>
      <ToolsContent />
    </Suspense>
  );
}
