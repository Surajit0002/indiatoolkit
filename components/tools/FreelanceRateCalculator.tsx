"use client";

import { useState } from "react";
import { Target, Briefcase, Info } from "lucide-react";

export default function FreelanceRateCalculator() {
  const [targetIncome, setTargetIncome] = useState("80000");
  const [expenses, setExpenses] = useState("10000");
  const [billableWeeks, setBillableWeeks] = useState("44");
  const [billableHours, setBillableHours] = useState("25");

  const income = parseFloat(targetIncome) || 0;
  const exp = parseFloat(expenses) || 0;
  const weeks = parseFloat(billableWeeks) || 1;
  const hours = parseFloat(billableHours) || 1;

  const totalRequired = income + exp;
  const annualBillableHours = weeks * hours;
  const hourlyRate = annualBillableHours > 0 ? totalRequired / annualBillableHours : 0;
  const dayRate = hourlyRate * 8; // Assuming 8 hour work day

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight">Income Goals</h3>
              <p className="text-xs text-gray-400 font-bold uppercase">Target & Expenses</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Net Annual Income ($)</label>
              <input type="number" value={targetIncome} onChange={e => setTargetIncome(e.target.value)} className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-black text-xl" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Annual Business Expenses ($)</label>
              <input type="number" value={expenses} onChange={e => setExpenses(e.target.value)} className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Billable Weeks/Year</label>
                <input type="number" value={billableWeeks} onChange={e => setBillableWeeks(e.target.value)} className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Billable Hours/Week</label>
                <input type="number" value={billableHours} onChange={e => setBillableHours(e.target.value)} className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-600 rounded-3xl p-8 text-white space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Briefcase className="h-32 w-32" />
            </div>
            <div className="relative">
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Recommended Hourly Rate</p>
              <h2 className="text-5xl font-black mt-1">${hourlyRate.toFixed(2)}</h2>
            </div>
            <div className="relative pt-6 border-t border-white/10 grid grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Daily Rate (8h)</p>
                <p className="text-2xl font-black">${dayRate.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Annual Billable</p>
                <p className="text-2xl font-black">{annualBillableHours} hrs</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 space-y-4">
            <div className="flex items-center gap-3 text-emerald-600">
              <Info className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Why this rate?</span>
            </div>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              This rate covers your desired income, business expenses (software, hardware, insurance), and accounts for non-billable time like admin, marketing, and vacations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
