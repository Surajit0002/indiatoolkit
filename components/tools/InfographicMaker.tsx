"use client";

import { useState, useRef } from "react";
import { Copy, Download, Type, Palette, BarChart2, PieChart, TrendingUp, Zap, Lightbulb, Target } from "lucide-react";

export default function InfographicMaker() {
  const [title, setTitle] = useState("How Our Product Works");
  const [subtitle, setSubtitle] = useState("A step-by-step guide to getting started");
  const [step1Title, setStep1Title] = useState("Step 1: Sign Up");
  const [step1Desc, setStep1Desc] = useState("Create your free account in minutes");
  const [step2Title, setStep2Title] = useState("Step 2: Configure");
  const [step2Desc, setStep2Desc] = useState("Customize settings to fit your needs");
  const [step3Title, setStep3Title] = useState("Step 3: Launch");
  const [step3Desc, setStep3Desc] = useState("Go live and start tracking results");
  const [stat1Value, setStat1Value] = useState("500+");
  const [stat1Label, setStat1Label] = useState("Happy Customers");
  const [stat2Value, setStat2Value] = useState("99.9%");
  const [stat2Label, setStat2Label] = useState("Uptime");
  const [stat3Value, setStat3Value] = useState("24/7");
  const [stat3Label, setStat3Label] = useState("Support");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [secondaryColor, setSecondaryColor] = useState("#10B981");
  const [accentColor, setAccentColor] = useState("#F59E0B");
  const [infographicStyle, setInfographicStyle] = useState<"horizontal" | "vertical" | "circle">("horizontal");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadInfographic = () => {
    alert("Download functionality would be implemented here with html2canvas");
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <BarChart2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Infographic Maker</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Design informative infographics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Title
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Steps
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="p-3 rounded-xl bg-slate-50">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Step 1</label>
                  <input
                    type="text"
                    value={step1Title}
                    onChange={(e) => setStep1Title(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none font-bold text-slate-700 mb-2"
                  />
                  <textarea
                    value={step1Desc}
                    onChange={(e) => setStep1Desc(e.target.value)}
                    rows={2}
                    className="w-full p-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none"
                  />
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Step 2</label>
                  <input
                    type="text"
                    value={step2Title}
                    onChange={(e) => setStep2Title(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none font-bold text-slate-700 mb-2"
                  />
                  <textarea
                    value={step2Desc}
                    onChange={(e) => setStep2Desc(e.target.value)}
                    rows={2}
                    className="w-full p-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none"
                  />
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Step 3</label>
                  <input
                    type="text"
                    value={step3Title}
                    onChange={(e) => setStep3Title(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none font-bold text-slate-700 mb-2"
                  />
                  <textarea
                    value={step3Desc}
                    onChange={(e) => setStep3Desc(e.target.value)}
                    rows={2}
                    className="w-full p-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Statistics
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <input
                      type="text"
                      value={stat1Value}
                      onChange={(e) => setStat1Value(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none font-bold text-slate-700 text-center"
                    />
                    <input
                      type="text"
                      value={stat1Label}
                      onChange={(e) => setStat1Label(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none font-medium text-slate-700 text-center mt-1"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={stat2Value}
                      onChange={(e) => setStat2Value(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none font-bold text-slate-700 text-center"
                    />
                    <input
                      type="text"
                      value={stat2Label}
                      onChange={(e) => setStat2Label(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none font-medium text-slate-700 text-center mt-1"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={stat3Value}
                      onChange={(e) => setStat3Value(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none font-bold text-slate-700 text-center"
                    />
                    <input
                      type="text"
                      value={stat3Label}
                      onChange={(e) => setStat3Label(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none font-medium text-slate-700 text-center mt-1"
                    />
                  </div>
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Primary</label>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-slate-100 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Secondary</label>
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-slate-100 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Accent</label>
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-slate-100 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Infographic Preview</span>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadInfographic}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm hover:from-emerald-600 hover:to-teal-700 transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div
                  ref={canvasRef}
                  className="w-full aspect-[16/9] rounded-xl shadow-2xl overflow-hidden bg-white"
                >
                  <div className="w-full h-full p-8 bg-gradient-to-br from-slate-50 to-white">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                        {subtitle}
                      </div>
                      <h1 className="font-black text-3xl uppercase italic mb-2" style={{ color: primaryColor }}>
                        {title}
                      </h1>
                    </div>

                    {/* Steps */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                      {/* Step 1 */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl mb-2" style={{ backgroundColor: primaryColor }}>
                          1
                        </div>
                        <div className="w-32 p-3 rounded-xl bg-white shadow-lg text-center">
                          <p className="font-bold text-sm text-slate-800">{step1Title}</p>
                          <p className="text-xs text-slate-500 mt-1">{step1Desc}</p>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="text-2xl" style={{ color: secondaryColor }}>→</div>

                      {/* Step 2 */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl mb-2" style={{ backgroundColor: secondaryColor }}>
                          2
                        </div>
                        <div className="w-32 p-3 rounded-xl bg-white shadow-lg text-center">
                          <p className="font-bold text-sm text-slate-800">{step2Title}</p>
                          <p className="text-xs text-slate-500 mt-1">{step2Desc}</p>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="text-2xl" style={{ color: accentColor }}>→</div>

                      {/* Step 3 */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl mb-2" style={{ backgroundColor: accentColor }}>
                          3
                        </div>
                        <div className="w-32 p-3 rounded-xl bg-white shadow-lg text-center">
                          <p className="font-bold text-sm text-slate-800">{step3Title}</p>
                          <p className="text-xs text-slate-500 mt-1">{step3Desc}</p>
                        </div>
                      </div>
                    </div>

                    {/* Statistics */}
                    <div className="flex items-center justify-center gap-8">
                      <div className="text-center">
                        <p className="font-black text-3xl" style={{ color: primaryColor }}>{stat1Value}</p>
                        <p className="text-sm text-slate-500 font-medium">{stat1Label}</p>
                      </div>
                      <div className="w-1 h-12 bg-slate-200 rounded"></div>
                      <div className="text-center">
                        <p className="font-black text-3xl" style={{ color: secondaryColor }}>{stat2Value}</p>
                        <p className="text-sm text-slate-500 font-medium">{stat2Label}</p>
                      </div>
                      <div className="w-1 h-12 bg-slate-200 rounded"></div>
                      <div className="text-center">
                        <p className="font-black text-3xl" style={{ color: accentColor }}>{stat3Value}</p>
                        <p className="text-sm text-slate-500 font-medium">{stat3Label}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Layout Options */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Layout Style</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "horizontal", name: "Horizontal" },
                    { id: "vertical", name: "Vertical" },
                    { id: "circle", name: "Circular" },
                  ].map((layout) => (
                    <button
                      key={layout.id}
                      onClick={() => setInfographicStyle(layout.id as typeof infographicStyle)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        infographicStyle === layout.id
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <BarChart2 className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">{layout.name}</span>
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
