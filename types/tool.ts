export interface FAQ {
  question: string;
  answer: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  type: 'calculator' | 'converter' | 'analyzer' | 'generator' | 'formatter' | 'validator' | 'upload' | 'chart' | 'ai';
  icon: string; // SVG icon name or path
  componentName: string; // The component to lazy load
  seo: SEOData;
  faqs: FAQ[];
  isPopular?: boolean;
}

export interface ToolCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string; // Solid color for the category
}
