# Online Stopwatch - Example Implementation

## Tool Configuration

```typescript
// data/tools.ts - Add Online Stopwatch

{
  id: "online-stopwatch",
  name: "Online Stopwatch",
  slug: "online-stopwatch",
  description: "Measure time accurately with our free online stopwatch. Perfect for sports, cooking, and productivity.",
  category: "productivity-tools",
  type: "calculator",
  icon: "Timer",
  componentName: "OnlineStopwatch",
  seo: {
    title: "Online Stopwatch - Free Timer Tool | India Toolkit",
    description: "Use our free online stopwatch to measure time accurately. Perfect for sports, cooking, and productivity.",
    keywords: ["online stopwatch", "free stopwatch", "timer", "stopwatch online", "time tracker"]
  },
  faqs: [
    {
      question: "How accurate is the online stopwatch?",
      answer: "Our stopwatch uses the browser's high-precision timer API for millisecond accuracy."
    },
    {
      question: "Can I use the stopwatch offline?",
      answer: "Yes, once loaded, the stopwatch works offline without an internet connection."
    },
    {
      question: "Does the stopwatch save my times?",
      answer: "No, all timing happens in your browser. We don't store or track your stopwatch data."
    }
  ],
  isPopular: true,
  color: "#3B82F6"
}
```

## SEO Variants Configuration

```typescript
// lib/data/seo-variants.json

{
  "online-stopwatch": {
    "canonical": {
      "h1": "Online Stopwatch",
      "title": "Online Stopwatch - Free Timer Tool | India Toolkit",
      "description": "Measure time accurately with our free online stopwatch. Perfect for sports, cooking, and productivity.",
      "canonical_url": "https://www.indiatoolkit.in/tool/online-stopwatch"
    },
    "online": {
      "h1": "Online Stopwatch",
      "title": "Online Stopwatch - Use in Browser | India Toolkit",
      "description": "Use our online stopwatch directly in your browser. No download required. Measure time instantly.",
      "canonical_url": "https://www.indiatoolkit.in/tool/online-stopwatch"
    },
    "free": {
      "h1": "Free Online Stopwatch",
      "title": "Free Online Stopwatch - No Cost Timer | India Toolkit",
      "description": "Get our free online stopwatch with no hidden charges. Measure time without any cost.",
      "canonical_url": "https://www.indiatoolkit.in/tool/online-stopwatch"
    },
    "students": {
      "h1": "Online Stopwatch for Students",
      "title": "Online Stopwatch for Students - Study Timer | India Toolkit",
      "description": "Perfect online stopwatch for students. Use for study sessions, exams, and time management.",
      "canonical_url": "https://www.indiatoolkit.in/tool/online-stopwatch"
    },
    "india": {
      "h1": "Online Stopwatch India",
      "title": "Online Stopwatch India - Local Timer Tool | India Toolkit",
      "description": "Online stopwatch optimized for users in India. Works perfectly with Indian time zones.",
      "canonical_url": "https://www.indiatoolkit.in/tool/online-stopwatch"
    }
  }
}
```

## Hindi Variants Configuration

```typescript
// lib/data/seo-variants-hi.json

{
  "online-stopwatch": {
    "canonical": {
      "h1": "ऑनलाइन स्टॉपवॉच",
      "title": "ऑनलाइन स्टॉपवॉच - मुफ्त टाइमर टूल | India Toolkit",
      "description": "हमारे मुफ्त ऑनलाइन स्टॉपवॉच के साथ सटीक रूप से समय मापें। खेल, खाना पकाने और उत्पादकता के लिए बिल्कुल सही।",
      "canonical_url": "https://www.indiatoolkit.in/hi/tool/online-stopwatch"
    },
    "online": {
      "h1": "ऑनलाइन स्टॉपवॉच",
      "title": "ऑनलाइन स्टॉपवॉच - ब्राउज़र में उपयोग करें | India Toolkit",
      "description": "हमारे ऑनलाइन स्टॉपवॉच को सीधे अपने ब्राउज़र में उपयोग करें। कोई डाउनलोड की आवश्यकता नहीं है।",
      "canonical_url": "https://www.indiatoolkit.in/hi/tool/online-stopwatch"
    }
  }
}
```

## Online Stopwatch Component

```typescript
// components/tools/OnlineStopwatch.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { Tool } from '@/types/tool';
import { SEOVariantType, Language } from '@/types/seo';
import { useGA4Events } from '@/hooks/useGA4Events';
import { Timer, Play, Pause, RotateCcw, Copy, Download, Flag } from 'lucide-react';

interface OnlineStopwatchProps {
  tool: Tool;
  variant: SEOVariantType;
  language: Language;
}

export default function OnlineStopwatch({ tool, variant, language }: OnlineStopwatchProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const {
    trackToolUsed,
    trackInputFilled,
    trackCopyClicked,
    trackDownloadClicked,
    trackResetClicked
  } = useGA4Events(tool, variant, language);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const start = () => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - time;
      setIsRunning(true);
      trackToolUsed();
    }
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    trackResetClicked();
  };

  const lap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  const copyTime = () => {
    navigator.clipboard.writeText(formatTime(time));
    trackCopyClicked();
    setShowCopyNotification(true);
    setTimeout(() => setShowCopyNotification(false), 2000);
  };

  const downloadTime = () => {
    const data = {
      tool: tool.name,
      timestamp: new Date().toISOString(),
      final_time: formatTime(time),
      laps: laps.map((lapTime, index) => ({
        lap: index + 1,
        time: formatTime(lapTime)
      }))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.slug}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    trackDownloadClicked();
  };

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const getButtonText = () => {
    if (language === 'hi') {
      return isRunning ? 'रोकें' : 'शुरू करें';
    }
    return isRunning ? 'Stop' : 'Start';
  };

  const getResetText = () => {
    return language === 'hi' ? 'रीसेट' : 'Reset';
  };

  const getLapText = () => {
    return language === 'hi' ? 'लैप' : 'Lap';
  };

  const getCopyText = () => {
    return language === 'hi' ? 'कॉपी' : 'Copy';
  };

  const getDownloadText = () => {
    return language === 'hi' ? 'डाउनलोड' : 'Download';
  };

  return (
    <div className="online-stopwatch">
      {/* Time Display */}
      <div className="time-display-container">
        <div className="time-display">
          {formatTime(time)}
        </div>
        {showCopyNotification && (
          <div className="copy-notification">
            {language === 'hi' ? 'कॉपी किया गया!' : 'Copied!'}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="controls">
        <button 
          onClick={isRunning ? stop : start}
          className={`control-button ${isRunning ? 'stop' : 'start'}`}
          disabled={time === 0 && !isRunning}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
          <span>{getButtonText()}</span>
        </button>
        
        <button 
          onClick={lap}
          className="control-button lap"
          disabled={!isRunning}
        >
          <Flag size={24} />
          <span>{getLapText()}</span>
        </button>
        
        <button 
          onClick={reset}
          className="control-button reset"
          disabled={time === 0 && laps.length === 0}
        >
          <RotateCcw size={24} />
          <span>{getResetText()}</span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          onClick={copyTime}
          className="action-button"
          disabled={time === 0}
        >
          <Copy size={20} />
          <span>{getCopyText()}</span>
        </button>
        
        <button 
          onClick={downloadTime}
          className="action-button"
          disabled={time === 0 && laps.length === 0}
        >
          <Download size={20} />
          <span>{getDownloadText()}</span>
        </button>
      </div>

      {/* Laps */}
      {laps.length > 0 && (
        <div className="laps-container">
          <h3 className="laps-title">
            {language === 'hi' ? 'लैप्स' : 'Laps'}
          </h3>
          <div className="laps-list">
            {laps.map((lapTime, index) => (
              <div key={index} className="lap-item">
                <span className="lap-number">
                  {language === 'hi' ? 'लैप' : 'Lap'} {index + 1}
                </span>
                <span className="lap-time">{formatTime(lapTime)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timer Icon */}
      <div className="timer-icon">
        <Timer size={48} className={isRunning ? 'running' : ''} />
      </div>
    </div>
  );
}
```

## Online Stopwatch Styles

```css
/* components/tools/OnlineStopwatch.module.css */

.online-stopwatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.time-display-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.time-display {
  font-family: 'Courier New', monospace;
  font-size: 4rem;
  font-weight: bold;
  color: #1e293b;
  text-align: center;
  letter-spacing: 0.05em;
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 400px;
}

.copy-notification {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(16, 185, 129, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  animation: fadeInOut 2s ease-in-out;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  20%, 80% { opacity: 1; }
}

.controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.control-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.control-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-button.start {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.control-button.start:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.control-button.stop {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.control-button.stop:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

.control-button.lap {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.control-button.lap:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.control-button.reset {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: white;
}

.control-button.reset:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(107, 114, 128, 0.4);
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  background: white;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-button:hover:not(:disabled) {
  border-color: #3b82f6;
  color: #3b82f6;
  background: #f8fafc;
}

.laps-container {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.laps-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  text-align: center;
}

.laps-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
}

.lap-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.lap-number {
  font-weight: 600;
  color: #64748b;
}

.lap-time {
  font-family: 'Courier New', monospace;
  font-weight: 700;
  color: #1e293b;
}

.timer-icon {
  color: #cbd5e1;
  transition: color 0.3s ease;
}

.timer-icon.running {
  color: #3b82f6;
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Responsive Design */
@media (max-width: 640px) {
  .time-display {
    font-size: 2.5rem;
    min-width: 280px;
    padding: 1.5rem;
  }

  .control-button {
    padding: 0.75rem 1.5rem;
    min-width: 100px;
  }

  .laps-container {
    max-width: 100%;
  }
}
```

## Variant Page Implementation

```typescript
// app/seo-variants/[slug]-online/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug } from "@/lib/utils";
import { generateVariantContent } from "@/lib/seo/variant-generator";
import { SEOVariantType, Language } from "@/types/seo";
import VariantPageTemplate from "@/components/seo/VariantPageTemplate";
import GA4EventTracker from "@/components/analytics/GA4EventTracker";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };

  const variant: SEOVariantType = 'online';
  const language: Language = 'en';
  const seoContent = generateVariantContent(tool, variant, language);

  return {
    title: seoContent.title,
    description: seoContent.description,
    canonical: `https://www.indiatoolkit.in/tool/${tool.slug}`,
    openGraph: {
      title: seoContent.title,
      description: seoContent.description,
      url: `https://www.indiatoolkit.in/${slug}-online`,
      type: "website",
    },
  };
}

export default async function OnlineVariantPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const variant: SEOVariantType = 'online';
  const language: Language = 'en';
  const seoContent = generateVariantContent(tool, variant, language);

  return (
    <>
      <GA4EventTracker tool={tool} variant={variant} language={language} />
      <VariantPageTemplate
        tool={tool}
        variant={variant}
        language={language}
        seoContent={seoContent}
        relatedTools={[]} // Fetch related tools
      />
    </>
  );
}
```

## Hindi Variant Page Implementation

```typescript
// app/hi/tool/[slug]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug } from "@/lib/utils";
import { generateVariantContent } from "@/lib/seo/variant-generator";
import { SEOVariantType, Language } from "@/types/seo";
import VariantPageTemplate from "@/components/seo/VariantPageTemplate";
import GA4EventTracker from "@/components/analytics/GA4EventTracker";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };

  const variant: SEOVariantType = 'canonical';
  const language: Language = 'hi';
  const seoContent = generateVariantContent(tool, variant, language);

  return {
    title: seoContent.title,
    description: seoContent.description,
    canonical: `https://www.indiatoolkit.in/tool/${tool.slug}`,
    openGraph: {
      title: seoContent.title,
      description: seoContent.description,
      url: `https://www.indiatoolkit.in/hi/tool/${slug}`,
      type: "website",
    },
  };
}

export default async function HindiToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const variant: SEOVariantType = 'canonical';
  const language: Language = 'hi';
  const seoContent = generateVariantContent(tool, variant, language);

  return (
    <>
      <GA4EventTracker tool={tool} variant={variant} language={language} />
      <VariantPageTemplate
        tool={tool}
        variant={variant}
        language={language}
        seoContent={seoContent}
        relatedTools={[]} // Fetch related tools
      />
    </>
  );
}
```

## URL Structure Summary

```
Canonical Page:
https://www.indiatoolkit.in/tool/online-stopwatch

SEO Variants:
https://www.indiatoolkit.in/online-stopwatch-online
https://www.indiatoolkit.in/free-online-stopwatch
https://www.indiatoolkit.in/online-stopwatch-for-students
https://www.indiatoolkit.in/online-stopwatch-india

Hindi Pages:
https://www.indiatoolkit.in/hi/tool/online-stopwatch
https://www.indiatoolkit.in/hi/online-stopwatch-online
```

## SEO Content Example (Canonical)

```markdown
# Online Stopwatch

## What is Online Stopwatch?

Online Stopwatch is a powerful online tool that helps users measure time accurately with millisecond precision. This free productivity tool provides instant results directly in your browser with no downloads required.

## Why Use Online Stopwatch Online?

Use our online stopwatch directly in your browser without any downloads. No installation required, works on all devices, and provides accurate timing for sports, cooking, study sessions, and productivity tracking.

## How Does Online Stopwatch Work?

Simply click the Start button to begin timing, Stop to pause, and Reset to clear. The stopwatch displays time in minutes, seconds, and centiseconds for precise measurement. You can also record laps to track split times.

## Common Use Cases

- Sports timing and coaching
- Cooking and baking timers
- Study session tracking
- Productivity time management
- Exercise and workout timing
- Presentation timing

## Benefits

- Completely free to use with no hidden fees
- Works on all devices - desktop, tablet, and mobile
- No registration required - start using immediately
- Secure - all processing happens in your browser
- Fast results with instant timing
- Intuitive interface designed for ease of use

## How to Use

1. Click the Start button to begin timing
2. Click Stop to pause the stopwatch
3. Click Lap to record split times
4. Click Reset to clear and start over
5. Use Copy to copy the time to clipboard
6. Use Download to save your timing data

## Who Should Use It?

- Athletes and coaches
- Students and teachers
- Home cooks and bakers
- Productivity enthusiasts
- Fitness professionals
- Presenters and speakers
```

## SEO Content Example (Students Variant)

```markdown
# Online Stopwatch for Students

## What is Online Stopwatch for Students?

Online Stopwatch for Students is designed specifically for students to help with their studies. This free educational tool provides instant timing for study sessions, exam practice, and time management exercises.

## Why Use Online Stopwatch for Students?

Students can use this tool for tracking study sessions, timing practice tests, managing homework time, and improving time management skills. Perfect for exam preparation and academic success.

## How Does Online Stopwatch for Students Work?

Simply start the timer when you begin studying, stop when you finish, and track your progress. Record laps for different subjects or study sessions to analyze your study patterns.

## Common Use Cases

- Study session timing
- Exam practice timing
- Homework time management
- Presentation rehearsal
- Group project coordination
- Break time tracking

## Benefits

- Optimized for educational purposes
- Helps in learning time management
- Free for all students
- No registration required
- Works offline once loaded
- Easy to use interface

## How to Use

1. Set your study goal time
2. Click Start when you begin studying
3. Take breaks and resume as needed
4. Use Lap to track different subjects
5. Review your timing data
6. Download your study logs

## Who Should Use It?

- School students
- College students
- Competitive exam aspirants
- Teachers and tutors
- Study group members
- Academic researchers
```
