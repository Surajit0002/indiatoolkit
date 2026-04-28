import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug, getCategoryBySlug, getAllCategories, getAllTools, trackToolUsage } from "@/lib/utils";
import { Star, Info, Zap, TrendingUp, Users, Clock, Heart, Share2, ChevronDown, ChevronUp } from "lucide-react";
import * as Icons from "lucide-react";
import ToolRenderer from "@/components/ToolRenderer";
import ToolSwitcher from "@/components/ToolSwitcher";
import DynamicToolGrid from "@/components/DynamicToolGrid";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import ToolActionsBar from "@/components/ToolActionsBar";
import { generateSeoContent, generateFaqsByType } from "@/lib/seo-content-generator";
import AnimatedCounter from "@/components/AnimatedCounter";
import ToolPageTemplate from "@/components/tools/ToolPageTemplate";
import ToolFAQSchema from "@/components/tools/ToolFAQSchema";
import { generateHighCTRMetadata } from '@/lib/seo/dynamic-metadata';

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

/**
 * Generate HowTo steps based on tool type
 */
function generateHowToSteps(tool: any): { name: string; text: string }[] {
  const stepsByType: Record<string, { name: string; text: string }[]> = {
    calculator: [
      { name: "Enter Values", text: "Enter your values in the input fields provided on the page" },
      { name: "Configure Options", text: "Select any additional calculation options or settings you need" },
      { name: "Calculate", text: "Click the Calculate button to get instant results" },
      { name: "View Results", text: "View your calculated results below" },
      { name: "Reset or Start Over", text: "Click Reset to clear and start a new calculation" }
    ],
    converter: [
      { name: "Upload File", text: "Click 'Choose File' or drag and drop your file to upload" },
      { name: "Select Format", text: "Choose your desired output format from the options" },
      { name: "Convert", text: "Click the Convert button to start the conversion process" },
      { name: "Download", text: "Download your converted file to your device" }
    ],
    generator: [
      { name: "Enter Input", text: "Enter your text, data, or parameters in the input field" },
      { name: "Customize Options", text: "Adjust settings like tone, length, style, or format as needed" },
      { name: "Generate", text: "Click Generate to create your content" },
      { name: "Review & Use", text: "Review the generated output and copy or download it" }
    ],
    formatter: [
      { name: "Input Code", text: "Paste or enter your code in the input field" },
      { name: "Configure Options", text: "Select formatting options like indentation, line breaks" },
      { name: "Format", text: "Click Format to beautify your code" },
      { name: "Copy Result", text: "Copy the formatted code for use" }
    ],
    analyzer: [
      { name: "Input Data", text: "Enter or paste your text, code, or data to analyze" },
      { name: "Run Analysis", text: "Click Analyze to process your input" },
      { name: "View Results", text: "Review the analysis results and insights" }
    ],
    default: [
      { name: "Get Started", text: "Enter your data in the input field" },
      { name: "Process", text: "Click the process button to execute" },
      { name: "Get Results", text: "View your results instantly" }
    ]
  };

  return stepsByType[tool.type] || stepsByType.default;
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const category = getCategoryBySlug(tool.category);
  const categories = getAllCategories();
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
