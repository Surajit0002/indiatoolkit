'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Zap } from 'lucide-react';

// Dynamic import for ModernSearchBar to maintain performance
const ModernSearchBar = dynamic(() => import('@/components/ModernSearchBar'), {
  loading: () => (
    <div className="h-16 bg-slate-100 rounded-2xl animate-pulse w-full max-w-2xl mx-auto"></div>
  ),
});

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-28 pb-16 overflow-visible">
      {/* Dynamic Gradient Background with animated shapes */}
      
      {/* Hero Background Image */}
      <div className="absolute w-full h-full top-0 left-0 overflow-hidden inset-0">
        <img 
          src="/image/hero-background.png" 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
      </div>
 

      <div className="container px-4 relative z-[60]">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-50 rounded-full mb-8 border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <Zap className="h-4 w-4 text-green-500 animate-pulse" />
            <span className="text-sm font-semibold text-green-700">India&apos;s #1 Free Toolkit</span>
          </div>
          
          {/* Main Title with gradient text */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Find the <span className="bg-linear-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">Perfect Tool</span>
            <br className="hidden sm:block" />
            For Any Task
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
            Search from <span className="font-bold text-slate-700">500+ free tools</span> for converters, calculators, AI utilities, and more.
          </p>

          {/* Search Bar - Main Focus (Preserved as-is) */}
          <div className="mb-10 px-2 relative z-[100]">
            <ModernSearchBar />
          </div>

          {/* Quick Stats - Mobile responsive */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-sm text-slate-500">
            <span className="font-bold text-slate-800 text-base">500+</span><span className="hidden sm:inline">Tools</span><span className="sm:hidden">Tools</span>
            <span className="text-slate-300">•</span>
            <span className="font-bold text-slate-800 text-base">25+</span><span>Categories</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="font-bold text-slate-800 text-base">1M+</span><span>Users</span>
            <span className="text-slate-300">•</span>
            <span className="text-green-600 font-bold">100% Free</span>
          </div>
        </div>
      </div>
    </section>
  );
}
