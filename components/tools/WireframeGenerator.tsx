"use client";

import { useState, useRef, useCallback } from "react";
import { Copy, Check, Square, MousePointer, Type, Image, Layout, X } from "lucide-react";

interface DraggableElement {
  id: string;
  type: 'header' | 'nav' | 'sidebar' | 'content' | 'footer' | 'button' | 'image' | 'text';
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

const elementTypes = [
  { type: 'header', label: 'Header', icon: Layout, defaultWidth: 800, defaultHeight: 80 },
  { type: 'nav', label: 'Navigation', icon: MousePointer, defaultWidth: 800, defaultHeight: 60 },
  { type: 'sidebar', label: 'Sidebar', icon: Square, defaultWidth: 200, defaultHeight: 400 },
  { type: 'content', label: 'Content', icon: Type, defaultWidth: 600, defaultHeight: 400 },
  { type: 'footer', label: 'Footer', icon: Layout, defaultWidth: 800, defaultHeight: 80 },
  { type: 'button', label: 'Button', icon: MousePointer, defaultWidth: 120, defaultHeight: 48 },
  { type: 'image', label: 'Image', icon: Image, defaultWidth: 200, defaultHeight: 150 },
  { type: 'text', label: 'Text Block', icon: Type, defaultWidth: 300, defaultHeight: 100 },
];

export default function WireframeGenerator() {
  const [elements, setElements] = useState<DraggableElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [elementCounter, setElementCounter] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addElement = useCallback((type: typeof elementTypes[0]) => {
    setElementCounter(c => c + 1);
    setElements(prev => {
      const newElement: DraggableElement = {
        id: `element-${Date.now()}`,
        type: type.type as DraggableElement['type'],
        x: 50,
        y: 50,
        width: type.defaultWidth,
        height: type.defaultHeight,
        label: type.label,
      };
      return [...prev, newElement];
    });
  }, []);

  const removeElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleMouseDown = (e: React.MouseEvent, element: DraggableElement) => {
    e.stopPropagation();
    setSelectedId(element.id);
    setDraggingId(element.id);
    setDragOffset({ x: e.clientX - element.x, y: e.clientY - element.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingId && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;
      setElements(elements.map(el => 
        el.id === draggingId ? { ...el, x: Math.max(0, newX), y: Math.max(0, newY) } : el
      ));
    }
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const updateElement = (id: string, updates: Partial<DraggableElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const generateHTML = () => {
    const sorted = [...elements].sort((a, b) => a.y - b.y);
    let html = `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    * { box-sizing: border-box; }\n    body { margin: 0; font-family: Arial, sans-serif; }\n    .wireframe { position: relative; min-height: 600px; background: #f5f5f5; }\n    .element { position: absolute; display: flex; align-items: center; justify-content: center; }\n`;
    
    elements.forEach(el => {
      const className = `el-${el.id}`;
      html += `    .${className} { left: ${el.x}px; top: ${el.y}px; width: ${el.width}px; height: ${el.height}px; }\n`;
    });
    
    html += `  </style>\n</head>\n<body>\n  <div class="wireframe">\n`;
    sorted.forEach(el => {
      html += `    <div class="element el-${el.id}">${el.label}</div>\n`;
    });
    html += `  </div>\n</body>\n</html>`;
    return html;
  };

  const generateJSON = () => JSON.stringify(elements, null, 2);

  const [copied, setCopied] = useState<string | null>(null);
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const selectedElement = elements.find(el => el.id === selectedId);

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-purple-200">
                <Layout className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Wireframe Generator</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Drag & Drop Builder</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Components</label>
              <div className="grid grid-cols-2 gap-2">
                {elementTypes.map((item) => (
                  <button
                    key={item.type}
                    onClick={() => addElement(item)}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-purple-300 hover:bg-purple-50 transition-all flex flex-col items-center gap-2"
                  >
                    <item.icon className="h-5 w-5 text-slate-500" />
                    <span className="text-xs font-bold text-slate-600">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Canvas</label>
                <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">{elements.length} elements</span>
              </div>
              
              <div 
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="relative bg-slate-100 rounded-[24px] border-2 border-dashed border-slate-300 overflow-hidden"
                style={{ height: '600px' }}
              >
                {elements.map((el) => (
                  <div
                    key={el.id}
                    onMouseDown={(e) => handleMouseDown(e, el)}
                    className={`absolute cursor-move rounded-lg flex items-center justify-center text-xs font-bold transition-shadow ${
                      selectedId === el.id ? 'ring-2 ring-purple-500 bg-purple-100' : 'bg-white border border-slate-300'
                    }`}
                    style={{
                      left: el.x,
                      top: el.y,
                      width: el.width,
                      height: el.height,
                    }}
                  >
                    <span className="text-slate-600">{el.label}</span>
                    {selectedId === el.id && (
                      <button
                        onClick={(e) => { e.stopPropagation(); removeElement(el.id); }}
                        className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                
                {elements.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-slate-400 text-sm font-bold">Click components to add to canvas</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {selectedElement && (
            <div className="space-y-4 p-6 bg-slate-50 rounded-[24px]">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Selected Element</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs text-slate-500">Width (px)</label>
                  <input
                    type="number"
                    value={selectedElement.width}
                    onChange={(e) => updateElement(selectedElement.id, { width: Number(e.target.value) })}
                    className="w-full h-10 px-3 bg-white rounded-xl font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Height (px)</label>
                  <input
                    type="number"
                    value={selectedElement.height}
                    onChange={(e) => updateElement(selectedElement.id, { height: Number(e.target.value) })}
                    className="w-full h-10 px-3 bg-white rounded-xl font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500">X Position</label>
                  <input
                    type="number"
                    value={selectedElement.x}
                    onChange={(e) => updateElement(selectedElement.id, { x: Number(e.target.value) })}
                    className="w-full h-10 px-3 bg-white rounded-xl font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Y Position</label>
                  <input
                    type="number"
                    value={selectedElement.y}
                    onChange={(e) => updateElement(selectedElement.id, { y: Number(e.target.value) })}
                    className="w-full h-10 px-3 bg-white rounded-xl font-bold text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Export</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-purple-600 uppercase tracking-wider">HTML</span>
                  <button
                    onClick={() => handleCopy(generateHTML(), 'html')}
                    className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-purple-50 hover:border-purple-300 transition-all"
                  >
                    {copied === 'html' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                  </button>
                </div>
                <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-32 text-xs">
                  <code className="text-purple-400 font-mono">{generateHTML().slice(0, 300)}...</code>
                </pre>
              </div>
              
              <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-purple-600 uppercase tracking-wider">JSON</span>
                  <button
                    onClick={() => handleCopy(generateJSON(), 'json')}
                    className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-purple-50 hover:border-purple-300 transition-all"
                  >
                    {copied === 'json' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                  </button>
                </div>
                <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-32 text-xs">
                  <code className="text-purple-400 font-mono">{generateJSON().slice(0, 300)}...</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
