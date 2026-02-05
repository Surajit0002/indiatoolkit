export interface FAQ {
  question: string;
  answer: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
}

export interface ToolConfigData {
  inputs: string[];
  outputs: string[];
  settings: string[];
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
  isNew?: boolean; // New tool badge
  verified?: boolean; // Verified tool badge
  tags?: string[]; // Tags for the tool
  featured?: boolean; // Featured tool
  rating?: number; // Tool rating (1-5)
  usageCount?: number; // Number of times used
  features?: string[]; // Features list for search
  lastUpdated?: string; // Last update date
  isTrending?: boolean; // Trending tool badge
  previewUrl?: string; // Preview URL for the tool
  popular?: boolean; // Popular filter
  new?: boolean; // New tool badge
  aiPowered?: boolean; // AI powered indicator
  color?: string; // Category color
  config?: ToolConfigData; // Tool configuration
  // Additional properties used in components
  stats?: {
    views: number;
    uses: number;
    saves: number;
    usageCount?: number; // Alias for uses
    averageRating?: number; // Alias for rating
  };
  createdAt?: string; // Creation date
  accentColor?: string; // Accent color for UI
  backgroundColor?: string; // Background color for UI
  svgIcon?: string; // Custom SVG icon
  difficulty?: 'beginner' | 'intermediate' | 'advanced'; // Tool difficulty level
  popularity?: number; // Popularity score (0-100)
  isFeatured?: boolean; // Featured flag (alias for featured)
  usage?: number; // Usage count (alias for usageCount)
  pricing?: 'free' | 'freemium' | 'paid' | 'subscription'; // Pricing model
  reviews?: number; // Number of reviews
  trendingScore?: number; // Trending score for sorting
}

export interface ToolCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string; // Solid color for the category
  toolCount?: number; // Number of tools in category
  featured?: boolean; // Featured category
}

// ToolConfig is an alias for Tool
export type ToolConfig = Tool;

export interface UserToolConfig {
  toolId: string;
  isFavorite: boolean;
  isPinned: boolean;
  customConfig: Record<string, unknown>;
}
