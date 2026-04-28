import React from 'react';

interface TrendingBadgeProps {
  usageCount?: number;
  className?: string;
}

export default function TrendingBadge({ usageCount, className = '' }: TrendingBadgeProps) {
  const isTrending = (usageCount || 0) > 1000;
  
  if (!isTrending) return null;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 rounded-full border border-red-500/20 animate-pulse ${className}`}>
      <span className="text-red-500 text-sm">🔥</span>
      <span className="text-red-400 text-xs font-bold uppercase tracking-wide">
        Trending
      </span>
    </div>
  );
}
