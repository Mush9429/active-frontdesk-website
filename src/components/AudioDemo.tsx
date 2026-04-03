"use client";

import { useRef, useState } from "react";

interface AudioDemoProps {
  src?: string;
}

function WaveformPlaceholder() {
  const bars = [3, 5, 8, 6, 10, 7, 9, 4, 6, 8, 5, 3, 7, 9, 6, 4, 8, 10, 6, 5, 7, 4, 8, 6];
  return (
    <div className="flex items-center gap-[3px] h-10">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-1 rounded-full bg-[#E2E8F0]"
          style={{ height: `${h * 3}px` }}
        />
      ))}
    </div>
  );
}

export default function AudioDemo({ src }: AudioDemoProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(pct);
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const val = parseFloat(e.target.value);
    audioRef.current.currentTime = (val / 100) * audioRef.current.duration;
    setProgress(val);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 max-w-2xl mx-auto shadow-sm">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-[#3B82F6]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-[#0F172A] text-base">Live Call Demo</h4>
          <p className="text-sm text-[#475569] mt-0.5">
            Listen to how Active FrontDesk handles a real inbound call.
          </p>
        </div>
      </div>

      {src ? (
        <div className="space-y-3">
          <audio
            ref={audioRef}
            src={src}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
          />
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0 transition-colors"
            >
              {playing ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <div className="flex-1 space-y-1">
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={handleSeek}
                className="w-full h-1.5 cursor-pointer rounded-full"
              />
              <div className="flex justify-between text-xs text-[#94A3B8]">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <button
              disabled
              className="w-11 h-11 rounded-full bg-[#E2E8F0] text-[#94A3B8] flex items-center justify-center flex-shrink-0 cursor-not-allowed"
            >
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <div className="flex-1 space-y-2">
              <WaveformPlaceholder />
              <div className="flex justify-between text-xs text-[#94A3B8]">
                <span>0:00</span>
                <span className="text-[#3B82F6] font-medium">Audio demo coming soon</span>
              </div>
            </div>
          </div>
          <div className="bg-[#F8FAFC] rounded-lg px-4 py-3 text-sm text-[#475569] flex items-center gap-2 border border-[#E2E8F0]">
            <svg className="w-4 h-4 flex-shrink-0 text-[#94A3B8]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            A live call recording will appear here. Book a demo to hear your custom voice setup.
          </div>
        </div>
      )}
    </div>
  );
}
