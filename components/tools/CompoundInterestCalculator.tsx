"use client";

import { useState, useMemo } from "react";
import {  TrendingUp } from "lucide-react";
import {  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [time, setTime] = useState("10");
  const [frequency, setFrequency] = useState("12"); // Monthly by default

  const chartData = useMemo(() => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(frequency);

    if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n) || n === 0) return [];

    const data = [];
    for (let year = 0; year <= t; year++) {
      const amount = P * Math.pow(1 + r / n, n * year);
      data.push({
        year: year,
        balance: Math.round(amount),
        interest: Math.round(amount - P),
      });
    }
    return data;
  }, [principal, rate, time, frequency]);

  const result = useMemo(() => {
    if (chartData.length === 0) return null;
    const lastPoint = chartData[chartData.length - 1];
    return {
      futureValue: lastPoint.balance,
      totalInterest: lastPoint.interest,
    };
  }, [chartData]);

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Initial Investment (Principal)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full h-12 pl-8 pr-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Annual Interest Rate (%)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Time Period (Years)</label>
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Compounding</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="1">Annually</option>
                  <option value="2">Semi-Annually</option>
                  <option value="4">Quarterly</option>
                  <option value="12">Monthly</option>
                  <option value="365">Daily</option>
                </select>
              </div>
            </div>
          </div>
          <button
            onClick={() => {}} // Already calculated via useMemo
            className="w-full h-12 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold flex items-center justify-center gap-2"
          >
            <TrendingUp className="h-5 w-5" />
            Live Calculation
          </button>
        </div>

        <div className="flex flex-col justify-center space-y-6">
          {result && (
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 space-y-4">
              <div className="text-center">
                <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Estimated Future Value</div>
                <div className="text-3xl font-black text-blue-600">${result.futureValue.toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-100">
                <div className="text-center">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Interest</div>
                  <div className="text-md font-bold text-gray-700">${result.totalInterest.toLocaleString()}</div>
                </div>
                <div className="text-center">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Principal</div>
                  <div className="text-md font-bold text-gray-700">${parseFloat(principal).toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}

          <div className="h-62.5 w-full glass-card p-4 rounded-3xl overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} 
                  label={{ value: 'Years', position: 'insideBottom', offset: -5, fontSize: 10, fontWeight: 'bold' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }}
                  tickFormatter={(val) => `$${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                  formatter={(value: number | undefined) => value !== undefined ? [`$${value.toLocaleString()}`, 'Balance'] : ['', 'Balance']}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorBalance)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
