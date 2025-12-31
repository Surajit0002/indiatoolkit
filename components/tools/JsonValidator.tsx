"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Copy, Check, Code } from "lucide-react";

export default function JsonValidator() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<{
    type: "success" | "error" | "idle";
    message: string;
  }>({ type: "idle", message: "" });
  const [copied, setCopied] = useState(false);

  const validateJson = () => {
    if (!input.trim()) {
      setStatus({ type: "idle", message: "" });
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setInput(formatted);
      setStatus({ type: "success", message: "Valid JSON" });
    } catch (e: any) {
      setStatus({ type: "error", message: e.message });
    }
  };

  const handleCopy = () => {
    if (!input) return;
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setStatus({ type: "idle", message: "" });
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-[700px]">
        <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Code className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold">JSON Validator</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleClear}
              className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest"
            >
              Clear
            </button>
            <button
              onClick={handleCopy}
              className="p-2 text-gray-400 hover:text-gray-600 transition-all"
            >
              {copied ? <Check className="h-5 w-5 text-emerald-500" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="w-full h-full p-8 outline-none resize-none font-mono text-sm text-gray-700 bg-white"
            spellCheck={false}
          />
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            {status.type === "success" && (
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-wide">{status.message}</span>
              </div>
            )}
            {status.type === "error" && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-xl border border-red-100">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-wide line-clamp-1">{status.message}</span>
              </div>
            )}
          </div>
          
          <button
            onClick={validateJson}
            className="w-full md:w-auto px-10 h-14 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
          >
            Validate & Format
          </button>
        </div>
      </div>
    </div>
  );
}
