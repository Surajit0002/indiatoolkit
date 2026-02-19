"use client";

import { useState, useMemo } from "react";
import { Copy, Check, ArrowRightLeft, Calculator, Ruler, RefreshCw } from "lucide-react";

type Unit = 'px' | 'em' | 'rem' | 'pt' | 'percent';

interface ConversionResult {
  px: number;
  em: number;
  rem: number;
  pt: number;
  percent: number;
}

const BASE_SIZE = 16; // Default browser font size in px
const PT_TO_PX = 1.333; // 1pt = 1.333px

export default function FontSizeConverter() {
  const [inputValue, setInputValue] = useState<string>("16");
  const [fromUnit, setFromUnit] = useState<Unit>("px");
  const [baseSize, setBaseSize] = useState<number>(16);
  const [copied, setCopied] = useState<string | null>(null);

  const convertToPx = (value: number, unit: Unit): number => {
    switch (unit) {
      case 'px': return value;
      case 'em': return value * baseSize;
      case 'rem': return value * baseSize;
      case 'pt': return value * PT_TO_PX;
      case 'percent': return (value / 100) * baseSize;
      default: return value;
    }
  };

  const convertFromPx = (pxValue: number): ConversionResult => {
    return {
      px: pxValue,
      em: pxValue / baseSize,
      rem: pxValue / baseSize,
      pt: pxValue / PT_TO_PX,
      percent: (pxValue / baseSize) * 100
    };
  };

  // Compute result directly during render using useMemo
  const result = useMemo(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      return null;
    }
    const pxValue = convertToPx(value, fromUnit);
    return convertFromPx(pxValue);
  }, [inputValue, fromUnit, baseSize]);

  const handleCopy = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatValue = (value: number, unit: Unit): string => {
    switch (unit) {
      case 'px': return value.toFixed(1).replace(/\.0$/, '');
      case 'em': return value.toFixed(4).replace(/\.?0+$/, '');
      case 'rem': return value.toFixed(4).replace(/\.?0+$/, '');
      case 'pt': return value.toFixed(1).replace(/\.0$/, '');
      case 'percent': return value.toFixed(1).replace(/\.0$/, '') + '%';
      default: return value.toString();
    }
  };

  const conversionTable = [
    { unit: 'px' as Unit, label: 'Pixels', desc: 'Screen pixels' },
    { unit: 'em' as Unit, label: 'EM', desc: 'Relative to parent' },
    { unit: 'rem' as Unit, label: 'REM', desc: 'Relative to root' },
    { unit: 'pt' as Unit, label: 'Points', desc: 'Print units' },
    { unit: 'percent' as Unit, label: 'Percent', desc: 'Percentage of base' },
  ];

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-cyan-200">
                <Ruler className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Font Size Converter</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Unit Transformation</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Input Value</label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Real-time</span>
                </div>
              </div>
              
              <div className="relative group">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter font size..."
                  className="relative w-full h-20 px-8 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:outline-none focus:bg-white focus:ring-4 focus:ring-cyan-500/10 transition-all font-black text-4xl text-slate-700 shadow-inner placeholder:text-slate-300 text-center"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">From Unit</label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Select</span>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {(['px', 'em', 'rem', 'pt', 'percent'] as Unit[]).map((unit) => (
                  <button
                    key={unit}
                    onClick={() => setFromUnit(unit)}
                    className={`h-14 rounded-xl font-black text-sm transition-all ${
                      fromUnit === unit
                        ? "bg-cyan-600 text-white shadow-lg shadow-cyan-200"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Base Size (REM/EM)</label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Browser: 16px</span>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="number"
                  value={baseSize}
                  onChange={(e) => setBaseSize(Number(e.target.value))}
                  className="w-full h-14 px-6 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:outline-none focus:bg-white focus:ring-4 focus:ring-cyan-500/10 transition-all font-bold text-slate-700 text-center shadow-inner"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">px</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Quick Presets</label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Common</span>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {[12, 14, 16, 18, 20, 24, 32, 48].map((size) => (
                  <button
                    key={size}
                    onClick={() => { setInputValue(size.toString()); setFromUnit('px'); }}
                    className="h-12 rounded-xl bg-slate-100 hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 font-bold text-sm transition-all"
                  >
                    {size}px
                  </button>
                ))}
              </div>
            </div>
          </div>

          {result && (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Conversions</label>
                <div className="flex items-center gap-2">
                  <ArrowRightLeft className="h-4 w-4 text-slate-300" />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">All Units</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {conversionTable.map((item) => {
                  const value = result[item.unit];
                  const isCopied = copied === item.unit;
                  return (
                    <button
                      key={item.unit}
                      onClick={() => handleCopy(formatValue(value, item.unit), item.unit)}
                      className="relative bg-slate-50/50 rounded-[24px] p-6 border border-slate-100 hover:border-cyan-200 hover:bg-white transition-all group text-left"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black text-cyan-600 uppercase tracking-wider">{item.label}</span>
                        {isCopied ? (
                          <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                      <div className="text-3xl font-black text-slate-800 mb-1">
                        {formatValue(value, item.unit)}
                      </div>
                      <div className="text-[9px] text-slate-400 font-medium">{item.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-50">
            <button
              onClick={() => { setInputValue("16"); setFromUnit("px"); setBaseSize(16); }}
              className="flex-1 h-16 bg-slate-900 text-white rounded-[24px] hover:bg-cyan-600 transition-all font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95"
            >
              <RefreshCw className="h-5 w-5" />
              RESET CONVERTER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
