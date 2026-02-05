"use client";

import React, { useState, useEffect } from "react";
import { User, Camera, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Check } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  avatar: string;
  bio: string;
}

export default function ProfileClient() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "2024-01-15",
    avatar: "",
    bio: "Full-stack developer passionate about building amazing tools"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      setEditedProfile(parsed);
    }
  }, []);

  const handleSave = () => {
    setProfile(editedProfile);
    localStorage.setItem("userProfile", JSON.stringify(editedProfile));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        setEditedProfile(prev => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header Banner */}
        <div className="h-48 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Profile Section */}
        <div className="px-8 pb-8">
          {/* Avatar & Name */}
          <div className="relative -mt-20 mb-6">
            <div className="flex items-end gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center overflow-hidden shadow-lg">
                  {avatarPreview || profile.avatar ? (
                    <img src={avatarPreview || profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-white" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full cursor-pointer hover:bg-emerald-700 transition-colors shadow-lg">
                    <Camera className="w-4 h-4" />
                    <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                  </label>
                )}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-black text-slate-900">{profile.name}</h1>
                    <p className="text-slate-600">Full Stack Developer</p>
                  </div>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-2">About</h2>
            {isEditing ? (
              <textarea
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
                rows={3}
              />
            ) : (
              <p className="text-slate-600 leading-relaxed">{profile.bio}</p>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-slate-50 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-600" />
                Personal Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="flex-1 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  ) : (
                    <span className="text-slate-600">{profile.email}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-400" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="flex-1 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  ) : (
                    <span className="text-slate-600">{profile.phone}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-slate-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.location}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                      className="flex-1 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  ) : (
                    <span className="text-slate-600">{profile.location}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-slate-50 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                Account Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-600">Member since {new Date(profile.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-slate-600">Verified Account</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
