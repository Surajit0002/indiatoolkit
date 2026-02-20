"use client";

import { useState, useRef } from "react";
import { Copy, Download, Type, Palette, Mail, Calendar, Users, TrendingUp } from "lucide-react";

export default function NewsletterTemplateMaker() {
  const [newsletterName, setNewsletterName] = useState("Monthly Newsletter");
  const [issueNumber, setIssueNumber] = useState("Issue #12");
  const [featuredArticle, setFeaturedArticle] = useState("Featured Article Title Goes Here");
  const [articleExcerpt, setArticleExcerpt] = useState("A brief excerpt from your featured article that hooks the reader.");
  const [updateTitle, setUpdateTitle] = useState("Latest Updates");
  const [update1, setUpdate1] = useState("New feature launch");
  const [update2, setUpdate2] = useState("Community highlights");
  const [update3, setUpdate3] = useState("Upcoming events");
  const [ctaText, setCtaText] = useState("Read More");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [accentColor, setAccentColor] = useState("#10B981");
  const [newsletterStyle, setNewsletterStyle] = useState<"modern" | "classic" | "minimal" | "bold">("modern");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const newsletterStyles = [
    { id: "modern", name: "Modern" },
    { id: "classic", name: "Classic" },
    { id: "minimal", name: "Minimal" },
    { id: "bold", name: "Bold" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newsletterName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadNewsletter = () => {
    alert("Download functionality would be implemented here with html2canvas");
  };

  const getNewsletterStyle = () => {
    switch (newsletterStyle) {
      case "modern":
        return "bg-gradient-to-br from-blue-50 to-indigo-50";
      case "classic":
        return "bg-white border border-slate-200";
      case "minimal":
        return "bg-white";
      case "bold":
        return "bg-gradient-to-br from-slate-900 to-slate-800";
      default:
        return "bg-blue-50";
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mb-4 shadow-lg">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Newsletter Template Maker</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create newsletter layouts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Header Info */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Newsletter Info
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Newsletter Name</label>
                  <input
                    type="text"
                    value={newsletterName}
                    onChange={(e) => setNewsletterName(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Issue Number</label>
                  <input
                    type="text"
                    value={issueNumber}
                    onChange={(e) => setIssueNumber(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
              </div>
            </div>

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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Featured Article Title</label>
                  <input
                    type="text"
                    value={featuredArticle}
                    onChange={(e) => setFeaturedArticle(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Article Excerpt</label>
                  <textarea
                    value={articleExcerpt}
                    onChange={(e) => setArticleExcerpt(e.target.value)}
                    rows={3}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Updates Section Title</label>
                  <input
                    type="text"
                    value={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Update 1</label>
                  <input
                    type="text"
                    value={update1}
                    onChange={(e) => setUpdate1(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Update 2</label>
                  <input
                    type="text"
                    value={update2}
                    onChange={(e) => setUpdate2(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Update 3</label>
                  <input
                    type="text"
                    value={update3}
                    onChange={(e) => setUpdate3(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">CTA Button Text</label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Newsletter Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {newsletterStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setNewsletterStyle(style.id as typeof newsletterStyle)}
                        className={`p-3 rounded-xl border-2 transition-all text-xs ${
                          newsletterStyle === style.id
                            ? "border-pink-500 bg-pink-50"
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
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Newsletter Preview</span>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadNewsletter}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-sm hover:from-pink-600 hover:to-rose-700 transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div
                  ref={canvasRef}
                  className="mx-auto rounded-xl shadow-2xl overflow-hidden max-w-lg"
                >
                  <div className={`w-full ${getNewsletterStyle()}`}>
                    {/* Header */}
                    <div className="p-6 border-b border-slate-200/50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                            <Mail className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-bold text-slate-700">{newsletterName}</span>
                        </div>
                        <span className="text-xs font-medium text-slate-400">{issueNumber}</span>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>

                    {/* Featured Article */}
                    <div className="p-6">
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-4" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                        Featured
                      </div>
                      <h2 className="font-black text-xl text-slate-800 mb-3">{featuredArticle}</h2>
                      <p className="text-slate-600 mb-4">{articleExcerpt}</p>
                      <button
                        className="px-6 py-2 rounded-full font-bold text-sm text-white"
                        style={{ backgroundColor: accentColor }}
                      >
                        {ctaText}
                      </button>
                    </div>

                    {/* Updates */}
                    <div className="px-6 pb-6">
                      <h3 className="font-bold text-slate-700 mb-4">{updateTitle}</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-white/50">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${primaryColor}20` }}>
                            <TrendingUp className="h-3 w-3" style={{ color: primaryColor }} />
                          </div>
                          <span className="text-sm font-medium text-slate-700">{update1}</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-white/50">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accentColor}20` }}>
                            <Users className="h-3 w-3" style={{ color: accentColor }} />
                          </div>
                          <span className="text-sm font-medium text-slate-700">{update2}</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-white/50">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${primaryColor}20` }}>
                            <Calendar className="h-3 w-3" style={{ color: primaryColor }} />
                          </div>
                          <span className="text-sm font-medium text-slate-700">{update3}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-slate-200/50 text-center">
                      <p className="text-xs text-slate-400">
                        You&apos;re receiving this because you subscribed to {newsletterName}.
                      </p>
                      <div className="flex justify-center gap-4 mt-3 text-xs">
                        <span className="font-medium" style={{ color: primaryColor }}>Unsubscribe</span>
                        <span className="text-slate-300">|</span>
                        <span className="font-medium" style={{ color: primaryColor }}>View in Browser</span>
                      </div>
                    </div>
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
                    { name: "Corporate", primary: "#3B82F6", accent: "#10B981" },
                    { name: "Creative", primary: "#EC4899", accent: "#8B5CF6" },
                    { name: "Tech", primary: "#1F2937", accent: "#3B82F6" },
                    { name: "Nonprofit", primary: "#059669", accent: "#F59E0B" },
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
