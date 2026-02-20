"use client";

import { useState } from "react";
import { FileSpreadsheet, AlertCircle, RefreshCw } from "lucide-react";

export default function JsonToCsv() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const convertToCsv = () => {
    try {
      if (!jsonInput.trim()) return;
      const data = JSON.parse(jsonInput);
      
      const array = Array.isArray(data) ? data : [data];
      if (array.length === 0) throw new Error("Empty array");

      const headers = Object.keys(array[0]);
      const csvRows = [
        headers.join(","),
        ...array.map(row => 
          headers.map(header => {
            const val = row[header];
            return typeof val === "string" ? `"${val.replace(/"/g, '""')}"` : val;
          }).join(",")
        )
      ];

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setError(null);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Invalid JSON format");
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="space-y-4">
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">JSON Input (Array of Objects)</label>
        <div className="relative group">
          <textarea
            value={jsonInput}
            onChange={(e) => {
              setJsonInput(e.target.value);
              if (error) setError(null);
            }}
            placeholder='[{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"}]'
            className="w-full h-80 p-6 rounded-[2rem] border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-600 outline-none transition-all font-mono text-sm leading-relaxed resize-none"
            spellCheck={false}
          />
          <div className="absolute top-4 right-4 opacity-10 group-focus-within:opacity-100 transition-opacity">
            <FileSpreadsheet className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-sm font-bold animate-shake">
          <AlertCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={convertToCsv}
          className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="h-5 w-5" />
          Convert & Download CSV
        </button>
        <button
          onClick={() => setJsonInput("")}
          className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all"
        >
          Clear
        </button>
      </div>

      <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100">
        <h5 className="text-amber-900 font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" /> Usage Note
        </h5>
        <p className="text-sm text-amber-700 font-medium leading-relaxed">
          Ensure your JSON is an array of flat objects (no deep nesting) for the best results in CSV format.
        </p>
      </div>
    </div>
  );
}
