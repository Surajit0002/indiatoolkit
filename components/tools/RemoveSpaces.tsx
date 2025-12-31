"use client";

import { useState } from "react";
import { Eraser, Copy, Check } from "lucide-react";

export default function RemoveSpaces() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const cleanText = () => {
    // Remove extra spaces (double spaces, leading/trailing)
    // Keep single spaces between words
    const cleaned = text.replace(/\s+/g, " ").trim();
    setText(cleaned);
  };

  const removeAllSpaces = () => {
    const cleaned = text.replace(/\s+/g, "");
    setText(cleaned);
  };

  const removeLineBreaks = () => {
    const cleaned = text.replace(/[\r\n]+/g, " ");
    setText(cleaned);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="relative bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text with extra spaces or line breaks..."
          className="w-full h-80 p-8 outline-none resize-none text-lg text-gray-700 placeholder-gray-300 font-mono"
        />
        <button
          onClick={handleCopy}
          className="absolute top-6 right-6 p-3 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-xl transition-all border border-gray-100 active:scale-95"
          title="Copy to Clipboard"
        >
          {copied ? <Check className="h-5 w-5 text-emerald-500" /> : <Copy className="h-5 w-5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={cleanText}
          className="h-14 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
        >
          <Eraser className="h-5 w-5" />
          Clean Extra Spaces
        </button>
        <button
          onClick={removeLineBreaks}
          className="h-14 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"
        >
          Remove Line Breaks
        </button>
        <button
          onClick={removeAllSpaces}
          className="h-14 bg-gray-800 text-white rounded-2xl hover:bg-gray-900 transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
        >
          Remove All Spaces
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex items-start gap-4">
        <div className="bg-amber-100 p-2 rounded-lg">
          <Check className="h-5 w-5 text-amber-600" />
        </div>
        <div className="text-sm text-amber-800 leading-relaxed font-medium">
          <strong>Tip:</strong> "Clean Extra Spaces" will trim the text and replace multiple spaces with a single space, making it perfect for formatting copied text from PDFs or poorly formatted documents.
        </div>
      </div>
    </div>
  );
}
