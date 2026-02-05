"use client";

import { useState } from "react";
import { RefreshCw, Upload, Download, Loader2, Image as ImageIcon, X } from "lucide-react";

export default function ImageInverter() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
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

  const invertColors = () => {
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

      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }

      ctx!.putImageData(imageData, 0, 0);

      const resultUrl = canvas.toDataURL(selectedImage.type);
      setResult(resultUrl);
      setIsProcessing(false);
    };
  };

  const handleDownload = () => {
    if (result && selectedImage) {
      const link = document.createElement("a");
      link.download = `inverted-image.${selectedImage.type.split("/")[1] || "png"}`;
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
              <button
                onClick={invertColors}
                disabled={!preview || isProcessing}
                className="w-full h-14 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-200 transition-all font-bold flex items-center justify-center gap-2"
              >
                {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <RefreshCw className="h-5 w-5" />}
                Invert Colors
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl flex flex-col items-center justify-center p-8 border border-gray-100 min-h-[400px]">
            {result ? (
              <div className="w-full space-y-6 text-center">
                <img src={result} alt="Inverted" className="max-h-64 mx-auto rounded-lg shadow-sm" />
                <div className="text-sm text-gray-500 font-medium">
                  Colors inverted
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
                <p className="text-gray-400 font-medium">Inverted image will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
