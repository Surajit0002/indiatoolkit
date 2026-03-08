"use client";

import { useState } from "react";
import { Mail, Sparkles, Copy, RefreshCw, Download, Users, Zap, Send } from "lucide-react";

interface NewsletterData {
  topic: string;
  type: string;
  companyName: string;
  keyPoints: string;
  cta: string;
  tone: string;
}

const newsletterTypes = [
  "Monthly Newsletter",
  "Weekly Update",
  "Product Update",
  "Event Invite",
  "Company Announcement",
  "Industry Insights",
  "Customer Story",
  "Tips & Tricks"
];

const ctaOptions = [
  "Learn More",
  "Sign Up Now",
  "Get Started",
  "Book a Demo",
  "Shop Now",
  "Read More",
  "Join Us",
  "Contact Us"
];

const tones = ["Professional", "Friendly", "Casual", "Exciting", "Professional", "Warm"];

export default function AiNewsletterGenerator() {
  const [newsletter, setNewsletter] = useState<NewsletterData>({
    topic: "",
    type: "Monthly Newsletter",
    companyName: "",
    keyPoints: "",
    cta: "Learn More",
    tone: "Friendly"
  });

  const [generatedNewsletter, setGeneratedNewsletter] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const updateField = (field: keyof NewsletterData, value: string) => {
    setNewsletter({ ...newsletter, [field]: value });
    setApiError(null);
  };

  const generateNewsletter = async () => {
    if (!newsletter.topic.trim() || !newsletter.companyName.trim()) return;

    setIsGenerating(true);
    setApiError(null);

    try {
      const systemPrompt = `You are an expert email newsletter writer. Write engaging newsletters that readers look forward to receiving.

Guidelines:
- Use a friendly, conversational tone
- Start with a warm greeting
- Organize content with clear sections
- Use bullet points for easy scanning
- Include a clear call-to-action
- End with an engaging sign-off
- Keep paragraphs short and scannable
- Personalize where possible`;

      const prompt = `Write a ${newsletter.type} for:

Company: ${newsletter.companyName}
Topic/Main Theme: ${newsletter.topic}
Key Points to Include: ${newsletter.keyPoints || "N/A"}
Call-to-Action: ${newsletter.cta}
Tone: ${newsletter.tone}

Structure:
1. Catchy subject line
2. Warm greeting
3. Main content organized with sections
4. Highlight key information
5. Call-to-action button
6. Company signature/branding
7. Social links and unsubscribe footer`;

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          systemPrompt,
          toolId: "ai-newsletter-generator"
        })
      });

      const data = await response.json();

      if (data.error) {
        setApiError(data.error);
        setGeneratedNewsletter(getFallbackNewsletter());
      } else {
        setGeneratedNewsletter(data.text);
      }
    } catch (error) {
      console.error("Error generating newsletter:", error);
      setApiError("Failed to generate newsletter. Please try again.");
      setGeneratedNewsletter(getFallbackNewsletter());
    } finally {
      setIsGenerating(false);
    }
  };

  const getFallbackNewsletter = (): string => {
    return `Subject: ${newsletter.type} - ${newsletter.topic}

---

Hi there,

Welcome to our ${newsletter.type.toLowerCase()}!

${newsletter.topic}

${newsletter.keyPoints ? `**Highlights:**\n${newsletter.keyPoints}` : "We're excited to share our latest updates with you."}

**What's New**

We've been working hard to bring you the best experience. Stay tuned for more exciting developments!

${newsletter.cta ? `[${newsletter.cta}]` : "[Learn More]"}

---

Best regards,
The ${newsletter.companyName} Team

---
Follow us: [Social Links]
Manage your preferences | Unsubscribe`;
  };

  const copyNewsletter = () => {
    if (!generatedNewsletter) return;
    navigator.clipboard.writeText(generatedNewsletter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadNewsletter = () => {
    if (!generatedNewsletter) return;
    const blob = new Blob([generatedNewsletter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `newsletter-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setNewsletter({
      topic: "",
      type: "Monthly Newsletter",
      companyName: "",
      keyPoints: "",
      cta: "Learn More",
      tone: "Friendly"
    });
    setGeneratedNewsletter(null);
    setApiError(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mb-4 shadow-lg">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Newsletter Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create engaging newsletters your subscribers will love
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Topic & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Newsletter Topic *
                </label>
                <input
                  type="text"
                  value={newsletter.topic}
                  onChange={(e) => updateField("topic", e.target.value)}
                  placeholder="e.g., January Product Updates"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Company/Brand Name *
                </label>
                <input
                  type="text"
                  value={newsletter.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  placeholder="e.g., Acme Inc."
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Type & Tone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Newsletter Type
                </label>
                <select
                  value={newsletter.type}
                  onChange={(e) => updateField("type", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none font-medium"
                >
                  {newsletterTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Tone
                </label>
                <select
                  value={newsletter.tone}
                  onChange={(e) => updateField("tone", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none font-medium"
                >
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Key Points */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Key Points to Include
              </label>
              <textarea
                value={newsletter.keyPoints}
                onChange={(e) => updateField("keyPoints", e.target.value)}
                placeholder="• New feature launch&#10;• Upcoming event&#10;• Customer success story&#10;• Company milestone"
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none font-medium min-h-[120px] resize-none"
              />
            </div>

            {/* CTA */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Call-to-Action Button
              </label>
              <select
                value={newsletter.cta}
                onChange={(e) => updateField("cta", e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none font-medium"
              >
                {ctaOptions.map((cta) => (
                  <option key={cta} value={cta}>{cta}</option>
                ))}
              </select>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateNewsletter}
              disabled={isGenerating || !newsletter.topic.trim() || !newsletter.companyName.trim()}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Generating Newsletter...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Newsletter
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
        {generatedNewsletter && (
          <div className="mt-8 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-pink-500" />
                  Generated Newsletter
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={copyNewsletter}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadNewsletter}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 max-h-[500px] overflow-y-auto">
                <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800">
                  {generatedNewsletter}
                </pre>
              </div>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={generateNewsletter}
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
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-3xl border border-pink-100">
          <h4 className="font-bold text-pink-900 mb-3 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Newsletter Best Practices
          </h4>
          <ul className="text-sm text-pink-800 space-y-2">
            <li>• Keep subject lines under 50 characters</li>
            <li>• Personalize with subscriber name when possible</li>
            <li>• Use a clear, single call-to-action</li>
            <li>• Optimize for mobile devices</li>
            <li>• Test different send times</li>
            <li>• Clean your email list regularly</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
