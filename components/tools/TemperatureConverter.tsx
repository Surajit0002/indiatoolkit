"use client";

import { useState } from "react";
import { Thermometer, ArrowRightLeft } from "lucide-react";

type Unit = "C" | "F" | "K";

export default function TemperatureConverter() {
  const [value, setValue] = useState<string>("0");
  const [fromUnit, setFromUnit] = useState<Unit>("C");
  const [toUnit, setToUnit] = useState<Unit>("F");

  // Compute result directly
  const computeResult = (): string => {
    const val = parseFloat(value);
    if (isNaN(val)) return "";

    let celsius: number;
    if (fromUnit === "C") celsius = val;
    else if (fromUnit === "F") celsius = (val - 32) * (5 / 9);
    else celsius = val - 273.15;

    let final: number;
    if (toUnit === "C") final = celsius;
    else if (toUnit === "F") final = (celsius * (9 / 5)) + 32;
    else final = celsius + 273.15;

    return final.toFixed(2);
  };

  const result = computeResult();

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-8 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 p-2 rounded-lg">
            <Thermometer className="h-5 w-5 text-red-600" />
          </div>
          <h3 className="text-xl font-bold">Temperature Converter</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Temperature</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full h-14 px-4 rounded-xl border-2 border-gray-100 focus:border-red-500 outline-none text-xl font-bold"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as Unit)}
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 outline-none font-medium bg-white"
              >
                <option value="C">Celsius (°C)</option>
                <option value="F">Fahrenheit (°F)</option>
                <option value="K">Kelvin (K)</option>
              </select>
            </div>
            <div className="flex justify-center md:pt-6">
              <ArrowRightLeft className="h-6 w-6 text-gray-300" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as Unit)}
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 outline-none font-medium bg-white"
              >
                <option value="C">Celsius (°C)</option>
                <option value="F">Fahrenheit (°F)</option>
                <option value="K">Kelvin (K)</option>
              </select>
            </div>
          </div>
        </div>

        {result && (
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-center">
            <div className="text-sm font-bold text-red-600 uppercase tracking-widest mb-1">Result</div>
            <div className="text-3xl font-black text-red-900">
              {value}°{fromUnit} = {result}°{toUnit}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
