"use client";

import { useState } from "react";
import { Search, Globe, DoorOpen, ShieldAlert, CheckCircle2, XCircle, Info } from "lucide-react";

const COMMON_PORTS = [
  { port: 80, name: "HTTP", desc: "Web traffic" },
  { port: 443, name: "HTTPS", desc: "Secure web traffic" },
  { port: 21, name: "FTP", desc: "File transfer" },
  { port: 22, name: "SSH", desc: "Secure shell" },
  { port: 25, name: "SMTP", desc: "Email sending" },
  { port: 3306, name: "MySQL", desc: "Database" },
];

export default function PortChecker() {
  const [target, setTarget] = useState("");
  const [port, setPort] = useState<number | "">("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const checkPort = (e: React.FormEvent) => {
    e.preventDefault();
    if (!target) return;

    setIsLoading(true);
    
    // Simulate port scanning (Actual scanning is not possible from browser JS)
    setTimeout(() => {
        const newResult = {
            target,
            port: port || 80,
            status: Math.random() > 0.3 ? "open" : "closed",
            time: new Date().toLocaleTimeString()
        };
        setResults([newResult, ...results]);
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="glass-card p-8">
        <form onSubmit={checkPort} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-1">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Domain or IP..."
              className="brutal-input pl-12"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </div>
          <div className="relative md:col-span-1">
            <DoorOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="number"
              placeholder="Port (e.g., 80)..."
              className="brutal-input pl-12"
              value={port}
              onChange={(e) => setPort(e.target.value ? parseInt(e.target.value) : "")}
            />
          </div>
          <button type="submit" disabled={isLoading} className="brutal-btn bg-blue-600 flex items-center justify-center gap-2">
            {isLoading ? (
                <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    SCANNING...
                </>
            ) : "CHECK PORT"}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Scan History</h3>
            {results.length > 0 ? (
                <div className="space-y-3">
                    {results.map((res, i) => (
                        <div key={i} className="glass-card p-4 flex items-center justify-between animate-in slide-in-from-top-2 duration-300">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full ${res.status === 'open' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {res.status === 'open' ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                                </div>
                                <div>
                                    <p className="font-black text-sm">{res.target}:{res.port}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">{res.time}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${res.status === 'open' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                                {res.status}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="glass-card p-12 flex flex-col items-center justify-center text-center text-gray-300 space-y-4 border-dashed border-2">
                    <DoorOpen className="h-16 w-16 opacity-20" />
                    <p className="font-black uppercase tracking-widest text-xs">No scan history yet</p>
                </div>
            )}
        </div>

        <div className="md:col-span-1 space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Common Ports</h3>
            <div className="space-y-2">
                {COMMON_PORTS.map((cp) => (
                    <button 
                        key={cp.port}
                        onClick={() => setPort(cp.port)}
                        className="w-full glass-card p-3 text-left hover:border-blue-600/30 transition-all group"
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-black text-xs text-blue-600">{cp.port}</span>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{cp.name}</span>
                        </div>
                        <p className="text-[9px] text-gray-400 font-bold group-hover:text-gray-600">{cp.desc}</p>
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="glass-card p-6 bg-orange-500/10 border-orange-200">
          <div className="flex gap-4">
              <ShieldAlert className="h-6 w-6 text-orange-600 shrink-0" />
              <div className="space-y-1">
                  <p className="font-black text-orange-600 text-xs uppercase tracking-widest">Security Notice</p>
                  <p className="text-xs text-orange-600/80 font-bold leading-relaxed">
                      Actual TCP port scanning cannot be performed directly from a web browser due to security restrictions (CORS and sandboxing). This tool demonstrates the UI and simulates the check. For real scanning, use command-line tools like `nmap`.
                  </p>
              </div>
          </div>
      </div>
    </div>
  );
}
