"use client";

import { useState } from "react";
import { Copy, Check, Smartphone, Tablet, Monitor, Grid, Layers } from "lucide-react";

type ScreenSize = 'mobile' | 'tablet' | 'desktop';

interface Breakpoint {
  name: string;
  minWidth: number;
  maxWidth: number;
  columns: number;
  gutter: number;
  margin: number;
}

const presetSizes: Record<ScreenSize, { width: number; height: number; label: string }> = {
  mobile: { width: 375, height: 667, label: 'iPhone SE' },
  tablet: { width: 768, height: 1024, label: 'iPad' },
  desktop: { width: 1440, height: 900, label: 'Desktop' },
};

const gridPresets = [
  { name: 'Bootstrap', breakpoints: [
    { name: 'xs', minWidth: 0, maxWidth: 575, columns: 12, gutter: 24, margin: 16 },
    { name: 'sm', minWidth: 576, maxWidth: 767, columns: 12, gutter: 24, margin: 16 },
    { name: 'md', minWidth: 768, maxWidth: 991, columns: 12, gutter: 24, margin: 24 },
    { name: 'lg', minWidth: 992, maxWidth: 1199, columns: 12, gutter: 24, margin: 24 },
    { name: 'xl', minWidth: 1200, maxWidth: 1399, columns: 12, gutter: 30, margin: 32 },
    { name: 'xxl', minWidth: 1400, maxWidth: Infinity, columns: 12, gutter: 30, margin: 48 },
  ]},
  { name: 'Tailwind', breakpoints: [
    { name: 'sm', minWidth: 640, maxWidth: 767, columns: 12, gutter: 24, margin: 16 },
    { name: 'md', minWidth: 768, maxWidth: 1023, columns: 12, gutter: 24, margin: 24 },
    { name: 'lg', minWidth: 1024, maxWidth: 1279, columns: 12, gutter: 32, margin: 32 },
    { name: 'xl', minWidth: 1280, maxWidth: 1535, columns: 12, gutter: 32, margin: 32 },
    { name: '2xl', minWidth: 1536, maxWidth: Infinity, columns: 12, gutter: 32, margin: 48 },
  ]},
  { name: 'Custom', breakpoints: [] as Breakpoint[] },
];

export default function ResponsiveLayoutGenerator() {
  const [preset, setPreset] = useState('Bootstrap');
  const [breakpoints, setBreakpoints] = useState<Breakpoint[]>(gridPresets[0].breakpoints);
  const [selectedView, setSelectedView] = useState<ScreenSize>('desktop');
  const [copied, setCopied] = useState<string | null>(null);

  const currentSize = presetSizes[selectedView];
  const activeBreakpoint = breakpoints.find(bp => 
    currentSize.width >= bp.minWidth && currentSize.width <= bp.maxWidth
  ) || breakpoints[0];

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const generateCSS = () => {
    let css = `/* Responsive Grid System - ${preset} */\n\n`;
    css += `:root {\n`;
    breakpoints.forEach(bp => {
      css += `  --grid-columns-${bp.name}: ${bp.columns};\n`;
      css += `  --grid-gutter-${bp.name}: ${bp.gutter}px;\n`;
      css += `  --grid-margin-${bp.name}: ${bp.margin}px;\n`;
    });
    css += `}\n\n`;
    
    css += `.container {\n`;
    css += `  margin: 0 auto;\n`;
    css += `  padding: 0 var(--grid-margin-xs);\n`;
    css += `}\n\n`;
    
    breakpoints.forEach(bp => {
      const query = bp.minWidth === 0 
        ? `@media (max-width: ${bp.maxWidth}px)`
        : `@media (min-width: ${bp.minWidth}px)`;
      css += `${query} {\n`;
      css += `  .container {\n`;
      css += `    max-width: ${bp.maxWidth === Infinity ? '100%' : bp.maxWidth + 'px'};\n`;
      css += `    padding: 0 ${bp.margin}px;\n`;
      css += `  }\n`;
      css += `  .grid {\n`;
      css += `    display: grid;\n`;
      css += `    grid-template-columns: repeat(${bp.columns}, 1fr);\n`;
      css += `    gap: ${bp.gutter}px;\n`;
      css += `  }\n`;
      css += `}\n\n`;
    });
    
    return css;
  };

  const generateTailwind = () => {
    let config = `// tailwind.config.js - ${preset} breakpoints\n`;
    config += `module.exports = {\n`;
    config += `  theme: {\n`;
    config += `    screens: {\n`;
    breakpoints.forEach(bp => {
      const value = bp.minWidth === 0 ? `${bp.maxWidth}px` : `${bp.minWidth}px`;
      config += `      '${bp.name}': '${value}',\n`;
    });
    config += `    },\n`;
    config += `    extend: {\n`;
    config += `      spacing: {\n`;
    config += `        'gutter': '24px',\n`;
    config += `      },\n`;
    config += `    },\n`;
    config += `  },\n`;
    config += `};\n`;
    return config;
  };

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-blue-200">
                <Grid className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Responsive Layout Generator</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Grid & Breakpoints</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Grid Preset</label>
                <select
                  value={preset}
                  onChange={(e) => {
                    setPreset(e.target.value);
                    const p = gridPresets.find(p => p.name === e.target.value);
                    setBreakpoints(p?.breakpoints || []);
                  }}
                  className="w-full h-14 px-4 bg-slate-50 rounded-[24px] border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-bold text-sm"
                >
                  {gridPresets.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">View Size</label>
                <div className="flex gap-2">
                  {(['mobile', 'tablet', 'desktop'] as ScreenSize[]).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedView(size)}
                      className={`flex-1 p-3 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                        selectedView === size 
                          ? 'bg-blue-50 border-blue-300 text-blue-600' 
                          : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-blue-200'
                      }`}
                    >
                      {size === 'mobile' && <Smartphone className="h-5 w-5" />}
                      {size === 'tablet' && <Tablet className="h-5 w-5" />}
                      {size === 'desktop' && <Monitor className="h-5 w-5" />}
                      <span className="text-xs font-bold capitalize">{size}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 p-4 bg-slate-50 rounded-[20px]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">Current View</span>
                  <span className="text-xs font-black text-blue-600">{currentSize.width} × {currentSize.height}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">Active Breakpoint</span>
                  <span className="text-xs font-black text-blue-600 uppercase">{activeBreakpoint?.name}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Breakpoints</label>
                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                  <div className="space-y-3">
                    {breakpoints.map((bp) => (
                      <div key={bp.name} className="flex items-center gap-4 p-3 bg-white rounded-xl border border-slate-200">
                        <span className="w-16 text-xs font-black text-blue-600 uppercase">{bp.name}</span>
                        <span className="text-xs text-slate-500">{bp.minWidth}px</span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500"
                            style={{ 
                              width: `${((bp.maxWidth - bp.minWidth) / (breakpoints[breakpoints.length - 1].maxWidth - breakpoints[0].minWidth)) * 100}%`,
                              marginLeft: `${((bp.minWidth - breakpoints[0].minWidth) / (breakpoints[breakpoints.length - 1].maxWidth - breakpoints[0].minWidth)) * 100}%`
                            }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">{bp.maxWidth === Infinity ? '∞' : bp.maxWidth}px</span>
                        <span className="text-xs text-slate-500">{bp.columns} cols</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Preview</label>
                <div 
                  className="bg-slate-100 rounded-[24px] p-8 border border-slate-300 overflow-hidden"
                  style={{ maxWidth: `${currentSize.width}px` }}
                >
                  <div 
                    className="mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
                    style={{ width: '100%' }}
                  >
                    <div className="bg-slate-800 text-white text-xs font-bold px-4 py-2 flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      {currentSize.label} - {currentSize.width} × {currentSize.height}
                    </div>
                    <div className="p-4">
                      <div 
                        className="grid gap-4"
                        style={{ 
                          gridTemplateColumns: `repeat(${activeBreakpoint?.columns || 12}, 1fr)`,
                        }}
                      >
                        {Array.from({ length: activeBreakpoint?.columns || 12 }).map((_, i) => (
                          <div 
                            key={i}
                            className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center"
                          >
                            <span className="text-xs font-bold text-blue-600">Col {i + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Export Code</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">CSS Grid</span>
                  <button
                    onClick={() => handleCopy(generateCSS(), 'css')}
                    className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition-all"
                  >
                    {copied === 'css' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                  </button>
                </div>
                <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-40 text-xs">
                  <code className="text-blue-400 font-mono">{generateCSS().slice(0, 400)}...</code>
                </pre>
              </div>
              
              <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Tailwind Config</span>
                  <button
                    onClick={() => handleCopy(generateTailwind(), 'tailwind')}
                    className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition-all"
                  >
                    {copied === 'tailwind' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                  </button>
                </div>
                <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-40 text-xs">
                  <code className="text-blue-400 font-mono">{generateTailwind().slice(0, 400)}...</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
