"use client";

import { useState } from "react";
import { Download, Link, Copy, Check, Film, Loader2, AlertCircle, ExternalLink, Play, Instagram } from "lucide-react";

interface QualityOption {
  label: string;
  resolution: string;
  format: string;
}

const qualityOptions: QualityOption[] = [
  { label: "Best Quality", resolution: "1080x1920", format: "MP4" },
  { label: "HD", resolution: "720x1280", format: "MP4" },
  { label: "SD", resolution: "480x854", format: "MP4" },
];

export default function InstagramReelDownloader() {
  const [url, setUrl] = useState("");
  const [postId, setPostId] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<QualityOption>(qualityOptions[0]);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postInfo, setPostInfo] = useState<{ username: string; likes: string; caption: string } | null>(null);

  const extractReelId = (inputUrl: string): string | null => {
    // Handle Instagram Reel URLs
    const patterns = [
      /instagram\.com\/reel\/([a-zA-Z0-9_-]+)/,
      /instagram\.com\/p\/([a-zA-Z0-9_-]+)/,
    ];

    for (const pattern of patterns) {
      const match = inputUrl.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  const handleUrlChange = (input: string) => {
    setUrl(input);
    const id = extractReelId(input);
    
    if (id) {
      setPostId(id);
      setIsValid(true);
      setError(null);
      setPostInfo({
        username: "username",
        likes: "10.5K likes",
        caption: "Amazing reel content..."
      });
    } else if (input.length > 0) {
      setPostId(null);
      setIsValid(false);
      setError("Please enter a valid Instagram Reel URL");
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
    
    // Simulate API call - in production, use actual download API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    window.open(`https://www.instagram.com/reel/${postId}/`, "_blank");
  };

  const copyToClipboard = async () => {
    const reelUrl = postId ? `https://www.instagram.com/reel/${postId}/` : "";
    await navigator.clipboard.writeText(reelUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const openInstagram = () => {
    if (postId) {
      window.open(`https://www.instagram.com/reel/${postId}/`, "_blank");
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <Play className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Instagram Reel Downloader</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Download Instagram Reels in high quality - No watermark
          </p>
        </div>

        {/* URL Input */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Instagram Reel URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="Paste Instagram Reel URL (e.g., https://www.instagram.com/reel/...)"
                className={`w-full h-14 pl-12 pr-4 rounded-2xl border-2 focus:outline-none transition-all ${
                  isValid === true
                    ? "border-emerald-500 bg-emerald-50"
                    : isValid === false
                    ? "border-red-500 bg-red-50"
                    : "border-slate-200 focus:border-pink-400"
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

          {postId && postInfo && (
            <div className="px-6 pb-6 space-y-6">
              {/* Post Preview - Vertical */}
              <div className="bg-gradient-to-b from-purple-50 to-pink-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Reel Preview
                    </span>
                  </div>
                  <button
                    onClick={openInstagram}
                    className="flex items-center gap-2 text-sm text-pink-600 hover:text-pink-700 font-medium"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open on Instagram
                  </button>
                </div>
                
                {/* Vertical Video Placeholder */}
                <div className="relative max-w-[240px] mx-auto aspect-[9/16] bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Film className="h-16 w-16 text-slate-600" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white">
                      <span className="font-bold text-sm">@{postInfo.username}</span>
                    </div>
                    <p className="text-white/80 text-xs mt-1 line-clamp-2">{postInfo.caption}</p>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-slate-600">{postInfo.likes}</p>
                </div>
              </div>

              {/* Quality Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Select Quality
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {qualityOptions.map((quality) => (
                    <button
                      key={quality.resolution}
                      onClick={() => setSelectedQuality(quality)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedQuality.resolution === quality.resolution
                          ? "border-pink-500 bg-pink-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-center">
                        <span className="block font-bold text-slate-800 text-sm">{quality.resolution}</span>
                        <span className="block text-xs text-slate-500 mt-1">{quality.format}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* No Watermark Badge */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-800">No Watermark</h4>
                    <p className="text-sm text-emerald-600">Downloaded reels are free from Instagram watermark</p>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleDownload}
                  disabled={isLoading}
                  className="flex-1 min-w-[150px] h-14 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 transition-all shadow-lg shadow-pink-100 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5" />
                      Download Reel
                    </>
                  )}
                </button>

                <button
                  onClick={copyToClipboard}
                  className="flex-1 min-w-[150px] h-14 bg-slate-100 text-slate-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-5 w-5 text-emerald-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5" />
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-pink-100 rounded-xl flex items-center justify-center">
                <Play className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">No Watermark</h4>
                <p className="text-xs text-slate-500">Clean download</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Film className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">HD Quality</h4>
                <p className="text-xs text-slate-500">Up to 1080p</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Download className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Fast Download</h4>
                <p className="text-xs text-slate-500">Quick processing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-pink-50 rounded-2xl border border-pink-100">
          <h3 className="font-bold text-pink-800 mb-2 uppercase text-sm">Supported URLs</h3>
          <ul className="text-sm text-pink-700 space-y-1">
            <li>• https://www.instagram.com/reel/XXXXXXXXXXX</li>
            <li>• Works with both Reels and regular video posts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
