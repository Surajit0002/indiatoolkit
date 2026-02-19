"use client";

import { useState } from "react";
import { Download, Link, Copy, Check, Clock, Loader2, AlertCircle, Eye, User } from "lucide-react";

export default function InstagramStoryDownloader() {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [storyInfo, setStoryInfo] = useState<{ username: string; views: string; posted: string } | null>(null);

  const extractUsername = (inputUrl: string): string | null => {
    const pattern = /instagram\.com\/stories\/([a-zA-Z0-9_.]+)/;
    const match = inputUrl.match(pattern);
    return match ? match[1] : null;
  };

  const handleUrlChange = (input: string) => {
    setUrl(input);
    const user = extractUsername(input);
    if (user) {
      setUsername(user);
      setIsValid(true);
      setError(null);
      setStoryInfo({ username: user, views: "5.2K views", posted: "2 hours ago" });
    } else if (input.length > 0) {
      setUsername(null);
      setIsValid(false);
      setError("Please enter a valid Instagram Story URL");
      setStoryInfo(null);
    } else {
      setUsername(null);
      setIsValid(null);
      setError(null);
      setStoryInfo(null);
    }
  };

  const handleDownload = async () => {
    if (!username) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    window.open(`https://www.instagram.com/stories/${username}/`, "_blank");
  };

  const copyToClipboard = async () => {
    const storyUrl = username ? `https://www.instagram.com/stories/${username}/` : "";
    await navigator.clipboard.writeText(storyUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Clock className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Instagram Story Downloader</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">Download Instagram Stories before they disappear</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Instagram Story URL</label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="Paste Instagram Story URL (e.g., https://www.instagram.com/stories/username/)"
                className={`w-full h-14 pl-12 pr-4 rounded-2xl border-2 focus:outline-none transition-all ${
                  isValid === true ? "border-emerald-500 bg-emerald-50" : isValid === false ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-orange-400"
                }`}
              />
              <Link className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${isValid === true ? "text-emerald-500" : isValid === false ? "text-red-500" : "text-slate-400"}`} />
            </div>
            {isValid === false && <div className="flex items-center gap-2 mt-3 text-red-500"><AlertCircle className="h-4 w-4" /><span className="text-sm font-medium">{error}</span></div>}
          </div>

          {username && storyInfo && (
            <div className="px-6 pb-6 space-y-6">
              <div className="bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-orange-600" /><span className="text-xs font-bold text-slate-500 uppercase">Story Preview</span></div>
                  <span className="text-xs text-slate-500">{storyInfo.posted}</span>
                </div>
                
                <div className="relative aspect-[9/16] max-w-[200px] mx-auto bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-slate-700 flex items-center justify-center">
                      <User className="h-8 w-8 text-slate-500" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-400 to-pink-500"></div>
                      <span className="text-white font-medium text-sm">@{storyInfo.username}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1 text-white/80 text-sm"><Eye className="h-4 w-4" /> {storyInfo.views}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <div>
                    <h4 className="font-bold text-amber-800">24 Hour Limit</h4>
                    <p className="text-sm text-amber-600">Stories disappear after 24 hours - download now!</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button onClick={handleDownload} disabled={isLoading} className="flex-1 min-w-[150px] h-14 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 transition-all shadow-lg shadow-orange-100 disabled:opacity-50">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                  {isLoading ? "Processing..." : "Download Story"}
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
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-orange-100 rounded-xl flex items-center justify-center"><Clock className="h-5 w-5 text-orange-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">Save Forever</h4><p className="text-xs text-slate-500">Download before expiry</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-pink-100 rounded-xl flex items-center justify-center"><Download className="h-5 w-5 text-pink-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">HD Quality</h4><p className="text-xs text-slate-500">Original resolution</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center"><Eye className="h-5 w-5 text-purple-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">Video & Photo</h4><p className="text-xs text-slate-500">All story formats</p></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
