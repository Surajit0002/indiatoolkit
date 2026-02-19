"use client";

import { useState } from "react";
import { Download, Link, Copy, Check, Music, Loader2, AlertCircle, Headphones, ExternalLink, FileAudio } from "lucide-react";

interface AudioQuality {
  label: string;
  bitrate: string;
  format: string;
}

const audioQualities: AudioQuality[] = [
  { label: "320 kbps", bitrate: "320", format: "MP3" },
  { label: "256 kbps", bitrate: "256", format: "MP3" },
  { label: "128 kbps", bitrate: "128", format: "MP3" },
  { label: "64 kbps", bitrate: "64", format: "MP3" },
];

export default function YoutubeMp3Downloader() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<AudioQuality>(audioQualities[0]);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<{ title: string; channel: string; duration: string } | null>(null);

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
        duration: "3:45"
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

  const handleDownload = async () => {
    if (!videoId) return;
    setIsLoading(true);
    
    // Simulate API call - in production, use actual download API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
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

  // Estimate file size based on bitrate and duration
  const estimateFileSize = () => {
    if (!videoInfo) return "0 MB";
    const durationSeconds = parseInt(videoInfo.duration.split(":")[0]) * 60 + parseInt(videoInfo.duration.split(":")[1]);
    const sizeMB = (parseInt(selectedQuality.bitrate) * durationSeconds) / 8 / 1024;
    return sizeMB.toFixed(1) + " MB";
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Music className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">YouTube MP3 Downloader</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Convert YouTube videos to high-quality MP3 audio
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
                    : "border-slate-200 focus:border-purple-400"
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
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="relative w-32 h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                    <img
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
                        className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{videoInfo.channel}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                        {videoInfo.duration}
                      </span>
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                        Audio Only
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quality Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Select Audio Quality
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {audioQualities.map((quality) => (
                    <button
                      key={quality.bitrate}
                      onClick={() => setSelectedQuality(quality)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedQuality.bitrate === quality.bitrate
                          ? "border-purple-500 bg-purple-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-center">
                        <Headphones className={`h-6 w-6 mx-auto mb-2 ${
                          selectedQuality.bitrate === quality.bitrate
                            ? "text-purple-600"
                            : "text-slate-400"
                        }`} />
                        <span className="block font-bold text-slate-800 text-sm">{quality.bitrate} kbps</span>
                        <span className="block text-xs text-slate-500 mt-1">{quality.format}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated File Size */}
              <div className="p-4 bg-slate-900 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileAudio className="h-5 w-5 text-purple-400" />
                    <div>
                      <span className="text-xs text-slate-500 font-bold uppercase">Estimated Size</span>
                      <p className="text-white font-medium">{estimateFileSize()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-bold uppercase">Format</span>
                    <p className="text-white font-medium">{selectedQuality.format}</p>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleDownload}
                  disabled={isLoading}
                  className="flex-1 min-w-[150px] h-14 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-100 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Converting to MP3...
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5" />
                      Download {selectedQuality.bitrate} kbps MP3
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
              <div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Music className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">High Quality</h4>
                <p className="text-xs text-slate-500">Up to 320 kbps</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Headphones className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Fast Conversion</h4>
                <p className="text-xs text-slate-500">Quick processing</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-pink-100 rounded-xl flex items-center justify-center">
                <FileAudio className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Universal Format</h4>
                <p className="text-xs text-slate-500">Works everywhere</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-purple-50 rounded-2xl border border-purple-100">
          <h3 className="font-bold text-purple-800 mb-2 uppercase text-sm">Audio Quality Guide</h3>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• 320 kbps - Best quality, larger file size</li>
            <li>• 256 kbps - Great quality, good balance</li>
            <li>• 128 kbps - Standard quality, smaller files</li>
            <li>• 64 kbps - Low quality, smallest files</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
