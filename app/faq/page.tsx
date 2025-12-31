export const metadata = {
  title: "Frequently Asked Questions - OMNITOOLS",
  description: "Find answers to common questions about using OMNITOOLS, security, and privacy.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Is OMNITOOLS really free?",
      a: "Yes, 100% free. We believe in providing essential digital tools without barriers. We may offer premium 'Pro' features in the future for power users, but our core tools will always remain free."
    },
    {
      q: "Are my files and data secure?",
      a: "Absolutely. Most of our tools process data entirely within your browser using JavaScript. This means your data never leaves your computer. For tools that require server processing, we use encrypted connections and never store your data permanently."
    },
    {
      q: "Do I need to create an account?",
      a: "No account is required to use any of our tools. However, creating a free account allows you to save your favorite tools, view your usage history, and sync preferences across devices."
    },
    {
      q: "How can I request a new tool?",
      a: "We love tool suggestions! Please use our contact page or join our community Discord to suggest new features or tools you'd like to see on the platform."
    },
    {
      q: "Can I use these tools for commercial work?",
      a: "Yes, all tools on OMNITOOLS are free to use for both personal and commercial projects without any attribution required."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-indigo-400/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="py-24 relative overflow-hidden text-center">
        <div className="container px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest">Help Center</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-slate-900 leading-none">
            Common <span className="text-indigo-600">Questions</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Everything you need to know about OMNITOOLS and how we handle your data.
          </p>
        </div>
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card p-8 group hover:translate-x-2 transition-all duration-300 cursor-pointer">
              <div className="flex gap-6">
                <div className="h-10 w-10 shrink-0 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform">
                   {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-indigo-600 transition-colors leading-tight">
                    {faq.q}
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="glass-card p-12 inline-block max-w-2xl border-dashed">
             <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Still have questions?</h2>
             <p className="text-slate-500 font-medium mb-8">We're here to help. Reach out to our support team or join our community.</p>
             <button className="brutal-btn bg-indigo-600 hover:bg-indigo-700">Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}
