"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, Users, Globe, Target, RefreshCw, Lightbulb, CheckCircle, AlertCircle } from "lucide-react";

interface WebsiteData {
  url: string;
  monthlyVisitors: string;
  niche: string;
  contentType: string;
  hasEmailList: string;
  currentRevenue: string;
  timeToMonetize: string;
}

const niches = [
  "Technology", "Finance", "Health", "Lifestyle", "Education",
  "Entertainment", "Business", "Travel", "Food", "Other"
];

const contentTypes = [
  "Blog", "News", "Reviews", "Tutorials", "Comparison",
  "How-to Guides", "Case Studies", "Podcasts", "Videos"
];

const monetizationMethods = [
  { name: "Google AdSense", icon: "📊", suitability: "high", description: "Display ads on your site" },
  { name: "Affiliate Marketing", icon: "🤝", suitability: "high", description: "Earn commissions on referrals" },
  { name: "Sponsored Content", icon: "✍️", suitability: "medium", description: "Brand partnerships" },
  { name: "Digital Products", icon: "📱", suitability: "high", description: "Sell courses, ebooks, templates" },
  { name: "Membership/Subscription", icon: "💎", suitability: "medium", description: "Premium content access" },
  { name: "Consulting/Services", icon: "💼", suitability: "medium", description: "Offer your expertise" },
  { name: "Newsletter", icon: "📧", suitability: "high", description: "Monetize email list" },
  { name: "Native Ads", icon: "📢", suitability: "medium", description: "In-content advertising" },
];

export default function WebsiteMonetizationAdvisor() {
  const [data, setData] = useState<WebsiteData>({
    url: "",
    monthlyVisitors: "1000-5000",
    niche: "Technology",
    contentType: "Blog",
    hasEmailList: "no",
    currentRevenue: "none",
    timeToMonetize: "asap"
  });

  const [recommendations, setRecommendations] = useState<{
    primary: typeof monetizationMethods[0][];
    secondary: typeof monetizationMethods[0][];
    tips: string[];
    estimatedRevenue: { min: number; max: number };
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const updateField = (field: keyof WebsiteData, value: string) => {
    setData({ ...data, [field]: value });
  };

  const analyzeMonetization = async () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const visitorRanges: Record<string, { min: number; max: number }> = {
        "0-1000": { min: 100, max: 500 },
        "1000-5000": { min: 500, max: 2000 },
        "5000-25000": { min: 2000, max: 10000 },
        "25000-100000": { min: 10000, max: 50000 },
        "100000+": { min: 50000, max: 200000 }
      };

      const baseRange = visitorRanges[data.monthlyVisitors] || { min: 100, max: 500 };
      const nicheMultipliers: Record<string, number> = {
        "Finance": 2.5, "Technology": 2.0, "Business": 1.8,
        "Health": 1.5, "Education": 1.3, "Lifestyle": 1.0,
        "Entertainment": 0.9, "Travel": 0.8, "Food": 0.7, "Other": 1.0
      };
      const multiplier = nicheMultipliers[data.niche] || 1;

      let primary: typeof monetizationMethods = [];
      let secondary: typeof monetizationMethods = [];
      const tips: string[] = [];

      // Determine recommendations based on visitor count
      if (["0-1000", "1000-5000"].includes(data.monthlyVisitors)) {
        primary = [monetizationMethods[3], monetizationMethods[1], monetizationMethods[6]];
        secondary = [monetizationMethods[7], monetizationMethods[4]];
        tips.push("Focus on building an email list first");
        tips.push("Create valuable digital products to sell");
        tips.push("Start affiliate marketing with relevant products");
      } else if (["5000-25000"].includes(data.monthlyVisitors)) {
        primary = [monetizationMethods[0], monetizationMethods[1], monetizationMethods[3]];
        secondary = [monetizationMethods[2], monetizationMethods[4]];
        tips.push("Apply for AdSense when you reach 5,000+ visitors");
        tips.push("Negotiate sponsored content deals");
        tips.push("Launch a membership program");
      } else {
        primary = [monetizationMethods[0], monetizationMethods[1], monetizationMethods[2]];
        secondary = [monetizationMethods[3], monetizationMethods[4], monetizationMethods[5]];
        tips.push("Consider premium ad networks (Mediavine, AdThrive)");
        tips.push("Offer consulting packages");
        tips.push("Create a course or coaching program");
      }

      if (data.hasEmailList === "yes") {
        tips.push("Segment your email list for better monetization");
        primary.unshift(monetizationMethods[6]);
      }

      if (data.niche === "Finance" || data.niche === "Technology") {
        tips.push("These niches have high CPM rates - optimize accordingly");
      }

      setRecommendations({
        primary,
        secondary,
        tips,
        estimatedRevenue: {
          min: Math.round(baseRange.min * multiplier * 0.5),
          max: Math.round(baseRange.max * multiplier * 2)
        }
      });

      setIsAnalyzing(false);
    }, 2000);
  };

  const resetForm = () => {
    setData({
      url: "",
      monthlyVisitors: "1000-5000",
      niche: "Technology",
      contentType: "Blog",
      hasEmailList: "no",
      currentRevenue: "none",
      timeToMonetize: "asap"
    });
    setRecommendations(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <DollarSign className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Website Monetization Advisor</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Get personalized strategies to monetize your website
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Website URL */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Website URL (Optional)
              </label>
              <input
                type="url"
                value={data.url}
                onChange={(e) => updateField("url", e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-green-500 focus:outline-none font-medium"
              />
            </div>

            {/* Visitors & Niche */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Monthly Visitors
                </label>
                <select
                  value={data.monthlyVisitors}
                  onChange={(e) => updateField("monthlyVisitors", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-green-500 focus:outline-none font-medium"
                >
                  <option value="0-1000">0 - 1,000</option>
                  <option value="1000-5000">1,000 - 5,000</option>
                  <option value="5000-25000">5,000 - 25,000</option>
                  <option value="25000-100000">25,000 - 100,000</option>
                  <option value="100000+">100,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Niche/Category
                </label>
                <select
                  value={data.niche}
                  onChange={(e) => updateField("niche", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-green-500 focus:outline-none font-medium"
                >
                  {niches.map((niche) => (
                    <option key={niche} value={niche}>{niche}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Content Type & Email List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Content Type
                </label>
                <select
                  value={data.contentType}
                  onChange={(e) => updateField("contentType", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-green-500 focus:outline-none font-medium"
                >
                  {contentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Email List Size
                </label>
                <select
                  value={data.hasEmailList}
                  onChange={(e) => updateField("hasEmailList", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-green-500 focus:outline-none font-medium"
                >
                  <option value="no">No email list yet</option>
                  <option value="small">1,000 - 5,000 subscribers</option>
                  <option value="medium">5,000 - 25,000 subscribers</option>
                  <option value="large">25,000+ subscribers</option>
                </select>
              </div>
            </div>

            {/* Current Revenue */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Current Monthly Revenue
              </label>
              <select
                value={data.currentRevenue}
                onChange={(e) => updateField("currentRevenue", e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-green-500 focus:outline-none font-medium"
              >
                <option value="none">Not monetized yet</option>
                <option value="0-100">₹0 - ₹1,000</option>
                <option value="100-500">₹1,000 - ₹5,000</option>
                <option value="500-2000">₹5,000 - ₹20,000</option>
                <option value="2000+">₹20,000+</option>
              </select>
            </div>

            {/* Analyze Button */}
            <div className="flex gap-4">
              <button
                onClick={analyzeMonetization}
                disabled={isAnalyzing}
                className="flex-1 h-14 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-100 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Lightbulb className="h-5 w-5" />
                    Get Monetization Strategy
                  </>
                )}
              </button>

              <button
                onClick={resetForm}
                className="px-6 h-14 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results */}
          {recommendations && (
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-t border-green-100">
              {/* Estimated Revenue */}
              <div className="text-center mb-6">
                <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">
                  Estimated Monthly Revenue Potential
                </p>
                <div className="text-4xl font-black text-slate-900">
                  ₹{recommendations.estimatedRevenue.min.toLocaleString()} - ₹{recommendations.estimatedRevenue.max.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Based on your {data.monthlyVisitors} monthly visitors in {data.niche} niche
                </p>
              </div>

              {/* Primary Recommendations */}
              <div className="mb-6">
                <h3 className="font-bold text-green-800 uppercase text-sm mb-3">
                  Primary Monetization Methods (Start Here)
                </h3>
                <div className="space-y-3">
                  {recommendations.primary.map((method, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-green-100">
                      <span className="text-2xl">{method.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-800">{method.name}</h4>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                            Best for your traffic
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">{method.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Recommendations */}
              <div className="mb-6">
                <h3 className="font-bold text-slate-600 uppercase text-sm mb-3">
                  Secondary Options (Scale Later)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {recommendations.secondary.map((method, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                      <span className="text-xl">{method.icon}</span>
                      <div>
                        <h4 className="font-bold text-slate-700 text-sm">{method.name}</h4>
                        <p className="text-xs text-slate-500">{method.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <h3 className="font-bold text-amber-800 text-sm mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Actionable Tips
                </h3>
                <ul className="space-y-2">
                  {recommendations.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-amber-700">
                      <CheckCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
            <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
            <h3 className="font-bold text-green-800 mb-2">High CPM Niches</h3>
            <p className="text-sm text-green-700">
              Finance and Technology typically earn 2-3x more than average niches.
            </p>
          </div>
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
            <Users className="h-8 w-8 text-emerald-600 mb-3" />
            <h3 className="font-bold text-emerald-800 mb-2">Build Your List</h3>
            <p className="text-sm text-emerald-700">
              Email lists provide 40x more revenue than social media followers.
            </p>
          </div>
          <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100">
            <Globe className="h-8 w-8 text-teal-600 mb-3" />
            <h3 className="font-bold text-teal-800 mb-2">Diversify</h3>
            <p className="text-sm text-teal-700">
              Multiple income streams reduce risk and increase overall revenue.
            </p>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-xs text-red-700">
              <strong>Note:</strong> These are estimates based on industry benchmarks. 
              Actual revenue depends on traffic quality, engagement, niche, and execution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
