"use client";

import { useState } from "react";
import { Copy, Download, Calendar, MessageSquare, Hash, Clock, Check, Plus, Trash2 } from "lucide-react";

interface Post {
  id: number;
  day: string;
  platform: string;
  content: string;
  time: string;
  hashtags: string;
}

export default function SocialMediaCalendar() {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, day: "Monday", platform: "Twitter", content: "Share industry news and insights", time: "09:00", hashtags: "#Industry #News #Insights" },
    { id: 2, day: "Tuesday", platform: "LinkedIn", content: "Post company update or case study", time: "10:00", hashtags: "#Business #CaseStudy #Growth" },
    { id: 3, day: "Wednesday", platform: "Instagram", content: "Share behind-the-scenes content", time: "12:00", hashtags: "#BehindTheScenes #Team #Culture" },
    { id: 4, day: "Thursday", platform: "Facebook", content: "Engage with community questions", time: "14:00", hashtags: "#Community #QandA #Engagement" },
    { id: 5, day: "Friday", platform: "TikTok", content: "Fun, lighthearted content", time: "15:00", hashtags: "#Fun #Friday #Vibes" },
  ]);
  const [newPost, setNewPost] = useState({ day: "Monday", platform: "Twitter", content: "", time: "09:00", hashtags: "" });
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const platforms = ["Twitter", "Facebook", "Instagram", "LinkedIn", "TikTok", "Pinterest", "YouTube"];

  const addPost = () => {
    if (newPost.content) {
      setPosts([...posts, { ...newPost, id: Date.now() }]);
      setNewPost({ day: "Monday", platform: "Twitter", content: "", time: "09:00", hashtags: "" });
      setShowForm(false);
    }
  };

  const removePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const copyCalendar = () => {
    let calendar = "📅 Social Media Content Calendar\n\n";
    days.forEach(day => {
      const dayPosts = posts.filter(p => p.day === day);
      if (dayPosts.length > 0) {
        calendar += `\n📌 ${day.toUpperCase()}\n`;
        dayPosts.forEach(post => {
          calendar += `  ${post.time} - ${post.platform}: ${post.content}\n`;
          calendar += `     ${post.hashtags}\n`;
        });
      }
    });
    navigator.clipboard.writeText(calendar);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      Twitter: "bg-sky-500",
      Facebook: "bg-blue-600",
      Instagram: "bg-pink-500",
      LinkedIn: "bg-blue-700",
      TikTok: "bg-black",
      Pinterest: "bg-red-600",
      YouTube: "bg-red-600",
    };
    return colors[platform] || "bg-slate-500";
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Social Media Calendar</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Plan your social media content schedule
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Posts List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-emerald-500" />
                  Content Schedule
                </h3>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Post
                </button>
              </div>

              {showForm && (
                <div className="bg-slate-50 rounded-xl p-4 mb-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Day</label>
                      <select
                        value={newPost.day}
                        onChange={(e) => setNewPost({ ...newPost, day: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      >
                        {days.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Platform</label>
                      <select
                        value={newPost.platform}
                        onChange={(e) => setNewPost({ ...newPost, platform: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      >
                        {platforms.map(platform => (
                          <option key={platform} value={platform}>{platform}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Time</label>
                    <input
                      type="time"
                      value={newPost.time}
                      onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      placeholder="What do you want to post?"
                      rows={3}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Hashtags</label>
                    <input
                      type="text"
                      value={newPost.hashtags}
                      onChange={(e) => setNewPost({ ...newPost, hashtags: e.target.value })}
                      placeholder="#hashtag1 #hashtag2"
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                  <button
                    onClick={addPost}
                    className="w-full py-2 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors"
                  >
                    Add to Calendar
                  </button>
                </div>
              )}

              <div className="space-y-3">
                {posts.map((post) => (
                  <div key={post.id} className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-emerald-200 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`${getPlatformColor(post.platform)} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                          {post.platform}
                        </span>
                        <span className="text-sm font-semibold text-slate-700">{post.day}</span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="h-3 w-3" />
                          {post.time}
                        </span>
                      </div>
                      <button
                        onClick={() => removePost(post.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-slate-700 mb-2">{post.content}</p>
                    <div className="flex flex-wrap gap-1">
                      {post.hashtags.split(" ").filter(h => h).map((hashtag, idx) => (
                        <span key={idx} className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={copyCalendar}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Copy className="h-5 w-5" />
              Copy Calendar
            </button>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-500" />
                Weekly Overview
              </h3>
              
              <div className="space-y-3">
                {days.map(day => {
                  const dayPosts = posts.filter(p => p.day === day);
                  return (
                    <div key={day} className="border-l-2 border-emerald-200 pl-3">
                      <h4 className="font-semibold text-slate-700 text-sm">{day}</h4>
                      {dayPosts.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">No posts scheduled</p>
                      ) : (
                        <div className="space-y-1 mt-1">
                          {dayPosts.map((post, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              <span className="text-slate-500">{post.time}</span>
                              <span className={`${getPlatformColor(post.platform)} text-white px-1.5 py-0.5 rounded text-[10px]`}>
                                {post.platform}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Hash className="h-5 w-5 text-emerald-500" />
                Hashtag Tips
              </h3>
              
              <div className="space-y-3 text-sm text-slate-600">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-semibold text-slate-700">1-3 Hashtags for Twitter</p>
                  <p>Keep it concise and relevant</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-semibold text-slate-700">5-10 Hashtags for Instagram</p>
                  <p>Mix popular and niche tags</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-semibold text-slate-700">3-5 Hashtags for LinkedIn</p>
                  <p>Focus on professional keywords</p>
                </div>
              </div>
            </div>

            {copied && (
              <div className="fixed bottom-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                <Check className="h-5 w-5" />
                Copied to clipboard!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
