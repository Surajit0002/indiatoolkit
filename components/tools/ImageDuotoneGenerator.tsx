"use client";

import { useState } from "react";
import { Palette, Upload, Download, Loader2, Image as ImageIcon, X } from "lucide-react";

const COLOR_PRESETS = [
  { name: "Blue & Orange", dark: "#1e3a8a", light: "#fb923c" },
  { name: "Purple & Lime", dark: "#7c3aed", light: "#84cc16" },
  { name: "Red & Cyan", dark: "#dc2626", light: "#06b6d4" },
  { name: "Pink & Teal", dark: "#db2777", light: "#14b8a6" },
  { name: "Navy & Gold", dark: "#1e3a8a", light: "#eab308" },
  { name: "Black & White", dark: "#000000", light: "#ffffff" },
  { name: "Green & Violet", dark: "#16a34a", light: "#8b5cf6" },
  { name: "Gray & Blue", dark: "#374151", light: "#3b82f6" },
];

export default function ImageDuotoneGenerator() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [darkColor, setDarkColor] = useState("#1e3a8a");
  const [lightColor, setLightColor] = useState("#fb923c");
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
    setResult(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const applyDuotone = () => {
    if (!selectedImage || !preview) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx!.drawImage(img, 0, 0);

      const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const dark = hexToRgb(darkColor);
      const light = hexToRgb(lightColor);

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        const factor = gray / 255;

        data[i] = Math.round(light.r * factor + dark.r * (1 - factor));
        data[i + 1] = Math.round(light.g * factor + dark.g * (1 - factor));
        data[i + 2] = Math.round(light.b * factor + dark.b * (1 - factor));
      }

      ctx!.putImageData(imageData, 0, 0);

      const resultUrl = canvas.toDataURL(selectedImage.type);
      setResult(resultUrl);
      setIsProcessing(false);
    };
  };

  const applyPreset = (preset: typeof COLOR_PRESETS[0]) => {
    setDarkColor(preset.dark);
    setLightColor(preset.light);
  };

  const handleDownload = () => {
    if (result && selectedImage) {
      const link = document.createElement("a");
      link.download = `duotone-image.${selectedImage.type.split("/")[1] || "png"}`;
      link.href = result;
      link.click();
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div 
              className={`border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center relative overflow-hidden bg-gray-50 transition-colors ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {preview ? (
                <div className="relative w-full h-full">
                  <img 
                    src={preview} 
                    alt="Original" 
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setPreview(null);
                      setResult(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 text-gray-300 mb-2" />
                  <p className="text-sm text-gray-400 font-bold uppercase">Upload Image</p>
                  <p className="text-xs text-gray-300 mt-1">or drag and drop</p>
                </>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Color Presets</label>
                <div className="grid grid-cols-4 gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      disabled={!preview}
                      className="flex flex-col items-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 disabled:opacity-50 transition-colors"
                    >
                      <div className="flex w-full h-4 rounded overflow-hidden mb-1">
                        <div className="flex-1" style={{ backgroundColor: preset.dark }} />
                        <div className="flex-1" style={{ backgroundColor: preset.light }} />
                      </div>
                      <span className="text-xs text-gray-600 font-medium truncate w-full">{preset.name.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dark Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      className="flex-1 h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Light Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      className="flex-1 h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={applyDuotone}
                disabled={!preview || isProcessing}
                className="w-full h-14 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-200 transition-all font-bold flex items-center justify-center gap-2"
              >
                {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Palette className="h-5 w-5" />}
                Apply Duotone
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl flex flex-col items-center justify-center p-8 border border-gray-100 min-h-[400px]">
            {result ? (
              <div className="w-full space-y-6 text-center">
                <img src={result} alt="Duotone" className="max-h-64 mx-auto rounded-lg shadow-sm" />
                <div className="flex justify-center gap-4 text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: darkColor }} />
                    Dark
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: lightColor }} />
                    Light
                  </div>
                </div>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 h-14 px-8 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
                >
                  <Download className="h-5 w-5" />
                  Download
                </button>
              </div>
            ) : (
              <div className="text-center">
                <ImageIcon className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">Duotone image will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
