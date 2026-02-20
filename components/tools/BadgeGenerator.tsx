"use client";

import { useState } from "react";
import { 
  Award, 
  Copy, 
  Check, 
  Download, 
  Circle,
  Bell,
  Tag,
  MessageCircle
} from "lucide-react";

type BadgeStyle = "circle" | "pill" | "dot" | "ribbon" | "notification";

interface BadgeConfig {
  style: BadgeStyle;
  size: number;
  content: string;
  fillColor: string;
  textColor: string;
  strokeColor: string;
  strokeWidth: number;
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center";
  fontSize: number;
  fontWeight: "normal" | "medium" | "bold";
  showShadow: boolean;
}

export default function BadgeGenerator() {
  const [config, setConfig] = useState<BadgeConfig>({
    style: "circle",
    size: 60,
    content: "1",
    fillColor: "#ef4444",
    textColor: "#ffffff",
    strokeColor: "#ffffff",
    strokeWidth: 2,
    position: "top-right",
    fontSize: 16,
    fontWeight: "bold",
    showShadow: true
  });
  const [copied, setCopied] = useState(false);

  const badgeStyles: { id: BadgeStyle; label: string; icon: React.ReactNode }[] = [
    { id: "circle", label: "Circle", icon: <Circle className="h-5 w-5" /> },
    { id: "pill", label: "Pill", icon: <Award className="h-5 w-5" /> },
    { id: "dot", label: "Dot", icon: <Circle className="h-3 w-3" /> },
    { id: "ribbon", label: "Ribbon", icon: <Tag className="h-5 w-5" /> },
    { id: "notification", label: "Notification", icon: <Bell className="h-5 w-5" /> }
  ];

  const getBorderRadius = () => {
    switch (config.style) {
      case "circle":
      case "dot":
        return "50%";
      case "pill":
        return `${config.size}px`;
      case "ribbon":
        return "4px";
      default:
        return "50%";
    }
  };

  const getWidth = () => {
    if (config.style === "pill" || config.style === "ribbon") {
      return "auto";
    }
    return `${config.size}px`;
  };

  const generateCssCode = () => {
    return `.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${config.style === "pill" || config.style === "ribbon" ? "auto" : `${config.size}px`};
  height: ${config.size}px;
  ${config.style === "pill" || config.style === "ribbon" ? `padding: 0 ${config.size / 2}px;` : ""}
  background-color: ${config.fillColor};
  color: ${config.textColor};
  border: ${config.strokeWidth}px solid ${config.strokeColor};
  border-radius: ${getBorderRadius()};
  font-size: ${config.fontSize}px;
  font-weight: ${config.fontWeight};
  ${config.showShadow ? `box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);` : ""}
}`;
  };

  const generateSvgCode = () => {
    const width = config.style === "pill" || config.style === "ribbon" ? Math.max(config.size * 2, config.content.length * config.fontSize * 0.6 + config.size) : config.size;
    const height = config.size;
    const rx = config.style === "circle" || config.style === "dot" ? height / 2 : config.style === "pill" ? height / 2 : 4;

    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect 
    x="0" 
    y="0" 
    width="${width}" 
    height="${height}" 
    rx="${rx}" 
    fill="${config.fillColor}" 
    stroke="${config.strokeColor}" 
    stroke-width="${config.strokeWidth}"
  />
  <text 
    x="${width / 2}" 
    y="${height / 2}" 
    fill="${config.textColor}" 
    font-size="${config.fontSize}" 
    font-weight="${config.fontWeight}" 
    text-anchor="middle" 
    dominant-baseline="middle"
  >
    ${config.content}
  </text>
</svg>`;
  };

  const generateTailwindCode = () => {
    const radius = config.style === "circle" ? "rounded-full" : config.style === "pill" ? "rounded-full" : "rounded";
    return `<span class="inline-flex items-center justify-center ${radius} ${config.showShadow ? "shadow" : ""}" 
  style="
    min-width: ${config.style === "pill" || config.style === "ribbon" ? "auto" : `${config.size}px`};
    height: ${config.size}px;
    background-color: ${config.fillColor};
    color: ${config.textColor};
    border: ${config.strokeWidth}px solid ${config.strokeColor};
    font-size: ${config.fontSize}px;
    font-weight: ${config.fontWeight};
  ">
  ${config.content}
</span>`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSvg = () => {
    const svgContent = generateSvgCode();
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `badge-${config.style}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderPreview = () => {
    const style: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: getWidth(),
      height: config.size,
      padding: config.style === "pill" || config.style === "ribbon" ? `0 ${config.size / 2}px` : undefined,
      backgroundColor: config.fillColor,
      color: config.textColor,
      border: `${config.strokeWidth}px solid ${config.strokeColor}`,
      borderRadius: getBorderRadius(),
      fontSize: config.fontSize,
      fontWeight: config.fontWeight,
      boxShadow: config.showShadow ? "0 2px 4px rgba(0, 0, 0, 0.1)" : undefined,
      transition: "all 0.3s ease"
    };

    return <span style={style}>{config.content}</span>;
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-red-100 rounded-2xl">
              <Award className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Badge Generator</h2>
          </div>
          <p className="text-gray-500">Create notification badges and circular labels</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
          {/* Style Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Badge Style</label>
            <div className="grid grid-cols-5 gap-2">
              {badgeStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setConfig({ ...config, style: style.id })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    config.style === style.id
                      ? "border-red-500 bg-red-50 text-red-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  title={style.label}
                >
                  <div className="flex flex-col items-center gap-1">
                    {style.icon}
                    <span className="text-xs">{style.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content & Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Content</label>
              <input
                type="text"
                value={config.content}
                onChange={(e) => setConfig({ ...config, content: e.target.value })}
                className="w-full h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm"
                placeholder="1, 99, NEW..."
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Size ({config.size}px)</label>
              <input
                type="range"
                min="20"
                max="120"
                value={config.size}
                onChange={(e) => setConfig({ ...config, size: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Font Size ({config.fontSize}px)</label>
              <input
                type="range"
                min="8"
                max="32"
                value={config.fontSize}
                onChange={(e) => setConfig({ ...config, fontSize: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Stroke Width ({config.strokeWidth}px)</label>
              <input
                type="range"
                min="0"
                max="10"
                value={config.strokeWidth}
                onChange={(e) => setConfig({ ...config, strokeWidth: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Background Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={config.fillColor}
                  onChange={(e) => setConfig({ ...config, fillColor: e.target.value })}
                  className="h-10 w-10 rounded-lg cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={config.fillColor}
                  onChange={(e) => setConfig({ ...config, fillColor: e.target.value })}
                  className="flex-1 h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Text Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={config.textColor}
                  onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                  className="h-10 w-10 rounded-lg cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={config.textColor}
                  onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                  className="flex-1 h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Border Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={config.strokeColor}
                  onChange={(e) => setConfig({ ...config, strokeColor: e.target.value })}
                  className="h-10 w-10 rounded-lg cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={config.strokeColor}
                  onChange={(e) => setConfig({ ...config, strokeColor: e.target.value })}
                  className="flex-1 h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Font Weight</label>
              <select
                value={config.fontWeight}
                onChange={(e) => setConfig({ ...config, fontWeight: e.target.value as "normal" | "medium" | "bold" })}
                className="w-full h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="normal">Normal</option>
                <option value="medium">Medium</option>
                <option value="bold">Bold</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Shadow</label>
              <button
                onClick={() => setConfig({ ...config, showShadow: !config.showShadow })}
                className={`w-full h-10 px-4 rounded-xl border-2 transition-all ${
                  config.showShadow
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {config.showShadow ? "Enabled" : "Disabled"}
              </button>
            </div>
          </div>
        </div>

        {/* Preview & Code */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Preview</h3>
            <div className="flex items-center justify-center min-h-200px bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-4">
                {/* Badge with context */}
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-300 rounded-xl flex items-center justify-center">
                    <span className="text-gray-500">Item</span>
                  </div>
                  {renderPreview()}
                </div>
                {/* Standalone */}
                <div>
                  {renderPreview()}
                </div>
              </div>
            </div>
          </div>

          {/* CSS Code */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">CSS Code</h3>
              <button
                onClick={() => copyToClipboard(generateCssCode())}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-black transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono">
              {generateCssCode()}
            </pre>
          </div>
        </div>

        {/* SVG & Tailwind */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SVG Code */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">SVG Code</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(generateSvgCode())}
                  className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-black transition-colors"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={downloadSvg}
                  className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono">
              {generateSvgCode()}
            </pre>
          </div>

          {/* Tailwind Code */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Tailwind Code</h3>
              <button
                onClick={() => copyToClipboard(generateTailwindCode())}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-black transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono">
              {generateTailwindCode()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
