"use client";

import { useState } from "react";
import { TrendingUp, Sparkles, Copy, RefreshCw, Zap, Target, Users, Globe } from "lucide-react";

interface ContentData {
  topic: string;
  platform: string;
  contentType: string;
  tone: string;
  audience: string;
  goal: string;
}

const platforms = ["Instagram", "TikTok", "YouTube", "Twitter/X", "LinkedIn", "Facebook"];
const contentTypes = [
  "Educational", "Entertainment", "Inspirational", "Controversial", 
  "How-to", "Listicle", "Story", "Behind the Scenes", "Product Demo"
];
const tones = ["Professional", "Casual", "Witty", "Emotional", "Bold", "Friendly"];
const audiences = ["Gen Z", "Millennials", "Professionals", "Parents", "Tech Enthusiasts", "General"];

export default function ViralContentGenerator() {
  const [data, setData] = useState<ContentData>({
    topic: "",
    platform: "Instagram",
    contentType: "Educational",
    tone: "Casual",
    audience: "Gen Z",
    goal: "Engagement"
  });

  const [ideas, setIdeas] = useState<{
    hook: string;
    structure: string[];
    hashtags: string[];
    tips: string[];
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const updateField = (field: keyof ContentData, value: string) => {
    setData({ ...data, [field]: value });
  };

  const generateIdeas = async () => {
    if (!data.topic.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const hookTemplates = [
        `This changed everything about ${data.topic}...`,
        `Stop doing ${data.topic} wrong!`,
        `The ${data.topic} mistake everyone makes`,
        `I spent 5 years mastering ${data.topic}. Here's what I learned.`,
        `POV: You're learning about ${data.topic}`,
        `If you're into ${data.topic}, you need to hear this.`,
        `The ${data.topic} guide you wish you had earlier`,
        `Unpopular opinion: ${data.topic} isn't what you think`
      ];

      const structures: Record<string, string[]> = {
        "Educational": [
          "Hook: Start with a shocking fact or common mistake",
          "Problem: Explain why people struggle with this",
          "Solution: Break down 3-5 key points",
          "Action: Give a clear next step",
          "CTA: Ask a question to drive engagement"
        ],
        "Entertainment": [
          "Hook: Attention-grabbing opening",
          "Setup: Build anticipation or confusion",
          "Twist: Unexpected revelation or punchline",
          "Payoff: Satisfying conclusion",
          "Memorable ending: Leave them wanting more"
        ],
        "Inspirational": [
          "Hook: Relatable struggle or challenge",
          "Journey: Show the transformation process",
          "Obstacles: Mention setbacks overcome",
          " Triumph: Celebrate the victory",
          "Message: End with empowering takeaway"
        ],
        "How-to": [
          "Hook: Promise a specific result",
          "Overview: What you'll learn today",
          "Step 1: First actionable step",
          "Step 2-3: Additional key steps",
          "Results: Show what they can achieve",
          "CTA: Challenge them to try it"
        ]
      };

      const hashtagPools: Record<string, string[]> = {
        "Instagram": ["#fyp", "#foryou", "#viral", "#trending", "#explorepage", `#${data.topic.replace(/\s+/g, '')}`, "#learnontiktok", "#lifehack"],
        "TikTok": ["#fyp", "#foryoupage", "#viral", "#trending", "#tiktoktips", `#${data.topic.replace(/\s+/g, '')}`, "#howto", "#education"],
        "YouTube": ["#shorts", "#viral", "#trending", "#howto", `#${data.topic.replace(/\s+/g, '')}`, "#tutorial", "#learn"],
        "Twitter": ["#trending", "#viral", "#tech", "#innovation", `#${data.topic.replace(/\s+/g, '')}`, "#thread"],
        "LinkedIn": ["#professional", "#career", "#leadership", `#${data.topic.replace(/\s+/g, '')}`, "#business", "#growth"]
      };

      const tipsByPlatform: Record<string, string[]> = {
        "Instagram": [
          "Post during peak engagement hours (9-11 AM, 7-9 PM)",
          "Use 5-10 relevant hashtags",
          "Reply to comments within the first hour",
          "Stories and Reels get more reach than posts"
        ],
        "TikTok": [
          "Use trending sounds and music",
          "Keep hooks under 3 seconds",
          "Post 1-3 times daily for growth",
          "Engage with comments quickly"
        ],
        "YouTube": [
          "Create eye-catching thumbnails",
          "Optimize video titles with keywords",
          "Encourage subscribes in first 30 seconds",
          "End screens with subscribe CTA"
        ],
        "Twitter": [
          "Tweet during business hours",
          "Use 2-3 relevant hashtags",
          "Thread format gets more engagement",
          "Reply to mentions quickly"
        ],
        "LinkedIn": [
          "Post during business hours (Tue-Thu)",
          "Use professional tone and formatting",
          "Add relevant images or videos",
          "Engage with comments thoughtfully"
        ]
      };

      const selectedHooks = hookTemplates.slice(0, 3);
      const selectedStructure = structures[data.contentType as keyof typeof structures] || structures["Educational"];
      const selectedHashtags = hashtagPools[data.platform as keyof typeof hashtagPools] || hashtagPools["Instagram"];
      const selectedTips = tipsByPlatform[data.platform as keyof typeof tipsByPlatform] || tipsByPlatform["Instagram"];

      setIdeas({
        hook: selectedHooks[Math.floor(Math.random() * selectedHooks.length)],
        structure: selectedStructure,
        hashtags: selectedHashtags.slice(0, 10),
        tips: selectedTips
      });

      setIsGenerating(false);
    }, 1500);
  };

  const copyContent = () => {
    if (!ideas) return;
    navigator.clipboard.writeText(`${ideas.hook}\n\nStructure:\n${ideas.structure.join("\n")}\n\nHashtags:\n${ideas.hashtags.join(" ")}`);
  };

  const resetForm = () => {
    setData({
      topic: "",
      platform: "Instagram",
      contentType: "Educational",
      tone: "Casual",
      audience: "Gen Z",
      goal: "Engagement"
    });
    setIdeas(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mb-4 shadow-lg">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Viral Content Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create content optimized for maximum reach and engagement
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Topic */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Content Topic
              </label>
              <input
                type="text"
                value={data.topic}
                onChange={(e) => updateField("topic", e.target.value)}
                placeholder="What is your content about?"
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none font-medium"
              />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Platform
                </label>
                <select
                  value={data.platform}
                  onChange={(e) => updateField("platform", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none font-medium"
                >
                  {platforms.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Content Type
                </label>
                <select
                  value={data.contentType}
                  onChange={(e) => updateField("contentType", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none font-medium"
                >
                  {contentTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Tone
                </label>
                <select
                  value={data.tone}
                  onChange={(e) => updateField("tone", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none font-medium"
                >
                  {tones.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Target Audience
                </label>
                <select
                  value={data.audience}
                  onChange={(e) => updateField("audience", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none font-medium"
                >
                  {audiences.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={generateIdeas}
                disabled={!data.topic.trim() || isGenerating}
                className="flex-1 h-14 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-pink-600 hover:to-rose-700 transition-all shadow-lg shadow-pink-100 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Viral Strategy
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
          {ideas && (
            <div className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 border-t border-pink-100">
              {/* Hook */}
              <div className="mb-6 p-5 bg-white rounded-2xl border border-pink-100">
                <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">Viral Hook</span>
                <p className="text-xl font-bold text-slate-800 mt-2">{ideas.hook}</p>
                <p className="text-xs text-slate-500 mt-2">Use this in your first 3 seconds!</p>
              </div>

              {/* Structure */}
              <div className="mb-6">
                <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">Content Structure</span>
                <div className="mt-3 space-y-2">
                  {ideas.structure.map((step, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                      <span className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hashtags */}
              <div className="mb-6 p-4 bg-white rounded-2xl border border-pink-100">
                <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">Hashtags</span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {ideas.hashtags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-2">
                  <Zap className="h-4 w-4" /> Pro Tips for {data.platform}
                </span>
                <ul className="mt-3 space-y-2">
                  {ideas.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-amber-700">
                      <Target className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Copy Button */}
              <button
                onClick={copyContent}
                className="w-full mt-4 h-12 bg-pink-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-pink-700 transition-all"
              >
                <Copy className="h-5 w-5" />
                Copy Strategy
              </button>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-pink-50 rounded-2xl border border-pink-100">
            <Target className="h-8 w-8 text-pink-600 mb-3" />
            <h3 className="font-bold text-pink-800 mb-2">Hook First</h3>
            <p className="text-sm text-pink-700">
              Grab attention in the first 3 seconds to stop the scroll.
            </p>
          </div>
          <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
            <Users className="h-8 w-8 text-rose-600 mb-3" />
            <h3 className="font-bold text-rose-800 mb-2">Know Your Audience</h3>
            <p className="text-sm text-rose-700">
              Tailor content to resonate with your target demographic.
            </p>
          </div>
          <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
            <Globe className="h-8 w-8 text-red-600 mb-3" />
            <h3 className="font-bold text-red-800 mb-2">Platform Optimized</h3>
            <p className="text-sm text-red-700">
              Each platform has unique best practices for virality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
