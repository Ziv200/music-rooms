"use client";

import { useRef, useEffect, useMemo } from "react";

// Dolby Atmos 7.1.4 speaker layout visualizer using HTML5 Canvas
// Renders a 3D-perspective view with animated acoustic waves

interface Speaker {
  x: number;
  y: number;
  z: number; // 0=floor, 0.5=ear, 1=ceiling
  label: string;
  layer: "floor" | "ear" | "ceiling";
}

const SPEAKERS: Speaker[] = [
  // Ear level (7 speakers)
  { x: 0, y: -0.7, z: 0.5, label: "C", layer: "ear" },
  { x: -0.5, y: -0.6, z: 0.5, label: "L", layer: "ear" },
  { x: 0.5, y: -0.6, z: 0.5, label: "R", layer: "ear" },
  { x: -0.85, y: 0, z: 0.5, label: "Ls", layer: "ear" },
  { x: 0.85, y: 0, z: 0.5, label: "Rs", layer: "ear" },
  { x: -0.6, y: 0.5, z: 0.5, label: "Lb", layer: "ear" },
  { x: 0.6, y: 0.5, z: 0.5, label: "Rb", layer: "ear" },
  // Subwoofer
  { x: 0.3, y: -0.7, z: 0, label: "LFE", layer: "floor" },
  // Ceiling (4 speakers)
  { x: -0.45, y: -0.4, z: 1, label: "Ltf", layer: "ceiling" },
  { x: 0.45, y: -0.4, z: 1, label: "Rtf", layer: "ceiling" },
  { x: -0.45, y: 0.35, z: 1, label: "Ltb", layer: "ceiling" },
  { x: 0.45, y: 0.35, z: 1, label: "Rtb", layer: "ceiling" },
];

export function AtmosVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  const dpr = useMemo(() => {
    if (typeof window !== "undefined") return Math.min(window.devicePixelRatio || 1, 2);
    return 1;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width * dpr;
      height = rect.height * dpr;
      canvas.width = width;
      canvas.height = height;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    function project(x: number, y: number, z: number): [number, number] {
      const w = width / dpr;
      const h = height / dpr;
      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) * 0.32;

      // Simple isometric projection with slight perspective
      const px = cx + x * scale;
      const py = cy + y * scale * 0.65 - z * scale * 0.5;
      return [px, py];
    }

    function draw(time: number) {
      if (!ctx) return;
      const w = width / dpr;
      const h = height / dpr;

      ctx.clearRect(0, 0, w, h);

      // Draw room outline (subtle floor grid)
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;

      // Grid lines
      for (let i = -4; i <= 4; i++) {
        const [x1, y1] = project(i * 0.25, -0.9, 0);
        const [x2, y2] = project(i * 0.25, 0.7, 0);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        const [x3, y3] = project(-0.95, i * 0.2, 0);
        const [x4, y4] = project(0.95, i * 0.2, 0);
        ctx.beginPath();
        ctx.moveTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.stroke();
      }

      // Animated waves from center (listening position)
      const [cx, cy] = project(0, 0, 0.5);
      const waveCount = 5;
      for (let i = 0; i < waveCount; i++) {
        const phase = ((time * 0.0004 + i / waveCount) % 1);
        const radius = phase * Math.min(w, h) * 0.38;
        const alpha = (1 - phase) * 0.12;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw connection lines from center to each speaker
      SPEAKERS.forEach((speaker) => {
        const [sx, sy] = project(speaker.x, speaker.y, speaker.z);
        const pulse = Math.sin(time * 0.002 + speaker.x * 3 + speaker.y * 2) * 0.5 + 0.5;

        // Connection line
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(sx, sy);
        const lineAlpha = 0.04 + pulse * 0.06;
        ctx.strokeStyle =
          speaker.layer === "ceiling"
            ? `rgba(139, 92, 246, ${lineAlpha})`
            : speaker.layer === "floor"
              ? `rgba(245, 158, 11, ${lineAlpha})`
              : `rgba(6, 182, 212, ${lineAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw speakers
      SPEAKERS.forEach((speaker) => {
        const [sx, sy] = project(speaker.x, speaker.y, speaker.z);
        const pulse = Math.sin(time * 0.003 + speaker.x * 4 + speaker.y * 3) * 0.5 + 0.5;

        // Glow
        const glowRadius = 12 + pulse * 8;
        let color: string;
        if (speaker.layer === "ceiling") {
          color = `rgba(139, 92, 246, ${0.15 + pulse * 0.15})`;
        } else if (speaker.layer === "floor") {
          color = `rgba(245, 158, 11, ${0.15 + pulse * 0.1})`;
        } else {
          color = `rgba(6, 182, 212, ${0.15 + pulse * 0.15})`;
        }

        const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowRadius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(sx, sy, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Speaker dot
        const dotSize = speaker.layer === "floor" ? 3 : 4;
        ctx.beginPath();
        ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
        if (speaker.layer === "ceiling") {
          ctx.fillStyle = `rgba(167, 139, 250, ${0.7 + pulse * 0.3})`;
        } else if (speaker.layer === "floor") {
          ctx.fillStyle = `rgba(251, 191, 36, ${0.7 + pulse * 0.3})`;
        } else {
          ctx.fillStyle = `rgba(34, 211, 238, ${0.7 + pulse * 0.3})`;
        }
        ctx.fill();

        // Label
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.font = "9px monospace";
        ctx.textAlign = "center";
        ctx.fillText(speaker.label, sx, sy - 10);
      });

      // Center listening position
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fill();

      // Layer labels
      ctx.font = "10px monospace";
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(6, 182, 212, 0.4)";
      ctx.fillText("● Ear Level (7)", 12, h - 36);
      ctx.fillStyle = "rgba(139, 92, 246, 0.4)";
      ctx.fillText("● Ceiling (4)", 12, h - 22);
      ctx.fillStyle = "rgba(245, 158, 11, 0.4)";
      ctx.fillText("● LFE Sub (1)", 12, h - 8);

      frameRef.current = time;
      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [dpr]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
