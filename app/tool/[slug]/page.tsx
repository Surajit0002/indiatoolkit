import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug, getCategoryBySlug, getAllCategories, getAllTools } from "@/lib/utils";
import { Star, Info, Zap } from "lucide-react";
import * as Icons from "lucide-react";
import ToolRenderer from "@/components/ToolRenderer";
import ToolSwitcher from "@/components/ToolSwitcher";
import DynamicToolGrid from "@/components/DynamicToolGrid";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import ToolActionsBar from "@/components/ToolActionsBar";
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
    
  // @ts-expect-error - Dynamic icon access
  const CategoryIcon = Icons[category?.icon || "Folder"] || Icons.Folder;
  
  return (
    <div className="bg-[#fcfdfe] min-h-screen pb-24 relative overflow-hidden" style={{ "--accent-color": category?.color } as React.CSSProperties}>
      {/* Immersive Background Glow */}
      <div className="absolute top-0 left-0 w-full h-200 pointer-events-none -z-10 overflow-hidden">
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
  
        
  
      <div className="max-w-400 mx-auto px-3 sm:px-4 md:px-10 pt-4 sm:pt-8 md:pt-16">
        {/* Row 1: Top Navigation & Controls Bar - Mobile Responsive */}
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between md:gap-8 mb-6 sm:mb-10 md:mb-16 relative">
          {/* Dynamic Breadcrumb - Smaller on Mobile */}
          <div className="block md:hidden">
            <DynamicBreadcrumb 
              items={category ? [{
                label: category.name,
                href: `/category/${category.slug}`,
                icon: category.icon,
                color: category.color,
              }] : []}
              variant="minimal"
            />
          </div>
          <div className="hidden md:block">
            <DynamicBreadcrumb 
              items={category ? [{
                label: category.name,
                href: `/category/${category.slug}`,
                icon: category.icon,
                color: category.color,
              }] : []}
              variant="full"
            />
          </div>
            
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 w-full md:w-auto">
            <div className="flex flex-col items-start md:items-end flex-1 md:flex-none">
              <div className="scale-90 sm:scale-100 md:scale-110 origin-left md:origin-right w-full md:w-auto">
                <ToolSwitcher categories={categories} tools={allTools} currentToolSlug={tool.slug} filterByCategory={tool.category} />
              </div>
            </div>
            <div className="h-8 sm:h-10 md:h-12 w-px bg-slate-200 mx-1 sm:mx-2 hidden sm:block"></div>
            
            {/* Tool Actions Bar - Share, Favorite, Currency */}
            <div className="hidden sm:block">
              <ToolActionsBar 
                tool={tool} 
                variant="compact"
                showCurrency={tool.type === 'calculator' || tool.type === 'converter'}
              />
            </div>
            
            {/* Mobile Actions - Minimal */}
            <div className="sm:hidden">
              <ToolActionsBar 
                tool={tool} 
                variant="minimal"
              />
            </div>
          </div>
        </div>
  
        {/* Row 2: Mid-Center Integrated Identity - Mobile Responsive */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12 md:mb-16 max-w-4xl mx-auto group px-2 sm:px-0">
           <div className="relative mb-4 sm:mb-6 md:mb-8">
              <div 
                className="absolute -inset-4 sm:-inset-6 rounded-full blur-2xl sm:blur-3xl opacity-15 sm:opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
                style={{ backgroundColor: category?.color }}
              ></div>
              <div 
                className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-2xl sm:rounded-3xl md:rounded-4xl flex items-center justify-center text-white shadow-2xl border-2 sm:border-4 border-white transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500"
                style={{ 
                  background: `linear-gradient(145deg, ${category?.color}, ${category?.color}cc)`
                }}
              >
                <CategoryIcon className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 stroke-[2.5]" />
              </div>
           </div>
           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none mb-3 sm:mb-4 md:mb-5 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="break-words">{tool.name}</span>
              {tool.isPopular && (
                <div className="bg-amber-400 text-white p-1 sm:p-1.5 rounded-lg sm:rounded-xl shadow-lg shadow-amber-500/30 animate-bounce">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                </div>
              )}
           </h1>
           <p className="text-xs sm:text-sm md:text-lg text-slate-400 font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] italic max-w-3xl leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity px-2 sm:px-4">
              {tool.description}
           </p>
        </div>

        {/* Full-Width Main Tool Area */}
        <div className="w-full">
          <div className="relative group">
            <div 
              className="absolute -inset-1 rounded-2xl sm:rounded-[42px] blur-md opacity-10 group-hover:opacity-20 transition-opacity duration-700 hidden sm:block"
              style={{ backgroundColor: category?.color }}
            ></div>
            <div className="relative bg-white rounded-2xl sm:rounded-3xl md:rounded-4xl border border-slate-100 sm:border-2 shadow-lg sm:shadow-[0_40px_80px_-40px_rgba(0,0,0,0.1)] overflow-hidden min-h-[70vh]">
              <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                <ToolRenderer tool={tool} />
              </div>
            </div>
          </div>
        </div>
              

        {/* Dynamic Similar Tools Section */}
        <div className="mt-16 pt-16 border-t border-slate-200/60">
          <DynamicToolGrid 
            tools={allTools.filter(t => t.category === tool.category && t.slug !== tool.slug)} 
            categories={categories}
            title="Related Tools"
            subtitle="Explore More"
            showStats={true}
            showViewToggle={true}
            showFilters={true}
            showSearch={true}
            showSort={true}
            maxItems={8}
            currentToolSlug={tool.slug}
            showQuickActions={true}
            enableComparison={true}
            animateOnMount={true}
            defaultViewMode="grid"
            columns={4}
          />
        </div>

        {/* Cross-Category Recommendations */}
        <div className="mt-20 pt-16 border-t border-slate-200/60">
          <DynamicToolGrid 
            tools={allTools.filter(t => t.category !== tool.category && t.isPopular).slice(0, 6)} 
            categories={categories}
            title="Popular in Other Categories"
            subtitle="Trending Now"
            showStats={true}
            showViewToggle={false}
            showFilters={false}
            showSearch={false}
            showSort={false}
            defaultViewMode="compact"
            columns={6}
            animateOnMount={true}
          />
        </div>

        {/* AI-Powered Tools Section (if current tool is not AI) */}
        {!tool.aiPowered && (
          <div className="mt-20 pt-16 border-t border-slate-200/60">
            <DynamicToolGrid 
              tools={allTools.filter(t => t.aiPowered && t.slug !== tool.slug).slice(0, 4)} 
              categories={categories}
              title="AI-Enhanced Alternatives"
              subtitle="Powered by AI"
              showStats={true}
              showViewToggle={false}
              showFilters={false}
              showSearch={false}
              showSort={false}
              defaultViewMode="grid"
              columns={4}
              animateOnMount={true}
              cardStyle="glass"
            />
          </div>
        )}

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
                   <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
