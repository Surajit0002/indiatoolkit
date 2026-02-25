"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up" | "zoom-in";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function ScrollAnimation({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = ""
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const animationClasses = {
    "fade-up": "translate-y-8 opacity-0",
    "fade-down": "-translate-y-8 opacity-0",
    "fade-left": "translate-x-8 opacity-0",
    "fade-right": "-translate-x-8 opacity-0",
    "scale-up": "scale-90 opacity-0",
    "zoom-in": "scale-95 opacity-0"
  };

  const visibleClasses = {
    "fade-up": "translate-y-0 opacity-100",
    "fade-down": "translate-y-0 opacity-100",
    "fade-left": "translate-x-0 opacity-100",
    "fade-right": "translate-x-0 opacity-100",
    "scale-up": "scale-100 opacity-100",
    "zoom-in": "scale-100 opacity-100"
  };

  return (
    <div
      ref={ref}
      className={`${className} transition-all`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isVisible ? undefined : undefined,
        opacity: isVisible ? undefined : undefined
      }}
    >
      <div
        className={`transition-all ${isVisible ? visibleClasses[animation] : animationClasses[animation]}`}
        style={{
          transitionDelay: `${delay}ms`,
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        {children}
      </div>
    </div>
  );
}
