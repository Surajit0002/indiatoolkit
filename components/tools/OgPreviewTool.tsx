"use client";

import { useState } from "react";
import { Share2, Link as LinkIcon, Eye, Globe } from "lucide-react";

export default function OgPreviewTool() {
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
    siteName: "",
    url: "",
  });

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold">Open Graph Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Title</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                placeholder="Page Title"
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
              <textarea
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                placeholder="Page Description"
                className="w-full h-24 p-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Image URL</label>
              <input
                type="text"
                value={data.image}
                onChange={(e) => setData({ ...data, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Site Name</label>
                <input
                  type="text"
                  value={data.siteName}
                  onChange={(e) => setData({ ...data, siteName: e.target.value })}
                  placeholder="My Website"
                  className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Page URL</label>
                <input
                  type="text"
                  value={data.url}
                  onChange={(e) => setData({ ...data, url: e.target.value })}
                  placeholder="https://example.com/page"
                  className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex items-center gap-2">
              <Share2 className="h-4 w-4 text-gray-400" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Facebook Preview</span>
            </div>
            <div className="bg-white">
              <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                {data.image ? (
                  <img src={data.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Globe className="h-12 w-12 text-gray-200" />
                )}
              </div>
              <div className="p-4 bg-gray-100/50 space-y-1">
                <div className="text-[10px] text-gray-500 uppercase font-medium">{data.siteName || "YOUR SITE"}</div>
                <div className="font-bold text-lg leading-tight line-clamp-2">{data.title || "Your Page Title"}</div>
                <div className="text-sm text-gray-600 line-clamp-1">{data.description || "Your page description will appear here..."}</div>
              </div>
            </div>
          </div>

          <div className="bg-[#1DA1F2]/5 rounded-3xl border border-[#1DA1F2]/10 overflow-hidden">
            <div className="p-4 border-b border-[#1DA1F2]/10 flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#1DA1F2]" />
              <span className="text-xs font-bold text-[#1DA1F2] uppercase tracking-widest">Twitter/X Card</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="rounded-2xl overflow-hidden border border-gray-200 aspect-video bg-white">
                {data.image && <img src={data.image} alt="Twitter" className="w-full h-full object-cover" />}
              </div>
              <div className="space-y-1 px-1">
                <div className="text-sm text-gray-500">{data.url || "example.com"}</div>
                <div className="font-bold">{data.title || "Page Title"}</div>
                <div className="text-sm text-gray-600 line-clamp-2">{data.description || "Description..."}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
