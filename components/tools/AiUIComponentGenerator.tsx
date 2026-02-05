"use client";

import { useState } from "react";
import { Code, Copy, Download, RefreshCw, Sparkles, Box, MousePointer2, Layout, CreditCard, User } from "lucide-react";

const componentTypes = [
  "Button",
  "Card",
  "Form Input",
  "Navigation",
  "Modal",
  "Hero Section",
  "Footer",
  "Pricing Table",
  "Testimonial",
  "Profile Card",
];

const frameworks = [
  { id: "html", name: "HTML/CSS", icon: <Code className="h-4 w-4" /> },
  { id: "react", name: "React", icon: <Box className="h-4 w-4" /> },
  { id: "vue", name: "Vue", icon: <Box className="h-4 w-4" /> },
];

interface GeneratedComponent {
  id: number;
  type: string;
  framework: string;
  description: string;
  code: string;
}

export default function AiUIComponentGenerator() {
  const [description, setDescription] = useState("");
  const [componentType, setComponentType] = useState("Button");
  const [framework, setFramework] = useState("react");
  const [isGenerating, setIsGenerating] = useState(false);
  const [components, setComponents] = useState<GeneratedComponent[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const generateComponent = async () => {
    if (!description.trim() && !componentType) return;

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const codeSnippets: Record<string, Record<string, string>> = {
        Button: {
          react: `// Button Component
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={\`\${baseStyles} \${variants[variant]} \${sizes[size]}\`}
    >
      {children}
    </button>
  );
}`,
          html: `<!-- Button Component -->
<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
    transition: all 0.2s;
    cursor: pointer;
  }
  .btn-primary {
    background-color: #2563eb;
    color: white;
  }
  .btn-primary:hover {
    background-color: #1d4ed8;
  }
</style>

<button class="btn btn-primary">
  Click Me
</button>`,
        },
        Card: {
          react: `// Card Component
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  image?: string;
  onClick?: () => void;
}

export default function Card({ title, description, image, onClick }: CardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}`,
          html: `<!-- Card Component -->
<style>
  .card {
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: box-shadow 0.3s;
  }
  .card:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  .card-content {
    padding: 1.5rem;
  }
</style>

<div class="card">
  <div class="card-content">
    <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">
      Card Title
    </h3>
    <p style="color: #6b7280;">
      Card description goes here.
    </p>
  </div>
</div>`,
        },
      };

      const selectedCode = codeSnippets[componentType] || codeSnippets["Button"];
      const generatedComponent: GeneratedComponent = {
        id: Date.now(),
        type: componentType,
        framework: framework,
        description: description || `A ${componentType.toLowerCase()} component`,
        code: selectedCode[framework] || selectedCode["react"],
      };

      setComponents([generatedComponent]);
      setIsGenerating(false);
    }, 2000);
  };

  const copyCode = (id: number) => {
    const component = components.find((c) => c.id === id);
    if (component) {
      navigator.clipboard.writeText(component.code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const downloadCode = (component: GeneratedComponent) => {
    const extensions: Record<string, string> = {
      react: "tsx",
      vue: "vue",
      html: "html",
    };
    const blob = new Blob([component.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${component.type.toLowerCase()}.${extensions[component.framework]}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setDescription("");
    setComponents([]);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Code className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI UI Component Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Generate UI component code from descriptions
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Component Type */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                <Layout className="h-4 w-4 inline mr-2" />
                Component Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {componentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setComponentType(type)}
                    className={`py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                      componentType === type
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Framework Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                <Box className="h-4 w-4 inline mr-2" />
                Framework
              </label>
              <div className="flex gap-4">
                {frameworks.map((fw) => (
                  <button
                    key={fw.id}
                    onClick={() => setFramework(fw.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                      framework === fw.id
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {fw.icon}
                    {fw.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                <CreditCard className="h-4 w-4 inline mr-2" />
                Additional Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add specific requirements (e.g., 'primary button with icon', 'card with hover effect', 'input with validation')..."
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none font-medium resize-none h-20"
              />
            </div>

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={generateComponent}
                disabled={isGenerating}
                className="flex-1 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Component
                  </>
                )}
              </button>

              <button
                onClick={resetForm}
                className="px-6 h-14 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results */}
          {components.length > 0 && (
            <>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <h3 className="font-bold text-slate-800 uppercase text-sm mb-4">
                  Generated Component
                </h3>

                {components.map((component) => (
                  <div key={component.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 bg-slate-100 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-bold">
                          {component.type}
                        </span>
                        <span className="px-3 py-1 bg-slate-200 text-slate-600 rounded-lg text-sm font-bold uppercase">
                          {component.framework}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyCode(component.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
                        >
                          {copiedId === component.id ? (
                            <span className="text-green-600">Copied!</span>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => downloadCode(component)}
                          className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl text-sm font-bold hover:bg-indigo-200 transition-all"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                      </div>
                    </div>

                    {/* Code */}
                    <div className="p-4 bg-slate-900 overflow-x-auto">
                      <pre className="text-sm text-slate-100 font-mono">
                        <code>{component.code}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <Sparkles className="h-8 w-8 text-indigo-600 mb-3" />
            <h3 className="font-bold text-indigo-800 mb-2">AI-Powered</h3>
            <p className="text-sm text-indigo-700">
              Generate clean, modern component code from simple descriptions.
            </p>
          </div>
          <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
            <Code className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-purple-800 mb-2">Multi-Framework</h3>
            <p className="text-sm text-purple-700">
              Get code for React, Vue, or plain HTML/CSS based on your needs.
            </p>
          </div>
          <div className="p-6 bg-violet-50 rounded-2xl border border-violet-100">
            <Download className="h-8 w-8 text-violet-600 mb-3" />
            <h3 className="font-bold text-violet-800 mb-2">Production Ready</h3>
            <p className="text-sm text-violet-700">
              Generated code follows best practices and is ready to use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
