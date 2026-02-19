"use client";

import { useState } from "react";
import { Youtube, Copy, Check } from "lucide-react";

export default function YoutubeDescriptionGenerator() {
  const [data, setData] = useState({
    about: "",
    timestamps: "",
    links: "",
    subscribe: "",
  });
  const [copied, setCopied] = useState(false);

  const generateDescription = () => {
    return `🔥 In this video, we're talking about ${data.about || "[TOPIC]"}.

📌 TIMESTAMPS:
${data.timestamps || "00:00 Intro\n01:00 Topic Explanation\n05:00 Final Thoughts"}

🔗 LINKS MENTIONED:
${data.links || "Website: https://example.com"}

✅ SUBSCRIBE FOR MORE:
${data.subscribe || "Click here: https://youtube.com/c/yourchannel"}

#youtube #contentcreator #[TOPIC]`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateDescription());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-100 p-2 rounded-lg">
              <Youtube className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="text-xl font-bold">Description Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">What is the video about?</label>
              <input
                type="text"
                value={data.about}
                onChange={(e) => setData({ ...data, about: e.target.value })}
                placeholder="Briefly describe the topic"
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-red-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Timestamps (One per line)</label>
              <textarea
                value={data.timestamps}
                onChange={(e) => setData({ ...data, timestamps: e.target.value })}
                placeholder="00:00 Intro"
                className="w-full h-24 p-4 rounded-xl border-2 border-gray-100 focus:border-red-500 outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Social / Resource Links</label>
              <textarea
                value={data.links}
                onChange={(e) => setData({ ...data, links: e.target.value })}
                placeholder="https://mysite.com"
                className="w-full h-24 p-4 rounded-xl border-2 border-gray-100 focus:border-red-500 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[550px]">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Description Preview</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              Copy Description
            </button>
          </div>
          <div className="flex-1 p-8 font-mono text-sm text-gray-300 overflow-auto whitespace-pre">
            {generateDescription()}
          </div>
        </div>
      </div>
    </div>
  );
}
