'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, LucideIcon, 
  Zap, Calculator, Code, FileText, Globe, Smartphone, Lock, Palette, FileCode,
  Database, Cpu, Server, Terminal, HardDrive, Cloud, Wifi, Battery, Signal,
  Scissors, Copy, Clipboard, Move, RotateCcw, Upload, DownloadCloud, Share2, Bookmark,
  Tag, Filter, SortAsc, Layout, Box, Hexagon, Octagon,
  Circle, Square, Triangle, Diamond, Star, Heart, Grid, Layers as LayersIcon, Brain, RefreshCw,
  Video, GitCompare, Binary, Image, Folder, Megaphone, Bug, Wrench, PenTool, FileJson
} from 'lucide-react';
import { getAllCategories } from '@/lib/utils';

// Helper to get icon component from category icon name
function getCategoryIcon(iconName: string): LucideIcon {
  const iconMap: Record<string, LucideIcon> = {
    'Zap': Zap,
    'Calculator': Calculator,
    'Code': Code,
    'FileText': FileText,
    'Globe': Globe,
    'Smartphone': Smartphone,
    'Lock': Lock,
    'Palette': Palette,
    'FileCode': FileCode,
    'Database': Database,
    'Cpu': Cpu,
    'Server': Server,
    'Terminal': Terminal,
    'HardDrive': HardDrive,
    'Cloud': Cloud,
    'Wifi': Wifi,
    'Battery': Battery,
    'Signal': Signal,
    'Scissors': Scissors,
    'Copy': Copy,
    'Clipboard': Clipboard,
    'Move': Move,
    'RotateCcw': RotateCcw,
    'Upload': Upload,
    'DownloadCloud': DownloadCloud,
    'Share2': Share2,
    'Bookmark': Bookmark,
    'Tag': Tag,
    'Filter': Filter,
    'SortAsc': SortAsc,
    'Layout': Layout,
    'Box': Box,
    'Hexagon': Hexagon,
    'Octagon': Octagon,
    'Circle': Circle,
    'Square': Square,
    'Triangle': Triangle,
    'Diamond': Diamond,
    'Star': Star,
    'Heart': Heart,
    'Grid': Grid,
    'Layers': LayersIcon,
    'Brain': Brain,
    'RefreshCw': RefreshCw,
    'Video': Video,
    'GitCompare': GitCompare,
    'Binary': Binary,
    'Image': Image,
    'Folder': Folder,
    'Megaphone': Megaphone,
    'Bug': Bug,
    'Wrench': Wrench,
    'PenTool': PenTool,
    'FileJson': FileJson,
  };
  return iconMap[iconName] || Grid;
}

interface CategoryCardProps {
  name: string;
  description: string;
  icon: string;
  color: string;
  slug: string;
}

function CategoryCard({ name, description, icon, color, slug }: CategoryCardProps) {
  const IconComponent = getCategoryIcon(icon);
  
  return (
    <Link 
      href={`/category/${slug}`}
      className="group relative p-6 md:p-8 bg-white/80 backdrop-blur-sm rounded-2xl hover:scale-105 transition-all duration-300 overflow-hidden border border-white/20 shadow-lg hover:shadow-2xl hover:shadow-green-500/10"
    >
      {/* Background Icon */}
      <div 
        className="absolute -right-4 -bottom-4 w-20 md:w-28 h-20 md:h-28 opacity-10 group-hover:scale-150 transition-transform duration-500"
        style={{ color }}
      >
        <IconComponent className="w-full h-full" />
      </div>
      
      {/* Category Icon */}
      <div 
        className="h-14 md:h-16 w-14 md:w-16 rounded-2xl flex items-center justify-center text-white mb-5 md:mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
        style={{ backgroundColor: color }}
      >
        <IconComponent className="h-7 md:h-8 w-7 md:w-8" />
      </div>
      
      <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 group-hover:text-green-600 transition-colors uppercase italic">
        {name}
      </h3>
      <p className="text-sm text-slate-500 font-bold leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>
      <div className="flex items-center gap-2 text-xs font-bold text-green-600 uppercase tracking-wide">
        Explore <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

export default function CategoriesSection() {
  const categories = getAllCategories();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-5 md:mb-6 border border-slate-200 shadow-sm">
            <Layers className="h-4 w-4 text-green-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-green-600">
              Organization
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-3 md:mb-4">
            Browse by <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Explore our comprehensive library of tools organized into easy-to-browse categories
          </p>
        </div>

        {/* Categories Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <CategoryCard 
              key={category.id}
              name={category.name}
              description={category.description}
              icon={category.icon}
              color={category.color}
              slug={category.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
