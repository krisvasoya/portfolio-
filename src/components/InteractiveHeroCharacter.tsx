import { useEffect, useRef, useState } from 'react';

export default function InteractiveHeroCharacter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  // Physics state for Spiderman body & eyes
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const eyeOffset = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const tilt = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const floatOffset = useRef(0);
  const lastBlink = useRef(Date.now());
  const isBlinking = useRef(false);
  const blinkProgress = useRef(0);
  const bounceY = useRef(0);
  const bounceVelocity = useRef(0);
  
  // Web shooting ("thwip") state
  const webTimer = useRef(0);

  // Procedural audio context sound effects
  const playWebSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      // Node initialization
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      // Fast sweeping bandpass filter simulating air friction
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(6000, ctx.currentTime + 0.15);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);
      
      // Oscillator pitch sweep for the classic "thwip" web emission
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.12);
      
      // Gain envelope fading fast
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.16);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch (e) {
      console.warn('Procedural audio blocked or unsupported:', e);
    }
  };

  const playJumpSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Sine sweep simulating spring action
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(550, ctx.currentTime + 0.22);
      
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.005, ctx.currentTime + 0.26);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn('Procedural audio blocked or unsupported:', e);
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Displacement from core center
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Track coordinates for eye focus
      mousePos.current.targetX = dx;
      mousePos.current.targetY = dy;

      // 3D Magnetic tilt angles (interpolated in loop)
      const maxTilt = 12;
      tilt.current.targetX = -(dy / window.innerHeight) * maxTilt;
      tilt.current.targetY = (dx / window.innerWidth) * maxTilt;

      // Sclera looking offset
      const maxEyeOffset = 14;
      if (dist > 0) {
        const eyeDx = (dx / dist) * Math.min(maxEyeOffset, dist * 0.12);
        const eyeDy = (dy / dist) * Math.min(maxEyeOffset, dist * 0.12);
        eyeOffset.current.targetX = eyeDx;
        eyeOffset.current.targetY = eyeDy;
      } else {
        eyeOffset.current.targetX = 0;
        eyeOffset.current.targetY = 0;
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 320;
    canvas.height = 320;

    let frameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Decrement web timer
      if (webTimer.current > 0) {
        webTimer.current -= 1;
      }

      // Idle floating motion
      floatOffset.current += 0.035;
      const floatY = Math.sin(floatOffset.current) * 5;

      // Gravity/Spring equations for character bounce
      if (bounceY.current > 0 || bounceVelocity.current !== 0) {
        bounceVelocity.current -= 0.55; // gravity pull
        bounceY.current += bounceVelocity.current;
        if (bounceY.current <= 0) {
          bounceY.current = 0;
          bounceVelocity.current = 0;
        }
      }

      const activeY = cy + floatY - bounceY.current;

      // Lerp 3D container tilt coordinates
      tilt.current.x += (tilt.current.targetX - tilt.current.x) * 0.08;
      tilt.current.y += (tilt.current.targetY - tilt.current.y) * 0.08;

      if (containerRef.current) {
        containerRef.current.style.transform = `rotateX(${tilt.current.x}deg) rotateY(${tilt.current.y}deg)`;
      }

      // Lerp eye tracking displacement
      eyeOffset.current.x += (eyeOffset.current.targetX - eyeOffset.current.x) * 0.1;
      eyeOffset.current.y += (eyeOffset.current.targetY - eyeOffset.current.y) * 0.1;

      // Squint/Blink logic
      const now = Date.now();
      if (!isBlinking.current && now - lastBlink.current > Math.random() * 5000 + 3000) {
        isBlinking.current = true;
        lastBlink.current = now;
      }

      if (isBlinking.current) {
        blinkProgress.current += 0.18;
        if (blinkProgress.current >= Math.PI) {
          isBlinking.current = false;
          blinkProgress.current = 0;
        }
      }

      const currentBlinkHeight = isBlinking.current ? Math.sin(blinkProgress.current) : 0;

      // 1. FLOOR SHADOW
      const shadowRadius = Math.max(10, 46 - bounceY.current * 0.28);
      const shadowAlpha = Math.max(0.01, 0.22 - bounceY.current * 0.0025);
      ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
      ctx.beginPath();
      ctx.ellipse(cx, cy + 110, shadowRadius, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // 2. MAIN BODY (Spiderman capsule design with red/blue clipping panels)
      ctx.save();
      ctx.translate(cx, activeY);

      // Scale modifications for thwip/stretch feedback
      let squishW = 1.0;
      let squishH = 1.0;
      if (bounceVelocity.current > 0) {
        squishW = 0.94;
        squishH = 1.06;
      } else if (bounceY.current === 0 && bounceVelocity.current < 0) {
        squishW = 1.08;
        squishH = 0.92;
      }

      const bodyRadius = 78;
      const finalW = bodyRadius * squishW;
      const finalH = 82 * squishH;

      // Set clip path to render only inside the capsule
      ctx.beginPath();
      ctx.ellipse(0, 0, finalW, finalH, 0, 0, Math.PI * 2);
      ctx.clip();

      // Red main gradient fill
      const redGrad = ctx.createRadialGradient(
        eyeOffset.current.x * 0.35 - 10,
        eyeOffset.current.y * 0.35 - 20,
        10,
        0,
        0,
        bodyRadius
      );
      redGrad.addColorStop(0, '#f81f26'); // High reflection scarlet red
      redGrad.addColorStop(0.65, '#cb1015'); // Medium body red
      redGrad.addColorStop(1, '#7f0003'); // Shadows edges
      ctx.fillStyle = redGrad;
      ctx.fill();

      // Blue side suit panels
      ctx.fillStyle = '#0f4886'; // Classic Spiderman cobalt blue
      // Left side panel
      ctx.beginPath();
      ctx.ellipse(-78, 30, 42, 65, 0.35, 0, Math.PI * 2);
      ctx.fill();
      // Right side panel
      ctx.beginPath();
      ctx.ellipse(78, 30, 42, 65, -0.35, 0, Math.PI * 2);
      ctx.fill();

      // 3. SPIDER EMBLEM LOGO (Chest emblem)
      ctx.fillStyle = '#111111';
      // Center body
      ctx.beginPath();
      ctx.ellipse(0, 32, 3, 5.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Head
      ctx.beginPath();
      ctx.arc(0, 24, 2, 0, Math.PI * 2);
      ctx.fill();

      // Spider legs (stroke)
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Left legs
      ctx.beginPath(); ctx.moveTo(-2, 30); ctx.quadraticCurveTo(-9, 21, -11, 14); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-3, 32); ctx.quadraticCurveTo(-12, 29, -13, 22); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-2, 33); ctx.quadraticCurveTo(-11, 38, -9, 46); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-1, 34); ctx.quadraticCurveTo(-7, 42, -4, 49); ctx.stroke();

      // Right legs
      ctx.beginPath(); ctx.moveTo(2, 30); ctx.quadraticCurveTo(9, 21, 11, 14); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(3, 32); ctx.quadraticCurveTo(12, 29, 13, 22); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(2, 33); ctx.quadraticCurveTo(11, 38, 9, 46); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(1, 34); ctx.quadraticCurveTo(7, 42, 4, 49); ctx.stroke();

      // 4. WEBBING PATTERN
      const wx = eyeOffset.current.x * 0.45;
      const wy = -10 + eyeOffset.current.y * 0.45;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.32)';
      ctx.lineWidth = 0.8;

      // Radiating web strings
      const angles = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI, (5 * Math.PI) / 4, (3 * Math.PI) / 2, (7 * Math.PI) / 4];
      const webDist = 120;
      angles.forEach((angle) => {
        ctx.beginPath();
        ctx.moveTo(wx, wy);
        ctx.lineTo(wx + Math.cos(angle) * webDist, wy + Math.sin(angle) * webDist);
        ctx.stroke();
      });

      // Bulging concentric rings
      const radii = [24, 48, 72, 96];
      radii.forEach((r) => {
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2.02; a += Math.PI / 10) {
          // Curved bulges
          const dist = r + Math.sin(a * 8) * (r * 0.04);
          const px = wx + Math.cos(a) * dist;
          const py = wy + Math.sin(a) * dist;
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      });

      ctx.restore(); // Ends capsule clipping context

      // 5. HANDS & ARMS
      const isThwipping = webTimer.current > 0;
      const armSwing = Math.cos(floatOffset.current * 1.6) * 3.5;

      // Left hand (Standard posture)
      ctx.save();
      ctx.translate(cx - 82, activeY + 12 + armSwing);
      
      const leftHandGrad = ctx.createRadialGradient(-2, -2, 1, 0, 0, 10);
      leftHandGrad.addColorStop(0, '#f81f26');
      leftHandGrad.addColorStop(1, '#8b0003');
      ctx.fillStyle = leftHandGrad;
      
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#0f4886'; // blue sleeve border
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 11, Math.PI * 0.7, Math.PI * 1.7);
      ctx.stroke();
      ctx.restore();

      // Right hand (Raised during "thwip" web action, otherwise standard posture)
      ctx.save();
      let handRX = 82;
      let handRY = 12 + Math.sin(floatOffset.current * 1.6) * 3.5;

      if (isThwipping) {
        // Raise hand to point upwards to emit web line
        handRX = 58;
        handRY = -56;
      }

      ctx.translate(cx + handRX, activeY + handRY);
      
      const rightHandGrad = ctx.createRadialGradient(2, -2, 1, 0, 0, 10);
      rightHandGrad.addColorStop(0, '#f81f26');
      rightHandGrad.addColorStop(1, '#8b0003');
      ctx.fillStyle = rightHandGrad;
      
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#0f4886';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 11, Math.PI * 1.3, Math.PI * 0.3);
      ctx.stroke();
      ctx.restore();

      // 6. SPIDERMAN WEB LINE (Visual "thwip" laser line)
      if (isThwipping) {
        ctx.save();
        const startX = cx + handRX;
        const startY = activeY + handRY;
        
        // Target: shoot diagonal web up and to the right edge of canvas
        const targetX = canvas.width;
        const targetY = 0;

        // Vibrating wave effect
        const vibration = Math.sin(Date.now() * 0.1) * 3;
        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.8;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 12;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        // Draw slightly wavy thwip line
        ctx.quadraticCurveTo((startX + targetX) / 2 + vibration, (startY + targetY) / 2 - 10, targetX, targetY);
        ctx.stroke();
        
        // Draw secondary fine spiral core
        ctx.strokeStyle = 'rgba(15, 72, 134, 0.45)';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
        ctx.stroke();
        
        ctx.restore();
      }

      // 7. GLOWING SPIDEREYES (Squishable web-warrior white eyes)
      const eyeSpacing = 24;

      // Left Eye
      ctx.save();
      ctx.translate(cx - eyeSpacing + eyeOffset.current.x * 0.52, activeY - 8 + eyeOffset.current.y * 0.52);
      ctx.scale(1, 1 - currentBlinkHeight);

      ctx.beginPath();
      ctx.moveTo(-2, -6);
      ctx.quadraticCurveTo(-16, -20, -25, -9);
      ctx.quadraticCurveTo(-27, 4, -17, 13);
      ctx.quadraticCurveTo(-6, 19, 0, 4);
      ctx.closePath();

      // Eye Glow White fill
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = isHovered ? 14 : 5;
      ctx.fill();

      // Thick black plastic goggles border
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#080808';
      ctx.lineWidth = 4.2;
      ctx.lineJoin = 'round';
      ctx.stroke();
      ctx.restore();

      // Right Eye
      ctx.save();
      ctx.translate(cx + eyeSpacing + eyeOffset.current.x * 0.52, activeY - 8 + eyeOffset.current.y * 0.52);
      ctx.scale(1, 1 - currentBlinkHeight);

      ctx.beginPath();
      ctx.moveTo(2, -6);
      ctx.quadraticCurveTo(16, -20, 25, -9);
      ctx.quadraticCurveTo(27, 4, 17, 13);
      ctx.quadraticCurveTo(6, 19, 0, 4);
      ctx.closePath();

      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = isHovered ? 14 : 5;
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#080808';
      ctx.lineWidth = 4.2;
      ctx.lineJoin = 'round';
      ctx.stroke();
      ctx.restore();

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isHovered]);

  const handleCharacterClick = () => {
    if (isSpinning) return;
    
    // Play thwip and jump sound synthesizers
    playWebSound();
    setTimeout(playJumpSound, 80);

    setIsSpinning(true);
    
    // Web shoot triggers hand raise & thwip line
    webTimer.current = 18;
    
    // Jump force
    bounceVelocity.current = 10.5;

    setTimeout(() => {
      setIsSpinning(false);
    }, 900);
  };

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Spiderweb glowing radial background grid */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none transition-all duration-500" 
        style={{
          background: isHovered 
            ? 'radial-gradient(circle, rgba(226, 27, 34, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(226, 27, 34, 0.05) 0%, transparent 70%)'
        }}
      />

      {/* 3D Magnetic tilting toy container */}
      <div
        ref={containerRef}
        style={{
          transformStyle: 'preserve-3d',
          transition: isSpinning ? 'transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
        }}
        className={`relative z-10 w-full h-full flex items-center justify-center cursor-pointer select-none ${
          isSpinning ? 'animate-[spin_0.9s_ease-in-out]' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          tilt.current.targetX = 0;
          tilt.current.targetY = 0;
        }}
        onClick={handleCharacterClick}
        data-cursor="hover"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]"
        />

        {/* Floating high-tech badge */}
        <div className="absolute -bottom-2 font-mono text-[9px] text-[#33ff33] tracking-widest bg-black/90 px-3 py-1 rounded-full border border-red-900/30 shadow-[0_0_10px_rgba(226,27,34,0.15)] backdrop-blur-md">
          SPIDEY_BOT.EXE // CLICK TO THWIP
        </div>
      </div>
    </div>
  );
}
