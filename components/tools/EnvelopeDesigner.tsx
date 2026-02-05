"use client";

import { useState, useRef } from "react";
import { Copy, Download, Type, Palette, Mail, MapPin, Building, Zap } from "lucide-react";

export default function EnvelopeDesigner() {
  const [companyName, setCompanyName] = useState("Your Company");
  const [senderName, setSenderName] = useState("Sender Name");
  const [streetAddress, setStreetAddress] = useState("123 Business Street");
  const [cityStateZip, setCityStateZip] = useState("City, State 12345");
  const [returnAddress, setReturnAddress] = useState("Return Address Here");
  const [primaryColor, setPrimaryColor] = useState("#1E3A5F");
  const [accentColor, setAccentColor] = useState("#3B82F6");
  const [envelopeStyle, setEnvelopeStyle] = useState<"window" | "plain" | "professional" | "formal">("professional");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const envelopeStyles = [
    { id: "professional", name: "Professional" },
    { id: "formal", name: "Formal" },
    { id: "window", name: "Window" },
    { id: "plain", name: "Plain" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(companyName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadEnvelope = () => {
    alert("Download functionality would be implemented here with html2canvas");
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl mb-4 shadow-lg">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Envelope Designer</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Design custom envelopes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Sender Info */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Sender Info
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Sender Name</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Street Address</label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">City, State ZIP</label>
                  <input
                    type="text"
                    value={cityStateZip}
                    onChange={(e) => setCityStateZip(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Return Address Text</label>
                  <input
                    type="text"
                    value={returnAddress}
                    onChange={(e) => setReturnAddress(e.target.value)}
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Envelope Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {envelopeStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setEnvelopeStyle(style.id as typeof envelopeStyle)}
                        className={`p-3 rounded-xl border-2 transition-all text-xs ${
                          envelopeStyle === style.id
                            ? "border-amber-500 bg-amber-50"
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
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Envelope Preview</span>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadEnvelope}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold text-sm hover:from-amber-600 hover:to-yellow-700 transition-all flex items-center gap-2"
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
                  style={{ maxWidth: "600px" }}
                >
                  {/* Envelope Body */}
                  <div className="w-full aspect-[9.5/4.125] bg-white border-2 border-slate-200 relative">
                    {/* Texture */}
                    <div className="absolute inset-0 opacity-5" style={{ backgroundColor: primaryColor }}></div>

                    {/* Return Address */}
                    <div className="absolute top-8 left-8 w-48">
                      <p className="font-bold text-sm text-slate-700">{companyName}</p>
                      <p className="font-medium text-xs text-slate-600">{senderName}</p>
                      <p className="font-medium text-xs text-slate-600">{streetAddress}</p>
                      <p className="font-medium text-xs text-slate-600">{cityStateZip}</p>
                      <div className="mt-2 text-xs font-medium" style={{ color: accentColor }}>
                        {returnAddress}
                      </div>
                    </div>

                    {/* Logo Placeholder */}
                    <div className="absolute top-8 right-8 w-16 h-16 rounded-lg border-2 border-slate-200 flex items-center justify-center">
                      <Building className="h-8 w-8 text-slate-300" />
                    </div>

                    {/* Stamp Area */}
                    <div className="absolute top-8 right-1/2 transform translate-x-32 w-20 h-24 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-slate-400">Stamp</span>
                    </div>

                    {/* Decorative Line */}
                    <div className="absolute bottom-8 left-8 right-8 h-0.5 rounded-full" style={{ backgroundColor: `${primaryColor}30` }}></div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-4 left-8 right-8 flex justify-between text-xs text-slate-400">
                      <span>{companyName}</span>
                      <span className="font-medium" style={{ color: accentColor }}>{returnAddress}</span>
                    </div>

                    {/* Envelope Flap Lines */}
                    <div className="absolute top-0 left-0 right-0 h-16">
                      <svg className="w-full h-full" viewBox="0 0 600 100" preserveAspectRatio="none">
                        <path
                          d="M0 0 L300 80 L600 0"
                          fill="none"
                          stroke={primaryColor}
                          strokeWidth="0.5"
                          opacity="0.2"
                        />
                      </svg>
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
                    { name: "Business", primary: "#1E3A5F", accent: "#3B82F6" },
                    { name: "Legal", primary: "#1F2937", accent: "#6B7280" },
                    { name: "Creative", primary: "#7C3AED", accent: "#EC4899" },
                    { name: "Formal", primary: "#000000", accent: "#D4AF37" },
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
