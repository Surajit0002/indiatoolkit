"use client";

import { useState } from "react";
import { Instagram, Copy, Check, Sparkles } from "lucide-react";

const BIO_TEMPLATES = [
  "✨ [NAME]\n📍 [LOCATION]\n🚀 Helping you [GOAL]\n👇 Check my link below!",
  "🌿 Passionate about [TOPIC]\n📸 Captured by [NAME]\n✨ Living life to the fullest\n💌 DM for collaborations",
  "💻 [NAME] | [Niche]\n🔥 Sharing tips about [TOPIC]\n🎯 Goal: [GOAL]\n✨ Stay tuned for more!",
  "✨ Just a [TOPIC] lover\n📍 Based in [LOCATION]\n🌟 Making magic happen\n👇 Let's connect!",
];

export default function InstagramBioGenerator() {
  const [data, setData] = useState({
    name: "",
    location: "",
    topic: "",
    goal: "",
  });
  const [bios, setBios] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateBios = () => {
    const results = BIO_TEMPLATES.map(t => 
      t.replace(/\[NAME\]/g, data.name || "Your Name")
       .replace(/\[LOCATION\]/g, data.location || "Earth")
       .replace(/\[TOPIC\]/g, data.topic || "Life")
       .replace(/\[GOAL\]/g, data.goal || "Success")
    );
    setBios(results);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-pink-100 p-2 rounded-lg">
              <Instagram className="h-5 w-5 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold">Bio Creator</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Name</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-pink-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Location</label>
                <input
                  type="text"
                  value={data.location}
                  onChange={(e) => setData({ ...data, location: e.target.value })}
                  placeholder="New York"
                  className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-pink-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Topic/Interest</label>
              <input
                type="text"
                value={data.topic}
                onChange={(e) => setData({ ...data, topic: e.target.value })}
                placeholder="Photography, Tech..."
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-pink-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Main Goal/Action</label>
              <input
                type="text"
                value={data.goal}
                onChange={(e) => setData({ ...data, goal: e.target.value })}
                placeholder="Helping you grow"
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-pink-500 outline-none"
              />
            </div>
            <button
              onClick={generateBios}
              className="w-full h-14 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-pink-100"
            >
              Generate Bios
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {bios.length > 0 ? (
            bios.map((bio, i) => (
              <div 
                key={i} 
                className="group relative p-6 bg-white rounded-2xl border border-gray-100 hover:border-pink-200 transition-all shadow-sm"
              >
                <div className="font-medium text-gray-700 whitespace-pre-line leading-relaxed">
                  {bio}
                </div>
                <button
                  onClick={() => handleCopy(bio, i)}
                  className="absolute top-4 right-4 p-2 bg-gray-50 hover:bg-pink-50 text-gray-400 hover:text-pink-500 rounded-lg transition-all"
                >
                  {copiedIndex === i ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            ))
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center text-gray-300">
              <Sparkles className="h-10 w-10 mb-2 opacity-20" />
              <p className="text-sm font-bold uppercase tracking-widest">Enter details to generate</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
