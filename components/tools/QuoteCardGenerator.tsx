"use client";

import { useState, useRef } from "react";
import { Copy, Download, Type, Palette, Quote, User, MessageSquare, Heart, Sparkles } from "lucide-react";

export default function QuoteCardGenerator() {
  const [quote, setQuote] = useState("The only way to do great work is to love what you do.");
  const [author, setAuthor] = useState("Steve Jobs");
  const [attribution, setAttribution] = useState("Co-founder of Apple");
  const [primaryColor, setPrimaryColor] = useState("#1E3A5F");
  const [accentColor, setAccentColor] = useState("#F59E0B");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [quoteStyle, setQuoteStyle] = useState<"minimal" | "bold" | "elegant" | "modern">("modern");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const quoteStyles = [
    { id: "minimal", name: "Minimal" },
    { id: "bold", name: "Bold" },
    { id: "elegant", name: "Elegant" },
    { id: "modern", name: "Modern" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(quote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQuote = () => {
    alert("Download functionality would be implemented here with html2canvas");
  };

  const getQuoteStyle = () => {
    switch (quoteStyle) {
      case "minimal":
        return "bg-white border border-slate-200";
      case "bold":
        return "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700";
      case "elegant":
        return "bg-gradient-to-br from-rose-50 via-white to-amber-50";
      case "modern":
        return "bg-gradient-to-br from-blue-50 via-white to-indigo-50";
      default:
        return "bg-gradient-to-br from-blue-50 to-indigo-50";
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Quote className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Quote Card Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create quote graphics for social media
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quote Content */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Quote Content
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Quote</label>
                  <textarea
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    rows={4}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Author Name</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Attribution (Optional)</label>
                  <input
                    type="text"
                    value={attribution}
                    onChange={(e) => setAttribution(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-violet-500 focus:ring-0 outline-none font-medium text-slate-700"
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Quote Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {quoteStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setQuoteStyle(style.id as typeof quoteStyle)}
                        className={`p-3 rounded-xl border-2 transition-all text-xs ${
                          quoteStyle === style.id
                            ? "border-violet-500 bg-violet-50"
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
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Background Color</label>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
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
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Quote Card Preview</span>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadQuote}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold text-sm hover:from-violet-600 hover:to-purple-700 transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  {/* Square Version */}
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 text-center">Square (1:1)</p>
                    <div
                      ref={canvasRef}
                      className="mx-auto rounded-xl shadow-2xl overflow-hidden"
                      style={{ aspectRatio: "1/1", maxWidth: "300px", backgroundColor: bgColor }}
                    >
                      <div className={`w-full h-full p-6 ${getQuoteStyle()}`}>
                        <div className="h-full flex flex-col">
                          {/* Quote Icon */}
                          <div className="mb-4">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${primaryColor}20` }}
                            >
                              <Quote className="h-6 w-6" style={{ color: primaryColor }} />
                            </div>
                          </div>
                          
                          {/* Quote Text */}
                          <div className="flex-1 flex items-center">
                            <p 
                              className="font-serif italic leading-relaxed"
                              style={{ 
                                fontSize: quote.length > 100 ? "16px" : "20px",
                                color: quoteStyle === "bold" ? "#ffffff" : primaryColor
                              }}
                            >
                              "{quote.length > 150 ? quote.substring(0, 150) + "..." : quote}"
                            </p>
                          </div>
                          
                          {/* Author */}
                          <div className="mt-4 pt-4 border-t border-current opacity-30"></div>
                          <div className="mt-4">
                            <p 
                              className="font-bold"
                              style={{ 
                                color: quoteStyle === "bold" ? "#ffffff" : primaryColor,
                                fontSize: "14px"
                              }}
                            >
                              — {author}
                            </p>
                            {attribution && (
                              <p 
                                className="text-xs mt-1 opacity-70"
                                style={{ color: quoteStyle === "bold" ? "#ffffff" : primaryColor }}
                              >
                                {attribution}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Portrait Version */}
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 text-center">Portrait (4:5)</p>
                    <div
                      className="mx-auto rounded-xl shadow-2xl overflow-hidden"
                      style={{ aspectRatio: "4/5", maxWidth: "300px", backgroundColor: bgColor }}
                    >
                      <div className={`w-full h-full p-6 ${getQuoteStyle()}`}>
                        <div className="h-full flex flex-col">
                          {/* Quote Icon */}
                          <div className="mb-4">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${accentColor}20` }}
                            >
                              <Sparkles className="h-6 w-6" style={{ color: accentColor }} />
                            </div>
                          </div>
                          
                          {/* Quote Text */}
                          <div className="flex-1 flex items-center">
                            <p 
                              className="font-serif italic leading-relaxed"
                              style={{ 
                                fontSize: quote.length > 100 ? "18px" : "22px",
                                color: quoteStyle === "bold" ? "#ffffff" : primaryColor
                              }}
                            >
                              "{quote}"
                            </p>
                          </div>
                          
                          {/* Author */}
                          <div className="mt-6 pt-4 border-t border-current opacity-30"></div>
                          <div className="mt-4">
                            <p 
                              className="font-bold"
                              style={{ 
                                color: quoteStyle === "bold" ? "#ffffff" : accentColor,
                                fontSize: "14px"
                              }}
                            >
                              — {author}
                            </p>
                            {attribution && (
                              <p 
                                className="text-xs mt-1 opacity-70"
                                style={{ color: quoteStyle === "bold" ? "#ffffff" : primaryColor }}
                              >
                                {attribution}
                              </p>
                            )}
                          </div>
                        </div>
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
                    { name: "Dark", primary: "#1F2937", accent: "#F59E0B", bg: "#1F2937" },
                    { name: "Light", primary: "#1E3A5F", accent: "#3B82F6", bg: "#ffffff" },
                    { name: "Warm", primary: "#7C2D12", accent: "#F59E0B", bg: "#FFFBEB" },
                    { name: "Cool", primary: "#1E3A5F", accent: "#06B6D4", bg: "#ECFEFF" },
                  ].map((template) => (
                    <button
                      key={template.name}
                      onClick={() => {
                        setPrimaryColor(template.primary);
                        setAccentColor(template.accent);
                        setBgColor(template.bg);
                      }}
                      className="p-3 rounded-xl border-2 border-slate-100 hover:border-slate-300 transition-all text-center"
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: template.primary }} />
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: template.accent }} />
                        <div className="w-6 h-6 rounded-full border border-slate-200" style={{ backgroundColor: template.bg }} />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{template.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Quotes */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Quick Quotes</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
                    { quote: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
                    { quote: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
                    { quote: "Do not go where the path may lead, go instead where there is no path.", author: "Ralph Waldo Emerson" },
                  ].map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setQuote(q.quote);
                        setAuthor(q.author);
                      }}
                      className="p-3 rounded-xl border-2 border-slate-100 hover:border-violet-500 hover:bg-violet-50 transition-all text-left"
                    >
                      <p className="text-xs font-medium text-slate-700 line-clamp-2 mb-1">"{q.quote}"</p>
                      <p className="text-xs text-slate-400">— {q.author}</p>
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
