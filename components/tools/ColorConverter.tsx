"use client";

import { useState } from "react";
import { Copy, Check, Palette } from "lucide-react";
import { FadeIn, ScaleIn, SlideIn, AnimatedButton, IconButton } from "@/components/ui/AnimatedComponents";

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
    <div className="space-y-6 p-6">
      <ScaleIn>
        <div className="brutal-card p-6">
          <div 
            className="w-full h-40 rounded-2xl border-4 border-black mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            style={{ backgroundColor: hex }}
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn delay={0.1}>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  HEX COLOR
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={hex}
                    onChange={(e) => handleHexChange(e.target.value)}
                    className="brutal-input pr-12"
                  />
                  <IconButton 
                    icon={copied === 'hex' ? Check : Copy} 
                    onClick={() => handleCopy(hex, 'hex')}
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  RGB COLOR
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={rgb}
                    onChange={(e) => handleRgbChange(e.target.value)}
                    className="brutal-input pr-12"
                  />
                  <IconButton 
                    icon={copied === 'rgb' ? Check : Copy} 
                    onClick={() => handleCopy(rgb, 'rgb')}
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-6">
              <label className="block text-xs font-black uppercase tracking-widest mb-2">Pick a color</label>
              <input 
                type="color" 
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                className="w-full h-14 bg-transparent cursor-pointer border-4 border-black rounded-xl transition-transform hover:scale-[1.02]"
              />
            </div>
          </FadeIn>
        </div>
      </ScaleIn>

      <SlideIn direction="up" delay={0.4}>
        <div className="grid grid-cols-3 gap-4">
          {['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'].map((color, index) => (
            <motion.button
              key={color}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleHexChange(color)}
              className="h-16 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </SlideIn>
    </div>
  );
}

// Need to import motion
import { motion } from "framer-motion";
