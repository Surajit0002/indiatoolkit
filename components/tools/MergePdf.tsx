"use client";

import { useState } from "react";
import { FilePlus, Upload, ArrowRight, Loader2, Info, FileText, X, GripVertical } from "lucide-react";

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);
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

  const startMerge = () => {
    if (files.length < 2) return;
    setIsMerging(true);
    setTimeout(() => {
      setIsMerging(false);
      setIsComplete(true);
    }, 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 text-center space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <FilePlus className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold">Merge PDF</h3>
            <p className="text-gray-500 max-w-sm">Combine multiple PDF files into one single document.</p>
          </div>

          <div 
            className={`
              border-2 border-dashed rounded-2xl p-8 transition-all relative
              ${files.length > 0 ? "border-blue-200 bg-blue-50" : "border-gray-100 bg-gray-50 hover:bg-gray-100"}
            `}
          >
            <input 
              type="file" 
              accept=".pdf" 
              multiple
              onChange={handleUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="space-y-2">
              <Upload className="h-8 w-8 text-gray-300 mx-auto" />
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Click or Drag PDF Files</p>
            </div>
          </div>

          {files.length > 0 && !isComplete && (
            <div className="space-y-6 text-left">
              <div className="space-y-2 max-h-60 overflow-y-auto p-1">
                {files.map((file, index) => (
                  <div key={index} className="bg-white border border-gray-100 p-4 rounded-xl flex items-center gap-4 shadow-sm">
                    <GripVertical className="h-5 w-5 text-gray-300 cursor-move flex-shrink-0" />
                    <div className="flex items-center gap-3 flex-grow overflow-hidden">
                      <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-sm font-bold text-gray-700 truncate">{file.name}</span>
                    </div>
                    <button 
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              {files.length < 2 ? (
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-amber-700 text-xs font-bold flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Please add at least 2 files to merge.
                </div>
              ) : (
                <button
                  onClick={startMerge}
                  disabled={isMerging}
                  className="w-full h-14 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-100"
                >
                  {isMerging ? <Loader2 className="h-5 w-5 animate-spin" /> : <FilePlus className="h-5 w-5" />}
                  {isMerging ? "Merging Files..." : `Merge ${files.length} PDF Files`}
                </button>
              )}
            </div>
          )}

          {isComplete && (
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl space-y-4">
              <p className="text-emerald-800 font-bold">Merge Successful!</p>
              <div className="text-xs text-emerald-600 leading-relaxed max-w-xs mx-auto">
                Your PDF files have been combined into one single document.
              </div>
              <button className="h-12 px-8 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all">
                Download Merged PDF
              </button>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-xl flex gap-3 text-left">
            <Info className="h-5 w-5 text-gray-300 flex-shrink-0" />
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-normal">
              Note: This is a demonstration UI. In a real application, this would use a library like pdf-lib to merge the PDF files in the browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
