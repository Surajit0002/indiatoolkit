"use client";

import React, { useState, useEffect } from "react";
import { 
  Palette, 
  Palette as PaletteIcon,
  Type,
  Zap,
  Save,
  Hash,
  Wrench,
  Eye,
  EyeOff,
  Bookmark,
  BookmarkCheck,
  Settings,
  ChevronDown,
  RotateCcw,
  Upload,
  Download,
  Code
} from "lucide-react";

interface CustomizationOption {
  id: string;
  name: string;
  type: 'color' | 'text' | 'number' | 'boolean' | 'select' | 'range' | 'font' | 'layout' | 'theme';
  category: string;
  defaultValue: any;
  currentValue: any;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
  icon: React.ReactNode;
  description: string;
  advanced?: boolean;
}

interface ToolCustomizationProps {
  toolId: string;
  onCustomizationChange: (config: Record<string, any>) => void;
  currentConfig: Record<string, any>;
  showAdvanced?: boolean;
}

// Additional icon components that might be needed
const LayoutGrid = ({ className = "h-4 w-4" }: { className?: string }) => <div className={className}>📊</div>;
const Keyboard = ({ className = "h-4 w-4" }: { className?: string }) => <div className={className}>⌨️</div>;
const WrapText = ({ className = "h-4 w-4" }: { className?: string }) => <div className={className}>📝</div>;
const Calculator = ({ className = "h-4 w-4" }: { className?: string }) => <div className={className}>🧮</div>;
const FunctionSquare = ({ className = "h-4 w-4" }: { className?: string }) => <div className={className}>𝑓(𝑥)</div>;
const Grid3X3 = ({ className = "h-4 w-4" }: { className?: string }) => <div className={className}>▦</div>;
const Ruler = ({ className = "h-4 w-4" }: { className?: string }) => <div className={className}>📏</div>;

export default function AdvancedToolCustomization({ 
  toolId, 
  onCustomizationChange, 
  currentConfig,
  showAdvanced = false
}: ToolCustomizationProps) {
  const [customizationOptions, setCustomizationOptions] = useState<CustomizationOption[]>([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(showAdvanced);
  const [previewMode, setPreviewMode] = useState(false);
  const [savedConfigs, setSavedConfigs] = useState<Record<string, any>[]>([]);

  // Initialize customization options based on tool type
  useEffect(() => {
    const options = getCustomizationOptionsForTool(toolId);
    setCustomizationOptions(options);
  }, [toolId]);

  const getCustomizationOptionsForTool = (toolId: string): CustomizationOption[] => {
    const baseOptions: CustomizationOption[] = [
      {
        id: 'theme',
        name: 'Theme',
        type: 'select',
        category: 'Appearance',
        defaultValue: 'light',
        currentValue: currentConfig.theme || 'light',
        options: [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
          { label: 'System', value: 'system' },
          { label: 'Blue', value: 'blue' },
          { label: 'Green', value: 'green' },
          { label: 'Purple', value: 'purple' },
          { label: 'Orange', value: 'orange' }
        ],
        icon: <Palette className="h-4 w-4" />,
        description: 'Select the overall theme for the tool'
      },
      {
        id: 'primaryColor',
        name: 'Primary Color',
        type: 'color',
        category: 'Appearance',
        defaultValue: '#3B82F6',
        currentValue: currentConfig.primaryColor || '#3B82F6',
        icon: <PaletteIcon className="h-4 w-4" />,
        description: 'Main accent color for the tool interface'
      },
      {
        id: 'fontSize',
        name: 'Font Size',
        type: 'range',
        category: 'Typography',
        defaultValue: 16,
        currentValue: currentConfig.fontSize || 16,
        min: 12,
        max: 24,
        step: 1,
        icon: <Type className="h-4 w-4" />,
        description: 'Adjust the base font size for better readability'
      },
      {
        id: 'fontFamily',
        name: 'Font Family',
        type: 'select',
        category: 'Typography',
        defaultValue: 'Inter',
        currentValue: currentConfig.fontFamily || 'Inter',
        options: [
          { label: 'Inter', value: 'Inter' },
          { label: 'Roboto', value: 'Roboto' },
          { label: 'Open Sans', value: 'Open Sans' },
          { label: 'Lato', value: 'Lato' },
          { label: 'Montserrat', value: 'Montserrat' },
          { label: 'Source Sans Pro', value: 'Source Sans Pro' }
        ],
        icon: <Type className="h-4 w-4" />,
        description: 'Choose the font family for the tool'
      },
      {
        id: 'layoutDensity',
        name: 'Layout Density',
        type: 'select',
        category: 'Layout',
        defaultValue: 'comfortable',
        currentValue: currentConfig.layoutDensity || 'comfortable',
        options: [
          { label: 'Compact', value: 'compact' },
          { label: 'Comfortable', value: 'comfortable' },
          { label: 'Spacious', value: 'spacious' }
        ],
        icon: <LayoutGrid className="h-4 w-4" />,
        description: 'Control the spacing and density of interface elements'
      },
      {
        id: 'animationSpeed',
        name: 'Animation Speed',
        type: 'range',
        category: 'Performance',
        defaultValue: 300,
        currentValue: currentConfig.animationSpeed || 300,
        min: 0,
        max: 1000,
        step: 50,
        icon: <Zap className="h-4 w-4" />,
        description: 'Adjust animation duration for smoother interactions'
      },
      {
        id: 'autoSave',
        name: 'Auto Save',
        type: 'boolean',
        category: 'Functionality',
        defaultValue: true,
        currentValue: currentConfig.autoSave ?? true,
        icon: <Save className="h-4 w-4" />,
        description: 'Automatically save your work as you make changes'
      },
      {
        id: 'keyboardShortcuts',
        name: 'Keyboard Shortcuts',
        type: 'boolean',
        category: 'Accessibility',
        defaultValue: true,
        currentValue: currentConfig.keyboardShortcuts ?? true,
        icon: <Keyboard className="h-4 w-4" />,
        description: 'Enable keyboard shortcuts for faster navigation'
      }
    ];

    // Add tool-specific options
    switch (toolId) {
      case 'text-editor':
        return [
          ...baseOptions,
          {
            id: 'wordWrap',
            name: 'Word Wrap',
            type: 'boolean',
            category: 'Editor',
            defaultValue: true,
            currentValue: currentConfig.wordWrap ?? true,
            icon: <WrapText className="h-4 w-4" />,
            description: 'Wrap long lines of text automatically'
          },
          {
            id: 'lineNumbers',
            name: 'Line Numbers',
            type: 'boolean',
            category: 'Editor',
            defaultValue: true,
            currentValue: currentConfig.lineNumbers ?? true,
            icon: <Hash className="h-4 w-4" />,
            description: 'Show line numbers in the editor'
          },
          {
            id: 'syntaxHighlighting',
            name: 'Syntax Highlighting',
            type: 'boolean',
            category: 'Editor',
            defaultValue: true,
            currentValue: currentConfig.syntaxHighlighting ?? true,
            icon: <Code className="h-4 w-4" />,
            description: 'Enable syntax highlighting for code'
          }
        ];
      
      case 'calculator':
        return [
          ...baseOptions,
          {
            id: 'decimalPlaces',
            name: 'Decimal Places',
            type: 'range',
            category: 'Calculation',
            defaultValue: 2,
            currentValue: currentConfig.decimalPlaces || 2,
            min: 0,
            max: 10,
            step: 1,
            icon: <Calculator className="h-4 w-4" />,
            description: 'Number of decimal places to display in results'
          },
          {
            id: 'scientificMode',
            name: 'Scientific Mode',
            type: 'boolean',
            category: 'Calculation',
            defaultValue: false,
            currentValue: currentConfig.scientificMode ?? false,
            icon: <FunctionSquare className="h-4 w-4" />,
            description: 'Enable advanced mathematical functions'
          }
        ];
      
      case 'image-editor':
        return [
          ...baseOptions,
          {
            id: 'gridOverlay',
            name: 'Grid Overlay',
            type: 'boolean',
            category: 'Editing',
            defaultValue: false,
            currentValue: currentConfig.gridOverlay ?? false,
            icon: <Grid3X3 className="h-4 w-4" />,
            description: 'Show grid overlay for precise alignment'
          },
          {
            id: 'rulers',
            name: 'Rulers',
            type: 'boolean',
            category: 'Editing',
            defaultValue: true,
            currentValue: currentConfig.rulers ?? true,
            icon: <Ruler className="h-4 w-4" />,
            description: 'Show rulers for measuring dimensions'
          }
        ];
      
      default:
        return baseOptions;
    }
  };

  const handleOptionChange = (optionId: string, value: any) => {
    const updatedOptions = customizationOptions.map(option => 
      option.id === optionId 
        ? { ...option, currentValue: value }
        : option
    );
    
    setCustomizationOptions(updatedOptions);
    
    const newConfig = updatedOptions.reduce((acc, option) => {
      acc[option.id] = option.currentValue;
      return acc;
    }, {} as Record<string, any>);
    
    onCustomizationChange(newConfig);
  };

  const resetToDefaults = () => {
    const resetOptions = customizationOptions.map(option => ({
      ...option,
      currentValue: option.defaultValue
    }));
    
    setCustomizationOptions(resetOptions);
    
    const defaultConfig = resetOptions.reduce((acc, option) => {
      acc[option.id] = option.defaultValue;
      return acc;
    }, {} as Record<string, any>);
    
    onCustomizationChange(defaultConfig);
  };

  const saveCurrentConfig = () => {
    const config = customizationOptions.reduce((acc, option) => {
      acc[option.id] = option.currentValue;
      return acc;
    }, {} as Record<string, any>);
    
    const newSavedConfig = {
      ...config,
      name: `Configuration ${savedConfigs.length + 1}`,
      createdAt: new Date().toISOString(),
      id: Date.now().toString()
    };
    
    setSavedConfigs([...savedConfigs, newSavedConfig]);
  };

  const loadConfig = (config: Record<string, any>) => {
    const updatedOptions = customizationOptions.map(option => ({
      ...option,
      currentValue: config[option.id] ?? option.defaultValue
    }));
    
    setCustomizationOptions(updatedOptions);
    onCustomizationChange(config);
  };

  const groupedOptions = customizationOptions.reduce((acc, option) => {
    if (!showAdvancedOptions && option.advanced) return acc;
    
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<string, CustomizationOption[]>);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Advanced Customization</h3>
              <p className="text-slate-300 text-sm">Fine-tune every aspect of your tool</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`p-2 rounded-lg transition-all ${
                previewMode 
                  ? 'bg-green-500 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
              title={previewMode ? 'Exit Preview' : 'Preview Changes'}
            >
              {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            
            <button
              onClick={saveCurrentConfig}
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              title="Save Configuration"
            >
              <Save className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Saved Configurations */}
        {savedConfigs.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Saved Configurations
            </h4>
            <div className="flex flex-wrap gap-2">
              {savedConfigs.map((config) => (
                <button
                  key={config.id}
                  onClick={() => loadConfig(config)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors flex items-center gap-2"
                >
                  <BookmarkCheck className="h-3 w-3" />
                  {config.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Advanced Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors"
          >
            <Settings className="h-4 w-4" />
            {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
            <ChevronDown className={`h-4 w-4 transition-transform ${showAdvancedOptions ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Customization Options */}
        <div className="space-y-6">
          {Object.entries(groupedOptions).map(([category, options]) => (
            <div key={category} className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                  {category}
                </h4>
              </div>
              
              <div className="p-4 space-y-4">
                {options.map((option) => (
                  <div key={option.id} className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 bg-slate-100 rounded-lg text-slate-600">
                      {option.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-medium text-slate-900 text-sm">
                          {option.name}
                        </label>
                        {option.type === 'range' && (
                          <span className="text-sm text-slate-500 font-mono">
                            {option.currentValue}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-slate-500 mb-3">
                        {option.description}
                      </p>
                      
                      <div className="max-w-md">
                        {option.type === 'color' && (
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={option.currentValue}
                              onChange={(e) => handleOptionChange(option.id, e.target.value)}
                              className="h-10 w-16 rounded-lg border border-slate-300 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={option.currentValue}
                              onChange={(e) => handleOptionChange(option.id, e.target.value)}
                              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                              placeholder="#000000"
                            />
                          </div>
                        )}
                        
                        {option.type === 'select' && option.options && (
                          <select
                            value={option.currentValue}
                            onChange={(e) => handleOptionChange(option.id, e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                          >
                            {option.options.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        )}
                        
                        {option.type === 'range' && (
                          <div className="space-y-2">
                            <input
                              type="range"
                              min={option.min}
                              max={option.max}
                              step={option.step}
                              value={option.currentValue}
                              onChange={(e) => handleOptionChange(option.id, Number(e.target.value))}
                              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between text-xs text-slate-500">
                              <span>{option.min}</span>
                              <span>{option.max}</span>
                            </div>
                          </div>
                        )}
                        
                        {option.type === 'boolean' && (
                          <label className="flex items-center gap-3 cursor-pointer">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={option.currentValue}
                                onChange={(e) => handleOptionChange(option.id, e.target.checked)}
                                className="sr-only"
                              />
                              <div className={`block w-12 h-6 rounded-full transition-colors ${
                                option.currentValue ? 'bg-blue-500' : 'bg-slate-300'
                              }`}></div>
                              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                                option.currentValue ? 'translate-x-6' : ''
                              }`}></div>
                            </div>
                            <span className="text-sm text-slate-600">
                              {option.currentValue ? 'Enabled' : 'Disabled'}
                            </span>
                          </label>
                        )}
                        
                        {option.type === 'text' && (
                          <input
                            type="text"
                            value={option.currentValue}
                            onChange={(e) => handleOptionChange(option.id, e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                            placeholder={option.defaultValue}
                          />
                        )}
                        
                        {option.type === 'number' && (
                          <input
                            type="number"
                            value={option.currentValue}
                            onChange={(e) => handleOptionChange(option.id, Number(e.target.value))}
                            min={option.min}
                            max={option.max}
                            step={option.step}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reset to Defaults
          </button>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors">
              <Upload className="h-4 w-4" />
              Import
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
