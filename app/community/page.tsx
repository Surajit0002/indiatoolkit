'use client';
import React from 'react';
import { Users, MessageCircle, Calendar, Heart, Check, ThumbsUp, Award as AwardIcon, Trophy as TrophyIcon, Sparkles, Wrench, Lightbulb, Search, Eye } from 'lucide-react';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = React.useState('discussions');
  const [searchTerm, setSearchTerm] = React.useState('');

  const discussions = [
    { id: 1, title: 'Welcome to the Community!', author: 'Admin', replies: 42, views: 1200, category: 'Announcements', timestamp: '2 hours ago', upvotes: 24 },
    { id: 2, title: 'Share your favorite tool', author: 'JohnDoe', replies: 18, views: 340, category: 'General', timestamp: '5 hours ago', upvotes: 12 },
    { id: 3, title: 'Bug report: JSON Formatter issue', author: 'JaneSmith', replies: 7, views: 89, category: 'Issues', timestamp: '1 day ago', upvotes: 5 },
    { id: 4, title: 'Feature request: Dark mode', author: 'DevUser', replies: 31, views: 210, category: 'Suggestions', timestamp: '1 day ago', upvotes: 18 },
    { id: 5, title: 'Tutorial: How to use the API', author: 'TechGuru', replies: 12, views: 450, category: 'Tutorials', timestamp: '2 days ago', upvotes: 15 },
    { id: 6, title: 'Success story: Built with Omnitools', author: 'StartupFounder', replies: 25, views: 560, category: 'Showcase', timestamp: '3 days ago', upvotes: 32 },
  ];

  const leaderboard = [
    { rank: 1, name: 'TopContributor', points: 1250, avatar: 'TC', role: 'Expert' },
    { rank: 2, name: 'CodeMaster', points: 980, avatar: 'CM', role: 'Pro' },
    { rank: 3, name: 'ToolExplorer', points: 750, avatar: 'TE', role: 'Pro' },
    { rank: 4, name: 'HelpfulUser', points: 620, avatar: 'HU', role: 'Member' },
    { rank: 5, name: 'Newbie', points: 450, avatar: 'NB', role: 'Member' },
    { rank: 6, name: 'TechEnthusiast', points: 380, avatar: 'TE', role: 'Member' },
  ];

  const events = [
    { id: 1, title: 'Weekly Community Meetup', date: 'Tomorrow', time: '6:00 PM', attendees: 45, type: 'Virtual' },
    { id: 2, title: 'Tool Building Workshop', date: 'Feb 15', time: '10:00 AM', attendees: 32, type: 'Hybrid' },
    { id: 3, title: 'API Deep Dive Session', date: 'Feb 18', time: '2:00 PM', attendees: 28, type: 'Virtual' },
    { id: 4, title: 'Annual Community Conference', date: 'Mar 5', time: '9:00 AM', attendees: 120, type: 'In-Person' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-8">
            <Users className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Community Hub
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Connect with fellow users, share ideas, and collaborate on projects
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'discussions', label: 'Discussions', icon: MessageCircle },
            { id: 'leaderboard', label: 'Leaderboard', icon: TrophyIcon },
            { id: 'events', label: 'Events', icon: Calendar },
            { id: 'achievements', label: 'Achievements', icon: AwardIcon },
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' 
                    : 'bg-white text-slate-600 hover:bg-blue-50 border border-slate-200'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search community..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'discussions' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Recent Discussions</h2>
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                            {discussion.category}
                          </span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500">{discussion.timestamp}</span>
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">{discussion.title}</h3>
                        <p className="text-slate-600 text-sm mb-3">by {discussion.author}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {discussion.replies} replies
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {discussion.views} views
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {discussion.upvotes} upvotes
                          </span>
                        </div>
                      </div>
                      <button className="ml-4 p-2 text-slate-400 hover:text-blue-600 transition-colors">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                <h3 className="text-xl font-black text-slate-900 mb-4">Start a Discussion</h3>
                <textarea 
                  placeholder="What would you like to discuss?"
                  className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={4}
                ></textarea>
                <button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all">
                  Post Discussion
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-xl font-black text-slate-900 mb-4">Community Guidelines</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Be respectful and constructive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Stay on topic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>No spam or self-promotion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Help others when possible</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-6">Community Leaderboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leaderboard.map((user) => (
                <div key={user.rank} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-black ${
                      user.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                      user.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-500' :
                      user.rank === 3 ? 'bg-gradient-to-r from-amber-600 to-amber-800' :
                      'bg-gradient-to-r from-blue-500 to-indigo-500'
                    }`}>
                      {user.rank}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-slate-900">{user.name}</h3>
                      <p className="text-sm text-slate-500">{user.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900">{user.points}</div>
                      <div className="text-xs text-slate-500">points</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-6">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      event.type === 'Virtual' ? 'bg-blue-100 text-blue-800' :
                      event.type === 'Hybrid' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {event.type}
                    </span>
                    <div className="text-right">
                      <div className="font-black text-slate-900">{event.date}</div>
                      <div className="text-sm text-slate-500">{event.time}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{event.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm font-bold hover:shadow-md transition-all">
                      Join Event
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-6">Your Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'First Post', description: 'Made your first discussion post', earned: true, icon: MessageCircle },
                { name: 'Helpful Member', description: 'Received 10 upvotes on a post', earned: true, icon: ThumbsUp },
                { name: 'Community Veteran', description: 'Active for 6 months', earned: false, icon: AwardIcon },
                { name: 'Top Contributor', description: 'Reached top 10 on leaderboard', earned: false, icon: TrophyIcon },
                { name: 'Event Attendee', description: 'Attended 5 community events', earned: true, icon: Calendar },
                { name: 'Tool Explorer', description: 'Tried 50 different tools', earned: false, icon: Sparkles },
                { name: 'Problem Solver', description: 'Helped solve 25 issues', earned: true, icon: Wrench },
                { name: 'Knowledge Sharer', description: 'Created 10 tutorials', earned: false, icon: Lightbulb },
              ].map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div 
                    key={index} 
                    className={`rounded-2xl p-6 border ${
                      achievement.earned 
                        ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200' 
                        : 'bg-white border-slate-100'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                      achievement.earned 
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' 
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-black text-slate-900 mb-1">{achievement.name}</h3>
                    <p className="text-sm text-slate-600">{achievement.description}</p>
                    {achievement.earned && (
                      <div className="mt-3 text-xs font-bold text-yellow-700">Earned!</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}