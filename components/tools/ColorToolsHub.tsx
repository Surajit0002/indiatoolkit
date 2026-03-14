"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { 
  Palette, 
  Droplets, 
  Eye, 
  Shuffle, 
  Tag, 
  Sparkles, 

  Check, 
  RefreshCw,

  Upload,
  Image as ImageIcon,

  Grid,
  Sliders

} from "lucide-react";

// Type definitions
type ColorTool = 
  | "palette" 
  | "contrast" 
  | "mixer" 
  | "shade" 
  | "blindness" 
  | "random" 
  | "name" 
  | "gradient" 
  | "harmony" 
  | "extractor";

interface ColorToolInfo {
  id: ColorTool;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

// Color conversion utilities
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + [r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, x)).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
};

const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const getContrastRatio = (hex1: string, hex2: string): number => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 1;
  
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

const getColorName = (hex: string): string => {
  const colorNames: Record<string, string> = {
    "#FF0000": "Red", "#00FF00": "Lime", "#0000FF": "Blue", "#FFFF00": "Yellow",
    "#FF00FF": "Magenta", "#00FFFF": "Cyan", "#FFFFFF": "White", "#000000": "Black",
    "#FFA500": "Orange", "#800080": "Purple", "#FFC0CB": "Pink", "#A52A2A": "Brown",
    "#808080": "Gray", "#FFD700": "Gold", "#C0C0C0": "Silver", "#008000": "Green",
    "#000080": "Navy", "#800000": "Maroon", "#008080": "Teal", "#F5F5DC": "Beige"
  };
  return colorNames[hex.toUpperCase()] || "Custom";
};

// Color blindness simulation
const simulateColorBlindness = (hex: string, type: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const matrices: Record<string, number[][]> = {
    protanopia: [[0.567, 0.433, 0], [0.558, 0.442, 0], [0, 0.242, 0.758]],
    deuteranopia: [[0.625, 0.375, 0], [0.7, 0.3, 0], [0, 0.3, 0.7]],
    tritanopia: [[0.95, 0.05, 0], [0, 0.433, 0.567], [0, 0.475, 0.525]],
    achromatopsia: [[0.299, 0.587, 0.114], [0.299, 0.587, 0.114], [0.299, 0.587, 0.114]]
  };
  
  const matrix = matrices[type];
  if (!matrix) return hex;
  
  const r = Math.round(rgb.r * matrix[0][0] + rgb.g * matrix[0][1] + rgb.b * matrix[0][2]);
  const g = Math.round(rgb.r * matrix[1][0] + rgb.g * matrix[1][1] + rgb.b * matrix[1][2]);
  const b = Math.round(rgb.r * matrix[2][0] + rgb.g * matrix[2][1] + rgb.b * matrix[2][2]);
  
  return rgbToHex(r, g, b);
};

export default function ColorToolsHub() {
  const [activeTool, setActiveTool] = useState<ColorTool>("palette");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const tools: ColorToolInfo[] = [
    { id: "palette", name: "Palette Generator", icon: <Palette className="w-5 h-5" />, description: "Generate beautiful color palettes", color: "from-pink-500 to-rose-500" },
    { id: "contrast", name: "Contrast Checker", icon: <Eye className="w-5 h-5" />, description: "Check WCAG accessibility", color: "from-blue-500 to-cyan-500" },
    { id: "mixer", name: "Color Mixer", icon: <Droplets className="w-5 h-5" />, description: "Mix two colors together", color: "from-purple-500 to-violet-500" },
    { id: "shade", name: "Shade Generator", icon: <Sliders className="w-5 h-5" />, description: "Generate color shades", color: "from-emerald-500 to-teal-500" },
    { id: "blindness", name: "Color Blindness", icon: <Eye className="w-5 h-5" />, description: "Simulate color blindness", color: "from-amber-500 to-orange-500" },
    { id: "random", name: "Random Color", icon: <Shuffle className="w-5 h-5" />, description: "Generate random colors", color: "from-indigo-500 to-purple-500" },
    { id: "name", name: "Color Name Finder", icon: <Tag className="w-5 h-5" />, description: "Find color names", color: "from-red-500 to-pink-500" },
    { id: "gradient", name: "Gradient Generator", icon: <Sparkles className="w-5 h-5" />, description: "Create beautiful gradients", color: "from-cyan-500 to-blue-500" },
    { id: "harmony", name: "Color Harmony", icon: <Grid className="w-5 h-5" />, description: "Generate color harmonies", color: "from-violet-500 to-fuchsia-500" },
    { id: "extractor", name: "Color Extractor", icon: <ImageIcon className="w-5 h-5" />, description: "Extract colors from image", color: "from-lime-500 to-green-500" },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white">Color Tools Hub</h1>
            </div>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              All-in-one color toolkit with 10 powerful features. Generate, mix, check, and explore colors effortlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Tool Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`p-4 rounded-2xl transition-all duration-300 ${
                activeTool === tool.id
                  ? `bg-linear-to-r ${tool.color} text-white shadow-lg scale-105`
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                {tool.icon}
                <span className="text-xs font-semibold text-center">{tool.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Tool Content */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 md:p-8">
          {activeTool === "palette" && <PaletteGenerator onCopy={copyToClipboard} copiedColor={copiedColor} />}
          {activeTool === "contrast" && <ContrastChecker onCopy={copyToClipboard} copiedColor={copiedColor} />}
          {activeTool === "mixer" && <ColorMixer onCopy={copyToClipboard} copiedColor={copiedColor} />}
          {activeTool === "shade" && <ShadeGenerator onCopy={copyToClipboard} copiedColor={copiedColor} />}
          {activeTool === "blindness" && <ColorBlindnessSimulator onCopy={copyToClipboard} copiedColor={copiedColor} />}
          {activeTool === "random" && <RandomColorGenerator onCopy={copyToClipboard} copiedColor={copiedColor} />}
          {activeTool === "name" && <ColorNameFinder onCopy={copyToClipboard} copiedColor={copiedColor} />}
          {activeTool === "gradient" && <GradientGenerator onCopy={copyToClipboard} copiedColor={copiedColor} />}
          {activeTool === "harmony" && <ColorHarmonyGenerator onCopy={copyToClipboard} copiedColor={copiedColor} />}
          {activeTool === "extractor" && <ColorExtractor onCopy={copyToClipboard} copiedColor={copiedColor} />}
        </div>
      </div>
    </div>
  );
}

// ==================== PALETTE GENERATOR ====================
function PaletteGenerator({ onCopy, copiedColor }: { onCopy: (text: string) => void; copiedColor: string | null }) {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [paletteType, setPaletteType] = useState("analogous");
  const [colorCount, setColorCount] = useState(5);
  const [palette, setPalette] = useState<string[]>([]);

  const generatePalette = useCallback(() => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return;
    
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const colors: string[] = [];
    
    const angles: Record<string, number[]> = {
      analogous: [0, 30, 60, 90, 120],
      complementary: [0, 30, 60, 180, 210],
      triadic: [0, 60, 120, 180, 240],
      split: [0, 30, 150, 180, 210],
      monochromatic: [0, 0, 0, 0, 0]
    };
    
    const angleSet = angles[paletteType] || angles.analogous;
    
    for (let i = 0; i < colorCount; i++) {
      const angle = paletteType === "monochromatic" ? 0 : angleSet[i % angleSet.length];
      const lightness = paletteType === "monochromatic" ? 20 + (i * 60 / colorCount) : hsl.l;
      const newRgb = hslToRgb((hsl.h + angle) % 360, hsl.s, Math.min(90, Math.max(10, lightness)));
      colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
    
    setPalette(colors);
  }, [baseColor, paletteType, colorCount]);

  useEffect(() => { generatePalette(); }, [generatePalette]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-linear-to-r from-pink-500 to-rose-500 rounded-xl">
          <Palette className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Palette Generator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Base Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="h-12 w-12 rounded-xl cursor-pointer"
              />
              <input
                type="text"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="flex-1 px-4 bg-slate-700 border border-slate-600 rounded-xl text-white font-mono"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Palette Type</label>
            <select
              value={paletteType}
              onChange={(e) => setPaletteType(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
            >
              <option value="analogous">Analogous</option>
              <option value="complementary">Complementary</option>
              <option value="triadic">Triadic</option>
              <option value="split">Split Complementary</option>
              <option value="monochromatic">Monochromatic</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Color Count: {colorCount}</label>
            <input
              type="range"
              min="3"
              max="10"
              value={colorCount}
              onChange={(e) => setColorCount(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-pink-500"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex h-48 rounded-2xl overflow-hidden">
            {palette.map((color, i) => (
              <div
                key={i}
                className="flex-1 group relative cursor-pointer transition-all hover:flex-[1.5]"
                style={{ backgroundColor: color }}
                onClick={() => onCopy(color)}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                  <span className="text-white font-mono text-sm">{copiedColor === color ? <Check className="w-5 h-5" /> : color}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {palette.map((color, i) => (
              <button
                key={i}
                onClick={() => onCopy(color)}
                className="flex items-center gap-2 px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
                <span className="text-white font-mono text-sm">{color}</span>
                {copiedColor === color && <Check className="w-4 h-4 text-green-400" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== CONTRAST CHECKER ====================
function ContrastChecker({ onCopy, copiedColor }: { onCopy: (text: string) => void; copiedColor: string | null }) {
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");
  
  const ratio = getContrastRatio(foreground, background);
  const wcagAA = ratio >= 4.5;
  const wcagAAA = ratio >= 7;
  const wcagAALarge = ratio >= 3;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl">
          <Eye className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Contrast Checker</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Foreground (Text)</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="h-12 w-12 rounded-xl cursor-pointer"
              />
              <input
                type="text"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="flex-1 px-4 bg-slate-700 border border-slate-600 rounded-xl text-white font-mono"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Background</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="h-12 w-12 rounded-xl cursor-pointer"
              />
              <input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="flex-1 px-4 bg-slate-700 border border-slate-600 rounded-xl text-white font-mono"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Preview */}
          <div
            className="p-8 rounded-2xl border-2 border-dashed"
            style={{ backgroundColor: background, color: foreground }}
          >
            <h3 className="text-2xl font-bold mb-2">Sample Heading</h3>
            <p className="text-lg">This is sample text to preview the contrast. Make sure your text is readable!</p>
          </div>
          
          {/* Results */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-4 rounded-xl text-center ${wcagAA ? "bg-green-500/20 border border-green-500/50" : "bg-red-500/20 border border-red-500/50"}`}>
              <p className="text-2xl font-black text-white">{ratio.toFixed(2)}</p>
              <p className="text-xs text-slate-400">Ratio</p>
            </div>
            <div className={`p-4 rounded-xl text-center ${wcagAA ? "bg-green-500/20 border border-green-500/50" : "bg-red-500/20 border border-red-500/50"}`}>
              <p className="text-xl font-bold text-white">{wcagAA ? "PASS" : "FAIL"}</p>
              <p className="text-xs text-slate-400">WCAG AA</p>
            </div>
            <div className={`p-4 rounded-xl text-center ${wcagAAA ? "bg-green-500/20 border border-green-500/50" : "bg-red-500/20 border border-red-500/50"}`}>
              <p className="text-xl font-bold text-white">{wcagAAA ? "PASS" : "FAIL"}</p>
              <p className="text-xs text-slate-400">WCAG AAA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== COLOR MIXER ====================
function ColorMixer({ onCopy, copiedColor }: { onCopy: (text: string) => void; copiedColor: string | null }) {
  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#0000ff");
  const [ratio, setRatio] = useState(50);

  const mixedColor = (() => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    if (!rgb1 || !rgb2) return "#000000";
    
    const r = Math.round(rgb1.r * (1 - ratio/100) + rgb2.r * (ratio/100));
    const g = Math.round(rgb1.g * (1 - ratio/100) + rgb2.g * (ratio/100));
    const b = Math.round(rgb1.b * (1 - ratio/100) + rgb2.b * (ratio/100));
    
    return rgbToHex(r, g, b);
  })();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-linear-to-r from-purple-500 to-violet-500 rounded-xl">
          <Droplets className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Color Mixer</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Color 1</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="h-12 w-12 rounded-xl cursor-pointer"
              />
              <input
                type="text"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="flex-1 px-4 bg-slate-700 border border-slate-600 rounded-xl text-white font-mono"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Color 2</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="h-12 w-12 rounded-xl cursor-pointer"
              />
              <input
                type="text"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="flex-1 px-4 bg-slate-700 border border-slate-600 rounded-xl text-white font-mono"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Mix Ratio: {ratio}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={ratio}
              onChange={(e) => setRatio(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="flex h-32 rounded-2xl overflow-hidden">
            <div className="flex-1" style={{ backgroundColor: color1 }} />
            <div className="flex-1" style={{ backgroundColor: mixedColor }} />
            <div className="flex-1" style={{ backgroundColor: color2 }} />
          </div>
          
          <div 
            className="p-8 rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform"
            style={{ backgroundColor: mixedColor }}
            onClick={() => onCopy(mixedColor)}
          >
            <div className="text-center">
              <p className="text-3xl font-black" style={{ color: getContrastRatio(mixedColor, "#ffffff") > 4.5 ? "#ffffff" : "#000000" }}>
                {mixedColor}
              </p>
              <p className="text-sm mt-2" style={{ color: getContrastRatio(mixedColor, "#ffffff") > 4.5 ? "#ffffff" : "#000000" }}>
                {copiedColor === mixedColor ? "Copied!" : "Click to copy"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== SHADE GENERATOR ====================
function ShadeGenerator({ onCopy, copiedColor }: { onCopy: (text: string) => void; copiedColor: string | null }) {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [shades, setShades] = useState<string[]>([]);

  const generateShades = useCallback(() => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return;
    
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const newShades: string[] = [];
    
    for (let i = 0; i < 10; i++) {
      const lightness = 10 + (i * 10);
      const newRgb = hslToRgb(hsl.h, hsl.s, lightness);
      newShades.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
    
    setShades(newShades);
  }, [baseColor]);

  useEffect(() => { generateShades(); }, [generateShades]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-linear-to-r from-emerald-500 to-teal-500 rounded-xl">
          <Sliders className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Shade Generator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Base Color</label>
          <div className="flex gap-3">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="h-12 w-12 rounded-xl cursor-pointer"
            />
            <input
              type="text"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="flex-1 px-4 bg-slate-700 border border-slate-600 rounded-xl text-white font-mono"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex h-24 rounded-2xl overflow-hidden">
            {shades.map((color, i) => (
              <div
                key={i}
                className="flex-1 group relative cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => onCopy(color)}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <span className="text-white font-mono text-xs">{color}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mt-4">
            {shades.map((color, i) => (
              <button
                key={i}
                onClick={() => onCopy(color)}
                className="flex flex-col items-center gap-1 p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <div className="w-6 h-6 rounded" style={{ backgroundColor: color }} />
                <span className="text-white font-mono text-xs">{color}</span>
                {copiedColor === color && <Check className="w-3 h-3 text-green-400" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== COLOR BLINDNESS SIMULATOR ====================
function ColorBlindnessSimulator({ onCopy, copiedColor }: { onCopy: (text: string) => void; copiedColor: string | null }) {
  const [previewColor, setPreviewColor] = useState("#ff0000");
  const [blindnessType, setBlindnessType] = useState("protanopia");

  const types = [
    { id: "normal", name: "Normal", desc: "Standard vision" },
    { id: "protanopia", name: "Protanopia", desc: "Red-blind" },
    { id: "deuteranopia", name: "Deuteranopia", desc: "Green-blind" },
    { id: "tritanopia", name: "Tritanopia", desc: "Blue-blind" },
    { id: "achromatopsia", name: "Achromatopsia", desc: "Complete" },
  ];

  const simulatedColor = simulateColorBlindness(previewColor, blindnessType);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl">
          <Eye className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Color Blindness Simulator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Preview Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={previewColor}
                onChange={(e) => setPreviewColor(e.target.value)}
                className="h-12 w-12 rounded-xl cursor-pointer"
              />
              <input
                type="text"
                value={previewColor}
                onChange={(e) => setPreviewColor(e.target.value)}
                className="flex-1 px-4 bg-slate-700 border border-slate-600 rounded-xl text-white font-mono"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => setBlindnessType(type.id)}
                className={`p-3 rounded-xl text-left transition-all ${
                  blindnessType === type.id
                    ? "bg-amber-500/30 border-2 border-amber-500"
                    : "bg-slate-700/50 border-2 border-transparent hover:border-slate-600"
                }`}
              >
                <p className="font-semibold text-white text-sm">{type.name}</p>
                <p className="text-xs text-slate-400">{type.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-slate-400">Original</p>
              <div
                className="h-24 rounded-2xl border-2 border-slate-600"
                style={{ backgroundColor: previewColor }}
              />
              <p className="text-white font-mono text-center">{previewColor}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-400">Simulated</p>
              <div
                className="h-24 rounded-2xl border-2 border-slate-600 cursor-pointer"
                style={{ backgroundColor: simulatedColor }}
                onClick={() => onCopy(simulatedColor)}
              />
              <p className="text-white font-mono text-center">
                {simulatedColor}
                {copiedColor === simulatedColor && " ✓"}
              </p>
            </div>
          </div>
          
          {/* All types preview */}
          <div className="grid grid-cols-5 gap-2">
            {types.map((type) => (
              <div key={type.id} className="text-center">
                <div
                  className="h-12 rounded-lg mb-1"
                  style={{ backgroundColor: simulateColorBlindness(previewColor, type.id) }}
                />
                <p className="text-xs text-slate-400">{type.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== RANDOM COLOR ====================
function RandomColorGenerator({ onCopy, copiedColor }: { onCopy: (text: string) => void; copiedColor: string | null }) {
  const [colors, setColors] = useState<string[]>([]);

  const generateRandom = () => {
    const newColors: string[] = [];
    for (let i = 0; i < 8; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      newColors.push(rgbToHex(r, g, b));
    }
    setColors(newColors);
  };

  useEffect(() => { generateRandom(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-linear-to-r from-indigo-500 to-purple-500 rounded-xl">
          <Shuffle className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Random Color Generator</h2>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={generateRandom}
          className="px-8 py-4 bg-linear-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-2xl flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <RefreshCw className="w-5 h-5" />
          Generate New Colors
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {colors.map((color, i) => (
          <button
            key={i}
            onClick={() => onCopy(color)}
            className="group relative p-4 rounded-2xl hover:scale-105 transition-transform"
            style={{ backgroundColor: color }}
          >
            <div className="text-center">
              <p className="font-mono font-bold text-lg" style={{ color: getContrastRatio(color, "#ffffff") > 4.5 ? "#ffffff" : "#000000" }}>
                {color}
              </p>
              <p className="text-xs mt-1" style={{ color: getContrastRatio(color, "#ffffff") > 4.5 ? "#ffffff" : "#000000" }}>
                {copiedColor === color ? "Copied!" : "Click to copy"}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {colors.map((color, i) => (
          <button
            key={i}
            onClick={() => onCopy(color)}
            className="flex items-center gap-2 px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
          >
            <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
            <span className="text-white font-mono text-sm">{color}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ==================== COLOR NAME FINDER ====================
function ColorNameFinder({ onCopy, copiedColor }: { onCopy: (text: string) => void; copiedColor: string | null }) {
  const [color, setColor] = useState("#ff6b6b");
  
  const colorName = getColorName(color);
  const rgb = hexToRgb(color);

  const predefinedColors = [
    "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
    "#FFFFFF", "#000000", "#FFA500", "#800080", "#FFC0CB", "#A52A2A",
    "#808080", "#FFD700", "#C0C0C0", "#008000", "#000080", "#800000"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-linear-to-r from-red-500 to-pink-500 rounded-xl">
          <Tag className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Color Name Finder</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Enter Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-12 w-12 rounded-xl cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1 px-4 bg-slate-700 border border-slate-600 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl" style={{ backgroundColor: color }}>
            <p className="text-3xl font-black text-center" style={{ color: getContrastRatio(color, "#ffffff") > 4.5 ? "#ffffff" : "#000000" }}>
              {colorName}
            </p>
          </div>

          {rgb && (
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-700 rounded-xl text-center">
                <p className="text-xl font-bold text-white">{rgb.r}</p>
                <p className="text-xs text-slate-400">Red</p>
              </div>
              <div className="p-3 bg-slate-700 rounded-xl text-center">
                <p className="text-xl font-bold text-white">{rgb.g}</p>
                <p className="text-xs text-slate-400">Green</p>
              </div>
              <div className="p-3 bg-slate-700 rounded-xl text-center">
                <p className="text-xl font-bold text-white">{rgb.b}</p>
                <p className="text-xs text-slate-400">Blue</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-3">Quick Colors</label>
          <div className="grid grid-cols-3 gap-2">
            {predefinedColors.map((c, i) => (
              <button
                key={i}
                onClick={() => setColor(c)}
                className="p-3 rounded-xl flex items-center gap-2 hover:bg-slate-700 transition-colors"
              >
                <div className="w-6 h-6 rounded" style={{ backgroundColor: c }} />
                <span className="text-white text-xs">{getColorName(c)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== GRADIENT GENERATOR ====================
function GradientGenerator({ onCopy, copiedColor }: { onCopy: (text: string) => void; copiedColor: string | null }) {
  const [color1, setColor1] = useState("#6366f1");
  const [color2, setColor2] = useState("#ec4899");
  const [direction, setDirection] = useState(135);
  const [gradient, setGradient] = useState("");

  useEffect(() => {
    const g = `linear-gradient(${direction}deg, ${color1}, ${color2})`;
    setGradient(g);
  }, [color1, color2, direction]);

  const cssCode = `background: linear-gradient(${direction}deg, ${color1}, ${color2});`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-linear-to-r from-cyan-500 to-blue-500 rounded-xl">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Gradient Generator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Start Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="h-10 w-10 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="flex-1 px-3 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">End Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="h-10 w-10 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="flex-1 px-3 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Direction: {direction}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={direction}
              onChange={(e) => setDirection(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between mt-2">
              {["0°", "45°", "90°", "135°", "180°", "225°", "270°", "315°"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDirection(parseInt(d))}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div
            className="h-48 rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform"
            style={{ background: gradient }}
            onClick={() => onCopy(cssCode)}
          />
          
          <div className="p-4 bg-slate-700 rounded-xl">
            <p className="text-xs text-slate-400 mb-2">CSS Code</p>
            <code className="text-white text-sm font-mono break-all">
              {cssCode}
            </code>
            {copiedColor === cssCode && <Check className="w-4 h-4 text-green-400 inline ml-2" />}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== COLOR HARMONY ====================
function ColorHarmonyGenerator({ onCopy, copiedColor }: { onCopy: (text: string) => void; copiedColor: string | null }) {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [harmonyType, setHarmonyType] = useState("complementary");
  const [harmonyColors, setHarmonyColors] = useState<string[]>([]);

  const generateHarmony = useCallback(() => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return;
    
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const angles: Record<string, number[]> = {
      complementary: [0, 180],
      analogous: [-30, 0, 30],
      triadic: [0, 120, 240],
      tetradic: [0, 90, 180, 270],
      split: [0, 150, 210],
    };
    
    const angleSet = angles[harmonyType] || angles.complementary;
    const colors: string[] = [];
    
    angleSet.forEach((angle) => {
      const newRgb = hslToRgb((hsl.h + angle + 360) % 360, hsl.s, hsl.l);
      colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    });
    
    setHarmonyColors(colors);
  }, [baseColor, harmonyType]);

  useEffect(() => { generateHarmony(); }, [generateHarmony]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-xl">
          <Grid className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Color Harmony Generator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Base Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="h-12 w-12 rounded-xl cursor-pointer"
              />
              <input
                type="text"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="flex-1 px-4 bg-slate-700 border border-slate-600 rounded-xl text-white font-mono"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Harmony Type</label>
            <select
              value={harmonyType}
              onChange={(e) => setHarmonyType(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
            >
              <option value="complementary">Complementary</option>
              <option value="analogous">Analogous</option>
              <option value="triadic">Triadic</option>
              <option value="tetradic">Tetradic</option>
              <option value="split">Split Complementary</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex h-24 rounded-2xl overflow-hidden">
            {harmonyColors.map((color, i) => (
              <div
                key={i}
                className="flex-1 group relative cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => onCopy(color)}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <span className="text-white font-mono text-xs">{color}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {harmonyColors.map((color, i) => (
              <button
                key={i}
                onClick={() => onCopy(color)}
                className="flex items-center gap-2 px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
                <span className="text-white font-mono text-sm">{color}</span>
                {copiedColor === color && <Check className="w-4 h-4 text-green-400" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== COLOR EXTRACTOR ====================
function ColorExtractor({ onCopy, copiedColor }: { onCopy: (text: string) => void; copiedColor: string | null }) {
  const [image, setImage] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<{ hex: string; percentage: number }[]>([]);
  const [colorCount, setColorCount] = useState(6);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setExtractedColors([]);
    }
  };

    const extractColors = useCallback(() => {
     if (!image || !canvasRef.current) return;
     
     const img = new window.Image();
     img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      const maxSize = 200;
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      const colorMap: Record<string, number> = {};
      
      for (let i = 0; i < pixels.length; i += 4) {
        const r = Math.round(pixels[i] / 32) * 32;
        const g = Math.round(pixels[i + 1] / 32) * 32;
        const b = Math.round(pixels[i + 2] / 32) * 32;
        const hex = rgbToHex(r, g, b);
        colorMap[hex] = (colorMap[hex] || 0) + 1;
      }
      
      const sorted = Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, colorCount)
        .map(([hex, count]) => ({
          hex,
          percentage: Math.round((count / (pixels.length / 4)) * 100)
        }));
      
      setExtractedColors(sorted);
    };
    img.src = image;
  }, [image, colorCount]);

  useEffect(() => {
    if (image) extractColors();
  }, [image, colorCount, extractColors]);

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-3 mb-6">
         <div className="p-2 bg-linear-to-r from-lime-500 to-green-500 rounded-xl">
           <ImageIcon className="w-6 h-6 text-white" />
         </div>
         <h2 className="text-2xl font-bold text-white">Color Extractor</h2>
       </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="p-8 border-2 border-dashed border-slate-600 rounded-2xl text-center hover:border-lime-500 transition-colors">
              {image ? (
                <img src={image} alt="Uploaded" className="max-h-48 mx-auto rounded-xl" />
              ) : (
                <>
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-white">Click to upload an image</p>
                  <p className="text-slate-400 text-sm">PNG, JPG, GIF supported</p>
                </>
              )}
            </div>
          </div>
          
          {image && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Color Count: {colorCount}</label>
              <input
                type="range"
                min="3"
                max="12"
                value={colorCount}
                onChange={(e) => setColorCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-lime-500"
              />
            </div>
          )}
          
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="space-y-4">
          {extractedColors.length > 0 ? (
            <>
              <div className="flex h-24 rounded-2xl overflow-hidden">
                {extractedColors.map((c, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{ backgroundColor: c.hex, width: `${c.percentage}%` }}
                  />
                ))}
              </div>
              
              <div className="space-y-2">
                {extractedColors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => onCopy(c.hex)}
                    className="w-full flex items-center gap-3 p-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: c.hex }} />
                    <span className="text-white font-mono flex-1 text-left">{c.hex}</span>
                    <span className="text-slate-400 text-sm">{c.percentage}%</span>
                    {copiedColor === c.hex && <Check className="w-4 h-4 text-green-400" />}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400">
              <p>Upload an image to extract colors</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
