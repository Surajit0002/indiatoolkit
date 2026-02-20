"use client";

import { useState } from "react";
import { 
  Minus, 
  Copy, 
  Check, 
  Download, 
  Circle,
  ArrowRight,
  Hash,
  Sparkles
} from "lucide-react";

type DividerStyle = "solid" | "dashed" | "dotted" | "double" | "wavy" | "arrows" | "stars" | "hashes" | "gradient";

interface DividerConfig {
  style: DividerStyle;
  width: number;
  height: number;
  color: string;
  thickness: number;
  gap: number;
  opacity: number;
  showText: boolean;
  text: string;
  textColor: string;
  textPosition: "start" | "center" | "end";
  textSize: number;
}

export default function DividerGenerator() {
  const [config, setConfig] = useState<DividerConfig>({
    style: "solid",
    width: 100,
    height: 20,
    color: "#6366f1",
    thickness: 2,
    gap: 8,
    opacity: 100,
    showText: false,
    text: "Section",
    textColor: "#4f46e5",
    textPosition: "center",
    textSize: 14
  });
  const [copied, setCopied] = useState(false);

  const dividerStyles: { id: DividerStyle; label: string; icon: React.ReactNode }[] = [
    { id: "solid", label: "Solid", icon: <Minus className="h-5 w-5" /> },
    { id: "dashed", label: "Dashed", icon: <Minus className="h-5 w-5" /> },
    { id: "dotted", label: "Dotted", icon: <Circle className="h-4 w-4" /> },
    { id: "double", label: "Double", icon: <Minus className="h-5 w-5" /> },
    { id: "wavy", label: "Wavy", icon: <Sparkles className="h-5 w-5" /> },
    { id: "arrows", label: "Arrows", icon: <ArrowRight className="h-5 w-5" /> },
    { id: "stars", label: "Stars", icon: <Sparkles className="h-5 w-5" /> },
    { id: "hashes", label: "Hashes", icon: <Hash className="h-5 w-5" /> },
    { id: "gradient", label: "Gradient", icon: <Sparkles className="h-5 w-5" /> }
  ];

  const getBorderStyle = () => {
    switch (config.style) {
      case "solid": return "solid";
      case "dashed": return "dashed";
      case "dotted": return "dotted";
      case "double": return "double";
      default: return "solid";
    }
  };

  const generateCssCode = () => {
    let css = `.divider {
  display: flex;
  align-items: center;
  width: ${config.width}%;
  margin: 20px 0;
}`;

    if (config.style === "double") {
      css += `

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-top: ${config.thickness}px ${getBorderStyle()} ${config.color};
  border-bottom: ${config.thickness}px ${getBorderStyle()} ${config.color};
}

.divider::before {
  margin-right: ${config.gap}px;
}

.divider::after {
  margin-left: ${config.gap}px;
}`;
    } else {
      css += `

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-top: ${config.thickness}px ${getBorderStyle()} ${config.color};
}

.divider span {
  padding: 0 ${config.gap}px;
}`;
    }

    if (config.showText) {
      css += `

.divider span {
  color: ${config.textColor};
  font-size: ${config.textSize}px;
  white-space: nowrap;
}`;
    }

    return css;
  };

  const generateSvgCode = () => {
    const height = config.style === "double" ? config.thickness * 2 + config.gap : config.thickness;
    let svg = `<svg width="${config.width}%" height="${height}" viewBox="0 0 ${config.width} ${height}" xmlns="http://www.w3.org/2000/svg">`;

    if (config.style === "double") {
      svg += `
  <line x1="0" y1="${config.thickness/2}" x2="${config.width}" y2="${config.thickness/2}" stroke="${config.color}" stroke-width="${config.thickness}" />
  <line x1="0" y1="${height - config.thickness/2}" x2="${config.width}" y2="${height - config.thickness/2}" stroke="${config.color}" stroke-width="${config.thickness}" />`;
    } else if (config.style === "gradient") {
      svg += `
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${config.color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${config.color};stop-opacity:0.5" />
    </linearGradient>
  </defs>
  <line x1="0" y1="${height/2}" x2="${config.width}" y2="${height/2}" stroke="url(#grad)" stroke-width="${config.thickness}" />`;
    } else {
      const dasharray = config.style === "dashed" ? "8,4" : config.style === "dotted" ? "2,4" : "none";
      svg += `
  <line x1="0" y1="${height/2}" x2="${config.width}" y2="${height/2}" stroke="${config.color}" stroke-width="${config.thickness}" stroke-dasharray="${dasharray}" />`;
    }

    if (config.showText) {
      svg += `
  <text x="50%" y="${height/2}" fill="${config.textColor}" font-size="${config.textSize}" text-anchor="middle" dominant-baseline="middle">${config.text}</text>`;
    }

    svg += `
</svg>`;

    return svg;
  };

  const generateHtmlCode = () => {
    let html = `<hr style="
  border: none;
  border-top: ${config.thickness}px ${getBorderStyle()} ${config.color};
  margin: 20px 0;
  opacity: ${config.opacity / 100};
" />`;

    if (config.showText) {
      html += `\n\n<span style="
  display: block;
  text-align: ${config.textPosition};
  padding: 0 10px;
  color: ${config.textColor};
  font-size: ${config.textSize}px;
  margin-top: -${config.thickness + 5}px;
">${config.text}</span>`;
    }

    return html;
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
    link.download = `divider-${config.style}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderPreview = () => {
    const lineStyle: React.CSSProperties = {
      flex: 1,
      borderTop: `${config.thickness}px ${getBorderStyle()} ${config.color}`,
      opacity: config.opacity / 100,
    };

    const doubleStyle: React.CSSProperties = {
      flex: 1,
      borderTop: `${config.thickness}px ${getBorderStyle()} ${config.color}`,
      borderBottom: `${config.thickness}px ${getBorderStyle()} ${config.color}`,
      height: config.gap / 2,
      opacity: config.opacity / 100,
    };

    return (
      <div className="flex items-center w-full">
        {config.style === "double" ? (
          <>
            <div style={{ ...doubleStyle, marginRight: config.gap }} />
            {config.showText && <span style={{ padding: `0 ${config.gap}px`, color: config.textColor, fontSize: config.textSize, whiteSpace: "nowrap" }}>{config.text}</span>}
            <div style={{ ...doubleStyle, marginLeft: config.gap }} />
          </>
        ) : (
          <>
            <div style={lineStyle} />
            {config.showText && <span style={{ padding: `0 ${config.gap}px`, color: config.textColor, fontSize: config.textSize, whiteSpace: "nowrap" }}>{config.text}</span>}
            <div style={lineStyle} />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-indigo-100 rounded-2xl">
              <Minus className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Divider Generator</h2>
          </div>
          <p className="text-gray-500">Generate decorative dividers with various styles</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
          {/* Style Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Divider Style</label>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
              {dividerStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setConfig({ ...config, style: style.id })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    config.style === style.id
                      ? "border-indigo-500 bg-indigo-50 text-indigo-600"
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

          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Width ({config.width}%)</label>
              <input
                type="range"
                min="10"
                max="100"
                value={config.width}
                onChange={(e) => setConfig({ ...config, width: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Height ({config.height}px)</label>
              <input
                type="range"
                min="1"
                max="50"
                value={config.height}
                onChange={(e) => setConfig({ ...config, height: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Thickness ({config.thickness}px)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={config.thickness}
                onChange={(e) => setConfig({ ...config, thickness: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Opacity ({config.opacity}%)</label>
              <input
                type="range"
                min="10"
                max="100"
                value={config.opacity}
                onChange={(e) => setConfig({ ...config, opacity: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Gap */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Gap ({config.gap}px)</label>
            <input
              type="range"
              min="4"
              max="30"
              value={config.gap}
              onChange={(e) => setConfig({ ...config, gap: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Color */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Divider Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={config.color}
                onChange={(e) => setConfig({ ...config, color: e.target.value })}
                className="h-10 w-10 rounded-lg cursor-pointer border-2 border-gray-200"
              />
              <input
                type="text"
                value={config.color}
                onChange={(e) => setConfig({ ...config, color: e.target.value })}
                className="flex-1 h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          {/* Text Options */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Show Text</label>
              <button
                onClick={() => setConfig({ ...config, showText: !config.showText })}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  config.showText
                    ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {config.showText ? "Enabled" : "Disabled"}
              </button>
            </div>

            {config.showText && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Text</label>
                  <input
                    type="text"
                    value={config.text}
                    onChange={(e) => setConfig({ ...config, text: e.target.value })}
                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Text Color</label>
                  <div className="flex gap-2">
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
                      className="flex-1 h-10 px-3 bg-white border border-gray-200 rounded-lg font-mono text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Position</label>
                  <select
                    value={config.textPosition}
                    onChange={(e) => setConfig({ ...config, textPosition: e.target.value as 'start' | 'center' | 'end' })}
                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg"
                  >
                    <option value="start">Start</option>
                    <option value="center">Center</option>
                    <option value="end">End</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Preview</h3>
          <div className="flex items-center justify-center min-h-[100px] bg-gray-50 rounded-2xl p-8">
            {renderPreview()}
          </div>
        </div>

        {/* Code Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CSS */}
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

          {/* HTML */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">HTML Code</h3>
              <button
                onClick={() => copyToClipboard(generateHtmlCode())}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-black transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono">
              {generateHtmlCode()}
            </pre>
          </div>
        </div>

        {/* SVG */}
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
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-indigo-700 transition-colors"
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
      </div>
    </div>
  );
}
