"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import * as Icons from "lucide-react";
import { ToolCategory } from "@/types/tool";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
  color?: string;
}

interface DynamicBreadcrumbProps {
  items: BreadcrumbItem[];
  category?: ToolCategory | null;
  toolName?: string;
  variant?: "full" | "compact" | "minimal";
}

export default function DynamicBreadcrumb({ 
  items, 
  toolName,
  variant = "full", 
  category: _category
}: DynamicBreadcrumbProps) {
  // Get category icon
  const getCategoryIcon = (iconName: string) => {
    // @ts-expect-error - Dynamic icon access
    return Icons[iconName] || Icons.Folder;
  };

  if (variant === "minimal") {
    return (
      <div className="flex items-center gap-1 text-xs text-slate-500">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-1">
            <ChevronRight className="w-3 h-3 text-slate-300" />
            {item.href ? (
              <Link href={item.href} className="hover:text-blue-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-700 font-medium">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <nav className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg overflow-x-auto">
        <Link 
          href="/" 
          className="text-slate-400 hover:text-blue-600 transition-colors shrink-0"
        >
          <Home className="w-3.5 h-3.5" />
        </Link>
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5 shrink-0">
            <ChevronRight className="w-3 h-3 text-slate-300" />
            {item.href ? (
              <Link 
                href={item.href}
                className="text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
    );
  }

  // Full variant
  return (
    <nav 
      className="flex items-center gap-2 sm:gap-3 bg-white/50 backdrop-blur-lg p-2 sm:p-3 px-3 sm:px-5 rounded-lg sm:rounded-xl border border-slate-200/50 shadow-sm hover:border-blue-200 transition-colors group/nav overflow-x-auto"
      aria-label="Breadcrumb navigation"
    >
      {/* Home Link */}
      <Link 
        href="/" 
        className="text-slate-400 hover:text-blue-600 transition-all hover:scale-110 shrink-0"
        aria-label="Go to home page"
      >
        <Home className="h-4 w-4 sm:h-4 sm:w-4" />
      </Link>

      {/* Breadcrumb Items */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-slate-300 group-hover/nav:translate-x-0.5 transition-transform shrink-0" />
          
          {item.href ? (
            <Link 
              href={item.href}
              className="flex items-center gap-2 text-[10px] sm:text-sm font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-slate-500 hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              {item.icon && item.color && (
                <div 
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  {(() => {
                    const Icon = getCategoryIcon(item.icon);
                    return <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />;
                  })()}
                </div>
              )}
              <span>{item.label}</span>
            </Link>
          ) : (
            <span className="flex items-center gap-2 text-[10px] sm:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] text-slate-700 whitespace-nowrap">
              {item.icon && item.color && (
                <div 
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  {(() => {
                    const Icon = getCategoryIcon(item.icon);
                    return <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />;
                  })()}
                </div>
              )}
              <span>{item.label}</span>
            </span>
          )}
        </div>
      ))}

      {/* Tool Name (if provided) */}
      {toolName && (
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-slate-300 shrink-0" />
          <span className="text-[10px] sm:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] text-blue-600 whitespace-nowrap">
            {toolName}
          </span>
        </div>
      )}
    </nav>
  );
}

// Helper function to generate breadcrumb items
export function generateBreadcrumbs(
  category: ToolCategory | null | undefined,
  toolName?: string
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [];

  if (category) {
    items.push({
      label: category.name,
      href: `/category/${category.slug}`,
      icon: category.icon,
      color: category.color,
    });
  }

  if (toolName) {
    items.push({
      label: toolName,
    });
  }

  return items;
}
