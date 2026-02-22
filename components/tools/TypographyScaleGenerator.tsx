"use client";

import { useState, useMemo } from "react";
import { Copy, Check, RefreshCw, Calculator, Sliders, ArrowUp } from "lucide-react";

type ScaleType = 'minor-third' | 'major-third' | 'perfect-fourth' | 'perfect-fifth' | 'golden-ratio';

interface ScalePreset {
  id: ScaleType;
  label: string;
  ratio: number;
  description: string;
}

const scalePresets: ScalePreset[] = [
  { id: 'minor-third', label: 'Minor Third', ratio: 1.2, description: 'Subtle progression' },
  { id: 'major-third', label: 'Major Third', ratio: 1.25, description: 'Gentle progression' },
  { id: 'perfect-fourth', label: 'Perfect Fourth', ratio: 1.333, description: 'Balanced progression' },
  { id: 'perfect-fifth', label: 'Perfect Fifth', ratio: 1.5, description: 'Strong progression' },
  { id: 'golden-ratio', label: 'Golden Ratio', ratio: 1.618, description: 'Dramatic progression' },
];

interface ScaleStep {
  level: string;
  label: string;
  size: number;
  px: string;
  rem: string;
}

export default function TypographyScaleGenerator() {
  const [baseSize, setBaseSize] = useState(16);
  const [scale, setScale] = useState<ScaleType>('perfect-fourth');
  const [scaleRatio, setScaleRatio] = useState(1.333);
  const [steps, setSteps] = useState(7);
  const [copied, setCopied] = useState<string | null>(null);

  const ratio = scalePresets.find(s => s.id === scale)?.ratio || scaleRatio;

  const scaleSteps = useMemo((): ScaleStep[] => {
    const labels = ['XS', 'S', 'Base', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    const midIndex = 2; // Base is at index 2
    
    const result: ScaleStep[] = [];
    
    // Calculate sizes below base
    for (let i = midIndex - 1; i >= 0; i--) {
      const size = baseSize / Math.pow(ratio, midIndex - i);
      result.unshift({
        level: `${midIndex - i}`,
        label: labels[i] || `${baseSize / Math.pow(ratio, midIndex - i)}px`,
        size: Number(size.toFixed(2)),
        px: `${size.toFixed(2)}px`,
        rem: `${(size / 16).toFixed(3)}rem`,
      });
    }
    
    // Base size
    result.push({
      level: '0',
      label: 'Base',
      size: baseSize,
      px: `${baseSize}px`,
      rem: '1rem',
    });
    
    // Calculate sizes above base
    for (let i = midIndex + 1; i <= steps; i++) {
      const size = baseSize * Math.pow(ratio, i - midIndex);
      result.push({
        level: `+${i - midIndex}`,
        label: labels[i] || `${baseSize * Math.pow(ratio, i - midIndex)}px`,
        size: Number(size.toFixed(2)),
        px: `${size.toFixed(2)}px`,
        rem: `${(size / 16).toFixed(3)}rem`,
      });
    }
    
    return result;
  }, [baseSize, ratio, steps]);

  const generateCSS = () => {
    let css = `/* Typography Scale\n`;
    css += ` * Base: ${baseSize}px\n`;
    css += ` * Scale: ${scalePresets.find(s => s.id === scale)?.label || 'Custom'} (${ratio.toFixed(3)})\n`;
    css += ` * Steps: ${steps + 1}\n`;
    css += ` */\n\n`;
    css += `:root {\n`;
    css += `  /* Font Sizes */\n`;
    
    scaleSteps.forEach((step) => {
      css += `  --font-size-${step.label.toLowerCase().replace(/[0-9]/g, '')}: ${step.rem};\n`;
    });
    
    css += `\n  /* Line Heights */\n`;
    scaleSteps.forEach((step) => {
      const lineHeight = step.size > 24 ? 1.2 : step.size > 18 ? 1.3 : 1.5;
      css += `  --line-height-${step.label.toLowerCase().replace(/[0-9]/g, '')}: ${lineHeight};\n`;
    });
    
    css += `}\n\n`;
    css += `/* Usage Examples */\n`;
    css += `h1 { font-size: var(--font-size-xxl); line-height: var(--line-height-xxl); }\n`;
    css += `h2 { font-size: var(--font-size-xl); line-height: var(--line-height-xl); }\n`;
    css += `h3 { font-size: var(--font-size-l); line-height: var(--line-height-l); }\n`;
    css += `body { font-size: var(--font-size-base); line-height: var(--line-height-base); }\n`;
    css += `small { font-size: var(--font-size-s); line-height: var(--line-height-s); }\n`;
    
    return css;
  };

  const generateTailwindConfig = () => {
    let config = `// tailwind.config.js\n`;
    config += `module.exports = {\n`;
    config += `  theme: {\n`;
    config += `    extend: {\n`;
    config += `      fontSize: {\n`;
    
    scaleSteps.forEach((step) => {
      const name = step.label.toLowerCase().replace(/[0-9]/g, '');
      config += `        '${name}': ['${step.rem}', { lineHeight: '${step.size > 24 ? 1.2 : step.size > 18 ? 1.3 : 1.5}' }],\n`;
    });
    
    config += `      },\n`;
    config += `    },\n`;
    config += `  },\n`;
    config += `};\n`;
    
    return config;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const exportFormats = [
    { id: 'css', label: 'CSS Variables', generator: generateCSS },
    { id: 'tailwind', label: 'Tailwind Config', generator: generateTailwindConfig },
    { id: 'json', label: 'JSON', generator: () => JSON.stringify(scaleSteps, null, 2) },
  ];

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-teal-200">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Typography Scale Generator</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Modular Scale System</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Base Size</label>
                <span className="text-[9px] font-black text-teal-600">{baseSize}px</span>
              </div>
              
              <input
                type="range"
                min={12}
                max={24}
                value={baseSize}
                onChange={(e) => setBaseSize(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  value={baseSize}
                  onChange={(e) => setBaseSize(Number(e.target.value))}
                  className="w-20 h-10 px-3 bg-slate-50 rounded-xl font-bold text-center text-sm"
                />
                <span className="text-xs text-slate-400 font-bold">px (body text)</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Scale Ratio</label>
                <span className="text-[9px] font-black text-teal-600">{ratio.toFixed(3)}</span>
              </div>
              
              <select
                value={scale}
                onChange={(e) => {
                  setScale(e.target.value as ScaleType);
                  const preset = scalePresets.find(s => s.id === e.target.value);
                  if (preset) setScaleRatio(preset.ratio);
                }}
                className="w-full h-14 px-4 bg-slate-50 rounded-[24px] border border-slate-100 focus:outline-none focus:ring-4 focus:ring-teal-500/10 font-bold text-sm"
              >
                {scalePresets.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label} ({preset.ratio.toFixed(3)})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Steps</label>
                <span className="text-[9px] font-black text-teal-600">{steps + 1} sizes</span>
              </div>
              
              <input
                type="range"
                min={3}
                max={9}
                value={steps}
                onChange={(e) => setSteps(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex gap-2 justify-center">
                {Array.from({ length: steps + 1 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-8 rounded ${
                      i === 2 ? 'bg-teal-500' : 'bg-slate-200'
                    }`}
                    style={{ height: `${16 + i * 4}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Generated Scale</label>
              <div className="flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-teal-400" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Hierarchy</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Label</th>
                    <th className="text-left py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Size</th>
                    <th className="text-left py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Pixels</th>
                    <th className="text-left py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">REM</th>
                    <th className="text-left py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {scaleSteps.map((step, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-slate-100 ${index === 2 ? 'bg-teal-50' : ''}`}
                    >
                      <td className="py-3 px-4">
                        <span className={`font-bold ${index === 2 ? 'text-teal-600' : 'text-slate-700'}`}>
                          {step.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-500">{step.level}</td>
                      <td className="py-3 px-4 font-mono text-sm text-slate-600">{step.px}</td>
                      <td className="py-3 px-4 font-mono text-sm text-slate-600">{step.rem}</td>
                      <td className="py-3 px-4">
                        <span 
                          className="text-slate-800"
                          style={{ fontSize: `${Math.min(step.size, 32)}px` }}
                        >
                          Aa
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Export Format</label>
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-slate-300" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">3 Options</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {exportFormats.map((format) => (
                <div 
                  key={format.id}
                  className="bg-slate-50 rounded-[24px] p-6 border border-slate-100 hover:border-teal-200 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-teal-600 uppercase tracking-wider">{format.label}</span>
                    <button
                      onClick={() => handleCopy(format.generator(), format.id)}
                      className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-teal-50 hover:border-teal-300 transition-all"
                    >
                      {copied === format.id ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                  <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-32 text-xs">
                    <code className="text-teal-400 font-mono">{format.generator().slice(0, 200)}...</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-slate-50">
            <button
              onClick={() => { setBaseSize(16); setScale('perfect-fourth'); setSteps(7); }}
              className="h-16 px-8 bg-slate-100 text-slate-400 rounded-[24px] hover:bg-red-50 hover:text-red-600 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-3 font-black uppercase tracking-widest"
            >
              <RefreshCw className="h-6 w-6" />
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
