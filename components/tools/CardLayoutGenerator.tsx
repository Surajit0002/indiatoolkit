"use client";

import { useState } from "react";
import { Copy, Check, Grid3X3, Layout } from "lucide-react";

type CardStyle = 'standard' | 'horizontal' | 'overlay' | 'masonry';

interface CardConfig {
  columns: number;
  gap: number;
  cardWidth: string;
  showShadow: boolean;
  borderRadius: number;
}

export default function CardLayoutGenerator() {
  const [cardStyle, setCardStyle] = useState<CardStyle>('standard');
  const [config, setConfig] = useState<CardConfig>({
    columns: 3,
    gap: 24,
    cardWidth: '300px',
    showShadow: true,
    borderRadius: 12,
  });
  const [copied, setCopied] = useState<string | null>(null);

  const generateHTML = () => {
    return `<div class="card-layout" style="
  display: grid;
  grid-template-columns: repeat(${config.columns}, ${config.cardWidth});
  gap: ${config.gap}px;
  padding: 24px;
">
  ${Array.from({ length: config.columns }, () => `  <article class="card">
    <div class="card-image" style="aspect-ratio: 16/9;">
      <img src="https://via.placeholder.com/400x225" alt="Card" />
    </div>
    <div class="card-content">
      <h3>Card Title</h3>
      <p>Card description text</p>
    </div>
  </article>`).join('\n')}
</div>`;
  };

  const generateCSS = () => {
    return `.card-layout {
  display: grid;
  grid-template-columns: repeat(${config.columns}, ${config.cardWidth});
  gap: ${config.gap}px;
  padding: 24px;
}

.card {
  background: white;
  border-radius: ${config.borderRadius}px;
  overflow: hidden;
  ${config.showShadow ? 'box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);' : ''}
}

.card-image {
  aspect-ratio: 16/9;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}`;
  };

  const generateTailwind = () => {
    const gridCols = config.columns === 2 ? 'grid-cols-2' : config.columns === 3 ? 'grid-cols-3' : config.columns === 4 ? 'grid-cols-4' : 'grid-cols-1';
    return `<div class="grid ${gridCols} gap-6 p-6">
  ${Array.from({ length: config.columns }, () => `<article class="bg-white rounded-${config.borderRadius} overflow-hidden${config.showShadow ? ' shadow-lg' : ''}">
    <div class="aspect-video">
      <img src="https://via.placeholder.com/400x225" class="w-full h-full object-cover" alt="Card" />
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2">Card Title</h3>
      <p class="text-gray-600 text-sm">Card description</p>
    </div>
  </article>`).join('\n')}
</div>`;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const styles: { value: CardStyle; label: string }[] = [
    { value: 'standard', label: 'Standard' },
    { value: 'horizontal', label: 'Horizontal' },
    { value: 'overlay', label: 'Overlay' },
    { value: 'masonry', label: 'Masonry' },
  ];

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-rose-200">
                <Grid3X3 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Card Layout Generator</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Card-Based Designs</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Card Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {styles.map((style) => (
                    <button
                      key={style.value}
                      onClick={() => setCardStyle(style.value)}
                      className={`p-3 rounded-xl border transition-all ${
                        cardStyle === style.value 
                          ? 'bg-rose-50 border-rose-300 text-rose-600' 
                          : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-rose-200'
                      }`}
                    >
                      <span className="text-sm font-bold">{style.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Columns</label>
                  <span className="text-[9px] font-black text-rose-600">{config.columns}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={6}
                  value={config.columns}
                  onChange={(e) => setConfig({ ...config, columns: Number(e.target.value) })}
                  className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Gap (px)</label>
                  <span className="text-[9px] font-black text-rose-600">{config.gap}px</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={48}
                  step={8}
                  value={config.gap}
                  onChange={(e) => setConfig({ ...config, gap: Number(e.target.value) })}
                  className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config.showShadow}
                  onChange={(e) => setConfig({ ...config, showShadow: e.target.checked })}
                  className="h-5 w-5 rounded border-slate-300"
                />
                <span className="text-sm font-bold text-slate-700">Show Shadow</span>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-100 rounded-[24px] p-6 border border-slate-300">
                <div 
                  className="bg-white rounded-lg shadow-lg p-4"
                  style={{ maxHeight: '300px', overflowY: 'auto' }}
                >
                  <div 
                    className="grid gap-4"
                    style={{ 
                      gridTemplateColumns: `repeat(${Math.min(config.columns, 3)}, 1fr)`,
                      gap: `${config.gap}px`,
                    }}
                  >
                    {Array.from({ length: Math.min(config.columns * 2, 6) }).map((_, i) => (
                      <div 
                        key={i}
                        className="bg-gradient-to-br from-rose-100 to-pink-200 rounded-lg overflow-hidden"
                        style={{ borderRadius: `${config.borderRadius}px` }}
                      >
                        <div className="h-20 bg-gradient-to-br from-rose-300 to-pink-400" />
                        <div className="p-3">
                          <div className="h-3 bg-slate-200 rounded mb-2 w-3/4" />
                          <div className="h-2 bg-slate-100 rounded w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider">HTML</span>
                    <button
                      onClick={() => handleCopy(generateHTML(), 'html')}
                      className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-rose-50"
                    >
                      {copied === 'html' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                  <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-32 text-xs">
                    <code className="text-rose-400 font-mono">{generateHTML().slice(0, 300)}...</code>
                  </pre>
                </div>

                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider">CSS</span>
                    <button
                      onClick={() => handleCopy(generateCSS(), 'css')}
                      className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-rose-50"
                    >
                      {copied === 'css' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                  <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-32 text-xs">
                    <code className="text-rose-400 font-mono">{generateCSS().slice(0, 300)}...</code>
                  </pre>
                </div>

                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider">Tailwind</span>
                    <button
                      onClick={() => handleCopy(generateTailwind(), 'tailwind')}
                      className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-rose-50"
                    >
                      {copied === 'tailwind' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                  <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-32 text-xs">
                    <code className="text-rose-400 font-mono">{generateTailwind().slice(0, 300)}...</code>
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
