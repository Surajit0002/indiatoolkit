"use client";

import { useState } from "react";
import { Activity, Info } from "lucide-react";

export default function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
  } | null>(null);

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || h === 0) return;

    let bmi: number;
    if (unit === "metric") {
      // weight in kg, height in cm
      bmi = w / Math.pow(h / 100, 2);
    } else {
      // weight in lbs, height in inches
      bmi = (w / Math.pow(h, 2)) * 703;
    }

    let category = "";
    let color = "";

    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-500";
    } else if (bmi < 25) {
      category = "Normal weight";
      color = "text-green-500";
    } else if (bmi < 30) {
      category = "Overweight";
      color = "text-yellow-500";
    } else {
      category = "Obese";
      color = "text-red-500";
    }

    setResult({ bmi, category, color });
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
          <button
            onClick={() => { setUnit("metric"); setResult(null); }}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${unit === "metric" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Metric (kg/cm)
          </button>
          <button
            onClick={() => { setUnit("imperial"); setResult(null); }}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${unit === "imperial" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Imperial (lb/in)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Weight ({unit === "metric" ? "kg" : "lbs"})
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === "metric" ? "70" : "154"}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Height ({unit === "metric" ? "cm" : "in"})
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === "metric" ? "175" : "69"}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <button
            onClick={calculateBmi}
            className="w-full h-14 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100 active:scale-[0.98]"
          >
            <Activity className="h-5 w-5" />
            Calculate BMI
          </button>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-blue-400 flex-shrink-0" />
              <div className="text-xs text-gray-500 leading-relaxed">
                Body Mass Index (BMI) is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity in adults.
              </div>
            </div>
          </div>
        </div>

        {result ? (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 text-center space-y-4">
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your BMI Result</div>
            <div className={`text-6xl font-black ${result.color}`}>
              {result.bmi.toFixed(1)}
            </div>
            <div className={`text-xl font-bold ${result.color} uppercase tracking-tight`}>
              {result.category}
            </div>
            
            <div className="pt-6 grid grid-cols-4 gap-1">
              {[
                { label: "<18.5", color: "bg-blue-400" },
                { label: "18.5-25", color: "bg-green-400" },
                { label: "25-30", color: "bg-yellow-400" },
                { label: ">30", color: "bg-red-400" }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className={`h-2 rounded-full ${item.color} ${
                    (i === 0 && result.bmi < 18.5) ||
                    (i === 1 && result.bmi >= 18.5 && result.bmi < 25) ||
                    (i === 2 && result.bmi >= 25 && result.bmi < 30) ||
                    (i === 3 && result.bmi >= 30) ? "ring-2 ring-offset-2 ring-gray-400" : "opacity-30"
                  }`} />
                  <div className="text-[10px] font-bold text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[200px] rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-300 p-8 text-center">
            <Activity className="h-12 w-12 mb-4 opacity-20" />
            <p className="text-sm font-medium">Enter your details to see your BMI result and health category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
