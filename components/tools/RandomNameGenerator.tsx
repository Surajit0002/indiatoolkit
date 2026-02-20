"use client";

import { useState } from "react";
import { Copy, Sparkles } from "lucide-react";

const FIRST_NAMES = {
  male: ["Liam", "Noah", "Oliver", "James", "Elijah", "William", "Henry", "Lucas", "Benjamin", "Theodore", "Jack", "Levi", "Alexander", "Jackson", "Mateo"],
  female: ["Olivia", "Emma", "Charlotte", "Amelia", "Sophia", "Mia", "Isabella", "Ava", "Evelyn", "Luna", "Harper", "Sofia", "Scarlett", "Elizabeth", "Eleanor"],
  neutral: ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie", "Skyler", "Quinn", "Avery", "Peyton", "Charlie", "Dakota", "Emerson", "Phoenix"]
};

const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson"];

export default function RandomNameGenerator() {
  const [gender, setGender] = useState<"male" | "female" | "neutral">("neutral");
  const [count, setCount] = useState(5);
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);

  const generateNames = () => {
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const firstSet = FIRST_NAMES[gender];
      const first = firstSet[Math.floor(Math.random() * firstSet.length)];
      const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
      names.push(`${first} ${last}`);
    }
    setGeneratedNames(names);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="glass-card p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Gender Preference</label>
            <div className="flex gap-2">
              {(['male', 'female', 'neutral'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-3 rounded-[10px] font-black uppercase tracking-widest text-xs transition-all ${
                    gender === g ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Number of Names</label>
            <input
              type="range"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs font-black text-gray-400 uppercase tracking-widest">
              <span>1 Name</span>
              <span className="text-blue-600">{count} NAMES</span>
              <span>20 Names</span>
            </div>
          </div>
        </div>

        <button
          onClick={generateNames}
          className="brutal-btn w-full bg-blue-600 flex items-center justify-center gap-2 py-4 text-lg"
        >
          <Sparkles className="h-5 w-5" /> GENERATE RANDOM NAMES
        </button>
      </div>

      {generatedNames.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {generatedNames.map((name, index) => (
            <div key={index} className="glass-card p-4 flex items-center justify-between group animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-600/10 text-blue-600 rounded-full flex items-center justify-center font-black">
                  {name.charAt(0)}
                </div>
                <span className="font-black text-lg">{name}</span>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(name)}
                className="p-2 hover:bg-blue-600/10 text-gray-400 hover:text-blue-600 transition-colors rounded-lg"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
