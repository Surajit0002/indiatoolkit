import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug, getCategoryBySlug, getAllCategories, getAllTools } from "@/lib/utils";
import { ChevronRight, Home, Share2, Star, Info, Zap, Sparkles, Layout, ArrowRight, ShieldCheck, Clock, ZapOff } from "lucide-react";
import Link from "next/link";
import * as Icons from "lucide-react";
import ToolRenderer from "@/components/ToolRenderer";
import ToolSwitcher from "@/components/ToolSwitcher";
import ToolGrid from "@/components/ToolGrid";
import ToolActions from "@/components/ToolActions";
import { generateSeoContent, generateFaqsByType } from "@/lib/seo-content-generator";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };

  // Enhanced SEO metadata
  const title = `${tool.name} – Free Online Tool | India Toolkit`;
  const description = `Use ${tool.name} online for free. Fast, secure, and easy tool for developers and students.`;
  const canonicalUrl = `https://www.indiatoolkit.in/tool/${tool.slug}`;
  
  // FAQ Schema
  const faqSchema = tool.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Software Application Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": tool.description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return {
    title: title,
    description: description,
    keywords: tool.seo.keywords?.join(", "),
    openGraph: {
      title: title,
      description: description,
      url: canonicalUrl,
      type: "website",
      siteName: "India Toolkit",
      images: [
        {
          url: `/api/og?tool=${tool.slug}&title=${encodeURIComponent(tool.name)}`,
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [`/api/og?tool=${tool.slug}&title=${encodeURIComponent(tool.name)}`],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      "application/ld+json": JSON.stringify([softwareSchema, faqSchema].filter(Boolean))
    }
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const category = getCategoryBySlug(tool.category);
  const categories = getAllCategories();
  const allTools = getAllTools();
    
  // Generate SEO content
  const seoContent = generateSeoContent(tool);
  const dynamicFaqs = generateFaqsByType(tool);
    
  // @ts-ignore
  const CategoryIcon = Icons[category?.icon || "Folder"] || Icons.Folder;
  
  return (
    <div className="bg-[#fcfdfe] min-h-screen pb-24 relative overflow-hidden" style={{ "--accent-color": category?.color } as any}>
      {/* Immersive Background Glow */}
      <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none -z-10 overflow-hidden">
        <div 
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] blur-[160px] rounded-full opacity-[0.12]"
          style={{ backgroundColor: category?.color }}
        ></div>
        <div 
          className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] blur-[140px] rounded-full opacity-[0.08]"
          style={{ backgroundColor: category?.color }}
        ></div>
        <div 
          className="absolute top-[40%] left-[20%] w-[40%] h-[40%] blur-[120px] rounded-full opacity-[0.05]"
          style={{ backgroundColor: category?.color }}
        ></div>
      </div>
  
        
  
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 pt-25">
        {/* Row 1: Top Navigation & Controls Bar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-16 relative">
          <nav className="flex items-center gap-5 bg-white/50 backdrop-blur-lg p-3 px-8 rounded-[10px] border border-slate-200/50 shadow-sm hover:border-blue-200 transition-colors group/nav">
            <Link href="/" className="text-slate-400 hover:text-blue-600 transition-all hover:scale-125">
              <Home className="h-5 w-4" />
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-300 group-hover/nav:translate-x-1 transition-transform" />
            <Link href={`/category/${tool.category}`} className="text-sm font-black uppercase tracking-[0.3em] text-slate-500 hover:text-slate-900 transition-colors">
              {category?.name}
            </Link>
          </nav>
            
          <div className="flex items-center gap-6  ">
            <div className="flex flex-col items-end">
                
              <div className="scale-110 origin-right">
                <ToolSwitcher categories={categories} tools={allTools} currentToolSlug={tool.slug} filterByCategory={tool.category} />
              </div>
            </div>
            <div className="h-12 w-px bg-slate-200 mx-2"></div>
            <div className="flex flex-col items-center">
               <div className="scale-110">
                <ToolActions tool={tool} />
              </div>
            </div>
          </div>
        </div>
  
        {/* Row 2: Mid-Center Integrated Identity */}
        <div className="flex flex-col items-center text-center mb-16 max-w-4xl mx-auto group">
           <div className="relative mb-8">
              <div 
                className="absolute -inset-6 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
                style={{ backgroundColor: category?.color }}
              ></div>
              <div 
                className="relative h-24 w-24 rounded-[32px] flex items-center justify-center text-white shadow-2xl border-4 border-white transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500"
                style={{ 
                  background: `linear-gradient(145deg, ${category?.color}, ${category?.color}cc)`
                }}
              >
                <CategoryIcon className="h-11 w-11 stroke-[2.5]" />
              </div>
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none mb-5 flex items-center gap-4">
              {tool.name}
              {tool.isPopular && (
                <div className="bg-amber-400 text-white p-1.5 rounded-xl shadow-lg shadow-amber-500/30 animate-bounce">
                  <Zap className="h-5 w-5 fill-current" />
                </div>
              )}
           </h1>
           <p className="text-sm md:text-lg text-slate-400 font-bold uppercase tracking-[0.15em] italic max-w-3xl leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
              {tool.description}
           </p>
             
          
        </div>

        {/* Responsive 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar: Navigation & Context */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-5 flex items-center gap-2">
                <Layout className="h-4 w-4 text-blue-600" /> Category Hub
              </h4>
              <div className="space-y-2">
                {allTools
                  .filter(t => t.category === tool.category && t.slug !== tool.slug)
                  .slice(0, 8)
                  .map(t => (
                    <Link 
                      key={t.slug}
                      href={`/tool/${t.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all group"
                    >
                      <div className="h-7 w-7 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-white transition-all shadow-sm">
                         <Star className="h-3.5 w-3.5 text-slate-300 group-hover:text-amber-500" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight group-hover:text-slate-900 truncate">{t.name}</span>
                    </Link>
                  ))}
              </div>
            </div>

            <div className="bg-slate-900 p-7 rounded-[36px] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 h-20 w-20 bg-blue-600/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-5 text-blue-400">Security Stack</h4>
              <ul className="space-y-4">
                {[
                  { icon: ShieldCheck, label: "Local-First", color: "text-emerald-500" },
                  { icon: Zap, label: "Zero Latency", color: "text-amber-500" },
                  { icon: Info, label: "Private Buffer", color: "text-blue-500" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                    <item.icon className={`h-4 w-4 ${item.color}`} /> {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Tool Area: Max Real Estate */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <div className="relative group">
              <div 
                className="absolute -inset-1 rounded-[42px] blur-md opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                style={{ backgroundColor: category?.color }}
              ></div>
              <div className="relative bg-white rounded-[40px] border-2 border-slate-100 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.1)] overflow-hidden min-h-[550px]">
                <div className="p-6 md:p-10">
                  <ToolRenderer tool={tool} />
                </div>
              </div>
            </div>

            {/* Tool Meta Info */}
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full" style={{ backgroundColor: category?.color }}></div>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">Technical Specifications</h2>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-8 italic opacity-80">
                {tool.description} This engine utilizes optimized Javascript algorithms to process data directly in your browser session.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-slate-100">
                {[
                  { label: "Operation Type", value: tool.type },
                  { label: "Processing", value: "Edge Runtime" },
                  { label: "Security", value: "SSL Verified" },
                  { label: "Stability", value: "High" }
                ].map((item, i) => (
                  <div key={i} className="group">
                    <span className="block text-[10px] font-black text-slate-300 uppercase mb-2 tracking-widest group-hover:text-blue-500 transition-colors">{item.label}</span>
                    <span className="block text-xs font-black text-slate-900 uppercase italic">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Actions & Status */}
          <div className="lg:col-span-3 space-y-6 order-3">
            <div className="bg-slate-900 p-10 rounded-[48px] text-white relative overflow-hidden group shadow-2xl">
               <div 
                  className="absolute -right-10 -top-10 w-48 h-48 rounded-full blur-[80px] opacity-30 transition-transform duration-1000 group-hover:scale-150"
                  style={{ backgroundColor: category?.color }}
                ></div>
              <div className="relative z-10 text-center">
                <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 mx-auto backdrop-blur-md">
                   <Zap className="h-6 w-6 text-amber-400 fill-current" />
                </div>
                <h4 className="text-2xl font-black mb-1 uppercase italic leading-none tracking-tighter">OMNITOOLS PRO</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-8">Unlimited Processing</p>
                <Link 
                  href="/pricing" 
                  className="flex items-center justify-center gap-3 w-full py-5 bg-white text-slate-900 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl group/btn"
                >
                  UPGRADE NOW <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
                
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
               <h5 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-900 mb-6 flex items-center justify-between">
                 DIAGNOSTICS
                 <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
               </h5>
               <div className="space-y-6">
                  {[
                    { label: "Engine Velocity", color: "bg-blue-600", val: "98%", status: "Optimal" },
                    { label: "Secure Buffer", color: "bg-emerald-600", val: "100%", status: "Locked" }
                  ].map((s, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <span>{s.label}</span>
                        <span className="text-slate-900 italic">{s.status}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${s.color} rounded-full`} style={{ width: s.val }}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Quick FAQ */}
            <div className="space-y-5">
              {/* Show both static FAQs from the tool data and generated FAQs */}
              {[...tool.faqs.slice(0, 1), ...dynamicFaqs.slice(0, 1)].map((faq, i) => (
                <div key={i} className="bg-white p-7 rounded-[36px] border border-slate-100 shadow-sm hover:border-blue-200 transition-colors group">
                  <h4 className="font-black text-[11px] text-slate-900 uppercase mb-3 italic flex items-start gap-2 leading-tight tracking-tight">
                    <span className="h-2 w-2 rounded-full bg-blue-600 mt-1 shrink-0 group-hover:scale-150 transition-transform"></span> {faq.question}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed pl-4">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
              

        {/* Global Similar Tools Footer */}
        <div className="mt-16 pt-16 border-t border-slate-200/60">
          <ToolGrid 
            tools={allTools.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 4)} 
            categories={categories}
            title="Next Level Operations"
            subtitle="Power Grid"
          />
        </div>

         {/* Enhanced SEO Content Cards Section */}
           <div className="w-full mt-16 max-w-7xl mx-auto px-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* About Card - Enhanced */}
               <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-3xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
                 <div className="flex items-center gap-4 mb-6">
                   <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                     <Info className="h-6 w-6 text-white" />
                   </div>
                   <h2 className="text-2xl font-black text-slate-800 tracking-tight">About {tool.name}</h2>
                 </div>
                 <p className="text-slate-600 text-base leading-relaxed mb-6">
                   {seoContent.introduction}
                 </p>
                 <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-base font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                   Learn More
                 </button>
               </div>
           
               {/* How to Use Card - Enhanced */}
               <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-3xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
                 <div className="flex items-center gap-4 mb-6">
                   <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                     <Zap className="h-6 w-6 text-white" />
                   </div>
                   <h2 className="text-2xl font-black text-slate-800 tracking-tight">How to Use</h2>
                 </div>
                 <p className="text-slate-600 text-base leading-relaxed mb-6">
                   {seoContent.howToUse}
                 </p>
                 <button className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-base font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                   Get Started
                 </button>
               </div>
           
               {/* Features Card - Enhanced */}
               <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-3xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
                 <div className="flex items-center gap-4 mb-6">
                   <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                     <Star className="h-6 w-6 text-white" />
                   </div>
                   <h2 className="text-2xl font-black text-slate-800 tracking-tight">Key Features</h2>
                 </div>
                 <ul className="text-slate-600 text-base space-y-3 mb-6">
                   {seoContent.benefits.slice(0, 4).map((benefit, index) => (
                     <li key={index} className="flex items-start gap-3">
                       <span className="text-green-500 mt-1.5 flex-shrink-0">
                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                         </svg>
                       </span>
                       <span className="leading-relaxed">{benefit}</span>
                     </li>
                   ))}
                 </ul>
                 <button className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl text-base font-bold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                   View All Features
                 </button>
               </div>
             </div>
           
             {/* Enhanced FAQ Section */}
             <div className="mt-20">
               <div className="text-center mb-12">
                 <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Frequently Asked Questions</h2>
                 <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                 {[...tool.faqs.slice(0, 1), ...dynamicFaqs.slice(0, 3)].map((faq, i) => (
                   <div key={i} className="bg-white p-7 rounded-2xl border border-slate-200/50 shadow-md hover:shadow-lg transition-all duration-300 group hover:border-blue-300 hover:-translate-y-1">
                     <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 mt-1">
                         <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                           <span className="text-blue-600 font-bold text-sm">Q</span>
                         </div>
                       </div>
                       <div>
                         <h3 className="font-bold text-slate-800 text-lg mb-3 group-hover:text-blue-600 transition-colors">
                           {faq.question}
                         </h3>
                         <p className="text-slate-600 text-base leading-relaxed">
                           {faq.answer}
                         </p>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </div>
      </div>
    </div>
  );
}
