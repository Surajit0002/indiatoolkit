"use client";

import { useState } from "react";
import { Video, FileText, Clock, Users, Copy, Download, RefreshCw, Sparkles, Play } from "lucide-react";

interface VideoScript {
  topic: string;
  platform: string;
  videoType: string;
  duration: string;
  tone: string;
  targetAudience: string;
  language: string;
}

const platforms = ["YouTube", "Instagram Reels", "TikTok", "Facebook", "LinkedIn"];
const videoTypes = [
  "Educational", "Entertainment", "Tutorial", "Vlog", "Product Review",
  "Explainer", "Motivation", "News", "Comedy", "Interview"
];
const durations = ["30 seconds", "1 minute", "3 minutes", "5 minutes", "10 minutes", "15+ minutes"];
const tones = ["Professional", "Casual", "Humorous", "Inspiring", "Educational", "Entertaining"];
const audiences = [
  "Students", "Professionals", "Entrepreneurs", "Parents", "Tech Enthusiasts",
  "Fitness Enthusiasts", "Food Lovers", "Travelers", "Gamers", "General Public"
];
const languages = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi", " Gujarati"];

export default function AiVideoScriptGenerator() {
  const [script, setScript] = useState<VideoScript>({
    topic: "",
    platform: "YouTube",
    videoType: "Educational",
    duration: "5 minutes",
    tone: "Professional",
    targetAudience: "General Public",
    language: "English"
  });

  const [scriptContent, setScriptContent] = useState<{
    hook: string;
    sections: { title: string; content: string; duration: string }[];
    cta: string;
    tips: string[];
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const updateField = (field: keyof VideoScript, value: string) => {
    setScript({ ...script, [field]: value });
  };

  const generateScript = async () => {
    if (!script.topic.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const durationMinutes = parseInt(script.duration) || 5;
      const sectionCount = durationMinutes <= 1 ? 2 : durationMinutes <= 5 ? 3 : 5;
      
      const sectionTemplates = {
        "Educational": [
          "Introduction & Problem Statement",
          "Key Concept Explanation",
          "Step-by-Step Process",
          "Examples & Case Studies",
          "Summary & Key Takeaways"
        ],
        "Tutorial": [
          "What You'll Learn Today",
          "Required Materials/Tools",
          "Step 1: Getting Started",
          "Step 2: Main Process",
          "Common Mistakes to Avoid"
        ],
        "Entertainment": [
          "The Hook - Attention Grabber",
          "Setup - Building Anticipation",
          "The Punchline/Climax",
          "Unexpected Twist",
          "Call to Action"
        ],
        "Vlog": [
          "Introduction - Where I Am Today",
          "What Happened Recently",
          "My Thoughts & Feelings",
          "Behind the Scenes",
          "What's Coming Next"
        ],
        "Product Review": [
          "Unboxing & First Impressions",
          "Features & Specifications",
          "Real-World Testing",
          "Pros & Cons",
          "Final Verdict & Recommendation"
        ]
      };

      const titles = sectionTemplates[script.videoType as keyof typeof sectionTemplates] || sectionTemplates["Educational"];

      const sections = titles.slice(0, sectionCount).map((title, index) => ({
        title,
        content: generateSectionContent(title, script, index),
        duration: `${Math.round(durationMinutes * (index + 1) / sectionCount)} min`
      }));

      const hooks = [
        `Here's something no one tells you about ${script.topic}...`,
        `I spent 5 years mastering ${script.topic}, and here's what I learned.`,
        `What if everything you knew about ${script.topic} was wrong?`,
        `This one ${script.topic} tip changed everything for me.`,
        `Stop making these common ${script.topic} mistakes!`
      ];

      const ctas = [
        "Like this video and subscribe for more tips!",
        "Comment below what topic you'd like me to cover next!",
        "Share this with someone who needs to see this!",
        "Click the bell icon to never miss an update!",
        "Check out my other videos for more on this topic!"
      ];

      setScriptContent({
        hook: hooks[Math.floor(Math.random() * hooks.length)],
        sections,
        cta: ctas[Math.floor(Math.random() * ctas.length)],
        tips: [
          `Film in landscape mode for ${script.platform}`,
          `Add captions for better engagement`,
          `Keep the first 3 seconds compelling`,
          `Use B-roll footage to maintain interest`,
          `End with a clear call to action`
        ]
      });

      setIsGenerating(false);
    }, 2000);
  };

  const generateSectionContent = (title: string, script: VideoScript, index: number): string => {
    const templates: Record<string, string[]> = {
      "Introduction & Problem Statement": [
        `Hey everyone! Today we're diving into ${script.topic}.`,
        `Before we begin, I want to address a common problem: ${index === 0 ? "many people struggle with understanding " + script.topic.toLowerCase() : ""}`,
        `By the end of this video, you'll have a complete understanding of ${script.topic}.`
      ],
      "What You'll Learn Today": [
        `In this video, we'll cover: ${index + 1} key points about ${script.topic}.`,
        `Let's break down exactly what you need to know about ${script.topic}.`
      ],
      "Key Concept Explanation": [
        `Now, let's dive into the core concepts of ${script.topic}.`,
        `The first thing you need to understand about ${script.topic} is...`
      ],
      "Step-by-Step Process": [
        `Here's the step-by-step process for ${script.topic}:`,
        `Let's break this down into manageable steps.`
      ],
      "The Hook - Attention Grabber": [
        `Wait until you see what happened next...`,
        `This is the craziest thing I've ever experienced with ${script.topic}.`
      ]
    };

    const template = templates[title] || [`Now let's talk about ${title.toLowerCase()} regarding ${script.topic}.`];
    return template[Math.floor(Math.random() * template.length)];
  };

  const copySection = (section: string, title: string) => {
    navigator.clipboard.writeText(`${title}\n\n${section}`);
    setCopiedSection(title);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const downloadScript = () => {
    if (!scriptContent) return;

    const text = `
# ${script.topic} - Video Script
Platform: ${script.platform} | Type: ${script.videoType} | Duration: ${script.duration}
Tone: ${script.tone} | Audience: ${script.targetAudience} | Language: ${script.language}

==========================================
                    SCRIPT
==========================================

HOOK (First 3 seconds)
----------------------
${scriptContent.hook}

${scriptContent.sections.map((section, i) => `
SECTION ${i + 1}: ${section.title} (${section.duration})
--------------------------------------------------
${section.content}
`).join("")}

CALL TO ACTION
---------------
${scriptContent.cta}

==========================================
                  TIPS
==========================================
${scriptContent.tips.map(tip => `• ${tip}`).join("\n")}

---
Generated by IndiaToolkit.in
    `.trim();

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${script.topic.replace(/\s+/g, "-").toLowerCase()}-script.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setScript({
      topic: "",
      platform: "YouTube",
      videoType: "Educational",
      duration: "5 minutes",
      tone: "Professional",
      targetAudience: "General Public",
      language: "English"
    });
    setScriptContent(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <Video className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Video Script Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create professional video scripts in minutes
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Topic */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Video Topic
              </label>
              <input
                type="text"
                value={script.topic}
                onChange={(e) => updateField("topic", e.target.value)}
                placeholder="What is your video about?"
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-red-500 focus:outline-none font-medium"
              />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Platform
                </label>
                <select
                  value={script.platform}
                  onChange={(e) => updateField("platform", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-red-500 focus:outline-none font-medium"
                >
                  {platforms.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Video Type
                </label>
                <select
                  value={script.videoType}
                  onChange={(e) => updateField("videoType", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-red-500 focus:outline-none font-medium"
                >
                  {videoTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Duration
                </label>
                <select
                  value={script.duration}
                  onChange={(e) => updateField("duration", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-red-500 focus:outline-none font-medium"
                >
                  {durations.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Tone
                </label>
                <select
                  value={script.tone}
                  onChange={(e) => updateField("tone", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-red-500 focus:outline-none font-medium"
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
                  value={script.targetAudience}
                  onChange={(e) => updateField("targetAudience", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-red-500 focus:outline-none font-medium"
                >
                  {audiences.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Language
                </label>
                <select
                  value={script.language}
                  onChange={(e) => updateField("language", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-red-500 focus:outline-none font-medium"
                >
                  {languages.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={generateScript}
                disabled={!script.topic.trim() || isGenerating}
                className="flex-1 h-14 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-red-600 hover:to-pink-700 transition-all shadow-lg shadow-red-100 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Script
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
          {scriptContent && (
            <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 border-t border-red-100">
              {/* Hook */}
              <div className="mb-6 p-5 bg-white rounded-2xl border border-red-100">
                <div className="flex items-center gap-2 mb-3">
                  <Play className="h-5 w-5 text-red-500" />
                  <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
                    Hook (First 3 Seconds)
                  </span>
                </div>
                <p className="text-lg font-bold text-slate-800">{scriptContent.hook}</p>
              </div>

              {/* Sections */}
              <div className="space-y-4 mb-6">
                {scriptContent.sections.map((section, index) => (
                  <div key={index} className="bg-white rounded-2xl p-5 border border-red-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-bold">
                          {section.duration}
                        </span>
                        <h3 className="font-bold text-slate-800">{section.title}</h3>
                      </div>
                      <button
                        onClick={() => copySection(section.content, section.title)}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-all"
                      >
                        {copiedSection === section.title ? (
                          <span className="text-xs text-green-600 font-bold">Copied!</span>
                        ) : (
                          <Copy className="h-4 w-4 text-slate-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-slate-600">{section.content}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mb-6 p-4 bg-red-500 rounded-2xl text-white">
                <span className="text-xs font-bold uppercase tracking-widest opacity-80">Call to Action</span>
                <p className="font-bold mt-1">{scriptContent.cta}</p>
              </div>

              {/* Tips */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <h3 className="font-bold text-amber-800 text-sm mb-3">📹 Filming Tips</h3>
                <ul className="space-y-2">
                  {scriptContent.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-amber-700">
                      <span className="text-amber-500">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Download */}
              <button
                onClick={downloadScript}
                className="w-full mt-4 h-12 bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all"
              >
                <Download className="h-5 w-5" />
                Download Full Script
              </button>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
            <Clock className="h-8 w-8 text-red-600 mb-3" />
            <h3 className="font-bold text-red-800 mb-2">Hook Fast</h3>
            <p className="text-sm text-red-700">
              Grab attention in the first 3 seconds to keep viewers engaged.
            </p>
          </div>
          <div className="p-6 bg-pink-50 rounded-2xl border border-pink-100">
            <Users className="h-8 w-8 text-pink-600 mb-3" />
            <h3 className="font-bold text-pink-800 mb-2">Know Your Audience</h3>
            <p className="text-sm text-pink-700">
              Tailor your content and tone to resonate with your target viewers.
            </p>
          </div>
          <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
            <FileText className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-purple-800 mb-2">Script Everything</h3>
            <p className="text-sm text-purple-700">
              A well-prepared script ensures smooth delivery and professional results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
