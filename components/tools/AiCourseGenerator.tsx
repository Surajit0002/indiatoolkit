"use client";

import { useState } from "react";
import { BookOpen, Sparkles, Wand2, Target, Users, Clock, Download, MessageSquare, Book } from "lucide-react";
import AiChatInterface from "@/components/ai/AiChatInterface";

const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];
const durations = ["1-2 hours", "4-6 hours", "8-12 hours", "20+ hours"];
const formats = ["Video Course", "Text/Article Course", "Mixed (Video + Text)", "Interactive Course", "Workshop Series"];
const languages = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi"];

const systemPrompt = `You are an expert instructional designer for Omnitools AI Tools. Your task is to create comprehensive, well-structured course curricula.

When generating course content, always include:
1. Clear course title that reflects the topic
2. Well-organized modules with logical progression
3. Detailed lessons within each module
4. Learning objectives for each section
5. Practical exercises and assessments
6. Duration estimates for each module
7. Prerequisites and target audience

Structure your curriculum using:
- Module numbers and titles
- Lesson topics within each module
- Estimated time for each section
- Progressive difficulty from basics to advanced
- Hands-on projects where appropriate

Generate professional, educationally sound curricula that are practical and implementable.`;

export default function AiCourseGenerator() {
  const [useChatMode, setUseChatMode] = useState(true);

  const buildCoursePrompt = (params: {
    topic: string;
    level: string;
    duration: string;
    audience: string;
    format: string;
    language: string;
  }) => {
    return `Create a complete ${params.level.toLowerCase()} course curriculum for "${params.topic}" with the following specifications:
- Duration: ${params.duration}
- Target Audience: ${params.audience}
- Course Format: ${params.format}
- Language: ${params.language}

Please include:
1. Course title
2. Course description
3. Learning objectives
4. Number of modules based on duration
5. Detailed lessons for each module
6. Estimated time for each module
7. Practical exercises or projects
8. Prerequisites if any

Structure the curriculum in a clear, organized format with module numbers and lesson topics.`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">AI Course Generator</h1>
              <p className="text-violet-100 mt-1">Create professional course curricula with AI-powered design</p>
            </div>
          </div>
          
          {/* Mode Toggle */}
          <div className="flex items-center gap-4 mt-6">
            <span className="text-sm text-violet-100">Mode:</span>
            <div className="flex bg-white/10 rounded-xl p-1 backdrop-blur-sm">
              <button
                onClick={() => setUseChatMode(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  useChatMode 
                    ? "bg-white text-violet-600 shadow-lg" 
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
                    ? "bg-white text-violet-600 shadow-lg" 
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
              toolId="ai-course-generator"
              toolName="AI Course Generator"
              systemPrompt={systemPrompt}
              placeholder="Describe your course idea, e.g., 'Create a comprehensive course on digital marketing for beginners covering social media, SEO, and content marketing...'"
            />
          </div>
        ) : (
          /* Form Mode */
          <FormMode 
            levels={levels}
            durations={durations}
            formats={formats}
            languages={languages}
            buildPrompt={buildCoursePrompt}
            systemPrompt={systemPrompt}
          />
        )}

        {/* Feature Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-violet-100">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-violet-800 mb-2">Structured Learning</h3>
            <p className="text-sm text-violet-700">
              Well-organized modules ensure progressive skill building and better knowledge retention.
            </p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-purple-800 mb-2">Audience Focused</h3>
            <p className="text-sm text-purple-700">
              Tailor content to meet the specific needs and skill levels of your target learners.
            </p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-100">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-pink-800 mb-2">Flexible Duration</h3>
            <p className="text-sm text-pink-700">
              Create courses from quick workshops to comprehensive masterclasses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Form Mode Component
interface CourseParams {
  topic: string;
  level: string;
  duration: string;
  audience: string;
  format: string;
  language: string;
}

function FormMode({ 
  levels, 
  durations, 
  formats,
  languages,
  buildPrompt,
  systemPrompt
}: { 
  levels: string[];
  durations: string[];
  formats: string[];
  languages: string[];
  buildPrompt: (params: CourseParams) => string;
  systemPrompt: string;
}) {
  const [params, setParams] = useState<CourseParams>({
    topic: "",
    level: "Beginner",
    duration: "4-6 hours",
    audience: "Students",
    format: "Video Course",
    language: "English"
  });
  const [generatedCourse, setGeneratedCourse] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCourse = async () => {
    if (!params.topic.trim()) return;
    setIsGenerating(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: buildPrompt(params),
          toolId: "ai-course-generator",
          systemPrompt
        })
      });

      const data = await response.json();
      setGeneratedCourse(data.text);
    } catch (error) {
      console.error("Error generating course:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadCourse = () => {
    if (!generatedCourse) return;
    const blob = new Blob([generatedCourse], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${params.topic.replace(/\s+/g, "-").toLowerCase()}-course.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const updateField = (field: keyof CourseParams, value: string) => {
    setParams((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Input Form */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Topic */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Course Topic
            </label>
            <input
              type="text"
              value={params.topic}
              onChange={(e) => updateField("topic", e.target.value)}
              placeholder="What do you want to teach?"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium"
            />
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={params.level}
                onChange={(e) => updateField("level", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium bg-white"
              >
                {levels.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Course Duration
              </label>
              <select
                value={params.duration}
                onChange={(e) => updateField("duration", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium bg-white"
              >
                {durations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Target Audience
              </label>
              <select
                value={params.audience}
                onChange={(e) => updateField("audience", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium bg-white"
              >
                <option value="Students">Students</option>
                <option value="Professionals">Professionals</option>
                <option value="Entrepreneurs">Entrepreneurs</option>
                <option value="Hobbyists">Hobbyists</option>
                <option value="Career Changers">Career Changers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Course Format
              </label>
              <select
                value={params.format}
                onChange={(e) => updateField("format", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium bg-white"
              >
                {formats.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateCourse}
            disabled={!params.topic.trim() || isGenerating}
            className="w-full h-14 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg shadow-violet-500/25 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating your course...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Course Curriculum
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {generatedCourse && (
          <div className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 border-t border-violet-100">
            {/* Course Content */}
            <div className="bg-white rounded-2xl p-6 border border-violet-100 mb-4 max-h-96 overflow-y-auto">
              <div className="prose prose-slate max-w-none">
                {generatedCourse.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-4 text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={downloadCourse}
                className="flex-1 h-12 bg-violet-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-violet-700 transition-all"
              >
                <Download className="h-5 w-5" />
                Download Curriculum
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
