"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
  "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
  "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
  "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
  "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3);
  const [type, setType] = useState("paragraphs"); // paragraphs, words
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generateText = () => {
    let output = "";
    if (type === "paragraphs") {
      for (let i = 0; i < paragraphs; i++) {
        let p = "";
        const sentenceCount = Math.floor(Math.random() * 4) + 4;
        for (let s = 0; s < sentenceCount; s++) {
          const wordCount = Math.floor(Math.random() * 10) + 8;
          const sentence = [];
          for (let w = 0; w < wordCount; w++) {
            sentence.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
          }
          const sentenceStr = sentence.join(" ");
          p += sentenceStr.charAt(0).toUpperCase() + sentenceStr.slice(1) + ". ";
        }
        output += p + "\n\n";
      }
    } else {
      const words = [];
      for (let i = 0; i < paragraphs; i++) {
        words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
      }
      output = words.join(" ");
    }
    setResult(output.trim());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate initial text
  useState(() => {
    generateText();
  });

  return (
    <div className="space-y-6">
      <div className="brutal-card p-6">
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-black uppercase tracking-widest mb-2">Count</label>
            <input
              type="number"
              value={paragraphs}
              onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
              className="brutal-input"
              min="1"
              max="100"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-black uppercase tracking-widest mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="brutal-input appearance-none"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="words">Words</option>
            </select>
          </div>
        </div>

        <button onClick={generateText} className="w-full brutal-btn mb-4">
          GENERATE TEXT
        </button>

        <label className="block text-xs font-black uppercase tracking-widest mb-2">Generated Result</label>
        <textarea
          value={result}
          readOnly
          className="brutal-input min-h-[300px] bg-gray-50 resize-none font-medium text-sm"
        />
      </div>

      <button
        onClick={handleCopy}
        className="w-full brutal-btn flex items-center justify-center gap-2"
        disabled={!result}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            COPIED
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            COPY TO CLIPBOARD
          </>
        )}
      </button>
    </div>
  );
}
