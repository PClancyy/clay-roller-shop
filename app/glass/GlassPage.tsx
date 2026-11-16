"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import Experience from "./Experience";

type ShaderSources = {
  vertex: string;
  fragment: string;
  noise: string;
};

type GlassPageProps = {
  onReady?: () => void;
};

export default function GlassPage({ onReady }: GlassPageProps) {
  const [shaders, setShaders] = useState<ShaderSources | null>(null);
  const [error, setError] = useState("");
useEffect(() => {
  if (shaders) {
    onReady?.();
  }
}, [shaders, onReady]);
  useEffect(() => {
    let cancelled = false;

    async function loadShaders() {
      try {
        const [vertex, fragment, noise, snoise] = await Promise.all([
          fetch("/glass/vertex.glsl").then((response) => {
            if (!response.ok) {
              throw new Error("Could not load vertex.glsl");
            }
            return response.text();
          }),

          fetch("/glass/fragment.glsl").then((response) => {
            if (!response.ok) {
              throw new Error("Could not load fragment.glsl");
            }
            return response.text();
          }),

          fetch("/glass/noise.glsl").then((response) => {
            if (!response.ok) {
              throw new Error("Could not load noise.glsl");
            }
            return response.text();
          }),

          fetch("/glass/snoise2d.glsl").then((response) => {
            if (!response.ok) {
              throw new Error("Could not load snoise2d.glsl");
            }
            return response.text();
          }),
        ]);

        // Expand the GLSL include because these files are loaded
        // from public/ rather than processed by a shader loader.
        const expandedNoise = noise.replace(
          /^\s*#include\s+\.\/snoise2d\.glsl\s*$/m,
          snoise
        );

        // GLSL ES compatibility: implement atanh using logarithms.
        const compatibleFragment = fragment
          .replace(
            "void main() {",
            `float safeAtanh(float x) {
              x = clamp(x, 0.0, 0.999);
              return 0.5 * log((1.0 + x) / (1.0 - x));
            }

            void main() {`
          )
          .replace(
            "atanh(pow(fractUv.x, 6.))",
            "safeAtanh(pow(fractUv.x, 6.0))"
          );

        if (!cancelled) {
          setShaders({
            vertex,
            fragment: compatibleFragment,
            noise: expandedNoise,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Shader loading failed"
          );
        }
      }
    }

    loadShaders();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="fixed inset-0 bg-[#050817]">
      <Leva collapsed />

      {shaders && (
        <Canvas
          orthographic
          camera={{
            position: [0, 0, 1],
            near: 0.1,
            far: 10,
            zoom: 1,
          }}
          gl={{
            antialias: true,
            alpha: false,
          }}
        >
          <Suspense fallback={null}>
            <Experience shaders={shaders} />
          </Suspense>
        </Canvas>
      )}

      {!shaders && !error && (
        <div className="absolute inset-0 flex items-center justify-center text-white/60">
          Loading glass shader...
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center p-8 text-red-400">
          {error}
        </div>
      )}
    </main>
  );
}