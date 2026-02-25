'use client';

import React from 'react';
import { Shield, Lock, Eye, Globe, CheckCircle, LucideIcon } from 'lucide-react';

interface SecurityFeatureProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

function SecurityFeatureCard({ icon: Icon, title, desc, color }: SecurityFeatureProps) {
  return (
    <div className="flex items-start gap-3 md:gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
      <div 
        className="h-11 md:h-12 w-11 md:w-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-5 md:h-6 w-5 md:w-6" />
      </div>
      <div>
        <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
    </div>
  );
}

interface BadgeProps {
  text: string;
}

function SecurityBadge({ text }: BadgeProps) {
  return (
    <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
      <CheckCircle className="h-4 w-4 text-green-500" />
      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">{text}</span>
    </div>
  );
}

export default function TrustSecuritySection() {
  const securityFeatures: SecurityFeatureProps[] = [
    { icon: Shield, title: 'Bank-Level Security', desc: '256-bit SSL encryption', color: '#10b981' },
    { icon: Lock, title: 'No Data Storage', desc: 'Client-side processing', color: '#8b5cf6' },
    { icon: Eye, title: 'Privacy First', desc: 'No tracking or logging', color: '#f97316' },
    { icon: Globe, title: 'Global CDN', desc: 'Fast worldwide access', color: '#3b82f6' },
  ];

  const badges = ['SSL Secured', 'GDPR Compliant', 'No Cookies', 'Open Source'];

  return (
    <section className="py-16 md:py-20 bg-white border-y border-slate-100">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 md:mb-4">
              Trusted by Millions, <span className="text-green-600">Secure by Design</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Your security and privacy are our top priorities
            </p>
          </div>

          {/* Security Features Grid - Mobile Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {securityFeatures.map((feature, i) => (
              <SecurityFeatureCard key={i} {...feature} />
            ))}
          </div>

          {/* Security Badges - Mobile Responsive */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-10 md:mt-12 pt-10 md:pt-12 border-t border-slate-100">
            {badges.map((badge, i) => (
              <SecurityBadge key={i} text={badge} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
