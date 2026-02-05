# Variant Generator - Programmatic SEO Content Generation

## Variant Generator Implementation

```typescript
// lib/seo/variant-generator.ts

import { Tool } from '@/types/tool';
import { SEOVariantType, Language, SEOContent, ContentVariation, FAQBlock } from '@/types/seo';
import { CONTENT_VARIATIONS, HINDI_CONTENT_VARIATIONS } from '@/lib/data/content-templates';

/**
 * Generate SEO content for a specific tool variant
 */
export function generateVariantContent(
  tool: Tool,
  variant: SEOVariantType,
  language: Language = 'en'
): SEOContent {
  const templates = language === 'hi' ? HINDI_CONTENT_VARIATIONS : CONTENT_VARIATIONS;
  const template = templates[variant];

  // Generate H1
  const h1 = generateH1(tool.name, template.h1_modifier, language);

  // Generate title
  const title = generateTitle(tool.name, variant, language);

  // Generate description
  const description = generateDescription(tool, variant, language);

  // Generate introduction
  const introduction = generateIntroduction(tool, template.intro_template, language);

  // Generate value proposition
  const valueProposition = generateValueProposition(tool, variant, language);

  // Generate use cases
  const useCases = generateUseCases(tool, variant, language);

  // Generate benefits
  const benefits = generateBenefits(tool, variant, language);

  // Generate how to use steps
  const howToUse = generateHowToUse(tool, variant, language);

  // Generate CTA text
  const ctaText = template.cta_text.replace('{tool_name}', tool.name);

  // Generate FAQs
  const faqs = generateFAQs(tool, variant, language, template.faq_modifiers);

  return {
    h1,
    title,
    description,
    introduction,
    value_proposition: valueProposition,
    use_cases: useCases,
    benefits,
    how_to_use: howToUse,
    cta_text: ctaText,
    faqs
  };
}

/**
 * Generate H1 based on variant
 */
function generateH1(toolName: string, modifier: string, language: Language): string {
  if (language === 'hi') {
    return modifier ? `${modifier} ${toolName}` : toolName;
  }
  return modifier ? `${modifier} ${toolName}` : toolName;
}

/**
 * Generate meta title
 */
function generateTitle(toolName: string, variant: SEOVariantType, language: Language): string {
  const baseTitle = language === 'hi' 
    ? `${toolName} - मुफ्त ऑनलाइन टूल | India Toolkit`
    : `${toolName} - Free Online Tool | India Toolkit`;

  const variantModifiers: Record<SEOVariantType, string> = {
    canonical: '',
    online: language === 'hi' ? 'ऑनलाइन' : 'Online',
    free: language === 'hi' ? 'मुफ्त' : 'Free',
    students: language === 'hi' ? 'छात्रों के लिए' : 'for Students',
    india: language === 'hi' ? 'भारत' : 'India',
    calculator: language === 'hi' ? 'कैलकुलेटर' : 'Calculator'
  };

  const modifier = variantModifiers[variant];
  return modifier ? `${modifier} ${baseTitle}` : baseTitle;
}

/**
 * Generate meta description
 */
function generateDescription(tool: Tool, variant: SEOVariantType, language: Language): string {
  const baseDesc = language === 'hi'
    ? `${tool.name} का उपयोग मुफ्त में ऑनलाइन करें। तेज़, सुरक्षित, और आसान टूल डेवलपर्स और छात्रों के लिए।`
    : `Use ${tool.name} online for free. Fast, secure, and easy tool for developers and students.`;

  const variantContexts: Record<SEOVariantType, string> = {
    canonical: '',
    online: language === 'hi' ? 'बिना डाउनलोड के ब्राउज़र में सीधे उपयोग करें।' : 'Use directly in your browser without downloads.',
    free: language === 'hi' ? 'किसी भी छिपी शुल्क के बिना।' : 'No hidden charges or subscriptions.',
    students: language === 'hi' ? 'छात्रों के लिए विशेष रूप से डिज़ाइन किया गया।' : 'Designed specifically for students.',
    india: language === 'hi' ? 'भारत में उपयोगकर्ताओं के लिए अनुकूलित।' : 'Optimized for users in India.',
    calculator: language === 'hi' ? 'सटीक गणना के लिए।' : 'For accurate calculations.'
  };

  const context = variantContexts[variant];
  return context ? `${baseDesc} ${context}` : baseDesc;
}

/**
 * Generate introduction paragraph
 */
function generateIntroduction(tool: Tool, template: string, language: Language): string {
  const intro = template.replace('{tool_name}', tool.name);
  
  // Add tool-specific context
  const toolContext = getToolContext(tool, language);
  return `${intro} ${toolContext}`;
}

/**
 * Generate value proposition
 */
function generateValueProposition(tool: Tool, variant: SEOVariantType, language: Language): string {
  const propositions: Record<SEOVariantType, Record<Language, string>> = {
    canonical: {
      en: `Experience the power of ${tool.name} with our intuitive interface and instant results.`,
      hi: `${tool.name} की शक्ति का अनुभव करें हमारे सहज इंटरफ़ेस और तत्काल परिणामों के साथ।`
    },
    online: {
      en: `Access ${tool.name} from anywhere, anytime. No installation required.`,
      hi: `कहीं से भी, कभी भी ${tool.name} तक पहुंचें। कोई इंस्टालेशन की आवश्यकता नहीं है।`
    },
    free: {
      en: `Get premium features of ${tool.name} completely free. No hidden costs.`,
      hi: `${tool.name} की प्रीमियम सुविधाएं पूरी तरह से मुफ्त प्राप्त करें। कोई छिपी लागत नहीं।`
    },
    students: {
      en: `${tool.name} helps students learn faster and achieve better results.`,
      hi: `${tool.name} छात्रों को तेज़ी से सीखने और बेहतर परिणाम प्राप्त करने में मदद करता है।`
    },
    india: {
      en: `${tool.name} is tailored for Indian users with local features and support.`,
      hi: `${tool.name} स्थानीय सुविधाओं और समर्थन के साथ भारतीय उपयोगकर्ताओं के लिए तैयार किया गया है।`
    },
    calculator: {
      en: `Get accurate calculations with ${tool.name} in seconds.`,
      hi: `${tool.name} के साथ सेकंड में सटीक गणना प्राप्त करें।`
    }
  };

  return propositions[variant][language];
}

/**
 * Generate use cases
 */
function generateUseCases(tool: Tool, variant: SEOVariantType, language: Language): string[] {
  const baseUseCases = getBaseUseCases(tool, language);
  
  const variantSpecificCases: Record<SEOVariantType, string[]> = {
    canonical: [],
    online: language === 'hi' 
      ? ['बिना इंटरनेट कनेक्शन के ऑफ़लाइन उपयोग', 'मोबाइल उपकरणों पर त्वरित पहुंच']
      : ['Offline use without internet connection', 'Quick access on mobile devices'],
    free: language === 'hi'
      ? ['बजट-अनुकूल परियोजनाओं के लिए', 'छात्रों और शुरुआती लोगों के लिए']
      : ['For budget-conscious projects', 'For students and beginners'],
    students: language === 'hi'
      ? ['होमवर्क और असाइनमेंट के लिए', 'परीक्षा की तैयारी के लिए', 'प्रोजेक्ट कार्य के लिए']
      : ['For homework and assignments', 'For exam preparation', 'For project work'],
    india: language === 'hi'
      ? ['भारतीय मानकों के अनुसार', 'स्थानीय आवश्यकताओं के लिए']
      : ['According to Indian standards', 'For local requirements'],
    calculator: language === 'hi'
      ? ['त्वरित गणना के लिए', 'सटीक परिणामों के लिए']
      : ['For quick calculations', 'For accurate results']
  };

  return [...baseUseCases, ...variantSpecificCases[variant]];
}

/**
 * Generate benefits
 */
function generateBenefits(tool: Tool, variant: SEOVariantType, language: Language): string[] {
  const baseBenefits = language === 'hi' ? [
    'पूरी तरह से मुफ्त उपयोग',
    'सभी उपकरणों पर काम करता है',
    'कोई पंजीकरण की आवश्यकता नहीं',
    'सुरक्षित - सभी प्रसंस्करण आपके ब्राउज़र में होता है',
    'त्वरित परिणाम',
    'उपयोग में आसान इंटरफ़ेस'
  ] : [
    'Completely free to use',
    'Works on all devices',
    'No registration required',
    'Secure - all processing in your browser',
    'Fast results',
    'Easy to use interface'
  ];

  const variantBenefits: Record<SEOVariantType, string[]> = {
    canonical: [],
    online: language === 'hi' 
      ? ['कोई डाउनलोड नहीं', 'तत्काल उपयोग']
      : ['No download required', 'Instant use'],
    free: language === 'hi'
      ? ['कोई छिपी शुल्क नहीं', 'असीमित उपयोग']
      : ['No hidden fees', 'Unlimited usage'],
    students: language === 'hi'
      => ['शैक्षणिक उद्देश्यों के लिए अनुकूलित', 'सीखने में मदद करता है']
      : ['Optimized for educational purposes', 'Helps in learning'],
    india: language === 'hi'
      => ['भारतीय उपयोगकर्ताओं के लिए अनुकूलित', 'स्थानीय समर्थन']
      : ['Optimized for Indian users', 'Local support'],
    calculator: language === 'hi'
      => ['मिलीसेकंड सटीकता', 'विस्तृत परिणाम']
      : ['Millisecond accuracy', 'Detailed results']
  };

  return [...baseBenefits, ...variantBenefits[variant]];
}

/**
 * Generate how to use steps
 */
function generateHowToUse(tool: Tool, variant: SEOVariantType, language: Language): string[] {
  const baseSteps = language === 'hi' ? [
    'अपना इनपुट दर्ज करें',
    'आवश्यकतानुसार सेटिंग्स समायोजित करें',
    'प्रोसेस बटन पर क्लिक करें',
    'तुरंत परिणाम प्राप्त करें'
  ] : [
    'Enter your input',
    'Adjust settings as needed',
    'Click the process button',
    'Get instant results'
  ];

  const variantSteps: Record<SEOVariantType, string[]> = {
    canonical: [],
    online: language === 'hi'
      ? ['ब्राउज़र खोलें और टूल तक पहुंचें']
      : ['Open your browser and access the tool'],
    free: language === 'hi']
      => ['कोई भुगतान या साइन अप की आवश्यकता नहीं']
      : ['No payment or sign-up required'],
    students: language === 'hi']
      => ['अपने अध्ययन सामग्री के साथ उपयोग करें']
      : ['Use with your study materials'],
    india: language === 'hi']
      => ['स्थानीय सेटिंग्स का चयन करें']
      : ['Select local settings if needed'],
    calculator: language === 'hi']
      => ['गणना मान दर्ज करें']
      : ['Enter calculation values']
  };

  return [...baseSteps, ...variantSteps[variant]];
}

/**
 * Generate FAQs
 */
function generateFAQs(
  tool: Tool,
  variant: SEOVariantType,
  language: Language,
  modifiers: string[]
): FAQBlock[] {
  const baseFAQs = getBaseFAQs(tool, language);
  
  const variantFAQs: Record<SEOVariantType, FAQBlock[]> = {
    canonical: [],
    online: language === 'hi' ? [
      {
        question: `क्या मैं ${tool.name} को ऑफ़लाइन उपयोग कर सकता हूं?`,
        answer: `हां, एक बार लोड होने के बाद, ${tool.name} ऑफ़लाइन काम कर सकता है।`,
        variant_specific: true
      }
    ] : [
      {
        question: `Can I use ${tool.name} offline?`,
        answer: `Yes, once loaded, ${tool.name} can work offline.`,
        variant_specific: true
      }
    ],
    free: language === 'hi' ? [
      {
        question: `क्या ${tool.name} वास्तव में मुफ्त है?`,
        answer: `हां, ${tool.name} पूरी तरह से मुफ्त है और कोई छिपी शुल्क नहीं है।`,
        variant_specific: true
      }
    ] : [
      {
        question: `Is ${tool.name} really free?`,
        answer: `Yes, ${tool.name} is completely free with no hidden fees.`,
        variant_specific: true
      }
    ],
    students: language === 'hi' ? [
      {
        question: `क्या ${tool.name} छात्रों के लिए उपयुक्त है?`,
        answer: `हां, ${tool.name} विशेष रूप से छात्रों की जरूरतों को ध्यान में रखकर डिज़ाइन किया गया है।`,
        variant_specific: true
      }
    ] : [
      {
        question: `Is ${tool.name} suitable for students?`,
        answer: `Yes, ${tool.name} is designed specifically with students' needs in mind.`,
        variant_specific: true
      }
    ],
    india: language === 'hi' ? [
      {
        question: `क्या ${tool.name} भारत में काम करता है?`,
        answer: `हां, ${tool.name} भारत में उपयोगकर्ताओं के लिए अनुकूलित है।`,
        variant_specific: true
      }
    ] : [
      {
        question: `Does ${tool.name} work in India?`,
        answer: `Yes, ${tool.name} is optimized for users in India.`,
        variant_specific: true
      }
    ],
    calculator: language === 'hi' ? [
      {
        question: `${tool.name} कितना सटीक है?`,
        answer: `${tool.name} ब्राउज़र के हाई-प्रिसिशन टाइमर API का उपयोग करता है।`,
        variant_specific: true
      }
    ] : [
      {
        question: `How accurate is ${tool.name}?`,
        answer: `${tool.name} uses the browser's high-precision timer API.`,
        variant_specific: true
      }
    ]
  };

  return [...baseFAQs, ...variantFAQs[variant]];
}

/**
 * Get tool-specific context
 */
function getToolContext(tool: Tool, language: Language): string {
  const contexts: Record<string, Record<Language, string>> = {
    calculator: {
      en: 'This calculator provides instant results for all your mathematical needs.',
      hi: 'यह कैलकुलेटर आपकी सभी गणितीय आवश्यकताओं के लिए तत्काल परिणाम प्रदान करता है।'
    },
    converter: {
      en: 'This converter ensures high-quality output while maintaining data integrity.',
      hi: 'यह कनवर्टर डेटा अखंडता बनाए रखते हुए उच्च-गुणवत्ता वाला आउटपुट सुनिश्चित करता है।'
    },
    generator: {
      en: 'This generator creates professional-quality output instantly.',
      hi: 'यह जनरेटर तुरंत पेशेवर-गुणवत्ता वाला आउटपुट बनाता है।'
    },
    analyzer: {
      en: 'This analyzer provides comprehensive insights and analysis.',
      hi: 'यह विश्लेषक व्यापक अंतर्दृष्टि और विश्लेषण प्रदान करता है।'
    },
    formatter: {
      en: 'This formatter ensures clean, readable output.',
      hi: 'यह फॉर्मेटर साफ, पठनीय आउटपुट सुनिश्चित करता है।'
    }
  };

  return contexts[tool.type]?.[language] || '';
}

/**
 * Get base use cases for tool type
 */
function getBaseUseCases(tool: Tool, language: Language): string[] {
  const useCases: Record<string, Record<Language, string[]>> = {
    calculator: {
      en: ['Quick calculations', 'Mathematical problems', 'Financial planning'],
      hi: ['त्वरित गणना', 'गणितीय समस्याएं', 'वित्तीय योजना']
    },
    converter: {
      en: ['File format conversion', 'Data transformation', 'Format compatibility'],
      hi: ['फ़ाइल प्रारूप रूपांतरण', 'डेटा परिवर्तन', 'प्रारूप संगतता']
    },
    generator: {
      en: ['Content creation', 'Quick prototyping', 'Idea generation'],
      hi: ['सामग्री निर्माण', 'त्वरित प्रोटोटाइपिंग', 'विचार उत्पादन']
    },
    analyzer: {
      en: ['Data analysis', 'Performance tracking', 'Quality assessment'],
      hi: ['डेटा विश्लेषण', 'प्रदर्शन ट्रैकिंग', 'गुणवत्ता मूल्यांकन']
    },
    formatter: {
      en: ['Code formatting', 'Text styling', 'Data presentation'],
      hi: ['कोड फॉर्मेटिंग', 'पाठ स्टाइलिंग', 'डेटा प्रस्तुति']
    }
  };

  return useCases[tool.type]?.[language] || [];
}

/**
 * Get base FAQs for tool
 */
function getBaseFAQs(tool: Tool, language: Language): FAQBlock[] {
  const baseFAQs: Record<Language, FAQBlock[]> = {
    en: [
      {
        question: `What is ${tool.name}?`,
        answer: `${tool.name} is a powerful online tool that helps you perform various tasks efficiently.`,
        variant_specific: false
      },
      {
        question: `How do I use ${tool.name}?`,
        answer: `Simply enter your data, adjust settings if needed, and click the process button.`,
        variant_specific: false
      },
      {
        question: `Is ${tool.name} free to use?`,
        answer: `Yes, ${tool.name} is completely free with no hidden costs.`,
        variant_specific: false
      }
    ],
    hi: [
      {
        question: `${tool.name} क्या है?`,
        answer: `${tool.name} एक शक्तिशाली ऑनलाइन टूल है जो आपको विभिन्न कार्यों को कुशलता से करने में मदद करता है।`,
        variant_specific: false
      },
      {
        question: `मैं ${tool.name} का उपयोग कैसे करूं?`,
        answer: `बस अपना डेटा दर्ज करें, यदि आवश्यक हो तो सेटिंग्स समायोजित करें, और प्रोसेस बटन पर क्लिक करें।`,
        variant_specific: false
      },
      {
        question: `क्या ${tool.name} मुफ्त है?`,
        answer: `हां, ${tool.name} पूरी तरह से मुफ्त है और कोई छिपी लागत नहीं है।`,
        variant_specific: false
      }
    ]
  };

  return baseFAQs[language];
}

/**
 * Calculate content similarity to avoid duplicate content
 */
export function calculateContentSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  return intersection.size / union.size;
}

/**
 * Validate content uniqueness
 */
export function validateContentUniqueness(
  content1: SEOContent,
  content2: SEOContent,
  threshold: number = 0.7
): { isValid: boolean; similarity: number; issues: string[] } {
  const issues: string[] = [];
  
  const introSimilarity = calculateContentSimilarity(content1.introduction, content2.introduction);
  if (introSimilarity >= threshold) {
    issues.push(`Introduction similarity: ${(introSimilarity * 100).toFixed(1)}%`);
  }

  const valuePropSimilarity = calculateContentSimilarity(
    content1.value_proposition,
    content2.value_proposition
  );
  if (valuePropSimilarity >= threshold) {
    issues.push(`Value proposition similarity: ${(valuePropSimilarity * 100).toFixed(1)}%`);
  }

  const avgSimilarity = (introSimilarity + valuePropSimilarity) / 2;
  const isValid = avgSimilarity < threshold;

  return {
    isValid,
    similarity: avgSimilarity,
    issues
  };
}
```

## Content Templates Data

```typescript
// lib/data/content-templates.ts

import { ContentVariation, SEOVariantType } from '@/types/seo';

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
