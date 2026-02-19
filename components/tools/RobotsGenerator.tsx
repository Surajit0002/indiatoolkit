"use client";

import { useState } from "react";
import { FileCode, Copy, Check, Info } from "lucide-react";

export default function RobotsGenerator() {
  const [allowAll, setAllowAll] = useState(true);
  const [crawlDelay, setCrawlDelay] = useState("");
  const [sitemap, setSitemap] = useState("");
  const [copied, setCopied] = useState(false);

  const generateRobots = () => {
    let content = "User-agent: *\n";
    if (allowAll) {
      content += "Allow: /\n";
    } else {
      content += "Disallow: /\n";
    }
    
    if (crawlDelay) {
      content += `Crawl-delay: ${crawlDelay}\n`;
    }
    
    if (sitemap) {
      content += `Sitemap: ${sitemap}\n`;
    }
    
    return content;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateRobots());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FileCode className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold">Robots.txt Settings</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <p className="text-sm font-bold text-gray-700">Allow all bots?</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Enable/Disable search engine access</p>
              </div>
              <button
                onClick={() => setAllowAll(!allowAll)}
                className={`w-12 h-6 rounded-full transition-all relative ${allowAll ? "bg-emerald-500" : "bg-gray-300"}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${allowAll ? "left-7" : "left-1"}`} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Crawl Delay (Seconds)</label>
              <input
                type="number"
                value={crawlDelay}
                onChange={(e) => setCrawlDelay(e.target.value)}
                placeholder="e.g. 10 (Leave blank for none)"
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Sitemap URL</label>
              <input
                type="text"
                value={sitemap}
                onChange={(e) => setSitemap(e.target.value)}
                placeholder="https://example.com/sitemap.xml"
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none font-medium"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl flex gap-3">
            <Info className="h-5 w-5 text-blue-400 flex-shrink-0" />
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest leading-relaxed">
              Place the generated file in your website&apos;s root directory (e.g., example.com/robots.txt).
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[400px]">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Robots.txt Output</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all font-bold text-xs"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Content"}
            </button>
          </div>
          <div className="flex-1 p-8 font-mono text-emerald-400 text-lg whitespace-pre">
            {generateRobots()}
          </div>
        </div>
      </div>
    </div>
  );
}
