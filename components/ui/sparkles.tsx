"use client";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

type SparklesCoreProps = {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
};

export const SparklesCore = ({
  id = "tsparticles",
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  className = "",
  particleColor = "#FFFFFF",
}: SparklesCoreProps) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container) => {
    console.log(container);
  };

  if (init) {
    return (
      <Particles
        id={id}
        className={className}
        particlesLoaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: background,
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: particleColor,
            },
            number: {
              density: {
                enable: true,
                area: particleDensity,
              },
              value: 80,
            },
            opacity: {
              value: { min: 0.1, max: 0.5 },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: minSize, max: maxSize },
            },
            move: {
              enable: true,
              direction: "none",
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1,
              straight: false,
            },
          },
          detectRetina: true,
        }}
      />
    );
  }

  return null;
};
