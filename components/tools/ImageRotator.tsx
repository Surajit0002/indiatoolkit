"use client";

import { useState } from "react";
import { RotateCw, Upload, Download, Loader2, Image as ImageIcon, RotateCcw } from "lucide-react";

export default function ImageRotator() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [rotated, setRotated] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setRotated(null);
      setRotation(0);
    }
  };

  const handleRotate = (dir: "cw" | "ccw") => {
    setRotation(prev => {
      const next = dir === "cw" ? prev + 90 : prev - 90;
      return next % 360;
    });
  };

  const applyRotation = () => {
    if (!selectedImage) return;
    setIsRotating(true);

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        const radians = (rotation * Math.PI) / 180;
        const width = Math.abs(Math.cos(radians) * img.width) + Math.abs(Math.sin(radians) * img.height);
        const height = Math.abs(Math.sin(radians) * img.width) + Math.abs(Math.cos(radians) * img.height);

        canvas.width = width;
        canvas.height = height;

        if (ctx) {
          ctx.translate(width / 2, height / 2);
          ctx.rotate(radians);
          ctx.drawImage(img, -img.width / 2, -img.height / 2);
        }
        
        const rotatedDataUrl = canvas.toDataURL(selectedImage.type);
        setRotated(rotatedDataUrl);
        setIsRotating(false);
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
                <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    src={preview} 
                    alt="Original" 
                    className="max-w-full max-h-full transition-transform duration-300"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  />
                </div>
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
              <div className="flex gap-4">
                <button
                  onClick={() => handleRotate("ccw")}
                  disabled={!selectedImage}
                  className="flex-1 h-14 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 disabled:opacity-50 transition-all font-bold flex items-center justify-center gap-2"
                >
                  <RotateCcw className="h-5 w-5" />
                  -90°
                </button>
                <button
                  onClick={() => handleRotate("cw")}
                  disabled={!selectedImage}
                  className="flex-1 h-14 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 disabled:opacity-50 transition-all font-bold flex items-center justify-center gap-2"
                >
                  <RotateCw className="h-5 w-5" />
                  +90°
                </button>
              </div>

              <button
                onClick={applyRotation}
                disabled={!selectedImage || isRotating}
                className="w-full h-14 bg-orange-600 text-white rounded-xl hover:bg-orange-700 disabled:bg-gray-200 transition-all font-bold flex items-center justify-center gap-2"
              >
                {isRotating ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImageIcon className="h-5 w-5" />}
                Apply Rotation & Save
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl flex flex-col items-center justify-center p-8 border border-gray-100">
            {rotated ? (
              <div className="w-full space-y-6 text-center">
                <img src={rotated} alt="Rotated" className="max-h-64 mx-auto rounded-lg shadow-sm" />
                <a 
                  href={rotated} 
                  download={`rotated-image.${selectedImage?.type.split("/")[1] || "png"}`}
                  className="inline-flex items-center gap-2 h-14 px-8 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
                >
                  <Download className="h-5 w-5" />
                  Download Rotated
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
