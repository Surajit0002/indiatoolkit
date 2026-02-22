import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  MessageCircle, 
  Send, 
  MoreHorizontal, 
  Copy, 
  Share2,
  UserPlus,
  Settings,
  Zap,
  Lock,
  Unlock
} from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  role: 'owner' | 'editor' | 'viewer';
  lastActive: Date;
  color: string;
}

interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'tool_update' | 'file_share';
}

interface SharedTool {
  id: string;
  name: string;
  category: string;
  config: Record<string, string | number | boolean>;
  owner: string;
  collaborators: string[];
  createdAt: Date;
  lastModified: Date;
  permissions: {
    canEdit: boolean;
    canShare: boolean;
    canExport: boolean;
  };
}

export default function RealTimeCollaboration() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [collaborators] = useState<Collaborator[]>(() => {
    const now = Date.now();
    return [
      {
        id: '1',
        name: 'You',
        avatar: 'YT',
        role: 'owner' as const,
        lastActive: new Date(),
        color: '#3B82F6'
      },
      {
        id: '2',
        name: 'Alex Chen',
        avatar: 'AC',
        role: 'editor' as const,
        lastActive: new Date(now - 300000),
        color: '#10B981'
      },
      {
        id: '3',
        name: 'Priya Sharma',
        avatar: 'PS',
        role: 'viewer' as const,
        lastActive: new Date(now - 1200000),
        color: '#F59E0B'
      }
    ];
  });
  const [sharedTools, setSharedTools] = useState<SharedTool[]>(() => {
    const now = Date.now();
    return [
      {
        id: '1',
        name: 'Advanced Calculator',
        category: 'Calculators',
        config: { precision: 10, theme: 'dark' },
        owner: 'You',
        collaborators: ['Alex Chen', 'Priya Sharma'],
        createdAt: new Date(now - 86400000),
        lastModified: new Date(),
        permissions: {
          canEdit: true,
          canShare: true,
          canExport: true
        }
      }
    ];
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        userId: '1',
        userName: 'You',
        content: newMessage,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };



  const updatePermissions = (toolId: string, permission: keyof SharedTool['permissions'], value: boolean) => {
    setSharedTools(sharedTools.map(tool => 
      tool.id === toolId 
        ? { ...tool, permissions: { ...tool.permissions, [permission]: value } }
        : tool
    ));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Collaboration Button */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex -space-x-2">
          {collaborators.slice(0, 3).map(collaborator => (
            <div 
              key={collaborator.id}
              className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-white shadow-lg"
              style={{ backgroundColor: collaborator.color }}
              title={`${collaborator.name} (${collaborator.role})`}
            >
              {collaborator.avatar}
            </div>
          ))}
          {collaborators.length > 3 && (
            <div className="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs border-2 border-white shadow-lg">
              +{collaborators.length - 3}
            </div>
          )}
        </div>
        
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="h-12 w-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center shadow-lg transition-all hover:scale-105"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
        
        <button
          onClick={() => setIsSharing(!isSharing)}
          className="h-12 w-12 bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center justify-center shadow-lg transition-all hover:scale-105"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* Chat Panel */}
      {isChatOpen && (
        <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl border border-slate-200 mb-4 flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              Team Chat
            </h3>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.userId === '1' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-3 py-2 rounded-xl ${
                  message.userId === '1' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-100 text-slate-800'
                }`}>
                  {message.userId !== '1' && (
                    <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                      {message.userName}
                    </div>
                  )}
                  <div className="text-sm">{message.content}</div>
                  <div className="text-[8px] opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-slate-50 rounded-lg text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="h-10 w-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sharing Panel */}
      {isSharing && (
        <div className="w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Share2 className="h-5 w-5 text-green-600" />
              Share Tool
            </h3>
            <button 
              onClick={() => setIsSharing(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          {/* Add Collaborators */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Add Collaborators
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="flex-1 px-3 py-2 bg-slate-50 rounded-lg text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs uppercase tracking-widest transition-colors">
                <UserPlus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Shared Tools */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              Shared Tools
            </h4>
            <div className="space-y-3">
              {sharedTools.map(tool => (
                <div key={tool.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-bold text-sm text-slate-900">{tool.name}</div>
                      <div className="text-xs text-slate-500">{tool.category}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase">Live</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex -space-x-1">
                      {tool.collaborators.slice(0, 3).map((name, index) => (
                        <div 
                          key={index}
                          className="h-6 w-6 rounded-full bg-slate-300 flex items-center justify-center text-[8px] font-bold text-slate-600 border border-white"
                        >
                          {name.substring(0, 2).toUpperCase()}
                        </div>
                      ))}
                    </div>
                    <span className="text-[9px] text-slate-500">
                      {tool.collaborators.length} collaborators
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => updatePermissions(tool.id, 'canEdit', !tool.permissions.canEdit)}
                      className={`flex items-center justify-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold uppercase transition-all ${
                        tool.permissions.canEdit 
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {tool.permissions.canEdit ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                      Edit
                    </button>
                    <button 
                      onClick={() => updatePermissions(tool.id, 'canShare', !tool.permissions.canShare)}
                      className={`flex items-center justify-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold uppercase transition-all ${
                        tool.permissions.canShare 
                          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      <Share2 className="h-3 w-3" />
                      Share
                    </button>
                    <button 
                      onClick={() => updatePermissions(tool.id, 'canExport', !tool.permissions.canExport)}
                      className={`flex items-center justify-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold uppercase transition-all ${
                        tool.permissions.canExport 
                          ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      <Copy className="h-3 w-3" />
                      Export
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
              <Settings className="h-4 w-4" />
              Manage
            </button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs uppercase tracking-widest transition-colors">
              <Zap className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}