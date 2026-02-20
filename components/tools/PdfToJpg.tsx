"use client";

import { useState } from "react";
import { FileDown, Upload, Loader2, Info, FileText, Image as ImageIcon } from "lucide-react";

export default function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setIsComplete(false);
    }
  };

  const startConversion = () => {
    if (!file) return;
    setIsConverting(true);
    setTimeout(() => {
      setIsConverting(false);
      setIsComplete(true);
    }, 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 text-center space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-red-100 p-4 rounded-full">
              <FileDown className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold">PDF to JPG Converter</h3>
            <p className="text-gray-500 max-w-sm">Convert each PDF page into a high-quality JPG image.</p>
          </div>

          <div 
            className={`
              border-2 border-dashed rounded-2xl p-12 transition-all relative
              ${file ? "border-red-200 bg-red-50" : "border-gray-100 bg-gray-50 hover:bg-gray-100"}
            `}
          >
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <FileText className="h-6 w-6 text-red-500" />
                <span className="font-bold text-red-900 truncate max-w-xs">{file.name}</span>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-8 w-8 text-gray-300 mx-auto" />
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Click or Drag PDF</p>
              </div>
            )}
          </div>

          {file && !isComplete && (
            <button
              onClick={startConversion}
              disabled={isConverting}
              className="w-full h-14 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-bold flex items-center justify-center gap-3 shadow-lg shadow-red-100"
            >
              {isConverting ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImageIcon className="h-5 w-5" />}
              {isConverting ? "Extracting Images..." : "Convert to JPG"}
            </button>
          )}

          {isComplete && (
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl space-y-4">
              <p className="text-emerald-800 font-bold">Conversion Successful!</p>
              <div className="text-xs text-emerald-600 leading-relaxed max-w-xs mx-auto">
                All pages have been converted to high-quality JPG images.
              </div>
              <button className="h-12 px-8 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all">
                Download ZIP
              </button>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-xl flex gap-3 text-left">
            <Info className="h-5 w-5 text-gray-300 flex-shrink-0" />
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-normal">
              Note: This is a demonstration UI. In a real application, this would use a library like PDF.js to render pages to images in the browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
