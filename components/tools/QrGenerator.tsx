"use client";

import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import { Download, Share2, Link as LinkIcon, Type, FileText, QrCode, RefreshCw } from "lucide-react";

export default function QrGenerator() {
  const [text, setText] = useState("https://omnitools.example.com");
  const [qrImageUrl, setQrImageUrl] = useState("");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  
  useEffect(() => {
    generateQrCode();
  }, [text, color, bgColor, errorLevel]);

  const generateQrCode = async () => {
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
  };

  const downloadQrCode = () => {
    const link = document.createElement("a");
    link.href = qrImageUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="brutal-card p-6">
            <label className="block text-xs font-black uppercase tracking-widest mb-2">Content to Encode</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL or text..."
              className="brutal-input min-h-[120px] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="brutal-card p-4">
              <label className="block text-xs font-black uppercase tracking-widest mb-2 text-center">QR Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-12 bg-transparent cursor-pointer border-2 border-black rounded-[8px]"
              />
            </div>
            <div className="brutal-card p-4">
              <label className="block text-xs font-black uppercase tracking-widest mb-2 text-center">Background</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-12 bg-transparent cursor-pointer border-2 border-black rounded-[8px]"
              />
            </div>
          </div>

          <div className="brutal-card p-4">
            <label className="block text-xs font-black uppercase tracking-widest mb-3">Error Correction</label>
            <div className="grid grid-cols-4 gap-2">
              {["L", "M", "Q", "H"].map((level) => (
                <button
                  key={level}
                  onClick={() => setErrorLevel(level as any)}
                  className={`py-2 text-xs font-black rounded-[4px] border-2 border-black transition-all ${
                    errorLevel === level ? "bg-black text-white" : "bg-white text-black"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center brutal-card p-8 bg-white">
          <div className="relative group mb-8">
            <div className="absolute -inset-2 bg-black rounded-[12px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
            {qrImageUrl ? (
              <img 
                src={qrImageUrl} 
                alt="QR Code" 
                className="relative w-64 h-64 md:w-80 md:h-80 border-4 border-black rounded-[8px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              />
            ) : (
              <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center border-4 border-dashed border-black rounded-[8px]">
                <QrCode className="h-32 w-32 animate-pulse" />
              </div>
            )}
          </div>

          <div className="w-full space-y-3">
            <button
              onClick={downloadQrCode}
              disabled={!qrImageUrl}
              className="w-full brutal-btn flex items-center justify-center gap-2"
            >
              <Download className="h-5 w-5" />
              DOWNLOAD PNG
            </button>
            <button className="w-full brutal-btn bg-white text-black flex items-center justify-center gap-2">
              <Share2 className="h-5 w-5" />
              SHARE LINK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
