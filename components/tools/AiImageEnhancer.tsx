"use client";

import { useState } from "react";
import { Zap, Upload, RefreshCw, Download, Maximize2, Eye, Wand2, Sliders } from "lucide-react";

const enhancementTypes = [
  { id: "upscale", name: "Upscale", icon: <Maximize2 className="h-4 w-4" />, description: "Increase resolution up to 4x" },
  { id: "sharpen", name: "Sharpen", icon: <Eye className="h-4 w-4" />, description: "Enhance details and edges" },
  { id: "denoise", name: "Denoise", icon: <Wand2 className="h-4 w-4" />, description: "Remove noise and artifacts" },
  { id: "colorize", name: "Colorize", icon: <Zap className="h-4 w-4" />, description: "Enhance colors and vibrancy" },
];

const upscaleFactors = [2, 3, 4];

export default function AiImageEnhancer() {
  const [selectedEnhancements, setSelectedEnhancements] = useState<string[]>(["upscale"]);
  const [upscaleFactor, setUpscaleFactor] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);

  const toggleEnhancement = (id: string) => {
    setSelectedEnhancements((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleEnhance = async () => {
    if (selectedEnhancements.length === 0) return;

    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      setProcessed(true);
      setIsProcessing(false);
    }, 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setOriginalPreview(url);
    }
  };

  const downloadResult = () => {
    const link = document.createElement("a");
    link.download = "enhanced-image.png";
    link.click();
  };

  const resetForm = () => {
    setSelectedEnhancements(["upscale"]);
    setProcessed(false);
    setOriginalPreview(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Image Enhancer</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Enhance image quality using AI - upscale, sharpen, and denoise
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                <Upload className="h-4 w-4 inline mr-2" />
                Upload Image
              </label>
              <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-violet-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="space-y-2">
                  <Upload className="h-10 w-10 text-slate-400 mx-auto" />
                  <p className="text-slate-600 font-medium">
                    {originalPreview ? "Image uploaded" : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-slate-400">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Enhancement Options */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                <Sliders className="h-4 w-4 inline mr-2" />
                Enhancement Options
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {enhancementTypes.map((enhancement) => (
                  <button
                    key={enhancement.id}
                    onClick={() => toggleEnhancement(enhancement.id)}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      selectedEnhancements.includes(enhancement.id)
                        ? "border-violet-500 bg-violet-50"
                        : "border-slate-200 hover:border-violet-300"
                    }`}
                  >
                    <div className={`${selectedEnhancements.includes(enhancement.id) ? "text-violet-600" : "text-slate-400"}`}>
                      {enhancement.icon}
                    </div>
                    <p className="font-bold text-slate-800 mt-2">{enhancement.name}</p>
                    <p className="text-xs text-slate-500">{enhancement.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Upscale Factor */}
            {selectedEnhancements.includes("upscale") && (
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  <Maximize2 className="h-4 w-4 inline mr-2" />
                  Upscale Factor: {upscaleFactor}x
                </label>
                <div className="flex gap-4">
                  {upscaleFactors.map((factor) => (
                    <button
                      key={factor}
                      onClick={() => setUpscaleFactor(factor)}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                        upscaleFactor === factor
                          ? "bg-violet-500 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {factor}x
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Preview Area */}
            {originalPreview && (
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Preview
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Original</p>
                    <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden">
                      <img
                        src={originalPreview}
                        alt="Original"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Enhanced (Preview)</p>
                    <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden relative">
                      {isProcessing ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                          <RefreshCw className="h-8 w-8 text-white animate-spin" />
                        </div>
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center ${processed ? "" : "opacity-50"}`}>
                          {processed ? (
                            <img
                              src={originalPreview}
                              alt="Enhanced"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Zap className="h-12 w-12 text-white" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhance Button */}
            <div className="flex gap-4">
              <button
                onClick={handleEnhance}
                disabled={!originalPreview || selectedEnhancements.length === 0 || isProcessing}
                className="flex-1 h-14 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-violet-600 hover:to-purple-700 transition-all shadow-lg shadow-violet-100 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    Enhance Image
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
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-violet-50 rounded-2xl border border-violet-100">
            <Maximize2 className="h-8 w-8 text-violet-600 mb-3" />
            <h3 className="font-bold text-violet-800 mb-2">Smart Upscaling</h3>
            <p className="text-sm text-violet-700">
              AI-powered upscaling adds realistic details when enlarging images.
            </p>
          </div>
          <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
            <Wand2 className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-purple-800 mb-2">Auto Enhancement</h3>
            <p className="text-sm text-purple-700">
              Automatically improve sharpness, reduce noise, and enhance colors.
            </p>
          </div>
          <div className="p-6 bg-fuchsia-50 rounded-2xl border border-fuchsia-100">
            <Zap className="h-8 w-8 text-fuchsia-600 mb-3" />
            <h3 className="font-bold text-fuchsia-800 mb-2">Instant Results</h3>
            <p className="text-sm text-fuchsia-700">
              Get professional-quality results in seconds with our AI engine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
