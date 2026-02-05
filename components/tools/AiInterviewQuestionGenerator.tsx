"use client";

import { useState } from "react";
import { MessageSquare, Copy, Download, RefreshCw, Briefcase, Clock, Target, Sparkles } from "lucide-react";

interface InterviewQuestion {
  question: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tips: string;
}

const jobRoles = [
  "Software Developer",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "Marketing Manager",
  "Sales Executive",
  "Business Analyst",
  "DevOps Engineer",
  "Content Writer",
  "HR Manager"
];

const questionTypes = [
  "Technical",
  "Behavioral",
  "Situational",
  "General",
  "Role-Specific"
];

export default function AiInterviewQuestionGenerator() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("2-5");
  const [questionType, setQuestionType] = useState("Technical");
  const [count, setCount] = useState(5);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateQuestions = async () => {
    if (!role.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const generatedQuestions: InterviewQuestion[] = [];
      
      const roleQuestions: Record<string, string[]> = {
        "Software Developer": [
          "Explain the difference between let, const, and var in JavaScript.",
          "How would you optimize the performance of a slow web application?",
          "Describe your approach to debugging a memory leak in Node.js.",
          "What is the difference between REST and GraphQL APIs?",
          "How do you handle version control in a team environment?",
          "Explain the concept of dependency injection and its benefits.",
          "Describe a challenging bug you encountered and how you fixed it.",
          "How do you ensure code quality and follow best practices?"
        ],
        "Data Scientist": [
          "Explain the bias-variance tradeoff in machine learning.",
          "How would you handle missing values in a large dataset?",
          "Describe the difference between supervised and unsupervised learning.",
          "What metrics would you use to evaluate a classification model?",
          "How do you prevent overfitting in a predictive model?",
          "Explain the steps you follow in an end-to-end data science project.",
          "What is the difference between batch processing and stream processing?",
          "How do you communicate complex technical findings to non-technical stakeholders?"
        ],
        "Product Manager": [
          "How do you prioritize features in a product roadmap?",
          "Describe a time when you had to make a decision with incomplete information.",
          "How do you gather and incorporate user feedback into product decisions?",
          "What metrics would you track to measure product success?",
          "How do you balance stakeholder requests with user needs?",
          "Describe your experience working with engineering and design teams.",
          "How do you handle scope creep in a project?",
          "What is your approach to competitive analysis?"
        ]
      };

      const baseQuestions = roleQuestions[role] || [
        `Tell me about yourself and your experience as a ${role}.`,
        `What are the key skills required for this ${role} position?`,
        `Describe a challenging project you worked on as a ${role}.`,
        `How do you stay updated with industry trends in ${role}?`,
        `What is your approach to problem-solving as a ${role}?`
      ];

      for (let i = 0; i < count; i++) {
        const randomQuestion = baseQuestions[i % baseQuestions.length];
        generatedQuestions.push({
          question: randomQuestion,
          category: questionType,
          difficulty: i % 3 === 0 ? "Hard" : i % 3 === 1 ? "Medium" : "Easy",
          tips: "Think about specific examples from your experience. Use the STAR method (Situation, Task, Action, Result)."
        });
      }

      setQuestions(generatedQuestions);
      setIsGenerating(false);
    }, 1500);
  };

  const copyQuestion = (index: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadQuestions = () => {
    const text = questions.map((q, i) => 
      `${i + 1}. ${q.question}\n   Category: ${q.category} | Difficulty: ${q.difficulty}\n   Tips: ${q.tips}\n\n`
    ).join("");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${role.replace(/\s+/g, "-").toLowerCase()}-interview-questions.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setRole("");
    setQuestions([]);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Interview Question Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Generate personalized interview questions for any job role
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Job Role */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Job Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none font-medium bg-white"
              >
                <option value="">Select a job role...</option>
                {jobRoles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
                <option value="custom">Custom Role</option>
              </select>
              {role === "custom" && (
                <input
                  type="text"
                  placeholder="Enter custom job role..."
                  className="w-full mt-3 p-4 rounded-2xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none font-medium"
                  onChange={(e) => setRole(e.target.value)}
                />
              )}
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Experience Level
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none font-medium bg-white"
                >
                  <option value="0-2">Freshers (0-2 years)</option>
                  <option value="2-5">Mid-Level (2-5 years)</option>
                  <option value="5-10">Senior (5-10 years)</option>
                  <option value="10+">Executive (10+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Question Type
                </label>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none font-medium bg-white"
                >
                  {questionTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Number of Questions: {count}
                </label>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-purple-500"
                />
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={generateQuestions}
                disabled={!role.trim() || isGenerating}
                className="flex-1 h-14 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg shadow-purple-100 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Questions
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
          {questions.length > 0 && (
            <>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 uppercase text-sm">
                    Generated Questions ({questions.length})
                  </h3>
                  <button
                    onClick={downloadQuestions}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-xl text-sm font-bold hover:bg-purple-200 transition-all"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>

                <div className="space-y-4">
                  {questions.map((q, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-purple-200 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-purple-600 uppercase">
                              Q{index + 1}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              q.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                              q.difficulty === "Medium" ? "bg-amber-100 text-amber-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {q.difficulty}
                            </span>
                            <span className="text-xs text-slate-400">
                              {q.category}
                            </span>
                          </div>
                          <p className="font-medium text-slate-800">{q.question}</p>
                          <div className="mt-3 p-3 bg-blue-50 rounded-xl">
                            <p className="text-xs text-blue-700">
                              <strong>💡 Tips:</strong> {q.tips}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyQuestion(index, q.question)}
                          className="p-2 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
                        >
                          {copiedIndex === index ? (
                            <span className="text-xs text-green-600 font-bold">Copied!</span>
                          ) : (
                            <Copy className="h-4 w-4 text-slate-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
            <Briefcase className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-purple-800 mb-2">Role-Specific</h3>
            <p className="text-sm text-purple-700">
              Questions tailored to your specific job role and industry.
            </p>
          </div>
          <div className="p-6 bg-pink-50 rounded-2xl border border-pink-100">
            <Target className="h-8 w-8 text-pink-600 mb-3" />
            <h3 className="font-bold text-pink-800 mb-2">Difficulty Levels</h3>
            <p className="text-sm text-pink-700">
              Mix of easy, medium, and hard questions for complete prep.
            </p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <Clock className="h-8 w-8 text-indigo-600 mb-3" />
            <h3 className="font-bold text-indigo-800 mb-2">Quick Prep</h3>
            <p className="text-sm text-indigo-700">
              Generate multiple questions in seconds for efficient practice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
