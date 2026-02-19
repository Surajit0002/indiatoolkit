"use client";

import { useState, useRef } from "react";
import { Upload, Download, Music, FileAudio, Loader2, AlertCircle, Check, X, Play, Pause, FileVideo } from "lucide-react";

interface AudioQuality {
  label: string;
  bitrate: string;
}

const audioQualities: AudioQuality[] = [
  { label: "320 kbps (Best)", bitrate: "320" },
  { label: "256 kbps (High)", bitrate: "256" },
  { label: "192 kbps (Good)", bitrate: "192" },
  { label: "128 kbps (Standard)", bitrate: "128" },
];

export default function VideoToMp3Converter() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<AudioQuality>(audioQualities[0]);
  const [isConverting, setIsConverting] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov', 'video/wmv', 'video/flv'];
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError(null);
        setIsConverted(false);
        setProgress(0);
      } else {
        setError("Please select a valid video file (MP4, WebM, OGG, AVI, MOV, WMV, FLV)");
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      setFile(droppedFile);
      setError(null);
      setIsConverted(false);
      setProgress(0);
    } else {
      setError("Please drop a valid video file");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const convertToMp3 = async () => {
    if (!file) return;
    
    setIsConverting(true);
    setProgress(0);
    
    // Simulate conversion progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
    
    // Simulate conversion time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    clearInterval(interval);
    setProgress(100);
    setIsConverting(false);
    setIsConverted(true);
    setAudioDuration(Math.floor(Math.random() * 300) + 60); // Random duration 1-6 minutes
  };

  const handleDownload = () => {
    // In production, this would download the actual converted file
    alert("In production, this would download the converted MP3 file!");
  };

  const handleRemoveFile = () => {
    setFile(null);
    setIsConverted(false);
    setProgress(0);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const estimateFileSize = (): string => {
    if (!file || !audioDuration) return "0 MB";
    const sizeMB = (parseInt(selectedQuality.bitrate) * audioDuration) / 8 / 1024;
    return sizeMB.toFixed(1) + " MB";
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Music className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Video to MP3 Converter</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">Convert any video to high-quality MP3 audio</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 space-y-6">
          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              file ? "border-emerald-400 bg-emerald-50" : "border-slate-300 hover:border-purple-400 hover:bg-purple-50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {file ? (
              <div className="flex items-center justify-center gap-4">
                <div className="h-16 w-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <FileVideo className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-800">{file.name}</p>
                  <p className="text-sm text-slate-500">{formatFileSize(file.size)}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                  className="p-2 hover:bg-slate-200 rounded-xl transition-all"
                >
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Drop your video here</p>
                  <p className="text-sm text-slate-500">or click to browse</p>
                </div>
                <p className="text-xs text-slate-400">Supported: MP4, WebM, OGG, AVI, MOV, WMV, FLV</p>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 rounded-xl text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Quality Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Select Audio Quality</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {audioQualities.map((quality) => (
                <button
                  key={quality.bitrate}
                  onClick={() => setSelectedQuality(quality)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedQuality.bitrate === quality.bitrate
                      ? "border-purple-500 bg-purple-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="text-center">
                    <Music className={`h-6 w-6 mx-auto mb-2 ${
                      selectedQuality.bitrate === quality.bitrate
                        ? "text-purple-600"
                        : "text-slate-400"
                    }`} />
                    <span className="block font-bold text-slate-800 text-sm">{quality.bitrate} kbps</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Convert Button */}
          <button
            onClick={convertToMp3}
            disabled={!file || isConverting}
            className="w-full h-14 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConverting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Converting... {Math.round(progress)}%
              </>
            ) : (
              <>
                <Music className="h-5 w-5" />
                Convert to MP3
              </>
            )}
          </button>

          {/* Progress Bar */}
          {isConverting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Converting...</span>
                <span className="font-bold text-purple-600">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Success/Result */}
          {isConverted && (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-800">Conversion Complete!</h4>
                    <p className="text-sm text-emerald-600">Your MP3 is ready</p>
                  </div>
                </div>
              </div>

              {/* Audio Preview Placeholder */}
              <div className="p-4 bg-white rounded-xl">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-all"
                  >
                    {isPlaying ? <Pause className="h-5 w-5 text-purple-600" /> : <Play className="h-5 w-5 text-purple-600 ml-1" />}
                  </button>
                  <div className="flex-1">
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-purple-500" />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-slate-500">
                      <span>0:00</span>
                      <span>{formatDuration(audioDuration)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                <div className="flex items-center gap-3">
                  <FileAudio className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="font-bold text-slate-800">{file?.name.replace(/\.[^/.]+$/, "")}.mp3</p>
                    <p className="text-sm text-slate-500">{estimateFileSize()} • {selectedQuality.bitrate} kbps</p>
                  </div>
                </div>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl font-medium text-sm hover:bg-purple-700 transition-all"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center"><Music className="h-5 w-5 text-purple-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">High Quality</h4><p className="text-xs text-slate-500">Up to 320 kbps</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-indigo-100 rounded-xl flex items-center justify-center"><FileVideo className="h-5 w-5 text-indigo-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">Many Formats</h4><p className="text-xs text-slate-500">MP4, AVI, MOV, WMV</p></div></div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3"><div className="h-10 w-10 bg-pink-100 rounded-xl flex items-center justify-center"><Download className="h-5 w-5 text-pink-600" /></div><div><h4 className="font-bold text-slate-800 text-sm">Fast & Free</h4><p className="text-xs text-slate-500">No registration needed</p></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
