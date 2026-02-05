"use client";

import { useState, useRef } from "react";
import { Copy, Download, Type, Palette, Circle, Square, Triangle, Star, Sparkles } from "lucide-react";

export default function LogoMaker() {
  const [logoText, setLogoText] = useState("Your Logo");
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(48);
  const [fontFamily, setFontFamily] = useState("font-sans");
  const [icon, setIcon] = useState<string | null>(null);
  const [iconColor, setIconColor] = useState("#3B82F6");
  const [iconPosition, setIconPosition] = useState<"left" | "top" | "none">("left");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const icons = [
    { id: "circle", component: Circle },
    { id: "square", component: Square },
    { id: "triangle", component: Triangle },
    { id: "star", component: Star },
    { id: "sparkle", component: Sparkles },
  ];

  const fontFamilies = [
    { value: "font-sans", label: "Sans Serif" },
    { value: "font-serif", label: "Serif" },
    { value: "font-mono", label: "Monospace" },
  ];

  const copyToClipboard = () => {
    if (canvasRef.current) {
      // In a real app, you'd use html2canvas or similar
      navigator.clipboard.writeText(logoText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadLogo = () => {
    // In a real app, implement canvas/image download
    alert("Download functionality would be implemented here with html2canvas");
  };

  const fontClasses: Record<string, string> = {
    "font-sans": "font-sans",
    "font-serif": "font-serif",
    "font-mono": "font-mono",
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Logo Maker</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create custom logos with icons, text, and colors
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Text Settings */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Text Settings
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Logo Text</label>
                  <input
                    type="text"
                    value={logoText}
                    onChange={(e) => setLogoText(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Font Family</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700"
                  >
                    {fontFamilies.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Font Size: {fontSize}px</label>
                  <input
                    type="range"
                    min="16"
                    max="120"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Text Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-12 h-12 rounded-xl border-2 border-slate-100 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="flex-1 p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Icon Settings */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Circle className="h-4 w-4" />
                  Icon
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Select Icon</label>
                  <div className="grid grid-cols-5 gap-2">
                    {icons.map((iconItem) => (
                      <button
                        key={iconItem.id}
                        onClick={() => setIcon(iconItem.id)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          icon === iconItem.id
                            ? "border-amber-500 bg-amber-50"
                            : "border-slate-100 hover:border-slate-300"
                        }`}
                      >
                        <iconItem.component className="h-5 w-5 text-slate-700" />
                      </button>
                    ))}
                    <button
                      onClick={() => setIcon(null)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        icon === null
                          ? "border-amber-500 bg-amber-50"
                          : "border-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-500">None</span>
                    </button>
                  </div>
                </div>
                {icon && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Icon Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={iconColor}
                          onChange={(e) => setIconColor(e.target.value)}
                          className="w-12 h-12 rounded-xl border-2 border-slate-100 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={iconColor}
                          onChange={(e) => setIconColor(e.target.value)}
                          className="flex-1 p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Icon Position</label>
                      <select
                        value={iconPosition}
                        onChange={(e) => setIconPosition(e.target.value as "left" | "top" | "none")}
                        className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700"
                      >
                        <option value="left">Left of Text</option>
                        <option value="top">Above Text</option>
                        <option value="none">No Icon</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Background Settings */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Background
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-12 h-12 rounded-xl border-2 border-slate-100 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Logo Preview</span>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadLogo}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm hover:from-amber-600 hover:to-orange-700 transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div
                  ref={canvasRef}
                  className="w-full aspect-video rounded-2xl border-2 border-slate-200 flex items-center justify-center"
                  style={{ backgroundColor: bgColor }}
                >
                  <div
                    className={`flex ${iconPosition === "top" ? "flex-col" : "flex-row"} items-center gap-4`}
                    style={{ gap: iconPosition === "top" ? "16px" : "24px" }}
                  >
                    {icon && (
                      <div style={{ color: iconColor }}>
                        {icon === "circle" && <Circle className="h-16 w-16" />}
                        {icon === "square" && <Square className="h-16 w-16" />}
                        {icon === "triangle" && <Triangle className="h-16 w-16" />}
                        {icon === "star" && <Star className="h-16 w-16" />}
                        {icon === "sparkle" && <Sparkles className="h-16 w-16" />}
                      </div>
                    )}
                    <span
                      className={`${fontClasses[fontFamily]} font-black uppercase italic`}
                      style={{ fontSize: `${fontSize}px`, color: textColor }}
                    >
                      {logoText}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Palette Suggestions */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Color Palette Suggestions</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: "Professional Blue", colors: ["#1E3A5F", "#3B82F6", "#ffffff"] },
                    { name: "Modern Purple", colors: ["#4C1D95", "#8B5CF6", "#ffffff"] },
                    { name: "Fresh Green", colors: ["#065F46", "#10B981", "#ffffff"] },
                  ].map((palette) => (
                    <button
                      key={palette.name}
                      onClick={() => {
                        setTextColor(palette.colors[0]);
                        setIconColor(palette.colors[1]);
                        setBgColor(palette.colors[2]);
                      }}
                      className="p-4 rounded-xl border-2 border-slate-100 hover:border-slate-300 transition-all text-left"
                    >
                      <div className="flex gap-1 mb-2">
                        {palette.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-lg"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-500">{palette.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
