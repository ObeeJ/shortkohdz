"use client";

import { ElementType, ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";
import "./arrow-fill-button.css";

type ArrowFillButtonProps = {
  children?: ReactNode;
  className?: string;
  bgColor?: string;
  textColor?: string;
  fillBgColor?: string;
  fillTextColor?: string;
  hoverFillBgColor?: string;
  hoverFillTextColor?: string;
  arrowColor?: string;
  hoverArrowColor?: string;
  as?: ElementType;
  style?: CSSProperties;
  [key: string]: unknown;
};

export function ArrowFillButton({
  children = "Explore",
  className = "",
  bgColor = "var(--accent)",
  textColor = "var(--ink)",
  fillBgColor = "var(--paper)",
  fillTextColor = "var(--ink)",
  hoverFillBgColor = "var(--paper)",
  hoverFillTextColor = "var(--ink)",
  arrowColor,
  hoverArrowColor,
  as: Component = "a",
  style,
  ...props
}: ArrowFillButtonProps) {
  return (
    <Component
      type={Component === "button" ? "button" : undefined}
      {...props}
      className={cn("skd-arrow-fill-btn", className)}
      style={
        {
          "--btn-bg": bgColor,
          "--btn-text": textColor,
          "--btn-fill-bg": fillBgColor,
          "--btn-fill-text": fillTextColor,
          "--btn-fill-bg-hover": hoverFillBgColor,
          "--btn-fill-text-hover": hoverFillTextColor,
          "--btn-arrow": arrowColor || fillTextColor,
          "--btn-arrow-hover": hoverArrowColor || hoverFillTextColor,
          ...style,
        } as CSSProperties
      }
    >
      <span className="skd-arrow-fill-btn__text">{children}</span>

      <div aria-hidden="true" className="skd-arrow-fill-btn__circle">
        <span>{children}</span>

        <div className="skd-arrow-fill-btn__circle-text">
          <svg
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="skd-arrow-fill-btn__icon"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.82475e-07 5.625L7.625 5.625L4.125 9.125L5 10L10 5L5 -4.37114e-07L4.125 0.874999L7.625 4.375L4.91753e-07 4.375L3.82475e-07 5.625Z"
              className="skd-arrow-fill-btn__path"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.82475e-07 5.625L7.625 5.625L4.125 9.125L5 10L10 5L5 -4.37114e-07L4.125 0.874999L7.625 4.375L4.91753e-07 4.375L3.82475e-07 5.625Z"
              className="skd-arrow-fill-btn__path"
            />
          </svg>
        </div>
      </div>
    </Component>
  );
}
