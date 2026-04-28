'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
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
        <Image 
          src="/image/hero-background.png" 
          alt="Hero Background" 
          fill
          className="object-cover"
          priority
        />
      </div>
 

      <div className="container px-4 relative z-[60]">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-50 rounded-full mb-8 border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <Zap className="h-4 w-4 text-green-500 animate-pulse" />
            <span className="text-sm font-semibold text-green-700">India&apos;s #1 Free Toolkit</span>
          </div>
          
     

          {/* Search Bar - Main Focus (Preserved as-is) */}
          <div className="mb-10 px-2 relative z-[100]">
            <ModernSearchBar />
          </div>


        </div>
      </div>
    </section>
  );
}
