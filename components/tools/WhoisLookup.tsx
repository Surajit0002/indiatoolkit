"use client";

import { useState } from "react";
import { Search, Info, Calendar, ShieldCheck, Building, Globe } from "lucide-react";

export default function WhoisLookup() {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;

    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      // RDAP is a modern, HTTP-based replacement for WHOIS
      const response = await fetch(`https://rdap.org/domain/${domain.toLowerCase()}`);
      if (!response.ok) throw new Error("Domain not found or registry not supported by RDAP.");
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("WHOIS data not available for this domain via RDAP. Try a commercial service.");
    } finally {
      setIsLoading(false);
    }
  };

  const getEventDate = (name: string) => {
    const event = data?.events?.find((e: any) => e.eventAction === name);
    return event ? new Date(event.eventDate).toLocaleDateString() : "N/A";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="glass-card p-6 bg-white/40">
        <form onSubmit={lookup} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter domain (e.g., example.com)..."
              className="brutal-input pl-12"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isLoading} className="brutal-btn bg-blue-600">
            {isLoading ? "QUERYING..." : "WHOIS LOOKUP"}
          </button>
        </form>
      </div>

      {error && (
        <div className="glass-card p-6 bg-orange-500/10 border-orange-200 text-orange-600 font-black uppercase tracking-widest text-xs text-center">
          {error}
        </div>
      )}

      {data && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="glass-card p-8 bg-blue-600 text-white flex justify-between items-center">
            <div>
                <p className="text-blue-200 text-[10px] font-black uppercase tracking-widest mb-2">Registered Domain</p>
                <h2 className="text-4xl font-black uppercase tracking-tighter">{data.ldhName}</h2>
            </div>
            <div className="px-4 py-2 bg-white/20 rounded-[10px] font-black text-xs uppercase tracking-widest">
                {data.status?.[0]?.replace(/-/g, ' ') || "ACTIVE"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <WhoisCard icon={<Calendar className="h-5 w-5" />} label="Registration Date" value={getEventDate('registration')} />
            <WhoisCard icon={<ShieldCheck className="h-5 w-5" />} label="Expiration Date" value={getEventDate('expiration')} />
            <WhoisCard icon={<Building className="h-5 w-5" />} label="Registrar" value={data.entities?.[0]?.vcardArray?.[1]?.find((v: any) => v[0] === 'fn')?.[3] || "Protected"} />
            <WhoisCard icon={<Globe className="h-5 w-5" />} label="Nameservers" value={data.nameservers?.map((ns: any) => ns.ldhName).join(', ') || "N/A"} />
          </div>

          <div className="glass-card p-6">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Technical Details (RDAP)</h3>
             <pre className="text-[10px] font-mono bg-gray-50 p-4 rounded-[10px] overflow-auto max-h-[300px] text-gray-600">
                 {JSON.stringify(data, null, 2)}
             </pre>
          </div>
        </div>
      )}
    </div>
  );
}

function WhoisCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="glass-card p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-600/10 text-blue-600 rounded-[10px]">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                <p className="font-black text-lg break-all">{value}</p>
            </div>
        </div>
    )
}
