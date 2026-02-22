"use client";

import { useState } from "react";
import { Copy, Check, LayoutGrid, Maximize } from "lucide-react";

interface GridConfig {
  columns: number;
  gutter: number;
  margin: number;
  maxWidth: number;
}

const presetGrids = [
  { name: '12-Column Standard', columns: 12, gutter: 24, margin: 24, maxWidth: 1200 },
  { name: '16-Column Wide', columns: 16, gutter: 20, margin: 32, maxWidth: 1400 },
  { name: '8-Column Simple', columns: 8, gutter: 32, margin: 16, maxWidth: 1024 },
];

export default function GridSystemGenerator() {
  const [config, setConfig] = useState<GridConfig>(presetGrids[0]);
  const [preset, setPreset] = useState('custom');
  const [copied, setCopied] = useState<string | null>(null);

  const handlePresetChange = (presetName: string) => {
    setPreset(presetName);
    const found = presetGrids.find(p => p.name === presetName);
    if (found) setConfig(found);
  };

  const calculateColumnWidth = () => {
    const availableWidth = config.maxWidth - (config.margin * 2) - (config.gutter * (config.columns - 1));
    return (availableWidth / config.columns).toFixed(2);
  };

  const generateCSS = () => {
   
    return `/* Grid System - ${config.columns}-Column */
:root {
  --grid-columns: ${config.columns};
  --grid-gutter: ${config.gutter}px;
  --grid-margin: ${config.margin}px;
  --grid-max-width: ${config.maxWidth}px;
}

.container {
  max-width: var(--grid-max-width);
  margin: 0 auto;
  padding: 0 var(--grid-margin);
}

.grid {
  display: grid;
  grid-template-columns: repeat(${config.columns}, 1fr);
  gap: var(--grid-gutter);
}`;
  };

  const generateTailwind = () => {
    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      container: {
        center: true,
        padding: '${config.margin}px',
      },
      gridTemplateColumns: {
        '${config.columns}': 'repeat(${config.columns}, minmax(0, 1fr))',
      },
    },
  },
};`;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-indigo-200">
                <LayoutGrid className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Grid System Generator</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Custom Columns & Gutters</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Grid Preset</label>
                <select
                  value={preset}
                  onChange={(e) => handlePresetChange(e.target.value)}
                  className="w-full h-14 px-4 bg-slate-50 rounded-[24px] border border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold text-sm"
                >
                  <option value="custom">Custom</option>
                  {presetGrids.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Columns</label>
                  <span className="text-[9px] font-black text-indigo-600">{config.columns}</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={24}
                  value={config.columns}
                  onChange={(e) => setConfig({ ...config, columns: Number(e.target.value) })}
                  className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Gutter (px)</label>
                  <span className="text-[9px] font-black text-indigo-600">{config.gutter}px</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={64}
                  step={4}
                  value={config.gutter}
                  onChange={(e) => setConfig({ ...config, gutter: Number(e.target.value) })}
                  className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Margin (px)</label>
                  <span className="text-[9px] font-black text-indigo-600">{config.margin}px</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={96}
                  step={8}
                  value={config.margin}
                  onChange={(e) => setConfig({ ...config, margin: Number(e.target.value) })}
                  className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-[20px]">
                <span className="text-xs font-bold text-slate-600">Column Width: {calculateColumnWidth()}px</span>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-100 rounded-[24px] p-8 border border-slate-300">
                <div 
                  className="mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
                  style={{ maxWidth: `${config.maxWidth}px` }}
                >
                  <div className="bg-slate-800 text-white text-xs font-bold px-4 py-2 flex items-center gap-2">
                    <Maximize className="h-4 w-4" />
                    {config.columns}-Column Grid
                  </div>
                  <div className="p-4">
                    <div 
                      className="grid gap-4"
                      style={{ gridTemplateColumns: `repeat(${Math.min(config.columns, 12)}, 1fr)` }}
                    >
                      {Array.from({ length: Math.min(config.columns, 12) }).map((_, i) => (
                        <div key={i} className="bg-indigo-100 border-2 border-indigo-300 rounded-lg p-4 text-center">
                          <span className="text-xs font-bold text-indigo-600">Col {i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">CSS</span>
                    <button
                      onClick={() => handleCopy(generateCSS(), 'css')}
                      className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-indigo-50"
                    >
                      {copied === 'css' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                  <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-32 text-xs">
                    <code className="text-indigo-400 font-mono">{generateCSS().slice(0, 250)}...</code>
                  </pre>
                </div>

                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">Tailwind</span>
                    <button
                      onClick={() => handleCopy(generateTailwind(), 'tailwind')}
                      className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-indigo-50"
                    >
                      {copied === 'tailwind' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                  <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-32 text-xs">
                    <code className="text-indigo-400 font-mono">{generateTailwind().slice(0, 250)}...</code>
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
