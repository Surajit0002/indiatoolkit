/**
 * SEO Content for Category Pages
 * Each category has unique intro content, benefits, use cases, and FAQs
 * This helps with content quality and SEO rankings
 */

import { ToolCategory } from "@/types/tool";

export interface CategoryContent {
  id: string;
  intro: string;
  benefits: string[];
  useCases: string[];
  faqs: { question: string; answer: string }[];
}

export const categoryContent: Record<string, CategoryContent> = {
  calculators: {
    id: "calculators",
    intro: `India Toolkit offers a comprehensive collection of free online calculators designed to simplify complex calculations for students, professionals, and businesses across India. Our calculator tools are built with precision and ease-of-use in mind, providing instant results without any registration or software installation. Whether you need to calculate percentages, EMIs, BMI, or compound interest, our tools deliver accurate results in seconds.`,
    benefits: [
      "100% Free - No hidden charges or premium tiers",
      "Instant Results - Real-time calculations as you type",
      "Mobile Friendly - Works perfectly on all devices",
      "No Registration - Start calculating immediately",
      "Accurate Formulas - Industry-standard calculation methods",
      "Privacy First - All calculations happen in your browser",
    ],
    useCases: [
      "Students: Calculate percentages, GPAs, and exam scores",
      "Business Owners: Compute EMI, interest, and ROI",
      "Health Conscious: Track BMI, calories, and fitness metrics",
      "Financial Planning: Plan investments and savings",
      "Engineers: Quick mathematical calculations",
      "Everyday Use: Tip calculation, discounts, and conversions",
    ],
    faqs: [
      {
        question: "Are these calculators free to use?",
        answer: "Yes, all calculators on India Toolkit are completely free to use with no hidden charges or premium features.",
      },
      {
        question: "How accurate are the calculation results?",
        answer: "Our calculators use industry-standard formulas and algorithms to ensure highly accurate results. However, for critical financial decisions, we recommend consulting with a professional.",
      },
      {
        question: "Can I use these calculators on my mobile phone?",
        answer: "Absolutely! All our calculators are fully responsive and work seamlessly on smartphones, tablets, and desktop computers.",
      },
      {
        question: "Do I need to create an account to use these tools?",
        answer: "No registration is required. You can start using any calculator immediately without signing up or providing any personal information.",
      },
    ],
  },

  converters: {
    id: "converters",
    intro: `Convert between different units, formats, and file types with our powerful collection of free online converters. India Toolkit's converter tools support a wide range of conversions including units of measurement, currencies, file formats, and more. Our tools are designed to be fast, accurate, and easy to use, making conversion tasks simple for everyone.`,
    benefits: [
      "Wide Format Support - Convert between dozens of formats",
      "High Quality - Maintain quality during conversion",
      "Fast Processing - Instant results for most conversions",
      "No Software Install - Works directly in your browser",
      "Batch Support - Convert multiple items at once",
      "Secure - Your data stays on your device",
    ],
    useCases: [
      "Students: Convert units for homework and projects",
      "Travelers: Currency and time zone conversions",
      "Developers: Data format conversions (JSON, CSV, XML)",
      "Designers: Image and color format conversions",
      "Business: Document and file format conversions",
      "Everyday: Temperature, weight, and length conversions",
    ],
    faqs: [
      {
        question: "What file formats can I convert?",
        answer: "We support a wide range of formats including images (JPG, PNG, WebP), documents (PDF, DOC), data files (JSON, CSV, XML), and more. Check individual tools for specific format support.",
      },
      {
        question: "Is there a file size limit for conversions?",
        answer: "Most of our converter tools can handle files up to 50MB. For larger files, we recommend splitting them into smaller parts.",
      },
      {
        question: "Will my converted files have watermarks?",
        answer: "No, all our conversions are clean and watermark-free. You get professional-quality output without any branding.",
      },
    ],
  },

  "text-tools": {
    id: "text-tools",
    intro: `Transform, analyze, and manipulate text with our comprehensive suite of free text tools. From word counting and case conversion to advanced text analysis and formatting, India Toolkit provides everything you need to work with text efficiently. Perfect for writers, students, developers, and anyone who works with text regularly.`,
    benefits: [
      "Instant Processing - Real-time text analysis",
      "Multiple Tools - All text utilities in one place",
      "Privacy Focused - Text processing happens locally",
      "No Character Limits - Handle large documents easily",
      "Copy & Paste - Quick input and output",
      "Export Options - Save results in various formats",
    ],
    useCases: [
      "Writers: Word count, character count, and readability analysis",
      "Developers: Code formatting, JSON validation, and text encoding",
      "Students: Essay word counts and text formatting",
      "Marketers: Social media character limits and hashtag tools",
      "Translators: Text comparison and analysis",
      "Content Creators: Title case, sentence case, and formatting",
    ],
    faqs: [
      {
        question: "Is my text data safe?",
        answer: "Yes, all text processing happens directly in your browser. Your text is never sent to our servers, ensuring complete privacy.",
      },
      {
        question: "What's the maximum text length I can process?",
        answer: "Our tools can handle very large texts - typically up to several million characters. Performance may vary based on your device.",
      },
      {
        question: "Can I use these tools for commercial purposes?",
        answer: "Yes, all our text tools are free for both personal and commercial use without any restrictions.",
      },
    ],
  },

  "dev-tools": {
    id: "dev-tools",
    intro: `Boost your development workflow with our collection of free developer tools. India Toolkit offers essential utilities for web developers, software engineers, and programmers including code formatters, validators, converters, and generators. All tools work directly in your browser with no installation required.`,
    benefits: [
      "Time Saving - Automate repetitive coding tasks",
      "Code Quality - Format and validate code instantly",
      "Learning Tool - Understand code structure better",
      "Cross-Platform - Works on any OS with a browser",
      "No Setup - No installation or configuration needed",
      "Open Standards - Support for all major formats",
    ],
    useCases: [
      "Web Developers: JSON formatting, HTML/CSS minification",
      "Backend Developers: Base64 encoding, JWT debugging",
      "DevOps: Hash generation, cron job builders",
      "Security: Password generation, encryption tools",
      "Testing: Mock data generation, regex testing",
      "Documentation: Code to documentation converters",
    ],
    faqs: [
      {
        question: "Are these tools suitable for production use?",
        answer: "Yes, our developer tools are designed to produce production-ready output. However, always review generated code before deploying to production.",
      },
      {
        question: "Do you support all programming languages?",
        answer: "Our tools support major programming languages and formats including JavaScript, Python, JSON, XML, HTML, CSS, and more.",
      },
      {
        question: "Can I integrate these tools into my workflow?",
        answer: "While our tools are browser-based, you can easily incorporate them into your development workflow. Some tools also offer API access.",
      },
    ],
  },

  "image-tools": {
    id: "image-tools",
    intro: `Edit, convert, and optimize images with our powerful collection of free image tools. India Toolkit provides everything you need for image processing including resizing, compression, format conversion, and basic editing. All tools work directly in your browser, keeping your images private and secure.`,
    benefits: [
      "No Upload Required - Process images locally",
      "Quality Control - Adjust compression and quality",
      "Format Support - All major image formats",
      "Batch Processing - Handle multiple images",
      "Instant Preview - See results immediately",
      "Free Forever - No subscriptions or limits",
    ],
    useCases: [
      "Photographers: Resize and compress for web",
      "Designers: Format conversion and optimization",
      "Developers: Image optimization for websites",
      "Marketers: Social media image sizing",
      "Bloggers: Featured image preparation",
      "E-commerce: Product image optimization",
    ],
    faqs: [
      {
        question: "What image formats are supported?",
        answer: "We support all major image formats including JPG, PNG, WebP, GIF, BMP, SVG, and ICO. Some tools also support HEIC and RAW formats.",
      },
      {
        question: "Is there a limit on image size?",
        answer: "Most tools can handle images up to 50MB. For larger images, we recommend resizing first or using our batch processing tools.",
      },
      {
        question: "Will compression affect image quality?",
        answer: "Our tools use smart compression algorithms that minimize quality loss. You can also adjust the compression level to balance quality and file size.",
      },
    ],
  },

  "pdf-tools": {
    id: "pdf-tools",
    intro: `Work with PDF files easily using our comprehensive PDF tools. India Toolkit offers a range of PDF utilities including merging, splitting, compression, and conversion. All processing happens in your browser, ensuring your documents remain private and secure.`,
    benefits: [
      "No Upload - Process PDFs locally in browser",
      "Privacy First - Documents never leave your device",
      "Multiple Tools - All PDF utilities in one place",
      "High Quality - Maintain document quality",
      "Fast Processing - Efficient PDF operations",
      "Cross-Platform - Works on any device",
    ],
    useCases: [
      "Business: Merge reports and contracts",
      "Students: Combine study materials",
      "Legal: Split and organize documents",
      "HR: Process employment documents",
      "Finance: Compress and archive statements",
      "General: Convert PDFs to editable formats",
    ],
    faqs: [
      {
        question: "Are my PDFs uploaded to your servers?",
        answer: "No, all PDF processing happens directly in your browser. Your documents never leave your device, ensuring complete privacy.",
      },
      {
        question: "What's the maximum PDF file size?",
        answer: "Most tools can handle PDFs up to 100MB. For larger files, we recommend splitting them first using our PDF splitter tool.",
      },
      {
        question: "Can I password-protect my PDFs?",
        answer: "Yes, we offer PDF encryption tools that allow you to add password protection to your documents.",
      },
    ],
  },

  "ai-tools": {
    id: "ai-tools",
    intro: `Harness the power of artificial intelligence with our collection of AI-powered tools. India Toolkit offers innovative AI tools for content generation, image processing, text analysis, and more. Experience cutting-edge AI technology without any cost or registration.`,
    benefits: [
      "Free AI Access - No subscription required",
      "Easy to Use - Simple, intuitive interfaces",
      "Instant Results - Fast AI processing",
      "Multiple Models - Various AI capabilities",
      "No API Keys - Works out of the box",
      "Regular Updates - New AI features added frequently",
    ],
    useCases: [
      "Content Creators: Generate ideas, captions, and content",
      "Marketers: Create ad copy and social media posts",
      "Students: Get help with writing and research",
      "Developers: Generate code and documentation",
      "Designers: AI-powered image enhancement",
      "Business: Automate content creation workflows",
    ],
    faqs: [
      {
        question: "How do your AI tools work?",
        answer: "Our AI tools use advanced machine learning models to process your input and generate relevant output. The specific technology varies by tool.",
      },
      {
        question: "Is there a limit on AI tool usage?",
        answer: "Most AI tools have generous daily limits to prevent abuse. Premium features may be available for heavy users.",
      },
      {
        question: "Can I use AI-generated content commercially?",
        answer: "Yes, content generated by our AI tools can be used for both personal and commercial purposes. However, always review and verify AI-generated content.",
      },
    ],
  },
};

/**
 * Get content for a specific category
 */
export function getCategoryContent(categoryId: string): CategoryContent | null {
  return categoryContent[categoryId] || null;
}

/**
 * Get default content for categories without specific content
 */
export function getDefaultCategoryContent(category: ToolCategory): CategoryContent {
  return {
    id: category.id,
    intro: `Explore our collection of ${category.name.toLowerCase()} at India Toolkit. ${category.description} All tools are free, easy to use, and work directly in your browser.`,
    benefits: [
      "100% Free - No hidden charges",
      "Easy to Use - Intuitive interface",
      "Fast Results - Instant processing",
      "No Registration - Start immediately",
      "Secure - Your data stays private",
      "Cross-Platform - Works on all devices",
    ],
    useCases: [
      "Personal use and everyday tasks",
      "Professional and business applications",
      "Educational purposes",
      "Creative projects",
    ],
    faqs: [
      {
        question: `Are these ${category.name.toLowerCase()} free to use?`,
        answer: `Yes, all ${category.name.toLowerCase()} on India Toolkit are completely free to use without any registration or payment required.`,
      },
      {
        question: "Do I need to create an account?",
        answer: "No, you can use all our tools without creating an account. Just visit the tool and start using it immediately.",
      },
    ],
  };
}
