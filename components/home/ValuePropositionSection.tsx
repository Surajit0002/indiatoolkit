'use client';

import React from 'react';
import { LucideIcon, Zap, Shield, Brain, Smartphone, Globe2, RefreshCw } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  delay: string;
}

function FeatureCard({ icon: Icon, title, description, gradient, delay }: FeatureCardProps) {
  return (
    <div 
      className="group p-5 md:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: delay }}
    >
      <div className={`h-12 md:h-14 w-12 md:w-14 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 ${gradient}`}>
        <Icon className="h-6 md:h-7 w-6 md:w-7 text-white" />
      </div>
      <h3 className="text-lg font-black text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">{description}</p>
    </div>
  );
}

export default function ValuePropositionSection() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with real-time processing. No waiting, no loading screens, instant results.",
      gradient: "bg-gradient-to-br from-yellow-400 to-orange-500"
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "Your data never leaves your browser. Client-side processing ensures complete privacy and security.",
      gradient: "bg-gradient-to-br from-green-400 to-emerald-500"
    },
    {
      icon: Brain,
      title: "AI Powered",
      description: "Leverage advanced AI models for smart suggestions, automation, and intelligent outcomes.",
      gradient: "bg-gradient-to-br from-purple-400 to-pink-500"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Fully responsive design that works seamlessly on all devices - desktop, tablet, and mobile.",
      gradient: "bg-gradient-to-br from-blue-400 to-cyan-500"
    },
    {
      icon: Globe2,
      title: "Free Forever",
      description: "No subscriptions, no hidden fees, no premium tiers. All tools are completely free to use.",
      gradient: "bg-gradient-to-br from-teal-400 to-emerald-500"
    },
    {
      icon: RefreshCw,
      title: "Always Updated",
      description: "New tools and features added regularly based on user feedback and industry trends.",
      gradient: "bg-gradient-to-br from-rose-400 to-pink-500"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          {/* Features Grid - Mobile Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {features.map((feature, i) => (
              <FeatureCard 
                key={i}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
                delay={`${i * 100}ms`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
