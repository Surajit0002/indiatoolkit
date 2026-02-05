"use client";

import { useState } from "react";
import { Copy, Download, Image, Type, Palette, Megaphone, Check } from "lucide-react";

interface BannerSize {
  name: string;
  width: number;
  height: number;
  label: string;
}

export default function AdBannerGenerator() {
  const [headline, setHeadline] = useState("Special Offer!");
  const [subheadline, setSubheadline] = useState("Limited time only - Save 50%");
  const [ctaText, setCtaText] = useState("Shop Now");
  const [primaryColor, setPrimaryColor] = useState("#EF4444");
  const [secondaryColor, setSecondaryColor] = useState("#FEF2F2");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [selectedSize, setSelectedSize] = useState<string>("medium");
  const [bannerStyle, setBannerStyle] = useState<"solid" | "gradient" | "image">("gradient");
  const [copied, setCopied] = useState(false);

  const bannerSizes: BannerSize[] = [
    { name: "leaderboard", width: 728, height: 90, label: "Leaderboard" },
    { name: "medium", width: 300, height: 250, label: "Medium Rectangle" },
    { name: "skyscraper", width: 160, height: 600, label: "Skyscraper" },
    { name: "wide_skyscraper", width: 160, height: 600, label: "Wide Skyscraper" },
    { name: "half_page", width: 300, height: 600, label: "Half Page" },
    { name: "large_rectangle", width: 336, height: 280, label: "Large Rectangle" },
    { name: "inline", width: 300, height: 250, label: "Inline Rectangle" },
    { name: "mobile_banner", width: 320, height: 50, label: "Mobile Banner" },
  ];

  const getSelectedSize = () => bannerSizes.find(s => s.name === selectedSize) || bannerSizes[1];

  const copyHtml = () => {
    const size = getSelectedSize();
    const html = `
<!-- ${size.label} - ${size.width}x${size.height} -->
<div style="width: ${size.width}px; height: ${size.height}px; background: ${bannerStyle === "gradient" ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` : primaryColor}; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 10px; box-sizing: border-box;">
  <h2 style="color: ${textColor}; font-size: ${size.width < 300 ? "14px" : "20px"}; font-weight: bold; margin: 0 0 5px;">${headline}</h2>
  <p style="color: ${textColor}; font-size: ${size.width < 300 ? "10px" : "14px"}; margin: 0 0 10px;">${subheadline}</p>
  <button style="background: ${textColor}; color: ${primaryColor}; padding: 8px 20px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">${ctaText}</button>
</div>`;
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4 shadow-lg">
            <Megaphone className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Ad Banner Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create display advertisements in various sizes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Type className="h-5 w-5 text-orange-500" />
                Banner Content
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="Enter your headline"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Subheadline</label>
                  <input
                    type="text"
                    value={subheadline}
                    onChange={(e) => setSubheadline(e.target.value)}
                    placeholder="Enter your subheadline"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">CTA Button Text</label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="e.g., Shop Now, Learn More"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Palette className="h-5 w-5 text-orange-500" />
                Colors & Style
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Primary</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="h-10 w-10 rounded-lg border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Secondary</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="h-10 w-10 rounded-lg border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Text Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="h-10 w-10 rounded-lg border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Style</label>
                  <select
                    value={bannerStyle}
                    onChange={(e) => setBannerStyle(e.target.value as "solid" | "gradient" | "image")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium"
                  >
                    <option value="solid">Solid</option>
                    <option value="gradient">Gradient</option>
                    <option value="image">Image Background</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Image className="h-5 w-5 text-orange-500" />
                Banner Size
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {bannerSizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${
                      selectedSize === size.name
                        ? "border-orange-500 bg-orange-50"
                        : "border-slate-200 hover:border-orange-300"
                    }`}
                  >
                    <p className="font-semibold text-sm text-slate-700">{size.label}</p>
                    <p className="text-xs text-slate-500">{size.width} × {size.height}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Image className="h-5 w-5 text-orange-500" />
                Preview
              </h3>
              
              <div className="bg-slate-100 rounded-xl p-4 overflow-auto">
                <div
                  style={{
                    width: getSelectedSize().width,
                    height: getSelectedSize().height,
                    background: bannerStyle === "gradient"
                      ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                      : primaryColor,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "10px",
                    margin: "0 auto",
                  }}
                >
                  <h2 style={{
                    color: textColor,
                    fontSize: getSelectedSize().width < 300 ? "14px" : "20px",
                    fontWeight: "bold",
                    margin: "0 0 5px",
                  }}>
                    {headline}
                  </h2>
                  <p style={{
                    color: textColor,
                    fontSize: getSelectedSize().width < 300 ? "10px" : "14px",
                    margin: "0 0 10px",
                  }}>
                    {subheadline}
                  </p>
                  <button style={{
                    background: textColor,
                    color: primaryColor,
                    padding: "8px 20px",
                    border: "none",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}>
                    {ctaText}
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                {getSelectedSize().label} • {getSelectedSize().width} × {getSelectedSize().height}px
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Copy className="h-5 w-5 text-orange-500" />
                Export
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={copyHtml}
                  className="w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copied ? "Copied HTML!" : "Copy HTML Code"}
                </button>
                <button
                  className="w-full py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download Image
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-orange-500" />
                Size Reference
              </h3>
              
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong>Leaderboard (728×90)</strong> - Top of page banners</p>
                <p><strong>Medium Rect (300×250)</strong> - Sidebar or content</p>
                <p><strong>Skyscraper (160×600)</strong> - Sidebar, full height</p>
                <p><strong>Mobile (320×50)</strong> - Mobile app/web banners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
