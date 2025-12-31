"use client";

import { useState } from "react";
import * as diff from "diff";
import { ArrowLeftRight, Trash2 } from "lucide-react";

export default function DiffChecker() {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [diffType, setDiffType] = useState<"chars" | "lines" | "words">("lines");

  const getDiff = () => {
    switch (diffType) {
      case "chars": return diff.diffChars(oldText, newText);
      case "words": return diff.diffWords(oldText, newText);
      default: return diff.diffLines(oldText, newText);
    }
  };

  const diffResult = getDiff();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="brutal-card p-4">
          <label className="block text-xs font-black uppercase tracking-widest mb-2">Original Text</label>
          <textarea
            value={oldText}
            onChange={(e) => setOldText(e.target.value)}
            placeholder="Paste original text here..."
            className="brutal-input min-h-[200px] resize-none text-sm font-mono"
          />
        </div>
        <div className="brutal-card p-4">
          <label className="block text-xs font-black uppercase tracking-widest mb-2">New Text</label>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Paste modified text here..."
            className="brutal-input min-h-[200px] resize-none text-sm font-mono"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <button 
          onClick={() => setDiffType("lines")} 
          className={`brutal-btn text-xs ${diffType === "lines" ? "bg-blue-600" : ""}`}
        >
          Lines
        </button>
        <button 
          onClick={() => setDiffType("words")} 
          className={`brutal-btn text-xs ${diffType === "words" ? "bg-blue-600" : ""}`}
        >
          Words
        </button>
        <button 
          onClick={() => setDiffType("chars")} 
          className={`brutal-btn text-xs ${diffType === "chars" ? "bg-blue-600" : ""}`}
        >
          Characters
        </button>
        <button 
          onClick={() => { setOldText(""); setNewText(""); }} 
          className="brutal-btn text-xs bg-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="brutal-card p-6 min-h-[300px] bg-white">
        <label className="block text-xs font-black uppercase tracking-widest mb-4">Difference Result</label>
        <div className="font-mono text-sm whitespace-pre-wrap overflow-auto max-h-[600px] p-4 bg-gray-50 border-2 border-black rounded-[8px]">
          {diffResult.map((part, index) => (
            <span
              key={index}
              className={`${
                part.added ? "bg-green-200 text-green-900 border-b-2 border-green-400" :
                part.removed ? "bg-red-200 text-red-900 line-through border-b-2 border-red-400" :
                "text-gray-600"
              }`}
            >
              {part.value}
            </span>
          ))}
          {oldText === "" && newText === "" && (
            <div className="text-gray-400 italic">No text to compare...</div>
          )}
        </div>
      </div>
    </div>
  );
}
