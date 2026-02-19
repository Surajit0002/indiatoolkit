"use client";

import { useState } from "react";
import { Twitter, Instagram, Linkedin, MessageSquare } from "lucide-react";

const LIMITS = [
  { name: "Twitter", limit: 280, icon: Twitter, color: "text-blue-400", bg: "bg-blue-50" },
  { name: "Instagram Bio", limit: 150, icon: Instagram, color: "text-pink-600", bg: "bg-pink-50" },
  { name: "LinkedIn Post", limit: 3000, icon: Linkedin, color: "text-blue-700", bg: "bg-blue-50" },
  { name: "SMS", limit: 160, icon: MessageSquare, color: "text-emerald-600", bg: "bg-emerald-50" },
];

export default function SocialCharacterCounter() {
  const [text, setText] = useState("");

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your social media post here..."
            className="w-full h-64 p-8 outline-none resize-none text-lg text-gray-700 placeholder-gray-300 font-medium"
          />
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <span className="text-2xl font-black text-gray-900">{text.length}</span>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-auto ml-2 mb-1">Characters</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LIMITS.map((plat) => {
            const isOver = text.length > plat.limit;
            const progress = Math.min((text.length / plat.limit) * 100, 100);
            
            return (
              <div key={plat.name} className={`${plat.bg} p-6 rounded-2xl border border-white/50 space-y-4 shadow-sm`}>
                <div className="flex justify-between items-center">
                  <div className={`p-2 bg-white rounded-xl ${plat.color}`}>
                    <plat.icon className="h-5 w-5" />
                  </div>
                  <span className={`text-xs font-black uppercase tracking-widest ${isOver ? "text-red-500" : "text-gray-400"}`}>
                    {text.length} / {plat.limit}
                  </span>
                </div>
                
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-2">{plat.name}</p>
                  <div className="h-2 w-full bg-white/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${isOver ? "bg-red-500" : plat.color.replace("text", "bg")}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                
                {isOver && (
                  <p className="text-[10px] font-bold text-red-500 uppercase">Limit Exceeded by {text.length - plat.limit}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
