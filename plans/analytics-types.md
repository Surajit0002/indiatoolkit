# Analytics Types - GA4 + GSC Growth Dashboard

## GA4 Event Types

```typescript
export type GA4EventName = 
  | 'tool_view'
  | 'tool_used'
  | 'input_filled'
  | 'copy_clicked'
  | 'download_clicked'
  | 'reset_clicked'
  | 'language_switched';

export interface GA4Event {
  event_name: GA4EventName;
  parameters: GA4EventParameters;
}

export interface GA4EventParameters {
  tool_name: string;
  tool_slug: string;
  category: string;
  page_variant: string;
  language: string;
  field?: string;
  new_language?: string;
  engagement_time?: number;
  [key: string]: string | number | boolean | undefined;
}

export interface GA4Config {
  measurement_id: string;
  engagement_events: GA4EventName[];
  conversion_events: GA4EventName[];
}

export interface GA4Data {
  events: GA4Event[];
  metrics: GA4Metrics;
}

export interface GA4Metrics {
  total_events: number;
  unique_users: number;
  avg_engagement_time: number;
  conversion_rate: number;
  by_tool: ToolGA4Metrics[];
  by_variant: VariantGA4Metrics[];
  by_language: LanguageGA4Metrics[];
}

export interface ToolGA4Metrics {
  tool_slug: string;
  tool_name: string;
  tool_views: number;
  tool_used: number;
  input_filled: number;
  copy_clicked: number;
  download_clicked: number;
  reset_clicked: number;
  avg_engagement_time: number;
  conversion_rate: number;
}

export interface VariantGA4Metrics {
  variant_type: string;
  tool_views: number;
  tool_used: number;
  avg_engagement_time: number;
  conversion_rate: number;
  top_tools: string[];
}

export interface LanguageGA4Metrics {
  language: string;
  tool_views: number;
  tool_used: number;
  avg_engagement_time: number;
  conversion_rate: number;
}
```

## GSC Data Types

```typescript
export interface GSCData {
  search_analytics: GSCSearchAnalytics;
  url_inspection?: GSCUrlInspection;
}

export interface GSCSearchAnalytics {
  total_impressions: number;
  total_clicks: number;
  avg_position: number;
  avg_ctr: number;
  by_url: GSCUrlMetrics[];
  by_query: GSCQueryMetrics[];
  by_device: GSCDeviceMetrics[];
  by_country: GSCCountryMetrics[];
  by_date: GSCDateMetrics[];
}

export interface GSCUrlMetrics {
  url: string;
  impressions: number;
  clicks: number;
  avg_position: number;
  ctr: number;
  queries: string[];
}

export interface GSCQueryMetrics {
  query: string;
  impressions: number;
  clicks: number;
  avg_position: number;
  ctr: number;
  urls: string[];
}

export interface GSCDeviceMetrics {
  device: 'desktop' | 'mobile' | 'tablet';
  impressions: number;
  clicks: number;
  avg_position: number;
  ctr: number;
}

export interface GSCCountryMetrics {
  country: string;
  impressions: number;
  clicks: number;
  avg_position: number;
  ctr: number;
}

export interface GSCDateMetrics {
  date: string;
  impressions: number;
  clicks: number;
  avg_position: number;
  ctr: number;
}

export interface GSCUrlInspection {
  url: string;
  index_status: 'indexed' | 'not_indexed' | 'error';
  last_crawled: string;
  crawl_errors: string[];
  mobile_usability: {
    status: 'pass' | 'fail';
    issues: string[];
  };
  page_experience: {
    status: 'pass' | 'fail';
    issues: string[];
  };
}
```

## Dashboard Data Types

```typescript
export interface DashboardData {
  seo_performance: SEOPerformance;
  tool_performance: ToolPerformance;
  programmatic_seo_insights: ProgrammaticSEOInsights;
  actionable_alerts: ActionableAlert[];
  decision_output: DecisionOutput[];
  last_updated: string;
}

export interface SEOPerformance {
  total_impressions: number;
  total_clicks: number;
  avg_position: number;
  avg_ctr: number;
  trend: {
    impressions: number; // percentage change
    clicks: number;
    position: number;
    ctr: number;
  };
  by_tool: ToolSEOMetrics[];
  by_variant: VariantSEOMetrics[];
  by_language: LanguageSEOMetrics[];
}

export interface ToolSEOMetrics {
  tool_slug: string;
  tool_name: string;
  impressions: number;
  clicks: number;
  avg_position: number;
  ctr: number;
  trend: {
    impressions: number;
    clicks: number;
    position: number;
    ctr: number;
  };
  top_queries: string[];
}

export interface VariantSEOMetrics {
  variant_type: string;
  avg_impressions: number;
  avg_clicks: number;
  avg_position: number;
  avg_ctr: number;
  best_tools: string[];
  worst_tools: string[];
}

export interface LanguageSEOMetrics {
  language: string;
  impressions: number;
  clicks: number;
  avg_position: number;
  ctr: number;
}

export interface ToolPerformance {
  total_tool_uses: number;
  avg_engagement_time: number;
  conversion_rate: number;
  trend: {
    uses: number;
    engagement_time: number;
    conversion_rate: number;
  };
  top_tools: ToolUsageMetrics[];
  low_ctr_tools: LowCTRTools[];
  high_exit_tools: HighExitTools[];
  unused_tools: UnusedTools[];
}

export interface ToolUsageMetrics {
  tool_slug: string;
  tool_name: string;
  usage_count: number;
  engagement_time: number;
  conversion_rate: number;
  trend: {
    usage: number;
    engagement_time: number;
    conversion_rate: number;
  };
}

export interface LowCTRTools {
  tool_slug: string;
  tool_name: string;
  impressions: number;
  clicks: number;
  ctr: number;
  avg_position: number;
  issue: string;
}

export interface HighExitTools {
  tool_slug: string;
  tool_name: string;
  tool_views: number;
  tool_used: number;
  exit_rate: number;
  avg_engagement_time: number;
  issue: string;
}

export interface UnusedTools {
  tool_slug: string;
  tool_name: string;
  last_used: string;
  days_since_use: number;
  impressions: number;
  issue: string;
}

export interface ProgrammaticSEOInsights {
  variant_performance: VariantPerformance[];
  language_performance: LanguagePerformance[];
  content_gaps: ContentGap[];
  keyword_opportunities: KeywordOpportunity[];
}

export interface VariantPerformance {
  variant_type: string;
  avg_impressions: number;
  avg_ctr: number;
  avg_position: number;
  best_tools: string[];
  worst_tools: string[];
  recommendations: string[];
}

export interface LanguagePerformance {
  language: string;
  impressions: number;
  clicks: number;
  avg_position: number;
  ctr: number;
  tool_count: number;
  recommendations: string[];
}

export interface ContentGap {
  tool_slug: string;
  tool_name: string;
  missing_variants: string[];
  potential_traffic: number;
  priority: 'high' | 'medium' | 'low';
}

export interface KeywordOpportunity {
  keyword: string;
  search_volume: number;
  competition: 'low' | 'medium' | 'high';
  current_position: number;
  potential_traffic: number;
  recommended_variants: string[];
}

export interface ActionableAlert {
  id: string;
  type: 'low_ctr' | 'high_exits' | 'no_usage' | 'indexing_issue' | 'performance_issue';
  tool_slug: string;
  tool_name: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  recommendation: string;
  created_at: string;
  resolved: boolean;
}

export interface DecisionOutput {
  tool_slug: string;
  tool_name: string;
  action: 'improve_seo' | 'improve_ux' | 'create_variants' | 'kill_merge' | 'keep_monitoring';
  reason: string;
  priority: 'high' | 'medium' | 'low';
  expected_impact: string;
  effort: 'low' | 'medium' | 'high';
  deadline?: string;
}

export interface GrowthAnalytics {
  period: '7d' | '30d' | '90d';
  metrics: {
    organic_traffic: number;
    organic_traffic_change: number;
    tool_usage: number;
    tool_usage_change: number;
    avg_position: number;
    avg_position_change: number;
    ctr: number;
    ctr_change: number;
  };
  top_performers: {
    tools: string[];
    variants: string[];
    keywords: string[];
  };
  areas_for_improvement: {
    tools: string[];
    variants: string[];
    keywords: string[];
  };
}
```

## API Response Types

```typescript
export interface AnalyticsAPIResponse {
  success: boolean;
  data: DashboardData;
  error?: string;
  timestamp: string;
}

export interface GA4APIResponse {
  success: boolean;
  data: GA4Data;
  error?: string;
  timestamp: string;
}

export interface GSCAPIResponse {
  success: boolean;
  data: GSCData;
  error?: string;
  timestamp: string;
}

export interface GrowthReport {
  report_id: string;
  generated_at: string;
  period: string;
  summary: {
    total_tools: number;
    total_variants: number;
    total_impressions: number;
    total_clicks: number;
    avg_position: number;
    avg_ctr: number;
    total_tool_uses: number;
  };
  insights: string[];
  recommendations: string[];
  action_items: ActionItem[];
}

export interface ActionItem {
  id: string;
  type: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  assigned_to?: string;
  due_date?: string;
  status: 'pending' | 'in_progress' | 'completed';
}
```
