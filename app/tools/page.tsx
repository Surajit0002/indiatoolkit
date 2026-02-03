'use client';

import React from 'react';
import { Calculator, Globe, Currency, Timer, Scale, Database, PieChart, FileText, Image, Code, Calendar, Music, Map, Search, Filter, Grid, List } from 'lucide-react';
import Link from 'next/link';

const toolsData = [
  { id: 1, icon: Calculator, title: "Basic Calculator", description: "Simple arithmetic operations and calculations", slug: "basic-calculator", category: "Math", color: "from-blue-500 to-cyan-600" },
  { id: 2, icon: Globe, title: "Currency Converter", description: "Real-time currency exchange rates and conversion", slug: "currency-converter", category: "Finance", color: "from-green-500 to-teal-600" },
  { id: 3, icon: Timer, title: "Time Zone Converter", description: "Convert time between different time zones globally", slug: "time-zone-converter", category: "Time", color: "from-purple-500 to-indigo-600" },
  { id: 4, icon: Scale, title: "Unit Converter", description: "Convert between various measurement units", slug: "unit-converter", category: "Measurement", color: "from-pink-500 to-rose-600" },
  { id: 5, icon: Database, title: "Data Size Converter", description: "Convert between bytes, KB, MB, GB, and TB", slug: "data-size-converter", category: "Technology", color: "from-orange-500 to-red-600" },
  { id: 6, icon: PieChart, title: "Percentage Calculator", description: "Calculate percentages, increases, and decreases", slug: "percentage-calculator", category: "Math", color: "from-emerald-500 to-teal-600" },
  { id: 7, icon: FileText, title: "Word Counter", description: "Count words, characters, and sentences in text", slug: "word-counter", category: "Text", color: "from-violet-500 to-purple-600" },
  { id: 8, icon: Image, title: "Image Resizer", description: "Resize and compress images for web optimization", slug: "image-resizer", category: "Media", color: "from-amber-500 to-orange-600" },
  { id: 9, icon: Code, title: "JSON Formatter", description: "Format and validate JSON data structures", slug: "json-formatter", category: "Development", color: "from-sky-500 to-blue-600" },
  { id: 10, icon: Calendar, title: "Age Calculator", description: "Calculate exact age and time differences", slug: "age-calculator", category: "Time", color: "from-rose-500 to-pink-600" },
  { id: 11, icon: Music, title: "BPM Calculator", description: "Calculate beats per minute for music and audio", slug: "bpm-calculator", category: "Audio", color: "from-indigo-500 to-purple-600" },
  { id: 12, icon: Map, title: "Distance Calculator", description: "Calculate distances between locations and coordinates", slug: "distance-calculator", category: "Geography", color: "from-teal-500 to-emerald-600" },
];

export default function ToolsPage() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = ['All', ...new Set(toolsData.map(tool => tool.category))];
  const filteredTools = toolsData.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-green-50 tools-platform">
      {/* Hero Section */}
      <section className="hero py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-8 shadow-xl">
              <Calculator className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              INDIA'S TOOLKIT
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Professional tools and utilities for every Indian professional. Fast, secure, and completely free to use.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { value: "100+", label: "Indian Tools" },
                { value: "500K+", label: "Monthly Users" },
                { value: "24/7", label: "Availability" },
                { value: "100%", label: "Free Forever" }
              ].map((stat, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
                  <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-sm font-bold text-slate-600 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="tools-section py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Filters and Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <div className="flex border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'bg-white text-slate-600'} transition-colors`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-green-500 text-white' : 'bg-white text-slate-600'} transition-colors`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "flex flex-col gap-4"
          }>
            {filteredTools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link 
                  key={tool.id} 
                  href={`/tool/${tool.slug}`}
                  className={viewMode === 'grid' 
                    ? "block group" 
                    : "flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
                  }
                >
                  <div className={viewMode === 'grid' 
                    ? "bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 h-full" 
                    : "flex items-center gap-4"
                  }>
                    <div className={viewMode === 'grid' 
                      ? "flex items-start gap-4" 
                      : "flex items-center gap-4 w-full"
                    }>
                      <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                      <div className={viewMode === 'grid' 
                        ? "flex-1 min-w-0" 
                        : "flex-1"
                      }>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                          {tool.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                          {tool.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 text-xs font-bold rounded-lg">
                            {tool.category}
                          </span>
                          <div className="text-green-600 group-hover:translate-x-1 transition-transform">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300">
              Load More Tools
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}