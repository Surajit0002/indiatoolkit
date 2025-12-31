import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getToolsByCategory } from "@/lib/utils";
import ToolCard from "@/components/ToolCard";
import { ChevronRight, Home, Layout, Zap, Search, Info, ArrowRight } from "lucide-react";
import Link from "next/link";
import * as Icons from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} Tools - OMNITOOLS`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(slug);
  // @ts-ignore
  const Icon = Icons[category.icon] || Icons.Folder;

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-32 relative overflow-hidden">
      {/* Immersive Background Glow */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none -z-10 overflow-hidden">
        <div 
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[80%] blur-[160px] rounded-full opacity-[0.08]"
          style={{ backgroundColor: category?.color }}
        ></div>
        <div 
          className="absolute top-[5%] -right-[5%] w-[40%] h-[70%] blur-[140px] rounded-full opacity-[0.05]"
          style={{ backgroundColor: category?.color }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.8)_0%,transparent_100%)]"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 pt-32">
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Link href="/" className="text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <Home className="h-3 w-3" /> Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <Link href="/categories" className="text-slate-400 hover:text-blue-600 transition-colors">
              Categories
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="text-slate-900 font-black italic">{category.name}</span>
          </nav>

          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inventory</span>
             <div className="h-4 w-px bg-slate-100 mx-1"></div>
             <span className="text-[10px] font-black text-blue-600">{tools.length} Tools</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 mb-20 text-center lg:text-left">
          <div className="relative shrink-0">
             <div 
              className="absolute -inset-4 rounded-[40px] blur-3xl opacity-20"
              style={{ backgroundColor: category?.color }}
            ></div>
            <div 
              className="relative h-24 w-24 rounded-[32px] flex items-center justify-center text-white shadow-2xl border-4 border-white"
              style={{ 
                background: `linear-gradient(135deg, ${category.color}, ${category.color}ee)`,
                boxShadow: `0 20px 40px -10px ${category.color}88`
              }}
            >
              <Icon className="h-12 w-12 stroke-[2.5] drop-shadow-xl" />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-none drop-shadow-sm">
                {category.name} <span className="text-red-600 not-italic font-medium">Matrix</span>
              </h1>
              <p className="text-sm md:text-lg text-slate-500 font-bold max-w-2xl leading-relaxed italic opacity-80 uppercase tracking-tight mx-auto lg:mx-0">
                {category.description}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
               <div className="px-3 py-1.5 bg-slate-900 text-white rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-xl flex items-center gap-2">
                  <Zap className="h-3 w-3 fill-blue-500 text-blue-500" /> High Performance
               </div>
               <div className="px-3 py-1.5 bg-white text-slate-400 border border-slate-200 rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-sm flex items-center gap-2">
                  <Layout className="h-3 w-3" /> Fully Integrated
               </div>
            </div>
          </div>
        </div>

        {/* Tool Grid Section */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex flex-col">
              <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Available Utilities</h2>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Smarter tools for your workflow</p>
            </div>
            
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Filter these tools..." 
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest outline-none focus:border-blue-500 focus:shadow-md transition-all w-64 shadow-sm"
              />
            </div>
          </div>

          {tools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map(tool => (
                <div key={tool.id} className="transform hover:-translate-y-2 transition-transform duration-500">
                   <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-slate-200">
              <div className="h-16 w-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <Icons.SearchX className="h-8 w-8" />
              </div>
              <h3 className="text-slate-900 font-black uppercase italic tracking-widest">No tools found</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Try searching for something else in the global search</p>
            </div>
          )}
        </div>

        {/* Info Blocks */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
           <InfoCard 
            icon={<Info className="h-5 w-5" />} 
            title="Smarter Engine" 
            desc="All tools in this category are optimized for local browser execution." 
           />
           <InfoCard 
            icon={<Zap className="h-5 w-5" />} 
            title="Zero Latency" 
            desc="Experience instantaneous results without any server-side delays." 
           />
           <InfoCard 
            icon={<ArrowRight className="h-5 w-5" />} 
            title="Next Gen" 
            desc="Explore the future of web-based utility applications today." 
           />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
      <div className="h-10 w-10 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors shadow-lg">
        {icon}
      </div>
      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest italic mb-2">{title}</h4>
      <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
        {desc}
      </p>
    </div>
  );
}
