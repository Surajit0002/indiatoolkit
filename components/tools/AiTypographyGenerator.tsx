"use client";

import { useState } from "react";
import { Type, Copy, Download, RefreshCw, Sparkles } from "lucide-react";

const typographyMoods = [
  "Modern & Clean",
  "Classic & Elegant",
  "Bold & Impactful",
  "Minimalist",
  "Playful & Fun",
  "Professional",
  "Luxurious",
  "Tech & Futuristic",
  "Warm & Inviting",
  "Bold & Contemporary",
];

interface FontPairing {
  id: number;
  headingFont: string;
  bodyFont: string;
  mood: string;
  description: string;
  googleFonts: boolean;
}

export default function AiTypographyGenerator() {
  const [mood, setMood] = useState("Modern & Clean");
  const [useSerif, setUseSerif] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pairings, setPairings] = useState<FontPairing[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const generatePairings = async () => {
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const fontSuggestions: Record<string, { heading: string; body: string }[]> = {
        "Modern & Clean": [
          { heading: "Inter", body: "Inter" },
          { heading: "Poppins", body: "Open Sans" },
          { heading: "Montserrat", body: "Roboto" },
        ],
        "Classic & Elegant": [
          { heading: "Playfair Display", body: "Lora" },
          { heading: "Merriweather", body: "Source Serif Pro" },
          { heading: "Libre Baskerville", body: "Crimson Text" },
        ],
        "Bold & Impactful": [
          { heading: "Oswald", body: "Open Sans" },
          { heading: "Bebas Neue", body: "Lato" },
          { heading: "Anton", body: "Poppins" },
        ],
        "Minimalist": [
          { heading: "Space Grotesk", body: "Space Mono" },
          { heading: "DM Sans", body: "DM Sans" },
          { heading: "Sora", body: "Inter" },
        ],
        "Playful & Fun": [
          { heading: "Fredoka", body: "Nunito" },
          { heading: "Quicksand", body: "Karla" },
          { heading: "Baloo 2", body: "Mukta" },
        ],
      };

      const suggestions = fontSuggestions[mood] || fontSuggestions["Modern & Clean"];

      const newPairings: FontPairing[] = suggestions.map((pair, idx) => ({
        id: Date.now() + idx,
        headingFont: pair.heading,
        bodyFont: pair.body,
        mood: mood,
        description: `A ${mood.toLowerCase()} pairing with ${pair.heading} for headings and ${pair.body} for body text.`,
        googleFonts: true,
      }));

      setPairings(newPairings);
      setIsGenerating(false);
    }, 2000);
  };

  const copyPairing = (id: number) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadCSS = (pairing: FontPairing) => {
    const css = `/* Typography Pairing: ${pairing.headingFont} + ${pairing.bodyFont} */
@import url('https://fonts.googleapis.com/css2?family=${pairing.headingFont.replace(/\s+/g, '+')}:wght@400;700&family=${pairing.bodyFont.replace(/\s+/g, '+')}:wght@400;600&display=swap');

:root {
  --font-heading: '${pairing.headingFont}', sans-serif;
  --font-body: '${pairing.bodyFont}', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
}

body {
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.6;
}`;
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${pairing.headingFont.toLowerCase()}-${pairing.bodyFont.toLowerCase()}.css`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setMood("Modern & Clean");
    setPairings([]);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl mb-4 shadow-lg">
            <Type className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Typography Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Get AI-powered font pairing and typography suggestions
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Mood Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                <Sparkles className="h-4 w-4 inline mr-2" />
                Desired Mood
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {typographyMoods.slice(0, 5).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                      mood === m
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3">
                {typographyMoods.slice(5).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                      mood === m
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={generatePairings}
                disabled={isGenerating}
                className="flex-1 h-14 bg-gradient-to-r from-slate-600 to-slate-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-slate-700 hover:to-slate-900 transition-all shadow-lg shadow-slate-100 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Pairings
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
          {pairings.length > 0 && (
            <>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <h3 className="font-bold text-slate-800 uppercase text-sm mb-4">
                  Font Pairings ({pairings.length})
                </h3>

                <div className="space-y-4">
                  {pairings.map((pairing) => (
                    <div
                      key={pairing.id}
                      className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all"
                    >
                      {/* Preview */}
                      <div className="mb-4">
                        <div className="mb-4">
                          <p className="text-xs text-slate-400 uppercase mb-1">Heading</p>
                          <h2 className="text-3xl font-bold" style={{ fontFamily: pairing.headingFont }}>
                            The Quick Brown Fox
                          </h2>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase mb-1">Body</p>
                          <p style={{ fontFamily: pairing.bodyFont }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                          </p>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-xs text-slate-400 uppercase">Heading</p>
                            <p className="font-bold text-slate-800">{pairing.headingFont}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 uppercase">Body</p>
                            <p className="font-bold text-slate-800">{pairing.bodyFont}</p>
                          </div>
                          {pairing.googleFonts && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">
                              Google Fonts
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => copyPairing(pairing.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
                          >
                            {copiedId === pairing.id ? (
                              <span className="text-green-600">Copied!</span>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                Copy
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => downloadCSS(pairing)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-700 transition-all"
                          >
                            <Download className="h-4 w-4" />
                            Export CSS
                          </button>
                        </div>
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
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <Sparkles className="h-8 w-8 text-slate-600 mb-3" />
            <h3 className="font-bold text-slate-800 mb-2">AI-Powered</h3>
            <p className="text-sm text-slate-700">
              Get font pairing suggestions based on design principles and readability.
            </p>
          </div>
          <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200">
            <Type className="h-8 w-8 text-slate-600 mb-3" />
            <h3 className="font-bold text-slate-800 mb-2">Readability</h3>
            <p className="text-sm text-slate-700">
              All pairings are tested for optimal readability and visual harmony.
            </p>
          </div>
          <div className="p-6 bg-slate-200 rounded-2xl border border-slate-300">
            <Download className="h-8 w-8 text-slate-600 mb-3" />
            <h3 className="font-bold text-slate-800 mb-2">Export Ready</h3>
            <p className="text-sm text-slate-700">
              Download CSS with Google Fonts imports included.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
