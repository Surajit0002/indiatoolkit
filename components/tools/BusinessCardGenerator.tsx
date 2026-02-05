"use client";

import { useState, useRef } from "react";
import { Copy, Download, Type, Palette, User, Building, Phone, Mail, Globe, MapPin, Briefcase } from "lucide-react";

export default function BusinessCardGenerator() {
  const [name, setName] = useState("John Doe");
  const [title, setTitle] = useState("CEO & Founder");
  const [company, setCompany] = useState("Your Company");
  const [email, setEmail] = useState("john@company.com");
  const [phone, setPhone] = useState("+1 234 567 890");
  const [website, setWebsite] = useState("www.company.com");
  const [address, setAddress] = useState("123 Business St, City, State 12345");
  const [cardStyle, setCardStyle] = useState<"modern" | "classic" | "creative" | "minimal">("modern");
  const [primaryColor, setPrimaryColor] = useState("#1E3A5F");
  const [accentColor, setAccentColor] = useState("#3B82F6");
  const [textColor, setTextColor] = useState("#ffffff");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const cardStyles = [
    { id: "modern", name: "Modern" },
    { id: "classic", name: "Classic" },
    { id: "creative", name: "Creative" },
    { id: "minimal", name: "Minimal" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${name}\n${title}\n${company}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCard = () => {
    alert("Download functionality would be implemented here with html2canvas");
  };

  const getCardStyle = () => {
    switch (cardStyle) {
      case "modern":
        return "bg-gradient-to-br from-slate-800 to-slate-900";
      case "classic":
        return "bg-gradient-to-br from-white to-slate-50 border border-slate-200";
      case "creative":
        return "bg-gradient-to-br from-purple-600 to-pink-600";
      case "minimal":
        return "bg-white border-2 border-slate-200";
      default:
        return "bg-gradient-to-br from-slate-800 to-slate-900";
    }
  };

  const getTextColor = () => {
    switch (cardStyle) {
      case "modern":
      case "creative":
        return "#ffffff";
      case "classic":
      case "minimal":
        return "#1E3A5F";
      default:
        return "#ffffff";
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Business Card Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Design professional business cards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Personal Info */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Personal Info
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Job Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-bold text-slate-700"
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Website</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700"
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Card Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {cardStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setCardStyle(style.id as typeof cardStyle)}
                        className={`p-3 rounded-xl border-2 transition-all text-xs ${
                          cardStyle === style.id
                            ? "border-amber-500 bg-amber-50"
                            : "border-slate-100 hover:border-slate-300"
                        }`}
                      >
                        <span className="font-bold text-slate-700">{style.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                {(cardStyle === "modern" || cardStyle === "creative") && (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Card Preview</span>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadCard}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm hover:from-amber-600 hover:to-orange-700 transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8 justify-center">
                  {/* Front */}
                  <div
                    ref={canvasRef}
                    className="w-[400px] h-[240px] rounded-xl shadow-2xl overflow-hidden"
                    style={{ backgroundColor: cardStyle === "minimal" || cardStyle === "classic" ? "#ffffff" : undefined }}
                  >
                    <div className={`w-full h-full p-6 ${getCardStyle()}`}>
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                              <Building className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-bold text-lg" style={{ color: getTextColor() }}>{company}</span>
                          </div>
                          <h1 className="font-black text-2xl uppercase italic leading-tight" style={{ color: getTextColor() }}>
                            {name}
                          </h1>
                          <p className="font-medium mt-1" style={{ color: getTextColor(), opacity: 0.8 }}>
                            {title}
                          </p>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p className="flex items-center gap-2" style={{ color: getTextColor() }}>
                            <Mail className="h-4 w-4" /> {email}
                          </p>
                          <p className="flex items-center gap-2" style={{ color: getTextColor() }}>
                            <Phone className="h-4 w-4" /> {phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Back */}
                  <div
                    className="w-[400px] h-[240px] rounded-xl shadow-2xl overflow-hidden"
                    style={{ backgroundColor: cardStyle === "minimal" || cardStyle === "classic" ? "#ffffff" : undefined }}
                  >
                    <div className={`w-full h-full p-6 ${getCardStyle()}`}>
                      <div className="h-full flex flex-col justify-center items-center text-center">
                        <h2 className="font-black text-xl uppercase italic mb-2" style={{ color: getTextColor() }}>
                          {company}
                        </h2>
                        <p className="font-medium mb-4" style={{ color: getTextColor(), opacity: 0.8 }}>
                          {title}
                        </p>
                        <div className="w-16 h-1 rounded-full mb-4" style={{ backgroundColor: accentColor }}></div>
                        <p className="text-sm" style={{ color: getTextColor() }}>
                          {website}
                        </p>
                        <p className="text-xs mt-1" style={{ color: getTextColor(), opacity: 0.7 }}>
                          {address}
                        </p>
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
                    { name: "Corporate", primary: "#1E3A5F", accent: "#3B82F6" },
                    { name: "Creative", primary: "#7C3AED", accent: "#EC4899" },
                    { name: "Elegant", primary: "#1F2937", accent: "#D4AF37" },
                    { name: "Fresh", primary: "#059669", accent: "#10B981" },
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
