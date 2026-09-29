"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "@/lib/effects/scroll-stack/styles.css";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export type ScrollStackCard = {
  id: string | number;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  signatureSrc?: string;
};

type ScrollStackProps = {
  bgColor?: string;
  cards?: ScrollStackCard[];
  scroller?: HTMLElement | React.RefObject<HTMLElement | null>;
  viewportHeight?: string;
  contained?: boolean;
  className?: string;
};

export function ScrollStack({
  bgColor = "bg-transparent",
  cards = [],
  scroller,
  viewportHeight = "100vh",
  contained = false,
  className = "",
}: ScrollStackProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    rowRefs.current = rowRefs.current.slice(0, cards.length);
    cardRefs.current = cardRefs.current.slice(0, cards.length);

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const currentCards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const currentRows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
      const scrollerEl =
        scroller && "current" in scroller ? scroller.current : (scroller as HTMLElement | undefined);

      currentCards.forEach((card, index) => {
        gsap.set(card, {
          autoAlpha: 1,
          scale: index === 0 ? 1 : 1.1,
          transformOrigin: "center center",
        });
      });

      currentCards.slice(0, -1).forEach((card, index) => {
        const nextRow = currentRows[index + 1];
        const nextCard = currentCards[index + 1];
        if (!nextRow || !nextCard) return;

        const handoff = gsap.timeline({
          scrollTrigger: {
            trigger: nextRow,
            scroller: scrollerEl,
            start: "top bottom+=20%",
            end: "top top-=28%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        handoff.to(nextCard, { scale: 1, ease: "none" }, 0);

        gsap.to(card, {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: nextRow,
            scroller: scrollerEl,
            start: "top top+=14%",
            end: "top top+=2%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);

    return () => media.revert();
  }, [cards, scroller]);

  return (
    <section
      ref={sectionRef}
      data-contained={contained || undefined}
      className={`skd-scroll-stack py-[7%] max-sm:py-[15%] ${bgColor} ${className}`}
      style={{ "--scroll-stack-viewport": viewportHeight, containerType: "inline-size" } as React.CSSProperties}
    >
      <div className="flex w-full flex-col items-center px-[5%] py-[10cqw]">
        {cards.map((item, index) => (
          <div
            key={item.id}
            ref={(element) => {
              rowRefs.current[index] = element;
            }}
            className={`scroll-stack-row relative w-full min-h-[calc(var(--scroll-stack-viewport)*1.8)] max-sm:min-h-[calc(var(--scroll-stack-viewport)*1.3)] ${
              index === 0 ? "" : "-mt-[calc(var(--scroll-stack-viewport)*0.7)] max-sm:-mt-[calc(var(--scroll-stack-viewport)*0.5)]"
            }`}
          >
            <div
              className="scroll-stack-sticky sticky top-[calc(var(--scroll-stack-viewport)*0.15)] max-sm:top-[calc(var(--scroll-stack-viewport)*0.1)]"
              style={{ zIndex: index + 1 }}
            >
              <div
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className="scroll-stack-card mx-auto flex h-[32cqw] w-[80%] items-center justify-between gap-[4cqw] rounded-[45px] px-[4cqw] py-[3cqw] max-sm:h-auto max-sm:min-h-[50cqw] max-sm:w-full max-sm:flex-col max-sm:rounded-[9cqw] max-sm:px-[8cqw] max-sm:py-[15cqw]"
                style={{ backgroundColor: item.bgColor }}
              >
                <div className="w-[50%] max-sm:w-full">
                  <h2
                    className="scroll-stack-title w-full font-[var(--font-sans)] text-[5.5cqw] font-medium leading-[1.1] max-sm:text-[10cqw]"
                    style={{ color: item.textColor }}
                  >
                    {item.title}
                  </h2>
                </div>
                <div className="flex w-[50%] flex-col justify-center gap-[2cqw] max-sm:w-full max-sm:gap-[7cqw]">
                  <p
                    className="scroll-stack-description w-full text-justify text-[1.3cqw] leading-[1.5] max-sm:text-center max-sm:text-[4.5cqw]"
                    style={{ color: item.textColor }}
                  >
                    {item.description}
                  </p>
                  {item.signatureSrc && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.signatureSrc}
                      alt={`${item.title}'s signature`}
                      className="scroll-stack-signature"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
