"use client";

import { useRef, useState } from "react";

interface AudioDemoProps {
  src?: string;
}

// Fixed, natural-looking bar heights (deterministic so it doesn't shift between renders)
const WAVEFORM_BARS = [
  10, 18, 26, 14, 22, 30, 16, 24, 12, 20, 28, 15, 23, 11, 19, 27, 17, 25, 13, 21, 9, 22, 30, 16,
  24, 12, 20, 28, 18, 26, 14, 10, 22, 30, 15, 23, 11, 19, 27, 17, 25, 13, 21, 29, 16, 24, 12, 20,
  28, 18, 26, 14, 10, 22, 30, 15, 23, 11, 19, 27,
];

function Waveform({
  progress,
  interactive,
  waveformRef,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  progress: number;
  interactive: boolean;
  waveformRef?: React.RefObject<HTMLDivElement | null>;
  onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove?: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp?: (e: React.PointerEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      ref={waveformRef}
      onPointerDown={interactive ? onPointerDown : undefined}
      onPointerMove={interactive ? onPointerMove : undefined}
      onPointerUp={interactive ? onPointerUp : undefined}
      className={`relative flex items-center gap-[3px] h-10 touch-none ${
        interactive ? "cursor-pointer" : ""
      }`}
    >
      {WAVEFORM_BARS.map((h, i) => {
        const barPosition = (i / WAVEFORM_BARS.length) * 100;
        const played = interactive && barPosition <= progress;
        return (
          <div
            key={i}
            className={`flex-1 rounded-full transition-colors pointer-events-none ${
              played ? "bg-[#2563EB]" : "bg-[#E2E8F0]"
            }`}
            style={{ height: `${h}px` }}
          />
        );
      })}
      {interactive && (
        <div
          className="absolute top-0 bottom-0 w-3 h-3 my-auto rounded-full bg-[#2563EB] border-2 border-white shadow-sm pointer-events-none -translate-x-1/2"
          style={{ left: `${progress}%` }}
        />
      )}
    </div>
  );
}

export default function AudioDemo({ src }: AudioDemoProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const scrubbingRef = useRef(false);
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

  const seekToClientX = (clientX: number) => {
    const audio = audioRef.current;
    const el = waveformRef.current;
    if (!audio || !el) return;
    const dur = audio.duration;
    if (!dur || !Number.isFinite(dur)) return;
    const rect = el.getBoundingClientRect();
    const fraction = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    audio.currentTime = fraction * dur;
    setProgress(fraction * 100);
    setCurrentTime(fraction * dur);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    scrubbingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* older browsers: capture unsupported, drag still works via move handler */
    }
    seekToClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrubbingRef.current) return;
    seekToClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    scrubbingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 max-w-2xl mx-auto shadow-sm">
      <div className="text-center mb-5">
        <h4 className="font-bold text-[#0F172A] text-base">Live Call Demo</h4>
        <p className="text-sm text-[#475569] mt-0.5">
          Listen to how Active FrontDesk handles a real inbound call.
        </p>
      </div>

      {src ? (
        <div className="space-y-3">
          <audio
            ref={audioRef}
            src={src}
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onDurationChange={handleLoadedMetadata}
            onEnded={handleEnded}
          />
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
              aria-label={playing ? "Pause" : "Play"}
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
              <Waveform
                progress={progress}
                interactive
                waveformRef={waveformRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
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
              <Waveform progress={0} interactive={false} />
              <div className="flex justify-between text-xs text-[#94A3B8]">
                <span>0:00</span>
                <span className="text-[#2563EB] font-medium">Audio demo coming soon</span>
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
