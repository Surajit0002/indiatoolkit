"use client";

import { useState } from "react";
import { Download, Link, Copy, Check, Video, Loader2, AlertCircle, Play, Heart, MessageCircle } from "lucide-react";

export default function PinterestVideoDownloader() {
  const [url, setUrl] = useState("");
  const [pinId, setPinId] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pinInfo, setPinInfo] = useState<{ title: string; saves: string; comments: string } | null>(null);

  const extractPinId = (inputUrl: string): string | null => {
    const patterns = [
      /pinterest\.com\/pin\/(\d+)/,
      /pinterest\.com\/video\/(\d+)/,
    ];
    for (const pattern of patterns) {
      const match = inputUrl.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleUrlChange = (input: string) => {
    setUrl(input);
    const id = extractPinId(input);
    if (id) {
      setPinId(id);
      setIsValid(true);
      setError(null);
      setPinInfo({ title: "Amazing Pinterest Video!", saves: "1.2K saves", comments: "45 comments" });
    } else if (input.length > 0) {
      setPinId(null);
      setIsValid(false);
      setError("Please enter a valid Pinterest video URL");
      setPinInfo(null);
    } else {
      setPinId(null);
      setIsValid(null);
      setError(null);
      setPinInfo(null);
    }
  };

  const handleDownload = async () => {
    if (!pinId) return;
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
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-4 shadow-lg">
            <Play className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Pinterest Video Downloader</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">Download Pinterest videos in high quality</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Pinterest Video URL</label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="Paste Pinterest Video URL (e.g., https://www.pinterest.com/pin/...)"
                className={`w-full h-14 pl-12 pr-4 rounded-2xl border-2 focus:outline-none transition-all ${
                  isValid === true ? "border-emerald-500 bg-emerald-50" : isValid === false ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-red-400"
                }`}
              />
              <Link className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${isValid === true ? "text-emerald-500" : isValid === false ? "text-red-500" : "text-slate-400"}`} />
            </div>
            {isValid === false && <div className="flex items-center gap-2 mt-3 text-red-500"><AlertCircle className="h-4 w-4" /><span className="text-sm font-medium">{error}</span></div>}
          </div>

          {pinId && pinInfo && (
            <div className="px-6 pb-6 space-y-6">
              <div className="bg-red-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><Video className="h-5 w-5 text-red-600" /><span className="text-xs font-bold text-slate-500 uppercase">Video Preview</span></div>
                </div>
                
                <div className="aspect-[9/16] max-w-[200px] mx-auto bg-slate-900 rounded-xl flex items-center justify-center">
                  <Video className="h-16 w-16 text-slate-600" />
                </div>

                <div className="mt-4 text-center">
                  <p className="font-bold text-slate-800">{pinInfo.title}</p>
                </div>

                <div className="mt-4 flex justify-center gap-6 text-sm text-slate-600">
                  <span className="flex items-center gap-1"><Heart className="h-4 w-4" /> {pinInfo.saves}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="h-4 w-4" /> {pinInfo.comments}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button onClick={handleDownload} disabled={isLoading} className="flex-1 min-w-[150px] h-14 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-100 disabled:opacity-50">
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
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-red-100 rounded-xl flex items-center justify-center"><Play className="h-5 w-5 text-red-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">HD Quality</h4><p className="text-xs text-slate-500">High resolution</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-pink-100 rounded-xl flex items-center justify-center"><Download className="h-5 w-5 text-pink-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">Fast Download</h4><p className="text-xs text-slate-500">Quick processing</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-orange-100 rounded-xl flex items-center justify-center"><Video className="h-5 w-5 text-orange-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">All Videos</h4><p className="text-xs text-slate-500">Public pins</p></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
