"use client";

import { useState, useRef } from "react";
import { Copy, Download, Palette, Award, Calendar, Trophy, Star } from "lucide-react";

export default function CertificateMaker() {
  const [certificateTitle, setCertificateTitle] = useState("Certificate of Achievement");
  const [recipientName, setRecipientName] = useState("Recipient Name");
  const [description, setDescription] = useState("is hereby awarded for outstanding performance and dedication");
  const [presentedBy, setPresentedBy] = useState("Your Organization");
  const [date, setDate] = useState("December 15, 2024");
  const [signature, setSignature] = useState("John Smith");
  const [signatureTitle, setSignatureTitle] = useState("Director");
  const [primaryColor, setPrimaryColor] = useState("#1E3A5F");
  const [accentColor, setAccentColor] = useState("#D4AF37");
  const [certificateStyle, setCertificateStyle] = useState<"classic" | "modern" | "formal" | "minimal">("classic");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const certificateStyles = [
    { id: "classic", name: "Classic" },
    { id: "modern", name: "Modern" },
    { id: "formal", name: "Formal" },
    { id: "minimal", name: "Minimal" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(recipientName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCertificate = () => {
    alert("Download functionality would be implemented here with html2canvas");
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl mb-4 shadow-lg">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Certificate Maker</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create certificates and awards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Certificate Info */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Certificate Info
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Certificate Title</label>
                  <input
                    type="text"
                    value={certificateTitle}
                    onChange={(e) => setCertificateTitle(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Recipient Name</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Organization Info */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Organization Info
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Presented By</label>
                  <input
                    type="text"
                    value={presentedBy}
                    onChange={(e) => setPresentedBy(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Signature Name</label>
                  <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Signature Title</label>
                  <input
                    type="text"
                    value={signatureTitle}
                    onChange={(e) => setSignatureTitle(e.target.value)}
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Certificate Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {certificateStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setCertificateStyle(style.id as typeof certificateStyle)}
                        className={`p-3 rounded-xl border-2 transition-all text-xs ${
                          certificateStyle === style.id
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Accent/Gold Color</label>
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
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Certificate Preview</span>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadCertificate}
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
                  className="mx-auto rounded-xl shadow-2xl overflow-hidden border-8 border-slate-100"
                  style={{ maxWidth: "600px" }}
                >
                  <div className="w-full aspect-[1.4/1] bg-white relative">
                    {/* Border Design */}
                    <div className="absolute inset-4 border-4 border-double" style={{ borderColor: `${accentColor}50` }}></div>
                    
                    {/* Inner Content */}
                    <div className="absolute inset-8 p-6 flex flex-col">
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className="flex justify-center mb-4">
                          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                            <Star className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        <h1 className="font-black text-2xl uppercase italic tracking-wider" style={{ color: primaryColor }}>
                          {certificateTitle}
                        </h1>
                        <div className="w-24 h-0.5 mx-auto mt-4" style={{ backgroundColor: accentColor }}></div>
                      </div>

                      {/* Body */}
                      <div className="flex-1 text-center">
                        <p className="text-slate-500 font-medium mb-2">This is to certify that</p>
                        <h2 className="font-black text-3xl italic mb-4" style={{ color: primaryColor, fontFamily: "serif" }}>
                          {recipientName}
                        </h2>
                        <p className="text-slate-600 mb-4">{description}</p>
                        
                        <div className="mt-4 p-4 rounded-lg inline-block" style={{ backgroundColor: `${primaryColor}10` }}>
                          <p className="font-bold" style={{ color: primaryColor }}>{presentedBy}</p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-end mt-6 pt-4 border-t border-slate-100">
                        <div className="text-center">
                          <p className="text-xs text-slate-400 mb-1 flex items-center justify-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Date
                          </p>
                          <p className="font-medium text-slate-700">{date}</p>
                        </div>

                        <div className="text-center">
                          <div className="w-20 h-12 flex items-center justify-center mb-1">
                            <div className="border-b-2 border-slate-400 w-16 font-serif italic text-lg text-slate-600">
                              {signature}
                            </div>
                          </div>
                          <p className="text-xs text-slate-400">Authorized Signature</p>
                        </div>
                      </div>

                      {/* Corner Decorations */}
                      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2" style={{ borderColor: accentColor }}></div>
                      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2" style={{ borderColor: accentColor }}></div>
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2" style={{ borderColor: accentColor }}></div>
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2" style={{ borderColor: accentColor }}></div>
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
                    { name: "Gold", primary: "#1E3A5F", accent: "#D4AF37" },
                    { name: "Silver", primary: "#1F2937", accent: "#9CA3AF" },
                    { name: "Bronze", primary: "#78350F", accent: "#CD7F32" },
                    { name: "Blue", primary: "#1E40AF", accent: "#60A5FA" },
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
