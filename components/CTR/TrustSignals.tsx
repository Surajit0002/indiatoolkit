import React from 'react';
import { Shield, Gift, Bolt, Lock, CheckCircle } from 'lucide-react';

interface TrustSignalsProps {
  variant?: 'full' | 'compact' | 'minimal';
  className?: string;
}

export default function TrustSignals({ variant = 'full', className = '' }: TrustSignalsProps) {
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <Gift className="h-3 w-3 text-emerald-500" />
          <span className="font-semibold">Free</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <Lock className="h-3 w-3 text-blue-500" />
          <span className="font-semibold">Secure</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <Bolt className="h-3 w-3 text-yellow-500" />
          <span className="font-semibold">Fast</span>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        <Badge icon={<Gift />} label="100% Free" color="emerald" />
        <Badge icon={<Lock />} label="No Signup" color="blue" />
        <Badge icon={<Bolt />} label="Instant" color="yellow" />
        <Badge icon={<Shield />} label="Secure" color="purple" />
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 ${className}`}>
      <TrustCard
        icon={<Gift className="h-8 w-8" />}
        label="100% Free Forever"
        description="No hidden fees. No premium tiers. Use all tools without limits."
        color="emerald"
      />
      <TrustCard
        icon={<Lock className="h-8 w-8" />}
        label="No Registration"
        description="Start using instantly. No email sign-up required. Privacy first."
        color="blue"
      />
      <TrustCard
        icon={<Bolt className="h-8 w-8" />}
        label="Lightning Fast"
        description="Instant results. Optimized for speed. Process files in seconds."
        color="yellow"
      />
      <TrustCard
        icon={<Shield className="h-8 w-8" />}
        label="100% Secure"
        description="All processing in browser. No data storage. Complete privacy."
        color="purple"
      />
    </div>
  );
}

function Badge({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  const colorMap = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${colorMap[color as keyof typeof colorMap]}`}>
      {icon}
      <span className="text-xs font-bold">{label}</span>
    </div>
  );
}

function TrustCard({ icon, label, description, color }: { icon: React.ReactNode; label: string; description: string; color: string }) {
  const bgMap = {
    emerald: 'bg-emerald-50',
    blue: 'bg-blue-50',
    yellow: 'bg-yellow-50',
    purple: 'bg-purple-50',
  };
  
  const textMap = {
    emerald: 'text-emerald-700',
    blue: 'text-blue-700',
    yellow: 'text-yellow-700',
    purple: 'text-purple-700',
  };

  return (
    <div className={`${bgMap[color as keyof typeof bgMap]} rounded-2xl p-5 border border-slate-100 hover:shadow-lg transition-all duration-300 group`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${bgMap[color as keyof typeof bgMap].replace('50', '100')} group-hover:scale-110 transition-transform`}>
          <div className={textMap[color as keyof typeof textMap]}>
            {icon}
          </div>
        </div>
        <div>
          <h3 className={`font-black text-sm ${textMap[color as keyof typeof textMap]} mb-1`}>{label}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
