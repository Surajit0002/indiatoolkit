"use client";

import { useState, useRef } from "react";
import { Copy, Download, Type, Palette, FileText, Globe, Phone, Mail, MapPin, Building, Zap } from "lucide-react";

export default function LetterheadDesigner() {
  const [companyName, setCompanyName] = useState("Your Company Name");
  const [tagline, setTagline] = useState("Excellence in Every Endeavor");
  const [streetAddress, setStreetAddress] = useState("123 Business Street");
  const [cityState, setCityState] = useState("City, State 12345");
  const [phone, setPhone] = useState("+1 234 567 890");
  const [email, setEmail] = useState("info@company.com");
  const [website, setWebsite] = useState("www.company.com");
  const [primaryColor, setPrimaryColor] = useState("#1E3A5F");
  const [accentColor, setAccentColor] = useState("#3B82F6");
  const [letterheadStyle, setLetterheadStyle] = useState<"modern" | "classic" | "minimal" | "bold">("modern");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const letterheadStyles = [
    { id: "modern", name: "Modern" },
    { id: "classic", name: "Classic" },
    { id: "minimal", name: "Minimal" },
    { id: "bold", name: "Bold" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(companyName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadLetterhead = () => {
    alert("Download functionality would be implemented here with html2canvas");
  };

  const getHeaderStyle = () => {
    switch (letterheadStyle) {
      case "modern":
        return "bg-gradient-to-r from-slate-800 to-slate-700";
      case "classic":
        return "bg-white border-b-4 border-slate-800";
      case "minimal":
        return "bg-white";
      case "bold":
        return "bg-gradient-to-r from-blue-600 to-blue-800";
      default:
        return "bg-slate-800";
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Letterhead Designer</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create professional letterhead templates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Company Info
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tagline</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Info
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Street Address</label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">City, State ZIP</label>
                  <input
                    type="text"
                    value={cityState}
                    onChange={(e) => setCityState(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Website</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none font-medium text-slate-700"
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Letterhead Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {letterheadStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setLetterheadStyle(style.id as typeof letterheadStyle)}
                        className={`p-3 rounded-xl border-2 transition-all text-xs ${
                          letterheadStyle === style.id
                            ? "border-blue-500 bg-blue-50"
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
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Letterhead Preview</span>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadLetterhead}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-sm hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div
                  ref={canvasRef}
                  className="w-full aspect-[8.5/11] rounded-xl shadow-2xl overflow-hidden mx-auto"
                  style={{ maxWidth: "600px" }}
                >
                  <div className="w-full h-full bg-white">
                    {/* Header */}
                    <div className={`h-24 ${getHeaderStyle()}`}>
                      <div className="h-full p-6 flex items-center justify-between">
                        <div>
                          <h1 className={`font-black text-2xl italic ${letterheadStyle === "classic" || letterheadStyle === "minimal" ? "text-slate-800" : "text-white"}`}>
                            {companyName}
                          </h1>
                          <p className={`text-sm font-medium ${letterheadStyle === "classic" || letterheadStyle === "minimal" ? "text-slate-600" : "text-white/80"}`}>
                            {tagline}
                          </p>
                        </div>
                        <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center">
                          <Building className={`h-8 w-8 ${letterheadStyle === "classic" || letterheadStyle === "minimal" ? "text-slate-400" : "text-white"}`} />
                        </div>
                      </div>
                    </div>

                    {/* Contact Bar */}
                    <div className="bg-slate-50 px-6 py-3 border-b border-slate-100">
                      <div className="flex flex-wrap items-center gap-4 text-xs">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" style={{ color: primaryColor }} />
                          {streetAddress}, {cityState}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" style={{ color: primaryColor }} />
                          {phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" style={{ color: primaryColor }} />
                          {email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" style={{ color: primaryColor }} />
                          {website}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8">
                      <div className="h-4 w-32 rounded mb-8" style={{ backgroundColor: `${primaryColor}20` }}></div>
                      
                      <div className="space-y-3 mb-8">
                        <div className="h-4 w-3/4 rounded bg-slate-100"></div>
                        <div className="h-4 w-full rounded bg-slate-100"></div>
                        <div className="h-4 w-5/6 rounded bg-slate-100"></div>
                        <div className="h-4 w-4/5 rounded bg-slate-100"></div>
                      </div>

                      <div className="h-4 w-48 rounded mb-8" style={{ backgroundColor: `${accentColor}20` }}></div>

                      <div className="space-y-3">
                        <div className="h-4 w-full rounded bg-slate-100"></div>
                        <div className="h-4 w-2/3 rounded bg-slate-100"></div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="absolute bottom-0 left-0 right-0 h-2" style={{ backgroundColor: primaryColor }}></div>
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
                    { name: "Corporate", primary: "#1E3A5F", accent: "#3B82F6" },
                    { name: "Legal", primary: "#1F2937", accent: "#6B7280" },
                    { name: "Creative", primary: "#7C3AED", accent: "#EC4899" },
                    { name: "Finance", primary: "#059669", accent: "#10B981" },
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
