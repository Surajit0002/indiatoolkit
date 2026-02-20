"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, Download, Play, Pause, Copy, RefreshCw } from "lucide-react";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        // Prefer English voices
        const englishVoice = availableVoices.find(
          (voice) => voice.lang.startsWith("en")
        );
        setSelectedVoice(englishVoice?.voiceURI || availableVoices[0].voiceURI);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const speak = () => {
    if (!text.trim()) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = volume;
    utterance.rate = rate;
    utterance.pitch = pitch;

    const voice = voices.find((v) => v.voiceURI === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadAudio = async () => {
    if (!text.trim()) return;

    // Create audio context for recording
    const AudioContextClass = window.AudioContext || ("webkitAudioContext" in window ? (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext : null);
    if (!AudioContextClass) {
      alert("Audio download is not supported in this browser.");
      return;
    }
    
    // Note: Web Speech API doesn't provide direct audio output for recording
    // This is a placeholder - in production, you'd use a TTS API with audio support
    alert("Audio download requires a TTS API with audio support. For now, please use the speak function.");
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Volume2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Text to Speech</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Convert text to natural-sounding speech
          </p>
        </div>

        {/* Main Input */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Enter Your Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="w-full h-40 p-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none transition-all"
            />
          </div>

          {/* Controls */}
          <div className="px-6 pb-6 space-y-6">
            {/* Voice Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Voice
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none font-medium bg-white"
              >
                {voices.length === 0 ? (
                  <option>Loading voices...</option>
                ) : (
                  voices.map((voice) => (
                    <option key={voice.voiceURI} value={voice.voiceURI}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Speed: {rate}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Pitch: {pitch}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Volume: {Math.round(volume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={isPlaying ? stopSpeaking : speak}
                disabled={!text.trim()}
                className={`flex-1 min-w-37.5 h-14 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                  isPlaying
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-5 w-5" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    Speak
                  </>
                )}
              </button>

              <button
                onClick={copyText}
                disabled={!text.trim()}
                className="h-14 px-6 rounded-2xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all disabled:opacity-50"
              >
                <Copy className="h-5 w-5" />
                {isCopied ? "Copied!" : "Copy"}
              </button>

              <button
                onClick={downloadAudio}
                disabled={!text.trim()}
                className="h-14 px-6 rounded-2xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all disabled:opacity-50"
              >
                <Download className="h-5 w-5" />
                Download
              </button>

              <button
                onClick={() => setText("")}
                disabled={!text.trim()}
                className="h-14 px-6 rounded-2xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all disabled:opacity-50"
              >
                <RefreshCw className="h-5 w-5" />
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
          <h3 className="font-bold text-blue-800 mb-3 uppercase text-sm">Tips</h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Use shorter sentences for better pronunciation</li>
            <li>• Adjust pitch and speed for different effects</li>
            <li>• Some voices may not be available on all browsers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
