"use client";

import { useState } from "react";
import { 
  Copy, 
  Check, 
  RefreshCw,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Loader,
  Sun,

  Star,
  Heart
} from "lucide-react";

type SpinnerType = "spinner" | "dots" | "bars" | "pulse" | "ring" | "square" | "custom";
type SpinnerShape = "circle" | "square" | "triangle" | "hexagon" | "star" | "heart";

interface SpinnerConfig {
  type: SpinnerType;
  shape: SpinnerShape;
  size: number;
  strokeWidth: number;
  color: string;
  secondaryColor: string;
  speed: number;
  track: boolean;
}

const spinnerTypes: { id: SpinnerType; label: string; icon: React.ReactNode; description: string }[] = [
  { id: "spinner", label: "Spinner", icon: <Loader className="h-5 w-5" />, description: "Classic rotating spinner" },
  { id: "dots", label: "Dots", icon: <Circle className="h-5 w-5" />, description: "Bouncing dots" },
  { id: "bars", label: "Bars", icon: <RefreshCw className="h-5 w-5" />, description: "Vertical bars" },
  { id: "pulse", label: "Pulse", icon: <Sun className="h-5 w-5" />, description: "Pulsing circle" },
  { id: "ring", label: "Ring", icon: <Circle className="h-5 w-5" />, description: "Ring loader" },
  { id: "square", label: "Square", icon: <Square className="h-5 w-5" />, description: "Rotating squares" },
  { id: "custom", label: "Custom", icon: <Star className="h-5 w-5" />, description: "Custom shape" }
];

const shapeIcons: { id: SpinnerShape; icon: React.ReactNode }[] = [
  { id: "circle", icon: <Circle className="h-5 w-5" /> },
  { id: "square", icon: <Square className="h-5 w-5" /> },
  { id: "triangle", icon: <Triangle className="h-5 w-5" /> },
  { id: "hexagon", icon: <Hexagon className="h-5 w-5" /> },
  { id: "star", icon: <Star className="h-5 w-5" /> },
  { id: "heart", icon: <Heart className="h-5 w-5" /> }
];

export default function LoadingSpinnerGenerator() {
  const [config, setConfig] = useState<SpinnerConfig>({
    type: "spinner",
    shape: "circle",
    size: 48,
    strokeWidth: 4,
    color: "#6366f1",
    secondaryColor: "#e5e7eb",
    speed: 1,
    track: true
  });
  const [copied, setCopied] = useState(false);

  const generateCssCode = () => {
    const { type, size, strokeWidth, color, secondaryColor, speed, track } = config;
    const duration = (2 / speed).toFixed(2);

    if (type === "spinner") {
      return `.spinner {
  width: ${size}px;
  height: ${size}px;
  border: ${strokeWidth}px solid ${track ? secondaryColor : "transparent"};
  border-top-color: ${color};
  border-radius: 50%;
  animation: spin ${duration}s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
    } else if (type === "dots") {
      return `.dots-loader {
  display: flex;
  gap: ${size / 4}px;
}

.dots-loader span {
  width: ${size / 3}px;
  height: ${size / 3}px;
  background: ${color};
  border-radius: 50%;
  animation: bounce ${duration}s ease-in-out infinite;
}

.dots-loader span:nth-child(2) {
  animation-delay: 0.1s;
}

.dots-loader span:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(-${size / 2}px); opacity: 0.5; }
}`;
    } else if (type === "bars") {
      return `.bars-loader {
  display: flex;
  align-items: center;
  gap: ${size / 8}px;
  height: ${size}px;
}

.bars-loader span {
  width: ${size / 6}px;
  height: 60%;
  background: ${color};
  border-radius: 4px;
  animation: bars ${duration}s ease-in-out infinite;
}

.bars-loader span:nth-child(1) { animation-delay: 0s; }
.bars-loader span:nth-child(2) { animation-delay: 0.1s; }
.bars-loader span:nth-child(3) { animation-delay: 0.2s; }
.bars-loader span:nth-child(4) { animation-delay: 0.3s; }

@keyframes bars {
  0%, 100% { height: 20%; }
  50% { height: 100%; }
}`;
    } else if (type === "pulse") {
      return `.pulse-loader {
  width: ${size}px;
  height: ${size}px;
  background: ${color};
  border-radius: 50%;
  animation: pulse ${duration}s ease-in-out infinite;
}

@keyframes pulse {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
}`;
    } else if (type === "ring") {
      return `.ring-loader {
  width: ${size}px;
  height: ${size}px;
  position: relative;
}

.ring-loader::before,
.ring-loader::after {
  content: "";
  position: absolute;
  inset: 0;
  border: ${strokeWidth}px solid transparent;
  border-radius: 50%;
}

.ring-loader::before {
  border-top-color: ${color};
  animation: spin ${duration}s linear infinite;
}

.ring-loader::after {
  border-bottom-color: ${color};
  animation: spin ${duration}s linear infinite reverse;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
    } else if (type === "square") {
      return `.square-loader {
  width: ${size}px;
  height: ${size}px;
  background: ${color};
  animation: square-spin ${duration}s ease-in-out infinite;
}

@keyframes square-spin {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(90deg); }
  50% { transform: rotate(180deg); }
  75% { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
}`;
    } else {
      return `.custom-loader {
  width: ${size}px;
  height: ${size}px;
  background: ${color};
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  animation: spin ${duration}s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
    }
  };

  const generateTailwindCode = () => {
    return `/* Add this to your CSS */
${generateCssCode()}

/* HTML */
<div class="spinner"></div>`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderPreview = () => {
    const { type, size, strokeWidth, color, speed, track } = config;
    const duration = 2 / speed;
    const style: React.CSSProperties = {
      width: size,
      height: size,
      border: `${strokeWidth}px solid ${track ? "#e5e7eb" : "transparent"}`,
      borderTopColor: color,
      borderRadius: type === "spinner" || type === "ring" || type === "pulse" ? "50%" : "4px",
      animation: `spin ${duration}s linear infinite`
    };

    if (type === "dots") {
      return (
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: size / 3,
                height: size / 3,
                backgroundColor: color,
                borderRadius: "50%",
                animation: `bounce ${duration}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      );
    }

    if (type === "bars") {
      return (
        <div className="flex gap-1 items-center" style={{ height: size }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: size / 6,
                height: "60%",
                backgroundColor: color,
                borderRadius: 4,
                animation: `bars ${duration}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      );
    }

    if (type === "pulse") {
      return (
        <div
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: "50%",
            animation: `pulse ${duration}s ease-in-out infinite`
          }}
        />
      );
    }

    if (type === "ring") {
      return (
        <div
          style={{
            width: size,
            height: size,
            position: "relative"
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              border: `${strokeWidth}px solid transparent`,
              borderTopColor: color,
              borderRadius: "50%",
              animation: `spin ${duration}s linear infinite`
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              border: `${strokeWidth}px solid transparent`,
              borderBottomColor: color,
              borderRadius: "50%",
              animation: `spin ${duration}s linear infinite reverse`
            }}
          />
        </div>
      );
    }

    if (type === "square") {
      return (
        <div
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            animation: `square-spin ${duration}s ease-in-out infinite`
          }}
        />
      );
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
              <RefreshCw className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Loading Spinner Generator</h2>
          </div>
          <p className="text-gray-500">Create custom loading spinners and animations</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
          {/* Spinner Type */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Spinner Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {spinnerTypes.map((spinner) => (
                <button
                  key={spinner.id}
                  onClick={() => setConfig({ ...config, type: spinner.id })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    config.type === spinner.id
                      ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  title={spinner.description}
                >
                  <div className="flex flex-col items-center gap-1">
                    {spinner.icon}
                    <span className="text-xs">{spinner.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Shape Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Shape (Custom)</label>
            <div className="flex gap-2">
              {shapeIcons.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => setConfig({ ...config, shape: shape.id })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    config.shape === shape.id
                      ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {shape.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Size ({config.size}px)</label>
              <input
                type="range"
                min="16"
                max="120"
                value={config.size}
                onChange={(e) => setConfig({ ...config, size: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Stroke Width ({config.strokeWidth}px)</label>
              <input
                type="range"
                min="1"
                max="12"
                value={config.strokeWidth}
                onChange={(e) => setConfig({ ...config, strokeWidth: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Speed ({config.speed}x)</label>
              <input
                type="range"
                min="0.25"
                max="4"
                step="0.25"
                value={config.speed}
                onChange={(e) => setConfig({ ...config, speed: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Track</label>
              <button
                onClick={() => setConfig({ ...config, track: !config.track })}
                className={`w-full h-10 px-4 rounded-xl border-2 transition-all ${
                  config.track
                    ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {config.track ? "Enabled" : "Disabled"}
              </button>
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Primary Color</label>
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

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Track Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={config.secondaryColor}
                  onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                  className="h-10 w-10 rounded-lg cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={config.secondaryColor}
                  onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                  className="flex-1 h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm"
                />
              </div>
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

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-20px); opacity: 0.5; }
        }
        @keyframes pulse {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes bars {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
        @keyframes square-spin {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(90deg); }
          50% { transform: rotate(180deg); }
          75% { transform: rotate(270deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
