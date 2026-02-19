"use client";

import { useState } from "react";
import {
  Twitter,
  Facebook,
  Linkedin,
  Share2,
  Link2,
  Check,
  MessageCircle,
} from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  className?: string;
}

/**
 * ShareButtons Component
 * Provides social sharing buttons for tools and pages
 * Helps with SEO through social signals
 */
export function ShareButtons({
  url,
  title,
  description = "",
  image,
  className = "",
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = url.startsWith("http") ? url : `https://www.indiatoolkit.in${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: fullUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Twitter */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-slate-100 hover:bg-sky-100 text-slate-600 hover:text-sky-600 transition-colors"
        aria-label="Share on Twitter"
        title="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </a>

      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 transition-colors"
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </a>

      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 transition-colors"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>

      {/* WhatsApp */}
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-slate-100 hover:bg-green-100 text-slate-600 hover:text-green-600 transition-colors"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="p-2 rounded-lg bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-600 transition-colors"
        aria-label="Copy link"
        title="Copy link"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </button>

      {/* Native Share (mobile) */}
      {"share" in navigator && (
        <button
          onClick={handleNativeShare}
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Share"
          title="Share"
        >
          <Share2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

/**
 * ShareButtonCompact - A compact share button for smaller spaces
 */
export function ShareButtonCompact({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const fullUrl = url.startsWith("http") ? url : `https://www.indiatoolkit.in${url}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: fullUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback to copy
      try {
        await navigator.clipboard.writeText(fullUrl);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
    >
      <Share2 className="h-4 w-4" />
      <span>Share</span>
    </button>
  );
}
