"use client";

import { useState } from "react";
import { ImageIcon, Upload, Download, Loader2, RefreshCw } from "lucide-react";

const FORMATS = [
  { label: "JPG", value: "image/jpeg", ext: "jpg" },
  { label: "PNG", value: "image/png", ext: "png" },
  { label: "WebP", value: "image/webp", ext: "webp" },
  { label: "GIF", value: "image/gif", ext: "gif" },
  { label: "BMP", value: "image/bmp", ext: "bmp" },
];

export default function ImageFormatConverter() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [converted, setConverted] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [targetFormat, setTargetFormat] = useState(FORMATS[0]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setConverted(null);
    }
  };

  const convertImage = () => {
    if (!selectedImage) return;
    setIsConverting(true);

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
        
        if (ctx && targetFormat.value === "image/jpeg") {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx?.drawImage(img, 0, 0);
        
        const convertedDataUrl = canvas.toDataURL(targetFormat.value, 0.9);
        setConverted(convertedDataUrl);
        setIsConverting(false);
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

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Target Format</label>
              <div className="grid grid-cols-3 gap-2">
                {FORMATS.map((format) => (
                  <button
                    key={format.value}
                    onClick={() => setTargetFormat(format)}
                    className={`h-12 rounded-xl font-bold text-sm transition-all border-2 ${targetFormat.value === format.value ? "bg-emerald-50 border-emerald-500 text-emerald-600" : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"}`}
                  >
                    {format.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={convertImage}
              disabled={!selectedImage || isConverting}
              className="w-full h-14 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:bg-gray-200 transition-all font-bold flex items-center justify-center gap-2"
            >
              {isConverting ? <Loader2 className="h-5 w-5 animate-spin" /> : <RefreshCw className="h-5 w-5" />}
              Convert Image
            </button>
          </div>

          <div className="bg-gray-50 rounded-2xl flex flex-col items-center justify-center p-8 border border-gray-100">
            {converted ? (
              <div className="w-full space-y-6 text-center">
                <img src={converted} alt="Converted" className="max-h-64 mx-auto rounded-lg shadow-sm" />
                <a 
                  href={converted} 
                  download={`converted-image.${targetFormat.ext}`}
                  className="inline-flex items-center gap-2 h-14 px-8 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
                >
                  <Download className="h-5 w-5" />
                  Download {targetFormat.label}
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
