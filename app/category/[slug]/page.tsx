import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getToolsByCategory, getAllTools } from "@/lib/utils";
import Link from "next/link";
import ToolCard from '@/components/ToolCard';
import { Palette, Zap, Shield, Bolt } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} Tools - Free Online ${category.name} Calculators | India Toolkit`,
    description: `Free online ${category.name.toLowerCase()} tools. Fast, secure, and no signup required. ${category.description}`,
    keywords: [category.name.toLowerCase(), `${category.name.toLowerCase()} tools`, "free online tools"],
  };
}

// Category-specific gradient colors
const categoryGradients: Record<string, string> = {
  'calculator': 'from-blue-600 via-indigo-600 to-purple-600',
  'converter': 'from-emerald-600 via-teal-600 to-cyan-600',
  'text': 'from-violet-600 via-purple-600 to-pink-600',
  'image': 'from-pink-600 via-rose-600 to-red-600',
  'developer': 'from-indigo-600 via-blue-600 to-cyan-600',
  'ai': 'from-violet-600 via-fuchsia-600 to-pink-600',
  'pdf': 'from-red-600 via-rose-600 to-pink-600',
  'default': 'from-indigo-600 via-purple-600 to-pink-600',
};

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const tools = getToolsByCategory(slug);
  const allTools = getAllTools();

  // Sort tools by popularity
  const sortedTools = [...tools].sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));

  const gradient = categoryGradients[slug] || categoryGradients.default;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section - Enhanced Design */}
      <section className={`bg-gradient-to-br ${gradient} text-white py-12 md:py-16 relative overflow-hidden`}>
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        {/* Floating accent shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

        <div className="container px-4 mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">{category.name} Tools</span>
          </nav>

          {/* Main Title Section */}
          <div className="text-center mb-8">
            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-sm font-semibold border border-white/20 mb-4">
              <Palette className="h-4 w-4 text-white/80" />
              {category.name} Category
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight leading-tight">
              {category.name} Tools
            </h1>

            {/* Catchy Subtitle */}
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
              Free {category.name.toLowerCase()} tools that actually work
            </p>

            {/* Description */}
            <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto mt-3 leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Quick Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
              <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Zap className="h-4 w-4 text-yellow-300" />
              </div>
              <div className="text-left">
                <div className="text-lg font-black">{tools.length}</div>
                <div className="text-xs text-white/60 uppercase tracking-wide">Tools</div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
              <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Bolt className="h-4 w-4 text-green-300" />
              </div>
              <div className="text-left">
                <div className="text-lg font-black">100%</div>
                <div className="text-xs text-white/60 uppercase tracking-wide">Free</div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
              <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Shield className="h-4 w-4 text-blue-300" />
              </div>
              <div className="text-left">
                <div className="text-lg font-black">No</div>
                <div className="text-xs text-white/60 uppercase tracking-wide">Signup</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave accent */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Tools Grid Section */}
      <section className="py-10 md:py-14">
        <div className="container px-4 mx-auto">
          {/* Section Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-1 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                    {category.name} Collection
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                  All {category.name} Tools
                </h2>
                <p className="text-slate-600 mt-1">
                  {tools.length} {tools.length === 1 ? 'tool' : 'tools'} available • Sorted by popularity
                </p>
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sortedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {/* Empty State */}
          {tools.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl p-10 border border-slate-200 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No tools found</h3>
                <p className="text-slate-600">Check back soon for new {category.name.toLowerCase()} tools.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
                About {category.name} Tools
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
              <p className="text-base md:text-lg">
                Our {category.name.toLowerCase()} tools are designed to help you accomplish tasks quickly and efficiently. 
                Whether you&apos;re a professional, student, or casual user, you&apos;ll find the right tool for your needs. 
                All tools are <strong className="text-slate-900">completely free</strong> and work directly in your browser - 
                no downloads, no installations, and no registration required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Categories Section */}
      <section className="py-12 bg-slate-50">
        <div className="container px-4 mx-auto">
          <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 text-center">
            Explore Other Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allTools
              .map(t => t.category)
              .filter((cat, index, arr) => arr.indexOf(cat) === index && cat !== slug)
              .slice(0, 6)
              .map(catSlug => {
                const cat = getCategoryBySlug(catSlug);
                if (!cat) return null;
                const catTools = getToolsByCategory(catSlug);
                return (
                  <Link
                    key={catSlug}
                    href={`/category/${catSlug}`}
                    className="group bg-white rounded-xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all text-center"
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                      {cat.name}
                    </div>
                    <div className="text-sm text-slate-500 font-medium">
                      {catTools.length} tools
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
