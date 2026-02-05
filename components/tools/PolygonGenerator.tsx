"use client";

import { useState } from "react";
import { 
  Triangle, 
  Copy, 
  Check, 
  Download, 
  RotateCw,
  Pentagon,
  Hexagon,
  Octagon,
  Square,
  Circle
} from "lucide-react";

export default function PolygonGenerator() {
  const [sides, setSides] = useState(5);
  const [size, setSize] = useState(100);
  const [fillColor, setFillColor] = useState("#6366f1");
  const [strokeColor, setStrokeColor] = useState("#4f46e5");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [rotation, setRotation] = useState(0);
  const [fillEnabled, setFillEnabled] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePolygonPoints = (sides: number, size: number, rotation: number): string => {
    const points: string[] = [];
    const angleStep = (2 * Math.PI) / sides;
    const offset = (rotation * Math.PI) / 180;
    const center = size;

    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2 + offset;
      const x = center + size * Math.cos(angle);
      const y = center + size * Math.sin(angle);
      points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }

    return points.join(" ");
  };

  const generateSvgCode = () => {
    const points = generatePolygonPoints(sides, size, rotation);
    return `<svg width="${size * 2}" height="${size * 2}" viewBox="0 0 ${size * 2} ${size * 2}" xmlns="http://www.w3.org/2000/svg">
  <polygon 
    points="${points}" 
    fill="${fillEnabled ? fillColor : "none"}" 
    stroke="${strokeColor}" 
    stroke-width="${strokeWidth}"
  />
</svg>`;
  };

  const generateCssCode = () => {
    if (sides < 3) return "/* Invalid polygon */";
    
    if (sides === 3) {
      return `width: ${size * 2}px;
height: ${size * 2}px;
background-color: ${fillColor};
clip-path: polygon(50% 0%, 0% 100%, 100% 100%);`;
    }
    
    if (sides === 4) {
      return `width: ${size * 2}px;
height: ${size * 2}px;
background-color: ${fillColor};
transform: rotate(${rotation}deg);
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);`;
    }
    
    return `/* Complex polygons require SVG or clip-path */
width: ${size * 2}px;
height: ${size * 2}px;
background-color: ${fillColor};`;
  };

  const generateTailwindClipPath = () => {
    if (sides === 3) {
      return `clip-path: polygon(50% 0%, 0% 100%, 100% 100%);`;
    }
    if (sides === 4) {
      return `clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);`;
    }
    return `/* Complex clip-path for ${sides} sides */`;
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
    link.download = `polygon-${sides}-sides.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const sideOptions = [
    { value: 3, label: "Triangle", icon: <Triangle className="h-5 w-5" /> },
    { value: 4, label: "Square", icon: <Square className="h-5 w-5" /> },
    { value: 5, label: "Pentagon", icon: <Pentagon className="h-5 w-5" /> },
    { value: 6, label: "Hexagon", icon: <Hexagon className="h-5 w-5" /> },
    { value: 7, label: "Heptagon", icon: <Circle className="h-5 w-5" /> },
    { value: 8, label: "Octagon", icon: <Octagon className="h-5 w-5" /> },
    { value: 9, label: "Nonagon", icon: <Circle className="h-5 w-5" /> },
    { value: 10, label: "Decagon", icon: <Circle className="h-5 w-5" /> },
    { value: 12, label: "Dodecagon", icon: <Circle className="h-5 w-5" /> }
  ];

  const renderPreview = () => {
    const points = generatePolygonPoints(sides, size, rotation);
    return (
      <svg width={size * 2} height={size * 2} viewBox={`0 0 ${size * 2} ${size * 2}`}>
        <polygon
          points={points}
          fill={fillEnabled ? fillColor : "none"}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-indigo-100 rounded-2xl">
              <Pentagon className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Polygon Generator</h2>
          </div>
          <p className="text-gray-500">Generate regular polygons with customizable sides, size, and styling</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
          {/* Side Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Number of Sides</label>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
              {sideOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSides(option.value)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    sides === option.value
                      ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  title={option.label}
                >
                  <div className="flex flex-col items-center gap-1">
                    {option.icon}
                    <span className="text-xs">{option.value}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Size ({size}px)</label>
              <input
                type="range"
                min="20"
                max="200"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Rotation ({rotation}°)</label>
              <input
                type="range"
                min="0"
                max="360"
                value={rotation}
                onChange={(e) => setRotation(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Stroke Width ({strokeWidth}px)</label>
              <input
                type="range"
                min="0"
                max="20"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Fill</label>
              <button
                onClick={() => setFillEnabled(!fillEnabled)}
                className={`w-full h-10 px-4 rounded-xl border-2 transition-all ${
                  fillEnabled
                    ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {fillEnabled ? "Enabled" : "Disabled"}
              </button>
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Fill Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={fillColor}
                  onChange={(e) => setFillColor(e.target.value)}
                  className="h-10 w-10 rounded-lg cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={fillColor}
                  onChange={(e) => setFillColor(e.target.value)}
                  className="flex-1 h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Stroke Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={strokeColor}
                  onChange={(e) => setStrokeColor(e.target.value)}
                  className="h-10 w-10 rounded-lg cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={strokeColor}
                  onChange={(e) => setStrokeColor(e.target.value)}
                  className="flex-1 h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview & Code */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Preview</h3>
            <div className="flex items-center justify-center min-h-[300px] bg-gray-50 rounded-2xl">
              {renderPreview()}
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              {sides === 3 ? "Triangle" : sides === 4 ? "Square" : `${sides}-sided Polygon`}
            </p>
          </div>

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

        {/* CSS & Points */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

          {/* Points */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Polygon Points</h3>
              <button
                onClick={() => copyToClipboard(generatePolygonPoints(sides, size, rotation))}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-black transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono">
              {generatePolygonPoints(sides, size, rotation)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
