"use client";

import { useState } from "react";
import { Copy, Calendar, Target, TrendingUp, Check, Download, Plus, Trash2 } from "lucide-react";

interface Task {
  id: number;
  name: string;
  channel: string;
  week: number;
  status: "pending" | "in-progress" | "completed";
}

export default function MarketingCampaignPlanner() {
  const [campaignName, setCampaignName] = useState("");
  const [goal, setGoal] = useState("awareness");
  const [budget, setBudget] = useState("5000");
  const [duration, setDuration] = useState("4");
  const [channels, setChannels] = useState<string[]>(["social", "email"]);
  const [targetAudience, setTargetAudience] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Campaign Strategy Development", channel: "Planning", week: 1, status: "pending" },
    { id: 2, name: "Creative Assets Design", channel: "Design", week: 1, status: "pending" },
    { id: 3, name: "Social Media Setup", channel: "Social", week: 2, status: "pending" },
    { id: 4, name: "Email Campaign Launch", channel: "Email", week: 2, status: "pending" },
    { id: 5, name: "Performance Review", channel: "Analytics", week: 4, status: "pending" },
  ]);
  const [newTask, setNewTask] = useState({ name: "", channel: "Social", week: 1 });
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const goalOptions = [
    { value: "awareness", label: "Brand Awareness", icon: Target },
    { value: "leads", label: "Lead Generation", icon: TrendingUp },
    { value: "sales", label: "Sales Conversion", icon: TrendingUp },
    { value: "engagement", label: "Engagement", icon: Target },
  ];

  const channelOptions = [
    "Social Media", "Email", "Content", "PPC", "SEO", "Influencer", "Events", "PR"
  ];

  const addTask = () => {
    if (newTask.name) {
      setTasks([...tasks, { ...newTask, id: Date.now(), status: "pending" as const }]);
      setNewTask({ name: "", channel: "Social", week: 1 });
    }
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTaskStatus = (id: number, status: "pending" | "in-progress" | "completed") => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  const generatePlan = () => {
    if (!campaignName) {
      alert("Please enter campaign name");
      return;
    }
    setGenerated(true);
  };

  const copyToClipboard = () => {
    let plan = `Marketing Campaign Plan: ${campaignName}\n\n`;
    plan += `Goal: ${goalOptions.find(g => g.value === goal)?.label}\n`;
    plan += `Budget: $${budget}\n`;
    plan += `Duration: ${duration} weeks\n`;
    plan += `Target Audience: ${targetAudience || "Not specified"}\n\n`;
    plan += `Channels: ${channels.join(", ")}\n\n`;
    plan += `Timeline:\n`;
    
    for (let week = 1; week <= parseInt(duration); week++) {
      const weekTasks = tasks.filter(t => t.week === week);
      if (weekTasks.length > 0) {
        plan += `\nWeek ${week}:\n`;
        weekTasks.forEach(t => {
          plan += `  - [${t.status.toUpperCase()}] ${t.name} (${t.channel})\n`;
        });
      }
    }
    
    navigator.clipboard.writeText(plan);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleChannel = (channel: string) => {
    if (channels.includes(channel)) {
      setChannels(channels.filter(c => c !== channel));
    } else {
      setChannels([...channels, channel]);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Marketing Campaign Planner</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">Plan marketing campaigns with goals and timelines</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-emerald-500" />Campaign Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Campaign Name</label>
                  <input type="text" value={campaignName} onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="e.g., Summer Sale 2024"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Goal</label>
                  <select value={goal} onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all font-medium">
                    {goalOptions.map(g => (
                      <option key={g.value} value={g.value}>{g.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Budget ($)</label>
                  <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (weeks)</label>
                  <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)}
                    min="1" max="12"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all font-medium" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Target Audience</label>
                <input type="text" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g., Gen Z, Professionals 25-40"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all font-medium" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-emerald-500" />Channels
              </h3>
              <div className="flex flex-wrap gap-2">
                {channelOptions.map(channel => (
                  <button key={channel} onClick={() => toggleChannel(channel)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      channels.includes(channel)
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}>
                    {channel}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-emerald-500" />Campaign Tasks
              </h3>
              <div className="space-y-3 mb-4">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                    <select value={task.status} onChange={(e) => updateTaskStatus(task.id, e.target.value as "pending" | "in-progress" | "completed")}
                      className="px-3 py-2 rounded-lg border border-slate-200 text-sm">
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Done</option>
                    </select>
                    <input type="text" value={task.name} onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? { ...t, name: e.target.value } : t))}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                    <select value={task.channel} onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? { ...t, channel: e.target.value } : t))}
                      className="px-3 py-2 rounded-lg border border-slate-200 text-sm">
                      {channelOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={task.week} onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? { ...t, week: parseInt(e.target.value) } : t))}
                      className="px-3 py-2 rounded-lg border border-slate-200 text-sm">
                      {Array.from({ length: parseInt(duration) }, (_, i) => i + 1).map(w => (
                        <option key={w} value={w}>Week {w}</option>
                      ))}
                    </select>
                    <button onClick={() => removeTask(task.id)} className="text-slate-400 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                  placeholder="Add new task..."
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all" />
                <select value={newTask.channel} onChange={(e) => setNewTask({ ...newTask, channel: e.target.value })}
                  className="px-4 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200">
                  {channelOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <button onClick={addTask}
                  className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2">
                  <Plus className="h-4 w-4" />Add
                </button>
              </div>
            </div>

            <button onClick={generatePlan}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all">
              Generate Campaign Plan
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-500" />Campaign Overview
              </h3>
              <div className="bg-slate-50 rounded-xl p-4 min-h-[300px]">
                {generated ? (
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-slate-200">
                      <h4 className="font-bold text-lg text-slate-900">{campaignName}</h4>
                      <p className="text-sm text-slate-500">{goalOptions.find(g => g.value === goal)?.label}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-2xl font-bold text-emerald-500">${budget}</p>
                        <p className="text-xs text-slate-500">Budget</p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-2xl font-bold text-emerald-500">{duration}w</p>
                        <p className="text-xs text-slate-500">Duration</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 mb-2">Channels</p>
                      <div className="flex flex-wrap gap-1">
                        {channels.map(c => (
                          <span key={c} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 mb-2">Timeline</p>
                      {Array.from({ length: parseInt(duration) }, (_, i) => i + 1).map(week => {
                        const weekTasks = tasks.filter(t => t.week === week);
                        if (weekTasks.length === 0) return null;
                        return (
                          <div key={week} className="mb-2">
                            <p className="text-xs font-medium text-slate-700">Week {week}</p>
                            {weekTasks.map(t => (
                              <div key={t.id} className="flex items-center gap-1 text-xs">
                                <span className={`w-2 h-2 rounded-full ${
                                  t.status === "completed" ? "bg-emerald-500" :
                                  t.status === "in-progress" ? "bg-yellow-500" : "bg-slate-300"
                                }`} />
                                <span className="text-slate-600">{t.name}</span>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-slate-400 text-center">Fill in campaign details and click<br />&quot;Generate Campaign Plan&quot;</p>
                  </div>
                )}
              </div>
            </div>

            {generated && (
              <div className="space-y-3">
                <button onClick={copyToClipboard}
                  className="w-full py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copied ? "Copied!" : "Copy Plan"}
                </button>
                <button className="w-full py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                  <Download className="h-5 w-5" />Export PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
