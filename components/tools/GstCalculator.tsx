"use client";

import { useState, useMemo } from "react";
import { Receipt, Plus, Minus, Calculator, PieChart as PieIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function GstCalculator() {
  const [amount, setAmount] = useState("1000");
  const [gstRate, setGstRate] = useState("18");
  const [type, setType] = useState<"inclusive" | "exclusive">("exclusive");
  
  const result = useMemo(() => {
    const val = parseFloat(amount);
    const rate = parseFloat(gstRate);

    if (isNaN(val) || isNaN(rate)) return null;

    let netAmount: number;
    let gstAmount: number;
    let totalAmount: number;

    if (type === "exclusive") {
      netAmount = val;
      gstAmount = (val * rate) / 100;
      totalAmount = val + gstAmount;
    } else {
      totalAmount = val;
      netAmount = (val * 100) / (100 + rate);
      gstAmount = totalAmount - netAmount;
    }

    return { netAmount, gstAmount, totalAmount };
  }, [amount, gstRate, type]);

  const pieData = useMemo(() => {
    if (!result) return [];
    return [
      { name: "Net Amount", value: result.netAmount, color: "#94a3b8" },
      { name: "GST Amount", value: result.gstAmount, color: "#3b82f6" },
    ];
  }, [result]);

  const rates = ["5", "12", "18", "28"];

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Receipt className="h-6 w-6" />
            <h3 className="text-xl font-bold">GST Calculator</h3>
          </div>
          <div className="flex bg-blue-700 p-1 rounded-xl">
            <button
              onClick={() => setType("exclusive")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${type === "exclusive" ? "bg-white text-blue-600" : "text-blue-200 hover:text-white"}`}
            >
              Add GST
            </button>
            <button
              onClick={() => setType("inclusive")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${type === "inclusive" ? "bg-white text-blue-600" : "text-blue-200 hover:text-white"}`}
            >
              Remove GST
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full h-14 px-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-0 outline-none font-bold text-xl transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tax Rate (%)</label>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {rates.map((r) => (
                    <button
                      key={r}
                      onClick={() => setGstRate(r)}
                      className={`h-10 rounded-xl text-sm font-bold transition-all ${gstRate === r ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={gstRate}
                  onChange={(e) => setGstRate(e.target.value)}
                  placeholder="Custom Rate"
                  className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-0 outline-none font-medium text-center"
                />
              </div>

              <button
                onClick={() => {}}
                className="w-full h-14 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100 active:scale-95"
              >
                <PieIcon className="h-5 w-5" />
                Live Breakdown
              </button>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 flex flex-col justify-center space-y-6">
              {result && (
                <>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                          formatter={(value: any) => [`$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, '']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-slate-400"></div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Net Amount</span>
                      </div>
                      <span className="font-bold text-gray-700">${result.netAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">GST Amount</span>
                      </div>
                      <span className="font-bold text-blue-600">${result.gstAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Total Amount</span>
                      <span className="text-2xl font-black text-gray-900">${result.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
