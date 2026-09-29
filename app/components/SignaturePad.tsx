"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export type SignaturePadHandle = {
  toDataUrl: () => string | null;
  clear: () => void;
  isEmpty: () => boolean;
};

export const SignaturePad = forwardRef<SignaturePadHandle, { height?: number }>(
  function SignaturePad({ height = 160 }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawing = useRef(false);
    const dirty = useRef(false);
    const [empty, setEmpty] = useState(true);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.fillStyle = "#ffffffea";
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.strokeStyle = "#14181f";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }, []);

    function point(e: React.PointerEvent<HTMLCanvasElement>) {
      const rect = e.currentTarget.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      drawing.current = true;
      const { x, y } = point(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
      if (!drawing.current) return;
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      const { x, y } = point(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      dirty.current = true;
      setEmpty(false);
    }

    function onPointerUp() {
      drawing.current = false;
    }

    useImperativeHandle(ref, () => ({
      toDataUrl: () => (dirty.current ? canvasRef.current?.toDataURL("image/png") ?? null : null),
      isEmpty: () => !dirty.current,
      clear: () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        ctx.fillStyle = "#fffffff3";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        dirty.current = false;
        setEmpty(true);
      },
    }));

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Draw your signature"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{
            width: "100%",
            height,
            borderRadius: 14,
            border: "1px solid var(--line)",
            touchAction: "none",
            cursor: "crosshair",
          }}
        />
        <div className="mono" style={{ color: "var(--faint)", fontSize: 10 }}>
          {empty ? "draw your signature above" : "signed"}
        </div>
      </div>
    );
  }
);
