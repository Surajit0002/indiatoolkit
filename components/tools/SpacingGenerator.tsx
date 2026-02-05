"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Ruler, Grid3X3, ArrowRight } from "lucide-react";

type SpacingScale = '8pt' | '4pt' | 'fibonacci' | 'golden-ratio' | 'major-third';

interface SpacingValue {
  name: string;
  px: number;
  rem: number;
}

const scaleConfigs: Record<SpacingScale, { base: number; multiplier: number[]; name: string }> = {
  '8pt': { base: 8, multiplier: [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8, 12, 16], name: '8-Point Grid' },
  '4pt': { base: 4, multiplier: [0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16], name: '4-Point Grid' },
  'fibonacci': { base: 16, multiplier: [0.25, 0.375, 0.5, 0.75, 1, 1.5, 2.5, 4, 6.5, 10.5, 17, 27.5], name: 'Fibonacci Scale' },
  'golden-ratio': { base: 16, multiplier: [0.25, 0.382, 0.618, 1, 1.618, 2.618, 4.236, 6.854, 11.09, 17.94, 29.03, 46.97], name: 'Golden Ratio' },
  'major-third': { base: 16, multiplier: [0.25, 0.5, 0.75, 1, 1.25, 1.563, 1.953, 2.441, 3.052, 3.815, 4.768, 5.96], name: 'Major Third' },
};

const scaleNames = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl'];

export default function SpacingGenerator() {
  const [scale, setScale] = useState<SpacingScale>('8pt');
  const [baseSize, setBaseSize] = useState(16);
  const [copied, setCopied] = useState<string | null>(null);

  const spacingValues = useMemo((): SpacingValue[] => {
    const config = scaleConfigs[scale];
    return config.multiplier.map((mult, index) => ({
      name: scaleNames[index] || `${index + 1}`,
      px: Math.round(config.base * mult),
      rem: Number((config.base * mult / baseSize).toFixed(3)),
    }));
  }, [scale, baseSize]);

  const generateCSS = () => {
    let css = `/* Spacing Scale - ${scaleConfigs[scale].name} */\n:root {\n`;
    spacingValues.forEach((space) => {
      css += `  --space-${space.name}: ${space.rem}rem; /* ${space.px}px */\n`;
    });
    css += `}\n`;
    return css;
  };

  const generateTailwind = () => {
    let config = `// tailwind.config.js - Spacing Scale\nmodule.exports = {\n  theme: {\n    extend: {\n      spacing: {\n`;
    spacingValues.forEach((space) => {
      config += `        '${space.name}': '${space.rem}rem',\n`;
    });
    config += `      },\n    },\n  },\n};\n`;
    return config;
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
              <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-emerald-200">
                <Ruler className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Spacing Generator</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Consistent Spacing System</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Spacing Scale</label>
                <select
                  value={scale}
                  onChange={(e) => setScale(e.target.value as SpacingScale)}
                  className="w-full h-14 px-4 bg-slate-50 rounded-[24px] border border-slate-100 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-sm"
                >
                  {Object.entries(scaleConfigs).map(([key, config]) => (
                    <option key={key} value={key}>{config.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Base Size</label>
                  <span className="text-[9px] font-black text-emerald-600">{baseSize}px</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={20}
                  value={baseSize}
                  onChange={(e) => setBaseSize(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
                <input
                  type="number"
                  value={baseSize}
                  onChange={(e) => setBaseSize(Number(e.target.value))}
                  className="w-full h-10 px-3 bg-slate-50 rounded-xl font-bold text-center text-sm"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-[20px]">
                <div className="flex items-center gap-2 mb-3">
                  <Grid3X3 className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-bold text-slate-600 uppercase">Scale Preview</span>
                </div>
                <div className="space-y-2">
                  {spacingValues.slice(0, 6).map((space) => (
                    <div key={space.name} className="flex items-center gap-3">
                      <span className="w-12 text-xs text-slate-500">{space.name}</span>
                      <div 
                        className="h-4 bg-emerald-400 rounded"
                        style={{ width: `${Math.min(space.px * 2, 120)}px` }}
                      />
                      <span className="text-xs text-slate-400">{space.px}px</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Generated Spacing Values</label>
                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Name</th>
                        <th className="text-left py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Pixels</th>
                        <th className="text-left py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">REM</th>
                        <th className="text-left py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Visual</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spacingValues.map((space, index) => (
                        <tr 
                          key={space.name} 
                          className={`border-b border-slate-100 ${index === 2 ? 'bg-emerald-50' : ''}`}
                        >
                          <td className="py-3 px-4">
                            <span className={`font-bold ${index === 2 ? 'text-emerald-600' : 'text-slate-700'}`}>
                              {space.name}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono text-sm text-slate-600">{space.px}px</td>
                          <td className="py-3 px-4 font-mono text-sm text-slate-600">{space.rem}rem</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div 
                                className="h-4 bg-emerald-500 rounded"
                                style={{ width: `${Math.min(space.px * 3, 150)}px` }}
                              />
                              <ArrowRight className="h-3 w-3 text-slate-300" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">CSS Variables</span>
                    <button
                      onClick={() => handleCopy(generateCSS(), 'css')}
                      className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-all"
                    >
                      {copied === 'css' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                  <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-32 text-xs">
                    <code className="text-emerald-400 font-mono">{generateCSS().slice(0, 300)}...</code>
                  </pre>
                </div>

                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Tailwind</span>
                    <button
                      onClick={() => handleCopy(generateTailwind(), 'tailwind')}
                      className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-all"
                    >
                      {copied === 'tailwind' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                  <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-32 text-xs">
                    <code className="text-emerald-400 font-mono">{generateTailwind().slice(0, 300)}...</code>
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
