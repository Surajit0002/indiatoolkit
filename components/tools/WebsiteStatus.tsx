"use client";

import { useState } from "react";
import { Search, Globe, Activity, CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react";

export default function WebsiteStatus() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    let targetUrl = url;
    if (!targetUrl.startsWith('http')) {
        targetUrl = 'https://' + targetUrl;
    }

    setIsLoading(true);
    setError(null);
    setStatus(null);

    const startTime = Date.now();

    try {
      // Using allorigins proxy to check status and avoid CORS
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
      const data = await response.json();
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      if (data.status && data.status.http_code >= 200 && data.status.http_code < 400) {
        setStatus({
          online: true,
          code: data.status.http_code,
          responseTime,
          url: targetUrl
        });
      } else {
        setStatus({
          online: false,
          code: data.status?.http_code || 500,
          responseTime,
          url: targetUrl
        });
      }
    } catch (err) {
      setError("Failed to reach the website. It might be down or blocking requests.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="glass-card p-6 bg-white/40">
        <form onSubmit={checkStatus} className="flex gap-4">
          <div className="relative flex-1">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter Website URL (e.g., google.com)..."
              className="brutal-input pl-12"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isLoading} className="brutal-btn bg-blue-600">
            {isLoading ? "CHECKING..." : "CHECK STATUS"}
          </button>
        </form>
      </div>

      {error && (
        <div className="glass-card p-6 bg-red-500/10 border-red-200 text-red-600 font-black uppercase tracking-widest text-xs text-center">
          {error}
        </div>
      )}

      {status && (
        <div className="space-y-6">
          <div className={`glass-card p-8 text-white relative overflow-hidden transition-colors duration-500 ${status.online ? 'bg-green-600' : 'bg-red-600'}`}>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-2">Website Status</p>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter flex items-center gap-3">
                  {status.online ? <CheckCircle className="h-10 w-10" /> : <XCircle className="h-10 w-10" />}
                  {status.online ? "ONLINE" : "OFFLINE"}
                </h2>
                <p className="mt-2 font-bold text-white/80 break-all">{status.url}</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-2">Response Code</p>
                <p className="text-5xl font-black tabular-nums">{status.code}</p>
              </div>
            </div>
            <Activity className="h-32 w-32 text-white/10 absolute -right-4 -bottom-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600/10 text-blue-600 rounded-[10px]">
                        <Clock className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase text-gray-400">Response Time</p>
                        <p className="text-xl font-black tabular-nums">{status.responseTime}ms</p>
                    </div>
                </div>
            </div>
            <div className="glass-card p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600/10 text-blue-600 rounded-[10px]">
                        <ExternalLink className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase text-gray-400">Check Type</p>
                        <p className="text-xl font-black">HTTP GET</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card p-8">
         <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Common HTTP Status Codes</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CodeInfo code="200" label="OK" desc="The request was successful." color="text-green-600" />
            <CodeInfo code="404" label="Not Found" desc="The page does not exist." color="text-orange-600" />
            <CodeInfo code="500" label="Error" desc="Internal server error." color="text-red-600" />
         </div>
      </div>
    </div>
  );
}

function CodeInfo({ code, label, desc, color }: { code: string; label: string; desc: string; color: string }) {
    return (
        <div className="space-y-1">
            <div className="flex items-center gap-2">
                <span className={`font-black ${color}`}>{code}</span>
                <span className="text-xs font-black uppercase tracking-widest">{label}</span>
            </div>
            <p className="text-xs text-gray-400 font-bold">{desc}</p>
        </div>
    )
}
