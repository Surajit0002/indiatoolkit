import React from "react";
import Link from "next/link";
import { ArrowRight, Zap, Star, Users, TrendingUp, Code, Brain, Database, Shield } from "lucide-react";
import { advancedTools } from "../../data/advancedTools";

export default function ToolsShowcasePage() {
  const featuredTools = advancedTools.slice(0, 12);
  const categories = [
    { name: "AI & Machine Learning", icon: Brain, count: 15, color: "bg-purple-500" },
    { name: "Data Science", icon: Database, count: 12, color: "bg-blue-500" },
    { name: "Developer Tools", icon: Code, count: 18, color: "bg-green-500" },
    { name: "Business Intelligence", icon: TrendingUp, count: 9, color: "bg-orange-500" },
    { name: "Security & Compliance", icon: Shield, count: 7, color: "bg-red-500" },
    { name: "Collaboration", icon: Users, count: 11, color: "bg-indigo-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-6">
              <Zap className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-bold text-purple-300 uppercase tracking-widest">Advanced Tools Suite</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Professional Tools for
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Modern Workflows</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
              Enterprise-grade tools with AI-powered features, real-time collaboration, and advanced analytics. 
              Built for developers, data scientists, and business professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/advanced-tools" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
              >
                Explore All Tools
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                href="/dashboard" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
              >
                <Star className="h-5 w-5" />
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4">Tool Categories</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive toolsets organized by professional domains and use cases
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-purple-300 transition-all hover:shadow-lg group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`${category.color} p-3 rounded-xl text-white`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{category.name}</h3>
                    <p className="text-sm text-slate-500">{category.count} tools available</p>
                  </div>
                </div>
                <Link 
                  href={`/category/${category.name.toLowerCase().replace(/ /g, '-')}`}
                  className="inline-flex items-center gap-2 text-purple-600 font-bold text-sm group-hover:gap-3 transition-all"
                >
                  Explore tools
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Featured Tools */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">Featured Tools</h2>
              <p className="text-lg text-slate-600">Most popular and powerful tools in our ecosystem</p>
            </div>
            <Link 
              href="/advanced-tools" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <div 
                key={tool.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: tool.color }}
                    >
                      {tool.icon}
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                        {tool.category}
                      </span>
                      {tool.isNew && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">
                          NEW
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm">{tool.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{tool.rating}</span>
                      </div>
                      <span>{tool.usageCount}+ users</span>
                    </div>
                    <Link 
                      href={`/tools/${tool.id}`}
                      className="px-4 py-2 bg-purple-600 text-white font-bold text-sm rounded-lg hover:bg-purple-700 transition-all"
                    >
                      Try Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Highlights */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-purple-100">Real-time processing with sub-second response times</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
              <p className="text-purple-100">Intelligent recommendations and automated workflows</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Collaborative</h3>
              <p className="text-purple-100">Real-time sharing and team collaboration features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}