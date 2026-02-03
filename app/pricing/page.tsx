import { Check, X, Crown, Zap, Star, IndianRupee, Calendar, Users, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Pricing - India Toolkit",
  description: "India Toolkit is 100% free for all Indian professionals. No subscriptions, no hidden fees.",
};

export default function PricingPage() {
  const freeFeatures = [
    "100+ Professional Tools",
    "Unlimited Usage",
    "No Registration Required",
    "Bank-Level Security",
    "Works Offline",
    "Indian Currency Support",
    "24/7 Availability",
    "Regular Updates",
    "Community Support"
  ];

  const comingSoonFeatures = [
    "Team Collaboration",
    "Advanced Analytics",
    "Custom Workflows",
    "API Access",
    "Priority Support"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 pt-24 pb-16">
      <div className="container px-4 max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full mb-6">
            <IndianRupee className="h-4 w-4" />
            <span className="text-sm font-bold uppercase tracking-widest">100% Free Forever</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Free</span> for Everyone
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            India Toolkit believes in democratizing access to powerful tools. 
            That's why everything we offer is completely free for all Indian professionals.
          </p>
        </section>

        {/* Pricing Card */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-2xl border border-green-300 overflow-hidden">
            <div className="p-8 md:p-12 text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Crown className="h-5 w-5" />
                <span className="font-black uppercase tracking-widest">Premium Plan</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black mb-4">₹ 0</h2>
              <p className="text-xl md:text-2xl font-bold mb-2 opacity-90">Forever Free</p>
              <p className="text-green-100 mb-8 max-w-md mx-auto">
                Everything you need to boost your productivity as an Indian professional
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10 text-left">
                {freeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="font-bold">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                href="/tools" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-black rounded-xl hover:bg-green-50 transition-all text-lg"
              >
                Start Using Now <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Free Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Why We're Completely Free</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our mission is to empower every Indian professional with world-class tools
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-black text-slate-900 mb-3">Mission Driven</h3>
              <p className="text-slate-600">
                We're on a mission to democratize access to professional tools across India, 
                removing financial barriers for students and professionals.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center">
              <Award className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-black text-slate-900 mb-3">Community Powered</h3>
              <p className="text-slate-600">
                Our growth comes from user satisfaction and word-of-mouth. 
                Happy users are our best marketing strategy.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center">
              <Star className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-black text-slate-900 mb-3">Sustainable Model</h3>
              <p className="text-slate-600">
                We keep costs low through smart engineering and focus on building 
                the best tools rather than maximizing profits.
              </p>
            </div>
          </div>
        </section>

        {/* Future Premium Features */}
        <section className="bg-white rounded-3xl shadow-xl border border-slate-100 p-12 mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full mb-6">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-bold uppercase tracking-widest">Coming Soon</span>
            </div>
            
            <h2 className="text-3xl font-black text-slate-900 mb-4">Premium Features Roadmap</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              While everything is free today, we're building advanced features for teams and power users
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoonFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-green-300 transition-colors group"
              >
                <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors">
                  <Star className="h-6 w-6 text-slate-400 group-hover:text-green-600 transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{feature}</h3>
                <p className="text-sm text-slate-500">Will remain free for individual users</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10 pt-8 border-t border-slate-100">
            <p className="text-slate-600 mb-4">
              <strong>Promise:</strong> Individual access to all current and future tools will always be free
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full">
              <Check className="h-4 w-4" />
              <span className="font-bold">No credit card required ever</span>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">What Indian Professionals Say</h2>
            <p className="text-slate-600">Join thousands of satisfied users across India</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-4 italic">
                "As a startup founder in Bangalore, India Toolkit has saved me countless hours. 
                The GST calculator alone is worth its weight in gold!"
              </p>
              <div className="font-bold text-slate-900">Priya Sharma</div>
              <div className="text-sm text-slate-500">Founder, TechStart Bangalore</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-4 italic">
                "Being a student in Delhi, I can't afford expensive software. 
                India Toolkit gives me access to professional tools completely free!"
              </p>
              <div className="font-bold text-slate-900">Rahul Patel</div>
              <div className="text-sm text-slate-500">Engineering Student, Delhi University</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-4 italic">
                "The currency converter understands rupees perfectly and works offline too. 
                Perfect for my freelance work across different clients."
              </p>
              <div className="font-bold text-slate-900">Anjali Desai</div>
              <div className="text-sm text-slate-500">Freelance Designer, Mumbai</div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-12 text-white">
          <Calendar className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-black mb-4">Start Saving Time Today</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join 500,000+ Indian professionals who trust India Toolkit for their daily productivity needs
          </p>
          <Link 
            href="/tools" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-black rounded-xl hover:bg-green-50 transition-all text-lg"
          >
            <Zap className="h-5 w-5" />
            Get Started - It's Free!
          </Link>
        </section>
      </div>
    </div>
  );
}