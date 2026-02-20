"use client";

import { useState } from "react";
import { Plus, Trash2, Copy, Check, RefreshCw, Settings } from "lucide-react";

interface GradientStop {
  id: string;
  color: string;
  position: number;
}

type GradientType = "linear" | "radial" | "conic";

export default function GradientGenerator() {
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [direction, setDirection] = useState(90);
  const [stops, setStops] = useState<GradientStop[]>([
    { id: "1", color: "#6366f1", position: 0 },
    { id: "2", color: "#a855f7", position: 100 },
  ]);
  const [copied, setCopied] = useState<string | null>(null);

  const getGradientString = () => {
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const stopString = sortedStops.map((stop) => `${stop.color} ${stop.position}%`).join(", ");

    switch (gradientType) {
      case "linear":
        return `linear-gradient(${direction}deg, ${stopString})`;
      case "radial":
        return `radial-gradient(circle, ${stopString})`;
      case "conic":
        return `conic-gradient(from ${direction}deg, ${stopString})`;
      default:
        return `linear-gradient(${direction}deg, ${stopString})`;
    }
  };

  const addStop = () => {
    const newId = Date.now().toString();
    const newStop: GradientStop = {
      id: newId,
      color: "#ffffff",
      position: 50,
    };
    setStops([...stops, newStop]);
  };

  const removeStop = (id: string) => {
    if (stops.length > 2) {
      setStops(stops.filter((s) => s.id !== id));
    }
  };

  const updateStop = (id: string, updates: Partial<GradientStop>) => {
    setStops(stops.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const getCSSCode = () => {
    const gradient = getGradientString();
    return `background: ${gradient};`;
  };

  const getTailwindCode = () => {
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const colors = sortedStops.map((s) => s.color.replace("#", "")).join("-");
    return `bg-[linear-gradient(${direction}deg,${colors})]`;
  };

  const randomize = () => {
    const randomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0").toUpperCase();
    setStops([
      { id: "1", color: randomColor(), position: 0 },
      { id: "2", color: randomColor(), position: 50 },
      { id: "3", color: randomColor(), position: 100 },
    ]);
    setDirection(Math.floor(Math.random() * 360));
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Gradient Generator</h2>
          </div>
          <p className="text-gray-500">Create smooth color gradients with multiple stops</p>
        </div>

        {/* Gradient Preview */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div
            className="h-48 rounded-2xl shadow-inner border border-gray-100"
            style={{ background: getGradientString() }}
          />
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6">
          {/* Gradient Type */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Gradient Type</label>
            <div className="flex gap-2">
              {(["linear", "radial", "conic"] as GradientType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setGradientType(type)}
                  className={`flex-1 h-12 rounded-xl text-sm font-medium transition-colors capitalize ${
                    gradientType === type
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Direction */}
          {gradientType !== "radial" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Direction</label>
                <span className="text-sm font-mono text-gray-600">{direction}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={direction}
                onChange={(e) => setDirection(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>0°</span>
                <span>90°</span>
                <span>180°</span>
                <span>270°</span>
                <span>360°</span>
              </div>
            </div>
          )}

          {/* Color Stops */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Color Stops</label>
              <div className="flex gap-2">
                <button
                  onClick={randomize}
                  className="h-10 px-4 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" /> Random
                </button>
                <button
                  onClick={addStop}
                  className="h-10 px-4 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Add Stop
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {stops.map((stop) => (
                <div key={stop.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <input
                    type="color"
                    value={stop.color}
                    onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                    className="h-10 w-10 rounded-lg cursor-pointer border-2 border-gray-200"
                  />
                  <input
                    type="text"
                    value={stop.color}
                    onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                    className="w-24 h-10 px-3 bg-white border border-gray-200 rounded-lg font-mono text-sm uppercase"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-500">Position</label>
                      <span className="text-xs font-mono text-gray-600">{stop.position}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stop.position}
                      onChange={(e) => updateStop(stop.id, { position: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <button
                    onClick={() => removeStop(stop.id)}
                    disabled={stops.length <= 2}
                    className="h-10 w-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generated Code */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Code</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">CSS</label>
              <div className="relative">
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-xl text-sm font-mono overflow-x-auto">
                  {getCSSCode()}
                </pre>
                <button
                  onClick={() => copyToClipboard(getCSSCode())}
                  className="absolute top-2 right-2 h-8 w-8 bg-white/10 text-white rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  {copied === getCSSCode() ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tailwind</label>
              <div className="relative">
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-xl text-sm font-mono overflow-x-auto">
                  {getTailwindCode()}
                </pre>
                <button
                  onClick={() => copyToClipboard(getTailwindCode())}
                  className="absolute top-2 right-2 h-8 w-8 bg-white/10 text-white rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  {copied === getTailwindCode() ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Presets</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Sunset", colors: ["#ff6b6b", "#feca57", "#ff9ff3"] },
              { name: "Ocean", colors: ["#48dbfb", "#0abde3", "#5f27cd"] },
              { name: "Forest", colors: ["#10ac84", "#2e86de", "#54a0ff"] },
              { name: "Berry", colors: ["#ee5253", "#5f27cd", "#ff9ff3"] },
            ].map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  setGradientType("linear");
                  setDirection(135);
                  setStops(
                    preset.colors.map((color, i) => ({
                      id: Date.now().toString() + i,
                      color,
                      position: Math.round((i / (preset.colors.length - 1)) * 100),
                    }))
                  );
                }}
                className="p-4 rounded-xl border border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all"
              >
                <div className="h-12 rounded-lg mb-2" style={{ background: `linear-gradient(135deg, ${preset.colors.join(", ")})` }} />
                <p className="text-sm font-medium text-gray-700">{preset.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
