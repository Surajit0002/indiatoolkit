"use client";

import { useState } from "react";
import { FileText, Download, Copy, Save, RefreshCw, BookOpen, Check, Printer } from "lucide-react";

interface Note {
  title: string;
  points: string[];
}

export default function NotesGenerator() {
  const [inputText, setInputText] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('notesInputText');
      if (saved) return saved;
    }
    return "";
  });
  const [notes, setNotes] = useState<Note[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('notesData');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          return data.notes || [];
        } catch {
          return [];
        }
      }
    }
    return [];
  });
  const [title, setTitle] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('notesData');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          return data.title || "My Notes";
        } catch {
          return "My Notes";
        }
      }
    }
    return "My Notes";
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [bullets, setBullets] = useState(true);
  const [numbered, setNumbered] = useState(false);

  const generateNotes = async () => {
    if (!inputText.trim()) return;

    setIsGenerating(true);

    // Simulate AI-generated notes (in production, call an AI API)
    setTimeout(() => {
      const paragraphs = inputText.split(/\n\n+/);
      const generatedNotes: Note[] = paragraphs.map((para, index) => {
        const lines = para.split(/\n/);
        const points = lines
          .filter((line) => line.trim())
          .map((line) => line.replace(/^[•\-\*]\s*/, "").trim());

        return {
          title: `Section ${index + 1}`,
          points: points.length > 0 ? points : [para.substring(0, 100) + "..."],
        };
      });

      setNotes(generatedNotes);
      setIsGenerating(false);
    }, 1500);
  };

  const clearAll = () => {
    setInputText("");
    setNotes([]);
  };

  const copyToClipboard = async () => {
    const text = formatNotesAsText();
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatNotesAsText = () => {
    let text = `# ${title}\n\n`;

    notes.forEach((note, index) => {
      text += `## ${note.title}\n`;
      note.points.forEach((point, i) => {
        if (numbered) {
          text += `${index + 1}.${i + 1}. ${point}\n`;
        } else if (bullets) {
          text += `• ${point}\n`;
        } else {
          text += `${point}\n`;
        }
      });
      text += "\n";
    });

    return text;
  };

  const downloadAsTxt = () => {
    const text = formatNotesAsText();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadAsPdf = () => {
    // Basic print-friendly version
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #1f2937; border-bottom: 2px solid #10b981; padding-bottom: 10px; }
            h2 { color: #374151; margin-top: 30px; }
            ul, ol { line-height: 1.8; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          ${notes
            .map(
              (note) => `
            <h2>${note.title}</h2>
            <${numbered ? "ol" : "ul"}>
              ${note.points.map((p) => `<li>${p}</li>`).join("")}
            </${numbered ? "ol" : "ul"}>
          `
            )
            .join("")}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const localStorageKey = "india-toolkit-notes";
  const saveToLocalStorage = () => {
    const data = {
      title,
      inputText,
      notes,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(localStorageKey, JSON.stringify(data));
    alert("Notes saved to browser storage!");
  };

  

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Smart Notes Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Transform your study material into organized, easy-to-read notes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter notes title..."
                  className="w-full bg-transparent text-lg font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <div className="p-6">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Paste Your Study Material
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your article, book excerpt, or study material here..."
                  className="w-full h-64 p-4 rounded-2xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none transition-all"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-400">
                  {inputText.length} characters
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all"
                  >
                    Clear
                  </button>
                  <button
                    onClick={generateNotes}
                    disabled={!inputText.trim() || isGenerating}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm flex items-center gap-2 hover:from-amber-600 hover:to-orange-700 transition-all disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4" />
                        Generate Notes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden min-h-[400px]">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Generated Notes
                </span>
                <div className="flex gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bullets}
                      onChange={(e) => {
                        setBullets(e.target.checked);
                        if (e.target.checked) setNumbered(false);
                      }}
                      className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-xs text-slate-600">Bullets</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={numbered}
                      onChange={(e) => {
                        setNumbered(e.target.checked);
                        if (e.target.checked) setBullets(false);
                      }}
                      className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-xs text-slate-600">Numbered</span>
                  </label>
                </div>
              </div>

              <div className="p-6">
                {notes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <FileText className="h-16 w-16 text-slate-200 mb-4" />
                    <p className="text-slate-400 font-medium">
                      Your generated notes will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {notes.map((note, noteIndex) => (
                      <div key={noteIndex}>
                        <h3 className="font-bold text-slate-800 mb-3 uppercase text-sm border-b border-slate-100 pb-2">
                          {note.title}
                        </h3>
                        {numbered ? (
                          <ol className="list-decimal list-inside space-y-2">
                            {note.points.map((point, pointIndex) => (
                              <li key={pointIndex} className="text-slate-600 text-sm leading-relaxed">
                                {point}
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <ul className="space-y-2">
                            {note.points.map((point, pointIndex) => (
                              <li key={pointIndex} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
                                <span className="text-amber-500 mt-1">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {notes.length > 0 && (
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 min-w-[100px] py-2 px-4 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-300 transition-all"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={saveToLocalStorage}
                    className="flex-1 min-w-[100px] py-2 px-4 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-300 transition-all"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </button>
                  <button
                    onClick={downloadAsTxt}
                    className="flex-1 min-w-[100px] py-2 px-4 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-300 transition-all"
                  >
                    <Download className="h-4 w-4" />
                    TXT
                  </button>
                  <button
                    onClick={downloadAsPdf}
                    className="flex-1 min-w-[100px] py-2 px-4 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-300 transition-all"
                  >
                    <Printer className="h-4 w-4" />
                    PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
            <FileText className="h-8 w-8 text-amber-600 mb-3" />
            <h3 className="font-bold text-amber-800 mb-2">Smart Organization</h3>
            <p className="text-sm text-amber-700">
              Automatically structures your content into organized sections and bullet points.
            </p>
          </div>
          <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
            <Download className="h-8 w-8 text-orange-600 mb-3" />
            <h3 className="font-bold text-orange-800 mb-2">Export Options</h3>
            <p className="text-sm text-orange-700">
              Download your notes as TXT or print directly as PDF.
            </p>
          </div>
          <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
            <Save className="h-8 w-8 text-red-600 mb-3" />
            <h3 className="font-bold text-red-800 mb-2">Local Storage</h3>
            <p className="text-sm text-red-700">
              Your notes are saved locally in your browser for privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
