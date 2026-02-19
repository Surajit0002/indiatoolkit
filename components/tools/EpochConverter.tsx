"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Clock, RefreshCw } from "lucide-react";

export default function EpochConverter() {
  const getInitialTime = () => Math.floor(Date.now() / 1000);
  const [now, setNow] = useState(getInitialTime);
  const [timestamp, setTimestamp] = useState(getInitialTime().toString());
  const [dateStr, setDateStr] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const convertToDate = (ts: string) => {
    try {
      const d = new Date(parseInt(ts) * 1000);
      if (isNaN(d.getTime())) return "Invalid Date";
      return d.toUTCString() + " / " + d.toLocaleString();
    } catch {
      return "Invalid Date";
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(now.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="brutal-card p-6 bg-black text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-400" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Current Unix Timestamp</span>
          </div>
          <button onClick={handleCopy} className="p-2 hover:bg-white/10 rounded-md transition-colors">
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        <div className="text-4xl md:text-5xl font-black tracking-tighter tabular-nums truncate">
          {now}
        </div>
      </div>

      <div className="brutal-card p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest mb-2">Timestamp to Human Date</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                placeholder="Enter Unix timestamp..."
                className="brutal-input flex-1"
              />
              <button 
                onClick={() => setTimestamp(now.toString())}
                className="brutal-btn p-3"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-2 border-black rounded-[8px]">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Resulting Date</label>
            <div className="font-bold text-lg break-all">
              {convertToDate(timestamp)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
