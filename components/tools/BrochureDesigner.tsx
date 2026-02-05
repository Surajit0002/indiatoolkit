"use client";

import { useState, useRef } from "react";
import { Copy, Download, Type, Palette, Layout, FileText, Globe, Zap } from "lucide-react";

export default function BrochureDesigner() {
  const [companyName, setCompanyName] = useState("Your Company");
  const [tagline, setTagline] = useState("Quality You Can Trust");
  const [heading1, setHeading1] = useState("Our Services");
  const [content1, setContent1] = useState("We offer a wide range of professional services tailored to meet your needs.");
  const [heading2, setHeading2] = useState("Why Choose Us");
  const [content2, setContent2] = useState("With years of experience and a dedicated team, we deliver exceptional results.");
  const [heading3, setHeading3] = useState("Contact Us");
  const [content3, setContent3] = useState("Get in touch today and let us help you achieve your goals.");
  const [phone, setPhone] = useState("+1 234 567 890");
  const [email, setEmail] = useState("info@company.com");
  const [website, setWebsite] = useState("www.company.com");
  const [primaryColor, setPrimaryColor] = useState("#1E3A5F");
  const [accentColor, setAccentColor] = useState("#3B82F6");
  const [brochureStyle, setBrochureStyle] = useState<"tri-fold" | "bi-fold" | "z-fold">("tri-fold");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const brochureStyles = [
    { id: "tri-fold", name: "Tri-Fold", description: "Standard 3-panel brochure" },
    { id: "bi-fold", name: "Bi-Fold", description: "2-panel half-fold" },
    { id: "z-fold", name: "Z-Fold", description: "Zigzag folded brochure" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(companyName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadBrochure = () => {
    alert("Download functionality would be implemented here with html2canvas");
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Brochure Designer</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Design professional tri-fold brochures
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Globe className="h-4 w-4" />
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
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tagline</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none font-medium text-slate-700"
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Section 1 Heading</label>
                  <input
                    type="text"
                    value={heading1}
                    onChange={(e) => setHeading1(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Section 1 Content</label>
                  <textarea
                    value={content1}
                    onChange={(e) => setContent1(e.target.value)}
                    rows={2}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Section 2 Heading</label>
                  <input
                    type="text"
                    value={heading2}
                    onChange={(e) => setHeading2(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Section 2 Content</label>
                  <textarea
                    value={content2}
                    onChange={(e) => setContent2(e.target.value)}
                    rows={2}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Section 3 Heading</label>
                  <input
                    type="text"
                    value={heading3}
                    onChange={(e) => setHeading3(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Section 3 Content</label>
                  <textarea
                    value={content3}
                    onChange={(e) => setContent3(e.target.value)}
                    rows={2}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Contact Info
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Website</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none font-medium text-slate-700"
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
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Brochure Preview</span>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadBrochure}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-sm hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="p-8 overflow-auto">
                {/* Tri-Fold Brochure Preview */}
                <div className="flex gap-1 mx-auto max-w-4xl">
                  {/* Panel 1 */}
                  <div className="w-1/3 aspect-[3/4] bg-white border-2 border-slate-200 rounded-l-lg p-4 shadow-lg">
                    <div className="h-full flex flex-col">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: primaryColor }}>
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="font-black text-lg uppercase italic mb-2" style={{ color: primaryColor }}>
                        {companyName}
                      </h2>
                      <p className="text-xs font-medium mb-6" style={{ color: accentColor }}>
                        {tagline}
                      </p>
                      <h3 className="font-bold text-sm uppercase mb-2" style={{ color: primaryColor }}>
                        {heading1}
                      </h3>
                      <p className="text-xs text-slate-600">{content1}</p>
                      <div className="flex-1" />
                      <div className="border-t pt-2 mt-2">
                        <p className="text-xs font-bold" style={{ color: primaryColor }}>{phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Panel 2 */}
                  <div className="w-1/3 aspect-[3/4] bg-white border-t-2 border-b-2 border-slate-200 p-4 shadow-lg">
                    <div className="h-full flex flex-col">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: primaryColor }}>
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-black text-lg uppercase mb-3" style={{ color: primaryColor }}>
                        {heading2}
                      </h3>
                      <p className="text-xs text-slate-600 mb-6">{content2}</p>
                      
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-full h-32 rounded-lg bg-slate-100 flex items-center justify-center">
                          <span className="text-xs text-slate-400">Product Image</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Panel 3 */}
                  <div className="w-1/3 aspect-[3/4] bg-white border-2 border-slate-200 rounded-r-lg p-4 shadow-lg">
                    <div className="h-full flex flex-col">
                      <h3 className="font-black text-lg uppercase mb-3" style={{ color: primaryColor }}>
                        {heading3}
                      </h3>
                      <p className="text-xs text-slate-600 mb-4">{content3}</p>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-xs font-medium flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                          {phone}
                        </p>
                        <p className="text-xs font-medium flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                          {email}
                        </p>
                        <p className="text-xs font-medium flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                          {website}
                        </p>
                      </div>

                      <div className="flex-1" />
                      
                      <div className="w-full h-20 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: primaryColor }}>
                        <span className="text-white font-black italic text-lg">{companyName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brochure Type */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Brochure Type</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3">
                  {brochureStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setBrochureStyle(style.id as typeof brochureStyle)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        brochureStyle === style.id
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-slate-100 hover:border-slate-300"
                      }`}
                      >
                      <Layout className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">{style.name}</span>
                      <span className="block text-xs text-slate-400 mt-1">{style.description}</span>
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
