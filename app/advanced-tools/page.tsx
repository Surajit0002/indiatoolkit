"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  Grid, 
  Zap, 
  Star, 
  Users, 
  TrendingUp, 
  Filter,
  ChevronDown,
  Play,
  Share2,
  Heart,
  Clock,
  BarChart3,
  Sparkles,
  ArrowRight,
  Crown,
  Target,
  Lightbulb,
} from "lucide-react";
import { advancedTools } from "../../data/advancedTools";
import { categories } from "../../data/categories";
import Header from "../../components/Header";

export default function AdvancedToolsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");

  const filteredTools = advancedTools
    .filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return (b.popularity || 0) - (a.popularity || 0);
        case "newest":
          return new Date(b.lastUpdated || '').getTime() - new Date(a.lastUpdated || '').getTime();
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-[100px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-[80px] animate-pulse delay-2000" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full mb-8 border border-green-200 shadow-lg animate-fade-in-up">
            <div className="relative">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-ping"></div>
              <div className="absolute top-0 left-0 h-2.5 w-2.5 rounded-full bg-green-500"></div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-700">
              Advanced Suite
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight animate-fade-in-up delay-100">
            Next-Gen Tools for
            <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent"> Modern Workflows</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-12 font-medium animate-fade-in-up delay-200">
            Experience cutting-edge tools powered by AI, real-time processing, and collaborative features designed for professionals and teams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Link 
              href="#tools" 
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 shadow-lg"
            >
              <Play className="h-5 w-5" />
              Explore Tools
            </Link>
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl font-bold hover:border-green-400 hover:bg-green-50 transition-all flex items-center gap-2"
            >
              <Crown className="h-5 w-5" />
              Try Dashboard
            </Link>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in-up delay-400">
            {[
              { value: '50+', label: 'Advanced Tools', icon: Target },
              { value: 'AI', label: 'Powered', icon: Sparkles },
              { value: 'Real', label: 'Time', icon: Clock },
              { value: '24/7', label: 'Available', icon: Lightbulb },
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm">
                <stat.icon className="h-5 w-5 text-green-500" />
                <span className="text-lg font-black text-slate-800">{stat.value}</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div id="tools" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-12">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search advanced tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all font-medium shadow-sm hover:shadow-md"
              />
            </div>

            {/* Category Filter */}
            <div className="relative min-w-[200px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none w-full pl-4 pr-10 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all font-medium shadow-sm hover:shadow-md cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
                <option value="ai-ml">AI & Machine Learning</option>
                <option value="data-science">Data Science</option>
                <option value="enterprise">Enterprise</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative min-w-[180px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full pl-4 pr-10 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all font-medium shadow-sm hover:shadow-md cursor-pointer"
              >
                <option value="popular">🔥 Most Popular</option>
                <option value="newest">✨ Newest First</option>
                <option value="rating">⭐ Highest Rated</option>
              </select>
              <TrendingUp className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Tools Grid */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <div 
                  key={tool.id} 
                  className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:border-green-200 hover:shadow-2xl transition-all duration-500 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Background Glow */}
                  <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl"></div>
                  
                  <div className="p-6 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="relative">
                        {/* Icon Glow */}
                        <div className="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500 bg-gradient-to-br from-green-500 to-emerald-500"></div>
                        <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3">
                          {tool.icon}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors">
                          <Heart className="h-5 w-5 text-slate-400 hover:text-red-500 transition-colors" />
                        </button>
                        <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors">
                          <Share2 className="h-5 w-5 text-slate-400 hover:text-green-600 transition-colors" />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-green-600 transition-colors">{tool.name}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 font-medium">{tool.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-slate-700">{tool.rating || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span className="font-medium text-slate-500">{tool.usageCount.toLocaleString()}+</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold hover:bg-slate-200 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <Link 
                        href={`/tools/${tool.id}`}
                        className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-xl font-bold text-center hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        Try Tool
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link 
                        href={`/tools/${tool.id}/demo`}
                        className="px-4 py-3 bg-green-100 text-green-700 rounded-xl font-bold hover:bg-green-200 transition-all duration-300"
                      >
                        Demo
                      </Link>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none border-2 border-green-400/30"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-slate-700 mb-3">No Tools Found</h3>
              <p className="text-slate-500 font-medium mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <div className="h-20 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30">
            <Crown className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-lg text-slate-300 mb-10 font-medium max-w-2xl mx-auto">
            Join thousands of professionals using our advanced tools to boost productivity and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all hover:shadow-xl hover:-translate-y-1 shadow-lg shadow-green-500/30 flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/enterprise" 
              className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all hover:shadow-xl flex items-center gap-2"
            >
              <Crown className="h-5 w-5" />
              Enterprise Solutions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
