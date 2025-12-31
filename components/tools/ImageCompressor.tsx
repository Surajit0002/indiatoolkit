"use client";

import { useState } from "react";
import { Image as ImageIcon, Upload, Download, Loader2 } from "lucide-react";

export default function ImageCompressor() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [compressed, setCompressed] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [quality, setQuality] = useState(0.7);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setCompressed(null);
    }
  };

  const compressImage = () => {
    if (!selectedImage) return;
    setIsCompressing(true);

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        setCompressed(compressedDataUrl);
        setIsCompressing(false);
      };
    };
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div 
              className="border-2 border-dashed border-gray-200 rounded-2xl h-64 flex flex-col items-center justify-center relative overflow-hidden bg-gray-50"
              onDragOver={(e) => e.preventDefault()}
            >
              {preview ? (
                <img src={preview} alt="Original" className="w-full h-full object-contain" />
              ) : (
                <>
                  <Upload className="h-10 w-10 text-gray-300 mb-2" />
                  <p className="text-sm text-gray-400 font-bold uppercase">Upload Image</p>
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
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Compression Quality</label>
                <span className="text-emerald-600 font-black">{Math.round(quality * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <button
                onClick={compressImage}
                disabled={!selectedImage || isCompressing}
                className="w-full h-14 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:bg-gray-200 transition-all font-bold flex items-center justify-center gap-2"
              >
                {isCompressing ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImageIcon className="h-5 w-5" />}
                Compress Image
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl flex flex-col items-center justify-center p-8 border border-gray-100">
            {compressed ? (
              <div className="w-full space-y-6 text-center">
                <img src={compressed} alt="Compressed" className="max-h-64 mx-auto rounded-lg shadow-sm" />
                <a 
                  href={compressed} 
                  download="compressed-image.jpg"
                  className="inline-flex items-center gap-2 h-14 px-8 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
                >
                  <Download className="h-5 w-5" />
                  Download Compressed
                </a>
              </div>
            ) : (
              <div className="text-center space-y-4 opacity-30">
                <ImageIcon className="h-16 w-16 mx-auto text-gray-300" />
                <p className="text-sm font-bold uppercase text-gray-400">Preview Result</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
