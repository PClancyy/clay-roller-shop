
"use client";

import { useCallback, useEffect, useState } from "react";
import GlassPage from "./glass/GlassPage";

export default function GlassIntro({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [seconds, setSeconds] = useState(7);
  const [leaving, setLeaving] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleReady = useCallback(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || leaving) return;

    if (seconds <= 0) {
      setLeaving(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setSeconds((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [ready, seconds, leaving]);

  return (
    <>
      <div
        className={`transition-opacity duration-700 ${
          finished
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {children}
      </div>

      {!finished && (
        <div
          className={`fixed inset-0 z-[100] bg-[#050817] transition-opacity duration-700 ${
            leaving ? "opacity-0" : "opacity-100"
          }`}
          onTransitionEnd={(event) => {
            if (
              leaving &&
              event.target === event.currentTarget
            ) {
              setFinished(true);
            }
          }}
        >
          <GlassPage onReady={handleReady} />

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
            <p className="text-xs tracking-[0.4em] text-[#D5A77B] uppercase mb-8">
              Clay Roller Studio
            </p>

            <h1 className="text-5xl md:text-7xl font-light tracking-wide text-white">
              Shape your surface.
            </h1>

            <p className="mt-5 text-lg text-white/65">
              Make your mark.
            </p>

            <p className="mt-12 text-xs tracking-[0.3em] text-white/50 uppercase">
              {ready
                ? `Entering studio · ${seconds}`
                : "Preparing the studio"}
            </p>

            <div className="mt-5 w-48 h-px bg-white/20 overflow-hidden">
              <div
                className="h-full bg-[#D5A77B] transition-all duration-1000"
                style={{
                  width: `${ready ? ((7 - seconds) / 7) * 100 : 0}%`,
                }}
              />
            </div>

            {ready && (
              <button
                onClick={() => setLeaving(true)}
                className="pointer-events-auto mt-10 text-xs tracking-[0.25em] uppercase text-white/70 hover:text-white transition-colors"
              >
                Enter studio →
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
