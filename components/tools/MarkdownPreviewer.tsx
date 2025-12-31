"use client";

import { useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Eye, Code, Copy, Check } from "lucide-react";

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState("# Markdown Previewer\n\n## Subheading\n\n**Bold text**, *italic text*, and [links](https://google.com).\n\n- List item 1\n- List item 2\n\n```javascript\nconsole.log('Hello World');\n```\n\n> Blockquote");
  const [html, setHtml] = useState("");
  const [view, setView] = useState<"edit" | "preview" | "both">("both");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const parseMarkdown = async () => {
      const rawHtml = await marked(markdown);
      setHtml(DOMPurify.sanitize(rawHtml));
    };
    parseMarkdown();
  }, [markdown]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-black text-white p-2 rounded-[8px] border-2 border-black">
        <div className="flex gap-1">
          <button 
            onClick={() => setView("edit")} 
            className={`px-3 py-1 text-[10px] font-black uppercase rounded-sm transition-colors ${view === "edit" ? "bg-white text-black" : "hover:bg-white/10"}`}
          >
            Editor
          </button>
          <button 
            onClick={() => setView("preview")} 
            className={`px-3 py-1 text-[10px] font-black uppercase rounded-sm transition-colors ${view === "preview" ? "bg-white text-black" : "hover:bg-white/10"}`}
          >
            Preview
          </button>
          <button 
            onClick={() => setView("both")} 
            className={`px-3 py-1 text-[10px] font-black uppercase rounded-sm transition-colors ${view === "both" ? "bg-white text-black" : "hover:bg-white/10"}`}
          >
            Split
          </button>
        </div>
        <button onClick={handleCopy} className="p-1 hover:bg-white/10 rounded-md">
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>

      <div className={`grid gap-4 ${view === "both" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
        {(view === "edit" || view === "both") && (
          <div className="brutal-card flex flex-col">
            <div className="p-2 border-b-2 border-black bg-gray-50 flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase">Markdown Editor</span>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full flex-grow p-4 min-h-[500px] focus:outline-none font-mono text-sm resize-none"
              placeholder="Enter markdown..."
            />
          </div>
        )}

        {(view === "preview" || view === "both") && (
          <div className="brutal-card flex flex-col bg-white">
            <div className="p-2 border-b-2 border-black bg-gray-50 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase">Live Preview</span>
            </div>
            <div 
              className="p-6 overflow-auto max-h-[500px] prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
