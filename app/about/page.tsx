import React from "react";
import { Shield, Zap, Users } from "lucide-react";

export const metadata = {
  title: "About Us - OMNITOOLS",
  description: "Learn more about OMNITOOLS, our mission to provide free, secure, and fast tools for everyone.",
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 mb-8">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">Meet the Team</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic text-slate-900 leading-[0.9]">
            Tools for the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Modern Era.</span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-bold leading-relaxed italic opacity-80">
            Omnitools started with a simple idea: making professional-grade digital tools 
            accessible to everyone, anywhere, for free.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Our Mission</h2>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              We believe that powerful tools shouldn&apos;t come with a high price tag or 
              privacy compromises. That's why we build tools that run directly in your 
              browser, ensuring your data never leaves your device.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="space-y-2">
                <div className="text-3xl font-black text-blue-600">50+</div>
                <div className="text-sm font-black text-gray-400 uppercase tracking-widest">Tools Created</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-black text-blue-600">100%</div>
                <div className="text-sm font-black text-gray-400 uppercase tracking-widest">Free Forever</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-black text-blue-600">0</div>
                <div className="text-sm font-black text-gray-400 uppercase tracking-widest">Data Collected</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-black text-blue-600">Secure</div>
                <div className="text-sm font-black text-gray-400 uppercase tracking-widest">Browser-Based</div>
              </div>
            </div>
          </div>
          <div className="bg-blue-600 rounded-[3rem] aspect-square flex items-center justify-center p-12 shadow-2xl shadow-blue-200 rotate-3">
            <div className="bg-white/10 w-full h-full rounded-[2rem] border-2 border-white/20 backdrop-blur-sm flex items-center justify-center">
               <Zap className="h-48 w-48 text-white fill-white animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="container px-4">
          <h2 className="text-4xl font-black text-center mb-16 tracking-tight">What Drives Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ValueCard 
              icon={<Shield className="h-8 w-8" />} 
              title="Privacy First" 
              description="Your data is your business. Most of our tools process data locally in your browser, so nothing is sent to our servers."
            />
            <ValueCard 
              icon={<Zap className="h-8 w-8" />} 
              title="Extreme Performance" 
              description="We build for speed. No heavy frameworks, no bloated libraries. Just clean, optimized code for instant results."
            />
            <ValueCard 
              icon={<Users className="h-8 w-8" />} 
              title="User Centric" 
              description="We listen to our community. Many of our most popular tools were requested by users just like you."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
      <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl w-fit mb-8 transition-transform group-hover:scale-110 group-hover:-rotate-3">
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4 tracking-tight">{title}</h3>
      <p className="text-gray-500 font-medium leading-relaxed">{description}</p>
    </div>
  );
}
