"use client";

import { useState } from "react";
import { Table, Upload, Search, FileText, ChevronLeft, ChevronRight } from "lucide-react";

export default function CsvViewer() {
  const [data, setData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const rows = text.split("\n").map(row => row.split(","));
        if (rows.length > 0) {
          setHeaders(rows[0]);
          setData(rows.slice(1).filter(row => row.length === rows[0].length));
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredData = data.filter(row => 
    row.some(cell => cell.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Table className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 uppercase tracking-tight">CSV Viewer</h3>
                <p className="text-xs text-gray-400 font-bold uppercase">{fileName || "No file selected"}</p>
              </div>
            </div>

            <div className="flex w-full md:w-auto gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search table..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 h-12 pl-10 pr-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
              <div className="relative">
                <button className="h-12 px-6 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all">
                  <Upload className="h-4 w-4" />
                  Upload
                </button>
                <input type="file" accept=".csv" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {data.length > 0 ? (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-bottom border-gray-100">
                    {headers.map((header, idx) => (
                      <th key={idx} className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(0, 50).map((row, rowIdx) => (
                    <tr key={rowIdx} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-6 py-4 text-sm font-medium text-gray-700">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredData.length > 50 && (
              <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase">Showing first 50 rows of {filteredData.length}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 py-32 text-center space-y-4">
            <div className="h-16 w-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto text-gray-300">
              <FileText className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900 uppercase tracking-tight">No CSV Data Loaded</p>
              <p className="text-xs text-gray-400 mt-1">Upload a CSV file to view its content here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
