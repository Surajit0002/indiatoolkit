"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Bot, 
  User, 
  Copy, 
  RefreshCw, 
  Sparkles, 
  Trash2, 
  ChevronDown, 

  Check,
  Loader2,
  Settings,
  Download
} from "lucide-react";

// Message types
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Model types
interface Model {
  id: string;
  name: string;
  provider: string;
}

// Available models
const AVAILABLE_MODELS: Model[] = [
  { id: "qwen/qwen3-4b:free", name: "Qwen 3 4B", provider: "Qwen" },
  { id: "z-ai/glm-4.5-air:free", name: "GLM-4.5 Air", provider: "Zhipu AI" },
  { id: "google/gemma-3n-e4b-it:free", name: "Gemma 3N", provider: "Google" },
  { id: "deepseek/deepseek-chat:free", name: "DeepSeek Chat", provider: "DeepSeek" }
];

interface AiChatInterfaceProps {
  toolId: string;
  toolName: string;
  systemPrompt?: string;
  placeholder?: string;
  onGenerate?: (prompt: string) => Promise<string>;
}

export default function AiChatInterface({
  toolId,
  toolName,
  systemPrompt,
  placeholder = "Describe what you want me to create...",

}: AiChatInterfaceProps) {
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0]);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  
  // Custom system prompt
  const [customSystemPrompt, setCustomSystemPrompt] = useState(systemPrompt || "");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 150) + "px";
    }
  }, [input]);

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substring(7);

  // Handle send message
  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsGenerating(true);

    try {
      // Call the AI API
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userMessage.content,
          toolId: toolId,
          model: selectedModel.id,
          systemPrompt: customSystemPrompt || undefined
        })
      });

      const data = await response.json();
      
      const aiMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: data.text || "I apologize, but I couldn't generate a response. Please try again.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI generation error:", error);
      
      const errorMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: "I apologize, but I encountered an error while generating your response. Please try again.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle regenerate
  const handleRegenerate = async () => {
    const lastUserMessage = messages.filter(m => m.role === "user").pop();
    if (!lastUserMessage || isGenerating) return;

    // Remove last AI message
    const lastAssistantMessage = messages.filter(m => m.role === "assistant").pop();
    if (lastAssistantMessage) {
      setMessages(prev => prev.filter(m => m.id !== lastAssistantMessage.id));
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: lastUserMessage.content,
          toolId: toolId,
          model: selectedModel.id,
          systemPrompt: customSystemPrompt || undefined
        })
      });

      const data = await response.json();
      
      const aiMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: data.text || "I apologize, but I couldn't generate a response. Please try again.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI regeneration error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle copy
  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handle clear conversation
  const handleClear = () => {
    setMessages([]);
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle export
  const handleExport = () => {
    const conversation = messages.map(m => 
      `${m.role === "user" ? "You" : toolName}: ${m.content}`
    ).join("\n\n");
    
    const blob = new Blob([conversation], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${toolName.toLowerCase().replace(/\s+/g, "-")}-conversation.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{toolName}</h3>
            <p className="text-xs text-white/70">AI-Powered Generator</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Model Selector */}
          <div className="relative">
            <button
              onClick={() => setShowModelSelector(!showModelSelector)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
            >
              <span className="hidden sm:inline">{selectedModel.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showModelSelector && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                <p className="px-4 py-2 text-xs font-medium text-slate-500 uppercase">Select Model</p>
                {AVAILABLE_MODELS.map(model => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model);
                      setShowModelSelector(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2 hover:bg-slate-50 transition-colors ${
                      selectedModel.id === model.id ? "bg-indigo-50 text-indigo-600" : "text-slate-700"
                    }`}
                  >
                    <div className="text-left">
                      <p className="font-medium text-sm">{model.name}</p>
                      <p className="text-xs text-slate-500">{model.provider}</p>
                    </div>
                    {selectedModel.id === model.id && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Custom System Prompt
          </label>
          <textarea
            value={customSystemPrompt}
            onChange={(e) => setCustomSystemPrompt(e.target.value)}
            placeholder="Add custom instructions..."
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none"
            rows={3}
          />
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
              <Bot className="w-10 h-10 text-indigo-600" />
            </div>
            <h4 className="text-xl font-semibold text-slate-800 mb-2">Welcome to {toolName}</h4>
            <p className="text-slate-500 max-w-md">
              Describe what you want me to create and I&apos;ll generate it using advanced AI. 
              Try being specific about your requirements for better results.
            </p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              <button
                onClick={() => setInput("Write a compelling story about adventure")}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-700 transition-colors"
              >
                Write a story
              </button>
              <button
                onClick={() => setInput("Create a blog post about technology")}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-700 transition-colors"
              >
                Blog post
              </button>
              <button
                onClick={() => setInput("Generate professional email")}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-700 transition-colors"
              >
                Professional email
              </button>
            </div>
          </div>
        ) : (
          messages.map(message => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.role === "user" ? "order-1" : ""}`}>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-md"
                      : "bg-slate-100 text-slate-800 rounded-bl-md"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                </div>
                
                {message.role === "assistant" && (
                  <div className="flex items-center gap-1 mt-2">
                    <button
                      onClick={() => handleCopy(message.content, message.id)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
                      title="Copy"
                    >
                      {copiedId === message.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={handleRegenerate}
                      disabled={isGenerating}
                      className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
                      title="Regenerate"
                    >
                      <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
                    </button>
                  </div>
                )}
                
                <p className="text-xs text-slate-400 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              
              {message.role === "user" && (
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))
        )}
        
        {isGenerating && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={placeholder}
              disabled={isGenerating}
              className="w-full px-4 py-3 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm"
              rows={1}
            />
            <div className="absolute right-3 bottom-3 text-slate-400 text-xs">
              {input.length}/2000
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <>
                <button
                  onClick={handleClear}
                  className="p-3 hover:bg-slate-100 rounded-xl transition-colors text-slate-500"
                  title="Clear conversation"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handleExport}
                  className="p-3 hover:bg-slate-100 rounded-xl transition-colors text-slate-500"
                  title="Export conversation"
                >
                  <Download className="w-5 h-5" />
                </button>
              </>
            )}
            
            <button
              onClick={handleSend}
              disabled={!input.trim() || isGenerating}
              className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-300 text-white rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        
        <p className="text-xs text-slate-400 mt-2 text-center">
          AI can make mistakes. Please verify important information.
        </p>
      </div>
    </div>
  );
}
