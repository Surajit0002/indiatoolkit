import React from "react";
import Link from "next/link";
import { 
  ArrowRight, Star, Zap, Shield, Search, TrendingUp, Sparkles, 
  Calculator, Shuffle, FileText, Code, Globe, Heart, Download, 
  Clock, Weight, Ruler, Thermometer, DollarSign, Text, Activity, 
  BarChart3, Monitor, Smartphone, Cloud, Mail, Lock, Key, Eye, 
  EyeOff, Gift, Shield as ShieldIcon, Calendar, CreditCard, Building, 
  Building2, Crown, ChartBar, Map, Palette, Newspaper, CalendarDays, 
  Briefcase, Handshake, BookText, GraduationCap, CircleHelp, 
  MessageCircle, GalleryHorizontalEnd, HelpCircle, FileText as FileTextIcon, 
  ChartBar as ChartBarIcon, Grid, Layers, Brain, ArrowRightLeft, Braces, 
  Table, CheckCircle, ChevronRight, ChevronDown, Play, Target, Users, Award, 
  Rocket, Lightbulb, Fingerprint, Globe2, Smartphone as SmartphoneIcon,
  Database, Cpu, Server, HardDrive, Wifi, Battery, Signal,
  Megaphone, Bug, Terminal, FileCode, Scissors, Copy, Clipboard,
  Move, RotateCcw, Upload, DownloadCloud, Share2, Bookmark,
  Tag, Filter, SortAsc, Layout, Box, Hexagon, Octagon,
  Circle, Square, Triangle, Diamond, Star as StarIcon, Heart as HeartIcon,
  RefreshCw, Video, GitCompare, Binary, Link as LinkIcon,
  LucideIcon, Wrench, Folder, PenTool, FileJson, Image,
  Type, Sliders, MousePointer2, Maximize2, Crop,
  RotateCw, FlipHorizontal, FlipVertical, Download as DownloadIcon,
  ImagePlus, Palette as PaletteIcon, Brush, Pen, Eraser, Stamp, Sparkles as SparklesIcon, Wand2, Layers as LayersIcon, Grid3X3,
  Frame, Columns, Rows, Scan, Focus, Zap as ZapIcon,
} from "lucide-react";

// Helper to render Lucide icons
function Icon({ icon: IconComponent }: { icon: LucideIcon }) {
  return <IconComponent className="h-6 w-6" />;
}

function IconSmall({ icon: IconComponent }: { icon: LucideIcon }) {
  return <IconComponent className="h-5 w-5" />;
}

function IconSmaller({ icon: IconComponent }: { icon: LucideIcon }) {
  return <IconComponent className="h-4 w-4" />;
}

import { getPopularTools, getAllCategories, getRecentTools } from "@/lib/utils";
import dynamic from "next/dynamic";

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
    'Star': StarIcon,
    'Heart': HeartIcon,
    'Grid': Grid,
    'Layers': Layers,
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

// Dynamic imports for performance
const ToolCard = dynamic(() => import("@/components/ToolCard"), {
  loading: () => <div className="h-48 bg-slate-100 rounded-2xl animate-pulse"></div>
});

const ModernSearchBar = dynamic(() => import("@/components/ModernSearchBar"), {
  loading: () => <div className="h-16 bg-slate-100 rounded-2xl animate-pulse"></div>
});

// Animated Counter Component
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  return (
    <span className="font-black text-3xl md:text-4xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
      {value}{suffix}
    </span>
  );
}

// Feature Card Component
function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  delay 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  gradient: string;
  delay: string;
}) {
  return (
    <div 
      className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: delay }}
    >
      <div className={`h-14 w-14 rounded-xl flex items-center justify-center mb-4 shadow-lg ${gradient}`}>
        <Icon className="h-7 w-7 text-white" />
      </div>
      <h3 className="text-lg font-black text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">{description}</p>
    </div>
  );
}

// Tool Showcase Card
function ToolShowcaseCard({ 
  name, 
  description, 
  icon, 
  color, 
  slug,
  badge 
}: { 
  name: string; 
  description: string; 
  icon: any; 
  color: string; 
  slug: string;
  badge?: string;
}) {
  return (
    <Link
      href={`/tool/${slug}`}
      className="relative p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden"
    >
      {badge && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
          {badge}
        </div>
      )}
      <div className="flex items-start gap-4">
        <div 
          className="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
          style={{ backgroundColor: color }}
        >
          <Icon icon={icon} />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-green-600 transition-colors mb-1">
            {name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
          Use Tool <ChevronRight className="h-3 w-3" />
        </span>
        <div className="h-8 w-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

// Testimonial Card
function TestimonialCard({ 
  name, 
  role, 
  content, 
  rating 
}: { 
  name: string; 
  role: string; 
  content: string; 
  rating: number;
}) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
        ))}
      </div>
      <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">"{content}"</p>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">{name}</h4>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
    </div>
  );
}

// Stats Counter
function StatItem({ value, label, icon: Icon }: { value: string; label: string; icon: any }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <div className="text-2xl font-black text-white">{value}</div>
        <div className="text-xs font-medium text-white/70 uppercase tracking-wide">{label}</div>
      </div>
    </div>
  );
}

// Floating Shape Component
function FloatingShape({ className, delay }: { className: string; delay: string }) {
  return (
    <div 
      className={`absolute opacity-20 animate-float ${className}`}
      style={{ animationDelay: delay, animationDuration: '6s' }}
    >
      <svg width="100" height="100" viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="shapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path fill="url(#shapeGrad)" d="M50 0 L100 50 L50 100 L0 50 Z" />
      </svg>
    </div>
  );
}

export default function Home() {
  const popularTools = getPopularTools();
  const categories = getAllCategories();
  const recentTools = getRecentTools();

  return (
    <div className="flex flex-col gap-0">
      {/* ======================================== */}
      {/* HERO SECTION - Modern & Dynamic */}
      {/* ======================================== */}
      <section className="relative min-h-[95vh] flex items-center pt-20 pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          <div className="absolute top-[-30%] left-[-15%] w-[140%] h-[80%]">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-emerald-400/15 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-teal-400/20 rounded-full blur-[100px] animate-pulse delay-2000"></div>
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}>
          </div>

          {/* Floating Shapes */}
          <FloatingShape className="top-20 left-[10%] text-green-500" delay="0s" />
          <FloatingShape className="top-40 right-[15%] text-emerald-500" delay="1s" />
          <FloatingShape className="bottom-40 left-[20%] text-teal-500" delay="2s" />
        </div>

        <div className="container px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full mb-8 border border-green-200 shadow-lg animate-fade-in-up">
              <div className="relative">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-ping"></div>
                <div className="absolute top-0 left-0 h-2.5 w-2.5 rounded-full bg-green-500"></div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-green-700">
                ✦ India's #1 Toolkit ✦
              </span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.1] animate-fade-in-up delay-100">
              Empower. <span className="relative">
                <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">Create.</span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-green-400" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
              </span> <span className="text-slate-900">Transform.</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in-up delay-200">
              India's most comprehensive online toolkit. 
              <span className="text-green-600 font-bold"> 500+ professional tools</span> for creators, developers & students. 
              Fast, secure & completely free.
            </p>

            {/* Modern Search Bar */}
            <div className="max-w-2xl mx-auto mb-12 animate-fade-in-up delay-300">
              <ModernSearchBar />
            </div>

            {/* Quick Stats Bar */}
            <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up delay-400">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
                <Zap className="h-5 w-5 text-green-500" />
                <span className="text-lg font-black text-slate-800">500+</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Tools</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
                <Layers className="h-5 w-5 text-blue-500" />
                <span className="text-lg font-black text-slate-800">25+</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Categories</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
                <Users className="h-5 w-5 text-purple-500" />
                <span className="text-lg font-black text-slate-800">1M+</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Users</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
                <Award className="h-5 w-5 text-orange-500" />
                <span className="text-lg font-black text-slate-800">Free</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Forever</span>
              </div>
            </div>

            {/* Trending Tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-8 animate-fade-in-up delay-500">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Trending:
              </span>
              {[
                { name: 'JSON Formatter', slug: 'json-formatter' },
                { name: 'AI Resume Builder', slug: 'ai-resume-builder' },
                { name: 'Password Gen', slug: 'password-generator' },
                { name: 'Image Compressor', slug: 'image-compressor' },
                { name: 'Word Counter', slug: 'word-counter' }
              ].map((tool, i) => (
                <Link 
                  key={i} 
                  href={`/tool/${tool.slug}`} 
                  className="px-3 py-1.5 bg-white/50 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-600 hover:text-green-600 hover:bg-white border border-slate-200 hover:border-green-300 transition-all duration-300"
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-1 text-slate-400">
            <span className="text-[10px] font-semibold uppercase tracking-widest">Scroll</span>
            <div className="h-8 w-5 rounded-full border-2 border-slate-300 flex items-start justify-center pt-1">
              <div className="h-1.5 w-1 bg-slate-400 rounded-full animate-scroll-dot"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* FEATURED TOOLS SHOWCASE */}
      {/* ======================================== */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600">Featured Selection</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-3">
                Most Popular <span className="text-green-600">Utilities</span>
              </h2>
              <p className="text-base text-slate-500 font-medium">
                Tools that millions of Indian professionals trust every day
              </p>
            </div>
            <Link 
              href="/tools" 
              className="group flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Grid className="h-5 w-5" />
              Browse All Tools
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Featured Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: 'JSON Formatter & Validator', description: 'Format, validate & beautify JSON data instantly', icon: Braces, color: '#f97316', slug: 'json-formatter', badge: 'Top Rated' },
              { name: 'AI Resume Builder', description: 'Create professional resumes in minutes with AI', icon: FileTextIcon, color: '#8b5cf6', slug: 'ai-resume-builder', badge: 'AI Powered' },
              { name: 'Password Generator', description: 'Generate secure, random passwords instantly', icon: Lock, color: '#10b981', slug: 'password-generator', badge: 'Secure' },
              { name: 'Image Compressor', description: 'Reduce image size without losing quality', icon: Image, color: '#ec4899', slug: 'image-compressor' }
            ].map((tool, i) => (
              <ToolShowcaseCard key={i} {...tool} />
            ))}
          </div>

          {/* Secondary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            {[
              { name: 'Base64 Encoder/Decoder', description: 'Convert text to Base64 and vice versa', icon: ArrowRightLeft, color: '#8b5cf6', slug: 'base64-converter' },
              { name: 'Currency Converter', description: 'Real-time exchange rates for 160+ currencies', icon: DollarSign, color: '#22c55e', slug: 'currency-converter' },
              { name: 'Grammar Checker', description: 'AI-powered grammar and spell check', icon: CheckCircle, color: '#3b82f6', slug: 'grammar-checker' },
              { name: 'URL Shortener', description: 'Shorten long URLs into shareable links', icon: LinkIcon, color: '#f59e0b', slug: 'url-shortener' }
            ].map((tool, i) => (
              <ToolShowcaseCard key={i} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* DESIGN TOOLS CATEGORY SECTION */}
      {/* ======================================== */}
      <section className="py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-pink-400/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 border border-purple-200 shadow-sm">
              <PenTool className="h-4 w-4 text-purple-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-600">
                Creative Suite
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Design <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent">Tools</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Professional design tools for creators, designers & brand builders
            </p>
          </div>

          {/* Design Tools Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { 
                name: 'Graphic Design', 
                description: 'Banners, logos, posters & visual assets', 
                icon: Palette, 
                color: '#8b5cf6',
                slug: 'graphic-design',
                toolCount: 15
              },
              { 
                name: 'Color Tools', 
                description: 'Palettes, harmonies & accessibility', 
                icon: Sparkles, 
                color: '#ec4899',
                slug: 'color-tools',
                toolCount: 10
              },
              { 
                name: 'Text & Fonts', 
                description: 'Typography & font pairing tools', 
                icon: Text, 
                color: '#f97316',
                slug: 'text-font-design',
                toolCount: 10
              },
              { 
                name: 'Layout & UI/UX', 
                description: 'Wireframes & interface design', 
                icon: Layout, 
                color: '#06b6d4',
                slug: 'layout-ui-ux',
                toolCount: 10
              },
              { 
                name: 'AI Design', 
                description: 'AI-powered creative tools', 
                icon: Brain, 
                color: '#a855f7',
                slug: 'ai-design',
                toolCount: 10
              },
              { 
                name: 'Image Editing', 
                description: 'Enhance & transform images', 
                icon: Image, 
                color: '#22c55e',
                slug: 'image-editing',
                toolCount: 10
              },
              { 
                name: 'Brand & Marketing', 
                description: 'Business cards & brand assets', 
                icon: Briefcase, 
                color: '#f59e0b',
                slug: 'brand-marketing-design',
                toolCount: 10
              },
              { 
                name: 'Icon & Shapes', 
                description: 'Icons & vector shapes', 
                icon: Square, 
                color: '#3b82f6',
                slug: 'icon-shape-tools',
                toolCount: 8
              },
              { 
                name: 'Motion & Media', 
                description: 'Animation & video tools', 
                icon: Video, 
                color: '#ef4444',
                slug: 'motion-media-design',
                toolCount: 7
              },
            ].map((category, i) => (
              <Link
                key={i}
                href={`/category/${category.slug}`}
                className="group relative p-6 bg-white rounded-2xl border border-purple-100 shadow-lg hover:shadow-2xl hover:border-purple-200 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Tool Count Badge */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-purple-100 text-purple-600 text-xs font-bold rounded-full">
                  {category.toolCount} tools
                </div>

                <div className="flex items-start gap-4">
                  <div 
                    className="h-14 w-14 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                    style={{ backgroundColor: category.color }}
                  >
                    <category.icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-purple-600 flex items-center gap-1">
                    Explore <ChevronRight className="h-4 w-4" />
                  </span>
                  <div className="h-9 w-9 bg-purple-50 rounded-lg flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Design Tools Link */}
          <div className="text-center mt-10">
            <Link 
              href="/category/design-tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              <Grid className="h-5 w-5" />
              View All Design Tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* AI TOOLS SECTION */}
      {/* ======================================== */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Brain className="h-4 w-4 text-purple-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-400">
                Artificial Intelligence
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Supercharge with <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">AI Tools</span>
            </h2>
            <p className="text-lg text-slate-300 font-medium">
              Leverage cutting-edge AI to automate, create, and innovate faster than ever before
            </p>
          </div>

          {/* AI Tools Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { name: 'Resume Builder', icon: FileTextIcon, color: '#8b5cf6', slug: 'ai-resume-builder' },
              { name: 'Caption Gen', icon: MessageCircle, color: '#ec4899', slug: 'ai-caption-generator' },
              { name: 'Cover Letter', icon: Mail, color: '#f59e0b', slug: 'ai-cover-letter-generator' },
              { name: 'Prompt Gen', icon: Sparkles, color: '#10b981', slug: 'ai-prompt-generator' },
              { name: 'Grammar Check', icon: CheckCircle, color: '#3b82f6', slug: 'ai-grammar-checker' },
              { name: 'Summarizer', icon: FileTextIcon, color: '#6366f1', slug: 'ai-summarizer' },
              { name: 'Story Gen', icon: BookText, color: '#f97316', slug: 'ai-story-generator' },
              { name: 'Paraphraser', icon: RefreshCw, color: '#14b8a6', slug: 'ai-paraphraser' },
              { name: 'Interview Qs', icon: Briefcase, color: '#84cc16', slug: 'ai-interview-question-generator' },
              { name: 'Course Gen', icon: GraduationCap, color: '#06b6d4', slug: 'ai-course-generator' },
              { name: 'Video Script', icon: Video, color: '#a855f7', slug: 'ai-video-script-generator' },
              { name: 'More AI →', icon: ArrowRight, color: '#64748b', slug: 'advanced-tools' }
            ].map((tool, i) => (
              <Link
                key={i}
                href={tool.slug === 'advanced-tools' ? '/advanced-tools' : `/tool/${tool.slug}`}
                className="relative p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div 
                  className="h-14 w-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                  style={{ backgroundColor: tool.color }}
                >
                  <tool.icon className="h-7 w-7 text-white" />
                </div>
                <span className="text-sm font-bold text-white text-center block">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* QUICK ACCESS GRID */}
      {/* ======================================== */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Lightning Fast</span>
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-2">Quick Converters</h2>
              <p className="text-slate-500 font-medium">Instant conversions for everyday needs</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { name: 'Length', icon: Ruler, color: '#0ea5e9', slug: 'length-converter' },
              { name: 'Currency', icon: DollarSign, color: '#22c55e', slug: 'currency-converter' },
              { name: 'JSON', icon: Braces, color: '#f97316', slug: 'json-formatter' },
              { name: 'Base64', icon: Binary, color: '#8b5cf6', slug: 'base64-converter' },
              { name: 'Image', icon: Image, color: '#ec4899', slug: 'image-compressor' },
              { name: 'PDF', icon: FileTextIcon, color: '#ef4444', slug: 'pdf-to-word' },
              { name: 'CSV', icon: Table, color: '#10b981', slug: 'csv-to-excel' },
              { name: 'Color', icon: Palette, color: '#6366f1', slug: 'color-converter' },
              { name: 'Temperature', icon: Thermometer, color: '#f59e0b', slug: 'temperature-converter' },
              { name: 'Weight', icon: Weight, color: '#14b8a6', slug: 'weight-converter' },
              { name: 'Time Zone', icon: Clock, color: '#8b5cf6', slug: 'timezone-converter' },
              { name: 'Number Base', icon: Binary, color: '#ec4899', slug: 'base-converter' },
              { name: 'Markdown', icon: FileCode, color: '#06b6d4', slug: 'markdown-previewer' },
              { name: 'HTML', icon: Code, color: '#f97316', slug: 'html-formatter' },
              { name: 'XML', icon: Braces, color: '#84cc16', slug: 'xml-formatter' },
              { name: 'More →', icon: ArrowRight, color: '#64748b', slug: 'converters' }
            ].map((tool) => (
              <Link
                key={tool.name}
                href={tool.slug === 'converters' ? '/category/converters' : `/tool/${tool.slug}`}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-green-200 transition-all duration-300 group"
              >
                <div 
                  className="h-11 w-11 rounded-lg flex items-center justify-center text-white shadow group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: tool.color }}
                >
                  <IconSmall icon={tool.icon} />
                </div>
                <span className="text-xs font-semibold text-slate-600 group-hover:text-green-600 transition-colors">
                  {tool.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* DEVELOPER TOOLS SECTION */}
      {/* ======================================== */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-6">
              <Terminal className="h-4 w-4 text-slate-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
                Built for Developers
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Developer <span className="text-blue-600">Utilities</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Essential tools for developers, programmers, and engineers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { name: 'JSON Formatter', desc: 'Format, validate & beautify JSON', icon: Braces, color: '#f97316', slug: 'json-formatter', popular: true },
              { name: 'Base64 Converter', desc: 'Encode & decode Base64 strings', icon: Binary, color: '#8b5cf6', slug: 'base64-converter' },
              { name: 'JSON to CSV', desc: 'Convert JSON data to CSV format', icon: Table, color: '#22c55e', slug: 'json-to-csv' },
              { name: 'CSV to JSON', desc: 'Convert CSV to JSON instantly', icon: ArrowRightLeft, color: '#3b82f6', slug: 'csv-to-json' },
              { name: 'HTML Formatter', desc: 'Format & minify HTML code', icon: Code, color: '#f97316', slug: 'html-formatter' },
              { name: 'CSS Formatter', desc: 'Format & beautify CSS styles', icon: FileCode, color: '#06b6d4', slug: 'css-formatter' },
              { name: 'JavaScript Formatter', desc: 'Format JavaScript code', icon: Terminal, color: '#f59e0b', slug: 'javascript-formatter' },
              { name: 'SQL Formatter', desc: 'Format SQL queries', icon: Database, color: '#14b8a6', slug: 'sql-formatter' },
              { name: 'JWT Decoder', desc: 'Decode JWT tokens', icon: Key, color: '#8b5cf6', slug: 'jwt-decoder' },
              { name: 'URL Encoder', desc: 'Encode URL components', icon: Globe, color: '#3b82f6', slug: 'url-encoder' },
              { name: 'Markdown Preview', desc: 'Live markdown preview', icon: FileTextIcon, color: '#6366f1', slug: 'markdown-previewer' },
              { name: 'Diff Checker', desc: 'Compare text differences', icon: GitCompare, color: '#ec4899', slug: 'diff-checker' }
            ].map((tool) => (
              <Link
                key={tool.name}
                href={`/tool/${tool.slug}`}
                className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div 
                  className="h-12 w-12 rounded-lg flex items-center justify-center text-white shadow group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: tool.color }}
                >
                  <Icon icon={tool.icon} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    {tool.popular && (
                      <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 text-[9px] font-bold rounded uppercase">
                        Hot
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{tool.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 transition-colors mt-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* CATEGORIES SECTION */}
      {/* ======================================== */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 border border-slate-200 shadow-sm">
              <Layers className="h-4 w-4 text-green-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-green-600">
                Organization
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Browse by <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Category</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              Explore our comprehensive library of tools organized into easy-to-browse categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = getCategoryIcon(category.icon);
              return (
                <Link 
                  key={category.id} 
                  href={`/category/${category.slug}`}
                  className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl hover:scale-105 transition-all duration-300 overflow-hidden border border-white/20 shadow-lg hover:shadow-2xl"
                >
                  {/* Background Icon */}
                  <div 
                    className="absolute -right-4 -bottom-4 w-28 h-28 opacity-10 group-hover:scale-150 transition-transform duration-500"
                    style={{ color: category.color }}
                  >
                    <IconComponent className="w-full h-full" />
                  </div>
                  
                  {/* Category Icon */}
                  <div 
                    className="h-16 w-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                    style={{ backgroundColor: category.color }}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-green-600 transition-colors uppercase italic">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-green-600 uppercase tracking-wide">
                    Explore <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* VALUE PROPOSITION SECTION */}
      {/* ======================================== */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Zap}
                title="Lightning Fast"
                description="Optimized for speed with real-time processing. No waiting, no loading screens, instant results."
                gradient="bg-gradient-to-br from-yellow-400 to-orange-500"
                delay="0ms"
              />
              <FeatureCard
                icon={ShieldIcon}
                title="100% Secure"
                description="Your data never leaves your browser. Client-side processing ensures complete privacy and security."
                gradient="bg-gradient-to-br from-green-400 to-emerald-500"
                delay="100ms"
              />
              <FeatureCard
                icon={Brain}
                title="AI Powered"
                description="Leverage advanced AI models for smart suggestions, automation, and intelligent outcomes."
                gradient="bg-gradient-to-br from-purple-400 to-pink-500"
                delay="200ms"
              />
              <FeatureCard
                icon={SmartphoneIcon}
                title="Mobile First"
                description="Fully responsive design that works seamlessly on all devices - desktop, tablet, and mobile."
                gradient="bg-gradient-to-br from-blue-400 to-cyan-500"
                delay="300ms"
              />
              <FeatureCard
                icon={Globe2}
                title="Free Forever"
                description="No subscriptions, no hidden fees, no premium tiers. All tools are completely free to use."
                gradient="bg-gradient-to-br from-teal-400 to-emerald-500"
                delay="400ms"
              />
              <FeatureCard
                icon={RefreshCw}
                title="Always Updated"
                description="New tools and features added regularly based on user feedback and industry trends."
                gradient="bg-gradient-to-br from-rose-400 to-pink-500"
                delay="500ms"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* TESTIMONIALS SECTION */}
      {/* ======================================== */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <MessageCircle className="h-4 w-4 text-green-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-green-400">
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Loved by <span className="text-green-400">Millions</span>
            </h2>
            <p className="text-lg text-slate-300 font-medium">
              See what our users have to say about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <TestimonialCard
              name="Priya Sharma"
              role="Software Developer"
              content="This toolkit has become my daily essential. The JSON formatter alone saves me hours of work every week!"
              rating={5}
            />
            <TestimonialCard
              name="Rahul Verma"
              role="Digital Marketer"
              content="The AI tools are incredibly powerful. My productivity has increased 10x since I started using this platform."
              rating={5}
            />
            <TestimonialCard
              name="Anita Patel"
              role="Content Creator"
              content="Best free toolkit I've ever found. The image compressor and caption generator are game-changers!"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* INTERACTIVE STATS SECTION */}
      {/* ======================================== */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-50%] left-[-25%] w-[200%] h-[200%] bg-white/5 rounded-full blur-[100px] animate-pulse"></div>
        </div>

        <div className="container px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '500', label: 'Tools Available', suffix: '+' },
              { value: '1M', label: 'Active Users', suffix: '+' },
              { value: '10M', label: 'Tasks Completed', suffix: '+' },
              { value: '99.9', label: 'Uptime %', suffix: '%' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl md:text-6xl font-black text-white mb-2 animate-pulse">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* FEATURED TOOL SPOTLIGHT */}
      {/* ======================================== */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{ 
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '30px 30px'
                }}></div>
              </div>
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full mb-4">
                    <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                    <span className="text-xs font-bold uppercase tracking-wider">Featured Tool</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black mb-4">
                    AI Resume Builder
                  </h2>
                  <p className="text-xl text-white/80 mb-8">
                    Create professional, ATS-optimized resumes in minutes with our AI-powered resume builder. 
                    Get personalized suggestions, real-time formatting, and export to multiple formats.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      href="/tool/ai-resume-builder"
                      className="px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                      <Rocket className="h-5 w-5" />
                      Try Now Free
                    </Link>
                    <Link 
                      href="/features"
                      className="px-6 py-3 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
                    >
                      <ArrowRight className="h-5 w-5" />
                      Learn More
                    </Link>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex gap-8 mt-8">
                    <div>
                      <div className="text-3xl font-black">50K+</div>
                      <div className="text-xs text-white/60 uppercase tracking-wider">Resumes Created</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black">4.9★</div>
                      <div className="text-xs text-white/60 uppercase tracking-wider">User Rating</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black">2 min</div>
                      <div className="text-xs text-white/60 uppercase tracking-wider">Avg. Build Time</div>
                    </div>
                  </div>
                </div>
                
                {/* Tool Preview Mockup */}
                <div className="flex-1 w-full">
                  <div className="bg-white rounded-2xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="text-xs text-gray-400 font-medium">AI Resume Builder</div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                      <div className="h-4 bg-purple-100 rounded w-full"></div>
                      <div className="h-4 bg-purple-100 rounded w-5/6"></div>
                      <div className="flex gap-2 mt-4">
                        <div className="h-8 w-20 bg-purple-500 rounded-lg"></div>
                        <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* HOW IT WORKS SECTION */}
      {/* ======================================== */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 border border-slate-200 shadow-sm">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
                Simple Process
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              How It <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              Get started in seconds with our intuitive three-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Choose Your Tool',
                description: 'Browse our extensive library of 500+ tools or search for exactly what you need.',
                icon: Search,
                color: '#8b5cf6'
              },
              {
                step: '02',
                title: 'Input Your Data',
                description: 'Paste your content, upload files, or use our AI assistants to generate content.',
                icon: FileTextIcon,
                color: '#f97316'
              },
              {
                step: '03',
                title: 'Get Instant Results',
                description: 'Download your processed files, copy results, or share them directly.',
                icon: Download,
                color: '#22c55e'
              }
            ].map((item, i) => (
              <div key={i} className="relative group">
                {/* Connection Line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-slate-200 to-slate-200"></div>
                )}
                
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8 h-8 w-8 bg-slate-900 rounded-full flex items-center justify-center text-white font-black text-sm">
                    {item.step}
                  </div>
                  
                  {/* Icon */}
                  <div 
                    className="h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg"
                    style={{ backgroundColor: item.color }}
                  >
                    <item.icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-900 mb-3 text-center">{item.title}</h3>
                  <p className="text-sm text-slate-500 font-medium text-center leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* TRUST & SECURITY SECTION */}
      {/* ======================================== */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                Trusted by Millions, <span className="text-green-600">Secure by Design</span>
              </h2>
              <p className="text-lg text-slate-500 font-medium">
                Your security and privacy are our top priorities
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: ShieldIcon, title: 'Bank-Level Security', desc: '256-bit SSL encryption', color: '#10b981' },
                { icon: Lock, title: 'No Data Storage', desc: 'Client-side processing', color: '#8b5cf6' },
                { icon: Eye, title: 'Privacy First', desc: 'No tracking or logging', color: '#f97316' },
                { icon: Globe, title: 'Global CDN', desc: 'Fast worldwide access', color: '#3b82f6' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <div 
                    className="h-12 w-12 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Security Badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-slate-100">
              {['SSL Secured', 'GDPR Compliant', 'No Cookies', 'Open Source'].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* NEWSLETTER SECTION */}
      {/* ======================================== */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-30%] right-[-20%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-30%] left-[-20%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="h-16 w-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-green-400" />
            </div>
            <h2 className="text-4xl font-black text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-slate-300 font-medium mb-8">
              Subscribe to our newsletter and be the first to know about new tools, features, and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-green-500 transition-colors"
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Megaphone className="h-5 w-5" />
                Subscribe
              </button>
            </form>
            <p className="text-xs text-slate-400 mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* FAQ SECTION */}
      {/* ======================================== */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 border border-slate-200 shadow-sm">
                <CircleHelp className="h-4 w-4 text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
                  FAQ
                </span>
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4">
                Frequently Asked <span className="text-blue-600">Questions</span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'Are all tools really free?',
                  a: 'Yes! All 500+ tools are completely free to use. No hidden fees, no premium tiers, no subscription required.'
                },
                {
                  q: 'Is my data safe?',
                  a: 'Absolutely. All processing happens locally in your browser. Your data never leaves your device and is not stored on our servers.'
                },
                {
                  q: 'Do I need to create an account?',
                  a: 'No account required! You can use all tools instantly without signing up. Create an account to save your preferences and history.'
                },
                {
                  q: 'Can I use tools on mobile?',
                  a: 'Yes! All tools are fully responsive and work perfectly on desktop, tablet, and mobile devices.'
                },
                {
                  q: 'How often are new tools added?',
                  a: 'We add new tools every week based on user feedback and requests. Stay tuned for exciting new features!'
                }
              ].map((faq, i) => (
                <details 
                  key={i} 
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-slate-50 transition-colors">
                    <span className="font-bold text-slate-900">{faq.q}</span>
                    <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-500 font-medium">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link 
                href="/faq"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300"
              >
                View All FAQs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* CTA SECTION */}
      {/* ======================================== */}
      <section className="py-20 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Boost Your Productivity?
            </h2>
            <p className="text-xl text-white/80 font-medium mb-10 max-w-2xl mx-auto">
              Join millions of users who trust our toolkit for their daily work. 
              Start using our free tools today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/tools"
                className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Grid className="h-5 w-5" />
                Browse All Tools
              </Link>
              <Link 
                href="/about"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
