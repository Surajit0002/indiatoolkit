"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, PieChart, ArrowRight } from "lucide-react";

export default function ProfitLossCalculator() {
  const [revenue, setRevenue] = useState<string>("10000");
  const [cogs, setCogs] = useState<string>("4000");
  const [operatingExpenses, setOperatingExpenses] = useState<string>("2000");
  const [taxRate, setTaxRate] = useState<string>("20");

  const rev = parseFloat(revenue) || 0;
  const cost = parseFloat(cogs) || 0;
  const opEx = parseFloat(operatingExpenses) || 0;
  const tax = parseFloat(taxRate) || 0;

  const grossProfit = rev - cost;
  const operatingProfit = grossProfit - opEx;
  const taxAmount = (operatingProfit > 0) ? (operatingProfit * tax) / 100 : 0;
  const netProfit = operatingProfit - taxAmount;
  
  const grossMargin = rev > 0 ? (grossProfit / rev) * 100 : 0;
  const netMargin = rev > 0 ? (netProfit / rev) * 100 : 0;

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <PieChart className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight">Financial Inputs</h3>
              <p className="text-xs text-gray-400 font-bold uppercase">Income & Costs</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Revenue ($)</label>
              <input type="number" value={revenue} onChange={e => setRevenue(e.target.value)} className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-black text-xl text-blue-600" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cost of Goods Sold (COGS) ($)</label>
              <input type="number" value={cogs} onChange={e => setCogs(e.target.value)} className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Operating Expenses ($)</label>
              <input type="number" value={operatingExpenses} onChange={e => setOperatingExpenses(e.target.value)} className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tax Rate (%)</label>
              <input type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-3xl p-8 text-white space-y-6 shadow-2xl relative overflow-hidden transition-colors duration-500 ${netProfit >= 0 ? "bg-emerald-600" : "bg-red-600"}`}>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              {netProfit >= 0 ? <TrendingUp className="h-32 w-32" /> : <TrendingDown className="h-32 w-32" />}
            </div>
            
            <div className="relative">
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">{netProfit >= 0 ? "Net Profit" : "Net Loss"}</p>
              <h2 className="text-5xl font-black mt-1">${netProfit.toLocaleString()}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 relative pt-4 border-t border-white/10">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Gross Margin</p>
                <p className="text-xl font-black">{grossMargin.toFixed(1)}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Net Margin</p>
                <p className="text-xl font-black">{netMargin.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 space-y-4 shadow-xl">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Breakdown</h4>
            <div className="space-y-3">
              {[
                { label: "Gross Profit", value: grossProfit },
                { label: "Operating Profit", value: operatingProfit },
                { label: "Tax Amount", value: taxAmount },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-sm font-bold text-gray-500">{item.label}</span>
                  <span className="font-black text-gray-900">${item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
