// SEO Content Generator for Tool Pages
// Generates optimized meta content, FAQs, and structured data for better CTR

import { Tool } from '@/types/tool';

export function generateSeoContent(tool: Tool) {
  const category = tool.category.toLowerCase();
  const toolName = tool.name;
  const toolType = tool.type || 'tool';
  
  return {
    // SEO Title variations for A/B testing
    titleVariations: [
      `${toolName} Online Free – Fast & Secure ${toolType} Tool`,
      `Free ${toolName} - Best Online ${toolType} Tool`,
      `${toolName}: Free ${toolType.toUpperCase()} Tool Online`,
      `Online ${toolName} - Free & Secure ${toolType} Tool`,
    ],
    
    // Meta Description variations
    descriptionVariations: [
      `Use our free ${toolName.toLowerCase()} tool to instantly convert, compress or generate. No login required. Fast & secure.`,
      `${toolName} online - free ${toolType} tool with no signup. Fast, secure, and easy to use. Try it now!`,
      `Free ${toolName.toLowerCase()} ${toolType} tool. No registration needed. Instant results. 100% secure & private.`,
      `Online ${toolName.toLowerCase()} - the best free ${toolType} tool. Fast processing, secure & no limits. Start now!`,
    ],
    
    // Introduction paragraph
    introduction: `The ${toolName} is a powerful free online ${toolType} designed to help you accomplish your tasks quickly and efficiently. Whether you're a developer, designer, student, or professional, our tool provides the functionality you need without any complexity.`,
    
    // How to use description
    howToUse: `Using ${toolName} is simple and straightforward. Enter your input, customize settings if needed, and get instant results. No downloads, no installations, and no registration required - everything works directly in your browser with complete privacy.`,
    
    // Benefits/Bullet points for content
    benefits: getBenefitsForTool(tool, category),
    
    // Keywords for SEO
    keywords: generateKeywords(toolName, category, toolType),
    
    // Semantic keywords (LSI)
    semanticKeywords: generateSemanticKeywords(category, toolType),
  };
}

function getBenefitsForTool(tool: Tool, category: string): string[] {
  const baseBenefits = [
    'Completely free - no hidden charges or premium tiers',
    '100% secure - all processing happens locally in your browser',
    'No registration required - use instantly without signup',
    'Fast and responsive - optimized for quick results',
    'Mobile-friendly - works on all devices and screen sizes',
  ];
  
  const categoryBenefits: Record<string, string[]> = {
    converter: [
      'Supports multiple file formats',
      'High-quality output with no quality loss',
      'Batch conversion support for multiple files',
      'Preserves metadata and properties',
    ],
    calculator: [
      'Accurate calculations every time',
      'Real-time results as you type',
      'Save and reuse calculation history',
      'Complex formula support',
    ],
    image: [
      'Advanced editing capabilities',
      'Multiple export format options',
      'High-resolution output quality',
      'Professional-grade tools',
    ],
    text: [
      'Rich formatting options',
      'Export to multiple document formats',
      'Grammar and spell checking',
      'Collaboration features',
    ],
    developer: [
      'Code syntax highlighting',
      'Error detection and validation',
      'Format and beautify code',
      'Multiple programming language support',
    ],
    ai: [
      'Powered by advanced AI models',
      'Natural language understanding',
      'Context-aware processing',
      'Continuous learning and improvement',
    ],
    pdf: [
      'Preserves document formatting',
      'Merge and split capabilities',
      'Password protection support',
      'Annotation and markup tools',
    ],
  };
  
  const specificBenefits = categoryBenefits[category] || [
    'Easy to use interface',
    'Professional-grade features',
    'Regular updates and improvements',
    'Community-driven development',
  ];
  
  return [...baseBenefits, ...specificBenefits];
}

function generateKeywords(toolName: string, category: string, toolType: string): string[] {
  const baseKeywords = [
    toolName.toLowerCase(),
    `free ${toolName.toLowerCase()}`,
    `${toolName.toLowerCase()} online`,
    `online ${toolName.toLowerCase()}`,
    'free online tools',
    'no signup required',
    'instant results',
    'secure and private',
  ];
  
  const categoryKeywords: Record<string, string[]> = {
    converter: ['file converter', 'format converter', 'convert online', 'free converter tool'],
    calculator: ['online calculator', 'free calculator', 'math calculator', 'calculate online'],
    image: ['image editor', 'photo editor', 'online image tool', 'edit images online'],
    text: ['text tool', 'text editor', 'word counter', 'text analyzer'],
    developer: ['developer tools', 'code tool', 'programming tools', 'web developer'],
    ai: ['AI tool', 'artificial intelligence', 'AI generator', 'machine learning'],
    pdf: ['PDF tool', 'edit PDF', 'PDF converter', 'PDF editor online'],
    url: ['URL shortener', 'link shortener', 'short URL', 'URL tools'],
  };
  
  const keywords = new Set([
    ...baseKeywords,
    ...(categoryKeywords[category] || []),
    `${category} tool`,
    `best ${toolType} tool`,
    `${toolType} online free`,
  ]);
  
  return Array.from(keywords);
}

function generateSemanticKeywords(category: string, _toolType: string): string[] {
  const semanticMap: Record<string, string[]> = {
    converter: ['convert files', 'file format conversion', 'batch processing', 'output formats'],
    calculator: ['calculations', 'math operations', 'formulas', 'numeric analysis'],
    image: ['image processing', 'photo editing', 'visual content', 'graphics design'],
    text: ['content creation', 'text processing', 'document editing', 'writing tools'],
    developer: ['software development', 'coding tools', 'programming utilities', 'dev resources'],
    ai: ['AI powered', 'smart tools', 'automated processing', 'intelligent features'],
    pdf: ['document management', 'PDF handling', 'file organization', 'document tools'],
    url: ['link management', 'URL optimization', 'short links', 'link tracking'],
  };
  
  return semanticMap[category] || ['online tools', 'web applications', 'digital utilities', 'productivity tools'];
}

export function generateFaqsByType(tool: Tool): Array<{question: string; answer: string}> {
  const category = tool.category.toLowerCase();
  const toolName = tool.name;
  
  const categoryFAQs: Record<string, Array<{question: string; answer: string}>> = {
    converter: [
      {
        question: `What file formats does ${toolName} support?`,
        answer: `${toolName} supports a wide range of file formats including common ones like PDF, DOC, JPG, PNG, and many others. Check the tool interface for specific format options.`
      },
      {
        question: `Is there a file size limit when using ${toolName}?`,
        answer: `${toolName} can handle files of various sizes. While we support most common file sizes, extremely large files may take longer to process. For optimal performance, we recommend files under 100MB.`
      },
      {
        question: `Will my files be stored on your servers?`,
        answer: `No. ${toolName} processes all files locally in your browser. Your files are never uploaded to our servers, ensuring complete privacy and security.`
      }
    ],
    calculator: [
      {
        question: `Is ${toolName} accurate for complex calculations?`,
        answer: `Yes, ${toolName} uses precise algorithms to ensure accurate results for both simple and complex calculations. It follows standard mathematical principles and formulas.`
      },
      {
        question: `Can I save or export my calculation results?`,
        answer: `${toolName} allows you to copy results to clipboard or export them in various formats. You can also take screenshots for your records.`
      }
    ],
    image: [
      {
        question: `Does ${toolName} reduce image quality?`,
        answer: `No, ${toolName} is designed to preserve the original quality of your images. You can choose from various export options to maintain the best possible quality.`
      },
      {
        question: `What image formats can I work with?`,
        answer: `${toolName} supports popular image formats including JPG, PNG, GIF, WebP, and SVG. You can convert between these formats as needed.`
      }
    ],
    pdf: [
      {
        question: `Are my PDF files secure with ${toolName}?`,
        answer: `Absolutely. All PDF processing happens locally in your browser. We never upload, store, or access your PDF files. Your documents remain completely private.`
      },
      {
        question: `Can ${toolName} handle password-protected PDFs?`,
        answer: `${toolName} can work with password-protected PDFs. You'll need to enter the password to unlock the document before processing.`
      }
    ],
    text: [
      {
        question: `Does ${toolName} save my text data?`,
        answer: `No, your text data is never saved or transmitted. Everything is processed locally in your browser session and is lost when you close the page.`
      },
      {
        question: `Can I use ${toolName} offline?`,
        answer: `${toolName} requires an internet connection to load initially, but once loaded, many features work offline in your browser.`
      }
    ],
    ai: [
      {
        question: `How does ${toolName} use AI?`,
        answer: `${toolName} leverages advanced AI models to provide intelligent processing and generation capabilities. The AI runs in your browser or on our secure servers, depending on the specific tool.`
      },
      {
        question: `Is my data used to train AI models?`,
        answer: `No, your data is never used to train or improve our AI models. We respect your privacy and keep your data confidential.`
      }
    ]
  };
  
  const generalFAQs = [
    {
      question: `Is ${toolName} really free to use?`,
      answer: `Yes, ${toolName} is completely free with no hidden charges, premium tiers, or usage limits. You can use it as often as you need.`
    },
    {
      question: `Do I need to create an account to use ${toolName}?`,
      answer: `No account is required. ${toolName} is designed for instant use - just visit the page and start using it right away.`
    },
    {
      question: `Is ${toolName} available on mobile devices?`,
      answer: `Yes, ${toolName} is fully responsive and works on all devices including smartphones, tablets, and desktop computers.`
    },
    {
      question: `How secure is ${toolName}?`,
      answer: `${toolName} prioritizes your security and privacy. All processing happens locally in your browser, and we never store or access your data.`
    }
  ];
  
  return categoryFAQs[category] || generalFAQs;
}

export function generateStructuredData(tool: Tool) {
  const category = tool.category;
  const toolName = tool.name;
  const description = tool.description;
  const url = `https://indiatoolkit.in/tool/${tool.slug}`;
  
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: toolName,
    description: description,
    applicationCategory: `${category}Application`,
    operatingSystem: 'Web',
    url: url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: tool.rating ? {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      ratingCount: tool.usageCount || 100
    } : undefined
  };
  
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: generateFaqsByType(tool).map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
  
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use ${toolName}`,
    description: `Step-by-step guide for using ${toolName}`,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Access the tool',
        text: `Visit ${url} to access ${toolName}`
      },
      {
        '@type': 'HowToStep',
        name: 'Input your data',
        text: 'Enter your information or upload your file'
      },
      {
        '@type': 'HowToStep',
        name: 'Get results',
        text: 'Click process and view your results instantly'
      }
    ]
  };
  
  return [softwareSchema, faqSchema, howToSchema].filter(Boolean);
}
