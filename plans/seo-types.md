# SEO Types - Programmatic SEO System

## Core SEO Types

```typescript
/**
 * SEO Types for Programmatic SEO System
 */

export type SEOVariantType = 'canonical' | 'online' | 'free' | 'students' | 'india' | 'calculator';
export type Language = 'en' | 'hi';
export type IntentType = 'informational' | 'transactional';

export interface SEOToolData {
  // Core Tool Data
  tool_name: string;
  slug: string;
  category: string;
  primary_keyword: string;
  secondary_keywords: string[];
  intent_type: IntentType;
  language: Language;

  // SEO Variant Configuration
  seo_variant_type: SEOVariantType;
  canonical_url: string;

  // Content Blocks (JSON)
  content_blocks: ContentBlocks;

  // FAQ Blocks (JSON)
  faq_blocks: FAQBlock[];

  // Internal Linking
  internal_links: InternalLink[];

  // Performance Tracking
  impressions: number;
  clicks: number;
  avg_position: number;
  ctr: number;
  last_updated: string;
}

export interface ContentBlocks {
  h1: string;
  introduction: string;
  value_proposition: string;
  use_cases: string[];
  benefits: string[];
  cta_text: string;
}

export interface FAQBlock {
  question: string;
  answer: string;
  variant_specific: boolean;
}

export interface InternalLink {
  tool_slug: string;
  anchor_text: string;
  relevance_score: number;
}

export interface ContentVariation {
  variant_type: SEOVariantType;
  h1_modifier: string;
  intro_template: string;
  example_context: string;
  cta_text: string;
  faq_modifiers: string[];
}

export interface SEOContent {
  h1: string;
  title: string;
  description: string;
  introduction: string;
  value_proposition: string;
  use_cases: string[];
  benefits: string[];
  how_to_use: string[];
  cta_text: string;
  faqs: FAQBlock[];
}

export interface SEOVariantConfig {
  [toolSlug: string]: {
    [variantType: string]: {
      h1: string;
      title: string;
      description: string;
      canonical_url: string;
    };
  };
}

export interface SchemaData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface ToolSchema {
  '@context': string;
  '@type': 'SoftwareApplication';
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  description: string;
  offers: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    ratingCount: number;
  };
}

export interface FAQSchema {
  '@context': string;
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface SEOPageProps {
  tool: {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    type: string;
    icon: string;
    componentName: string;
    seo: {
      title: string;
      description: string;
      keywords?: string[];
    };
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
  variant: SEOVariantType;
  language: Language;
  seoContent: SEOContent;
  relatedTools: any[];
}

export interface VariantPageParams {
  slug: string;
  variant?: SEOVariantType;
  lang?: Language;
}
```

## Content Variation Templates

```typescript
export const CONTENT_VARIATIONS: Record<SEOVariantType, ContentVariation> = {
  canonical: {
    variant_type: 'canonical',
    h1_modifier: '',
    intro_template: '{tool_name} is a powerful online tool that helps users...',
    example_context: 'For example, if you need to...',
    cta_text: 'Start Using {tool_name}',
    faq_modifiers: []
  },
  online: {
    variant_type: 'online',
    h1_modifier: 'Online',
    intro_template: 'Use {tool_name} online directly in your browser without any downloads...',
    example_context: 'When working online, you can...',
    cta_text: 'Use {tool_name} Online Now',
    faq_modifiers: ['online', 'browser-based', 'no download']
  },
  free: {
    variant_type: 'free',
    h1_modifier: 'Free',
    intro_template: 'Get {tool_name} completely free with no hidden charges or subscriptions...',
    example_context: 'As a free tool, you can...',
    cta_text: 'Use Free {tool_name}',
    faq_modifiers: ['free', 'no cost', 'complimentary']
  },
  students: {
    variant_type: 'students',
    h1_modifier: 'for Students',
    intro_template: '{tool_name} is designed specifically for students to help with their studies...',
    example_context: 'Students can use this tool for...',
    cta_text: 'Start Learning with {tool_name}',
    faq_modifiers: ['students', 'education', 'learning', 'academic']
  },
  india: {
    variant_type: 'india',
    h1_modifier: 'India',
    intro_template: '{tool_name} is optimized for users in India with local features and support...',
    example_context: 'In India, this tool is useful for...',
    cta_text: 'Use {tool_name} in India',
    faq_modifiers: ['india', 'indian', 'local', 'regional']
  },
  calculator: {
    variant_type: 'calculator',
    h1_modifier: 'Calculator',
    intro_template: 'Use our {tool_name} calculator to get accurate results instantly...',
    example_context: 'For calculations, you can...',
    cta_text: 'Calculate with {tool_name}',
    faq_modifiers: ['calculate', 'calculation', 'compute']
  }
};
```

## Hindi Content Templates

```typescript
export const HINDI_CONTENT_VARIATIONS: Record<SEOVariantType, ContentVariation> = {
  canonical: {
    variant_type: 'canonical',
    h1_modifier: '',
    intro_template: '{tool_name} एक शक्तिशाली ऑनलाइन टूल है जो उपयोगकर्ताओं की मदद करता है...',
    example_context: 'उदाहरण के लिए, यदि आपको चाहिए...',
    cta_text: '{tool_name} का उपयोग शुरू करें',
    faq_modifiers: []
  },
  online: {
    variant_type: 'online',
    h1_modifier: 'ऑनलाइन',
    intro_template: 'बिना किसी डाउनलोड के अपने ब्राउज़र में सीधे {tool_name} ऑनलाइन का उपयोग करें...',
    example_context: 'ऑनलाइन काम करते समय, आप कर सकते हैं...',
    cta_text: 'अभी {tool_name} ऑनलाइन का उपयोग करें',
    faq_modifiers: ['ऑनलाइन', 'ब्राउज़र-आधारित', 'कोई डाउनलोड नहीं']
  },
  free: {
    variant_type: 'free',
    h1_modifier: 'मुफ्त',
    intro_template: 'किसी भी छिपी शुल्क या सदस्यता के बिना {tool_name} पूरी तरह से मुफ्त प्राप्त करें...',
    example_context: 'एक मुफ्त टूल के रूप में, आप कर सकते हैं...',
    cta_text: 'मुफ्त {tool_name} का उपयोग करें',
    faq_modifiers: ['मुफ्त', 'कोई लागत नहीं', 'निःशुल्क']
  },
  students: {
    variant_type: 'students',
    h1_modifier: 'छात्रों के लिए',
    intro_template: '{tool_name} विशेष रूप से छात्रों के लिए डिज़ाइन किया गया है ताकि उनकी पढ़ाई में मदद मिल सके...',
    example_context: 'छात्र इस टूल का उपयोग कर सकते हैं...',
    cta_text: '{tool_name} के साथ सीखना शुरू करें',
    faq_modifiers: ['छात्र', 'शिक्षा', 'सीखना', 'शैक्षणिक']
  },
  india: {
    variant_type: 'india',
    h1_modifier: 'भारत',
    intro_template: '{tool_name} भारत में उपयोगकर्ताओं के लिए स्थानीय सुविधाओं और समर्थन के साथ अनुकूलित है...',
    example_context: 'भारत में, यह टूल उपयोगी है...',
    cta_text: 'भारत में {tool_name} का उपयोग करें',
    faq_modifiers: ['भारत', 'भारतीय', 'स्थानीय', 'क्षेत्रीय']
  },
  calculator: {
    variant_type: 'calculator',
    h1_modifier: 'कैलकुलेटर',
    intro_template: 'तत्काल सटीक परिणाम प्राप्त करने के लिए हमारे {tool_name} कैलकुलेटर का उपयोग करें...',
    example_context: 'गणना के लिए, आप कर सकते हैं...',
    cta_text: '{tool_name} के साथ गणना करें',
    faq_modifiers: ['गणना', 'कैलकुलेशन', 'कंप्यूट']
  }
};
```
