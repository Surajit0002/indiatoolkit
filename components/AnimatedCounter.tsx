"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export default function AnimatedCounter({ 
  end, 
  duration = 2000, 
  suffix = "",
  prefix = "",
  decimals = 0
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
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
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = easeOutQuart * end;
      setCount(decimals > 0 ? parseFloat(currentValue.toFixed(decimals)) : Math.floor(currentValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration, decimals]);

  // Format large numbers
  const formatNumber = (num: number): string => {
    if (end >= 1000000 && num >= 10000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (end >= 1000 && num >= 1000) {
      return (num / 1000).toFixed(end >= 10000 ? 0 : 1) + "K";
    }
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return num.toString();
  };

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}
