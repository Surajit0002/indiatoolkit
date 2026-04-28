import React from 'react';
import { Shield, Bolt, Gift, Lock, CheckCircle } from 'lucide-react';

interface TrustBadgesProps {
  variant?: 'default' | 'compact' | 'minimal';
  className?: string;
}

export default function TrustBadges({ variant = 'default', className = '' }: TrustBadgesProps) {
  const badges = [
    {
      icon: <Gift className="h-5 w-5 text-emerald-500" />,
      label: '100% Free',
      description: 'No hidden fees',
    },
    {
      icon: <Lock className="h-5 w-5 text-blue-500" />,
      label: 'No Signup',
      description: 'Use instantly',
    },
    {
      icon: <Bolt className="h-5 w-5 text-yellow-500" />,
      label: 'Instant',
      description: 'Fast results',
    },
    {
      icon: <Shield className="h-5 w-5 text-purple-500" />,
      label: 'Secure',
      description: 'Private & safe',
    },
  ];

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center gap-1.5 text-sm text-slate-600">
            {badge.icon}
            <span className="font-bold">{badge.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {badges.map((badge, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-slate-100 shadow-sm text-xs"
          >
            {badge.icon}
            <span className="font-bold text-slate-700">{badge.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-slate-50 group-hover:scale-110 transition-transform">
                {badge.icon}
              </div>
              <div>
                <div className="font-black text-slate-900 text-lg">{badge.label}</div>
                <div className="text-xs text-slate-500">{badge.description}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
              <CheckCircle className="h-3 w-3" />
              <span>Guaranteed</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
