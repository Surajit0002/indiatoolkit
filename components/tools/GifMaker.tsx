"use client";

import { useState } from "react";
import { 
  Copy, 
  Check, 

  Film, 

  Clock,
  Trash2,
  Plus,
  Play,
  Pause,
  Settings,
  Download
} from "lucide-react";

interface Frame {
  id: number;
  name: string;
  color: string;
  duration: number;
}

interface GifConfig {
  width: number;
  height: number;
  fps: number;
  loop: boolean;
  dither: boolean;
  quality: number;
}

export default function GifMaker() {
  const [frames, setFrames] = useState<Frame[]>([
    { id: 1, name: "Frame 1", color: "#6366f1", duration: 100 },
    { id: 2, name: "Frame 2", color: "#8b5cf6", duration: 100 },
    { id: 3, name: "Frame 3", color: "#a855f7", duration: 100 },
    { id: 4, name: "Frame 4", color: "#d946ef", duration: 100 },
    { id: 5, name: "Frame 5", color: "#ec4899", duration: 100 }
  ]);
  const [selectedFrame, setSelectedFrame] = useState<number>(1);
  const [config, setConfig] = useState<GifConfig>({
    width: 320,
    height: 240,
    fps: 10,
    loop: true,
    dither: false,
    quality: 80
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentPreviewFrame, setCurrentPreviewFrame] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const addFrame = () => {
    const newId = Math.max(...frames.map(f => f.id)) + 1;
    const lastFrame = frames[frames.length - 1];
    setFrames([...frames, { 
      id: newId, 
      name: `Frame ${newId}`, 
      color: lastFrame ? lastFrame.color : "#6366f1",
      duration: 100 
    }]);
  };

  const removeFrame = (id: number) => {
    if (frames.length > 1) {
      setFrames(frames.filter(f => f.id !== id));
      if (selectedFrame === id) {
        setSelectedFrame(frames[0].id);
      }
    }
  };

  const updateFrame = (id: number, updates: Partial<Frame>) => {
    setFrames(frames.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const getCurrentFrame = () => frames[currentPreviewFrame];

  const playPreview = () => {
    setIsPlaying(true);
    let frameIndex = 0;
    const interval = setInterval(() => {
      frameIndex = (frameIndex + 1) % frames.length;
      setCurrentPreviewFrame(frameIndex);
    }, 1000 / config.fps);
    
    setTimeout(() => {
      setIsPlaying(false);
      clearInterval(interval);
    }, (frames.length * 1000 / config.fps) * 2);
  };

  const generateCode = () => {
    const frameConfigs = frames.map(f => `  {
    id: ${f.id},
    name: "${f.name}",
    color: "${f.color}",
    duration: ${f.duration}ms
  }`).join(",\n");

    return `// GIF Animation Configuration
const gifConfig = {
  width: ${config.width},
  height: ${config.height},
  fps: ${config.fps},
  loop: ${config.loop},
  dither: ${config.dither},
  quality: ${config.quality}
};

// Frames
const frames = [
${frameConfigs}
];

// Usage with gif.js or similar library
function createGif() {
  const gif = new GIF({
    workers: 2,
    quality: ${config.quality},
    width: ${config.width},
    height: ${config.height},
    workerScript: '/gif.worker.js'
  });

  frames.forEach(frame => {
    const canvas = document.createElement('canvas');
    canvas.width = ${config.width};
    canvas.height = ${config.height};
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = frame.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    gif.addFrame(canvas, { delay: frame.duration, copy: true });
  });

  gif.on('finished', blob => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.src = url;
    document.body.appendChild(img);
  });

  gif.render();
}`;
  };

  const generateHtmlPreview = () => {
    const frameStyles = frames.map(f => `
  .frame-${f.id} {
    background-color: ${f.color};
    animation-duration: ${(1000 / config.fps).toFixed(0)}ms;
  }`).join("");

    return `<!DOCTYPE html>
<html>
<head>
  <style>
${frameStyles}
    .gif-container {
      width: ${config.width}px;
      height: ${config.height}px;
      position: relative;
    }
    .frame {
      position: absolute;
      inset: 0;
      animation: frame-cycle ${frames.length}s steps(1) ${config.loop ? "infinite" : "1"};
    }
    @keyframes frame-cycle {
${frames.map((f, i) => `      ${(i / frames.length * 100).toFixed(1)}% { opacity: 1; }
      ${((i + 0.9) / frames.length * 100).toFixed(1)}% { opacity: 0; }`).join("\n")}
    }
  </style>
</head>
<body>
  <div class="gif-container">
${frames.map((f, i) => `    <div class="frame frame-${f.id}" style="animation-delay: ${(i * (1 / config.fps))}s"></div>`).join("\n")}
  </div>
</body>
</html>`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadConfig = () => {
    const data = JSON.stringify({ frames, config }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "gif-config.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-pink-100 rounded-2xl">
              <Film className="h-6 w-6 text-pink-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">GIF Maker</h2>
          </div>
          <p className="text-gray-500">Create animated GIFs from frames with customizable settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Frame Editor */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Frame Editor</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button
                  onClick={addFrame}
                  className="px-3 py-1.5 bg-pink-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-pink-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Frame
                </button>
              </div>
            </div>

            {/* Settings */}
            {showSettings && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Width</label>
                  <input
                    type="number"
                    value={config.width}
                    onChange={(e) => setConfig({ ...config, width: parseInt(e.target.value) })}
                    className="w-full h-8 px-2 text-sm border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Height</label>
                  <input
                    type="number"
                    value={config.height}
                    onChange={(e) => setConfig({ ...config, height: parseInt(e.target.value) })}
                    className="w-full h-8 px-2 text-sm border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 uppercase">FPS: {config.fps}</label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={config.fps}
                    onChange={(e) => setConfig({ ...config, fps: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Quality: {config.quality}%</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={config.quality}
                    onChange={(e) => setConfig({ ...config, quality: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Loop</label>
                  <button
                    onClick={() => setConfig({ ...config, loop: !config.loop })}
                    className={`w-full h-8 px-3 rounded-lg text-sm border transition-colors ${
                      config.loop ? "bg-pink-100 border-pink-300 text-pink-700" : "bg-gray-100 border-gray-200"
                    }`}
                  >
                    {config.loop ? "Enabled" : "Disabled"}
                  </button>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Dither</label>
                  <button
                    onClick={() => setConfig({ ...config, dither: !config.dither })}
                    className={`w-full h-8 px-3 rounded-lg text-sm border transition-colors ${
                      config.dither ? "bg-pink-100 border-pink-300 text-pink-700" : "bg-gray-100 border-gray-200"
                    }`}
                  >
                    {config.dither ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>
            )}

            {/* Frame List */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Frames ({frames.length})</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {frames.map((frame, index) => (
                  <div
                    key={frame.id}
                    className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedFrame === frame.id
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedFrame(frame.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-600">#{index + 1}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeFrame(frame.id); }}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={frame.name}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateFrame(frame.id, { name: e.target.value })}
                      className="w-full h-6 px-2 text-xs bg-white border border-gray-200 rounded mb-2"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={frame.color}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => updateFrame(frame.id, { color: e.target.value })}
                        className="h-6 w-6 rounded cursor-pointer border-0"
                      />
                      <div className="flex-1 h-2 rounded" style={{ backgroundColor: frame.color }} />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <input
                        type="number"
                        value={frame.duration}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => updateFrame(frame.id, { duration: parseInt(e.target.value) })}
                        className="w-16 h-6 px-1 text-xs bg-white border border-gray-200 rounded"
                      />
                      <span className="text-xs text-gray-500">ms</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
                <button
                  onClick={playPreview}
                  className="px-3 py-1.5 bg-pink-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-pink-700 transition-colors"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? "Stop" : "Play"}
                </button>
              </div>
              <div 
                className="flex items-center justify-center rounded-xl overflow-hidden"
                style={{ 
                  width: "100%", 
                  aspectRatio: `${config.width}/${config.height}`,
                  maxHeight: "200px",
                  backgroundColor: getCurrentFrame()?.color || "#e5e7eb"
                }}
              >
                <div className="text-white font-bold text-center">
                  <p className="text-lg">Frame {currentPreviewFrame + 1}</p>
                  <p className="text-xs opacity-80">{getCurrentFrame()?.name}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                {frames.map((f, i) => (
                  <div
                    key={f.id}
                    className={`h-2 flex-1 rounded transition-all ${
                      i === currentPreviewFrame ? "bg-pink-500" : "bg-gray-200"
                    }`}
                    style={{ backgroundColor: i === currentPreviewFrame ? f.color : undefined }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Export</h3>
                <button
                  onClick={downloadConfig}
                  className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-black transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
              <div className="space-y-3">
                <p className="text-xs text-gray-500">
                  {frames.length} frames @ {config.fps}fps<br/>
                  {((frames.reduce((acc, f) => acc + f.duration, 0) / 1000)).toFixed(2)}s duration<br/>
                  {config.width}x{config.height}px
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">JavaScript Configuration</h3>
              <button
                onClick={() => copyToClipboard(generateCode())}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-black transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono">
              {generateCode()}
            </pre>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">HTML Preview</h3>
              <button
                onClick={() => copyToClipboard(generateHtmlPreview())}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-black transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono">
              {generateHtmlPreview()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
