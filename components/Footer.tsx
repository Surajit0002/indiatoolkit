import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-1 rounded font-bold text-xl">OT</div>
              <span className="text-xl font-bold tracking-tight">OMNITOOLS</span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs">
              Fast, free, and secure online tools for everyone. No registration required for basic tools.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/category/calculators" className="hover:text-blue-600">Calculators</Link></li>
              <li><Link href="/category/converters" className="hover:text-blue-600">Converters</Link></li>
              <li><Link href="/category/text-tools" className="hover:text-blue-600">Text Tools</Link></li>
              <li><Link href="/category/developer-tools" className="hover:text-blue-600">Developer Tools</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-blue-600">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-blue-600">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} OMNITOOLS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
