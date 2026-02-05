"use client";

import { useState, useRef } from "react";
import { Copy, Download, Type, Palette, Layout, Zap } from "lucide-react";

export default function BannerDesigner() {
  const [mainText, setMainText] = useState("Create Your Banner");
  const [subText, setSubText] = useState("Attractive headline goes here");
  const [ctaText, setCtaText] = useState("Shop Now");
  const [mainColor, setMainColor] = useState("#3B82F6");
  const [accentColor, setAccentColor] = useState("#F59E0B");
  const [textColor, setTextColor] = useState("#ffffff");
  const [bannerStyle, setBannerStyle] = useState<"modern" | "classic" | "bold" | "minimal">("modern");
  const [bannerSize, setBannerSize] = useState<string>("leaderboard");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const bannerSizes = [
    { id: "leaderboard", name: "Leaderboard", width: 728, height: 90 },
    { id: "skyscraper", name: "Skyscraper", width: 160, height: 600 },
    { id: "rectangle", name: "Rectangle", width: 300, height: 250 },
    { id: "large_rectangle", name: "Large Rectangle", width: 336, height: 280 },
    { id: "half_page", name: "Half Page", width: 300, height: 600 },
    { id: "billboard", name: "Billboard", width: 970, height: 250 },
    { id: "portrait", name: "Portrait", width: 300, height: 1050 },
    { id: "mobile_banner", name: "Mobile Banner", width: 320, height: 50 },
  ];

  const bannerStyles = [
    { id: "modern", name: "Modern" },
    { id: "classic", name: "Classic" },
    { id: "bold", name: "Bold" },
    { id: "minimal", name: "Minimal" },
  ];

  const getCurrentSize = () => {
    return bannerSizes.find((s) => s.id === bannerSize) || bannerSizes[0];
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadBanner = () => {
    alert("Download functionality would be implemented here with html2canvas");
  };

  const getBannerStyle = () => {
    switch (bannerStyle) {
      case "modern":
        return "bg-gradient-to-r from-blue-500 to-purple-600";
      case "classic":
        return "bg-gradient-to-br from-slate-100 to-slate-200";
      case "bold":
        return "bg-gradient-to-r from-orange-500 to-red-600";
      case "minimal":
        return "bg-white border-2 border-slate-200";
      default:
        return "bg-gradient-to-r from-blue-500 to-purple-600";
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <Layout className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Banner Designer</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Design professional web banners and advertisements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Content */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Content
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Main Text</label>
                  <input
                    type="text"
                    value={mainText}
                    onChange={(e) => setMainText(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-green-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Sub Text</label>
                  <input
                    type="text"
                    value={subText}
                    onChange={(e) => setSubText(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-green-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">CTA Button Text</label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-green-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Colors
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Main Color</label>
                  <input
                    type="color"
                    value={mainColor}
                    onChange={(e) => setMainColor(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-slate-100 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Accent Color</label>
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-slate-100 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Text Color</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-slate-100 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Style & Size */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Style & Size
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Banner Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {bannerStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setBannerStyle(style.id as typeof bannerStyle)}
                        className={`p-3 rounded-xl border-2 transition-all text-xs ${
                          bannerStyle === style.id
                            ? "border-green-500 bg-green-50"
                            : "border-slate-100 hover:border-slate-300"
                        }`}
                      >
                        <span className="font-bold text-slate-700">{style.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Banner Size</label>
                  <select
                    value={bannerSize}
                    onChange={(e) => setBannerSize(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-green-500 focus:ring-0 outline-none font-medium text-slate-700"
                  >
                    {bannerSizes.map((size) => (
                      <option key={size.id} value={size.id}>
                        {size.name} ({size.width}x{size.height})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Banner Preview</span>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadBanner}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm hover:from-green-600 hover:to-emerald-700 transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="p-8 overflow-auto">
                <div
                  ref={canvasRef}
                  className="mx-auto rounded-xl border-2 border-slate-200 overflow-hidden flex items-center"
                  style={{
                    width: `${getCurrentSize().width}px`,
                    height: `${getCurrentSize().height}px`,
                    maxWidth: "100%",
                  }}
                >
                  <div className={`w-full h-full p-6 ${getBannerStyle()}`}>
                    <div className="h-full flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h1
                          className="font-black uppercase italic leading-tight"
                          style={{ fontSize: `${Math.min(32, getCurrentSize().width / 15)}px`, color: textColor }}
                        >
                          {mainText}
                        </h1>
                        <p
                          className="font-medium mt-2"
                          style={{ fontSize: `${Math.min(16, getCurrentSize().width / 25)}px`, color: textColor }}
                        >
                          {subText}
                        </p>
                      </div>
                      <button
                        className="px-6 py-3 rounded-full font-bold text-sm shadow-lg"
                        style={{ backgroundColor: accentColor, color: "#ffffff" }}
                      >
                        {ctaText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Sizes */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Quick Size Selection</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-4 gap-2">
                  {bannerSizes.slice(0, 8).map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setBannerSize(size.id)}
                      className={`p-3 rounded-xl border-2 transition-all text-center ${
                        bannerSize === size.id
                          ? "border-green-500 bg-green-50"
                          : "border-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-700 block">{size.name}</span>
                      <span className="text-xs text-slate-400">{size.width}x{size.height}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
