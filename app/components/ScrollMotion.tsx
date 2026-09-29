"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Containers whose children animate individually instead of the container itself.
const GRIDS = ".caps, .egrid, .oss-list, .ai-grid";
// Elements that own their motion (framer-motion, GSAP stacks, canvases).
const SKIP = "[data-nomotion], canvas, .hero, .skd-hero";

/**
 * Site-wide scroll-scrubbed motion. Every section block drifts and fades in as
 * it enters the viewport and reverses when scrolling back up, so the page
 * reads as animated in both directions. A [data-parallax] element drifts at
 * its own speed. Respects prefers-reduced-motion.
 */
export function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const small = window.matchMedia("(max-width: 700px)").matches;
    const dist = small ? 28 : 56;

    const ctx = gsap.context(() => {
      const targets = new Set<HTMLElement>();
      document
        .querySelectorAll<HTMLElement>("main section .wrap > *")
        .forEach((el) => {
          if (el.matches(GRIDS)) {
            Array.from(el.children).forEach((c) => targets.add(c as HTMLElement));
          } else targets.add(el);
        });

      targets.forEach((el) => {
        // Leave anything another library already animates alone.
        if (el.closest(SKIP) || el.style.opacity || el.style.transform) return;
        gsap.fromTo(
          el,
          { y: dist, opacity: 0, scale: 0.975 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 94%",
              end: "top 66%",
              scrub: 0.6,
            },
          }
        );
      });

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.2");
        gsap.to(el, {
          y: () => -speed * 260,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      gsap.to("#scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
      });
    });

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [pathname]);

  return (
    <div
      id="scroll-progress"
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "var(--accent)",
        transformOrigin: "0 50%",
        transform: "scaleX(0)",
        zIndex: 200,
        pointerEvents: "none",
      }}
    />
  );
}
