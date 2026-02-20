"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Calculator, ArrowRight, RefreshCw } from "lucide-react";

const ratioPresets: Record<string, number> = {
  '16:9': 16 / 9,
  '4:3': 4 / 3,
  '3:2': 3 / 2,
  '1:1': 1,
  '9:16': 9 / 16,
  '21:9': 21 / 9,
  'golden': 1.618,
};

export default function LayoutRatioCalculator() {
  const [selectedRatio, setSelectedRatio] = useState('16:9');
  const [baseValue, setBaseValue] = useState(1920);
  const [isWidth, setIsWidth] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  const ratio = ratioPresets[selectedRatio];

  const calculated = useMemo(() => {
    if (isWidth) {
      return { width: baseValue, height: Math.round(baseValue / ratio) };
    } else {
      return { height: baseValue, width: Math.round(baseValue * ratio) };
    }
  }, [baseValue, ratio, isWidth]);

  const commonSizes = useMemo(() => {
    const sizes = [
      { name: 'Favicon', base: 16 },
      { name: 'Icon', base: 32 },
      { name: 'App Icon', base: 128 },
      { name: 'OG Image', base: 1200 },
      { name: 'HD Video', base: 1920 },
    ];
    return sizes.map(s => ({
      ...s,
      width: Math.round(isWidth ? s.base : s.base * ratio),
      height: Math.round(isWidth ? s.base / ratio : s.base),
    }));
  }, [ratio, isWidth]);

  const generateCSS = () => {
    return `/* Aspect Ratio - ${selectedRatio} */
.aspect-ratio-${selectedRatio.replace(':', '-')} {
  aspect-ratio: ${ratio};
}

.dimension-${selectedRatio.replace(':', '-')} {
  width: ${calculated.width}px;
  height: ${calculated.height}px;
}`;
  };

  const generateTailwind = () => {
    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      aspectRatio: {
        '${selectedRatio}': ${ratio},
      },
    },
  },
};`;
  };

  const generateJSON = () => {
    return JSON.stringify({
      ratio: selectedRatio,
      value: ratio,
      dimensions: calculated,
    }, null, 2);
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleReset = () => {
    setBaseValue(1920);
    setSelectedRatio('16:9');
    setIsWidth(true);
  };

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-cyan-200">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Layout Ratio Calculator</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Aspect Ratio Calculator</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="h-12 w-12 bg-slate-100 rounded-[20px] flex items-center justify-center hover:bg-red-50 transition-all"
            >
              <RefreshCw className="h-5 w-5 text-slate-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Aspect Ratio</label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.keys(ratioPresets).map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRatio(r)}
                      className={`p-2 rounded-lg border text-sm font-bold transition-all ${
                        selectedRatio === r 
                          ? 'bg-cyan-50 border-cyan-300 text-cyan-600' 
                          : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-cyan-200'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Base Value</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsWidth(true)}
                    className={`flex-1 py-2 rounded-lg border text-sm font-bold transition-all ${
                      isWidth ? 'bg-cyan-50 border-cyan-300 text-cyan-600' : 'bg-slate-50 border-slate-100 text-slate-500'
                    }`}
                  >
                    Width
                  </button>
                  <button
                    onClick={() => setIsWidth(false)}
                    className={`flex-1 py-2 rounded-lg border text-sm font-bold transition-all ${
                      !isWidth ? 'bg-cyan-50 border-cyan-300 text-cyan-600' : 'bg-slate-50 border-slate-100 text-slate-500'
                    }`}
                  >
                    Height
                  </button>
                </div>
                <input
                  type="number"
                  value={baseValue}
                  onChange={(e) => setBaseValue(Number(e.target.value))}
                  className="w-full h-12 px-4 bg-slate-50 rounded-[24px] border border-slate-100 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 font-bold text-center text-lg"
                />
              </div>

              <div className="p-6 bg-cyan-50 rounded-[24px] border border-cyan-200">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <p className="text-xs text-cyan-600 font-bold uppercase">Width</p>
                    <p className="text-2xl font-black text-cyan-700">{calculated.width}px</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-cyan-400" />
                  <div className="text-center">
                    <p className="text-xs text-cyan-600 font-bold uppercase">Height</p>
                    <p className="text-2xl font-black text-cyan-700">{calculated.height}px</p>
                  </div>
                </div>
                <p className="text-center mt-3 text-sm font-bold text-cyan-600">{selectedRatio} ({ratio.toFixed(3)})</p>
              </div>

              <div className="bg-slate-100 rounded-[24px] p-4 flex items-center justify-center" style={{ aspectRatio: ratio }}>
                <span className="text-cyan-600 font-bold">{selectedRatio}</span>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Common Sizes</label>
                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {commonSizes.map((size) => (
                      <div 
                        key={size.name}
                        className="p-3 bg-white rounded-xl border border-slate-200 hover:border-cyan-300 cursor-pointer"
                        onClick={() => { setBaseValue(size.base); setIsWidth(true); }}
                      >
                        <div 
                          className="mx-auto bg-cyan-100 rounded mb-2"
                          style={{ width: '40px', height: `${Math.min(40, 40 / ratio)}px` }}
                        />
                        <p className="text-xs font-bold text-slate-700 text-center">{size.name}</p>
                        <p className="text-xs text-slate-500 text-center">{size.width} × {size.height}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-cyan-600 uppercase tracking-wider">CSS</span>
                    <button onClick={() => handleCopy(generateCSS(), 'css')} className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-cyan-50">
                      {copied === 'css' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                  <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-32 text-xs">
                    <code className="text-cyan-400 font-mono">{generateCSS().slice(0, 300)}...</code>
                  </pre>
                </div>

                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-cyan-600 uppercase tracking-wider">Tailwind</span>
                    <button onClick={() => handleCopy(generateTailwind(), 'tailwind')} className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-cyan-50">
                      {copied === 'tailwind' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                  <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-32 text-xs">
                    <code className="text-cyan-400 font-mono">{generateTailwind().slice(0, 300)}...</code>
                  </pre>
                </div>

                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-cyan-600 uppercase tracking-wider">JSON</span>
                    <button onClick={() => handleCopy(generateJSON(), 'json')} className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-cyan-50">
                      {copied === 'json' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                  <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-32 text-xs">
                    <code className="text-cyan-400 font-mono">{generateJSON().slice(0, 200)}...</code>
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
