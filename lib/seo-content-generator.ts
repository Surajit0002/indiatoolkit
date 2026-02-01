/**
 * SEO Content Generator for Omnitools
 * Generates SEO-optimized content for each tool page
 */

import { Tool } from "../types/tool";

export interface SeoContent {
  introduction: string;
  howToUse: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

/**
 * Generates SEO-optimized content for a specific tool
 */
export function generateSeoContent(tool: Tool): SeoContent {
  // Introduction content
  const introduction = `${tool.name} is a powerful online ${tool.type} tool that helps ${
    tool.type === 'calculator' ? 'users perform calculations' : 
    tool.type === 'converter' ? 'users convert between formats' : 
    tool.type === 'generator' ? 'users create content' : 
    'users analyze data'
  }. This free ${tool.category.replace('-', ' ')} tool provides instant results directly in your browser with no downloads required.`;

  // How to use content
  const howToUse = `Using our ${tool.name} is simple and straightforward. ${
    tool.type === 'calculator' ? 
    `Enter the required values in the input fields and click calculate to get instant results. Our calculator provides accurate results for all your ${tool.category.replace('-', ' ')} needs.` :
    tool.type === 'converter' ? 
    `Upload or paste your content, select the desired output format, and click convert. Our converter ensures high-quality output while maintaining the integrity of your original content.` :
    tool.type === 'generator' ? 
    `Enter your parameters or input data, customize options as needed, and click generate. Our generator creates professional-quality output instantly.` :
    `Input your data in the provided fields, adjust settings as needed, and click process to get your results. Our tool provides comprehensive analysis and output.`
  }`;

  // Benefits
  const benefits = [
    `Completely free to use with no hidden fees or subscriptions`,
    `Works on all devices - desktop, tablet, and mobile friendly`,
    `No registration required - start using immediately`,
    `Secure - all processing happens in your browser`,
    `Fast results with instant processing`,
    `Intuitive interface designed for ease of use`
  ];

  // Generate FAQs based on the tool
  const faqs = [
    {
      question: `What is ${tool.name}?`,
      answer: `${introduction}`
    },
    {
      question: `How do I use ${tool.name}?`,
      answer: `${howToUse}`
    },
    {
      question: `Is ${tool.name} free to use?`,
      answer: `Yes, our ${tool.name} is completely free to use. We believe in providing valuable tools without any cost to our users.`
    },
    {
      question: `Is my data secure when using ${tool.name}?`,
      answer: `Absolutely. All processing happens in your browser, meaning your data never leaves your device. We don't store, transmit, or log any of your information.`
    },
    {
      question: `Can I use ${tool.name} on mobile devices?`,
      answer: `Yes, our ${tool.name} is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers.`
    }
  ];

  return {
    introduction,
    howToUse,
    benefits,
    faqs
  };
}

/**
 * Generates dynamic FAQ content based on tool type
 */
export function generateFaqsByType(tool: Tool): { question: string; answer: string }[] {
  const baseFaqs = [
    {
      question: `What is ${tool.name}?`,
      answer: `Our ${tool.name} is a free online tool that helps you ${
        tool.type === 'calculator' ? 'perform calculations' : 
        tool.type === 'converter' ? 'convert between formats' : 
        tool.type === 'generator' ? 'generate content' : 
        'analyze data'
      } efficiently and accurately.`
    },
    {
      question: `How do I use ${tool.name}?`,
      answer: `Simply enter your data in the input field(s), adjust any settings if needed, and click the process button. Results are generated instantly in your browser.`
    },
    {
      question: `Is ${tool.name} free?`,
      answer: `Yes, all our tools including ${tool.name} are completely free to use with no hidden costs or registration required.`
    }
  ];

  // Add type-specific FAQs
  switch(tool.type) {
    case 'calculator':
      baseFaqs.push(
        {
          question: `How accurate is the ${tool.name}?`,
          answer: `Our ${tool.name} provides highly accurate calculations using reliable mathematical formulas and algorithms.`
        },
        {
          question: `Can I trust the results from ${tool.name}?`,
          answer: `Yes, our ${tool.name} uses proven calculation methods to ensure reliable and accurate results every time.`
        }
      );
      break;
      
    case 'converter':
      baseFaqs.push(
        {
          question: `What file formats are supported?`,
          answer: `Our ${tool.name} supports all common file formats for ${
            tool.category.includes('image') ? 'image conversion' :
            tool.category.includes('pdf') ? 'PDF conversion' :
            'the respective conversion type'
          }.`
        },
        {
          question: `Will the quality be affected during conversion?`,
          answer: `We maintain the highest quality standards during conversion while optimizing for performance and file size.`
        }
      );
      break;
      
    case 'generator':
      baseFaqs.push(
        {
          question: `How do I customize the output?`,
          answer: `Use the various options and settings available in our ${tool.name} to customize your generated content according to your specific needs.`
        },
        {
          question: `Is the generated content unique?`,
          answer: `Yes, our ${tool.name} creates unique content based on your inputs, ensuring originality and relevance.`
        }
      );
      break;
      
    default:
      baseFaqs.push(
        {
          question: `What makes this tool special?`,
          answer: `Our ${tool.name} offers a user-friendly interface, instant processing, and reliable results, all while keeping your data secure and private.`
        }
      );
  }

  return baseFaqs;
}