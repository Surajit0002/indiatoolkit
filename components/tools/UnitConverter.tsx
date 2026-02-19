"use client";

import { useState, useEffect } from "react";
import { ArrowRightLeft, Scale, Ruler, Thermometer, RefreshCw } from "lucide-react";

type UnitType = "length" | "weight" | "temperature";

const units = {
  length: {
    meters: 1,
    kilometers: 0.001,
    centimeters: 100,
    millimeters: 1000,
    miles: 0.000621371,
    yards: 1.09361,
    feet: 3.28084,
    inches: 39.3701,
  },
  weight: {
    kilograms: 1,
    grams: 1000,
    milligrams: 1000000,
    pounds: 2.20462,
    ounces: 35.274,
  },
  temperature: {
    celsius: "C",
    fahrenheit: "F",
    kelvin: "K",
  },
};

export default function UnitConverter() {
  const [type, setType] = useState<UnitType>("length");
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("kilometers");
  const [result, setResult] = useState("0.001");

  useEffect(() => {
    convert();
  }, [value, fromUnit, toUnit, type]);

  useEffect(() => {
    const unitList = Object.keys(units[type]);
    setFromUnit(unitList[0]);
    setToUnit(unitList[1] || unitList[0]);
  }, [type]);

  const convert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResult("0");
      return;
    }

    if (type === "temperature") {
      let celsiusValue = numValue;
      if (fromUnit === "fahrenheit") celsiusValue = (numValue - 32) * 5/9;
      if (fromUnit === "kelvin") celsiusValue = numValue - 273.15;

      let finalResult = celsiusValue;
      if (toUnit === "fahrenheit") finalResult = (celsiusValue * 9/5) + 32;
      if (toUnit === "kelvin") finalResult = celsiusValue + 273.15;
      
      setResult(finalResult.toFixed(2));
    } else {
      // @ts-expect-error - Dynamic unit access
      const inBase = numValue / units[type][fromUnit];
      // @ts-expect-error - Dynamic unit access
      const finalResult = inBase * units[type][toUnit];
      setResult(finalResult.toString().includes(".") ? finalResult.toFixed(4) : finalResult.toString());
    }
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-wrap gap-2 justify-center glass-nav inline-flex mx-auto w-full max-w-sm">
        <BrutalTypeButton active={type === "length"} onClick={() => setType("length")} icon={<Ruler className="h-4 w-4" />} label="Length" />
        <BrutalTypeButton active={type === "weight"} onClick={() => setType("weight")} icon={<Scale className="h-4 w-4" />} label="Weight" />
        <BrutalTypeButton active={type === "temperature"} onClick={() => setType("temperature")} icon={<Thermometer className="h-4 w-4" />} label="Temp" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative">
        <div className="glass-card p-8 bg-white/40 space-y-6">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">From Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-transparent text-5xl font-black outline-none tabular-nums"
          />
          <div className="pt-4 border-t border-black/5">
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="brutal-input appearance-none bg-white/60"
            >
              {Object.keys(units[type]).map(unit => (
                <option key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          onClick={swapUnits}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex h-12 w-12 glass-card bg-white text-black items-center justify-center z-20 hover:rotate-180 transition-transform duration-500 border border-white/50 shadow-2xl"
        >
          <ArrowRightLeft className="h-5 w-5" />
        </button>

        <div className="glass-card p-8 bg-black text-white space-y-6">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">To (Result)</label>
          <div className="text-5xl font-black break-all tabular-nums h-[60px] flex items-center">
            {result}
          </div>
          <div className="pt-4 border-t border-white/10">
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full bg-white/10 text-white p-3 rounded-[10px] font-black appearance-none outline-none border border-white/10 focus:border-white/30 transition-all"
            >
              {Object.keys(units[type]).map(unit => (
                <option key={unit} value={unit} className="text-black">{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrutalTypeButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2 rounded-[8px] font-black text-[10px] uppercase tracking-widest transition-all ${
        active ? "bg-black text-white" : "text-gray-400 hover:text-black hover:bg-white/50"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
