"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

// Fade In Wrapper Component
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Slide In Wrapper Component
interface SlideInProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  className?: string;
}

export function SlideIn({ 
  children, 
  direction = "up", 
  delay = 0, 
  className = "" 
}: SlideInProps) {
  const getInitial = () => {
    switch(direction) {
      case "left": return { opacity: 0, x: -40 };
      case "right": return { opacity: 0, x: 40 };
      case "down": return { opacity: 0, y: -40 };
      default: return { opacity: 0, y: 40 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scale In Wrapper Component
interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function ScaleIn({ children, delay = 0, className = "" }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger Container Component
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerContainer({ children, className = "" }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger Item Component
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated Card Component
interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
}

export function AnimatedCard({ 
  children, 
  className = "", 
  hoverEffect = true,
  delay = 0 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      whileHover={hoverEffect ? { scale: 1.02, y: -4 } : undefined}
      whileTap={hoverEffect ? { scale: 0.98 } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated Button Component
interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function AnimatedButton({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  isLoading = false,
  fullWidth = false,
  className = "",
  disabled,
  onClick,
}: AnimatedButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-bold rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 focus:ring-indigo-500 shadow-lg shadow-indigo-100",
    secondary: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 focus:ring-emerald-500 shadow-lg shadow-emerald-100",
    outline: "border-2 border-slate-200 text-slate-700 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  };
  
  const sizes = {
    sm: "h-10 px-4 text-sm gap-2",
    md: "h-12 px-6 text-base gap-2",
    lg: "h-14 px-8 text-lg gap-3"
  };
  
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </motion.span>
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon className="h-5 w-5" />}
          {children}
          {Icon && iconPosition === "right" && <Icon className="h-5 w-5" />}
        </>
      )}
    </motion.button>
  );
}

// Animated Input Component
interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: string;
}

export function AnimatedInput({
  icon: Icon,
  error,
  className = "",
  ...props
}: AnimatedInputProps) {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <input
        className={`
          w-full h-14 rounded-2xl border-2 bg-white font-medium text-slate-700
          focus:outline-none transition-all
          ${Icon ? "pl-12 pr-4" : "px-4"}
          ${error 
            ? "border-red-500 bg-red-50 focus:border-red-500" 
            : "border-slate-200 focus:border-indigo-500"
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// Loading Skeleton Component
interface LoadingSkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export function LoadingSkeleton({
  className = "",
  variant = "rectangular",
  width = "100%",
  height = "1rem"
}: LoadingSkeletonProps) {
  const baseStyles = "animate-pulse bg-slate-200";
  
  const variants = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-xl"
  };
  
  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{ width, height }}
    />
  );
}

// Animated Result Panel
interface ResultPanelProps {
  children: React.ReactNode;
  show: boolean;
  className?: string;
}

import { AnimatePresence } from "framer-motion";

export function ResultPanel({ children, show, className = "" }: ResultPanelProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0, scale: 0.95 }}
          animate={{ opacity: 1, height: "auto", scale: 1 }}
          exit={{ opacity: 0, height: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Progress Bar Component
interface ProgressBarProps {
  progress: number;
  className?: string;
  color?: string;
}

export function ProgressBar({
  progress,
  className = "",
  color = "bg-indigo-600"
}: ProgressBarProps) {
  return (
    <div className={`h-3 rounded-full bg-slate-200 overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`h-full ${color}`}
      />
    </div>
  );
}

// Animated Counter Component
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className = ""
}: AnimatedCounterProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      {prefix}{value.toLocaleString()}{suffix}
    </motion.span>
  );
}

// Toast Notification Component
interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  show: boolean;
  onClose: () => void;
}

export function Toast({ message, type = "success", show, onClose }: ToastProps) {
  const colors = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-indigo-500",
    warning: "bg-amber-500"
  };
  
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 50, x: "-50%" }}
          className={`fixed bottom-6 left-1/2 ${colors[type]} text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-3`}
        >
          <span>{message}</span>
          <button onClick={onClose} className="hover:opacity-80">✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Page Wrapper with entrance animations
interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Section with staggered children
interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({ children, className = "" }: SectionWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Interactive Icon Button
interface IconButtonProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  className?: string;
}

export function IconButton({
  icon: Icon,
  size = "md",
  variant = "ghost",
  className = "",
  onClick,
}: IconButtonProps) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };
  
  const variants = {
    primary: "bg-indigo-100 text-indigo-600 hover:bg-indigo-200",
    secondary: "bg-emerald-100 text-emerald-600 hover:bg-emerald-200",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100"
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${sizes[size]} ${variants[variant]} rounded-xl flex items-center justify-center transition-colors ${className}`}
    >
      <Icon className={size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6"} />
    </motion.button>
  );
}

export default {
  FadeIn,
  SlideIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  AnimatedCard,
  AnimatedButton,
  AnimatedInput,
  LoadingSkeleton,
  ResultPanel,
  ProgressBar,
  AnimatedCounter,
  Toast,
  PageWrapper,
  SectionWrapper,
  IconButton
};
