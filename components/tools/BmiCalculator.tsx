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
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8">
      {/* Unit Toggle - Full width on mobile */}
      <div className="flex justify-center mb-2 sm:mb-4">
        <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50 w-full sm:w-auto">
          <button
            onClick={() => { setUnit("metric"); setResult(null); }}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-bold transition-all touch-target ${unit === "metric" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Metric (kg/cm)
          </button>
          <button
            onClick={() => { setUnit("imperial"); setResult(null); }}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-bold transition-all touch-target ${unit === "imperial" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Imperial (lb/in)
          </button>
        </div>
      </div>

      {/* Stack on mobile, side by side on desktop */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start">
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 sm:mb-2">
                Weight ({unit === "metric" ? "kg" : "lbs"})
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === "metric" ? "70" : "154"}
                className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 sm:mb-2">
                Height ({unit === "metric" ? "cm" : "in"})
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === "metric" ? "175" : "69"}
                className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              />
            </div>
          </div>
          <button
            onClick={calculateBmi}
            className="w-full h-12 sm:h-14 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100 active:scale-[0.98] text-sm sm:text-base touch-target"
          >
            <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
            Calculate BMI
          </button>

          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-100">
            <div className="flex gap-2 sm:gap-3">
              <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
                Body Mass Index (BMI) is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity in adults.
              </div>
            </div>
          </div>
        </div>

        {result ? (
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-lg sm:shadow-xl shadow-gray-100/50 text-center space-y-3 sm:space-y-4">
            <div className="text-[10px] sm:text-sm font-bold text-gray-400 uppercase tracking-widest">Your BMI Result</div>
            <div className={`text-4xl sm:text-5xl md:text-6xl font-black ${result.color}`}>
              {result.bmi.toFixed(1)}
            </div>
            <div className={`text-base sm:text-lg md:text-xl font-bold ${result.color} uppercase tracking-tight`}>
              {result.category}
            </div>
            
            <div className="pt-4 sm:pt-6 grid grid-cols-4 gap-1 sm:gap-1.5">
              {[
                { label: "<18.5", color: "bg-blue-400" },
                { label: "18.5-25", color: "bg-green-400" },
                { label: "25-30", color: "bg-yellow-400" },
                { label: ">30", color: "bg-red-400" }
              ].map((item, i) => (
                <div key={i} className="space-y-1 sm:space-y-2">
                  <div className={`h-1.5 sm:h-2 rounded-full ${item.color} ${
                    (i === 0 && result.bmi < 18.5) ||
                    (i === 1 && result.bmi >= 18.5 && result.bmi < 25) ||
                    (i === 2 && result.bmi >= 25 && result.bmi < 30) ||
                    (i === 3 && result.bmi >= 30) ? "ring-2 ring-offset-2 ring-gray-400" : "opacity-30"
                  }`} />
                  <div className="text-[8px] sm:text-[10px] font-bold text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[150px] sm:min-h-[200px] rounded-2xl sm:rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-300 p-4 sm:p-8 text-center">
            <Activity className="h-8 w-8 sm:h-10 md:h-12 sm:w-10 md:w-12 mb-2 sm:mb-4 opacity-20" />
            <p className="text-xs sm:text-sm font-medium">Enter your details to see your BMI result and health category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
