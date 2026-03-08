"use client";

import { useState } from "react";
import { Newspaper, Sparkles, Copy, RefreshCw, Download, Calendar, Zap, Send } from "lucide-react";

interface PressReleaseData {
  headline: string;
  announcementType: string;
  companyName: string;
  keyMessage: string;
  quotes: string;
  contactInfo: string;
  tone: string;
}

const announcementTypes = [
  "New Product Launch",
  "Partnership/Collaboration",
  "Funding/Investment",
  "Executive Appointment",
  "Award/Recognition",
  "Milestone Achievement",
  "Event Announcement",
  "Expansion News",
  "Research/Development",
  "Merger/Acquisition"
];

const tones = ["Professional", "Exciting", "Formal", "Inspiring", "Urgent", "Celebratory"];

export default function AiPressReleaseGenerator() {
  const [pressRelease, setPressRelease] = useState<PressReleaseData>({
    headline: "",
    announcementType: "New Product Launch",
    companyName: "",
    keyMessage: "",
    quotes: "",
    contactInfo: "",
    tone: "Professional"
  });

  const [generatedPR, setGeneratedPR] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState<number>(0);

  const updateField = (field: keyof PressReleaseData, value: string) => {
    setPressRelease({ ...pressRelease, [field]: value });
    setApiError(null);
  };

  const generatePressRelease = async () => {
    if (!pressRelease.headline.trim() || !pressRelease.companyName.trim()) return;

    setIsGenerating(true);
    setApiError(null);

    try {
      const systemPrompt = `You are an expert PR writer. Write professional, newsworthy press releases that journalists will want to cover.

Guidelines:
- Start with a compelling, newsworthy headline
- Write in inverted pyramid style - most important info first
- Include the 5 Ws (Who, What, When, Where, Why)
- Add a quote from a company executive
- Include boilerplate about the company
- End with media contact information
- Keep it concise and professional
- Use third-person perspective`;

      const prompt = `Write a professional press release for:

Headline: ${pressRelease.headline}
Announcement Type: ${pressRelease.announcementType}
Company Name: ${pressRelease.companyName}
Key Message: ${pressRelease.keyMessage}
Quote: ${pressRelease.quotes || "N/A"}
Contact Info: ${pressRelease.contactInfo || "N/A"}
Tone: ${pressRelease.tone}

Include:
1. FOR IMMEDIATE RELEASE header with date
2. Compelling headline
3. Dateline city
4. Lead paragraph (summary of announcement)
5. Body paragraphs with details
6. Quote section
7. About [Company Name] section (boilerplate)
8. Media Contact section`;

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          systemPrompt,
          toolId: "ai-press-release-generator"
        })
      });

      const data = await response.json();

      if (data.error) {
        setApiError(data.error);
        setGeneratedPR(getFallbackPR());
      } else {
        setGeneratedPR(data.text);
        setWordCount(data.text.split(/\s+/).filter(Boolean).length);
      }
    } catch (error) {
      console.error("Error generating press release:", error);
      setApiError("Failed to generate press release. Please try again.");
      setGeneratedPR(getFallbackPR());
    } finally {
      setIsGenerating(false);
    }
  };

  const getFallbackPR = (): string => {
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return `FOR IMMEDIATE RELEASE
${date}

${pressRelease.headline || "[HEADLINE]"}

[City, Date] -- ${pressRelease.companyName} today announced ${pressRelease.announcementType.toLowerCase()}.

${pressRelease.keyMessage || "This is a significant milestone for our company and represents our continued commitment to excellence."}

About ${pressRelease.companyName}
${pressRelease.companyName} is a leading provider of innovative solutions. Founded with a mission to deliver exceptional value, we continue to push boundaries and set new standards in our industry.

Media Contact
${pressRelease.contactInfo || "[Contact Name]"}
[Email]
[Phone]`;
  };

  const copyPR = () => {
    if (!generatedPR) return;
    navigator.clipboard.writeText(generatedPR);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPR = () => {
    if (!generatedPR) return;
    const blob = new Blob([generatedPR], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `press-release-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setPressRelease({
      headline: "",
      announcementType: "New Product Launch",
      companyName: "",
      keyMessage: "",
      quotes: "",
      contactInfo: "",
      tone: "Professional"
    });
    setGeneratedPR(null);
    setWordCount(0);
    setApiError(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl mb-4 shadow-lg">
            <Newspaper className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Press Release Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create professional press releases that get coverage
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Headline & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Headline *
                </label>
                <input
                  type="text"
                  value={pressRelease.headline}
                  onChange={(e) => updateField("headline", e.target.value)}
                  placeholder="e.g., Company XYZ Launches Revolutionary Product"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-slate-500 focus:outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={pressRelease.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  placeholder="e.g., Acme Corporation"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-slate-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Type & Tone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Announcement Type
                </label>
                <select
                  value={pressRelease.announcementType}
                  onChange={(e) => updateField("announcementType", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-slate-500 focus:outline-none font-medium"
                >
                  {announcementTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Tone
                </label>
                <select
                  value={pressRelease.tone}
                  onChange={(e) => updateField("tone", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-slate-500 focus:outline-none font-medium"
                >
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Key Message */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Key Message (What are you announcing?) *
              </label>
              <textarea
                value={pressRelease.keyMessage}
                onChange={(e) => updateField("keyMessage", e.target.value)}
                placeholder="Describe the main announcement, including what, why it's important, and any relevant details..."
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-slate-500 focus:outline-none font-medium min-h-[120px] resize-none"
              />
            </div>

            {/* Quote */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Quote (Optional)
              </label>
              <textarea
                value={pressRelease.quotes}
                onChange={(e) => updateField("quotes", e.target.value)}
                placeholder="e.g., 'We are thrilled to launch this product,' said John Doe, CEO"
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-slate-500 focus:outline-none font-medium min-h-[80px] resize-none"
              />
            </div>

            {/* Contact Info */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Media Contact (Optional)
              </label>
              <input
                type="text"
                value={pressRelease.contactInfo}
                onChange={(e) => updateField("contactInfo", e.target.value)}
                placeholder="e.g., John Smith, press@company.com, +1-555-123-4567"
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-slate-500 focus:outline-none font-medium"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generatePressRelease}
              disabled={isGenerating || !pressRelease.headline.trim() || !pressRelease.companyName.trim()}
              className="w-full py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Generating Press Release...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Press Release
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
        {generatedPR && (
          <div className="mt-8 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-slate-500" />
                  Generated Press Release
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="h-4 w-4" />
                    {wordCount} words
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={copyPR}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={downloadPR}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 max-h-[500px] overflow-y-auto">
                <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800">
                  {generatedPR}
                </pre>
              </div>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={generatePressRelease}
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
        <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl border border-slate-200">
          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Send className="h-5 w-5" />
            PR Best Practices
          </h4>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• Keep headlines under 100 characters</li>
            <li>• Lead with the most newsworthy information</li>
            <li>• Include a compelling quote from leadership</li>
            <li>• Add high-quality images if relevant</li>
            <li>• Send to targeted journalists and outlets</li>
            <li>• Follow up within 3-5 days</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
