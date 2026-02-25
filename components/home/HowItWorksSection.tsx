'use client';

import React from 'react';
import { Lightbulb, LucideIcon, Search, FileText, Download } from 'lucide-react';

interface StepCardProps {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  isLast?: boolean;
}

function StepCard({ step, title, description, icon: Icon, color, isLast }: StepCardProps) {
  return (
    <div className="relative group">
      {/* Connection Line - Hidden on mobile */}
      {!isLast && (
        <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-slate-200 to-slate-200 -z-10"></div>
      )}
      
      <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 border border-slate-100">
        {/* Step Number */}
        <div className="absolute -top-3 md:-top-4 left-6 md:left-8 h-7 md:h-8 w-7 md:w-8 bg-slate-900 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg">
          {step}
        </div>
        
        {/* Icon */}
        <div 
          className="h-14 md:h-16 w-14 md:w-16 rounded-2xl flex items-center justify-center mx-auto mb-5 md:mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: color }}
        >
          <Icon className="h-7 md:h-8 w-7 md:w-8" />
        </div>
        
        {/* Content */}
        <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 md:mb-3 text-center">{title}</h3>
        <p className="text-sm text-slate-500 font-medium text-center leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Choose Your Tool',
      description: 'Browse our extensive library of 500+ tools or search for exactly what you need.',
      icon: Search,
      color: '#8b5cf6'
    },
    {
      step: '02',
      title: 'Input Your Data',
      description: 'Paste your content, upload files, or use our AI assistants to generate content.',
      icon: FileText,
      color: '#f97316'
    },
    {
      step: '03',
      title: 'Get Instant Results',
      description: 'Download your processed files, copy results, or share them directly.',
      icon: Download,
      color: '#22c55e'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-5 md:mb-6 border border-slate-200 shadow-sm">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
              Simple Process
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-3 md:mb-4">
            How It <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Get started in seconds with our intuitive three-step process
          </p>
        </div>

        {/* Steps Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 max-w-5xl mx-auto">
          {steps.map((item, i) => (
            <StepCard 
              key={i}
              step={item.step}
              title={item.title}
              description={item.description}
              icon={item.icon}
              color={item.color}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
