"use client";

import { useState } from "react";
import { Upload, Copy, Check } from "lucide-react";

export default function CsvToJson() {
  const [csvData, setCsvData] = useState("");
  const [jsonData, setJsonData] = useState("");
  const [copied, setCopied] = useState(false);

  const convertToJson = (text: string) => {
    setCsvData(text);
    if (!text.trim()) {
      setJsonData("");
      return;
    }

    try {
      const rows = text.trim().split("\n");
      if (rows.length < 2) return;
      
      const headers = rows[0].split(",");
      const result = rows.slice(1).map(row => {
        const values = row.split(",");
        const obj: Record<string, string> = {};
        headers.forEach((header, i) => {
          obj[header.trim()] = values[i]?.trim();
        });
        return obj;
      });
      
      setJsonData(JSON.stringify(result, null, 2));
    } catch {
      setJsonData("Error: Invalid CSV format");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        convertToJson(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">CSV Input</label>
            <div className="relative">
              <button className="text-[10px] font-black uppercase text-blue-600 flex items-center gap-1">
                <Upload className="h-3 w-3" />
                Upload File
              </button>
              <input type="file" accept=".csv" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>
          <textarea
            value={csvData}
            onChange={(e) => convertToJson(e.target.value)}
            placeholder="name,age,city&#10;John,30,New York&#10;Jane,25,London"
            className="w-full h-96 p-6 bg-gray-50 border border-gray-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
          />
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">JSON Output</label>
            <button
              onClick={() => {
                navigator.clipboard.writeText(jsonData);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-1"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy JSON"}
            </button>
          </div>
          <div className="w-full h-96 p-6 bg-gray-900 border border-gray-800 rounded-3xl overflow-auto custom-scrollbar">
            <pre className="text-emerald-400 font-mono text-sm">
              {jsonData || "// JSON output will appear here..."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
