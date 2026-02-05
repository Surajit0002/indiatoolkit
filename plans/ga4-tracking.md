# GA4 Event Tracking System

## GA4 Event Tracking Hook

```typescript
// hooks/useGA4Events.ts

import { Tool } from '@/types/tool';
import { SEOVariantType, Language } from '@/types/seo';
import { GA4EventName, GA4EventParameters } from '@/types/analytics';

interface UseGA4EventsReturn {
  trackToolView: () => void;
  trackToolUsed: () => void;
  trackInputFilled: (field: string) => void;
  trackCopyClicked: () => void;
  trackDownloadClicked: () => void;
  trackResetClicked: () => void;
  trackLanguageSwitched: (newLang: string) => void;
  trackCustomEvent: (eventName: string, params?: Record<string, any>) => void;
}

export function useGA4Events(
  tool: Tool,
  variant: SEOVariantType,
  language: Language
): UseGA4EventsReturn {
  
  const pageVariant = `${tool.slug}-${variant}`;

  const trackEvent = (eventName: GA4EventName, additionalParams: Partial<GA4EventParameters> = {}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const params: GA4EventParameters = {
        tool_name: tool.name,
        tool_slug: tool.slug,
        category: tool.category,
        page_variant: pageVariant,
        language: language,
        ...additionalParams
      };

      (window as any).gtag('event', eventName, params);
      
      // Console log for development
      if (process.env.NODE_ENV === 'development') {
        console.log('[GA4 Event]', eventName, params);
      }
    }
  };

  return {
    trackToolView: () => trackEvent('tool_view'),
    trackToolUsed: () => trackEvent('tool_used'),
    trackInputFilled: (field: string) => trackEvent('input_filled', { field }),
    trackCopyClicked: () => trackEvent('copy_clicked'),
    trackDownloadClicked: () => trackEvent('download_clicked'),
    trackResetClicked: () => trackEvent('reset_clicked'),
    trackLanguageSwitched: (newLang: string) => trackEvent('language_switched', { new_language: newLang }),
    trackCustomEvent: (eventName: string, params?: Record<string, any>) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, {
          tool_name: tool.name,
          tool_slug: tool.slug,
          category: tool.category,
          page_variant: pageVariant,
          language: language,
          ...params
        });
      }
    }
  };
}

/**
 * Track page view with engagement time
 */
export function trackPageView(tool: Tool, variant: SEOVariantType, language: Language) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const pageVariant = `${tool.slug}-${variant}`;
    
    (window as any).gtag('event', 'page_view', {
      page_title: tool.name,
      page_location: window.location.href,
      page_path: window.location.pathname,
      tool_name: tool.name,
      tool_slug: tool.slug,
      category: tool.category,
      page_variant: pageVariant,
      language: language
    });
  }
}

/**
 * Track engagement time
 */
export function trackEngagementTime(
  tool: Tool,
  variant: SEOVariantType,
  language: Language,
  duration: number
) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const pageVariant = `${tool.slug}-${variant}`;
    
    (window as any).gtag('event', 'engagement_time', {
      tool_name: tool.name,
      tool_slug: tool.slug,
      category: tool.category,
      page_variant: pageVariant,
      language: language,
      engagement_time: duration
    });
  }
}
```

## GA4 Configuration

```typescript
// lib/analytics/ga4-config.ts

import { GA4Config, GA4EventName } from '@/types/analytics';

export const GA4_MEASUREMENT_ID = 'G-BBHVWNTSWB';

export const GA4_CONFIG: GA4Config = {
  measurement_id: GA4_MEASUREMENT_ID,
  engagement_events: [
    'tool_view',
    'tool_used',
    'input_filled',
    'copy_clicked',
    'download_clicked',
    'reset_clicked',
    'language_switched',
    'engagement_time'
  ],
  conversion_events: [
    'tool_used',
    'download_clicked'
  ]
};

/**
 * Initialize GA4 with custom configuration
 */
export function initGA4() {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA4_MEASUREMENT_ID, {
      send_page_view: false,
      engagement_time_msec: true,
      debug_mode: process.env.NODE_ENV === 'development',
      custom_map: {
        tool_name: 'custom_tool_name',
        tool_slug: 'custom_tool_slug',
        category: 'custom_category',
        page_variant: 'custom_page_variant',
        language: 'custom_language'
      }
    });
  }
}

/**
 * Configure GA4 events as engagement events
 */
export function configureGA4Events() {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    // Mark engagement events
    GA4_CONFIG.engagement_events.forEach(eventName => {
      (window as any).gtag('event', eventName, {
        event_category: 'engagement',
        non_interaction: false
      });
    });

    // Mark conversion events
    GA4_CONFIG.conversion_events.forEach(eventName => {
      (window as any).gtag('event', eventName, {
        event_category: 'conversion',
        non_interaction: false
      });
    });
  }
}
```

## GA4 Data Fetching

```typescript
// lib/analytics/ga4-fetcher.ts

import { GA4Data, GA4Metrics, ToolGA4Metrics, VariantGA4Metrics, LanguageGA4Metrics } from '@/types/analytics';

interface GA4APIResponse {
  reports: Array<{
    columnHeader: {
      dimensions: string[];
      metricHeader: {
        metricHeaderEntries: Array<{
          name: string;
          type: string;
        }>;
      };
    };
    data: {
      rows: Array<{
        dimensions: string[];
        metrics: Array<{
          values: string[];
        }>;
      }>;
    };
  }>;
}

/**
 * Fetch GA4 data for the dashboard
 */
export async function fetchGA4Data(
  startDate: string = '30daysAgo',
  endDate: string = 'today'
): Promise<GA4Data> {
  try {
    // In production, this would call the Google Analytics Data API
    // For now, we'll return mock data
    
    const mockData = generateMockGA4Data();
    return mockData;
  } catch (error) {
    console.error('Error fetching GA4 data:', error);
    throw error;
  }
}

/**
 * Fetch GA4 data for a specific tool
 */
export async function fetchToolGA4Data(
  toolSlug: string,
  startDate: string = '30daysAgo',
  endDate: string = 'today'
): Promise<ToolGA4Metrics | null> {
  try {
    // In production, this would call the Google Analytics Data API
    const mockData = generateMockToolGA4Data(toolSlug);
    return mockData;
  } catch (error) {
    console.error('Error fetching tool GA4 data:', error);
    return null;
  }
}

/**
 * Fetch GA4 data for variants
 */
export async function fetchVariantGA4Data(
  startDate: string = '30daysAgo',
  endDate: string = 'today'
): Promise<VariantGA4Metrics[]> {
  try {
    const mockData = generateMockVariantGA4Data();
    return mockData;
  } catch (error) {
    console.error('Error fetching variant GA4 data:', error);
    return [];
  }
}

/**
 * Fetch GA4 data by language
 */
export async function fetchLanguageGA4Data(
  startDate: string = '30daysAgo',
  endDate: string = 'today'
): Promise<LanguageGA4Metrics[]> {
  try {
    const mockData = generateMockLanguageGA4Data();
    return mockData;
  } catch (error) {
    console.error('Error fetching language GA4 data:', error);
    return [];
  }
}

// Mock data generators (replace with actual API calls in production)

function generateMockGA4Data(): GA4Data {
  return {
    events: [],
    metrics: {
      total_events: 150000,
      unique_users: 45000,
      avg_engagement_time: 180,
      conversion_rate: 0.35,
      by_tool: generateMockToolGA4Metrics(),
      by_variant: generateMockVariantGA4Data(),
      by_language: generateMockLanguageGA4Data()
    }
  };
}

function generateMockToolGA4Metrics(): ToolGA4Metrics[] {
  return [
    {
      tool_slug: 'online-stopwatch',
      tool_name: 'Online Stopwatch',
      tool_views: 15000,
      tool_used: 8500,
      input_filled: 12000,
      copy_clicked: 3200,
      download_clicked: 1500,
      reset_clicked: 4800,
      avg_engagement_time: 210,
      conversion_rate: 0.57
    },
    {
      tool_slug: 'word-counter',
      tool_name: 'Word Counter',
      tool_views: 12000,
      tool_used: 7200,
      input_filled: 10000,
      copy_clicked: 2800,
      download_clicked: 800,
      reset_clicked: 3200,
      avg_engagement_time: 180,
      conversion_rate: 0.60
    }
  ];
}

function generateMockToolGA4Data(toolSlug: string): ToolGA4Metrics | null {
  const mockData = generateMockToolGA4Metrics();
  return mockData.find(t => t.tool_slug === toolSlug) || null;
}

function generateMockVariantGA4Data(): VariantGA4Metrics[] {
  return [
    {
      variant_type: 'canonical',
      tool_views: 50000,
      tool_used: 28000,
      avg_engagement_time: 190,
      conversion_rate: 0.56,
      top_tools: ['online-stopwatch', 'word-counter', 'json-formatter']
    },
    {
      variant_type: 'online',
      tool_views: 35000,
      tool_used: 19500,
      avg_engagement_time: 175,
      conversion_rate: 0.56,
      top_tools: ['online-stopwatch', 'word-counter', 'password-generator']
    },
    {
      variant_type: 'free',
      tool_views: 28000,
      tool_used: 15400,
      avg_engagement_time: 165,
      conversion_rate: 0.55,
      top_tools: ['online-stopwatch', 'word-counter', 'qr-code-generator']
    },
    {
      variant_type: 'students',
      tool_views: 22000,
      tool_used: 12100,
      avg_engagement_time: 200,
      conversion_rate: 0.55,
      top_tools: ['online-stopwatch', 'word-counter', 'age-calculator']
    },
    {
      variant_type: 'india',
      tool_views: 18000,
      tool_used: 9900,
      avg_engagement_time: 185,
      conversion_rate: 0.55,
      top_tools: ['online-stopwatch', 'word-counter', 'emi-calculator']
    }
  ];
}

function generateMockLanguageGA4Data(): LanguageGA4Metrics[] {
  return [
    {
      language: 'en',
      tool_views: 120000,
      tool_used: 67200,
      avg_engagement_time: 180,
      conversion_rate: 0.56
    },
    {
      language: 'hi',
      tool_views: 30000,
      tool_used: 16800,
      avg_engagement_time: 195,
      conversion_rate: 0.56
    }
  ];
}
```

## GA4 Event Tracking Component

```typescript
// components/analytics/GA4EventTracker.tsx

'use client';

import { useEffect } from 'react';
import { Tool } from '@/types/tool';
import { SEOVariantType, Language } from '@/types/seo';
import { useGA4Events, trackPageView, trackEngagementTime } from '@/hooks/useGA4Events';

interface GA4EventTrackerProps {
  tool: Tool;
  variant: SEOVariantType;
  language: Language;
}

export default function GA4EventTracker({ tool, variant, language }: GA4EventTrackerProps) {
  const { trackToolView } = useGA4Events(tool, variant, language);

  useEffect(() => {
    // Track page view on mount
    trackPageView(tool, variant, language);
    trackToolView();

    // Track engagement time every 30 seconds
    const engagementInterval = setInterval(() => {
      trackEngagementTime(tool, variant, language, 30);
    }, 30000);

    return () => {
      clearInterval(engagementInterval);
    };
  }, [tool, variant, language, trackToolView]);

  return null; // This component doesn't render anything
}
```

## Usage Example in Tool Component

```typescript
// components/tools/OnlineStopwatch.tsx

'use client';

import { useState, useEffect } from 'react';
import { Tool } from '@/types/tool';
import { SEOVariantType, Language } from '@/types/seo';
import { useGA4Events } from '@/hooks/useGA4Events';

interface OnlineStopwatchProps {
  tool: Tool;
  variant: SEOVariantType;
  language: Language;
}

export default function OnlineStopwatch({ tool, variant, language }: OnlineStopwatchProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const {
    trackToolUsed,
    trackInputFilled,
    trackCopyClicked,
    trackDownloadClicked,
    trackResetClicked
  } = useGA4Events(tool, variant, language);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      trackToolUsed();
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.length > 0) {
      trackInputFilled('time_input');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formatTime(time));
    trackCopyClicked();
  };

  const handleDownload = () => {
    // Download logic
    trackDownloadClicked();
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    trackResetClicked();
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="stopwatch-container">
      <div className="time-display">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={() => setIsRunning(false)} disabled={!isRunning}>Stop</button>
        <button onClick={handleCopy}>Copy</button>
        <button onClick={handleDownload}>Download</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
```

## GA4 Event Schema

```typescript
// Event: tool_view
{
  event_name: 'tool_view',
  parameters: {
    tool_name: 'Online Stopwatch',
    tool_slug: 'online-stopwatch',
    category: 'productivity-tools',
    page_variant: 'online-stopwatch-canonical',
    language: 'en'
  }
}

// Event: tool_used
{
  event_name: 'tool_used',
  parameters: {
    tool_name: 'Online Stopwatch',
    tool_slug: 'online-stopwatch',
    category: 'productivity-tools',
    page_variant: 'online-stopwatch-canonical',
    language: 'en'
  }
}

// Event: input_filled
{
  event_name: 'input_filled',
  parameters: {
    tool_name: 'Online Stopwatch',
    tool_slug: 'online-stopwatch',
    category: 'productivity-tools',
    page_variant: 'online-stopwatch-canonical',
    language: 'en',
    field: 'time_input'
  }
}

// Event: copy_clicked
{
  event_name: 'copy_clicked',
  parameters: {
    tool_name: 'Online Stopwatch',
    tool_slug: 'online-stopwatch',
    category: 'productivity-tools',
    page_variant: 'online-stopwatch-canonical',
    language: 'en'
  }
}

// Event: download_clicked
{
  event_name: 'download_clicked',
  parameters: {
    tool_name: 'Online Stopwatch',
    tool_slug: 'online-stopwatch',
    category: 'productivity-tools',
    page_variant: 'online-stopwatch-canonical',
    language: 'en'
  }
}

// Event: reset_clicked
{
  event_name: 'reset_clicked',
  parameters: {
    tool_name: 'Online Stopwatch',
    tool_slug: 'online-stopwatch',
    category: 'productivity-tools',
    page_variant: 'online-stopwatch-canonical',
    language: 'en'
  }
}

// Event: language_switched
{
  event_name: 'language_switched',
  parameters: {
    tool_name: 'Online Stopwatch',
    tool_slug: 'online-stopwatch',
    category: 'productivity-tools',
    page_variant: 'online-stopwatch-canonical',
    language: 'en',
    new_language: 'hi'
  }
}
```
