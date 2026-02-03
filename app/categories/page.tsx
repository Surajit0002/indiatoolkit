import Link from "next/link";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import * as Icons from "lucide-react";
import { ArrowRight, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Tool Categories - India Toolkit",
  description: "Browse our tools by category. Find exactly what you need for calculations, conversions, and more in India.",
};

export default function CategoriesPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24 relative overflow-hidden">
      {/* Top Breadcrumbs - Absolute Top */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-slate-100">
        <div className="container px-4 py-3">
          <nav className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-slate-400">
            <Link href="/" className="hover:text-green-600 transition-colors flex items-center gap-1.5">
              <Icons.Home className="h-2.5 w-2.5" /> Home
            </Link>
            <ChevronRight className="h-2 w-2" />
            <span className="text-slate-900">Categories</span>
          </nav>
        </div>
      </div>

      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-purple-400/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="pt-24 pb-16 relative overflow-hidden">
        <div className="container px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 mb-8">
            <Icons.Layout className="h-4 w-4 text-green-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">Browse Library</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic text-slate-900 leading-[0.9]">
            Explore <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Categories.</span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-bold leading-relaxed italic opacity-80">
            Find the perfect utility for your Indian workflow, organized by function.
          </p>
        </div>
      </div>

      <div className="container px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            // @ts-ignore
            const Icon = Icons[category.icon] || Icons.Folder;
            const categoryTools = tools.filter(t => t.category === category.slug);

            return (
              <Link 
                key={category.id} 
                href={`/category/${category.slug}`}
                className="glass-card p-5 group hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center"
              >
                {/* Background Accent */}
                <div 
                  className="absolute top-0 right-0 w-24 h-24 blur-3xl -z-10 opacity-20 transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: category.color }}
                ></div>
                
                <div 
                  className="p-4 rounded-2xl text-white shadow-xl mb-4 group-hover:scale-110 transition-transform duration-500"
                  style={{ 
                    backgroundColor: category.color,
                    boxShadow: `0 10px 20px -5px ${category.color}88`
                  }}
                >
                  <Icon className="h-6 w-6 stroke-[2.5]" />
                </div>
                
                <h2 className="text-lg font-black text-slate-900 leading-tight mb-1">{category.name}</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                  {categoryTools.length} Tools
                </p>
                
                <p className="text-slate-500 text-[11px] font-bold leading-relaxed line-clamp-2 mb-4">
                  {category.description}
                </p>

                <div className="mt-auto pt-4 border-t border-black/5 w-full flex justify-center">
                  <span className="text-[9px] font-black uppercase tracking-tighter text-green-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore Now <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
