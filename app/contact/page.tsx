import { Mail, MessageSquare, MapPin, Send } from "lucide-react";

export const metadata = {
  title: "Contact Us - OMNITOOLS",
  description: "Have a question or a tool request? Get in touch with the OMNITOOLS team.",
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 mb-8">
            <MessageSquare className="h-4 w-4 text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">Support Center</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic text-slate-900 leading-[0.9]">
            Let&apos;s Start a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Conversation.</span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-bold leading-relaxed italic opacity-80">
            Have a bug to report? A tool to suggest? Or just want to say hi? 
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="container px-4 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8 flex flex-col justify-center">
            <ContactInfo 
              icon={<Mail className="h-6 w-6" />} 
              title="Email Us" 
              detail="hello@omnitools.example.com"
              sub="Support and inquiries"
            />
            <ContactInfo 
              icon={<MessageSquare className="h-6 w-6" />} 
              title="Community" 
              detail="Discord Server"
              sub="Join our developer chat"
            />
            <ContactInfo 
              icon={<MapPin className="h-6 w-6" />} 
              title="Headquarters" 
              detail="Remote-First"
              sub="Operated from Berlin, DE"
            />
          </div>

          <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Name</label>
                  <input type="text" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input type="email" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                <select className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none font-bold text-slate-600">
                  <option>Tool Request</option>
                  <option>Bug Report</option>
                  <option>Business Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
                <textarea rows={6} className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none" placeholder="Tell us what's on your mind..."></textarea>
              </div>
              <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-3">
                Send Message <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ icon, title, detail, sub }: { icon: any, title: string, detail: string, sub: string }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="p-4 bg-white rounded-2xl border border-gray-100 text-blue-600 shadow-sm">
        {icon}
      </div>
      <div>
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</h4>
        <div className="text-xl font-black text-gray-900">{detail}</div>
        <p className="text-sm font-medium text-gray-500">{sub}</p>
      </div>
    </div>
  );
}
