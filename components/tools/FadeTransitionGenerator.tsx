"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Copy, 
  Check, 
  Play, 
  Pause, 
  Layers,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Maximize,
  Minimize,
  Eye,
  EyeOff
} from "lucide-react";

type TransitionType = "fade" | "slide" | "zoom" | "flip" | "blur" | "dissolve";
type Direction = "in" | "out" | "in-out";
type EasingType = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "cubic-bezier";

interface TransitionConfig {
  type: TransitionType;
  direction: Direction;
  duration: number;
  delay: number;
  easing: EasingType;
  startOpacity: number;
  endOpacity: number;
  startScale: number;
  endScale: number;
  startTranslateX: number;
  endTranslateX: number;
  startTranslateY: number;
  endTranslateY: number;
  startRotate: number;
  endRotate: number;
  startBlur: number;
  endBlur: number;
  keyframes: boolean;
}

const transitionTypes: { id: TransitionType; label: string; icon: React.ReactNode; description: string }[] = [
  { id: "fade", label: "Fade", icon: <Eye className="h-5 w-5" />, description: "Opacity change" },
  { id: "slide", label: "Slide", icon: <ArrowRight className="h-5 w-5" />, description: "Movement transition" },
  { id: "zoom", label: "Zoom", icon: <Maximize className="h-5 w-5" />, description: "Scale transition" },
  { id: "flip", label: "Flip", icon: <Layers className="h-5 w-5" />, description: "3D rotation" },
  { id: "blur", label: "Blur", icon: <EyeOff className="h-5 w-5" />, description: "Blur filter" },
  { id: "dissolve", label: "Dissolve", icon: <Layers className="h-5 w-5" />, description: "Combined effects" }
];

export default function FadeTransitionGenerator() {
  const [config, setConfig] = useState<TransitionConfig>({
    type: "fade",
    direction: "in",
    duration: 0.5,
    delay: 0,
    easing: "ease-in-out",
    startOpacity: 0,
    endOpacity: 1,
    startScale: 0.8,
    endScale: 1,
    startTranslateX: 0,
    endTranslateX: 0,
    startTranslateY: 20,
    endTranslateY: 0,
    startRotate: 0,
    endRotate: 0,
    startBlur: 10,
    endBlur: 0,
    keyframes: true
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/purity
  const animationName = `transition-${Date.now()}`;

  useEffect(() => {
    if (isPlaying && elementRef.current) {
      elementRef.current.style.animation = "none";
      elementRef.current.offsetHeight;
      elementRef.current.style.animation = `${animationName} ${config.duration}s ${config.easing} ${config.delay}s both`;
      
      setTimeout(() => {
        setIsPlaying(false);
        setPreviewKey(prev => prev + 1);
      }, (config.duration + config.delay) * 1000 + 100);
    }
  }, [isPlaying, config, previewKey]);

   
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.id = "transition-styles";
    styleSheet.textContent = generateKeyframes();
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [config]);

  const generateKeyframes = () => {
    const { startOpacity, endOpacity, startScale, endScale, startTranslateX, endTranslateX, startTranslateY, endTranslateY, startRotate, endRotate, startBlur, endBlur, duration } = config;
    
    if (config.type === "fade") {
      return `
@keyframes ${animationName} {
  from { opacity: ${startOpacity}; }
  to { opacity: ${endOpacity}; }
}`;
    } else if (config.type === "slide") {
      return `
@keyframes ${animationName} {
  from { 
    opacity: ${startOpacity}; 
    transform: translateX(${config.direction === "in" ? startTranslateX : -startTranslateX}px) translateY(${startTranslateY}px);
  }
  to { 
    opacity: ${endOpacity}; 
    transform: translateX(${endTranslateX}px) translateY(${endTranslateY}px);
  }
}`;
    } else if (config.type === "zoom") {
      return `
@keyframes ${animationName} {
  from { 
    opacity: ${startOpacity}; 
    transform: scale(${startScale});
  }
  to { 
    opacity: ${endOpacity}; 
    transform: scale(${endScale});
  }
}`;
    } else if (config.type === "flip") {
      return `
@keyframes ${animationName} {
  from { 
    opacity: ${startOpacity}; 
    transform: perspective(400px) rotateY(${startRotate}deg);
  }
  to { 
    opacity: ${endOpacity}; 
    transform: perspective(400px) rotateY(${endRotate}deg);
  }
}`;
    } else if (config.type === "blur") {
      return `
@keyframes ${animationName} {
  from { 
    opacity: ${startOpacity}; 
    filter: blur(${startBlur}px);
  }
  to { 
    opacity: ${endOpacity}; 
    filter: blur(${endBlur}px);
  }
}`;
    } else {
      return `
@keyframes ${animationName} {
  from { 
    opacity: ${startOpacity}; 
    transform: scale(${startScale}) translateX(${startTranslateX}px) translateY(${startTranslateY}px);
    filter: blur(${startBlur}px);
  }
  to { 
    opacity: ${endOpacity}; 
    transform: scale(${endScale}) translateX(${endTranslateX}px) translateY(${endTranslateY}px);
    filter: blur(${endBlur}px);
  }
}`;
    }
  };

  const generateCssCode = () => {
    const { duration, delay, easing, direction } = config;
    
    return `.transition-enter {
  animation: ${animationName} ${duration}s ${easing} ${delay}s both;
}

.transition-leave {
  animation: ${animationName} ${duration}s ${easing} ${delay}s both reverse;
}

@keyframes ${animationName} {
${generateKeyframes().replace(`@keyframes ${animationName} {`, "").trim()}
}`;
  };

  const generateTailwindCode = () => {
    return `/* Add to your CSS */
${generateKeyframes()}

/* Usage classes */
.animate-enter {
  animation: ${animationName} ${config.duration}s ${config.easing} ${config.delay}s both;
}

.animate-leave {
  animation: ${animationName} ${config.duration}s ${config.easing} ${config.delay}s both reverse;
}

/* Or use inline styles */
<div style="animation: ${animationName} ${config.duration}s ${config.easing} ${config.delay}s both">
  Content
</div>`;
  };

  const generateReactCode = () => {
    return `// React component with framer-motion
import { motion } from "framer-motion";

const variants = {
  hidden: { 
    opacity: ${config.startOpacity},
    scale: ${config.startScale},
    x: ${config.startTranslateX},
    y: ${config.startTranslateY},
    filter: \`blur(${config.startBlur}px)\`
  },
  visible: { 
    opacity: ${config.endOpacity},
    scale: ${config.endScale},
    x: ${config.endTranslateX},
    y: ${config.endTranslateY},
    filter: \`blur(${config.endBlur}px)\`,
    transition: {
      duration: ${config.duration},
      delay: ${config.delay},
      ease: "${config.easing}"
    }
  }
};

// Usage
<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
>
  Content
</motion.div>`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (type: TransitionType) => {
    switch (type) {
      case "fade":
        setConfig({ ...config, type, startOpacity: 0, endOpacity: 1, startScale: 1, endScale: 1 });
        break;
      case "slide":
        setConfig({ ...config, type, startOpacity: 0, endOpacity: 1, startTranslateX: -50, endTranslateX: 0, startScale: 1, endScale: 1 });
        break;
      case "zoom":
        setConfig({ ...config, type, startOpacity: 0, endOpacity: 1, startScale: 0.5, endScale: 1, startTranslateY: 0, endTranslateY: 0 });
        break;
      case "flip":
        setConfig({ ...config, type, startOpacity: 0, endOpacity: 1, startRotate: -90, endRotate: 0 });
        break;
      case "blur":
        setConfig({ ...config, type, startOpacity: 0, endOpacity: 1, startBlur: 20, endBlur: 0 });
        break;
      case "dissolve":
        setConfig({ ...config, type, startOpacity: 0, endOpacity: 1, startScale: 0.9, endScale: 1, startBlur: 10, endBlur: 0 });
        break;
    }
  };

  const getPreviewStyle = (): React.CSSProperties => {
    return {
      width: "150px",
      height: "100px",
      backgroundColor: "#6366f1",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: "14px"
    };
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-cyan-100 rounded-2xl">
              <Layers className="h-6 w-6 text-cyan-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Fade Transition Generator</h2>
          </div>
          <p className="text-gray-500">Create smooth fade and transition effects for web elements</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
          {/* Transition Type */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Transition Type</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {transitionTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => applyPreset(type.id)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    config.type === type.id
                      ? "border-cyan-500 bg-cyan-50 text-cyan-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  title={type.description}
                >
                  <div className="flex flex-col items-center gap-1">
                    {type.icon}
                    <span className="text-xs">{type.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration & Easing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Duration ({config.duration}s)</label>
              <input
                type="range"
                min="0.1"
                max="3"
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
                max="2"
                step="0.1"
                value={config.delay}
                onChange={(e) => setConfig({ ...config, delay: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
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

          {/* Opacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Start Opacity: {config.startOpacity}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={config.startOpacity}
                onChange={(e) => setConfig({ ...config, startOpacity: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">End Opacity: {config.endOpacity}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={config.endOpacity}
                onChange={(e) => setConfig({ ...config, endOpacity: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Scale */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Start Scale: {config.startScale}</label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={config.startScale}
                onChange={(e) => setConfig({ ...config, startScale: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">End Scale: {config.endScale}</label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={config.endScale}
                onChange={(e) => setConfig({ ...config, endScale: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Advanced Settings */}
          <div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm font-semibold text-gray-700 uppercase tracking-wide hover:text-cyan-600 transition-colors"
            >
              {showAdvanced ? "Hide Advanced" : "Show Advanced"}
            </button>
            
            {showAdvanced && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Start Translate Y: {config.startTranslateY}px</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    step="10"
                    value={config.startTranslateY}
                    onChange={(e) => setConfig({ ...config, startTranslateY: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Start Blur: {config.startBlur}px</label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={config.startBlur}
                    onChange={(e) => setConfig({ ...config, startBlur: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
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
              onClick={() => { setPreviewKey(prev => prev + 1); setIsPlaying(true); }}
              className="px-4 py-2 bg-cyan-600 text-white rounded-xl flex items-center gap-2 hover:bg-cyan-700 transition-colors"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Playing..." : "Play"}
            </button>
          </div>
          <div className="flex items-center justify-center min-h-[200px] bg-gray-50 rounded-2xl p-8">
            <div key={previewKey} ref={elementRef} style={getPreviewStyle()}>
              {config.direction === "in" ? "Fade In" : "Fade Out"}
            </div>
          </div>
        </div>

        {/* Code Output */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
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
              <h3 className="text-lg font-semibold text-gray-900">React / Framer Motion</h3>
              <button
                onClick={() => copyToClipboard(generateReactCode())}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-black transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono">
              {generateReactCode()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
