"use client";

import Link from "next/link";
import { Search, Menu, User, X, ChevronDown, Zap, Star, Settings, LogOut, ArrowRight, ChevronRight, Brain, TrendingUp, ArrowUpRight, Grid, Calculator, Image, FileText as FileTextIcon, Code, Globe, Palette, Heart, Sparkles, Command } from "lucide-react";
import * as Icons from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { categories } from "../data/categories";
import MobileBottomNav from "./MobileBottomNav";
import LanguageSelector from "./LanguageSelector";
import CurrencySelector from "./CurrencySelector";
import SlideOutMenu from "./SlideOutMenu";
import { getAllTools } from "@/lib/utils";
import { Tool } from "../types/tool";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  const [mounted, setMounted] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const isSearchOpenRef = useRef(isSearchOpen);
  
  // Keep ref in sync with state
  useEffect(() => {
    isSearchOpenRef.current = isSearchOpen;
  }, [isSearchOpen]);

  // Handle mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close search on click outside - only for desktop
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const target = e.target as Node;
      
      // Only handle desktop (>= 1024px) click outside
      if (window.innerWidth >= 1024) {
        if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
          setIsSearchOpen(false);
        }
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when opened (desktop only - mobile has touch issues)
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current && window.innerWidth >= 1024) {
      // Use setTimeout to ensure the panel is rendered first
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  // Prevent body scroll when search is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.classList.add('search-open');
      return () => {
        document.body.classList.remove('search-open');
      };
    }
  }, [isSearchOpen]);

  // Dynamic search
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const allTools = getAllTools();
      const query = searchQuery.toLowerCase();
      const results = allTools.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags?.some(tag => tag.toLowerCase().includes(query))
      ).slice(0, 8);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Get category icon component
  const getCategoryIcon = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      'Zap': Zap,
      'Calculator': Calculator,
      'Code': Code,
      'FileText': FileTextIcon,
      'Globe': Globe,
      'Brain': Brain,
      'Palette': Palette,
      'Image': Image,
    };
    return iconMap[iconName] || Grid;
  };

  // Close handlers
  const closeMenu = () => setIsMenuOpen(false);
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Get popular tools for search dropdown
  const popularTools = getAllTools().filter(t => t.isPopular).slice(0, 5);

  // Don't render until mounted (prevents hydration issues)
  if (!mounted) return null;

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      role="banner"
    >
      {/* Mobile Header - Only visible on mobile */}
      <div className="lg:hidden">
        <nav 
          className={`
            pointer-events-auto
            flex items-center justify-between gap-2 px-3 h-14
            transition-all duration-500 border-b
            ${isScrolled 
              ? "bg-white/95 backdrop-blur-xl border-slate-200/50 shadow-sm" 
              : "bg-black border-slate-800"
            }
          `}
          role="navigation"
          aria-label="Mobile navigation"
        >
          {/* Left Side: Menu + Brand */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`
                p-2 rounded-xl touch-target transition-all duration-200 active:scale-95
                ${isScrolled 
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200" 
                  : "bg-white/10 text-white hover:bg-white/20"
                }
              `}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link 
              href="/" 
              className="flex items-center gap-2 group"
              aria-label="India Toolkit - Home"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-green-500 rounded-lg blur-sm opacity-30 group-hover:opacity-50 transition-opacity" />
                <div 
                  className="relative bg-gradient-to-br from-green-600 to-emerald-700 text-white w-8 h-8 flex items-center justify-center rounded-lg font-black text-xs shadow-lg"
                >
                  IT
                </div>
              </div>
              <span className={`text-xs font-black tracking-tight uppercase italic ${isScrolled ? "text-slate-900" : "text-white"}`}>
                INDIA TOOLKIT
              </span>
            </Link>
          </div>

          {/* Right Side: Search, Language, Profile */}
          <div className="flex items-center gap-1">
            <button
              id="mobile-search-toggle"
              onClick={() => setIsSearchOpen(true)}
              className={`
                p-2 rounded-xl touch-target transition-all duration-200 active:scale-95
                ${isScrolled 
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200" 
                  : "bg-white/10 text-white hover:bg-white/20"
                }
              `}
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </button>

            <LanguageSelector isScrolled={isScrolled} compact />

            <Link
              href="/profile"
              className={`
                p-1.5 rounded-xl touch-target transition-all duration-200 active:scale-95
                ${isScrolled 
                  ? "bg-slate-100 hover:bg-slate-200" 
                  : "bg-white/10 hover:bg-white/20"
                }
              `}
              aria-label="Profile"
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-green-500">
                <User className="h-4 w-4 text-white" />
              </div>
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Search Dropdown - From Header Bottom */}
      {/* Backdrop */}
      <div 
        className={`
          lg:hidden fixed inset-0 z-55 bg-black/50 backdrop-blur-sm
          transition-all duration-300
          ${isSearchOpen 
            ? "opacity-100 visible" 
            : "opacity-0 invisible pointer-events-none"
          }
        `}
        onClick={closeSearch}
        aria-hidden="true"
      />
       
      {/* Search Dropdown Panel - Improved Design */}
      <div 
        ref={mobileSearchRef}
        className={`
          lg:hidden fixed left-2 right-2 z-60 bg-white rounded-2xl shadow-2xl
          transition-all duration-300 ease-out origin-top
          ${isSearchOpen 
            ? "opacity-100 visible scale-y-100 translate-y-0" 
            : "opacity-0 invisible scale-y-95 -translate-y-4 pointer-events-none"
          }
        `}
        style={{ top: "70px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col" style={{ maxHeight: "calc(100vh - 120px)" }}>
          {/* Search Header - Enhanced */}
          <div className="flex items-center gap-2 p-4 border-b border-slate-100 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 500+ free tools..."
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-green-100 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              onClick={closeSearch}
              className="p-2.5 rounded-xl bg-white text-slate-600 hover:bg-slate-100 transition-colors flex-shrink-0 shadow-sm"
              aria-label="Close search"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search Results - Improved */}
          <div className="overflow-y-auto overscroll-contain" style={{ maxHeight: "calc(70vh - 70px)" }}>
            {searchQuery.trim().length > 0 ? (
              searchResults.length > 0 ? (
                <div className="p-3 space-y-1">
                  <p className="text-[10px] text-green-600 font-bold px-2 py-2 uppercase tracking-wider">
                    {searchResults.length} results found
                  </p>
                  {searchResults.map((tool) => {
                    const category = categories.find(c => c.slug === tool.category);
                    const Icon = getCategoryIcon(category?.icon || "Grid");
                    return (
                      <Link
                        key={tool.id}
                        href={`/tool/${tool.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 active:bg-green-100 transition-colors group"
                      >
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: category?.color || "#10B981" }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-900 text-sm truncate">{tool.name}</p>
                          <p className="text-xs text-slate-500 truncate">{tool.description}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-green-500 transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="h-8 w-8 text-slate-300" />
                  </div>
                  <p className="text-base font-bold text-slate-700">No results found</p>
                  <p className="text-sm text-slate-400 mt-1">Try different keywords</p>
                </div>
              )
            ) : (
              <div className="p-3 space-y-4">
                {/* Quick Links */}
                <div>
                  <p className="text-[10px] text-green-600 font-bold px-2 py-2 uppercase tracking-wider">Quick Access</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/tools" onClick={closeSearch} className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-green-100 active:scale-98 transition-transform">
                      <Grid className="h-4 w-4" /> All Tools
                    </Link>
                    <Link href="/saved-tools" onClick={closeSearch} className="flex items-center gap-2 p-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 active:scale-98 transition-transform">
                      <Heart className="h-4 w-4" /> Favorites
                    </Link>
                  </div>
                </div>

                {/* Popular Tools */}
                <div>
                  <p className="text-[10px] text-green-600 font-bold px-2 py-2 uppercase tracking-wider">Trending Tools</p>
                  <div className="space-y-1">
                    {popularTools.slice(0, 5).map((tool) => {
                      const category = categories.find(c => c.slug === tool.category);
                      const Icon = getCategoryIcon(category?.icon || "Grid");
                      return (
                        <Link
                          key={tool.id}
                          href={`/tool/${tool.slug}`}
                          onClick={closeSearch}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 active:bg-green-100 transition-colors group"
                        >
                          <div 
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform"
                            style={{ backgroundColor: category?.color || "#10B981" }}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="font-semibold text-slate-700 text-sm flex-1 truncate">{tool.name}</span>
                          <Sparkles className="h-4 w-4 text-amber-500 flex-shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-slate-100 bg-slate-50">
            <Link
              href="/tools"
              onClick={closeSearch}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wide hover:bg-green-600 transition-colors"
            >
              <Grid className="h-3.5 w-3.5" />
              Browse All 500+ Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Header - Only visible on desktop */}
      <div className="hidden lg:block px-4 py-4">
        <div className="max-w-8xl mx-auto flex justify-center">
          <nav 
            className={`
              pointer-events-auto
              relative flex items-center justify-between gap-4 px-6 h-16 
              rounded-2xl transition-all duration-500 border
              ${isScrolled 
                ? "w-full bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)]" 
                : "w-[95%] bg-black backdrop-blur-md border-blue-800 shadow-2xl"
              }
            `}
            role="navigation"
            aria-label="Desktop navigation"
          >
            {/* Brand */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group shrink-0"
              aria-label="India Toolkit - Home"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-blue-500 rounded-lg blur-sm opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <div 
                  className="relative bg-linear-to-br from-green-600 to-emerald-700 text-white w-9 h-9 flex items-center justify-center rounded-xl font-black text-sm shadow-lg group-hover:scale-105 transition-transform"
                  aria-hidden="true"
                >
                  IT
                </div>
              </div>
              <div className="flex flex-col -space-y-1">
                <span className={`text-base font-black tracking-tighter uppercase italic transition-colors ${isScrolled ? "text-slate-900" : "text-white"}`}>
                  INDIA TOOLKIT
                </span>
                <span className="text-[7px] font-bold tracking-[0.4em] text-green-500 uppercase">India First</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-1">
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

          {/* Search with Dropdown - Desktop */}
          <div className="relative" ref={searchContainerRef}>
            {/* Search Icon Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[11px] font-bold uppercase tracking-widest ${
                isScrolled 
                  ? "text-slate-600 hover:bg-slate-100" 
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
              aria-label="Open search"
              aria-expanded={isSearchOpen}
            >
              <Search className="h-4 w-4" />
              <span className="hidden xl:inline">Search</span>
              <div className="hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-200/50 text-[9px] text-slate-500">
                <Command className="h-2.5 w-2.5" />K
              </div>
            </button>
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

              <div 
                className={`
                  absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-2
                  transition-all duration-200 origin-top-right
                  ${isProfileOpen 
                    ? "opacity-100 visible scale-100" 
                    : "opacity-0 invisible scale-95 pointer-events-none"
                  }
                `}
              >
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
            </div>

            {/* Language Selector */}
            <LanguageSelector isScrolled={isScrolled} />

            {/* Currency Selector */}
            <CurrencySelector isScrolled={isScrolled} compact />
          </div>
          </nav>
        </div>
      </div>

      {/* Desktop Search Popup Modal - Fixed at bottom of header */}
      <div 
        className={`
          hidden lg:block fixed left-1/2 -translate-x-1/2 z-[55]
          transition-all duration-300 ease-out
          ${isSearchOpen 
            ? "opacity-100 visible translate-y-0" 
            : "opacity-0 invisible -translate-y-4 pointer-events-none"
          }
        `}
        style={{ top: isScrolled ? "72px" : "80px", width: "min(600px, 90vw)" }}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-80 overflow-y-auto">
            {searchQuery.trim().length > 0 ? (
              searchResults.length > 0 ? (
                <div className="p-2">
                  <p className="text-[10px] text-slate-400 font-medium px-2 py-1">
                    {searchResults.length} results found
                  </p>
                  {searchResults.map((tool) => {
                    const category = categories.find(c => c.slug === tool.category);
                    const Icon = getCategoryIcon(category?.icon || "Grid");
                    return (
                      <Link
                        key={tool.id}
                        href={`/tool/${tool.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        <div 
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
                          style={{ backgroundColor: category?.color || "#10B981" }}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 text-sm truncate">{tool.name}</p>
                          <p className="text-xs text-slate-500 truncate">{tool.description}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-300" />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <Search className="h-8 w-8 text-slate-200 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">No results found</p>
                  <p className="text-xs text-slate-400 mt-1">Try different keywords</p>
                </div>
              )
            ) : (
              <div className="p-2">
                {/* Quick Links */}
                <p className="text-[10px] text-slate-400 font-medium px-2 py-1">Quick Links</p>
                <div className="grid grid-cols-2 gap-1.5 mb-3">
                  <Link href="/tools" onClick={closeSearch} className="flex items-center gap-2 p-2.5 bg-green-50 text-green-700 rounded-xl font-medium text-xs hover:bg-green-100 transition-colors">
                    <Grid className="h-3.5 w-3.5" /> All Tools
                  </Link>
                  <Link href="/saved-tools" onClick={closeSearch} className="flex items-center gap-2 p-2.5 bg-slate-50 text-slate-700 rounded-xl font-medium text-xs hover:bg-slate-100 transition-colors">
                    <Heart className="h-3.5 w-3.5" /> Favorites
                  </Link>
                </div>

                {/* Popular Tools */}
                <p className="text-[10px] text-slate-400 font-medium px-2 py-1">Popular Tools</p>
                {popularTools.slice(0, 4).map((tool) => {
                  const category = categories.find(c => c.slug === tool.category);
                  const Icon = getCategoryIcon(category?.icon || "Grid");
                  return (
                    <Link
                      key={tool.id}
                      href={`/tool/${tool.slug}`}
                      onClick={closeSearch}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: category?.color || "#10B981" }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-slate-700 text-sm flex-1 truncate">{tool.name}</span>
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-slate-100 bg-slate-50">
            <Link
              href="/tools"
              onClick={closeSearch}
              className="flex items-center justify-center gap-2 w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wide hover:bg-green-600 transition-colors"
            >
              <Grid className="h-3.5 w-3.5" />
              Browse All Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Out Menu - Using Component */}
      <SlideOutMenu isOpen={isMenuOpen} onClose={closeMenu} />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </header>
  );
}
