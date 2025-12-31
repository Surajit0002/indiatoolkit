"use client";

import { useState } from "react";
import { Calendar, Clock, Gift } from "lucide-react";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalHours: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const diffTime = Math.abs(target.getTime() - birth.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;

    setResult({ years, months, days, totalDays, totalWeeks, totalHours });
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Date of Birth</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Age at the Date of</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            onClick={calculateAge}
            className="w-full h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold flex items-center justify-center gap-2"
          >
            <Calendar className="h-5 w-5" />
            Calculate Age
          </button>
        </div>

        {result && (
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 space-y-6">
            <div className="flex items-center gap-3">
              <Gift className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-800">Your Age</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-50 text-center">
                <div className="text-3xl font-black text-blue-600">{result.years}</div>
                <div className="text-xs font-bold text-gray-400 uppercase">Years</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-50 text-center">
                <div className="text-3xl font-black text-blue-600">{result.months}</div>
                <div className="text-xs font-bold text-gray-400 uppercase">Months</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-50 text-center">
                <div className="text-3xl font-black text-blue-600">{result.days}</div>
                <div className="text-xs font-bold text-gray-400 uppercase">Days</div>
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-blue-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium flex items-center gap-2"><Clock className="h-4 w-4" /> Total Days</span>
                <span className="font-bold text-gray-700">{result.totalDays.toLocaleString()} days</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium flex items-center gap-2"><Clock className="h-4 w-4" /> Total Weeks</span>
                <span className="font-bold text-gray-700">{result.totalWeeks.toLocaleString()} weeks</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium flex items-center gap-2"><Clock className="h-4 w-4" /> Total Hours</span>
                <span className="font-bold text-gray-700">{result.totalHours.toLocaleString()} hours</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
