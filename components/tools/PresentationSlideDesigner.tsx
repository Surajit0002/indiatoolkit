"use client";

import { useState, useRef } from "react";
import { Copy, Download, Type, Palette, Layout, Zap, Target, BarChart2, Lightbulb } from "lucide-react";

export default function PresentationSlideDesigner() {
  const [title, setTitle] = useState("Your Presentation Title");
  const [subtitle, setSubtitle] = useState("Add your subtitle here");
  const [bullet1, setBullet1] = useState("Key point number one");
  const [bullet2, setBullet2] = useState("Key point number two");
  const [bullet3, setBullet3] = useState("Key point number three");
  const [slideType, setSlideType] = useState<"title" | "content" | "comparison" | "quote">("title");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [accentColor, setAccentColor] = useState("#F59E0B");
  const [slideStyle, setSlideStyle] = useState<"modern" | "classic" | "bold" | "minimal">("modern");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const slideTypes = [
    { id: "title", name: "Title Slide", icon: Layout },
    { id: "content", name: "Content", icon: Target },
    { id: "comparison", name: "Comparison", icon: BarChart2 },
    { id: "quote", name: "Quote", icon: Lightbulb },
  ];

  const slideStyles = [
    { id: "modern", name: "Modern" },
    { id: "classic", name: "Classic" },
    { id: "bold", name: "Bold" },
    { id: "minimal", name: "Minimal" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSlide = () => {
    alert("Download functionality would be implemented here with html2canvas");
  };

  const getSlideStyle = () => {
    switch (slideStyle) {
      case "modern":
        return "bg-gradient-to-br from-blue-50 to-indigo-100";
      case "classic":
        return "bg-gradient-to-br from-slate-50 to-white";
      case "bold":
        return "bg-gradient-to-br from-blue-600 to-blue-800";
      case "minimal":
        return "bg-white";
      default:
        return "bg-gradient-to-br from-blue-50 to-indigo-100";
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl mb-4 shadow-lg">
            <Layout className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Presentation Slide Designer</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Design presentation slides
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
                  Slide Content
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-teal-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-teal-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                {(slideType === "content" || slideType === "comparison") && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Bullet Point 1</label>
                      <input
                        type="text"
                        value={bullet1}
                        onChange={(e) => setBullet1(e.target.value)}
                        className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-teal-500 focus:ring-0 outline-none font-medium text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Bullet Point 2</label>
                      <input
                        type="text"
                        value={bullet2}
                        onChange={(e) => setBullet2(e.target.value)}
                        className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-teal-500 focus:ring-0 outline-none font-medium text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Bullet Point 3</label>
                      <input
                        type="text"
                        value={bullet3}
                        onChange={(e) => setBullet3(e.target.value)}
                        className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-teal-500 focus:ring-0 outline-none font-medium text-slate-700"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Slide Type */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Layout className="h-4 w-4" />
                  Slide Type
                </span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-2">
                  {slideTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSlideType(type.id as typeof slideType)}
                      className={`p-3 rounded-xl border-2 transition-all flex items-center gap-2 ${
                        slideType === type.id
                          ? "border-teal-500 bg-teal-50"
                          : "border-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <type.icon className="h-5 w-5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Colors & Style */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Style & Colors
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Slide Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {slideStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSlideStyle(style.id as typeof slideStyle)}
                        className={`p-3 rounded-xl border-2 transition-all text-xs ${
                          slideStyle === style.id
                            ? "border-teal-500 bg-teal-50"
                            : "border-slate-100 hover:border-slate-300"
                        }`}
                      >
                        <span className="font-bold text-slate-700">{style.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Primary Color</label>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
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
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Slide Preview</span>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadSlide}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold text-sm hover:from-teal-600 hover:to-cyan-700 transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div
                  ref={canvasRef}
                  className="mx-auto rounded-xl shadow-2xl overflow-hidden"
                  style={{ aspectRatio: "16/9", maxWidth: "640px" }}
                >
                  <div className={`w-full h-full p-8 ${getSlideStyle()}`}>
                    {slideType === "title" && (
                      <div className="h-full flex flex-col justify-center items-center text-center">
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: primaryColor }}>
                          <Zap className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="font-black text-3xl mb-4" style={{ color: slideStyle === "modern" || slideStyle === "bold" ? "#1E3A5F" : "#1F2937" }}>
                          {title}
                        </h1>
                        <p className="font-medium text-lg" style={{ color: slideStyle === "modern" || slideStyle === "bold" ? "#475569" : "#6B7280" }}>
                          {subtitle}
                        </p>
                        <div className="mt-8 w-24 h-1 rounded-full" style={{ backgroundColor: accentColor }}></div>
                      </div>
                    )}

                    {slideType === "content" && (
                      <div className="h-full flex flex-col">
                        <div className="mb-8">
                          <h2 className="font-black text-2xl" style={{ color: primaryColor }}>{title}</h2>
                          <p className="font-medium mt-2" style={{ color: "#6B7280" }}>{subtitle}</p>
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: accentColor }}>
                              <span className="text-white text-xs font-bold">1</span>
                            </div>
                            <span className="font-medium text-slate-700">{bullet1}</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: primaryColor }}>
                              <span className="text-white text-xs font-bold">2</span>
                            </div>
                            <span className="font-medium text-slate-700">{bullet2}</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: accentColor }}>
                              <span className="text-white text-xs font-bold">3</span>
                            </div>
                            <span className="font-medium text-slate-700">{bullet3}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {slideType === "comparison" && (
                      <div className="h-full flex flex-col">
                        <div className="mb-6 text-center">
                          <h2 className="font-black text-2xl" style={{ color: primaryColor }}>{title}</h2>
                        </div>
                        <div className="flex-1 flex gap-4">
                          <div className="flex-1 p-4 rounded-xl bg-white/50">
                            <h3 className="font-bold mb-4 text-center" style={{ color: primaryColor }}>Option A</h3>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                                {bullet1}
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                                {bullet2}
                              </li>
                            </ul>
                          </div>
                          <div className="flex-1 p-4 rounded-xl bg-white/50">
                            <h3 className="font-bold mb-4 text-center" style={{ color: accentColor }}>Option B</h3>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                                {bullet1}
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                                {bullet2}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {slideType === "quote" && (
                      <div className="h-full flex flex-col justify-center items-center text-center">
                        <div className="text-6xl mb-4" style={{ color: accentColor }}>&quot;</div>
                        <h2 className="font-serif italic text-2xl mb-6" style={{ color: primaryColor }}>
                          {title}
                        </h2>
                        <p className="font-medium" style={{ color: "#6B7280" }}>
                          - {subtitle}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Templates */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Quick Templates</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { name: "Blue", primary: "#3B82F6", accent: "#F59E0B" },
                    { name: "Purple", primary: "#8B5CF6", accent: "#EC4899" },
                    { name: "Green", primary: "#10B981", accent: "#059669" },
                    { name: "Dark", primary: "#1F2937", accent: "#F59E0B" },
                  ].map((template) => (
                    <button
                      key={template.name}
                      onClick={() => {
                        setPrimaryColor(template.primary);
                        setAccentColor(template.accent);
                      }}
                      className="p-3 rounded-xl border-2 border-slate-100 hover:border-slate-300 transition-all text-center"
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: template.primary }} />
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: template.accent }} />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{template.name}</span>
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
