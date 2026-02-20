"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Sparkles, Palette, ArrowRightLeft } from "lucide-react";

// Font pairing data
const fontPairings = {
  serif: {
    headings: ["Playfair Display", "Merriweather", "Lora", "Libre Baskerville", "Crimson Text"],
    body: ["Source Sans Pro", "Open Sans", "Lato", "Roboto", "Montserrat"],
    pairings: [
      { heading: "Playfair Display", body: "Source Sans Pro", style: "Elegant & Modern" },
      { heading: "Merriweather", body: "Open Sans", style: "Classic & Readable" },
      { heading: "Lora", body: "Lato", style: "Contemporary & Clean" },
      { heading: "Libre Baskerville", body: "Montserrat", style: "Traditional & Bold" },
      { heading: "Crimson Text", body: "Roboto", style: "Sophisticated & Minimal" },
    ]
  },
  sans: {
    headings: ["Montserrat", "Oswald", "Raleway", "Poppins", "Work Sans"],
    body: ["Open Sans", "Lato", "Roboto", "Source Sans Pro", "Inter"],
    pairings: [
      { heading: "Montserrat", body: "Open Sans", style: "Bold & Balanced" },
      { heading: "Oswald", body: "Lato", style: "Strong & Clean" },
      { heading: "Raleway", body: "Roboto", style: "Elegant & Versatile" },
      { heading: "Poppins", body: "Inter", style: "Modern & Minimal" },
      { heading: "Work Sans", body: "Source Sans Pro", style: "Professional & Clear" },
    ]
  },
  display: {
    headings: ["Abril Fatface", "Bebas Neue", "Lobster", "Pacifico", "Righteous"],
    body: ["Lato", "Open Sans", "Roboto", "Source Sans Pro", "Montserrat"],
    pairings: [
      { heading: "Abril Fatface", body: "Lato", style: "Editorial & Chic" },
      { heading: "Bebas Neue", body: "Open Sans", style: "Impactful & Clean" },
      { heading: "Lobster", body: "Roboto", style: "Playful & Professional" },
      { heading: "Pacifico", body: "Montserrat", style: "Casual & Friendly" },
      { heading: "Righteous", body: "Source Sans Pro", style: "Creative & Legible" },
    ]
  },
  mono: {
    headings: ["Space Mono", "IBM Plex Mono", "Courier Prime", "Inconsolata", "Fira Code"],
    body: ["Inter", "Open Sans", "Roboto", "Lato", "Source Sans Pro"],
    pairings: [
      { heading: "Space Mono", body: "Inter", style: "Tech & Modern" },
      { heading: "IBM Plex Mono", body: "Open Sans", style: "Developer & Clean" },
      { heading: "Courier Prime", body: "Roboto", style: "Retro & Professional" },
      { heading: "Inconsolata", body: "Lato", style: "Code & Readable" },
      { heading: "Fira Code", body: "Source Sans Pro", style: "Programmer & Sharp" },
    ]
  }
};

export default function FontPairGenerator() {
  const [primaryFont, setPrimaryFont] = useState("");
  const [previewText, setPreviewText] = useState("The quick brown fox jumps over the lazy dog");
  const [copied, setCopied] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("all");

  const availableFonts = useMemo(() => {
    const fonts = new Set<string>();
    Object.values(fontPairings).forEach((category) => {
      category.headings.forEach((f) => fonts.add(f));
      category.body.forEach((f) => fonts.add(f));
    });
    return Array.from(fonts).sort();
  }, []);

  const suggestedPairings = useMemo(() => {
    if (!primaryFont) return [];
    
    const pairings: Array<{ heading: string; body: string; style: string; category: string }> = [];
    
    Object.entries(fontPairings).forEach(([category, data]) => {
      if (data.headings.includes(primaryFont)) {
        data.pairings.filter(p => p.heading === primaryFont).forEach((p) => {
          pairings.push({ ...p, category });
        });
      }
      if (data.body.includes(primaryFont)) {
        data.pairings.filter(p => p.body === primaryFont).forEach((p) => {
          pairings.push({ ...p, category });
        });
      }
    });
    
    return pairings;
  }, [primaryFont]);

  const filteredPairings = suggestedPairings.filter(p => 
    selectedStyle === "all" || p.category === selectedStyle
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateCSS = (heading: string, body: string) => {
    return `/* Font Pairing: ${heading} + ${body} */
@import url('https://fonts.googleapis.com/css2?family=${heading.replace(/ /g, '+')}&family=${body.replace(/ /g, '+')}&display=swap');

h1, h2, h3, h4, h5, h6 {
  font-family: '${heading}', serif;
}

body, p {
  font-family: '${body}', sans-serif;
}`;
  };

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-violet-200">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Font Pair Generator</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Typography Harmony</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Primary Font</label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">100+ Fonts</span>
                </div>
              </div>
              
              <div className="relative group">
                <select
                  value={primaryFont}
                  onChange={(e) => setPrimaryFont(e.target.value)}
                  className="relative w-full h-14 px-6 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:outline-none focus:bg-white focus:ring-4 focus:ring-violet-500/10 transition-all font-bold text-slate-700 appearance-none cursor-pointer shadow-inner"
                >
                  <option value="">Select a font to find pairings...</option>
                  {availableFonts.map((font) => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
                <ArrowRightLeft className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Preview Text</label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-violet-500"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Live Preview</span>
                </div>
              </div>
              
              <input
                type="text"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                placeholder="Enter preview text..."
                className="relative w-full h-14 px-6 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:outline-none focus:bg-white focus:ring-4 focus:ring-violet-500/10 transition-all font-bold text-slate-700 shadow-inner placeholder:text-slate-300"
              />
            </div>
          </div>

          {suggestedPairings.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Suggested Pairings</label>
                <div className="flex gap-2">
                  {["all", "serif", "sans", "display", "mono"].map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition-all ${
                        selectedStyle === style
                          ? "bg-violet-600 text-white"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {style === "all" ? "All" : style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                {filteredPairings.map((pairing, index) => (
                  <div
                    key={index}
                    className="bg-slate-50/50 rounded-[24px] p-6 border border-slate-100 hover:border-violet-200 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-[9px] font-black uppercase tracking-wider mb-2">
                          {pairing.style}
                        </span>
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Heading</span>
                            <span className="text-lg font-bold text-slate-800">{pairing.heading}</span>
                          </div>
                          <ArrowRightLeft className="h-4 w-4 text-slate-300" />
                          <div>
                            <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Body</span>
                            <span className="text-lg font-bold text-slate-800">{pairing.body}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(generateCSS(pairing.heading, pairing.body))}
                        className="h-10 w-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center hover:bg-violet-50 hover:border-violet-300 transition-all"
                      >
                        {copied ? <Check className="h-5 w-5 text-emerald-500" /> : <Copy className="h-5 w-5 text-slate-400" />}
                      </button>
                    </div>
                    
                    <div className="bg-white rounded-[16px] p-6 border border-slate-100">
                      <h2 
                        className="text-2xl font-bold mb-2"
                        style={{ fontFamily: pairing.heading }}
                      >
                        {previewText}
                      </h2>
                      <p 
                        className="text-base text-slate-600"
                        style={{ fontFamily: pairing.body }}
                      >
                        The quick brown fox jumps over the lazy dog. Typography is the art of arranging type to make written language legible, readable, and appealing when displayed.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {suggestedPairings.length === 0 && primaryFont && (
            <div className="text-center py-12">
              <Palette className="h-12 w-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-bold">No pairings found for this font. Try selecting a different font.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
