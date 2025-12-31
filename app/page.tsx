import Link from "next/link";
import { ArrowRight, Star, Zap, Shield, Search, TrendingUp, Sparkles } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { getPopularTools, getAllCategories } from "@/lib/utils";
import * as Icons from "lucide-react";

export default function Home() {
  const popularTools = getPopularTools();
  const categories = getAllCategories();

  return (
    <div className="flex flex-col gap-8 pb-24">
      {/* New Gen Hero Section */}
      <section className="relative pt-16 pb-12 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]"></div>
        </div>
        
        <div className="container px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-card mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-ping"></div>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-800">Omnitools V2.0 is Live</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9] uppercase italic text-slate-900">
            Design. Build. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">Accelerate.</span>
          </h1>
          
          <p className="text-sm md:text-base text-slate-500 mb-10 max-w-xl mx-auto font-bold leading-relaxed italic opacity-80">
            The ultimate productivity suite for the next generation of digital creators. 
            Instant. Private. Powerful.
          </p>
          
          <div className="relative max-w-2xl mx-auto mb-10 group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-10 group-focus-within:opacity-25 transition-opacity duration-500"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-6 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Search 100+ utilities..."
                className="w-full h-16 pl-14 pr-8 rounded-2xl bg-white border border-slate-100 shadow-2xl focus:outline-none text-base font-black transition-all placeholder:text-slate-300 placeholder:italic focus:border-blue-100"
              />
              <div className="absolute right-6 px-3 py-1 bg-slate-50 rounded-lg text-[8px] font-black text-slate-400 uppercase tracking-widest hidden md:block border border-slate-100">
                Press /
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
            <span className="text-slate-900">Trending:</span>
            {['Word Counter', 'JSON Formatter', 'AI Resume', 'IP Lookup'].map((tool, i) => (
              <Link key={i} href="#" className="px-3 py-1 glass-card hover:bg-slate-900 hover:text-white transition-all">
                {tool}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools Grid */}
      <section className="container px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-100 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-3 w-3 text-blue-600" />
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-blue-600">Trending Tools</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic text-slate-900">Most Used Utilities</h2>
          </div>
          <Link href="/tools" className="inline-flex items-center gap-2 px-5 py-2.5 glass-card hover:bg-black hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
            View full library <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Modern Categories Section */}
      <section className="py-20 bg-gray-900/5">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4">Discover by Category</h2>
            <p className="text-gray-500 font-bold max-w-xl mx-auto italic leading-relaxed">
              Explore our vast library of tools organized into easy-to-browse categories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => {
              // @ts-ignore
              const Icon = Icons[category.icon] || Icons.Folder;
              return (
                <Link 
                  key={category.id} 
                  href={`/category/${category.slug}`}
                  className="group relative p-8 glass-card hover:scale-105 transition-all overflow-hidden"
                >
                  <div 
                    className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 group-hover:scale-150 transition-transform duration-500"
                    style={{ color: category.color }}
                  >
                    <Icon className="w-full h-full" />
                  </div>
                  
                  <div 
                    className="h-14 w-14 rounded-[10px] flex items-center justify-center text-white mb-6 shadow-xl"
                    style={{ backgroundColor: category.color }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-xl font-black mb-2 group-hover:text-blue-600 transition-colors uppercase italic">{category.name}</h3>
                  <p className="text-xs text-gray-500 font-bold leading-relaxed">{category.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 glass-card border-l-4 border-l-blue-600">
            <Zap className="h-8 w-8 text-blue-600 mb-6" />
            <h3 className="text-xl font-black mb-3">Live Processing</h3>
            <p className="text-sm text-gray-500 font-bold leading-relaxed italic">Tools update in real-time as you type, giving you instant results without refresh.</p>
          </div>
          <div className="p-8 glass-card border-l-4 border-l-purple-600">
            <Shield className="h-8 w-8 text-purple-600 mb-6" />
            <h3 className="text-xl font-black mb-3">Client-Side Secure</h3>
            <p className="text-sm text-gray-500 font-bold leading-relaxed italic">Your data never leaves your browser. Privacy isn&apos;t a feature, it&apos;s our foundation.</p>
          </div>
          <div className="p-8 glass-card border-l-4 border-l-green-600">
            <Star className="h-8 w-8 text-green-600 mb-6" />
            <h3 className="text-xl font-black mb-3">Always Dynamic</h3>
            <p className="text-sm text-gray-500 font-bold leading-relaxed italic">We release new tools and features every week based on your direct feedback.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
