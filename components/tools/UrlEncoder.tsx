"use client";

import { useState } from "react";
import { Copy, Trash2, Globe, Check, ArrowRightLeft } from "lucide-react";

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const process = () => {
    try {
      if (mode === "encode") {
        setInput(encodeURIComponent(input));
      } else {
        setInput(decodeURIComponent(input));
      }
    } catch (_e) {  
      alert("Invalid URL component for decoding");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1.5 rounded-[2rem] flex gap-1">
          <button 
            onClick={() => setMode("encode")}
            className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${mode === "encode" ? "bg-white text-blue-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
          >
            Encode
          </button>
          <button 
            onClick={() => setMode("decode")}
            className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${mode === "decode" ? "bg-white text-blue-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="relative group">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encode" ? "Enter text to encode..." : "Enter URL to decode..."}
          className="w-full h-64 p-8 rounded-[2.5rem] border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-blue-600 outline-none transition-all font-mono text-lg leading-relaxed resize-none text-center"
          spellCheck={false}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] group-focus-within:opacity-[0.05] transition-opacity pointer-events-none">
          <Globe className="h-48 w-48 text-gray-900" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={process}
          className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-3"
        >
          <ArrowRightLeft className="h-5 w-5" />
          {mode === "encode" ? "Encode URL" : "Decode URL"}
        </button>
        <button
          onClick={handleCopy}
          className="px-8 py-5 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3"
        >
          {copied ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
          Copy
        </button>
        <button
          onClick={() => setInput("")}
          className="px-8 py-5 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
