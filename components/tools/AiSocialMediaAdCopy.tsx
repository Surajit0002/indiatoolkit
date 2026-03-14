"use client";

import { useState } from "react";
import { Megaphone, Sparkles, Copy, RefreshCw, Download, Hash, Zap, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

interface AdData {
  productName: string;
  platform: string;
  adType: string;
  targetAudience: string;
  keyBenefit: string;
  cta: string;
  tone: string;
}

const platforms = ["Facebook", "Instagram", "Twitter/X", "LinkedIn", "TikTok", "All Platforms"];

const adTypes = [
  "Brand Awareness",
  "Product Launch",
  "Lead Generation",
  "Sales Promotion",
  "Event Promotion",
  "App Install",
  "Video View",
  "Engagement"
];

const ctas = [
  "Shop Now",
  "Learn More",
  "Sign Up",
  "Get Started",
  "Book Now",
  "Download",
  "Register",
  "Apply Now",
  "Contact Us"
];

const tones = ["Professional", "Casual", "Exciting", "Urgent", "Humorous", "Inspirational", "Luxurious"];

export default function AiSocialMediaAdCopy() {
  const [ad, setAd] = useState<AdData>({
    productName: "",
    platform: "Facebook",
    adType: "Product Launch",
    targetAudience: "",
    keyBenefit: "",
    cta: "Learn More",
    tone: "Professional"
  });

  const [generatedAds, setGeneratedAds] = useState<string[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const updateField = (field: keyof AdData, value: string) => {
    setAd({ ...ad, [field]: value });
    setApiError(null);
  };

  const generateAds = async () => {
    if (!ad.productName.trim()) return;

    setIsGenerating(true);
    setApiError(null);

    try {
      const systemPrompt = `You are an expert social media advertising copywriter. Write high-converting ad copy that drives results.

Guidelines:
- Write compelling headlines that grab attention
- Keep primary text under 125 characters when possible
- Use power words and emotional triggers
- Include a clear call-to-action
- Match the tone to the platform and audience
- Focus on benefits, not just features
- Use numbers and specific claims when possible
- Include relevant hashtags for discoverability`;

      const prompt = `Generate 5 different ad copy variations for:

Product/Service: ${ad.productName}
Platform: ${ad.platform}
Ad Type: ${ad.adType}
Target Audience: ${ad.targetAudience || "General audience"}
Key Benefit: ${ad.keyBenefit || "N/A"}
Call-to-Action: ${ad.cta}
Tone: ${ad.tone}

For each variation, include:
1. Primary Text (the main ad copy)
2. Headline
3. Description (if applicable)
4. Hashtags`;

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          systemPrompt,
          toolId: "ai-social-media-ad-copy"
        })
      });

      const data = await response.json();

      if (data.error) {
        setApiError(data.error);
        setGeneratedAds(getFallbackAds());
      } else {
        // Split ads by numbered list
        const ads = data.text.split(/(?=\n\d+\.)/).filter((a: string) => a.trim());
        setGeneratedAds(ads.length >= 3 ? ads.slice(0, 5) : [data.text]);
      }
    } catch (error) {
      console.error("Error generating ad copy:", error);
      setApiError("Failed to generate ad copy. Please try again.");
      setGeneratedAds(getFallbackAds());
    } finally {
      setIsGenerating(false);
    }
  };

  const getFallbackAds = (): string[] => {
    const hashtags = ad.productName.split(" ").map(w => `#${w.replace(/[^a-zA-Z]/g, "")}`).slice(0, 3).join(" ");
    
    return [
      `1. **Primary Text:**
Discover ${ad.productName} - the solution you've been waiting for!

${ad.keyBenefit || "Transform your experience today."}

${ad.cta} 👇

${hashtags}

**Headline:** Why ${ad.productName} is the Best Choice
**Description:** Get started in minutes.`,

      `2. **Primary Text:**
Attention ${ad.targetAudience || "everyone"}! 🚀

${ad.productName} is here to revolutionize how you work.

✨ ${ad.keyBenefit || "Premium quality"}
✨ Easy to use
✨ Amazing results

${ad.cta} before it's gone!

${hashtags}

**Headline:** ${ad.productName} - Limited Time Offer
**Description:** Join thousands of satisfied customers.`,

      `3. **Primary Text:**
Ready to level up? ⬆️

${ad.productName} delivers everything you need:

✓ ${ad.keyBenefit || "Outstanding performance"}
✓ Professional results
✓ Unbeatable value

${ad.cta} now!

${hashtags}

**Headline:** Don't Miss Out on ${ad.productName}
**Description:** Start your journey today.`
    ];
  };

  const copyAds = () => {
    if (!generatedAds) return;
    navigator.clipboard.writeText(generatedAds.join('\n\n---\n\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAds = () => {
    if (!generatedAds) return;
    const text = generatedAds.join('\n\n---\n\n');
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${ad.productName.toLowerCase().replace(/\s+/g, "-")}-ad-copy.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getPlatformIcon = () => {
    switch(ad.platform) {
      case "Facebook": return <Facebook className="h-4 w-4" />;
      case "Instagram": return <Instagram className="h-4 w-4" />;
      case "Twitter/X": return <Twitter className="h-4 w-4" />;
      case "LinkedIn": return <Linkedin className="h-4 w-4" />;
      default: return <Megaphone className="h-4 w-4" />;
    }
  };

  const resetForm = () => {
    setAd({
      productName: "",
      platform: "Facebook",
      adType: "Product Launch",
      targetAudience: "",
      keyBenefit: "",
      cta: "Learn More",
      tone: "Professional"
    });
    setGeneratedAds(null);
    setApiError(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Megaphone className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Social Media Ad Copy</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Generate high-converting ad copy in seconds
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Product & Platform */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Product/Service *
                </label>
                <input
                  type="text"
                  value={ad.productName}
                  onChange={(e) => updateField("productName", e.target.value)}
                  placeholder="e.g., Smart Watch Pro"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Platform
                </label>
                <select
                  value={ad.platform}
                  onChange={(e) => updateField("platform", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none font-medium"
                >
                  {platforms.map((platform) => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Ad Type & Tone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Ad Type
                </label>
                <select
                  value={ad.adType}
                  onChange={(e) => updateField("adType", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none font-medium"
                >
                  {adTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Tone
                </label>
                <select
                  value={ad.tone}
                  onChange={(e) => updateField("tone", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none font-medium"
                >
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Target Audience & CTA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={ad.targetAudience}
                  onChange={(e) => updateField("targetAudience", e.target.value)}
                  placeholder="e.g., Tech enthusiasts, ages 25-40"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Call-to-Action
                </label>
                <select
                  value={ad.cta}
                  onChange={(e) => updateField("cta", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none font-medium"
                >
                  {ctas.map((cta) => (
                    <option key={cta} value={cta}>{cta}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Key Benefit */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Key Benefit/USP
              </label>
              <textarea
                value={ad.keyBenefit}
                onChange={(e) => updateField("keyBenefit", e.target.value)}
                placeholder="What makes your product unique? What benefit should users focus on?"
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none font-medium min-h-[80px] resize-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateAds}
              disabled={isGenerating || !ad.productName.trim()}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Generating Ad Copy...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Ad Copy
                </>
              )}
            </button>

            {apiError && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700 text-sm">
                {apiError}. Using fallback response.
              </div>
            )}
          </div>
        </div>

        {/* Generated Output */}
        {generatedAds && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-blue-500" />
                Generated Ad Copy ({generatedAds.length} variations)
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={copyAds}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? "Copied!" : "Copy All"}
                </button>
                <button
                  onClick={downloadAds}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              {generatedAds.map((adCopy, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-blue-600 flex items-center gap-2">
                        {getPlatformIcon()}
                        Variation {index + 1}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(adCopy);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </button>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 whitespace-pre-wrap text-sm">
                      {adCopy}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={generateAds}
                disabled={isGenerating}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors"
              >
                <Zap className="h-5 w-5" />
                Regenerate
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
                Start Over
              </button>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-100">
          <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Ad Copy Best Practices
          </h4>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Test multiple variations to find what works best</li>
            <li>• Use A/B testing for headlines</li>
            <li>• Include social proof when possible</li>
            <li>• Match ad copy to landing page content</li>
            <li>• Use power words: &quot;Free,&quot; &quot;New,&quot; &quot;Limited,&quot; &quot;Exclusive&quot;</li>
            <li>• Keep character limits in mind for each platform</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
