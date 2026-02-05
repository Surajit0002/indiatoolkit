"use client";

import { useState } from "react";
import { Copy, Type, Sparkles, Check, FileText, MousePointer, Megaphone } from "lucide-react";

export default function MarketingCopyGenerator() {
  const [copyType, setCopyType] = useState("headline");
  const [productName, setProductName] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [keyBenefit, setKeyBenefit] = useState("");
  const [tone, setTone] = useState("professional");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const templates: Record<string, string[]> = {
    headline: [
      "Transform Your [Product] Experience Today",
      "The Smart Way to Achieve [Benefit]",
      "Stop Settling for Less - Choose [Product]",
      "Unlock the Power of [Benefit] with [Product]",
      "Your Journey to [Benefit] Starts Here",
    ],
    cta: [
      "Get Started Free",
      "Claim Your Spot Now",
      "Start Your Transformation",
      "Join Thousands of Satisfied Customers",
      "Don't Miss Out - Act Now",
    ],
    product: [
      `Introducing ${"[Product]"} - the innovative solution designed to help you ${"[Benefit]"}. Built for ${"[Audience]"} who demand excellence.`,
      `Experience the difference with ${"[Product]"} - where innovation meets ${"[Benefit]"}. Perfect for ${"[Audience]"} seeking results.`,
      `Meet ${"[Product]"}: the revolutionary way to ${"[Benefit]"}. Crafted specifically for ${"[Audience]"} who won't settle for anything less.`,
    ],
    social: [
      `Ready to ${"[Benefit]"}? Our ${"[Product]"} makes it easy. Join the revolution! #Innovation #${"[Product]"} #Success`,
      `Discover how ${"[Product]"} can transform the way you ${"[Benefit]"}. Link in bio! 🚀`,
      `The secret to ${"[Benefit]"} is here. Meet ${"[Product]"} - designed for ${"[Audience]"} like you.`,
    ],
    email: [
      `Subject: Unlock ${"[Benefit]"} with ${"[Product]"} - Special Offer Inside!\n\nDear ${"[Audience]"},\n\nGreat news! We've made it easier than ever to ${"[Benefit]"}. Our ${"[Product]"} is designed specifically for people like you who want results.\n\n[Key Benefit Details...]\n\nBest regards,\nThe Team`,
    ],
  };

  const tones = [
    "Professional",
    "Friendly",
    "Urgent",
    "Playful",
    "Inspirational",
    "Bold",
    "Elegant",
  ];

  const generateCopy = () => {
    if (!productName || !keyBenefit) {
      alert("Please fill in Product Name and Key Benefit");
      return;
    }

    const baseCopies = templates[copyType] || templates.headline;
    const generatedCopies = baseCopies.map(template => {
      let result = template
        .replace(/\[Product\]/g, productName)
        .replace(/\[Benefit\]/g, keyBenefit)
        .replace(/\[Audience\]/g, targetAudience || "you");
      
      if (tone === "friendly") {
        result = result.replace("Transform", "Discover").replace("Start", "Begin");
      } else if (tone === "urgent") {
        result = "⚡ " + result + " - Limited Time!";
      } else if (tone === "playful") {
        result = "✨ " + result + " ✨";
      }
      
      return result;
    });

    setOutput(generatedCopies);
    setGenerated(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(output.join("\n\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Marketing Copy Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Generate compelling marketing copy
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-violet-500" />
                Content Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Copy Type</label>
                  <select
                    value={copyType}
                    onChange={(e) => setCopyType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all font-medium"
                  >
                    <option value="headline">Headlines</option>
                    <option value="cta">Call to Action</option>
                    <option value="product">Product Descriptions</option>
                    <option value="social">Social Media Posts</option>
                    <option value="email">Email Copy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all font-medium"
                  >
                    {tones.map(t => (
                      <option key={t} value={t.toLowerCase()}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Product/Service Name</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g., EcoClean Detergent"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Target Audience</label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g., eco-conscious millennials"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all font-medium"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Key Benefit</label>
                <input
                  type="text"
                  value={keyBenefit}
                  onChange={(e) => setKeyBenefit(e.target.value)}
                  placeholder="e.g., save 50% on energy bills"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all font-medium"
                />
              </div>
            </div>

            <button
              onClick={generateCopy}
              className="w-full py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="h-5 w-5" />
              Generate Copy
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Type className="h-5 w-5 text-violet-500" />
                Generated Copy
              </h3>
              
              <div className="bg-slate-50 rounded-xl p-4 min-h-[200px]">
                {generated ? (
                  <div className="space-y-3">
                    {output.map((copy, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg p-3 border border-slate-100 hover:border-violet-200 transition-colors group"
                      >
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{copy}</p>
                        <button
                          onClick={() => copyToClipboard(copy)}
                          className="mt-2 text-xs text-violet-500 hover:text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                        >
                          <Copy className="h-3 w-3" />
                          Copy
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-slate-400 text-center">
                      Fill in the details and click<br />"Generate Copy"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {generated && (
              <div className="space-y-3">
                <button
                  onClick={copyAll}
                  className="w-full py-3 bg-violet-500 text-white font-semibold rounded-xl hover:bg-violet-600 transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copied ? "Copied All!" : "Copy All Copy"}
                </button>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-violet-500" />
                Best Practices
              </h3>
              
              <div className="space-y-2 text-sm text-slate-600">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-semibold text-slate-700">Headlines</p>
                  <p>Keep it under 70 characters, use power words</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-semibold text-slate-700">CTAs</p>
                  <p>Use action verbs, create urgency</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-semibold text-slate-700">Product Copy</p>
                  <p>Focus on benefits, not just features</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
