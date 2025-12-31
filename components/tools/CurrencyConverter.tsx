"use client";

import { useState, useEffect } from "react";
import { DollarSign, RefreshCw, ArrowRightLeft } from "lucide-react";

// Mock rates for demonstration since we don't have an API key
const BASE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.12,
  JPY: 150.45,
  CAD: 1.35,
  AUD: 1.52,
  CNY: 7.19,
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const amt = parseFloat(amount);
    if (isNaN(amt)) {
      setResult(null);
      return;
    }

    const rateFrom = BASE_RATES[fromCurrency];
    const rateTo = BASE_RATES[toCurrency];
    
    // Convert to USD then to target
    const inUsd = amt / rateFrom;
    const final = inUsd * rateTo;
    
    setResult(final);
  }, [amount, fromCurrency, toCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-8 space-y-8">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-lg">
            <DollarSign className="h-5 w-5 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold">Currency Converter</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-14 px-4 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none text-xl font-bold"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 outline-none font-medium bg-white"
              >
                {Object.keys(BASE_RATES).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-center md:pt-6">
              <button 
                onClick={handleSwap}
                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-all border border-gray-100"
              >
                <ArrowRightLeft className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 outline-none font-medium bg-white"
              >
                {Object.keys(BASE_RATES).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {result !== null && (
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center">
            <div className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-1">Converted Amount</div>
            <div className="text-3xl font-black text-emerald-900">
              {parseFloat(amount).toLocaleString()} {fromCurrency} = {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency}
            </div>
          </div>
        )}

        <div className="text-center">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
            Rates are for demonstration purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
