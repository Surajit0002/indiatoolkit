"use client";

import { useState } from "react";
import { TrendingUp, DollarSign, Calendar } from "lucide-react";

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("5000");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");
  
  const [result, setResult] = useState<{
    investedAmount: number;
    estReturns: number;
    totalValue: number;
  } | null>(null);

  const calculateSip = () => {
    const P = parseFloat(monthlyInvestment);
    const i = parseFloat(expectedReturn) / 100 / 12;
    const n = parseFloat(timePeriod) * 12;

    if (isNaN(P) || isNaN(i) || isNaN(n) || n === 0) return;

    // Formula: FV = P × ({[1 + i]^n – 1} / i) × (1 + i)
    const totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const investedAmount = P * n;
    const estReturns = totalValue - investedAmount;

    setResult({ investedAmount, estReturns, totalValue });
  };

  return (
    <div className="p-6 md:p-8 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Monthly Investment</label>
                <div className="text-emerald-600 font-black">₹ {parseFloat(monthlyInvestment || "0").toLocaleString()}</div>
              </div>
              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(e.target.value)}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Expected Return Rate (p.a)</label>
                <div className="text-emerald-600 font-black">{expectedReturn}%</div>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Time Period (Years)</label>
                <div className="text-emerald-600 font-black">{timePeriod} Yr</div>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          </div>
          
          <button
            onClick={calculateSip}
            className="w-full h-14 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"
          >
            <TrendingUp className="h-5 w-5" />
            Calculate Potential Growth
          </button>
        </div>

        <div className="space-y-6">
          {result && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-200 p-2 rounded-lg"><DollarSign className="h-4 w-4 text-gray-500" /></div>
                    <span className="text-sm font-bold text-gray-500">Invested Amount</span>
                  </div>
                  <span className="text-lg font-black text-gray-700">₹ {Math.round(result.investedAmount).toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-200 p-2 rounded-lg"><TrendingUp className="h-4 w-4 text-emerald-600" /></div>
                    <span className="text-sm font-bold text-emerald-600">Est. Returns</span>
                  </div>
                  <span className="text-lg font-black text-emerald-600">₹ {Math.round(result.estReturns).toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-6 bg-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg"><Calendar className="h-4 w-4 text-white" /></div>
                    <span className="text-sm font-bold opacity-90">Total Value</span>
                  </div>
                  <span className="text-2xl font-black">₹ {Math.round(result.totalValue).toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-gray-300" 
                    style={{ width: `${(result.investedAmount / result.totalValue) * 100}%` }}
                  />
                  <div 
                    className="h-full bg-emerald-500" 
                    style={{ width: `${(result.estReturns / result.totalValue) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-300" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Invested</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Returns</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
