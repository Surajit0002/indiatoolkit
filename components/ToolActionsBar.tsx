"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Heart, 
  Share2, 
  Copy, 
  Check,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  DollarSign,
  BookmarkPlus,
  BookmarkCheck,
  ExternalLink
} from "lucide-react";
import { Tool } from "@/types/tool";
import CurrencySelector from "./CurrencySelector";

interface ToolActionsBarProps {
  tool: Tool;
  variant?: "full" | "compact" | "minimal";
  showCurrency?: boolean;
}

export default function ToolActionsBar({ 
  tool, 
  variant = "full",
  showCurrency = false 
}: ToolActionsBarProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check if tool is in favorites
  useEffect(() => {
    const savedFavorites = localStorage.getItem("tool-favorites");
    if (savedFavorites) {
      const favorites = savedFavorites.split(",");
      setIsFavorite(favorites.includes(tool.id));
    }
  }, [tool.id]);

  // Toggle favorite
  const toggleFavorite = useCallback(() => {
    const savedFavorites = localStorage.getItem("tool-favorites") || "";
    const favorites = savedFavorites.split(",").filter(Boolean);
    
    if (favorites.includes(tool.id)) {
      const newFavorites = favorites.filter(id => id !== tool.id);
      localStorage.setItem("tool-favorites", newFavorites.join(","));
      setIsFavorite(false);
    } else {
      favorites.push(tool.id);
      localStorage.setItem("tool-favorites", favorites.join(","));
      setIsFavorite(true);
    }

    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent("favorites-change"));
  }, [tool.id]);

  // Copy link to clipboard
  const copyLink = useCallback(() => {
    const url = `${window.location.origin}/tool/${tool.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [tool.slug]);

  // Share functions
  const shareUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/tool/${tool.slug}` 
    : "";
  const shareText = `Check out ${tool.name} - ${tool.description}`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(tool.name)}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
  };

  // Native share (mobile)
  const nativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tool.name,
          text: tool.description,
          url: shareUrl,
        });
      } catch (_err) {
        console.log("Share cancelled");
      }
    } else {
      setShowShareMenu(true);
    }
  }, [tool.name, tool.description, shareUrl]);

  if (variant === "minimal") {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={toggleFavorite}
          className={`p-2 rounded-lg transition-all ${
            isFavorite 
              ? "text-red-500 bg-red-50" 
              : "text-slate-400 hover:text-red-500 hover:bg-red-50"
          }`}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>
        <button
          onClick={nativeShare}
          className="p-2 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
          title="Share"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={toggleFavorite}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold
            transition-all duration-200
            ${isFavorite 
              ? "bg-red-100 text-red-600" 
              : "bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-500"
            }
          `}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          <span className="hidden sm:inline">{isFavorite ? "Saved" : "Save"}</span>
        </button>
        
        <button
          onClick={copyLink}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold
            bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-500
            transition-all duration-200
          `}
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
        </button>

        {showCurrency && (
          <CurrencySelector compact />
        )}
      </div>
    );
  }

  // Full variant
  return (
    <div className="flex items-center gap-2">
      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold
          transition-all duration-200 shadow-sm
          ${isFavorite 
            ? "bg-red-500 text-white shadow-red-200" 
            : "bg-white text-slate-700 hover:bg-red-50 hover:text-red-500 border border-slate-200"
          }
        `}
      >
        {isFavorite ? (
          <BookmarkCheck className="w-4 h-4" />
        ) : (
          <BookmarkPlus className="w-4 h-4" />
        )}
        <span>{isFavorite ? "Saved" : "Save"}</span>
      </button>

      {/* Share Button */}
      <div className="relative">
        <button
          onClick={nativeShare}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-white text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-500 transition-all duration-200 shadow-sm"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>

        {/* Share Menu Dropdown */}
        {showShareMenu && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setShowShareMenu(false)}
            />
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-fade-in-up">
              <div className="p-2 space-y-1">
                <button
                  onClick={() => { window.open(shareLinks.twitter, "_blank"); setShowShareMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium">Twitter</span>
                </button>
                <button
                  onClick={() => { window.open(shareLinks.facebook, "_blank"); setShowShareMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Facebook</span>
                </button>
                <button
                  onClick={() => { window.open(shareLinks.linkedin, "_blank"); setShowShareMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-700" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </button>
                <button
                  onClick={() => { window.location.href = shareLinks.email; setShowShareMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium">Email</span>
                </button>
                <hr className="my-1 border-slate-100" />
                <button
                  onClick={() => { copyLink(); setShowShareMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  <span className="text-sm font-medium">{copied ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Copy Link Button */}
      <button
        onClick={copyLink}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-white text-slate-700 border border-slate-200 hover:bg-green-50 hover:text-green-600 transition-all duration-200 shadow-sm"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <ExternalLink className="w-4 h-4" />}
        <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Link"}</span>
      </button>

      {/* Currency Selector (conditional) */}
      {showCurrency && (
        <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-white text-slate-700 border border-slate-200 shadow-sm">
          <DollarSign className="w-4 h-4" />
          <CurrencySelector />
        </div>
      )}
    </div>
  );
}
