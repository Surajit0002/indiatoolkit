"use client";

import { useState, useRef, useEffect } from "react";
import { User, Mail, Calendar, Shield, Settings, History, Star, Camera, X, Save } from "lucide-react";
import Link from "next/link";
import { useUserProfile } from "@/hooks/useUserData";

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function ProfileClient() {
  const { profile, updateProfile, isLoading } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditForm(profile);
    setAvatarPreview(profile.avatar || null);
  }, [profile]);

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setAvatarPreview(profile.avatar || null);
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        setEditForm(prev => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
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
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-indigo-400/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="container px-4 pt-16 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-2 space-y-1 sticky top-24">
              <DashboardLink href="/profile" icon={<User className="h-4 w-4" />} label="My Profile" active />
              <DashboardLink href="/saved-tools" icon={<Star className="h-4 w-4" />} label="Favorites" />
              <DashboardLink href="/history" icon={<History className="h-4 w-4" />} label="Usage History" />
              <DashboardLink href="/settings" icon={<Settings className="h-4 w-4" />} label="Settings" />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Header */}
            <div className="glass-card p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] -z-10 rounded-full"></div>
              
              {/* Avatar */}
              <div className="relative">
                <div 
                  className="h-32 w-32 bg-slate-900 text-white rounded-3xl flex items-center justify-center text-4xl font-black shadow-2xl shadow-slate-200 transform -rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden"
                  style={{ backgroundColor: profile.avatar ? 'transparent' : undefined }}
                >
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    getInitials(profile.name)
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg border-4 border-white hover:bg-blue-700 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              <div className="flex-grow space-y-3 text-center md:text-left">
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight bg-transparent border-b-2 border-blue-300 focus:border-blue-600 outline-none pb-1"
                  />
                ) : (
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{profile.name}</h1>
                )}
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 focus:border-blue-400 outline-none"
                    />
                  ) : (
                    <span className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                      <Mail className="h-3.5 w-3.5 text-blue-500" /> {profile.email}
                    </span>
                  )}
                  <span className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <Calendar className="h-3.5 w-3.5 text-blue-500" /> {profile.joinedDate}
                  </span>
                </div>
              </div>

              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="brutal-btn bg-slate-900 text-[10px] py-4 px-8 shrink-0"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-colors"
                  >
                    <X className="h-4 w-4" /> Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                  >
                    <Save className="h-4 w-4" /> Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Tools Used" value="128" icon={<History className="h-5 w-5" />} color="#3B82F6" />
              <StatCard label="Saved Tools" value="12" icon={<Star className="h-5 w-5" />} color="#F59E0B" />
              <StatCard label="Account Status" value="Pro" icon={<Shield className="h-5 w-5" />} color="#10B981" active />
            </div>

            {/* Personal Information */}
            <div className="glass-card p-8 md:p-10 space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <User className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField 
                  label="Full Name" 
                  value={profile.name} 
                  isEditing={isEditing}
                  editValue={editForm.name}
                  onChange={(val) => setEditForm(prev => ({ ...prev, name: val }))}
                />
                <InfoField 
                  label="Email Address" 
                  value={profile.email}
                  isEditing={isEditing}
                  editValue={editForm.email}
                  onChange={(val) => setEditForm(prev => ({ ...prev, email: val }))}
                />
                <InfoField 
                  label="Location" 
                  value={profile.location}
                  isEditing={isEditing}
                  editValue={editForm.location}
                  onChange={(val) => setEditForm(prev => ({ ...prev, location: val }))}
                />
                <InfoField 
                  label="Preferred Timezone" 
                  value={profile.timezone}
                  isEditing={isEditing}
                  editValue={editForm.timezone}
                  onChange={(val) => setEditForm(prev => ({ ...prev, timezone: val }))}
                />
                <div className="md:col-span-2">
                  <InfoField 
                    label="Bio" 
                    value={profile.bio || "No bio added yet"}
                    isEditing={isEditing}
                    editValue={editForm.bio}
                    onChange={(val) => setEditForm(prev => ({ ...prev, bio: val }))}
                    multiline
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

function StatCard({ label, value, icon, color, active = false }: { label: string, value: string, icon: React.ReactNode, color: string, active?: boolean }) {
  return (
    <div className={`glass-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${active ? 'ring-2 ring-green-500/50' : ''}`}>
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: color }}>
          {icon}
        </div>
        <div>
          <div className="text-3xl font-black text-slate-900">{value}</div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{label}</div>
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value, isEditing, editValue, onChange, multiline = false }: { 
  label: string, 
  value: string, 
  isEditing: boolean, 
  editValue: string, 
  onChange: (val: string) => void,
  multiline?: boolean 
}) {
  return (
    <div>
      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</label>
      {isEditing ? (
        multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        )
      ) : (
        <div className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900 font-medium border border-slate-100">
          {value}
        </div>
      )}
    </div>
  );
}
