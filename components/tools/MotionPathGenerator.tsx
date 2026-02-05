"use client";

import React, { useState, useEffect, useRef, forwardRef, RefObject } from "react";
import { 
  Copy, 
  Check, 
  Move, 
  Play, 
  Pause,
  RefreshCw,
  Route,
  Zap,
  MousePointer2,
  Circle,
  Square,
  Triangle,
  Star
} from "lucide-react";

type PathShape = "line" | "circle" | "wave" | "spiral" | "custom";
type EasingType = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "cubic-bezier";

type MotionPathConfig = {
  shape: PathShape;
  duration: number;
  easing: EasingType;
  iterations: number | "infinite";
  direction: "normal" | "reverse" | "alternate";
  fillMode: "none" | "forwards" | "backwards" | "both";
  elementSize: number;
  elementColor: string;
  pathColor: string;
  pathWidth: number;
  strokeDasharray: number;
  strokeDashoffset: number;
  rotateElement: boolean;
}

const pathShapes: { id: PathShape; label: string; icon: React.ReactNode; description: string }[] = [
  { id: "line", label: "Line", icon: <Move className="h-5 w-5" />, description: "Straight line movement" },
  { id: "circle", label: "Circle", icon: <Circle className="h-5 w-5" />, description: "Circular path" },
  { id: "wave", label: "Wave", icon: <Route className="h-5 w-5" />, description: "Sine wave path" },
  { id: "spiral", label: "Spiral", icon: <RefreshCw className="h-5 w-5" />, description: "Spiral movement" },
  { id: "custom", label: "Custom", icon: <MousePointer2 className="h-5 w-5" />, description: "Custom SVG path" }
];

export default function MotionPathGenerator() {
  const [config, setConfig] = useState<MotionPathConfig>({
    shape: "circle",
    duration: 3,
    easing: "linear",
    iterations: 1,
    direction: "normal",
    fillMode: "forwards",
    elementSize: 24,
    elementColor: "#6366f1",
    pathColor: "#e5e7eb",
    pathWidth: 2,
    strokeDasharray: 0,
    strokeDashoffset: 0,
    rotateElement: true
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPlaying && elementRef.current) {
      elementRef.current.style.animation = "none";
      elementRef.current.offsetHeight;
      elementRef.current.style.animation = `motion-path ${config.duration}s ${config.easing} ${config.iterations} ${config.direction} ${config.fillMode}`;
      
      const iterationsCount = typeof config.iterations === "number" ? config.iterations : 1;
      setTimeout(() => {
        setIsPlaying(false);
      }, config.duration * 1000 * iterationsCount + 100);
    }
  }, [isPlaying, config, previewKey]);

  const getPathDefinition = () => {
    switch (config.shape) {
      case "line":
        return "M 50,150 L 350,150";
      case "circle":
        return "M 200,50 A 100,100 0 1,1 200,250 A 100,100 0 1,1 200,50";
      case "wave":
        return "M 50,150 Q 125,50 200,150 T 350,150";
      case "spiral":
        return "M 200,150 C 200,100 250,100 250,150 C 250,200 150,200 150,150 C 150,100 300,100 300,150 C 300,250 100,250 100,150";
      case "custom":
        return "M 50,200 C 100,100 150,100 200,200 S 300,100 350,200";
      default:
        return "M 50,150 L 350,150";
    }
  };

  const generateKeyframes = () => {
    const shape = config.shape;
    
    if (shape === "line") {
      return `
@keyframes motion-path {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}`;
    } else if (shape === "circle") {
      return `
@keyframes motion-path {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}`;
    } else if (shape === "wave") {
      return `
@keyframes motion-path {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}`;
    } else if (shape === "spiral") {
      return `
@keyframes motion-path {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}`;
    } else {
      return `
@keyframes motion-path {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}`;
    }
  };

  const generateCssCode = () => {
    const { shape, duration, easing, iterations, direction, fillMode, elementSize, elementColor, pathColor, pathWidth, rotateElement } = config;
    const pathD = getPathDefinition();

    return `.motion-container {
  position: relative;
  width: 400px;
  height: 300px;
}

.motion-path {
  fill: none;
  stroke: ${pathColor};
  stroke-width: ${pathWidth}px;
}

.motion-element {
  position: absolute;
  width: ${elementSize}px;
  height: ${elementSize}px;
  background: ${elementColor};
  border-radius: ${shape === "circle" ? "50%" : "4px"};
  offset-path: path("${pathD}");
  animation: motion-path ${duration}s ${easing} ${iterations} ${direction} ${fillMode};
  ${rotateElement ? "offset-rotate: auto;" : "offset-rotate: 0deg;"}
}

@keyframes motion-path {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}`;
  };

  const generateTailwindCode = () => {
    return `/* Add to your CSS */
${generateKeyframes()}

/* HTML structure */
<div class="relative w-[400px] h-[300px]">
  <svg class="absolute inset-0 w-full h-full">
    <path 
      d="${getPathDefinition()}" 
      fill="none" 
      stroke="${config.pathColor}" 
      stroke-width="${config.pathWidth}"
    />
  </svg>
  <div 
    class="absolute"
    style="
      width: ${config.elementSize}px;
      height: ${config.elementSize}px;
      background: ${config.elementColor};
      border-radius: ${config.shape === "circle" ? "50%" : "4px"};
      offset-path: path('${getPathDefinition()}');
      animation: motion-path ${config.duration}s ${config.easing} ${config.iterations} ${config.direction} ${config.fillMode};
      ${config.rotateElement ? "offset-rotate: auto;" : ""}
    "
  />
</div>`;
  };

  const generateFramerMotionCode = () => {
    const iterationsValue = config.iterations === "infinite" ? "Infinity" : config.iterations;
    return `// React with Framer Motion
import { motion } from "framer-motion";

const pathData = "${getPathDefinition()}";

const variants = {
  animate: {
    offsetDistance: ["0%", "100%"],
    transition: {
      duration: ${config.duration},
      repeat: ${iterationsValue},
      repeatType: "${config.direction === "alternate" ? "reverse" : "loop"}",
      ease: "${config.easing}"
    }
  }
};

// Note: Use CSS offset-path for better browser support
// Framer Motion doesn't fully support offset-path yet`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playAnimation = () => {
    setPreviewKey(prev => prev + 1);
    setIsPlaying(true);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-teal-100 rounded-2xl">
              <Route className="h-6 w-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Motion Path Generator</h2>
          </div>
          <p className="text-gray-500">Create animations that follow SVG paths along custom trajectories</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
            {/* Path Shape */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Path Shape</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {pathShapes.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => setConfig({ ...config, shape: shape.id })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      config.shape === shape.id
                        ? "border-teal-500 bg-teal-50 text-teal-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    title={shape.description}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {shape.icon}
                      <span className="text-xs">{shape.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Animation Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Duration ({config.duration}s)</label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={config.duration}
                  onChange={(e) => setConfig({ ...config, duration: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Iterations</label>
                <select
                  value={typeof config.iterations === "number" ? config.iterations.toString() : config.iterations}
                  onChange={(e) => setConfig({ ...config, iterations: e.target.value as any })}
                  className="w-full h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="infinite">Infinite</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Easing</label>
                <select
                  value={config.easing}
                  onChange={(e) => setConfig({ ...config, easing: e.target.value as EasingType })}
                  className="w-full h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg"
                >
                  <option value="linear">Linear</option>
                  <option value="ease">Ease</option>
                  <option value="ease-in">Ease In</option>
                  <option value="ease-out">Ease Out</option>
                  <option value="ease-in-out">Ease In Out</option>
                </select>
              </div>
            </div>

            {/* Direction & Fill */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Direction</label>
                <select
                  value={config.direction}
                  onChange={(e) => setConfig({ ...config, direction: e.target.value as any })}
                  className="w-full h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg"
                >
                  <option value="normal">Normal</option>
                  <option value="reverse">Reverse</option>
                  <option value="alternate">Alternate</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Fill Mode</label>
                <select
                  value={config.fillMode}
                  onChange={(e) => setConfig({ ...config, fillMode: e.target.value as any })}
                  className="w-full h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg"
                >
                  <option value="none">None</option>
                  <option value="forwards">Forwards</option>
                  <option value="backwards">Backwards</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            {/* Element Settings */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Moving Element</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-500">Size: {config.elementSize}px</label>
                  <input
                    type="range"
                    min="12"
                    max="48"
                    value={config.elementSize}
                    onChange={(e) => setConfig({ ...config, elementSize: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500">Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={config.elementColor}
                      onChange={(e) => setConfig({ ...config, elementColor: e.target.value })}
                      className="h-8 w-8 rounded cursor-pointer border-0"
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs text-gray-500">Options</label>
                  <button
                    onClick={() => setConfig({ ...config, rotateElement: !config.rotateElement })}
                    className={`w-full h-8 px-3 rounded-lg text-sm border transition-colors ${
                      config.rotateElement ? "bg-teal-100 border-teal-300 text-teal-700" : "bg-gray-100 border-gray-200"
                    }`}
                  >
                    {config.rotateElement ? "✓ Rotate with Path" : "○ No Rotation"}
                  </button>
                </div>
              </div>
            </div>

            {/* Path Settings */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Path Styling</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-500">Path Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={config.pathColor}
                      onChange={(e) => setConfig({ ...config, pathColor: e.target.value })}
                      className="h-8 w-8 rounded cursor-pointer border-0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500">Width: {config.pathWidth}px</label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={config.pathWidth}
                    onChange={(e) => setConfig({ ...config, pathWidth: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
                <button
                  onClick={playAnimation}
                  className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-teal-700 transition-colors"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? "Playing..." : "Play"}
                </button>
              </div>
              <div className="relative bg-gray-50 rounded-xl p-4" style={{ width: "100%", height: "280px", overflow: "hidden" }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                  <path
                    d={getPathDefinition()}
                    fill="none"
                    stroke={config.pathColor}
                    strokeWidth={config.pathWidth}
                  />
                  <MotionElement
                    key={previewKey}
                    ref={elementRef}
                    config={config}
                    pathD={getPathDefinition()}
                    isPlaying={isPlaying}
                  />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Path SVG</h3>
              <code className="text-xs bg-gray-900 text-gray-100 p-3 rounded-lg block overflow-x-auto">
                {getPathDefinition()}
              </code>
            </div>
          </div>
        </div>

        {/* Code Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Tailwind / Framer Motion</h3>
              <button
                onClick={() => copyToClipboard(generateFramerMotionCode())}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-black transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono">
              {generateFramerMotionCode()}
            </pre>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes motion-path {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
      `}</style>
    </div>
  );
}

// Helper component for motion element
const MotionElement = forwardRef<HTMLDivElement, { config: MotionPathConfig; pathD: string; isPlaying: boolean }>(({ config, pathD, isPlaying }, ref) => {
  const localRef = useRef<HTMLDivElement>(null);
  const usedRef = (ref as React.RefObject<HTMLDivElement>) || localRef;

  useEffect(() => {
    if (isPlaying && usedRef.current) {
      usedRef.current.style.animation = "none";
      usedRef.current.offsetHeight;
      usedRef.current.style.animation = `motion-path ${config.duration}s ${config.easing} ${config.iterations} ${config.direction} ${config.fillMode}`;
    }
  }, [isPlaying, config]);

  return (
    <div
      ref={usedRef}
      style={{
        width: config.elementSize,
        height: config.elementSize,
        background: config.elementColor,
        borderRadius: config.shape === "circle" ? "50%" : "4px",
        offsetPath: `path("${pathD}")`,
        offsetAnchor: "center",
        position: "absolute",
        top: 0,
        left: 0
      }}
    />
  );
});
