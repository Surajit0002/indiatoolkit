"use client";

import { useState } from "react";
import { Download, Link, Copy, Check, Film, Loader2, AlertCircle, Play, ExternalLink } from "lucide-react";

interface VideoQuality {
  label: string;
  resolution: string;
  format: string;
}

const videoQualities: VideoQuality[] = [
  { label: "4K Ultra HD", resolution: "2160p", format: "MP4" },
  { label: "Full HD", resolution: "1080p", format: "MP4" },
  { label: "HD", resolution: "720p", format: "MP4" },
  { label: "SD", resolution: "480p", format: "MP4" },
  { label: "Low", resolution: "360p", format: "MP4" },
];

export default function YoutubeVideoDownloader() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<VideoQuality>(videoQualities[1]);
  const [isCopied, setIsCopied] = useState(false);
  const [_error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<{ title: string; duration: string; views: string } | null>(null);

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
      // Simulate fetching video info
      setVideoInfo({
        title: "Sample Video Title",
        duration: "10:30",
        views: "1.2M views"
      });
    } else if (input.length > 0) {
      setVideoId(null);
      setIsValid(false);
      setError(null);
      setVideoInfo(null);
    } else {
      setVideoId(null);
      setIsValid(null);
      setError(null);
      setVideoInfo(null);
    }
  };

  const getVideoEmbedUrl = () => {
    if (!videoId) return "";
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const getDownloadUrl = async () => {
    if (!videoId) return "";
    setIsLoading(true);
    
    // Simulate API call - in production, use actual download API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    // Return YouTube video download URL (would use actual API in production)
    return `https://www.youtube.com/watch?v=${videoId}`;
  };

  const handleDownload = async () => {
    if (!videoId) return;
    
    const downloadLink = await getDownloadUrl();
    window.open(downloadLink, "_blank");
  };

  const copyToClipboard = async () => {
    const videoUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : "";
    await navigator.clipboard.writeText(videoUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
          <div className="inline-flex items-center justify-center h-16 w-16 bg-linear-to-br from-red-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <Film className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">YouTube Video Downloader</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Download YouTube videos in high quality - 4K, 1080p, 720p available
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
                    : "border-slate-200 focus:border-red-400"
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
                <span className="text-sm font-medium">Please enter a valid YouTube URL</span>
              </div>
            )}
          </div>

          {videoId && (
            <div className="px-6 pb-6 space-y-6">
              {/* Video Preview */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Video Preview
                  </span>
                  <button
                    onClick={openYouTube}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open on YouTube
                  </button>
                </div>
                
                {videoInfo && (
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-800 text-lg">{videoInfo.title}</h3>
                    <p className="text-sm text-slate-500">{videoInfo.duration} • {videoInfo.views}</p>
                  </div>
                )}
                
                <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden">
                  <iframe
                    src={getVideoEmbedUrl()}
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
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {videoQualities.map((quality) => (
                    <button
                      key={quality.resolution}
                      onClick={() => setSelectedQuality(quality)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedQuality.resolution === quality.resolution
                          ? "border-red-500 bg-red-50"
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
                  className="flex-1 min-w-37.5 h-14 bg-linear-to-r from-red-600 to-pink-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-red-700 hover:to-pink-700 transition-all shadow-lg shadow-red-100 disabled:opacity-50"
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
                  className="flex-1 min-w-37.5 h-14 bg-slate-100 text-slate-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
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

              {/* Download Info */}
              <div className="p-4 bg-slate-900 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase">Selected Format</span>
                    <p className="text-white font-medium">{selectedQuality.resolution} {selectedQuality.format}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-bold uppercase">Video ID</span>
                    <p className="text-white font-medium">{videoId}</p>
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
              <div className="h-10 w-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Film className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Multiple Resolutions</h4>
                <p className="text-xs text-slate-500">4K to 360p options</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Download className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Fast Downloads</h4>
                <p className="text-xs text-slate-500">High-speed processing</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Play className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">MP4 Format</h4>
                <p className="text-xs text-slate-500">Universal compatibility</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <h3 className="font-bold text-blue-800 mb-2 uppercase text-sm">Tips</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• For best quality, select 4K or 1080p resolution</li>
            <li>• Larger resolutions may take longer to process</li>
            <li>• Some videos may have limited quality options based on source</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
