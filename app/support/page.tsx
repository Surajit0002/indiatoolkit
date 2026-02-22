'use client';
import React from 'react';
import { LifeBuoy, MessageCircle, Mail, Phone, HelpCircle, FileText, Lightbulb, Wrench, Activity, Search } from 'lucide-react';

export default function SupportPage() {
  const [activeTab, setActiveTab] = React.useState('help-center');
  const [searchTerm, setSearchTerm] = React.useState('');

  const faqs = [
    { id: 1, question: 'How do I reset my password?', category: 'Account', answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page.' },
    { id: 2, question: 'Is my data secure?', category: 'Security', answer: 'Yes, all your data is encrypted and stored securely. We never share your information with third parties.' },
    { id: 3, question: 'Can I cancel my subscription anytime?', category: 'Billing', answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.' },
    { id: 4, question: 'How do I contact support?', category: 'General', answer: 'You can contact our support team through live chat, email, or phone during business hours.' },
    { id: 5, question: 'Do you offer refunds?', category: 'Billing', answer: 'We offer a 30-day money-back guarantee for all paid plans. Contact support for refund requests.' },
  ];

  const contactOptions = [
    { id: 1, title: 'Live Chat', description: 'Get instant help from our support team', icon: MessageCircle, color: 'from-blue-500 to-cyan-600', responseTime: 'Under 2 minutes' },
    { id: 2, title: 'Email Support', description: 'Send us a detailed message', icon: Mail, color: 'from-green-500 to-teal-600', responseTime: 'Within 24 hours' },
    { id: 3, title: 'Phone Support', description: 'Speak directly with a support agent', icon: Phone, color: 'from-purple-500 to-indigo-600', responseTime: 'Immediate' },
    { id: 4, title: 'Submit a Ticket', description: 'Create a support ticket for complex issues', icon: FileText, color: 'from-orange-500 to-red-600', responseTime: 'Within 4 hours' },
  ];

  const resources = [
    { title: 'Getting Started Guide', description: 'Learn how to use our platform', icon: Lightbulb, category: 'Beginner', color: 'from-yellow-500 to-amber-600' },
    { title: 'API Documentation', description: 'Detailed API reference and examples', icon: FileText, category: 'Developer', color: 'from-blue-500 to-indigo-600' },
    { title: 'Video Tutorials', description: 'Step-by-step video guides', icon: FileText, category: 'Visual Learner', color: 'from-green-500 to-teal-600' },
    { title: 'Troubleshooting Guide', description: 'Solutions to common issues', icon: Wrench, category: 'Problem Solver', color: 'from-red-500 to-pink-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-8">
            <LifeBuoy className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Support Center
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            We&apos;re here to help you succeed. Get answers to your questions and connect with our support team.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'help-center', label: 'Help Center', icon: HelpCircle },
            { id: 'contact', label: 'Contact Us', icon: MessageCircle },
            { id: 'resources', label: 'Resources', icon: FileText },
            { id: 'status', label: 'System Status', icon: Activity },
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'bg-white text-slate-600 hover:bg-purple-50 border border-slate-200'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search support..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'help-center' && (
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3">{faq.question}</h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-6">Contact Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {contactOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <div key={option.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${option.color} flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-black text-slate-900 mb-2">{option.title}</h3>
                        <p className="text-slate-600 mb-3">{option.description}</p>
                        <div className="text-sm text-slate-500">Response time: {option.responseTime}</div>
                        <button className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-bold hover:shadow-md transition-all">
                          Get Help
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What is this regarding?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder="Describe your issue in detail..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-6">Learning Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => {
                const IconComponent = resource.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${resource.color} flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            {resource.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">{resource.title}</h3>
                        <p className="text-slate-600 mb-4">{resource.description}</p>
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-bold hover:shadow-md transition-all">
                          Access Resource
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'status' && (
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-6">System Status</h2>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
                <h3 className="text-xl font-black text-slate-900">All Systems Operational</h3>
              </div>
              <p className="text-slate-600 mb-6">No incidents reported in the last 24 hours. Our services are running smoothly.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Website', status: 'Operational', uptime: '99.99%' },
                  { name: 'API', status: 'Operational', uptime: '99.98%' },
                  { name: 'Database', status: 'Operational', uptime: '99.97%' },
                ].map((service, index) => (
                  <div key={index} className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-900">{service.name}</h4>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-sm text-slate-600">{service.status}</div>
                    <div className="text-xs text-slate-500">Uptime: {service.uptime}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="text-lg font-black text-slate-900 mb-4">Recent Incidents</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">Minor API delay resolved</h4>
                    <p className="text-sm text-slate-600">Resolved • Feb 1, 2026, 10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">Scheduled maintenance</h4>
                    <p className="text-sm text-slate-600">Completed • Jan 30, 2026, 2:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}