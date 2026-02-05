"use client";

import { useState } from "react";
import { BookOpen, Users, Clock, Download, RefreshCw, Sparkles, CheckCircle, Target, Book } from "lucide-react";

interface CourseData {
  topic: string;
  level: string;
  duration: string;
  audience: string;
  format: string;
  language: string;
}

const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];
const durations = ["1-2 hours", "4-6 hours", "8-12 hours", "20+ hours"];
const formats = ["Video Course", "Text/Article Course", "Mixed (Video + Text)", "Interactive Course", "Workshop Series"];
const languages = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi"];

export default function AiCourseGenerator() {
  const [course, setCourse] = useState<CourseData>({
    topic: "",
    level: "Beginner",
    duration: "4-6 hours",
    audience: "Students",
    format: "Video Course",
    language: "English"
  });

  const [curriculum, setCurriculum] = useState<{
    title: string;
    modules: { title: string; lessons: string[]; duration: string }[];
    totalLessons: number;
    estimatedHours: number;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const updateField = (field: keyof CourseData, value: string) => {
    setCourse({ ...course, [field]: value });
  };

  const generateCurriculum = async () => {
    if (!course.topic.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const moduleCount = course.duration === "1-2 hours" ? 3 :
                         course.duration === "4-6 hours" ? 5 :
                         course.duration === "8-12 hours" ? 8 : 12;
      
      const lessonsPerModule = course.duration === "1-2 hours" ? 3 :
                               course.duration === "4-6 hours" ? 4 :
                               course.duration === "8-12 hours" ? 5 : 6;

      const lessonTemplates = {
        "Beginner": [
          "Introduction to {topic}",
          "Getting Started with {topic}",
          "Basic Concepts of {topic}",
          "Your First {topic} Project",
          "Common Mistakes to Avoid",
          "Practice Exercise",
          "Summary & Next Steps"
        ],
        "Intermediate": [
          "Review of Basics",
          "Advanced Concepts in {topic}",
          "Deep Dive into {topic}",
          "Real-World Applications",
          "Case Studies & Examples",
          "Hands-on Project",
          "Best Practices"
        ],
        "Advanced": [
          "Mastering {topic}",
          "Advanced Techniques & Strategies",
          "Industry Standards & Trends",
          "Complex Problem Solving",
          "Expert-Level Projects",
          "Professional Tips & Tricks",
          "Certification Preparation"
        ]
      };

      const templates = lessonTemplates[course.level as keyof typeof lessonTemplates] || lessonTemplates["Beginner"];
      const topic = course.topic;

      const modules = [];
      for (let i = 0; i < moduleCount; i++) {
        const lessons = templates.slice(0, lessonsPerModule).map(l => 
          l.replace("{topic}", topic)
        );
        
        modules.push({
          title: `Module ${i + 1}: ${getModuleTitle(i, course.level)}`,
          lessons,
          duration: `${Math.round(parseInt(course.duration) * 1000 / moduleCount / 60)} min`
        });
      }

      setCurriculum({
        title: `Complete ${course.level} ${course.topic} Masterclass`,
        modules,
        totalLessons: moduleCount * lessonsPerModule,
        estimatedHours: parseInt(course.duration) || 5
      });

      setIsGenerating(false);
    }, 2000);
  };

  const getModuleTitle = (index: number, level: string): string => {
    const beginnerTitles = [
      "Getting Started", "Fundamentals", "Core Skills", "Building Blocks", "Practical Application",
      "Putting It Together", "Advanced Basics", "Polishing Your Skills", "Final Project", "Review & Resources"
    ];
    
    const intermediateTitles = [
      "Building Foundations", "Expanding Knowledge", "Practical Techniques", "Advanced Concepts",
      "Professional Skills", "Real-World Projects", "Industry Applications", "Expert Strategies",
      "Capstone Project", "Professional Development"
    ];
    
    const advancedTitles = [
      "Mastering Fundamentals", "Expert Techniques", "Complex Problem Solving", "Industry Leadership",
      "Innovation & Strategy", "Professional Mastery", "Advanced Projects", "Expert Consultation",
      "Final Certification Project", "Career Advancement"
    ];

    const titles = level === "Beginner" ? beginnerTitles :
                  level === "Intermediate" ? intermediateTitles : advancedTitles;
    
    return titles[index % titles.length];
  };

  const downloadCurriculum = () => {
    if (!curriculum) return;

    const text = `
===============================================
  ${course.topic.toUpperCase()} - COURSE CURRICULUM
===============================================

Course Details
--------------
Title: ${curriculum.title}
Level: ${course.level}
Format: ${course.format}
Duration: ${course.duration}
Audience: ${course.audience}
Language: ${course.language}

Total: ${curriculum.totalLessons} Lessons | ${curriculum.estimatedHours} Hours

===============================================
              CURRICULUM
===============================================

${curriculum.modules.map((module, i) => `
MODULE ${i + 1}: ${module.title}
Duration: ${module.duration}
----------------------------------------
${module.lessons.map((lesson, j) => `  ${j + 1}. ${lesson}`).join("\n")}
`).join("\n")}

===============================================
          COURSE STRATEGY
===============================================

Teaching Approach:
- Start with clear learning objectives
- Include hands-on exercises
- Add quizzes and assessments
- Provide downloadable resources
- Include real-world examples

Engagement Techniques:
- Interactive elements throughout
- Community discussion forums
- Lifetime access to updates
- Certificate of completion

===============================================
    Generated by IndiaToolkit.in
===============================================
    `.trim();

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${course.topic.replace(/\s+/g, "-").toLowerCase()}-course-curriculum.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setCourse({
      topic: "",
      level: "Beginner",
      duration: "4-6 hours",
      audience: "Students",
      format: "Video Course",
      language: "English"
    });
    setCurriculum(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Course Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create professional course curricula in minutes
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Topic */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Course Topic
              </label>
              <input
                type="text"
                value={course.topic}
                onChange={(e) => updateField("topic", e.target.value)}
                placeholder="What do you want to teach?"
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium"
              />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Difficulty Level
                </label>
                <select
                  value={course.level}
                  onChange={(e) => updateField("level", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium"
                >
                  {levels.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Course Duration
                </label>
                <select
                  value={course.duration}
                  onChange={(e) => updateField("duration", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium"
                >
                  {durations.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Target Audience
                </label>
                <select
                  value={course.audience}
                  onChange={(e) => updateField("audience", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium"
                >
                  <option value="Students">Students</option>
                  <option value="Professionals">Professionals</option>
                  <option value="Entrepreneurs">Entrepreneurs</option>
                  <option value="Hobbyists">Hobbyists</option>
                  <option value="Career Changers">Career Changers</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Course Format
                </label>
                <select
                  value={course.format}
                  onChange={(e) => updateField("format", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium"
                >
                  {formats.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Language
                </label>
                <select
                  value={course.language}
                  onChange={(e) => updateField("language", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none font-medium"
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
                onClick={generateCurriculum}
                disabled={!course.topic.trim() || isGenerating}
                className="flex-1 h-14 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-violet-600 hover:to-purple-700 transition-all shadow-lg shadow-violet-100 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Curriculum
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
          {curriculum && (
            <div className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 border-t border-violet-100">
              {/* Course Overview */}
              <div className="text-center mb-6">
                <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-2">
                  Course Curriculum
                </p>
                <h3 className="text-xl font-black text-slate-900 mb-2">
                  {curriculum.title}
                </h3>
                <div className="flex items-center justify-center gap-6 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Book className="h-4 w-4" />
                    {curriculum.modules.length} Modules
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {curriculum.totalLessons} Lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {curriculum.estimatedHours} Hours
                  </span>
                </div>
              </div>

              {/* Modules */}
              <div className="space-y-4 mb-6">
                {curriculum.modules.map((module, index) => (
                  <div key={index} className="bg-white rounded-2xl p-5 border border-violet-100">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-violet-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800">{module.title}</h4>
                        <p className="text-xs text-slate-500">{module.duration} • {module.lessons.length} lessons</p>
                      </div>
                    </div>
                    <ul className="space-y-2 ml-11">
                      {module.lessons.map((lesson, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle className="h-3 w-3 text-violet-400" />
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Download */}
              <button
                onClick={downloadCurriculum}
                className="w-full h-12 bg-violet-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-violet-700 transition-all"
              >
                <Download className="h-5 w-5" />
                Download Full Curriculum
              </button>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-violet-50 rounded-2xl border border-violet-100">
            <Target className="h-8 w-8 text-violet-600 mb-3" />
            <h3 className="font-bold text-violet-800 mb-2">Structured Learning</h3>
            <p className="text-sm text-violet-700">
              Well-organized modules ensure progressive skill building and better retention.
            </p>
          </div>
          <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
            <Users className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-purple-800 mb-2">Audience Focused</h3>
            <p className="text-sm text-purple-700">
              Tailor content to meet the specific needs of your target learners.
            </p>
          </div>
          <div className="p-6 bg-pink-50 rounded-2xl border border-pink-100">
            <BookOpen className="h-8 w-8 text-pink-600 mb-3" />
            <h3 className="font-bold text-pink-800 mb-2">Engaging Content</h3>
            <p className="text-sm text-pink-700">
              Include practical exercises and real-world examples for better engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
