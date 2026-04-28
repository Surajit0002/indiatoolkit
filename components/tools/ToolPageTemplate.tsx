import React from 'react';
import { ArrowRight, Shield, Bolt, Gift, Star, Users, TrendingUp } from 'lucide-react';
import { Tool } from '@/types/tool';
import TrustSignals from '@/components/CTR/TrustSignals';
import InternalLinks from '@/components/seo/InternalLinks';

interface ToolPageTemplateProps {
  tool: Tool;
  children: React.ReactNode;
  allTools?: Tool[];
}

export default function ToolPageTemplate({ tool, children, allTools = [] }: ToolPageTemplateProps) {
  const category = tool.category || 'tools';
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace('-tools', ' Tools').replace('-', ' ');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section - Compact & Clean */}
      <section className={`bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-10 md:py-14 relative overflow-hidden`}>
        {/* Simple decorative accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>

        <div className="container px-4 mx-auto relative z-10">
          {/* Compact Top Badges - Centered */}
          <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-bold border border-white/10">
              <Gift className="h-3 w-3 text-yellow-300" />
              100% FREE
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-bold border border-white/10">
              <Shield className="h-3 w-3 text-green-300" />
              NO SIGNUP
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-bold border border-white/10">
              <Bolt className="h-3 w-3 text-blue-300" />
              INSTANT
            </span>
          </div>

          {/* Category & Title - Centered */}
          <div className="text-center mb-5">
            {/* Category Badge with Icon */}
            <div className="inline-flex items-center justify-center gap-2.5 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-sm font-semibold border border-white/20 mb-3">
              <div 
                className="h-5 w-5 rounded-md flex items-center justify-center"
                style={{ backgroundColor: tool.accentColor || tool.backgroundColor || '#4f46e5' }}
                dangerouslySetInnerHTML={{
                  __html: tool.svgIcon?.replace('<svg', `<svg fill="white" class="h-3 w-3 stroke-[2]"`).replace('"#000000"', '"white"') || 
                          `<svg fill="none" class="h-3 w-3 stroke-[2]" viewBox="0 0 24 24"><circle fill="white" cx="12" cy="12" r="10"/></svg>`
                }}
              />
              <span>{categoryName}</span>
            </div>

            {/* Main Title - Centered with Icon Badge */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                {tool.name}
              </h1>
            </div>

            {/* Subtitle - Centered */}
            <p className="text-sm md:text-base text-white/75 max-w-xl mx-auto leading-relaxed">
              {tool.description}
            </p>
          </div>

          {/* CTA Button - Centered */}
          <div className="flex justify-center mb-5">
            <button className="group relative px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold text-base md:text-lg hover:bg-gray-50 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-indigo-600/20 to-indigo-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
              <span className="relative flex items-center gap-1.5">
                Start Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Stats - Centered Compact Row */}
          <div className="flex items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-white/70">
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-green-300" />
              <span className="font-bold text-white">{(tool.usageCount || 0).toLocaleString()}+</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-yellow-300 fill-yellow-300" />
              <span className="font-bold text-white">{tool.rating || 4.8}★</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-blue-300" />
              <span className="font-medium">Trending</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Bolt className="h-3.5 w-3.5" />
              <span className="font-medium">Instant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="relative z-10 -mt-6 md:-mt-8 px-4 pb-12">
        {/* Tool Interface Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {children}
        </div>

        {/* Trust Signals - Compact */}
        <div className="max-w-4xl mx-auto mt-6">
          <TrustSignals variant="compact" />
        </div>

        {/* How To Use - Compact */}
        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-center text-slate-900 mb-6">
            How to Use {tool.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="text-center">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
                  <span className="h-6 w-6 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center text-sm">
                    {step}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1.5 text-sm md:text-base">Step {step}</h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                  {step === 1 ? 'Enter your data or upload your file' :
                   step === 2 ? 'Configure settings if needed' :
                   'Get your results instantly'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits - Compact Grid */}
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Bolt className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1.5 text-sm">Lightning Fast</h3>
            <p className="text-slate-600 text-xs leading-relaxed">Instant results without any waiting.</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1.5 text-sm">100% Secure</h3>
            <p className="text-slate-600 text-xs leading-relaxed">All processing in your browser.</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Gift className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1.5 text-sm">Completely Free</h3>
            <p className="text-slate-600 text-xs leading-relaxed">No registration, no fees, no limits.</p>
          </div>
        </div>

        {/* Internal Links */}
        {allTools.length > 0 && (
          <InternalLinks currentTool={tool} allTools={allTools} maxLinks={8} />
        )}

        {/* FAQ - Compact */}
        <section className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-center text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {(tool.faqs || []).slice(0, 5).map((faq, index) => (
              <details key={index} className="group border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 transition-colors">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">{faq.question}</span>
                  <span className="ml-4 text-sm transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="px-4 pb-4 text-slate-600 text-sm">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
