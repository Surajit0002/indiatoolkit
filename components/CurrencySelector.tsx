"use client";

import { useState, useEffect, useRef } from "react";
import { Check, ChevronDown } from "lucide-react";

interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag?: string;
}

const currencies: Currency[] = [
  { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", flag: "🇨🇳" },
];

interface CurrencySelectorProps {
  isScrolled?: boolean;
  compact?: boolean;
  showOnlyForTools?: boolean;
}

export default function CurrencySelector({ 
  isScrolled = false, 
  compact = false
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem("preferred-currency");
    if (saved) {
      const currency = currencies.find(c => c.code === saved);
      if (currency) setSelectedCurrency(currency);
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle currency selection
  const handleSelect = (currency: Currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem("preferred-currency", currency.code);
    setIsOpen(false);
    
    // Dispatch event for other components to listen
    window.dispatchEvent(new CustomEvent("currency-change", { detail: currency }));
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-1.5 p-2 rounded-xl transition-all
          ${isScrolled 
            ? "hover:bg-slate-100 text-slate-600" 
            : "hover:bg-white/10 text-slate-300 hover:text-white"
          }
          ${compact ? "p-1.5" : "px-3"}
        `}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select currency"
      >
        <span className="font-bold text-sm">{selectedCurrency.symbol}</span>
        {!compact && (
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div 
          className="
            absolute top-full right-0 mt-2
            w-52 bg-white rounded-xl shadow-xl border border-slate-200
            overflow-hidden z-50
            animate-fade-in-up
          "
          role="listbox"
          aria-label="Available currencies"
        >
          {/* Header */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Select Currency
            </span>
          </div>

          {/* Currency List */}
          <div className="max-h-64 overflow-y-auto py-1">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleSelect(currency)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5
                  text-left transition-colors
                  ${selectedCurrency.code === currency.code 
                    ? "bg-green-50 text-green-700" 
                    : "text-slate-700 hover:bg-slate-50"
                  }
                `}
                role="option"
                aria-selected={selectedCurrency.code === currency.code}
              >
                {currency.flag && <span className="text-lg">{currency.flag}</span>}
                <span className="font-bold text-lg w-8">{currency.symbol}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{currency.name}</p>
                  <p className="text-[10px] text-slate-400">{currency.code}</p>
                </div>
                {selectedCurrency.code === currency.code && (
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-3 py-2 bg-slate-50 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 text-center">
              Rates are for display only
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Export currency utilities for use in other components
export { currencies };
export type { Currency };
