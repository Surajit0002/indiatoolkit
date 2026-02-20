"use client";

import Link from "next/link";
import { Search, Menu, User, X, ChevronDown, Zap, Star, Settings, LogOut, ArrowRight, ChevronRight,  FileText, Brain, TrendingUp,  ArrowUpRight, Grid, Calculator, Image, FileText as FileTextIcon, Code,  Globe, Search as SearchIcon, Database as DbIcon, Sparkles as SparklesIcon, Palette } from "lucide-react";
import * as Icons from "lucide-react";
import React, { useState, useEffect } from "react";
import GlobalSearch from "./GlobalSearch";
import { categories } from "../data/categories";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get category icon component
  const getCategoryIcon = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      'Zap': Zap,
      'Calculator': Calculator,
      'Code': Code,
      'FileText': FileTextIcon,
      'Globe': Globe,
      'Database': DbIcon,
      'Brain': Brain,
      'Palette': Palette,
      'Image': Image,
    };
    return iconMap[iconName] || Grid;
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 py-2 sm:py-4 pointer-events-none"
      role="banner"
    >
      <div className="max-w-8xl mx-auto flex justify-center">
        <nav 
          className={`
            pointer-events-auto
            relative flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 md:px-6 h-12 sm:h-14 md:h-16 
            rounded-xl sm:rounded-2xl transition-all duration-500 border
            ${isScrolled 
              ? "w-full bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)]" 
              : "w-full md:w-[95%] bg-black backdrop-blur-md border-blue-800 shadow-2xl"
            }
          `}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Brand */}
          <Link 
            href="/" 
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
            aria-label="India Toolkit - Home"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-blue-500 rounded-lg blur-sm opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div 
                className="relative bg-linear-to-br from-green-600 to-emerald-700 text-white w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg sm:rounded-xl font-black text-xs sm:text-sm shadow-lg group-hover:scale-105 transition-transform"
                aria-hidden="true"
              >
                IT
              </div>
            </div>
            <div className="flex flex-col -space-y-0.5 sm:-space-y-1 hidden sm:flex">
              <span className={`text-xs sm:text-sm md:text-base font-black tracking-tighter uppercase italic transition-colors ${isScrolled ? "text-slate-900" : "text-white"}`}>
                INDIA TOOLKIT
              </span>
              <span className="text-[6px] sm:text-[7px] font-bold tracking-[0.3em] sm:tracking-[0.4em] text-green-500 uppercase">India First</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* All Tools Button */}
            <Link 
              href="/tools"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all text-[11px] font-bold uppercase tracking-widest ${
                isScrolled 
                  ? "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-100" 
                  : "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20"
              }`}
              aria-label="Browse all 500+ tools"
            >
              <Icons.Grid className="h-4 w-4" aria-hidden="true" />
              <span>All Tools</span>
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[11px] font-bold uppercase tracking-widest ${
                  isScrolled ? "text-slate-600 hover:bg-slate-100" : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
                aria-expanded="false"
                aria-haspopup="true"
              >
                <Icons.Layers className="h-3.5 w-3.5 text-green-500" aria-hidden="true" />
                <span>Categories</span>
                <ChevronDown className="h-3 w-3 group-hover:rotate-180 transition-transform duration-300" aria-hidden="true" />
              </button>
              
              {/* Categories Mega Dropdown - 3 Columns */}
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-140 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 pt-2"
                role="menu"
                aria-label="Categories"
              >
                <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">All Categories</span>
                    <Link href="/categories" className="flex items-center gap-1 text-xs font-bold text-green-600 hover:text-green-700 uppercase tracking-wider">
                      View All <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>

                  {/* Categories List - 3 Columns */}
                  <div className="grid grid-cols-3 gap-2">
                    {categories.map((category) => {
                      const IconComponent = getCategoryIcon(category.icon);
                      return (
                        <Link
                          key={category.slug}
                          href={`/category/${category.slug}`}
                          className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-slate-50 transition-all group/item"
                          role="menuitem"
                        >
                          <div 
                            className="h-9 w-9 rounded-lg flex items-center justify-center text-white shadow-md transition-transform duration-200 group-hover/item:scale-105"
                            style={{ backgroundColor: category.color }}
                            aria-hidden="true"
                          >
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-slate-700 truncate block">{category.name}</span>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-slate-300 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" aria-hidden="true" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Tools Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[11px] font-bold uppercase tracking-widest ${
                  isScrolled ? "text-slate-600 hover:bg-slate-100" : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
                aria-expanded="false"
                aria-haspopup="true"
              >
                <Icons.Star className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
                <span>Popular</span>
                <ChevronDown className="h-3 w-3 group-hover:rotate-180 transition-transform duration-300" aria-hidden="true" />
              </button>

              {/* Popular Tools Dropdown */}
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 pt-2"
                role="menu"
                aria-label="Popular tools"
              >
                <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden">
                  <div className="p-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-amber-500" aria-hidden="true" />
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Trending Tools</span>
                    </div>
                  </div>
                  <div className="p-2">
                    {[
                      { name: "AI Image Generator", slug: "ai-image-generator", color: "#8B5CF6" },
                      { name: "Code Formatter", slug: "code-formatter", color: "#3B82F6" },
                      { name: "Image Converter", slug: "image-converter", color: "#10B981" },
                      { name: "JSON Formatter", slug: "json-formatter", color: "#F59E0B" },
                      { name: "Password Generator", slug: "password-generator", color: "#EF4444" },
                      { name: "Color Palette Generator", slug: "color-palette-generator", color: "#EC4899" },
                    ].map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tool/${tool.slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all group/item"
                        role="menuitem"
                      >
                        <div 
                          className="h-9 w-9 rounded-lg flex items-center justify-center text-white shadow-md"
                          style={{ backgroundColor: tool.color }}
                          aria-hidden="true"
                        >
                          <Zap className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-bold text-slate-900 block">{tool.name}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-300 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                  <div className="p-3 border-t border-slate-100 bg-slate-50">
                    <Link href="/tools" className="flex items-center justify-center gap-2 text-xs font-bold text-green-600 hover:text-green-700 uppercase tracking-wider">
                      View All Tools <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources */}
            <Link 
              href="/blog"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[11px] font-bold uppercase tracking-widest ${
                isScrolled ? "text-slate-600 hover:bg-slate-100" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icons.FileText className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Blog</span>
            </Link>

            <Link 
              href="/about"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[11px] font-bold uppercase tracking-widest ${
                isScrolled ? "text-slate-600 hover:bg-slate-100" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icons.Info className="h-3.5 w-3.5" aria-hidden="true" />
              <span>About</span>
            </Link>
          </div>

          {/* Search - Hidden on mobile, visible on tablet and up */}
          <div className="hidden md:block pointer-events-auto">
            <GlobalSearch />
          </div>

          {/* User Actions - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <Link 
              href="/saved-tools"
              className={`p-2.5 rounded-xl transition-all ${isScrolled ? "text-slate-600 hover:bg-slate-100" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
              aria-label="Saved tools"
            >
              <Star className="h-5 w-5" />
            </Link>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-2 p-1 pr-3 rounded-xl transition-all ${isScrolled ? "bg-slate-100 hover:bg-slate-200" : "bg-white/10 hover:bg-white/20"}`}
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${isScrolled ? "bg-green-500 text-white" : "bg-green-500 text-white"}`}>
                  <User className="h-4 w-4" />
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider ${isScrolled ? "text-slate-700" : "text-white"}`}>
                  Sign In
                </span>
              </button>

              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-2">
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <User className="h-4 w-4" /> My Profile
                  </Link>
                  <Link href="/saved-tools" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <Star className="h-4 w-4" /> Saved Tools
                  </Link>
                  <Link href="/history" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <Zap className="h-4 w-4" /> History
                  </Link>
                  <hr className="my-2 border-slate-100" />
                  <Link href="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                  <hr className="my-2 border-slate-100" />
                  <Link href="/login" className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Quick Actions - Visible on mobile/tablet */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl touch-target ${isScrolled ? "bg-slate-100 text-slate-700" : "bg-white/10 text-white"}`}
              aria-label="Open search and menu"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 sm:p-2.5 rounded-lg sm:rounded-xl touch-target ${isScrolled ? "bg-slate-100 text-slate-700" : "bg-white/10 text-white"}`}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu - Enhanced */}
      {isMenuOpen && (
        <div 
          id="mobile-menu"
          className="lg:hidden fixed inset-0 top-12 sm:top-14 md:top-16 bg-white/95 backdrop-blur-xl p-3 sm:p-4 overflow-y-auto"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="max-w-lg mx-auto space-y-3 sm:space-y-4">
            {/* Search */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm pb-2 z-10">
              <GlobalSearch />
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <Link href="/tools" className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-green-500 text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base touch-target">
                <Grid className="h-4 w-4 sm:h-5 sm:w-5" /> All Tools
              </Link>
              <Link href="/saved-tools" className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-slate-100 text-slate-700 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base touch-target">
                <Star className="h-4 w-4 sm:h-5 sm:w-5" /> Favorites
              </Link>
              <Link href="/history" className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-slate-100 text-slate-700 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base touch-target">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5" /> History
              </Link>
              <Link href="/blog" className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-slate-100 text-slate-700 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base touch-target">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" /> Blog
              </Link>
            </div>

            {/* Categories */}
            <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
              <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-3">Categories</h3>
              <div className="space-y-1 sm:space-y-2">
                {categories.map((category) => {
                  const IconComponent = getCategoryIcon(category.icon);
                  return (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl hover:bg-slate-100 transition-all touch-target"
                    >
                      <div 
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: category.color }}
                      >
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <span className="font-bold text-slate-700 text-sm sm:text-base truncate">{category.name}</span>
                      <ChevronRight className="h-4 w-4 text-slate-400 ml-auto shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Account */}
            <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
              <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-3">Account</h3>
              <div className="space-y-1 sm:space-y-2">
                <Link href="/profile" className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl hover:bg-slate-100 transition-all touch-target">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                  <span className="font-bold text-slate-700 text-sm sm:text-base">My Profile</span>
                </Link>
                <Link href="/settings" className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl hover:bg-slate-100 transition-all touch-target">
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                  <span className="font-bold text-slate-700 text-sm sm:text-base">Settings</span>
                </Link>
                <Link href="/login" className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-500 text-white rounded-lg sm:rounded-xl hover:bg-blue-600 transition-all touch-target">
                  <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-bold text-sm sm:text-base">Sign In</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
