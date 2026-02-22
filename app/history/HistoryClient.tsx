"use client";

import { useState, useMemo } from "react";
import { User, Settings, History as HistoryIcon, Clock, Trash2, ExternalLink, Calendar, Download } from "lucide-react";
import Link from "next/link";
import { useHistory, HistoryItem } from "@/hooks/useUserData";

function DashboardLink({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-5 py-4 rounded-[10px] font-black text-[10px] uppercase tracking-widest transition-all group ${active ? "bg-slate-900 text-white shadow-xl shadow-slate-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
    >
      <div className={`transition-transform group-hover:scale-110 ${active ? "text-blue-400" : "text-slate-400 group-hover:text-blue-600"}`}>
        {icon}
      </div>
      {label}
    </Link>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'converters': '#0ea5e9',
    'calculators': '#22c55e',
    'generators': '#8b5cf6',
    'ai-tools': '#f59e0b',
    'text-tools': '#ec4899',
    'developers': '#6366f1',
    'design': '#14b8a6',
    'media': '#ef4444',
    'data': '#8b5cf6',
  };
  return colors[category.toLowerCase()] || '#10b981';
}

export default function HistoryClient() {
  const { history, clearHistory, getHistoryByDateRange, isLoading } = useHistory();
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week" | "month">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter history by date
  const filteredHistory = useMemo(() => {
    let result = [...history];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.toolName.toLowerCase().includes(query) ||
        item.toolCategory.toLowerCase().includes(query)
      );
    }

    // Date filter
    if (dateFilter === "today") {
      result = getHistoryByDateRange(1);
    } else if (dateFilter === "week") {
      result = getHistoryByDateRange(7);
    } else if (dateFilter === "month") {
      result = getHistoryByDateRange(30);
    }
    // "all" shows everything

    return result;
  }, [history, dateFilter, searchQuery, getHistoryByDateRange]);

  // Group history by date
  const groupedHistory = useMemo(() => {
    const groups: Record<string, HistoryItem[]> = {};
    
    filteredHistory.forEach(item => {
      const dateKey = item.timestamp.toString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    });

    return Object.entries(groups).sort((a, b) => parseInt(b[0]) - parseInt(a[0]));
  }, [filteredHistory]);

  const formatDateLabel = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  const formatTimeLabel = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-emerald-400/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="container px-4 pt-16 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-2 space-y-1 sticky top-24">
              <DashboardLink href="/profile" icon={<User className="h-4 w-4" />} label="My Profile" />
              <DashboardLink href="/saved-tools" icon={<HistoryIcon className="h-4 w-4" />} label="Favorites" />
              <DashboardLink href="/history" icon={<HistoryIcon className="h-4 w-4" />} label="Usage History" active />
              <DashboardLink href="/settings" icon={<Settings className="h-4 w-4" />} label="Settings" />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
              <div className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <HistoryIcon className="h-6 w-6 text-white" />
                  </div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight">Recent Activity</h1>
                </div>
                <p className="text-slate-500 font-medium text-sm mt-1">
                  {history.length} {history.length === 1 ? 'entry' : 'entries'} • Keep track of tools you&apos;ve used
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-100">
                {/* Search */}
                <div className="relative group">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search history..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-6 py-3.5 bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 text-sm font-medium w-full md:w-64 shadow-lg shadow-black/5" 
                  />
                </div>
              </div>
            </div>

            {/* Filters and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filter:</span>
                <button
                  onClick={() => setDateFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    dateFilter === "all" 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  All Time
                </button>
                <button
                  onClick={() => setDateFilter("today")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    dateFilter === "today" 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setDateFilter("week")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    dateFilter === "week" 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  This Week
                </button>
                <button
                  onClick={() => setDateFilter("month")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    dateFilter === "month" 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  This Month
                </button>
              </div>

              <div className="flex items-center gap-3">
                {history.length > 0 && (
                  <>
                    <button 
                      onClick={() => {
                        if (confirm('Export history as JSON?')) {
                          const data = JSON.stringify(history, null, 2);
                          const blob = new Blob([data], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `omnitools-history-${new Date().toISOString().split('T')[0]}.json`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all"
                    >
                      <Download className="h-4 w-4" /> Export
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm('Are you sure you want to clear your entire history? This cannot be undone.')) {
                          clearHistory();
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all group"
                    >
                      <Trash2 className="h-4 w-4 group-hover:rotate-12 transition-transform" /> Clear All
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* History List or Empty State */}
            {groupedHistory.length > 0 ? (
              <div className="glass-card overflow-hidden divide-y divide-slate-100">
                {groupedHistory.map(([timestamp, items]) => {
                  const dateLabel = formatDateLabel(parseInt(timestamp));
                  
                  return (
                    <div key={timestamp} className="animate-fade-in-up">
                      {/* Date Header */}
                      <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{dateLabel}</span>
                        </div>
                        <span className="text-xs text-slate-400">{items.length} {items.length === 1 ? 'tool' : 'tools'}</span>
                      </div>
                      
                      {/* Items */}
                      {items.map((item, index) => (
                        <div 
                          key={`${item.toolId}-${index}`} 
                          className="flex items-center justify-between p-6 md:p-8 hover:bg-slate-50/50 transition-colors group"
                        >
                          <div className="flex items-center gap-6">
                            <div 
                              className="h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                              style={{ backgroundColor: getCategoryColor(item.toolCategory) }}
                            >
                              <ExternalLink className="h-6 w-6" />
                            </div>
                            <div>
                              <Link 
                                href={`/tool/${item.toolSlug}`} 
                                className="text-xl font-black text-slate-900 hover:text-blue-600 transition-colors block leading-tight"
                              >
                                {item.toolName}
                              </Link>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">{formatTimeLabel(item.timestamp)}</span>
                                <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                                <span 
                                  className="text-[10px] font-black uppercase tracking-[0.1em] capitalize"
                                  style={{ color: getCategoryColor(item.toolCategory) }}
                                >
                                  {item.toolCategory}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Link 
                            href={`/tool/${item.toolSlug}`} 
                            className="flex items-center gap-2 px-6 py-3 bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-lg"
                          >
                            Launch <ExternalLink className="h-4 w-4" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="glass-card p-16 text-center border border-dashed border-slate-200">
                <div className="h-24 w-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6 transform hover:rotate-12 transition-transform duration-300">
                  <HistoryIcon className="h-12 w-12 text-slate-300" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  {history.length === 0 ? "No history yet" : "No matching entries"}
                </h3>
                <p className="text-slate-500 font-medium text-sm mb-8 max-w-md mx-auto">
                  {history.length === 0 
                    ? "Start using tools and your activity will be tracked here automatically. This helps you revisit recently used tools quickly."
                    : `No history entries match "${searchQuery}".`
                  }
                </p>
                {history.length === 0 && (
                  <Link 
                    href="/tools"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                  >
                    Browse Tools
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
