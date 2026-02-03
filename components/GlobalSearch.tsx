"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Zap, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { tools } from "@/data/tools";
import { Tool } from "@/types/tool";
import Link from "next/link";
import Fuse from "fuse.js";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");

  // Define extended tool type for search results
  interface ExtendedTool extends Tool {
    keywords: string;
  }

  const [results, setResults] = useState<ExtendedTool[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Prepare tools data with flattened keywords for search
  const toolsWithKeywords = tools.map(tool => ({
    ...tool,
    keywords: tool.seo.keywords?.join(' ') || ''
  }));

  // Initialize Fuse.js for fuzzy search
  const fuse = new Fuse(toolsWithKeywords, {
    keys: ['name', 'description', 'category', 'keywords'],
    includeScore: true,
    threshold: 0.3, // Adjust for sensitivity (0 = exact match, 1 = match anything)
    minMatchCharLength: 2,
    shouldSort: true,
    findAllMatches: true,
  });

  useEffect(() => {
    if (query.length > 1) {
      // Use Fuse.js for fuzzy search
      const fuseResults = fuse.search(query);
      // Extract the tool objects and limit to 5
      const filtered = fuseResults.slice(0, 5).map(result => result.item);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper function to highlight matched terms in text
  const highlightMatch = (text: string, query: string) => {
    if (!query) return <span>{text}</span>;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) => 
          regex.test(part) ? (
            <span key={index} className="bg-yellow-200 text-slate-900 px-0.5 rounded">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[18px] blur-md opacity-0 group-focus-within:opacity-20 transition-all duration-700"></div>
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-[16px] pointer-events-none border border-white/10"></div>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-all z-10 group-focus-within:scale-110" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          placeholder="Explore Next-Gen Tools..."
          aria-label="Search for tools"
          className="relative w-full h-10 pl-11 pr-11 rounded-[16px] border border-slate-200/50 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/5 shadow-inner text-[10px] transition-all font-black uppercase tracking-widest placeholder:text-slate-400 placeholder:normal-case placeholder:font-bold"
        />
        {query && (
          <button 
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-all z-10 hover:rotate-90"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-2xl rounded-[28px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.2)] overflow-hidden z-[100] p-3 border border-white animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="p-3 border-b border-slate-50 flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
               <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
               <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Next-Gen Discovery</span>
            </div>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-full">{results.length} Matches</span>
          </div>
          <div className="max-h-[420px] overflow-y-auto space-y-1.5 p-1 scrollbar-thin scrollbar-thumb-slate-200">
            {results.map(tool => (
              <Link 
                key={tool.id}
                href={`/tool/${tool.slug}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery("");
                }}
                className="flex items-center gap-4 p-3 hover:bg-slate-50/80 rounded-[20px] transition-all group border border-transparent hover:border-slate-100/50"
              >
                <div className="h-11 w-11 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[14px] flex items-center justify-center text-slate-400 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:rotate-3 transition-all duration-500 shadow-sm border border-slate-200/50 group-hover:border-blue-500">
                  <Zap className="h-5 w-5 fill-current" />
                </div>
                <div className="flex-grow">
                  <div className="text-[11px] font-black text-slate-900 flex items-center justify-between uppercase italic tracking-tight mb-0.5">
                    {highlightMatch(tool.name, query)}
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-600" />
                  </div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider line-clamp-1 opacity-80 group-hover:text-slate-600">
                    {highlightMatch(tool.description, query)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link 
            href="/tools" 
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 p-4 text-[10px] font-black text-white bg-slate-900 hover:bg-blue-600 rounded-[22px] mt-3 uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200"
          >
            Launch All Utilities <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
