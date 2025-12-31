import { User, Settings, History, Star, Clock, Trash2 } from "lucide-react";
import Link from "next/link";
import { tools } from "@/data/tools";

export const metadata = {
  title: "Tool History - OMNITOOLS",
};

export default function HistoryPage() {
  // Mock history
  const historyItems = [
    { tool: tools[0], time: "2 hours ago" },
    { tool: tools[1], time: "Yesterday" },
    { tool: tools[2], time: "3 days ago" },
    { tool: tools[3] || tools[0], time: "Last week" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-emerald-400/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="container px-4 pt-16 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-2 space-y-1 sticky top-24">
              <DashboardLink href="/profile" icon={<User className="h-4 w-4" />} label="My Profile" />
              <DashboardLink href="/saved-tools" icon={<Star className="h-4 w-4" />} label="Favorites" />
              <DashboardLink href="/history" icon={<History className="h-4 w-4" />} label="Usage History" active />
              <DashboardLink href="/settings" icon={<Settings className="h-4 w-4" />} label="Settings" />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Recent Activity</h1>
                <p className="text-slate-500 font-medium text-sm mt-1">Keep track of the tools you've used recently.</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all group">
                <Trash2 className="h-4 w-4 group-hover:rotate-12 transition-transform" /> Clear History
              </button>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="divide-y divide-slate-100">
                {historyItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 md:p-8 hover:bg-slate-50/50 transition-colors group">
                    <div className="flex items-center gap-6">
                      <div className="h-14 w-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <Link href={`/tool/${item.tool.slug}`} className="text-xl font-black text-slate-900 hover:text-blue-600 transition-colors block leading-tight">
                          {item.tool.name}
                        </Link>
                        <div className="flex items-center gap-3 mt-2">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">{item.time}</span>
                           <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                           <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.1em]">{item.tool.category}</span>
                        </div>
                      </div>
                    </div>
                    <Link 
                      href={`/tool/${item.tool.slug}`} 
                      className="px-6 py-3 bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                    >
                      Launch Tool
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            
            {historyItems.length === 0 && (
               <div className="glass-card p-20 text-center border-dashed">
                  <div className="h-20 w-20 bg-slate-100 text-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <History className="h-10 w-10 stroke-[2.5]" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">No recent activity</h3>
                  <p className="text-slate-500 font-medium text-sm">Your tool usage history will appear here.</p>
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
