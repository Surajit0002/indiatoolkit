"use client";

import { useState, useRef, useEffect } from "react";
import { Crop, Upload, Download, Loader2, Image as ImageIcon, X } from "lucide-react";

const ASPECT_RATIOS = [
  { name: "Free", value: null },
  { name: "1:1 (Square)", value: 1 },
  { name: "4:3", value: 4 / 3 },
  { name: "3:4", value: 3 / 4 },
  { name: "16:9", value: 16 / 9 },
  { name: "9:16", value: 9 / 16 },
  { name: "3:2", value: 3 / 2 },
  { name: "2:3", value: 2 / 3 },
];

export default function ImageCropper() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [cropped, setCropped] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(1);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const _canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    setCropped(null);
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

  const cropImage = () => {
    if (!selectedImage || !preview) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const maxPreviewSize = 400;
      const scale = Math.min(maxPreviewSize / img.width, maxPreviewSize / img.height);
      
      const displayWidth = img.width * scale;
      const _displayHeight = img.height * scale;

      const cropWidth = Math.min(cropArea.width || displayWidth, displayWidth);
      const cropHeight = aspectRatio 
        ? cropWidth / aspectRatio 
        : (cropArea.height || cropWidth);
      
      canvas.width = cropWidth / scale;
      canvas.height = cropHeight / scale;

      const cropX = cropArea.x || 0;
      const cropY = cropArea.y || 0;

      ctx?.drawImage(
        img,
        cropX / scale,
        cropY / scale,
        cropWidth / scale,
        cropHeight / scale,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const croppedUrl = canvas.toDataURL(selectedImage.type);
      setCropped(croppedUrl);
      setIsProcessing(false);
    };
  };

  const resetCrop = () => {
    setCropArea({ x: 0, y: 0, width: 0, height: 0 });
  };

  useEffect(() => {
    if (preview) {
      const img = new Image();
      img.src = preview;
      img.onload = () => {
        const maxSize = 400;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        const displayWidth = img.width * scale;
        const displayHeight = img.height * scale;
        
        setCropArea({
          x: 0,
          y: 0,
          width: displayWidth,
          height: displayHeight
        });
      };
    }
  }, [preview]);

  const handleDownload = () => {
    if (cropped && selectedImage) {
      const link = document.createElement("a");
      link.download = `cropped-image.${selectedImage.type.split("/")[1] || "png"}`;
      link.href = cropped;
      link.click();
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div 
              ref={containerRef}
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
                      setCropped(null);
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
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Aspect Ratio</label>
                <div className="grid grid-cols-4 gap-2">
                  {ASPECT_RATIOS.map((ratio) => (
                    <button
                      key={ratio.name}
                      onClick={() => setAspectRatio(ratio.value)}
                      className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                        aspectRatio === ratio.value
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {ratio.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={resetCrop}
                  disabled={!preview}
                  className="flex-1 h-12 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 transition-all font-bold"
                >
                  Reset
                </button>
                <button
                  onClick={cropImage}
                  disabled={!preview || isProcessing}
                  className="flex-1 h-12 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-200 transition-all font-bold flex items-center justify-center gap-2"
                >
                  {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Crop className="h-5 w-5" />}
                  Crop
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl flex flex-col items-center justify-center p-8 border border-gray-100 min-h-[400px]">
            {cropped ? (
              <div className="w-full space-y-6 text-center">
                <img src={cropped} alt="Cropped" className="max-h-64 mx-auto rounded-lg shadow-sm" />
                <div className="text-sm text-gray-500 font-medium">
                  Preview
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
                <p className="text-gray-400 font-medium">Cropped image will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
