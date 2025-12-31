"use client";

import { useState } from "react";
import { Banknote, Calendar, CreditCard, TrendingUp } from "lucide-react";

export default function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [term, setTerm] = useState("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
  } | null>(null);

  const calculateLoan = () => {
    const p = parseFloat(amount);
    const r = parseFloat(interest) / 100 / 12;
    const n = parseFloat(term) * 12;

    if (isNaN(p) || isNaN(r) || isNaN(n) || n === 0) return;

    const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - p;

    setResult({ monthlyPayment, totalInterest, totalPayment });
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Loan Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10000"
              className="w-full h-12 pl-8 pr-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Interest Rate (%)</label>
          <input
            type="number"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            placeholder="5.5"
            className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Term (Years)</label>
          <input
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="5"
            className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <button
        onClick={calculateLoan}
        className="w-full h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold flex items-center justify-center gap-2"
      >
        <Banknote className="h-5 w-5" />
        Calculate Repayment
      </button>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center space-y-2">
            <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Monthly Payment</div>
            <div className="text-2xl font-black text-gray-800">${result.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center space-y-2">
            <div className="bg-green-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Interest</div>
            <div className="text-2xl font-black text-gray-800">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center space-y-2">
            <div className="bg-purple-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Payment</div>
            <div className="text-2xl font-black text-gray-800">${result.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
          </div>
        </div>
      )}
    </div>
  );
}
