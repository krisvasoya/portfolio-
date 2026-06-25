import React, { useState, useRef, useEffect } from 'react';
import { Heart, Cpu, Award, ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
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
  const [isSending, setIsSending] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [contactStage, setContactStage] = useState<'mailbox' | 'envelope' | 'form' | 'sent'>('mailbox');

  const containerRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  
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
  };

  const handleFocus = () => {
    setIsOpen(true);
    setContactStage('form');
  };

  const handleBlur = () => {
    setTimeout(() => {
      const activeEl = document.activeElement;
      const isInside = letterRef.current?.contains(activeEl);
      if (!isInside) {
        setIsOpen(false);
        setContactStage('mailbox');
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
    setContactStage('sent');

    const subjectPrefix = preset === 'career' ? '[CAREER OPPORTUNITY]' : preset === 'project' ? '[PROJECT COLLABORATION]' : '[HELLO / FRIENDLY CHAT]';
    const mailtoSubject = `${subjectPrefix} from ${name}`;
    const mailtoBody = `Dear Kris,\n\nName: ${name}\nPreset: ${preset}\n\nMessage:\n${message}\n\n---\nTransmitted via 3D Mailbox Correspondence Portal.`;
    const mailLink = `mailto:${emailAddress}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

    // Wait 0.8s for the fly-away animation to complete, then open mail client and reset
    setTimeout(() => {
      setIsOpen(false);
      window.location.href = mailLink;

      setTimeout(() => {
        setName('');
        setMessage('');
        setPreset('greeting');
        setIsSending(false);
        setContactStage('mailbox');
      }, 1000);
    }, 800);
  };

  const getPresetIcon = () => {
    switch (preset) {
      case 'project':
        return <Cpu size={16} style={{ color: '#ffffff' }} />;
      case 'career':
        return <Award size={16} style={{ color: '#ffffff' }} />;
      default:
        return <Heart size={16} style={{ color: '#ffffff' }} />;
    }
  };

  return (
    <section id="contact" style={{ padding: '8rem 0 12rem', width: '100%', position: 'relative', overflow: 'hidden' }}>

      {/* Abstract Black Lines Geometric Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("../assets/background_lines.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Vector Geometric Line Art Overlay */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.2,
        }}
      >
        <defs>
          <linearGradient id="glowGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#888888" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="glowGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#888888" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="15%" x2="100%" y2="85%" stroke="url(#glowGrad1)" strokeWidth="1" />
        <line x1="100%" y1="25%" x2="0" y2="75%" stroke="url(#glowGrad2)" strokeWidth="1" />
        <line x1="15%" y1="0" x2="85%" y2="100%" stroke="url(#glowGrad1)" strokeWidth="0.8" />
        <line x1="85%" y1="0" x2="15%" y2="100%" stroke="url(#glowGrad2)" strokeWidth="0.8" />
      </svg>

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
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="70%" stopColor="#888888" stopOpacity="1" />
            <stop offset="100%" stopColor="#888888" stopOpacity="0" />
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
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="70%" stopColor="#888888" stopOpacity="1" />
            <stop offset="100%" stopColor="#888888" stopOpacity="0" />
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

        {/* Mailbox Stage with Envelope and Form Inside */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '560px',
            height: '380px',
            margin: '80px auto 40px',
            transformStyle: 'preserve-3d',
          }}
        >
          <style>{`
            /* Pulsing wax seal keyframes */
            @keyframes pulse-seal {
              0%, 100% {
                box-shadow: 0 0 12px rgba(255, 255, 255, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.3);
                filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.15));
              }
              50% {
                box-shadow: 0 0 24px rgba(255, 255, 255, 0.7), inset 0 1px 3px rgba(255, 255, 255, 0.4);
                filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.3));
              }
            }
            .mailbox-hint {
              position: absolute;
              top: -45px;
              left: 50%;
              transform: translateX(-50%);
              background: rgba(11, 5, 1, 0.85);
              border: 1px solid rgba(255, 255, 255, 0.3);
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
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 255, 255, 0.1);
              pointer-events: none;
              animation: bounce-hint 2.2s infinite ease-in-out;
              z-index: 110;
            }
            @keyframes bounce-hint {
              0%, 100% { transform: translate(-50%, 0); }
              50% { transform: translate(-50%, -6px); }
            }
          `}</style>

          {/* Backdrop overlay for closing active states when clicking outside */}
          {(contactStage === 'form' || contactStage === 'envelope') && (
            <div 
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9,
                cursor: 'default',
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (contactStage === 'form') {
                  setContactStage('envelope');
                  setIsOpen(false);
                } else if (contactStage === 'envelope') {
                  setContactStage('mailbox');
                }
              }}
            />
          )}

          {/* Centered Stage Instruction Hints */}
          {contactStage === 'mailbox' && (
            <div className="mailbox-hint">
              <Mail size={13} style={{ color: '#ffffff', filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))' }} />
              <span>Click Mailbox to Open Form</span>
            </div>
          )}
          {contactStage === 'envelope' && (
            <div className="mailbox-hint">
              <Mail size={13} style={{ color: '#ffffff', filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))' }} />
              <span>Click to Write Message</span>
            </div>
          )}

          {/* 3D Mailbox Container */}
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => {
              if (contactStage === 'mailbox') {
                e.stopPropagation();
                setContactStage('envelope');
              } else if (contactStage === 'envelope') {
                e.stopPropagation();
                setContactStage('mailbox');
              }
            }}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              perspective: '1000px',
              cursor: (contactStage === 'mailbox' || contactStage === 'envelope') ? 'pointer' : 'default',
              zIndex: 2,
            }}
          >
            <style>{`
              .letter-input, .letter-textarea {
                background: rgba(10, 10, 10, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.18);
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
                border-color: #ffffff;
                background: rgba(10, 10, 10, 0.95);
                box-shadow: 0 0 12px rgba(255, 255, 255, 0.25);
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
              .preset-chip {
                background: rgba(11, 5, 1, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.15);
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
                background: #FFFFFF;
                border-color: #FFFFFF;
                color: #050505;
                box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
                transform: translateY(-1px);
              }
              .preset-chip:hover:not(.active) {
                border-color: rgba(255, 255, 255, 0.4);
                color: #FFFFFF;
                background: rgba(255, 255, 255, 0.05);
              }
              .letter-stamp {
                width: 48px;
                height: 58px;
                border: 1px dashed rgba(255, 255, 255, 0.45);
                border-radius: 4px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 2px;
                position: absolute;
                top: 1.4rem;
                right: 1.4rem;
                background: rgba(255, 255, 255, 0.04);
                overflow: hidden;
              }
              .letter-stamp::after {
                content: '';
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
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
                color: rgba(255, 255, 255, 0.6);
                letter-spacing: 0.05em;
              }
              @media (max-width: 580px) {
                .letter-card-el {
                  width: 96% !important;
                  height: 320px !important;
                  padding: 1.1rem !important;
                  gap: 0.5rem !important;
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

            <motion.div 
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                rotateX: tilt.x,
                rotateY: tilt.y,
                zIndex: 2,
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            >
              {/* The 2.5D Mailbox Figure */}
              <div style={{ position: 'relative', width: '280px', height: '240px', margin: '60px auto 0', transformStyle: 'preserve-3d' }}>
                
                {/* 1. Flag (Animated) */}
                <motion.div
                  className="mailbox-flag"
                  variants={{
                    down: {
                      rotate: -90,
                      transition: { type: 'spring', stiffness: 100, damping: 15 }
                    },
                    up: {
                      rotate: 0,
                      transition: { type: 'spring', stiffness: 120, damping: 12 }
                    }
                  }}
                  animate={contactStage !== 'mailbox' ? 'up' : 'down'}
                  whileHover={{ rotate: contactStage !== 'mailbox' ? 0 : [-90, -82, -90, -98, -90], transition: { duration: 0.6 } }}
                  style={{
                    position: 'absolute',
                    right: '25px',
                    bottom: '120px',
                    width: '6px',
                    height: '60px',
                    background: '#ff4f4f',
                    originX: '3px',
                    originY: '52px',
                    zIndex: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Flag Banner */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '32px',
                    height: '20px',
                    background: '#ff4f4f',
                    borderRadius: '2px',
                  }} />
                  {/* Gold Knob Pivot */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: '-6px',
                    width: '18px',
                    height: '18px',
                    background: '#ffd54f',
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }} />
                </motion.div>

                {/* 2. Platform */}
                <div style={{
                  position: 'absolute',
                  bottom: '88px',
                  left: '20px',
                  width: '240px',
                  height: '12px',
                  background: '#7c232e',
                  borderRadius: '6px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  zIndex: 3,
                }} />

                {/* 3. Post / Stand */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '125px',
                  width: '30px',
                  height: '90px',
                  background: 'linear-gradient(90deg, #3a3848 0%, #2e2c3a 100%)',
                  borderRadius: '0 0 6px 6px',
                  zIndex: 1,
                }} />

                {/* 4. Mailbox Main Body Cylinder (Teal) */}
                <div style={{
                  position: 'absolute',
                  bottom: '100px',
                  left: '95px',
                  width: '145px',
                  height: '120px',
                  background: 'linear-gradient(135deg, #00b09b 0%, #008277 100%)',
                  borderRadius: '0 60px 0 0',
                  boxShadow: 'inset 0 10px 20px rgba(255,255,255,0.1), 0 10px 20px rgba(0,0,0,0.4)',
                  overflow: 'hidden',
                  zIndex: 2,
                }}>
                  {/* Specular highlight */}
                  <div style={{
                    position: 'absolute',
                    top: '25px',
                    left: 0,
                    width: '100%',
                    height: '8px',
                    background: '#ffffff',
                    opacity: 0.35,
                  }} />
                  {/* Inside dark recess */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#0b0914',
                    opacity: contactStage !== 'mailbox' ? 0.95 : 0,
                    transition: 'opacity 0.4s ease',
                    borderRadius: '0 60px 0 0',
                  }} />
                </div>

                {/* 5. Mailbox Front Door (Red Arch, Pivoting Down) */}
                <motion.div
                  className="mailbox-door"
                  variants={{
                    closed: {
                      rotateX: 0,
                      boxShadow: 'inset 0 4px 10px rgba(255,255,255,0.2), 0 4px 8px rgba(0,0,0,0.3)',
                      transition: { type: 'spring', stiffness: 100, damping: 15 }
                    },
                    open: {
                      rotateX: 110,
                      boxShadow: 'inset 0 4px 10px rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.1)',
                      transition: { type: 'spring', stiffness: 120, damping: 14 }
                    }
                  }}
                  animate={contactStage !== 'mailbox' ? 'open' : 'closed'}
                  style={{
                    position: 'absolute',
                    bottom: '100px',
                    left: '40px',
                    width: '110px',
                    height: '120px',
                    background: '#ff5d5d',
                    borderRadius: '60px 60px 0 0',
                    transformOrigin: 'bottom center',
                    zIndex: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #d23c3c',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* Envelope Graphic on Door */}
                  <div style={{
                    width: '45px',
                    height: '30px',
                    background: '#ffa726',
                    borderRadius: '3px',
                    position: 'relative',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    marginTop: '25px',
                  }}>
                    <svg width="100%" height="100%" viewBox="0 0 45 30" fill="none" style={{ position: 'absolute', inset: 0 }}>
                      <path d="M 0,0 L 22.5,15 L 45,0 M 0,30 L 18,17 M 45,30 L 27,17" stroke="#e65100" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* 6. Vector Envelope (Slides out from Mailbox) */}
          <motion.div
            variants={{
              hidden: {
                left: '50%',
                top: '50%',
                x: -170,
                y: -50,
                scale: 0.1,
                opacity: 0,
                pointerEvents: 'none',
                transition: { type: 'spring', stiffness: 100, damping: 15 }
              },
              visible: {
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
                scale: 1,
                opacity: 1,
                pointerEvents: 'auto',
                transition: { type: 'spring', stiffness: 90, damping: 13 }
              },
              formActive: {
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
                scale: 0.95,
                opacity: 0.25,
                pointerEvents: 'none',
                transition: { duration: 0.4 }
              },
              sent: {
                left: '50%',
                top: '50%',
                x: '150%',
                y: '-150%',
                scale: 0.1,
                opacity: 0,
                transition: { duration: 0.8, ease: 'easeInOut' }
              }
            }}
            animate={
              contactStage === 'mailbox'
                ? 'hidden'
                : contactStage === 'envelope'
                ? 'visible'
                : contactStage === 'form'
                ? 'formActive'
                : 'sent'
            }
            onClick={(e) => {
              if (contactStage === 'envelope') {
                e.stopPropagation();
                setContactStage('form');
                setIsOpen(true);
              }
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '400px',
              height: '250px',
              background: 'rgba(15, 15, 15, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255, 255, 255, 0.05)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              cursor: contactStage === 'envelope' ? 'pointer' : 'default',
            }}
          >
            {/* Flap lines using SVGs */}
            <svg width="100%" height="100%" viewBox="0 0 400 250" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <polygon points="0,0 200,125 400,0" fill="none" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1.5" />
              <polygon points="0,0 200,125 0,250" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
              <polygon points="400,0 200,125 400,250" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
              <polygon points="0,250 200,120 400,250" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
            </svg>

            {/* Pulsing wax seal in the middle */}
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FFFFFF 0%, #888888 100%)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#050505',
              zIndex: 5,
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
              animation: 'pulse-seal 2s infinite ease-in-out'
            }}>
              <Heart size={16} fill="rgba(5, 5, 5, 0.8)" stroke="none" />
            </div>
          </motion.div>

          {/* 7. Details Card (Slides up/out from Envelope) */}
          <motion.div
            ref={letterRef}
            className="letter-card-el"
            variants={{
              hidden: {
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-20%',
                scale: 0.1,
                opacity: 0,
                pointerEvents: 'none',
                transition: { type: 'spring', stiffness: 100, damping: 15 }
              },
              visible: {
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
                scale: 1,
                opacity: 1,
                pointerEvents: 'auto',
                transition: { type: 'spring', stiffness: 90, damping: 13 }
              },
              sent: {
                left: '50%',
                top: '50%',
                x: '150%',
                y: '-150%',
                scale: 0.15,
                rotate: 35,
                opacity: 0,
                pointerEvents: 'none',
                transition: { duration: 0.8, ease: 'easeInOut' }
              }
            }}
            animate={contactStage === 'form' ? 'visible' : contactStage === 'sent' ? 'sent' : 'hidden'}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '460px',
              height: '345px',
              background: 'rgba(12, 11, 10, 0.94)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
              padding: '1.4rem',
              zIndex: 100,
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Details Card Content */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.4rem', width: '100%' }}>
              <h3 className="letter-heading-el" style={{ fontFamily: '"Outfit", sans-serif', fontSize: '1.6rem', fontWeight: 300, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
                Send a Message
              </h3>
              <p style={{ fontFamily: '"Plus Jakarta Sans", var(--font-body), sans-serif', fontSize: '0.82rem', color: '#BFBFBF', margin: '2px 0 0' }}>
                Let's build something remarkable.
              </p>
            </div>

            <div className="letter-stamp">
              <span className="stamp-text">KRIS</span>
              {getPresetIcon()}
              <span className="stamp-text">2026</span>
            </div>

            <form onSubmit={handleTransmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', marginTop: '0.2rem' }}>
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
          </motion.div>
        </div>

        {/* Global direct email fallback (Reveal on Scroll with Delay) */}
        <div className="reveal delay-100" style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            DIRECT TRANSMISSION: <a href={`mailto:${emailAddress}`} style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}>{emailAddress}</a>
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
            Designed &amp; Built with <Heart size={12} fill="#ffffff" stroke="#ffffff" style={{ display: 'inline', verticalAlign: 'middle', margin: '0 2px' }} /> by{' '}
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
