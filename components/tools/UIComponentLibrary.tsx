"use client";

import { useState } from "react";
import { Copy, Check, MousePointer, Square, Circle, FormInput, Menu } from "lucide-react";

type ComponentType = 'button' | 'card' | 'input' | 'nav' | 'modal' | 'badge' | 'avatar' | 'alert';

const componentTemplates: Record<ComponentType, { name: string; code: string; css: string }> = {
  button: {
    name: 'Button',
    code: `<button class="btn btn-primary">
  <span>Click me</span>
</button>`,
    css: `.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-primary:active {
  transform: scale(0.98);
}`,
  },
  card: {
    name: 'Card',
    code: `<div class="card">
  <div class="card-image">
    <img src="https://via.placeholder.com/400x200" alt="Card image" />
  </div>
  <div class="card-body">
    <h3 class="card-title">Card Title</h3>
    <p class="card-text">This is a card description text.</p>
    <button class="btn btn-primary">Learn More</button>
  </div>
</div>`,
    css: `.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 400px;
}

.card-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 24px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.card-text {
  color: #6b7280;
  margin-bottom: 16px;
}`,
  },
  input: {
    name: 'Form Input',
    code: `<div class="form-group">
  <label class="form-label">Email Address</label>
  <input type="email" class="form-input" placeholder="you@example.com" />
  <span class="form-hint">We'll never share your email</span>
</div>`,
    css: `.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 400px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.form-input {
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-hint {
  font-size: 12px;
  color: #9ca3af;
}`,
  },
  nav: {
    name: 'Navigation',
    code: `<nav class="navbar">
  <div class="nav-brand">MyApp</div>
  <ul class="nav-links">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>`,
    css: `.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-brand {
  font-size: 20px;
  font-weight: 700;
}

.nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
}

.nav-links a:hover {
  color: #3b82f6;
}`,
  },
  modal: {
    name: 'Modal',
    code: `<div class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <h3>Modal Title</h3>
      <button class="modal-close">&times;</button>
    </div>
    <div class="modal-body">
      <p>This is the modal content area.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </div>
  </div>
</div>`,
    css: `.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
}`,
  },
  badge: {
    name: 'Badge',
    code: `<div class="badge-container">
  <span class="badge badge-primary">Primary</span>
  <span class="badge badge-success">Success</span>
  <span class="badge badge-warning">Warning</span>
  <span class="badge badge-danger">Danger</span>
</div>`,
    css: `.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 9999px;
}

.badge-primary {
  background: #dbeafe;
  color: #1d4ed8;
}

.badge-success {
  background: #dcfce7;
  color: #15803d;
}

.badge-warning {
  background: #fef3c7;
  color: #b45309;
}

.badge-danger {
  background: #fee2e2;
  color: #dc2626;
}`,
  },
  avatar: {
    name: 'Avatar',
    code: `<div class="avatar-container">
  <img src="https://via.placeholder.com/40" alt="User" class="avatar" />
  <img src="https://via.placeholder.com/48" alt="User" class="avatar avatar-lg" />
  <img src="https://via.placeholder.com/56" alt="User" class="avatar avatar-xl" />
</div>`,
    css: `.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-lg {
  width: 48px;
  height: 48px;
}

.avatar-xl {
  width: 56px;
  height: 56px;
}

.avatar-container {
  display: flex;
  gap: 12px;
  align-items: center;
}`,
  },
  alert: {
    name: 'Alert',
    code: `<div class="alert alert-info">
  <span class="alert-icon">ℹ️</span>
  <p>This is an informational alert message.</p>
</div>
<div class="alert alert-success">
  <span class="alert-icon">✅</span>
  <p>This is a success alert message.</p>
</div>`,
    css: `.alert {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.alert-info {
  background: #dbeafe;
  border: 1px solid #93c5fd;
}

.alert-success {
  background: #dcfce7;
  border: 1px solid #86efac;
}

.alert p {
  margin: 0;
  font-size: 14px;
}`,
  },
};

export default function UIComponentLibrary() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>('button');
  const [copied, setCopied] = useState<string | null>(null);

  const component = componentTemplates[selectedComponent];

  const componentIcons: Record<ComponentType, typeof MousePointer> = {
    button: MousePointer,
    card: Square,
    input: FormInput,
    nav: Menu,
    modal: Square,
    badge: Circle,
    avatar: Circle,
    alert: Circle,
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-violet-200">
                <Square className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">UI Component Library</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Ready-to-Use Components</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Components</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(componentTemplates) as ComponentType[]).map((type) => {
                  const Icon = componentIcons[type];
                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedComponent(type)}
                      className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                        selectedComponent === type 
                          ? 'bg-violet-50 border-violet-300 text-violet-600' 
                          : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-violet-200'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-bold capitalize">{type}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-100 rounded-[24px] p-6 border border-slate-300">
                <div className="bg-white rounded-lg p-8 shadow">
                  {selectedComponent === 'button' && (
                    <div className="space-y-4">
                      <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
                        Primary Button
                      </button>
                    </div>
                  )}
                  {selectedComponent === 'card' && (
                    <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500" />
                      <div className="p-4">
                        <h3 className="font-bold text-lg">Card Title</h3>
                        <p className="text-sm text-gray-600 mt-1">Card description text</p>
                      </div>
                    </div>
                  )}
                  {selectedComponent === 'input' && (
                    <div className="space-y-2 max-w-sm">
                      <label className="block text-sm font-medium">Email</label>
                      <input type="email" placeholder="you@example.com" className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                  )}
                  {selectedComponent === 'nav' && (
                    <div className="flex items-center justify-between px-4 py-3 bg-white shadow rounded-lg">
                      <span className="font-bold">MyApp</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-gray-600">Home</span>
                        <span className="text-gray-600">About</span>
                        <span className="text-gray-600">Contact</span>
                      </div>
                    </div>
                  )}
                  {selectedComponent === 'badge' && (
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">Primary</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Success</span>
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">Warning</span>
                    </div>
                  )}
                  {selectedComponent === 'avatar' && (
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500" />
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
                    </div>
                  )}
                  {selectedComponent === 'alert' && (
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">Info alert message</div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">Success alert message</div>
                    </div>
                  )}
                  {selectedComponent === 'modal' && (
                    <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold">Modal Title</h3>
                        <button className="text-gray-400 hover:text-gray-600">×</button>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Modal content area</p>
                      <div className="flex justify-end gap-2">
                        <button className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded">Cancel</button>
                        <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded">Confirm</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-violet-600 uppercase tracking-wider">HTML</span>
                    <button
                      onClick={() => handleCopy(component.code, 'html')}
                      className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-violet-50"
                    >
                      {copied === 'html' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                  <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-40 text-xs">
                    <code className="text-violet-400 font-mono">{component.code}</code>
                  </pre>
                </div>

                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-violet-600 uppercase tracking-wider">CSS</span>
                    <button
                      onClick={() => handleCopy(component.css, 'css')}
                      className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-violet-50"
                    >
                      {copied === 'css' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                  <pre className="bg-slate-900 rounded-[16px] p-4 overflow-x-auto max-h-40 text-xs">
                    <code className="text-violet-400 font-mono">{component.css.slice(0, 500)}...</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
