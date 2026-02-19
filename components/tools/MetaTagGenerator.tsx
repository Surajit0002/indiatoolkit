"use client";

import { useState } from "react";
import { Search, Copy, Check, Eye } from "lucide-react";

export default function MetaTagGenerator() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keywords: "",
    author: "",
    robots: "index, follow",
  });
  const [copied, setCopied] = useState(false);

  const generateTags = () => {
    const tags = `<!-- Primary Meta Tags -->
<title>${formData.title}</title>
<meta name="title" content="${formData.title}">
<meta name="description" content="${formData.description}">
<meta name="keywords" content="${formData.keywords}">
<meta name="author" content="${formData.author}">
<meta name="robots" content="${formData.robots}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="${formData.title}">
<meta property="og:description" content="${formData.description}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${formData.title}">
<meta property="twitter:description" content="${formData.description}">`;
    return tags;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateTags());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Search className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold">Meta Tag Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Page Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Title (Max 60 characters)"
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Meta Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description (Max 160 characters)"
                className="w-full h-24 p-4 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none font-medium resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Keywords (Comma separated)</label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none font-medium"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Website Name"
                  className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Robots</label>
                <select
                  value={formData.robots}
                  onChange={(e) => setFormData({ ...formData, robots: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none font-medium bg-white"
                >
                  <option value="index, follow">Index, Follow</option>
                  <option value="noindex, nofollow">No Index, No Follow</option>
                  <option value="index, nofollow">Index, No Follow</option>
                  <option value="noindex, follow">No Index, Follow</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[500px]">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Generated HTML</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all font-bold text-xs active:scale-95"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <div className="flex-1 p-8 font-mono text-sm text-blue-400 overflow-auto whitespace-pre">
              {generateTags()}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="h-5 w-5 text-gray-400" />
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Google Preview</h4>
            </div>
            <div className="space-y-1">
              <div className="text-blue-700 text-xl font-medium hover:underline cursor-pointer truncate">
                {formData.title || "Page Title Goes Here"}
              </div>
              <div className="text-emerald-700 text-sm truncate">
                https://example.com › {formData.title?.toLowerCase().replace(/\s+/g, "-") || "page"}
              </div>
              <div className="text-gray-600 text-sm line-clamp-2">
                {formData.description || "Enter a description to see how it might appear in search engine results."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
