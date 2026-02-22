"use client";

import { useState } from "react";
import { Camera, Download, ExternalLink, Globe, Monitor, Smartphone, Tablet } from "lucide-react";

export default function WebsiteScreenshot() {
  const [url, setUrl] = useState("");
  const [viewport, setViewport] = useState("desktop");
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateScreenshot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    let targetUrl = url;
    if (!targetUrl.startsWith('http')) {
        targetUrl = 'https://' + targetUrl;
    }

    // WordPress mshots API
    // Format: https://s0.wp.com/mshots/v1/{url}?w={width}
    const width = viewport === "mobile" ? 375 : viewport === "tablet" ? 768 : 1280;
    const finalUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(targetUrl)}?w=${width}`;
    
    setScreenshotUrl(finalUrl);
    
    // It takes some time for mshots to generate, so we'll wait a bit
    setTimeout(() => {
        setIsLoading(false);
    }, 2000);
  };

  const downloadScreenshot = async () => {
    if (!screenshotUrl) return;
    try {
        const response = await fetch(screenshotUrl);
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `screenshot-${new Date().getTime()}.jpg`;
        link.click();
    } catch (_e) {  
        window.open(screenshotUrl, '_blank');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="glass-card p-8">
        <form onSubmit={generateScreenshot} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Website URL (e.g., apple.com)..."
                className="brutal-input pl-12"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button type="submit" disabled={isLoading} className="brutal-btn bg-blue-600 min-w-50 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  GENERATING...
                </>
              ) : (
                <>
                  <Camera className="h-5 w-5" /> CAPTURE SITE
                </>
              )}
            </button>
          </div>

          <div className="flex gap-4">
            <ViewportBtn icon={<Monitor className="h-4 w-4" />} label="Desktop" active={viewport === "desktop"} onClick={() => setViewport("desktop")} />
            <ViewportBtn icon={<Tablet className="h-4 w-4" />} label="Tablet" active={viewport === "tablet"} onClick={() => setViewport("tablet")} />
            <ViewportBtn icon={<Smartphone className="h-4 w-4" />} label="Mobile" active={viewport === "mobile"} onClick={() => setViewport("mobile")} />
          </div>
        </form>
      </div>

      {screenshotUrl && (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="glass-card p-4 bg-white/40 overflow-hidden group relative">
            <img 
              src={screenshotUrl} 
              alt="Website Screenshot" 
              className="w-full h-auto rounded-lg border border-gray-100 shadow-sm"
              onLoad={() => setIsLoading(false)}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button onClick={downloadScreenshot} className="brutal-btn bg-blue-600">
                    <Download className="h-5 w-5" />
                </button>
                <a href={screenshotUrl} target="_blank" rel="noopener noreferrer" className="brutal-btn">
                    <ExternalLink className="h-5 w-5" />
                </a>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
            Note: Screenshots may take a few seconds to refresh if the site was recently captured.
          </p>
        </div>
      )}
    </div>
  );
}

function ViewportBtn({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[10px] font-black uppercase tracking-widest text-[10px] border-2 transition-all ${
                active ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
            }`}
        >
            {icon} {label}
        </button>
    )
}
