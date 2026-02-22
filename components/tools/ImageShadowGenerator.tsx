"use client";

import { useState } from "react";
import { Cloud, Upload, Download, Loader2, Image as ImageIcon, X } from "lucide-react";

const SHADOW_PRESETS = [
  { name: "None", value: { offsetX: 0, offsetY: 0, blur: 0, spread: 0, color: "rgba(0,0,0,0.3)" } },
  { name: "Small", value: { offsetX: 2, offsetY: 2, blur: 4, spread: 0, color: "rgba(0,0,0,0.2)" } },
  { name: "Medium", value: { offsetX: 4, offsetY: 4, blur: 10, spread: 0, color: "rgba(0,0,0,0.25)" } },
  { name: "Large", value: { offsetX: 8, offsetY: 8, blur: 20, spread: 0, color: "rgba(0,0,0,0.3)" } },
  { name: "Intense", value: { offsetX: 12, offsetY: 12, blur: 30, spread: 5, color: "rgba(0,0,0,0.4)" } },
  { name: "Soft", value: { offsetX: 0, offsetY: 10, blur: 30, spread: -5, color: "rgba(0,0,0,0.2)" } },
  { name: "Glow", value: { offsetX: 0, offsetY: 0, blur: 20, spread: 5, color: "rgba(255,255,255,0.5)" } },
  { name: "Neon", value: { offsetX: 0, offsetY: 0, blur: 15, spread: 3, color: "rgba(0,255,255,0.8)" } },
];

export default function ImageShadowGenerator() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [offsetX, setOffsetX] = useState(8);
  const [offsetY, setOffsetY] = useState(8);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(0);
  const [shadowColor, setShadowColor] = useState("rgba(0,0,0,0.3)");
  const [_inset, _setInset] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
    setResult(null);
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

  const applyShadow = () => {
    if (!selectedImage || !preview) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const shadowPadding = Math.max(offsetX, offsetY) + blur + Math.abs(spread) + 20;
      const newWidth = img.width + shadowPadding * 2;
      const newHeight = img.height + shadowPadding * 2;

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx!.fillStyle = "#ffffff";
      ctx!.fillRect(0, 0, canvas.width, canvas.height);

      ctx!.shadowColor = shadowColor;
      ctx!.shadowOffsetX = offsetX;
      ctx!.shadowOffsetY = offsetY;
      ctx!.shadowBlur = blur;

      ctx!.drawImage(img, shadowPadding, shadowPadding);

      const resultUrl = canvas.toDataURL(selectedImage.type);
      setResult(resultUrl);
      setIsProcessing(false);
    };
  };

  const applyPreset = (preset: typeof SHADOW_PRESETS[0]["value"]) => {
    setOffsetX(preset.offsetX);
    setOffsetY(preset.offsetY);
    setBlur(preset.blur);
    setSpread(preset.spread);
    setShadowColor(preset.color);
  };

  const handleDownload = () => {
    if (result && selectedImage) {
      const link = document.createElement("a");
      link.download = `shadow-image.${selectedImage.type.split("/")[1] || "png"}`;
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
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Presets</label>
                <div className="grid grid-cols-4 gap-2">
                  {SHADOW_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset.value)}
                      disabled={!preview}
                      className="px-3 py-2 text-sm rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Offset X: {offsetX}px</label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={offsetX}
                    onChange={(e) => setOffsetX(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Offset Y: {offsetY}px</label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={offsetY}
                    onChange={(e) => setOffsetY(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Blur: {blur}px</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={blur}
                    onChange={(e) => setBlur(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Spread: {spread}px</label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={spread}
                    onChange={(e) => setSpread(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Shadow Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={shadowColor.startsWith("rgba") ? "#000000" : shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="flex-1 h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  />
                </div>
              </div>

              <button
                onClick={applyShadow}
                disabled={!preview || isProcessing}
                className="w-full h-14 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-200 transition-all font-bold flex items-center justify-center gap-2"
              >
                {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Cloud className="h-5 w-5" />}
                Apply Shadow
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl flex flex-col items-center justify-center p-8 border border-gray-100 min-h-[400px]">
            {result ? (
              <div className="w-full space-y-6 text-center">
                <img src={result} alt="With Shadow" className="max-h-64 mx-auto rounded-lg shadow-sm" />
                <div className="text-sm text-gray-500 font-medium">
                  Shadow: {offsetX}px, {offsetY}px offset, {blur}px blur
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
                <p className="text-gray-400 font-medium">Image with shadow will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
