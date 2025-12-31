"use client";

import { useState } from "react";
import { FileUp, Upload, ArrowRight, Loader2, Info, Image as ImageIcon, FileText, X } from "lucide-react";

export default function JpgToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length > 0) {
      setFiles(prev => [...prev, ...selected]);
      setIsComplete(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startConversion = () => {
    if (files.length === 0) return;
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
            <div className="bg-orange-100 p-4 rounded-full">
              <FileUp className="h-10 w-10 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold">JPG to PDF Converter</h3>
            <p className="text-gray-500 max-w-sm">Convert your images into a single professional PDF document.</p>
          </div>

          <div 
            className={`
              border-2 border-dashed rounded-2xl p-8 transition-all relative
              ${files.length > 0 ? "border-orange-200 bg-orange-50" : "border-gray-100 bg-gray-50 hover:bg-gray-100"}
            `}
          >
            <input 
              type="file" 
              accept="image/*" 
              multiple
              onChange={handleUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="space-y-2">
              <Upload className="h-8 w-8 text-gray-300 mx-auto" />
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Click or Drag Images</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-normal">Supports JPG, PNG, BMP</p>
            </div>
          </div>

          {files.length > 0 && !isComplete && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto p-2">
                {files.map((file, index) => (
                  <div key={index} className="bg-white border border-gray-100 p-3 rounded-xl flex items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <ImageIcon className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span className="text-xs font-bold text-gray-700 truncate">{file.name}</span>
                    </div>
                    <button 
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={startConversion}
                disabled={isConverting}
                className="w-full h-14 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all font-bold flex items-center justify-center gap-3 shadow-lg shadow-orange-100"
              >
                {isConverting ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileText className="h-5 w-5" />}
                {isConverting ? "Creating PDF..." : `Create PDF (${files.length} images)`}
              </button>
            </div>
          )}

          {isComplete && (
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl space-y-4">
              <p className="text-emerald-800 font-bold">PDF Created Successfully!</p>
              <div className="text-xs text-emerald-600 leading-relaxed max-w-xs mx-auto">
                All {files.length} images have been combined into a single PDF document.
              </div>
              <button className="h-12 px-8 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all">
                Download PDF
              </button>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-xl flex gap-3 text-left">
            <Info className="h-5 w-5 text-gray-300 flex-shrink-0" />
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-normal">
              Note: This is a demonstration UI. In a real application, this would use a library like jsPDF to create the PDF document in the browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
