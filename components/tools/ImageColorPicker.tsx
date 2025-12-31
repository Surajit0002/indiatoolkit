"use client";

import { useState, useRef } from "react";
import { Pipette, Upload, Copy, Check, Image as ImageIcon } from "lucide-react";

export default function ImageColorPicker() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState({ hex: "#FFFFFF", rgb: "rgb(255, 255, 255)", hsl: "hsl(0, 0%, 100%)" });
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setPickedColor({ hex: "#FFFFFF", rgb: "rgb(255, 255, 255)", hsl: "hsl(0, 0%, 100%)" });
    }
  };

  const pickColor = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imgRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const img = imgRef.current;
    
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx?.drawImage(img, 0, 0);

    const rect = img.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * img.naturalWidth);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * img.naturalHeight);

    const pixel = ctx?.getImageData(x, y, 1, 1).data;
    if (pixel) {
      const r = pixel[0];
      const g = pixel[1];
      const b = pixel[2];
      
      const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
      const rgb = `rgb(${r}, ${g}, ${b})`;
      
      // Simple HSL conversion
      const r_norm = r / 255, g_norm = g / 255, b_norm = b / 255;
      const max = Math.max(r_norm, g_norm, b_norm), min = Math.min(r_norm, g_norm, b_norm);
      let h = 0, s, l = (max + min) / 2;
      if (max === min) h = s = 0;
      else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r_norm: h = (g_norm - b_norm) / d + (g_norm < b_norm ? 6 : 0); break;
          case g_norm: h = (b_norm - r_norm) / d + 2; break;
          case b_norm: h = (r_norm - g_norm) / d + 4; break;
        }
        h /= 6;
      }
      const hsl = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

      setPickedColor({ hex, rgb, hsl });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div 
              className="border-2 border-dashed border-gray-200 rounded-2xl h-80 flex flex-col items-center justify-center relative overflow-hidden bg-gray-50"
              onDragOver={(e) => e.preventDefault()}
            >
              {preview ? (
                <img 
                  ref={imgRef}
                  src={preview} 
                  alt="Picker" 
                  className="w-full h-full object-contain cursor-crosshair"
                  onClick={pickColor}
                />
              ) : (
                <>
                  <Upload className="h-10 w-10 text-gray-300 mb-2" />
                  <p className="text-sm text-gray-400 font-bold uppercase">Upload Image to Pick Color</p>
                </>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            
            <p className="text-xs text-center text-gray-400 font-medium">Click on the image to pick a color</p>
          </div>

          <div className="space-y-6">
            <div 
              className="w-full h-32 rounded-2xl shadow-inner border border-gray-100 flex items-center justify-center transition-colors duration-300"
              style={{ backgroundColor: pickedColor.hex }}
            >
              <span className={`font-black text-2xl drop-shadow-sm ${parseInt(pickedColor.hex.slice(1), 16) > 0xFFFFFF / 2 ? "text-black" : "text-white"}`}>
                {pickedColor.hex}
              </span>
            </div>

            <div className="space-y-4">
              {[
                { label: "HEX", value: pickedColor.hex },
                { label: "RGB", value: pickedColor.rgb },
                { label: "HSL", value: pickedColor.hsl }
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={item.value}
                      className="flex-1 h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl font-mono text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(item.value)}
                      className="h-12 w-12 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-black transition-all"
                    >
                      {copied ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
