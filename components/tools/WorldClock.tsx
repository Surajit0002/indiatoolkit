"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, X, Plus, Globe } from "lucide-react";

const DEFAULT_CITIES = [
  { name: "London", timezone: "Europe/London" },
  { name: "New York", timezone: "America/New_York" },
  { name: "Tokyo", timezone: "Asia/Tokyo" },
  { name: "Dubai", timezone: "Asia/Dubai" },
];

export default function WorldClock() {
  const [time, setTime] = useState(new Date());
  const [cities, setCities] = useState(DEFAULT_CITIES);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, timezone: string) => {
    return date.toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date, timezone: string) => {
    return date.toLocaleDateString("en-US", {
      timeZone: timezone,
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const removeCity = (index: number) => {
    setCities(cities.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="glass-card p-8 bg-blue-600 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-blue-200 text-xs font-black uppercase tracking-[0.2em] mb-2">Local Time</p>
            <h2 className="text-5xl md:text-7xl font-black tabular-nums tracking-tighter">
              {time.toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" })}
            </h2>
            <p className="text-blue-100 font-bold mt-2">
              {time.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <Globe className="h-32 w-32 text-white/10 absolute -right-4 -bottom-4 md:static md:text-white/20" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cities.map((city, index) => (
          <div key={index} className="glass-card p-6 flex items-center justify-between group hover:border-blue-600/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600/10 text-blue-600 rounded-[10px]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight">{city.name}</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{formatDate(time, city.timezone)}</p>
              </div>
            </div>
            <div className="text-right flex flex-col items-end gap-2">
              <span className="text-2xl font-black tabular-nums">{formatTime(time, city.timezone).split(' ')[0]}</span>
              <span className="text-[10px] font-black uppercase bg-gray-100 px-2 py-0.5 rounded text-gray-500">{formatTime(time, city.timezone).split(' ')[1]}</span>
            </div>
            <button 
              onClick={() => removeCity(index)}
              className="absolute -top-2 -right-2 p-1.5 bg-white shadow-lg rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity border border-red-100"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        
        <button className="glass-card p-6 border-dashed border-2 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-blue-600 hover:border-blue-600/50 transition-all group">
           <Plus className="h-6 w-6 group-hover:scale-110 transition-transform" />
           <span className="text-xs font-black uppercase tracking-widest">Add City</span>
        </button>
      </div>

      <div className="glass-card p-6 bg-white/40">
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Quick Search Timezones</label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a city or country..."
            className="brutal-input pl-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
