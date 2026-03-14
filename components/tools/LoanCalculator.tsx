"use client";

import { useState } from "react";
import { Banknote, Calendar, CreditCard, TrendingUp } from "lucide-react";
import { FadeIn, SlideIn, ScaleIn, StaggerContainer, StaggerItem, AnimatedButton, ResultPanel, AnimatedCounter } from "@/components/ui/AnimatedComponents";

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
      <StaggerContainer className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StaggerItem>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Loan Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="10000"
                  className="w-full h-12 pl-8 pr-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-0 focus:outline-none transition-all"
                />
              </div>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Interest Rate (%)</label>
              <input
                type="number"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="5.5"
                className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-0 focus:outline-none transition-all"
              />
            </div>
          </StaggerItem>
          <StaggerItem>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Term (Years)</label>
              <input
                type="number"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="5"
                className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-0 focus:outline-none transition-all"
              />
            </div>
          </StaggerItem>
        </div>
      </StaggerContainer>

      <AnimatedButton 
        onClick={calculateLoan} 
        className="w-full"
        icon={Banknote}
      >
        Calculate Repayment
      </AnimatedButton>

      <ResultPanel show={result !== null}>
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScaleIn delay={0}>
              <div className="bg-white p-6 rounded-2xl border-2 border-indigo-100 shadow-lg text-center space-y-2 hover:shadow-xl transition-shadow">
                <div className="bg-indigo-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CreditCard className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Payment</div>
                <div className="text-2xl font-black text-slate-800">
                  $<AnimatedCounter value={Math.round(result.monthlyPayment * 100) / 100} />
                </div>
              </div>
            </ScaleIn>
            <ScaleIn delay={0.1}>
              <div className="bg-white p-6 rounded-2xl border-2 border-emerald-100 shadow-lg text-center space-y-2 hover:shadow-xl transition-shadow">
                <div className="bg-emerald-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Interest</div>
                <div className="text-2xl font-black text-slate-800">
                  $<AnimatedCounter value={Math.round(result.totalInterest * 100) / 100} />
                </div>
              </div>
            </ScaleIn>
            <ScaleIn delay={0.2}>
              <div className="bg-white p-6 rounded-2xl border-2 border-purple-100 shadow-lg text-center space-y-2 hover:shadow-xl transition-shadow">
                <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Payment</div>
                <div className="text-2xl font-black text-slate-800">
                  $<AnimatedCounter value={Math.round(result.totalPayment * 100) / 100} />
                </div>
              </div>
            </ScaleIn>
          </div>
        )}
      </ResultPanel>
    </div>
  );
}
