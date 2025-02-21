"use client";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { ISourceOptions } from "@tsparticles/engine";

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

  const options: ISourceOptions = {
    fpsLimit: 60,
    particles: {
      number: {
        value: particleDensity,
      },
      color: {
        value: particleColor,
      },
      opacity: {
        value: 0.3,
      },
      size: {
        value: {
          min: minSize,
          max: maxSize,
        },
      },
      move: {
        enable: true,
        direction: "none",
        random: true,
        speed: 1,
        straight: false,
      },
    },
    background: {
      color: {
        value: background,
      },
    },
    detectRetina: true,
  };

  if (init) {
    return (
      <Particles
        id={id}
        className={className}
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return null;
};
