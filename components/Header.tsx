"use client";

import Link from "next/link";
import { Search, Menu, User, X, ChevronDown, Zap, Star, History, Settings, LogOut, ArrowRight, ChevronRight, Layers, FileText, HelpCircle, Info, Mail } from "lucide-react";
import * as Icons from "lucide-react";
import React, { useState, useEffect } from "react";
import GlobalSearch from "./GlobalSearch";
import { categories } from "@/data/categories";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-center">
        <nav className={`
          pointer-events-auto
          relative flex items-center justify-between gap-4 px-6 h-16 
          rounded-2xl transition-all duration-500 border
          ${isScrolled 
            ? "w-full bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)]" 
            : "w-full md:w-[95%] bg-slate-900/95 backdrop-blur-md border-slate-800 shadow-2xl"
          }
        `}>
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-blue-500 rounded-lg blur-sm opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white w-9 h-9 flex items-center justify-center rounded-xl font-black text-sm shadow-lg group-hover:scale-105 transition-transform">
                OT
              </div>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className={`text-base font-black tracking-tighter uppercase italic transition-colors ${isScrolled ? "text-slate-900" : "text-white"}`}>
                OMNITOOLS
              </span>
              <span className="text-[7px] font-bold tracking-[0.4em] text-blue-500 uppercase">Intelligence</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <div className="relative group px-1">
              <button className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[11px] font-bold uppercase tracking-widest ${
                isScrolled ? "text-slate-600 hover:bg-slate-100" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}>
                <Icons.Grid className="h-3.5 w-3.5 text-blue-500" />
                Tools
                <ChevronDown className="h-3 w-3 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              {/* Mega Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[640px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 pt-2">
                <div className="bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden p-3">
                  <div className="grid grid-cols-2 gap-2 max-h-[440px] overflow-y-auto scrollbar-hide">
                    {categories.map(cat => {
                      const IconComponent = Icons[cat.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                      return (
                        <Link 
                          key={cat.id} 
                          href={`/category/${cat.slug}`} 
                          className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-all group/item border border-transparent hover:border-slate-100"
                        >
                          <div 
                            className="h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover/item:scale-110" 
                            style={{ backgroundColor: cat.color }}
                          >
                            <IconComponent className="h-5 w-5 stroke-[2.5]" />
                          </div>
                          <div>
                            <div className="font-bold text-[11px] text-slate-900 uppercase tracking-tight">{cat.name}</div>
                            <div className="text-[9px] text-slate-400 font-medium">Professional grade tools</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-2 p-4 bg-slate-900 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <Zap className="h-4 w-4 fill-current" />
                      </div>
                      <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Unlock Pro Access</span>
                    </div>
                    <Link href="/pricing" className="px-4 py-2 bg-white text-slate-900 rounded-xl font-black text-[9px] uppercase hover:bg-blue-500 hover:text-white transition-all">
                      Upgrade
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <HeaderLink href="/categories" label="Explore" icon={<Layers className="h-3.5 w-3.5" />} isScrolled={isScrolled} />
            <HeaderLink href="/blog" label="Insights" icon={<FileText className="h-3.5 w-3.5" />} isScrolled={isScrolled} />
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block w-48 lg:w-64 transition-all duration-300 focus-within:w-72">
              <GlobalSearch />
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                  isScrolled ? "bg-slate-900 text-white border-slate-800" : "bg-white text-slate-900 border-white/20 shadow-lg"
                }`}
              >
                <User className="h-5 w-5" />
              </button>
              
              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-[200]">
                  <div className="p-4 bg-slate-900 rounded-xl mb-1 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black">KC</div>
                    <div>
                      <div className="text-[11px] font-black text-white uppercase tracking-tighter">King Creations</div>
                      <div className="text-[8px] font-bold text-blue-400 uppercase tracking-widest">Premium Member</div>
                    </div>
                  </div>
                  <div className="py-1">
                    <DropdownLink href="/profile" icon={<User className="h-4 w-4" />} label="Profile" />
                    <DropdownLink href="/saved" icon={<Star className="h-4 w-4" />} label="Favorites" />
                    <DropdownLink href="/settings" icon={<Settings className="h-4 w-4" />} label="Settings" />
                    <div className="h-px bg-slate-100 my-1 mx-2"></div>
                    <button className="flex items-center gap-3 w-full p-3 hover:bg-red-50 text-red-500 rounded-xl transition-all group">
                      <LogOut className="h-4 w-4" />
                      <span className="font-bold text-[10px] uppercase tracking-widest">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button 
              className="lg:hidden h-10 w-10 flex items-center justify-center bg-white rounded-xl border border-slate-200 shadow-sm"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-5 w-5 text-slate-900" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[300] p-6 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 pointer-events-auto">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-slate-900 text-white w-10 h-10 flex items-center justify-center rounded-xl font-black text-lg">OT</div>
              <span className="text-xl font-black tracking-tighter italic">OMNITOOLS</span>
            </Link>
            <button onClick={() => setIsMenuOpen(false)} className="h-10 w-10 flex items-center justify-center bg-slate-100 rounded-xl">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mb-6">
            <GlobalSearch />
          </div>

          <div className="flex flex-col gap-2">
            <MobileNavLink href="/tools" label="All Tools" icon={<Icons.Grid className="h-5 w-5" />} onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/categories" label="Categories" icon={<Layers className="h-5 w-5" />} onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/blog" label="Blog" icon={<FileText className="h-5 w-5" />} onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/about" label="About Us" icon={<Info className="h-5 w-5" />} onClick={() => setIsMenuOpen(false)} />
          </div>

          <div className="mt-auto">
            <div className="bg-slate-900 p-6 rounded-3xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-black text-lg italic mb-1">PRO ACCESS</h4>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-4">Master your workflow</p>
                <Link 
                  href="/dashboard" 
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest"
                >
                  Dashboard <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <Zap className="absolute -right-6 -bottom-6 h-24 w-24 text-white/5 rotate-12" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function HeaderLink({ href, label, icon, isScrolled }: { href: string, label: string, icon: React.ReactNode, isScrolled: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[11px] font-bold uppercase tracking-widest group ${
        isScrolled ? "text-slate-500 hover:text-slate-900 hover:bg-slate-100" : "text-slate-300 hover:text-white hover:bg-white/10"
      }`}
    >
      <span className={`transition-colors ${isScrolled ? "text-slate-400 group-hover:text-blue-600" : "text-slate-500 group-hover:text-blue-400"}`}>
        {icon}
      </span>
      {label}
    </Link>
  );
}

function DropdownLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-all group"
    >
      <div className="text-slate-400 group-hover:text-blue-600 transition-colors">{icon}</div>
      <span className="font-bold text-[11px] uppercase tracking-widest text-slate-600 group-hover:text-slate-900">{label}</span>
    </Link>
  );
}

function MobileNavLink({ href, label, icon, onClick }: { href: string, label: string, icon: React.ReactNode, onClick: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-slate-900 hover:bg-slate-100 transition-all border border-slate-200/50"
    >
      <div className="text-blue-600">{icon}</div>
      <span className="font-black text-xs uppercase tracking-widest">{label}</span>
      <ChevronRight className="h-4 w-4 ml-auto text-slate-300" />
    </Link>
  );
}
