"use client";

import { useState, useEffect } from "react";
import { Chrome, Shield, Globe, Monitor, Settings, Cookie, Languages } from "lucide-react";

export default function BrowserInfo() {
  const [info, setInfo] = useState<BrowserInfoType | null>(null);

  function getBrowserName() {
    const userAgent = navigator.userAgent;
    if (userAgent.match(/chrome|chromium|crios/i)) return "Chrome";
    if (userAgent.match(/firefox|fxios/i)) return "Firefox";
    if (userAgent.match(/safari/i)) return "Safari";
    if (userAgent.match(/opr\//i)) return "Opera";
    if (userAgent.match(/edg/i)) return "Edge";
    return "Unknown";
  }

  interface BrowserInfoType {
    browser: string;
    version: string;
    platform: string;
    language: string;
    languages: string;
    cookiesEnabled: boolean;
    doNotTrack: string;
    screenResolution: string;
    windowSize: string;
    colorDepth: number;
    pixelRatio: number;
    online: boolean;
    hardwareConcurrency: number;
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInfo({
      browser: getBrowserName(),
      version: navigator.appVersion,
      platform: navigator.platform,
      language: navigator.language,
      languages: navigator.languages.join(", "),
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack || "unspecified",
      screenResolution: `${window.screen.width} x ${window.screen.height}`,
      windowSize: `${window.innerWidth} x ${window.innerHeight}`,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      online: navigator.onLine,
      hardwareConcurrency: navigator.hardwareConcurrency,
    });
  }, []);
  

  if (!info) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoTile icon={<Chrome className="h-4 w-4" />} label="Browser" value={info.browser} />
        <InfoTile icon={<Languages className="h-4 w-4" />} label="Language" value={info.language} />
        <InfoTile icon={<Cookie className="h-4 w-4" />} label="Cookies" value={info.cookiesEnabled ? "Enabled" : "Disabled"} />
        <InfoTile icon={<Monitor className="h-4 w-4" />} label="Screen" value={info.screenResolution} />
        <InfoTile icon={<Shield className="h-4 w-4" />} label="Do Not Track" value={info.doNotTrack === "1" ? "Active" : "Inactive"} />
        <InfoTile icon={<Globe className="h-4 w-4" />} label="Connection" value={info.online ? "Online" : "Offline"} color={info.online ? "text-green-600" : "text-red-600"} />
      </div>

      <div className="glass-card p-8">
        <div className="flex items-center gap-3 mb-8">
            <Settings className="h-5 w-5 text-blue-600" />
            <h3 className="text-sm font-black uppercase tracking-widest">Extended System Info</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <DetailRow label="Platform" value={info.platform} />
            <DetailRow label="Hardware Cores" value={info.hardwareConcurrency.toString()} />
            <DetailRow label="Window Size" value={info.windowSize} />
            <DetailRow label="Pixel Ratio" value={info.pixelRatio.toString()} />
            <DetailRow label="Color Depth" value={`${info.colorDepth}-bit`} />
            <DetailRow label="All Languages" value={info.languages} />
        </div>
      </div>

      <div className="glass-card p-6 bg-gray-50/50">
         <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">User Agent (Full)</p>
         <p className="text-xs font-mono break-all text-gray-500">{navigator.userAgent}</p>
      </div>
    </div>
  );
}

function InfoTile({ icon, label, value, color = "text-blue-600" }: { icon: React.ReactNode; label: string; value: string; color?: string }) {
    return (
        <div className="glass-card p-6 flex items-center gap-4 hover:scale-[1.02] transition-transform">
            <div className={`p-3 bg-blue-600/10 ${color} rounded-[10px]`}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{label}</p>
                <p className="text-lg font-black">{value}</p>
            </div>
        </div>
    )
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</span>
            <span className="font-black text-sm">{value}</span>
        </div>
    )
}
