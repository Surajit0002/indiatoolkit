"use client";

import { useState, useRef } from "react";
import { Copy, Download, Type, Palette, Instagram, Facebook, Twitter, Linkedin, MessageSquare, Heart, Share2, Zap } from "lucide-react";

export default function SocialMediaPostDesigner() {
  const [content, setContent] = useState("Your amazing post content goes here! 📸");
  const [hashtag, setHashtag] = useState("#YourBrand");
  const [primaryColor, setPrimaryColor] = useState("#E1306C");
  const [secondaryColor, setSecondaryColor] = useState("#F56040");
  const [textColor, setTextColor] = useState("#ffffff");
  const [postStyle, setPostStyle] = useState<"instagram" | "facebook" | "twitter" | "linkedin">("instagram");
  const [accentEmoji, setAccentEmoji] = useState("✨");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const platforms = [
    { id: "instagram", name: "Instagram", icon: Instagram, color: "#E1306C" },
    { id: "facebook", name: "Facebook", icon: Facebook, color: "#1877F2" },
    { id: "twitter", name: "Twitter/X", icon: Twitter, color: "#000000" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "#0A66C2" },
  ];

  const emojis = ["✨", "🔥", "💪", "🚀", "⭐", "💡", "🎯", "👀", "❤️", "🙌"];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPost = () => {
    alert("Download functionality would be implemented here with html2canvas");
  };

  const getPostStyle = () => {
    switch (postStyle) {
      case "instagram":
        return "aspect-square rounded-none";
      case "facebook":
        return "aspect-[1.91/1] rounded-lg";
      case "twitter":
        return "aspect-[16/9] rounded-xl";
      case "linkedin":
        return "aspect-[1.91/1] rounded-lg";
      default:
        return "aspect-square rounded-none";
    }
  };

  const getGradient = () => {
    switch (postStyle) {
      case "instagram":
        return "bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600";
      case "facebook":
        return "bg-gradient-to-br from-blue-500 to-blue-700";
      case "twitter":
        return "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700";
      case "linkedin":
        return "bg-gradient-to-br from-blue-600 to-blue-800";
      default:
        return "bg-gradient-to-br from-pink-500 to-purple-600";
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Social Media Post Designer</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create posts for Instagram, Facebook, Twitter, and LinkedIn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Content */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Post Content
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Post Text</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Hashtag</label>
                  <input
                    type="text"
                    value={hashtag}
                    onChange={(e) => setHashtag(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Platform Selection */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Platform
                </span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-2">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => setPostStyle(platform.id as typeof postStyle)}
                      className={`p-3 rounded-xl border-2 transition-all flex items-center gap-2 ${
                        postStyle === platform.id
                          ? "border-pink-500 bg-pink-50"
                          : "border-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <platform.icon className="h-5 w-5" style={{ color: platform.color }} />
                      <span className="text-xs font-bold text-slate-700">{platform.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Emoji */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Accent
                </span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-5 gap-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setAccentEmoji(emoji)}
                      className={`p-3 rounded-xl border-2 text-xl transition-all ${
                        accentEmoji === emoji
                          ? "border-pink-500 bg-pink-50"
                          : "border-slate-100 hover:border-slate-300"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Colors
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Primary Color</label>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-slate-100 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Secondary Color</label>
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-slate-100 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Text Color</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-slate-100 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Post Preview</span>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadPost}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-sm hover:from-pink-600 hover:to-orange-600 transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div
                  ref={canvasRef}
                  className={`mx-auto rounded-xl shadow-2xl overflow-hidden ${getPostStyle()}`}
                  style={{ maxWidth: "500px" }}
                >
                  <div className={`w-full h-full p-8 ${getGradient()}`}>
                    <div className="h-full flex flex-col">
                      {/* Profile */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-2xl">{accentEmoji}</span>
                        </div>
                        <div>
                          <p className="font-bold text-white">Your Brand</p>
                          <p className="text-xs text-white/70">Just now</p>
                        </div>
                      </div>

                      {/* Content */}
                      <p className="font-medium text-white mb-6 flex-1" style={{ fontSize: "18px", lineHeight: "1.6" }}>
                        {content}
                      </p>

                      {/* Hashtag */}
                      <p className="font-bold mb-6" style={{ color: secondaryColor }}>
                        {hashtag}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/20">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 text-white/80">
                            <Heart className="h-5 w-5" />
                            <span className="text-sm">Like</span>
                          </button>
                          <button className="flex items-center gap-2 text-white/80">
                            <MessageSquare className="h-5 w-5" />
                            <span className="text-sm">Comment</span>
                          </button>
                          <button className="flex items-center gap-2 text-white/80">
                            <Share2 className="h-5 w-5" />
                            <span className="text-sm">Share</span>
                          </button>
                        </div>
                        <button className="text-white/80">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Templates */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Post Templates</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { name: "Sale", primary: "#EF4444", secondary: "#F59E0B", emoji: "🔥" },
                    { name: "Event", primary: "#3B82F6", secondary: "#8B5CF6", emoji: "🎉" },
                    { name: "Tips", primary: "#10B981", secondary: "#059669", emoji: "💡" },
                    { name: "Quote", primary: "#F97316", secondary: "#7C3AED", emoji: "✨" },
                  ].map((template) => (
                    <button
                      key={template.name}
                      onClick={() => {
                        setPrimaryColor(template.primary);
                        setSecondaryColor(template.secondary);
                        setAccentEmoji(template.emoji);
                      }}
                      className="p-3 rounded-xl border-2 border-slate-100 hover:border-slate-300 transition-all text-center"
                    >
                      <span className="text-2xl mb-2 block">{template.emoji}</span>
                      <span className="text-xs font-bold text-slate-700">{template.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
