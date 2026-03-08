"use client";

import { useState } from "react";
import { FileText, Sparkles, Copy, RefreshCw, Download, Hash, Calendar, Clock, Zap } from "lucide-react";

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

export default function AiBlogPostGenerator() {
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

  const updateField = (field: keyof BlogData, value: string) => {
    setBlog({ ...blog, [field]: value });
    setApiError(null);
  };

  const generateBlog = async () => {
    if (!blog.topic.trim()) return;

    setIsGenerating(true);
    setApiError(null);

    try {
      const systemPrompt = `You are an expert blog writer. Write engaging, SEO-friendly blog posts that capture attention and provide value to readers.

Guidelines:
- Start with a compelling hook
- Use headings (H2, H3) to organize content
- Include an introduction that outlines what readers will learn
- Provide practical, actionable content
- Use bullet points and lists for readability
- Include a conclusion with a call-to-action
- Naturally incorporate keywords throughout
- Write in the specified tone`;

      const prompt = `Write a ${blog.length} ${blog.type} blog post.

Topic: ${blog.topic}
${blog.title ? `Title: ${blog.title}` : ""}
Tone: ${blog.tone}
Target Audience: ${blog.audience}
Keywords: ${blog.keywords || "None specified"}

Please write a complete, publication-ready blog post with proper headings and structure.`;

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
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

Whether you're a ${blog.audience.toLowerCase()} looking to learn more or simply curious about ${blog.type || 'this subject'}, you've come to the right place.

**What you'll learn:**
- Key concepts and fundamentals
- Best practices and tips
- Common mistakes to avoid
- Actionable strategies you can implement

Let's dive in!

## Understanding ${blog.topic}

${blog.topic} is an important subject that affects many aspects of our lives. Whether you're new to this topic or looking to deepen your existing knowledge, understanding the fundamentals is crucial.

### Why ${blog.topic} Matters

In today's fast-paced world, having a solid understanding of ${blog.topic} can provide significant advantages. From professional growth to personal development, the benefits are numerous.

## Key Points to Consider

1. **Start with the basics** - Build a strong foundation before moving to advanced topics
2. **Practice regularly** - The more you engage with the material, the better you'll become
3. **Stay updated** - This field is constantly evolving, so keep learning
4. **Apply what you learn** - Theory is valuable, but practical application is essential

## Tips for Success

- Set clear goals for what you want to achieve
- Break down complex topics into smaller, manageable parts
- Don't be afraid to ask questions
- Connect with others who share your interests

## Common Mistakes to Avoid

${Array(3).fill("• Mistake: [Common mistake]. Instead, [Correct approach].").join("\n\n")}

## Conclusion

${blog.topic} doesn't have to be overwhelming. With the right approach and mindset, anyone can master this subject. Remember to be patient with yourself and enjoy the learning journey.

**Key Takeaways:**
- Start small and build gradually
- Consistency is more important than intensity
- Don't hesitate to seek help when needed

We hope this guide has provided valuable insights into ${blog.topic}. Keep exploring, keep learning, and most importantly, enjoy the process!

---

*Feel free to share this article with others who might benefit from it.*`;
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

  const resetForm = () => {
    setBlog({
      topic: "",
      title: "",
      type: "How-To Guide",
      tone: "Professional",
      length: "Medium (800-1500 words)",
      keywords: "",
      audience: "General Public"
    });
    setGeneratedBlog(null);
    setWordCount(0);
    setApiError(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Blog Post Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create engaging blog posts in minutes with AI
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Topic & Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Blog Topic *
                </label>
                <input
                  type="text"
                  value={blog.topic}
                  onChange={(e) => updateField("topic", e.target.value)}
                  placeholder="e.g., Digital Marketing Strategies"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Custom Title (Optional)
                </label>
                <input
                  type="text"
                  value={blog.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Leave blank for AI to generate"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Type & Tone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Blog Type
                </label>
                <select
                  value={blog.type}
                  onChange={(e) => updateField("type", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none font-medium"
                >
                  {blogTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Tone
                </label>
                <select
                  value={blog.tone}
                  onChange={(e) => updateField("tone", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none font-medium"
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
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Length
                </label>
                <select
                  value={blog.length}
                  onChange={(e) => updateField("length", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none font-medium"
                >
                  {lengths.map((length) => (
                    <option key={length} value={length}>{length}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Target Audience
                </label>
                <select
                  value={blog.audience}
                  onChange={(e) => updateField("audience", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none font-medium"
                >
                  {audiences.map((audience) => (
                    <option key={audience} value={audience}>{audience}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Keywords to Include (Optional)
              </label>
              <input
                type="text"
                value={blog.keywords}
                onChange={(e) => updateField("keywords", e.target.value)}
                placeholder="e.g., SEO, content marketing, social media (comma separated)"
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none font-medium"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateBlog}
              disabled={isGenerating || !blog.topic.trim()}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
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
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700 text-sm">
                {apiError}. Using fallback response.
              </div>
            )}
          </div>
        </div>

        {/* Generated Blog Output */}
        {generatedBlog && (
          <div className="mt-8 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-6 space-y-6">
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

        {/* SEO Tips */}
        <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100">
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
