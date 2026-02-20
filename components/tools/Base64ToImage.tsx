"use client";

import { useState } from "react";
import {  Download, Image as ImageIcon } from "lucide-react";

export default function Base64ToImage() {
  const [base64, setBase64] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleConvert = (val: string) => {
    setBase64(val);
    if (val.startsWith("data:image/")) {
      setPreview(val);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Base64 String</label>
            <textarea
              value={base64}
              onChange={(e) => handleConvert(e.target.value)}
              placeholder="Paste your Base64 string here (starting with data:image/...)"
              className="w-full h-80 p-4 bg-gray-50 border border-gray-100 rounded-2xl font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-gray-50 rounded-2xl flex flex-col items-center justify-center p-8 border border-gray-100">
            {preview ? (
              <div className="w-full space-y-6 text-center">
                <img src={preview} alt="Decoded" className="max-h-64 mx-auto rounded-lg shadow-sm" />
                <a 
                  href={preview} 
                  download="decoded-image.png"
                  className="inline-flex items-center gap-2 h-14 px-8 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
                >
                  <Download className="h-5 w-5" />
                  Download Image
                </a>
              </div>
            ) : (
              <div className="text-center space-y-4 opacity-30">
                <ImageIcon className="h-16 w-16 mx-auto text-gray-300" />
                <p className="text-sm font-bold uppercase text-gray-400">Image Preview</p>
                <p className="text-xs text-gray-400 max-w-200px mx-auto">Paste a valid Base64 data URL to see the preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
