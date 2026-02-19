"use client";

import { useState, useEffect } from "react";
import { MapPin, Navigation, Globe, Search, Copy, Check } from "lucide-react";

export default function IpLocation() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = async (ip: string = "") => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const result = await response.json();
      if (result.error) {
        setError(result.reason || "Invalid IP address");
        setData(null);
      } else {
        setData(result);
        if (!ip) setQuery(result.ip);
      }
    } catch (err) {
      setError("Failed to fetch location data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) fetchLocation(query);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="glass-card p-6 bg-white/40">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter IP to locate (e.g., 8.8.8.8)..."
              className="brutal-input pl-12"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isLoading} className="brutal-btn bg-blue-600">
            {isLoading ? "LOCATING..." : "FIND LOCATION"}
          </button>
        </form>
      </div>

      {error && (
        <div className="glass-card p-6 bg-red-500/10 border-red-200 text-red-600 font-black uppercase tracking-widest text-xs text-center">
          {error}
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-6 bg-blue-600 text-white">
                <p className="text-blue-200 text-[10px] font-black uppercase tracking-widest mb-4">Current Target</p>
                <h3 className="text-3xl font-black tabular-nums tracking-tight mb-1">{data.ip}</h3>
                <p className="text-blue-100 font-bold text-sm">{data.org}</p>
            </div>

            <div className="glass-card p-6 space-y-6">
                <LocationDetail label="Country" value={data.country_name} subValue={data.country_code} icon={<Globe className="h-4 w-4" />} />
                <LocationDetail label="Region" value={data.region} subValue={data.region_code} icon={<Navigation className="h-4 w-4" />} />
                <LocationDetail label="City" value={data.city} subValue={data.postal} icon={<MapPin className="h-4 w-4" />} />
                <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[10px] font-black uppercase text-gray-400">Latitude</p>
                        <p className="font-black tabular-nums">{data.latitude}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase text-gray-400">Longitude</p>
                        <p className="font-black tabular-nums">{data.longitude}</p>
                    </div>
                </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="glass-card h-full min-h-[400px] overflow-hidden relative">
                {/* Mock Map View using OpenStreetMap Static Image or Iframe */}
                <iframe
                    title="Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${data.longitude-0.1}%2C${data.latitude-0.1}%2C${data.longitude+0.1}%2C${data.latitude+0.1}&layer=mapnik&marker=${data.latitude}%2C${data.longitude}`}
                    className="grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 glass-card p-4 bg-white/90 backdrop-blur-md flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase text-gray-400">Map Coordinates</p>
                        <p className="text-xs font-black">{data.latitude}, {data.longitude}</p>
                    </div>
                    <a 
                        href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline"
                    >
                        View on Google Maps
                    </a>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LocationDetail({ label, value, subValue, icon }: { label: string; value: string; subValue: string; icon: React.ReactNode }) {
    return (
        <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-gray-100 rounded-[10px] flex items-center justify-center text-gray-500">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase text-gray-400 leading-none mb-1">{label}</p>
                <div className="flex items-baseline gap-2">
                    <span className="font-black text-lg">{value}</span>
                    <span className="text-xs font-bold text-gray-400">({subValue})</span>
                </div>
            </div>
        </div>
    )
}
