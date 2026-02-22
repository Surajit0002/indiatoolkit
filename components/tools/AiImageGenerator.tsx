"use client";

import { useState } from "react";
import { Image as ImageIcon, Copy, Download, RefreshCw, Sparkles, Palette, Wand2, Maximize2 } from "lucide-react";

const artStyles = [
  "Realistic",
  "Digital Art",
  "Oil Painting",
  "Watercolor",
  "Anime/Manga",
  "Pixel Art",
  "Minimalist",
  "Abstract",
  "3D Render",
  "Cyberpunk",
];

const aspectRatios = [
  { label: "Square (1:1)", value: "1:1" },
  { label: "Portrait (3:4)", value: "3:4" },
  { label: "Landscape (4:3)", value: "4:3" },
  { label: "Wide (16:9)", value: "16:9" },
  { label: "Story (9:16)", value: "9:16" },
];

interface GeneratedImage {
  id: number;
  prompt: string;
  style: string;
  aspectRatio: string;
  color: string;
}

export default function AiImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Digital Art");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const generateImages = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const newImages: GeneratedImage[] = [];
      const colors = [
        "from-purple-500 to-pink-500",
        "from-blue-500 to-cyan-500",
        "from-amber-500 to-orange-500",
        "from-green-500 to-emerald-500",
        "from-indigo-500 to-purple-500",
      ];

      for (let i = 0; i < 4; i++) {
        newImages.push({
          id: Date.now() + i,
          prompt: prompt,
          style: style,
          aspectRatio: aspectRatio,
          color: colors[i % colors.length],
        });
      }

      setGeneratedImages(newImages);
      setIsGenerating(false);
    }, 2000);
  };

  const copyPrompt = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadImage = (id: number) => {
    // Simulate download
    const link = document.createElement("a");
    link.download = `ai-generated-${id}.png`;
    link.click();
  };

  const resetForm = () => {
    setPrompt("");
    setGeneratedImages([]);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <ImageIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Image Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Transform your ideas into stunning visuals with AI
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Prompt */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Describe your image
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A serene mountain lake at sunset with reflection, majestic clouds..."
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none font-medium resize-none h-28"
              />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  <Palette className="h-4 w-4 inline mr-2" />
                  Art Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none font-medium bg-white"
                >
                  {artStyles.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  <Maximize2 className="h-4 w-4 inline mr-2" />
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none font-medium bg-white"
                >
                  {aspectRatios.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={generateImages}
                disabled={!prompt.trim() || isGenerating}
                className="flex-1 h-14 bg-linear-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg shadow-purple-100 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Images
                  </>
                )}
              </button>

              <button
                onClick={resetForm}
                className="px-6 h-14 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results */}
          {generatedImages.length > 0 && (
            <>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 uppercase text-sm">
                    Generated Images ({generatedImages.length})
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {generatedImages.map((img) => (
                    <div
                      key={img.id}
                      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-purple-200 transition-all"
                    >
                      {/* Image Preview */}
                      <div className={`aspect-square bg-linear-to-br ${img.color} flex items-center justify-center`}>
                        <Wand2 className="h-12 w-12 text-white opacity-50" />
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => copyPrompt(img.id, img.prompt)}
                          className="p-2 bg-white rounded-lg hover:bg-slate-100 transition-colors"
                          title="Copy prompt"
                        >
                          {copiedId === img.id ? (
                            <span className="text-xs text-green-600 font-bold px-2">Copied!</span>
                          ) : (
                            <Copy className="h-4 w-4 text-slate-700" />
                          )}
                        </button>
                        <button
                          onClick={() => downloadImage(img.id)}
                          className="p-2 bg-white rounded-lg hover:bg-slate-100 transition-colors"
                          title="Download"
                        >
                          <Download className="h-4 w-4 text-slate-700" />
                        </button>
                      </div>

                      {/* Info */}
                      <div className="p-3">
                        <p className="text-xs text-slate-500 truncate">{img.style}</p>
                        <p className="text-xs text-slate-400">{img.aspectRatio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
            <Sparkles className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-purple-800 mb-2">AI-Powered</h3>
            <p className="text-sm text-purple-700">
              Advanced AI understands your descriptions and creates unique, high-quality images.
            </p>
          </div>
          <div className="p-6 bg-pink-50 rounded-2xl border border-pink-100">
            <Palette className="h-8 w-8 text-pink-600 mb-3" />
            <h3 className="font-bold text-pink-800 mb-2">Multiple Styles</h3>
            <p className="text-sm text-pink-700">
              Choose from various art styles to match your vision and project requirements.
            </p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <Maximize2 className="h-8 w-8 text-indigo-600 mb-3" />
            <h3 className="font-bold text-indigo-800 mb-2">Custom Sizes</h3>
            <p className="text-sm text-indigo-700">
              Generate images in various aspect ratios for social media, web, or print.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
