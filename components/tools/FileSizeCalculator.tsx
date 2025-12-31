"use client";

import { useState } from "react";
import { HardDrive, ArrowRightLeft, Hash } from "lucide-react";

const UNITS = [
  { label: "Bytes (B)", value: "B" },
  { label: "Kilobytes (KB)", value: "KB" },
  { label: "Megabytes (MB)", value: "MB" },
  { label: "Gigabytes (GB)", value: "GB" },
  { label: "Terabytes (TB)", value: "TB" },
];

export default function FileSizeCalculator() {
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState("GB");

  const convert = (val: number, from: string, to: string) => {
    const powers: Record<string, number> = { B: 0, KB: 1, MB: 2, GB: 3, TB: 4 };
    const bytes = val * Math.pow(1024, powers[from]);
    return bytes / Math.pow(1024, powers[to]);
  };

  const numValue = parseFloat(value) || 0;

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <HardDrive className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight">File Size Calculator</h3>
              <p className="text-xs text-gray-400 font-bold uppercase">Unit Converter</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-black text-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">From Unit</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold appearance-none"
              >
                {UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {UNITS.map((unit) => {
              const result = convert(numValue, fromUnit, unit.value);
              return (
                <div key={unit.value} className="p-6 bg-gray-50 border border-gray-100 rounded-2xl space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{unit.label}</p>
                  <p className="text-lg font-black text-gray-900 truncate">
                    {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
