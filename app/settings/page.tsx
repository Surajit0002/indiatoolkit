import { User, Shield, Bell, Moon, Globe, Settings as SettingsIcon, History, Star, Save, Lock, Eye, EyeOff, Download, Upload, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import SettingsClient from "./SettingsClient";

export const metadata = {
  title: "Settings - OMNITOOLS",
};

export default function SettingsPage() {
  return <SettingsClient />;
}
