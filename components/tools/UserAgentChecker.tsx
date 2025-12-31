"use client";

import { useState, useEffect } from "react";
import { User, Copy, Check, Info, Laptop, Smartphone, Monitor } from "lucide-react";

export default function UserAgentChecker() {
  const [ua, setUa] = useState("");
  const [copied, setCopied] = useState(false);
  const [parsed, setParsed] = useState<any>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setUa(userAgent);
    
    // Simple manual parsing for demo/basic info
    const isMobile = /Mobile|Android|iPhone/i.test(userAgent);
    const isTablet = /Tablet|iPad/i.test(userAgent);
    const browser = userAgent.includes("Chrome") ? "Chrome" : 
                    userAgent.includes("Firefox") ? "Firefox" :
                    userAgent.includes("Safari") ? "Safari" :
                    userAgent.includes("Edge") ? "Edge" : "Unknown";
    const os = userAgent.includes("Windows") ? "Windows" :
               userAgent.includes("Mac") ? "macOS" :
               userAgent.includes("Linux") ? "Linux" :
               userAgent.includes("Android") ? "Android" :
               userAgent.includes("iPhone") ? "iOS" : "Unknown";

    setParsed({ isMobile, isTablet, browser, os });
  }, []);

  const copyUa = () => {
    navigator.clipboard.writeText(ua);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="glass-card p-8 bg-blue-600 text-white relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Your User Agent String</p>
          <div className="bg-white/10 p-6 rounded-[10px] font-mono text-sm break-all leading-relaxed relative group">
            {ua}
            <button 
                onClick={copyUa}
                className="absolute top-2 right-2 p-2 bg-white/20 hover:bg-white/40 rounded-lg transition-all"
            >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <User className="h-32 w-32 text-white/10 absolute -right-4 -bottom-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UaStatCard 
            icon={parsed?.isMobile ? <Smartphone className="h-5 w-5" /> : <Monitor className="h-5 w-5" />} 
            label="Device Type" 
            value={parsed?.isMobile ? "Mobile" : parsed?.isTablet ? "Tablet" : "Desktop"} 
        />
        <UaStatCard 
            icon={<Laptop className="h-5 w-5" />} 
            label="Operating System" 
            value={parsed?.os} 
        />
        <UaStatCard 
            icon={<Info className="h-5 w-5" />} 
            label="Browser" 
            value={parsed?.browser} 
        />
      </div>

      <div className="glass-card p-8">
         <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Why is this useful?</h3>
         <p className="text-gray-500 leading-relaxed font-bold">
            The User Agent string is sent by your browser to every website you visit. It tells the server what browser you are using, what version, and what operating system. Web developers use this to optimize the experience for your specific device.
         </p>
      </div>
    </div>
  );
}

function UaStatCard({ icon, label, value }: any) {
    return (
        <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="p-3 bg-blue-600/10 text-blue-600 rounded-full mb-4">
                {icon}
            </div>
            <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{label}</p>
            <p className="text-xl font-black">{value}</p>
        </div>
    )
}
