"use client";

import { useState } from "react";
import { Fingerprint, Upload, Copy, Check, Loader2, FileText } from "lucide-react";

export default function FileHashGenerator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hashes, setHashes] = useState<{ sha256: string, sha1: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsProcessing(true);
      
      const buffer = await file.arrayBuffer();
      
      const hashBuffer256 = await crypto.subtle.digest("SHA-256", buffer);
      const hashArray256 = Array.from(new Uint8Array(hashBuffer256));
      const hashHex256 = hashArray256.map(b => b.toString(16).padStart(2, "0")).join("");
      
      const hashBuffer1 = await crypto.subtle.digest("SHA-1", buffer);
      const hashArray1 = Array.from(new Uint8Array(hashBuffer1));
      const hashHex1 = hashArray1.map(b => b.toString(16).padStart(2, "0")).join("");
      
      setHashes({ sha256: hashHex256, sha1: hashHex1 });
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
              <Fingerprint className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight">File Hash Generator</h3>
              <p className="text-xs text-gray-400 font-bold uppercase">Cryptographic Integrity</p>
            </div>
          </div>

          <div 
            className="border-2 border-dashed border-gray-200 rounded-2xl h-48 flex flex-col items-center justify-center relative overflow-hidden bg-gray-50"
            onDragOver={(e) => e.preventDefault()}
          >
            {selectedFile ? (
              <div className="text-center">
                <FileText className="h-10 w-10 text-indigo-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-700">{selectedFile.name}</p>
                <p className="text-xs text-gray-400">{(selectedFile.size / 1024).toFixed(2)} KB</p>
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-gray-400 font-bold uppercase">Upload File to Hash</p>
              </>
            )}
            <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>

          {isProcessing && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
            </div>
          )}

          {hashes && !isProcessing && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">SHA-256</label>
                  <button onClick={() => copyToClipboard(hashes.sha256, "sha256")} className="text-xs font-bold text-indigo-600 uppercase hover:underline flex items-center gap-1">
                    {copied === "sha256" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied === "sha256" ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl font-mono text-xs break-all text-gray-700">
                  {hashes.sha256}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">SHA-1</label>
                  <button onClick={() => copyToClipboard(hashes.sha1, "sha1")} className="text-xs font-bold text-indigo-600 uppercase hover:underline flex items-center gap-1">
                    {copied === "sha1" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied === "sha1" ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl font-mono text-xs break-all text-gray-700">
                  {hashes.sha1}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
