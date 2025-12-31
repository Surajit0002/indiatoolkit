"use client";

import { useState, useRef } from "react";
import { QrCode, Upload, Search, Copy, Check, X, Camera } from "lucide-react";

export default function QrReader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const decodeQr = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://api.qrserver.com/v1/read-qr-code/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (data && data[0] && data[0].symbol[0].data) {
        setResult(data[0].symbol[0].data);
      } else {
        setError("Could not find a valid QR code in this image.");
      }
    } catch (err) {
      setError("Failed to process image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass-card p-8 border-dashed border-2 flex flex-col items-center justify-center text-center">
            {preview ? (
              <div className="relative w-full aspect-square max-w-[300px] mb-6 rounded-[10px] overflow-hidden group">
                <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                <button 
                    onClick={() => {setFile(null); setPreview(null); setResult(null);}}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer space-y-4 py-12"
              >
                <div className="mx-auto h-20 w-20 bg-blue-600/10 text-blue-600 rounded-full flex items-center justify-center">
                  <Upload className="h-10 w-10" />
                </div>
                <div>
                  <p className="text-lg font-black tracking-tight">Upload QR Code Image</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">PNG, JPG or WebP up to 5MB</p>
                </div>
              </div>
            )}
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={decodeQr}
              disabled={!file || isLoading}
              className="brutal-btn w-full bg-blue-600 disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  SCANNING...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" /> DECODE QR CODE
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 h-full flex flex-col">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Scan Result</label>
            
            {result ? (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 p-6 bg-gray-50 rounded-[10px] border-2 border-transparent font-bold text-lg break-all">
                  {result}
                </div>
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 brutal-btn flex items-center justify-center gap-2"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "COPIED!" : "COPY RESULT"}
                  </button>
                  {result.startsWith('http') && (
                      <a 
                        href={result} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="brutal-btn bg-green-600 flex items-center justify-center p-3"
                      >
                          <Search className="h-5 w-5" />
                      </a>
                  )}
                </div>
              </div>
            ) : error ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-16 w-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
                  <X className="h-8 w-8" />
                </div>
                <p className="text-red-500 font-black uppercase tracking-widest text-xs">{error}</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-300 space-y-4">
                <QrCode className="h-24 w-24 opacity-20" />
                <p className="font-black uppercase tracking-[0.2em] text-xs">Waiting for scan...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
