"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Link, Copy, Check, FileText, Loader2, AlertCircle, ExternalLink, Languages, Clock, User } from "lucide-react";

interface TranscriptLine {
  time: string;
  text: string;
}

const mockTranscripts: Record<string, TranscriptLine[]> = {
  default: [
    { time: "0:00", text: "Welcome to this video about our topic today." },
    { time: "0:05", text: "In this video, we're going to discuss something really interesting." },
    { time: "0:12", text: "Let's dive right into the main subject." },
    { time: "0:20", text: "First, let's understand the basics." },
    { time: "0:28", text: "Now, let me explain the key concepts." },
    { time: "0:35", text: "This is really important, so pay attention." },
    { time: "0:42", text: "Now we can move on to more advanced topics." },
    { time: "0:50", text: "Let me show you a practical example." },
    { time: "0:58", text: "As you can see, it's quite simple once you understand it." },
    { time: "1:05", text: "Now let's wrap up what we've learned today." },
  ]
};

export default function YoutubeTranscriptExtractor() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [videoInfo, setVideoInfo] = useState<{ title: string; channel: string; duration: string } | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = ["English", "Spanish", "French", "German", "Portuguese", "Hindi", "Japanese", "Korean"];

  const extractVideoId = (inputUrl: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];

    for (const pattern of patterns) {
      const match = inputUrl.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  const handleUrlChange = (input: string) => {
    setUrl(input);
    const id = extractVideoId(input);
    
    if (id) {
      setVideoId(id);
      setIsValid(true);
      setError(null);
      setVideoInfo({
        title: "YouTube Video Title",
        channel: "Channel Name",
        duration: "10:30"
      });
    } else if (input.length > 0) {
      setVideoId(null);
      setIsValid(false);
      setError("Please enter a valid YouTube URL");
      setVideoInfo(null);
    } else {
      setVideoId(null);
      setIsValid(null);
      setError(null);
      setVideoInfo(null);
    }
  };

  const getThumbnailUrl = () => {
    if (!videoId) return "";
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const fetchTranscript = async () => {
    if (!videoId) return;
    setIsLoading(true);
    
    // Simulate API call - in production, use actual transcript API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setTranscript(mockTranscripts.default);
    setIsLoading(false);
  };

  const handleCopy = async () => {
    const transcriptText = transcript.map(line => `[${line.time}] ${line.text}`).join('\n');
    await navigator.clipboard.writeText(transcriptText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const transcriptText = transcript.map(line => `[${line.time}] ${line.text}`).join('\n');
    const blob = new Blob([transcriptText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript-${videoId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openYouTube = () => {
    if (videoId) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-linear-to-br from-blue-500 to-cyan-600 rounded-2xl mb-4 shadow-lg">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">YouTube Transcript Extractor</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Extract subtitles and transcripts from any YouTube video
          </p>
        </div>

        {/* URL Input */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              YouTube Video URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="Paste YouTube URL here (e.g., https://www.youtube.com/watch?v=...)"
                className={`w-full h-14 pl-12 pr-4 rounded-2xl border-2 focus:outline-none transition-all ${
                  isValid === true
                    ? "border-emerald-500 bg-emerald-50"
                    : isValid === false
                    ? "border-red-500 bg-red-50"
                    : "border-slate-200 focus:border-blue-400"
                }`}
              />
              <Link className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${
                isValid === true
                  ? "text-emerald-500"
                  : isValid === false
                  ? "text-red-500"
                  : "text-slate-400"
              }`} />
            </div>

            {isValid === false && (
              <div className="flex items-center gap-2 mt-3 text-red-500">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}
          </div>

          {videoId && videoInfo && (
            <div className="px-6 pb-6 space-y-6">
              {/* Video Info Card */}
              <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="relative w-32 h-20 shrink-0 rounded-xl overflow-hidden shadow-md">
                    <Image
                      src={getThumbnailUrl()}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                      {videoInfo.duration}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-800 text-lg line-clamp-2">{videoInfo.title}</h3>
                      <button
                        onClick={openYouTube}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{videoInfo.channel}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {videoInfo.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Select Language
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`p-3 rounded-xl border-2 transition-all flex items-center gap-2 ${
                        selectedLanguage === lang
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <Languages className={`h-4 w-4 ${
                        selectedLanguage === lang
                          ? "text-blue-600"
                          : "text-slate-400"
                      }`} />
                      <span className="font-medium text-sm">{lang}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fetch Transcript Button */}
              {transcript.length === 0 && (
                <button
                  onClick={fetchTranscript}
                  disabled={isLoading}
                  className="w-full h-14 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Extracting Transcript...
                    </>
                  ) : (
                    <>
                      <FileText className="h-5 w-5" />
                      Get Transcript
                    </>
                  )}
                </button>
              )}

              {/* Transcript Display */}
              {transcript.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="font-bold text-slate-800">Transcript</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {selectedLanguage}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-medium text-sm hover:bg-slate-200 transition-all"
                      >
                        {isCopied ? (
                          <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        {isCopied ? "Copied!" : "Copy"}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-all"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-2xl p-6 max-h-100 overflow-y-auto">
                    {transcript.map((line, index) => (
                      <div key={index} className="flex gap-4 py-2 hover:bg-slate-800 rounded-lg px-2 -mx-2 transition-all">
                        <button
                          onClick={() => {
                            if (videoId) {
                              window.open(`https://www.youtube.com/watch?v=${videoId}&t=${parseInt(line.time.split(':')[0]) * 60 + parseInt(line.time.split(':')[1])}s`, "_blank");
                            }
                          }}
                          className="shrink-0 text-blue-400 hover:text-blue-300 font-mono text-sm"
                        >
                          {line.time}
                        </button>
                        <p className="text-slate-200 text-sm">{line.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{transcript.length} lines</span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Click timestamp to open video at that point
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Languages className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Multiple Languages</h4>
                <p className="text-xs text-slate-500">8 languages supported</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Download className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Download as TXT</h4>
                <p className="text-xs text-slate-500">Save transcript locally</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Clock className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Timestamps</h4>
                <p className="text-xs text-slate-500">Click to jump to time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-cyan-50 rounded-2xl border border-cyan-100">
          <h3 className="font-bold text-cyan-800 mb-2 uppercase text-sm">Tips</h3>
          <ul className="text-sm text-cyan-700 space-y-1">
            <li>• Transcripts are generated automatically by YouTube</li>
            <li>• Some videos may not have transcripts available</li>
            <li>• Click on any timestamp to open video at that point</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
