'use client';
import React from 'react';
import { BookOpen, Search, Grid, List, Code, Shield, Zap, Flame, ThumbsUp, GraduationCap, Wrench, FileCode, AlertTriangle, Rocket } from 'lucide-react';

export default function DocumentationPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('getting-started');
  const [viewMode, setViewMode] = React.useState('grid');

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: BookOpen, color: 'from-blue-500 to-cyan-600' },
    { id: 'api-reference', name: 'API Reference', icon: Code, color: 'from-green-500 to-teal-600' },
    { id: 'tutorials', name: 'Tutorials', icon: GraduationCap, color: 'from-purple-500 to-indigo-600' },
    { id: 'guides', name: 'Guides', icon: Flame, color: 'from-pink-500 to-rose-600' },
    { id: 'examples', name: 'Examples', icon: FileCode, color: 'from-orange-500 to-red-600' },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: Wrench, color: 'from-emerald-500 to-teal-600' },
  ];

  const articles = [
    { id: 1, title: 'Introduction to Our Platform', description: 'Learn the basics of getting started with our tools', category: 'getting-started', icon: BookOpen, readTime: '5 min', likes: 124 },
    { id: 2, title: 'API Authentication Guide', description: 'Securely authenticate your API requests', category: 'api-reference', icon: Shield, readTime: '8 min', likes: 89 },
    { id: 3, title: 'Building Your First Tool', description: 'Step-by-step tutorial for beginners', category: 'tutorials', icon: Rocket, readTime: '12 min', likes: 156 },
    { id: 4, title: 'Advanced Configuration', description: 'Deep dive into advanced settings', category: 'guides', icon: Zap, readTime: '15 min', likes: 78 },
    { id: 5, title: 'Real-world Examples', description: 'Practical examples and use cases', category: 'examples', icon: Code, readTime: '10 min', likes: 203 },
    { id: 6, title: 'Common Issues & Solutions', description: 'Troubleshoot common problems', category: 'troubleshooting', icon: AlertTriangle, readTime: '7 min', likes: 145 },
    { id: 7, title: 'Performance Optimization', description: 'Tips for optimal performance', category: 'guides', icon: Zap, readTime: '9 min', likes: 112 },
    { id: 8, title: 'Security Best Practices', description: 'Keep your applications secure', category: 'guides', icon: Shield, readTime: '11 min', likes: 98 },
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-8">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Documentation Center
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Comprehensive guides, tutorials, and API references to help you get the most out of our platform
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'bg-white text-slate-600'} transition-colors`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'bg-white text-slate-600'} transition-colors`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeCategory === 'all' 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'bg-white text-slate-600 hover:bg-purple-50 border border-slate-200'
            }`}
          >
            All
          </button>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  activeCategory === category.id 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'bg-white text-slate-600 hover:bg-purple-50 border border-slate-200'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Articles Grid */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "flex flex-col gap-4"
        }>
          {filteredArticles.map((article) => {
            const IconComponent = article.icon;
            return (
              <div 
                key={article.id} 
                className={viewMode === 'grid' 
                  ? "bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all h-full" 
                  : "bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all flex items-start gap-4"
                }
              >
                <div className={viewMode === 'grid' ? "flex items-start gap-4" : ""}>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                        {articles.find(a => a.id === article.id)?.category.replace('-', ' ')}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">{article.readTime}</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2">{article.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-slate-500 text-xs">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{article.likes}</span>
                      </div>
                      <button className="text-purple-600 hover:text-purple-700 font-bold text-sm flex items-center gap-1">
                        Read Article
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No articles found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}