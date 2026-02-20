"use client";

import { useState, useEffect } from "react";
import { Monitor, Maximize, AppWindow } from "lucide-react";

interface ScreenMetrics {
  screenWidth: number;
  screenHeight: number;
  availWidth: number;
  availHeight: number;
  windowWidth: number;
  windowHeight: number;
  pixelRatio: number;
  colorDepth: number;
  orientation: string;
}

export default function ScreenResolution() {
  const [metrics, setMetrics] = useState<ScreenMetrics | null>(null);

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics({
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        pixelRatio: window.devicePixelRatio,
        colorDepth: window.screen.colorDepth,
        orientation: window.screen.orientation?.type || "unknown",
      });
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, []);

  if (!metrics) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="glass-card p-12 bg-blue-600 text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
        <Monitor className="h-48 w-48 text-white/5 absolute -right-8 -bottom-8" />
        <p className="text-blue-200 text-xs font-black uppercase tracking-[0.2em] mb-4">Your Screen Resolution</p>
        <h2 className="text-6xl md:text-8xl font-black tabular-nums tracking-tighter">
          {metrics.screenWidth} <span className="text-blue-300">×</span> {metrics.screenHeight}
        </h2>
        <div className="mt-8 px-4 py-2 bg-white/20 rounded-full font-black text-sm uppercase tracking-widest">
            {metrics.pixelRatio}x Retina / High DPI
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard 
            icon={<AppWindow className="h-6 w-6" />} 
            label="Browser Window Size" 
            value={`${metrics.windowWidth} × ${metrics.windowHeight}`} 
            desc="Current viewport size"
        />
        <MetricCard 
            icon={<Maximize className="h-6 w-6" />} 
            label="Available Work Area" 
            value={`${metrics.availWidth} × ${metrics.availHeight}`} 
            desc="Excluding taskbars/docks"
        />
      </div>

      <div className="glass-card p-8">
         <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">Detailed Display Specs</h3>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <SpecItem label="Aspect Ratio" value={calculateAspectRatio(metrics.screenWidth, metrics.screenHeight)} />
            <SpecItem label="Color Depth" value={`${metrics.colorDepth}-bit`} />
            <SpecItem label="Orientation" value={metrics.orientation.split('-')[0].toUpperCase()} />
            <SpecItem label="Pixel Ratio" value={`${metrics.pixelRatio.toFixed(2)}`} />
         </div>
      </div>
    </div>
  );
}

function calculateAspectRatio(w: number, h: number) {
    const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
    const r = gcd(w, h);
    return `${w/r}:${h/r}`;
}

function MetricCard({ icon, label, value, desc }: { icon: React.ReactNode; label: string; value: string | number; desc: string }) {
    return (
        <div className="glass-card p-8 flex items-center gap-6 group hover:border-blue-600/30 transition-all">
            <div className="p-4 bg-blue-600/10 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{label}</p>
                <p className="text-2xl font-black tabular-nums">{value}</p>
                <p className="text-xs text-gray-400 font-bold">{desc}</p>
            </div>
        </div>
    )
}

function SpecItem({ label, value }: { label: string; value: string | number }) {
    return (
        <div>
            <p className="text-[10px] font-black uppercase text-gray-400 mb-2">{label}</p>
            <p className="font-black text-lg">{value}</p>
        </div>
    )
}
