import Link from "next/link";
import { ArrowRight, Star, Zap, Shield, Search, TrendingUp, Sparkles, Calculator, Shuffle, FileText, Code, Globe, Heart, Download, Clock, Weight, Ruler, Thermometer, DollarSign, Text, Activity, BarChart3, Monitor, Smartphone, Cloud, Mail, Lock, Key, Eye, EyeOff, Gift, Shield as ShieldIcon, Calendar, CreditCard, Building, Building2, Crown, ChartBar, Map, Palette, Newspaper, CalendarDays, Briefcase, Handshake, BookText, GraduationCap, CircleHelp, Wrench, MessageCircle, GalleryHorizontalEnd, HelpCircle, FileText as FileTextIcon, ChartBar as ChartBarIcon } from "lucide-react";
import { getPopularTools, getAllCategories } from "@/lib/utils";
import dynamic from "next/dynamic";
import * as Icons from "lucide-react";

// Dynamic import for heavy components
const ToolCard = dynamic(() => import("@/components/ToolCard"), {
  loading: () => <div className="h-48 bg-slate-100 rounded-2xl animate-pulse"></div>
});

export default function Home() {
  const popularTools = getPopularTools();
  const categories = getAllCategories();

  return (
    <div className="flex flex-col gap-8 pb-24">
      {/* New Gen Hero Section with Dynamic Colors */}
      <section className="relative pt-16 pb-12 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-[100px]"></div>
          <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-[80px]"></div>
        </div>
        
        <div className="container px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-full mb-8 border border-green-500/20">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-green-600">INDIA TOOLKIT V1.0 IS LIVE</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9] uppercase italic text-slate-900">
            Empower. Create. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">Transform India.</span>
          </h1>
          
          <p className="text-sm md:text-base text-slate-500 mb-10 max-w-xl mx-auto font-bold leading-relaxed italic opacity-80">
            India's premier online toolkit for professionals, students, and creators. 
            Fast. Secure. Completely Free.
          </p>
          
          <div className="relative max-w-2xl mx-auto mb-10 group">
            <label htmlFor="search-input" className="sr-only">
              Search tools
            </label>
            <div className="absolute -inset-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-10 group-focus-within:opacity-25 transition-opacity duration-500"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-6 h-5 w-5 text-slate-400 group-focus-within:text-green-600 transition-colors" aria-hidden="true" />
              <input
                id="search-input"
                type="text"
                placeholder="Search 100+ utilities..."
                aria-label="Search tools"
                className="w-full h-16 pl-14 pr-8 rounded-2xl bg-white border border-slate-100 shadow-2xl focus:outline-none text-base font-black transition-all placeholder:text-slate-300 placeholder:italic focus:border-green-100"
              />
              <div className="absolute right-6 px-3 py-1 bg-slate-50 rounded-lg text-[8px] font-black text-slate-400 uppercase tracking-widest hidden md:block border border-slate-100">
                Press /
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
            <span className="text-slate-900">Trending:</span>
            {[
              { name: 'Word Counter', slug: 'word-counter' },
              { name: 'JSON Formatter', slug: 'json-formatter' },
              { name: 'AI Resume', slug: 'ai-resume-builder' },
              { name: 'IP Lookup', slug: 'ip-lookup' }
            ].map((tool, i) => (
              <Link key={i} href={`/tool/${tool.slug}`} className="px-3 py-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-full hover:from-green-600 hover:to-emerald-600 hover:text-white transition-all border border-green-500/20">
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools Grid */}
      <section className="container px-4 py-16 bg-gradient-to-b from-white to-green-50/30 rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-8 border-b-2 border-green-200/50">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">MOST POPULAR</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3">
                Most Used Utilities
              </h2>
              <p className="text-slate-600 font-bold max-w-lg">
                Discover the tools Indian professionals use most for their daily workflows
              </p>
            </div>
          </div>
          <Link href="/tools" className="inline-flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:shadow-xl transition-all text-sm font-black uppercase tracking-wider hover:scale-105 group">
            <span>View Full Library</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularTools.map((tool, index) => (
            <div 
              key={tool.id} 
              className="transform hover:-translate-y-2 transition-all duration-500 animate-in slide-in-from-bottom-4 fade-in zoom-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
        
        {/* Stats Bar */}
        <div className="mt-16 pt-8 border-t border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "100+", label: "Professional Tools" },
              { value: "500K+", label: "Monthly Users" },
              { value: "24/7", label: "Availability" },
              { value: "100%", label: "Free Forever" }
            ].map((stat, index) => (
              <div key={index} className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all">
                <div className="text-2xl font-black text-slate-900 mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Categories Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-green-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Discover by Category</h2>
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
                  className="group relative p-8 bg-white/70 backdrop-blur-sm rounded-2xl hover:scale-105 transition-all overflow-hidden border border-white/20 shadow-lg hover:shadow-xl"
                >
                  <div 
                    className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 group-hover:scale-150 transition-transform duration-500"
                    style={{ color: category.color }}
                  >
                    <Icon className="w-full h-full" />
                  </div>
                  
                  <div 
                    className="h-14 w-14 rounded-xl flex items-center justify-center text-white mb-6 shadow-xl"
                    style={{ backgroundColor: category.color }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-xl font-black mb-2 group-hover:text-green-600 transition-colors uppercase italic">{category.name}</h3>
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
          <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200/50 shadow-lg hover:shadow-xl transition-all">
            <Zap className="h-8 w-8 text-green-600 mb-6" />
            <h3 className="text-xl font-black mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Live Processing</h3>
            <p className="text-sm text-gray-500 font-bold leading-relaxed italic">Tools update in real-time as you type, giving you instant results without refresh.</p>
          </div>
          <div className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all">
            <ShieldIcon className="h-8 w-8 text-blue-600 mb-6" />
            <h3 className="text-xl font-black mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Client-Side Secure</h3>
            <p className="text-sm text-gray-500 font-bold leading-relaxed italic">Your data never leaves your browser. Privacy isn't a feature, it's our foundation.</p>
          </div>
          <div className="p-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200/50 shadow-lg hover:shadow-xl transition-all">
            <Star className="h-8 w-8 text-orange-600 mb-6" />
            <h3 className="text-xl font-black mb-3 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Always Dynamic</h3>
            <p className="text-sm text-gray-500 font-bold leading-relaxed italic">We release new tools and features every week based on your direct feedback.</p>
          </div>
        </div>
      </section>
    </div>
  );
}