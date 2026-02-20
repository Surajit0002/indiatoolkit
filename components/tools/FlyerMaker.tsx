"use client";

import { useState, useRef } from "react";
import { Copy, Download, Palette, Calendar, MapPin, Tag, Megaphone, Zap } from "lucide-react";

export default function FlyerMaker() {
  const [title, setTitle] = useState("Grand Opening Sale");
  const [subtitle, setSubtitle] = useState("Join us for an amazing event");
  const [description, setDescription] = useState("Don't miss out on our biggest sale of the year!");
  const [eventDate, setEventDate] = useState("Saturday, December 15th, 2024");
  const [eventTime, setEventTime] = useState("10:00 AM - 6:00 PM");
  const [location, setLocation] = useState("123 Main Street, City");
  const [discount, setDiscount] = useState("50% OFF");
  const [primaryColor, setPrimaryColor] = useState("#EF4444");
  const [secondaryColor, setSecondaryColor] = useState("#F59E0B");
  const [flyerStyle, setFlyerStyle] = useState<"bold" | "elegant" | "fun" | "professional">("bold");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const flyerStyles = [
    { id: "bold", name: "Bold", description: "High impact design" },
    { id: "elegant", name: "Elegant", description: "Sophisticated look" },
    { id: "fun", name: "Fun", description: "Playful design" },
    { id: "professional", name: "Professional", description: "Corporate style" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFlyer = () => {
    alert("Download functionality would be implemented here with html2canvas");
  };

  const getFlyerStyle = () => {
    switch (flyerStyle) {
      case "bold":
        return "bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500";
      case "elegant":
        return "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700";
      case "fun":
        return "bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400";
      case "professional":
        return "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800";
      default:
        return "bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500";
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mb-4 shadow-lg">
            <Megaphone className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Flyer Maker</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create marketing flyers and announcements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Event Info */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Event Info
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Date</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Time</label>
                  <input
                    type="text"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Offer */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Special Offer
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Discount/Offer</label>
                  <input
                    type="text"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-pink-500 focus:ring-0 outline-none font-black text-2xl text-center text-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Colors & Style */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Style & Colors
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Flyer Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {flyerStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setFlyerStyle(style.id as typeof flyerStyle)}
                        className={`p-3 rounded-xl border-2 transition-all text-xs ${
                          flyerStyle === style.id
                            ? "border-pink-500 bg-pink-50"
                            : "border-slate-100 hover:border-slate-300"
                        }`}
                      >
                        <span className="font-bold text-slate-700">{style.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Primary Color</label>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-slate-100 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Secondary Color</label>
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-slate-100 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Flyer Preview</span>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadFlyer}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-sm hover:from-pink-600 hover:to-rose-700 transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div
                  ref={canvasRef}
                  className="w-full aspect-[3/4] md:aspect-[5/7] rounded-xl shadow-2xl overflow-hidden mx-auto max-w-md"
                >
                  <div className={`w-full h-full p-8 ${getFlyerStyle()}`}>
                    <div className="h-full flex flex-col">
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-bold mb-4">
                          LIMITED TIME OFFER
                        </div>
                        <h1 className="font-black text-4xl uppercase italic text-white leading-tight">
                          {title}
                        </h1>
                        <p className="font-bold text-white/90 mt-2">{subtitle}</p>
                      </div>

                      {/* Discount */}
                      <div className="flex-1 flex items-center justify-center mb-6">
                        <div className="w-32 h-32 rounded-full flex items-center justify-center border-4 border-white bg-white">
                          <span className="font-black text-4xl" style={{ color: primaryColor }}>
                            {discount}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-white/90 text-center font-medium mb-6">
                        {description}
                      </p>

                      {/* Event Details */}
                      <div className="bg-white/10 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-2 text-white">
                          <Calendar className="h-5 w-5" />
                          <span className="font-bold">{eventDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <Zap className="h-5 w-5" />
                          <span className="font-bold">{eventTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <MapPin className="h-5 w-5" />
                          <span className="font-bold">{location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Templates */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Quick Templates</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { name: "Sale", primary: "#EF4444", secondary: "#F59E0B", style: "bold" },
                    { name: "Event", primary: "#3B82F6", secondary: "#8B5CF6", style: "professional" },
                    { name: "Party", primary: "#EC4899", secondary: "#F97316", style: "fun" },
                    { name: "Gala", primary: "#1F2937", secondary: "#D4AF37", style: "elegant" },
                  ].map((template) => (
                    <button
                      key={template.name}
                      onClick={() => {
                        setPrimaryColor(template.primary);
                        setSecondaryColor(template.secondary);
                        setFlyerStyle(template.style as typeof flyerStyle);
                      }}
                      className="p-3 rounded-xl border-2 border-slate-100 hover:border-slate-300 transition-all text-center"
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: template.primary }} />
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: template.secondary }} />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{template.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
