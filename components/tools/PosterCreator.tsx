"use client";

import { useState, useRef } from "react";
import { Copy, Download, Type, Palette, Image, Square, Sparkles, Megaphone } from "lucide-react";

interface PosterTemplate {
  id: string;
  name: string;
  layout: "center" | "left" | "split" | "overlay";
  bgPattern: string;
}

export default function PosterCreator() {
  const [title, setTitle] = useState("Create Your Poster");
  const [subtitle, setSubtitle] = useState("Add a compelling subtitle here");
  const [description, setDescription] = useState("Add more details about your event or promotion.");
  const [ctaText, setCtaText] = useState("Learn More");
  const [titleColor, setTitleColor] = useState("#1E3A5F");
  const [subtitleColor, setSubtitleColor] = useState("#3B82F6");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [accentColor, setAccentColor] = useState("#F59E0B");
  const [template, setTemplate] = useState<string>("modern");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const templates: PosterTemplate[] = [
    { id: "modern", name: "Modern", layout: "center", bgPattern: "gradient" },
    { id: "bold", name: "Bold", layout: "left", bgPattern: "solid" },
    { id: "elegant", name: "Elegant", layout: "center", bgPattern: "subtle" },
    { id: "vibrant", name: "Vibrant", layout: "split", bgPattern: "gradient" },
    { id: "minimal", name: "Minimal", layout: "overlay", bgPattern: "solid" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPoster = () => {
    alert("Download functionality would be implemented here with html2canvas");
  };

  const getBgStyle = (pattern: string) => {
    switch (pattern) {
      case "gradient":
        return "bg-gradient-to-br from-blue-50 via-white to-amber-50";
      case "solid":
        return "bg-slate-100";
      case "subtle":
        return "bg-gradient-to-r from-slate-50 to-white";
      case "overlay":
        return "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <Megaphone className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Poster Creator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Design eye-catching posters for events and promotions
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-purple-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-purple-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-purple-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">CTA Button Text</label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-purple-500 focus:ring-0 outline-none font-bold text-slate-700"
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Title Color</label>
                  <input
                    type="color"
                    value={titleColor}
                    onChange={(e) => setTitleColor(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-slate-100 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Subtitle Color</label>
                  <input
                    type="color"
                    value={subtitleColor}
                    onChange={(e) => setSubtitleColor(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-slate-100 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Background</label>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
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

            {/* Template */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Square className="h-4 w-4" />
                  Template
                </span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-2">
                  {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTemplate(t.id)}
                      className={`p-3 rounded-xl border-2 transition-all text-xs font-bold ${
                        template === t.id
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-slate-100 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Poster Preview</span>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadPoster}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-sm hover:from-purple-600 hover:to-pink-700 transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div
                  ref={canvasRef}
                  className="w-full aspect-[3/4] rounded-xl border-2 border-slate-200 overflow-hidden"
                  style={{ backgroundColor: bgColor }}
                >
                  <div className={`w-full h-full p-8 ${getBgStyle(templates.find(t => t.id === template)?.bgPattern || "solid")}`}>
                    <div className="h-full flex flex-col justify-center items-center text-center gap-6">
                      <div className="flex items-center justify-center w-20 h-20 rounded-full" style={{ backgroundColor: accentColor }}>
                        <Sparkles className="h-10 w-10 text-white" />
                      </div>
                      <div>
                        <h1 className="font-black uppercase italic" style={{ fontSize: "48px", color: titleColor }}>
                          {title}
                        </h1>
                        <h2 className="font-bold mt-2" style={{ fontSize: "24px", color: subtitleColor }}>
                          {subtitle}
                        </h2>
                      </div>
                      <p className="font-medium text-slate-600 max-w-md">
                        {description}
                      </p>
                      <button
                        className="px-8 py-3 rounded-full font-bold text-white"
                        style={{ backgroundColor: accentColor }}
                      >
                        {ctaText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Size Options */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Poster Sizes</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { name: "Instagram", size: "1080x1080" },
                    { name: "Story", size: "1080x1920" },
                    { name: "Facebook", size: "1200x630" },
                    { name: "A4", size: "2480x3508" },
                  ].map((size) => (
                    <button
                      key={size.name}
                      className="p-3 rounded-xl border-2 border-slate-100 hover:border-slate-300 transition-all text-center"
                    >
                      <span className="text-xs font-bold text-slate-700">{size.name}</span>
                      <span className="block text-xs text-slate-400 mt-1">{size.size}</span>
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
