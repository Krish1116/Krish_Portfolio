import { useState, useEffect, useRef } from "react";

export default function SystemStatus() {
  const [isOpen, setIsOpen] = useState(false);
  const [commandInput, setCommandInput] = useState("");
  const [history, setHistory] = useState([
    { text: "[SYSTEM CORE] Initialized Antigravity-v2.0...", type: "sys" },
    { text: "[STATUS] MERN Engine Online & Ready.", type: "sys" },
    { text: 'Type "help" to see available command parameters.', type: "info" },
  ]);
  const [currentTime, setCurrentTime] = useState("");
  const [ping, setPing] = useState(42);
  const [mounted, setMounted] = useState(false);
  const historyEndRef = useRef(null);

  // Sound Synth Click feedback
  const playClickSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(750, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.012, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  };

  // Clock & Ping updates
  useEffect(() => {
    setMounted(true);

    const updateStats = () => {
      // Ahmedabad, India Local Time
      const timeStr = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeStr);

      // Fluctuating server ping simulation
      setPing((prev) => {
        const diff = Math.floor(Math.random() * 9) - 4;
        return Math.max(30, Math.min(60, prev + diff));
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll terminal log
  useEffect(() => {
    if (historyEndRef.current) {
      historyEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  // Handle Command Submissions
  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    playClickSound();
    const newHistory = [
      ...history,
      { text: `visitor@krishna:~$ ${commandInput}`, type: "input" },
    ];

    switch (cmd) {
      case "help":
        newHistory.push({
          text: "Available Commands:\n  [about, skills, experience, projects, contact] - Scroll to section\n  [clear] - Clear terminal log\n  [lofi]  - Toggle lofi background music\n  [hack]  - Trigger system core matrix breach\n  [ping]  - Check actual connection latency",
          type: "info",
        });
        break;
      case "about":
      case "skills":
      case "experience":
      case "projects":
      case "contact":
        newHistory.push({
          text: `Navigating to #${cmd} section...`,
          type: "success",
        });
        setTimeout(() => {
          const el = document.getElementById(cmd);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
        break;
      case "clear":
        setHistory([]);
        setCommandInput("");
        return;
      case "ping":
        newHistory.push({
          text: `PING core-node.krishna.dev: 64 bytes. time=${ping}ms ttl=56 status=ACTIVE`,
          type: "success",
        });
        break;
      case "lofi":
        // Find lofi button inside Hero component and click it
        const lofiBtn = document.querySelector(".audio-music-container button");
        if (lofiBtn) {
          lofiBtn.click();
          newHistory.push({
            text: "Toggled lofi music player core states.",
            type: "success",
          });
        } else {
          newHistory.push({
            text: "Error: Ambient Music Player not found in viewport.",
            type: "err",
          });
        }
        break;
      case "hack":
        newHistory.push({
          text: "INITIALIZING QUANTUM BREACH PROTOCOL...",
          type: "err",
        });
        newHistory.push({
          text: "01001000 01000001 01000011 01001011...",
          type: "err",
        });
        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            {
              text: "WARNING: INTUSION DETECTED! SHIELDING ACTIVE.",
              type: "err",
            },
            {
              text: "Access Denied: Krishna's developer defense core is too strong!",
              type: "err",
            },
          ]);
        }, 600);
        break;
      default:
        newHistory.push({
          text: `bash: command not found: ${cmd}. Type "help" for a list of diagnostics.`,
          type: "err",
        });
    }

    setHistory(newHistory);
    setCommandInput("");
  };

  return (
    <>
      {/* Floating pulse status badge - Only render after hydration */}
      {mounted && (
        <div
          onClick={() => {
            playClickSound();
            setIsOpen(!isOpen);
          }}
          className="sys-status-badge"
          title="Open interactive Developer Terminal"
        >
          <span className="pulse-dot" />
          <span className="status-lbl">
            {isOpen ? "[CLOSE CORE CONSOLE]" : "[CORE STATUS: ONLINE]"}
          </span>
        </div>
      )}

      {/* Retro Glass Terminal Panel */}
      {isOpen && (
        <div className="sys-terminal-panel">
          {/* Header Bar */}
          <div className="terminal-hdr">
            <div className="window-dots">
              <span
                className="dot dot-close"
                onClick={() => setIsOpen(false)}
              />
              <span className="dot dot-min" onClick={() => setIsOpen(false)} />
              <span className="dot dot-max" />
            </div>
            <span className="terminal-title">krishna-system-core.sh</span>
          </div>

          {/* Telemetry Stats Panel */}
          {mounted && (
            <div className="terminal-telemetry">
              <div className="tel-item">
                <span className="tel-lbl">PING:</span>
                <span
                  className="tel-val"
                  style={{ color: ping > 50 ? "#f43f5e" : "#00ffd1" }}
                >
                  {ping}ms
                </span>
              </div>
              <div className="tel-item">
                <span className="tel-lbl">TIME (IST):</span>
                <span className="tel-val">{currentTime || "--:--:--"}</span>
              </div>
            </div>
          )}

          {/* Output log area */}
          <div className="terminal-logs">
            {history.map((log, index) => (
              <div key={index} className={`log-line type-${log.type}`}>
                {log.text}
              </div>
            ))}
            <div ref={historyEndRef} />
          </div>

          {/* Terminal Input Prompter */}
          <form onSubmit={handleCommand} className="terminal-prompt-form">
            <span className="prompt-lead">visitor@krishna:~$</span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="Type help..."
              className="terminal-input-node"
              autoFocus
            />
          </form>
        </div>
      )}

      {/* Core styling overrides */}
      <style>{`
        .sys-status-badge {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          z-index: 500;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(16, 22, 34, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border);
          border-radius: 50px;
          padding: 10px 20px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }
        [data-theme="light"] .sys-status-badge {
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }
        .sys-status-badge:hover {
          color: var(--accent);
          border-color: rgba(var(--accent-rgb), 0.4);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px var(--accent-glow);
        }
        [data-theme="light"] .sys-status-badge:hover {
          box-shadow: 0 10px 25px rgba(255, 75, 140, 0.15);
        }
        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981, 0 0 20px #10b981;
          animation: pulse-green 2s infinite;
        }
        @keyframes pulse-green {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
        }

        .sys-terminal-panel {
          position: fixed;
          bottom: 5.5rem;
          left: 2rem;
          z-index: 500;
          width: 360px;
          max-width: calc(100vw - 4rem);
          height: 400px;
          background: rgba(5, 8, 14, 0.92);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(var(--accent-rgb), 0.25);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(var(--accent-rgb), 0.05);
          overflow: hidden;
          font-family: var(--font-mono);
          animation: terminalOpen 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        [data-theme="light"] .sys-terminal-panel {
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(255, 75, 140, 0.2);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08), 0 0 30px rgba(255, 75, 140, 0.02);
        }
        @keyframes terminalOpen {
          from { opacity: 0; transform: translateY(15px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .terminal-hdr {
          height: 38px;
          background: rgba(16, 22, 34, 0.95);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          padding: 0 15px;
          position: relative;
        }
        [data-theme="light"] .terminal-hdr {
          background: rgba(243, 244, 253, 0.95);
        }
        .window-dots {
          display: flex;
          gap: 6px;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
          cursor: pointer;
        }
        .dot-close { background: #ef4444; }
        .dot-min { background: #eab308; }
        .dot-max { background: #22c55e; }
        .terminal-title {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px;
          color: var(--text-dim);
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .terminal-telemetry {
          display: flex;
          justify-content: space-between;
          padding: 8px 15px;
          background: rgba(16, 22, 34, 0.5);
          border-bottom: 1px dotted var(--border);
          font-size: 10px;
        }
        [data-theme="light"] .terminal-telemetry {
          background: rgba(243, 244, 253, 0.5);
        }
        .tel-lbl { color: var(--text-dim); margin-right: 5px; }
        .tel-val { color: var(--text); font-weight: bold; }

        .terminal-logs {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          font-size: 11px;
          line-height: 1.6;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .log-line {
          white-space: pre-wrap;
          word-break: break-all;
        }
        .type-sys { color: var(--text-dim); }
        .type-info { color: #94a3b8; }
        .type-input { color: var(--text); }
        .type-success { color: var(--accent); }
        .type-err { color: #f43f5e; }

        .terminal-prompt-form {
          display: flex;
          align-items: center;
          padding: 12px 15px;
          background: rgba(16, 22, 34, 0.95);
          border-top: 1px solid var(--border);
          gap: 8px;
        }
        [data-theme="light"] .terminal-prompt-form {
          background: rgba(243, 244, 253, 0.95);
        }
        .prompt-lead {
          font-size: 11px;
          color: var(--accent);
          white-space: nowrap;
        }
        .terminal-input-node {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text);
          font-family: var(--font-mono);
          font-size: 11px;
          caret-color: var(--accent);
        }

        @media (max-width: 640px) {
          .sys-status-badge {
            bottom: 1.25rem;
            left: 1.25rem;
            padding: 8px 16px;
            font-size: 10px;
          }
          .sys-terminal-panel {
            bottom: 4.5rem;
            left: 1.25rem;
            width: calc(100vw - 2.5rem);
            height: 350px;
          }
        }
      `}</style>
    </>
  );
}
