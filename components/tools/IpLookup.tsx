"use client";

import { useState, useEffect } from "react";
import { Search, Globe, Shield, Wifi, Copy, Check, MapPin, Building2 } from "lucide-react";

export default function IpLookup() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const fetchIpData = async (ip: string = "") => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const result = await response.json();
      if (result.error) {
        setError(result.reason || "Invalid IP address");
        setData(null);
      } else {
        setData(result);
        if (!ip) setQuery(result.ip);
      }
    } catch (err) {
      setError("Failed to fetch IP information");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIpData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) fetchIpData(query);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="glass-card p-6 bg-white/40">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter IP Address (e.g., 8.8.8.8)..."
              className="brutal-input pl-12"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isLoading} className="brutal-btn bg-blue-600 min-w-[120px]">
            {isLoading ? "LOOKING UP..." : "LOOKUP"}
          </button>
        </form>
      </div>

      {error && (
        <div className="glass-card p-6 bg-red-500/10 border-red-200 text-red-600 font-black uppercase tracking-widest text-xs text-center">
          {error}
        </div>
      )}

      {data && (
        <div className="space-y-6">
          <div className="glass-card p-8 bg-blue-600 text-white relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-blue-200 text-xs font-black uppercase tracking-[0.2em] mb-2">Primary IP Address</p>
              <h2 className="text-5xl md:text-6xl font-black tabular-nums tracking-tighter flex items-center gap-4">
                {data.ip}
                <button 
                    onClick={() => copyToClipboard(data.ip, 'ip')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                    {copied === 'ip' ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </h2>
            </div>
            <Wifi className="h-32 w-32 text-white/10 absolute -right-4 -bottom-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard 
                icon={<Building2 className="h-5 w-5" />} 
                label="Internet Service Provider (ISP)" 
                value={data.org} 
                onCopy={() => copyToClipboard(data.org, 'isp')}
                isCopied={copied === 'isp'}
            />
            <InfoCard 
                icon={<Globe className="h-5 w-5" />} 
                label="ASN" 
                value={data.asn} 
                onCopy={() => copyToClipboard(data.asn, 'asn')}
                isCopied={copied === 'asn'}
            />
            <InfoCard 
                icon={<MapPin className="h-5 w-5" />} 
                label="Location" 
                value={`${data.city}, ${data.region}, ${data.country_name}`} 
                onCopy={() => copyToClipboard(`${data.city}, ${data.region}, ${data.country_name}`, 'loc')}
                isCopied={copied === 'loc'}
            />
            <InfoCard 
                icon={<Shield className="h-5 w-5" />} 
                label="Time Zone" 
                value={data.timezone} 
                onCopy={() => copyToClipboard(data.timezone, 'tz')}
                isCopied={copied === 'tz'}
            />
          </div>

          <div className="glass-card p-6">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Network Details</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <DetailItem label="Version" value={data.version} />
                <DetailItem label="Country Code" value={data.country_code} />
                <DetailItem label="Currency" value={data.currency} />
                <DetailItem label="Calling Code" value={data.country_calling_code} />
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ icon, label, value, onCopy, isCopied }: { icon: React.ReactNode; label: string; value: string; onCopy: () => void; isCopied: boolean }) {
  return (
    <div className="glass-card p-6 flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-600/10 text-blue-600 rounded-[10px]">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
          <p className="font-black text-lg">{value || "N/A"}</p>
        </div>
      </div>
      <button 
        onClick={onCopy}
        className="p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-lg transition-all"
      >
        {isCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-400" />}
      </button>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
            <p className="font-black">{value || "N/A"}</p>
        </div>
    )
}
