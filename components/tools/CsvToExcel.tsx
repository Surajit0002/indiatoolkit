"use client";

import { useState } from "react";
import { FileSpreadsheet, Upload, Download, Loader2, FileText } from "lucide-react";

export default function CsvToExcel() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [converted, setConverted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith(".csv")) {
      setSelectedFile(file);
      setConverted(false);
    }
  };

  const convertFile = () => {
    if (!selectedFile) return;
    setIsConverting(true);
    
    // In a real app, we'd use 'xlsx' library here.
    // For this demo, we simulate the conversion process.
    setTimeout(() => {
      setIsConverting(false);
      setConverted(true);
    }, 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div 
              className="border-2 border-dashed border-gray-200 rounded-2xl h-64 flex flex-col items-center justify-center relative overflow-hidden bg-gray-50"
              onDragOver={(e) => e.preventDefault()}
            >
              {selectedFile ? (
                <div className="text-center space-y-2">
                  <FileText className="h-12 w-12 text-blue-500 mx-auto" />
                  <p className="text-sm font-bold text-gray-700">{selectedFile.name}</p>
                  <p className="text-xs text-gray-400">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 text-gray-300 mb-2" />
                  <p className="text-sm text-gray-400 font-bold uppercase">Upload CSV File</p>
                </>
              )}
              <input 
                type="file" 
                accept=".csv" 
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            <button
              onClick={convertFile}
              disabled={!selectedFile || isConverting}
              className="w-full h-14 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:bg-gray-200 transition-all font-bold flex items-center justify-center gap-2"
            >
              {isConverting ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileSpreadsheet className="h-5 w-5" />}
              Convert to Excel
            </button>
          </div>

          <div className="bg-gray-50 rounded-2xl flex flex-col items-center justify-center p-8 border border-gray-100 text-center">
            {converted ? (
              <div className="space-y-6">
                <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto">
                  <FileSpreadsheet className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 uppercase tracking-tight">Conversion Complete</h3>
                  <p className="text-sm text-gray-500 mt-1">Your Excel file is ready for download.</p>
                </div>
                <button
                  className="inline-flex items-center gap-2 h-14 px-8 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
                >
                  <Download className="h-5 w-5" />
                  Download .xlsx
                </button>
              </div>
            ) : (
              <div className="opacity-30 space-y-4">
                <FileSpreadsheet className="h-16 w-16 mx-auto text-gray-300" />
                <p className="text-sm font-bold uppercase text-gray-400">Excel Preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
