"use client";

import { useState } from "react";
import { Search, Globe, Smartphone, Monitor } from "lucide-react";

interface SerpData {
  keyword: string;
  title: string;
  description: string;
  url: string;
  device: string;
}

export default function SerpPreviewTool() {
  const [data, setData] = useState<SerpData>({
    keyword: "best digital marketing tools",
    title: "10 Best Digital Marketing Tools for 2024 | IndiaToolkit",
    description: "Discover the top digital marketing tools to boost your online presence. Free tools, reviews, and expert recommendations.",
    url: "indiatoolkit.in/digital-marketing-tools",
    device: "Desktop"
  });

  const updateField = (field: keyof SerpData, value: string) => {
    setData({ ...data, [field]: value });
  };

  // Character limits
  const titleLimit = 60;
  const descLimitDesktop = 160;
  const descLimitMobile = 120;

  const getTitleColor = () => {
    const length = data.title.length;
    if (length === 0) return "text-slate-400";
    if (length > titleLimit) return "text-red-500";
    if (length > titleLimit - 10) return "text-amber-500";
    return "text-blue-600";
  };

  const getDescColor = () => {
    const limit = data.device === "Mobile" ? descLimitMobile : descLimitDesktop;
    const length = data.description.length;
    if (length === 0) return "text-slate-400";
    if (length > limit) return "text-red-500";
    if (length > limit - 20) return "text-amber-500";
    return "text-slate-700";
  };

  const resetForm = () => {
    setData({
      keyword: "best digital marketing tools",
      title: "10 Best Digital Marketing Tools for 2024 | IndiaToolkit",
      description: "Discover the top digital marketing tools to boost your online presence. Free tools, reviews, and expert recommendations.",
      url: "indiatoolkit.in/digital-marketing-tools",
      device: "Desktop"
    });
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4 shadow-lg">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">SERP Preview Tool</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Preview how your page appears in Google search results
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Device Toggle */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => updateField("device", "Desktop")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  data.device === "Desktop"
                    ? "bg-orange-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Monitor className="h-5 w-5" />
                Desktop
              </button>
              <button
                onClick={() => updateField("device", "Mobile")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  data.device === "Mobile"
                    ? "bg-orange-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Smartphone className="h-5 w-5" />
                Mobile
              </button>
            </div>

            {/* Fields */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Target Keyword
                </label>
                <input
                  type="text"
                  value={data.keyword}
                  onChange={(e) => updateField("keyword", e.target.value)}
                  placeholder="Enter target keyword"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-orange-500 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  Page Title
                  <span className={`text-xs font-bold ${getTitleColor()}`}>
                    ({data.title.length}/{titleLimit})
                  </span>
                </label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Your page title"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-orange-500 focus:outline-none font-medium"
                />
                {data.title.length > titleLimit && (
                  <p className="text-xs text-red-500 mt-1">
                    Title is too long and will be truncated in search results
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  Meta Description
                  <span className={`text-xs font-bold ${getDescColor()}`}>
                    ({data.description.length}/{data.device === "Mobile" ? descLimitMobile : descLimitDesktop})
                  </span>
                </label>
                <textarea
                  value={data.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Your meta description"
                  rows={3}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-orange-500 focus:outline-none font-medium resize-none"
                />
                {data.description.length > (data.device === "Mobile" ? descLimitMobile : descLimitDesktop) && (
                  <p className="text-xs text-red-500 mt-1">
                    Description is too long and will be truncated
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Page URL
                </label>
                <input
                  type="text"
                  value={data.url}
                  onChange={(e) => updateField("url", e.target.value)}
                  placeholder="https://example.com/your-page"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-orange-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetForm}
              className="w-full h-12 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all"
            >
              Reset to Defaults
            </button>
          </div>

          {/* Preview */}
          <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-t border-orange-100">
            <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Search className="h-4 w-4" />
              Google {data.device} Preview
            </p>

            <div className={`bg-white rounded-lg p-4 border border-slate-200 ${
              data.device === "Mobile" ? "max-w-sm mx-auto" : "max-w-2xl"
            }`}>
              {/* Favicon placeholder */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-slate-200 rounded-full shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  {/* URL */}
                  <p className="text-xs text-slate-600 truncate mb-1">
                    {data.url}
                  </p>
                  {/* Title */}
                  <p className={`text-lg font-medium truncate ${
                    data.title.length > titleLimit ? "text-blue-600" : "text-blue-800"
                  }`}>
                    {data.title}
                  </p>
                  {/* Description */}
                  <p className={`text-sm mt-1 line-clamp-2 ${
                    data.description.length > (data.device === "Mobile" ? descLimitMobile : descLimitDesktop)
                      ? "text-slate-500"
                      : "text-slate-600"
                  }`}>
                    {data.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Keyword Highlight Check */}
            {data.keyword && (
              <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Keyword Analysis
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className={`flex items-center gap-1 ${
                    data.title.toLowerCase().includes(data.keyword.toLowerCase())
                      ? "text-green-600"
                      : "text-red-500"
                  }`}>
                    {data.title.toLowerCase().includes(data.keyword.toLowerCase()) ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <span className="text-red-500">✗</span>
                    )}
                    Title has keyword
                  </span>
                  <span className={`flex items-center gap-1 ${
                    data.description.toLowerCase().includes(data.keyword.toLowerCase())
                      ? "text-green-600"
                      : "text-amber-500"
                  }`}>
                    {data.description.toLowerCase().includes(data.keyword.toLowerCase()) ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <span className="text-amber-500">!</span>
                    )}
                    Description has keyword
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
            <Monitor className="h-8 w-8 text-orange-600 mb-3" />
            <h3 className="font-bold text-orange-800 mb-2">Title Length</h3>
            <p className="text-sm text-orange-700">
              Keep titles under 60 characters to avoid truncation.
            </p>
          </div>
          <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
            <Smartphone className="h-8 w-8 text-red-600 mb-3" />
            <h3 className="font-bold text-red-800 mb-2">Mobile Preview</h3>
            <p className="text-sm text-red-700">
              Mobile descriptions are truncated at 120 characters.
            </p>
          </div>
          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
            <Search className="h-8 w-8 text-amber-600 mb-3" />
            <h3 className="font-bold text-amber-800 mb-2">Keyword Placement</h3>
            <p className="text-sm text-amber-700">
              Include your target keyword in title and description.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
