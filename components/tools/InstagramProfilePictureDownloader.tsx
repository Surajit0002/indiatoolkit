"use client";

import { useState } from "react";
import { Download, Link, Copy, Check, User, Loader2, AlertCircle, Maximize, Image } from "lucide-react";

interface SizeOption {
  label: string;
  size: string;
}

const sizeOptions: SizeOption[] = [
  { label: "HD (320px)", size: "320" },
  { label: "Original", size: "original" },
  { label: "Small (150px)", size: "150" },
];

export default function InstagramProfilePictureDownloader() {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeOption>(sizeOptions[0]);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profileInfo, setProfileInfo] = useState<{ username: string; fullName: string; posts: string; followers: string; following: string } | null>(null);

  const extractUsername = (inputUrl: string): string | null => {
    const patterns = [
      /instagram\.com\/([a-zA-Z0-9_.]+)\/?$/,
      /instagram\.com\/([a-zA-Z0-9_.]+)\/?(?:\?|$)/,
    ];
    for (const pattern of patterns) {
      const match = inputUrl.match(pattern);
      if (match && match[1] !== "p" && match[1] !== "reel" && match[1] !== "stories" && match[1] !== "explore" && match[1] !== "direct") {
        return match[1];
      }
    }
    return null;
  };

  const handleUrlChange = (input: string) => {
    setUrl(input);
    const user = extractUsername(input);
    if (user) {
      setUsername(user);
      setIsValid(true);
      setError(null);
      setProfileInfo({ username: user, fullName: "User Name", posts: "125 posts", followers: "10.5K followers", following: "500 following" });
    } else if (input.length > 0) {
      setUsername(null);
      setIsValid(false);
      setError("Please enter a valid Instagram profile URL");
      setProfileInfo(null);
    } else {
      setUsername(null);
      setIsValid(null);
      setError(null);
      setProfileInfo(null);
    }
  };

  const handleDownload = async () => {
    if (!username) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    window.open(`https://www.instagram.com/${username}/`, "_blank");
  };

  const copyToClipboard = async () => {
    const profileUrl = username ? `https://www.instagram.com/${username}/` : "";
    await navigator.clipboard.writeText(profileUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Instagram Profile Picture (HD)</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">Download Instagram profile pictures in high definition</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Instagram Profile URL</label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="Paste Instagram Profile URL (e.g., https://www.instagram.com/username/)"
                className={`w-full h-14 pl-12 pr-4 rounded-2xl border-2 focus:outline-none transition-all ${
                  isValid === true ? "border-emerald-500 bg-emerald-50" : isValid === false ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-pink-400"
                }`}
              />
              <Link className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${isValid === true ? "text-emerald-500" : isValid === false ? "text-red-500" : "text-slate-400"}`} />
            </div>
            {isValid === false && <div className="flex items-center gap-2 mt-3 text-red-500"><AlertCircle className="h-4 w-4" /><span className="text-sm font-medium">{error}</span></div>}
          </div>

          {username && profileInfo && (
            <div className="px-6 pb-6 space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-1">
                      <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                        <User className="h-12 w-12 text-slate-400" />
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Image className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-xl">@{profileInfo.username}</h3>
                    <p className="text-slate-500">{profileInfo.fullName}</p>
                    <div className="flex gap-4 mt-3 text-sm">
                      <div className="text-center"><span className="font-bold text-slate-800 block">{profileInfo.posts}</span><span className="text-slate-500">Posts</span></div>
                      <div className="text-center"><span className="font-bold text-slate-800 block">{profileInfo.followers}</span><span className="text-slate-500">Followers</span></div>
                      <div className="text-center"><span className="font-bold text-slate-800 block">{profileInfo.following}</span><span className="text-slate-500">Following</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Select Size</label>
                <div className="grid grid-cols-3 gap-3">
                  {sizeOptions.map((size) => (
                    <button key={size.size} onClick={() => setSelectedSize(size)} className={`p-4 rounded-xl border-2 transition-all ${selectedSize.size === size.size ? "border-pink-500 bg-pink-50" : "border-slate-200 hover:border-slate-300"}`}>
                      <div className="text-center">
                        <Maximize className={`h-6 w-6 mx-auto mb-2 ${selectedSize.size === size.size ? "text-pink-600" : "text-slate-400"}`} />
                        <span className="block font-bold text-slate-800 text-sm">{size.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-3">
                  <Maximize className="h-6 w-6 text-emerald-600" />
                  <div>
                    <h4 className="font-bold text-emerald-800">HD Quality</h4>
                    <p className="text-sm text-emerald-600">Download profile pictures in full high definition</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button onClick={handleDownload} disabled={isLoading} className="flex-1 min-w-[150px] h-14 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 transition-all shadow-lg shadow-pink-100 disabled:opacity-50">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                  {isLoading ? "Processing..." : "Download Profile Picture"}
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
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center"><User className="h-5 w-5 text-purple-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">HD Quality</h4><p className="text-xs text-slate-500">Up to 320px</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-pink-100 rounded-xl flex items-center justify-center"><Image className="h-5 w-5 text-pink-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">Any Profile</h4><p className="text-xs text-slate-500">Public accounts</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-orange-100 rounded-xl flex items-center justify-center"><Download className="h-5 w-5 text-orange-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">Instant Download</h4><p className="text-xs text-slate-500">Quick and easy</p></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
