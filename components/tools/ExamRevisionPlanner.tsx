"use client";

import { useState } from "react";
import { BookOpen, Calendar, Clock, Target, Download, RefreshCw, CheckCircle, BookMarked } from "lucide-react";

interface StudyPlan {
  day: string;
  date: string;
  subject: string;
  topics: string[];
  hours: number;
  completed: boolean;
}

export default function ExamRevisionPlanner() {
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [subjects, setSubjects] = useState<string[]>([""]);
  const [dailyHours, setDailyHours] = useState(4);
  const [plan, setPlan] = useState<StudyPlan[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const addSubject = () => {
    setSubjects([...subjects, ""]);
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const updateSubject = (index: number, value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index] = value;
    setSubjects(newSubjects);
  };

  const generatePlan = async () => {
    if (!examName || !examDate || subjects.filter(s => s.trim()).length === 0) return;

    setIsGenerating(true);

    setTimeout(() => {
      const exam = new Date(examDate);
      const today = new Date();
      const daysUntil = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const validSubjects = subjects.filter(s => s.trim());
      const daysToStudy = Math.min(daysUntil, 30); // Max 30 days plan
      
      const newPlan: StudyPlan[] = [];
      const topicsPerSubject: Record<string, string[]> = {
        "Mathematics": ["Algebra", "Geometry", "Calculus", "Statistics", "Trigonometry"],
        "Physics": ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics", "Modern Physics"],
        "Chemistry": ["Organic", "Inorganic", "Physical", "Analytical", "Biochemistry"],
        "Biology": ["Cell Biology", "Genetics", "Ecology", "Physiology", "Evolution"],
        "English": ["Grammar", "Literature", "Writing", "Comprehension", "Vocabulary"],
        "History": ["Ancient", "Medieval", "Modern", "World History", "Indian History"],
        "Computer Science": ["Programming", "Data Structures", "Algorithms", "DBMS", "Networks"]
      };

      const topicsPool = validSubjects.flatMap(s => 
        topicsPerSubject[s] || [`${s} - Chapter 1`, `${s} - Chapter 2`, `${s} - Chapter 3`]
      );

      for (let i = 0; i < daysToStudy; i++) {
        const studyDate = new Date();
        studyDate.setDate(today.getDate() + i);
        
        const dayTopics = topicsPool.slice(
          (i * 3) % topicsPool.length,
          (i * 3) % topicsPool.length + 3
        );

        newPlan.push({
          day: studyDate.toLocaleDateString("en-US", { weekday: "long" }),
          date: studyDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
          subject: validSubjects[i % validSubjects.length],
          topics: dayTopics,
          hours: dailyHours,
          completed: false
        });
      }

      setPlan(newPlan);
      setIsGenerating(false);
    }, 1500);
  };

  const toggleComplete = (index: number) => {
    const newPlan = [...plan];
    newPlan[index].completed = !newPlan[index].completed;
    setPlan(newPlan);
  };

  const downloadPlan = () => {
    const text = `📚 EXAM REVISION PLAN: ${examName}\n📅 Exam Date: ${examDate}\n⏰ Daily Hours: ${dailyHours}\n\n` +
      plan.map((p, i) => 
        `${p.completed ? "✅" : "⬜"} Day ${i + 1} - ${p.day}, ${p.date}\n   Subject: ${p.subject}\n   Topics: ${p.topics.join(", ")}\n   Hours: ${p.hours}\n\n`
      ).join("");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${examName.replace(/\s+/g, "-").toLowerCase()}-revision-plan.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setExamName("");
    setExamDate("");
    setSubjects([""]);
    setPlan([]);
  };

  const progress = plan.length > 0 
    ? Math.round((plan.filter(p => p.completed).length / plan.length) * 100) 
    : 0;

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Exam Revision Planner</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create a personalized study schedule for exam success
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Exam Name */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Exam Name
              </label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="e.g., JEE, NEET, CAT, Board Exams"
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium"
              />
            </div>

            {/* Exam Date */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Exam Date
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium"
              />
            </div>

            {/* Subjects */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Subjects to Cover
              </label>
              <div className="space-y-3">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => updateSubject(index, e.target.value)}
                      placeholder="Enter subject name..."
                      className="flex-1 p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium"
                    />
                    {subjects.length > 1 && (
                      <button
                        onClick={() => removeSubject(index)}
                        className="px-4 py-2 rounded-2xl bg-red-100 text-red-600 font-bold hover:bg-red-200 transition-all"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addSubject}
                className="mt-3 text-sm text-amber-600 font-bold hover:text-amber-700"
              >
                + Add Another Subject
              </button>
            </div>

            {/* Daily Hours */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Daily Study Hours: {dailyHours}
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={dailyHours}
                onChange={(e) => setDailyHours(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={generatePlan}
                disabled={!examName || !examDate || subjects.filter(s => s.trim()).length === 0 || isGenerating}
                className="flex-1 h-14 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-100 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Creating Plan...
                  </>
                ) : (
                  <>
                    <Calendar className="h-5 w-5" />
                    Generate Study Plan
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
          {plan.length > 0 && (
            <>
              {/* Progress Bar */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Progress
                  </span>
                  <span className="text-sm font-bold text-slate-700">{progress}% Complete</span>
                </div>
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 uppercase text-sm">
                    Your Study Schedule
                  </h3>
                  <button
                    onClick={downloadPlan}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-xl text-sm font-bold hover:bg-amber-200 transition-all"
                  >
                    <Download className="h-4 w-4" />
                    Download Plan
                  </button>
                </div>

                <div className="space-y-3">
                  {plan.map((p, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-2xl border transition-all ${
                        p.completed 
                          ? "bg-green-50 border-green-200" 
                          : "bg-white border-slate-200 hover:border-amber-200"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggleComplete(index)}
                          className={`mt-1 p-1 rounded-lg transition-all ${
                            p.completed 
                              ? "bg-green-500 text-white" 
                              : "bg-slate-100 text-slate-400 hover:bg-green-100 hover:text-green-500"
                          }`}
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-amber-600 uppercase">
                              Day {index + 1}
                            </span>
                            <span className="text-xs text-slate-400">
                              {p.day}, {p.date}
                            </span>
                          </div>
                          <p className="font-bold text-slate-800">{p.subject}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {p.topics.map((topic, tIndex) => (
                              <span 
                                key={tIndex}
                                className={`text-xs px-2 py-1 rounded-lg ${
                                  p.completed
                                    ? "bg-green-100 text-green-700 line-through"
                                    : "bg-amber-100 text-amber-700"
                                }`}
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                            <Clock className="h-3 w-3" />
                            <span>{p.hours} hours</span>
                          </div>
                        </div>
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
          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
            <Target className="h-8 w-8 text-amber-600 mb-3" />
            <h3 className="font-bold text-amber-800 mb-2">Smart Scheduling</h3>
            <p className="text-sm text-amber-700">
              AI-powered schedule that distributes topics evenly across your study days.
            </p>
          </div>
          <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
            <BookMarked className="h-8 w-8 text-orange-600 mb-3" />
            <h3 className="font-bold text-orange-800 mb-2">Topic Tracking</h3>
            <p className="text-sm text-orange-700">
              Track completion of each topic and monitor your revision progress.
            </p>
          </div>
          <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
            <Calendar className="h-8 w-8 text-red-600 mb-3" />
            <h3 className="font-bold text-red-800 mb-2">Exam Ready</h3>
            <p className="text-sm text-red-700">
              Be fully prepared with a structured revision plan before your exam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
