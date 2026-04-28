import React from 'react';
import { ArrowRight, Shield, Bolt, Gift, Lock, Star, Users, TrendingUp } from 'lucide-react';
import { Tool } from '@/types/tool';
import TrustSignals from '@/components/CTR/TrustSignals';
import InternalLinks from '@/components/seo/InternalLinks';

interface ToolPageTemplateProps {
  tool: Tool;
  children: React.ReactNode;
  allTools?: any[];
}

export default function ToolPageTemplate({ tool, children, allTools = [] }: ToolPageTemplateProps) {
  const category = tool.category || 'tools';
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace('-tools', ' Tools').replace('-', ' ');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section - CTR Optimized */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-16 md:py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
        </div>

        <div className="container px-4 mx-auto text-center relative z-10">
          {/* Trust Badge Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <Gift className="h-4 w-4 text-yellow-300" />
            <span className="text-sm font-bold">100% FREE</span>
            <span className="mx-2">•</span>
            <Shield className="h-4 w-4 text-green-300" />
            <span className="text-sm font-bold">NO SIGNUP</span>
            <span className="mx-2">•</span>
            <Bolt className="h-4 w-4 text-blue-300" />
            <span className="text-sm font-bold">INSTANT</span>
          </div>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-white/50"></span>
              {categoryName} Tool
            </span>
          </div>

          {/* Tool Icon */}
          <div 
            className="inline-flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-3xl mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: tool.accentColor || tool.backgroundColor || '#4f46e5' }}
            dangerouslySetInnerHTML={{
              __html: tool.svgIcon?.replace('<svg', `<svg fill="white" class="h-12 w-12 md:h-14 md:w-14 stroke-[2]`).replace('"#000000"', '"white"') || 
                     `<svg fill="none" class="h-12 w-12 md:h-14 md:w-14 stroke-[2]" viewBox="0 0 24 24"><circle fill="white" cx="12" cy="12" r="10"/></svg>`
            }}
          />

          {/* Hero Title - High CTR Format */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
            {tool.name}
          </h1>

          {/* Hero Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            {tool.description}
          </p>

          {/* Primary CTA Button */}
          <button className="group relative px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg md:text-xl hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-indigo-600/20 to-indigo-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            <span className="relative flex items-center gap-2">
              Start Now - 100% Free
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Live Stats Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-300" />
              <span className="font-bold text-white">{(tool.usageCount || 0).toLocaleString()}+ users</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
              <span className="font-bold text-white">{tool.rating || 4.8}★</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-300" />
              <span className="font-bold text-white">Trending</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Bolt className="h-4 w-4 text-white" />
              <span className="font-bold text-white">Instant Results</span>
            </div>
          </div>

          {/* Trending Badge for High Usage Tools */}
          {(tool.usageCount || 0) > 1000 && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full border border-red-500/30 animate-pulse">
              <span className="text-red-400 text-lg">🔥</span>
              <span className="text-red-300 font-bold text-sm uppercase tracking-wide">Trending Now</span>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="relative z-10 -mt-8 md:-mt-12 px-4">
        {/* Tool Interface Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          {children}
        </div>

        {/* Trust Signals Section */}
        <div className="max-w-4xl mx-auto mt-8">
          <TrustSignals variant="full" />
        </div>

        {/* How To Use Section */}
        <div className="max-w-4xl mx-auto mt-12 bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black text-center text-slate-900 mb-8">How to Use {tool.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="text-center">
                <div className="h-14 w-14 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                  <span className="h-8 w-8 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center">
                    {step}
                  </span>
                </div>
                <h3 className="font-black text-slate-900 mb-2">Step {step}</h3>
                <p className="text-slate-600 text-sm">
                  {step === 1 ? 'Enter your data or upload your file' :
                   step === 2 ? 'Configure settings if needed' :
                   'Get your results instantly'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bolt className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-black text-slate-900 mb-2">Lightning Fast</h3>
            <p className="text-slate-600 text-sm">Instant results without any waiting. Process in milliseconds.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-black text-slate-900 mb-2">100% Secure</h3>
            <p className="text-slate-600 text-sm">All processing in your browser. We never store your data.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
            <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Gift className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-black text-slate-900 mb-2">Completely Free</h3>
            <p className="text-slate-600 text-sm">No registration, no fees, no limits. Free for everyone.</p>
          </div>
        </div>

        {/* Internal Links Section */}
        {allTools.length > 0 && (
          <InternalLinks currentTool={tool} allTools={allTools} maxLinks={8} />
        )}
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto mt-12 bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
        <h2 className="text-2xl md:text-3xl font-black text-center text-slate-900 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {(tool.faqs || []).slice(0, 5).map((faq, index) => (
            <details key={index} className="group border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors">
              <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 transition-colors">
                <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{faq.question}</span>
                <span className="ml-6 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="px-5 pb-5 text-slate-600">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
