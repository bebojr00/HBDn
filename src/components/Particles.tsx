"use client";

import { useMemo } from "react";
import Particles, { ParticlesProvider, useParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Engine } from "@tsparticles/engine";

function ParticlesContent() {
  const { loaded } = useParticlesProvider();
  
  const options = useMemo(() => ({
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      color: { value: ["#ffb6c1", "#f8c8dc", "#cfb53b", "#ffffff"] },
      move: {
        direction: "top" as const,
        enable: true,
        outModes: { default: "out" as const },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: { enable: true, width: 800, height: 800 },
        value: 60,
      },
      opacity: {
        value: { min: 0.1, max: 0.6 },
        animation: { enable: true, speed: 1, sync: false },
      },
      shape: { type: "circle" },
      size: {
        value: { min: 1, max: 4 },
        animation: { enable: true, speed: 2, sync: false },
      },
    },
    detectRetina: true,
  }), []);

  if (!loaded) return null;

  return <Particles id="tsparticles" options={options} />;
}

export default function MagicalParticles() {
  const init = async (engine: Engine) => {
    await loadSlim(engine);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <ParticlesProvider init={init}>
        <ParticlesContent />
      </ParticlesProvider>
    </div>
  );
}
