"use client";

import React, { useState, useEffect } from "react";
import { 
  Settings, 
  Sliders, 
  Zap, 
  Cpu, 
  Database, 
  Network, 
  Shield,
  Palette,
  Code,
  Globe,
  BarChart3,
  Users,
  Bell,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Star,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";

interface ToolConfig {
  id: string;
  name: string;
  category: string;
  enabled: boolean;
  settings: Record<string, any>;
  performance: {
    speed: number;
    accuracy: number;
    reliability: number;
  };
  security: {
    encryption: boolean;
    authentication: boolean;
    auditTrail: boolean;
  };
  integrations: string[];
  lastUpdated: string;
}

interface ConfigurationPanelProps {
  toolId: string;
  onClose: () => void;
}

export default function ToolConfigurationPanel({ toolId, onClose }: ConfigurationPanelProps) {
  const [config, setConfig] = useState<ToolConfig | null>(null);
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    // Load tool configuration
    loadToolConfig(toolId);
  }, [toolId]);

  const loadToolConfig = async (id: string) => {
    // Simulate API call
    const mockConfig: ToolConfig = {
      id: id,
      name: "Advanced Calculator",
      category: "calculators",
      enabled: true,
      settings: {
        precision: 10,
        theme: "dark",
        autoSave: true,
        notifications: true,
        language: "en",
        currency: "USD",
        dateFormat: "MM/DD/YYYY"
      },
      performance: {
        speed: 95,
        accuracy: 99,
        reliability: 98
      },
      security: {
        encryption: true,
        authentication: true,
        auditTrail: false
      },
      integrations: ["Google Drive", "Dropbox", "Slack"],
      lastUpdated: new Date().toISOString()
    };
    setConfig(mockConfig);
  };

  const updateSetting = (key: string, value: any) => {
    if (!config) return;
    setConfig({
      ...config,
      settings: {
        ...config.settings,
        [key]: value
      }
    });
  };

  const updatePerformance = (key: string, value: number) => {
    if (!config) return;
    setConfig({
      ...config,
      performance: {
        ...config.performance,
        [key]: value
      }
    });
  };

  const updateSecurity = (key: string, value: boolean) => {
    if (!config) return;
    setConfig({
      ...config,
      security: {
        ...config.security,
        [key]: value
      }
    });
  };

  const saveConfiguration = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    // Show success message
  };

  const resetToDefaults = () => {
    if (config) {
      loadToolConfig(config.id);
    }
  };

  if (!config) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "performance", label: "Performance", icon: Zap },
    { id: "security", label: "Security", icon: Shield },
    { id: "integrations", label: "Integrations", icon: Network },
    { id: "advanced", label: "Advanced", icon: Cpu }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white">
              <Settings className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Tool Configuration</h2>
              <p className="text-sm text-slate-500">{config.name}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <XCircle className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === "general" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Tool Name</label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => setConfig({...config, name: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                  <select
                    value={config.category}
                    onChange={(e) => setConfig({...config, category: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="calculators">Calculators</option>
                    <option value="converters">Converters</option>
                    <option value="text-tools">Text Tools</option>
                    <option value="dev-tools">Developer Tools</option>
                    <option value="ai-tools">AI Tools</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SettingToggle
                  label="Auto Save"
                  description="Automatically save your work"
                  enabled={config.settings.autoSave}
                  onChange={(value) => updateSetting("autoSave", value)}
                />
                <SettingToggle
                  label="Notifications"
                  description="Enable system notifications"
                  enabled={config.settings.notifications}
                  onChange={(value) => updateSetting("notifications", value)}
                />
                <SettingToggle
                  label="Dark Theme"
                  description="Use dark color scheme"
                  enabled={config.settings.theme === "dark"}
                  onChange={(value) => updateSetting("theme", value ? "dark" : "light")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Language</label>
                  <select
                    value={config.settings.language}
                    onChange={(e) => updateSetting("language", e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Currency</label>
                  <select
                    value={config.settings.currency}
                    onChange={(e) => updateSetting("currency", e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "performance" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <h3 className="font-black text-green-900">Performance Metrics</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <PerformanceSlider
                    label="Processing Speed"
                    value={config.performance.speed}
                    onChange={(value) => updatePerformance("speed", value)}
                    color="blue"
                  />
                  <PerformanceSlider
                    label="Accuracy"
                    value={config.performance.accuracy}
                    onChange={(value) => updatePerformance("accuracy", value)}
                    color="green"
                  />
                  <PerformanceSlider
                    label="Reliability"
                    value={config.performance.reliability}
                    onChange={(value) => updatePerformance("reliability", value)}
                    color="purple"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="font-bold text-slate-900 mb-4">Optimization Settings</h3>
                <div className="space-y-4">
                  <SettingToggle
                    label="Cache Results"
                    description="Store frequently used results for faster access"
                    enabled={true}
                    onChange={() => {}}
                  />
                  <SettingToggle
                    label="Preload Data"
                    description="Load data in background for instant access"
                    enabled={false}
                    onChange={() => {}}
                  />
                  <SettingToggle
                    label="Memory Optimization"
                    description="Reduce memory usage at cost of slight performance"
                    enabled={true}
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border border-red-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-5 w-5 text-red-600" />
                  <h3 className="font-black text-red-900">Security Configuration</h3>
                </div>
                <div className="space-y-4">
                  <SettingToggle
                    label="End-to-End Encryption"
                    description="Encrypt all data in transit and at rest"
                    enabled={config.security.encryption}
                    onChange={(value) => updateSecurity("encryption", value)}
                  />
                  <SettingToggle
                    label="Two-Factor Authentication"
                    description="Require additional verification for sensitive operations"
                    enabled={config.security.authentication}
                    onChange={(value) => updateSecurity("authentication", value)}
                  />
                  <SettingToggle
                    label="Audit Trail"
                    description="Keep detailed logs of all operations"
                    enabled={config.security.auditTrail}
                    onChange={(value) => updateSecurity("auditTrail", value)}
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="font-bold text-slate-900 mb-4">Data Protection</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border">
                    <div>
                      <div className="font-bold text-sm">Data Retention</div>
                      <div className="text-xs text-slate-500">Keep data for 30 days</div>
                    </div>
                    <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm">
                      <option>30 days</option>
                      <option>90 days</option>
                      <option>1 year</option>
                      <option>Forever</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Network className="h-5 w-5 text-blue-600" />
                  <h3 className="font-black text-blue-900">Connected Services</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {config.integrations.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Globe className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-bold text-sm">{service}</div>
                          <div className="text-xs text-slate-500">Connected</div>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors">
                        Disconnect
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="font-bold text-slate-900 mb-4">Available Integrations</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Google Workspace", "Microsoft 365", "Slack", "Discord", "Notion", "Trello"].map((service) => (
                    <div key={service} className="p-4 bg-white rounded-xl border hover:border-blue-300 transition-colors">
                      <div className="font-bold text-sm mb-1">{service}</div>
                      <button className="w-full mt-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors">
                        Connect
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="h-5 w-5 text-purple-600" />
                  <h3 className="font-black text-purple-900">Advanced Settings</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm">API Access</div>
                      <div className="text-xs text-slate-500">Enable programmatic access to tool</div>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors">
                      Generate API Key
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm">Webhook Integration</div>
                      <div className="text-xs text-slate-500">Receive real-time notifications</div>
                    </div>
                    <input
                      type="text"
                      placeholder="https://your-webhook-url.com"
                      className="px-3 py-2 border border-slate-300 rounded-lg text-sm w-64"
                    />
                  </div>

                  <SettingToggle
                    label="Debug Mode"
                    description="Enable detailed logging for troubleshooting"
                    enabled={false}
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <button
              onClick={resetToDefaults}
              className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-300 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Reset to Defaults
            </button>
            <div className="text-xs text-slate-500">
              Last updated: {new Date(config.lastUpdated).toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveConfiguration}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Configuration
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingToggle({ label, description, enabled, onChange }: { 
  label: string; 
  description: string; 
  enabled: boolean; 
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border">
      <div>
        <div className="font-bold text-sm">{label}</div>
        <div className="text-xs text-slate-500">{description}</div>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function PerformanceSlider({ label, value, onChange, color }: { 
  label: string; 
  value: number; 
  onChange: (value: number) => void;
  color: string;
}) {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500"
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-sm text-slate-700">{label}</span>
        <span className="text-sm font-black text-slate-900">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${colorClasses[color as keyof typeof colorClasses]}`}
      />
      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
}