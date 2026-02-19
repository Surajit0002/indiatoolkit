"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Bell, Hourglass, Settings2 } from "lucide-react";

export default function CountdownTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAlarm = () => {
    // Basic beep using Web Audio API if no audio file is provided
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 2);
    } catch (e) {
      console.error("Audio context failed", e);
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    if (timeLeft === 0) {
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      if (totalSeconds > 0) {
        setTimeLeft(totalSeconds);
        setIsRunning(true);
        setIsFinished(false);
      }
    } else {
      setIsRunning(true);
      setIsFinished(false);
    }
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setIsFinished(false);
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = timeLeft > 0 ? (timeLeft / (hours * 3600 + minutes * 60 + seconds)) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className={`glass-card p-12 flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors duration-500 ${isFinished ? 'bg-red-500/10' : ''}`}>
        {isRunning && (
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600/20">
                <div 
                    className="h-full bg-blue-600 transition-all duration-1000 ease-linear" 
                    style={{ width: `${progress}%` }}
                />
            </div>
        )}

        <div className={`mb-8 p-4 rounded-full transition-colors ${isFinished ? 'bg-red-500 text-red-100 animate-bounce' : 'bg-blue-600/10 text-blue-600'}`}>
          {isFinished ? <Bell className="h-12 w-12" /> : <Hourglass className="h-12 w-12" />}
        </div>

        {timeLeft === 0 && !isRunning ? (
          <div className="space-y-6 w-full max-w-xs">
            <div className="flex gap-4 items-center justify-center">
              <TimeInput label="HH" value={hours} onChange={setHours} max={99} />
              <span className="text-4xl font-black">:</span>
              <TimeInput label="MM" value={minutes} onChange={setMinutes} max={59} />
              <span className="text-4xl font-black">:</span>
              <TimeInput label="SS" value={seconds} onChange={setSeconds} max={59} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Set duration to begin</p>
          </div>
        ) : (
          <div className={`text-7xl md:text-9xl font-black tabular-nums tracking-tighter mb-8 ${isFinished ? 'text-red-600' : ''}`}>
            {formatTime(timeLeft)}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="brutal-btn min-w-[160px] flex items-center justify-center gap-2 bg-green-600"
            >
              <Play className="h-5 w-5" /> START
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="brutal-btn min-w-[160px] flex items-center justify-center gap-2 bg-orange-500"
            >
              <Pause className="h-5 w-5" /> PAUSE
            </button>
          )}

          <button
            onClick={handleReset}
            className="brutal-btn bg-red-500 flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-5 w-5" /> RESET
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PresetButton label="1 Min" seconds={60} onClick={() => { setHours(0); setMinutes(1); setSeconds(0); handleStart(); }} />
        <PresetButton label="5 Mins" seconds={300} onClick={() => { setHours(0); setMinutes(5); setSeconds(0); handleStart(); }} />
        <PresetButton label="10 Mins" seconds={600} onClick={() => { setHours(0); setMinutes(10); setSeconds(0); handleStart(); }} />
      </div>
    </div>
  );
}

function TimeInput({ label, value, onChange, max }: { label: string, value: number, onChange: (v: number) => void, max: number }) {
  return (
    <div className="flex flex-col items-center">
      <input
        type="number"
        min="0"
        max={max}
        value={value === 0 ? "" : value}
        onChange={(e) => onChange(Math.min(max, parseInt(e.target.value) || 0))}
        className="w-20 text-center text-4xl font-black bg-white/50 border-2 border-transparent focus:border-blue-600 rounded-[10px] p-2 outline-none"
        placeholder="00"
      />
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-2">{label}</span>
    </div>
  );
}

function PresetButton({ label, seconds, onClick }: { label: string, seconds: number, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="glass-card p-4 hover:bg-blue-600 hover:text-white transition-all text-sm font-black uppercase tracking-widest"
    >
      {label}
    </button>
  );
}
