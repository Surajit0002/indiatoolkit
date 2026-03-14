"use client";

import { useState } from "react";
import { FileText, Sparkles, Wand2, Copy, RefreshCw, Download, Hash, Clock, MessageSquare, Zap } from "lucide-react";
import AiChatInterface from "@/components/ai/AiChatInterface";

interface BlogData {
  topic: string;
  title: string;
  type: string;
  tone: string;
  length: string;
  keywords: string;
  audience: string;
}

const blogTypes = [
  "How-To Guide",
  "Listicle",
  "Opinion Piece",
  "Tutorial",
  "Review",
  "Comparison",
  "Case Study",
  "News/Announcement",
  "Interview",
  "Thought Leadership"
];

const tones = ["Professional", "Conversational", "Informative", "Inspiring", "Humorous", "Technical", "Casual"];

const lengths = [
  "Short (500-800 words)",
  "Medium (800-1500 words)",
  "Long (1500-2500 words)",
  "Comprehensive (2500+ words)"
];

const audiences = [
  "General Public",
  "Beginners",
  "Intermediate Users",
  "Experts",
  "Business Professionals",
  "Students",
  "Tech Enthusiasts"
];

const systemPrompt = `You are an expert blog writer for Omnitools AI Tools. Write engaging, SEO-friendly blog posts that capture attention and provide value to readers.

Guidelines:
- Start with a compelling hook that grabs attention
- Use headings (H2, H3) to organize content
- Include an introduction that outlines what readers will learn
- Provide practical, actionable content
- Use bullet points and lists for readability
- Include a conclusion with a call-to-action
- Naturally incorporate keywords throughout
- Write in the specified tone
- Make content scannable with clear structure
- Include relevant examples and statistics`;

export default function AiBlogPostGenerator() {
  const [useChatMode, setUseChatMode] = useState(true);
  const [blog, setBlog] = useState<BlogData>({
    topic: "",
    title: "",
    type: "How-To Guide",
    tone: "Professional",
    length: "Medium (800-1500 words)",
    keywords: "",
    audience: "General Public"
  });

  const [generatedBlog, setGeneratedBlog] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState<number>(0);

  const buildBlogPrompt = (params: BlogData) => {
    return `Write a ${params.length} ${params.type} blog post.

Topic: ${params.topic}
${params.title ? `Title: ${params.title}` : ""}
Tone: ${params.tone}
Target Audience: ${params.audience}
Keywords: ${params.keywords || "None specified"}

Please write a complete, publication-ready blog post with proper headings and structure. Include:
1. Compelling title
2. Engaging introduction
3. Well-organized body with H2/H3 headings
4. Practical tips and examples
5. Conclusion with call-to-action`;
  };

  const generateBlog = async () => {
    if (!blog.topic.trim()) return;

    setIsGenerating(true);
    setApiError(null);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: buildBlogPrompt(blog),
          systemPrompt,
          toolId: "ai-blog-post-generator"
        })
      });

      const data = await response.json();

      if (data.error) {
        setApiError(data.error);
        setGeneratedBlog(getFallbackBlog());
      } else {
        setGeneratedBlog(data.text);
        setWordCount(data.text.split(/\s+/).filter(Boolean).length);
      }
    } catch (error) {
      console.error("Error generating blog post:", error);
      setApiError("Failed to generate blog post. Please try again.");
      setGeneratedBlog(getFallbackBlog());
    } finally {
      setIsGenerating(false);
    }
  };

  const getFallbackBlog = (): string => {
    return `# ${blog.title || `Ultimate Guide to ${blog.topic}`}

## Introduction

Welcome to our comprehensive guide on ${blog.topic}. In this article, we'll explore everything you need to know about this important topic.

## Key Points to Consider

1. Start with the basics
2. Practice regularly
3. Stay updated
4. Apply what you learn

## Conclusion

We hope this guide has provided valuable insights into ${blog.topic}.`;
  };

  const copyBlog = () => {
    if (!generatedBlog) return;
    navigator.clipboard.writeText(generatedBlog);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadBlog = () => {
    if (!generatedBlog) return;
    const blob = new Blob([generatedBlog], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${blog.topic.toLowerCase().replace(/\s+/g, "-")}-blog-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const updateField = (field: keyof BlogData, value: string) => {
    setBlog({ ...blog, [field]: value });
    setApiError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <FileText className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">AI Blog Post Generator</h1>
              <p className="text-emerald-100 mt-1">Create engaging, SEO-friendly blog posts with AI</p>
            </div>
          </div>
          
          {/* Mode Toggle */}
          <div className="flex items-center gap-4 mt-6">
            <span className="text-sm text-emerald-100">Mode:</span>
            <div className="flex bg-white/10 rounded-xl p-1 backdrop-blur-sm">
              <button
                onClick={() => setUseChatMode(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  useChatMode 
                    ? "bg-white text-emerald-600 shadow-lg" 
                    : "text-white hover:bg-white/10"
                }`}
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Chat Mode
              </button>
              <button
                onClick={() => setUseChatMode(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !useChatMode 
                    ? "bg-white text-emerald-600 shadow-lg" 
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Wand2 className="w-4 h-4 inline mr-2" />
                Form Mode
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {useChatMode ? (
          /* Chat Mode */
          <div className="max-w-4xl mx-auto">
            <AiChatInterface
              toolId="ai-blog-post-generator"
              toolName="AI Blog Post Generator"
              systemPrompt={systemPrompt}
              placeholder="Describe your blog post, e.g., 'Write an SEO-optimized how-to guide about digital marketing for small businesses...'"
            />
          </div>
        ) : (
          /* Form Mode */
          <FormMode 
            blog={blog}
            updateField={updateField}
            generateBlog={generateBlog}
            generatedBlog={generatedBlog}
            isGenerating={isGenerating}
            copied={copied}
            apiError={apiError}
            wordCount={wordCount}
            copyBlog={copyBlog}
            downloadBlog={downloadBlog}
            getFallbackBlog={getFallbackBlog}
          />
        )}

        {/* SEO Tips */}
        <div className="mt-12 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100">
          <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
            <Hash className="h-5 w-5" />
            SEO & Engagement Tips
          </h4>
          <ul className="text-sm text-emerald-800 space-y-2">
            <li>• Include your main keyword in the title and first paragraph</li>
            <li>• Use H2 and H3 headings to structure your content</li>
            <li>• Add internal and external links where relevant</li>
            <li>• Include images with alt text for better SEO</li>
            <li>• End with a clear call-to-action</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Form Mode Component
function FormMode({ 
  blog,
  updateField,
  generateBlog,
  generatedBlog,
  isGenerating,
  copied,
  apiError,
  wordCount,
  copyBlog,
  downloadBlog,
  getFallbackBlog
}: { 
  blog: BlogData;
  updateField: (field: keyof BlogData, value: string) => void;
  generateBlog: () => Promise<void>;
  generatedBlog: string | null;
  isGenerating: boolean;
  copied: boolean;
  apiError: string | null;
  wordCount: number;
  copyBlog: () => void;
  downloadBlog: () => void;
  getFallbackBlog: () => string;
}) {
  const blogTypes = [
    "How-To Guide", "Listicle", "Opinion Piece", "Tutorial", "Review",
    "Comparison", "Case Study", "News/Announcement", "Interview", "Thought Leadership"
  ];
  const tones = ["Professional", "Conversational", "Informative", "Inspiring", "Humorous", "Technical", "Casual"];
  const lengths = ["Short (500-800 words)", "Medium (800-1500 words)", "Long (1500-2500 words)", "Comprehensive (2500+ words)"];
  const audiences = ["General Public", "Beginners", "Intermediate Users", "Experts", "Business Professionals", "Students", "Tech Enthusiasts"];

  const resetForm = () => {
    updateField("topic", "");
    updateField("title", "");
    updateField("type", "How-To Guide");
    updateField("tone", "Professional");
    updateField("length", "Medium (800-1500 words)");
    updateField("keywords", "");
    updateField("audience", "General Public");
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Input Form */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Topic & Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Blog Topic *
              </label>
              <input
                type="text"
                value={blog.topic}
                onChange={(e) => updateField("topic", e.target.value)}
                placeholder="e.g., Digital Marketing Strategies"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Custom Title (Optional)
              </label>
              <input
                type="text"
                value={blog.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Leave blank for AI to generate"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Type & Tone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Blog Type
              </label>
              <select
                value={blog.type}
                onChange={(e) => updateField("type", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none font-medium bg-white"
              >
                {blogTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tone
              </label>
              <select
                value={blog.tone}
                onChange={(e) => updateField("tone", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none font-medium bg-white"
              >
                {tones.map((tone) => (
                  <option key={tone} value={tone}>{tone}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Length & Audience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Length
              </label>
              <select
                value={blog.length}
                onChange={(e) => updateField("length", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none font-medium bg-white"
              >
                {lengths.map((length) => (
                  <option key={length} value={length}>{length}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Target Audience
              </label>
              <select
                value={blog.audience}
                onChange={(e) => updateField("audience", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none font-medium bg-white"
              >
                {audiences.map((audience) => (
                  <option key={audience} value={audience}>{audience}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Keywords to Include (Optional)
            </label>
            <input
              type="text"
              value={blog.keywords}
              onChange={(e) => updateField("keywords", e.target.value)}
              placeholder="e.g., SEO, content marketing, social media (comma separated)"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none font-medium"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateBlog}
            disabled={isGenerating || !blog.topic.trim()}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating Blog Post...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Blog Post with AI
              </>
            )}
          </button>

          {apiError && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm">
              {apiError}. Using fallback response.
            </div>
          )}
        </div>

        {/* Generated Blog Output */}
        {generatedBlog && (
          <div className="p-6 space-y-6 border-t border-slate-100">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-500" />
                Generated Blog Post
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="h-4 w-4" />
                  {wordCount} words
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={copyBlog}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadBlog}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 max-h-[600px] overflow-y-auto">
              <div className="prose prose-slate max-w-none whitespace-pre-wrap">
                {generatedBlog}
              </div>
            </div>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={generateBlog}
                disabled={isGenerating}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Zap className="h-5 w-5" />
                Regenerate
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
