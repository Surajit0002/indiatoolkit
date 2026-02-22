"use client";

import { useState } from "react";
import { 
  Copy, 
  Check, 
  Image as ImageIcon, 
  Layout,
  Star,
  Clock,
  Eye,
  Download,
  Youtube,
  Twitch,
  Instagram,
  Facebook,
  Linkedin,
  Twitter
} from "lucide-react";

type Platform = "youtube" | "twitch" | "instagram" | "facebook" | "twitter" | "linkedin" | "custom";
type TextStyle = "bold" | "italic" | "outlined" | "gradient" | "shadow";

interface ThumbnailConfig {
  platform: Platform;
  width: number;
  height: number;
  backgroundColor: string;
  backgroundImage: string;
  primaryText: string;
  primaryTextColor: string;
  primaryTextSize: number;
  primaryTextStyle: TextStyle;
  secondaryText: string;
  secondaryTextColor: string;
  secondaryTextSize: number;
  showAvatar: boolean;
  avatarUrl: string;
  showViews: boolean;
  showDuration: boolean;
  duration: string;
  overlayColor: string;
  overlayOpacity: number;
  accentColor: string;
  borderRadius: number;
}

const platforms: { id: Platform; label: string; icon: React.ReactNode; width: number; height: number }[] = [
  { id: "youtube", label: "YouTube", icon: <Youtube className="h-5 w-5" />, width: 1280, height: 720 },
  { id: "twitch", label: "Twitch", icon: <Twitch className="h-5 w-5" />, width: 1920, height: 1080 },
  { id: "instagram", label: "Instagram", icon: <Instagram className="h-5 w-5" />, width: 1080, height: 1080 },
  { id: "facebook", label: "Facebook", icon: <Facebook className="h-5 w-5" />, width: 1200, height: 630 },
  { id: "twitter", label: "Twitter", icon: <Twitter className="h-5 w-5" />, width: 1200, height: 675 },
  { id: "linkedin", label: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, width: 1200, height: 627 },
  { id: "custom", label: "Custom", icon: <Layout className="h-5 w-5" />, width: 1280, height: 720 }
];

const textStyles: { id: TextStyle; label: string }[] = [
  { id: "bold", label: "Bold" },
  { id: "italic", label: "Italic" },
  { id: "outlined", label: "Outlined" },
  { id: "gradient", label: "Gradient" },
  { id: "shadow", label: "Shadow" }
];

export default function VideoThumbnailGenerator() {
  const [config, setConfig] = useState<ThumbnailConfig>({
    platform: "youtube",
    width: 1280,
    height: 720,
    backgroundColor: "#1a1a2e",
    backgroundImage: "",
    primaryText: "AMAZING VIDEO TITLE",
    primaryTextColor: "#ffffff",
    primaryTextSize: 64,
    primaryTextStyle: "bold",
    secondaryText: "Click to watch now!",
    secondaryTextColor: "#cccccc",
    secondaryTextSize: 32,
    showAvatar: true,
    avatarUrl: "",
    showViews: true,
    showDuration: true,
    duration: "10:32",
    overlayColor: "#000000",
    overlayOpacity: 30,
    accentColor: "#ff0000",
    borderRadius: 12
  });
  const [copied, setCopied] = useState(false);

  const selectPlatform = (platform: Platform) => {
    const p = platforms.find(p => p.id === platform);
    if (p) {
      setConfig({
        ...config,
        platform,
        width: p.width,
        height: p.height
      });
    }
  };

  const generateHtmlCode = () => {
    const { width, height, backgroundColor, backgroundImage, primaryText, primaryTextColor, primaryTextSize, primaryTextStyle, secondaryText, secondaryTextColor, secondaryTextSize, showAvatar, showViews, showDuration, duration, overlayColor, overlayOpacity, accentColor, borderRadius } = config;

    const textShadow = primaryTextStyle === "shadow" ? `text-shadow: 2px 2px 4px rgba(0,0,0,0.8);` : "";
    const textOutline = primaryTextStyle === "outlined" ? `-webkit-text-stroke: 2px ${accentColor};` : "";
    const fontStyle = primaryTextStyle === "italic" ? "italic" : "normal";
    const fontWeight = primaryTextStyle === "bold" ? "900" : "bold";

    return `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    .thumbnail {
      width: ${width}px;
      height: ${height}px;
      background: ${backgroundImage ? `url(${backgroundImage}) center/cover, ${backgroundColor}` : backgroundColor};
      position: relative;
      overflow: hidden;
      border-radius: ${borderRadius}px;
    }
    .overlay {
      position: absolute;
      inset: 0;
      background: ${overlayColor};
      opacity: ${overlayOpacity / 100};
    }
    .content {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 40px;
    }
    .primary-text {
      font-family: Arial, sans-serif;
      font-size: ${primaryTextSize}px;
      font-weight: ${fontWeight};
      font-style: ${fontStyle};
      color: ${primaryTextColor};
      ${textShadow}
      ${textOutline}
      margin-bottom: 16px;
      line-height: 1.2;
    }
    .secondary-text {
      font-family: Arial, sans-serif;
      font-size: ${secondaryTextSize}px;
      color: ${secondaryTextColor};
      margin-bottom: 24px;
    }
    .bottom-bar {
      display: flex;
      align-items: center;
      gap: 24px;
    }
    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: ${accentColor};
    }
    .meta {
      display: flex;
      align-items: center;
      gap: 16px;
      color: white;
      font-family: Arial, sans-serif;
      font-size: 24px;
    }
    .duration {
      position: absolute;
      bottom: 16px;
      right: 16px;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 20px;
      font-family: Arial, sans-serif;
    }
  </style>
</head>
<body>
  <div class="thumbnail">
    <div class="overlay"></div>
    <div class="content">
      <div class="primary-text">${primaryText}</div>
      <div class="secondary-text">${secondaryText}</div>
      <div class="bottom-bar">
        ${showAvatar ? '<div class="avatar"></div>' : ''}
        <div class="meta">
          ${showViews ? '<span>🔴 1.2M views</span>' : ''}
        </div>
      </div>
    </div>
    ${showDuration ? `<div class="duration">${duration}</div>` : ''}
  </div>
</body>
</html>`;
  };

  const generateCssCode = () => {
    return `.thumbnail {
  width: ${config.width}px;
  height: ${config.height}px;
  background: ${config.backgroundImage ? `url(${config.backgroundImage}) center/cover, ` : ""}${config.backgroundColor};
  position: relative;
  overflow: hidden;
  border-radius: ${config.borderRadius}px;
}

.thumbnail-overlay {
  position: absolute;
  inset: 0;
  background: ${config.overlayColor};
  opacity: ${config.overlayOpacity / 100};
}

.thumbnail-primary-text {
  font-family: system-ui, sans-serif;
  font-size: ${config.primaryTextSize}px;
  font-weight: 900;
  color: ${config.primaryTextColor};
  ${config.primaryTextStyle === "shadow" ? "text-shadow: 2px 2px 4px rgba(0,0,0,0.8);" : ""}
  ${config.primaryTextStyle === "outlined" ? `-webkit-text-stroke: 2px ${config.accentColor};` : ""}
}

.thumbnail-secondary-text {
  font-family: system-ui, sans-serif;
  font-size: ${config.secondaryTextSize}px;
  color: ${config.secondaryTextColor};
}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadThumbnail = () => {
    const htmlContent = generateHtmlCode();
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "thumbnail.html";
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderPreview = () => {
    const aspectRatio = config.width / config.height;
    const previewHeight = 200;
    const previewWidth = previewHeight * aspectRatio;

    return (
      <div 
        className="relative overflow-hidden"
        style={{
          width: previewWidth,
          height: previewHeight,
          backgroundColor: config.backgroundColor,
          backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: config.borderRadius
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: config.overlayColor,
            opacity: config.overlayOpacity / 100
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-3">
          <p 
            className="font-black leading-tight mb-1"
            style={{
              color: config.primaryTextColor,
              fontSize: `${config.primaryTextSize * (previewHeight / config.height)}px`,
              textShadow: config.primaryTextStyle === "shadow" ? "2px 2px 4px rgba(0,0,0,0.8)" : undefined,
              WebkitTextStroke: config.primaryTextStyle === "outlined" ? `2px ${config.accentColor}` : undefined
            }}
          >
            {config.primaryText}
          </p>
          <p 
            className="leading-tight"
            style={{
              color: config.secondaryTextColor,
              fontSize: `${config.secondaryTextSize * (previewHeight / config.height)}px`
            }}
          >
            {config.secondaryText}
          </p>
          <div className="flex items-center gap-2 mt-2">
            {config.showAvatar && (
              <div 
                className="rounded-full"
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: config.accentColor
                }}
              />
            )}
            {config.showViews && (
              <span className="text-white text-xs">🔴 1.2M views</span>
            )}
          </div>
        </div>
        {config.showDuration && (
          <div 
            className="absolute bottom-1 right-1 px-1 rounded text-white text-xs"
            style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
          >
            {config.duration}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-red-100 rounded-2xl">
              <ImageIcon className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Video Thumbnail Generator</h2>
          </div>
          <p className="text-gray-500">Design eye-catching thumbnails for YouTube, Twitch, and social media</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
            {/* Platform Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Platform</label>
              <div className="grid grid-cols-4 gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => selectPlatform(platform.id)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      config.platform === platform.id
                        ? "border-red-500 bg-red-50 text-red-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {platform.icon}
                      <span className="text-xs">{platform.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Background */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Background</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <input
                  type="text"
                  placeholder="Background image URL (optional)"
                  value={config.backgroundImage}
                  onChange={(e) => setConfig({ ...config, backgroundImage: e.target.value })}
                  className="w-full h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg"
                />
              </div>
            </div>

            {/* Primary Text */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Primary Text</label>
              <input
                type="text"
                value={config.primaryText}
                onChange={(e) => setConfig({ ...config, primaryText: e.target.value })}
                className="w-full h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg"
                placeholder="Enter your title..."
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={config.primaryTextColor}
                    onChange={(e) => setConfig({ ...config, primaryTextColor: e.target.value })}
                    className="h-10 w-10 rounded-lg cursor-pointer border-2 border-gray-200"
                  />
                  <input
                    type="text"
                    value={config.primaryTextColor}
                    onChange={(e) => setConfig({ ...config, primaryTextColor: e.target.value })}
                    className="flex-1 h-10 px-2 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500">Size: {config.primaryTextSize}px</label>
                  <input
                    type="range"
                    min="24"
                    max="120"
                    value={config.primaryTextSize}
                    onChange={(e) => setConfig({ ...config, primaryTextSize: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500">Style</label>
                  <select
                    value={config.primaryTextStyle}
                    onChange={(e) => setConfig({ ...config, primaryTextStyle: e.target.value as TextStyle })}
                    className="w-full h-10 px-2 bg-gray-50 border border-gray-100 rounded-lg"
                  >
                    {textStyles.map((style) => (
                      <option key={style.id} value={style.id}>{style.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={config.accentColor}
                    onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                    className="h-10 w-10 rounded-lg cursor-pointer border-2 border-gray-200"
                    title="Accent/Outline Color"
                  />
                  <input
                    type="text"
                    value={config.accentColor}
                    onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                    className="flex-1 h-10 px-2 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm"
                    placeholder="Accent"
                  />
                </div>
              </div>
            </div>

            {/* Secondary Text */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Secondary Text</label>
              <input
                type="text"
                value={config.secondaryText}
                onChange={(e) => setConfig({ ...config, secondaryText: e.target.value })}
                className="w-full h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg"
                placeholder="Enter subtitle..."
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={config.secondaryTextColor}
                    onChange={(e) => setConfig({ ...config, secondaryTextColor: e.target.value })}
                    className="h-10 w-10 rounded-lg cursor-pointer border-2 border-gray-200"
                  />
                  <input
                    type="text"
                    value={config.secondaryTextColor}
                    onChange={(e) => setConfig({ ...config, secondaryTextColor: e.target.value })}
                    className="flex-1 h-10 px-2 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500">Size: {config.secondaryTextSize}px</label>
                  <input
                    type="range"
                    min="12"
                    max="48"
                    value={config.secondaryTextSize}
                    onChange={(e) => setConfig({ ...config, secondaryTextSize: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => setConfig({ ...config, showAvatar: !config.showAvatar })}
                className={`p-3 rounded-xl border-2 transition-all ${
                  config.showAvatar ? "border-red-500 bg-red-50 text-red-600" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Star className="h-5 w-5" />
                  <span className="text-xs">Avatar</span>
                </div>
              </button>
              <button
                onClick={() => setConfig({ ...config, showViews: !config.showViews })}
                className={`p-3 rounded-xl border-2 transition-all ${
                  config.showViews ? "border-red-500 bg-red-50 text-red-600" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Eye className="h-5 w-5" />
                  <span className="text-xs">Views</span>
                </div>
              </button>
              <button
                onClick={() => setConfig({ ...config, showDuration: !config.showDuration })}
                className={`p-3 rounded-xl border-2 transition-all ${
                  config.showDuration ? "border-red-500 bg-red-50 text-red-600" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Clock className="h-5 w-5" />
                  <span className="text-xs">Duration</span>
                </div>
              </button>
              <div className="space-y-2">
                <label className="text-xs text-gray-500">Duration</label>
                <input
                  type="text"
                  value={config.duration}
                  onChange={(e) => setConfig({ ...config, duration: e.target.value })}
                  className="w-full h-10 px-2 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm"
                />
              </div>
            </div>

            {/* Overlay */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Overlay</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={config.overlayColor}
                    onChange={(e) => setConfig({ ...config, overlayColor: e.target.value })}
                    className="h-10 w-10 rounded-lg cursor-pointer border-2 border-gray-200"
                  />
                  <input
                    type="text"
                    value={config.overlayColor}
                    onChange={(e) => setConfig({ ...config, overlayColor: e.target.value })}
                    className="flex-1 h-10 px-2 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500">Opacity: {config.overlayOpacity}%</label>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    value={config.overlayOpacity}
                    onChange={(e) => setConfig({ ...config, overlayOpacity: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Border Radius */}
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

          {/* Preview Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
                <span className="text-xs text-gray-500">{config.width}x{config.height}</span>
              </div>
              <div className="flex items-center justify-center bg-gray-100 rounded-xl p-4">
                {renderPreview()}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <button
                onClick={downloadThumbnail}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download HTML
              </button>
            </div>
          </div>
        </div>

        {/* Code Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">HTML Code</h3>
              <button
                onClick={() => copyToClipboard(generateHtmlCode())}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-black transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono">
              {generateHtmlCode()}
            </pre>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">CSS Classes</h3>
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
