'use client';

import React from 'react';
import Link from 'next/link';
import { Grid } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 md:mb-6">
            Ready to Boost Your Productivity?
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 font-medium mb-8 md:10 max-w-2xl mx-auto">
            Join millions of users who trust our toolkit for their daily work. 
            Start using our free tools today!
          </p>
          
          {/* CTA Buttons - Mobile Responsive */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link 
              href="/tools"
              className="px-7 md:px-8 py-3 md:py-4 bg-white text-green-600 rounded-xl font-bold text-base md:text-lg hover:shadow-2xl hover:shadow-white/25 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Grid className="h-5 w-5" />
              Browse All Tools
            </Link>
            <Link 
              href="/about"
              className="px-7 md:px-8 py-3 md:py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-base md:text-lg hover:bg-white/30 hover:scale-105 transition-all duration-300 border border-white/30 flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
