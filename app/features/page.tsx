import { Zap, Shield, Globe, Users, IndianRupee, Calendar, FileText, Code, Image, BarChart3, Lock, Rocket, Star, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Features - India Toolkit",
  description: "Discover the powerful features of India Toolkit designed specifically for Indian professionals and businesses.",
};

export default function FeaturesPage() {
  const features = [
    {
      icon: IndianRupee,
      title: "Indian Currency Support",
      description: "Built-in support for INR with real-time exchange rates and Indian tax calculations",
      highlights: ["GST Calculator", "Rupee formatting", "Indian banking tools"]
    },
    {
      icon: Calendar,
      title: "India-Centric Date Formats",
      description: "Support for Indian date formats and timezone handling across all tools",
      highlights: ["DD/MM/YYYY format", "IST timezone", "Indian holidays"]
    },
    {
      icon: FileText,
      title: "Indian Document Tools",
      description: "Specialized tools for Indian document formats and requirements",
      highlights: ["Aadhaar validation", "PAN card tools", "Indian resume builder"]
    },
    {
      icon: Code,
      title: "Local Processing",
      description: "All processing happens in your browser - your data never leaves India",
      highlights: ["100% client-side", "No server storage", "Bank-level security"]
    },
    {
      icon: Image,
      title: "Indian Media Tools",
      description: "Optimized for Indian internet speeds and popular Indian platforms",
      highlights: ["WhatsApp optimized", "Regional language support", "Fast loading"]
    },
    {
      icon: BarChart3,
      title: "Business Analytics",
      description: "Indian business metrics and reporting tools for MSMEs and startups",
      highlights: ["GST reports", "Indian accounting", "Business valuation"]
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for Indian internet speeds with minimal data usage"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays on your device - we never store personal information"
    },
    {
      icon: Globe,
      title: "100% Free",
      description: "No subscriptions, no hidden fees - forever free for Indian users"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by Indians, for Indians - shaped by your feedback"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-green-50 pt-24 pb-16">
      <div className="container px-4 max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full mb-8">
            <Star className="h-4 w-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Indian Innovation</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
            Powerful <span className="text-transparent bg-clip-text bg-linear-to-r from-green-600 to-emerald-600">Features</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Designed specifically for Indian professionals, businesses, and creators. 
            Every feature solves real problems faced by Indians every day.
          </p>
        </section>

        {/* Main Features Grid */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all group"
                >
                  <div className="h-14 w-14 bg-linear-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{feature.description}</p>
                  
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span className="text-sm font-bold text-slate-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Why India Toolkit Stands Out</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Built with the unique needs of Indian professionals in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 text-center hover:shadow-xl transition-all group"
                >
                  <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition-colors">
                    <IconComponent className="h-6 w-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-black text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Technical Excellence */}
        <section className="bg-white rounded-3xl shadow-xl border border-slate-100 p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Technical Excellence</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Built with cutting-edge technology that ensures reliability, speed, and security 
                for all Indian users across different devices and network conditions.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Rocket className="h-5 w-5 text-green-600" />
                  <span className="font-bold text-slate-700">Progressive Web App</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-emerald-600" />
                  <span className="font-bold text-slate-700">Military-Grade Encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-teal-600" />
                  <span className="font-bold text-slate-700">Offline Capabilities</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-green-500" />
                  <span className="font-bold text-slate-700">Works on 2G Networks</span>
                </div>
              </div>
            </div>
            
            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-green-500 to-emerald-600 rounded-2xl mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Performance Metrics</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold text-slate-700">Load Time</span>
                    <span className="text-sm font-black text-green-600">Under 2 seconds</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-green-500 to-emerald-600 rounded-full w-[95%]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold text-slate-700">Uptime</span>
                    <span className="text-sm font-black text-green-600">99.9%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-green-500 to-emerald-600 rounded-full w-[99.9%]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold text-slate-700">User Satisfaction</span>
                    <span className="text-sm font-black text-green-600">4.9/5</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-green-500 to-emerald-600 rounded-full w-[98%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-6">Ready to Transform Your Workflow?</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of Indian professionals who trust India Toolkit for their daily tasks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/tools" 
              className="px-8 py-4 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Zap className="h-5 w-5" />
              Explore All Tools
            </Link>
            <Link 
              href="/about-india" 
              className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl border-2 border-slate-200 hover:border-green-500 transition-all flex items-center justify-center gap-2"
            >
              Learn More About Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}