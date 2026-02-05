"use client";

import { useState } from "react";
import { FileText, CheckCircle, AlertTriangle, Copy, RefreshCw, Sparkles, X, ChevronRight, Info } from "lucide-react";

interface GrammarIssue {
  id: string;
  type: "spelling" | "grammar" | "style" | "punctuation";
  message: string;
  suggestion: string;
  position: {
    start: number;
    end: number;
  };
  severity: "error" | "warning" | "info";
}

export default function GrammarChecker() {
  const [text, setText] = useState("");
  const [issues, setIssues] = useState<GrammarIssue[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  // Demo grammar checking rules
  const demoRules: { pattern: RegExp; type: GrammarIssue["type"]; message: string; suggestion: string; severity: GrammarIssue["severity"] }[] = [
    { pattern: /\btheir\s+is\b/gi, type: "grammar", message: "Should be 'there is'", suggestion: "there is", severity: "error" },
    { pattern: /\byour\s+welcome\b/gi, type: "spelling", message: "Should be 'you're welcome'", suggestion: "you're welcome", severity: "error" },
    { pattern: /\bits\s+a\s+long\s+way\s+to\s+go\b/gi, type: "style", message: "Consider simplifying", suggestion: "there's still work to do", severity: "warning" },
    { pattern: /\s{2,}/g, type: "punctuation", message: "Multiple spaces detected", suggestion: "single space", severity: "info" },
    { pattern: /\bi\s+/g, type: "grammar", message: "'i' should be capitalized", suggestion: "I", severity: "error" },
    { pattern: /\bvery\s+unique\b/gi, type: "style", message: "'Unique' already means one-of-a-kind", suggestion: "unusual", severity: "warning" },
    { pattern: /\bteh\b/gi, type: "spelling", message: "Typo: 'teh' should be 'the'", suggestion: "the", severity: "error" },
  ];

  const checkGrammar = async () => {
    if (!text.trim()) return;

    setIsChecking(true);
    setIssues([]);

    // Simulate API call
    setTimeout(() => {
      const foundIssues: GrammarIssue[] = [];

      demoRules.forEach((rule, index) => {
        let match;
        const regex = new RegExp(rule.pattern.source, rule.pattern.flags);

        while ((match = regex.exec(text)) !== null) {
          foundIssues.push({
            id: `issue-${index}-${match.index}`,
            type: rule.type,
            message: rule.message,
            suggestion: rule.suggestion,
            position: {
              start: match.index,
              end: match.index + match[0].length,
            },
            severity: rule.severity,
          });
        }
      });

      setIssues(foundIssues);
      setLastChecked(new Date().toLocaleTimeString());
      setIsChecking(false);
    }, 1500);
  };

  const clearText = () => {
    setText("");
    setIssues([]);
    setLastChecked(null);
  };

  const applyFix = (issue: GrammarIssue) => {
    const before = text.substring(0, issue.position.start);
    const after = text.substring(issue.position.end);
    setText(before + issue.suggestion + after);
  };

  const getSeverityColor = (severity: GrammarIssue["severity"]) => {
    switch (severity) {
      case "error":
        return "text-red-500 bg-red-50 border-red-200";
      case "warning":
        return "text-amber-500 bg-amber-50 border-amber-200";
      case "info":
        return "text-blue-500 bg-blue-50 border-blue-200";
      default:
        return "text-slate-500 bg-slate-50 border-slate-200";
    }
  };

  const getTypeIcon = (type: GrammarIssue["type"]) => {
    switch (type) {
      case "spelling":
        return "🔤";
      case "grammar":
        return "📝";
      case "style":
        return "✨";
      case "punctuation":
        return "📍";
      default:
        return "📋";
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Grammar Checker</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Check and improve your writing for grammar and style
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Your Text
                </span>
                {lastChecked && (
                  <span className="text-xs text-slate-400">
                    Last checked: {lastChecked}
                  </span>
                )}
              </div>
              <div className="p-6">
                <textarea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setSelectedIssue(null);
                  }}
                  placeholder="Paste your text here to check for grammar and spelling errors..."
                  className="w-full h-64 p-4 rounded-2xl border-2 border-slate-100 focus:border-green-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none transition-all"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-400">
                  {text.split(/\s+/).filter(Boolean).length} words • {text.length} characters
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={clearText}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all"
                  >
                    Clear
                  </button>
                  <button
                    onClick={checkGrammar}
                    disabled={!text.trim() || isChecking}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold flex items-center gap-2 hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isChecking ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Check Grammar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden min-h-[400px]">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Issues Found: {issues.length}
                </span>
                {issues.length > 0 && (
                  <button
                    onClick={() => {
                      issues.forEach(issue => applyFix(issue));
                      setIssues([]);
                    }}
                    className="text-xs text-green-600 hover:text-green-700 font-medium"
                  >
                    Fix All
                  </button>
                )}
              </div>
              <div className="p-6">
                {issues.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    {isChecking ? (
                      <>
                        <RefreshCw className="h-12 w-12 text-green-300 animate-spin mb-4" />
                        <p className="text-slate-400 font-medium">Checking your text...</p>
                      </>
                    ) : text.length === 0 ? (
                      <>
                        <FileText className="h-16 w-16 text-slate-200 mb-4" />
                        <p className="text-slate-400 font-medium">
                          Enter text to check for grammar issues
                        </p>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-16 w-16 text-emerald-400 mb-4" />
                        <p className="text-slate-400 font-medium mb-2">
                          No issues found!
                        </p>
                        <p className="text-xs text-slate-300">
                          Your text looks good
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {issues.map((issue) => (
                      <div
                        key={issue.id}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedIssue === issue.id
                            ? "border-green-500 bg-green-50"
                            : getSeverityColor(issue.severity)
                        }`}
                        onClick={() => setSelectedIssue(issue.id)}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xl">{getTypeIcon(issue.type)}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                                issue.severity === "error" ? "bg-red-100 text-red-600" :
                                issue.severity === "warning" ? "bg-amber-100 text-amber-600" :
                                "bg-blue-100 text-blue-600"
                              }`}>
                                {issue.severity}
                              </span>
                              <span className="text-xs text-slate-400 capitalize">
                                {issue.type}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-slate-700 mb-1">
                              {issue.message}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span>Found: "</span>
                              <code className="bg-white px-1 rounded border border-slate-200">
                                {text.substring(issue.position.start, issue.position.end)}
                              </code>
                              <span>"</span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              applyFix(issue);
                            }}
                            className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Suggestion */}
                        {selectedIssue === issue.id && (
                          <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
                            <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">
                              Suggestion
                            </p>
                            <div className="flex items-center gap-3">
                              <code className="text-sm text-green-600 font-medium">
                                {issue.suggestion}
                              </code>
                              <button
                                onClick={() => applyFix(issue)}
                                className="text-xs px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        {issues.length > 0 && (
          <div className="mt-6 p-6 bg-white rounded-3xl shadow-xl border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-4 uppercase text-sm">Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Errors", count: issues.filter(i => i.severity === "error").length, color: "text-red-500", bg: "bg-red-50" },
                { label: "Warnings", count: issues.filter(i => i.severity === "warning").length, color: "text-amber-500", bg: "bg-amber-50" },
                { label: "Style", count: issues.filter(i => i.type === "style").length, color: "text-purple-500", bg: "bg-purple-50" },
                { label: "Spelling", count: issues.filter(i => i.type === "spelling").length, color: "text-blue-500", bg: "bg-blue-50" },
              ].map((stat) => (
                <div key={stat.label} className={`p-4 rounded-xl ${stat.bg}`}>
                  <div className={`text-2xl font-black ${stat.color}`}>{stat.count}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-800 mb-2 text-sm">About This Tool</h4>
              <p className="text-xs text-blue-700">
                This is a basic grammar checker for demonstration. For comprehensive writing assistance, 
                consider using tools like Grammarly, Hemingway, or LanguageTool. This tool checks common 
                errors but may not catch all grammar and style issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
