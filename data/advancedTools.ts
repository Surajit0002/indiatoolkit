import { ToolCategory } from "../types/tool";

export interface AdvancedTool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  features: string[];
  complexity: 'basic' | 'intermediate' | 'advanced' | 'expert';
  popularity: number;
  usageCount: number;
  aiPowered: boolean;
  realTime: boolean;
  collaborative: boolean;
  requiresAuth: boolean;
  tags: string[];
  relatedTools: string[];
  lastUpdated: string;
  createdAt: string; // Creation date (required)
  isNew?: boolean; // Is this a new tool
  rating?: number; // Optional rating
  users?: number; // Number of users
  updated?: string; // Shortened updated info
  version: string;
  performance: {
    speed: 'fast' | 'medium' | 'slow';
    accuracy: number;
    reliability: number;
  };
  integrations: string[];
}

export const advancedTools: AdvancedTool[] = [
  {
    id: "ai-code-generator",
    name: "AI Code Generator",
    description: "Generate production-ready code with AI assistance",
    category: "ai-tools",
    icon: "Bot",
    color: "#8B5CF6",
    features: [
      "Multi-language support",
      "Code explanation",
      "Bug detection",
      "Optimization suggestions",
      "Documentation generation"
    ],
    complexity: "advanced",
    popularity: 95,
    usageCount: 15420,
    aiPowered: true,
    realTime: true,
    collaborative: true,
    requiresAuth: true,
    tags: ["ai", "coding", "development", "automation"],
    relatedTools: ["code-formatter", "regex-tester", "json-validator"],
    lastUpdated: "2024-01-15",
    rating: 4.8,
    users: 15420,
    updated: "Jan 15",
    isNew: false,
    createdAt: "2023-11-01",
    version: "2.1.0",
    performance: {
      speed: "fast",
      accuracy: 94,
      reliability: 96
    },
    integrations: ["GitHub", "VS Code", "GitLab"]
  },
  {
    id: "ml-model-builder",
    name: "ML Model Builder",
    description: "Build and train machine learning models without coding",
    category: "ai-tools",
    icon: "Brain",
    color: "#A855F7",
    features: [
      "Drag-and-drop interface",
      "AutoML capabilities",
      "Model visualization",
      "Performance metrics",
      "Export to production"
    ],
    complexity: "expert",
    popularity: 88,
    usageCount: 8930,
    aiPowered: true,
    realTime: true,
    collaborative: true,
    requiresAuth: true,
    tags: ["ml", "ai", "data-science", "machine-learning"],
    relatedTools: ["data-visualizer", "statistical-calculator"],
    lastUpdated: "2024-01-10",
    rating: 4.6,
    users: 8930,
    updated: "Jan 10",
    createdAt: "2023-10-15",
    version: "1.5.2",
    performance: {
      speed: "medium",
      accuracy: 92,
      reliability: 94
    },
    integrations: ["TensorFlow", "PyTorch", "Scikit-learn"]
  },
  {
    id: "real-time-data-processor",
    name: "Real-time Data Processor",
    description: "Process and analyze streaming data in real-time",
    category: "data-tools",
    icon: "Zap",
    color: "#0EA5E9",
    features: [
      "Live data streaming",
      "Real-time analytics",
      "Custom transformations",
      "Alert systems",
      "Dashboard integration"
    ],
    complexity: "advanced",
    popularity: 92,
    usageCount: 12560,
    aiPowered: true,
    realTime: true,
    collaborative: true,
    requiresAuth: true,
    tags: ["data", "real-time", "streaming", "analytics"],
    relatedTools: ["data-visualizer", "statistical-calculator"],
    lastUpdated: "2024-01-12",
    rating: 4.7,
    users: 12560,
    updated: "Jan 12",
    createdAt: "2023-09-20",
    version: "3.0.1",
    performance: {
      speed: "fast",
      accuracy: 98,
      reliability: 99
    },
    integrations: ["Kafka", "Redis", "WebSocket"]
  },
  {
    id: "smart-contract-analyzer",
    name: "Smart Contract Analyzer",
    description: "Analyze and audit blockchain smart contracts",
    category: "blockchain-tools",
    icon: "FileCheck",
    color: "#10B981",
    features: [
      "Security vulnerability detection",
      "Gas optimization",
      "Code quality analysis",
      "Compliance checking",
      "Audit reporting"
    ],
    complexity: "expert",
    popularity: 85,
    usageCount: 6740,
    aiPowered: true,
    realTime: false,
    collaborative: true,
    requiresAuth: true,
    tags: ["blockchain", "ethereum", "security", "audit"],
    relatedTools: ["crypto-calculator", "wallet-generator"],
    lastUpdated: "2024-01-08",
    rating: 4.5,
    users: 6740,
    updated: "Jan 8",
    createdAt: "2023-08-10",
    version: "2.3.4",
    performance: {
      speed: "medium",
      accuracy: 96,
      reliability: 97
    },
    integrations: ["Etherscan", "Infura", "Alchemy"]
  },
  {
    id: "neural-network-visualizer",
    name: "Neural Network Visualizer",
    description: "Visualize and understand neural network architectures",
    category: "ai-tools",
    icon: "Network",
    color: "#6366F1",
    features: [
      "Interactive network diagrams",
      "Layer visualization",
      "Activation tracking",
      "Training progress monitoring",
      "Export capabilities"
    ],
    complexity: "advanced",
    popularity: 78,
    usageCount: 4320,
    aiPowered: true,
    realTime: true,
    collaborative: true,
    requiresAuth: false,
    tags: ["ai", "neural-networks", "visualization", "education"],
    relatedTools: ["ml-model-builder", "data-visualizer"],
    lastUpdated: "2024-01-05",
    rating: 4.4,
    users: 4320,
    updated: "Jan 5",
    createdAt: "2023-07-15",
    version: "1.2.0",
    performance: {
      speed: "fast",
      accuracy: 90,
      reliability: 92
    },
    integrations: ["TensorFlow.js", "PyTorch", "D3.js"]
  },
  {
    id: "quantum-computing-simulator",
    name: "Quantum Computing Simulator",
    description: "Simulate quantum algorithms and circuits",
    category: "quantum-tools",
    icon: "Atom",
    color: "#8B5CF6",
    features: [
      "Quantum circuit simulation",
      "Algorithm visualization",
      "State vector tracking",
      "Measurement simulation",
      "Educational tutorials"
    ],
    complexity: "expert",
    popularity: 72,
    usageCount: 2890,
    aiPowered: false,
    realTime: true,
    collaborative: true,
    requiresAuth: false,
    tags: ["quantum", "simulation", "education", "research"],
    relatedTools: ["statistical-calculator", "probability-calculator"],
    lastUpdated: "2024-01-03",
    rating: 4.2,
    users: 2890,
    updated: "Jan 3",
    createdAt: "2023-06-20",
    version: "1.0.5",
    performance: {
      speed: "medium",
      accuracy: 99,
      reliability: 98
    },
    integrations: ["Qiskit", "Cirq", "PennyLane"]
  },
  {
    id: "bioinformatics-analyzer",
    name: "Bioinformatics Analyzer",
    description: "Analyze biological data and sequences",
    category: "bio-tools",
    icon: "Dna",
    color: "#10B981",
    features: [
      "Sequence alignment",
      "Protein structure analysis",
      "Genome annotation",
      "Phylogenetic trees",
      "Variant calling"
    ],
    complexity: "expert",
    popularity: 68,
    usageCount: 3420,
    aiPowered: true,
    realTime: true,
    collaborative: true,
    requiresAuth: true,
    tags: ["bioinformatics", "genomics", "proteomics", "research"],
    relatedTools: ["statistical-calculator", "data-visualizer"],
    lastUpdated: "2024-01-01",
    rating: 4.1,
    users: 3420,
    updated: "Jan 1",
    createdAt: "2023-05-10",
    version: "2.1.3",
    performance: {
      speed: "medium",
      accuracy: 95,
      reliability: 96
    },
    integrations: ["BLAST", "Ensembl", "UniProt"]
  },
  {
    id: "financial-risk-analyzer",
    name: "Financial Risk Analyzer",
    description: "Advanced financial risk assessment and modeling",
    category: "finance-tools",
    icon: "TrendingUp",
    color: "#F59E0B",
    features: [
      "Portfolio risk analysis",
      "Value at Risk (VaR)",
      "Stress testing",
      "Scenario analysis",
      "Regulatory compliance"
    ],
    complexity: "advanced",
    popularity: 89,
    usageCount: 9870,
    aiPowered: true,
    realTime: true,
    collaborative: true,
    requiresAuth: true,
    tags: ["finance", "risk", "investment", "analytics"],
    relatedTools: ["investment-calculator", "currency-converter"],
    lastUpdated: "2023-12-28",
    rating: 4.6,
    users: 9870,
    updated: "Dec 28",
    createdAt: "2023-04-15",
    version: "3.2.1",
    performance: {
      speed: "fast",
      accuracy: 93,
      reliability: 95
    },
    integrations: ["Bloomberg", "Refinitiv", "Yahoo Finance"]
  }
];

export const getToolsByCategory = (category: string): AdvancedTool[] => {
  return advancedTools.filter(tool => tool.category === category);
};

export const getPopularTools = (limit: number = 6): AdvancedTool[] => {
  return [...advancedTools]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const getAITools = (): AdvancedTool[] => {
  return advancedTools.filter(tool => tool.aiPowered);
};

export const getRealTimeTools = (): AdvancedTool[] => {
  return advancedTools.filter(tool => tool.realTime);
};

export const searchTools = (query: string): AdvancedTool[] => {
  const lowerQuery = query.toLowerCase();
  return advancedTools.filter(tool => 
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getToolById = (id: string): AdvancedTool | undefined => {
  return advancedTools.find(tool => tool.id === id);
};

export const getRelatedTools = (toolId: string, limit: number = 3): AdvancedTool[] => {
  const tool = getToolById(toolId);
  if (!tool) return [];
  
  return advancedTools
    .filter(t => t.id !== toolId && tool.relatedTools.includes(t.id))
    .slice(0, limit);
};