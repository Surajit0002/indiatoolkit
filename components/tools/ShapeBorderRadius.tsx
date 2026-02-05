"use client";

import { useState } from "react";
import { 
  Maximize, 
  Copy, 
  Check, 
  Download, 
  Box,
  Circle,
  Pill,
  Squircle,
  Square
} from "lucide-react";

type ShapeStyle = "square" | "rounded" | "circle" | "capsule" | "squircle" | "leaf" | "blob";

interface BorderRadiusConfig {
  shape: ShapeStyle;
  width: number;
  height: number;
  borderRadius: number;
  borderRadiusTL: number;
  borderRadiusTR: number;
  borderRadiusBL: number;
  borderRadiusBR: number;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  useIndividual: boolean;
}

export default function ShapeBorderRadius() {
  const [config, setConfig] = useState<BorderRadiusConfig>({
    shape: "rounded",
    width: 150,
    height: 150,
    borderRadius: 20,
    borderRadiusTL: 20,
    borderRadiusTR: 20,
    borderRadiusBL: 20,
    borderRadiusBR: 20,
    fillColor: "#6366f1",
    strokeColor: "#4f46e5",
    strokeWidth: 0,
    useIndividual: false
  });
  const [copied, setCopied] = useState(false);

  const shapePresets: { id: ShapeStyle; label: string; icon: React.ReactNode; description: string }[] = [
    { id: "square", label: "Square", icon: <Box className="h-5 w-5" />, description: "No border radius" },
    { id: "rounded", label: "Rounded", icon: <Square className="h-5 w-5" />, description: "Standard rounded corners" },
    { id: "circle", label: "Circle", icon: <Circle className="h-5 w-5" />, description: "Perfect circle when equal" },
    { id: "capsule", label: "Capsule", icon: <Pill className="h-5 w-5" />, description: "Fully rounded ends" },
    { id: "squircle", label: "Squircle", icon: <Squircle className="h-5 w-5" />, description: "Apple-style super ellipse" },
    { id: "leaf", label: "Leaf", icon: <Box className="h-5 w-5" />, description: "One pointed corner" },
    { id: "blob", label: "Blob", icon: <Circle className="h-5 w-5" />, description: "Organic irregular shape" }
  ];

  const applyPreset = (preset: ShapeStyle) => {
    switch (preset) {
      case "square":
        setConfig({ ...config, shape: preset, borderRadius: 0, borderRadiusTL: 0, borderRadiusTR: 0, borderRadiusBL: 0, borderRadiusBR: 0 });
        break;
      case "rounded":
        setConfig({ ...config, shape: preset, borderRadius: 20, borderRadiusTL: 20, borderRadiusTR: 20, borderRadiusBL: 20, borderRadiusBR: 20 });
        break;
      case "circle":
        setConfig({ ...config, shape: preset, width: 150, height: 150, borderRadius: 75, borderRadiusTL: 75, borderRadiusTR: 75, borderRadiusBL: 75, borderRadiusBR: 75 });
        break;
      case "capsule":
        setConfig({ ...config, shape: preset, borderRadius: 75, borderRadiusTL: 75, borderRadiusTR: 75, borderRadiusBL: 75, borderRadiusBR: 75 });
        break;
      case "leaf":
        setConfig({ ...config, shape: preset, borderRadiusTL: 0, borderRadiusTR: 50, borderRadiusBL: 50, borderRadiusBR: 0 });
        break;
      case "blob":
        setConfig({ ...config, shape: preset, borderRadiusTL: 60, borderRadiusTR: 30, borderRadiusBL: 40, borderRadiusBR: 50 });
        break;
    }
  };

  const getBorderRadiusString = () => {
    if (!config.useIndividual) {
      return `${config.borderRadius}px`;
    }
    return `${config.borderRadiusTL}px ${config.borderRadiusTR}px ${config.borderRadiusBL}px ${config.borderRadiusBR}px`;
  };

  const generateCssCode = () => {
    const { width, height, fillColor, strokeColor, strokeWidth } = config;
    return `width: ${width}px;
height: ${height}px;
background-color: ${fillColor};
border: ${strokeWidth}px solid ${strokeColor};
border-radius: ${getBorderRadiusString()};`;
  };

  const generateSvgCode = () => {
    const { width, height, fillColor, strokeColor, strokeWidth } = config;
    const rx = config.useIndividual ? config.borderRadiusTL : config.borderRadius;
    const ry = config.useIndividual ? config.borderRadiusTL : config.borderRadius;
    
    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect 
    x="0" 
    y="0" 
    width="${width}" 
    height="${height}" 
    rx="${config.useIndividual ? config.borderRadiusTL : rx}" 
    ry="${config.useIndividual ? config.borderRadiusTL : ry}"
    fill="${fillColor}" 
    stroke="${strokeColor}" 
    stroke-width="${strokeWidth}"
  />
</svg>`;
  };

  const generateTailwindCode = () => {
    const radius = config.borderRadius;
    let tailwindClass = `w-[${config.width}px] h-[${config.height}px]`;
    
    if (config.borderRadius === 0) {
      tailwindClass += " rounded-none";
    } else if (config.borderRadius === config.height / 2 && config.width === config.height) {
      tailwindClass += " rounded-full";
    } else if (config.borderRadius >= config.height / 2) {
      tailwindClass += " rounded-full";
    } else {
      tailwindClass += ` rounded-[${config.borderRadius}px]`;
    }
    
    return tailwindClass;
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
    link.download = `shape-${config.shape}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderPreview = () => {
    const { width, height, fillColor, strokeColor, strokeWidth, borderRadiusTL, borderRadiusTR, borderRadiusBL, borderRadiusBR, useIndividual } = config;
    
    const style: React.CSSProperties = {
      width,
      height,
      backgroundColor: fillColor,
      border: strokeWidth > 0 ? `${strokeWidth}px solid ${strokeColor}` : "none",
      transition: "all 0.3s ease"
    };

    if (useIndividual) {
      style.borderTopLeftRadius = borderRadiusTL;
      style.borderTopRightRadius = borderRadiusTR;
      style.borderBottomLeftRadius = borderRadiusBL;
      style.borderBottomRightRadius = borderRadiusBR;
    } else {
      style.borderRadius = config.borderRadius;
    }

    return <div style={style} />;
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-indigo-100 rounded-2xl">
              <Maximize className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Shape Border Radius</h2>
          </div>
          <p className="text-gray-500">Create shapes with custom border radius for rounded rectangles, capsules, circles</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
          {/* Shape Presets */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Shape Presets</label>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {shapePresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset.id)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    config.shape === preset.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  title={preset.description}
                >
                  <div className="flex flex-col items-center gap-1">
                    {preset.icon}
                    <span className="text-xs font-medium">{preset.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Width */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Width ({config.width}px)</label>
              <input
                type="range"
                min="20"
                max="300"
                value={config.width}
                onChange={(e) => setConfig({ ...config, width: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Height */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Height ({config.height}px)</label>
              <input
                type="range"
                min="20"
                max="300"
                value={config.height}
                onChange={(e) => setConfig({ ...config, height: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Border Radius */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Border Radius ({config.borderRadius}px)</label>
              <input
                type="range"
                min="0"
                max={Math.max(config.width, config.height)}
                value={config.borderRadius}
                onChange={(e) => setConfig({ ...config, borderRadius: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                disabled={config.useIndividual}
              />
            </div>

            {/* Individual Corners Toggle */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Individual Corners</label>
              <button
                onClick={() => setConfig({ ...config, useIndividual: !config.useIndividual })}
                className={`w-full h-10 px-4 rounded-xl border-2 transition-all ${
                  config.useIndividual
                    ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {config.useIndividual ? "Enabled" : "Disabled"}
              </button>
            </div>
          </div>

          {/* Individual Corner Controls */}
          {config.useIndividual && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: "TL", label: "Top Left", value: config.borderRadiusTL, setter: (v: number) => setConfig({ ...config, borderRadiusTL: v }) },
                { key: "TR", label: "Top Right", value: config.borderRadiusTR, setter: (v: number) => setConfig({ ...config, borderRadiusTR: v }) },
                { key: "BL", label: "Bottom Left", value: config.borderRadiusBL, setter: (v: number) => setConfig({ ...config, borderRadiusBL: v }) },
                { key: "BR", label: "Bottom Right", value: config.borderRadiusBR, setter: (v: number) => setConfig({ ...config, borderRadiusBR: v }) }
              ].map((corner) => (
                <div key={corner.key} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 uppercase">{corner.label}</label>
                  <input
                    type="range"
                    min="0"
                    max={Math.max(config.width, config.height)}
                    value={corner.value}
                    onChange={(e) => corner.setter(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-gray-500">{corner.value}px</span>
                </div>
              ))}
            </div>
          )}

          {/* Colors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fill Color */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Fill Color</label>
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

            {/* Stroke Color */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Stroke Color</label>
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

            {/* Stroke Width */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Stroke Width ({config.strokeWidth}px)</label>
              <input
                type="range"
                min="0"
                max="20"
                value={config.strokeWidth}
                onChange={(e) => setConfig({ ...config, strokeWidth: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Preview & Code */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Preview</h3>
            <div className="flex items-center justify-center min-h-[200px] bg-gray-50 rounded-2xl">
              {renderPreview()}
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              {config.width}px × {config.height}px | Border Radius: {getBorderRadiusString()}
            </p>
          </div>

          {/* CSS Code */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">CSS Code</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(generateCssCode())}
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
                  SVG
                </button>
              </div>
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
              <button
                onClick={() => copyToClipboard(generateSvgCode())}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-black transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy SVG"}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono">
              {generateSvgCode()}
            </pre>
          </div>

          {/* Tailwind Code */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Tailwind Class</h3>
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
