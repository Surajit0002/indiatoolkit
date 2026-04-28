import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug, getCategoryBySlug, getAllTools, trackToolUsage } from "@/lib/utils";
import ToolRenderer from "@/components/ToolRenderer";
import ToolPageTemplate from "@/components/tools/ToolPageTemplate";
import { generateHighCTRMetadata } from '@/lib/seo/dynamic-metadata';
import { generateFaqsByType } from "@/lib/seo-content-generator";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };

  const category = getCategoryBySlug(tool.category);

  // Generate high-CTR metadata dynamically
  const seoMetadata = generateHighCTRMetadata(tool);

  return {
    title: seoMetadata.title,
    description: seoMetadata.description,
    keywords: seoMetadata.keywords,
    openGraph: {
      title: seoMetadata.title,
      description: seoMetadata.description,
      url: `https://www.indiatoolkit.in/tool/${tool.slug}`,
      type: "website",
      siteName: "India Toolkit",
      images: [
        {
          url: `/api/og?tool=${tool.slug}&title=${encodeURIComponent(tool.name)}`,
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoMetadata.title,
      description: seoMetadata.description,
      images: [`/api/og?tool=${tool.slug}&title=${encodeURIComponent(tool.name)}`],
    },
    alternates: {
      canonical: `https://www.indiatoolkit.in/tool/${tool.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      "application/ld+json": JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: tool.name,
          description: tool.description,
          applicationCategory: `${category?.name || 'Utility'}Application`,
          operatingSystem: 'Web Browser',
          url: `https://www.indiatoolkit.in/tool/${tool.slug}`,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          aggregateRating: tool.rating ? {
            '@type': 'AggregateRating',
            ratingValue: tool.rating,
            ratingCount: tool.usageCount || 100,
            bestRating: 5,
            worstRating: 1,
          } : undefined,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: generateFaqsByType(tool).map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      ].filter(Boolean)),
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const allTools = getAllTools();

  trackToolUsage(tool.id, tool.slug);

  return (
    <>
      <ToolPageTemplate tool={tool} allTools={allTools}>
        <ToolRenderer tool={tool} />
      </ToolPageTemplate>
    </>
  );
}
