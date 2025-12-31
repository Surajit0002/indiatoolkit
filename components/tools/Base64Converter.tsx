"use client";

import { useState } from "react";
import { Copy, Trash2, ArrowRightLeft, Check } from "lucide-react";

export default function Base64Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    try {
      if (!input.trim()) return;
      if (mode === "encode") {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
      setError(null);
    } catch (e: any) {
      setError(mode === "decode" ? "Invalid Base64 string" : e.message);
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMode = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput("");
    setError(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex justify-center">
        <button 
          onClick={toggleMode}
          className="flex items-center gap-4 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all shadow-md group"
        >
          <span className={mode === "encode" ? "font-extrabold" : "opacity-50"}>Encode</span>
          <ArrowRightLeft className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
          <span className={mode === "decode" ? "font-extrabold" : "opacity-50"}>Decode</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Type text to encode..." : "Paste Base64 to decode..."}
            className="w-full h-48 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-gray-50"
          />
          <button
            onClick={handleProcess}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
          >
            {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
          </button>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Output Results</label>
          <div className="relative">
            <textarea
              value={output}
              readOnly
              placeholder="Result will appear here..."
              className="w-full h-48 p-4 rounded-xl border border-gray-200 bg-white outline-none resize-none font-mono text-sm"
            />
            {output && (
              <button
                onClick={handleCopy}
                className="absolute bottom-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 flex items-center gap-2 text-xs font-bold"
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                {copied ? "COPIED" : "COPY"}
              </button>
            )}
          </div>
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
