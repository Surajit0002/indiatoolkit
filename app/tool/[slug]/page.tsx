import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug, getCategoryBySlug, getAllCategories, getAllTools } from "@/lib/utils";
import { Star, Info, Zap, TrendingUp, Users, Clock, Heart, Share2, ChevronDown, ChevronUp } from "lucide-react";
import * as Icons from "lucide-react";
import ToolRenderer from "@/components/ToolRenderer";
import ToolSwitcher from "@/components/ToolSwitcher";
import DynamicToolGrid from "@/components/DynamicToolGrid";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import ToolActionsBar from "@/components/ToolActionsBar";
import { generateSeoContent, generateFaqsByType } from "@/lib/seo-content-generator";
import AnimatedCounter from "@/components/AnimatedCounter";

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
  
  // Get related tools
  const relatedTools = allTools
    .filter(t => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 6);
  
  const trendingTools = allTools
    .filter(t => t.isPopular && t.slug !== tool.slug)
    .slice(0, 6);
  
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

      {/* Interactive Hero Stats Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  <AnimatedCounter end={tool.usageCount || 125000} suffix="+" />
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  {tool.rating || 4.8}
                </span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  98% accuracy
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="hidden sm:flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-500" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  ~1s
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <button className="p-1.5 sm:p-2 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-500 transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="p-1.5 sm:p-2 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-500 transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
   
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pt-4 sm:pt-6">
        {/* Row 1: Top Navigation & Controls Bar - Mobile Responsive */}
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between md:gap-8 mb-6 sm:mb-8 relative">
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
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto group px-2 sm:px-0">
           <div className="relative mb-4 sm:mb-5 md:mb-6">
              <div 
                className="absolute -inset-4 sm:-inset-6 rounded-full blur-2xl sm:blur-3xl opacity-15 sm:opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
                style={{ backgroundColor: category?.color }}
              ></div>
              <div 
                className="relative h-14 w-14 sm:h-18 sm:w-18 md:h-22 md:w-22 rounded-2xl sm:rounded-3xl flex items-center justify-center text-white shadow-2xl border-2 sm:border-4 border-white transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500"
                style={{ 
                  background: `linear-gradient(135deg, ${category?.color} 0%, ${category?.color}dd 100%)`,
                  boxShadow: `0 20px 40px -12px ${category?.color}40`
                }}
              >
                <CategoryIcon className="h-7 w-7 sm:h-9 sm:w-9 md:h-11 md:w-11" />
              </div>
           </div>
           
           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 mb-3 sm:mb-4 tracking-tight">
             {tool.name}
           </h1>
           
           <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed mb-5 sm:mb-6">
             {tool.description}
           </p>
           
           <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
             {tool.aiPowered && (
               <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs sm:text-sm font-bold rounded-full shadow-md">
                 <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                 AI Powered
               </span>
             )}
             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-slate-700 text-xs sm:text-sm font-semibold rounded-full border border-slate-200 shadow-sm">
               <CategoryIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
               {category?.name}
             </span>
             {tool.isPopular && (
               <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm font-bold rounded-full shadow-md">
                 <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                 Trending
               </span>
             )}
           </div>
        </div>

        {/* Row 3: Main Tool Area */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-slate-200/50 shadow-xl overflow-hidden mb-10 sm:mb-12 md:mb-16">
          <ToolRenderer tool={tool} />
        </div>

        {/* Row 4: Related Tools with Carousel View */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <DynamicToolGrid 
            tools={relatedTools} 
            categories={categories}
            title="Related Tools"
            subtitle="You might also like"
            showStats={true}
            showViewToggle={true}
            showFilters={false}
            showSearch={false}
            showSort={false}
            defaultViewMode="carousel"
            columns={4}
            animateOnMount={true}
            cardStyle="glass"
            staggerDelay={true}
          />
        </div>

        {/* Row 5: Trending Tools */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <DynamicToolGrid 
            tools={trendingTools} 
            categories={categories}
            title="Trending Now"
            subtitle="Most popular tools"
            showStats={true}
            showViewToggle={true}
            showFilters={false}
            showSearch={false}
            showSort={false}
            defaultViewMode="carousel"
            columns={4}
            animateOnMount={true}
            cardStyle="default"
            staggerDelay={true}
          />
        </div>

        {/* Row 6: Cross-Category Recommendations */}
        <div className="mb-10 sm:mb-12 md:mb-16 pt-8 border-t border-slate-200/60">
          <DynamicToolGrid 
            tools={allTools.filter(t => t.category !== tool.category && t.isPopular).slice(0, 6)} 
            categories={categories}
            title="Popular in Other Categories"
            subtitle="Explore more"
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

        {/* Row 7: AI-Powered Tools Section (if current tool is not AI) */}
        {!tool.aiPowered && (
          <div className="mb-10 sm:mb-12 md:mb-16 pt-8 border-t border-slate-200/60">
            <DynamicToolGrid 
              tools={allTools.filter(t => t.aiPowered && t.slug !== tool.slug).slice(0, 4)} 
              categories={categories}
              title="AI-Enhanced Alternatives"
              subtitle="Try AI-powered version"
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

        {/* Row 8: Enhanced SEO Content Cards Section */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* About Card - Enhanced */}
            <div className="bg-gradient-to-br from-white to-slate-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div 
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)` }}
                >
                  <Info className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">About</h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                {seoContent.introduction}
              </p>
              <button className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm sm:text-base font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Learn More
              </button>
            </div>
        
            {/* How to Use Card - Enhanced */}
            <div className="bg-gradient-to-br from-white to-slate-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div 
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `linear-gradient(135deg, #22c55e 0%, #16a34a 100%)` }}
                >
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">How to Use</h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                {seoContent.howToUse}
              </p>
              <button className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-sm sm:text-base font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Get Started
              </button>
            </div>
        
            {/* Features Card - Enhanced */}
            <div className="bg-gradient-to-br from-white to-slate-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div 
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)` }}
                >
                  <Star className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">Features</h2>
              </div>
              <ul className="text-slate-600 text-sm sm:text-base space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
                {seoContent.benefits.slice(0, 4).map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2.5 sm:gap-3">
                    <span className="text-green-500 mt-0.5 sm:mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl text-sm sm:text-base font-bold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                View All Features
              </button>
            </div>
          </div>
        </div>

        {/* Row 9: Enhanced FAQ Section with Accordion */}
        <div className="mb-8 sm:mb-12">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 mb-3 sm:mb-4 tracking-tight">Frequently Asked Questions</h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Client-side FAQ accordion would go here - showing static for now */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[...tool.faqs.slice(0, 1), ...dynamicFaqs.slice(0, 3)].map((faq, i) => (
              <div 
                key={i} 
                className="bg-white p-5 sm:p-7 rounded-xl sm:rounded-2xl border border-slate-200/50 shadow-md hover:shadow-lg transition-all duration-300 group hover:border-blue-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                    <div className="h-7 sm:h-8 w-7 sm:w-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <span className="text-blue-600 font-bold text-xs sm:text-sm">Q</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
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
  );
}
