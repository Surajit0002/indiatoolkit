import Link from "next/link";
import { ArrowRight, Users, Globe, Award, Lightbulb, Heart, Leaf, Mountain, Coffee, Calendar, MapPin, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "About India - India Toolkit",
  description: "Learn about India Toolkit's mission to empower Indian professionals with free online tools and utilities.",
};

export default function AboutIndiaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 pt-24 pb-16">
      <div className="container px-4 max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full mb-8">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Made for India</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
            Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">India</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            India Toolkit is India's premier online platform providing free, powerful tools for professionals, 
            students, and creators across the nation.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Our Mission</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                We believe every Indian professional deserves access to world-class tools without barriers. 
                India Toolkit bridges the gap by providing 100+ free utilities that work seamlessly 
                for the unique needs of Indian users.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                From currency converters that understand rupees to calculators for Indian tax systems, 
                we're building tools that speak the language of India's diverse workforce.
              </p>
              <Link 
                href="/tools" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Explore Our Tools <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-2xl">
                  <Users className="h-10 w-10 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-black text-slate-900">500K+</div>
                  <div className="text-sm text-slate-600 font-bold">Monthly Users</div>
                </div>
                <div className="text-center p-6 bg-emerald-50 rounded-2xl">
                  <Globe className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
                  <div className="text-2xl font-black text-slate-900">100+</div>
                  <div className="text-sm text-slate-600 font-bold">Indian Tools</div>
                </div>
                <div className="text-center p-6 bg-teal-50 rounded-2xl">
                  <Award className="h-10 w-10 text-teal-600 mx-auto mb-3" />
                  <div className="text-2xl font-black text-slate-900">100%</div>
                  <div className="text-sm text-slate-600 font-bold">Free Forever</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-2xl">
                  <Lightbulb className="h-10 w-10 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-black text-slate-900">24/7</div>
                  <div className="text-sm text-slate-600 font-bold">Availability</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Indian Values, Global Standards</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Built with the spirit of innovation that defines modern India
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all">
              <Leaf className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-black text-slate-900 mb-3">Swadeshi Spirit</h3>
              <p className="text-slate-600">
                Made in India, for India. Every tool is designed with Indian users in mind, 
                respecting our unique needs and workflows.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all">
              <Mountain className="h-10 w-10 text-emerald-600 mb-4" />
              <h3 className="text-xl font-black text-slate-900 mb-3">Diverse & Inclusive</h3>
              <p className="text-slate-600">
                From Mumbai startups to rural entrepreneurs, our tools serve the breadth 
                of India's professional landscape.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all">
              <Coffee className="h-10 w-10 text-teal-600 mb-4" />
              <h3 className="text-xl font-black text-slate-900 mb-3">Jugaad Innovation</h3>
              <p className="text-slate-600">
                Smart, efficient solutions that work with India's unique infrastructure 
                and connectivity challenges.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white rounded-3xl p-12 shadow-xl border border-slate-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Connect With Us</h2>
            <p className="text-slate-600">
              Have ideas for new Indian-focused tools? We'd love to hear from you!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Mail className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Email Us</h3>
              <p className="text-slate-600">hello@indiatoolkit.com</p>
            </div>
            
            <div className="text-center">
              <Phone className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Call Us</h3>
              <p className="text-slate-600">+91 98765 43210</p>
            </div>
            
            <div className="text-center">
              <MapPin className="h-8 w-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Visit Us</h3>
              <p className="text-slate-600">Bangalore, India</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}