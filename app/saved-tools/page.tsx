import { User, Settings, History, Star, Search } from "lucide-react";
import Link from "next/link";
import { tools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";

export const metadata = {
  title: "Saved Tools - OMNITOOLS",
};

export default function SavedToolsPage() {
  // Mock saved tools
  const savedTools = tools.filter(t => t.isPopular);

  return (
    <div className="bg-slate-50 min-h-screen pb-24 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-amber-400/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="container px-4 pt-16 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-2 space-y-1 sticky top-24">
              <DashboardLink href="/profile" icon={<User className="h-4 w-4" />} label="My Profile" />
              <DashboardLink href="/saved-tools" icon={<Star className="h-4 w-4" />} label="Favorites" active />
              <DashboardLink href="/history" icon={<History className="h-4 w-4" />} label="Usage History" />
              <DashboardLink href="/settings" icon={<Settings className="h-4 w-4" />} label="Settings" />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Favorite Tools</h1>
                <p className="text-slate-500 font-medium text-sm mt-1">Your personalized collection of essential utilities.</p>
              </div>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search favorites..." 
                  className="pl-12 pr-6 py-3.5 bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 text-xs font-black uppercase tracking-widest placeholder:text-slate-300 w-full md:w-64 shadow-xl shadow-black/5" 
                />
              </div>
            </div>

            {savedTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedTools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="glass-card p-24 text-center border-dashed">
                <div className="h-20 w-20 bg-slate-100 text-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-6 transform -rotate-12">
                  <Star className="h-10 w-10 stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Your shelf is empty</h3>
                <p className="text-slate-500 font-medium text-sm mb-8">Start adding tools to your favorites for quick access.</p>
                <Link href="/tools" className="brutal-btn bg-blue-600 text-[10px] px-10">
                  Explore Tools
                </Link>
              </div>
            )}
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
