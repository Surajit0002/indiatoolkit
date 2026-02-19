"use client";

import { useState } from "react";
import { Download, Link, Copy, Check, Loader2, AlertCircle, Play, ExternalLink, Smartphone } from "lucide-react";

interface QualityOption {
  label: string;
  resolution: string;
  format: string;
}

const qualityOptions: QualityOption[] = [
  { label: "Best Quality", resolution: "1080p", format: "MP4" },
  { label: "HD", resolution: "720p", format: "MP4" },
  { label: "SD", resolution: "480p", format: "MP4" },
];

export default function YoutubeShortsDownloader() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<QualityOption>(qualityOptions[0]);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<{ title: string; channel: string; likes: string } | null>(null);

  const extractShortsId = (inputUrl: string): string | null => {
    // Handle YouTube Shorts URLs
    const patterns = [
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = inputUrl.match(pattern);
      if (match) return match[1];
    }

    // Also accept regular YouTube URLs
    const generalPattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const generalMatch = inputUrl.match(generalPattern);
    if (generalMatch) return generalMatch[1];

    return null;
  };

  const handleUrlChange = (input: string) => {
    setUrl(input);
    const id = extractShortsId(input);
    
    if (id) {
      setVideoId(id);
      setIsValid(true);
      setError(null);
      setVideoInfo({
        title: "YouTube Shorts Video",
        channel: "Channel Name",
        likes: "1.5M likes"
      });
    } else if (input.length > 0) {
      setVideoId(null);
      setIsValid(false);
      setError("Please enter a valid YouTube Shorts URL");
      setVideoInfo(null);
    } else {
      setVideoId(null);
      setIsValid(null);
      setError(null);
      setVideoInfo(null);
    }
  };

  const getShortsEmbedUrl = () => {
    if (!videoId) return "";
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleDownload = async () => {
    if (!videoId) return;
    setIsLoading(true);
    
    // Simulate API call - in production, use actual download API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    window.open(`https://www.youtube.com/shorts/${videoId}`, "_blank");
  };

  const copyToClipboard = async () => {
    const shortsUrl = videoId ? `https://www.youtube.com/shorts/${videoId}` : "";
    await navigator.clipboard.writeText(shortsUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const openShorts = () => {
    if (videoId) {
      window.open(`https://www.youtube.com/shorts/${videoId}`, "_blank");
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-red-500 via-pink-500 to-purple-500 rounded-2xl mb-4 shadow-lg">
            <Smartphone className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">YouTube Shorts Downloader</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Download YouTube Shorts videos in high quality - No watermark
          </p>
        </div>

        {/* URL Input */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              YouTube Shorts URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="Paste YouTube Shorts URL (e.g., https://www.youtube.com/shorts/...)"
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

          {videoId && (
            <div className="px-6 pb-6 space-y-6">
              {/* Video Preview - Vertical Aspect Ratio */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Shorts Preview
                  </span>
                  <button
                    onClick={openShorts}
                    className="flex items-center gap-2 text-sm text-pink-600 hover:text-pink-700 font-medium"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open Shorts
                  </button>
                </div>
                
                {videoInfo && (
                  <div className="mb-4 text-center">
                    <h3 className="font-bold text-slate-800 text-lg">{videoInfo.title}</h3>
                    <p className="text-sm text-slate-500">{videoInfo.channel} • {videoInfo.likes}</p>
                  </div>
                )}
                
                <div className="relative max-w-[280px] mx-auto aspect-[9/16] bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src={getShortsEmbedUrl()}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
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

              {/* Download Button */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleDownload}
                  disabled={isLoading}
                  className="flex-1 min-w-[150px] h-14 bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-pink-600 hover:via-red-600 hover:to-purple-600 transition-all shadow-lg shadow-pink-100 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5" />
                      Download {selectedQuality.resolution} {selectedQuality.format}
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

              {/* No Watermark Badge */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-800">No Watermark</h4>
                    <p className="text-sm text-emerald-600">Downloaded videos are free from watermarks</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-pink-100 rounded-xl flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Vertical Format</h4>
                <p className="text-xs text-slate-500">Perfect for mobile</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Download className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">No Watermark</h4>
                <p className="text-xs text-slate-500">Clean downloads</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Play className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">HD Quality</h4>
                <p className="text-xs text-slate-500">Up to 1080p</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <h3 className="font-bold text-amber-800 mb-2 uppercase text-sm">Supported URLs</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• https://www.youtube.com/shorts/XXXXXXXXXXX</li>
            <li>• https://youtu.be/XXXXXXXXXXX</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
