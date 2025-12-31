"use client";

import { useState, useEffect } from "react";
import { DollarSign, Calendar, Percent, PieChart } from "lucide-react";

export default function EmiCalculator() {
  const [amount, setAmount] = useState<string>("1000000");
  const [interest, setInterest] = useState<string>("8.5");
  const [tenure, setTenure] = useState<string>("20");
  const [tenureType, setTenureType] = useState<"years" | "months">("years");
  
  const [result, setResult] = useState<{
    emi: number;
    totalInterest: number;
    totalPayment: number;
  } | null>(null);

  useEffect(() => {
    calculateEmi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, interest, tenure, tenureType]);

  const calculateEmi = () => {
    const p = parseFloat(amount);
    const r = parseFloat(interest) / (12 * 100);
    const n = tenureType === "years" ? parseFloat(tenure) * 12 : parseFloat(tenure);

    if (isNaN(p) || isNaN(r) || isNaN(n) || n === 0) return;

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    setResult({ emi, totalInterest, totalPayment });
  };

  return (
    <div className="p-6 md:p-8 space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loan Amount</label>
                <div className="text-blue-600 font-black">₹ {parseFloat(amount || "0").toLocaleString()}</div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg"
                />
              </div>
              <input
                type="range"
                min="100000"
                max="100000000"
                step="100000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full mt-4 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Interest Rate (%)</label>
                <div className="text-blue-600 font-black">{interest}%</div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Percent className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  type="number"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg"
                />
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="0.1"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full mt-4 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loan Tenure</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTenureType("years")}
                    className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-tighter transition-all ${tenureType === "years" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"}`}
                  >
                    Years
                  </button>
                  <button
                    onClick={() => setTenureType("months")}
                    className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-tighter transition-all ${tenureType === "months" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"}`}
                  >
                    Months
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg"
                />
              </div>
              <input
                type="range"
                min="1"
                max={tenureType === "years" ? "30" : "360"}
                step="1"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="w-full mt-4 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {result && (
            <>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5 space-y-8">
                <div className="text-center space-y-2">
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Monthly EMI</div>
                  <div className="text-5xl font-black text-blue-600 tracking-tighter">
                    ₹ {Math.round(result.emi).toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-8">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Interest</div>
                    <div className="text-lg font-bold text-gray-700">₹ {Math.round(result.totalInterest).toLocaleString()}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Amount</div>
                    <div className="text-lg font-bold text-gray-700">₹ {Math.round(result.totalPayment).toLocaleString()}</div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <PieChart className="h-4 w-4 text-gray-400" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Breakup of Total Payment</span>
                  </div>
                  <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex">
                    <div 
                      className="h-full bg-blue-600" 
                      style={{ width: `${(parseFloat(amount) / result.totalPayment) * 100}%` }}
                    />
                    <div 
                      className="h-full bg-blue-300" 
                      style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase">Principal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-300" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase">Interest</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
