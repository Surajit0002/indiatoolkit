"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Grid, List, Trash2, ExternalLink, Star, Heart, Clock } from "lucide-react";
import Link from "next/link";

interface SavedTool {
  id: string;
  name: string;
  slug: string;
  category: string;
  icon: string;
  color: string;
  savedAt: string;
  lastUsed?: string;
}

export default function SavedToolsClient() {
  const [savedTools, setSavedTools] = useState<SavedTool[]>([]);
  const [filteredTools, setFilteredTools] = useState<SavedTool[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"recent" | "name" | "usage">("recent");

  useEffect(() => {
    const saved = localStorage.getItem("savedTools");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSavedTools(parsed);
      setFilteredTools(parsed);
    }
  }, []);

  useEffect(() => {
    let result = [...savedTools];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(tool => tool.category === categoryFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "usage":
          return (b.lastUsed || "").localeCompare(a.lastUsed || "");
        case "recent":
        default:
          return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
      }
    });

    setFilteredTools(result);
  }, [savedTools, searchQuery, categoryFilter, sortBy]);

  const removeTool = (toolId: string) => {
    const updated = savedTools.filter(tool => tool.id !== toolId);
    setSavedTools(updated);
    localStorage.setItem("savedTools", JSON.stringify(updated));
  };

  const categories = Array.from(new Set(savedTools.map(tool => tool.category)));

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Saved Tools</h1>
        <p className="text-slate-600">Your personal collection of favorite tools</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search saved tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "recent" | "name" | "usage")}
            className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="recent">Most Recent</option>
            <option value="name">Name</option>
            <option value="usage">Last Used</option>
          </select>

          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-slate-200"}`}
            >
              <Grid className="w-5 h-5 text-slate-600" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-slate-200"}`}
            >
              <List className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Tools Grid/List */}
      {filteredTools.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
          <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">No saved tools yet</h2>
          <p className="text-slate-600 mb-6">Start saving tools to your favorites by clicking the heart icon</p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Browse Tools
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map(tool => (
            <div key={tool.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                  style={{ backgroundColor: tool.color }}
                >
                  <span className="text-xl font-bold">{tool.icon}</span>
                </div>
                <button
                  onClick={() => removeTool(tool.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-black text-lg text-slate-900 mb-1">{tool.name}</h3>
              <p className="text-slate-500 text-sm mb-4">{tool.category}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>Saved {new Date(tool.savedAt).toLocaleDateString()}</span>
                </div>
                <Link
                  href={`/tool/${tool.slug}`}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors"
                >
                  Open
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredTools.map(tool => (
              <div key={tool.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div
                    className="h-10 w-10 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: tool.color }}
                  >
                    <span className="font-bold">{tool.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{tool.name}</h3>
                    <p className="text-sm text-slate-500">{tool.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500">
                      Saved {new Date(tool.savedAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => removeTool(tool.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/tool/${tool.slug}`}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors"
                      >
                        Open
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
