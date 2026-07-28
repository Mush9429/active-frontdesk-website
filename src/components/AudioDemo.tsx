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
              played ? "bg-[#60A5FA]" : "bg-[#334155]"
            }`}
            style={{ height: `${h}px` }}
          />
        );
      })}
      {interactive && (
        <div
          className="absolute top-0 bottom-0 w-3 h-3 my-auto rounded-full bg-[#60A5FA] border-2 border-[#0F172A] shadow-sm pointer-events-none -translate-x-1/2"
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
    <div className="relative max-w-2xl mx-auto">
      {/* Glow behind the card so it visually lifts off the white page background */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-70 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.18) 0%, transparent 70%)" }}
      />

      <div className="relative bg-[#0F172A] rounded-2xl border border-[#2563EB]/30 p-6 shadow-2xl shadow-[#2563EB]/20">
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 bg-[#2563EB]/15 text-[#93C5FD] text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 bg-[#60A5FA] rounded-full animate-pulse" />
            Audio
          </div>
          <h4 className="font-bold text-white text-base">Live Call Demo</h4>
          <p className="text-sm text-[#94A3B8] mt-0.5">
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
                className="w-12 h-12 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer shadow-lg shadow-[#2563EB]/40"
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
                <div className="flex justify-between text-xs text-[#64748B]">
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
                className="w-12 h-12 rounded-full bg-[#1E293B] text-[#64748B] flex items-center justify-center flex-shrink-0 cursor-not-allowed"
              >
                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className="flex-1 space-y-2">
                <Waveform progress={0} interactive={false} />
                <div className="flex justify-between text-xs text-[#64748B]">
                  <span>0:00</span>
                  <span className="text-[#60A5FA] font-medium">Audio demo coming soon</span>
                </div>
              </div>
            </div>
            <div className="bg-[#1E293B]/50 rounded-lg px-4 py-3 text-sm text-[#94A3B8] flex items-center gap-2 border border-[#334155]">
              <svg className="w-4 h-4 flex-shrink-0 text-[#64748B]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              A live call recording will appear here. Book a demo to hear your custom voice setup.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
