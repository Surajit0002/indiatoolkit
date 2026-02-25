'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for AnimatedCounter
const AnimatedCounter = dynamic(() => import('@/components/AnimatedCounter'), {
  ssr: false,
  loading: () => <div className="text-4xl md:text-6xl font-black text-white">0</div>
});

interface StatItem {
  value: number;
  label: string;
  suffix: string;
  decimals?: number;
}

function StatCard({ value, label, suffix, decimals = 0 }: StatItem) {
  return (
    <div className="text-center p-4">
      <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2">
        <AnimatedCounter end={value} suffix={suffix} decimals={decimals} duration={2000} />
      </div>
      <div className="text-sm font-semibold text-white/80 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const stats: StatItem[] = [
    { value: 500, label: 'Tools Available', suffix: '+' },
    { value: 1000000, label: 'Active Users', suffix: '+' },
    { value: 10000000, label: 'Tasks Completed', suffix: '+' },
    { value: 99.9, label: 'Uptime %', suffix: '%', decimals: 1 },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] left-[-25%] w-[200%] h-[200%] bg-white/5 rounded-full blur-[80px] md:blur-[100px] animate-pulse"></div>
      </div>

      <div className="container px-4 relative z-10">
        {/* Stats Grid - Mobile Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
