import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getToolsByCategory, getAllTools } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Grid, List } from "lucide-react";
import ToolCard from '@/components/ToolCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} - Free Online Tools | India Toolkit`,
    description: `Free online ${category.name.toLowerCase()} tools. Fast, secure, and no signup required. ${category.description}`,
    keywords: [category.name.toLowerCase(), `${category.name.toLowerCase()} tools`, "free online tools"],
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const tools = getToolsByCategory(slug);
  const allTools = getAllTools();

  // Sort tools by popularity
  const sortedTools = [...tools].sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-16 md:py-20">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4">{category.name} Tools</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            {category.description} All tools are 100% free, no signup required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              {tools.length} Tools Available
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              100% Free Forever
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              No Registration
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                All {category.name} Tools
              </h2>
              <p className="text-slate-600 mt-1">
                {tools.length} tools to help you get the job done
              </p>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {/* Empty State */}
          {tools.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-2">No tools found</h3>
                <p className="text-slate-600">Check back soon for new tools in this category.</p>
              </div>
            </div>
          )}

          {/* Category Description */}
          <div className="mt-12 bg-white rounded-2xl p-8 md:p-12 border border-slate-200">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4">
              About {category.name} Tools
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Our {category.name.toLowerCase()} tools are designed to help you accomplish tasks quickly and efficiently. 
              Whether you're a professional, student, or casual user, you'll find the right tool for your needs. 
              All tools are completely free and work directly in your browser - no downloads, no installations, 
              and no registration required.
            </p>
          </div>
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-12 bg-slate-100">
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
                    className="bg-white rounded-xl p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all text-center group"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                      {cat.name}
                    </div>
                    <div className="text-xs text-slate-500">
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
