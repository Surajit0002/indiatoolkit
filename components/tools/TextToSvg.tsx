"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Type, Download, Code, RefreshCw } from "lucide-react";

// Simple text to SVG path converter (simplified version)
const textToSvgPath = (text: string): string => {
  // This is a simplified implementation
  // In a real app, you would use a library likeopentype.js
  const letters = {
    'A': 'M0,100 L50,0 L100,100 M25,60 L75,60',
    'B': 'M0,0 L60,0 Q100,0 100,25 Q100,50 60,50 Q100,50 100,75 Q100,100 60,100 L0,100',
    'C': 'M100,20 Q80,0 50,0 Q20,0 20,50 Q20,100 50,100 Q80,100 100,80',
    'D': 'M0,0 L60,0 Q100,0 100,50 Q100,100 60,100 L0,100',
    'E': 'M100,0 L0,0 L0,100 L100,100 M0,50 L80,50',
    'F': 'M100,0 L0,0 L0,100 M0,50 L80,50',
    'G': 'M100,20 Q80,0 50,0 Q20,0 20,50 Q20,100 50,100 Q80,100 100,80 L100,50 L60,50',
    'H': 'M0,0 L0,100 M100,0 L100,100 M0,50 L100,50',
    'I': 'M40,0 L60,0 L60,100 L40,100 M30,0 L70,0 M30,100 L70,100',
    'J': 'M60,0 L80,0 Q100,0 100,30 Q100,60 60,60 L40,100 L60,100',
    'K': 'M0,0 L0,100 M100,0 L0,50 L100,100',
    'L': 'M0,0 L0,100 L100,100',
    'M': 'M0,100 L0,0 L50,50 L100,0 L100,100',
    'N': 'M0,100 L0,0 L100,100 L100,0',
    'O': 'M50,0 Q100,0 100,50 Q100,100 50,100 Q0,100 0,50 Q0,0 50,0',
    'P': 'M0,0 L60,0 Q100,0 100,25 Q100,50 60,50 L0,50 M0,50 L0,100',
    'Q': 'M50,0 Q100,0 100,50 Q100,100 50,100 Q0,100 0,50 Q0,0 50,0 M70,70 L100,100',
    'R': 'M0,0 L60,0 Q100,0 100,25 Q100,50 60,50 L0,50 M40,50 L100,100',
    'S': 'M100,20 Q80,0 50,0 Q20,0 20,25 Q20,50 80,50 Q100,50 100,75 Q100,100 50,100',
    'T': 'M0,0 L100,0 M50,0 L50,100',
    'U': 'M0,0 L0,70 Q0,100 50,100 Q100,100 100,70 L100,0',
    'V': 'M0,0 L50,100 L100,0',
    'W': 'M0,0 L25,100 L50,50 L75,100 L100,0',
    'X': 'M0,0 L100,100 M100,0 L0,100',
    'Y': 'M0,0 L50,50 L100,0 M50,50 L50,100',
    'Z': 'M0,0 L100,0 L0,100 L100,100',
  };

  let svgContent = '';
  let currentX = 0;
  const strokeWidth = 2;
  const letterWidth = 80;
  const letterHeight = 100;

  for (const char of text.toUpperCase()) {
    if (letters[char as keyof typeof letters]) {
      svgContent += `<path d="${letters[char as keyof typeof letters]}" transform="translate(${currentX}, 0) scale(1, 1)" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else if (char === ' ') {
      // Space
    } else {
      // Unknown character, skip
    }
    currentX += letterWidth;
  }

  const width = currentX;
  const height = letterHeight;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <g fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
    ${svgContent}
  </g>
</svg>`;
};

export default function TextToSvg() {
  const [text, setText] = useState("HELLO");
  const [fontSize, setFontSize] = useState(72);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [color, setColor] = useState("#000000");
  const [copied, setCopied] = useState(false);
  const [svgCopied, setSvgCopied] = useState(false);

  const svgCode = useMemo(() => {
    return textToSvgPath(text);
  }, [text]);

  const handleCopy = (textToCopy: string, type: string) => {
    navigator.clipboard.writeText(textToCopy);
    if (type === 'code') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setSvgCopied(true);
      setTimeout(() => setSvgCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([svgCode], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${text.toLowerCase()}-text.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-amber-200">
                <Type className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Text to SVG Path</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Vector Typography</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Input Text</label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">A-Z Only</span>
                </div>
              </div>
              
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                placeholder="Enter text..."
                className="relative w-full h-14 px-6 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all font-bold text-slate-700 shadow-inner placeholder:text-slate-300 text-center tracking-[0.5em]"
                maxLength={12}
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Configuration</label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Customize</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Size</label>
                  <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full h-14 px-4 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all font-bold text-slate-700 text-center shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Stroke</label>
                  <input
                    type="number"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(Number(e.target.value))}
                    className="w-full h-14 px-4 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all font-bold text-slate-700 text-center shadow-inner"
                    step={0.5}
                    min={0.5}
                    max={10}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Color</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-14 px-2 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all shadow-inner cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Preview</label>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Live Render</span>
              </div>
            </div>
            
            <div 
              className="bg-white rounded-[24px] border-2 border-dashed border-slate-200 p-12 flex items-center justify-center min-h-[200px]"
              dangerouslySetInnerHTML={{ __html: svgCode.replace('stroke="currentColor"', `stroke="${color}"`) }}
              style={{ color: color }}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">SVG Code</label>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-slate-400"></div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Copy Ready</span>
              </div>
            </div>
            
            <div className="relative">
              <pre className="bg-slate-900 rounded-[24px] p-6 overflow-x-auto max-h-48 text-xs">
                <code className="text-emerald-400 font-mono">{svgCode}</code>
              </pre>
              <button
                onClick={() => handleCopy(svgCode, 'code')}
                className="absolute top-4 right-4 h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-slate-700 transition-all"
              >
                {copied ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5 text-slate-400" />}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-50">
            <button
              onClick={() => handleCopy(svgCode, 'svg')}
              className="flex-1 h-16 bg-slate-900 text-white rounded-[24px] hover:bg-amber-600 transition-all font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95"
            >
              {svgCopied ? <Check className="h-5 w-5 text-emerald-400" /> : <Code className="h-5 w-5" />}
              {svgCopied ? "COPIED TO CLIPBOARD" : "COPY SVG CODE"}
            </button>
            <button
              onClick={handleDownload}
              className="h-16 px-8 bg-slate-100 text-slate-700 rounded-[24px] hover:bg-amber-50 hover:text-amber-600 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-3 font-black uppercase tracking-widest"
            >
              <Download className="h-6 w-6" />
              DOWNLOAD SVG
            </button>
            <button
              onClick={() => { setText("HELLO"); setFontSize(72); }}
              className="h-16 px-8 bg-slate-100 text-slate-400 rounded-[24px] hover:bg-red-50 hover:text-red-600 transition-all shadow-sm active:scale-95"
            >
              <RefreshCw className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
