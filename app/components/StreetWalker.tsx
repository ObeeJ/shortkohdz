"use client";

/**
 * A minimal line-drawn engineer built from a handful of strokes so the gait
 * reads at small size. Each limb is a two-segment chain (hip → knee → foot,
 * shoulder → elbow → hand). Positioning lives on an outer <g transform>,
 * rotation on an inner <g> driven by CSS, because a CSS transform would
 * otherwise replace the SVG attribute and drop the joint offset.
 *
 * Origin is the ground contact point under the feet.
 *   walk    — full gait cycle
 *   inspect — feet planted, near arm raised to the rack panel
 *   idle    — standing, breathing
 */
type Pose = "walk" | "inspect" | "idle";

function Leg({ side }: { side: "near" | "far" }) {
  return (
    <g transform="translate(0 -34)">
      <g className={`limb leg ${side}`}>
        <line className="seg" x1="0" y1="0" x2="0" y2="16" />
        <g transform="translate(0 16)">
          <g className="joint shin">
            <line className="seg" x1="0" y1="0" x2="0" y2="16" />
            <line className="seg" x1="0" y1="16" x2="6" y2="16" />
          </g>
        </g>
      </g>
    </g>
  );
}

function Arm({ side }: { side: "near" | "far" }) {
  return (
    <g transform="translate(0 -56)">
      <g className={`limb arm ${side}`}>
        <line className="seg" x1="0" y1="0" x2="0" y2="11" />
        <g transform="translate(0 11)">
          <g className="joint forearm">
            <line className="seg" x1="0" y1="0" x2="0" y2="10" />
            {side === "near" && <circle className="hand" cx="0" cy="11" r="1.8" />}
          </g>
        </g>
      </g>
    </g>
  );
}

export function StreetWalker({ state = "walk" }: { state?: Pose }) {
  return (
    <g className="stick" data-state={state} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <ellipse className="stick-shadow" cx="0" cy="0" rx="13" ry="2.2" />
      <g className="stick-body">
        <Leg side="far" />
        <Arm side="far" />
        <line className="seg torso" x1="0" y1="-34" x2="0" y2="-58" />
        <g transform="translate(0 -65)">
          <g className="head">
            <circle className="seg" r="6.4" />
            {/* visor gives the figure a facing direction */}
            <line className="visor" x1="2.2" y1="-1" x2="5.4" y2="-1" />
          </g>
        </g>
        <Leg side="near" />
        <Arm side="near" />
      </g>

      <style>{`
        .stick { --gait: 0.9s; stroke-width: 2.4; }
        .stick .seg { stroke: var(--paper); }
        .stick .far .seg { stroke: var(--muted); opacity: .8; }
        .stick .visor { stroke: var(--accent); stroke-width: 2; }
        .stick .hand { fill: var(--accent); stroke: none; }
        .stick-shadow { fill: rgba(0,0,0,.35); stroke: none; }
        .stick .limb, .stick .joint, .stick .head, .stick .stick-body { transform-origin: 0 0; }

        /* walk: legs in antiphase, knee flexes on the back-swing, arms
           counter-swing, body rises once per step (twice per stride) */
        .stick[data-state="walk"] .stick-body { animation: stick-bob calc(var(--gait) / 2) ease-in-out infinite; }
        .stick[data-state="walk"] .leg.near,
        .stick[data-state="walk"] .arm.far  { animation: stick-hip var(--gait) ease-in-out infinite; }
        .stick[data-state="walk"] .leg.far,
        .stick[data-state="walk"] .arm.near { animation: stick-hip var(--gait) ease-in-out infinite; animation-delay: calc(var(--gait) / -2); }
        .stick[data-state="walk"] .arm { animation-name: stick-shoulder; }
        .stick[data-state="walk"] .leg.near .shin { animation: stick-knee var(--gait) ease-in-out infinite; }
        .stick[data-state="walk"] .leg.far  .shin { animation: stick-knee var(--gait) ease-in-out infinite; animation-delay: calc(var(--gait) / -2); }
        .stick[data-state="walk"] .forearm { transform: rotate(-26deg); }

        @keyframes stick-hip      { 0%,100% { transform: rotate(-28deg) } 50% { transform: rotate(28deg) } }
        @keyframes stick-shoulder { 0%,100% { transform: rotate(26deg) }  50% { transform: rotate(-26deg) } }
        @keyframes stick-knee     { 0%,100% { transform: rotate(-4deg) } 30% { transform: rotate(2deg) } 60% { transform: rotate(48deg) } 85% { transform: rotate(10deg) } }
        @keyframes stick-bob      { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-2.4px) } }

        .stick[data-state="inspect"] .leg.near { transform: rotate(-5deg); }
        .stick[data-state="inspect"] .leg.far  { transform: rotate(9deg); }
        .stick[data-state="inspect"] .arm.near { transform: rotate(-112deg); transition: transform .5s cubic-bezier(.2,.8,.2,1); }
        .stick[data-state="inspect"] .arm.near .forearm { transform: rotate(-28deg); }
        .stick[data-state="inspect"] .arm.far  { transform: rotate(8deg); }
        .stick[data-state="inspect"] .head { transform: rotate(-9deg); }
        .stick[data-state="idle"] .stick-body { animation: stick-breathe 3s ease-in-out infinite; }
        @keyframes stick-breathe { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-1px) } }

        @media (prefers-reduced-motion: reduce) { .stick, .stick * { animation: none !important; } }
      `}</style>
    </g>
  );
}
