"use client";

import { useState } from "react";
import { Lightbulb, Copy, RefreshCw, Sparkles, Type, Palette, Layout, Maximize2, CheckCircle } from "lucide-react";

interface Suggestion {
  id: number;
  category: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

const categories = [
  "Layout & Composition",
  "Color Scheme",
  "Typography",
  "Visual Hierarchy",
  "White Space",
  "Accessibility",
  "Branding",
];

export default function AiDesignSuggestions() {
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Layout & Composition");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const analyzeDesign = async () => {
    if (!description.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const allSuggestions: Suggestion[] = [
        {
          id: 1,
          category: "Layout & Composition",
          title: "Improve Grid Alignment",
          description: "Ensure all elements align to a consistent grid system. Use a 12-column grid for better responsiveness and visual harmony.",
          priority: "high",
        },
        {
          id: 2,
          category: "Layout & Composition",
          title: "Balance Visual Weight",
          description: "Distribute visual elements more evenly. Consider using asymmetric balance for more dynamic layouts.",
          priority: "medium",
        },
        {
          id: 3,
          category: "Color Scheme",
          title: "Increase Color Contrast",
          description: "Current contrast ratios may not meet WCAG AA standards. Consider darker text on lighter backgrounds or vice versa.",
          priority: "high",
        },
        {
          id: 4,
          category: "Color Scheme",
          title: "Add Accent Colors",
          description: "Introduce 1-2 accent colors to guide user attention to key actions and interactive elements.",
          priority: "medium",
        },
        {
          id: 5,
          category: "Typography",
          title: "Establish Type Scale",
          description: "Create a consistent type scale using a ratio like 1.25 (Major Third) or 1.5 (Perfect Fourth) for better readability.",
          priority: "high",
        },
        {
          id: 6,
          category: "Typography",
          title: "Limit Font Families",
          description: "Stick to 2-3 font families maximum. Consider using one font for headings and another for body text.",
          priority: "low",
        },
        {
          id: 7,
          category: "Visual Hierarchy",
          title: "Strengthen Heading Hierarchy",
          description: "Make sure heading levels are clearly differentiated through size, weight, or color.",
          priority: "high",
        },
        {
          id: 8,
          category: "White Space",
          title: "Increase Breathing Room",
          description: "Add more white space around elements. Aim for 50-100% more space than you initially think is needed.",
          priority: "medium",
        },
        {
          id: 9,
          category: "Accessibility",
          title: "Add Focus States",
          description: "Ensure all interactive elements have visible focus states for keyboard navigation.",
          priority: "high",
        },
        {
          id: 10,
          category: "Accessibility",
          title: "Provide Alt Text",
          description: "Add descriptive alt text to all meaningful images for screen reader users.",
          priority: "high",
        },
      ];

      const filtered = selectedCategory === "All" 
        ? allSuggestions 
        : allSuggestions.filter(s => s.category === selectedCategory);

      setSuggestions(filtered);
      setIsAnalyzing(false);
    }, 2000);
  };

  const copySuggestion = (id: number) => {
    const suggestion = suggestions.find(s => s.id === id);
    if (suggestion) {
      const text = `${suggestion.title}\n\n${suggestion.description}`;
      navigator.clipboard.writeText(text);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-amber-100 text-amber-700";
      case "low": return "bg-green-100 text-green-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Layout & Composition": return <Layout className="h-4 w-4" />;
      case "Color Scheme": return <Palette className="h-4 w-4" />;
      case "Typography": return <Type className="h-4 w-4" />;
      case "White Space": return <Maximize2 className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const resetForm = () => {
    setDescription("");
    setSuggestions([]);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl mb-4 shadow-lg">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Design Suggestions</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Get intelligent suggestions to improve your designs
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Describe your design or project
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your design (e.g., 'a landing page for a SaaS product', 'mobile app onboarding flow', 'e-commerce product page')..."
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:outline-none font-medium resize-none h-28"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Focus Area
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:outline-none font-medium bg-white"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Analyze Button */}
            <div className="flex gap-4">
              <button
                onClick={analyzeDesign}
                disabled={!description.trim() || isAnalyzing}
                className="flex-1 h-14 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-yellow-600 hover:to-amber-700 transition-all shadow-lg shadow-yellow-100 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Get Suggestions
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
          {suggestions.length > 0 && (
            <>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 uppercase text-sm">
                    Design Suggestions ({suggestions.length})
                  </h3>
                  <span className="text-sm text-slate-500">
                    Filtered by: {selectedCategory}
                  </span>
                </div>

                <div className="space-y-4">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-yellow-200 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-yellow-100 rounded-xl shrink-0">
                          {getCategoryIcon(suggestion.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-yellow-600 uppercase">
                              {suggestion.category}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(suggestion.priority)}`}>
                              {suggestion.priority} priority
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-800 mb-1">{suggestion.title}</h4>
                          <p className="text-sm text-slate-600">{suggestion.description}</p>
                        </div>
                        <button
                          onClick={() => copySuggestion(suggestion.id)}
                          className="p-2 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
                          title="Copy suggestion"
                        >
                          <Copy className="h-4 w-4 text-slate-400" />
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
          <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
            <Sparkles className="h-8 w-8 text-yellow-600 mb-3" />
            <h3 className="font-bold text-yellow-800 mb-2">AI Analysis</h3>
            <p className="text-sm text-yellow-700">
              Get data-driven suggestions based on design best practices and user research.
            </p>
          </div>
          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
            <CheckCircle className="h-8 w-8 text-amber-600 mb-3" />
            <h3 className="font-bold text-amber-800 mb-2">Actionable Tips</h3>
            <p className="text-sm text-amber-700">
              Clear, specific recommendations you can implement right away.
            </p>
          </div>
          <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
            <Lightbulb className="h-8 w-8 text-orange-600 mb-3" />
            <h3 className="font-bold text-orange-800 mb-2">Holistic Approach</h3>
            <p className="text-sm text-orange-700">
              Suggestions covering layout, color, typography, and accessibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
