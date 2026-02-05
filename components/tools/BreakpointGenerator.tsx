"use client";

import { useState } from "react";
import { Copy, Check, Smartphone, Tablet, Monitor, Watch } from "lucide-react";

interface Breakpoint {
  name: string;
  minWidth: number;
  maxWidth: number;
  description: string;
}

const commonBreakpoints = [
  { name: 'watch', minWidth: 0, maxWidth: 299, description: 'Smartwatches' },
  { name: 'mobile', minWidth: 300, maxWidth: 599, description: 'Mobile phones' },
  { name: 'tablet', minWidth: 600, maxWidth: 899, description: 'Tablets' },
  { name: 'laptop', minWidth: 900, maxWidth: 1299, description: 'Laptops' },
  { name: 'desktop', minWidth: 1300, maxWidth: 1599, description: 'Desktops' },
  { name: 'wide', minWidth: 1600, maxWidth: Infinity, description: 'Large screens' },
];

const presetConfigs = [
  { name: 'Standard', breakpoints: commonBreakpoints },
  { name: 'Bootstrap 5', breakpoints: [
    { name: 'xs', minWidth: 0, maxWidth: 575, description: 'Extra small' },
    { name: 'sm', minWidth: 576, maxWidth: 767, description: 'Small' },
    { name: 'md', minWidth: 768, maxWidth: 991, description: 'Medium' },
    { name: 'lg', minWidth: 992, maxWidth: 1199, description: 'Large' },
    { name: 'xl', minWidth: 1200, maxWidth: 1399, description: 'Extra large' },
    { name: 'xxl', minWidth: 1400, maxWidth: Infinity, description: 'XXL' },
  ]},
  { name: 'Tailwind', breakpoints: [
    { name: 'sm', minWidth: 640, maxWidth: 767, description: 'Small' },
    { name: 'md', minWidth: 768, maxWidth: 1023, description: 'Medium' },
    { name: 'lg', minWidth: 1024, maxWidth: 1279, description: 'Large' },
    { name: 'xl', minWidth: 1280, maxWidth: 1535, description: 'Extra large' },
    { name: '2xl', minWidth: 1536, maxWidth: Infinity, description: '2X Large' },
  ]},
];

export default function BreakpointGenerator() {
  const [preset, setPreset] = useState('Standard');
  const [breakpoints, setBreakpoints] = useState<Breakpoint[]>(commonBreakpoints);
  const [copied, setCopied] = useState<string | null>(null);

  const handlePresetChange = (presetName: string) => {
    setPreset(presetName);
    const config = presetConfigs.find(p => p.name === presetName);
    if (config) setBreakpoints(config.breakpoints);
  };

  const generateCSS = () => {
    let css = `/* Breakpoints - ${preset} */\n:root {\n`;
    breakpoints.forEach(bp => {
      css += `  --bp-${bp.name}-min: ${bp.minWidth}px;\n`;
      css += `  --bp-${bp.name}-max: ${bp.maxWidth === Infinity ? 'Infinity' : bp.maxWidth + 'px'};\n`;
    });
    css += `}\n\n`;
    breakpoints.forEach(bp => {
      if (bp.minWidth === 0) {
        css += `@media (max-width: ${bp.maxWidth}px) { /* ${bp.description} */ }\n\n`;
      } else if (bp.maxWidth === Infinity) {
        css += `@media (min-width: ${bp.minWidth}px) { /* ${bp.description} */ }\n\n`;
      } else {
        css += `@media (min-width: ${bp.minWidth}px) and (max-width: ${bp.maxWidth}px) { /* ${bp.description} */ }\n\n`;
      }
    });
    return css;
  };

  const generateTailwind = () => {
    let config = `// tailwind.config.js - ${preset} breakpoints\nmodule.exports = {\n  theme: {\n    extend: {\n      screens: {\n`;
    breakpoints.forEach(bp => {
      const value = bp.minWidth === 0 ? `${bp.maxWidth}px` : `${bp.minWidth}px`;
      config += `        '${bp.name}': '${value}',\n`;
    });
    config += `      },\n    },\n  },\n};\n`;
    return config;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'watch': return Watch;
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      case 'laptop': return Smartphone;
      default: return Monitor;
    }
  };

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-amber-200">
                <Monitor className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Breakpoint Generator</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Responsive Media Queries</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Preset</label>
                <select
                  value={preset}
                  onChange={(e) => handlePresetChange(e.target.value)}
                  className="w-full h-14 px-4 bg-slate-50 rounded-[24px] border border-slate-100 focus:outline-none focus:ring-4 focus:ring-amber-500/10 font-bold text-sm"
                >
                  {presetConfigs.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Breakpoints</label>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {breakpoints.map((bp, index) => {
                    const Icon = getIcon(bp.name);
                    return (
                      <div key={index} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-amber-500" />
                          <span className="font-bold text-sm w-16">{bp.name}</span>
                          <span className="text-xs text-slate-500">{bp.minWidth}-{bp.maxWidth}px</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-100 rounded-[24px] p-6 border border-slate-300">
                <div className="relative h-16 bg-white rounded-lg flex items-end">
                  {breakpoints.map((bp, index) => {
                    const width = bp.maxWidth === Infinity ? 50 : ((bp.maxWidth - bp.minWidth) / 2000) * 100;
                    return (
                      <div
                        key={index}
                        className="h-full border-r-2 border-amber-400 flex items-end p-1"
                        style={{ width: `${Math.max(width, 10)}%` }}
                      >
                        <span className="text-xs font-bold text-amber-600">{bp.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider">CSS</span>
                    <button
                      onClick={() => handleCopy(generateCSS(), 'css')}
                      className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-amber-50"
                    >
                      {copied === 'css' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                  <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-32 text-xs">
                    <code className="text-amber-400 font-mono">{generateCSS().slice(0, 300)}...</code>
                  </pre>
                </div>

                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider">Tailwind</span>
                    <button
                      onClick={() => handleCopy(generateTailwind(), 'tailwind')}
                      className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-amber-50"
                    >
                      {copied === 'tailwind' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                  <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-32 text-xs">
                    <code className="text-amber-400 font-mono">{generateTailwind().slice(0, 300)}...</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
