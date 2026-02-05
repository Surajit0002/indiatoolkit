"use client";

import { useState } from "react";
import { 
  Star, 
  Copy, 
  Check, 
  Download, 
  Sparkles,
  RotateCw
} from "lucide-react";

export default function StarShapeGenerator() {
  const [points, setPoints] = useState(5);
  const [outerRadius, setOuterRadius] = useState(80);
  const [innerRadius, setInnerRadius] = useState(40);
  const [fillColor, setFillColor] = useState("#fbbf24");
  const [strokeColor, setStrokeColor] = useState("#f59e0b");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [rotation, setRotation] = useState(0);
  const [fillEnabled, setFillEnabled] = useState(true);
  const [copied, setCopied] = useState(false);

  const generateStarPoints = (points: number, outerRadius: number, innerRadius: number, rotation: number): string => {
    const step = Math.PI / points;
    const offset = (rotation * Math.PI) / 180;
    const coords: string[] = [];
    const center = Math.max(outerRadius, innerRadius) * 1.5;

    for (let i = 0; i < 2 * points; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = i * step - Math.PI / 2 + offset;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      coords.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }

    return coords.join(" ");
  };

  const generateSvgCode = () => {
    const starPoints = generateStarPoints(points, outerRadius, innerRadius, rotation);
    const center = Math.max(outerRadius, innerRadius) * 3;
    return `<svg width="${center}" height="${center}" viewBox="0 0 ${center} ${center}" xmlns="http://www.w3.org/2000/svg">
  <polygon 
    points="${starPoints}" 
    fill="${fillEnabled ? fillColor : "none"}" 
    stroke="${strokeColor}" 
    stroke-width="${strokeWidth}"
  />
</svg>`;
  };

  const generateCssCode = () => {
    return `/* Star shapes require SVG or clip-path */
width: ${outerRadius * 2}px;
height: ${outerRadius * 2}px;
background-color: ${fillColor};
clip-path: polygon(
  ${generateStarPoints(points, 50, 25, rotation).split(" ").map((p, i) => {
    const [x, y] = p.split(",");
    return `${(parseFloat(x) / (outerRadius * 3)) * 100}% ${(parseFloat(y) / (outerRadius * 3)) * 100}%`;
  }).join(",\n  ")}
);`;
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
    link.download = `star-${points}-points.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderPreview = () => {
    const starPoints = generateStarPoints(points, outerRadius, innerRadius, rotation);
    const center = Math.max(outerRadius, innerRadius) * 1.5;
    return (
      <svg width={center * 2} height={center * 2} viewBox={`0 0 ${center * 2} ${center * 2}`}>
        <polygon
          points={starPoints}
          fill={fillEnabled ? fillColor : "none"}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  };

  const starPresets = [
    { label: "4-Point", points: 4 },
    { label: "5-Point", points: 5 },
    { label: "6-Point", points: 6 },
    { label: "8-Point", points: 8 },
    { label: "12-Point", points: 12 }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-amber-100 rounded-2xl">
              <Star className="h-6 w-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Star Shape Generator</h2>
          </div>
          <p className="text-gray-500">Generate star shapes with adjustable points, inner/outer radius</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
          {/* Point Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Number of Points</label>
            <div className="flex flex-wrap gap-3">
              {starPresets.map((preset) => (
                <button
                  key={preset.points}
                  onClick={() => {
                    setPoints(preset.points);
                    if (preset.points <= 5) {
                      setInnerRadius(outerRadius * 0.4);
                    } else {
                      setInnerRadius(outerRadius * 0.6);
                    }
                  }}
                  className={`px-4 py-2 rounded-xl border-2 transition-all ${
                    points === preset.points
                      ? "border-amber-500 bg-amber-50 text-amber-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Outer Radius ({outerRadius}px)</label>
              <input
                type="range"
                min="30"
                max="150"
                value={outerRadius}
                onChange={(e) => {
                  setOuterRadius(parseInt(e.target.value));
                  setInnerRadius(Math.round(parseInt(e.target.value) * 0.5));
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Inner Radius ({innerRadius}px)</label>
              <input
                type="range"
                min="10"
                max={outerRadius}
                value={innerRadius}
                onChange={(e) => setInnerRadius(parseInt(e.target.value))}
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
          </div>

          {/* Colors & Fill */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Fill</label>
              <button
                onClick={() => setFillEnabled(!fillEnabled)}
                className={`w-full h-10 px-4 rounded-xl border-2 transition-all ${
                  fillEnabled
                    ? "border-amber-500 bg-amber-50 text-amber-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {fillEnabled ? "Enabled" : "Disabled"}
              </button>
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
              {points}-point star | Outer: {outerRadius}px | Inner: {innerRadius}px
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
                  className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-amber-700 transition-colors"
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

        {/* Points & CSS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Points */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Star Points</h3>
              <button
                onClick={() => copyToClipboard(generateStarPoints(points, outerRadius, innerRadius, rotation))}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-black transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono">
              {generateStarPoints(points, outerRadius, innerRadius, rotation)}
            </pre>
          </div>

          {/* CSS */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">CSS Reference</h3>
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
      </div>
    </div>
  );
}
