"use client";

import { useState } from "react";
import { Copy, Trash2, Code2, Check, Braces } from "lucide-react";

export default function HtmlFormatter() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const formatHtml = () => {
    let formatted = '';
    let indent = '';
    const tab = '  ';
    
    // Basic regex-based formatter for simple HTML
    input.split(/>\s*</).forEach(function(element) {
        if (element.match( /^\/\w/ )) {
            indent = indent.substring(tab.length);
        }
        formatted += indent + '<' + element + '>\r\n';
        if (element.match( /^<?\w[^>]*[^\/]$/ ) && !element.startsWith("input") && !element.startsWith("img") && !element.startsWith("br") && !element.startsWith("hr")) {
            indent += tab;
        }
    });
    
    setInput(formatted.substring(1, formatted.length - 3));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={formatHtml}
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg transition-all flex items-center gap-2"
        >
          <Braces className="h-4 w-4" /> Prettify HTML
        </button>
        <button 
          onClick={handleCopy}
          className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2"
        >
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          Copy Code
        </button>
        <button 
          onClick={() => setInput("")}
          className="px-6 py-3 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="relative group">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your messy HTML here..."
          className="w-full h-[500px] p-8 rounded-[2.5rem] border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-blue-600 outline-none transition-all font-mono text-sm leading-relaxed resize-none"
          spellCheck={false}
        />
        <div className="absolute top-6 right-8 opacity-10 group-focus-within:opacity-100 transition-opacity pointer-events-none">
          <Code2 className="h-12 w-12 text-blue-600" />
        </div>
      </div>
    </div>
  );
}
