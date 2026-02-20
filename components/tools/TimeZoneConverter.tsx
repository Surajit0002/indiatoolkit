"use client";

import { useState } from "react";
import { ArrowRightLeft, Globe, Calendar } from "lucide-react";

export default function TimeZoneConverter() {
  const [sourceTime, setSourceTime] = useState(new Date().toISOString().slice(0, 16));
  const [sourceTz, setSourceTz] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [targetTz, setTargetTz] = useState("UTC");

  const convertTime = () => {
    try {
      const date = new Date(sourceTime);
      return date.toLocaleTimeString("en-US", {
        timeZone: targetTz,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    } catch (_e) { // eslint-disable-line @typescript-eslint/no-unused-vars
      return "Invalid Time";
    }
  };

  const convertDate = () => {
    try {
      const date = new Date(sourceTime);
      return date.toLocaleDateString("en-US", {
        timeZone: targetTz,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (_e) { // eslint-disable-line @typescript-eslint/no-unused-vars
      return "";
    }
  };

  const timezones = typeof Intl !== 'undefined' && 'supportedValuesOf' in Intl 
    ? (Intl as typeof Intl & { supportedValuesOf: (key: string) => string[] }).supportedValuesOf("timeZone") 
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass-card p-6">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Source Time & Date</label>
            <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="datetime-local"
                    value={sourceTime}
                    onChange={(e) => setSourceTime(e.target.value)}
                    className="brutal-input pl-12"
                />
            </div>
          </div>

          <div className="glass-card p-6">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">From Time Zone</label>
            <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                    value={sourceTz}
                    onChange={(e) => setSourceTz(e.target.value)}
                    className="brutal-input pl-12 appearance-none"
                >
                    {timezones.map((tz: string) => (
                        <option key={tz} value={tz}>{tz}</option>
                    ))}
                </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
            <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-600/20 md:rotate-0 rotate-90">
                <ArrowRightLeft className="h-8 w-8" />
            </div>
        </div>

        <div className="space-y-6 md:col-start-2">
           <div className="glass-card p-6">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">To Time Zone</label>
            <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                    value={targetTz}
                    onChange={(e) => setTargetTz(e.target.value)}
                    className="brutal-input pl-12 appearance-none"
                >
                    {timezones.map((tz: string) => (
                        <option key={tz} value={tz}>{tz}</option>
                    ))}
                </select>
            </div>
          </div>

          <div className="glass-card p-8 bg-blue-600 text-white text-center">
             <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Converted Time</p>
             <h2 className="text-5xl font-black tabular-nums tracking-tighter mb-2">{convertTime()}</h2>
             <p className="text-blue-100 font-bold">{convertDate()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
