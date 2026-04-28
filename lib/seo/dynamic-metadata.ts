// Dynamic SEO Metadata Generator
// Generates high-CTR titles, descriptions, and structured data

import { Tool } from '@/types/tool';

export interface GeneratedMetadata {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  h2: string;
  structuredData: Array<Record<string, unknown>>;
}

// High CTR Title Patterns
const TITLE_PATTERNS = {
  converter: [
    '{tool} Online Free – Fast & Secure Converter',
    'Free {tool} - Convert Files Instantly',
    '{tool} Tool - No Login Required',
    'Convert {target} to {format} Free Online',
  ],
  calculator: [
    '{tool} Online Free - Fast & Accurate',
    'Free {tool} - Calculate Instantly',
    '{tool} Tool - No Registration',
    'Calculate {target} Free Online',
  ],
  'image-tools': [
    '{tool} Online Free - HD Quality',
    'Free {tool} - Edit Images Fast',
    '{tool} Tool - No Login Required',
    '{action} Images Free Online',
  ],
  'pdf-tools': [
    '{tool} Online Free - Fast & Secure',
    'Free PDF {tool} - No Login',
    '{tool} Tool - Preserve Quality',
    '{action} PDF Free Online',
  ],
  ai: [
    'AI {tool} Online Free - Smart & Fast',
    'Free AI {tool} - Generate Instantly',
    'AI {tool} Tool - No Login Required',
    'Create with AI {tool} Free',
  ],
  default: [
    '{tool} Online Free - Fast & Secure',
    'Free {tool} - No Login Required',
    '{tool} Tool - Instant Results',
    '{tool} Free Online',
  ],
};

// High CTR Description Patterns
const DESCRIPTION_PATTERNS = {
  converter: [
    'Convert {target} to {format} online for free. No registration required. Fast, secure, and preserves quality. Try now!',
    'Free {tool} to convert your files instantly. No signup needed. Works in your browser. 100% secure & private.',
    'Convert {target} to {format} with our free online tool. No installation. No limits. Fast results every time.',
  ],
  calculator: [
    'Calculate {target} online for free. Instant results with our free {tool}. No signup required. Accurate & fast!',
    'Free {tool} to calculate {target}. Works instantly in your browser. No registration. 100% secure calculations.',
    'Need to calculate {target}? Use our free {tool}. Fast, accurate, and completely free. Try it now!',
  ],
  'image-tools': [
    '{action} images online for free with our {tool}. No signup required. HD quality. Fast & secure. Try now!',
    'Free {tool} to {action} your images. Works in browser. No installation. Preserves quality. 100% private.',
    '{action} images instantly with our free {tool}. No login needed. Fast processing. Perfect quality every time.',
  ],
  'pdf-tools': [
    '{action} PDF files online for free. Our free {tool} preserves formatting. No signup. Fast & secure. Try now!',
    'Free {tool} to {action} PDFs. No registration required. Maintains quality. Works in your browser. 100% secure.',
    '{action} PDF files instantly with our free {tool}. Fast processing. No limits. Completely free to use.',
  ],
  ai: [
    'Generate {target} with AI {tool} for free. Instant results. No signup required. Smart & creative. Try now!',
    'Free AI {tool} to {action}. Powered by advanced AI. Fast generation. No login needed. 100% free to use.',
    'Create {target} instantly with AI {tool}. Free, fast, and smart. No registration. Unlimited creativity.',
  ],
  default: [
    'Use our free {tool} online. No signup required. Fast, secure, and easy to use. Get instant results now!',
    'Free {tool} to {action}. Works instantly in your browser. No installation. 100% secure & private. Try it!',
    '{action} with our free {tool}. No login needed. Fast results. Completely free. Start using now!',
  ],
};

export function generateHighCTRMetadata(tool: Tool): GeneratedMetadata {
  const category = tool.category || 'default';
  const patterns = TITLE_PATTERNS[category as keyof typeof TITLE_PATTERNS] || TITLE_PATTERNS.default;
  const descPatterns = DESCRIPTION_PATTERNS[category as keyof typeof DESCRIPTION_PATTERNS] || DESCRIPTION_PATTERNS.default;
  
  // Select pattern based on tool characteristics
  const patternIndex = Math.floor(Math.random() * patterns.length);
  const descIndex = Math.floor(Math.random() * descPatterns.length);
  
  let title = patterns[patternIndex];
  let description = descPatterns[descIndex];
  
  // Replace placeholders
  const placeholders = {
    '{tool}': tool.name,
    '{target}': extractTarget(tool),
    '{format}': extractFormat(tool),
    '{action}': extractAction(tool),
  };
  
  Object.entries(placeholders).forEach(([key, value]) => {
    title = title.replace(key, value);
    description = description.replace(key, value);
  });
  
  // Ensure title isn't too long (max 60 chars for optimal display)
  if (title.length > 60) {
    title = `${tool.name} Online Free - Fast, Secure & No Login`;
  }
  
  // Ensure description isn't too long (max 160 chars)
  if (description.length > 160) {
    description = `Use our free ${tool.name.toLowerCase()} online. No signup required. Fast, secure, and instant results.`;
  }
  
  return {
    title: `${title} | India Toolkit`,
    description,
    keywords: generateKeywords(tool),
    h1: tool.name,
    h2: generateH2(tool),
    structuredData: generateStructuredData(tool),
  };
}

function extractTarget(tool: Tool): string {
  const targets: Record<string, string> = {
    'image-to-jpg-converter': 'images',
    'pdf-to-word-converter': 'PDF files',
    'csv-to-excel': 'CSV files',
    'url-shortener': 'long URLs',
    'plagiarism-checker': 'text',
    'password-generator': 'passwords',
    'word-counter': 'words and characters',
  };
  return targets[tool.slug] || 'files';
}

function extractFormat(tool: Tool): string {
  const formats: Record<string, string> = {
    'image-to-jpg-converter': 'JPG',
    'png-to-jpg': 'JPG',
    'pdf-to-word-converter': 'Word',
    'csv-to-excel': 'Excel',
  };
  return formats[tool.slug] || 'format';
}

function extractAction(tool: Tool): string {
  const actions: Record<string, string> = {
    'image-to-jpg-converter': 'Convert',
    'image-compressor': 'Compress',
    'pdf-to-word-converter': 'Convert',
    'password-generator': 'Generate',
    'plagiarism-checker': 'Check',
    'word-counter': 'Count',
    'url-shortener': 'Shorten',
  };
  return actions[tool.slug] || 'Use';
}

function generateKeywords(tool: Tool): string[] {
  const baseKeywords = [
    tool.name.toLowerCase(),
    `free ${tool.name.toLowerCase()}`,
    `${tool.name.toLowerCase()} online`,
    `online ${tool.name.toLowerCase()}`,
    'free online tools',
    'no signup required',
    tool.category,
  ];
  
  if (tool.seo?.keywords) {
    return [...new Set([...tool.seo.keywords, ...baseKeywords])];
  }
  
  return baseKeywords;
}

function generateH2(tool: Tool): string {
  const h2Options = [
    `Fast, Secure, and ${tool.name === 'PDF to Word Converter' ? 'Free' : 'Free'}`,
    `No Login Required - Start Now`,
    `100% Free Online Tool`,
    `Instant Results in Your Browser`,
  ];
  return h2Options[Math.floor(Math.random() * h2Options.length)];
}

function generateStructuredData(tool: Tool): Array<Record<string, unknown>> {
  const baseUrl = `https://indiatoolkit.in/tool/${tool.slug}`;
  
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: `${tool.category}Application`,
    operatingSystem: 'Web',
    url: baseUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: tool.rating ? {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      ratingCount: tool.usageCount || 1000,
    } : undefined,
  };
  
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: generateFAQItems(tool),
  };
  
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Use ${tool.name}`,
    description: `Step-by-step guide for using ${tool.name}`,
    step: generateHowToSteps(tool),
  };
  
  return [softwareSchema, faqSchema, howToSchema].filter(Boolean);
}

function generateFAQItems(tool: Tool): Array<{ '@type': 'Question'; name: string; acceptedAnswer: { '@type': 'Answer'; text: string } }> {
  const faqs = tool.faqs || [];
  const generalFAQs = [
    {
      question: `Is ${tool.name} really free to use?`,
      answer: `Yes, ${tool.name} is completely free. No hidden fees, no premium tiers, no sign-up required. Use it as often as you need.`,
    },
    {
      question: `Do I need to create an account to use ${tool.name}?`,
      answer: `No account needed. ${tool.name} works instantly in your browser. Just visit the page and start using it right away.`,
    },
    {
      question: `Is ${tool.name} secure and private?`,
      answer: `Yes. All processing happens locally in your browser. We don't store or access your data. Your privacy is guaranteed.`,
    },
    {
      question: `How fast is ${tool.name}?`,
      answer: `Most operations complete instantly. Simple tasks finish in milliseconds, complex ones in just a few seconds.`,
    },
  ];
  
  const allFaqs = [...faqs, ...generalFAQs].slice(0, 8);
  
  return allFaqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  }));
}

function generateHowToSteps(tool: Tool): Array<{ '@type': 'HowToStep'; position: number; name: string; text: string }> {
  const stepsByType: Record<string, Array<{ name: string; text: string }>> = {
    calculator: [
      { name: 'Enter Values', text: 'Input your numbers in the provided fields' },
      { name: 'Configure Options', text: 'Select calculation settings if needed' },
      { name: 'Calculate', text: 'Click the calculate button to get results' },
      { name: 'View Results', text: 'See your calculation instantly' },
    ],
    converter: [
      { name: 'Upload File', text: 'Select or drag your file to upload' },
      { name: 'Select Format', text: 'Choose your desired output format' },
      { name: 'Convert', text: 'Click convert to process your file' },
      { name: 'Download', text: 'Save the converted file to your device' },
    ],
    default: [
      { name: 'Get Started', text: 'Open the tool in your browser' },
      { name: 'Input Data', text: 'Enter or upload your information' },
      { name: 'Process', text: 'Click the process button' },
      { name: 'Get Results', text: 'Download or copy your results' },
    ],
  };
  
  const steps = stepsByType[tool.type] || stepsByType.default;
  
  return steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  }));
}
