import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Local procedural SoundManager using the browser's Web Audio API 
// to prevent "Module not found" compilation errors for SoundManager.ts
const soundManager = {
  playClick: () => {
    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.005, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.warn('AudioContext blocked:', e);
    }
  },
  playHover: () => {
    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.002, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // quiet fail for hover
    }
  }
};

export default function InteractiveHeroCharacter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  // Motion values for the container 3D magnetic tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 120, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 20 });

  // Physics state for the character body & eyes
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const eyeOffset = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const floatOffset = useRef(0);
  const lastBlink = useRef(0);
  const isBlinking = useRef(false);
  const blinkProgress = useRef(0);
  const bounceY = useRef(0);
  const bounceVelocity = useRef(0);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Mouse displacement from center
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Track mouse coordinates for drawing
      mousePos.current.targetX = dx;
      mousePos.current.targetY = dy;

      // Tilt intensity (max 15 degrees)
      const maxTilt = 15;
      const tiltX = -(dy / window.innerHeight) * maxTilt;
      const tiltY = (dx / window.innerWidth) * maxTilt;

      rotateX.set(tiltX);
      rotateY.set(tiltY);

      // Eye looking offset (max 18px)
      const maxEyeOffset = 18;
      if (dist > 0) {
        const eyeDx = (dx / dist) * Math.min(maxEyeOffset, dist * 0.15);
        const eyeDy = (dy / dist) * Math.min(maxEyeOffset, dist * 0.15);
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
  }, [rotateX, rotateY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use absolute sizing for render accuracy
    canvas.width = 320;
    canvas.height = 320;

    let frameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Idle float (Sine wave)
      floatOffset.current += 0.04;
      const floatY = Math.sin(floatOffset.current) * 6;

      // Physics math for jumping/bouncing
      if (bounceY.current > 0 || bounceVelocity.current !== 0) {
        bounceVelocity.current -= 0.5; // gravity
        bounceY.current += bounceVelocity.current;
        if (bounceY.current <= 0) {
          bounceY.current = 0;
          bounceVelocity.current = 0;
        }
      }

      const activeY = cy + floatY - bounceY.current;

      // Smooth eye & head follow tracking (lerp)
      eyeOffset.current.x += (eyeOffset.current.targetX - eyeOffset.current.x) * 0.12;
      eyeOffset.current.y += (eyeOffset.current.targetY - eyeOffset.current.y) * 0.12;

      // Dynamic blinking logic
      const now = Date.now();
      if (!isBlinking.current && now - lastBlink.current > Math.random() * 4000 + 2000) {
        isBlinking.current = true;
        lastBlink.current = now;
      }

      if (isBlinking.current) {
        blinkProgress.current += 0.15;
        if (blinkProgress.current >= Math.PI) {
          isBlinking.current = false;
          blinkProgress.current = 0;
        }
      }

      const currentBlinkHeight = isBlinking.current ? Math.sin(blinkProgress.current) : 0;

      // 1. Draw Shadows (Floor ambient shadow)
      const shadowRadius = Math.max(10, 48 - bounceY.current * 0.3);
      const shadowAlpha = Math.max(0.02, 0.25 - bounceY.current * 0.003);
      ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
      ctx.beginPath();
      ctx.ellipse(cx, cy + 110, shadowRadius, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Ears / Antennas (Pictoplasma cartoon style!)
      const earXOffset = 40;
      const earYOffset = -60;
      
      // Left Antenna
      ctx.save();
      ctx.translate(cx - earXOffset, activeY + earYOffset);
      ctx.rotate(-0.2 + eyeOffset.current.x * 0.005);
      const earGradLeft = ctx.createLinearGradient(0, -10, 0, 30);
      earGradLeft.addColorStop(0, '#ff4500'); // Neon red-orange
      earGradLeft.addColorStop(1, '#9e2200');
      ctx.fillStyle = earGradLeft;
      ctx.beginPath();
      ctx.ellipse(0, 0, 10, 24, 0, 0, Math.PI * 2);
      ctx.fill();
      // Glow bulb top
      ctx.fillStyle = '#39ff14'; // neon green tip
      ctx.beginPath();
      ctx.arc(0, -22, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Right Antenna
      ctx.save();
      ctx.translate(cx + earXOffset, activeY + earYOffset);
      ctx.rotate(0.2 + eyeOffset.current.x * 0.005);
      const earGradRight = ctx.createLinearGradient(0, -10, 0, 30);
      earGradRight.addColorStop(0, '#ff4500');
      earGradRight.addColorStop(1, '#9e2200');
      ctx.fillStyle = earGradRight;
      ctx.beginPath();
      ctx.ellipse(0, 0, 10, 24, 0, 0, Math.PI * 2);
      ctx.fill();
      // Glow bulb top
      ctx.fillStyle = '#00f0ff'; // neon cyan tip
      ctx.beginPath();
      ctx.arc(0, -22, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Draw Main Body (Smooth rounded clay capsule)
      ctx.save();
      ctx.translate(cx, activeY);
      // Squish & stretch animation based on jumping/landing
      let squishW = 1.0;
      let squishH = 1.0;
      if (bounceVelocity.current > 0) {
        squishW = 0.92;
        squishH = 1.08; // Stretch while flying
      } else if (bounceY.current === 0 && bounceVelocity.current < 0) {
        squishW = 1.1;
        squishH = 0.9; // Squish on land
      }

      // 3D-like radial clay gradient for body
      const bodyRadius = 78;
      const bodyGrad = ctx.createRadialGradient(
        eyeOffset.current.x * 0.4 - 15,
        eyeOffset.current.y * 0.4 - 25,
        15,
        0,
        0,
        bodyRadius
      );
      bodyGrad.addColorStop(0, '#1c1c1c'); // Specular high contrast center highlight
      bodyGrad.addColorStop(0.5, '#0b0b0b');
      bodyGrad.addColorStop(1, '#020202'); // Deep shadow margins
      
      ctx.fillStyle = bodyGrad;
      ctx.strokeStyle = 'rgba(255, 69, 0, 0.15)'; // Glowing border
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, bodyRadius * squishW, 82 * squishH, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 4. Draw Rosy Cheeks (Soft blush on hover)
      const blushAlpha = isHovered ? 0.4 : 0.15;
      ctx.fillStyle = `rgba(255, 69, 0, ${blushAlpha})`;
      ctx.beginPath();
      ctx.ellipse(-42 + eyeOffset.current.x * 0.8, 12 + eyeOffset.current.y * 0.8, 14, 8, 0, 0, Math.PI * 2); // left cheek
      ctx.ellipse(42 + eyeOffset.current.x * 0.8, 12 + eyeOffset.current.y * 0.8, 14, 8, 0, 0, Math.PI * 2);  // right cheek
      ctx.fill();

      // 5. Draw BIG Anime/Toy Eyes (Double gradient layers!)
      const eyeSpacing = 26;
      const eyeSize = 18;

      // Draw Eye sockets/sclera
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-eyeSpacing + eyeOffset.current.x * 0.5, -8 + eyeOffset.current.y * 0.5, eyeSize, 0, Math.PI * 2);
      ctx.arc(eyeSpacing + eyeOffset.current.x * 0.5, -8 + eyeOffset.current.y * 0.5, eyeSize, 0, Math.PI * 2);
      ctx.fill();

      // Draw Pupil (Inside the eye following mouse)
      const pupilX = eyeOffset.current.x * 0.95;
      const pupilY = eyeOffset.current.y * 0.95;

      ctx.fillStyle = '#050505';
      ctx.beginPath();
      // Left Pupil
      ctx.arc(-eyeSpacing + eyeOffset.current.x * 0.5 + pupilX * 0.35, -8 + eyeOffset.current.y * 0.5 + pupilY * 0.35, 10, 0, Math.PI * 2);
      // Right Pupil
      ctx.arc(eyeSpacing + eyeOffset.current.x * 0.5 + pupilX * 0.35, -8 + eyeOffset.current.y * 0.5 + pupilY * 0.35, 10, 0, Math.PI * 2);
      ctx.fill();

      // Specular highlight reflections (glowing dots inside pupils!)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-eyeSpacing + eyeOffset.current.x * 0.5 + pupilX * 0.35 - 3, -11 + eyeOffset.current.y * 0.5 + pupilY * 0.35 - 3, 3, 0, Math.PI * 2);
      ctx.arc(eyeSpacing + eyeOffset.current.x * 0.5 + pupilX * 0.35 - 3, -11 + eyeOffset.current.y * 0.5 + pupilY * 0.35 - 3, 3, 0, Math.PI * 2);
      ctx.fill();

      // 6. Draw Blinking Eyelids (if blinking, override drawing eyes)
      if (currentBlinkHeight > 0) {
        ctx.fillStyle = '#0b0b0b'; // match body
        ctx.beginPath();
        // Draw eyelids covering eyes
        ctx.arc(-eyeSpacing + eyeOffset.current.x * 0.5, -8 + eyeOffset.current.y * 0.5, eyeSize + 1, 0, Math.PI, true);
        ctx.ellipse(-eyeSpacing + eyeOffset.current.x * 0.5, -8 + eyeOffset.current.y * 0.5 + (1 - currentBlinkHeight) * eyeSize, eyeSize, currentBlinkHeight * eyeSize, 0, 0, Math.PI * 2);

        ctx.arc(eyeSpacing + eyeOffset.current.x * 0.5, -8 + eyeOffset.current.y * 0.5, eyeSize + 1, 0, Math.PI, true);
        ctx.ellipse(eyeSpacing + eyeOffset.current.x * 0.5, -8 + eyeOffset.current.y * 0.5 + (1 - currentBlinkHeight) * eyeSize, eyeSize, currentBlinkHeight * eyeSize, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyelash curve
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(-eyeSpacing + eyeOffset.current.x * 0.5, -8 + eyeOffset.current.y * 0.5, eyeSize, Math.PI * 0.05, Math.PI * 0.95);
        ctx.arc(eyeSpacing + eyeOffset.current.x * 0.5, -8 + eyeOffset.current.y * 0.5, eyeSize, Math.PI * 0.05, Math.PI * 0.95);
        ctx.stroke();
      }

      // 7. Draw Mouth (O-mouth or happy smile!)
      ctx.save();
      ctx.translate(eyeOffset.current.x * 0.7, 18 + eyeOffset.current.y * 0.7);
      ctx.strokeStyle = '#ff4500'; // Neon accent lips
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      if (isHovered) {
        // Big open happy mouth (Clay circle)
        ctx.fillStyle = '#ff4500';
        ctx.beginPath();
        ctx.arc(0, 0, 9, 0, Math.PI * 2);
        ctx.fill();
        // tiny pink tongue
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(0, 4, 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Whistle / thinking cute small circle or wavy mouth
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 8. Hands / Little floating arms
      ctx.save();
      // Left Hand
      const armSwingLeft = Math.cos(floatOffset.current * 1.5) * 4;
      ctx.translate(-82, 10 + armSwingLeft);
      const handGradLeft = ctx.createRadialGradient(-3, -3, 2, 0, 0, 12);
      handGradLeft.addColorStop(0, '#ff4500');
      handGradLeft.addColorStop(1, '#661b00');
      ctx.fillStyle = handGradLeft;
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Right Hand
      ctx.save();
      const armSwingRight = Math.sin(floatOffset.current * 1.5) * 4;
      ctx.translate(82, 10 + armSwingRight);
      const handGradRight = ctx.createRadialGradient(3, -3, 2, 0, 0, 12);
      handGradRight.addColorStop(0, '#ff4500');
      handGradRight.addColorStop(1, '#661b00');
      ctx.fillStyle = handGradRight;
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.restore(); // end body save

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isHovered]);

  const handleCharacterClick = () => {
    if (isSpinning) return;
    
    // Play sound on click
    soundManager.playClick();
    
    setIsSpinning(true);
    
    // Physical bounce spring jump
    bounceVelocity.current = 11;

    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);
  };

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Glossy decorative backdrop circle */}
      <div className="absolute inset-0 bg-radial from-brand/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Interactive spinning/jumping element */}
      <motion.div
        ref={containerRef}
        className="relative z-10 w-full h-full flex items-center justify-center cursor-pointer select-none"
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
        }}
        animate={isSpinning ? { rotate: 360 } : {}}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        onMouseEnter={() => {
          setIsHovered(true);
          soundManager.playHover();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          rotateX.set(0);
          rotateY.set(0);
        }}
        onClick={handleCharacterClick}
        data-cursor="hover"
        data-cursor-text="BOUNCE!"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full drop-shadow-[0_24px_36px_rgba(0,0,0,0.5)]"
        />

        {/* Small floating tag */}
        <div className="absolute -bottom-2 font-mono text-[9px] text-zinc-500 tracking-widest bg-zinc-900/80 px-2.5 py-1 rounded-full border border-zinc-800 backdrop-blur-md">
          INTERACTIVE TOY
        </div>
      </motion.div>
    </div>
  );
}
