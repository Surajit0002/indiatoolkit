"use client";

import { useState, useEffect } from "react";
import { Share2, Star, Check } from "lucide-react";
import { Tool } from "@/types/tool";

interface ToolActionsProps {
  tool: Tool;
}

export default function ToolActions({ tool }: ToolActionsProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorited(favorites.includes(tool.id));
  }, [tool.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let newFavorites;
    if (favorites.includes(tool.id)) {
      newFavorites = favorites.filter((id: string) => id !== tool.id);
      setIsFavorited(false);
    } else {
      newFavorites = [...favorites, tool.id];
      setIsFavorited(true);
    }
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    window.dispatchEvent(new Event("favorites-updated"));
  };

  const handleShare = async () => {
    const shareData = {
      title: `OmniTools - ${tool.name}`,
      text: tool.description,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error("Error sharing:", err);
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={handleShare}
        className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all border ${
          copied 
            ? "bg-emerald-500 border-emerald-500 text-white" 
            : "bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600"
        }`}
      >
        {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      </button>
      <button 
        onClick={toggleFavorite}
        className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all border ${
          isFavorited 
            ? "bg-slate-900 border-slate-900 text-white" 
            : "bg-white border-slate-200 text-slate-600 hover:border-yellow-400 hover:text-yellow-500"
        }`}
      >
        <Star className={`h-4 w-4 ${isFavorited ? "fill-yellow-400 text-yellow-400" : ""}`} /> 
      </button>
    </div>
  );
}
