import { Tool } from '@/types/tool';
import { generateFaqsByType } from '@/lib/seo-content-generator';

interface ToolFAQSchemaProps {
  tool: Tool;
}

export default function ToolFAQSchema({ tool }: ToolFAQSchemaProps) {
  const faqs = generateFaqsByType(tool);
  
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
