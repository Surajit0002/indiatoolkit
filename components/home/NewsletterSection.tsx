'use client';

import React, { useState } from 'react';
import { Mail, Megaphone } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-30%] right-[-20%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-green-500/10 rounded-full blur-[80px] md:blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-30%] left-[-20%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-emerald-500/10 rounded-full blur-[60px] md:blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="h-14 md:h-16 w-14 md:w-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5 md:mb-6">
            <Mail className="h-7 md:h-8 w-7 md:w-8 text-green-400" />
          </div>
          
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Stay Updated
          </h2>
          
          {/* Description */}
          <p className="text-lg text-slate-300 font-medium mb-8">
            Subscribe to our newsletter and be the first to know about new tools, features, and updates.
          </p>
          
          {/* Subscribe Form - Mobile Responsive */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="flex-1 px-4 md:px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-green-500 transition-colors"
              required
            />
            <button 
              type="submit"
              className="px-5 md:px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Megaphone className="h-5 w-5" />
              Subscribe
            </button>
          </form>
          
          {/* Privacy Note */}
          <p className="text-xs text-slate-400 mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
