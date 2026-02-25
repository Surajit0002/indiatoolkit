"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  Menu, 
  User, 
  X
} from "lucide-react";
import GlobalSearch from "./GlobalSearch";
import SlideOutMenu from "./SlideOutMenu";
import LanguageSelector from "./LanguageSelector";

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 lg:hidden"
        role="banner"
      >
        <nav 
          className={`
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
            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`
                p-2 rounded-xl touch-target transition-colors
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

            {/* Brand */}
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
              <div className="flex flex-col">
                <span className={`text-xs font-black tracking-tight uppercase italic ${isScrolled ? "text-slate-900" : "text-white"}`}>
                  INDIA TOOLKIT
                </span>
              </div>
            </Link>
          </div>

          {/* Right Side: Search, Language, Currency, Profile */}
          <div className="flex items-center gap-1">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`
                p-2 rounded-xl touch-target transition-colors
                ${isScrolled 
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200" 
                  : "bg-white/10 text-white hover:bg-white/20"
                }
              `}
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Language Selector */}
            <LanguageSelector isScrolled={isScrolled} compact />

            {/* Profile */}
            <Link
              href="/profile"
              className={`
                p-1.5 rounded-xl touch-target transition-colors
                ${isScrolled 
                  ? "bg-slate-100 hover:bg-slate-200" 
                  : "bg-white/10 hover:bg-white/20"
                }
              `}
              aria-label="Profile"
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isScrolled ? "bg-green-500" : "bg-green-500"}`}>
                <User className="h-4 w-4 text-white" />
              </div>
            </Link>
          </div>
        </nav>
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />
          
          {/* Search Content */}
          <div className="absolute top-0 left-0 right-0 bg-white p-4 shadow-xl animate-slide-down">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <GlobalSearch />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-out Menu */}
      <SlideOutMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      {/* Spacer for fixed header */}
      <div className="h-14 lg:hidden" />
    </>
  );
}
