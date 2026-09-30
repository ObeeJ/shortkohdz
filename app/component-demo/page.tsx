"use client";

import React from "react";
import Image from "next/image";
import { LayoutGroup, motion } from "motion/react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { TextRotate } from "@/components/ui/text-rotate";
import { Hero } from "@/components/ui/animated-hero";
import { TerminalRibbonStamp, GlassHudStamp } from "../components/TelemetryStampVariants";
import { HeroTelemetryStamp } from "../components/TelemetryStamp";

export default function ComponentDemo() {
  return (
    <main>
      {/* 0 · Telemetry Stamp Design Variants (Option 4 vs Option 5) */}
      <section className="py-16 px-6 border-b border-[var(--line)] bg-[#080B11] text-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#FF553D] uppercase">
              Design Exploration // Hero Telemetry Stamp
            </span>
            <h1 className="text-3xl font-bold mt-1 tracking-tight">Option 4 vs. Option 5</h1>
            <p className="text-sm text-white/50 mt-1">
              Live interactive preview comparing Option 4 (Terminal Ribbon) and Option 5 (Glass HUD) alongside Current.
            </p>
          </div>

          {/* Current */}
          <div className="p-6 rounded-lg bg-white/[0.02] border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-white/40">
              <span>CURRENT: RECTANGULAR TELEMETRY STAMP</span>
              <span>1px Dividers · Sharp</span>
            </div>
            <div>
              <HeroTelemetryStamp />
            </div>
          </div>

          {/* Option 4 */}
          <div className="p-6 rounded-lg bg-white/[0.02] border border-[#FF553D]/20 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#FF553D] font-bold">OPTION 4: INTERACTIVE TERMINAL RIBBON</span>
              <span className="text-white/40">UNIX Prompt `skd:~$` · Blinking Cursor · Live SLA Metric</span>
            </div>
            <div>
              <TerminalRibbonStamp />
            </div>
          </div>

          {/* Option 5 */}
          <div className="p-6 rounded-lg bg-white/[0.02] border border-[#38BDF8]/20 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#38BDF8] font-bold">OPTION 5: HIGH-DENSITY GLASS HUD</span>
              <span className="text-white/40">Apple Pro / Raycast Blur · Specular Border · Translucent Halo</span>
            </div>
            <div>
              <GlassHudStamp />
            </div>
          </div>
        </div>
      </section>

      {/* 1 · animated-hero (shadcn Button + framer-motion rotating word) */}
      <section className="border-b border-[var(--line)]">
        <Hero />
      </section>

      {/* 2 · text-rotate */}
      <section className="border-b border-[var(--line)]">
        <div className="w-full h-[60vh] text-2xl sm:text-3xl md:text-5xl flex flex-row items-center justify-center font-light overflow-hidden p-12 sm:p-20 md:p-24">
          <LayoutGroup>
            <motion.p className="flex whitespace-pre" layout>
              <motion.span
                className="pt-0.5 sm:pt-1 md:pt-2"
                layout
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                Make it{" "}
              </motion.span>
              <TextRotate
                texts={["work!", "fancy ✽", "right", "fast", "fun", "rock", "🕶️🕶️🕶️"]}
                mainClassName="text-white px-2 sm:px-2 md:px-3 bg-[var(--accent)] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </motion.p>
          </LayoutGroup>
        </div>
      </section>

      {/* 3 · container-scroll-animation */}
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-white">
                Unleash the power of <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Scroll Animations
                </span>
              </h1>
            </>
          }
        >
          <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </main>
  );
}
