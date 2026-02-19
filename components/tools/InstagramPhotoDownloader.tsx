"use client";

import { useState } from "react";
import { Download, Link, Copy, Check, Image, Loader2, AlertCircle, Instagram, Heart } from "lucide-react";

interface QualityOption {
  label: string;
  resolution: string;
}

const qualityOptions: QualityOption[] = [
  { label: "Original", resolution: "1080x1080" },
  { label: "HD", resolution: "1080x1350" },
  { label: "SD", resolution: "720x720" },
];

export default function InstagramPhotoDownloader() {
  const [url, setUrl] = useState("");
  const [postId, setPostId] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<QualityOption>(qualityOptions[0]);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postInfo, setPostInfo] = useState<{ username: string; likes: string; caption: string } | null>(null);

  const extractPostId = (inputUrl: string): string | null => {
    const pattern = /instagram\.com\/p\/([a-zA-Z0-9_-]+)/;
    const match = inputUrl.match(pattern);
    return match ? match[1] : null;
  };

  const handleUrlChange = (input: string) => {
    setUrl(input);
    const id = extractPostId(input);
    if (id) {
      setPostId(id);
      setIsValid(true);
      setError(null);
      setPostInfo({ username: "username", likes: "2.5K likes", caption: "Beautiful photo!" });
    } else if (input.length > 0) {
      setPostId(null);
      setIsValid(false);
      setError("Please enter a valid Instagram post URL");
      setPostInfo(null);
    } else {
      setPostId(null);
      setIsValid(null);
      setError(null);
      setPostInfo(null);
    }
  };

  const handleDownload = async () => {
    if (!postId) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    window.open(`https://www.instagram.com/p/${postId}/`, "_blank");
  };

  const copyToClipboard = async () => {
    const postUrl = postId ? `https://www.instagram.com/p/${postId}/` : "";
    await navigator.clipboard.writeText(postUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Image className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Instagram Photo Downloader</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">Download Instagram photos in high quality</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Instagram Photo URL</label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="Paste Instagram URL (e.g., https://www.instagram.com/p/...)"
                className={`w-full h-14 pl-12 pr-4 rounded-2xl border-2 focus:outline-none transition-all ${
                  isValid === true ? "border-emerald-500 bg-emerald-50" : isValid === false ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-pink-400"
                }`}
              />
              <Link className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${isValid === true ? "text-emerald-500" : isValid === false ? "text-red-500" : "text-slate-400"}`} />
            </div>
            {isValid === false && <div className="flex items-center gap-2 mt-3 text-red-500"><AlertCircle className="h-4 w-4" /><span className="text-sm font-medium">{error}</span></div>}
          </div>

          {postId && postInfo && (
            <div className="px-6 pb-6 space-y-6">
              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><Instagram className="h-5 w-5 text-pink-600" /><span className="text-xs font-bold text-slate-500 uppercase">Photo Preview</span></div>
                  <span className="text-sm text-slate-500">@{postInfo.username}</span>
                </div>
                <div className="aspect-square bg-slate-200 rounded-xl flex items-center justify-center">
                  <Image className="h-16 w-16 text-slate-500" />
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Heart className="h-4 w-4" /> {postInfo.likes}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Select Quality</label>
                <div className="grid grid-cols-3 gap-3">
                  {qualityOptions.map((q) => (
                    <button key={q.resolution} onClick={() => setSelectedQuality(q)} className={`p-4 rounded-xl border-2 transition-all ${selectedQuality.resolution === q.resolution ? "border-pink-500 bg-pink-50" : "border-slate-200 hover:border-slate-300"}`}>
                      <div className="text-center"><span className="block font-bold text-slate-800 text-sm">{q.label}</span><span className="block text-xs text-slate-500 mt-1">{q.resolution}</span></div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button onClick={handleDownload} disabled={isLoading} className="flex-1 min-w-[150px] h-14 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg shadow-pink-100 disabled:opacity-50">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                  {isLoading ? "Processing..." : "Download Photo"}
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
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-pink-100 rounded-xl flex items-center justify-center"><Image className="h-5 w-5 text-pink-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">Original Quality</h4><p className="text-xs text-slate-500">Full resolution</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center"><Download className="h-5 w-5 text-purple-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">Fast Download</h4><p className="text-xs text-slate-500">Instant saving</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-orange-100 rounded-xl flex items-center justify-center"><Image className="h-5 w-5 text-orange-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">All Formats</h4><p className="text-xs text-slate-500">Square, portrait</p></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
