"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function ColorConverter() {
  const [hex, setHex] = useState("#3B82F6");
  const [rgb, setRgb] = useState("rgb(59, 130, 246)");
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  const handleHexChange = (value: string) => {
    setHex(value);
    if (/^#?[0-9A-F]{6}$/i.test(value)) {
      const rgbVal = hexToRgb(value);
      if (rgbVal) {
        setRgb(`rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})`);
      }
    }
  };

  const handleRgbChange = (value: string) => {
    setRgb(value);
    const match = value.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      if (r <= 255 && g <= 255 && b <= 255) {
        setHex(rgbToHex(r, g, b));
      }
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="brutal-card p-6">
        <div 
          className="w-full h-32 rounded-[8px] border-2 border-black mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          style={{ backgroundColor: hex }}
        ></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest mb-2">HEX COLOR</label>
            <div className="relative">
              <input
                type="text"
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                className="brutal-input pr-12"
              />
              <button 
                onClick={() => handleCopy(hex, 'hex')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                {copied === 'hex' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest mb-2">RGB COLOR</label>
            <div className="relative">
              <input
                type="text"
                value={rgb}
                onChange={(e) => handleRgbChange(e.target.value)}
                className="brutal-input pr-12"
              />
              <button 
                onClick={() => handleCopy(rgb, 'rgb')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                {copied === 'rgb' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-xs font-black uppercase tracking-widest mb-2">Pick a color</label>
          <input 
            type="color" 
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            className="w-full h-12 bg-transparent cursor-pointer border-2 border-black rounded-[8px]"
          />
        </div>
      </div>
    </div>
  );
}
