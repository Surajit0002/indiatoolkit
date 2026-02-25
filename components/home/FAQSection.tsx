'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CircleHelp, ChevronDown, ArrowRight } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
      <summary 
        className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none hover:bg-slate-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-slate-900 pr-4">{question}</span>
        <ChevronDown className={`h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-all duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </summary>
      <div className={`px-5 md:px-6 pb-5 md:pb-6 text-slate-500 font-medium leading-relaxed transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
        {answer}
      </div>
    </div>
  );
}

export default function FAQSection() {
  const faqs = [
    {
      q: 'Are all tools really free?',
      a: 'Yes! All 500+ tools are completely free to use. No hidden fees, no premium tiers, no subscription required.'
    },
    {
      q: 'Is my data safe?',
      a: 'Absolutely. All processing happens locally in your browser. Your data never leaves your device and is not stored on our servers.'
    },
    {
      q: 'Do I need to create an account?',
      a: 'No account required! You can use all tools instantly without signing up. Create an account to save your preferences and history.'
    },
    {
      q: 'Can I use tools on mobile?',
      a: 'Yes! All tools are fully responsive and work perfectly on desktop, tablet, and mobile devices.'
    },
    {
      q: 'How often are new tools added?',
      a: 'We add new tools every week based on user feedback and requests. Stay tuned for exciting new features!'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-5 md:mb-6 border border-slate-200 shadow-sm">
              <CircleHelp className="h-4 w-4 text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
          </div>

          {/* FAQ List */}
          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-8">
            <Link 
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              View All FAQs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
