"use client";

import { useState } from "react";
import { FlipHorizontal, FlipVertical, Upload, Download, Loader2, Image as ImageIcon } from "lucide-react";

export default function ImageFlipper() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [flipped, setFlipped] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setFlipped(null);
      setFlipH(false);
      setFlipV(false);
    }
  };

  const applyFlip = () => {
    if (!selectedImage) return;
    setIsFlipping(true);

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

        if (ctx) {
          ctx.translate(flipH ? img.width : 0, flipV ? img.height : 0);
          ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
          ctx.drawImage(img, 0, 0);
        }
        
        const flippedDataUrl = canvas.toDataURL(selectedImage.type);
        setFlipped(flippedDataUrl);
        setIsFlipping(false);
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
                    style={{ transform: `scale(${flipH ? -1 : 1}, ${flipV ? -1 : 1})` }}
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
                  onClick={() => setFlipH(!flipH)}
                  disabled={!selectedImage}
                  className={`flex-1 h-14 rounded-xl border-2 transition-all font-bold flex items-center justify-center gap-2 ${flipH ? "bg-pink-50 border-pink-500 text-pink-600" : "bg-white border-gray-100 text-gray-400"}`}
                >
                  <FlipHorizontal className="h-5 w-5" />
                  Flip Horizontal
                </button>
                <button
                  onClick={() => setFlipV(!flipV)}
                  disabled={!selectedImage}
                  className={`flex-1 h-14 rounded-xl border-2 transition-all font-bold flex items-center justify-center gap-2 ${flipV ? "bg-pink-50 border-pink-500 text-pink-600" : "bg-white border-gray-100 text-gray-400"}`}
                >
                  <FlipVertical className="h-5 w-5" />
                  Flip Vertical
                </button>
              </div>

              <button
                onClick={applyFlip}
                disabled={!selectedImage || isFlipping}
                className="w-full h-14 bg-pink-600 text-white rounded-xl hover:bg-pink-700 disabled:bg-gray-200 transition-all font-bold flex items-center justify-center gap-2"
              >
                {isFlipping ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImageIcon className="h-5 w-5" />}
                Apply Flip & Save
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl flex flex-col items-center justify-center p-8 border border-gray-100">
            {flipped ? (
              <div className="w-full space-y-6 text-center">
                <img src={flipped} alt="Flipped" className="max-h-64 mx-auto rounded-lg shadow-sm" />
                <a 
                  href={flipped} 
                  download={`flipped-image.${selectedImage?.type.split("/")[1] || "png"}`}
                  className="inline-flex items-center gap-2 h-14 px-8 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
                >
                  <Download className="h-5 w-5" />
                  Download Flipped
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
