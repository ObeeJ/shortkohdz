"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function WelcomeIntro() {
  const [visible, setVisible] = useState(false);
  const [statusText, setStatusText] = useState("INITIALIZING");

  useEffect(() => {
    // Check session storage to show once per session
    const seen = sessionStorage.getItem("skd_welcome_seen");
    if (!seen) {
      setVisible(true);

      const t1 = setTimeout(() => {
        setStatusText("READY");
      }, 1200);

      const t2 = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("skd_welcome_seen", "true");
      }, 2400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, []);

  const handleSkip = () => {
    setVisible(false);
    sessionStorage.setItem("skd_welcome_seen", "true");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }}
          onClick={handleSkip}
          className="welcome-screen"
          aria-hidden="true"
        >
          <div className="welcome-inner">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="welcome-telemetry mono"
            >
              <span className="welcome-dot" />
              <span>DIAL TONE // *SHORTKOHDZ#</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="welcome-word"
            >
              Welcome<span className="welcome-accent">.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="welcome-bar-wrap"
            >
              <div className="welcome-progress-bar" />
              <div className="welcome-footer mono">
                <span>SIGNAL: LOCKED</span>
                <span>STATUS: {statusText}</span>
              </div>
            </motion.div>
          </div>

          <span className="welcome-skip mono">TAP TO ENTER →</span>

          <style jsx>{`
            .welcome-screen {
              position: fixed;
              inset: 0;
              z-index: 9999;
              background: var(--ink);
              color: var(--paper);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              user-select: none;
              overflow: hidden;
            }

            .welcome-inner {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              gap: 20px;
              padding: 24px;
              max-width: 480px;
              width: 100%;
            }

            .welcome-telemetry {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              font-size: 11px;
              letter-spacing: 0.14em;
              color: var(--faint);
              padding: 4px 12px;
              background: var(--ink-2);
              border: 1px solid var(--line);
            }

            .welcome-dot {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: var(--accent);
              box-shadow: 0 0 8px var(--accent);
              animation: welcome-pulse 1.4s infinite ease-in-out;
            }

            @keyframes welcome-pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(0.7); opacity: 0.4; }
            }

            .welcome-word {
              font-family: var(--font-display), "Space Grotesk", sans-serif;
              font-size: clamp(52px, 12vw, 92px);
              font-weight: 700;
              letter-spacing: -0.04em;
              line-height: 1;
              margin: 0;
              color: var(--paper);
            }

            .welcome-accent {
              color: var(--accent);
            }

            .welcome-bar-wrap {
              width: 100%;
              max-width: 280px;
              margin-top: 12px;
            }

            .welcome-progress-bar {
              height: 2px;
              width: 100%;
              background: var(--line);
              position: relative;
              overflow: hidden;
            }

            .welcome-progress-bar::after {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 0%;
              background: var(--accent);
              animation: welcome-fill 2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            }

            @keyframes welcome-fill {
              0% { width: 0%; }
              50% { width: 68%; }
              100% { width: 100%; }
            }

            .welcome-footer {
              display: flex;
              justify-content: space-between;
              font-size: 9.5px;
              letter-spacing: 0.1em;
              color: var(--faint);
              margin-top: 8px;
            }

            .welcome-skip {
              position: absolute;
              bottom: 32px;
              font-size: 10px;
              letter-spacing: 0.12em;
              color: var(--faint);
              opacity: 0.6;
              transition: opacity 0.2s;
            }

            .welcome-screen:hover .welcome-skip {
              opacity: 1;
              color: var(--accent);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
