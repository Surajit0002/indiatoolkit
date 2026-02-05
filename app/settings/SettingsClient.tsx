"use client";

import { useState, useRef } from "react";
import { User, Shield, Bell, Moon, Globe, Settings as SettingsIcon, History, Star, Save, Lock, Eye, EyeOff, Download, Upload, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useUserSettings } from "@/hooks/useUserData";
import { exportUserData, importUserData } from "@/hooks/useUserData";

function Mail({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

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

function SettingSection({ title, icon, color, children }: { title: string, icon: React.ReactNode, color: string, children: React.ReactNode }) {
  return (
    <div className="glass-card p-8 md:p-10 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 -z-10" style={{ backgroundColor: color }}></div>
      <div className="flex items-center gap-4 mb-2">
        <div className="h-10 w-10 text-white rounded-xl flex items-center justify-center shadow-lg shadow-black/5" style={{ backgroundColor: color }}>
          {icon}
        </div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function ToggleOption({ label, description, checked, onChange }: { label: string, description: string, checked: boolean, onChange: (checked: boolean) => void }) {
  return (
    <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all">
      <div className="pr-4">
        <div className="font-black text-slate-900 text-sm uppercase tracking-tight">{label}</div>
        <div className="text-xs text-slate-500 font-bold mt-1">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
          checked ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
          checked ? "left-8" : "left-1"
        }`} />
      </button>
    </div>
  );
}

function ThemeOption({ name, description, active, onClick }: { name: string, description: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-2xl text-left transition-all ${
        active 
          ? "bg-blue-600 text-white ring-4 ring-blue-300/30" 
          : "bg-slate-50 border-2 border-transparent hover:border-slate-200 text-slate-900"
      }`}
    >
      <div className="font-black text-sm uppercase tracking-tight">{name}</div>
      <div className={`text-xs mt-1 ${active ? "text-blue-100" : "text-slate-500"}`}>{description}</div>
      {active && (
        <div className="mt-4 flex items-center gap-2 text-xs font-bold">
          <CheckCircle className="h-4 w-4" /> Selected
        </div>
      )}
    </button>
  );
}

export default function SettingsClient() {
  const { settings, updateSetting, resetSettings, isLoading } = useUserSettings();
  const [activeTab, setActiveTab] = useState<"appearance" | "notifications" | "security" | "data">("appearance");
  const [showPassword, setShowPassword] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [showImportConfirm, setShowImportConfirm] = useState(false);
  const [importedData, setImportedData] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all settings to default? This cannot be undone.")) {
      resetSettings();
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };

  const handleExport = () => {
    const data = exportUserData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `omnitools-settings-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setImportedData(content);
        setShowImportConfirm(true);
      };
      reader.readAsText(file);
    }
  };

  const confirmImport = () => {
    if (importedData) {
      const success = importUserData(importedData);
      if (success) {
        window.location.reload();
      } else {
        alert("Failed to import data. Please check the file format.");
      }
    }
    setShowImportConfirm(false);
    setImportedData(null);
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
      {/* Import Confirmation Modal */}
      {showImportConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Import Settings?</h3>
                <p className="text-sm text-slate-500">This will overwrite your current settings.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowImportConfirm(false)}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmImport}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-slate-400/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="container px-4 pt-16 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-2 space-y-1 sticky top-24">
              <DashboardLink href="/profile" icon={<User className="h-4 w-4" />} label="My Profile" />
              <DashboardLink href="/saved-tools" icon={<Star className="h-4 w-4" />} label="Favorites" />
              <DashboardLink href="/history" icon={<History className="h-4 w-4" />} label="Usage History" />
              <DashboardLink href="/settings" icon={<SettingsIcon className="h-4 w-4" />} label="Settings" active />
            </div>

            {/* Tabs */}
            <div className="glass-card p-3 space-y-1 mt-4">
              <button
                onClick={() => setActiveTab("appearance")}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-[10px] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === "appearance" ? "bg-slate-900 text-white shadow-xl" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
              >
                <Moon className="h-4 w-4" /> Appearance
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-[10px] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === "notifications" ? "bg-slate-900 text-white shadow-xl" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
              >
                <Bell className="h-4 w-4" /> Notifications
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-[10px] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === "security" ? "bg-slate-900 text-white shadow-xl" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
              >
                <Shield className="h-4 w-4" /> Security
              </button>
              <button
                onClick={() => setActiveTab("data")}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-[10px] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === "data" ? "bg-slate-900 text-white shadow-xl" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
              >
                <Globe className="h-4 w-4" /> Data & Privacy
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div className="mb-2">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                {activeTab === "appearance" && "Appearance Settings"}
                {activeTab === "notifications" && "Notification Preferences"}
                {activeTab === "security" && "Security & Privacy"}
                {activeTab === "data" && "Data Management"}
              </h1>
              <p className="text-slate-500 font-medium text-sm mt-1">
                {activeTab === "appearance" && "Customize how OMNITOOLS looks on your device."}
                {activeTab === "notifications" && "Control how and when you receive notifications."}
                {activeTab === "security" && "Manage your account security and privacy options."}
                {activeTab === "data" && "Export, import, or delete your personal data."}
              </p>
            </div>

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <SettingSection title="Theme" icon={<Moon className="h-5 w-5" />} color="#8B5CF6">
                  <div className="grid grid-cols-2 gap-4">
                    <ThemeOption 
                      name="Light Mode" 
                      description="Clean and bright interface" 
                      active={!settings.darkMode}
                      onClick={() => updateSetting('darkMode', false)}
                    />
                    <ThemeOption 
                      name="Dark Mode" 
                      description="Sleek dark interface" 
                      active={settings.darkMode}
                      onClick={() => updateSetting('darkMode', true)}
                    />
                  </div>
                </SettingSection>

                <SettingSection title="Accessibility" icon={<Eye className="h-5 w-5" />} color="#3B82F6">
                  <ToggleOption 
                    label="High Contrast" 
                    description="Increase legibility with enhanced contrast for better readability."
                    checked={settings.highContrast}
                    onChange={(checked) => updateSetting('highContrast', checked)}
                  />
                </SettingSection>

                <SettingSection title="Language" icon={<Globe className="h-5 w-5" />} color="#10B981">
                  <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                    <label className="block font-black text-slate-900 text-sm uppercase tracking-tight mb-2">Interface Language</label>
                    <select 
                      value={settings.language}
                      onChange={(e) => updateSetting('language', e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="zh">中文</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>
                </SettingSection>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <SettingSection title="Email Notifications" icon={<Mail className="h-5 w-5" />} color="#3B82F6">
                  <ToggleOption 
                    label="Email Updates" 
                    description="Receive emails about new tool releases, features, and improvements."
                    checked={settings.emailUpdates}
                    onChange={(checked) => updateSetting('emailUpdates', checked)}
                  />
                  <ToggleOption 
                    label="Weekly Digest" 
                    description="Get a weekly summary of your usage and new tools."
                    checked={settings.emailUpdates}
                    onChange={(checked) => updateSetting('emailUpdates', checked)}
                  />
                </SettingSection>

                <SettingSection title="Browser Notifications" icon={<Bell className="h-5 w-5" />} color="#F59E0B">
                  <ToggleOption 
                    label="Browser Alerts" 
                    description="Get notified about tool updates directly in your browser."
                    checked={settings.browserAlerts}
                    onChange={(checked) => updateSetting('browserAlerts', checked)}
                  />
                  <ToggleOption 
                    label="Important Alerts Only" 
                    description="Only receive notifications for critical updates."
                    checked={!settings.browserAlerts}
                    onChange={(checked) => updateSetting('browserAlerts', !checked)}
                  />
                </SettingSection>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <SettingSection title="Password" icon={<Lock className="h-5 w-5" />} color="#10B981">
                  <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                    <div>
                      <label className="block font-black text-slate-900 text-sm uppercase tracking-tight mb-2">Current Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block font-black text-slate-900 text-sm uppercase tracking-tight mb-2">New Password</label>
                      <input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-black text-slate-900 text-sm uppercase tracking-tight mb-2">Confirm New Password</label>
                      <input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                    <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg">
                      Update Password
                    </button>
                  </div>
                </SettingSection>

                <SettingSection title="Two-Factor Authentication" icon={<Shield className="h-5 w-5" />} color="#EC4899">
                  <ToggleOption 
                    label="Two-Factor Auth (2FA)" 
                    description="Add an extra layer of security to your account with 2FA."
                    checked={settings.twoFactorAuth}
                    onChange={(checked) => updateSetting('twoFactorAuth', checked)}
                  />
                  {settings.twoFactorAuth && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Two-factor authentication is enabled</span>
                    </div>
                  )}
                </SettingSection>

                <SettingSection title="Privacy" icon={<Lock className="h-5 w-5" />} color="#6366F1">
                  <ToggleOption 
                    label="Public Profile" 
                    description="Allow others to see your saved tools collection and activity."
                    checked={settings.publicProfile}
                    onChange={(checked) => updateSetting('publicProfile', checked)}
                  />
                </SettingSection>
              </div>
            )}

            {/* Data Tab */}
            {activeTab === "data" && (
              <div className="space-y-6">
                <SettingSection title="Export Your Data" icon={<Download className="h-5 w-5" />} color="#3B82F6">
                  <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                    <div className="mb-4">
                      <div className="font-black text-slate-900 text-sm uppercase tracking-tight">Download all your data</div>
                      <div className="text-xs text-slate-500 font-bold mt-1">Includes profile, settings, favorites, and history.</div>
                    </div>
                    <button 
                      onClick={handleExport}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg"
                    >
                      <Download className="h-4 w-4" /> Export Data
                    </button>
                  </div>
                </SettingSection>

                <SettingSection title="Import Data" icon={<Upload className="h-5 w-5" />} color="#F59E0B">
                  <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                    <div className="mb-4">
                      <div className="font-black text-slate-900 text-sm uppercase tracking-tight">Restore from backup</div>
                      <div className="text-xs text-slate-500 font-bold mt-1">Import a previously exported settings file.</div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json"
                      onChange={handleImportFile}
                      className="hidden"
                    />
                    <button 
                      onClick={handleImportClick}
                      className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg"
                    >
                      <Upload className="h-4 w-4" /> Import Data
                    </button>
                  </div>
                </SettingSection>

                <SettingSection title="Delete Account" icon={<Trash2 className="h-5 w-5" />} color="#EF4444">
                  <div className="p-6 bg-red-50 border border-red-100 rounded-2xl">
                    <div className="mb-4">
                      <div className="font-black text-red-900 text-sm uppercase tracking-tight">Permanently delete your account</div>
                      <div className="text-xs text-red-600 font-bold mt-1">This action cannot be undone. All your data will be lost.</div>
                    </div>
                    <button 
                      onClick={() => {
                        if (confirm("Are you sure you want to delete your account? This will permanently remove all your data and cannot be undone.")) {
                          alert("Account deletion requested. Please contact support to complete this process.");
                        }
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg"
                    >
                      <Trash2 className="h-4 w-4" /> Delete Account
                    </button>
                  </div>
                </SettingSection>
              </div>
            )}

            {/* Save/Reset Actions */}
            <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
              <button 
                onClick={handleReset}
                className="px-8 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-red-500 transition-colors"
              >
                Reset to Defaults
              </button>
              <button 
                onClick={handleSave}
                className={`brutal-btn px-10 py-4 text-[10px] flex items-center gap-2 ${
                  saveStatus === "saved" ? "bg-green-600" : "bg-blue-600"
                }`}
                disabled={saveStatus === "saving"}
              >
                {saveStatus === "saving" && (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                )}
                {saveStatus === "saved" && <CheckCircle className="h-4 w-4" />}
                {saveStatus === "idle" && <Save className="h-4 w-4" />}
                {saveStatus === "idle" && "Save Preferences"}
                {saveStatus === "saving" && "Saving..."}
                {saveStatus === "saved" && "Saved!"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
