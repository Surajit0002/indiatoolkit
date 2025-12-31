"use client";

import { useState } from "react";
import { Lock, Copy, Check, Hash } from "lucide-react";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState<"SHA-256" | "SHA-1" | "MD5">("SHA-256");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  // MD5 Implementation (simplified for client-side use)
  const md5 = (string: string) => {
    function k(n: number, s: number) { return (n << s) | (n >>> (32 - s)); }
    function add(x: number, y: number) {
      const l = (x & 0xffff) + (y & 0xffff);
      const m = (x >> 16) + (y >> 16) + (l >> 16);
      return (m << 16) | (l & 0xffff);
    }
    const r = [
      7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
      5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
      4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
      6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
    ];
    const c = [
      0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
      0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
      0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
      0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
      0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
      0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
      0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
      0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
    ];
    const x: number[] = [];
    const s = unescape(encodeURIComponent(string));
    for (let i = 0; i < s.length; i++) x[i >> 2] |= s.charCodeAt(i) << ((i % 4) * 8);
    let a = 0x67452301, b = 0xefcdab89, d = 0x98badcfe, e = 0x10325476;
    for (let i = 0; i < s.length * 8; i += 512) {
      const olda = a, oldb = b, oldd = d, olde = e;
      for (let j = 0; j < 64; j++) {
        let f, g;
        if (j < 16) { f = (b & d) | (~b & e); g = j; }
        else if (j < 32) { f = (e & b) | (~e & d); g = (5 * j + 1) % 16; }
        else if (j < 48) { f = b ^ d ^ e; g = (3 * j + 5) % 16; }
        else { f = d ^ (b | ~e); g = (7 * j) % 16; }
        const t = add(add(a, f), add(c[j], x[(i >> 5) + g]));
        a = e; e = d; d = b; b = add(b, k(t, r[j]));
      }
      a = add(a, olda); b = add(b, oldb); d = add(d, oldd); e = add(e, olde);
    }
    const hex = (n: number) => ("0000000" + (n >>> 0).toString(16)).slice(-8);
    const res = hex(a) + hex(b) + hex(d) + hex(e);
    return res.match(/../g)!.map(x => x[1] + x[0]).join("");
  };

  const generateHash = async () => {
    if (!input) {
      setHash("");
      return;
    }

    if (algorithm === "MD5") {
      setHash(md5(input));
    } else {
      const msgUint8 = new TextEncoder().encode(input);
      const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
      setHash(hashHex);
    }
  };

  const handleCopy = () => {
    if (!hash) return;
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-8 space-y-8">
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-2 rounded-lg">
            <Hash className="h-5 w-5 text-slate-600" />
          </div>
          <h3 className="text-xl font-bold">Hash Generator</h3>
        </div>

        <div className="space-y-6">
          <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
            {(["SHA-256", "SHA-1", "MD5"] as const).map((algo) => (
              <button
                key={algo}
                onClick={() => setAlgorithm(algo)}
                className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${algorithm === algo ? "bg-white text-slate-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
              >
                {algo}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Input Text</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash..."
              className="w-full h-32 p-4 rounded-xl border-2 border-gray-100 focus:border-slate-500 outline-none font-medium resize-none"
            />
          </div>

          <button
            onClick={generateHash}
            className="w-full h-14 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-all font-bold flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Lock className="h-5 w-5" />
            Generate Hash
          </button>

          {hash && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Resulting Hash</label>
              <div className="relative group">
                <div className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-mono text-sm break-all pr-12 text-slate-700 font-bold">
                  {hash}
                </div>
                <button
                  onClick={handleCopy}
                  className="absolute top-1/2 -translate-y-1/2 right-2 p-2 hover:bg-slate-200 text-slate-500 rounded-lg transition-all"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
