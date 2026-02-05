"use client";

import { useState } from "react";
import { 
  MessageCircle, 
  Copy, 
  Check, 
  Download, 
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Quote
} from "lucide-react";

type CalloutStyle = "rounded" | "square" | "speech" | "thought" | "box" | "alert";
type CalloutPosition = "top" | "bottom" | "left" | "right";

interface CalloutConfig {
  style: CalloutStyle;
  position: CalloutPosition;
  width: number;
  height: number;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  borderRadius: number;
  hasShadow: boolean;
  content: string;
  textColor: string;
  textSize: number;
  fontWeight: "normal" | "medium" | "bold";
}

export default function CalloutGenerator() {
  const [config, setConfig] = useState<CalloutConfig>({
    style: "rounded",
    position: "bottom",
    width: 200,
    height: 100,
    fillColor: "#f0f9ff",
    strokeColor: "#0ea5e9",
    strokeWidth: 2,
    borderRadius: 12,
    hasShadow: true,
    content: "This is a callout message!",
    textColor: "#0369a1",
    textSize: 14,
    fontWeight: "medium"
  });
  const [copied, setCopied] = useState(false);

  const calloutStyles: { id: CalloutStyle; label: string; icon: React.ReactNode }[] = [
    { id: "rounded", label: "Rounded", icon: <MessageCircle className="h-5 w-5" /> },
    { id: "square", label: "Square", icon: <MessageCircle className="h-5 w-5" /> },
    { id: "speech", label: "Speech", icon: <MessageCircle className="h-5 w-5" /> },
    { id: "thought", label: "Thought", icon: <Quote className="h-5 w-5" /> },
    { id: "box", label: "Box", icon: <MessageCircle className="h-5 w-5" /> },
    { id: "alert", label: "Alert", icon: <MessageCircle className="h-5 w-5" /> }
  ];

  const positionArrows: { id: CalloutPosition; label: string; icon: React.ReactNode }[] = [
    { id: "top", label: "Top", icon: <ArrowUp className="h-5 w-5" /> },
    { id: "bottom", label: "Bottom", icon: <ArrowDown className="h-5 w-5" /> },
    { id: "left", label: "Left", icon: <ArrowLeft className="h-5 w-5" /> },
    { id: "right", label: "Right", icon: <ArrowRight className="h-5 w-5" /> }
  ];

  const generateCssCode = () => {
    let bubbleCode = "";

    if (config.style === "speech") {
      bubbleCode = `
  position: relative;
  background: ${config.fillColor};
  border: ${config.strokeWidth}px solid ${config.strokeColor};
  border-radius: ${config.borderRadius}px;
  
  &::after {
    content: "";
    position: absolute;
    ${config.position === "bottom" ? `top: 100%; left: 50%; transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: ${config.strokeColor};` : ""}
    ${config.position === "top" ? `bottom: 100%; left: 50%; transform: translateX(-50%);
    border: 8px solid transparent;
    border-bottom-color: ${config.strokeColor};` : ""}
    ${config.position === "left" ? `right: 100%; top: 50%; transform: translateY(-50%);
    border: 8px solid transparent;
    border-right-color: ${config.strokeColor};` : ""}
    ${config.position === "right" ? `left: 100%; top: 50%; transform: translateY(-50%);
    border: 8px solid transparent;
    border-left-color: ${config.strokeColor};` : ""}
  }`;
    } else if (config.style === "thought") {
      bubbleCode = `
  position: relative;
  background: ${config.fillColor};
  border: ${config.strokeWidth}px solid ${config.strokeColor};
  border-radius: ${config.borderRadius}px;
  
  &::before {
    content: "";
    position: absolute;
    ${config.position === "bottom" ? `top: 100%; left: 30%;
    border: 10px solid transparent;
    border-top-color: ${config.strokeColor};` : ""}
    ${config.position === "top" ? `bottom: 100%; left: 30%;
    border: 10px solid transparent;
    border-bottom-color: ${config.strokeColor};` : ""}
  }`;
    } else {
      bubbleCode = `
  background: ${config.fillColor};
  border: ${config.strokeWidth}px solid ${config.strokeColor};
  border-radius: ${config.style === "square" ? "4px" : `${config.borderRadius}px`};`;
    }

    return `.callout {
  width: ${config.width}px;
  min-height: ${config.height}px;
  padding: 16px;
  color: ${config.textColor};
  font-size: ${config.textSize}px;
  font-weight: ${config.fontWeight};${config.hasShadow ? `
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);` : ""}
  ${config.style === "alert" ? `border-left: 4px solid ${config.strokeColor};` : ""}${bubbleCode}
}`;
  };

  const generateSvgCode = () => {
    const { width, height, borderRadius, fillColor, strokeColor, strokeWidth, style, position, textColor, textSize, content } = config;
    
    let svg = `<svg width="${width}" height="${height + (style === "speech" || style === "thought" ? 20 : 0)}" viewBox="0 0 ${width} ${height + (style === "speech" || style === "thought" ? 20 : 0)}" xmlns="http://www.w3.org/2000/svg">`;
    
    svg += `
  <rect 
    x="0" 
    y="${style === "speech" || style === "thought" ? 10 : 0}" 
    width="${width}" 
    height="${height}" 
    rx="${style === "square" ? 4 : borderRadius}" 
    fill="${fillColor}" 
    stroke="${strokeColor}" 
    stroke-width="${strokeWidth}"
  />`;

    if (style === "speech" && position === "bottom") {
      svg += `
  <polygon points="${width/2 - 10},${height + 10} ${width/2},${height + 20} ${width/2 + 10},${height + 10}" fill="${strokeColor}" />`;
    } else if (style === "speech" && position === "top") {
      svg += `
  <polygon points="${width/2 - 10},10 ${width/2},0 ${width/2 + 10},10" fill="${strokeColor}" />`;
    }

    svg += `
  <text x="${width/2}" y="${height/2 + 10}" fill="${textColor}" font-size="${textSize}" text-anchor="middle">${content}</text>
</svg>`;

    return svg;
  };

  const generateTailwindCode = () => {
    return `<div class="relative p-4 rounded-lg" style="
  width: ${config.width}px;
  min-height: ${config.height}px;
  background-color: ${config.fillColor};
  border: ${config.strokeWidth}px solid ${config.strokeColor};
  color: ${config.textColor};
  font-size: ${config.textSize}px;
  font-weight: ${config.fontWeight};
  ${config.hasShadow ? "box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" : ""}
  ${config.style === "alert" ? `border-left: 4px solid ${config.strokeColor};` : ""}
  ${config.style !== "square" ? `border-radius: ${config.borderRadius}px;` : "border-radius: 4px;"}
">
  ${config.content}
  ${config.style === "speech" ? `<div class="absolute w-0 h-0" style="
    ${config.position === "bottom" ? `top: 100%; left: 50%;
    border: 8px solid transparent;
    border-top-color: ${config.strokeColor};` : ""}
  "></div>` : ""}
</div>`;
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
    link.download = `callout-${config.style}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderPreview = () => {
    const style: React.CSSProperties = {
      width: config.width,
      minHeight: config.height,
      backgroundColor: config.fillColor,
      border: `${config.strokeWidth}px solid ${config.strokeColor}`,
      borderRadius: config.style === "square" ? "4px" : `${config.borderRadius}px`,
      color: config.textColor,
      fontSize: config.textSize,
      fontWeight: config.fontWeight,
      boxShadow: config.hasShadow ? "0 4px 6px rgba(0, 0, 0, 0.1)" : undefined,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "16px",
      transition: "all 0.3s ease"
    };

    if (config.style === "alert") {
      style.borderLeft = `4px solid ${config.strokeColor}`;
    }

    return (
      <div style={style}>
        {config.content}
        {config.style === "speech" && (
          <div
            className="absolute"
            style={{
              width: 0,
              height: 0,
              [config.position === "bottom" ? "top" : "bottom"]: "100%",
              [config.position === "bottom" || config.position === "top" ? "left" : "right"]: "50%",
              border: "8px solid transparent",
              [config.position === "bottom" ? "borderTopColor" : "borderBottomColor"]: config.strokeColor,
              transform: config.position === "bottom" || config.position === "top" ? "translateX(-50%)" : "translateY(-50%) rotate(90deg)",
            }}
          />
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
            <div className="p-3 bg-sky-100 rounded-2xl">
              <MessageCircle className="h-6 w-6 text-sky-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Callout Generator</h2>
          </div>
          <p className="text-gray-500">Create callout boxes and speech bubbles with customizable shapes</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
          {/* Style Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Callout Style</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {calloutStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setConfig({ ...config, style: style.id })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    config.style === style.id
                      ? "border-sky-500 bg-sky-50 text-sky-600"
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

          {/* Pointer Position */}
          {(config.style === "speech" || config.style === "thought") && (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Pointer Position</label>
              <div className="flex gap-2">
                {positionArrows.map((pos) => (
                  <button
                    key={pos.id}
                    onClick={() => setConfig({ ...config, position: pos.id })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      config.position === pos.id
                        ? "border-sky-500 bg-sky-50 text-sky-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    title={pos.label}
                  >
                    {pos.icon}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Width ({config.width}px)</label>
              <input
                type="range"
                min="100"
                max="400"
                value={config.width}
                onChange={(e) => setConfig({ ...config, width: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Height ({config.height}px)</label>
              <input
                type="range"
                min="50"
                max="200"
                value={config.height}
                onChange={(e) => setConfig({ ...config, height: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Border Radius ({config.borderRadius}px)</label>
              <input
                type="range"
                min="0"
                max="30"
                value={config.borderRadius}
                onChange={(e) => setConfig({ ...config, borderRadius: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                disabled={config.style === "square"}
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
          </div>

          {/* Text & Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Content</label>
              <input
                type="text"
                value={config.content}
                onChange={(e) => setConfig({ ...config, content: e.target.value })}
                className="w-full h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Font Size ({config.textSize}px)</label>
              <input
                type="range"
                min="10"
                max="24"
                value={config.textSize}
                onChange={(e) => setConfig({ ...config, textSize: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Font Weight</label>
              <select
                value={config.fontWeight}
                onChange={(e) => setConfig({ ...config, fontWeight: e.target.value as any })}
                className="w-full h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg"
              >
                <option value="normal">Normal</option>
                <option value="medium">Medium</option>
                <option value="bold">Bold</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Shadow</label>
              <button
                onClick={() => setConfig({ ...config, hasShadow: !config.hasShadow })}
                className={`w-full h-10 px-4 rounded-xl border-2 transition-all ${
                  config.hasShadow
                    ? "border-sky-500 bg-sky-50 text-sky-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {config.hasShadow ? "Enabled" : "Disabled"}
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Preview</h3>
          <div className="flex items-center justify-center min-h-[200px] bg-gray-50 rounded-2xl p-8">
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

          {/* Tailwind */}
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
                className="px-3 py-1.5 bg-sky-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-sky-700 transition-colors"
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
