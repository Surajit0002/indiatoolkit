"use client";

import { useState } from "react";
import { Copy, Sparkles, Type, Check } from "lucide-react";

export default function BrandSloganGenerator() {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("technology");
  const [tone, setTone] = useState("professional");
  const [targetAudience, setTargetAudience] = useState("");
  const [uniqueSellingPoint, setUniqueSellingPoint] = useState("");
  const [generated, setGenerated] = useState(false);
  const [slogans, setSlogans] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const industries = [
    "technology", "healthcare", "education", "finance", "retail",
    "entertainment", "food", "fitness", "travel", "realestate", "other"
  ];

  const tones = [
    "professional", "playful", "bold", "elegant", "friendly", "innovative"
  ];

  const sloganTemplates: Record<string, Record<string, string[]>> = {
    technology: {
      professional: [
        "Innovating Tomorrow, Today",
        "Technology That Works For You",
        "The Future of Innovation",
        "Smart Solutions for Complex Problems",
        "Driving Digital Transformation"
      ],
      playful: [
        "Tech That Makes You Smile",
        "Fun Meets Function",
        "Play Hard, Code Harder",
        "Where Tech Meets Magic",
        "Geek Out with Us"
      ],
      bold: [
        "Challenge Everything",
        "Rewrite the Rules",
        "The Revolution Starts Here",
        "Unleash the Power",
        "No Limits, Just Possibilities"
      ],
      elegant: [
        "Simplicity Redefined",
        "The Art of Technology",
        "Refined for Excellence",
        "Elegance in Every Line",
        "Crafted for Perfection"
      ],
      friendly: [
        "Technology Made Friendly",
        "We're Here to Help",
        "Your Tech Partner",
        "Making Tech Easy",
        "Simple, Fast, Reliable"
      ],
      innovative: [
        "Beyond the Horizon",
        "Next-Gen Solutions",
        "Think Different, Act Bigger",
        "Innovation Unleashed",
        "Creating What's Next"
      ],
    },
    healthcare: {
      professional: [
        "Your Health, Our Priority",
        "Caring for Life",
        "Excellence in Healthcare",
        "Health Without Compromise",
        "Trusted Medical Care"
      ],
      playful: [
        "Healing with a Smile",
        "Happy, Healthy You",
        "Wellness Made Fun",
        "Your Health, Your Way",
        "Feel Good Medicine"
      ],
      bold: [
        "Transform Your Health",
        "New Standards in Care",
        "Break Through to Wellness",
        "Health Redefined",
        "Unlock Your Potential"
      ],
      elegant: [
        "Graceful Healing",
        "Compassion in Care",
        "Wellness Elevated",
        "Gentle, Effective Care",
        "The Art of Healing"
      ],
      friendly: [
        "We're Here for You",
        "Your Friendly Health Team",
        "Care You Can Trust",
        "Making Health Easy",
        "Warm, Welcoming Care"
      ],
      innovative: [
        "Healthcare Evolved",
        "Future-Ready Medicine",
        "Innovation in Care",
        "Leading Medical Advances",
        "Pioneering Health Solutions"
      ],
    },
    retail: {
      professional: [
        "Quality You Can Trust",
        "Excellence in Every Item",
        "Premium Products, Fair Prices",
        "Your Trusted Retailer",
        "Value Meets Quality"
      ],
      playful: [
        "Shop 'Til You Drop",
        "Retail Therapy Rocks",
        "Happy Shopping!",
        "Treat Yourself Today",
        "Shopping Made Fun"
      ],
      bold: [
        "The Ultimate Shopping Experience",
        "Unbeatable Selection",
        "Shop Like Never Before",
        "Taste the Difference",
        "Experience More"
      ],
      elegant: [
        "Sophistication in Every Item",
        "Refined Shopping",
        "Elegance Delivered",
        "The Finest Selection",
        "Class Apart"
      ],
      friendly: [
        "Your Friendly Store",
        "Welcome Home",
        "Come On In!",
        "We're Glad You're Here",
        "Happy to Help"
      ],
      innovative: [
        "Shopping Reimagined",
        "The Future of Retail",
        "Next-Gen Shopping",
        "Innovation in Every Aisle",
        "Redefining Retail"
      ],
    },
    education: {
      professional: [
        "Excellence in Education",
        "Learning Without Limits",
        "Building Brighter Futures",
        "Knowledge That Matters",
        "Education for Life"
      ],
      playful: [
        "Learning is Fun!",
        "Explore, Discover, Grow",
        "Happy Learning",
        "School Cool",
        "Learning Made Easy"
      ],
      bold: [
        "Challenge Your Mind",
        "Break Through Boundaries",
        "Unlock Your Potential",
        "Think Bigger",
        "Go Further"
      ],
      elegant: [
        "The Art of Learning",
        "Graceful Growth",
        "Refined Education",
        "Knowledge in Style",
        "Elegant Learning"
      ],
      friendly: [
        "We're Here to Help You Learn",
        "Your Learning Partner",
        "Fun Education",
        "Learning Made Friendly",
        "Come Grow With Us"
      ],
      innovative: [
        "Education Evolved",
        "Learning Reimagined",
        "Future-Ready Skills",
        "Innovation in Teaching",
        "New Ways to Learn"
      ],
    },
  };

  const generateSlogans = () => {
    if (!brandName) {
      alert("Please enter your brand name");
      return;
    }

    const industrySlogans = sloganTemplates[industry] || sloganTemplates.technology;
    const toneSlogans = industrySlogans[tone] || industrySlogans.professional;

    const generatedSlogans = toneSlogans.map(slogan => {
      if (slogan.includes("Your") || slogan.includes("We're") || slogan.includes("We're")) {
        return slogan.replace("Your", brandName + "'s").replace("We're", brandName + " Is");
      }
      return `${slogan} - ${brandName}`;
    });

    setSlogans(generatedSlogans);
    setGenerated(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(slogans.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-linear-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Brand Slogan Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">Generate memorable brand slogans and taglines</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Type className="h-5 w-5 text-cyan-500" />Brand Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Brand Name</label>
                  <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Enter your brand name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Industry</label>
                  <select value={industry} onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all font-medium">
                    {industries.map(i => (
                      <option key={i} value={i}>{i.charAt(0).toUpperCase() + i.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tone</label>
                  <select value={tone} onChange={(e) => setTone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all font-medium">
                    {tones.map(t => (
                      <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Target Audience</label>
                  <input type="text" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g., millennials, professionals"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all font-medium" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Unique Selling Point</label>
                <input type="text" value={uniqueSellingPoint} onChange={(e) => setUniqueSellingPoint(e.target.value)}
                  placeholder="What makes you different?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all font-medium" />
              </div>
            </div>

            <button onClick={generateSlogans}
              className="w-full py-4 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5" />Generate Slogans
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-cyan-500" />Generated Slogans
              </h3>
              <div className="bg-slate-50 rounded-xl p-4 min-h-200px">
                {generated ? (
                  <div className="space-y-3">
                    {slogans.map((slogan, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4 border border-slate-100 hover:border-cyan-200 transition-colors group">
                        <p className="text-lg font-medium text-slate-700 text-center">{slogan}</p>
                        <button onClick={() => copyToClipboard(slogan)}
                          className="mt-2 w-full text-xs text-cyan-500 hover:text-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                          <Copy className="h-3 w-3" />Copy
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-slate-400 text-center">Enter your brand details and click<br />&quot;Generate Slogans&quot;</p>
                  </div>
                )}
              </div>
            </div>

            {generated && (
              <div className="space-y-3">
                <button onClick={copyAll}
                  className="w-full py-3 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2">
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copied ? "Copied All!" : "Copy All Slogans"}
                </button>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-cyan-500" />Slogan Tips
              </h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-semibold text-slate-700">Keep it Short</p>
                  <p>Best slogans are 3-7 words</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-semibold text-slate-700">Be Memorable</p>
                  <p>Use rhythm, rhyme, or alliteration</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-semibold text-slate-700">Stay Authentic</p>
                  <p>Reflect your brand values</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
