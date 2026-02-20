"use client";

import { useState } from "react";
import { Star, ThumbsUp, X, Send } from "lucide-react";

interface FeedbackRatingProps {
  toolSlug: string;
  toolName: string;
}

export default function FeedbackRating({ toolSlug, toolName }: FeedbackRatingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState<"helpful" | "not-helpful" | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = () => {
    // In production, send to API
    console.log("Feedback submitted:", { toolSlug, rating, feedbackType, comment });
    setIsSubmitted(true);
    
    // Save to localStorage for demo
    const existingFeedback = JSON.parse(localStorage.getItem("tool-feedback") || "{}");
    existingFeedback[toolSlug] = { rating, feedbackType, comment, date: new Date().toISOString() };
    localStorage.setItem("tool-feedback", JSON.stringify(existingFeedback));
  };

  const resetForm = () => {
    setRating(0);
    setFeedbackType(null);
    setComment("");
    setIsSubmitted(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
        aria-label="Give feedback"
      >
        <ThumbsUp className="h-4 w-4 text-slate-600" />
        <span className="text-sm font-medium text-slate-600">Feedback</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-400" />
              </button>

              {isSubmitted ? (
                /* Success State */
                <div className="text-center py-8">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ThumbsUp className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-slate-500">
                    Your feedback helps us improve our tools.
                  </p>
                  <button
                    onClick={resetForm}
                    className="mt-6 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                /* Form State */
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    Rate this Tool
                  </h3>
                  <p className="text-sm text-slate-500 mb-6">
                    {toolName}
                  </p>

                  {/* Star Rating */}
                  <div className="flex justify-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= (hoveredStar || rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Helpful Buttons */}
                  <div className="flex gap-3 mb-6">
                    <button
                      onClick={() => setFeedbackType("helpful")}
                      className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                        feedbackType === "helpful"
                          ? "bg-green-100 text-green-700 border-2 border-green-300"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-2 border-transparent"
                      }`}
                    >
                      👍 Helpful
                    </button>
                    <button
                      onClick={() => setFeedbackType("not-helpful")}
                      className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                        feedbackType === "not-helpful"
                          ? "bg-red-100 text-red-700 border-2 border-red-300"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-2 border-transparent"
                      }`}
                    >
                      👎 Not Helpful
                    </button>
                  </div>

                  {/* Comment */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Comments (optional)
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none resize-none h-24"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={rating === 0}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                    Submit Feedback
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
