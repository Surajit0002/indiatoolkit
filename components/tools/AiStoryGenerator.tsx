"use client";

import { useState } from "react";
import { BookOpen, Sparkles, Wand2, Heart, MessageSquare, Zap } from "lucide-react";
import AiChatInterface from "@/components/ai/AiChatInterface";

const genres = ["Fantasy", "Romance", "Thriller", "Comedy", "Drama", "Sci-Fi", "Mystery", "Horror", "Adventure", "Moral/Fable"];
const tones = ["Heartwarming", "Dark", "Humorous", "Inspiring", "Suspenseful", "Romantic", "Educational"];
const lengths = ["Short (500 words)", "Medium (1000 words)", "Long (2000 words)", "Series (5000+ words)"];
const audiences = ["Children", "Teens", "Adults", "All Ages"];

const systemPrompt = `You are an expert creative writer for Omnitools AI Tools. Your task is to generate engaging, original stories based on user prompts.

When writing stories, always include:
1. A compelling hook/opening that grabs attention
2. Well-developed characters with distinct personalities
3. Vivid descriptions and sensory details
4. A clear plot with beginning, middle, and end
5. Dialogue that reveals character and advances the story
6. Emotional depth appropriate to the genre and tone
7. A satisfying conclusion

Consider the following elements when generating:
- Genre conventions and expectations
- Target audience appropriateness
- Tone consistency throughout
- Pacing and narrative flow
- Show don't tell approach
- Use of literary devices where appropriate

Generate stories that are creative, engaging, and well-structured.`;

export default function AiStoryGenerator() {
  const [useChatMode, setUseChatMode] = useState(true);

  const buildStoryPrompt = (params: {
    genre: string;
    topic: string;
    tone: string;
    length: string;
    audience: string;
  }) => {
    return `Write a ${params.length.toLowerCase()} ${params.genre.toLowerCase()} story with the following details:
- Theme/Topic: ${params.topic}
- Tone: ${params.tone}
- Target Audience: ${params.audience}

Please create a compelling, well-structured story with vivid descriptions, engaging characters, and a satisfying narrative arc.`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">AI Story Generator</h1>
              <p className="text-indigo-100 mt-1">Create captivating stories with AI-powered creativity</p>
            </div>
          </div>
          
          {/* Mode Toggle */}
          <div className="flex items-center gap-4 mt-6">
            <span className="text-sm text-indigo-100">Mode:</span>
            <div className="flex bg-white/10 rounded-xl p-1 backdrop-blur-sm">
              <button
                onClick={() => setUseChatMode(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  useChatMode 
                    ? "bg-white text-indigo-600 shadow-lg" 
                    : "text-white hover:bg-white/10"
                }`}
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Chat Mode
              </button>
              <button
                onClick={() => setUseChatMode(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !useChatMode 
                    ? "bg-white text-indigo-600 shadow-lg" 
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Wand2 className="w-4 h-4 inline mr-2" />
                Form Mode
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {useChatMode ? (
          /* Chat Mode */
          <div className="max-w-4xl mx-auto">
            <AiChatInterface
              toolId="ai-story-generator"
              toolName="AI Story Generator"
              systemPrompt={systemPrompt}
              placeholder="Describe your story idea, e.g., 'Write a heartwarming story about a boy who discovers a magical creature in his grandmother's garden...'"
            />
          </div>
        ) : (
          /* Form Mode - Enhanced Version */
          <FormMode 
            genres={genres} 
            tones={tones} 
            lengths={lengths} 
            audiences={audiences}
            buildPrompt={buildStoryPrompt}
          />
        )}

        {/* Feature Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border border-cyan-100">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-cyan-800 mb-2">Instant Inspiration</h3>
            <p className="text-sm text-cyan-700">
              Get creative story ideas instantly. Describe your vision and watch it come to life with AI.
            </p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-purple-800 mb-2">Multiple Genres</h3>
            <p className="text-sm text-purple-700">
              Explore fantasy, romance, thriller, sci-fi, and more. Every genre brings unique storytelling magic.
            </p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-indigo-800 mb-2">Creative Freedom</h3>
            <p className="text-sm text-indigo-700">
              Use AI-generated stories as inspiration. Build upon ideas, modify themes, and create your masterpiece.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Form Mode Component
function FormMode({ 
  genres, 
  tones, 
  lengths, 
  audiences,
  buildPrompt 
}: { 
  genres: string[]; 
  tones: string[]; 
  lengths: string[];
  audiences: string[];
  buildPrompt: (params: {
    genre: string;
    topic: string;
    tone: string;
    length: string;
    audience: string;
  }) => string;
}) {

  const [params, setParams] = useState<{
    genre: string;
    topic: string;
    tone: string;
    length: string;
    audience: string;
  }>({
    genre: "Fantasy",
    topic: "",
    tone: "Inspiring",
    length: "Medium (1000 words)",
    audience: "Adults"
  });
  const [generatedStory, setGeneratedStory] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateStory = async () => {
    if (!params.topic.trim()) return;
    setIsGenerating(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: buildPrompt(params),
          toolId: "ai-story-generator",
          systemPrompt
        })
      });

      const data = await response.json();
      setGeneratedStory(data.text);
      
      // Generate a title
      const titleResponse = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Generate a compelling title for this story: ${data.text.substring(0, 500)}... Just return the title, nothing else.`,
          toolId: "ai-story-generator",
          systemPrompt: "You are a creative writer. Generate engaging titles."
        })
      });
      
      const titleData = await titleResponse.json();
      setTitle(titleData.text.replace(/[""]/g, ""));
    } catch (error) {
      console.error("Error generating story:", error);
    } finally {
      setIsGenerating(false);
    }
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
    link.download = `${params.genre.toLowerCase()}-story-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  type StoryParams = {
    genre: string;
    topic: string;
    tone: string;
    length: string;
    audience: string;
  };

  const updateField = (field: keyof StoryParams, value: string) => {
    setParams((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Input Form */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Genre & Topic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Genre
              </label>
              <select
                value={params.genre}
                onChange={(e) => updateField("genre", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none font-medium bg-white"
              >
                {genres.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Story Theme/Topic
              </label>
              <input
                type="text"
                value={params.topic}
                onChange={(e) => updateField("topic", e.target.value)}
                placeholder="e.g., overcoming fear, finding love, magical adventure"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tone
              </label>
              <select
                value={params.tone}
                onChange={(e) => updateField("tone", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none font-medium bg-white"
              >
                {tones.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Length
              </label>
              <select
                value={params.length}
                onChange={(e) => updateField("length", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none font-medium bg-white"
              >
                {lengths.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Audience
              </label>
              <select
                value={params.audience}
                onChange={(e) => updateField("audience", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none font-medium bg-white"
              >
                {audiences.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateStory}
            disabled={!params.topic.trim() || isGenerating}
            className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating your story...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Story
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {generatedStory && (
          <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-t border-indigo-100">
            {/* Title */}
            {title && (
              <div className="text-center mb-4">
                <h3 className="text-2xl font-black text-slate-900">{title}</h3>
                <p className="text-sm text-indigo-600 mt-1">
                  A {params.genre} Story • {params.tone} Tone • {params.audience}
                </p>
              </div>
            )}

            {/* Story Content */}
            <div className="bg-white rounded-2xl p-6 border border-indigo-100 mb-4 max-h-96 overflow-y-auto">
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
                className="flex-1 h-12 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
              >
                {copied ? <Heart className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
                {copied ? "Copied!" : "Copy Story"}
              </button>
              <button
                onClick={downloadStory}
                className="flex-1 h-12 bg-purple-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-purple-700 transition-all"
              >
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
