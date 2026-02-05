"use client";

import { useState, useEffect, useCallback } from 'react';

// User Profile Types
export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  location: string;
  timezone: string;
  bio: string;
  joinedDate: string;
}

// Settings Types
export interface UserSettings {
  darkMode: boolean;
  highContrast: boolean;
  emailUpdates: boolean;
  browserAlerts: boolean;
  twoFactorAuth: boolean;
  publicProfile: boolean;
  language: string;
}

// History Types
export interface HistoryItem {
  toolId: string;
  toolSlug: string;
  toolName: string;
  toolIcon: string;
  toolCategory: string;
  timestamp: number;
  date: string;
}

// Default values
const DEFAULT_PROFILE: UserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '',
  location: 'United States',
  timezone: 'UTC-5 (EST)',
  bio: '',
  joinedDate: new Date().toISOString(),
};

const DEFAULT_SETTINGS: UserSettings = {
  darkMode: false,
  highContrast: false,
  emailUpdates: true,
  browserAlerts: false,
  twoFactorAuth: false,
  publicProfile: false,
  language: 'en',
};

// Hook for User Profile
export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    localStorage.setItem('userProfile', JSON.stringify(updated));
  }, [profile]);

  const resetProfile = useCallback(() => {
    setProfile(DEFAULT_PROFILE);
    localStorage.setItem('userProfile', JSON.stringify(DEFAULT_PROFILE));
  }, []);

  return { profile, updateProfile, resetProfile, isLoading };
}

// Hook for User Settings
export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('userSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const updateSetting = useCallback(<K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem('userSettings', JSON.stringify(updated));
  }, [settings]);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.setItem('userSettings', JSON.stringify(DEFAULT_SETTINGS));
  }, []);

  return { settings, updateSetting, resetSettings, isLoading };
}

// Hook for Favorites
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('userFavorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const toggleFavorite = useCallback((toolId: string) => {
    setFavorites(prev => {
      const updated = prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId];
      localStorage.setItem('userFavorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addFavorite = useCallback((toolId: string) => {
    setFavorites(prev => {
      if (prev.includes(toolId)) return prev;
      const updated = [...prev, toolId];
      localStorage.setItem('userFavorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFavorite = useCallback((toolId: string) => {
    setFavorites(prev => {
      const updated = prev.filter(id => id !== toolId);
      localStorage.setItem('userFavorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    localStorage.removeItem('userFavorites');
  }, []);

  const isFavorite = useCallback((toolId: string) => favorites.includes(toolId), [favorites]);

  return { favorites, toggleFavorite, addFavorite, removeFavorite, clearFavorites, isFavorite, isLoading };
}

// Hook for Usage History
export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('userHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const addToHistory = useCallback((item: Omit<HistoryItem, 'timestamp' | 'date'>) => {
    setHistory(prev => {
      const now = new Date();
      const newItem: HistoryItem = {
        ...item,
        timestamp: now.getTime(),
        date: now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
      };
      // Remove duplicate if exists
      const filtered = prev.filter(h => h.toolId !== item.toolId);
      // Add new item at the beginning, max 100 items
      const updated = [newItem, ...filtered].slice(0, 100);
      localStorage.setItem('userHistory', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('userHistory');
  }, []);

  const getRecentHistory = useCallback((limit: number = 10) => {
    return history.slice(0, limit);
  }, [history]);

  const getHistoryByDateRange = useCallback((days: number) => {
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    return history.filter(item => item.timestamp > cutoff);
  }, [history]);

  return { history, addToHistory, clearHistory, getRecentHistory, getHistoryByDateRange, isLoading };
}

// Export all data
export function exportUserData() {
  const data = {
    profile: localStorage.getItem('userProfile'),
    settings: localStorage.getItem('userSettings'),
    favorites: localStorage.getItem('userFavorites'),
    history: localStorage.getItem('userHistory'),
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
}

// Import all data
export function importUserData(jsonData: string) {
  try {
    const data = JSON.parse(jsonData);
    if (data.profile) localStorage.setItem('userProfile', data.profile);
    if (data.settings) localStorage.setItem('userSettings', data.settings);
    if (data.favorites) localStorage.setItem('userFavorites', data.favorites);
    if (data.history) localStorage.setItem('userHistory', data.history);
    return true;
  } catch {
    return false;
  }
}
