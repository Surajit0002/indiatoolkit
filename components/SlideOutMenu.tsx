"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  X, 
  Home, 
  Grid3X3, 
  Heart, 
  Clock, 
  User,
  LogOut,
  ChevronRight,
  Globe,
  DollarSign,
  Moon,
  Sun,
  FileText,
  HelpCircle,
  MessageSquare,
  Info,
  Layers,
  Crown,
  Flame,
  Sparkles,
  ChevronDown
} from "lucide-react";
import * as Icons from "lucide-react";
import { categories } from "@/data/categories";
import { getAllTools } from "@/lib/utils";

interface SlideOutMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideOutMenu({ isOpen, onClose }: SlideOutMenuProps) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [showLanguages, setShowLanguages] = useState(false);
  const [showCurrencies, setShowCurrencies] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  const popularTools = getAllTools().filter(t => t.isPopular).slice(0, 5);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // No body scroll lock - let the menu handle its own scrolling
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const getCategoryIcon = (iconName: string) => {
    // @ts-expect-error - Dynamic icon access
    return Icons[iconName] || Icons.Folder;
  };

  const mainLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/tools", label: "All Tools", icon: Grid3X3 },
    { href: "/saved-tools", label: "Favorites", icon: Heart },
    { href: "/history", label: "History", icon: Clock },
  ];

  const supportLinks = [
    { href: "/blog", label: "Blog", icon: FileText },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
    { href: "/contact", label: "Contact", icon: MessageSquare },
    { href: "/about", label: "About", icon: Info },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "ta", name: "Tamil" },
  ];

  const currencies = [
    { code: "INR", name: "Indian Rupee", symbol: "Rs" },
    { code: "USD", name: "US Dollar", symbol: "$" },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Overlay - doesn't block scroll events on the menu */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-90 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        {/* Header - Improved Design */}
        <div className="absolute top-0 left-0 right-0 h-[70px] flex items-center justify-between px-4 bg-gradient-to-r from-green-500 to-emerald-600 z-10">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-black text-sm border border-white/30">
              IT
            </div>
            <div>
              <span className="font-bold text-white text-base">India Toolkit</span>
              <p className="text-[10px] text-white/80 font-medium">500+ Free Tools</p>
            </div>
          </Link>
          <button 
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

                {/* Scrollable Content */}
        <div 
          ref={scrollRef}
          className="absolute top-[70px] left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="p-4 space-y-4">
            
            {/* Login Card - Improved */}
            <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-5 text-white shadow-lg shadow-green-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Welcome!</p>
                  <p className="text-xs text-white/80">Sign in for more</p>
                </div>
                <Crown className="w-5 h-5 text-yellow-300 ml-auto" />
              </div>
              <Link 
                href="/login" 
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-2 bg-white text-green-600 rounded-lg text-sm font-bold"
              >
                <LogOut className="w-4 h-4" />
                Sign In
              </Link>
            </div>

            {/* Quick Links - Improved */}
            <div className="grid grid-cols-4 gap-3">
              {mainLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all shadow-sm ${
                      isActive 
                        ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/25" 
                        : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50 hover:shadow-md"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[10px] font-semibold">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Trending Tools - Improved */}
            <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl p-4 shadow-lg shadow-orange-500/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white">Trending</span>
                </div>
                <Link href="/tools" onClick={onClose} className="text-[10px] text-white/80">
                  View All
                </Link>
              </div>
              <div className="space-y-1">
                {popularTools.map((tool, i) => {
                  const cat = categories.find(c => c.slug === tool.category);
                  const Icon = getCategoryIcon(cat?.icon || "Zap");
                  return (
                    <Link
                      key={tool.id}
                      href={`/tool/${tool.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-2 p-2 bg-white rounded-lg"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <div 
                        className="w-6 h-6 rounded flex items-center justify-center text-white"
                        style={{ backgroundColor: cat?.color || "#F59E0B" }}
                      >
                        <Icon className="w-3 h-3" />
                      </div>
                      <span className="text-xs font-medium text-gray-700 flex-1 truncate">
                        {tool.name}
                      </span>
                      <Sparkles className="w-3 h-3 text-amber-500" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Categories - Improved */}
            <div className="bg-white border-0 rounded-2xl shadow-lg shadow-gray-100/50">
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="w-full flex items-center justify-between p-3"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-green-500" />
                  <span className="font-bold text-sm text-gray-800">Categories</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 ${showCategories ? "rotate-180" : ""}`} />
              </button>
              {showCategories && (
                <div className="px-3 pb-3 space-y-1 max-h-100 overflow-y-auto">
                  {categories.map((cat) => {
                    const Icon = getCategoryIcon(cat.icon);
                    return (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
                      >
                        <div 
                          className="w-6 h-6 rounded flex items-center justify-center text-white"
                          style={{ backgroundColor: cat.color }}
                        >
                          <Icon className="w-3 h-3" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{cat.name}</span>
                        <ChevronRight className="w-3 h-3 text-gray-300 ml-auto" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Settings - Improved */}
            <div className="bg-white border-0 rounded-2xl p-4 space-y-3 shadow-lg shadow-gray-100/50">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Settings</span>
              
              {/* Language */}
              <div className="relative">
                <button
                  onClick={() => { setShowLanguages(!showLanguages); setShowCurrencies(false); }}
                  className="w-full flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                >
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium text-gray-700 flex-1 text-left">
                    {languages.find(l => l.code === selectedLanguage)?.name}
                  </span>
                  <ChevronRight className={`w-3 h-3 text-gray-400 ${showLanguages ? "rotate-90" : ""}`} />
                </button>
                {showLanguages && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-lg z-10">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setSelectedLanguage(lang.code); setShowLanguages(false); }}
                        className={`w-full p-2 text-left text-xs ${selectedLanguage === lang.code ? "bg-green-50 text-green-700" : "text-gray-600"}`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Currency */}
              <div className="relative">
                <button
                  onClick={() => { setShowCurrencies(!showCurrencies); setShowLanguages(false); }}
                  className="w-full flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                >
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-medium text-gray-700 flex-1 text-left">
                    {currencies.find(c => c.code === selectedCurrency)?.name}
                  </span>
                  <ChevronRight className={`w-3 h-3 text-gray-400 ${showCurrencies ? "rotate-90" : ""}`} />
                </button>
                {showCurrencies && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-lg z-10">
                    {currencies.map((cur) => (
                      <button
                        key={cur.code}
                        onClick={() => { setSelectedCurrency(cur.code); setShowCurrencies(false); }}
                        className={`w-full p-2 text-left text-xs ${selectedCurrency === cur.code ? "bg-green-50 text-green-700" : "text-gray-600"}`}
                      >
                        {cur.symbol} {cur.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dark Mode */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-full flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
              >
                {isDarkMode ? <Moon className="w-4 h-4 text-indigo-500" /> : <Sun className="w-4 h-4 text-amber-500" />}
                <span className="text-xs font-medium text-gray-700 flex-1 text-left">Dark Mode</span>
                <div className={`w-8 h-4 rounded-full ${isDarkMode ? "bg-green-500" : "bg-gray-300"}`}>
                  <div className={`w-3 h-3 rounded-full bg-white shadow-sm mt-0.5 transition-transform ${isDarkMode ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
              </button>
            </div>

            {/* Support - Improved */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Support</span>
              </div>
              <div className="p-2">
                {supportLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <Icon className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-medium text-gray-700">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center py-3 border-t border-gray-100">
              <div className="flex justify-center gap-3 mb-2">
                <Link href="/privacy-policy" onClick={onClose} className="text-[10px] text-gray-500">Privacy</Link>
                <Link href="/terms" onClick={onClose} className="text-[10px] text-gray-500">Terms</Link>
              </div>
              <p className="text-[9px] text-gray-400">2024 India Toolkit</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
