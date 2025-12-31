import Link from "next/link";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";

export const metadata = {
  title: "Blog & Guides - OMNITOOLS",
  description: "Stay updated with the latest digital tool guides, productivity tips, and OMNITOOLS updates.",
};

const blogPosts = [
  {
    slug: "secure-passwords-guide",
    title: "The Ultimate Guide to Secure Passwords in 2026",
    excerpt: "Learn why complex passwords matter and how to use our generator to protect your digital life.",
    author: "Zencoder",
    date: "Dec 28, 2025",
    readTime: "5 min read",
    category: "Security"
  },
  {
    slug: "top-10-developer-tools",
    title: "Top 10 Essential Online Tools for Modern Developers",
    excerpt: "From JSON formatting to Base64 encoding, discover the tools that will speed up your workflow.",
    author: "OmniTeam",
    date: "Dec 25, 2025",
    readTime: "8 min read",
    category: "Productivity"
  },
  {
    slug: "json-to-csv-use-cases",
    title: "How to Effortlessly Convert JSON to CSV for Data Analysis",
    excerpt: "Master the art of data conversion and learn how to import your JSON data into Excel with ease.",
    author: "DataWiz",
    date: "Dec 20, 2025",
    readTime: "4 min read",
    category: "Tutorial"
  }
];

export default function BlogPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-purple-400/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="pt-24 pb-16 relative overflow-hidden">
        <div className="container px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 mb-8">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">Industry Insights</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic text-slate-900 leading-[0.9]">
            Guides & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Expertise.</span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-bold leading-relaxed italic opacity-80">
            Tips, tutorials, and insights to help you get the most out of our tools.
          </p>
        </div>
      </div>

      <div className="container px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="glass-card group overflow-hidden flex flex-col hover:translate-y-[-8px] transition-all duration-500"
            >
              <div className="h-56 bg-slate-900 flex items-center justify-center relative overflow-hidden">
                 <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-[9px] font-black uppercase tracking-widest z-10">
                   {post.category}
                 </div>
                 <div className="text-4xl font-black text-white/10 uppercase tracking-tighter group-hover:scale-125 transition-transform duration-1000 select-none">OMNITOOLS</div>
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-4 mb-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3 text-blue-500" /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-blue-500" /> {post.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-black/5">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{post.author}</span>
                  </div>
                  <div className="h-10 w-10 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-[-45deg] transition-all duration-500">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
