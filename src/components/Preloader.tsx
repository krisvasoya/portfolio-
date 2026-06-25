import React, { useEffect, useState, useCallback } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [statusText, setStatusText] = useState('ESTABLISHING NEURAL LINK...');

  const triggerCollapse = useCallback(() => {
    setIsCollapsed(true);
    setTimeout(() => {
      onComplete();
    }, 600); // Wait for the collapse animation to finish
  }, [onComplete]);

  useEffect(() => {
    // Increment progress with organic speed variations
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Random increment to simulate natural speed ups/slow downs
        const increment = Math.floor(Math.random() * 8) + 2;
        const next = Math.min(prev + increment, 100);
        
        // Dynamically change status messages based on progress
        if (next < 30) {
          setStatusText('SYNCING PHOSPHOR BEAMS...');
        } else if (next < 65) {
          setStatusText('DECODING GRID FREQUENCIES...');
        } else if (next < 90) {
          setStatusText('CALIBRATING VOLUMETRIC DEFLECTION...');
        } else {
          setStatusText('TRANSMISSION READY.');
        }
        
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Trigger TV shut-off collapse when progress reaches 100%
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        triggerCollapse();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, triggerCollapse]);

  // Skip preloader on Spacebar or Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        triggerCollapse();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerCollapse]);

  return (
    <div className={`tv-preloader ${isCollapsed ? 'tv-collapsed' : ''}`}>
      <style>{`
        .tv-preloader {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #151311;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: 'Space Grotesk', sans-serif;
          transition: background 0.4s ease;
        }
        
        .tv-preloader-screen {
          width: 85%;
          max-width: 700px;
          aspect-ratio: 4/3;
          background: #000;
          border: 24px solid #1f1a17;
          border-radius: 40px;
          box-shadow: 
            0 0 0 2px #2d2520,
            0 25px 50px -12px rgba(0,0,0,0.8),
            inset 0 0 80px rgba(0,0,0,0.95);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 600px) {
          .tv-preloader-screen {
            width: 95%;
            border-width: 12px;
            border-radius: 20px;
          }
        }
        
        /* CRT scanlines and screen reflection inside preloader */
        .tv-preloader-screen::before {
          content: ' ';
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
          background-size: 100% 3px, 6px 100%;
          z-index: 5;
          pointer-events: none;
        }

        .tv-preloader-screen::after {
          content: ' ';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.85) 100%), radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 45%);
          z-index: 6;
          pointer-events: none;
        }
        
        /* SMPTE Color Bars glitch backplane */
        .tv-color-bars {
          position: absolute;
          inset: 0;
          display: flex;
          opacity: 0.08;
          z-index: 1;
        }
        
        .tv-bar {
          flex: 1;
          height: 100%;
        }
        .tv-bar-white { background: #fbfbfb; }
        .tv-bar-yellow { background: #d4af37; }
        .tv-bar-cyan { background: #00a8a8; }
        .tv-bar-green { background: #00a800; }
        .tv-bar-magenta { background: #a800a8; }
        .tv-bar-red { background: #a80000; }
        .tv-bar-blue { background: #0000a8; }
        
        /* TV Static Noise Background */
        .tv-static {
          position: absolute;
          inset: 0;
          opacity: 0.12;
          z-index: 2;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 100px 100px;
          animation: static-flicker 0.15s infinite linear;
        }

        @keyframes static-flicker {
          0% { background-position: 0px 0px; }
          50% { background-position: 5px 10px; }
          100% { background-position: -10px -5px; }
        }
        
        /* Loading Information Panel */
        .tv-info-panel {
          z-index: 10;
          text-align: center;
          color: #33ff33;
          text-shadow: 0 0 8px rgba(51, 255, 51, 0.6);
          font-family: 'VT323', monospace;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 80%;
        }

        .tv-title {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.05em;
          color: #33ff33;
          margin: 0;
          animation: glitch-drift 3s infinite alternate;
        }
        
        .tv-status {
          font-size: clamp(0.9rem, 2.5vw, 1.2rem);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          min-height: 1.5em;
        }
        
        /* Bar Indicator */
        .tv-progress-container {
          width: 100%;
          border: 1px solid rgba(51, 255, 51, 0.4);
          background: rgba(0, 0, 0, 0.4);
          height: 14px;
          position: relative;
          padding: 2px;
        }
        
        .tv-progress-fill {
          height: 100%;
          background: #33ff33;
          box-shadow: 0 0 10px #33ff33;
          transition: width 0.15s ease-out;
        }
        
        .tv-progress-text {
          font-size: 1.4rem;
          font-weight: bold;
          margin-top: 0.5rem;
        }
        
        .tv-instructions {
          margin-top: 1rem;
          font-size: 0.9rem;
          opacity: 0.65;
          animation: blink 1.6s infinite;
        }
        
        /* TV Power-Off Animation */
        .tv-collapsed .tv-preloader-screen {
          animation: crt-off 0.5s ease-out forwards;
        }
        
        @keyframes crt-off {
          0% {
            transform: scale(1);
            filter: brightness(1.5) contrast(1.2);
          }
          35% {
            transform: scaleY(0.01) scaleX(1);
            filter: brightness(2.5) contrast(1.5);
            background: #fff;
          }
          70% {
            transform: scaleY(0.01) scaleX(0.01);
            filter: brightness(5) contrast(2);
            background: #fff;
            box-shadow: 0 0 30px #fff;
          }
          100% {
            transform: scale(0);
            opacity: 0;
            filter: brightness(0);
            background: #000;
          }
        }

        @keyframes blink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }

        @keyframes glitch-drift {
          0% { transform: skew(0deg); }
          95% { transform: skew(0deg); }
          96% { transform: skew(-3deg); }
          97% { transform: skew(2deg); }
          98% { transform: skew(0deg); }
        }
      `}</style>

      <div className="tv-preloader-screen">
        {/* Colors bar graphic layer */}
        <div className="tv-color-bars">
          <div className="tv-bar tv-bar-white"></div>
          <div className="tv-bar tv-bar-yellow"></div>
          <div className="tv-bar tv-bar-cyan"></div>
          <div className="tv-bar tv-bar-green"></div>
          <div className="tv-bar tv-bar-magenta"></div>
          <div className="tv-bar tv-bar-red"></div>
          <div className="tv-bar tv-bar-blue"></div>
        </div>

        {/* Static overlay */}
        <div className="tv-static"></div>

        {/* Text UI info panel */}
        <div className="tv-info-panel">
          <h1 className="tv-title">SIGNAL LINK ESTABLISHED</h1>
          
          <div className="tv-status">
            {statusText}
          </div>
          
          <div className="tv-progress-container">
            <div className="tv-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          
          <div className="tv-progress-text">
            SYSTEM BOOT: {progress}%
          </div>
          
          <div className="tv-instructions">
            [ PRESS SPACEBAR TO BYPASS CALIBRATION ]
          </div>
        </div>
      </div>
    </div>
  );
};
