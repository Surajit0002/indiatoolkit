import { getAllTools, getAllCategories, getPopularTools } from "@/lib/utils";
import ToolsList from "@/components/ToolsList";
import ToolGrid from "@/components/ToolGrid";
import { Zap, Layout } from "lucide-react";

export const metadata = {
  title: "All Tools - OMNITOOLS",
  description: "Browse our complete collection of free online tools. From calculators to developer utilities, find everything you need.",
};

export default function AllToolsPage() {
  const tools = getAllTools();
  const categories = getAllCategories();
  const popularTools = getPopularTools();

  return (
    <div className="bg-[#fcfdfe] min-h-screen pb-32 relative overflow-hidden">
      {/* Immersive Background Effects */}
      <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[70%] bg-blue-600/5 blur-[160px] rounded-full"></div>
        <div className="absolute top-[5%] -right-[5%] w-[40%] h-[60%] bg-indigo-600/5 blur-[140px] rounded-full"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.8)_0%,transparent_100%)]"></div>
      </div>

      <div className="pt-32 pb-16 relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-2xl shadow-2xl mb-8 animate-bounce">
            <Zap className="h-4 w-4 fill-blue-500 text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Omni Engine V2</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic text-slate-900 leading-[0.85]">
            Power <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">Inventory.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-bold leading-relaxed italic opacity-80 uppercase tracking-tight">
            Advanced processing matrix. Explore our vast collection of browser-native utilities optimized for peak performance.
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10 space-y-24">
        {/* Popular Section with New Styling */}
        <div className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-blue-600/10 rounded-[48px] blur-2xl"></div>
           <div className="relative bg-white/60 backdrop-blur-xl p-10 rounded-[48px] border border-white/80 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.05)]">
            <ToolGrid 
              tools={popularTools.slice(0, 4)} 
              categories={categories}
              title="High Performance"
              subtitle="The Popular Grid"
            />
          </div>
        </div>

        <div className="pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900 text-white">
                <Layout className="h-3 w-3" />
                <span className="text-[8px] font-black uppercase tracking-[0.3em]">Core Collection</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase italic leading-none">Global Repository</h2>
            </div>
            <div className="text-right">
              <span className="text-5xl md:text-7xl font-black text-slate-200 tracking-tighter leading-none select-none italic">
                {tools.length}
              </span>
            </div>
          </div>
          
          <ToolsList initialTools={tools} categories={categories} />
        </div>
      </div>
    </div>
  );
}
