"use client";

import { useState } from "react";
import { Download, Link, Copy, Check, Video, Loader2, AlertCircle, Play, Heart, Repeat } from "lucide-react";

export default function TwitterVideoDownloader() {
  const [url, setUrl] = useState("");
  const [tweetId, setTweetId] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tweetInfo, setTweetInfo] = useState<{ username: string; content: string; likes: string; retweets: string } | null>(null);

  const extractTweetId = (inputUrl: string): string | null => {
    const patterns = [
      /twitter\.com\/\w+\/status\/(\d+)/,
      /x\.com\/\w+\/status\/(\d+)/,
    ];
    for (const pattern of patterns) {
      const match = inputUrl.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleUrlChange = (input: string) => {
    setUrl(input);
    const id = extractTweetId(input);
    if (id) {
      setTweetId(id);
      setIsValid(true);
      setError(null);
      setTweetInfo({ username: "username", content: "Check out this amazing tweet with video! 🎬", likes: "2.5K", retweets: "125" });
    } else if (input.length > 0) {
      setTweetId(null);
      setIsValid(false);
      setError("Please enter a valid Twitter/X video URL");
      setTweetInfo(null);
    } else {
      setTweetId(null);
      setIsValid(null);
      setError(null);
      setTweetInfo(null);
    }
  };

  const handleDownload = async () => {
    if (!tweetId) return;
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
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl mb-4 shadow-lg">
            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Twitter/X Video Downloader</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">Download Twitter/X videos in high quality</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Twitter/X Video URL</label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="Paste Twitter/X URL (e.g., https://twitter.com/user/status/...)"
                className={`w-full h-14 pl-12 pr-4 rounded-2xl border-2 focus:outline-none transition-all ${
                  isValid === true ? "border-emerald-500 bg-emerald-50" : isValid === false ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-slate-400"
                }`}
              />
              <Link className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${isValid === true ? "text-emerald-500" : isValid === false ? "text-red-500" : "text-slate-400"}`} />
            </div>
            {isValid === false && <div className="flex items-center gap-2 mt-3 text-red-500"><AlertCircle className="h-4 w-4" /><span className="text-sm font-medium">{error}</span></div>}
          </div>

          {tweetId && tweetInfo && (
            <div className="px-6 pb-6 space-y-6">
              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><Video className="h-5 w-5 text-slate-600" /><span className="text-xs font-bold text-slate-500 uppercase">Video Preview</span></div>
                </div>
                
                <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center">
                  <Video className="h-16 w-16 text-slate-600" />
                </div>

                <div className="mt-4">
                  <p className="font-bold text-slate-800">@{tweetInfo.username}</p>
                  <p className="text-sm text-slate-600 mt-1">{tweetInfo.content}</p>
                </div>

                <div className="mt-4 flex justify-center gap-6 text-sm text-slate-600">
                  <span className="flex items-center gap-1"><Heart className="h-4 w-4" /> {tweetInfo.likes}</span>
                  <span className="flex items-center gap-1"><Repeat className="h-4 w-4" /> {tweetInfo.retweets}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button onClick={handleDownload} disabled={isLoading} className="flex-1 min-w-[150px] h-14 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-slate-900 hover:to-black transition-all shadow-lg shadow-slate-200 disabled:opacity-50">
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
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center"><Play className="h-5 w-5 text-slate-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">HD Quality</h4><p className="text-xs text-slate-500">High resolution</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-slate-200 rounded-xl flex items-center justify-center"><Download className="h-5 w-5 text-slate-700" /></div><div><h4 className="font-bold text-slate-800 text-sm">Fast Download</h4><p className="text-xs text-slate-500">Quick processing</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-slate-300 rounded-xl flex items-center justify-center"><Video className="h-5 w-5 text-slate-800" /></div><div><h4 className="font-bold text-slate-800 text-sm">All Videos</h4><p className="text-xs text-slate-500">Public tweets</p></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
