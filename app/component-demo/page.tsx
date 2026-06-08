"use client";

import React from "react";
import Image from "next/image";
import { LayoutGroup, motion } from "motion/react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { TextRotate } from "@/components/ui/text-rotate";
import { Hero } from "@/components/ui/animated-hero";

export default function ComponentDemo() {
  return (
    <main>
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
                mainClassName="text-white px-2 sm:px-2 md:px-3 bg-[#ff553d] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
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
