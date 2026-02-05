"use client";

import { useState, useEffect } from "react";

interface AdBannerProps {
  position: "top" | "bottom" | "sidebar" | "in-article" | "interstitial";
  className?: string;
}

export default function AdBanner({ position, className = "" }: AdBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  useEffect(() => {
    // Check if ads are enabled
    const adsEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
    
    if (!adsEnabled) {
      setShowPlaceholder(true);
      return;
    }

    // Initialize AdSense (requires script to be loaded in layout)
    try {
      // @ts-ignore - AdSense global
      if (window.adsbygoogle) {
        // @ts-ignore
        window.adsbygoogle = window.adsbygoogle || [];
        // @ts-ignore
        window.adsbygoogle.push({});
        setIsLoaded(true);
      } else {
        setShowPlaceholder(true);
      }
    } catch {
      setShowPlaceholder(true);
    }
  }, []);

  const adSizes = {
    top: "320x50",
    bottom: "320x50",
    sidebar: "300x250",
    "in-article": "300x250",
    interstitial: "320x480",
  };

  const adFormats = {
    top: "horizontal",
    bottom: "horizontal",
    sidebar: "rectangle",
    "in-article": "rectangle",
    interstitial: "vertical",
  };

  if (showPlaceholder || !isLoaded) {
    return (
      <div
        className={`bg-slate-100 rounded-xl flex items-center justify-center ${className}`}
        style={{ height: position === "interstitial" ? "480px" : position === "sidebar" ? "250px" : "50px" }}
      >
        <div className="text-center">
          <span className="text-xs text-slate-400 uppercase tracking-widest">
            Advertisement
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXX"}
        data-ad-slot={getAdSlot(position)}
        data-ad-format={adFormats[position]}
        data-full-width-responsive="true"
      />
    </div>
  );
}

function getAdSlot(position: string): string {
  const slots: Record<string, string> = {
    top: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP || "1234567890",
    bottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM || "1234567891",
    sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || "1234567892",
    "in-article": process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE || "1234567893",
    interstitial: process.env.NEXT_PUBLIC_ADSENSE_SLOT_INTERSTITIAL || "1234567894",
  };
  return slots[position] || "1234567890";
}
