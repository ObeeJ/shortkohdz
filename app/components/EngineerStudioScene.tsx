"use client";

import { useState, useEffect } from "react";
import { Coffee, Play, Sparkles, RefreshCw } from "lucide-react";

type HandSign = "rock" | "paper" | "scissors";

interface RoundResult {
  dadSign: HandSign;
  herSign: HandSign;
  winner: "her" | "dad" | "tie";
  caption: string;
}

const ROUNDS: RoundResult[] = [
  { dadSign: "paper", herSign: "scissors", winner: "her", caption: "Scissors cuts Paper · Daughter scores" },
  { dadSign: "paper", herSign: "rock", winner: "dad", caption: "Paper covers Rock · Dad scores" },
  { dadSign: "rock", herSign: "scissors", winner: "dad", caption: "Rock smashes Scissors · Dad scores" },
  { dadSign: "scissors", herSign: "rock", winner: "her", caption: "Rock breaks Scissors · Daughter scores" },
  { dadSign: "paper", herSign: "paper", winner: "tie", caption: "Both threw Paper · It's a draw" },
  { dadSign: "scissors", herSign: "scissors", winner: "tie", caption: "Both threw Scissors · Rematch" },
];

export function EngineerStudioScene({ className = "" }: { className?: string }) {
  const [roundIdx, setRoundIdx] = useState(0);
  const [isShooting, setIsShooting] = useState(false);
  const [dadScore, setDadScore] = useState(2);
  const [herScore, setHerScore] = useState(3);

  const currentRound = ROUNDS[roundIdx];

  const playNextRound = () => {
    if (isShooting) return;
    setIsShooting(true);

    setTimeout(() => {
      setRoundIdx((prev) => {
        const next = (prev + 1) % ROUNDS.length;
        const outcome = ROUNDS[next];
        if (outcome.winner === "dad") setDadScore((s) => s + 1);
        if (outcome.winner === "her") setHerScore((s) => s + 1);
        return next;
      });
      setIsShooting(false);
    }, 600);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      playNextRound();
    }, 5500);
    return () => clearInterval(timer);
  }, [isShooting]);

  return (
    <div className={`studio-scene-card ${className}`}>
      {/* Precision Header / HUD */}
      <div className="studio-hud-header">
        <div className="hud-title-group">
          <span className="hud-tag">ENGINEERING STUDIO // DISTRIBUTED SYSTEMS</span>
          <span className="hud-label">Systems Architect Bench · Deterministic Execution</span>
        </div>

        <div className="hud-controls-group">
          <div className="hud-score-chip">
            <span className="score-name">DAD (SYSTEMS)</span>
            <span className="score-val">{dadScore}</span>
            <span className="score-divider">:</span>
            <span className="score-val">{herScore}</span>
            <span className="score-name">DAUGHTER (CHAMPION)</span>
          </div>

          <button
            type="button"
            onClick={playNextRound}
            disabled={isShooting}
            className="hud-play-btn"
            title="Play next rock-paper-scissors round"
            aria-label="Play next rock paper scissors round"
          >
            <RefreshCw size={11} className={isShooting ? "anim-spin" : ""} />
            <span>{isShooting ? "ROUND IN PLAY..." : "NEXT ROUND"}</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas Frame */}
      <div className="studio-svg-viewport">
        <svg
          viewBox="-240.0 -10.0 1820.0 430.0"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Systems engineer testing concurrent ledgers while playing rock-paper-scissors with his daughter"
          className="studio-scene-svg"
        >
          {/* ============================================================
              1. BACKGROUND & ROOM ARCHITECTURE
              ============================================================ */}
          <g className="back">
            <path className="ln floor" d="M-60 350 H1340" />
            <path className="ln skirt" d="M-60 338 H1340" />

            {/* Window with Daylight (No glowing blurs) */}
            <g className="window">
              <path className="light-shaft" d="M96 262 L150 350 L392 350 L306 262 Z" />
              <rect className="glass" x="96" y="92" width="210" height="168" rx="3" />
              <g clipPath="url(#sv-dk-win)">
                <defs>
                  <clipPath id="sv-dk-win">
                    <rect x="96" y="92" width="210" height="168" rx="3" />
                  </clipPath>
                </defs>
                <rect className="sky" x="96" y="92" width="210" height="168" />
                <circle className="sun" cx="262" cy="128" r="17" />
                <path className="hill far" d="M96 206 q48 -36 96 -6 q42 26 114 -4 v64 H96 z" />
                <path className="hill" d="M96 222 q56 -28 108 -2 q46 22 102 -6 v46 H96 z" />
                <path className="ln out-trunk" d="M150 258 V214" />
                <circle className="out-crown" cx="150" cy="198" r="22" />
                <circle className="out-crown c2" cx="132" cy="210" r="14" />
                <circle className="out-crown c3" cx="168" cy="211" r="13" />
              </g>
              <path className="ln mullion" d="M201 92 V260 M96 176 H306" />
              <path className="ln sill" d="M84 262 H318" />
            </g>

            {/* Bookshelf & Vines */}
            <path className="ln shelf" d="M470 144 H700" />
            <rect className="book bk0" x="480" y="114" width="11" height="30" rx="1.5" />
            <rect className="book bk1" x="495" y="106" width="11" height="38" rx="1.5" />
            <rect className="book bk2" x="510" y="118" width="11" height="26" rx="1.5" />
            <rect className="book bk0" x="525" y="110" width="11" height="34" rx="1.5" />
            <rect className="book bk1" x="540" y="115" width="11" height="29" rx="1.5" />
            <path className="lean" d="M566 144 l2 -40 l34 4 l-2 36 z" />
            <g className="hi-pot">
              <path className="pot" d="M646 144 h30 l-5 -20 h-20 z" />
              <path className="ln vine" d="M661 124 q-18 14 -22 34 M661 124 q16 12 19 28" />
            </g>

            {/* Wall Picture Frames */}
            <g className="frames">
              <rect className="frame f1" x="962" y="96" width="104" height="82" rx="2" />
              <rect className="frame f2" x="1082" y="104" width="62" height="52" rx="2" />
              <rect className="frame" x="1082" y="168" width="62" height="46" rx="2" />
              <rect className="frame f3" x="1160" y="120" width="74" height="58" rx="2" />
            </g>

            {/* Pendant Ceiling Lamp */}
            <g className="pendant">
              <path className="ln flex" d="M500 -10 V96" />
              <path className="dome" d="M472 122 q0 -26 28 -26 q28 0 28 26 z" />
              <ellipse className="bulb" cx="500" cy="124" rx="8" ry="3.8" />
              <path className="light-shaft pend-light" d="M474 126 h52 l40 130 H434 z" />
            </g>
          </g>

          {/* ============================================================
              2. LEFT SIDE: BOOKCASE, RECORD PLAYER, GUITAR & SLEEPING DOG
              ============================================================ */}
          <g className="side">
            <path className="case" d="M-214 350 V104 h132 V350 z" />
            <path className="case-sh" d="M-96 350 V104 h14 V350 z" />
            <path className="ln case-sh" d="M-214 150 h132" />
            <path className="ln case-sh" d="M-214 190 h132" />
            <path className="ln case-sh" d="M-214 230 h132" />
            <path className="ln case-sh" d="M-214 270 h132" />
            <path className="ln case-sh" d="M-214 310 h132" />

            {/* Books on Shelves */}
            <g>
              <rect className="book bk0" x="-208" y="126" width="7" height="24" rx="1" />
              <rect className="book bk1" x="-199" y="122" width="7" height="28" rx="1" />
              <rect className="book bk2" x="-190" y="130" width="7" height="20" rx="1" />
              <rect className="book bk0" x="-181" y="124" width="7" height="26" rx="1" />
              <rect className="book bk1" x="-172" y="126" width="7" height="24" rx="1" />
              <rect className="book bk2" x="-163" y="122" width="7" height="28" rx="1" />
              <rect className="book bk0" x="-154" y="130" width="7" height="20" rx="1" />
              <rect className="book bk1" x="-166" y="122" width="7" height="28" rx="1" />
              <rect className="book bk2" x="-157" y="130" width="7" height="20" rx="1" />
              <rect className="book bk0" x="-148" y="124" width="7" height="26" rx="1" />
              <rect className="book bk1" x="-139" y="126" width="7" height="24" rx="1" />
            </g>
            <g>
              <rect className="book bk2" x="-208" y="170" width="7" height="20" rx="1" />
              <rect className="book bk0" x="-199" y="164" width="7" height="26" rx="1" />
              <rect className="book bk1" x="-190" y="166" width="7" height="24" rx="1" />
              <rect className="book bk2" x="-181" y="162" width="7" height="28" rx="1" />
              <rect className="book bk0" x="-172" y="170" width="7" height="20" rx="1" />
              <rect className="book bk0" x="-160" y="164" width="7" height="26" rx="1" />
              <rect className="book bk1" x="-151" y="166" width="7" height="24" rx="1" />
              <rect className="book bk2" x="-142" y="162" width="7" height="28" rx="1" />
              <rect className="book bk0" x="-133" y="170" width="7" height="20" rx="1" />
              <rect className="book bk1" x="-124" y="164" width="7" height="26" rx="1" />
              <rect className="book bk2" x="-115" y="166" width="7" height="24" rx="1" />
            </g>
            <g>
              <rect className="book bk1" x="-208" y="206" width="7" height="24" rx="1" />
              <rect className="book bk2" x="-199" y="202" width="7" height="28" rx="1" />
              <rect className="book bk0" x="-190" y="210" width="7" height="20" rx="1" />
              <rect className="book bk1" x="-181" y="204" width="7" height="26" rx="1" />
              <rect className="book bk2" x="-172" y="206" width="7" height="24" rx="1" />
              <rect className="book bk0" x="-163" y="202" width="7" height="28" rx="1" />
              <rect className="book bk1" x="-154" y="210" width="7" height="20" rx="1" />
              <rect className="book bk2" x="-145" y="204" width="7" height="26" rx="1" />
              <rect className="book bk2" x="-152" y="202" width="7" height="28" rx="1" />
              <rect className="book bk0" x="-143" y="210" width="7" height="20" rx="1" />
              <rect className="book bk1" x="-134" y="204" width="7" height="26" rx="1" />
            </g>
            <g>
              <rect className="book bk0" x="-208" y="250" width="7" height="20" rx="1" />
              <rect className="book bk1" x="-199" y="244" width="7" height="26" rx="1" />
              <rect className="book bk2" x="-190" y="246" width="7" height="24" rx="1" />
              <rect className="book bk0" x="-181" y="242" width="7" height="28" rx="1" />
              <rect className="book bk1" x="-176" y="244" width="7" height="26" rx="1" />
              <rect className="book bk2" x="-167" y="246" width="7" height="24" rx="1" />
              <rect className="book bk0" x="-158" y="242" width="7" height="28" rx="1" />
              <rect className="book bk1" x="-149" y="250" width="7" height="20" rx="1" />
              <rect className="book bk2" x="-140" y="244" width="7" height="26" rx="1" />
              <rect className="book bk0" x="-131" y="246" width="7" height="24" rx="1" />
            </g>

            {/* Turntable / Record Player */}
            <path className="deck" d="M-196 104 h72 v-22 h-72 z" />
            <circle className="ln disc turntable-disc" cx="-166" cy="93" r="8" />
            <circle className="spindle" cx="-166" cy="93" r="1.6" />
            <path className="ln tone" d="M-136 88 l-14 6" />
            <ellipse className="cast-sh" cx="-148" cy="350" rx="80" ry="6" />

            {/* Guitar */}
            <g className="guitar">
              <path className="gtr-body" d="M-58 344 q-26 -4 -26 -30 q0 -18 15 -22 q-9 -8 -9 -19 q0 -15 16 -17 q17 2 17 17 q0 11 -9 19 q15 4 15 22 q0 26 -19 30 z" />
              <circle className="gtr-hole" cx="-53" cy="310" r="7.5" />
              <path className="ln gtr-neck" d="M-49 256 l-16 -66" />
              <path className="ln gtr-head" d="M-65 190 l-9 -16 l10 -5 l9 16 z" />
              <path className="ln gtr-str" d="M-52 330 l-20 -140 M-47 330 l-19 -139" />
            </g>

            {/* Sleeping Dog with gentle breathing cycle */}
            <g className="dog dog-sleeping">
              <ellipse className="cast-sh" cx="34" cy="352" rx="52" ry="7" />
              <path className="cushion" d="M-16 350 q0 -16 22 -16 h58 q22 0 22 16 z" />
              <ellipse className="fur d-body" cx="34" cy="330" rx="44" ry="18" />
              <ellipse className="fur d-head" cx="-6" cy="326" rx="18" ry="15" />
              <path className="fur d-ear" d="M-16 314 q-13 3 -11 20 q9 -6 15 -14 z" />
              <path className="ln d-snout" d="M-22 330 q-8 2 -9 7" />
              <ellipse className="nose" cx="-24" cy="329" rx="2.6" ry="2" />
              <path className="ln d-eye" d="M-11 323 q4 3 8 0" />
              <path className="ln d-tail" d="M76 326 q18 -4 12 -18" />
              <ellipse className="d-breath" cx="34" cy="330" rx="44" ry="18" />
            </g>
          </g>

          {/* ============================================================
              3. RIGHT SIDE: COUCH, CAT, LAMP & TABLE
              ============================================================ */}
          <g className="side">
            <path className="rug2" d="M934 350 h330 l24 12 H910 z" />
            <g className="sofa">
              <path className="couch-back" d="M966 336 V246 q0 -14 16 -14 h226 q16 0 16 14 v90 z" />
              <path className="couch-seat" d="M956 336 h268 q12 0 12 12 v16 h-292 v-16 q0 -12 12 -12 z" />
              <path className="ln mattress" d="M962 342 h286" />
              <path className="cush" d="M986 280 h96 v46 h-96 z" />
              <path className="cush" d="M1090 280 h96 v46 h-96 z" />
              <path className="pillow p1" d="M974 268 h44 v40 h-44 z" />
              <path className="pillow p2" d="M1176 272 h40 v36 h-40 z" />
              <path className="throw" d="M1120 324 h84 l-10 30 h-74 z" />
              <path className="ln couch-leg" d="M970 350 v-10 M1240 350 v-10" />
            </g>
            <ellipse className="cast-sh" cx="1104" cy="350" rx="152" ry="7" />

            {/* Sleeping Cat */}
            <g className="cat cat-resting">
              <ellipse className="fur" cx="1204" cy="266" rx="26" ry="11" />
              <circle className="fur" cx="1182" cy="259" r="10" />
              <path className="ln ears" d="M1175 252 l-3 -7 l7 3 M1187 251 l4 -7 l2 8" />
              <ellipse className="nose" cx="1173" cy="261" rx="1.6" ry="1.2" />
              <path className="ln tail cat-tail" d="M1228 268 q15 4 9 -10" />
            </g>

            {/* Floor Lamp with soft light cone */}
            <g className="floor-lamp">
              <path className="ln arc" d="M1286 350 V244 q0 -52 -64 -56" />
              <path className="ln stand" d="M1266 350 h40" />
              <path className="shade2" d="M1196 176 h52 l-16 30 h-20 z" />
              <path className="light-shaft lamp-light" d="M1200 206 h44 l50 100 H1150 z" />
            </g>

            {/* Potted Palm */}
            <path className="pot" d="M896 350 h50 l-8 -52 h-34 z" />
            <g>
              <path className="ln frond" d="M921 300 q-24 -24 -32 -52" />
              <ellipse className="leaf" cx="889" cy="248" rx="14" ry="8.5" transform="rotate(-28 889 248)" />
            </g>
            <g>
              <path className="ln frond" d="M921 300 q-7.2 -24 -9.6 -64" />
              <ellipse className="leaf" cx="911.4" cy="236" rx="14" ry="8.5" transform="rotate(-8.4 911.4 236)" />
            </g>
            <g>
              <path className="ln frond" d="M921 300 q12 -24 16 -76" />
              <ellipse className="leaf" cx="937" cy="224" rx="14" ry="8.5" transform="rotate(14 937 224)" />
            </g>
          </g>

          {/* Far Right Corner: Side Table & Skate Deck */}
          <g className="side">
            <path className="table" d="M1332 268 h124 v9 h-124 z" />
            <path className="ln table-leg" d="M1344 277 V350 M1444 277 V350" />
            <path className="ln table-sh" d="M1344 324 h100" />
            <path className="shade2 t-shade" d="M1360 210 h44 l-13 26 h-18 z" />
            <path className="ln t-stem" d="M1382 236 V268" />
            <path className="light-shaft table-light" d="M1364 236 h36 l30 32 h-96 z" />
            <path className="cup2" d="M1418 268 h20 l-3 -15 h-14 z" />
            <ellipse className="cast-sh" cx="1394" cy="350" rx="78" ry="6" />
            <path className="pouffe" d="M1478 350 q-4 -34 30 -34 q34 0 30 34 z" />
            <path className="ln pouffe-ln" d="M1482 332 h52" />
            <g className="board-lean">
              <path className="deck2" d="M1550 350 l-22 -122 l16 -4 l22 122 z" />
              <circle className="ln wheel" cx="1534" cy="254" r="4.5" />
              <circle className="ln wheel" cx="1548" cy="326" r="4.5" />
            </g>
            <path className="ln shelf2" d="M1330 150 H1500" />
            <path className="pot" d="M1348 150 h30 l-5 -22 h-20 z" />
            <path className="ln vine" d="M1363 128 q-18 13 -22 32 M1363 128 q16 11 19 27" />
            <path className="pot" d="M1414 150 h26 l-4 -18 h-18 z" />
            <ellipse className="leaf" cx="1411" cy="124" rx="12" ry="7" transform="rotate(-26 1411 124)" />
            <ellipse className="leaf" cx="1436.6" cy="116" rx="12" ry="7" transform="rotate(15.6 1436.6 116)" />
            <rect className="frame f2" x="1462" y="112" width="34" height="38" rx="2" />
          </g>

          {/* ============================================================
              4. CENTER DESK, WORKBENCH, MAC & LIVING DETAILS
              ============================================================ */}
          <g className="desk">
            {/* Desk Angle Lamp */}
            <g className="lamp">
              <path className="light-shaft desk-light" d="M866 166 h30 l38 92 H828 z" />
              <path className="ln arm" d="M858 262 V160 q0 -16 18 -16 h20" />
              <path className="shade" d="M862 140 h38 l-12 26 h-16 z" />
            </g>

            {/* Desktop Surface & Drawer Units */}
            <path className="top" d="M452 262 H892 v13 H452 z" />
            <path className="top-lit" d="M452 262 H892 v3 H452 z" />
            <path className="top-edge" d="M452 272 H892 v3 H452 z" />
            <ellipse className="cast-sh" cx="672" cy="350" rx="232" ry="7" />
            <path className="ln leg" d="M466 275 V350" />
            <path className="ln leg" d="M878 275 V350" />
            <rect className="draw" x="794" y="275" width="72" height="70" rx="2" />
            <path className="draw-sh" d="M854 275 h12 v70 h-12 z" />
            <path className="ln" d="M794 299 H866 M794 323 H866" />
            <path className="ln pull" d="M818 287 h26 M818 311 h26 M818 335 h26" />

            {/* Steaming Coffee Mug with gentle rising wisps */}
            <g className="mug">
              <path className="cup" d="M466 238 h28 l-4 24 h-20 z" />
              <ellipse className="cup-top" cx="480" cy="238" rx="14" ry="4" />
              <path className="cup-sh" d="M486 239 h8 l-4 23 h-6 z" />
              <path className="ln handle" d="M494 245 q11 5 -2 13" />
              <g className="steam">
                <path className="wisp w0" d="M472 232 q-6 -11 0 -20 q6 -9 0 -18" />
                <path className="wisp w1" d="M480 232 q-6 -11 0 -20 q6 -9 0 -18" />
                <path className="wisp w2" d="M488 232 q-6 -11 0 -20 q6 -9 0 -18" />
              </g>
            </g>

            {/* Note Pad & Pen Jar */}
            <path className="note-pad" d="M508 254 h54 l4 8 h-62 z" />
            <path className="ln pen" d="M516 246 l32 -7" />
            <g className="jar">
              <path className="pot2" d="M806 262 h26 l-4 -26 h-18 z" />
              <path className="ln nib n1" d="M813 238 V218" />
              <path className="ln nib n2" d="M820 238 V212" />
              <path className="ln nib n3" d="M826 238 l6 -22" />
            </g>

            {/* Swivel Office Chair */}
            <g className="chair is-pushed">
              <path className="ln chair-back" d="M636 288 V196 q0 -10 10 -10 h6" />
              <path className="seat" d="M628 288 h84 v11 h-84 z" />
              <path className="seat-edge" d="M628 297 h84 v3 h-84 z" />
              <path className="ln post" d="M670 300 V340" />
              <path className="ln base" d="M644 340 h52" />
              <circle className="caster" cx="644" cy="345" r="5" />
              <circle className="caster" cx="696" cy="345" r="5" />
            </g>

            {/* Engineering Workstation (MacBook with Live Terminal & Invariant Tests) */}
            <g className="mac">
              <path className="lid" d="M612 250 h168 l14 12 H598 z" />
              <path className="ln lid-ln" d="M676 257 h40" />
              <rect className="bezel" x="616" y="156" width="160" height="94" rx="4" />
              <rect className="screen" x="622" y="162" width="148" height="82" rx="2" fill="#090D16" />
              <g className="ui-terminal">
                {/* Window Bar */}
                <rect className="bar" x="622" y="162" width="148" height="9" rx="2" fill="#1E293B" />
                <circle className="dot d-r" cx="628" cy="166.5" r="1.3" fill="#EF4444" />
                <circle className="dot d-y" cx="633" cy="166.5" r="1.3" fill="#F59E0B" />
                <circle className="dot d-g" cx="638" cy="166.5" r="1.3" fill="#10B981" />
                <text x="646" y="168.5" fill="#94A3B8" fontSize="4.5" fontFamily="monospace" fontWeight="600">zsh · akin-ledger [main]</text>

                {/* Terminal Content */}
                <rect x="622" y="171" width="148" height="73" fill="#090D16" />
                
                {/* Command & Tests */}
                <text x="627" y="180" fill="#38BDF8" fontSize="5" fontFamily="monospace" fontWeight="700">❯ go test -race -v ./pkg/ledger</text>
                
                <text x="627" y="189" fill="#10B981" fontSize="4.4" fontFamily="monospace">✓ PASS: TestPessimisticRowLocking</text>
                <text x="627" y="197" fill="#10B981" fontSize="4.4" fontFamily="monospace">✓ PASS: TestZeroDoubleSpend (14.2ms)</text>
                <text x="627" y="205" fill="#10B981" fontSize="4.4" fontFamily="monospace">✓ PASS: TestRotatingEscrow_Atomicity</text>
                
                {/* Divider */}
                <line x1="627" y1="212" x2="762" y2="212" stroke="#1E293B" strokeWidth="0.8" />
                
                {/* System Telemetry */}
                <text x="627" y="221" fill="#F59E0B" fontSize="4.5" fontFamily="monospace">INFRA: k8s-mesh · 12 pods healthy</text>
                <text x="627" y="229" fill="#94A3B8" fontSize="4.2" fontFamily="monospace">P99: 14.2ms · DRIFT: 0.00% · SECURE</text>

                <circle cx="762" cy="166.5" r="1.5" fill="#10B981" />
              </g>
            </g>

            {/* ============================================================
                5. THE TWO PLAYERS: DAD ("HIM") & DAUGHTER ("HER")
                ============================================================ */}

            {/* DAD ("HIM") */}
            <g className={`him ${isShooting ? "is-arm-bounce" : ""}`} transform="translate(322 350) scale(2.9)">
              <g className="walker is-playing">
                <ellipse className="shadow" cx="4" cy="1.2" rx="17" ry="2.6" />
                <g transform="translate(0 13)">
                  {/* Leg B */}
                  <g className="leg leg-b far" transform="translate(0 -32.5)">
                    <g className="thigh" transform="rotate(2)">
                      <path className="trews" d="M-4 0 L-3.2 14.7 Q0 18.38 3.2 14.7 L4 0 Q0 -4.6 -4 0 Z" />
                      <g transform="translate(0 14.7)">
                        <circle className="trews joint" cx="0" cy="0" r="3.2" />
                        <g className="knee" transform="rotate(109.3)">
                          <ellipse className="skin" cx="0" cy="12.6" rx="1.3" ry="2.1" />
                          <path className="trews" d="M-3.1 0 L-2.4 10.6 Q0 13.36 2.4 10.6 L3.1 0 Q0 -3.565 -3.1 0 Z" />
                          <g transform="translate(0 13.4)">
                            <g className="foot" transform="rotate(-46.3)">
                              <path className="shoe" d="M8.6 2C8.5 2.2 8.4 2.3 8.3 2.3C8.2 2.4 8.1 2.5 8 2.6C7.5 2.9 7 3.1 6.4 3.2C6.1 3.2 5.9 3.2 5.6 3.2C4.7 3.3 3.8 3.2 2.9 3.4C2.9 3.4 2.9 3.5 2.9 3.6C2.5 3.8 2.1 3.9 1.7 4.1C1.5 4.1 1.3 4.2 1.1 4.2C0.9 4.3 0.7 4.3 0.5 4.4C0.4 4.4 0.4 4.4 0.3 4.4C0.2 4.3 0.2 4.3 0.1 4.2C0.1 4.1 0.1 4.1 0 4C0 3.9 0 3.8 -0.1 3.7C-0.1 3.7 -0.1 3.6 -0.1 3.6C-0.1 3.5 -0.1 3.5 -0.1 3.5C-0.3 2.9 -0.5 2.3 -0.7 1.7C-0.7 1.6 -0.8 1.4 -0.8 1.2C-0.8 1.2 -0.8 1.1 -0.8 1.1C-0.5 1.2 -0.3 1.2 0 1.3C0.6 1.3 1.2 1.3 1.7 1.3C1.6 1 1.5 0.8 1.6 0.5C1.6 0.5 1.6 0.5 1.6 0.4C1.6 0.4 1.6 0.4 1.7 0.4C1.7 0.3 1.7 0.3 1.8 0.2C1.9 0.2 2.1 0.2 2.2 0.2C2.4 0.2 2.5 0.3 2.7 0.3L3.2 0.5C3.8 0.7 4.4 0.9 5 1.1C5.5 1.1 6.1 1.1 6.6 1.2C6.9 1.2 7.3 1.2 7.6 1.2C7.8 1.2 7.9 1.2 8.1 1.2C8.2 1.2 8.3 1.2 8.4 1.3C8.5 1.3 8.5 1.4 8.5 1.4C8.5 1.4 8.5 1.5 8.5 1.5C8.6 1.5 8.6 1.6 8.6 1.6C8.6 1.8 8.6 1.9 8.6 2Z" />
                              <path className="shoe-d" d="M8.5 1.4C8.4 1.5 8.3 1.5 8.2 1.6C7.9 1.8 7.6 1.9 7.3 2C6.7 2.3 6 2.5 5.3 2.6C5 2.6 4.6 2.7 4.3 2.7C4.2 2.7 4.2 2.7 4.1 2.7C4.1 2.4 4.1 2.1 4.1 1.8C4.1 1.7 4.1 1.5 4.1 1.4C4 1.3 4 1.2 3.9 1.1C3.7 1 3.4 0.9 3.2 0.8C2.9 0.7 2.7 0.6 2.4 0.6C2.2 0.5 1.9 0.4 1.7 0.4C1.6 0.4 1.6 0.4 1.6 0.4C2.1 0.6 2.6 0.7 3 0.8C3.3 0.9 3.5 1 3.7 1.1C3.8 1.2 3.9 1.2 4 1.4C4 1.5 4 1.6 4 1.7C4 2 4 2.3 4 2.7C3.7 2.7 3.5 2.7 3.2 2.7C2.8 2.7 2.5 2.7 2.1 2.8C1.8 2.8 1.5 2.9 1.2 3C0.8 3.2 0.3 3.4 -0.1 3.5C-0.1 3.5 -0.1 3.5 -0.1 3.6C0.3 3.5 0.6 3.3 1 3.2C1.3 3.1 1.6 3 1.9 2.9C2.3 2.8 2.6 2.8 3 2.7C3.3 2.7 3.7 2.7 4.1 2.7C4.4 2.7 4.8 2.7 5.1 2.7C5.8 2.6 6.5 2.4 7.1 2.2C7.5 2 7.8 1.9 8.1 1.8C8.2 1.7 8.4 1.6 8.5 1.5C8.5 1.5 8.5 1.4 8.5 1.4Z" />
                              <path className="sneak" d="M-0.6 2.1 C-0.1 2.7 0.4 3 1.1 3 C1.8 2.95 2.4 2.55 3.2 2.4 C4.4 2.15 5.4 2.2 6.5 2 C7.4 1.8 8 1.5 8.5 1.2 C8.6 1.5 8.6 1.8 8.6 2 C8.5 2.2 8.4 2.3 8.3 2.3 C8.2 2.4 8.1 2.5 8 2.6 C7.5 2.9 7 3.1 6.4 3.2 C5.5 3.25 4.6 3.25 3.7 3.35 C2.8 3.5 2.1 3.9 1.7 4.1 C1.3 4.2 0.7 4.35 0.3 4.4 C0.15 4.25 0.05 4.1 -0.05 3.75 C-0.25 3.2 -0.5 2.6 -0.6 2.1 Z" />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>

                  {/* Leg A */}
                  <g className="leg leg-a" transform="translate(1.3 -32.5)">
                    <g className="thigh" transform="rotate(-83)">
                      <path className="trews" d="M-4 0 L-3.2 14.7 Q0 18.38 3.2 14.7 L4 0 Q0 -4.6 -4 0 Z" />
                      <g transform="translate(0 14.7)">
                        <circle className="trews joint" cx="0" cy="0" r="3.2" />
                        <g className="knee" transform="rotate(89.8)">
                          <ellipse className="skin" cx="0" cy="12.6" rx="1.3" ry="2.1" />
                          <path className="trews" d="M-3.1 0 L-2.4 10.6 Q0 13.36 2.4 10.6 L3.1 0 Q0 -3.565 -3.1 0 Z" />
                          <g transform="translate(0 13.4)">
                            <g className="foot" transform="rotate(-6.8)">
                              <path className="shoe" d="M8.6 2C8.5 2.2 8.4 2.3 8.3 2.3C8.2 2.4 8.1 2.5 8 2.6C7.5 2.9 7 3.1 6.4 3.2C6.1 3.2 5.9 3.2 5.6 3.2C4.7 3.3 3.8 3.2 2.9 3.4C2.9 3.4 2.9 3.5 2.9 3.6C2.5 3.8 2.1 3.9 1.7 4.1C1.5 4.1 1.3 4.2 1.1 4.2C0.9 4.3 0.7 4.3 0.5 4.4C0.4 4.4 0.4 4.4 0.3 4.4C0.2 4.3 0.2 4.3 0.1 4.2C0.1 4.1 0.1 4.1 0 4C0 3.9 0 3.8 -0.1 3.7C-0.1 3.7 -0.1 3.6 -0.1 3.6C-0.1 3.5 -0.1 3.5 -0.1 3.5C-0.3 2.9 -0.5 2.3 -0.7 1.7C-0.7 1.6 -0.8 1.4 -0.8 1.2C-0.8 1.2 -0.8 1.1 -0.8 1.1C-0.5 1.2 -0.3 1.2 0 1.3C0.6 1.3 1.2 1.3 1.7 1.3C1.6 1 1.5 0.8 1.6 0.5C1.6 0.5 1.6 0.5 1.6 0.4C1.6 0.4 1.6 0.4 1.7 0.4C1.7 0.3 1.7 0.3 1.8 0.2C1.9 0.2 2.1 0.2 2.2 0.2C2.4 0.2 2.5 0.3 2.7 0.3L3.2 0.5C3.8 0.7 4.4 0.9 5 1.1C5.5 1.1 6.1 1.1 6.6 1.2C6.9 1.2 7.3 1.2 7.6 1.2C7.8 1.2 7.9 1.2 8.1 1.2C8.2 1.2 8.3 1.2 8.4 1.3C8.5 1.3 8.5 1.4 8.5 1.4C8.5 1.4 8.5 1.5 8.5 1.5C8.6 1.5 8.6 1.6 8.6 1.6C8.6 1.8 8.6 1.9 8.6 2Z" />
                              <path className="shoe-d" d="M8.5 1.4C8.4 1.5 8.3 1.5 8.2 1.6C7.9 1.8 7.6 1.9 7.3 2C6.7 2.3 6 2.5 5.3 2.6C5 2.6 4.6 2.7 4.3 2.7C4.2 2.7 4.2 2.7 4.1 2.7C4.1 2.4 4.1 2.1 4.1 1.8C4.1 1.7 4.1 1.5 4.1 1.4C4 1.3 4 1.2 3.9 1.1C3.7 1 3.4 0.9 3.2 0.8C2.9 0.7 2.7 0.6 2.4 0.6C2.2 0.5 1.9 0.4 1.7 0.4C1.6 0.4 1.6 0.4 1.6 0.4C2.1 0.6 2.6 0.7 3 0.8C3.3 0.9 3.5 1 3.7 1.1C3.8 1.2 3.9 1.2 4 1.4C4 1.5 4 1.6 4 1.7C4 2 4 2.3 4 2.7C3.7 2.7 3.5 2.7 3.2 2.7C2.8 2.7 2.5 2.7 2.1 2.8C1.8 2.8 1.5 2.9 1.2 3C0.8 3.2 0.3 3.4 -0.1 3.5C-0.1 3.5 -0.1 3.5 -0.1 3.6C0.3 3.5 0.6 3.3 1 3.2C1.3 3.1 1.6 3 1.9 2.9C2.3 2.8 2.6 2.8 3 2.7C3.3 2.7 3.7 2.7 4.1 2.7C4.4 2.7 4.8 2.7 5.1 2.7C5.8 2.6 6.5 2.4 7.1 2.2C7.5 2 7.8 1.9 8.1 1.8C8.2 1.7 8.4 1.6 8.5 1.5C8.5 1.5 8.5 1.4 8.5 1.4Z" />
                              <path className="sneak" d="M-0.6 2.1 C-0.1 2.7 0.4 3 1.1 3 C1.8 2.95 2.4 2.55 3.2 2.4 C4.4 2.15 5.4 2.2 6.5 2 C7.4 1.8 8 1.5 8.5 1.2 C8.6 1.5 8.6 1.8 8.6 2 C8.5 2.2 8.4 2.3 8.3 2.3 C8.2 2.4 8.1 2.5 8 2.6 C7.5 2.9 7 3.1 6.4 3.2 C5.5 3.25 4.6 3.25 3.7 3.35 C2.8 3.5 2.1 3.9 1.7 4.1 C1.3 4.2 0.7 4.35 0.3 4.4 C0.15 4.25 0.05 4.1 -0.05 3.75 C-0.25 3.2 -0.5 2.6 -0.6 2.1 Z" />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>

                {/* Upper Body, Coat, Head & Coffee Cup in Hand */}
                <g className="carry" transform="translate(2.9 -43.8)">
                  <g className="lift">
                    <g transform="translate(-2.9 43.8)">
                      <path className="coat-f" d="M10.4 -41.9C10.4 -41.7 10.3 -41.6 10.3 -41.5C10.2 -41.4 10.2 -41.2 10.2 -41.1C10 -40.6 9.8 -40.1 9.6 -39.6C9.4 -39.1 9.3 -38.6 9.1 -38.1C9 -37.9 8.9 -37.7 8.8 -37.5C8.7 -37.3 8.5 -37.3 8.3 -37.2C8.2 -37.2 8.1 -37.3 8.1 -37.3C7.9 -37.3 7.8 -37.3 7.6 -37.4C7.5 -37.4 7.3 -37.5 7.1 -37.6C7.1 -37.6 7 -37.6 7 -37.6C6.5 -37.8 6.1 -38 5.7 -38.2C4.8 -38.7 4 -39.2 3.2 -39.8C3 -39.9 2.8 -40 2.7 -40.2C2.5 -40.3 2.3 -40.5 2.2 -40.7C2.1 -40.8 2 -41.1 2 -41.3C2 -41.5 2 -41.8 2.1 -42C2.3 -43 2.7 -43.9 3.1 -44.8C3.3 -45.1 3.5 -45.5 3.9 -45.5C4.2 -45.5 4.4 -45.4 4.5 -45.3C4.8 -45.1 5 -45 5.2 -44.8C5.7 -44.5 6.3 -44.1 6.8 -43.8C7.1 -43.6 7.5 -43.5 7.8 -43.3C8.3 -43.2 8.8 -43 9.2 -42.9C9.4 -42.8 9.6 -42.8 9.8 -42.7C10 -42.6 10.1 -42.5 10.3 -42.4C10.4 -42.2 10.4 -42.1 10.4 -41.9Z" />
                      <path className="hand-f" d="M15.9 -40.1C15.8 -40 15.7 -39.9 15.5 -40C15.6 -39.9 15.7 -39.8 15.7 -39.8C15.8 -39.7 15.8 -39.6 15.8 -39.5C15.7 -39.4 15.6 -39.4 15.5 -39.4C15.5 -39.4 15.5 -39.4 15.4 -39.3C15.5 -39.3 15.5 -39.3 15.5 -39.2C15.5 -39.1 15.4 -39 15.3 -39C15.2 -38.9 15.1 -38.9 15 -38.9C14.8 -39 14.7 -39 14.6 -39C14.5 -38.8 14.2 -38.8 14 -38.8C13.9 -38.9 13.8 -38.9 13.7 -38.9C13.5 -38.9 13.4 -39 13.3 -39C13.1 -39 12.9 -38.9 12.6 -38.9C12.6 -38.9 12.6 -38.9 12.5 -38.9C12.4 -38.9 12.2 -38.8 12 -38.8C11.7 -38.8 11.4 -38.9 11.1 -39C10.8 -39.1 10.5 -39.2 10.3 -39.4C9.9 -39.5 9.6 -39.8 9.3 -40C9 -40.2 8.7 -40.3 8.3 -40.4C8 -40.6 7.7 -40.7 7.4 -40.8C7.2 -40.8 7 -40.9 6.9 -41C6.8 -41 6.7 -41 6.7 -41.1C6.6 -41.1 6.5 -41.1 6.4 -41.2C6.3 -41.3 6.4 -41.5 6.5 -41.6C6.5 -41.8 6.6 -41.9 6.7 -42.1C6.8 -42.4 7 -42.7 7.2 -43C7.2 -43.1 7.3 -43.1 7.3 -43.1C7.5 -42.9 7.7 -42.8 7.9 -42.7C8.5 -42.3 9.2 -42 9.9 -41.9L10.2 -41.9C10.5 -42 10.8 -42 11.1 -42.1C11.4 -42.2 11.7 -42.2 12 -42.3C12.3 -42.3 12.6 -42.2 12.9 -42.1C12.9 -42.1 13 -42.1 13.1 -42C13.5 -41.9 13.9 -41.8 14.2 -41.6C14.6 -41.4 14.9 -41.1 15.3 -40.9C15.5 -40.8 15.7 -40.7 15.8 -40.5C15.9 -40.5 15.9 -40.4 16 -40.3C16 -40.3 16 -40.2 15.9 -40.1Z" />
                      <path className="cup" d="M15.2 -38C15.1 -37.9 15.1 -37.9 15.1 -37.9C14.9 -37.8 14.3 -37.7 13.7 -37.7C13.1 -37.7 12.4 -37.8 12.2 -37.9C12.2 -37.9 12.2 -37.9 12.2 -38C12.2 -38 12.1 -38 12.1 -38C12.1 -38 12.2 -38 12.2 -38L11.8 -43.6C11.8 -43.5 11.8 -43.5 11.8 -43.5C11.9 -43.4 12 -43.4 12.1 -43.4C12.2 -43.4 12.2 -43.3 12.2 -43.3C12.6 -43.2 13.1 -43.2 13.7 -43.2C14.2 -43.2 14.7 -43.2 15.1 -43.3C15.1 -43.3 15.2 -43.4 15.2 -43.4C15.3 -43.4 15.4 -43.4 15.5 -43.5L15.2 -38Z" />
                      <path className="cup-lid" d="M15.8 -43.1C15.8 -43.2 15.8 -43.3 15.8 -43.4C15.7 -43.4 15.7 -43.5 15.7 -43.5C15.7 -43.5 15.6 -43.6 15.6 -43.6C15.6 -43.6 15.6 -43.6 15.5 -43.7C15.4 -43.8 15.1 -43.9 14.7 -43.9C14.7 -43.9 14.7 -43.9 14.7 -44C14.7 -44 14.7 -44.1 14.6 -44.1C14.6 -44.2 14.6 -44.2 14.5 -44.2C14.5 -44.2 14.4 -44.2 14.3 -44.2C14.3 -44.2 14.2 -44.2 14.2 -44.2L13.9 -44.2C13.9 -44.2 13.8 -44.2 13.8 -44.2C13.7 -44.2 13.6 -44.2 13.6 -44.2C13.5 -44.2 13.5 -44.2 13.5 -44.1C13.4 -44.1 13.4 -44 13.4 -44C12.7 -44 12 -43.9 11.8 -43.7C11.8 -43.7 11.8 -43.6 11.8 -43.6C11.7 -43.5 11.6 -43.4 11.5 -43.3C11.5 -43.2 11.5 -43.1 11.5 -43.1C11.5 -43.1 11.5 -43 11.5 -43C11.5 -43 11.5 -42.9 11.6 -42.9C11.8 -42.7 12.8 -42.6 13.7 -42.6C14.6 -42.6 15.5 -42.7 15.8 -42.9C15.8 -43 15.8 -43 15.8 -43C15.8 -43 15.8 -43.1 15.8 -43.1Z" />
                      <path className="cup-rim" d="M15.3 -43.4C14.8 -43.3 14.4 -43.3 13.9 -43.3C13.7 -43.3 13.5 -43.3 13.2 -43.3C13 -43.3 12.8 -43.3 12.6 -43.3C12.4 -43.3 12.1 -43.4 11.9 -43.5C11.9 -43.5 11.8 -43.4 11.9 -43.4C12.3 -43.2 12.7 -43.2 13.1 -43.2C13.6 -43.2 14 -43.2 14.5 -43.2C14.8 -43.2 15 -43.2 15.3 -43.3C15.3 -43.3 15.3 -43.4 15.3 -43.4Z" />
                      <path className="hand-f" d="M12.8 -40.2C12.6 -40.2 12.5 -40.3 12.3 -40.4C12.1 -40.4 11.9 -40.4 11.8 -40.4C11.4 -40.4 11 -40.3 10.7 -40.2C10.4 -40.2 10.1 -40.3 9.8 -40.5C9.6 -40.7 9.6 -41 9.8 -41.3C9.9 -41.6 10.2 -41.7 10.5 -41.8C10.6 -41.8 10.8 -41.9 11 -41.9C11.1 -41.9 11.3 -41.9 11.4 -41.9C11.6 -41.8 11.7 -41.8 11.8 -41.6C11.8 -41.6 11.9 -41.5 12 -41.4C12.2 -41.3 12.4 -41.2 12.6 -41.1C12.9 -41 13.3 -40.9 13.3 -40.6C13.3 -40.3 13 -40.2 12.8 -40.2Z" />
                      <path className="hand-f2" d="M11.7 -40.4C11.3 -40.5 10.9 -40.5 10.5 -40.4C10.5 -40.4 10.5 -40.3 10.5 -40.3C10.9 -40.4 11.3 -40.4 11.7 -40.3C11.8 -40.3 11.8 -40.3 11.7 -40.4Z" />
                    </g>
                  </g>
                </g>

                {/* Head, Hair, Neck & Eyes */}
                <g transform="translate(-2 -54.4) scale(1.1 1.24) translate(2 54.4)">
                  <path className="skin" d="M5.1 -54.5C4.9 -54.4 4.6 -54.4 4.4 -54.4C3.8 -54.4 3.2 -54.5 2.6 -54.6C2 -54.7 1.4 -54.8 0.8 -55C0.3 -55.1 -0.3 -55.3 -0.9 -55.6C-1.1 -55.7 -1.4 -55.8 -1.7 -55.9C-1.8 -56 -1.9 -56 -2 -56.1C-2 -56.3 -1.9 -56.4 -1.9 -56.5C-1.6 -57 -1.4 -57.5 -1 -57.9C-0.7 -58.3 -0.4 -58.7 0 -59.1C0.3 -59.4 0.6 -59.6 0.9 -59.9C1.1 -60.5 1.2 -61 1.3 -61.6C1.4 -62.2 1.5 -62.7 1.6 -63.2C1.6 -63.3 1.6 -63.3 1.7 -63.3C1.7 -63.3 1.7 -63.3 1.7 -63.2C1.8 -63.1 2 -62.9 2.1 -62.8C2.5 -62.4 2.9 -62 3.4 -61.7C3.6 -61.5 3.8 -61.4 4.1 -61.2C4.1 -61.1 4.1 -61.1 4.1 -61.1C4.1 -60.9 4.1 -60.8 4 -60.6C3.9 -60 3.7 -59.3 3.6 -58.6C3.9 -58.1 4.2 -57.6 4.4 -57C4.6 -56.5 4.8 -55.9 5 -55.3C5.1 -55.2 5.1 -55 5.1 -54.9C5.2 -54.8 5.1 -54.6 5.1 -54.5Z" />
                </g>
                <g transform="translate(3.5 -51) scale(1.24) translate(-3.5 51)">
                  <path className="skin" d="M0.6 -64.4C0.6 -64.3 0.6 -64.2 0.7 -64.2C0.7 -63.9 0.8 -63.6 1 -63.3C1.3 -62.6 1.8 -62.1 2.4 -61.7C3.5 -60.9 4.8 -60.5 6.1 -60.5C6.4 -60.5 6.6 -60.7 6.6 -60.9C6.6 -61 6.7 -61.2 6.7 -61.3C6.7 -61.4 6.7 -61.5 6.7 -61.6L6.8 -62L6.8 -62.2L6.8 -62.3L6.9 -62.4L6.9 -62.5L6.9 -62.7C6.9 -62.7 7 -62.7 7 -62.8C7.1 -62.8 7.1 -62.8 7.2 -62.8C7.2 -62.8 7.2 -62.8 7.2 -62.9C7.5 -63 7.3 -63.3 7.2 -63.6C7.1 -63.7 7 -63.9 6.9 -64.1C6.8 -64.3 6.9 -64.5 7 -64.7C7 -64.8 7 -64.9 7 -65C7 -65.6 6.9 -66.2 6.6 -66.7C6.6 -66.8 6.6 -66.9 6.5 -66.9C6.4 -67.1 6.2 -67.3 6.1 -67.4C6 -67.5 6 -67.5 5.9 -67.6C5.6 -67.7 5.4 -67.8 5.1 -67.9C5 -68 5 -68 4.9 -68C4.2 -68.2 3.4 -68.3 2.7 -68C2.6 -67.9 2.5 -67.9 2.5 -67.9C2.1 -67.7 1.8 -67.5 1.5 -67.2C1.4 -67.2 1.4 -67.1 1.3 -67.1C1.3 -67 1.2 -66.9 1.2 -66.9C1.1 -66.8 1.1 -66.7 1.1 -66.7C0.7 -66 0.5 -65.2 0.6 -64.4Z" />
                  <path className="hair" d="M7.3 -67.2C7.2 -67.1 7.1 -66.9 7.1 -66.8C7 -66.6 7 -66.5 6.9 -66.3C6.9 -66.3 6.8 -66.3 6.8 -66.3C6.8 -66.4 6.7 -66.6 6.6 -66.7C6.6 -66.8 6.6 -66.8 6.6 -66.8C6.5 -66.9 6.5 -67 6.4 -67C6.4 -67.1 6.4 -67.1 6.4 -67.1C6.3 -66.9 6.3 -66.8 6.2 -66.6C6.2 -66.3 6.2 -66.1 6.1 -65.8C6 -65.6 5.8 -65.4 5.6 -65.4C5.3 -65.3 5 -65.3 4.7 -65.3C4.6 -65.3 4.4 -65.3 4.2 -65.3C4.1 -65.2 3.9 -65.2 3.8 -65.2C3.7 -65.2 3.7 -65.2 3.6 -65.2C3.6 -65.1 3.6 -65.1 3.6 -65.1C3.6 -64.9 3.6 -64.7 3.6 -64.5C3.6 -64.3 3.6 -64.2 3.6 -64C3.6 -63.9 3.6 -63.7 3.5 -63.6C3.5 -63.5 3.4 -63.4 3.3 -63.3C3.2 -63.3 3.1 -63.3 3 -63.2C2.9 -63.2 2.7 -63.2 2.7 -63.1C2.6 -62.9 2.5 -62.8 2.5 -62.7C2.4 -62.3 2.3 -62 2.3 -61.7C2 -61.7 1.8 -61.7 1.6 -61.7C1.5 -61.7 1.4 -61.7 1.3 -61.8C1.2 -61.9 1.2 -62 1.2 -62C1.3 -62.8 0.7 -63.4 0.4 -64C0.4 -64 0.4 -64 0.4 -64.1C0.3 -64.1 0.3 -64.1 0.3 -64.1C0.3 -64.2 0.2 -64.4 0.2 -64.6C-0.1 -64.7 -0.3 -65 -0.4 -65.4C-0.4 -65.6 -0.4 -65.7 -0.3 -65.9C-0.3 -66.1 -0.1 -66.2 -0.1 -66.4C0 -66.6 0 -66.8 -0.1 -67C-0.1 -67.2 -0.1 -67.4 0 -67.6C0.1 -67.9 0.3 -68.2 0.6 -68.3C0.9 -68.5 1.1 -68.5 1.4 -68.6C1.5 -68.7 1.7 -68.8 1.9 -68.9C2.1 -69 2.4 -69 2.7 -69C3 -69 3.3 -69 3.6 -68.9C4 -68.9 4.4 -68.8 4.8 -68.7C5.1 -68.8 5.4 -68.9 5.7 -68.9C5.9 -68.9 6.2 -68.8 6.4 -68.6C6.6 -68.5 6.7 -68.3 6.7 -68.1C6.7 -68.1 6.7 -68 6.7 -68C6.8 -67.9 6.9 -67.9 7 -67.9C7.1 -67.8 7.2 -67.8 7.2 -67.6C7.3 -67.5 7.3 -67.4 7.3 -67.2Z" />
                  <path className="brow" d="M5.7 -64.8C5.8 -64.8 6 -64.8 6.1 -64.8C6.3 -64.8 6.5 -64.8 6.7 -64.7C6.7 -64.7 6.8 -64.7 6.8 -64.8C6.9 -64.9 6.9 -64.9 6.9 -65C6.8 -65.2 6.7 -65.2 6.5 -65.2C6.2 -65.2 5.9 -65.1 5.6 -64.9C5.6 -64.9 5.6 -64.8 5.7 -64.8Z" />
                  <path className="pupil" d="M5.9 -64.3C6 -64.4 6.1 -64.4 6.2 -64.5C6.3 -64.5 6.5 -64.5 6.6 -64.5C6.6 -64.5 6.6 -64.4 6.6 -64.4C6.5 -64.4 6.4 -64.5 6.2 -64.4C6.2 -64.4 6.1 -64.3 6 -64.2C6 -64.2 5.9 -64.3 5.9 -64.3Z" />
                  <path className="smile" d="M6 -62.7C6 -62.6 6.1 -62.6 6.2 -62.5C6.3 -62.4 6.4 -62.3 6.5 -62.3C6.6 -62.2 6.7 -62.1 6.8 -62L6.8 -62.2L6.8 -62.3L6.9 -62.4L6.9 -62.5C6.6 -62.6 6.3 -62.7 6.1 -62.8C6 -62.8 6 -62.7 6 -62.7Z" />
                </g>

                {/* Coat & Bag */}
                <path className="coat" d="M6.9 -42.3C6.9 -38.7 7.5 -35 7.5 -31.4C7.1 -30.2 4.6 -30.5 3.5 -30.4C3.1 -30.4 2.7 -30.4 2.2 -30.4C0.8 -30.3 -0.6 -30.2 -2 -30.2C-3.1 -30.2 -4.1 -30.2 -5.2 -30.4C-5.8 -30.5 -5.9 -31.2 -5.8 -31.7C-5.6 -34.5 -5.3 -37.4 -5 -40.3C-4.6 -42.5 -4.5 -44.7 -4.6 -47C-4.9 -50.7 -4.5 -54.8 -1.6 -57.5C-1 -58.1 -0.5 -58.8 0.1 -59.4C0.1 -59.4 0.1 -59.4 0.1 -59.5C0.3 -59.9 0.4 -60.3 0.6 -60.7C0.7 -60.8 0.8 -60.8 0.9 -60.8C0.9 -60.8 0.9 -60.8 1 -60.8C1.2 -60.7 1.5 -60.5 1.7 -60.5C2.6 -60.1 3.3 -59.5 3.9 -58.7C4.3 -58.3 4.6 -57.8 4.9 -57.3C4.9 -57.2 4.9 -57.2 4.9 -57.2C4.9 -57.2 4.9 -57.1 5 -57.1C5 -57 5 -56.9 5.1 -56.9C5.4 -56.1 5.7 -55.3 6 -54.5C6.4 -53 6.9 -51.6 7.2 -50C7.3 -50 7.3 -49.9 7.3 -49.8C7.4 -49.5 7.4 -49.3 7.5 -49C7.7 -46.7 7.1 -44.5 6.9 -42.3Z" />
                <path className="shirt" d="M5.1 -56.9C5 -56.9 5 -57 5 -57.1C4.7 -57.7 4.3 -58.2 3.9 -58.7C3.3 -59.5 2.6 -60.1 1.7 -60.5C1.5 -60.5 1.2 -60.7 1 -60.8C0.9 -60.8 0.9 -60.8 0.9 -60.8C1 -61 1 -61.1 1.2 -61.1C1.2 -61.1 1.3 -61.1 1.4 -61.1C1.4 -61 1.5 -61 1.6 -60.9C1.8 -60.9 1.9 -60.8 2.1 -60.7C2.7 -60.3 3.3 -59.9 3.8 -59.5C4.1 -59.3 4.4 -59.1 4.6 -58.8C4.8 -58.6 4.9 -58.3 4.9 -58C5 -57.7 5 -57.3 5.1 -57C5.1 -57 5.1 -56.9 5.1 -56.9Z" />

                {/* DAD'S THROWING ARM: Dynamic Rock, Paper, Scissors Hand */}
                <g className="arm-throw">
                  <defs>
                    <clipPath id="wk-up-desk">
                      <path d="M-6.6 -59.4 H4.6 V-44.3 H-6.6 Z" />
                      <circle cx="-2.1" cy="-44.3" r="3" />
                    </clipPath>
                    <clipPath id="wk-lo-desk">
                      <path d="M-6.6 -44.3 H4.6 V-33.6 H-6.6 Z" />
                      <circle cx="-2.1" cy="-44.3" r="3" />
                      <circle cx="-2.6" cy="-33.6" r="1.9" />
                    </clipPath>
                  </defs>
                  <g className="arm" transform="translate(-0.1 -55.2)">
                    <g className="shoulder" transform="rotate(-54)">
                      <g transform="translate(0.1 55.2)">
                        <g clipPath="url(#wk-up-desk)">
                          <path className="coat-n" d="M2.6 -51.7C2.3 -50.4 1.9 -49 1.6 -47.6C1.4 -47 1.3 -46.5 1.2 -45.9C1 -45 0.9 -44.2 0.8 -43.4C0.7 -41.8 0.5 -40.1 0.4 -38.5L0.4 -36.4C0.4 -35.7 0.4 -35 0.4 -34.2C0.4 -33.9 0.4 -33.5 0.4 -33.1C0.4 -32.8 0.4 -32.5 0.2 -32.4C0.1 -32.3 -0.1 -32.2 -0.2 -32.2C-0.4 -32.2 -0.5 -32.1 -0.7 -32.1C-1.1 -32.1 -1.4 -32 -1.8 -32C-2.5 -31.9 -3.2 -31.9 -3.9 -32C-4 -32 -4 -32 -4 -32C-4.1 -32.8 -4.2 -33.5 -4.2 -34.3C-4.4 -35.6 -4.5 -37 -4.7 -38.3C-4.8 -39.5 -4.9 -40.8 -5 -42C-5.1 -42.3 -5.1 -42.6 -5.1 -42.9C-5.1 -43.7 -5 -44.4 -4.9 -45.1C-4.8 -46.5 -4.7 -47.9 -4.6 -49.4C-4.4 -50.7 -4.4 -52.1 -4 -53.4C-3.6 -54.6 -3.1 -55.7 -2.3 -56.6C-1.6 -57.5 -0.5 -58.1 0.6 -57.9C1.2 -57.8 1.7 -57.5 2 -57.1C2.4 -56.7 2.6 -56.2 2.7 -55.7C3.1 -54.4 2.9 -53 2.6 -51.7Z" />
                        </g>
                      </g>
                      <g transform="translate(-2 10.9)">
                        <g className="elbow" transform="rotate(-20)">
                          <g transform="translate(2.1 44.3)">
                            <g clipPath="url(#wk-lo-desk)">
                              <path className="coat-n" d="M2.6 -51.7C2.3 -50.4 1.9 -49 1.6 -47.6C1.4 -47 1.3 -46.5 1.2 -45.9C1 -45 0.9 -44.2 0.8 -43.4C0.7 -41.8 0.5 -40.1 0.4 -38.5L0.4 -36.4C0.4 -35.7 0.4 -35 0.4 -34.2C0.4 -33.9 0.4 -33.5 0.4 -33.1C0.4 -32.8 0.4 -32.5 0.2 -32.4C0.1 -32.3 -0.1 -32.2 -0.2 -32.2C-0.4 -32.2 -0.5 -32.1 -0.7 -32.1C-1.1 -32.1 -1.4 -32 -1.8 -32C-2.5 -31.9 -3.2 -31.9 -3.9 -32C-4 -32 -4 -32 -4 -32C-4.1 -32.8 -4.2 -33.5 -4.2 -34.3C-4.4 -35.6 -4.5 -37 -4.7 -38.3C-4.8 -39.5 -4.9 -40.8 -5 -42C-5.1 -42.3 -5.1 -42.6 -5.1 -42.9C-5.1 -43.7 -5 -44.4 -4.9 -45.1C-4.8 -46.5 -4.7 -47.9 -4.6 -49.4C-4.4 -50.7 -4.4 -52.1 -4 -53.4C-3.6 -54.6 -3.1 -55.7 -2.3 -56.6C-1.6 -57.5 -0.5 -58.1 0.6 -57.9C1.2 -57.8 1.7 -57.5 2 -57.1C2.4 -56.7 2.6 -56.2 2.7 -55.7C3.1 -54.4 2.9 -53 2.6 -51.7Z" />
                            </g>
                            <g transform="translate(-2.6 -39.5) scale(.82)">
                              {currentRound.dadSign === "paper" && (
                                <g className="throw is-paper">
                                  <path className="hand" d="M-3.4 7.4 q0 -1.6 1.7 -1.6 h3.6 q1.7 0 1.7 1.6 v5.4 q0 1.7 -1.7 1.7 h-3.6 q-1.7 0 -1.7 -1.7 z" />
                                  <path className="knuck" d="M-1.8 8.2 v3.6" />
                                  <path className="knuck" d="M0 8.2 v3.6" />
                                  <path className="knuck" d="M1.8 8.2 v3.6" />
                                </g>
                              )}
                              {currentRound.dadSign === "scissors" && (
                                <g className="throw is-scissors">
                                  <circle className="hand" cx="0" cy="9.6" r="2.3" />
                                  <path className="finger" d="M-.6 8.2 L-3.4 3.2" />
                                  <path className="finger" d="M1 8.4 L3.2 3.4" />
                                </g>
                              )}
                              {currentRound.dadSign === "rock" && (
                                <g className="throw is-rock">
                                  <circle className="hand" cx="0" cy="9.6" r="2.8" />
                                  <path className="knuck" d="M-1.6 8.2 v2.4" />
                                  <path className="knuck" d="M1.6 8.2 v2.4" />
                                </g>
                              )}
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>

            {/* DAUGHTER ("HER") */}
            <g className={`her ${isShooting ? "is-arm-bounce" : ""}`} transform="translate(445 350) scale(2.9)">
              <g className="daughter is-playing">
                <defs>
                  <clipPath id="dg-wrist-deskkid">
                    <path d="M-9 -10.35 H4 V6 H-9 Z" />
                    <circle cx="-5.79" cy="-10.35" r="1.15" />
                  </clipPath>
                </defs>
                <ellipse className="shadow" cx="1" cy="0" rx="12" ry="2" />

                {/* Skin & Limbs */}
                <path className="skin" d="M6.7 -26.3C6.7 -26.3 5.9 -23.4 6.1 -22C6.1 -21.9 6.2 -21.8 6.2 -21.6C6.5 -19.1 6.2 -16.1 5.6 -13.6C5.5 -13 5.4 -12.4 5.3 -11.8C5.3 -11.6 5.3 -11.5 5.3 -11.4C5.3 -11.2 5.2 -11.1 5.2 -11C5.2 -10.8 5.2 -10.7 5.2 -10.5C5.1 -10.1 5 -9.7 4.9 -9.3C4.9 -9.2 4.8 -9 4.8 -8.9C4.8 -8.7 4.7 -8.6 4.7 -8.4C4.7 -8.3 4.6 -8.1 4.6 -8C4.5 -7.6 4.4 -7.3 4.4 -6.9C4.2 -5.8 4 -4.7 3.8 -3.5C3.8 -3.4 3.7 -3.3 3.7 -3.1C3.7 -3 3.7 -2.9 3.7 -2.8C3.7 -2.8 4.5 -1.7 4.5 -1.7C4.9 -1.4 5.6 -1.3 5.6 -1C5.6 -0.8 5.5 -0.7 5.3 -0.6C5.3 -0.6 4.8 -0.5 4.6 -0.5C4.5 -0.5 4.2 -0.6 4.1 -0.6C3.9 -0.6 3.7 -0.7 3.6 -0.7C3.3 -0.9 2.9 -0.9 2.5 -0.9C2.5 -0.9 2 -0.8 1.8 -0.8C1.8 -0.7 1.3 -0.8 1.2 -0.9C1.1 -0.9 1.1 -1.6 1.1 -1.9C1.1 -1.9 1.1 -2.2 1.1 -2.2C1.1 -2.2 1.2 -2.5 1.2 -2.7C1.2 -2.8 1.2 -3 1.2 -3.2C1.2 -3.3 1.2 -3.5 1.2 -3.6C1.1 -4.7 0.8 -5.7 0.7 -6.8C0.7 -6.8 0.6 -7.5 0.6 -7.8C0.6 -7.9 0.6 -8 0.6 -8.1C0.6 -8.4 0.5 -8.7 0.5 -9C0.5 -9.2 0.5 -9.3 0.4 -9.5C0.4 -9.9 0.4 -10.4 0.4 -10.8C0.3 -11 0.3 -11.1 0.3 -11.2C0.2 -11.6 0.2 -12 0.1 -12.4C0.1 -12.7 0 -13.1 0 -13.4C0 -13.6 0 -13.8 -0.1 -14C-0.1 -13.8 -0.1 -13.6 -0.1 -13.4C-0.1 -13.1 -0.2 -12.8 -0.2 -12.5C-0.3 -12.1 -0.3 -11.7 -0.4 -11.3C-0.4 -11.1 -0.4 -11 -0.4 -10.9C-0.4 -10.7 -0.5 -10.6 -0.5 -10.4C-0.5 -9.8 -0.6 -9.3 -0.6 -8.7C-0.7 -8.6 -0.7 -8.4 -0.7 -8.3C-0.8 -7.9 -0.8 -7.5 -0.8 -7.1C-0.9 -7 -0.9 -6.9 -0.9 -6.7C-0.9 -6.7 -1 -5.6 -1 -5.1C-1.1 -4.9 -1.1 -4.7 -1.1 -4.6C-1.1 -4.4 -1.1 -4.3 -1.2 -4.2C-1.2 -4 -1.2 -3.9 -1.2 -3.7C-1.2 -3.3 -1.2 -2.9 -1.1 -2.5C-1.1 -2.2 -1.1 -2 -1.1 -1.9C-1.1 -1.6 -0.9 -1.3 -1 -1.1C-1.1 -1 -1.4 -0.8 -1.6 -0.8C-1.7 -0.8 -2.2 -0.8 -2.3 -0.9C-2.4 -0.9 -3.3 -1 -3.6 -0.7C-3.7 -0.7 -3.9 -0.7 -4.1 -0.6C-4.2 -0.6 -4.3 -0.6 -4.4 -0.6C-4.4 -0.6 -4.9 -0.5 -5.1 -0.6C-5.2 -0.6 -5.6 -0.8 -5.6 -1.1C-5.5 -1.4 -4.9 -1.4 -4.5 -1.8C-4.5 -1.8 -3.9 -2.5 -3.7 -2.8C-3.7 -2.8 -3.8 -3.3 -3.8 -3.6C-3.9 -3.7 -3.9 -3.8 -3.9 -3.9C-4.2 -4.9 -4.4 -5.9 -4.5 -6.9C-4.6 -7.4 -4.7 -7.9 -4.8 -8.5C-4.8 -8.6 -4.8 -8.7 -4.9 -8.9C-5 -9.6 -5.1 -10.3 -5.2 -11C-5.2 -11.2 -5.3 -11.3 -5.3 -11.5C-5.3 -11.6 -5.3 -11.7 -5.3 -11.8C-5.4 -12.2 -5.4 -12.6 -5.5 -13C-5.5 -13.2 -5.6 -13.5 -5.7 -13.8C-5.7 -14.1 -5.8 -14.5 -5.8 -14.8C-6.2 -16.9 -6.5 -19.2 -6.1 -21.2C-6.1 -21.2 -5.7 -22.5 -5.4 -23C-5.4 -23.1 -3.6 -25.6 -2.6 -27C-2.2 -27.5 -2 -28.2 -1.8 -28.8C-1.7 -29 -1.6 -29.3 -1.5 -29.5C-1 -30.5 0 -31.3 1.1 -31.8C2.7 -32.4 4.5 -32.3 5.7 -31.2C6.2 -30.8 6.5 -30.4 6.8 -29.8C7.2 -28.6 7 -27.4 6.7 -26.3Z" />

                {/* Dress & Sparkles */}
                <path className="dress" d="M8.5 -14.4C8.6 -14.3 8.2 -14.1 8 -14.1C8 -14.1 7.2 -13.9 6.9 -13.8C6.8 -13.8 6.7 -13.8 6.6 -13.7C6.5 -13.7 5.8 -13.6 5.5 -13.5C5.4 -13.5 4.8 -13.5 4.6 -13.4C4.5 -13.4 3.8 -13.3 3.4 -13.3C3.4 -13.3 3 -13.3 2.9 -13.3C2.9 -13.3 2.4 -13.3 2.3 -13.3C2.3 -13.3 0.1 -13.3 -0.9 -13.5C-0.9 -13.5 -1.1 -13.6 -1.2 -13.6C-1.2 -13.6 -1.4 -13.7 -1.5 -13.7C-1.7 -13.7 -1.9 -13.8 -2.2 -13.9C-2.2 -13.9 -2.8 -14.1 -3.1 -14.2C-3.6 -14.3 -4.2 -14.5 -4.7 -14.6C-4.8 -14.6 -5 -14.7 -5.1 -14.7C-5.9 -14.8 -6.7 -15 -7.5 -15.1C-7.5 -15.1 -8.4 -15.2 -8.7 -15.3C-8.8 -15.3 -8.7 -15.6 -8.7 -15.7C-8.6 -16.1 -8.4 -16.4 -8.3 -16.7C-8.2 -16.9 -8.2 -17 -8.1 -17.1C-8.1 -17.2 -7.6 -18.4 -7.4 -19C-7.4 -19 -7.3 -19.3 -7.3 -19.3C-7.7 -19.4 -8 -19.6 -8.4 -19.8C-8.6 -19.9 -8.9 -20.1 -9.1 -20.2C-9.1 -20.2 -8.5 -21.1 -8.2 -21.5C-8.1 -21.5 -7.3 -22.5 -6.8 -22.9C-6.4 -23.3 -5.9 -23.7 -5.5 -24.1C-5 -24.4 -4.6 -24.8 -4.2 -25.2C-4.1 -25.4 -4 -25.5 -3.9 -25.6C-3.8 -25.8 -3.6 -26.1 -3.5 -26.3C-3.1 -26.8 -2.8 -27.2 -2.5 -27.7C-2.3 -27.9 -2.2 -28.1 -2.1 -28.4C-2.1 -28.4 -2.1 -28.7 -2.1 -28.8C-2.1 -28.8 -1.9 -28.9 -1.8 -29C-1.4 -29.1 -1.1 -29.4 -0.7 -29.6C-0.6 -29.7 -0.4 -29.8 -0.3 -29.9C-0.2 -29.9 0.2 -30.2 0.2 -30.3C0.7 -30.7 1.1 -31.3 1.1 -31.9C1.1 -31.9 1.4 -32 1.5 -32C1.5 -32 1.8 -32.1 1.9 -32.1C1.9 -32.1 2.2 -31.7 2.4 -31.6C2.9 -31.3 3.5 -31.2 4.1 -31.3C4.5 -31.3 4.9 -31.5 5.2 -31.6C5.2 -31.6 5.5 -31.4 5.6 -31.4C5.6 -31.4 5.9 -31.3 5.9 -31.3C5.9 -31.3 5.4 -30.6 5.3 -30.3C5.2 -30 5.2 -29.6 5.1 -29.3C5.1 -29.3 5.1 -29 5.1 -28.9C5.1 -28.4 5.1 -27.8 5.3 -27.4C5.5 -26.7 6 -26 6.6 -25.6C6.6 -25.6 6.4 -24.4 6.3 -23.9C6.3 -23.9 6.3 -23.1 6.3 -22.8C6.4 -22.3 6.5 -21.8 6.7 -21.3C6.9 -20.8 7.1 -20.3 7.4 -19.8C7.6 -19.4 7.9 -18.9 8.2 -18.5C8.2 -18.5 8.5 -18.1 8.6 -18C8.6 -18 7.8 -17.7 7.4 -17.7C7.4 -17.6 7.5 -17.5 7.5 -17.4C7.6 -17.1 7.7 -16.8 7.8 -16.6C7.8 -16.5 8.1 -15.6 8.3 -15.2C8.4 -14.9 8.5 -14.7 8.5 -14.4Z" />
                <path className="dress-d" d="M2.9 -13.3C1.5 -13.2 0.2 -13.3 -1.2 -13.6C-1.8 -13.7 -2.5 -14 -3.1 -14.2C-3.7 -14.4 -4.4 -14.5 -5.1 -14.7C-6.3 -14.9 -7.5 -15.1 -8.7 -15.3C-8.4 -14.7 -7.6 -14.4 -7.1 -14.2C-3 -11.9 4.7 -11.3 8.6 -14.2C8 -14.1 7.4 -13.9 6.9 -13.8C5.6 -13.5 4.2 -13.3 2.9 -13.3Z" />
                <path className="spark" d="M1.4 -30.6C1.4 -30.6 1.8 -31.9 1.8 -31.7C1.8 -31.7 1.8 -30.6 1.8 -30.6C1.8 -30.6 2.7 -30.5 2.7 -30.5C2.9 -30.5 1.8 -30.3 1.8 -30.3C1.8 -30.3 1.4 -29.1 1.4 -29.3C1.4 -29.3 1.4 -30.3 1.4 -30.3C1.4 -30.3 0.5 -30.6 0.5 -30.6C0.3 -30.6 1.4 -30.6 1.4 -30.6Z M4.8 -20C4.8 -20 5.1 -20.8 5.1 -20.7C5.1 -20.7 5.1 -19.9 5.1 -19.9C5.1 -19.9 5.7 -19.9 5.7 -19.9C5.9 -19.9 5.1 -19.7 5.1 -19.7C5.1 -19.7 4.8 -18.9 4.8 -19C4.8 -19 4.8 -19.8 4.8 -19.8C4.8 -19.8 4.1 -19.9 4.1 -19.9C4 -19.9 4.8 -20 4.8 -20Z" />

                {/* Shoes & Bows */}
                <path className="shoe" d="M1.9 -0.7C0.8 -0.6 0.9 -1.1 1 -1.7C1 -2 1.1 -2.2 1.1 -2.5C1.8 -1.9 3.8 -1 4.7 -1.7C5 -1.5 5.4 -1.4 5.6 -1.1C5.6 -1.1 2.4 -0.7 1.9 -0.7Z M-1.9 -0.7C-0.8 -0.6 -0.9 -1.1 -1 -1.7C-1 -2 -1.1 -2.2 -1.1 -2.5C-1.9 -1.9 -3.9 -1 -4.7 -1.7C-5 -1.5 -5.4 -1.4 -5.6 -1.1C-5.6 -1.1 -2.4 -0.7 -1.9 -0.7Z" />
                <path className="shoe-bow" d="M5.6 -1.6C5.3 -1.6 5.1 -1.7 4.8 -1.7C4.9 -1.8 4.9 -1.8 5 -1.9C5 -2.1 5 -2.4 4.8 -2.5C4.6 -2.6 4.5 -2.4 4.4 -2.2C4.4 -2 4.4 -1.9 4.4 -1.8C4.2 -1.9 4.1 -1.9 3.9 -1.9C3.7 -2 3.5 -1.9 3.4 -1.6C3.4 -1.4 3.7 -1.3 3.9 -1.3C4 -1.3 4.1 -1.3 4.2 -1.3C4.3 -1.3 4.3 -1.3 4.4 -1.4C4.4 -1.4 4.4 -1.1 4.4 -1.1C4.4 -0.9 4.4 -0.8 4.4 -0.7C4.4 -0.6 4.4 -0.5 4.5 -0.5C4.5 -0.5 4.6 -0.6 4.6 -0.6C4.6 -0.9 4.6 -1.1 4.6 -1.3C4.6 -1.4 4.6 -1.4 4.6 -1.5C4.9 -1.5 5.2 -1.4 5.6 -1.4C5.6 -1.4 5.7 -1.5 5.7 -1.5C5.7 -1.6 5.6 -1.6 5.6 -1.6Z" />

                {/* Hair, Crown & Face */}
                <path className="hair" d="M17.5 -37C17.4 -37.3 17.2 -37.4 17 -37.4C17 -37.5 16.4 -37.8 16.1 -37.6C15.9 -37.8 15.7 -37.8 15.5 -37.8C15.5 -37.8 15.8 -38.3 15.7 -38.5C15.6 -38.6 15.2 -38.8 15.1 -38.8C15 -38.8 14.9 -39.3 14.9 -39.4C14.9 -39.3 15.6 -39.2 15.7 -39.4C15.8 -39.6 15.9 -39.9 15.9 -40.2C15.9 -40.3 16.2 -39.7 16.1 -39.5C16 -39.3 16.6 -39.8 16.5 -40.1C16.5 -40.3 16.4 -40.8 16.4 -40.9C16.4 -41.1 15.8 -41.5 15.7 -41.5C15.7 -41.5 15.2 -41.6 15 -41.5C15 -41.5 15.2 -41.9 15.2 -42.1C15.2 -41.9 15.9 -42 16 -42.2C16 -42.5 16 -42.8 15.8 -43C16 -43.1 16 -42.3 16.3 -42.3C16.5 -42.2 17 -42.3 17 -42.4C17.2 -42.6 17.3 -42.9 17.2 -43.2C17.1 -43.4 16.9 -43.5 16.6 -43.4C16.6 -43.4 16.2 -43.5 16 -43.5C15.8 -43.4 15.3 -43.3 15.2 -43.3C15 -43.2 15.1 -44 15 -44.1C15 -44.1 15.7 -43.8 15.6 -43.7C15.6 -43.6 15.5 -44.3 15.3 -44.3C15.3 -44.4 15.7 -44.5 15.9 -44.6C16 -44.7 17.1 -45.4 17.1 -45.9C17.1 -46.3 17 -47.1 16.5 -47.1C16.1 -47.1 15.9 -46.7 15.9 -46.4C15.8 -46.4 15.4 -46.1 15.4 -45.9C15.4 -45.8 14.7 -45.4 14.8 -45.2C14.9 -45 15 -44.6 15 -44.5C14.9 -44.4 14.8 -45.8 14.2 -45.5C14 -45.4 13.8 -45.3 13.6 -45.3C13.7 -45.3 14.2 -45.6 14.2 -45.6C14.3 -45.6 14.8 -45.9 14.8 -46C14.9 -46.1 15 -47 14.7 -47.1C14.6 -47.2 15.2 -47.5 15.3 -47.4C15.4 -47.3 14.8 -47.8 14.5 -47.7C14.3 -47.5 14 -47.2 13.9 -46.9C13.9 -46.9 13.9 -47.5 13.9 -47.6C13.9 -47.7 13.1 -47.9 12.8 -47.7" />
                <path className="eye" d="M1 -40.9C1 -40.8 1.1 -40.7 1.2 -40.7C1.3 -40.6 1.4 -40.6 1.5 -40.5C1.6 -40.4 1.7 -40.4 1.8 -40.4C1.9 -40.3 2 -40.3 2.1 -40.3C2.1 -40.4 2.1 -40.6 2.1 -40.7C2 -40.8 2 -41 1.9 -41.1C1.8 -41.2 1.6 -41.3 1.5 -41.3C1.4 -41.4 1.2 -41.4 1.1 -41.3C1 -41.3 1 -41.3 0.9 -41.3C0.9 -41.3 0.8 -41.2 0.8 -41.2C0.8 -41.1 0.9 -41 1 -40.9Z" />
                <path className="mouth" d="M1 -36.2C1 -36.2 0.8 -36 0.7 -35.9C0.4 -35.8 0.2 -35.8 0.1 -35.9C0 -36 -0.1 -36.1 -0.2 -36.2C-0.2 -36.2 -0.2 -36.3 -0.2 -36.3C-0.2 -36.3 -0.3 -36.6 -0.3 -36.7C-0.2 -36.7 -0.1 -37.2 0 -37.3C0 -37.3 0.1 -37.4 0.2 -37.4C0.2 -37.4 0.3 -37.4 0.3 -37.4C0.4 -37.4 0.4 -37.4 0.5 -37.4C0.6 -37.4 0.8 -37.3 0.9 -37.2C0.9 -37.2 1 -37.1 1.1 -36.9C1.1 -36.9 1.1 -36.9 1.1 -36.8C1.1 -36.6 1.1 -36.4 1 -36.2Z" />

                {/* DAUGHTER'S THROWING ARM: Dynamic Rock, Paper, Scissors Hand */}
                <g className="arm-throw">
                  <g transform="translate(-0.21 -29.13) rotate(-74)">
                    <g clipPath="url(#dg-wrist-deskkid)">
                      <path className="skin" d="M1.9 -1.2C1.8 -0.1 0.8 0.5 -0.2 0.6C-0.4 0.6 -0.6 0.6 -0.8 0.6C-1 0.5 -1.3 0.4 -1.6 0.3C-3 -0.2 -4.3 -1.4 -5.2 -2.4C-6.1 -3.1 -7 -3.9 -7.1 -5.1C-7.2 -6.7 -6.9 -8.3 -6.7 -9.8C-6.6 -10.1 -6.6 -10.5 -6.6 -10.8C-6.6 -10.8 -6.6 -11.3 -6.7 -11.4C-7 -12.1 -7.5 -12.8 -7.4 -13.6C-7.2 -14.1 -7.1 -13.4 -7 -13.2C-7 -13.4 -7 -14.7 -6.6 -14.1C-6.6 -13.8 -6.6 -13.6 -6.6 -13.4C-6.5 -13.5 -6.5 -14.2 -6.2 -14C-6 -13.6 -6.1 -13 -6 -12.5C-5.8 -12.3 -5.6 -12.2 -5.4 -12C-5.2 -13.3 -5 -13.5 -4.7 -12.1C-4.6 -11.6 -4.4 -11.1 -4.5 -10.6C-4.6 -9.5 -4.5 -8.2 -4.4 -6.6C-4.3 -6.3 -4.3 -6 -4.3 -5.8C-4.3 -5.8 -4 -5.6 -3.9 -5.5C-3.8 -5.5 -3.6 -5.4 -3.5 -5.3C-3.3 -5.2 -3.1 -5.1 -2.9 -5C-2.7 -5 -2.6 -4.9 -2.4 -4.8C-2 -4.6 -1.6 -4.4 -1.2 -4.3C-0.9 -4.2 -0.7 -4.1 -0.5 -4C0.1 -3.7 0.8 -3.2 1.3 -2.6C1.7 -2.2 1.9 -1.7 1.9 -1.2Z" />
                    </g>
                    <g transform="translate(-5.79 -10.35) rotate(180) scale(.46) translate(0 -5.2)">
                      {currentRound.herSign === "scissors" && (
                        <g className="throw is-scissors">
                          <circle className="hand" cx="0" cy="9.6" r="2.3" />
                          <path className="finger" d="M-.6 8.2 L-3.4 3.2" />
                          <path className="finger" d="M1 8.4 L3.2 3.4" />
                        </g>
                      )}
                      {currentRound.herSign === "rock" && (
                        <g className="throw is-rock">
                          <circle className="hand" cx="0" cy="9.6" r="2.8" />
                          <path className="knuck" d="M-1.6 8.2 v2.4" />
                          <path className="knuck" d="M1.6 8.2 v2.4" />
                        </g>
                      )}
                      {currentRound.herSign === "paper" && (
                        <g className="throw is-paper">
                          <path className="hand" d="M-3.4 7.4 q0 -1.6 1.7 -1.6 h3.6 q1.7 0 1.7 1.6 v5.4 q0 1.7 -1.7 1.7 h-3.6 q-1.7 0 -1.7 -1.7 z" />
                          <path className="knuck" d="M-1.8 8.2 v3.6" />
                          <path className="knuck" d="M0 8.2 v3.6" />
                          <path className="knuck" d="M1.8 8.2 v3.6" />
                        </g>
                      )}
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>

          {/* ============================================================
              6. FOREGROUND: AREA RUG, POTTED MONSTERA, BOOKSTACK & BAG
              ============================================================ */}
          <g className="fore">
            <path className="rug" d="M352 350 h520 l34 16 H318 z" />
            <path className="ln rug-ln" d="M366 358 h488" />

            {/* Large Plant */}
            <g className="plant plant-sway">
              <g className="fronds">
                <g>
                  <path className="ln frond f0" d="M232 304 q-28 -26 -39 -56" />
                  <ellipse className="leaf" cx="193" cy="248" rx="15" ry="9" transform="rotate(-30 193 248)" />
                </g>
                <g>
                  <path className="ln frond f1" d="M232 304 q-12.6 -26 -17.55 -65" />
                  <ellipse className="leaf" cx="214.45" cy="239" rx="15" ry="9" transform="rotate(-13.5 214.45 239)" />
                </g>
                <g>
                  <path className="ln frond f2" d="M232 304 q7 -26 9.75 -74" />
                  <ellipse className="leaf" cx="241.75" cy="230" rx="15" ry="9" transform="rotate(7.5 241.75 230)" />
                </g>
                <g>
                  <path className="ln frond f3" d="M232 304 q28 -26 39 -83" />
                  <ellipse className="leaf" cx="271" cy="221" rx="15" ry="9" transform="rotate(30 271 221)" />
                </g>
              </g>
              <path className="pot" d="M204 356 h56 l-9 -46 h-38 z" />
              <path className="ln pot-ln" d="M208 320 h48" />
            </g>

            {/* Stack of Technical Books */}
            <g className="stack">
              <path className="bk-a" d="M596 350 h60 v-11 h-60 z" />
              <path className="bk-b" d="M602 339 h52 v-10 h-52 z" />
              <path className="bk-c" d="M600 329 h56 v-9 h-56 z" />
            </g>

            {/* Leather Satchel / Bag */}
            <g className="bag">
              <path className="bag-body" d="M904 352 v-56 q0 -14 15 -14 h32 q15 0 15 14 v56 z" />
              <path className="ln flap" d="M904 300 h62" />
              <path className="ln strap" d="M919 282 q16 -21 33 0" />
            </g>
          </g>
        </svg>
      </div>

      {/* Tactile Scene Caption Bar */}
      <div className="studio-caption-bar">
        <div className="caption-text-group">
          <span className="caption-status-dot" />
          <span className="caption-round-badge">
            {currentRound.dadSign.toUpperCase()} VS {currentRound.herSign.toUpperCase()}
          </span>
          <span className="caption-detail">{currentRound.caption}</span>
        </div>

        <div className="caption-meta mono">
          <span>MAC // &ldquo;SHIP THE THING. THEN MAKE IT WORTH KEEPING.&rdquo;</span>
        </div>
      </div>
    </div>
  );
}
