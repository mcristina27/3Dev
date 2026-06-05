"use client";

import React, { useRef, useEffect } from "react";

interface GridGlowBackgroundProps {
  children: React.ReactNode;
  backgroundColor?: string;
  gridColor?: string;
  gridSize?: number;
  glowColors?: string[];
  glowCount?: number;
  /** Si true, centra el contenido con flex. Si false, el contenido fluye normalmente (ideal para páginas con scroll). */
  centerContent?: boolean;
  className?: string;
}

export const GridGlowBackground: React.FC<GridGlowBackgroundProps> = ({
  children,
  backgroundColor = "#0a0a0a",
  gridColor = "rgba(255, 255, 255, 0.05)",
  gridSize = 50,
  glowColors = ["#4A00E0", "#8E2DE2", "#4A00E0"],
  glowCount = 10,
  centerContent = true,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Non-null aliases so the Glow class can use them without TS errors
    const c = canvas as HTMLCanvasElement;
    const g = ctx as CanvasRenderingContext2D;

    let glows: Glow[] = [];
    let frameId: number;

    class Glow {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      radius: number;
      speed: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = Math.floor(Math.random() * (c.width / gridSize)) * gridSize;
        this.y = Math.floor(Math.random() * (c.height / gridSize)) * gridSize;
        this.targetX = this.x;
        this.targetY = this.y;
        this.radius = Math.random() * 80 + 40;
        this.speed = Math.random() * 0.015 + 0.01;
        this.color = glowColors[Math.floor(Math.random() * glowColors.length)];
        this.alpha = 0;
        this.setNewTarget();
      }

      setNewTarget() {
        this.targetX = Math.floor(Math.random() * (c.width / gridSize)) * gridSize;
        this.targetY = Math.floor(Math.random() * (c.height / gridSize)) * gridSize;
      }

      update() {
        this.x += (this.targetX - this.x) * this.speed;
        this.y += (this.targetY - this.y) * this.speed;
        if (Math.abs(this.targetX - this.x) < 1 && Math.abs(this.targetY - this.y) < 1) {
          this.setNewTarget();
        }
        if (this.alpha < 1) this.alpha += 0.01;
      }

      draw() {
        g.globalAlpha = this.alpha;
        const grad = g.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, "transparent");
        g.fillStyle = grad;
        g.beginPath();
        g.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        g.fill();
        g.globalAlpha = 1;
      }
    }

    const resize = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
      glows = Array.from({ length: glowCount }, () => new Glow());
    };

    const drawGrid = () => {
      g.strokeStyle = gridColor;
      g.lineWidth = 1;
      for (let x = 0; x < c.width; x += gridSize) {
        g.beginPath();
        g.moveTo(x, 0);
        g.lineTo(x, c.height);
        g.stroke();
      }
      for (let y = 0; y < c.height; y += gridSize) {
        g.beginPath();
        g.moveTo(0, y);
        g.lineTo(c.width, y);
        g.stroke();
      }
    };

    const animate = () => {
      g.clearRect(0, 0, c.width, c.height);
      drawGrid();
      glows.forEach((glow) => {
        glow.update();
        glow.draw();
      });
      frameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, [gridColor, gridSize, glowColors, glowCount]);

  return (
    <div
      className={`relative min-h-screen w-full ${className}`}
      style={{ backgroundColor }}
    >
      {/* Canvas fijo cubre toda la pantalla, no interfiere con el scroll */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 h-full w-full opacity-40 pointer-events-none"
      />
      <div className={`relative z-10 ${centerContent ? "flex min-h-screen items-center justify-center" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default GridGlowBackground;
