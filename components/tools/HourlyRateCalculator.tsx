"use client";

import { useState } from "react";
import { Clock, DollarSign, Calendar, ArrowRightLeft } from "lucide-react";

export default function HourlyRateCalculator() {
  const [annualSalary, setAnnualSalary] = useState("60000");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");

  const salary = parseFloat(annualSalary) || 0;
  const weeks = parseFloat(weeksPerYear) || 1;
  const hours = parseFloat(hoursPerWeek) || 1;

  const hourly = salary / (weeks * hours);
  const monthly = salary / 12;
  const weekly = salary / weeks;
  const daily = hourly * 8;

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 uppercase tracking-tight">Salary Settings</h3>
                <p className="text-xs text-gray-400 font-bold uppercase">Income Conversion</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Annual Salary ($)</label>
                <input type="number" value={annualSalary} onChange={e => setAnnualSalary(e.target.value)} className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-black text-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Weeks / Year</label>
                  <input type="number" value={weeksPerYear} onChange={e => setWeeksPerYear(e.target.value)} className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hours / Week</label>
                  <input type="number" value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)} className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Breakdown</label>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Hourly Rate", value: hourly, icon: Clock, color: "text-indigo-600" },
                { label: "Daily Rate (8h)", value: daily, icon: Calendar, color: "text-blue-600" },
                { label: "Weekly Pay", value: weekly, icon: Calendar, color: "text-purple-600" },
                { label: "Monthly Pay", value: monthly, icon: Calendar, color: "text-emerald-600" },
              ].map((item, idx) => (
                <div key={idx} className="p-5 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    <span className="text-sm font-bold text-gray-500">{item.label}</span>
                  </div>
                  <span className="text-xl font-black text-gray-900">${item.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
