import { User, Mail, Calendar, Shield, Settings, History, Star } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "My Profile - OMNITOOLS",
};

export default function ProfilePage() {
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
            <div className="glass-card p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] -z-10 rounded-full"></div>
              
              <div className="relative">
                <div className="h-32 w-32 bg-slate-900 text-white rounded-3xl flex items-center justify-center text-4xl font-black shadow-2xl shadow-slate-200 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  JD
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg border-4 border-white">
                  <Shield className="h-4 w-4" />
                </div>
              </div>

              <div className="flex-grow space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Premium Explorer</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">John Doe</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <Mail className="h-3.5 w-3.5 text-blue-500" /> john@example.com
                  </span>
                  <span className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <Calendar className="h-3.5 w-3.5 text-blue-500" /> Dec 2025
                  </span>
                </div>
              </div>

              <Link href="/settings" className="brutal-btn bg-slate-900 text-[10px] py-4 px-8 shrink-0">
                Edit Profile
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <StatCard label="Tools Used" value="128" icon={<History className="h-5 w-5" />} color="#3B82F6" />
               <StatCard label="Saved Tools" value="12" icon={<Star className="h-5 w-5" />} color="#F59E0B" />
               <StatCard label="Account Status" value="Pro" icon={<Shield className="h-5 w-5" />} color="#10B981" active />
            </div>

            <div className="glass-card p-8 md:p-10 space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <User className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField label="Full Name" value="John Doe" />
                <InfoField label="Email Address" value="john@example.com" />
                <InfoField label="Location" value="United States" />
                <InfoField label="Preferred Timezone" value="UTC-5 (EST)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardLink({ href, icon, label, active = false }: { href: string, icon: any, label: string, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-5 py-4 rounded-[10px] font-black text-[10px] uppercase tracking-widest transition-all group ${
        active 
          ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <div className={`transition-transform group-hover:scale-110 ${active ? "text-blue-400" : "text-slate-400 group-hover:text-blue-600"}`}>
        {icon}
      </div>
      {label}
    </Link>
  );
}

function StatCard({ label, value, icon, color, active = false }: { label: string, value: string, icon: any, color: string, active?: boolean }) {
  return (
    <div className="glass-card p-8 group hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 blur-3xl opacity-10 -z-10" style={{ backgroundColor: color }}></div>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl text-white shadow-lg shadow-black/5" style={{ backgroundColor: color }}>
          {icon}
        </div>
        <div className="text-3xl font-black text-slate-900">{value}</div>
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</div>
    </div>
  );
}

function InfoField({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-2">
      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</div>
      <div className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 text-sm shadow-inner">
        {value}
      </div>
    </div>
  );
}
