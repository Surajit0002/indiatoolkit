"use client";

import { useState } from "react";
import { Star, Copy, Download, RefreshCw, Sparkles, Building2, Tag, Palette } from "lucide-react";

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "E-commerce",
  "Food & Beverage",
  "Fashion",
  "Real Estate",
  "Sports",
  "Entertainment",
  "Non-profit",
  "Manufacturing",
];

const logoStyles = [
  "Minimalist",
  "Modern",
  "Vintage",
  "Abstract",
  "Geometric",
  "Hand-drawn",
  "Corporate",
  "Playful",
  "Luxury",
  "Tech-focused",
];

interface LogoConcept {
  id: number;
  brandName: string;
  industry: string;
  style: string;
  tagline: string;
  color: string;
  description: string;
}

export default function AiLogoGenerator() {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("Technology");
  const [style, setStyle] = useState("Minimalist");
  const [tagline, setTagline] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [logos, setLogos] = useState<LogoConcept[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const generateLogos = async () => {
    if (!brandName.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const concepts: LogoConcept[] = [
        {
          id: Date.now(),
          brandName: brandName,
          industry: industry,
          style: style,
          tagline: tagline || "Innovation in Motion",
          color: "from-blue-500 to-indigo-600",
          description: "A clean, modern logo featuring the initial letter with a subtle tech-inspired accent.",
        },
        {
          id: Date.now() + 1,
          brandName: brandName,
          industry: industry,
          style: style,
          tagline: tagline || "Innovation in Motion",
          color: "from-purple-500 to-pink-600",
          description: "Bold typography with an abstract symbol representing growth and success.",
        },
        {
          id: Date.now() + 2,
          brandName: brandName,
          industry: industry,
          style: style,
          tagline: tagline || "Innovation in Motion",
          color: "from-emerald-500 to-teal-600",
          description: "Minimalist icon combining the brand initial with a nature-inspired curve.",
        },
        {
          id: Date.now() + 3,
          brandName: brandName,
          industry: industry,
          style: style,
          tagline: tagline || "Innovation in Motion",
          color: "from-amber-500 to-orange-600",
          description: "Dynamic logo with forward motion lines suggesting progress and energy.",
        },
      ];

      setLogos(concepts);
      setIsGenerating(false);
    }, 2000);
  };

  const copyDescription = (id: number) => {
    const logo = logos.find((l) => l.id === id);
    if (logo) {
      navigator.clipboard.writeText(`${logo.brandName} - ${logo.description}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const downloadLogo = (id: number) => {
    const link = document.createElement("a");
    link.download = `logo-concept-${id}.png`;
    link.click();
  };

  const resetForm = () => {
    setBrandName("");
    setTagline("");
    setLogos([]);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
            <Star className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Logo Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create unique logo concepts for your brand using AI
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Brand Name */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                <Building2 className="h-4 w-4 inline mr-2" />
                Brand Name
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Enter your brand name..."
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium"
              />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  <Tag className="h-4 w-4 inline mr-2" />
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium bg-white"
                >
                  {industries.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  <Palette className="h-4 w-4 inline mr-2" />
                  Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium bg-white"
                >
                  {logoStyles.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tagline */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Tagline (optional)
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Enter a tagline for your brand..."
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium"
              />
            </div>

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={generateLogos}
                disabled={!brandName.trim() || isGenerating}
                className="flex-1 h-14 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-100 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Logos
                  </>
                )}
              </button>

              <button
                onClick={resetForm}
                className="px-6 h-14 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results */}
          {logos.length > 0 && (
            <>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <h3 className="font-bold text-slate-800 uppercase text-sm mb-4">
                  Generated Concepts ({logos.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {logos.map((logo) => (
                    <div
                      key={logo.id}
                      className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-200 transition-all"
                    >
                      {/* Logo Preview */}
                      <div className={`h-32 rounded-xl bg-gradient-to-br ${logo.color} flex items-center justify-center mb-4`}>
                        <Star className="h-16 w-16 text-white" />
                      </div>

                      {/* Info */}
                      <div className="mb-4">
                        <h4 className="font-bold text-lg text-slate-800">{logo.brandName}</h4>
                        <p className="text-sm text-slate-500">{logo.description}</p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                          {logo.style}
                        </span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                          {logo.industry}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyDescription(logo.id)}
                          className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                        >
                          {copiedId === logo.id ? (
                            <span className="text-green-600">Copied!</span>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => downloadLogo(logo.id)}
                          className="flex-1 py-2 bg-amber-100 text-amber-700 rounded-xl text-sm font-bold hover:bg-amber-200 transition-all flex items-center justify-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
            <Sparkles className="h-8 w-8 text-amber-600 mb-3" />
            <h3 className="font-bold text-amber-800 mb-2">AI-Powered</h3>
            <p className="text-sm text-amber-700">
              Generate unique logo concepts based on your brand identity and industry.
            </p>
          </div>
          <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
            <Building2 className="h-8 w-8 text-orange-600 mb-3" />
            <h3 className="font-bold text-orange-800 mb-2">Industry-Aware</h3>
            <p className="text-sm text-orange-700">
              Logos tailored to your specific industry and target audience.
            </p>
          </div>
          <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
            <Palette className="h-8 w-8 text-yellow-600 mb-3" />
            <h3 className="font-bold text-yellow-800 mb-2">Multiple Styles</h3>
            <p className="text-sm text-yellow-700">
              Choose from minimalist, modern, vintage, and many more styles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
