"use client";

import { useState } from "react";
import { Stamp, Upload, Download, Loader2, Image as ImageIcon, Type } from "lucide-react";

export default function ImageWatermark() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [watermarked, setWatermarked] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [watermarkType, setWatermarkType] = useState<"text" | "image">("text");
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [watermarkPreview, setWatermarkPreview] = useState<string | null>(null);
  
  const [opacity, setOpacity] = useState(0.5);
  const [position, setPosition] = useState("center");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setWatermarked(null);
    }
  };

  const handleWatermarkImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setWatermarkImage(file);
      setWatermarkPreview(URL.createObjectURL(file));
    }
  };

  const applyWatermark = () => {
    if (!selectedImage) return;
    setIsProcessing(true);

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

        if (ctx) {
          ctx.globalAlpha = opacity;
          
          if (watermarkType === "text") {
            const fontSize = Math.floor(img.width / 10);
            ctx.font = `bold ${fontSize}px sans-serif`;
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            
            let x = canvas.width / 2;
            let y = canvas.height / 2;
            
            if (position === "bottom-right") {
              x = canvas.width - 20;
              y = canvas.height - 20;
              ctx.textAlign = "right";
              ctx.textBaseline = "bottom";
            }
            
            ctx.fillText(watermarkText, x, y);
          } else if (watermarkPreview) {
            const wmImg = new Image();
            wmImg.src = watermarkPreview;
            wmImg.onload = () => {
              const wmWidth = img.width / 4;
              const wmHeight = (wmImg.height / wmImg.width) * wmWidth;
              
              let x = (canvas.width - wmWidth) / 2;
              let y = (canvas.height - wmHeight) / 2;
              
              if (position === "bottom-right") {
                x = canvas.width - wmWidth - 20;
                y = canvas.height - wmHeight - 20;
              }
              
              ctx.drawImage(wmImg, x, y, wmWidth, wmHeight);
              setWatermarked(canvas.toDataURL(selectedImage.type));
              setIsProcessing(false);
            };
            return;
          }
        }
        
        setWatermarked(canvas.toDataURL(selectedImage.type));
        setIsProcessing(false);
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
              <div className="flex gap-2">
                <button
                  onClick={() => setWatermarkType("text")}
                  className={`flex-1 h-12 rounded-xl font-bold text-sm transition-all border-2 ${watermarkType === "text" ? "bg-indigo-50 border-indigo-500 text-indigo-600" : "bg-white border-gray-100 text-gray-400"}`}
                >
                  <Type className="h-4 w-4 inline mr-2" />
                  Text
                </button>
                <button
                  onClick={() => setWatermarkType("image")}
                  className={`flex-1 h-12 rounded-xl font-bold text-sm transition-all border-2 ${watermarkType === "image" ? "bg-indigo-50 border-indigo-500 text-indigo-600" : "bg-white border-gray-100 text-gray-400"}`}
                >
                  <ImageIcon className="h-4 w-4 inline mr-2" />
                  Image
                </button>
              </div>

              {watermarkType === "text" ? (
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="Enter watermark text"
                  className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                />
              ) : (
                <div className="relative h-12 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50 overflow-hidden">
                  {watermarkPreview ? (
                    <img src={watermarkPreview} alt="WM" className="h-full object-contain" />
                  ) : (
                    <span className="text-xs font-bold text-gray-400 uppercase">Upload Logo</span>
                  )}
                  <input type="file" accept="image/*" onChange={handleWatermarkImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Opacity</label>
                  <span className="text-indigo-600 font-black">{Math.round(opacity * 100)}%</span>
                </div>
                <input
                  type="range" min="0" max="1" step="0.1" value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <button
                onClick={applyWatermark}
                disabled={!selectedImage || isProcessing || (watermarkType === "image" && !watermarkImage)}
                className="w-full h-14 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-gray-200 transition-all font-bold flex items-center justify-center gap-2"
              >
                {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Stamp className="h-5 w-5" />}
                Apply Watermark
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl flex flex-col items-center justify-center p-8 border border-gray-100">
            {watermarked ? (
              <div className="w-full space-y-6 text-center">
                <img src={watermarked} alt="Watermarked" className="max-h-64 mx-auto rounded-lg shadow-sm" />
                <a 
                  href={watermarked} 
                  download="watermarked-image.png"
                  className="inline-flex items-center gap-2 h-14 px-8 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
                >
                  <Download className="h-5 w-5" />
                  Download
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
