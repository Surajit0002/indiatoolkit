'use client';

import React from 'react';
import Link from 'next/link';
import { Crown, ArrowRight } from 'lucide-react';

export default function ToolsCTASection() {
  return (
    <section className="py-16 md:py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-14 text-center relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 md:-24 -left-20 md:-24 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full blur-2xl md:blur-3xl" />
            <div className="absolute top-1/3 md:top-1/2 right-8 md:right-12 w-36 md:w-48 h-36 md:h-48 bg-white/10 rounded-full blur-2xl md:blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-40 md:w-56 h-40 md:w-56 bg-white/10 rounded-full blur-2xl md:blur-3xl" />
            
            {/* Pattern */}
            <div className="absolute inset-0 opacity-10" 
              style={{ 
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}
            />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-14 md:w-16 lg:w-20 h-14 md:h-16 lg:h-20 bg-white/20 rounded-xl md:rounded-2xl mb-6 md:mb-8 shadow-xl">
              <Crown className="h-7 md:h-9 lg:h-10 w-7 md:w-9 lg:w-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-4 md:mb-6">
              Need a Custom Tool?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-green-100 mb-8 md:mb-10 max-w-xl mx-auto font-medium">
              We&apos;re constantly adding new tools to help you work smarter. Have a suggestion? Let us know and we&apos;ll build it for you!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-green-600 rounded-xl md:rounded-2xl font-bold hover:bg-green-50 transition-all duration-300 shadow-2xl hover:shadow-xl hover:-translate-y-1 text-sm md:text-base"
            >
              Request a Tool
              <ArrowRight className="h-4 md:h-5 w-4 md:w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
