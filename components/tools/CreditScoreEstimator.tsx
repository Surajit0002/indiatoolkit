"use client";

import { useState } from "react";
import { CreditCard, TrendingUp, AlertCircle, CheckCircle, Calculator, RefreshCw } from "lucide-react";

interface CreditFactors {
  paymentHistory: number;
  creditUtilization: number;
  creditAge: number;
  creditMix: number;
  newCredit: number;
}

export default function CreditScoreEstimator() {
  const [factors, setFactors] = useState<CreditFactors>({
    paymentHistory: 75,
    creditUtilization: 50,
    creditAge: 50,
    creditMix: 50,
    newCredit: 50
  });

  const [hasCreditCard, setHasCreditCard] = useState(true);
  const [loanHistory, setLoanHistory] = useState("none");
  const [emiPayments, setEmiPayments] = useState("ontime");
  const [isCalculating, setIsCalculating] = useState(false);
  const [estimatedScore, setEstimatedScore] = useState<number | null>(null);

  const updateFactor = (key: keyof CreditFactors, value: number) => {
    setFactors({ ...factors, [key]: value });
  };

  const calculateScore = async () => {
    setIsCalculating(true);

    setTimeout(() => {
      let score = 650;

      // Payment History impact (35%)
      score += ((factors.paymentHistory - 50) / 50) * 150;

      // Credit Utilization impact (30%) - lower is better
      score += ((50 - factors.creditUtilization) / 50) * 150;

      // Credit Age impact (15%)
      score += ((factors.creditAge - 50) / 50) * 75;

      // Credit Mix impact (10%)
      const mixScore = hasCreditCard ? 25 : 0;
      const loanScore = loanHistory === "paid" ? 40 : loanHistory === "current" ? 20 : 0;
      score += mixScore + loanScore;

      // New Credit impact (10%) - less is better
      score -= ((50 - factors.newCredit) / 50) * 50;

      // EMI behavior adjustment
      if (emiPayments === "ontime") score += 50;
      if (emiPayments === "late") score -= 100;

      // Cap score between 300 and 850
      score = Math.max(300, Math.min(850, Math.round(score)));
      
      setEstimatedScore(score);
      setIsCalculating(false);
    }, 1500);
  };

  const resetForm = () => {
    setFactors({
      paymentHistory: 75,
      creditUtilization: 50,
      creditAge: 50,
      creditMix: 50,
      newCredit: 50
    });
    setHasCreditCard(true);
    setLoanHistory("none");
    setEmiPayments("ontime");
    setEstimatedScore(null);
  };

  const getScoreGrade = (score: number) => {
    if (score >= 800) return { grade: "Excellent", color: "text-green-600", bg: "bg-green-100" };
    if (score >= 740) return { grade: "Very Good", color: "text-green-500", bg: "bg-green-50" };
    if (score >= 670) return { grade: "Good", color: "text-amber-600", bg: "bg-amber-100" };
    if (score >= 580) return { grade: "Fair", color: "text-orange-600", bg: "bg-orange-100" };
    return { grade: "Poor", color: "text-red-600", bg: "bg-red-100" };
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <CreditCard className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Credit Score Estimator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Estimate your credit score based on key factors
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Credit Factors */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Credit Factors (Slide to adjust)
              </label>
              
              <div className="space-y-5">
                {/* Payment History */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-slate-700">Payment History</span>
                    <span className="font-bold text-emerald-600">{factors.paymentHistory}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={factors.paymentHistory}
                    onChange={(e) => updateFactor("paymentHistory", parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
                  <p className="text-xs text-slate-400 mt-1">On-time payments percentage</p>
                </div>

                {/* Credit Utilization */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-slate-700">Credit Utilization</span>
                    <span className="font-bold text-slate-600">{factors.creditUtilization}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={factors.creditUtilization}
                    onChange={(e) => updateFactor("creditUtilization", parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
                  <p className="text-xs text-slate-400 mt-1">Lower is better (target: under 30%)</p>
                </div>

                {/* Credit Age */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-slate-700">Credit Age</span>
                    <span className="font-bold text-slate-600">{factors.creditAge}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={factors.creditAge}
                    onChange={(e) => updateFactor("creditAge", parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
                  <p className="text-xs text-slate-400 mt-1">Length of credit history</p>
                </div>

                {/* Credit Mix */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-slate-700">Credit Mix</span>
                    <span className="font-bold text-slate-600">{factors.creditMix}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={factors.creditMix}
                    onChange={(e) => updateFactor("creditMix", parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
                  <p className="text-xs text-slate-400 mt-1">Variety of credit types</p>
                </div>

                {/* New Credit */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-slate-700">New Credit</span>
                    <span className="font-bold text-slate-600">{factors.newCredit}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={factors.newCredit}
                    onChange={(e) => updateFactor("newCredit", parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
                  <p className="text-xs text-slate-400 mt-1">Recent credit inquiries</p>
                </div>
              </div>
            </div>

            {/* Additional Questions */}
            <div className="border-t border-slate-200 pt-6">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Additional Information
              </label>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <span className="font-medium text-slate-700">Do you have a credit card?</span>
                  <button
                    onClick={() => setHasCreditCard(!hasCreditCard)}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      hasCreditCard ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                        hasCreditCard ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl">
                  <span className="font-medium text-slate-700 block mb-2">Loan History</span>
                  <div className="flex gap-3">
                    {["none", "current", "paid"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setLoanHistory(option)}
                        className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all ${
                          loanHistory === option
                            ? "bg-emerald-500 text-white"
                            : "bg-white border border-slate-200 text-slate-600"
                        }`}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl">
                  <span className="font-medium text-slate-700 block mb-2">EMI Payment History</span>
                  <div className="flex gap-3">
                    {["ontime", "sometimes", "late"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setEmiPayments(option)}
                        className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all ${
                          emiPayments === option
                            ? "bg-emerald-500 text-white"
                            : "bg-white border border-slate-200 text-slate-600"
                        }`}
                      >
                        {option === "ontime" ? "Always On Time" : option === "sometimes" ? "Sometimes Late" : "Frequently Late"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="flex gap-4">
              <button
                onClick={calculateScore}
                disabled={isCalculating}
                className="flex-1 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-100 disabled:opacity-50"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="h-5 w-5" />
                    Estimate Credit Score
                  </>
                )}
              </button>

              <button
                onClick={resetForm}
                className="px-6 h-14 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results */}
          {estimatedScore !== null && (
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-t border-emerald-100">
              <div className="text-center">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">
                  Estimated Credit Score
                </p>
                <div className="text-6xl font-black text-slate-900 mb-2">
                  {estimatedScore}
                </div>
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getScoreGrade(estimatedScore).bg} ${getScoreGrade(estimatedScore).color}`}>
                  {getScoreGrade(estimatedScore).grade}
                </div>
              </div>

              {/* Score Range Visualization */}
              <div className="mt-6 p-4 bg-white rounded-2xl">
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                  <span>300</span>
                  <span>580</span>
                  <span>670</span>
                  <span>740</span>
                  <span>850</span>
                </div>
                <div className="h-3 w-full bg-gradient-to-r from-red-400 via-amber-400 to-green-500 rounded-full" />
              </div>

              {/* Tips */}
              <div className="mt-6 space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Recommendations
                </p>
                {factors.paymentHistory < 90 && (
                  <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-amber-800 text-sm">Improve Payment History</p>
                      <p className="text-xs text-amber-700">Set up automatic payments to never miss a due date.</p>
                    </div>
                  </div>
                )}
                {factors.creditUtilization > 30 && (
                  <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                    <TrendingUp className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-amber-800 text-sm">Reduce Credit Utilization</p>
                      <p className="text-xs text-amber-700">Pay down balances to keep utilization below 30%.</p>
                    </div>
                  </div>
                )}
                {estimatedScore >= 750 && (
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-green-800 text-sm">Great Job!</p>
                      <p className="text-xs text-green-700">Your credit habits are excellent. Keep it up!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
            <TrendingUp className="h-8 w-8 text-emerald-600 mb-3" />
            <h3 className="font-bold text-emerald-800 mb-2">Score Range</h3>
            <p className="text-sm text-emerald-700">
              Credit scores typically range from 300 to 850 in India.
            </p>
          </div>
          <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100">
            <AlertCircle className="h-8 w-8 text-teal-600 mb-3" />
            <h3 className="font-bold text-teal-800 mb-2">Key Factors</h3>
            <p className="text-sm text-teal-700">
              Payment history and credit utilization have the biggest impact.
            </p>
          </div>
          <div className="p-6 bg-cyan-50 rounded-2xl border border-cyan-100">
            <CreditCard className="h-8 w-8 text-cyan-600 mb-3" />
            <h3 className="font-bold text-cyan-800 mb-2">Regular Checks</h3>
            <p className="text-sm text-cyan-700">
              Check your credit report regularly to monitor your score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
