import React, { useState, useEffect } from 'react';
import { AdvancedTool, getPopularTools } from '../data/advancedTools';
import * as Icons from 'lucide-react';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  Brain, 
  BarChart3, 
  Calendar,
  Filter,
  Search,
  Download,
  Share2,
  Star
} from 'lucide-react';

interface AnalyticsData {
  totalTools: number;
  activeUsers: number;
  totalUsage: number;
  aiToolsCount: number;
  realTimeToolsCount: number;
  topTools: AdvancedTool[];
  usageTrends: {
    date: string;
    usage: number;
  }[];
  categoryDistribution: {
    category: string;
    count: number;
    percentage: number;
  }[];
}

export default function AdvancedAnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = () => {
      setIsLoading(true);
      
      // Simulate API call with mock data
      setTimeout(() => {
        const tools = getPopularTools(50);
        
        const mockAnalytics: AnalyticsData = {
          totalTools: tools.length,
          activeUsers: 15420,
          totalUsage: 287430,
          aiToolsCount: tools.filter(t => t.aiPowered).length,
          realTimeToolsCount: tools.filter(t => t.realTime).length,
          topTools: tools.slice(0, 5),
          usageTrends: [
            { date: '2024-01-01', usage: 1200 },
            { date: '2024-01-02', usage: 1350 },
            { date: '2024-01-03', usage: 1100 },
            { date: '2024-01-04', usage: 1600 },
            { date: '2024-01-05', usage: 1450 },
            { date: '2024-01-06', usage: 1800 },
            { date: '2024-01-07', usage: 1650 }
          ],
          categoryDistribution: [
            { category: 'AI Tools', count: 8, percentage: 25 },
            { category: 'Data Tools', count: 6, percentage: 18.75 },
            { category: 'Development', count: 5, percentage: 15.625 },
            { category: 'Finance', count: 4, percentage: 12.5 },
            { category: 'Other', count: 9, percentage: 28.125 }
          ]
        };
        
        setAnalytics(mockAnalytics);
        setIsLoading(false);
      }, 1000);
    };

    loadAnalytics();
  }, [timeRange]);

  if (isLoading || !analytics) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color = 'blue',
    trend 
  }: { 
    title: string; 
    value: string | number; 
    icon: React.ComponentType<{ className?: string }>;
    color?: string;
    trend?: { value: number; isPositive: boolean };
  }) => {
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    };

    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            {trend && (
              <div className={`flex items-center gap-1 text-sm mt-2 ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
                <span className="text-slate-500">vs last period</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl ${colorClasses[color as keyof typeof colorClasses]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Advanced Analytics</h1>
              <p className="text-slate-600 mt-2">Comprehensive insights and performance metrics</p>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              
              <div className="flex gap-2">
                <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                  <Download className="h-5 w-5" />
                </button>
                <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Tools"
            value={analytics.totalTools}
            icon={BarChart3}
            color="blue"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active Users"
            value={analytics.activeUsers.toLocaleString()}
            icon={Users}
            color="green"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Total Usage"
            value={analytics.totalUsage.toLocaleString()}
            icon={TrendingUp}
            color="purple"
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="AI-Powered Tools"
            value={analytics.aiToolsCount}
            icon={Brain}
            color="orange"
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Usage Trends Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Usage Trends</h3>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                <span>Daily Usage</span>
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-2">
              {analytics.usageTrends.map((point, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-400"
                    style={{ 
                      height: `${(point.usage / Math.max(...analytics.usageTrends.map(p => p.usage))) * 100}%` 
                    }}
                  ></div>
                  <div className="text-xs text-slate-500 mt-2">
                    {new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Category Distribution</h3>
            
            <div className="space-y-4">
              {analytics.categoryDistribution.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-700">{category.category}</span>
                    <span className="text-sm text-slate-500">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Tools */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Top Performing Tools</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Tool Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Usage</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Accuracy</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Popularity</th>
                </tr>
              </thead>
              <tbody>
                {analytics.topTools.map((tool, index) => {
                  const IconComponent = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                  return (
                    <tr key={tool.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="h-10 w-10 rounded-lg flex items-center justify-center text-white"
                            style={{ backgroundColor: tool.color }}
                          >
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{tool.name}</div>
                            <div className="text-sm text-slate-600">{tool.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium">
                          {tool.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-slate-900">{tool.usageCount.toLocaleString()}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${tool.performance.accuracy}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-slate-700">{tool.performance.accuracy}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-slate-900">{tool.popularity}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-slate-900">Real-time Tools</h3>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">{analytics.realTimeToolsCount}</div>
            <p className="text-sm text-green-700">Currently active real-time processing tools</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-slate-900">AI Integration</h3>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Math.round((analytics.aiToolsCount / analytics.totalTools) * 100)}%
            </div>
            <p className="text-sm text-purple-700">Tools with AI-powered capabilities</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl border border-blue-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-slate-900">This Month</h3>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {Math.round(analytics.totalUsage * 1.15).toLocaleString()}
            </div>
            <p className="text-sm text-blue-700">Projected usage for current month</p>
          </div>
        </div>
      </div>
    </div>
  );
}