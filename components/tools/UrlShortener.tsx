"use client";

import { useState } from "react";
import { Link, Copy, Check, RefreshCw, QrCode, ArrowRight, History, Trash2, ExternalLink } from "lucide-react";

interface ShortenedUrl {
  original: string;
  short: string;
  createdAt: Date;
  clicks: number;
}

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [history, setHistory] = useState<ShortenedUrl[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  // Simulated URL shortening (in production, use a real API like TinyURL, Bitly, or your own backend)
  const shortenUrl = async () => {
    if (!originalUrl.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    // Validate URL
    try {
      new URL(originalUrl);
    } catch {
      setError("Please enter a valid URL (including http:// or https://)");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      // Generate short code
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let shortCode = "";
      
      if (customAlias.trim()) {
        shortCode = customAlias.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
      } else {
        for (let i = 0; i < 6; i++) {
          shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
      }

      const baseUrl = "https://indiatoolkit.in/t";
      const newShortUrl = `${baseUrl}/${shortCode}`;

      // Add to history
      const newEntry: ShortenedUrl = {
        original: originalUrl,
        short: newShortUrl,
        createdAt: new Date(),
        clicks: 0,
      };

      setHistory((prev) => [newEntry, ...prev].slice(0, 10));
      setShortUrl(newShortUrl);
      setIsLoading(false);
    }, 1000);
  };

  const copyToClipboard = async () => {
    if (shortUrl) {
      await navigator.clipboard.writeText(shortUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setShortUrl(null);
  };

  const deleteEntry = (index: number) => {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const generateQrCode = (url: string) => {
    // In production, use a QR code library or API
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  };

  const openShortUrl = () => {
    if (shortUrl) {
      window.open(shortUrl, "_blank");
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Link className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">URL Shortener</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create short, memorable links in seconds
          </p>
        </div>

        {/* Main Input */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-4">
            {/* Original URL */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Long URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={originalUrl}
                  onChange={(e) => {
                    setOriginalUrl(e.target.value);
                    setError(null);
                  }}
                  placeholder="https://example.com/very-long-url-that-needs-shortening"
                  className={`w-full h-14 pl-12 pr-4 rounded-2xl border-2 focus:outline-none transition-all ${
                    error
                      ? "border-red-500 bg-red-50"
                      : "border-slate-200 focus:border-indigo-500"
                  }`}
                />
                <Link className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${
                  error ? "text-red-400" : "text-slate-400"
                }`} />
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            {/* Custom Alias */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Custom Alias (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  placeholder="my-custom-link"
                  className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none transition-all"
                />
                <ArrowRight className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 rotate-180" />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Leave blank for auto-generated short link
              </p>
            </div>

            {/* Shorten Button */}
            <button
              onClick={shortenUrl}
              disabled={isLoading || !originalUrl.trim()}
              className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Shortening...
                </>
              ) : (
                <>
                  <Link className="h-5 w-5" />
                  Shorten URL
                </>
              )}
            </button>
          </div>

          {/* Result */}
          {shortUrl && (
            <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-t border-indigo-100">
              <label className="block text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">
                Your Short URL
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="flex-1 h-12 px-4 rounded-xl bg-white border-2 border-indigo-200 text-indigo-700 font-bold focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="h-12 px-6 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-5 w-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5" />
                      Copy
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowQr(!showQr)}
                  className="h-12 px-6 rounded-xl bg-white border-2 border-indigo-200 text-indigo-600 font-bold flex items-center justify-center hover:bg-indigo-50 transition-all"
                >
                  <QrCode className="h-5 w-5" />
                </button>
                <button
                  onClick={openShortUrl}
                  className="h-12 px-6 rounded-xl bg-white border-2 border-indigo-200 text-indigo-600 font-bold flex items-center justify-center hover:bg-indigo-50 transition-all"
                >
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>

              {/* QR Code */}
              {showQr && (
                <div className="mt-6 flex justify-center">
                  <div className="bg-white p-4 rounded-xl shadow-lg">
                    <img
                      src={generateQrCode(shortUrl)}
                      alt="QR Code"
                      className="w-48 h-48"
                    />
                    <p className="text-xs text-center text-slate-500 mt-2">Scan to open URL</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <History className="h-5 w-5 text-slate-400" />
                <h3 className="font-bold text-slate-700">Recent Links</h3>
              </div>
              <button
                onClick={clearHistory}
                className="text-xs text-red-500 hover:text-red-600 font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-3">
              {history.map((entry, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-indigo-600 font-bold text-sm truncate">
                        {entry.short}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-400">
                        {entry.clicks} clicks
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">
                      {entry.original}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(entry.short);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                      }}
                      className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <Copy className="h-4 w-4 text-slate-400" />
                    </button>
                    <button
                      onClick={() => deleteEntry(index)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <Link className="h-8 w-8 text-indigo-600 mb-3" />
            <h3 className="font-bold text-indigo-800 mb-2">Custom Aliases</h3>
            <p className="text-sm text-indigo-700">
              Create memorable short links with your own custom keywords.
            </p>
          </div>
          <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
            <QrCode className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-purple-800 mb-2">QR Codes</h3>
            <p className="text-sm text-purple-700">
              Generate QR codes for easy sharing and printing.
            </p>
          </div>
          <div className="p-6 bg-pink-50 rounded-2xl border border-pink-100">
            <History className="h-8 w-8 text-pink-600 mb-3" />
            <h3 className="font-bold text-pink-800 mb-2">History</h3>
            <p className="text-sm text-pink-700">
              Keep track of all your shortened links in one place.
            </p>
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-xs text-amber-700 text-center">
            <strong>Note:</strong> This is a demo implementation. For production use, integrate with a URL shortening service like TinyURL, Bitly, or implement your own backend.
          </p>
        </div>
      </div>
    </div>
  );
}
