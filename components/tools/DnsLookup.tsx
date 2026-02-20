"use client";

import { useState } from "react";
import { Globe, Copy } from "lucide-react";

interface DnsRecord {
  name: string;
  type: number;
  TTL: number;
  data: string;
  typeName?: string;
}

const RECORD_TYPES = ["A", "AAAA", "MX", "TXT", "NS", "CNAME", "SOA"];

export default function DnsLookup() {
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState<DnsRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const fetchType = async (type: string) => {
        const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=${type}`, {
          headers: { Accept: "application/dns-json" },
        });
        const data = await response.json();
        return data.Answer || [];
      };

      const allResults = await Promise.all(RECORD_TYPES.map(async (type) => {
          const answers = await fetchType(type);
          return answers.map((a: DnsRecord) => ({ ...a, typeName: type }));
      }));

      const flattened = allResults.flat();
      if (flattened.length === 0) {
        setError("No DNS records found for this domain.");
      } else {
        setResults(flattened);
      }
    } catch {
      setError("Failed to fetch DNS records. Please check the domain name.");
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeName = (type: number) => {
    const map: Record<number, string> = { 1: "A", 2: "NS", 5: "CNAME", 6: "SOA", 15: "MX", 16: "TXT", 28: "AAAA" };
    return map[type] || type.toString();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="glass-card p-6 bg-white/40">
        <form onSubmit={lookup} className="flex gap-4">
          <div className="relative flex-1">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter domain (e.g., google.com)..."
              className="brutal-input pl-12"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isLoading} className="brutal-btn bg-blue-600">
            {isLoading ? "DIGGING..." : "DNS LOOKUP"}
          </button>
        </form>
      </div>

      {error && (
        <div className="glass-card p-6 bg-red-500/10 border-red-200 text-red-600 font-black uppercase tracking-widest text-xs text-center">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {results.map((record, index) => (
              <div key={index} className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-blue-600/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-16 bg-blue-600/10 text-blue-600 rounded-[10px] flex items-center justify-center font-black text-xs">
                    {getTypeName(record.type)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Content / Value</p>
                    <p className="font-black break-all">{record.data}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 md:text-right">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">TTL</p>
                        <p className="font-black tabular-nums text-sm">{record.TTL}s</p>
                    </div>
                    <button 
                        onClick={() => navigator.clipboard.writeText(record.data)}
                        className="p-3 bg-gray-50 hover:bg-blue-600 hover:text-white rounded-[10px] transition-all"
                    >
                        <Copy className="h-4 w-4" />
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
