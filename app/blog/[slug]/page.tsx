import { Calendar, User, Clock, ArrowLeft, Share2, MessageCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Mock check for slug
  if (slug !== "secure-passwords-guide") {
    // In a real app we'd fetch data here
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Article Header */}
      <header className="bg-gray-900 text-white pt-32 pb-24">
        <div className="container px-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-500 font-black text-xs uppercase tracking-widest mb-12 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8 text-xs font-black uppercase tracking-widest text-blue-500">
               <span className="bg-blue-600/10 px-4 py-1.5 rounded-full border border-blue-600/20">Security</span>
               <span className="text-gray-500">Dec 28, 2025 • 5 min read</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
               The Ultimate Guide to <span className="text-blue-500">Secure Passwords</span> in 2026
            </h1>
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-xl font-black">Z</div>
               <div>
                  <div className="font-black text-white tracking-tight">Zencoder</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Lead Developer @ OMNITOOLS</div>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="container px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <article className="prose prose-xl prose-gray max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-blue-600 prose-img:rounded-[2rem]">
              <p className="lead text-2xl font-medium text-gray-500 leading-relaxed mb-12 italic border-l-8 border-blue-600 pl-8">
                With cyber threats evolving every day, your first line of defense remains the same: a strong, unique, and complex password.
              </p>
              
              <h2>Why Password Complexity Still Matters</h2>
              <p>
                In 2026, brute-force attacks have become more sophisticated than ever. 
                Using "password123" or your pet's name is an open invitation for security breaches. 
                A secure password should be a random string of characters that even a powerful 
                AI cannot guess in a reasonable amount of time.
              </p>

              <h2>How to Use Our Generator</h2>
              <p>
                Our built-in password generator uses cryptographically secure random number 
                generation to ensure your passwords are truly unpredictable. Here's what we recommend:
              </p>
              <ul>
                <li><strong>Length:</strong> Aim for at least 16 characters.</li>
                <li><strong>Diversity:</strong> Mix uppercase, lowercase, numbers, and symbols.</li>
                <li><strong>Uniqueness:</strong> Never reuse a password across different sites.</li>
              </ul>

              <blockquote>
                "A secure password is like a strong vault door; it only works if you don't use 
                the same key for every building in the city."
              </blockquote>

              <h2>Next Steps</h2>
              <p>
                Head over to our <Link href="/tool/password-generator">Password Generator</Link> now 
                and start securing your digital identity. It's fast, free, and runs entirely 
                in your browser for 100% privacy.
              </p>
            </article>

            {/* Post Interactions */}
            <div className="mt-20 flex items-center gap-4 py-8 border-y border-gray-100">
               <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">
                  <Share2 className="h-4 w-4" /> Share Article
               </button>
               <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                  <MessageCircle className="h-4 w-4" /> 12 Comments
               </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
               <h3 className="text-xl font-black tracking-tight mb-6">Stay Updated</h3>
               <p className="text-sm font-medium text-gray-500 mb-6">Join 50,000+ developers receiving our monthly tool digest.</p>
               <input type="email" placeholder="email@example.com" className="w-full px-6 py-4 bg-white rounded-2xl border-none focus:ring-2 focus:ring-blue-600 outline-none mb-4 font-medium" />
               <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all">Subscribe Now</button>
            </div>

            <div>
               <h3 className="text-xl font-black tracking-tight mb-8 ml-4 uppercase tracking-widest text-gray-400 text-[10px]">Related Tools</h3>
               <div className="space-y-4">
                  <RelatedToolLink title="Password Generator" icon={<Clock className="h-4 w-4" />} />
                  <RelatedToolLink title="Base64 Converter" icon={<Clock className="h-4 w-4" />} />
                  <RelatedToolLink title="JSON Formatter" icon={<Clock className="h-4 w-4" />} />
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function RelatedToolLink({ title, icon }: { title: string, icon: any }) {
  return (
    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-blue-600 transition-all cursor-pointer group shadow-sm">
       <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
          {icon}
       </div>
       <span className="font-bold text-sm text-gray-700">{title}</span>
    </div>
  );
}
