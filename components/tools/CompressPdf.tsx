"use client";

import { useState } from "react";
import { FileArchive, Upload, ArrowRight, Loader2, Info, FileText } from "lucide-react";

export default function CompressPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<"low" | "medium" | "high">("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setIsComplete(false);
    }
  };

  const startProcessing = () => {
    if (!file) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 text-center space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-emerald-100 p-4 rounded-full">
              <FileArchive className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold">Compress PDF</h3>
            <p className="text-gray-500 max-w-sm">Reduce PDF file size while maintaining optimal quality.</p>
          </div>

          <div 
            className={`
              border-2 border-dashed rounded-2xl p-12 transition-all relative
              ${file ? "border-emerald-200 bg-emerald-50" : "border-gray-100 bg-gray-50 hover:bg-gray-100"}
            `}
          >
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {file ? (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-3">
                  <FileText className="h-6 w-6 text-emerald-500" />
                  <span className="font-bold text-emerald-900 truncate max-w-xs">{file.name}</span>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full uppercase tracking-wider">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-8 w-8 text-gray-300 mx-auto" />
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Click or Drag PDF</p>
              </div>
            )}
          </div>

          {file && !isComplete && (
            <div className="space-y-6 text-left">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Compression Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "low", label: "Basic", desc: "High Quality" },
                    { id: "medium", label: "Strong", desc: "Balanced" },
                    { id: "high", label: "Extreme", desc: "Low Quality" }
                  ].map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setCompressionLevel(level.id as any)}
                      className={`p-3 rounded-xl border-2 transition-all text-center ${
                        compressionLevel === level.id 
                          ? "border-emerald-600 bg-emerald-50 text-emerald-600" 
                          : "border-gray-100 text-gray-400 hover:border-gray-200"
                      }`}
                    >
                      <p className="font-bold text-sm">{level.label}</p>
                      <p className="text-[10px] uppercase font-bold tracking-tighter opacity-70">{level.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startProcessing}
                disabled={isProcessing}
                className="w-full h-14 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-bold flex items-center justify-center gap-3 shadow-lg shadow-emerald-100"
              >
                {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileArchive className="h-5 w-5" />}
                {isProcessing ? "Compressing..." : "Compress PDF"}
              </button>
            </div>
          )}

          {isComplete && (
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl space-y-4">
              <p className="text-emerald-800 font-bold">Compression Complete!</p>
              <div className="flex justify-center gap-8 text-center">
                <div className="space-y-1">
                  <p className="text-[10px] text-emerald-600 uppercase font-black">Original</p>
                  <p className="text-lg font-bold text-gray-400 line-through">{(file!.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-emerald-600 uppercase font-black">Compressed</p>
                  <p className="text-lg font-bold text-emerald-800">{(file!.size * 0.4 / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              <button className="h-12 px-8 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all">
                Download PDF
              </button>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-xl flex gap-3 text-left">
            <Info className="h-5 w-5 text-gray-300 flex-shrink-0" />
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-normal">
              Note: This is a demonstration UI. In a real application, this would use a library like Ghostscript (server-side) or a specialized WASM module to optimize PDF structure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
