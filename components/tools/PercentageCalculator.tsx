"use client";

import { useState } from "react";
import { Calculator, Percent } from "lucide-react";

export default function PercentageCalculator() {
  // Simple Percentage: What is X% of Y?
  const [percOf_X, setPercOf_X] = useState("");
  const [percOf_Y, setPercOf_Y] = useState("");
  const [percOf_Result, setPercOf_Result] = useState<number | null>(null);

  // Percentage Of: X is what % of Y?
  const [isWhatPerc_X, setIsWhatPerc_X] = useState("");
  const [isWhatPerc_Y, setIsWhatPerc_Y] = useState("");
  const [isWhatPerc_Result, setIsWhatPerc_Result] = useState<number | null>(null);

  const calculatePercOf = () => {
    const x = parseFloat(percOf_X);
    const y = parseFloat(percOf_Y);
    if (!isNaN(x) && !isNaN(y)) {
      setPercOf_Result((x / 100) * y);
    }
  };

  const calculateIsWhatPerc = () => {
    const x = parseFloat(isWhatPerc_X);
    const y = parseFloat(isWhatPerc_Y);
    if (!isNaN(x) && !isNaN(y) && y !== 0) {
      setIsWhatPerc_Result((x / y) * 100);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-12">
      {/* What is X% of Y? */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Percent className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold">What is X% of Y?</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Percentage (X)</label>
            <input
              type="number"
              value={percOf_X}
              onChange={(e) => setPercOf_X(e.target.value)}
              placeholder="e.g. 20"
              className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Of Value (Y)</label>
            <input
              type="number"
              value={percOf_Y}
              onChange={(e) => setPercOf_Y(e.target.value)}
              placeholder="e.g. 500"
              className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            onClick={calculatePercOf}
            className="h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold"
          >
            Calculate
          </button>
          <div className="h-12 flex items-center px-4 bg-gray-50 border border-gray-100 rounded-lg">
            <span className="text-gray-500 mr-2 font-medium">Result:</span>
            <span className="text-xl font-bold text-blue-600">{percOf_Result !== null ? percOf_Result.toLocaleString() : "-"}</span>
          </div>
        </div>
      </section>

      {/* X is what % of Y? */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-green-100 p-2 rounded-lg">
            <Calculator className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="text-xl font-bold">X is what % of Y?</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Value (X)</label>
            <input
              type="number"
              value={isWhatPerc_X}
              onChange={(e) => setIsWhatPerc_X(e.target.value)}
              placeholder="e.g. 50"
              className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Value (Y)</label>
            <input
              type="number"
              value={isWhatPerc_Y}
              onChange={(e) => setIsWhatPerc_Y(e.target.value)}
              placeholder="e.g. 200"
              className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <button
            onClick={calculateIsWhatPerc}
            className="h-12 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold"
          >
            Calculate
          </button>
          <div className="h-12 flex items-center px-4 bg-gray-50 border border-gray-100 rounded-lg">
            <span className="text-gray-500 mr-2 font-medium">Result:</span>
            <span className="text-xl font-bold text-green-600">{isWhatPerc_Result !== null ? `${isWhatPerc_Result.toFixed(2)}%` : "-"}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
