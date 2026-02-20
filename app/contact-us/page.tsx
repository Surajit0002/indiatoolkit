import { Mail, Phone, MapPin, Clock, Send, User, MessageSquare, Building } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact Us - India Toolkit",
  description: "Get in touch with India Toolkit. We're here to help Indian professionals with any questions or feedback.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-green-50 pt-24 pb-16">
      <div className="container px-4 max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
            Get In <span className="text-transparent bg-clip-text bg-linear-to-r from-green-600 to-emerald-600">Touch</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We&apos;re here to help Indian professionals succeed. Reach out anytime!
          </p>
        </section>

        {/* Contact Methods */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center hover:shadow-xl transition-all">
            <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-black text-slate-900 mb-3">Email Us</h3>
            <p className="text-slate-600 mb-4">For general inquiries and support</p>
            <Link 
              href="mailto:support@indiatoolkit.com" 
              className="text-green-600 font-bold hover:text-green-700 transition-colors"
            >
              support@indiatoolkit.com
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center hover:shadow-xl transition-all">
            <Phone className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-black text-slate-900 mb-3">Call Us</h3>
            <p className="text-slate-600 mb-4">For immediate assistance</p>
            <Link 
              href="tel:+919876543210" 
              className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
            >
              +91 98765 43210
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center hover:shadow-xl transition-all">
            <MapPin className="h-12 w-12 text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-black text-slate-900 mb-3">Visit Office</h3>
            <p className="text-slate-600 mb-4">Our headquarters in Bangalore</p>
            <p className="text-slate-700 font-bold">
              Manyata Tech Park<br />
              Bangalore, Karnataka 560045
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-3">Send us a Message</h2>
            <p className="text-slate-600">Have questions about our Indian-focused tools? We&apos;re happy to help!</p>
          </div>

          <form className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wider">
                Subject
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  id="subject"
                  placeholder="What's this regarding?"
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wider">
                Your Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us how we can help you..."
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <Send className="h-5 w-5" />
              Send Message
            </button>
          </form>
        </section>

        {/* Business Hours */}
        <section className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Clock className="h-6 w-6 text-green-600" />
              Business Hours
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-bold text-slate-700">Monday - Friday</span>
                <span className="text-slate-600">9:00 AM - 6:00 PM IST</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-bold text-slate-700">Saturday</span>
                <span className="text-slate-600">10:00 AM - 2:00 PM IST</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-bold text-slate-700">Sunday</span>
                <span className="text-slate-600">Closed</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Building className="h-6 w-6 text-emerald-600" />
              Quick Links
            </h3>
            <div className="space-y-3">
              <Link href="/tools" className="block py-2 text-slate-700 hover:text-green-600 font-bold transition-colors">
                → Browse All Tools
              </Link>
              <Link href="/about-india" className="block py-2 text-slate-700 hover:text-green-600 font-bold transition-colors">
                → About India Toolkit
              </Link>
              <Link href="/faq" className="block py-2 text-slate-700 hover:text-green-600 font-bold transition-colors">
                → Frequently Asked Questions
              </Link>
              <Link href="/support" className="block py-2 text-slate-700 hover:text-green-600 font-bold transition-colors">
                → Technical Support
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}