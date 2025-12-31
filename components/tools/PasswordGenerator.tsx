"use client";

import { useState, useCallback, useEffect } from "react";
import { Copy, RefreshCw, Check, Shield, ShieldAlert, ShieldCheck } from "lucide-react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = "";
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let nums = "0123456789";
    let symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (excludeSimilar) {
      upper = upper.replace(/[IO]/g, "");
      lower = lower.replace(/[ilo]/g, "");
      nums = nums.replace(/[01]/g, "");
    }

    if (includeUppercase) charset += upper;
    if (includeLowercase) charset += lower;
    if (includeNumbers) charset += nums;
    if (includeSymbols) charset += symbols;

    if (charset === "") return;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    setPassword(generatedPassword);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (length < 8) return { label: "WEAK", color: "text-red-600", bg: "bg-red-600", icon: <ShieldAlert className="h-4 w-4" /> };
    if (length < 12) return { label: "MEDIUM", color: "text-yellow-600", bg: "bg-yellow-600", icon: <Shield className="h-4 w-4" /> };
    return { label: "STRONG", color: "text-green-600", bg: "bg-green-600", icon: <ShieldCheck className="h-4 w-4" /> };
  };

  const strength = getStrength();

  return (
    <div className="space-y-8">
      <div className="brutal-card p-6 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-2xl md:text-3xl font-mono font-black break-all tracking-tight">
            {password || "CLICK GENERATE"}
          </span>
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={generatePassword}
              className="flex-1 md:flex-none p-3 bg-white text-black border-2 border-black rounded-[8px] hover:bg-gray-200 transition-all"
            >
              <RefreshCw className="h-6 w-6" />
            </button>
            <button
              onClick={handleCopy}
              className="flex-1 md:flex-none p-3 bg-blue-600 text-white border-2 border-black rounded-[8px] hover:bg-blue-700 transition-all"
            >
              {copied ? <Check className="h-6 w-6" /> : <Copy className="h-6 w-6" />}
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${strength.bg} border border-white`}></div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${strength.color} bg-white px-2 py-0.5 rounded-sm`}>
             {strength.label} PASSWORD
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="brutal-card p-6">
            <label className="block text-xs font-black uppercase tracking-widest mb-4">Password Length: {length}</label>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black border-2 border-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <BrutalOption label="UPPERCASE" active={includeUppercase} onClick={() => setIncludeUppercase(!includeUppercase)} />
            <BrutalOption label="LOWERCASE" active={includeLowercase} onClick={() => setIncludeLowercase(!includeLowercase)} />
            <BrutalOption label="NUMBERS" active={includeNumbers} onClick={() => setIncludeNumbers(!includeNumbers)} />
            <BrutalOption label="SYMBOLS" active={includeSymbols} onClick={() => setIncludeSymbols(!includeSymbols)} />
          </div>
          
          <BrutalOption 
            label="EXCLUDE SIMILAR (i, l, 1, L, o, 0, O)" 
            active={excludeSimilar} 
            onClick={() => setExcludeSimilar(!excludeSimilar)} 
          />
        </div>

        <div className="brutal-card p-6 bg-yellow-300 flex flex-col justify-center">
          <h4 className="text-black font-black mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5" /> SECURITY ALERT
          </h4>
          <p className="text-sm text-black leading-tight font-bold">
            NEVER USE THE SAME PASSWORD FOR MULTIPLE ACCOUNTS. USE A PASSWORD MANAGER TO STORE YOUR SECURE PASSWORDS.
          </p>
        </div>
      </div>
    </div>
  );
}

function BrutalOption({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between p-4 border-2 border-black rounded-[8px] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
        active ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <span className="text-[10px] font-black uppercase tracking-tight text-left">{label}</span>
      <div className={`h-4 w-4 rounded-sm border-2 ${active ? "bg-white border-white" : "bg-gray-100 border-black"} flex items-center justify-center`}>
        {active && <Check className="h-3 w-3 text-black stroke-[4]" />}
      </div>
    </button>
  );
}
