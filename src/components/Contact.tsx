import React, { useState, useRef, useEffect } from 'react';
import { Heart, Cpu, Award, ArrowRight, Mail } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const emailAddress = 'krisvasoya.dev@gmail.com';

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [preset, setPreset] = useState<'greeting' | 'project' | 'career'>('greeting');

  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  
  const leftCurveRef = useRef<SVGSVGElement>(null);
  const rightCurveRef = useRef<SVGSVGElement>(null);

  const socials = [
    {
      label: 'GitHub',
      href: 'https://github.com/krisvasoya',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
      color: '#e6edf3',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/krisvasoya',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      color: '#0a66c2',
    },
    {
      label: 'Twitter / X',
      href: 'https://twitter.com/krisvasoya',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: '#1d9bf0',
    },
  ];

  // GSAP ScrollTrigger for parallax background curves and bg image
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftCurveRef.current && rightCurveRef.current) {
        // Left curve parallax scrub
        gsap.fromTo(leftCurveRef.current,
          { y: -100, rotate: -6 },
          {
            y: 100,
            rotate: 10,
            scrollTrigger: {
              trigger: '#contact',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            }
          }
        );

        // Right curve parallax scrub
        gsap.fromTo(rightCurveRef.current,
          { y: 100, rotate: 6 },
          {
            y: -100,
            rotate: -10,
            scrollTrigger: {
              trigger: '#contact',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSending || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Smooth responsive tilt
    const rotX = -(y / (rect.height / 2)) * 8;
    const rotY = (x / (rect.width / 2)) * 8;
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    if (isSending) return;
    setTilt({ x: 0, y: 0 });
    if (!isFocused) {
      setIsOpen(false);
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      const activeEl = document.activeElement;
      const isInside = letterRef.current?.contains(activeEl);
      if (!isInside) {
        setIsFocused(false);
        setIsOpen(false);
      }
    }, 150);
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    if (!name.trim() || !message.trim()) {
      alert('Please state your name and draft a message before transmitting.');
      return;
    }

    setIsSending(true);
    setIsOpen(false); // Collapses the letter and closes the flap via CSS transitions

    const subjectPrefix = preset === 'career' ? '[CAREER OPPORTUNITY]' : preset === 'project' ? '[PROJECT COLLABORATION]' : '[HELLO / FRIENDLY CHAT]';
    const mailtoSubject = `${subjectPrefix} from ${name}`;
    const mailtoBody = `Dear Kris,\n\nName: ${name}\nPreset: ${preset}\n\nMessage:\n${message}\n\n---\nTransmitted via 3D Glassmorphic Correspondence Portal.`;
    const mailLink = `mailto:${emailAddress}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

    // Wait 0.55s for the CSS collapse transition to complete, then whoosh the envelope away
    gsap.timeline()
      .delay(0.55)
      .to(envelopeRef.current, {
        scale: 0.05,
        x: 600,
        y: -500,
        rotation: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.in',
        onComplete: () => {
          // Open the native mail client
          window.location.href = mailLink;

          // Reset fields and spring back
          setTimeout(() => {
            setName('');
            setMessage('');
            setPreset('greeting');
            setIsSending(false);

            gsap.fromTo(envelopeRef.current,
              { x: 0, y: 150, scale: 0, rotation: -12, opacity: 0 },
              { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.3)' }
            );
          }, 1200);
        }
      });
  };

  const getPresetIcon = () => {
    switch (preset) {
      case 'project':
        return <Cpu size={16} style={{ color: '#33ff33' }} />;
      case 'career':
        return <Award size={16} style={{ color: '#33ff33' }} />;
      default:
        return <Heart size={16} style={{ color: '#33ff33' }} />;
    }
  };

  return (
    <section id="contact" style={{ padding: '8rem 0 12rem', width: '100%', position: 'relative', overflow: 'hidden' }}>

      {/* Dynamic Background Parallel Curves */}
      <svg
        ref={leftCurveRef}
        className="background-curve left-curve"
        width="320"
        height="700"
        viewBox="0 0 320 700"
        fill="none"
        style={{
          position: 'absolute',
          left: '-100px',
          top: '5%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.16,
          transition: 'opacity 0.5s ease'
        }}
      >
        <defs>
          <linearGradient id="waveGradLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#33ff33" stopOpacity="0" />
            <stop offset="30%" stopColor="#33ff33" stopOpacity="1" />
            <stop offset="70%" stopColor="#00aa00" stopOpacity="1" />
            <stop offset="100%" stopColor="#00aa00" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M50,0 Q180,180 80,350 T200,520 T50,700" stroke="url(#waveGradLeft)" strokeWidth="1.8" />
        <path d="M70,0 Q200,180 100,350 T220,520 T70,700" stroke="url(#waveGradLeft)" strokeWidth="0.8" opacity="0.6" />
        <path d="M30,0 Q160,180 60,350 T180,520 T30,700" stroke="url(#waveGradLeft)" strokeWidth="0.8" opacity="0.4" />
      </svg>

      <svg
        ref={rightCurveRef}
        className="background-curve right-curve"
        width="320"
        height="700"
        viewBox="0 0 320 700"
        fill="none"
        style={{
          position: 'absolute',
          right: '-100px',
          bottom: '5%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.16,
          transition: 'opacity 0.5s ease'
        }}
      >
        <defs>
          <linearGradient id="waveGradRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#33ff33" stopOpacity="0" />
            <stop offset="30%" stopColor="#33ff33" stopOpacity="1" />
            <stop offset="70%" stopColor="#00aa00" stopOpacity="1" />
            <stop offset="100%" stopColor="#00aa00" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M270,0 Q140,180 240,350 T120,520 T270,700" stroke="url(#waveGradRight)" strokeWidth="1.8" />
        <path d="M290,0 Q160,180 260,350 T140,520 T290,700" stroke="url(#waveGradRight)" strokeWidth="0.8" opacity="0.6" />
        <path d="M250,0 Q120,180 220,350 T100,520 T250,700" stroke="url(#waveGradRight)" strokeWidth="0.8" opacity="0.4" />
      </svg>

      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '55vw',
          height: '35vw',
          background: 'radial-gradient(circle, rgba(51,255,51,0.07) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'blur(70px)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Headings and HUD telemetry panel - Fades out dynamically when envelope opens to prevent overlaps and focus user attention */}
        <div style={{
          opacity: isOpen ? 0 : 1,
          visibility: isOpen ? 'hidden' : 'visible',
          transform: isOpen ? 'translateY(-20px) scale(0.96)' : 'translateY(0) scale(1)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: isOpen ? 'none' : 'auto',
          position: 'relative',
          zIndex: 4
        }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span
              className="gradient-text"
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              03. Let's Connect
            </span>
          </div>

          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={3}
            blurStrength={8}
            containerClassName="contact-scroll-reveal"
            rotationEnd="center center"
            wordAnimationEnd="center center"
          >
            Great work starts with a conversation. Let's build something remarkable together.
          </ScrollReveal>

          {/* Scroll Revealed Heading */}
          <div style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '1.5rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', margin: 0 }}>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={4}
                blurStrength={6}
                containerClassName="contact-heading-reveal"
              >
                Get In Touch
              </ScrollReveal>
            </h2>
          </div>
        </div>

        {/* 3D Envelope Mailbox Container */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => !isSending && setIsOpen(true)}
          className="envelope-container reveal"
        >
          <style>{`
            /* Container perspective setup */
            .envelope-container {
              position: relative;
              width: 100%;
              max-width: 560px;
              height: 360px;
              perspective: 1000px;
              margin: 110px auto 80px;
              cursor: pointer;
            }

            /* Hide background curves on mobile viewports */
            @media (max-width: 900px) {
              .background-curve {
                display: none !important;
              }
            }

            /* The core card with 3D transform preserve */
            .envelope-card {
              position: absolute;
              width: 100%;
              height: 100%;
              transform-style: preserve-3d;
              transition: transform 0.15s ease-out;
            }

            /* Tooltip hinting click */
            .envelope-hint {
              position: absolute;
              top: -55px;
              left: 50%;
              transform: translateX(-50%);
              background: rgba(11, 5, 1, 0.7);
              border: 1px solid rgba(51, 255, 51, 0.3);
              backdrop-filter: blur(8px);
              border-radius: 30px;
              padding: 0.5rem 1.25rem;
              color: #FFFFFF;
              font-size: 0.75rem;
              font-family: "Plus Jakarta Sans", var(--font-body), sans-serif;
              font-weight: 600;
              letter-spacing: 0.02em;
              display: flex;
              align-items: center;
              gap: 0.5rem;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(51, 255, 51, 0.1);
              pointer-events: none;
              animation: bounce-hint 2.2s infinite ease-in-out;
              z-index: 10;
            }

            @keyframes bounce-hint {
              0%, 100% { transform: translate(-50%, 0); }
              50% { transform: translate(-50%, -6px); }
            }

            @keyframes pulse-dot {
              0%, 100% { opacity: 0.4; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.2); }
            }

            @keyframes pulse-seal {
              0%, 100% {
                box-shadow: 0 0 12px rgba(51, 255, 51, 0.5), inset 0 1px 3px rgba(255, 255, 255, 0.3);
                filter: drop-shadow(0 0 2px rgba(51, 255, 51, 0.2));
              }
              50% {
                box-shadow: 0 0 24px rgba(51, 255, 51, 0.85), inset 0 1px 3px rgba(255, 255, 255, 0.4);
                filter: drop-shadow(0 0 6px rgba(51, 255, 51, 0.5));
              }
            }

            /* Pulse seal hover effect via parent hover */
            .envelope-container:hover .pulse-seal {
              transform: translate(-50%, -50%) rotate(45deg) scale(1.15) !important;
              background: radial-gradient(circle, #52ff52 0%, #00b300 100%) !important;
              box-shadow: 0 0 25px rgba(51, 255, 51, 0.8), inset 0 2px 4px rgba(255, 255, 255, 0.5) !important;
            }

            /* Stylings for form fields inside the letter */
            .letter-input, .letter-textarea {
              background: rgba(10, 10, 10, 0.6);
              border: 1px solid rgba(51, 255, 51, 0.18);
              border-radius: 6px;
              color: #FFFFFF;
              font-family: var(--font-body), sans-serif;
              font-size: 0.85rem;
              padding: 0.7rem 0.9rem;
              outline: none;
              transition: all 0.25s ease;
              width: 100%;
            }
            .letter-input:focus, .letter-textarea:focus {
              border-color: #33ff33;
              background: rgba(10, 10, 10, 0.95);
              box-shadow: 0 0 12px rgba(51, 255, 51, 0.25);
            }
            .letter-label {
              color: #BFBFBF;
              font-family: var(--font-body), sans-serif;
              font-size: 0.75rem;
              font-weight: 500;
              letter-spacing: 0.03em;
              text-transform: uppercase;
              opacity: 0.8;
              align-self: flex-start;
            }

            /* Preset Stamp buttons styling (Pill shape) */
            .preset-chip {
              background: rgba(11, 5, 1, 0.6);
              border: 1px solid rgba(51, 255, 51, 0.15);
              border-radius: 20px;
              color: #BFBFBF;
              cursor: pointer;
              font-family: "Plus Jakarta Sans", var(--font-body), sans-serif;
              font-size: 0.72rem;
              font-weight: 600;
              padding: 0.45rem 1rem;
              transition: all 0.2s ease;
              flex: 1;
              text-align: center;
            }
            .preset-chip.active {
              background: #33FF33;
              border-color: #33FF33;
              color: #050505;
              box-shadow: 0 4px 15px rgba(51, 255, 51, 0.3);
              transform: translateY(-1px);
            }
            .preset-chip:hover:not(.active) {
              border-color: rgba(51, 255, 51, 0.4);
              color: #FFFFFF;
              background: rgba(51, 255, 51, 0.05);
            }

            /* Post stamp styling on letter */
            .letter-stamp {
              width: 48px;
              height: 58px;
              border: 1px dashed rgba(51, 255, 51, 0.45);
              border-radius: 4px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 2px;
              position: absolute;
              top: 1.4rem;
              right: 1.4rem;
              background: rgba(51, 255, 51, 0.04);
              overflow: hidden;
            }
            .letter-stamp::after {
              content: '';
              position: absolute;
              top: 0; left: 0; width: 100%; height: 100%;
              background: linear-gradient(to bottom, transparent 0%, rgba(51, 255, 51, 0.1) 50%, transparent 100%);
              animation: stamp-scan 2.5s linear infinite;
            }
            @keyframes stamp-scan {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(100%); }
            }
            .stamp-text {
              font-family: var(--font-mono);
              font-size: 0.45rem;
              font-weight: 700;
              color: rgba(51, 255, 51, 0.6);
              letter-spacing: 0.05em;
            }

            /* Responsive tweaks */
            @media (max-width: 580px) {
              .envelope-container {
                height: 320px;
                margin-top: 90px;
                margin-bottom: 40px;
              }
              .envelope-hint {
                top: -55px;
                font-size: 0.68rem;
                padding: 0.35rem 0.9rem;
              }
              .envelope-letter-el {
                height: 300px !important;
                padding: 1.1rem !important;
                gap: 0.5rem !important;
              }
              /* Mobile open state overrides */
              .envelope-card.open-envelope .envelope-letter-el {
                transform: translateY(-180px) scale(1.05) !important;
              }
              .envelope-card.open-envelope .env-part {
                transform: translateY(80px) !important;
              }
              .envelope-card.open-envelope .envelope-flap-el {
                transform: translateY(80px) rotateX(180deg) !important;
              }
              .letter-stamp {
                width: 36px;
                height: 46px;
                top: 1rem;
                right: 1rem;
              }
              .letter-stamp svg {
                width: 14px;
                height: 14px;
              }
              .letter-input, .letter-textarea {
                font-size: 0.78rem;
                padding: 0.45rem 0.6rem;
              }
              .letter-textarea {
                height: 52px !important;
              }
              .preset-chip {
                font-size: 0.65rem;
                padding: 0.35rem 0.6rem;
              }
              .letter-heading-el {
                font-size: 1.3rem !important;
              }
            }
          `}</style>

          {/* Glowing bottom shadow */}
          <div style={{
            position: 'absolute',
            bottom: '-25px',
            left: '10%',
            width: '80%',
            height: '30px',
            background: 'radial-gradient(ellipse, rgba(51, 255, 51, 0.15) 0%, transparent 70%)',
            zIndex: 0,
            pointerEvents: 'none',
            transform: isOpen ? 'scaleX(1.1) translateY(120px)' : 'scaleX(1) translateY(0)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }} />

          {/* Interactive instruction tooltip (Vector Mail Icon) */}
          {!isOpen && !isSending && (
            <div className="envelope-hint">
              <Mail size={13} style={{ color: '#33ff33', filter: 'drop-shadow(0 0 4px rgba(51, 255, 51, 0.4))' }} />
              <span>Click to Write Message</span>
            </div>
          )}

          {/* 3D Rotatable Envelope Structure */}
          <div 
            ref={envelopeRef}
            className={`envelope-card ${isOpen ? 'open-envelope' : ''}`}
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: isSending ? 'none' : 'transform 0.15s ease-out',
            }}
          >
            {/* 1. Envelope Backside (Shifts down on open) */}
            <div 
              className="env-part"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: '#070301',
                border: '1px solid rgba(51, 255, 51, 0.16)',
                borderRadius: '12px',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.7)',
                zIndex: 1,
                overflow: 'hidden',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isOpen ? 'translateY(120px)' : 'translateY(0)',
              }}
            >
              {/* Inner geometric lining */}
              <div style={{
                position: 'absolute',
                top: '8%',
                left: '6%',
                width: '88%',
                height: '84%',
                border: '1px dashed rgba(51, 255, 51, 0.08)',
                borderRadius: '8px',
                pointerEvents: 'none'
              }} />
            </div>

            {/* 2. Glassmorphic Letter (Slides Up/Down, Scales, Fades) */}
            <div 
              ref={letterRef}
              className="envelope-letter-el"
              style={{
                position: 'absolute',
                width: '92%',
                height: '345px',
                left: '4%',
                bottom: '4%',
                background: 'rgba(12, 11, 10, 0.94)',
                border: '1px solid rgba(51, 255, 51, 0.22)',
                backdropFilter: 'blur(20px)',
                borderRadius: '12px',
                padding: '1.4rem',
                zIndex: 2,
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, visibility 0.4s',
                transform: isOpen ? 'translateY(-240px) scale(1.15)' : 'translateY(0) scale(1)',
                opacity: isOpen ? 1 : 0,
                visibility: isOpen ? 'visible' : 'hidden',
                pointerEvents: isOpen ? 'auto' : 'none'
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing envelope on click
            >
              {/* Letter Header */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderBottom: '1px solid rgba(51, 255, 51, 0.1)', paddingBottom: '0.4rem', width: '100%' }}>
                <h3 className="letter-heading-el" style={{ fontFamily: '"Outfit", sans-serif', fontSize: '1.6rem', fontWeight: 300, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
                  Send a Message
                </h3>
                <p style={{ fontFamily: '"Plus Jakarta Sans", var(--font-body), sans-serif', fontSize: '0.82rem', color: '#BFBFBF', margin: '2px 0 0' }}>
                  Let's build something remarkable.
                </p>
              </div>

              {/* Decorative Stamp (Changes dynamically depending on category) */}
              <div className="letter-stamp">
                <span className="stamp-text">KRIS</span>
                {getPresetIcon()}
                <span className="stamp-text">2026</span>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleTransmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', marginTop: '0.2rem' }}>
                {/* Sender Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label className="letter-label">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="letter-input"
                  />
                </div>

                {/* Preset Chips */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label className="letter-label">Inquiry Reason</label>
                  <div style={{ display: 'flex', gap: '0.4rem', width: '100%' }}>
                    <button
                      type="button"
                      onClick={() => setPreset('greeting')}
                      className={`preset-chip ${preset === 'greeting' ? 'active' : ''}`}
                    >
                      Greeting
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreset('project')}
                      className={`preset-chip ${preset === 'project' ? 'active' : ''}`}
                    >
                      Project
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreset('career')}
                      className={`preset-chip ${preset === 'career' ? 'active' : ''}`}
                    >
                      Career
                    </button>
                  </div>
                </div>

                {/* Message body */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label className="letter-label">Message</label>
                  <textarea
                    required
                    placeholder="How can Kris help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="letter-textarea"
                    style={{ height: '62px', resize: 'none' }}
                  />
                </div>

                {/* Submit button inside letter */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="glow-btn interactive"
                  style={{
                    marginTop: '0.6rem',
                    justifyContent: 'center',
                    padding: '0.7rem 1.5rem',
                    fontSize: '0.88rem',
                    fontFamily: '"Plus Jakarta Sans", var(--font-body), sans-serif',
                    fontWeight: 600,
                    borderRadius: '8px',
                    width: '100%',
                    cursor: 'pointer',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--gradient-primary)',
                    color: '#FFFFFF',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span>{isSending ? 'Transmitting...' : 'Send Message'}</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>

            {/* 3. Envelope Front Pocket (Shifts down, shaded flaps with shadow filter) */}
            <div 
              className="env-part"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 3,
                pointerEvents: 'none',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isOpen ? 'translateY(120px)' : 'translateY(0)',
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 560 360" preserveAspectRatio="none" style={{ display: 'block' }}>
                <defs>
                  <linearGradient id="leftFlapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#130803" />
                    <stop offset="100%" stopColor="#080401" />
                  </linearGradient>
                  <linearGradient id="rightFlapGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#130803" />
                    <stop offset="100%" stopColor="#080401" />
                  </linearGradient>
                  <linearGradient id="bottomFlapGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#1a0e05" />
                    <stop offset="100%" stopColor="#0c0602" />
                  </linearGradient>
                  <filter id="pocketShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="-4" stdDeviation="6" floodColor="#000000" floodOpacity="0.7" />
                  </filter>
                </defs>
                {/* Left Flap */}
                <polygon points="0,0 260,180 0,360" fill="url(#leftFlapGrad)" stroke="rgba(51, 255, 51, 0.08)" strokeWidth="1" />
                {/* Right Flap */}
                <polygon points="560,0 300,180 560,360" fill="url(#rightFlapGrad)" stroke="rgba(51, 255, 51, 0.08)" strokeWidth="1" />
                {/* Bottom Flap overlaps other layers, drop shadow filter */}
                <polygon points="0,360 280,150 560,360" fill="url(#bottomFlapGrad)" stroke="rgba(51, 255, 51, 0.22)" strokeWidth="1.5" filter="url(#pocketShadow)" />
              </svg>
            </div>

            {/* 4. Folding Triangular Lid Flap (Shifts down & folds open) */}
            <div 
              ref={flapRef}
              className="envelope-flap-el"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '180px',
                transformOrigin: 'top',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), z-index 0.5s',
                transform: isOpen ? 'translateY(120px) rotateX(180deg)' : 'translateY(0) rotateX(0deg)',
                zIndex: isOpen ? 1 : 4,
                pointerEvents: 'none'
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 560 180" preserveAspectRatio="none" style={{ display: 'block' }}>
                <defs>
                  <linearGradient id="topFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#251408" />
                    <stop offset="100%" stopColor="#0e0703" />
                  </linearGradient>
                </defs>
                <polygon points="0,0 280,180 560,0" fill="url(#topFlapGrad)" stroke="rgba(51, 255, 51, 0.28)" strokeWidth="1.5" />
              </svg>
            </div>

            {/* 5. Glowing Wax Seal Badge - Soft Rounded Diamond Shape (Fades & scales down when open) */}
            <div 
              className="pulse-seal"
              style={{
                position: 'absolute',
                left: '50%',
                top: '150px',
                width: '46px',
                height: '46px',
                borderRadius: '12px', /* Soft round corners */
                background: 'radial-gradient(circle, #33FF33 0%, #00AA00 100%)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                zIndex: 5,
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, background 0.3s',
                transform: isOpen 
                  ? 'translate(-50%, calc(-50% + 120px)) rotate(225deg) scale(0)' 
                  : 'translate(-50%, -50%) rotate(45deg) scale(1)',
                opacity: isOpen ? 0 : 1,
                animation: isOpen ? 'none' : 'pulse-seal 2.2s infinite ease-in-out',
                pointerEvents: 'none'
              }}
            >
              <div style={{ transform: 'rotate(-45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={16} fill="rgba(255, 255, 255, 0.3)" stroke="#FFFFFF" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Global direct email fallback (Reveal on Scroll with Delay) */}
        <div className="reveal delay-100" style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            DIRECT TRANSMISSION: <a href={`mailto:${emailAddress}`} style={{ color: '#33ff33', textDecoration: 'none', fontWeight: 600 }}>{emailAddress}</a>
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            maxWidth: '840px',
            margin: '0 auto 2.5rem',
            height: '1px',
            background: 'rgba(255,255,255,0.04)',
          }}
        />

        {/* Social Links (Reveal on Scroll with Delay) */}
        <div className="reveal delay-200" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="interactive"
              aria-label={s.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = s.color;
                el.style.borderColor = `${s.color}33`;
                el.style.background = `${s.color}0d`;
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = 'var(--text-secondary)';
                el.style.borderColor = 'rgba(255,255,255,0.06)';
                el.style.background = 'rgba(255,255,255,0.02)';
                el.style.transform = 'translateY(0)';
              }}
            >
              {s.icon}
              <span>{s.label}</span>
            </a>
          ))}
        </div>

        {/* Footer (Reveal on Scroll with Delay) */}
        <div
          className="reveal delay-300"
          style={{
            marginTop: '5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
            paddingTop: '2rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.04em',
            }}
          >
            Designed &amp; Built with <Heart size={12} fill="#33ff33" stroke="#33ff33" style={{ display: 'inline', verticalAlign: 'middle', margin: '0 2px' }} /> by{' '}
            <span style={{ color: 'var(--text-secondary)' }}>Kris Vasoya</span>
          </p>
          <p
            style={{
              marginTop: '0.4rem',
              fontSize: '0.78rem',
              color: 'rgba(107,114,128,0.6)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            © 2026 · All Rights Reserved
          </p>
        </div>
      </div>
    </section>
  );
};
