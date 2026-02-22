"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Brain, 
  Cpu, 
  Database, 
  TrendingUp,
  Play,
  RotateCcw,
  Download,
  Share2,
  Heart,
  Star,
  Clock
} from "lucide-react";

interface AIToolConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  complexity: 'basic' | 'intermediate' | 'advanced' | 'expert';
  features: string[];
  parameters: ToolParameter[];
  processingType: 'real-time' | 'batch' | 'streaming';
  aiModel?: string;
  requiresAuth?: boolean;
  premium?: boolean;
}

interface ToolParameter {
  id: string;
  name: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'file' | 'range';
  required: boolean;
  defaultValue?: string | number | boolean;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  description?: string;
}

interface ProcessingResultData {
  summary?: string;
  insights?: string[];
  recommendations?: string[];
  [key: string]: string | number | boolean | string[] | undefined;
}

interface ProcessingResult {
  success: boolean;
  data?: ProcessingResultData;
  error?: string;
  processingTime: number;
  tokensUsed?: number;
  cost?: number;
}

interface HistoryItem {
  toolId: string;
  toolName: string;
  parameters: Record<string, string | number | boolean>;
  result: ProcessingResult;
  timestamp: string;
}

const AI_TOOLS: AIToolConfig[] = [
  {
    id: "text-summarizer",
    name: "AI Text Summarizer",
    description: "Intelligent text summarization with key point extraction",
    category: "AI Tools",
    icon: "AlignLeft",
    complexity: "intermediate",
    features: ["Key Point Extraction", "Length Control", "Multi-language", "Export Options"],
    processingType: "real-time",
    aiModel: "gpt-4",
    parameters: [
      {
        id: "text",
        name: "Input Text",
        type: "text",
        required: true,
        placeholder: "Paste your text here..."
      },
      {
        id: "length",
        name: "Summary Length",
        type: "select",
        required: false,
        defaultValue: "medium",
        options: ["short", "medium", "long", "custom"]
      },
      {
        id: "style",
        name: "Summary Style",
        type: "select",
        required: false,
        defaultValue: "concise",
        options: ["concise", "detailed", "bullet-points", "executive"]
      }
    ]
  },
  {
    id: "code-analyzer",
    name: "Code Quality Analyzer",
    description: "AI-powered code review and optimization suggestions",
    category: "Developer Tools",
    icon: "Code",
    complexity: "advanced",
    features: ["Bug Detection", "Performance Tips", "Security Issues", "Best Practices"],
    processingType: "batch",
    aiModel: "claude-3",
    parameters: [
      {
        id: "code",
        name: "Code Input",
        type: "text",
        required: true,
        placeholder: "Paste your code here..."
      },
      {
        id: "language",
        name: "Programming Language",
        type: "select",
        required: true,
        options: ["javascript", "python", "java", "cpp", "go", "rust", "typescript"]
      },
      {
        id: "focus",
        name: "Analysis Focus",
        type: "select",
        required: false,
        defaultValue: "comprehensive",
        options: ["comprehensive", "performance", "security", "readability"]
      }
    ]
  },
  {
    id: "data-visualizer",
    name: "Smart Data Visualizer",
    description: "AI-generated charts and insights from your data",
    category: "Data Tools",
    icon: "BarChart3",
    complexity: "intermediate",
    features: ["Auto Chart Selection", "Trend Analysis", "Outlier Detection", "Export Charts"],
    processingType: "real-time",
    parameters: [
      {
        id: "data",
        name: "Data Input",
        type: "text",
        required: true,
        placeholder: "Paste CSV or JSON data..."
      },
      {
        id: "chart-type",
        name: "Chart Type",
        type: "select",
        required: false,
        defaultValue: "auto",
        options: ["auto", "line", "bar", "pie", "scatter", "heatmap"]
      },
      {
        id: "insights",
        name: "Generate Insights",
        type: "boolean",
        required: false,
        defaultValue: true
      }
    ]
  }
];

export default function AIToolEngine() {
  const [selectedTool, setSelectedTool] = useState<AIToolConfig | null>(null);
  const [parameters, setParameters] = useState<Record<string, string | number | boolean>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Initialize parameters with default values
  useEffect(() => {
    if (selectedTool) {
      const defaults: Record<string, string | number | boolean> = {};
      selectedTool.parameters.forEach(param => {
        if (param.defaultValue !== undefined) {
          defaults[param.id] = param.defaultValue;
        }
      });
      setParameters(defaults);
    }
  }, [selectedTool]);

  const handleParameterChange = (paramId: string, value: string | number | boolean) => {
    setParameters(prev => ({
      ...prev,
      [paramId]: value
    }));
  };

  const validateParameters = (): boolean => {
    if (!selectedTool) return false;
    
    for (const param of selectedTool.parameters) {
      if (param.required && (!parameters[param.id] || parameters[param.id] === "")) {
        return false;
      }
    }
    return true;
  };

  const processTool = async () => {
    if (!selectedTool || !validateParameters() || isProcessing) return;
    
    setIsProcessing(true);
    const startTime = Date.now();
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
      
      const mockResult: ProcessingResult = {
        success: true,
        data: {
          summary: "This is a mock result from the AI tool. In a real implementation, this would contain the actual processed data.",
          insights: ["Key insight 1", "Key insight 2", "Key insight 3"],
          recommendations: ["Recommendation 1", "Recommendation 2"]
        },
        processingTime: Date.now() - startTime,
        tokensUsed: Math.floor(Math.random() * 1000) + 500,
        cost: parseFloat((Math.random() * 0.1).toFixed(4))
      };
      
      setResult(mockResult);
      
      // Add to history
      const historyItem = {
        toolId: selectedTool.id,
        toolName: selectedTool.name,
        parameters: { ...parameters },
        result: mockResult,
        timestamp: new Date().toISOString()
      };
      
      setHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Keep last 10 items
      
    } catch {
      setResult({
        success: false,
        error: "Processing failed. Please try again.",
        processingTime: Date.now() - startTime
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetTool = () => {
    setParameters({});
    setResult(null);
    if (selectedTool) {
      const defaults: Record<string, string | number | boolean> = {};
      selectedTool.parameters.forEach(param => {
        if (param.defaultValue !== undefined) {
          defaults[param.id] = param.defaultValue;
        }
      });
      setParameters(defaults);
    }
  };

  const toggleFavorite = (toolId: string) => {
    setFavorites(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  const renderParameterInput = (param: ToolParameter) => {
    const value = parameters[param.id] ?? "";
    
    switch (param.type) {
      case "text":
        return (
          <textarea
            value={String(value)}
            onChange={(e) => handleParameterChange(param.id, e.target.value)}
            placeholder={param.placeholder}
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
          />
        );
      
      case "select":
        return (
          <select
            value={String(value)}
            onChange={(e) => handleParameterChange(param.id, e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {param.options?.map(option => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        );
      
      case "boolean":
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => handleParameterChange(param.id, e.target.checked)}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-slate-700 font-medium">{param.name}</span>
          </label>
        );
      
      case "range":
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={param.min}
              max={param.max}
              step={param.step}
              value={Number(value)}
              onChange={(e) => handleParameterChange(param.id, parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center text-sm text-slate-500">{value}</div>
          </div>
        );
      
      default:
        return (
          <input
            type={param.type}
            value={String(value)}
            onChange={(e) => handleParameterChange(param.id, e.target.value)}
            placeholder={param.placeholder}
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-purple-600" />
          AI Tool Engine
        </h1>
        <p className="text-slate-600">Advanced AI-powered tools with real-time processing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tools Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sticky top-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              Available Tools
            </h3>
            
            <div className="space-y-2">
              {AI_TOOLS.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool)}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    selectedTool?.id === tool.id
                      ? "bg-blue-50 border-2 border-blue-500"
                      : "bg-slate-50 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-bold text-sm text-slate-900">{tool.name}</h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(tool.id);
                      }}
                      className="text-rose-500 hover:text-rose-600"
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(tool.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{tool.description}</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      tool.complexity === 'basic' ? 'bg-green-100 text-green-800' :
                      tool.complexity === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                      tool.complexity === 'advanced' ? 'bg-purple-100 text-purple-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tool.complexity}
                    </span>
                    {tool.premium && (
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tool Interface */}
        <div className="lg:col-span-3">
          {selectedTool ? (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {/* Tool Header */}
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">{selectedTool.name}</h2>
                    <p className="text-slate-600 mb-4">{selectedTool.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTool.features.map((feature, index) => (
                        <span key={index} className="px-3 py-1 bg-white rounded-full text-xs font-bold text-slate-700 border border-slate-200">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <div className="text-2xl font-black text-slate-900">
                        {selectedTool.processingType === 'real-time' ? '⚡' : 
                         selectedTool.processingType === 'batch' ? '🔄' : '🌊'}
                      </div>
                      <div className="text-xs text-slate-500 uppercase font-bold">
                        {selectedTool.processingType}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tool Parameters */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {selectedTool.parameters.map(param => (
                    <div key={param.id} className="space-y-2">
                      <label className="block text-sm font-bold text-slate-900">
                        {param.name}
                        {param.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {param.description && (
                        <p className="text-xs text-slate-500">{param.description}</p>
                      )}
                      {renderParameterInput(param)}
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <button
                    onClick={processTool}
                    disabled={isProcessing || !validateParameters()}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Process
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={resetTool}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </button>
                  
                  <button className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-xl font-bold hover:bg-green-200 transition-all">
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                  
                  <button className="flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-700 rounded-xl font-bold hover:bg-purple-200 transition-all">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>

                {/* Results */}
                {result && (
                  <div className={`p-6 rounded-2xl border ${
                    result.success 
                      ? "bg-green-50 border-green-200" 
                      : "bg-red-50 border-red-200"
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`h-3 w-3 rounded-full ${
                        result.success ? "bg-green-500" : "bg-red-500"
                      }`}></div>
                      <h3 className={`font-bold ${
                        result.success ? "text-green-800" : "text-red-800"
                      }`}>
                        {result.success ? "Processing Complete" : "Processing Failed"}
                      </h3>
                      <div className="ml-auto text-sm text-slate-500">
                        {result.processingTime}ms
                      </div>
                    </div>
                    
                    {result.success && result.data && (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-bold text-slate-900 mb-2">Summary</h4>
                          <p className="text-slate-700">{result.data.summary}</p>
                        </div>
                        
                        {result.data.insights && (
                          <div>
                            <h4 className="font-bold text-slate-900 mb-2">Key Insights</h4>
                            <ul className="space-y-1">
                              {result.data.insights.map((insight: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-slate-700">{insight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {result.data.recommendations && (
                          <div>
                            <h4 className="font-bold text-slate-900 mb-2">Recommendations</h4>
                            <ul className="space-y-1">
                              {result.data.recommendations.map((rec: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-slate-700">{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {(result.tokensUsed || result.cost) && (
                          <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200">
                            {result.tokensUsed && (
                              <div className="flex items-center gap-2">
                                <Database className="h-4 w-4 text-slate-500" />
                                <span className="text-sm text-slate-600">
                                  Tokens: <span className="font-bold">{result.tokensUsed}</span>
                                </span>
                              </div>
                            )}
                            {result.cost && (
                              <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-slate-500" />
                                <span className="text-sm text-slate-600">
                                  Cost: <span className="font-bold">${result.cost}</span>
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {result.error && (
                      <p className="text-red-700">{result.error}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <div className="max-w-md mx-auto">
                <Brain className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Select an AI Tool</h3>
                <p className="text-slate-600">
                  Choose from our collection of advanced AI-powered tools to enhance your workflow
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* History Panel */}
      {history.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Processing History
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.map((item, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm text-slate-900">{item.toolName}</h4>
                  <span className="text-xs text-slate-500">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-xs text-slate-600 mb-2">
                  {Object.keys(item.parameters).length} parameters
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>⏱️ {item.result.processingTime}ms</span>
                  {item.result.tokensUsed && (
                    <span>📊 {item.result.tokensUsed} tokens</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}