"use client";

import { useState, useEffect } from "react";
import { Ruler, ArrowRightLeft } from "lucide-react";

const units = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
};

type UnitKey = keyof typeof units;

export default function LengthConverter() {
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<UnitKey>("m");
  const [toUnit, setToUnit] = useState<UnitKey>("ft");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult("");
      return;
    }

    const valueInMeters = val * units[fromUnit];
    const convertedValue = valueInMeters / units[toUnit];
    
    setResult(convertedValue.toLocaleString(undefined, { 
      maximumFractionDigits: 6,
      minimumFractionDigits: 0 
    }));
  }, [value, fromUnit, toUnit]);

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-8 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-emerald-100 p-2 rounded-lg">
            <Ruler className="h-5 w-5 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold">Length Converter</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full h-14 px-4 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none text-xl font-bold"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as UnitKey)}
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 outline-none font-medium bg-white"
              >
                {Object.keys(units).map((u) => (
                  <option key={u} value={u}>{u.toUpperCase()}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-center md:pt-6">
              <ArrowRightLeft className="h-6 w-6 text-gray-300" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as UnitKey)}
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 outline-none font-medium bg-white"
              >
                {Object.keys(units).map((u) => (
                  <option key={u} value={u}>{u.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {result && (
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center">
            <div className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-1">Result</div>
            <div className="text-3xl font-black text-emerald-900">
              {value} {fromUnit} = {result} {toUnit}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
