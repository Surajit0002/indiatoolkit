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
  BarChart3
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
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
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
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-6">
            <Zap className="h-4 w-4" />
            ADVANCED TOOLS SUITE
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
            Next-Gen Tools for
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Modern Workflows</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
            Experience cutting-edge tools powered by AI, real-time processing, and collaborative features designed for professionals and teams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#tools" 
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <Play className="h-5 w-5" />
              Explore Tools
            </Link>
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl font-bold hover:border-slate-400 transition-all"
            >
              Try Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-black text-slate-900 mb-2">50+</div>
              <div className="text-sm text-slate-600 font-medium">Advanced Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-slate-900 mb-2">AI-Powered</div>
              <div className="text-sm text-slate-600 font-medium">Intelligent Processing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-slate-900 mb-2">Real-time</div>
              <div className="text-sm text-slate-600 font-medium">Collaboration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-slate-900 mb-2">Enterprise</div>
              <div className="text-sm text-slate-600 font-medium">Ready Solutions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div id="tools" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search advanced tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pl-4 pr-10 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all font-medium"
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
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all font-medium"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
              </select>
              <TrendingUp className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <div key={tool.id} className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden hover:border-green-300 hover:shadow-xl transition-all group">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white">
                      {tool.icon}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <Heart className="h-5 w-5 text-slate-400 hover:text-red-500" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <Share2 className="h-5 w-5 text-slate-400 hover:text-green-600" />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-900 mb-2">{tool.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{tool.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{tool.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{tool.users}+ users</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Updated {tool.updated}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Link 
                      href={`/tools/${tool.id}`}
                      className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-xl font-bold text-center hover:bg-slate-800 transition-all"
                    >
                      Try Tool
                    </Link>
                    <Link 
                      href={`/tools/${tool.id}/demo`}
                      className="px-4 py-3 bg-green-100 text-green-800 rounded-xl font-bold hover:bg-green-200 transition-all"
                    >
                      Demo
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-20">
              <Grid className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-600 mb-2">No tools found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Join thousands of professionals using our advanced tools to boost productivity and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="px-8 py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all"
            >
              Get Started Free
            </Link>
            <Link 
              href="/enterprise" 
              className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all"
            >
              Enterprise Solutions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}