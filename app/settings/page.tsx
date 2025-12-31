import { User, Shield, Bell, Moon, Globe, Settings, History, Star } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Settings - OMNITOOLS",
};

export default function SettingsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-slate-400/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="container px-4 pt-16 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-2 space-y-1 sticky top-24">
              <DashboardLink href="/profile" icon={<User className="h-4 w-4" />} label="My Profile" />
              <DashboardLink href="/saved-tools" icon={<Star className="h-4 w-4" />} label="Favorites" />
              <DashboardLink href="/history" icon={<History className="h-4 w-4" />} label="Usage History" />
              <DashboardLink href="/settings" icon={<Settings className="h-4 w-4" />} label="Settings" active />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="mb-2">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Account Settings</h1>
              <p className="text-slate-500 font-medium text-sm mt-1">Manage your preferences and security settings.</p>
            </div>

            <SettingSection title="Appearance" icon={<Moon className="h-5 w-5" />} color="#8B5CF6">
               <ToggleOption label="Dark Mode" description="Experience OMNITOOLS in a sleek dark theme." />
               <ToggleOption label="High Contrast" description="Increase legibility with enhanced contrast." />
            </SettingSection>

            <SettingSection title="Notifications" icon={<Bell className="h-5 w-5" />} color="#3B82F6">
               <ToggleOption label="Email Updates" description="Stay informed about new tool releases and features." checked />
               <ToggleOption label="Browser Alerts" description="Get notified about tool updates directly in your browser." />
            </SettingSection>

            <SettingSection title="Security & Privacy" icon={<Shield className="h-5 w-5" />} color="#10B981">
               <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all">
                  <div>
                    <div className="font-black text-slate-900 text-sm uppercase tracking-tight">Change Password</div>
                    <div className="text-xs text-slate-500 font-bold mt-1">Keep your account secure with a strong password.</div>
                  </div>
                  <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">Update</button>
               </div>
               <ToggleOption label="Two-Factor Auth" description="Add an extra layer of security to your account login." />
               <ToggleOption label="Public Profile" description="Allow others to see your saved tools collection." />
            </SettingSection>

            <div className="pt-8 border-t border-slate-200 flex justify-end gap-4">
               <button className="px-8 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors">Reset Changes</button>
               <button className="brutal-btn bg-blue-600 px-10 py-4 text-[10px]">Save Preferences</button>
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

function SettingSection({ title, icon, color, children }: { title: string, icon: any, color: string, children: React.ReactNode }) {
  return (
    <div className="glass-card p-8 md:p-10 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 -z-10" style={{ backgroundColor: color }}></div>
      <div className="flex items-center gap-4 mb-2">
        <div className="h-10 w-10 text-white rounded-xl flex items-center justify-center shadow-lg shadow-black/5" style={{ backgroundColor: color }}>
          {icon}
        </div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function ToggleOption({ label, description, checked = false }: { label: string, description: string, checked?: boolean }) {
  return (
    <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all">
      <div>
        <div className="font-black text-slate-900 text-sm uppercase tracking-tight">{label}</div>
        <div className="text-xs text-slate-500 font-bold mt-1">{description}</div>
      </div>
      <button className={`w-14 h-7 rounded-full transition-all relative p-1 ${checked ? "bg-blue-600" : "bg-slate-300"}`}>
        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${checked ? "right-1" : "left-1"}`}></div>
      </button>
    </div>
  );
}
