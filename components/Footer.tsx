import Link from "next/link";
import { categories } from "../data/categories";

const toolCategories = categories.slice(0, 6);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="w-full border-t bg-slate-50 py-16"
      role="contentinfo"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3" aria-label="India Toolkit - Home">
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white p-2 rounded-xl font-black text-lg shadow-lg">
                IT
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight uppercase italic">INDIA TOOLKIT</span>
                <span className="text-[8px] font-bold tracking-[0.3em] text-green-600 uppercase">India First</span>
              </div>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              Access 500+ free online tools including calculators, converters, text utilities, and development tools. Made for India.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-9 w-9 bg-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:bg-blue-500 hover:text-white transition-all"
                aria-label="Follow us on Twitter"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-9 w-9 bg-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all"
                aria-label="Follow us on Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-9 w-9 bg-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:bg-blue-700 hover:text-white transition-all"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Tool Categories */}
          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-900">Categories</h3>
            <ul className="space-y-3 text-sm" role="list">
              {toolCategories.map((category) => (
                <li key={category.slug}>
                  <Link 
                    href={`/category/${category.slug}`} 
                    className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-green-500 transition-colors"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/categories" className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
                  View All Categories <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-900">Popular Tools</h3>
            <ul className="space-y-3 text-sm" role="list">
              <li>
                <Link href="/tool/ai-image-generator" className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-green-500 transition-colors"></span>
                  AI Image Generator
                </Link>
              </li>
              <li>
                <Link href="/tool/json-formatter" className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-green-500 transition-colors"></span>
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/tool/password-generator" className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-green-500 transition-colors"></span>
                  Password Generator
                </Link>
              </li>
              <li>
                <Link href="/tool/image-converter" className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-green-500 transition-colors"></span>
                  Image Converter
                </Link>
              </li>
              <li>
                <Link href="/tools" className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
                  Browse All Tools <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-900">Company</h3>
            <ul className="space-y-3 text-sm" role="list">
              <li>
                <Link href="/about" className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-green-500 transition-colors"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-green-500 transition-colors"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-green-500 transition-colors"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-green-500 transition-colors"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/community" className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-green-500 transition-colors"></span>
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-900">Legal</h3>
            <ul className="space-y-3 text-sm" role="list">
              <li>
                <Link href="/privacy-policy" className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-green-500 transition-colors"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-green-500 transition-colors"></span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-green-500 transition-colors"></span>
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/support" className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-green-500 transition-colors"></span>
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {currentYear} India Toolkit. All rights reserved. Made with ❤️ in India.
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <Link href="/sitemap" className="hover:text-green-600 transition-colors">Sitemap</Link>
              <span aria-hidden="true">|</span>
              <Link href="/robots.txt" className="hover:text-green-600 transition-colors">Robots</Link>
              <span aria-hidden="true">|</span>
              <span>Powered by Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
