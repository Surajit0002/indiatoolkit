"use client";

import { useState } from "react";
import { FileText, Copy, Check, Sparkles, Heart, Send, Smile, Zap } from "lucide-react";

const captionStyles = ["Casual", "Professional", "Inspirational", "Humorous", "Storytelling"];
const captionTones = ["Friendly", "Professional", "Playful", "Serious", "Motivational"];

const captionTemplates: Record<string, string[]> = {
  Casual: [
    "Just chilling 🧘‍♀️✨\n.\n.\n.\n#relax #chill #lifestyle",
    "Living my best life! 💫\n.\n.\n#life #moment #today",
    "Another day, another adventure 🌟\n.\n.\n#adventure #explore #live",
  ],
  Professional: [
    "Excited to share our latest project! 🚀\n.\nLearn more in the link in bio.\n.\n#business #innovation #growth",
    "Grateful for this opportunity! 🙌\n.\nThank you to our amazing team.\n#grateful #teamwork #success",
    "Here's what we learned today 📚\n.\nThread 🧵👇",
  ],
  Inspirational: [
    "Every moment is a fresh beginning. 🌅\n.\nWhat will you create today?\n.\n#motivation #inspiration #newday",
    "Don't stop until you're proud. 💪\n.\nKeep pushing forward.\n.\n#goals #success #mindset",
    "Your only limit is you. 🔥\n.\nDream big. Work hard. Stay focused.\n#dreambig #motivation #success",
  ],
  Humorous: [
    "Me: I should sleep early\nAlso me at 2am: watching one more video 😂\n.\n#relatable #funny #nightowl",
    "POV: You're trying to be productive 😅\n.\n#funny #relatable #mood",
    "When the coffee hits just right ☕✨\n.\n#coffee #morning #vibes",
  ],
  Storytelling: [
    "So here's the story of how I... 👀\n.\nIt all started when...\n.\nSwipe to see what happened next! 👉",
    "2 years ago, I couldn't even imagine... ✨\n.\nBut look where we are now!\n.\n#transformation #journey #growth",
    "Let me take you back to that day... 📸\n.\nIt was like nothing I'd ever experienced before.\n.\n#memories #flashback #story",
  ],
};

const emojis = ["✨", "🔥", "💫", "🌟", "💪", "🙌", "😍", "🤩", "😎", "💯", "🚀", "💡", "🎉", "❤️", "🙏", "🤗", "😇", "🧘", "🌈", "☀️"];

export default function InstagramCaptionGenerator() {
  const [keyword, setKeyword] = useState("");
  const [style, setStyle] = useState("Casual");
  const [tone, setTone] = useState("Friendly");
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeCTA, setIncludeCTA] = useState(true);
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [copied, setCopied] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const generateCaption = () => {
    const templates = captionTemplates[style];
    let caption = templates[Math.floor(Math.random() * templates.length)];
    
    if (keyword) {
      caption = caption.replace("✨", emojis[Math.floor(Math.random() * emojis.length)]);
    }
    
    if (includeEmojis) {
      const randomEmojis = [...emojis].sort(() => 0.5 - Math.random()).slice(0, 3).join(" ");
      caption = caption.replace("🌟", randomEmojis);
    }
    
    if (includeHashtags && keyword) {
      caption += `\n.\n#${keyword.toLowerCase().replace(/\s+/g, " #")}`;
    }
    
    if (includeCTA) {
      const ctas = ["\n.\nDouble tap if you agree! ❤️", "\n.\nTag someone who needs to see this!", "\n.\nShare with your friends! 🔥", "\n.\nSave for later! 📌"];
      caption += ctas[Math.floor(Math.random() * ctas.length)];
    }
    
    setGeneratedCaption(caption);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyTemplate = (template: string) => {
    setGeneratedCaption(template);
    setShowTemplates(false);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl mb-4 shadow-lg">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Instagram Caption Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">Create engaging captions for your Instagram posts</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Topic / Keyword</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter your post topic (optional)"
              className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-pink-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Style</label>
              <div className="flex flex-wrap gap-2">
                {captionStyles.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                      style === s ? "bg-pink-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Tone</label>
              <div className="flex flex-wrap gap-2">
                {captionTones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                      tone === t ? "bg-purple-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={includeEmojis} onChange={(e) => setIncludeEmojis(e.target.checked)} className="w-4 h-4 text-pink-600 rounded" />
              <span className="text-sm text-slate-700 flex items-center gap-1"><Smile className="h-4 w-4" /> Emojis</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={includeHashtags} onChange={(e) => setIncludeHashtags(e.target.checked)} className="w-4 h-4 text-pink-600 rounded" />
              <span className="text-sm text-slate-700 flex items-center gap-1"><Heart className="h-4 w-4" /> Hashtags</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={includeCTA} onChange={(e) => setIncludeCTA(e.target.checked)} className="w-4 h-4 text-pink-600 rounded" />
              <span className="text-sm text-slate-700 flex items-center gap-1"><Send className="h-4 w-4" /> Call-to-Action</span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={generateCaption}
              className="flex-1 h-14 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg shadow-pink-100"
            >
              <Sparkles className="h-5 w-5" />
              Generate Caption
            </button>
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="h-14 px-6 bg-slate-100 text-slate-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
            >
              <Zap className="h-5 w-5" />
              Templates
            </button>
          </div>

          {showTemplates && (
            <div className="p-4 bg-slate-50 rounded-xl space-y-3">
              <h4 className="font-bold text-slate-700">Quick Templates</h4>
              {Object.values(captionTemplates).flat().slice(0, 5).map((template, i) => (
                <button key={i} onClick={() => applyTemplate(template)} className="w-full text-left p-3 bg-white rounded-lg text-sm text-slate-600 hover:bg-pink-50 hover:text-pink-600 transition-all">
                  {template.substring(0, 60)}...
                </button>
              ))}
            </div>
          )}

          {generatedCaption && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-pink-600" />
                  <span className="font-bold text-slate-800">Generated Caption</span>
                  <span className="text-xs text-slate-500">({generatedCaption.length} chars)</span>
                </div>
                <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-medium text-sm hover:bg-slate-200 transition-all">
                  {copied ? <><Check className="h-4 w-4 text-emerald-500" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy</>}
                </button>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl">
                <p className="text-white text-sm whitespace-pre-line">{generatedCaption}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-pink-100 rounded-xl flex items-center justify-center"><Sparkles className="h-5 w-5 text-pink-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">AI-Powered</h4><p className="text-xs text-slate-500">Smart generation</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center"><FileText className="h-5 w-5 text-purple-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">Multiple Styles</h4><p className="text-xs text-slate-500">5 unique styles</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-indigo-100 rounded-xl flex items-center justify-center"><Zap className="h-5 w-5 text-indigo-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">Quick Templates</h4><p className="text-xs text-slate-500">Ready to use</p></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
