"use client";

import { useState } from "react";
import { FileQuestion, Search, Info, ExternalLink } from "lucide-react";

const EXTENSIONS: Record<string, { desc: string, category: string, openWith: string }> = {
  "pdf": { desc: "Portable Document Format", category: "Document", openWith: "Adobe Acrobat, Web Browser" },
  "docx": { desc: "Microsoft Word Open XML Document", category: "Document", openWith: "Microsoft Word, Google Docs" },
  "xlsx": { desc: "Microsoft Excel Open XML Spreadsheet", category: "Spreadsheet", openWith: "Microsoft Excel, Google Sheets" },
  "jpg": { desc: "Joint Photographic Experts Group Image", category: "Image", openWith: "Photos app, Photoshop" },
  "png": { desc: "Portable Network Graphics", category: "Image", openWith: "Photos app, Photoshop" },
  "zip": { desc: "Compressed Archive File", category: "Archive", openWith: "WinZip, 7-Zip, File Explorer" },
  "json": { desc: "JavaScript Object Notation", category: "Data", openWith: "VS Code, Notepad, Browser" },
  "csv": { desc: "Comma Separated Values", category: "Data", openWith: "Excel, Notepad" },
  "svg": { desc: "Scalable Vector Graphics", category: "Image", openWith: "Web Browser, Illustrator" },
  "mp4": { desc: "MPEG-4 Video File", category: "Video", openWith: "VLC, Media Player" },
};

export default function FileExtensionFinder() {
  const [query, setQuery] = useState("");

  const ext = query.replace(".", "").toLowerCase();
  const info = EXTENSIONS[ext];

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
              <FileQuestion className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight">File Extension Finder</h3>
              <p className="text-xs text-gray-400 font-bold uppercase">Identify Unknown Files</p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-300" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter extension (e.g. .pdf, docx, .xlsx)..."
              className="w-full h-20 pl-16 pr-6 bg-gray-50 border border-gray-100 rounded-3xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 font-black text-2xl placeholder:text-gray-200"
            />
          </div>
        </div>

        {info ? (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 bg-amber-50 rounded-3xl flex items-center justify-center border border-amber-100">
                  <span className="text-3xl font-black text-amber-600">.{ext}</span>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{info.desc}</h4>
                  <p className="text-amber-600 font-bold uppercase tracking-widest text-xs mt-1">{info.category} File</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
                <p className="text-sm font-bold text-gray-700">{info.desc}</p>
              </div>
              <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recommended Software</label>
                <p className="text-sm font-bold text-gray-700">{info.openWith}</p>
              </div>
            </div>
          </div>
        ) : query && (
          <div className="bg-gray-50 rounded-3xl p-12 text-center space-y-4 border border-gray-100">
            <Info className="h-12 w-12 text-gray-300 mx-auto" />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No details found for &quot;.{ext}&quot;</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.keys(EXTENSIONS).map(e => (
            <button
              key={e}
              onClick={() => setQuery(e)}
              className="p-4 bg-white border border-gray-100 rounded-2xl font-black text-gray-400 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50 transition-all uppercase text-xs"
            >
              .{e}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
