"use client";

import { useState } from "react";
import { Scissors, Upload, Loader2, Info, FileText } from "lucide-react";

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [splitMode, setSplitMode] = useState<"range" | "all">("range");
  const [ranges, setRanges] = useState("1-2, 4-5");
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
            <div className="bg-purple-100 p-4 rounded-full">
              <Scissors className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold">Split PDF</h3>
            <p className="text-gray-500 max-w-sm">Extract specific pages or split a PDF into multiple documents.</p>
          </div>

          <div 
            className={`
              border-2 border-dashed rounded-2xl p-12 transition-all relative
              ${file ? "border-purple-200 bg-purple-50" : "border-gray-100 bg-gray-50 hover:bg-gray-100"}
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
                <FileText className="h-6 w-6 text-purple-500" />
                <span className="font-bold text-purple-900 truncate max-w-xs">{file.name}</span>
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
              <div className="flex gap-4">
                <button
                  onClick={() => setSplitMode("range")}
                  className={`flex-1 h-12 rounded-xl font-bold border-2 transition-all ${
                    splitMode === "range" 
                      ? "border-purple-600 bg-purple-50 text-purple-600" 
                      : "border-gray-100 text-gray-400 hover:border-gray-200"
                  }`}
                >
                  Custom Ranges
                </button>
                <button
                  onClick={() => setSplitMode("all")}
                  className={`flex-1 h-12 rounded-xl font-bold border-2 transition-all ${
                    splitMode === "all" 
                      ? "border-purple-600 bg-purple-50 text-purple-600" 
                      : "border-gray-100 text-gray-400 hover:border-gray-200"
                  }`}
                >
                  Split All Pages
                </button>
              </div>

              {splitMode === "range" && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Page Ranges</label>
                  <input 
                    type="text"
                    value={ranges}
                    onChange={(e) => setRanges(e.target.value)}
                    placeholder="e.g. 1-3, 5, 7-10"
                    className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                  <p className="text-[10px] text-gray-400 font-medium">Use commas to separate multiple ranges or pages.</p>
                </div>
              )}

              <button
                onClick={startProcessing}
                disabled={isProcessing}
                className="w-full h-14 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-bold flex items-center justify-center gap-3 shadow-lg shadow-purple-100"
              >
                {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Scissors className="h-5 w-5" />}
                {isProcessing ? "Splitting PDF..." : "Split PDF"}
              </button>
            </div>
          )}

          {isComplete && (
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl space-y-4">
              <p className="text-emerald-800 font-bold">Split Successful!</p>
              <div className="text-xs text-emerald-600 leading-relaxed max-w-xs mx-auto">
                Your PDF has been split according to your requirements.
              </div>
              <button className="h-12 px-8 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all">
                Download ZIP
              </button>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-xl flex gap-3 text-left">
            <Info className="h-5 w-5 text-gray-300 flex-shrink-0" />
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-normal">
              Note: This is a demonstration UI. In a real application, this would use a library like pdf-lib to extract pages and create new PDF files in the browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
