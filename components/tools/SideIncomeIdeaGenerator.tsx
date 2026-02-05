"use client";

import { useState } from "react";
import { Lightbulb, DollarSign, Clock, TrendingUp, RefreshCw, Copy, CheckCircle, Sparkles } from "lucide-react";

interface UserProfile {
  skills: string[];
  interests: string[];
  timeAvailable: string;
  startingBudget: string;
  experience: string;
}

const skillOptions = [
  "Writing", "Programming", "Design", "Marketing", "Teaching",
  "Photography", "Video Editing", "Music", "Languages", "Finance",
  "Fitness", "Cooking", "Crafts", "Consulting"
];

const interestOptions = [
  "Technology", "Fashion", "Food", "Travel", "Gaming",
  "Education", "Health", "Business", "Entertainment", "Sports"
];

const ideaCategories = [
  { name: "Freelancing", icon: "💻", examples: ["Web Development", "Content Writing", "Graphic Design", "Social Media Management"] },
  { name: "Online Teaching", icon: "📚", examples: ["Online Courses", "Tutoring", "Language Teaching", "Skill Workshops"] },
  { name: "E-commerce", icon: "🛒", examples: ["Dropshipping", "Print on Demand", "Handmade Products", "Reselling"] },
  { name: "Content Creation", icon: "🎬", examples: ["YouTube", "Podcasting", "Blogging", "Instagram/TikTok"] },
  { name: "Passive Income", icon: "📈", examples: ["Dividend Stocks", "REITs", "Peer-to-Peer Lending", "Royalties"] },
  { name: "Services", icon: "🔧", examples: ["Virtual Assistant", "Bookkeeping", "Translation", "Transcription"] },
];

export default function SideIncomeIdeaGenerator() {
  const [profile, setProfile] = useState<UserProfile>({
    skills: [],
    interests: [],
    timeAvailable: "5-10",
    startingBudget: "0-5000",
    experience: "beginner"
  });

  const [ideas, setIdeas] = useState<{
    category: string;
    icon: string;
    ideas: string[];
    potential: string;
    timeline: string;
  }[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggleSkill = (skill: string) => {
    if (profile.skills.includes(skill)) {
      setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) });
    } else {
      setProfile({ ...profile, skills: [...profile.skills, skill] });
    }
  };

  const toggleInterest = (interest: string) => {
    if (profile.interests.includes(interest)) {
      setProfile({ ...profile, interests: profile.interests.filter(i => i !== interest) });
    } else {
      setProfile({ ...profile, interests: [...profile.interests, interest] });
    }
  };

  const generateIdeas = async () => {
    setIsGenerating(true);

    setTimeout(() => {
      const generatedIdeas = ideaCategories.map(category => {
        // Generate ideas based on selected skills and interests
        const matchingSkills = profile.skills.filter(skill =>
          category.examples.some(example => 
            example.toLowerCase().includes(skill.toLowerCase())
          )
        );

        const specificIdeas = category.name === "Freelancing" && profile.skills.includes("Writing") ? [
          "Technical Writing for Tech Companies",
          "Copywriting for Landing Pages",
          "Ghostwriting for LinkedIn Posts",
          "SEO Blog Writing Services"
        ] : category.name === "Freelancing" && profile.skills.includes("Programming") ? [
          "WordPress Plugin Development",
          "Mobile App Development",
          "API Integration Services",
          "Website Maintenance Packages"
        ] : category.name === "Online Teaching" && profile.skills.includes("Teaching") ? [
          `Create a course on ${profile.interests[0] || "your expertise"}`,
          "One-on-one tutoring sessions",
          "Live workshop series",
          "Membership site with exclusive content"
        ] : category.name === "E-commerce" ? [
          "Start a niche dropshipping store",
          "Sell print-on-demand products",
          "Source and resell vintage items",
          "Create handmade products on Etsy"
        ] : category.name === "Content Creation" ? [
          "Start a niche YouTube channel",
          "Create a podcast in your interest area",
          "Monetize a blog with affiliate links",
          "Grow Instagram/TikTok for brand deals"
        ] : category.name === "Passive Income" ? [
          "Invest in dividend-paying stocks",
          "Create an online course (one-time effort)",
          "Write an ebook and sell on Amazon",
          "License your photos to stock sites"
        ] : [
          "Offer virtual assistant services",
          "Start a consulting practice",
          "Provide transcription services",
          "Become a social media manager"
        ];

        return {
          category: category.name,
          icon: category.icon,
          ideas: specificIdeas.slice(0, 4),
          potential: profile.experience === "expert" ? "₹50,000-2,00,000/month" :
                    profile.experience === "intermediate" ? "₹20,000-80,000/month" :
                    "₹5,000-30,000/month",
          timeline: category.name === "Passive Income" ? "6-12 months" :
                   category.name === "Content Creation" ? "3-6 months" :
                   "1-3 months"
        };
      });

      // Sort by relevance
      setIdeas(generatedIdeas);
      setIsGenerating(false);
    }, 2000);
  };

  const copyIdea = (index: number, idea: string) => {
    navigator.clipboard.writeText(idea);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const resetForm = () => {
    setProfile({
      skills: [],
      interests: [],
      timeAvailable: "5-10",
      startingBudget: "0-5000",
      experience: "beginner"
    });
    setIdeas([]);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Side Income Idea Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Discover profitable side hustles based on your skills and interests
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Skills */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Your Skills (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      profile.skills.includes(skill)
                        ? "bg-amber-500 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Your Interests (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      profile.interests.includes(interest)
                        ? "bg-orange-500 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Weekly Time Available
                </label>
                <select
                  value={profile.timeAvailable}
                  onChange={(e) => setProfile({ ...profile, timeAvailable: e.target.value })}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium"
                >
                  <option value="1-5">1-5 hours</option>
                  <option value="5-10">5-10 hours</option>
                  <option value="10-20">10-20 hours</option>
                  <option value="20+">20+ hours</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Starting Budget
                </label>
                <select
                  value={profile.startingBudget}
                  onChange={(e) => setProfile({ ...profile, startingBudget: e.target.value })}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium"
                >
                  <option value="0-5000">₹0 - ₹5,000</option>
                  <option value="5000-20000">₹5,000 - ₹20,000</option>
                  <option value="20000-50000">₹20,000 - ₹50,000</option>
                  <option value="50000+">₹50,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Experience Level
                </label>
                <select
                  value={profile.experience}
                  onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={generateIdeas}
                disabled={isGenerating}
                className="flex-1 h-14 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-100 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Generating Ideas...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Side Income Ideas
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
          {ideas.length > 0 && (
            <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-t border-amber-100">
              <div className="mb-6 p-4 bg-white rounded-2xl border border-amber-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Based on your profile</p>
                    <p className="text-sm text-slate-600">
                      {profile.skills.length} skills • {profile.interests.length} interests • {profile.experience} level
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Best for you</p>
                    <p className="text-sm font-bold text-slate-800">
                      {profile.startingBudget === "0-5000" ? "Low-investment ideas" : "Higher-ticket opportunities"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {ideas.map((category, index) => (
                  <div key={index} className="bg-white rounded-2xl p-5 border border-amber-100">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{category.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800">{category.category}</h3>
                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {category.potential}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {category.timeline}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {category.ideas.map((idea, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-amber-50 transition-colors group"
                        >
                          <span className="text-sm font-medium text-slate-700">{idea}</span>
                          <button
                            onClick={() => copyIdea(index * 10 + i, idea)}
                            className="p-1.5 rounded-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                          >
                            {copiedIndex === index * 10 + i ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4 text-slate-400" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
            <TrendingUp className="h-8 w-8 text-amber-600 mb-3" />
            <h3 className="font-bold text-amber-800 mb-2">Start Small</h3>
            <p className="text-sm text-amber-700">
              Begin with one idea and scale up as you gain experience and confidence.
            </p>
          </div>
          <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
            <Clock className="h-8 w-8 text-orange-600 mb-3" />
            <h3 className="font-bold text-orange-800 mb-2">Be Consistent</h3>
            <p className="text-sm text-orange-700">
              Dedicate consistent time each week to build your side income stream.
            </p>
          </div>
          <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
            <DollarSign className="h-8 w-8 text-red-600 mb-3" />
            <h3 className="font-bold text-red-800 mb-2">Reinvest Profits</h3>
            <p className="text-sm text-red-700">
              Reinvest early earnings to grow your side hustle faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
