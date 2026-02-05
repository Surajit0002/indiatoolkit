"use client";

import { useState, useRef } from "react";
import { Scissors, Upload, RefreshCw, Download, CheckCircle, Image, X } from "lucide-react";

interface ProcessedImage {
  id: number;
  originalName: string;
  processedUrl: string;
  originalUrl: string;
}

export default function AiBackgroundRemover() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (files: FileList) => {
    setIsProcessing(true);

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        // Simulate AI processing
        setTimeout(() => {
          const newImage: ProcessedImage = {
            id: Date.now() + Math.random(),
            originalName: file.name,
            processedUrl: "", // Would be the processed image URL
            originalUrl: URL.createObjectURL(file),
          };
          setImages((prev) => [...prev, newImage]);
        }, 1500);
      }
    });

    setTimeout(() => setIsProcessing(false), 2000);
  };

  const removeImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const downloadImage = (image: ProcessedImage) => {
    const link = document.createElement("a");
    link.download = `removed-bg-${image.originalName}`;
    link.click();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <Scissors className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Background Remover</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Remove backgrounds from images with one click using AI
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6">
            {/* Drop Zone */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                dragActive
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-300 hover:border-emerald-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="space-y-4">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-emerald-100 rounded-2xl">
                  <Upload className="h-8 w-8 text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-lg">
                    Drop your images here
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    or click to browse files
                  </p>
                </div>
                <p className="text-xs text-slate-400">
                  Supports PNG, JPG, WebP • Max 10MB per file
                </p>
              </div>

              <button
                onClick={triggerFileInput}
                className="absolute inset-0 w-full h-full cursor-pointer"
              />
            </div>

            {/* Processing Status */}
            {isProcessing && (
              <div className="mt-6 p-4 bg-emerald-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <RefreshCw className="h-5 w-5 text-emerald-600 animate-spin" />
                  <span className="font-medium text-emerald-700">
                    Processing images with AI...
                  </span>
                </div>
              </div>
            )}

            {/* Results */}
            {images.length > 0 && (
              <>
                <div className="mt-6">
                  <h3 className="font-bold text-slate-800 uppercase text-sm mb-4">
                    Processed Images ({images.length})
                  </h3>

                  <div className="space-y-4">
                    {images.map((image) => (
                      <div
                        key={image.id}
                        className="bg-slate-50 rounded-2xl p-4 border border-slate-200"
                      >
                        <div className="flex items-center gap-4">
                          {/* Before/After Preview */}
                          <div className="flex gap-2">
                            <div className="relative">
                              <div className="h-24 w-24 rounded-xl overflow-hidden bg-white border border-slate-200">
                                <img
                                  src={image.originalUrl}
                                  alt={image.originalName}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <p className="text-xs text-center mt-1 text-slate-500">
                                Original
                              </p>
                            </div>
                            <div className="flex items-center">
                              <Scissors className="h-5 w-5 text-emerald-500" />
                            </div>
                            <div className="relative">
                              <div className="h-24 w-24 rounded-xl overflow-hidden bg-white border border-slate-200">
                                <div className="h-full w-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                                  <Image className="h-8 w-8 text-white opacity-50" />
                                </div>
                              </div>
                              <p className="text-xs text-center mt-1 text-slate-500">
                                Result
                              </p>
                              {image.processedUrl && (
                                <img
                                  src={image.processedUrl}
                                  alt="Processed"
                                  className="absolute inset-0 h-full w-full object-cover"
                                />
                              )}
                            </div>
                          </div>

                          {/* Info & Actions */}
                          <div className="flex-1">
                            <p className="font-bold text-slate-800 truncate">
                              {image.originalName}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium">
                                <CheckCircle className="h-3 w-3" />
                                Background Removed
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => downloadImage(image)}
                              className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-sm font-bold hover:bg-emerald-200 transition-all"
                            >
                              <Download className="h-4 w-4" />
                              Download
                            </button>
                            <button
                              onClick={() => removeImage(image.id)}
                              className="p-2 bg-slate-200 rounded-xl hover:bg-slate-300 transition-all"
                            >
                              <X className="h-4 w-4 text-slate-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
            <Scissors className="h-8 w-8 text-emerald-600 mb-3" />
            <h3 className="font-bold text-emerald-800 mb-2">One-Click Removal</h3>
            <p className="text-sm text-emerald-700">
              Simply upload and let AI automatically remove backgrounds in seconds.
            </p>
          </div>
          <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100">
            <Upload className="h-8 w-8 text-teal-600 mb-3" />
            <h3 className="font-bold text-teal-800 mb-2">Batch Processing</h3>
            <p className="text-sm text-teal-700">
              Process multiple images at once for efficient workflow.
            </p>
          </div>
          <div className="p-6 bg-cyan-50 rounded-2xl border border-cyan-100">
            <Download className="h-8 w-8 text-cyan-600 mb-3" />
            <h3 className="font-bold text-cyan-800 mb-2">High Quality</h3>
            <p className="text-sm text-cyan-700">
              Preserves edges and details for clean, professional results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
