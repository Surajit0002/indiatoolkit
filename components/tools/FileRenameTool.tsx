"use client";

import { useState } from "react";
import { Edit3, Plus, Trash2, Hash, Calendar, ArrowRight, Copy, Check } from "lucide-react";

export default function FileRenameTool() {
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [startingIndex, setStartingIndex] = useState(1);
  const [includeDate, setIncludeDate] = useState(false);
  const [replaceFrom, setReplaceFrom] = useState("");
  const [replaceTo, setReplaceTo] = useState("");
  
  const sampleFiles = ["photo.jpg", "document.pdf", "vacation_01.png", "report_final.docx"];
  const [copied, setCopied] = useState(false);

  const getNewName = (oldName: string, index: number) => {
    let name = oldName.split(".")[0];
    const ext = oldName.split(".")[1];
    
    if (replaceFrom) {
      name = name.replaceAll(replaceFrom, replaceTo);
    }
    
    let result = `${prefix}${name}${suffix}`;
    if (includeDate) {
      result += `_${new Date().toISOString().split("T")[0]}`;
    }
    result += `_${(startingIndex + index).toString().padStart(2, "0")}`;
    
    return `${result}.${ext}`;
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Edit3 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 uppercase tracking-tight">Batch Renamer</h3>
                <p className="text-xs text-gray-400 font-bold uppercase">Pattern Generator</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Prefix</label>
                  <input type="text" value={prefix} onChange={e => setPrefix(e.target.value)} placeholder="vlog_" className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Suffix</label>
                  <input type="text" value={suffix} onChange={e => setSuffix(e.target.value)} placeholder="_raw" className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Replace Text</label>
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="Find" value={replaceFrom} onChange={e => setReplaceFrom(e.target.value)} className="flex-1 h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm" />
                  <ArrowRight className="h-4 w-4 text-gray-300" />
                  <input type="text" placeholder="Replace" value={replaceTo} onChange={e => setReplaceTo(e.target.value)} className="flex-1 h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-bold text-gray-700">Append Date</span>
                </div>
                <input type="checkbox" checked={includeDate} onChange={e => setIncludeDate(e.target.checked)} className="h-6 w-6 rounded-lg accent-blue-600 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Preview (4 files)</label>
              <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="text-[10px] font-black uppercase text-blue-600 flex items-center gap-1">
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                Copy Pattern
              </button>
            </div>

            <div className="space-y-2">
              {sampleFiles.map((file, idx) => (
                <div key={idx} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between gap-4">
                  <span className="text-xs font-medium text-gray-400 truncate flex-1">{file}</span>
                  <ArrowRight className="h-4 w-4 text-gray-300 shrink-0" />
                  <span className="text-xs font-black text-gray-900 truncate flex-1 text-right">{getNewName(file, idx)}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl space-y-2">
              <div className="flex items-center gap-2 text-blue-600">
                <Hash className="h-4 w-4" />
                <span className="text-xs font-black uppercase">Renaming logic</span>
              </div>
              <p className="text-xs font-medium text-blue-700 leading-relaxed">
                This tool generates naming patterns. You can use these patterns with batch renaming software or command-line scripts to safely rename files on your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
