import { User, Mail, Calendar, Shield, Settings, History, Star, Camera, X, Save } from "lucide-react";
import Link from "next/link";
import ProfileClient from "./ProfileClient";

export const metadata = {
  title: "My Profile - OMNITOOLS",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
