"use client";

import { useState } from "react";
import { Copy, Sparkles } from "lucide-react";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const numbers: number[] = [];
    const range = max - min + 1;
    
    if (unique && count > range) {
        setResults([]);
        return;
    }

    while (numbers.length < count) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!unique || !numbers.includes(num)) {
        numbers.push(num);
      }
    }
    setResults(numbers);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="glass-card p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="space-y-3">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Minimum</label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(parseInt(e.target.value) || 0)}
              className="brutal-input text-2xl"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Maximum</label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(parseInt(e.target.value) || 0)}
              className="brutal-input text-2xl"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">How Many?</label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.min(100, parseInt(e.target.value) || 1))}
              className="brutal-input text-2xl"
            />
          </div>
          <div className="space-y-3 flex flex-col justify-end">
             <button 
                onClick={() => setUnique(!unique)}
                className={`w-full py-3 rounded-[10px] font-black uppercase tracking-widest text-[10px] border-2 transition-all ${unique ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-transparent border-gray-100 text-gray-400 hover:border-gray-200'}`}
             >
                {unique ? 'Unique Numbers: ON' : 'Unique Numbers: OFF'}
             </button>
          </div>
        </div>

        <button
          onClick={generate}
          className="brutal-btn w-full bg-blue-600 flex items-center justify-center gap-2 py-4 text-lg"
        >
          <Sparkles className="h-5 w-5" /> GENERATE NUMBERS
        </button>
      </div>

      {results.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {results.map((num, index) => (
            <div 
                key={index} 
                className="glass-card h-24 w-24 flex items-center justify-center relative group animate-in zoom-in duration-300"
                style={{ animationDelay: `${index * 30}ms` }}
            >
                <span className="text-3xl font-black tabular-nums">{num}</span>
                <button
                    onClick={() => navigator.clipboard.writeText(num.toString())}
                    className="absolute -top-2 -right-2 p-1.5 bg-white shadow-lg rounded-full text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity border border-blue-100"
                >
                    <Copy className="h-3 w-3" />
                </button>
            </div>
          ))}
        </div>
      ) : (
          unique && count > (max - min + 1) && (
              <div className="glass-card p-6 bg-red-500/10 border-red-200 text-red-600 text-center font-black uppercase tracking-widest text-xs">
                  Error: Requested count is larger than the available range for unique numbers.
              </div>
          )
      )}
    </div>
  );
}
