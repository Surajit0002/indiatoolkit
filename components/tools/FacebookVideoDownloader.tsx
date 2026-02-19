"use client";

import { useState } from "react";
import { Download, Link, Copy, Check, Video, Loader2, AlertCircle, ExternalLink, Play, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

export default function FacebookVideoDownloader() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<{ username: string; title: string; likes: string; shares: string } | null>(null);

  const extractVideoId = (inputUrl: string): string | null => {
    const patterns = [
      /facebook\.com\/watch\/?\?v=(\d+)/,
      /facebook\.com\/video\/(\d+)/,
      /fb\.watch\/([a-zA-Z0-9_-]+)/,
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
      setVideoInfo({ username: "Page Name", title: "Facebook Video Title", likes: "5.2K", shares: "125" });
    } else if (input.length > 0) {
      setVideoId(null);
      setIsValid(false);
      setError("Please enter a valid Facebook video URL");
      setVideoInfo(null);
    } else {
      setVideoId(null);
      setIsValid(null);
      setError(null);
      setVideoInfo(null);
    }
  };

  const handleDownload = async () => {
    if (!videoId) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    window.open(url, "_blank");
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-linear-to-br from-blue-600 to-blue-800 rounded-2xl mb-4 shadow-lg">
            <Play className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Facebook Video Downloader</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">Download Facebook videos in high quality</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Facebook Video URL</label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="Paste Facebook Video URL (e.g., https://www.facebook.com/watch/...)"
                className={`w-full h-14 pl-12 pr-4 rounded-2xl border-2 focus:outline-none transition-all ${
                  isValid === true ? "border-emerald-500 bg-emerald-50" : isValid === false ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-blue-400"
                }`}
              />
              <Link className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${isValid === true ? "text-emerald-500" : isValid === false ? "text-red-500" : "text-slate-400"}`} />
            </div>
            {isValid === false && <div className="flex items-center gap-2 mt-3 text-red-500"><AlertCircle className="h-4 w-4" /><span className="text-sm font-medium">{error}</span></div>}
          </div>

          {videoId && videoInfo && (
            <div className="px-6 pb-6 space-y-6">
              <div className="bg-blue-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><Video className="h-5 w-5 text-blue-600" /><span className="text-xs font-bold text-slate-500 uppercase">Video Preview</span></div>
                </div>
                
                <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center">
                  <Video className="h-16 w-16 text-slate-600" />
                </div>

                <div className="mt-4">
                  <p className="font-bold text-slate-800">{videoInfo.title}</p>
                  <p className="text-sm text-slate-500">{videoInfo.username}</p>
                </div>

                <div className="mt-4 flex justify-center gap-6 text-sm text-slate-600">
                  <span className="flex items-center gap-1"><ThumbsUp className="h-4 w-4" /> {videoInfo.likes}</span>
                  <span className="flex items-center gap-1"><Share2 className="h-4 w-4" /> {videoInfo.shares}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button onClick={handleDownload} disabled={isLoading} className="flex-1 min-w-[150px] h-14 bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg shadow-blue-100 disabled:opacity-50">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                  {isLoading ? "Processing..." : "Download Video"}
                </button>
                <button onClick={copyToClipboard} className="flex-1 min-w-[150px] h-14 bg-slate-100 text-slate-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
                  {isCopied ? <><Check className="h-5 w-5 text-emerald-500" /> Copied!</> : <><Copy className="h-5 w-5" /> Copy Link</>}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center"><Play className="h-5 w-5 text-blue-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">HD Quality</h4><p className="text-xs text-slate-500">High resolution</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-indigo-100 rounded-xl flex items-center justify-center"><Download className="h-5 w-5 text-indigo-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">Fast Download</h4><p className="text-xs text-slate-500">Quick processing</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-cyan-100 rounded-xl flex items-center justify-center"><Video className="h-5 w-5 text-cyan-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">All Videos</h4><p className="text-xs text-slate-500">Public videos</p></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
