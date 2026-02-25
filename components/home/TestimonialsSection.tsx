'use client';

import React from 'react';
import { MessageCircle, Star } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import for ScrollAnimation to maintain performance
const ScrollAnimation = dynamic(() => import('@/components/ScrollAnimation'), {
  ssr: false,
  loading: () => <div className="animate-pulse h-64 bg-slate-800/50 rounded-2xl"></div>
});

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  color: string;
}

function TestimonialCard({ name, role, content, rating, color }: TestimonialCardProps) {
  return (
    <div className="p-5 md:p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/15 transition-all duration-300">
      {/* Star Ratings */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} 
          />
        ))}
      </div>
      
      {/* Testimonial Content */}
      <p className="text-sm md:text-base text-slate-200 font-medium leading-relaxed mb-5">
        &ldquo;{content}&rdquo;
      </p>
      
      {/* Author Info */}
      <div className="flex items-center gap-3">
        <div 
          className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
          style={{ backgroundColor: color }}
        >
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{name}</h4>
          <p className="text-xs text-slate-400">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const testimonials = [
    { name: "Priya Sharma", role: "Software Developer", content: "This toolkit has become my daily essential. The JSON formatter alone saves me hours of work every week!", rating: 5, color: '#8b5cf6' },
    { name: "Rahul Verma", role: "Digital Marketer", content: "The AI tools are incredibly powerful. My productivity has increased 10x since I started using this platform.", rating: 5, color: '#ec4899' },
    { name: "Anita Patel", role: "Content Creator", content: "Best free toolkit I've ever found. The image compressor and caption generator are game-changers!", rating: 5, color: '#22c55e' }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-green-500/5 rounded-full blur-[80px] md:blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-emerald-500/5 rounded-full blur-[60px] md:blur-[80px]" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <ScrollAnimation>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-5 md:mb-6 border border-white/20">
              <MessageCircle className="h-4 w-4 text-green-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-green-400">
                Testimonials
              </span>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation delay={100}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4">
              Loved by <span className="text-green-400">Millions</span>
            </h2>
          </ScrollAnimation>
          
          <ScrollAnimation delay={200}>
            <p className="text-lg text-slate-300 font-medium">
              See what our users have to say about their experience
            </p>
          </ScrollAnimation>
        </div>

        {/* Testimonials Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <ScrollAnimation key={i} delay={100 * (i + 1)}>
              <TestimonialCard {...testimonial} />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
