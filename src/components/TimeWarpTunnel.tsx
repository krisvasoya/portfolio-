import React, { useEffect, useRef, useState } from 'react';

interface TimeWarpTunnelProps {
  onComplete: () => void;
  isActive: boolean;
}

export const TimeWarpTunnel: React.FC<TimeWarpTunnelProps> = ({ onComplete, isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentYear, setCurrentYear] = useState(2026);
  const [statusText, setStatusText] = useState('TEMPORAL LINK ESTABLISHED');

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Star data structure
    const numStars = 220;
    const stars: Array<{ x: number; y: number; z: number; prevZ: number; color: string }> = [];

    // Curated color palette (Greens to CRT yellow-green glow)
    const greenPalette = [
      '#33FF33', // Primary green
      '#88FF88', // Light green
      '#00AA00', // Burnt green
      '#007700', // Deep green
      '#DDFFFF', // Pale green-white
    ];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 1000,
        z: Math.random() * 1000,
        prevZ: 0,
        color: greenPalette[Math.floor(Math.random() * greenPalette.length)],
      });
    }

    let speed = 2; // Starts moving, then accelerates
    const duration = 5500; // Warp speed duration in milliseconds (5.5 seconds)
    const startTime = performance.now();

    // Year Countdown Interval
    const yearInterval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / (duration - 400), 1);
      
      const startYear = 2026;
      const endYear = 1980 + Math.floor(Math.random() * 20); // random retro year around 1980-2000
      const target = Math.round(startYear - progress * (startYear - endYear));
      setCurrentYear(target);

      if (progress > 0.8) {
        setStatusText('DESTINATION REACHED: THE PAST');
      } else if (progress > 0.4) {
        setStatusText('TIME DISTORTION DETECTED');
      } else {
        setStatusText('CHRONO SPEED: WARP V');
      }
    }, 45);

    // Animation Loop
    const draw = () => {
      const now = performance.now();
      const elapsed = now - startTime;

      // Clear with trailing opacity to create motion blur streaks
      ctx.fillStyle = 'rgba(5, 7, 10, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // Accelerate speed dynamically (exponential curve)
      if (elapsed < duration - 600) {
        speed = 2 + Math.pow(elapsed / 220, 2.5); // Warp speed curve!
      } else {
        speed = Math.max(5, speed * 0.85);
      }

      // Draw Starfield Tunnel
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.prevZ = star.z;
        star.z -= speed;

        // Reset star if it passes the screen
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * 1000;
          star.y = (Math.random() - 0.5) * 1000;
          star.z = 1000;
          star.prevZ = star.z;
        }

        // Project 3D coordinates to 2D
        const k = 600; // Focal length
        const px = (star.x / star.z) * k + cx;
        const py = (star.y / star.z) * k + cy;

        const prevPx = (star.x / star.prevZ) * k + cx;
        const prevPy = (star.y / star.prevZ) * k + cy;

        // Draw warp streak line
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = star.color;
          // Set width based on speed / proximity
          ctx.lineWidth = Math.min(4, (1 - star.z / 1000) * 3 + 0.5);
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }

      // Draw growing center portal glow
      const portalRadius = Math.pow(elapsed / duration, 3) * Math.max(width, height) * 0.8;
      const portalGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(10, portalRadius));
      portalGrad.addColorStop(0, '#FFFFFF');
      portalGrad.addColorStop(0.2, '#33FF33');
      portalGrad.addColorStop(0.6, 'rgba(0, 170, 0, 0.15)');
      portalGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(10, portalRadius), 0, Math.PI * 2);
      ctx.fillStyle = portalGrad;
      ctx.fill();

      // At the end of the duration, flash full white then trigger complete
      if (elapsed >= duration) {
        clearInterval(yearInterval);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        
        setTimeout(() => {
          onComplete();
        }, 150);
        return;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearInterval(yearInterval);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 99999,
      background: '#05070a',
      fontFamily: 'var(--font-mono)',
      color: '#FFFFFF',
      pointerEvents: 'all'
    }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

      {/* Holographic Cyber HUD Overlay */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.8rem',
        textShadow: '0 0 10px rgba(51, 255, 51, 0.8), 0 0 20px rgba(51, 255, 51, 0.4)',
      }}>
        <div style={{
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          color: '#33FF33',
          fontWeight: 600,
          border: '1px solid rgba(51, 255, 51, 0.4)',
          background: 'rgba(51, 255, 51, 0.05)',
          padding: '0.4rem 1.2rem',
          borderRadius: '4px',
          display: 'inline-block'
        }}>
          {statusText}
        </div>
        
        {/* Large Year Countdown */}
        <h1 style={{
          fontSize: 'clamp(3.5rem, 10vw, 6.5rem)',
          fontWeight: 900,
          color: '#FFFFFF',
          margin: 0,
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-0.04em',
        }}>
          {currentYear}
        </h1>

        <div style={{
          fontSize: '0.7rem',
          color: 'rgba(255, 255, 255, 0.4)',
          letterSpacing: '0.15em',
          marginTop: '-0.4rem'
        }}>
          TEMPORAL SYNC: {(Math.min(1, currentYear / 2026) * 100).toFixed(1)}%
        </div>
      </div>

      {/* Grid Overlay scanning lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 4px, 3px 100%',
        pointerEvents: 'none',
        opacity: 0.45
      }} />
    </div>
  );
};
