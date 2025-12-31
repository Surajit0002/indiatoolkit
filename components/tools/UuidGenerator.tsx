"use client";

import { useState } from "react";
import { ShieldCheck, Copy, Check, RefreshCw } from "lucide-react";

export default function UuidGenerator() {
  const [uuid, setUuid] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [version, setVersion] = useState<"v4">("v4");

  const generateUuid = () => {
    const newUuid = crypto.randomUUID();
    setUuid(newUuid);
  };

  const handleCopy = () => {
    if (!uuid) return;
    navigator.clipboard.writeText(uuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold">UUID Generator</h3>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setVersion("v4")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${version === "v4" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-400"}`}
            >
              Version 4
            </button>
          </div>
        </div>

        <div className="space-y-6 text-center">
          <div className="relative group">
            <div className={`
              w-full h-24 flex items-center justify-center rounded-2xl border-2 border-dashed transition-all font-mono text-xl md:text-2xl font-bold
              ${uuid ? "border-indigo-200 bg-indigo-50 text-indigo-900" : "border-gray-100 text-gray-300"}
            `}>
              {uuid || "Click generate to create UUID"}
            </div>
            {uuid && (
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white text-gray-500 rounded-lg shadow-sm border border-indigo-100 transition-all opacity-0 group-hover:opacity-100"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>
            )}
          </div>

          <button
            onClick={generateUuid}
            className="h-16 px-8 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-bold flex items-center justify-center gap-3 mx-auto shadow-lg shadow-indigo-100 active:scale-95"
          >
            <RefreshCw className="h-6 w-6" />
            Generate New UUID
          </button>
        </div>

        <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-50">
          <h4 className="text-sm font-bold text-indigo-900 mb-2 uppercase tracking-widest">About UUID v4</h4>
          <p className="text-sm text-indigo-700 leading-relaxed">
            A Version 4 UUID is a universally unique identifier that is generated using random numbers. It has a total of 128 bits and there are approximately 3.4 x 10<sup>38</sup> possible combinations.
          </p>
        </div>
      </div>
    </div>
  );
}
