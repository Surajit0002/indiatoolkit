
export interface DynamicToolConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  features: string[];
  complexity: 'basic' | 'intermediate' | 'advanced' | 'expert';
  popularity: number; // 1-100
  usageCount: number;
  lastUpdated: string;
  tags: string[];
  dependencies: string[];
  requiresAuth: boolean;
  hasRealTime: boolean;
  hasAI: boolean;
  hasCollaboration: boolean;
  performance: {
    speed: 'fast' | 'medium' | 'slow';
    accuracy: number; // 0-100
    reliability: number; // 0-100
  };
  integrations: {
    api: boolean;
    database: boolean;
    external: string[];
  };
}

export const dynamicToolCategories: Record<string, DynamicToolConfig[]> = {
  'ai-tools': [
    {
      id: 'ai-content-generator',
      name: 'AI Content Generator',
      slug: 'ai-content-generator',
      description: 'Generate high-quality content using advanced AI models with real-time suggestions',
      icon: 'Sparkles',
      color: '#A855F7',
      category: 'ai-tools',
      features: ['Real-time Generation', 'Multiple Models', 'Custom Tone', 'Content Templates', 'SEO Optimization'],
      complexity: 'advanced',
      popularity: 95,
      usageCount: 12500,
      lastUpdated: '2026-02-03',
      tags: ['ai', 'content', 'writing', 'seo', 'creative'],
      dependencies: ['openai', 'anthropic'],
      requiresAuth: true,
      hasRealTime: true,
      hasAI: true,
      hasCollaboration: true,
      performance: {
        speed: 'fast',
        accuracy: 94,
        reliability: 98
      },
      integrations: {
        api: true,
        database: true,
        external: ['OpenAI', 'Claude', 'Google Gemini']
      }
    },
    {
      id: 'ai-code-assistant',
      name: 'AI Code Assistant',
      slug: 'ai-code-assistant',
      description: 'Intelligent code completion, refactoring, and bug detection with contextual awareness',
      icon: 'Bot',
      color: '#3B82F6',
      category: 'ai-tools',
      features: ['Code Completion', 'Bug Detection', 'Refactoring', 'Code Review', 'Multi-language'],
      complexity: 'expert',
      popularity: 92,
      usageCount: 9800,
      lastUpdated: '2026-02-03',
      tags: ['ai', 'code', 'programming', 'assistant', 'developer'],
      dependencies: ['github-copilot', 'codestral'],
      requiresAuth: true,
      hasRealTime: true,
      hasAI: true,
      hasCollaboration: true,
      performance: {
        speed: 'fast',
        accuracy: 91,
        reliability: 96
      },
      integrations: {
        api: true,
        database: true,
        external: ['GitHub Copilot', 'Claude Code', 'Amazon CodeWhisperer']
      }
    }
  ],
  'advanced-analyzers': [
    {
      id: 'data-pattern-analyzer',
      name: 'Data Pattern Analyzer',
      slug: 'data-pattern-analyzer',
      description: 'Advanced data mining and pattern recognition with predictive analytics',
      icon: 'Activity',
      color: '#F59E0B',
      category: 'advanced-analyzers',
      features: ['Pattern Recognition', 'Predictive Analysis', 'Trend Forecasting', 'Data Visualization', 'Anomaly Detection'],
      complexity: 'expert',
      popularity: 78,
      usageCount: 6700,
      lastUpdated: '2026-02-03',
      tags: ['data', 'analysis', 'machine-learning', 'patterns', 'statistics'],
      dependencies: ['python-sklearn', 'd3'],
      requiresAuth: false,
      hasRealTime: true,
      hasAI: true,
      hasCollaboration: true,
      performance: {
        speed: 'medium',
        accuracy: 95,
        reliability: 92
      },
      integrations: {
        api: true,
        database: true,
        external: ['AWS Analytics', 'Azure ML', 'Google AI']
      }
    },
    {
      id: 'network-traffic-analyzer',
      name: 'Network Traffic Analyzer',
      slug: 'network-traffic-analyzer',
      description: 'Real-time network monitoring with security threat detection and performance optimization',
      icon: 'Network',
      color: '#10B981',
      category: 'advanced-analyzers',
      features: ['Real-time Monitoring', 'Threat Detection', 'Performance Analysis', 'Traffic Patterns', 'Security Alerts'],
      complexity: 'advanced',
      popularity: 85,
      usageCount: 8200,
      lastUpdated: '2026-02-03',
      tags: ['network', 'security', 'monitoring', 'performance', 'analysis'],
      dependencies: ['wireshark', 'nmap'],
      requiresAuth: true,
      hasRealTime: true,
      hasAI: true,
      hasCollaboration: false,
      performance: {
        speed: 'fast',
        accuracy: 93,
        reliability: 97
      },
      integrations: {
        api: true,
        database: true,
        external: ['Cisco', 'Palo Alto', 'Fortinet']
      }
    }
  ],
  'creative-tools': [
    {
      id: '3d-design-generator',
      name: '3D Design Generator',
      slug: '3d-design-generator',
      description: 'AI-powered 3D model generation and rendering with real-time collaboration',
      icon: 'Box',
      color: '#EC4899',
      category: 'creative-tools',
      features: ['3D Modeling', 'Real-time Rendering', 'AI Generation', 'Collaboration', 'Export Options'],
      complexity: 'advanced',
      popularity: 88,
      usageCount: 5400,
      lastUpdated: '2026-02-03',
      tags: ['3d', 'design', 'creative', 'modeling', 'rendering'],
      dependencies: ['threejs', 'blender'],
      requiresAuth: true,
      hasRealTime: true,
      hasAI: true,
      hasCollaboration: true,
      performance: {
        speed: 'medium',
        accuracy: 89,
        reliability: 94
      },
      integrations: {
        api: true,
        database: true,
        external: ['Blender', 'Sketchfab', 'SketchUp']
      }
    },
    {
      id: 'video-editor-ai',
      name: 'AI Video Editor',
      slug: 'video-editor-ai',
      description: 'Intelligent video editing with automatic scene detection and enhancement',
      icon: 'Film',
      color: '#F97316',
      category: 'creative-tools',
      features: ['Auto Editing', 'Scene Detection', 'AI Enhancement', 'Template Library', 'Multi-format Export'],
      complexity: 'intermediate',
      popularity: 91,
      usageCount: 7800,
      lastUpdated: '2026-02-03',
      tags: ['video', 'editing', 'ai', 'creative', 'media'],
      dependencies: ['ffmpeg', 'opencv'],
      requiresAuth: true,
      hasRealTime: true,
      hasAI: true,
      hasCollaboration: true,
      performance: {
        speed: 'medium',
        accuracy: 87,
        reliability: 91
      },
      integrations: {
        api: true,
        database: true,
        external: ['Adobe Premiere', 'DaVinci Resolve', 'Final Cut Pro']
      }
    }
  ],
  'business-intelligence': [
    {
      id: 'market-trend-analyzer',
      name: 'Market Trend Analyzer',
      slug: 'market-trend-analyzer',
      description: 'Advanced market analysis with predictive modeling and competitive intelligence',
      icon: 'TrendingUp',
      color: '#065F46',
      category: 'business-intelligence',
      features: ['Market Analysis', 'Trend Prediction', 'Competitor Analysis', 'Risk Assessment', 'Investment Insights'],
      complexity: 'expert',
      popularity: 82,
      usageCount: 4300,
      lastUpdated: '2026-02-03',
      tags: ['business', 'market', 'analysis', 'trends', 'investment'],
      dependencies: ['pandas', 'scikit-learn'],
      requiresAuth: true,
      hasRealTime: true,
      hasAI: true,
      hasCollaboration: true,
      performance: {
        speed: 'medium',
        accuracy: 92,
        reliability: 89
      },
      integrations: {
        api: true,
        database: true,
        external: ['Bloomberg', 'Reuters', 'Yahoo Finance']
      }
    },
    {
      id: 'customer-behavior-insights',
      name: 'Customer Behavior Insights',
      slug: 'customer-behavior-insights',
      description: 'Deep customer analytics with segmentation and predictive behavior modeling',
      icon: 'Users',
      color: '#6366F1',
      category: 'business-intelligence',
      features: ['Behavior Analysis', 'Segmentation', 'Predictive Modeling', 'Cohort Analysis', 'Retention Metrics'],
      complexity: 'advanced',
      popularity: 79,
      usageCount: 3800,
      lastUpdated: '2026-02-03',
      tags: ['customer', 'analytics', 'behavior', 'business', 'marketing'],
      dependencies: ['mixpanel', 'amplitude'],
      requiresAuth: true,
      hasRealTime: true,
      hasAI: true,
      hasCollaboration: true,
      performance: {
        speed: 'fast',
        accuracy: 88,
        reliability: 93
      },
      integrations: {
        api: true,
        database: true,
        external: ['Google Analytics', 'Mixpanel', 'Amplitude']
      }
    }
  ],
  'developer-advanced': [
    {
      id: 'code-architecture-analyzer',
      name: 'Code Architecture Analyzer',
      slug: 'code-architecture-analyzer',
      description: 'Advanced code structure analysis with dependency mapping and optimization suggestions',
      icon: 'GitBranch',
      color: '#8B5CF6',
      category: 'developer-advanced',
      features: ['Architecture Analysis', 'Dependency Mapping', 'Code Quality', 'Optimization', 'Security Scanning'],
      complexity: 'expert',
      popularity: 75,
      usageCount: 2900,
      lastUpdated: '2026-02-03',
      tags: ['code', 'architecture', 'analysis', 'developer', 'quality'],
      dependencies: ['sonarqube', 'eslint'],
      requiresAuth: true,
      hasRealTime: true,
      hasAI: true,
      hasCollaboration: true,
      performance: {
        speed: 'medium',
        accuracy: 96,
        reliability: 95
      },
      integrations: {
        api: true,
        database: true,
        external: ['SonarQube', 'ESLint', 'CodeClimate']
      }
    },
    {
      id: 'api-performance-monitor',
      name: 'API Performance Monitor',
      slug: 'api-performance-monitor',
      description: 'Real-time API monitoring with performance metrics and automatic optimization',
      icon: 'Zap',
      color: '#F59E0B',
      category: 'developer-advanced',
      features: ['Performance Monitoring', 'Load Testing', 'Error Tracking', 'Optimization', 'Alerts'],
      complexity: 'advanced',
      popularity: 84,
      usageCount: 5200,
      lastUpdated: '2026-02-03',
      tags: ['api', 'performance', 'monitoring', 'developer', 'optimization'],
      dependencies: ['newrelic', 'datadog'],
      requiresAuth: true,
      hasRealTime: true,
      hasAI: true,
      hasCollaboration: true,
      performance: {
        speed: 'fast',
        accuracy: 94,
        reliability: 97
      },
      integrations: {
        api: true,
        database: true,
        external: ['New Relic', 'Datadog', 'Prometheus']
      }
    }
  ]
};

// Get all dynamic tools
export const getAllDynamicTools = (): DynamicToolConfig[] => {
  return Object.values(dynamicToolCategories).flat();
};

// Get tools by category
export const getToolsByCategory = (category: string): DynamicToolConfig[] => {
  return dynamicToolCategories[category] || [];
};

// Get popular tools
export const getPopularTools = (limit: number = 10): DynamicToolConfig[] => {
  return getAllDynamicTools()
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

// Get trending tools (recently updated with high usage)
export const getTrendingTools = (limit: number = 8): DynamicToolConfig[] => {
  const now = new Date();
  return getAllDynamicTools()
    .filter(tool => {
      const lastUpdated = new Date(tool.lastUpdated);
      const daysDiff = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff <= 30; // Updated in last 30 days
    })
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, limit);
};

// Get AI-powered tools
export const getAITools = (): DynamicToolConfig[] => {
  return getAllDynamicTools().filter(tool => tool.hasAI);
};

// Get real-time tools
export const getRealTimeTools = (): DynamicToolConfig[] => {
  return getAllDynamicTools().filter(tool => tool.hasRealTime);
};

// Search tools
export const searchTools = (query: string): DynamicToolConfig[] => {
  const lowerQuery = query.toLowerCase();
  return getAllDynamicTools().filter(tool => 
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};