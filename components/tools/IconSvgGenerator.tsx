"use client";

import { useState } from "react";
import { 
  Shapes, 
  Copy, 
  Check, 
  Download, 
  Square, 
  Circle, 
  Triangle, 
  Star,
  Hexagon,
  Pentagon,
  Octagon,
  Diamond
} from "lucide-react";

type ShapeType = "circle" | "square" | "triangle" | "star" | "hexagon" | "pentagon" | "octagon" | "diamond";

interface ShapeConfig {
  shape: ShapeType;
  size: number;
  strokeWidth: number;
  fillColor: string;
  strokeColor: string;
  rotation: number;
  points: number;
}

export default function IconSvgGenerator() {
  const [config, setConfig] = useState<ShapeConfig>({
    shape: "circle",
    size: 100,
    strokeWidth: 2,
    fillColor: "#6366f1",
    strokeColor: "#4f46e5",
    rotation: 0,
    points: 5
  });
  const [copied, setCopied] = useState(false);

  const shapeIcons: Record<ShapeType, React.ReactNode> = {
    circle: <Circle className="h-5 w-5" />,
    square: <Square className="h-5 w-5" />,
    triangle: <Triangle className="h-5 w-5" />,
    star: <Star className="h-5 w-5" />,
    hexagon: <Hexagon className="h-5 w-5" />,
    pentagon: <Pentagon className="h-5 w-5" />,
    octagon: <Octagon className="h-5 w-5" />,
    diamond: <Diamond className="h-5 w-5" />
  };

  const generatePolygonPoints = (sides: number, size: number, rotation: number): string => {
    const points: string[] = [];
    const angleStep = (2 * Math.PI) / sides;
    const offset = (rotation * Math.PI) / 180;

    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2 + offset;
      const x = size + size * Math.cos(angle);
      const y = size + size * Math.sin(angle);
      points.push(`${x},${y}`);
    }

    return points.join(" ");
  };

  const generateStarPoints = (points: number, outerRadius: number, innerRadius: number, rotation: number): string => {
    const step = Math.PI / points;
    const offset = (rotation * Math.PI) / 180;
    const coords: string[] = [];
    const currentSize = config.size;

    for (let i = 0; i < 2 * points; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = i * step - Math.PI / 2 + offset;
      const x = currentSize + radius * Math.cos(angle);
      const y = currentSize + radius * Math.sin(angle);
      coords.push(`${x},${y}`);
    }

    return coords.join(" ");
  };

  const getShapePath = () => {
    const { shape, size, points, rotation } = config;
    const center = size;

    switch (shape) {
      case "circle":
        return `<circle cx="${center}" cy="${center}" r="${size / 2}" />`;
      case "square":
        return `<rect x="${size * 0.1}" y="${size * 0.1}" width="${size * 0.8}" height="${size * 0.8}" rx="${size * 0.1}" />`;
      case "triangle":
        return `<polygon points="${generatePolygonPoints(3, size, rotation)}" />`;
      case "star":
        return `<polygon points="${generateStarPoints(points, size / 2, size / 4, rotation)}" />`;
      case "hexagon":
        return `<polygon points="${generatePolygonPoints(6, size, rotation)}" />`;
      case "pentagon":
        return `<polygon points="${generatePolygonPoints(5, size, rotation)}" />`;
      case "octagon":
        return `<polygon points="${generatePolygonPoints(8, size, rotation)}" />`;
      case "diamond":
        return `<polygon points="${generatePolygonPoints(4, size, rotation)}" />`;
      default:
        return `<circle cx="${center}" cy="${center}" r="${size / 2}" />`;
    }
  };

  const generateSvgCode = () => {
    const { size} = config;
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size * 2} ${size * 2}" xmlns="http://www.w3.org/2000/svg">
  ${getShapePath()}
</svg>`;
  };

  const generateCssCode = () => {
    const { shape, size, fillColor, strokeColor, strokeWidth, rotation } = config;
    
    switch (shape) {
      case "circle":
        return `width: ${size}px;
height: ${size}px;
background-color: ${fillColor};
border-radius: 50%;`;
      case "square":
        return `width: ${size}px;
height: ${size}px;
background-color: ${fillColor};
border-radius: ${size * 0.1}px;`;
      case "star":
        return `/* Star shapes require SVG or clip-path */
width: ${size}px;
height: ${size}px;
background-color: ${fillColor};`;
      default:
        return `width: ${size}px;
height: ${size}px;
background-color: ${fillColor};`;
    }
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
    link.download = `icon-${config.shape}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderPreview = () => {
    const { shape, size, fillColor, strokeColor, strokeWidth, rotation } = config;
    const style: React.CSSProperties = {
      width: size,
      height: size,
      backgroundColor: fillColor,
      border: `${strokeWidth}px solid ${strokeColor}`,
      transition: "all 0.3s ease"
    };

    switch (shape) {
      case "circle":
        return <div style={{ ...style, borderRadius: "50%" }} />;
      case "square":
        return <div style={{ ...style, borderRadius: size * 0.1 }} />;
      case "triangle":
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${fillColor}`,
              filter: `drop-shadow(0 0 2px ${strokeColor})`
            }}
          />
        );
      case "star":
        return (
          <svg width={size} height={size} viewBox={`0 0 ${size * 2} ${size * 2}`}>
            <polygon
              points={generateStarPoints(config.points, size / 2, size / 4, rotation)}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </svg>
        );
      default:
        return (
          <svg width={size} height={size} viewBox={`0 0 ${size * 2} ${size * 2}`}>
            <polygon
              points={generatePolygonPoints(
                shape === "hexagon" ? 6 : shape === "pentagon" ? 5 : shape === "octagon" ? 8 : 4,
                size,
                rotation
              )}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </svg>
        );
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-indigo-100 rounded-2xl">
              <Shapes className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Icon SVG Generator</h2>
          </div>
          <p className="text-gray-500">Generate SVG icons from basic shapes with customizable properties</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Shape Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Shape</label>
              <div className="grid grid-cols-4 gap-2">
                {(["circle", "square", "triangle", "star", "hexagon", "pentagon", "octagon", "diamond"] as ShapeType[]).map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setConfig({ ...config, shape })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      config.shape === shape
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {shapeIcons[shape]}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Size ({config.size}px)</label>
              <input
                type="range"
                min="20"
                max="200"
                value={config.size}
                onChange={(e) => setConfig({ ...config, size: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Stroke Width */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Stroke ({config.strokeWidth}px)</label>
              <input
                type="range"
                min="0"
                max="10"
                value={config.strokeWidth}
                onChange={(e) => setConfig({ ...config, strokeWidth: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

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

            {/* Rotation */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Rotation ({config.rotation}°)</label>
              <input
                type="range"
                min="0"
                max="360"
                value={config.rotation}
                onChange={(e) => setConfig({ ...config, rotation: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Star Points */}
            {config.shape === "star" && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Points ({config.points})</label>
                <input
                  type="range"
                  min="4"
                  max="12"
                  value={config.points}
                  onChange={(e) => setConfig({ ...config, points: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}
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

        {/* CSS Code */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">CSS Code</h3>
            <button
              onClick={() => copyToClipboard(generateCssCode())}
              className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-black transition-colors"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy CSS"}
            </button>
          </div>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono">
            {generateCssCode()}
          </pre>
        </div>
      </div>
    </div>
  );
}
