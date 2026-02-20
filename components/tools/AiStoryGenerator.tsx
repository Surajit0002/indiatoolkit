"use client";

import { useState } from "react";
import { BookOpen, Sparkles, Copy, RefreshCw, Heart, Zap } from "lucide-react";

interface StoryData {
  genre: string;
  topic: string;
  tone: string;
  length: string;
  audience: string;
  language: string;
}

const genres = ["Fantasy", "Romance", "Thriller", "Comedy", "Drama", "Sci-Fi", "Mystery", "Horror", "Adventure", "Moral/Fable"];
const tones = ["Heartwarming", "Dark", "Humorous", "Inspiring", "Suspenseful", "Romantic", "Educational"];
const lengths = ["Short (500 words)", "Medium (1000 words)", "Long (2000 words)", "Series (5000+ words)"];
const audiences = ["Children", "Teens", "Adults", "All Ages"];

export default function AiStoryGenerator() {
  const [story, setStory] = useState<StoryData>({
    genre: "Fantasy",
    topic: "",
    tone: "Inspiring",
    length: "Medium (1000 words)",
    audience: "Adults",
    language: "English"
  });

  const [generatedStory, setGeneratedStory] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateField = (field: keyof StoryData, value: string) => {
    setStory({ ...story, [field]: value });
  };

  const generateStory = async () => {
    if (!story.topic.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const storyTemplates: Record<string, string> = {
        "Fantasy": `In a world where ${story.topic} was considered impossible, one young protagonist dared to dream differently. 
        
        Maya had always been different. While others saw limitations, she saw possibilities. The ancient texts spoke of the Forbidden Valley where the legendary flowers grew - flowers that could grant eternal happiness to whoever possessed them.
        
        "No one has ever returned from the Forbidden Valley," the elders warned. But Maya knew that every legend began with someone who refused to accept the status quo.
        
        As she embarked on her journey, Maya encountered mystical creatures who tested her resolve. A wise old dragon demanded she solve an impossible riddle. A mischievous fairy tried to lead her astray. A silent monk offered cryptic guidance.
        
        Through trials and tribulations, Maya discovered that the true magic wasn't in the flowers at all - it was within herself all along. The journey of a thousand miles begins with a single step, and her step changed everything.
        
        ${story.tone === "Heartwarming" ? "In the end, Maya returned not just with the flowers, but with wisdom that transformed her entire village." : ""}
        ${story.tone === "Dark" ? "But victory came at a terrible cost, and Maya learned that some magic demands sacrifice." : ""}
        ${story.tone === "Humorous" ? "And if you're wondering about the flowers? Turns out they were just dandelions. Really pretty dandelions." : ""}`,
        
        "Romance": `When ${story.topic} brought them together, neither expected to find love.
        
        Arjun was a successful architect focused on his career. Priya was a traveling journalist who never stayed in one place for too long. They met by chance at a small café in Goa, both seeking shelter from the sudden rain.
        
        "This seat taken?" she asked.
        "It is now," he replied, not knowing these simple words would change his life.
        
        Over the next few days, as rain kept them confined to the café, they discovered shared dreams, hidden fears, and an unexpected connection.
        
        But Priya had a flight to catch. She always had a flight to catch.
        
        ${story.tone === "Heartwarming" ? "Sometimes love means learning to stay. Sometimes it means learning to take someone with you." : ""}
        ${story.tone === "Suspenseful" ? "But their love had secrets - ones that threatened to tear them apart forever." : ""}`,
        
        "Thriller": `The clock was ticking. Every second brought them closer to disaster.
        
        Detective Rahul had 48 hours to solve the case of ${story.topic} before it was too late. The city was counting on him, but someone within the department was working against him.
        
        "Trust no one," his partner warned before disappearing.
        
        Clues led him through the dark underbelly of the city - abandoned warehouses, secret meetings, double-crosses at every turn.
        
        ${story.tone === "Suspenseful" ? "Just when he thought he had all the answers, Rahul realized he had been the pawn all along." : ""}
        ${story.tone === "Dark" ? "The truth was more horrifying than any lie he had ever believed." : ""}`
      };

      const titleOptions = {
        "Fantasy": ["The Impossible Dream", "Magic Within", "The Forbidden Valley", "A Thousand Miles"],
        "Romance": ["Written in the Rain", "Flight or Stay", "A Chance Meeting", "Coffee and Chaos"],
        "Thriller": ["The Ticking Clock", "48 Hours", "Trust No One", "The Double Cross"],
        "default": ["The Unexpected Journey", "A Tale of Triumph", "When Worlds Collide", "Beyond the Horizon"]
      };

      const storyContent = storyTemplates[story.genre] || storyTemplates["default"];
      const templateTitles = titleOptions[story.genre as keyof typeof titleOptions] || titleOptions["default"];
      const generatedTitle = templateTitles[Math.floor(Math.random() * templateTitles.length)];

      setTitle(generatedTitle);
      setGeneratedStory(storyContent);
      setIsGenerating(false);
    }, 2500);
  };

  const copyStory = () => {
    if (!generatedStory) return;
    navigator.clipboard.writeText(`${title}\n\n${generatedStory}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadStory = () => {
    if (!generatedStory) return;

    const blob = new Blob([`${title}\n\n${generatedStory}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${story.genre.toLowerCase()}-story-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setStory({
      genre: "Fantasy",
      topic: "",
      tone: "Inspiring",
      length: "Medium (1000 words)",
      audience: "Adults",
      language: "English"
    });
    setGeneratedStory(null);
    setTitle(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Story Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create captivating stories with AI
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Genre & Topic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Genre
                </label>
                <select
                  value={story.genre}
                  onChange={(e) => updateField("genre", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none font-medium"
                >
                  {genres.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Story Theme/Topic
                </label>
                <input
                  type="text"
                  value={story.topic}
                  onChange={(e) => updateField("topic", e.target.value)}
                  placeholder="e.g., overcoming fear, finding love"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Tone
                </label>
                <select
                  value={story.tone}
                  onChange={(e) => updateField("tone", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none font-medium"
                >
                  {tones.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Length
                </label>
                <select
                  value={story.length}
                  onChange={(e) => updateField("length", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none font-medium"
                >
                  {lengths.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Audience
                </label>
                <select
                  value={story.audience}
                  onChange={(e) => updateField("audience", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none font-medium"
                >
                  {audiences.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={generateStory}
                disabled={!story.topic.trim() || isGenerating}
                className="flex-1 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-100 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Writing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Story
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
          {generatedStory && (
            <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-t border-cyan-100">
              {/* Title */}
              <div className="text-center mb-4">
                <h3 className="text-2xl font-black text-slate-900">{title}</h3>
                <p className="text-xs text-cyan-600 uppercase tracking-widest mt-1">
                  A {story.genre} Story • {story.tone} Tone
                </p>
              </div>

              {/* Story Content */}
              <div className="bg-white rounded-2xl p-6 border border-cyan-100 mb-4">
                <div className="prose prose-slate max-w-none">
                  {generatedStory.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="mb-4 text-slate-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={copyStory}
                  className="flex-1 h-12 bg-cyan-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-700 transition-all"
                >
                  {copied ? <Heart className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copied ? "Copied!" : "Copy Story"}
                </button>
                <button
                  onClick={downloadStory}
                  className="flex-1 h-12 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
                >
                  Download
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-cyan-50 rounded-2xl border border-cyan-100">
            <Zap className="h-8 w-8 text-cyan-600 mb-3" />
            <h3 className="font-bold text-cyan-800 mb-2">Instant Inspiration</h3>
            <p className="text-sm text-cyan-700">
              Get creative story ideas instantly based on your chosen genre and theme.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-blue-800 mb-2">Multiple Genres</h3>
            <p className="text-sm text-blue-700">
              Explore different storytelling styles from fantasy to thriller and more.
            </p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <Sparkles className="h-8 w-8 text-indigo-600 mb-3" />
            <h3 className="font-bold text-indigo-800 mb-2">Creative Freedom</h3>
            <p className="text-sm text-indigo-700">
              Use AI-generated stories as a starting point for your own creativity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
