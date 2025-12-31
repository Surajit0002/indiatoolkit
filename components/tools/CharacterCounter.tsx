"use client";

import { useState } from "react";
import { Type, Hash, AlignLeft, Info } from "lucide-react";

export default function CharacterCounter() {
  const [text, setText] = useState("");

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    words: text.trim() === "" ? 0 : text.trim().split(/\s+/).length,
    sentences: text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length,
    paragraphs: text.trim() === "" ? 0 : text.split(/\n+/).filter(Boolean).length,
    lines: text.trim() === "" ? 0 : text.split("\n").length,
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full h-64 p-8 outline-none resize-none text-lg text-gray-700 placeholder-gray-300 font-medium"
        />
        
        <div className="bg-gray-50 border-t border-gray-100 p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center space-y-1">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Characters</div>
            <div className="text-xl font-black text-blue-600">{stats.characters}</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No Spaces</div>
            <div className="text-xl font-black text-blue-600">{stats.charactersNoSpaces}</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Words</div>
            <div className="text-xl font-black text-gray-800">{stats.words}</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sentences</div>
            <div className="text-xl font-black text-gray-800">{stats.sentences}</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Paragraphs</div>
            <div className="text-xl font-black text-gray-800">{stats.paragraphs}</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lines</div>
            <div className="text-xl font-black text-gray-800">{stats.lines}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center gap-4">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Type className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">Reading Time</div>
            <div className="text-lg font-black text-blue-900">~{Math.ceil(stats.words / 200)} min</div>
          </div>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center gap-4">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <AlignLeft className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Speaking Time</div>
            <div className="text-lg font-black text-emerald-900">~{Math.ceil(stats.words / 130)} min</div>
          </div>
        </div>
        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 flex items-center gap-4">
          <div className="bg-purple-600 p-2 rounded-lg">
            <Hash className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-purple-400 uppercase tracking-widest">Density</div>
            <div className="text-lg font-black text-purple-900">High Efficiency</div>
          </div>
        </div>
      </div>
    </div>
  );
}
