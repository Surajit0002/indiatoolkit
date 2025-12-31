"use client";

import { useState } from "react";
import { Copy, Trash2, Code, Braces, Minimize2, Check } from "lucide-react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formatJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setError(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
  };

  const handleClear = () => {
    setInput("");
    setError(null);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-wrap gap-2 mb-2">
        <button onClick={formatJson} className="brutal-btn flex-1 md:flex-none text-xs flex items-center justify-center gap-2">
          <Braces className="h-4 w-4" /> PRETTIFY
        </button>
        <button onClick={minifyJson} className="brutal-btn bg-black/10 text-black border-none flex-1 md:flex-none text-xs flex items-center justify-center gap-2">
          <Minimize2 className="h-4 w-4" /> MINIFY
        </button>
        <div className="md:ml-auto flex gap-2 w-full md:w-auto">
          <button onClick={handleCopy} className="brutal-btn flex-1 md:flex-none text-xs flex items-center justify-center gap-2">
            {success ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />} COPY
          </button>
          <button onClick={handleClear} className="brutal-btn bg-red-500/10 text-red-600 border-none text-xs flex items-center justify-center gap-2">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {error && (
        <div className="glass-card p-4 bg-red-500/10 text-red-600 text-[10px] font-black uppercase tracking-widest border border-red-500/20">
          Syntax Error: {error}
        </div>
      )}

      <div className="glass-card bg-white/40 overflow-hidden group">
        <div className="px-4 py-2 border-b border-black/5 bg-white/20 flex items-center gap-2">
          <Code className="h-3 w-3 text-gray-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">JSON Editor</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Paste your JSON object here..."
          className="w-full h-[500px] p-6 bg-transparent outline-none resize-none font-mono text-sm leading-relaxed font-bold"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
