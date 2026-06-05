"use client";

import { useEffect, useRef, useState } from "react";

const COLS = 5;
const DOT_SIZE = 8;
const GAP = 4;
const CELL = DOT_SIZE + GAP;

interface Props {
  isActive: boolean;
}

export default function SidebarAnimation({ isActive }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const heightsRef = useRef<number[]>(Array(COLS).fill(0));
  const targetHeightsRef = useRef<number[]>(Array(COLS).fill(0));
  const [rows, setRows] = useState(28);

  const canvasW = COLS * CELL - GAP;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const h = entries[0].contentRect.height;
      setRows(Math.max(4, Math.floor(h / CELL)));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const canvasH = rows * CELL - GAP;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTick = 0;
    const TICK_MS = 80;

    function updateTargets() {
      if (isActive) {
        for (let c = 0; c < COLS; c++) {
          targetHeightsRef.current[c] = Math.random() * 0.75 + 0.1;
        }
      } else {
        for (let c = 0; c < COLS; c++) {
          targetHeightsRef.current[c] = 0;
        }
      }
    }

    function draw(now: number) {
      if (!ctx || !canvas) return;

      if (now - lastTick > TICK_MS) {
        updateTargets();
        lastTick = now;
      }

      for (let c = 0; c < COLS; c++) {
        const target = targetHeightsRef.current[c];
        heightsRef.current[c] += (target - heightsRef.current[c]) * 0.15;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let c = 0; c < COLS; c++) {
        const filledRows = Math.round(heightsRef.current[c] * rows);

        for (let r = 0; r < rows; r++) {
          const x = c * CELL;
          const y = r * CELL;
          const fromBottom = rows - 1 - r;

          let color: string;
          if (fromBottom < filledRows) {
            color = "#00FFFF";
          } else if (fromBottom === filledRows && filledRows > 0) {
            color = "#00FFFF66";
          } else if (fromBottom === filledRows + 1 && filledRows > 0) {
            color = "#00FFFF33";
          } else {
            color = "#2a2a2a";
          }

          ctx.beginPath();
          ctx.arc(x + DOT_SIZE / 2, y + DOT_SIZE / 2, DOT_SIZE / 2, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [isActive, rows]);

  return (
    <div ref={containerRef} style={{ width: canvasW, alignSelf: "stretch", display: "flex", alignItems: "flex-start" }}>
      <canvas ref={canvasRef} width={canvasW} height={canvasH} style={{ display: "block" }} />
    </div>
  );
}
