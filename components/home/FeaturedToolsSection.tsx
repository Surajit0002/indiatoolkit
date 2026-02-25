'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Grid, LucideIcon } from 'lucide-react';

// Tool showcase card component
interface ToolShowcaseCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  slug: string;
  badge?: string;
}

function ToolShowcaseCard({ name, description, icon: Icon, color, slug, badge }: ToolShowcaseCardProps) {
  return (
    <Link
      href={`/tool/${slug}`}
      className="relative p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2 group overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {badge && (
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wide shadow-sm">
          {badge}
        </div>
      )}
      
      <div className="flex items-start gap-4 relative z-10">
        <div 
          className="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
          style={{ backgroundColor: color }}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-1">
            {name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{description}</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between relative z-10">
        <span className="text-xs font-semibold text-purple-600 flex items-center gap-1">
          Use Tool <ArrowRight className="h-3 w-3" />
        </span>
        <div className="h-8 w-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

// Import icons needed
import { Braces, FileText, Lock, Image, ArrowRightLeft, DollarSign, CheckCircle, Link as LinkIcon } from 'lucide-react';

export default function FeaturedToolsSection() {
  const featuredTools = [
    { name: 'JSON Formatter & Validator', description: 'Format, validate & beautify JSON data instantly', icon: Braces, color: '#f97316', slug: 'json-formatter', badge: 'Top Rated' },
    { name: 'AI Resume Builder', description: 'Create professional resumes in minutes with AI', icon: FileText, color: '#8b5cf6', slug: 'ai-resume-builder', badge: 'AI Powered' },
    { name: 'Password Generator', description: 'Generate secure, random passwords instantly', icon: Lock, color: '#10b981', slug: 'password-generator', badge: 'Secure' },
    { name: 'Image Compressor', description: 'Reduce image size without losing quality', icon: Image, color: '#ec4899', slug: 'image-compressor' }
  ];

  const secondaryTools = [
    { name: 'Base64 Encoder/Decoder', description: 'Convert text to Base64 and vice versa', icon: ArrowRightLeft, color: '#8b5cf6', slug: 'base64-converter' },
    { name: 'Currency Converter', description: 'Real-time exchange rates for 160+ currencies', icon: DollarSign, color: '#22c55e', slug: 'currency-converter' },
    { name: 'Grammar Checker', description: 'AI-powered grammar and spell check', icon: CheckCircle, color: '#3b82f6', slug: 'grammar-checker' },
    { name: 'URL Shortener', description: 'Shorten long URLs into shareable links', icon: LinkIcon, color: '#f59e0b', slug: 'url-shortener' }
  ];

  return (
    <section className="py-16 md:py-20 bg-white z-0 relative">
      <div className="container px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                <Star className="h-4 w-4 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600">Featured Selection</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-3">
              Most Popular <span className="text-green-600">Utilities</span>
            </h2>
            <p className="text-base text-slate-500 font-medium">
              Handpicked tools loved by millions of users worldwide
            </p>
          </div>
          <Link 
            href="/tools"
            className="group flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/25"
          >
            <Grid className="h-5 w-5" />
            Browse All Tools
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Tools Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {featuredTools.map((tool, i) => (
            <ToolShowcaseCard key={i} {...tool} />
          ))}
        </div>

        {/* Secondary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-4 md:mt-5">
          {secondaryTools.map((tool, i) => (
            <ToolShowcaseCard key={i} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
