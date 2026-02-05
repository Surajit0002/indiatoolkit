"use client";

import { useState, useRef } from "react";
import { Copy, Download, Type, Palette, Calendar, MapPin, Clock, Users, Heart, Sparkles } from "lucide-react";

export default function InvitationCardMaker() {
  const [eventTitle, setEventTitle] = useState("You're Invited!");
  const [occasion, setOccasion] = useState("Birthday Celebration");
  const [hostName, setHostName] = useState("John & Jane Smith");
  const [date, setDate] = useState("Saturday, December 28, 2024");
  const [time, setTime] = useState("6:00 PM - 10:00 PM");
  const [location, setLocation] = useState("123 Party Lane, Celebration City");
  const [dressCode, setDressCode] = useState("Smart Casual");
  const [rsvpText, setRsvpText] = useState("RSVP by December 20");
  const [primaryColor, setPrimaryColor] = useState("#EC4899");
  const [accentColor, setAccentColor] = useState("#F97316");
  const [invitationStyle, setInvitationStyle] = useState<"elegant" | "fun" | "formal" | "modern">("elegant");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const invitationStyles = [
    { id: "elegant", name: "Elegant" },
    { id: "fun", name: "Fun" },
    { id: "formal", name: "Formal" },
    { id: "modern", name: "Modern" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(eventTitle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadInvitation = () => {
    alert("Download functionality would be implemented here with html2canvas");
  };

  const getInvitationStyle = () => {
    switch (invitationStyle) {
      case "elegant":
        return "bg-gradient-to-br from-pink-50 via-white to-rose-50";
      case "fun":
        return "bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400";
      case "formal":
        return "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700";
      case "modern":
        return "bg-white border border-slate-200";
      default:
        return "bg-gradient-to-br from-pink-50 to-rose-50";
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Invitation Card Maker</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Design event invitations
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Event Title</label>
                  <input
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-rose-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Occasion</label>
                  <input
                    type="text"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-rose-500 focus:ring-0 outline-none font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Host Name</label>
                  <input
                    type="text"
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-rose-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Time & Location */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time & Location
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-rose-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-rose-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-rose-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Dress Code</label>
                  <input
                    type="text"
                    value={dressCode}
                    onChange={(e) => setDressCode(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-rose-500 focus:ring-0 outline-none font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">RSVP Text</label>
                  <input
                    type="text"
                    value={rsvpText}
                    onChange={(e) => setRsvpText(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-rose-500 focus:ring-0 outline-none font-medium text-slate-700"
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Invitation Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {invitationStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setInvitationStyle(style.id as typeof invitationStyle)}
                        className={`p-3 rounded-xl border-2 transition-all text-xs ${
                          invitationStyle === style.id
                            ? "border-rose-500 bg-rose-50"
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Accent Color</label>
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
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
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Invitation Preview</span>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300 transition-all flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadInvitation}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-sm hover:from-rose-600 hover:to-pink-700 transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div
                  ref={canvasRef}
                  className="mx-auto rounded-xl shadow-2xl overflow-hidden max-w-md"
                >
                  <div className={`w-full aspect-[5/7] ${getInvitationStyle()}`}>
                    {invitationStyle === "formal" ? (
                      // Formal Style
                      <div className="w-full h-full p-8 text-white">
                        <div className="text-center mb-8">
                          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-white/30">
                            <Sparkles className="h-8 w-8" />
                          </div>
                          <p className="text-sm uppercase tracking-widest font-medium">You are cordially invited to</p>
                        </div>
                        <div className="text-center mb-8">
                          <h1 className="font-serif italic text-3xl mb-2">{occasion}</h1>
                          <p className="font-medium text-white/80">hosted by {hostName}</p>
                        </div>
                        <div className="space-y-3 text-center mb-8">
                          <div className="flex items-center justify-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{date}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{time}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{location}</span>
                          </div>
                        </div>
                        <div className="text-center border-t border-white/20 pt-4">
                          <p className="font-medium">{dressCode}</p>
                          <p className="text-sm mt-2">{rsvpText}</p>
                        </div>
                      </div>
                    ) : invitationStyle === "fun" ? (
                      // Fun Style
                      <div className="w-full h-full p-8 text-white">
                        <div className="flex justify-center mb-6">
                          <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-4xl animate-pulse">
                            🎉
                          </div>
                        </div>
                        <div className="text-center mb-6">
                          <p className="text-sm font-bold uppercase tracking-wider mb-2">You're Invited!</p>
                          <h1 className="font-black text-3xl italic">{occasion}</h1>
                        </div>
                        <div className="bg-white/20 rounded-xl p-4 mb-6 space-y-2">
                          <p className="font-bold text-center">{hostName}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4" />
                            <span>{time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4" />
                            <span>{location}</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="font-bold mb-2">{dressCode}</p>
                          <p className="text-sm bg-white/20 inline-block px-4 py-2 rounded-full">
                            {rsvpText}
                          </p>
                        </div>
                      </div>
                    ) : (
                      // Elegant/Modern Style
                      <div className="w-full h-full p-8 flex flex-col">
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                            <Heart className="h-8 w-8 text-white" />
                          </div>
                          <p className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
                            {eventTitle}
                          </p>
                          <h1 className="font-black text-2xl italic" style={{ color: primaryColor }}>
                            {occasion}
                          </h1>
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-center space-y-4">
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                              <Calendar className="h-5 w-5" style={{ color: primaryColor }} />
                            </div>
                            <div>
                              <p className="text-xs text-slate-400">Date</p>
                              <p className="font-medium text-slate-700">{date}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                              <Clock className="h-5 w-5" style={{ color: accentColor }} />
                            </div>
                            <div>
                              <p className="text-xs text-slate-400">Time</p>
                              <p className="font-medium text-slate-700">{time}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                              <MapPin className="h-5 w-5" style={{ color: primaryColor }} />
                            </div>
                            <div>
                              <p className="text-xs text-slate-400">Location</p>
                              <p className="font-medium text-slate-700">{location}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                          <p className="font-medium text-sm" style={{ color: primaryColor }}>{hostName}</p>
                          <p className="text-xs text-slate-400 mt-1">{dressCode}</p>
                          <p className="text-xs font-bold mt-3" style={{ color: accentColor }}>
                            {rsvpText}
                          </p>
                        </div>
                      </div>
                    )}
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
                    { name: "Wedding", primary: "#EC4899", accent: "#D4AF37" },
                    { name: "Birthday", primary: "#F97316", accent: "#EC4899" },
                    { name: "Party", primary: "#8B5CF6", accent: "#EC4899" },
                    { name: "Gala", primary: "#1F2937", accent: "#D4AF37" },
                  ].map((template) => (
                    <button
                      key={template.name}
                      onClick={() => {
                        setPrimaryColor(template.primary);
                        setAccentColor(template.accent);
                      }}
                      className="p-3 rounded-xl border-2 border-slate-100 hover:border-slate-300 transition-all text-center"
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: template.primary }} />
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: template.accent }} />
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
