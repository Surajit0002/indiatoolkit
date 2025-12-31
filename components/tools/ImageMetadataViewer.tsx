"use client";

import { useState } from "react";
import { Info, Upload, Image as ImageIcon, FileText } from "lucide-react";

interface ImageMetadata {
  name: string;
  size: string;
  type: string;
  width: number;
  height: number;
  lastModified: string;
}

export default function ImageMetadataViewer() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreview(url);

      const img = new Image();
      img.src = url;
      img.onload = () => {
        setMetadata({
          name: file.name,
          size: formatSize(file.size),
          type: file.type,
          width: img.width,
          height: img.height,
          lastModified: new Date(file.lastModified).toLocaleString(),
        });
      };
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div 
              className="border-2 border-dashed border-gray-200 rounded-2xl h-80 flex flex-col items-center justify-center relative overflow-hidden bg-gray-50"
              onDragOver={(e) => e.preventDefault()}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-contain" />
              ) : (
                <>
                  <Upload className="h-10 w-10 text-gray-300 mb-2" />
                  <p className="text-sm text-gray-400 font-bold uppercase">Upload Image to View Info</p>
                </>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Info className="h-5 w-5" />
              </div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight">Image Metadata</h3>
            </div>

            {metadata ? (
              <div className="space-y-4">
                {[
                  { label: "File Name", value: metadata.name, icon: FileText },
                  { label: "File Size", value: metadata.size, icon: ImageIcon },
                  { label: "File Type", value: metadata.type, icon: ImageIcon },
                  { label: "Dimensions", value: `${metadata.width} x ${metadata.height} px`, icon: ImageIcon },
                  { label: "Aspect Ratio", value: (metadata.width / metadata.height).toFixed(2), icon: ImageIcon },
                  { label: "Last Modified", value: metadata.lastModified, icon: Info },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                      <p className="text-sm font-black text-gray-900 truncate max-w-[200px]">{item.value}</p>
                    </div>
                    <item.icon className="h-5 w-5 text-gray-200" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                <ImageIcon className="h-16 w-16 text-gray-300" />
                <p className="text-sm font-bold uppercase text-gray-400">No Image Selected</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
