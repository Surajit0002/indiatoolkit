"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Zap, Search, ArrowRight, Layout, Command } from "lucide-react";
import * as Icons from "lucide-react";
import { Tool, ToolCategory } from "@/types/tool";

interface ToolSwitcherProps {
  categories: ToolCategory[];
  tools: Tool[];
  currentToolSlug: string;
  filterByCategory?: string;
}

export default function ToolSwitcher({ categories, tools, currentToolSlug, filterByCategory }: ToolSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCategories = filterByCategory 
    ? categories.filter(c => c.slug === filterByCategory)
    : categories;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-sm shadow-sm hover:border-blue-500 hover:shadow-md transition-all group"
      >
        <Command className="h-5 w-5 text-blue-600" />
        <span className="text-sm font-black uppercase tracking-widest text-slate-700">All Tools</span>
        <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-[200] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 border-b border-slate-50 bg-slate-50/50">
             <div className="flex items-center gap-2 px-2 py-1">
               <Search className="h-3 w-3 text-slate-400" />
               <input 
                type="text" 
                placeholder="Search tools..." 
                className="bg-transparent text-[10px] font-bold uppercase tracking-wider outline-none w-full text-slate-600 placeholder:text-slate-400"
               />
             </div>
          </div>
          
          <div className="max-h-[380px] overflow-y-auto scrollbar-hide py-1">
            {filteredCategories.map((category) => {
              const categoryTools = tools.filter(t => t.category === category.slug);
              // @ts-ignore
              const Icon = Icons[category.icon] || Icons.Folder;
              
              if (categoryTools.length === 0) return null;

              return (
                <div key={category.id} className="mb-1 last:mb-0">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-50/30">
                    <span className="text-[8px] font-black uppercase tracking-[0.25em] text-slate-400">{category.name}</span>
                  </div>
                  
                  <div className="px-1 space-y-0.5">
                    {categoryTools.map((tool) => (
                      <Link 
                        key={tool.id}
                        href={`/tool/${tool.slug}`}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group/item ${
                          tool.slug === currentToolSlug 
                            ? "bg-blue-50 text-blue-700" 
                            : "hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className={`h-5 w-5 rounded flex items-center justify-center text-white shadow-sm transition-transform group-hover/item:scale-110 ${tool.slug === currentToolSlug ? "opacity-100" : "opacity-80"}`}
                            style={{ backgroundColor: category.color }}
                          >
                            <Icon className="h-3 w-3 stroke-[2.5]" />
                          </div>
                          <span className="font-bold text-[11px] uppercase tracking-tight">{tool.name}</span>
                          {tool.isPopular && (
                            <Zap className="h-2.5 w-2.5 text-amber-500 fill-current" />
                          )}
                        </div>
                        <ArrowRight className={`h-3 w-3 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all ${tool.slug === currentToolSlug ? "text-blue-600" : "text-slate-300"}`} />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
