"use client";

import { useState } from "react";
import { Mail, Sparkles, Copy, RefreshCw, Send, FileText, Star, Zap } from "lucide-react";

interface EmailData {
  type: string;
  recipientName: string;
  subject: string;
  purpose: string;
  tone: string;
  keyPoints: string;
}

const emailTypes = [
  "Professional Introduction",
  "Follow-up Email",
  "Thank You Email",
  "Meeting Request",
  "Job Application",
  "Sales Pitch",
  "Customer Support",
  "Networking",
  "Apology Email",
  "Announcement"
];

const tones = ["Professional", "Friendly", "Casual", "Formal", "Apologetic", "Persuasive", "Warm"];

export default function AiEmailWriter() {
  const [email, setEmail] = useState<EmailData>({
    type: "Professional Introduction",
    recipientName: "",
    subject: "",
    purpose: "",
    tone: "Professional",
    keyPoints: ""
  });

  const [generatedEmail, setGeneratedEmail] = useState<string | null>(null);
  const [emailSubject, setEmailSubject] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const updateField = (field: keyof EmailData, value: string) => {
    setEmail({ ...email, [field]: value });
    setApiError(null);
  };

  const generateEmail = async () => {
    if (!email.purpose.trim() || !email.recipientName.trim()) return;

    setIsGenerating(true);
    setApiError(null);

    try {
      const systemPrompt = `You are an expert email writer. Write professional, clear, and effective emails based on the user's requirements. 
      
Guidelines:
- Start with a proper greeting
- Keep the email concise and focused
- Use the specified tone throughout
- Include a clear call-to-action if needed
- End with a professional sign-off
- Don't include subject line in the body`;

      const prompt = `Write a ${email.tone} ${email.type} email.

Recipient Name: ${email.recipientName}
Purpose: ${email.purpose}
Key Points to Include: ${email.keyPoints || "None specified"}
Tone: ${email.tone}

Please write a complete, ready-to-send email.`;

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          systemPrompt,
          toolId: "ai-email-writer"
        })
      });

      const data = await response.json();

      if (data.error) {
        setApiError(data.error);
        // Use fallback response
        setGeneratedEmail(getFallbackEmail());
      } else {
        setGeneratedEmail(data.text);
      }
    } catch (error) {
      console.error("Error generating email:", error);
      setApiError("Failed to generate email. Please try again.");
      setGeneratedEmail(getFallbackEmail());
    } finally {
      setIsGenerating(false);
    }
  };

  const getFallbackEmail = (): string => {
    return `Dear ${email.recipientName},

${getEmailOpening(email.type, email.tone)}

${email.purpose}

${email.keyPoints ? `Key Points:\n${email.keyPoints}\n` : ""}

${getEmailClosing(email.type)}

Best regards,
[Your Name]`;
  };

  const getEmailOpening = (type: string, tone: string): string => {
    const openings: Record<string, Record<string, string>> = {
      "Professional Introduction": {
        Professional: "I hope this email finds you well. I am reaching out to introduce myself and express my interest in connecting with you.",
        Friendly: "Hi! I hope you're doing well. I wanted to reach out and introduce myself.",
        Casual: "Hey! Just wanted to drop you a quick note to introduce myself."
      },
      "Follow-up Email": {
        Professional: "I wanted to follow up on our previous conversation regarding this matter.",
        Friendly: "Just checking in to see how things are going!",
        Casual: "Hey! Just wanted to follow up on what we talked about."
      },
      "Thank You Email": {
        Professional: "I wanted to express my sincere gratitude for your time and consideration.",
        Friendly: "Thank you so much for taking the time to meet with me!",
        Casual: "Thanks a ton for everything!"
      }
    };

    return openings[type]?.[tone] || openings["Professional Introduction"]?.[tone] || "I hope this email finds you well.";
  };

  const getEmailClosing = (type: string): string => {
    const closings: Record<string, string> = {
      "Professional Introduction": "I look forward to the opportunity to connect and learn more about your work.",
      "Follow-up Email": "Please let me know if you need any additional information.",
      "Thank You Email": "Your support means a great deal to me.",
      "Meeting Request": "Please let me know your availability for a meeting.",
      "Job Application": "I would welcome the opportunity to discuss how my skills align with your needs.",
      "Sales Pitch": "I would be happy to schedule a call to discuss how we can help you achieve your goals.",
      "Networking": "I would love to connect and learn from your experience.",
      "Apology Email": "Once again, I sincerely apologize for any inconvenience caused.",
      "Announcement": "Please feel free to reach out if you have any questions."
    };

    return closings[type] || "Please feel free to reach out if you have any questions.";
  };

  const copyEmail = () => {
    if (!generatedEmail) return;
    const fullEmail = `Subject: ${emailSubject}\n\n${generatedEmail}`;
    navigator.clipboard.writeText(fullEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setEmail({
      type: "Professional Introduction",
      recipientName: "",
      subject: "",
      purpose: "",
      tone: "Professional",
      keyPoints: ""
    });
    setGeneratedEmail(null);
    setEmailSubject("");
    setApiError(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Email Writer</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Write professional emails in seconds with AI
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Email Type & Recipient */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Email Type
                </label>
                <select
                  value={email.type}
                  onChange={(e) => updateField("type", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium"
                >
                  {emailTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={email.recipientName}
                  onChange={(e) => updateField("recipientName", e.target.value)}
                  placeholder="e.g., John Smith"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Subject & Tone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={email.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  placeholder="Optional - AI can generate one"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Tone
                </label>
                <select
                  value={email.tone}
                  onChange={(e) => updateField("tone", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium"
                >
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Purpose of Email
              </label>
              <textarea
                value={email.purpose}
                onChange={(e) => updateField("purpose", e.target.value)}
                placeholder="What do you want to achieve with this email? Be specific about your goal and context."
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium min-h-[120px] resize-none"
              />
            </div>

            {/* Key Points */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Key Points to Include (Optional)
              </label>
              <textarea
                value={email.keyPoints}
                onChange={(e) => updateField("keyPoints", e.target.value)}
                placeholder="Any specific points, facts, or information you want to include in the email"
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium min-h-[80px] resize-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateEmail}
              disabled={isGenerating || !email.purpose.trim() || !email.recipientName.trim()}
              className="w-full py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Generating Email...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Email with AI
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

        {/* Generated Email Output */}
        {generatedEmail && (
          <div className="mt-8 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-violet-500" />
                  Generated Email
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={copyEmail}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    {copied ? <Star className="h-4 w-4 text-amber-500" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Start Over
                  </button>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="mb-4 pb-4 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject:</span>
                  <p className="text-slate-900 font-medium mt-1">
                    {email.subject || `Re: ${email.type} - ${email.purpose.substring(0, 50)}...`}
                  </p>
                </div>
                <div className="prose prose-slate max-w-none whitespace-pre-wrap">
                  {generatedEmail}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    const mailto = `mailto:?subject=${encodeURIComponent(email.subject || "")}&body=${encodeURIComponent(generatedEmail)}`;
                    window.open(mailto);
                  }}
                  className="flex-1 py-3 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="h-5 w-5" />
                  Open in Email Client
                </button>
                <button
                  onClick={generateEmail}
                  disabled={isGenerating}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Zap className="h-5 w-5" />
                  Regenerate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-3xl border border-violet-100">
          <h4 className="font-bold text-violet-900 mb-3 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Tips for Better Results
          </h4>
          <ul className="text-sm text-violet-800 space-y-2">
            <li>• Be specific about the purpose of your email</li>
            <li>• Include relevant key points you want to mention</li>
            <li>• Choose the appropriate tone for your recipient</li>
            <li>• For important emails, review and personalize the output</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
