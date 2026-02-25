'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Rocket, ArrowRight } from 'lucide-react';

export default function FeaturedSpotlightSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Featured Card with Gradient */}
          <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div 
                className="absolute inset-0" 
                style={{ 
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '30px 30px'
                }}
              />
            </div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Text Content */}
              <div className="flex-1 text-white">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full mb-4">
                  <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                  <span className="text-xs font-bold uppercase tracking-wider">Featured Tool</span>
                </div>
                
                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
                  AI Resume Builder
                </h2>
                
                {/* Description */}
                <p className="text-lg md:text-xl text-white/80 mb-6 md:mb-8 leading-relaxed">
                  Create professional, ATS-optimized resumes in minutes with our AI-powered resume builder. 
                  Get personalized suggestions, real-time formatting, and export to multiple formats.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3 md:gap-4">
                  <Link 
                    href="/tool/ai-resume-builder"
                    className="px-5 md:px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:shadow-xl hover:shadow-white/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <Rocket className="h-5 w-5" />
                    Try Now Free
                  </Link>
                  <Link 
                    href="/features"
                    className="px-5 md:px-6 py-3 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
                  >
                    <ArrowRight className="h-5 w-5" />
                    Learn More
                  </Link>
                </div>
                
                {/* Stats - Mobile Responsive */}
                <div className="flex flex-wrap gap-6 md:gap-8 mt-8">
                  <div>
                    <div className="text-2xl md:text-3xl font-black">50K+</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">Resumes Created</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-black">4.9★</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">User Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-black">2 min</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">Avg. Build Time</div>
                  </div>
                </div>
              </div>
              
              {/* Tool Preview Mockup */}
              <div className="flex-1 w-full">
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl transform hover:rotate-0 rotate-1 md:rotate-2 transition-transform duration-500">
                  {/* Window Header */}
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-xs text-gray-400 font-medium">AI Resume Builder</div>
                  </div>
                  
                  {/* Mock Content */}
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                    <div className="h-4 bg-purple-100 rounded w-full"></div>
                    <div className="h-4 bg-purple-100 rounded w-5/6"></div>
                    <div className="flex gap-2 mt-4">
                      <div className="h-8 w-20 bg-purple-500 rounded-lg"></div>
                      <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
