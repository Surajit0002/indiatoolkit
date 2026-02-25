'use client';

import React from 'react';
import Link from 'next/link';
import { Brain, LucideIcon, FileText, MessageCircle, Mail, Sparkles, CheckCircle, RefreshCw, Briefcase, GraduationCap, Video, ArrowRight } from 'lucide-react';

interface AIToolCardProps {
  name: string;
  icon: LucideIcon;
  color: string;
  slug: string;
}

function AIToolCard({ name, icon: Icon, color, slug }: AIToolCardProps) {
  return (
    <Link
      href={`/tool/${slug}`}
      className="relative p-4 md:p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-purple-500/30 hover:scale-105 transition-all duration-300 group"
    >
      <div 
        className="h-12 md:h-14 w-12 md:w-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>
      <span className="text-sm font-bold text-white text-center block">{name}</span>
    </Link>
  );
}

export default function AIToolsSection() {
  const aiTools = [
    { name: 'Resume Builder', icon: FileText, color: '#8b5cf6', slug: 'ai-resume-builder' },
    { name: 'Caption Gen', icon: MessageCircle, color: '#ec4899', slug: 'ai-caption-generator' },
    { name: 'Cover Letter', icon: Mail, color: '#f59e0b', slug: 'ai-cover-letter-generator' },
    { name: 'Prompt Gen', icon: Sparkles, color: '#10b981', slug: 'ai-prompt-generator' },
    { name: 'Grammar Check', icon: CheckCircle, color: '#3b82f6', slug: 'ai-grammar-checker' },
    { name: 'Summarizer', icon: FileText, color: '#6366f1', slug: 'ai-summarizer' },
    { name: 'Story Gen', icon: FileText, color: '#f97316', slug: 'ai-story-generator' },
    { name: 'Paraphraser', icon: RefreshCw, color: '#14b8a6', slug: 'ai-paraphraser' },
    { name: 'Interview Qs', icon: Briefcase, color: '#84cc16', slug: 'ai-interview-question-generator' },
    { name: 'Course Gen', icon: GraduationCap, color: '#06b6d4', slug: 'ai-course-generator' },
    { name: 'Video Script', icon: Video, color: '#a855f7', slug: 'ai-video-script-generator' },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-500/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-pink-500/10 rounded-full blur-[60px] md:blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-5 md:mb-6 border border-white/20">
            <Brain className="h-4 w-4 text-purple-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-400">
              Artificial Intelligence
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4">
            Supercharge with <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">AI Tools</span>
          </h2>
          <p className="text-lg text-slate-300 font-medium">
            Leverage cutting-edge AI to automate, create, and innovate faster than ever before
          </p>
        </div>

        {/* AI Tools Grid - Mobile Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 max-w-5xl mx-auto">
          {aiTools.map((tool, i) => (
            <AIToolCard key={i} {...tool} />
          ))}
          
          {/* More AI Link Card */}
          <Link
            href="/advanced-tools"
            className="relative p-4 md:p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-green-500/30 hover:scale-105 transition-all duration-300 group flex flex-col items-center justify-center"
          >
            <div className="h-12 md:h-14 w-12 md:w-14 rounded-xl flex items-center justify-center mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-bold text-white text-center">More AI →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
