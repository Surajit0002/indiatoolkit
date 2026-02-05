"use client";

import { useState, useRef, useEffect } from "react";
import { 
  PenTool, 
  Copy, 
  Check, 
  Download, 
  Undo, 
  Redo, 
  Trash2,
  MousePointer,
  Minus,
  Zap,
  Move
} from "lucide-react";

type ToolType = "select" | "pen" | "line" | "curve" | "move";

interface PathPoint {
  x: number;
  y: number;
  type: "move" | "line" | "curve";
  cp1?: { x: number; y: number };
  cp2?: { x: number; y: number };
}

export default function SvgPathGenerator() {
  const [pathData, setPathData] = useState("");
  const [points, setPoints] = useState<PathPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [activeTool, setActiveTool] = useState<ToolType>("pen");
  const [fillColor, setFillColor] = useState("#6366f1");
  const [strokeColor, setStrokeColor] = useState("#4f46e5");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [fillEnabled, setFillEnabled] = useState(true);
  const [history, setHistory] = useState<PathPoint[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 300 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const generatePath = () => {
    if (points.length === 0) return "";

    let d = "";
    points.forEach((point, index) => {
      if (index === 0) {
        d += `M ${point.x} ${point.y}`;
      } else {
        const prev = points[index - 1];
        
        if (point.type === "line") {
          d += ` L ${point.x} ${point.y}`;
        } else if (point.type === "curve" && point.cp1 && point.cp2) {
          d += ` C ${point.cp1.x} ${point.cp1.y}, ${point.cp2.x} ${point.cp2.y}, ${point.x} ${point.y}`;
        } else {
          d += ` L ${point.x} ${point.y}`;
        }
      }
    });

    if (points.length > 2 && fillEnabled) {
      d += " Z";
    }

    return d;
  };

  useEffect(() => {
    const newPath = generatePath();
    setPathData(newPath);
  }, [points, fillEnabled]);

  const addToHistory = (newPoints: PathPoint[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newPoints);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === "pen") {
      const newPoints = [...points];
      
      if (points.length > 0) {
        newPoints.push({
          x,
          y,
          type: "line",
          cp1: { x: x - 30, y },
          cp2: { x: x + 30, y }
        });
      } else {
        newPoints.push({ x, y, type: "move" });
      }
      
      addToHistory(newPoints);
      setPoints(newPoints);
      setSelectedPoint(newPoints.length - 1);
    } else if (activeTool === "move" && selectedPoint !== null) {
      const newPoints = [...points];
      newPoints[selectedPoint] = { ...newPoints[selectedPoint], x, y };
      addToHistory(newPoints);
      setPoints(newPoints);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setPoints(history[historyIndex - 1]);
    } else if (historyIndex === 0) {
      setHistoryIndex(-1);
      setPoints([]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setPoints(history[nextIndex]);
    }
  };

  const handleClear = () => {
    setPoints([]);
    setHistory([]);
    setHistoryIndex(-1);
    setSelectedPoint(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSvg = () => {
    const svgContent = `<svg width="${canvasSize.width}" height="${canvasSize.height}" viewBox="0 0 ${canvasSize.width} ${canvasSize.height}" xmlns="http://www.w3.org/2000/svg">
  <path d="${pathData}" fill="${fillEnabled ? fillColor : "none"}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
</svg>`;
    
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "custom-path.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateSvgCode = () => {
    return `<svg width="${canvasSize.width}" height="${canvasSize.height}" viewBox="0 0 ${canvasSize.width} ${canvasSize.height}" xmlns="http://www.w3.org/2000/svg">
  <path 
    d="${pathData}" 
    fill="${fillEnabled ? fillColor : "none"}" 
    stroke="${strokeColor}" 
    stroke-width="${strokeWidth}" 
  />
</svg>`;
  };

  const presetPaths = [
    { name: "Heart", d: "M 150 250 C 50 150, 0 100, 50 50 C 100 0, 150 50, 150 100 C 150 50, 200 0, 250 50 C 300 100, 250 150, 150 250 Z" },
    { name: "Lightning", d: "M 150 0 L 200 100 L 140 100 L 180 200 L 120 120 L 180 120 Z" },
    { name: "Checkmark", d: "M 50 150 L 120 220 L 250 50" },
    { name: "Wave", d: "M 0 150 Q 75 50, 150 150 T 300 150" }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-indigo-100 rounded-2xl">
              <PenTool className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">SVG Path Generator</h2>
          </div>
          <p className="text-gray-500">Generate SVG path data for custom shapes and icons with visual path builder</p>
        </div>

        {/* Tools & Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
          {/* Drawing Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Drawing Tool</label>
              <div className="flex gap-2">
                {[
                  { id: "pen", icon: <PenTool className="h-5 w-5" />, label: "Pen" },
                  { id: "move", icon: <Move className="h-5 w-5" />, label: "Move" },
                  { id: "line", icon: <Minus className="h-5 w-5" />, label: "Line" },
                  { id: "curve", icon: <Zap className="h-5 w-5" />, label: "Curve" }
                ].map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id as ToolType)}
                    className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                      activeTool === tool.id
                        ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    title={tool.label}
                  >
                    {tool.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Actions</label>
              <div className="flex gap-2">
                <button
                  onClick={handleUndo}
                  disabled={historyIndex < 0}
                  className="p-3 rounded-xl border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-300 transition-all"
                  title="Undo"
                >
                  <Undo className="h-5 w-5" />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={historyIndex >= history.length - 1}
                  className="p-3 rounded-xl border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-300 transition-all"
                  title="Redo"
                >
                  <Redo className="h-5 w-5" />
                </button>
                <button
                  onClick={handleClear}
                  className="p-3 rounded-xl border-2 border-red-200 text-red-600 hover:border-red-300 transition-all"
                  title="Clear"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Fill Toggle */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Fill</label>
              <button
                onClick={() => setFillEnabled(!fillEnabled)}
                className={`w-full p-3 rounded-xl border-2 transition-all ${
                  fillEnabled
                    ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {fillEnabled ? "Enabled" : "Disabled"}
              </button>
            </div>

            {/* Colors */}
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
        </div>

        {/* Preset Paths */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start - Preset Paths</h3>
          <div className="flex flex-wrap gap-3">
            {presetPaths.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  setPoints([]);
                  setHistory([]);
                  setHistoryIndex(-1);
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas & Code */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Drawing Canvas */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Draw Here</h3>
              <span className="text-sm text-gray-500">{points.length} points</span>
            </div>
            <div
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="relative w-full h-[300px] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 cursor-crosshair overflow-hidden"
              style={{ minHeight: "300px" }}
            >
              <svg width="100%" height="100%" viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}>
                {/* Grid */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Path preview */}
                {pathData && (
                  <path
                    d={pathData}
                    fill={fillEnabled ? fillColor : "none"}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Control points */}
                {points.map((point, index) => (
                  <g key={index}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={6}
                      fill={selectedPoint === index ? "#4f46e5" : "#6366f1"}
                      stroke="white"
                      strokeWidth={2}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPoint(index);
                      }}
                    />
                    {index > 0 && (
                      <circle
                        cx={points[index - 1].x}
                        cy={points[index - 1].y}
                        r={4}
                        fill="#9ca3af"
                        stroke="white"
                        strokeWidth={2}
                      />
                    )}
                  </g>
                ))}
              </svg>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Click on the canvas to draw. Use the pen tool to add points.
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

        {/* Path Data */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Path Data (d attribute)</h3>
            <button
              onClick={() => copyToClipboard(pathData)}
              className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-black transition-colors"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <code className="text-sm font-mono text-gray-700 break-all">{pathData || "Click on the canvas to start drawing..."}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
