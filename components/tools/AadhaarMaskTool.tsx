"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Eye, EyeOff, Download, Image as ImageIcon, X, Shield, RefreshCw } from "lucide-react";

interface MaskArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function AadhaarMaskTool() {
  const [image, setImage] = useState<string | null>(null);
  const [maskType, setMaskType] = useState<"blur" | "pixelate" | "black">("blur");
  const [intensity, setIntensity] = useState(15);
  const [maskAreas, setMaskAreas] = useState<MaskArea[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setMaskAreas([]);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const applyMask = useCallback(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Apply masks
      maskAreas.forEach((area) => {
        const imageData = ctx.getImageData(area.x, area.y, area.width, area.height);
        
        if (maskType === "blur") {
          // Simple box blur
          const blurred = boxBlur(imageData, intensity);
          ctx.putImageData(blurred, area.x, area.y);
        } else if (maskType === "pixelate") {
          // Pixelate effect
          const pixelSize = Math.max(5, intensity);
          for (let y = area.y; y < area.y + area.height; y += pixelSize) {
            for (let x = area.x; x < area.x + area.width; x += pixelSize) {
              const pixelData = ctx.getImageData(x, y, 1, 1);
              ctx.fillStyle = `rgb(${pixelData.data[0]}, ${pixelData.data[1]}, ${pixelData.data[2]})`;
              ctx.fillRect(x, y, pixelSize, pixelSize);
            }
          }
        } else if (maskType === "black") {
          // Solid black bar
          ctx.fillStyle = "#000000";
          ctx.fillRect(area.x, area.y, area.width, area.height);
        }
      });

      // If preview mode, apply mask to entire sensitive areas (typically bottom half with Aadhaar number)
      if (previewMode) {
        const aadhaarHeight = canvas.height * 0.15;
        const aadhaarY = canvas.height - aadhaarHeight;
        
        // Mask Aadhaar number area
        const imageData = ctx.getImageData(0, aadhaarY, canvas.width, aadhaarHeight);
        const blurred = boxBlur(imageData, intensity);
        ctx.putImageData(blurred, 0, aadhaarY);
      }
    };
    img.src = image;
  }, [image, maskAreas, maskType, intensity, previewMode]);

  const boxBlur = (imageData: ImageData, radius: number): ImageData => {
    const pixels = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const output = new ImageData(width, height);
    const outputPixels = output.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0, g = 0, b = 0, count = 0;

        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const i = (ny * width + nx) * 4;
              r += pixels[i];
              g += pixels[i + 1];
              b += pixels[i + 2];
              count++;
            }
          }
        }

        const i = (y * width + x) * 4;
        outputPixels[i] = r / count;
        outputPixels[i + 1] = g / count;
        outputPixels[i + 2] = b / count;
        outputPixels[i + 3] = pixels[i + 3];
      }
    }

    return output;
  };

  const addManualMask = () => {
    if (!image) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Add a mask area in the center
    const newMask: MaskArea = {
      x: Math.floor(canvas.width * 0.1),
      y: Math.floor(canvas.height * 0.3),
      width: Math.floor(canvas.width * 0.8),
      height: Math.floor(canvas.height * 0.1),
    };

    setMaskAreas([...maskAreas, newMask]);
  };

  const clearMasks = () => {
    setMaskAreas([]);
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;

    applyMask();
    
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const link = document.createElement("a");
      link.download = "masked-aadhaar.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }, 100);
  };

  const clearImage = () => {
    setImage(null);
    setMaskAreas([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Aadhaar Mask Tool</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Securely mask sensitive information on your Aadhaar card
          </p>
        </div>

        {!image ? (
          /* Upload Area */
          <div
            className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer ${
              isDragging
                ? "border-emerald-500 bg-emerald-50"
                : "border-slate-200 hover:border-emerald-300 hover:bg-slate-50"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
            />
            <Upload className="h-16 w-16 mx-auto text-slate-300 mb-4" />
            <p className="text-lg font-bold text-slate-700 mb-2">
              Drop your Aadhaar image here
            </p>
            <p className="text-sm text-slate-500">
              or click to browse files
            </p>
            <p className="text-xs text-slate-400 mt-4">
              Supports: JPG, PNG, WEBP (Max 10MB)
            </p>
          </div>
        ) : (
          /* Editor */
          <div className="space-y-6">
            {/* Controls */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mask Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Mask Type
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: "blur", label: "Blur", icon: EyeOff },
                      { value: "pixelate", label: "Pixelate", icon: ImageIcon },
                      { value: "black", label: "Black Bar", icon: Eye },
                    ].map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setMaskType(type.value as any)}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                          maskType === type.value
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Intensity */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Intensity: {intensity}
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={intensity}
                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>

              {/* Preview Mode Toggle */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={previewMode}
                    onChange={(e) => setPreviewMode(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-bold text-slate-700">
                    Auto-detect Aadhaar number area
                  </span>
                </label>
                <p className="text-xs text-slate-400 mt-1 ml-8">
                  Automatically masks the bottom area where Aadhaar number is typically located
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={addManualMask}
                  className="flex-1 min-w-[120px] py-3 px-4 rounded-xl bg-blue-100 text-blue-700 font-bold text-sm hover:bg-blue-200 transition-all"
                >
                  Add Mask Area
                </button>
                <button
                  onClick={clearMasks}
                  className="flex-1 min-w-[120px] py-3 px-4 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-all"
                >
                  Clear Masks
                </button>
                <button
                  onClick={clearImage}
                  className="flex-1 min-w-[120px] py-3 px-4 rounded-xl bg-red-100 text-red-700 font-bold text-sm hover:bg-red-200 transition-all"
                >
                  Remove Image
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Preview
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    {maskAreas.length} mask area(s)
                  </span>
                </div>
              </div>
              <div className="p-6 overflow-auto">
                <canvas
                  ref={canvasRef}
                  onLoad={applyMask}
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Download */}
            <button
              onClick={downloadImage}
              className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-100"
            >
              <Download className="h-5 w-5" />
              Download Masked Image
            </button>

            {/* Privacy Notice */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-emerald-600 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-800 text-sm">Privacy Protected</h4>
                  <p className="text-xs text-emerald-600 mt-1">
                    Your images are processed entirely in your browser. Nothing is uploaded to any server.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
