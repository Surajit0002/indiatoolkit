"use client";

import { useState } from "react";
import { Download, Link, Copy, Check, Image, ExternalLink, Loader2, AlertCircle } from "lucide-react";

interface ThumbnailQuality {
  label: string;
  suffix: string;
  width: number;
  height: number;
}

const thumbnailQualities: ThumbnailQuality[] = [
  { label: "Maximum", suffix: "maxresdefault", width: 1280, height: 720 },
  { label: "High", suffix: "sddefault", width: 640, height: 480 },
  { label: "Medium", suffix: "mqdefault", width: 320, height: 180 },
  { label: "Standard", suffix: "hqdefault", width: 480, height: 360 },
];

export default function YoutubeThumbnailDownloader() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<ThumbnailQuality>(thumbnailQualities[0]);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractVideoId = (inputUrl: string): string | null => {
    // Handle various YouTube URL formats
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
    } else if (input.length > 0) {
      setVideoId(null);
      setIsValid(false);
      setError(null);
    } else {
      setVideoId(null);
      setIsValid(null);
      setError(null);
    }
  };

  const getThumbnailUrl = (quality: ThumbnailQuality = selectedQuality) => {
    if (!videoId) return "";
    return `https://img.youtube.com/vi/${videoId}/${quality.suffix}.jpg`;
  };

  const checkImageExists = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch {
      return false;
    }
  };

  const copyToClipboard = async () => {
    const thumbnailUrl = getThumbnailUrl();
    await navigator.clipboard.writeText(thumbnailUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadThumbnail = async () => {
    if (!videoId) return;

    const thumbnailUrl = getThumbnailUrl();
    
    // Check if maxresdefault exists, fallback to high quality
    const exists = await checkImageExists(thumbnailUrl);
    if (!exists && selectedQuality.suffix === "maxresdefault") {
      // Try fallback
      const fallbackUrl = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
      const fallbackExists = await checkImageExists(fallbackUrl);
      if (fallbackExists) {
        window.open(fallbackUrl, "_blank");
        return;
      }
    }

    window.open(thumbnailUrl, "_blank");
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
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <Image className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">YouTube Thumbnail Downloader</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Download high-quality thumbnails from any YouTube video
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

            {/* Validation Message */}
            {isValid === false && (
              <div className="flex items-center gap-2 mt-3 text-red-500">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Please enter a valid YouTube URL</span>
              </div>
            )}
          </div>

          {videoId && (
            /* Preview Section */
            <div className="px-6 pb-6 space-y-6">
              {/* Quality Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Select Quality
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {thumbnailQualities.map((quality) => (
                    <button
                      key={quality.suffix}
                      onClick={() => setSelectedQuality(quality)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedQuality.suffix === quality.suffix
                          ? "border-red-500 bg-red-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-center">
                        <span className="block font-bold text-slate-800 text-sm">{quality.label}</span>
                        <span className="block text-xs text-slate-500 mt-1">
                          {quality.width}x{quality.height}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Thumbnail Preview */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Preview
                  </span>
                  <button
                    onClick={openYouTube}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open Video
                  </button>
                </div>
                <div className="relative">
                  <img
                    src={getThumbnailUrl()}
                    alt={`YouTube thumbnail for video ${videoId}`}
                    className="w-full h-auto rounded-xl shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
                    }}
                  />
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {selectedQuality.width}x{selectedQuality.height}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={downloadThumbnail}
                  className="flex-1 min-w-[150px] h-14 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-red-700 hover:to-pink-700 transition-all shadow-lg shadow-red-100"
                >
                  <Download className="h-5 w-5" />
                  Download
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
                      Copy URL
                    </>
                  )}
                </button>
              </div>

              {/* URL Display */}
              <div className="p-4 bg-slate-900 rounded-xl">
                <code className="text-xs text-slate-400 break-all">
                  {getThumbnailUrl()}
                </code>
              </div>
            </div>
          )}
        </div>

        {/* Supported Formats */}
        <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-3 uppercase text-sm">Supported Formats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {thumbnailQualities.map((quality) => (
              <div key={quality.suffix} className="p-3 bg-white rounded-xl">
                <span className="block text-lg font-black text-slate-800">{quality.width}×{quality.height}</span>
                <span className="block text-xs text-slate-500 mt-1">{quality.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <h3 className="font-bold text-blue-800 mb-2 uppercase text-sm">Tips</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use Maximum quality for the best resolution (1280x720)</li>
            <li>• Not all videos have maximum quality thumbnails available</li>
            <li>• The tool will automatically fallback if a quality is unavailable</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
