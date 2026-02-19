"use client";

import { useState } from "react";
import { Calculator, Percent, TrendingDown, Building, Heart, Shield, Briefcase, Download, RefreshCw } from "lucide-react";

interface TaxDeduction {
  id: string;
  section: string;
  name: string;
  maxDeduction: number;
  claimed: number;
}

const taxSections = [
  { section: "80C", name: "Life Insurance, PPF, ELSS, FD", icon: <Shield className="h-5 w-5" /> },
  { section: "80D", name: "Health Insurance Premium", icon: <Heart className="h-5 w-5" /> },
  { section: "80E", name: "Education Loan Interest", icon: <Briefcase className="h-5 w-5" /> },
  { section: "80G", name: "Charitable Donations", icon: <Building className="h-5 w-5" /> },
  { section: "80TTA", name: "Savings Account Interest", icon: <TrendingDown className="h-5 w-5" /> },
];

export default function TaxSavingPlanner() {
  const [income, setIncome] = useState(500000);
  const [age, setAge] = useState(30);
  const [deductions, setDeductions] = useState<TaxDeduction[]>([
    { id: "1", section: "80C", name: "Life Insurance, PPF, ELSS", maxDeduction: 150000, claimed: 50000 },
    { id: "2", section: "80D", name: "Health Insurance", maxDeduction: 50000, claimed: 15000 },
    { id: "3", section: "80TTA", name: "Savings Interest", maxDeduction: 10000, claimed: 5000 },
  ]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<{
    grossIncome: number;
    totalDeductions: number;
    taxableIncome: number;
    taxBeforeRebate: number;
    taxAfterRebate: number;
    savings: number;
  } | null>(null);

  const calculateTax = async () => {
    setIsCalculating(true);

    setTimeout(() => {
      const totalDeductions = deductions.reduce((sum, d) => sum + d.claimed, 0);
      const taxableIncome = Math.max(0, income - totalDeductions - 50000); // Standard deduction
      
      let taxBeforeRebate = 0;
      
      if (age < 60) {
        // Old tax regime
        if (taxableIncome <= 250000) taxBeforeRebate = 0;
        else if (taxableIncome <= 500000) taxBeforeRebate = (taxableIncome - 250000) * 0.05;
        else if (taxableIncome <= 1000000) taxBeforeRebate = 12500 + (taxableIncome - 500000) * 0.20;
        else taxBeforeRebate = 112500 + (taxableIncome - 1000000) * 0.30;
      } else if (age < 60) {
        if (taxableIncome <= 300000) taxBeforeRebate = 0;
        else if (taxableIncome <= 500000) taxBeforeRebate = (taxableIncome - 300000) * 0.05;
        else if (taxableIncome <= 1000000) taxBeforeRebate = 10000 + (taxableIncome - 500000) * 0.20;
        else taxBeforeRebate = 110000 + (taxableIncome - 1000000) * 0.30;
      } else {
        if (taxableIncome <= 500000) taxBeforeRebate = 0;
        else if (taxableIncome <= 1000000) taxBeforeRebate = (taxableIncome - 500000) * 0.20;
        else taxBeforeRebate = 100000 + (taxableIncome - 1000000) * 0.30;
      }

      // Section 87A rebate (for taxable income up to 5L)
      const taxAfterRebate = taxableIncome <= 500000 ? 0 : taxBeforeRebate;
      
      // Without deductions
      const taxableWithoutDeductions = income - 50000;
      let taxWithoutDeductions = 0;
      if (taxableWithoutDeductions <= 250000) taxWithoutDeductions = 0;
      else if (taxableWithoutDeductions <= 500000) taxWithoutDeductions = (taxableWithoutDeductions - 250000) * 0.05;
      else if (taxableWithoutDeductions <= 1000000) taxWithoutDeductions = 12500 + (taxableWithoutDeductions - 500000) * 0.20;
      else taxWithoutDeductions = 112500 + (taxableWithoutDeductions - 1000000) * 0.30;

      setResults({
        grossIncome: income,
        totalDeductions,
        taxableIncome,
        taxBeforeRebate,
        taxAfterRebate,
        savings: taxWithoutDeductions - taxAfterRebate
      });

      setIsCalculating(false);
    }, 1500);
  };

  const updateDeduction = (id: string, value: number) => {
    setDeductions(deductions.map(d => 
      d.id === id ? { ...d, claimed: Math.min(value, d.maxDeduction) } : d
    ));
  };

  const addDeduction = (section: string) => {
    const sectionInfo = taxSections.find(s => s.section === section);
    if (sectionInfo) {
      setDeductions([...deductions, {
        // eslint-disable-next-line react-hooks/purity
        id: String(Date.now()),
        section,
        name: sectionInfo.name,
        maxDeduction: sectionInfo.section === "80C" ? 150000 : sectionInfo.section === "80D" ? 50000 : 100000,
        claimed: 0
      }]);
    }
  };

  const resetForm = () => {
    setIncome(500000);
    setAge(30);
    setDeductions([
      { id: "1", section: "80C", name: "Life Insurance, PPF, ELSS", maxDeduction: 150000, claimed: 50000 },
      { id: "2", section: "80D", name: "Health Insurance", maxDeduction: 50000, claimed: 15000 },
    ]);
    setResults(null);
  };

  const downloadReport = () => {
    if (!results) return;
    
    const text = `
===============================================
        TAX SAVINGS REPORT - INDIA TOOLKIT
===============================================

INCOME DETAILS
--------------
Annual Income: ₹${income.toLocaleString()}
Age: ${age} years

DEDUCTIONS CLAIMED
------------------
${deductions.map(d => `${d.section} - ${d.name}: ₹${d.claimed.toLocaleString()}`).join("\n")}

Total Deductions: ₹${results.totalDeductions.toLocaleString()}
Standard Deduction: ₹50,000

TAX CALCULATION (OLD REGIME)
----------------------------
Taxable Income: ₹${results.taxableIncome.toLocaleString()}
Tax Before Rebate: ₹${results.taxBeforeRebate.toLocaleString()}
Tax After Rebate (87A): ₹${results.taxAfterRebate.toLocaleString()}

SAVINGS SUMMARY
--------------
Without Deductions Tax: ₹${(results.grossIncome - 50000 <= 250000 ? 0 : 
  (results.grossIncome - 50000 <= 500000 ? (results.grossIncome - 50000 - 250000) * 0.05 : 
  (results.grossIncome - 50000 <= 1000000 ? 12500 + (results.grossIncome - 50000 - 500000) * 0.20 : 
  112500 + (results.grossIncome - 50000 - 1000000) * 0.30))).toLocaleString()}

With Deductions Tax: ₹${results.taxAfterRebate.toLocaleString()}

💰 TOTAL TAX SAVINGS: ₹${results.savings.toLocaleString()}

===============================================
    Generated by IndiaToolkit.in
===============================================
    `;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tax-saving-report-${new Date().toISOString().split("T")[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Tax Saving Planner (India)</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Maximize your tax deductions under Indian income tax laws
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Annual Income (₹)
                </label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(parseInt(e.target.value) || 0)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Your Age
                </label>
                <select
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none font-medium"
                >
                  <option value="25">Below 60</option>
                  <option value="60">60-80 years</option>
                  <option value="80">Above 80</option>
                </select>
              </div>
            </div>

            {/* Tax Sections */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Tax Deductions (Under Section 80)
              </label>
              
              <div className="space-y-4">
                {deductions.map((deduction) => (
                  <div key={deduction.id} className="p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold">
                          {deduction.section}
                        </span>
                        <span className="font-medium text-slate-700">{deduction.name}</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        Max: ₹{deduction.maxDeduction.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max={deduction.maxDeduction}
                        value={deduction.claimed}
                        onChange={(e) => updateDeduction(deduction.id, parseInt(e.target.value))}
                        className="flex-1 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
                      />
                      <input
                        type="number"
                        value={deduction.claimed}
                        onChange={(e) => updateDeduction(deduction.id, parseInt(e.target.value) || 0)}
                        className="w-28 p-2 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none text-right font-bold"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Add More Deductions */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Add More Deductions
                </label>
                <div className="flex flex-wrap gap-2">
                  {taxSections.map((section) => (
                    <button
                      key={section.section}
                      onClick={() => addDeduction(section.section)}
                      className="flex items-center gap-2 px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-xl text-sm font-bold text-indigo-700 hover:bg-indigo-100 transition-all"
                    >
                      {section.icon}
                      {section.section}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="flex gap-4">
              <button
                onClick={calculateTax}
                disabled={isCalculating}
                className="flex-1 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Percent className="h-5 w-5" />
                    Calculate Tax Savings
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
          {results && (
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-t border-indigo-100">
              <div className="text-center mb-6">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
                  Your Tax Savings
                </p>
                <div className="text-5xl font-black text-slate-900 mb-2">
                  ₹{results.savings.toLocaleString()}
                </div>
                <p className="text-sm text-slate-600">
                  in tax deductions under Section 80
                </p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white rounded-2xl">
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Gross Income</p>
                  <p className="text-xl font-bold text-slate-800">₹{results.grossIncome.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl">
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Taxable Income</p>
                  <p className="text-xl font-bold text-slate-800">₹{results.taxableIncome.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl">
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Total Deductions</p>
                  <p className="text-xl font-bold text-green-600">₹{results.totalDeductions.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl">
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Tax Payable</p>
                  <p className="text-xl font-bold text-slate-800">₹{results.taxAfterRebate.toLocaleString()}</p>
                </div>
              </div>

              <button
                onClick={downloadReport}
                className="w-full h-12 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
              >
                <Download className="h-5 w-5" />
                Download Tax Report
              </button>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <TrendingDown className="h-8 w-8 text-indigo-600 mb-3" />
            <h3 className="font-bold text-indigo-800 mb-2">Save More</h3>
            <p className="text-sm text-indigo-700">
              Maximize deductions under 80C, 80D, and other sections to reduce taxable income.
            </p>
          </div>
          <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
            <Shield className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-purple-800 mb-2">Stay Compliant</h3>
            <p className="text-sm text-purple-700">
              Plan ahead to file taxes efficiently and claim all eligible deductions.
            </p>
          </div>
          <div className="p-6 bg-pink-50 rounded-2xl border border-pink-100">
            <Percent className="h-8 w-8 text-pink-600 mb-3" />
            <h3 className="font-bold text-pink-800 mb-2">Smart Investing</h3>
            <p className="text-sm text-pink-700">
              Invest in tax-saving instruments like ELSS, PPF, and life insurance.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-slate-100 rounded-xl">
          <p className="text-xs text-slate-500 text-center">
            ⚠️ Disclaimer: This calculator provides estimates based on old tax regime. 
            Please consult a tax professional for accurate tax planning.
          </p>
        </div>
      </div>
    </div>
  );
}
