"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { 
  Play, 
  Pause,
  Copy, 
  Check, 
  RefreshCw,
  ChevronDown,
  ChevronUp,
  RotateCw,
  Move,
  Circle,
  Square,
  Triangle,
  Heart,
  Star
} from "lucide-react";

type AnimationType = "fade" | "slide" | "bounce" | "rotate" | "scale" | "pulse" | "shake" | "flip";
type EasingType = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "cubic-bezier";

interface AnimationConfig {
  type: AnimationType;
  duration: number;
  delay: number;
  iterationCount: number | "infinite";
  easing: EasingType;
  direction: "normal" | "reverse" | "alternate" | "alternate-reverse";
  fillMode: "none" | "forwards" | "backwards" | "both";
  keyframes: {
    percentage: number;
    transform: string;
    opacity: number;
  }[];
}

const animationPresets: { id: AnimationType; label: string; icon: React.ReactNode; description: string }[] = [
  { id: "fade", label: "Fade", icon: <Circle className="h-5 w-5" />, description: "Fade in/out effect" },
  { id: "slide", label: "Slide", icon: <Move className="h-5 w-5" />, description: "Slide from direction" },
  { id: "bounce", label: "Bounce", icon: <Square className="h-5 w-5" />, description: "Bouncing effect" },
  { id: "rotate", label: "Rotate", icon: <RotateCw className="h-5 w-5" />, description: "Rotation animation" },
  { id: "scale", label: "Scale", icon: <Triangle className="h-5 w-5" />, description: "Scale up/down effect" },
  { id: "pulse", label: "Pulse", icon: <Heart className="h-5 w-5" />, description: "Pulsing heartbeat" },
  { id: "shake", label: "Shake", icon: <Star className="h-5 w-5" />, description: "Shaking motion" },
  { id: "flip", label: "Flip", icon: <RefreshCw className="h-5 w-5" />, description: "3D flip effect" }
];

export default function CssAnimationGenerator() {
  const [config, setConfig] = useState<AnimationConfig>({
    type: "fade",
    duration: 1,
    delay: 0,
    iterationCount: 1,
    easing: "ease-in-out",
    direction: "normal",
    fillMode: "forwards",
    keyframes: []
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [animationCounter, setAnimationCounter] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Generate stable animation name using counter instead of Date.now()
  const animationName = useMemo(() => `anim-${animationCounter}`, [animationCounter]);

  // Generate keyframes function - defined before useEffect that uses it
  const generateKeyframes = useCallback(() => {
    const { type } = config;
    let keyframesContent = "";

    switch (type) {
      case "fade":
        keyframesContent = `
  0% { opacity: 0; }
  100% { opacity: 1; }`;
        break;
      case "slide":
        keyframesContent = `
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }`;
        break;
      case "bounce":
        keyframesContent = `
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }`;
        break;
      case "rotate":
        keyframesContent = `
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }`;
        break;
      case "scale":
        keyframesContent = `
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }`;
        break;
      case "pulse":
        keyframesContent = `
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }`;
        break;
      case "shake":
        keyframesContent = `
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }`;
        break;
      case "flip":
        keyframesContent = `
  0% { transform: perspective(400px) rotateY(0); }
  100% { transform: perspective(400px) rotateY(180deg); }`;
        break;
      default:
        keyframesContent = `
  0% { opacity: 0; }
  100% { opacity: 1; }`;
    }

    return `
@keyframes ${animationName} {
${keyframesContent}
}`;
  }, [config.type, animationName]);

  useEffect(() => {
    const keyframes = generateKeyframes();
    const styleSheet = document.createElement("style");
    styleSheet.id = "animation-styles";
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [generateKeyframes]);

  useEffect(() => {
    if (isPlaying && elementRef.current) {
      elementRef.current.style.animationName = animationName;
      elementRef.current.style.animationPlayState = "running";
      
      const duration = config.duration * 1000 * (typeof config.iterationCount === "string" ? 1 : config.iterationCount);
      const timeoutId = setTimeout(() => {
        setIsPlaying(false);
        if (elementRef.current) {
          elementRef.current.style.animationName = "none";
        }
      }, duration + 100);
      
      return () => clearTimeout(timeoutId);
    } else if (elementRef.current) {
      elementRef.current.style.animationPlayState = "paused";
    }
  }, [isPlaying, config.duration, config.iterationCount, animationName]);

  const generateCssCode = useCallback(() => {
    const { duration, delay, iterationCount, easing, direction, fillMode } = config;
    
    return `.element {
  animation: ${animationName} ${duration}s ${easing} ${delay}s ${iterationCount} ${direction} ${fillMode};
}

${generateKeyframes()}`;
  }, [config, animationName, generateKeyframes]);

  const generateTailwindCode = useCallback(() => {
    const { duration, delay, iterationCount, easing, direction, fillMode } = config;
    return `/* Add this to your CSS */
${generateKeyframes()}

/* In your component */
<div class="animate-[${animationName}_${duration}s_${easing}_${delay}s_${iterationCount}_${direction}_${fillMode}]">
  Your Content
</div>`;
  }, [config, animationName, generateKeyframes]);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const togglePlay = useCallback(() => {
    setAnimationCounter(c => c + 1);
    setIsPlaying(prev => !prev);
  }, []);

  const getPreviewStyle = useCallback((): React.CSSProperties => {
    return {
      width: "100px",
      height: "100px",
      backgroundColor: "#6366f1",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: "14px"
    };
  }, []);

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-purple-100 rounded-2xl">
              <Play className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">CSS Animation Generator</h2>
          </div>
          <p className="text-gray-500">Create custom CSS animations and keyframes with visual controls</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
          {/* Animation Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Animation Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {animationPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setConfig({ ...config, type: preset.id })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    config.type === preset.id
                      ? "border-purple-500 bg-purple-50 text-purple-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  title={preset.description}
                >
                  <div className="flex flex-col items-center gap-1">
                    {preset.icon}
                    <span className="text-xs">{preset.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration & Delay */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Duration ({config.duration}s)</label>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={config.duration}
                onChange={(e) => setConfig({ ...config, duration: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Delay ({config.delay}s)</label>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={config.delay}
                onChange={(e) => setConfig({ ...config, delay: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Iterations</label>
              <select
                value={typeof config.iterationCount === "number" ? config.iterationCount.toString() : config.iterationCount}
                onChange={(e) => setConfig({ ...config, iterationCount: e.target.value === "infinite" ? "infinite" : parseInt(e.target.value) as number })}
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
                <option value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">Bounce</option>
              </select>
            </div>
          </div>

          {/* Advanced Settings */}
          <div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide hover:text-purple-600 transition-colors"
            >
              {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              Advanced Settings
            </button>
            
            {showAdvanced && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Direction</label>
                  <select
                    value={config.direction}
                    onChange={(e) => setConfig({ ...config, direction: e.target.value as AnimationConfig["direction"] })}
                    className="w-full h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg"
                  >
                    <option value="normal">Normal</option>
                    <option value="reverse">Reverse</option>
                    <option value="alternate">Alternate</option>
                    <option value="alternate-reverse">Alternate Reverse</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Fill Mode</label>
                  <select
                    value={config.fillMode}
                    onChange={(e) => setConfig({ ...config, fillMode: e.target.value as AnimationConfig["fillMode"] })}
                    className="w-full h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg"
                  >
                    <option value="none">None</option>
                    <option value="forwards">Forwards</option>
                    <option value="backwards">Backwards</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
            <button
              onClick={togglePlay}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl flex items-center gap-2 hover:bg-purple-700 transition-colors"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
          <div className="flex items-center justify-center min-h-[200px] bg-gray-50 rounded-2xl p-8">
            <div ref={elementRef} style={getPreviewStyle()}>
              Animated
            </div>
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
    </div>
  );
}
