"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Flag, Timer } from "lucide-react";

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Keep timeRef in sync
  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - timeRef.current;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  const handleStartPause = () => setIsRunning(!isRunning);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([time, ...laps]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="glass-card p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600/20">
            <div 
                className="h-full bg-blue-600 transition-all duration-1000" 
                style={{ width: isRunning ? '100%' : '0%' }}
            />
        </div>
        
        <div className="mb-8 p-4 bg-blue-600/10 text-blue-600 rounded-full animate-pulse">
          <Timer className="h-12 w-12" />
        </div>

        <div className="text-7xl md:text-9xl font-black tabular-nums tracking-tighter mb-8">
          {formatTime(time)}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleStartPause}
            className={`brutal-btn min-w-[160px] flex items-center justify-center gap-2 ${
              isRunning ? "bg-orange-500" : "bg-green-600"
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="h-5 w-5" /> PAUSE
              </>
            ) : (
              <>
                <Play className="h-5 w-5" /> START
              </>
            )}
          </button>

          <button
            onClick={handleLap}
            disabled={time === 0}
            className="brutal-btn bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Flag className="h-5 w-5" /> LAP
          </button>

          <button
            onClick={handleReset}
            className="brutal-btn bg-red-500 flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-5 w-5" /> RESET
          </button>
        </div>
      </div>

      {laps.length > 0 && (
        <div className="glass-card p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black uppercase tracking-widest text-gray-400">Lap Times</h3>
            <span className="px-3 py-1 bg-blue-600/10 text-blue-600 rounded-full text-xs font-black">
              {laps.length} LAPS
            </span>
          </div>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {laps.map((lapTime, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/50 rounded-[10px] border border-transparent hover:border-blue-600/20 transition-all"
              >
                <span className="font-black text-gray-400">LAP {laps.length - index}</span>
                <span className="font-black tabular-nums text-xl">{formatTime(lapTime)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
