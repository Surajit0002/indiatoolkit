"use client";

import { useState, useEffect, useCallback } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import { Download, Share2, QrCode } from "lucide-react";

export default function QrGenerator() {
  const [text, setText] = useState("https://omnitools.example.com");
  const [qrImageUrl, setQrImageUrl] = useState("");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  
  const generateQrCode = useCallback(async () => {
    try {
      const url = await QRCode.toDataURL(text, {
        width: 1000,
        margin: 2,
        errorCorrectionLevel: errorLevel,
        color: {
          dark: color,
          light: bgColor,
        },
      });
      setQrImageUrl(url);
    } catch (err) {
      console.error(err);
    }
  }, [text, color, bgColor, errorLevel]);

  useEffect(() => {
    generateQrCode();
  }, [generateQrCode]);

  const downloadQrCode = () => {
    const link = document.createElement("a");
    link.href = qrImageUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 p-2 sm:p-0">
      {/* Stack on mobile, side by side on desktop */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Input Section - First on mobile */}
        <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
          <div className="brutal-card p-4 sm:p-6">
            <label className="block text-[10px] sm:text-xs font-black uppercase tracking-widest mb-2">Content to Encode</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL or text..."
              className="brutal-input min-h-[80px] sm:min-h-[100px] md:min-h-[120px] resize-none text-sm sm:text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="brutal-card p-3 sm:p-4">
              <label className="block text-[9px] sm:text-xs font-black uppercase tracking-widest mb-2 text-center">QR Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-10 sm:h-12 bg-transparent cursor-pointer border-2 border-black rounded-lg sm:rounded-[8px] touch-target"
              />
            </div>
            <div className="brutal-card p-3 sm:p-4">
              <label className="block text-[9px] sm:text-xs font-black uppercase tracking-widest mb-2 text-center">Background</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-10 sm:h-12 bg-transparent cursor-pointer border-2 border-black rounded-lg sm:rounded-[8px] touch-target"
              />
            </div>
          </div>

          <div className="brutal-card p-3 sm:p-4">
            <label className="block text-[9px] sm:text-xs font-black uppercase tracking-widest mb-2 sm:mb-3">Error Correction</label>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {(["L", "M", "Q", "H"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setErrorLevel(level)}
                  className={`py-2 sm:py-2.5 text-[10px] sm:text-xs font-black rounded sm:rounded-[4px] border-2 border-black transition-all touch-target ${
                    errorLevel === level ? "bg-black text-white" : "bg-white text-black"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* QR Display Section - First on mobile, second on desktop */}
        <div className="flex flex-col items-center justify-center brutal-card p-4 sm:p-6 md:p-8 bg-white order-1 lg:order-2">
          <div className="relative group mb-4 sm:mb-6 md:mb-8">
            <div className="absolute -inset-1 sm:-inset-2 bg-black rounded-lg sm:rounded-[12px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
            {qrImageUrl ? (
              <Image 
                src={qrImageUrl} 
                alt="QR Code" 
                className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 border-2 sm:border-4 border-black rounded-lg sm:rounded-[8px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              />
            ) : (
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 flex items-center justify-center border-2 sm:border-4 border-dashed border-black rounded-lg sm:rounded-[8px]">
                <QrCode className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 animate-pulse" />
              </div>
            )}
          </div>

          <div className="w-full space-y-2 sm:space-y-3">
            <button
              onClick={downloadQrCode}
              disabled={!qrImageUrl}
              className="w-full brutal-btn flex items-center justify-center gap-2 text-sm sm:text-base touch-target"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5" />
              DOWNLOAD PNG
            </button>
            <button className="w-full brutal-btn bg-white text-black flex items-center justify-center gap-2 text-sm sm:text-base touch-target">
              <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
              SHARE LINK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
