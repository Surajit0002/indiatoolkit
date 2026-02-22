"use client";

import React, { useState, useEffect } from "react";
import { Settings as SettingsIcon, Bell, Shield, Palette, Download, Upload, Trash2, Check, Moon, Sun, Monitor, Eye, Lock, Database } from "lucide-react";

interface Settings {
  theme: "light" | "dark" | "system";
  notifications: {
    email: boolean;
    push: boolean;
    toolUpdates: boolean;
    weeklyDigest: boolean;
  };
  privacy: {
    shareUsageData: boolean;
    allowAnalytics: boolean;
  };
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    fontSize: "small" | "medium" | "large";
  };
}

const defaultSettings: Settings = {
  theme: "system",
  notifications: {
    email: true,
    push: true,
    toolUpdates: true,
    weeklyDigest: false,
  },
  privacy: {
    shareUsageData: false,
    allowAnalytics: true,
  },
  accessibility: {
    highContrast: false,
    reducedMotion: false,
    fontSize: "medium",
  },
};

// Helper function to load settings from localStorage
const loadSavedSettings = (): Settings => {
  if (typeof window === 'undefined') return defaultSettings;
  try {
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      return { ...defaultSettings, ...JSON.parse(savedSettings) };
    }
  } catch {
    // Ignore parsing errors
  }
  return defaultSettings;
};

export default function SettingsClient() {
  // Use lazy initialization for settings state
  const [settings, setSettings] = useState<Settings>(() => loadSavedSettings());

  const [activeTab, setActiveTab] = useState("appearance");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Apply theme
    const root = document.documentElement;
    if (settings.theme === "dark" || (settings.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Apply accessibility settings
    if (settings.accessibility.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    if (settings.accessibility.reducedMotion) {
      root.classList.add("reduced-motion");
    } else {
      root.classList.remove("reduced-motion");
    }
  }, [settings]);

  const handleSave = () => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExport = () => {
    const data = {
      settings,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `omnitools-settings-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          if (imported.settings) {
            setSettings(imported.settings);
            localStorage.setItem("userSettings", JSON.stringify(imported.settings));
          }
        } catch (error) {
          console.error("Failed to import settings:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const tabs = [
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "accessibility", label: "Accessibility", icon: Eye },
    { id: "data", label: "Data Management", icon: Database },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-emerald-600" />
          Settings
        </h1>
        <p className="text-slate-600">Customize your Omnitools experience</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-slate-50 p-4 border-r border-slate-200">
            <nav className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === tab.id
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-semibold">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {/* Appearance */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Theme</h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "light" as const, label: "Light", icon: Sun, desc: "Always light mode" },
                    { value: "dark" as const, label: "Dark", icon: Moon, desc: "Always dark mode" },
                    { value: "system" as const, label: "System", icon: Monitor, desc: "Match system" },
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSettings(prev => ({ ...prev, theme: option.value }))}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        settings.theme === option.value
                          ? "border-emerald-600 bg-emerald-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <option.icon className={`w-8 h-8 mb-2 ${settings.theme === option.value ? "text-emerald-600" : "text-slate-400"}`} />
                      <p className="font-bold text-slate-900">{option.label}</p>
                      <p className="text-sm text-slate-500">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                    { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
                    { key: "toolUpdates", label: "Tool Updates", desc: "Get notified about new features" },
                    { key: "weeklyDigest", label: "Weekly Digest", desc: "Weekly summary of activity" },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-slate-900">{item.label}</p>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, [item.key]: !prev.notifications[item.key as keyof typeof prev.notifications] }
                        }))}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          settings.notifications[item.key as keyof typeof settings.notifications] ? "bg-emerald-600" : "bg-slate-300"
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          settings.notifications[item.key as keyof typeof settings.notifications] ? "left-7" : "left-1"
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Privacy & Security</h2>
                <div className="space-y-4">
                  {[
                    { key: "shareUsageData", label: "Share Usage Data", desc: "Help improve by sharing anonymous data" },
                    { key: "allowAnalytics", label: "Allow Analytics", desc: "Track tool usage for improvements" },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="font-semibold text-slate-900">{item.label}</p>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, [item.key]: !prev.privacy[item.key as keyof typeof prev.privacy] }
                        }))}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          settings.privacy[item.key as keyof typeof settings.privacy] ? "bg-emerald-600" : "bg-slate-300"
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          settings.privacy[item.key as keyof typeof settings.privacy] ? "left-7" : "left-1"
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accessibility */}
            {activeTab === "accessibility" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Accessibility Options</h2>
                <div className="space-y-4">
                  {[
                    { key: "highContrast", label: "High Contrast", desc: "Increase contrast for better visibility" },
                    { key: "reducedMotion", label: "Reduced Motion", desc: "Minimize animations" },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-slate-900">{item.label}</p>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setSettings(prev => ({
                          ...prev,
                          accessibility: { ...prev.accessibility, [item.key]: !prev.accessibility[item.key as keyof typeof prev.accessibility] }
                        }))}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          settings.accessibility[item.key as keyof typeof settings.accessibility] ? "bg-emerald-600" : "bg-slate-300"
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          settings.accessibility[item.key as keyof typeof settings.accessibility] ? "left-7" : "left-1"
                        }`} />
                      </button>
                    </div>
                  ))}
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="font-semibold text-slate-900 mb-2">Font Size</p>
                    <div className="flex gap-2">
                      {["small", "medium", "large"].map(size => (
                        <button
                          key={size}
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            accessibility: { ...prev.accessibility, fontSize: size as "small" | "medium" | "large" }
                          }))}
                          className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                            settings.accessibility.fontSize === size
                              ? "bg-emerald-600 text-white"
                              : "bg-white border border-slate-200 hover:border-emerald-500"
                          }`}
                        >
                          {size.charAt(0).toUpperCase() + size.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data Management */}
            {activeTab === "data" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Data Management</h2>
                <div className="grid gap-4">
                  <div className="p-6 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <Download className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900">Export Settings</p>
                        <p className="text-sm text-slate-500">Download your settings as a JSON file</p>
                      </div>
                      <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                      >
                        Export
                      </button>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Upload className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900">Import Settings</p>
                        <p className="text-sm text-slate-500">Restore settings from a JSON file</p>
                      </div>
                      <label className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
                        Import
                        <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                      </label>
                    </div>
                  </div>
                  <div className="p-6 bg-red-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <Trash2 className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-red-900">Clear All Data</p>
                        <p className="text-sm text-red-600">This will delete all your settings and preferences</p>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to clear all settings?")) {
                            localStorage.removeItem("userSettings");
                            setSettings({
                              theme: "system",
                              notifications: { email: true, push: true, toolUpdates: true, weeklyDigest: false },
                              privacy: { shareUsageData: false, allowAnalytics: true },
                              accessibility: { highContrast: false, reducedMotion: false, fontSize: "medium" },
                            });
                          }
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
                      >
                        Clear Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
              >
                {saved ? (
                  <>
                    <Check className="w-5 h-5" />
                    Saved!
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
