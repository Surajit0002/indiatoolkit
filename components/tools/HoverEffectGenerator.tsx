"use client";

import { useState } from "react";
import { 
  Copy, 
  Check, 
  MousePointer,
  Sparkles,
  Move,
  Scale,
  RotateCw,
  Box,
  Grid,
  Square,
  Circle
} from "lucide-react";

type ElementType = "button" | "card" | "image" | "icon";
type EffectType = "lift" | "shrink" | "rotate" | "glow" | "border" | "shadow" | "underline" | "float";
type EasingType = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";

interface HoverConfig {
  elementType: ElementType;
  effectType: EffectType;
  duration: number;
  easing: EasingType;
  translateY: number;
  scale: number;
  rotate: number;
  boxShadow: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  backgroundColor: string;
  textColor: string;
  underlineColor: string;
  underlineWidth: number;
  invertOnClick: boolean;
}

const elementTypes: { id: ElementType; label: string; icon: React.ReactNode }[] = [
  { id: "button", label: "Button", icon: <MousePointer className="h-5 w-5" /> },
  { id: "card", label: "Card", icon: <Square className="h-5 w-5" /> },
  { id: "image", label: "Image", icon: <Box className="h-5 w-5" /> },
  { id: "icon", label: "Icon", icon: <Circle className="h-5 w-5" /> }
];

const effectTypes: { id: EffectType; label: string; icon: React.ReactNode; description: string }[] = [
  { id: "lift", label: "Lift", icon: <Move className="h-5 w-5" />, description: "Element rises up" },
  { id: "shrink", label: "Shrink", icon: <Scale className="h-5 w-5" />, description: "Element scales down" },
  { id: "rotate", label: "Rotate", icon: <RotateCw className="h-5 w-5" />, description: "Element rotates" },
  { id: "glow", label: "Glow", icon: <Sparkles className="h-5 w-5" />, description: "Glowing shadow effect" },
  { id: "border", label: "Border", icon: <Square className="h-5 w-5" />, description: "Border appears" },
  { id: "shadow", label: "Shadow", icon: <Box className="h-5 w-5" />, description: "Shadow intensifies" },
  { id: "underline", label: "Underline", icon: <MousePointer className="h-5 w-5" />, description: "Animated underline" },
  { id: "float", label: "Float", icon: <Move className="h-5 w-5" />, description: "Continuous floating" }
];

export default function HoverEffectGenerator() {
  const [config, setConfig] = useState<HoverConfig>({
    elementType: "button",
    effectType: "lift",
    duration: 0.3,
    easing: "ease-in-out",
    translateY: -8,
    scale: 1.05,
    rotate: 0,
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    borderColor: "#6366f1",
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "#6366f1",
    textColor: "#ffffff",
    underlineColor: "#6366f1",
    underlineWidth: 2,
    invertOnClick: false
  });
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const applyEffect = (effect: EffectType) => {
    switch (effect) {
      case "lift":
        setConfig({ ...config, effectType: effect, translateY: -8, scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" });
        break;
      case "shrink":
        setConfig({ ...config, effectType: effect, translateY: 0, scale: 0.95, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" });
        break;
      case "rotate":
        setConfig({ ...config, effectType: effect, translateY: 0, scale: 1, rotate: 5 });
        break;
      case "glow":
        setConfig({ ...config, effectType: effect, translateY: 0, scale: 1.02, boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" });
        break;
      case "border":
        setConfig({ ...config, effectType: effect, translateY: 0, scale: 1, borderWidth: 2 });
        break;
      case "shadow":
        setConfig({ ...config, effectType: effect, translateY: 4, scale: 1, boxShadow: "0 15px 30px rgba(0,0,0,0.25)" });
        break;
      case "underline":
        setConfig({ ...config, effectType: effect, translateY: 0, scale: 1, underlineWidth: 2 });
        break;
      case "float":
        setConfig({ ...config, effectType: effect, translateY: -5, scale: 1 });
        break;
    }
  };

  const generateCssCode = () => {
    const { effectType, duration, easing, translateY, scale, rotate, boxShadow, borderColor, borderWidth, borderRadius, backgroundColor, textColor, underlineColor, underlineWidth } = config;

    let hoverStyles = "";
    const baseStyles = "";

    switch (effectType) {
      case "lift":
        hoverStyles = `transform: translateY(${translateY}px) scale(${scale}); box-shadow: ${boxShadow};`;
        break;
      case "shrink":
        hoverStyles = `transform: scale(${scale});`;
        break;
      case "rotate":
        hoverStyles = `transform: rotate(${rotate}deg);`;
        break;
      case "glow":
        hoverStyles = `box-shadow: ${boxShadow}; transform: scale(${scale});`;
        break;
      case "border":
        hoverStyles = `border-color: ${borderColor}; border-width: ${borderWidth}px;`;
        break;
      case "shadow":
        hoverStyles = `transform: translateY(${translateY}px); box-shadow: ${boxShadow};`;
        break;
      case "underline":
        hoverStyles = `text-decoration: underline; text-decoration-color: ${underlineColor}; text-decoration-thickness: ${underlineWidth}px;`;
        break;
      case "float":
        hoverStyles = `transform: translateY(${translateY}px);`;
        break;
    }

    return `.element {
  background-color: ${backgroundColor};
  color: ${textColor};
  border-radius: ${borderRadius}px;
  transition: all ${duration}s ${easing};
  border: ${effectType === "border" ? `${borderWidth}px solid transparent` : "none"};
}

.element:hover {
  ${hoverStyles}
}

${effectType === "underline" ? `.element span {
  display: inline-block;
  position: relative;
}

.element span::after {
  content: "";
  position: absolute;
  width: 100%;
  height: ${underlineWidth}px;
  bottom: -4px;
  left: 0;
  background-color: ${underlineColor};
  transform: scaleX(0);
  transition: transform ${duration}s ${easing};
}

.element:hover span::after {
  transform: scaleX(1);
}` : ""}`;
  };

  const generateTailwindCode = () => {
    const { effectType, duration, easing } = config;
    
    const transitionClass = `transition-all duration-${Math.round(duration * 100)} ease-${easing.replace("-", "")}`;
    
    let hoverClass = "";
    switch (effectType) {
      case "lift":
        hoverClass = "hover:-translate-y-2 hover:shadow-lg";
        break;
      case "shrink":
        hoverClass = "hover:scale-95";
        break;
      case "rotate":
        hoverClass = "hover:rotate-2";
        break;
      case "glow":
        hoverClass = "hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]";
        break;
      case "border":
        hoverClass = "hover:border-2";
        break;
      case "shadow":
        hoverClass = "hover:shadow-xl hover:translate-y-1";
        break;
      case "underline":
        hoverClass = "hover:underline decoration-2";
        break;
      case "float":
        hoverClass = "hover:-translate-y-2";
        break;
    }

    return `/* Tailwind classes */
<div class="${transitionClass} ${hoverClass}">
  Content
</div>

/* Custom CSS for advanced effects */
${effectType === "float" ? `.animate-float {
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}` : ""}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderPreview = () => {
    const { elementType, effectType, duration, easing, translateY, scale, rotate, boxShadow, borderColor, borderWidth, borderRadius, backgroundColor, textColor, underlineWidth, underlineColor } = config;

    const baseStyle: React.CSSProperties = {
      backgroundColor: backgroundColor,
      color: textColor,
      borderRadius: borderRadius,
      transition: `all ${duration}s ${easing}`,
      border: elementType === "button" || elementType === "card" ? (effectType === "border" ? `${borderWidth}px solid ${borderColor}` : "none") : "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 500,
      fontSize: elementType === "icon" ? "24px" : "14px"
    };

    const hoverStyle: React.CSSProperties = {
      transform: `translateY(${isHovered ? translateY : 0}px) scale(${isHovered ? scale : 1}) rotate(${isHovered ? rotate : 0}deg)`,
      boxShadow: isHovered ? boxShadow : undefined,
      borderColor: effectType === "border" && isHovered ? borderColor : undefined,
      borderWidth: effectType === "border" && isHovered ? borderWidth : undefined,
      textDecoration: effectType === "underline" && isHovered ? "underline" : undefined,
      textDecorationColor: effectType === "underline" && isHovered ? underlineColor : undefined,
      textDecorationThickness: effectType === "underline" && isHovered ? underlineWidth : undefined
    };

    if (elementType === "button") {
      return (
        <button
          style={{ ...baseStyle, ...hoverStyle }}
          className="h-12 px-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Hover Me
        </button>
      );
    }

    if (elementType === "card") {
      return (
        <div
          style={{ ...baseStyle, ...hoverStyle, padding: "20px", width: "200px", textAlign: "center" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="font-bold mb-2">Card Title</div>
          <div className="text-sm opacity-80">Card description text</div>
        </div>
      );
    }

    if (elementType === "image") {
      return (
        <div
          style={{ ...baseStyle, ...hoverStyle, width: "120px", height: "80px" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="text-xs">Image</span>
        </div>
      );
    }

    return (
      <div
        style={{ ...baseStyle, ...hoverStyle, width: "48px", height: "48px", borderRadius: "50%" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span>★</span>
      </div>
    );
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-amber-100 rounded-2xl">
              <MousePointer className="h-6 w-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Hover Effect Generator</h2>
          </div>
          <p className="text-gray-500">Create CSS hover effects for buttons, cards, images, and more</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
            {/* Element Type */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Element Type</label>
              <div className="grid grid-cols-4 gap-2">
                {elementTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setConfig({ ...config, elementType: type.id })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      config.elementType === type.id
                        ? "border-amber-500 bg-amber-50 text-amber-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {type.icon}
                      <span className="text-xs">{type.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Effect Type */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Effect Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {effectTypes.map((effect) => (
                  <button
                    key={effect.id}
                    onClick={() => applyEffect(effect.id)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      config.effectType === effect.id
                        ? "border-amber-500 bg-amber-50 text-amber-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    title={effect.description}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {effect.icon}
                      <span className="text-xs">{effect.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration & Easing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Duration ({config.duration}s)</label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={config.duration}
                  onChange={(e) => setConfig({ ...config, duration: parseFloat(e.target.value) })}
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
                </select>
              </div>
            </div>

            {/* Transform Properties */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Translate Y: {config.translateY}px</label>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  value={config.translateY}
                  onChange={(e) => setConfig({ ...config, translateY: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Scale: {config.scale}</label>
                <input
                  type="range"
                  min="0.8"
                  max="1.2"
                  step="0.01"
                  value={config.scale}
                  onChange={(e) => setConfig({ ...config, scale: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Rotate: {config.rotate}deg</label>
                <input
                  type="range"
                  min="-15"
                  max="15"
                  value={config.rotate}
                  onChange={(e) => setConfig({ ...config, rotate: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Background</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                    className="h-10 w-10 rounded-lg cursor-pointer border-2 border-gray-200"
                  />
                  <input
                    type="text"
                    value={config.backgroundColor}
                    onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
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

            {/* Border & Shadow */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Border Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={config.borderColor}
                    onChange={(e) => setConfig({ ...config, borderColor: e.target.value })}
                    className="h-10 w-10 rounded-lg cursor-pointer border-2 border-gray-200"
                  />
                  <input
                    type="text"
                    value={config.borderColor}
                    onChange={(e) => setConfig({ ...config, borderColor: e.target.value })}
                    className="flex-1 h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Border Radius: {config.borderRadius}px</label>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={config.borderRadius}
                  onChange={(e) => setConfig({ ...config, borderRadius: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              <div 
                className="flex items-center justify-center min-h-[200px] bg-gray-50 rounded-2xl p-8"
                onMouseLeave={() => setIsHovered(false)}
              >
                {renderPreview()}
              </div>
              <p className="text-center text-sm text-gray-500 mt-4">Hover over the element to see the effect</p>
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
              <h3 className="text-lg font-semibold text-gray-900">Tailwind Classes</h3>
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
