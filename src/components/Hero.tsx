import React, { useState } from 'react';
import { ArrowRight, MapPin, Download } from 'lucide-react';
import FallingText from './FallingText';

export const Hero: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMouseOffset({ x, y });
  };


  const bioText =
    "I'm Kris Vasoya, a Frontend Engineer who crafts highly animated, scalable digital interfaces with a focus on WebGL, React, and creative UI systems. I turn ideas into pixel-perfect, performance-driven products.";

  const highlightWords = ['Kris', 'Vasoya,', 'Frontend', 'Engineer', 'animated,', 'WebGL,', 'React,', 'creative', 'pixel-perfect,', 'performance-driven'];

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '7rem 0 5rem',
        width: '100%',
        backgroundColor: 'transparent'
      }}
    >
      {/* Parallax Grid Background */}
      <div
        className="grid-bg"
        style={{
          transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
          transition: 'transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
          position: 'absolute',
          inset: '-20px',
          zIndex: 0,
        }}
      />

      {/* Radial glow accent */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-5%',
          width: '45vw',
          height: '45vw',
          background: 'radial-gradient(circle, rgba(51,255,51,0.06) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'blur(50px)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '4rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap-reverse'
        }}>
          {/* Left Column (Main Info & Interactive Terminal) */}
          <div style={{
            flex: '1 1 520px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'flex-start',
          }}>
            {/* Top row label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontSize: '0.82rem', color: '#33ff33', letterSpacing: '0.15em', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>[01 // PORTFOLIO]</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(51, 255, 51, 0.4)' }} />
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <MapPin size={13} style={{ color: '#33ff33' }} />
                <span>India · Remote</span>
              </div>
            </div>

            {/* Giant Bold Title */}
            <h1
              style={{
                fontSize: 'clamp(2.6rem, 6vw, 4.4rem)',
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                margin: 0
              }}
            >
              Building <span style={{ color: '#33ff33' }}>Digital</span>
              <br />
              Experiences
              <br />
              <span className="gradient-text" style={{ fontStyle: 'italic', textTransform: 'lowercase' }}>that stick</span>
            </h1>

            {/* Retro Terminal carrying physics FallingText */}
            <div style={{
              width: '100%',
              maxWidth: '680px',
              background: 'rgba(12, 12, 12, 0.85)',
              border: '1px solid rgba(51, 255, 51, 0.22)',
              borderRadius: '12px',
              boxShadow: '0 20px 45px rgba(51, 255, 51, 0.08)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Terminal Title Bar */}
              <div style={{
                background: 'rgba(10, 10, 10, 0.95)',
                padding: '0.6rem 1rem',
                borderBottom: '1px solid rgba(51, 255, 51, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#33ff33', opacity: 0.7 }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#33ff33', opacity: 0.4 }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#33ff33', opacity: 0.2 }} />
                </div>
                <span style={{ fontSize: '0.68rem', color: '#BFBFBF', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.05em' }}>kris_bio.sh</span>
                <span style={{ fontSize: '0.68rem', color: '#33ff33', opacity: 0.5, fontFamily: 'var(--font-mono)' }}>v1.3.0</span>
              </div>
              
              {/* Terminal Content */}
              <div style={{ padding: '1rem', position: 'relative' }}>
                {/* Hint label */}
                <p
                  style={{
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                    fontFamily: 'var(--font-mono)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <span style={{ color: '#33ff33', fontSize: '0.6rem' }}>✦</span>
                  Drag words to test physics
                </p>
                <FallingText
                  text={bioText}
                  highlightWords={highlightWords}
                  highlightClass="highlighted"
                  trigger="scroll"
                  backgroundColor="transparent"
                  wireframes={false}
                  gravity={0.5}
                  fontSize="clamp(0.92rem, 1.8vw, 1.02rem)"
                  mouseConstraintStiffness={0.8}
                  containerHeight={230}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '0.5rem',
              flexWrap: 'wrap',
            }}>
              <a href="#projects" className="glow-btn interactive">
                <span>Explore Projects</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="https://github.com/krisvasoya"
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-btn interactive"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', borderColor: 'rgba(51, 255, 51, 0.2)' }}
              >
                <Download size={15} style={{ color: '#33ff33' }} />
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          {/* Right Column (Slanted Stats / Metrics Block) */}
          <div className="reveal delay-300" style={{
            flex: '1 1 300px',
            maxWidth: '380px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            borderLeft: '2px solid rgba(51, 255, 51, 0.15)',
            paddingLeft: '2rem',
            alignSelf: 'stretch',
            justifyContent: 'center'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#33ff33', fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                <span>↑ 10+</span>
                <span style={{ fontSize: '0.85rem', color: '#BFBFBF', letterSpacing: '0.05em' }}>PROJECTS SHIPPED</span>
              </div>
              <p style={{ fontSize: '0.86rem', color: '#BFBFBF', marginTop: '0.4rem', lineHeight: '1.6' }}>
                High-performance digital products launched successfully, driving measurable engagement and conversions.
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#33ff33', fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                <span>3+</span>
                <span style={{ fontSize: '0.85rem', color: '#BFBFBF', letterSpacing: '0.05em' }}>YEARS OF CRAFT</span>
              </div>
              <p style={{ fontSize: '0.86rem', color: '#BFBFBF', marginTop: '0.4rem', lineHeight: '1.6' }}>
                Refining modern web interfaces, modular layout systems, and physics-driven interactive canvas components.
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#33ff33', fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                <span>100%</span>
                <span style={{ fontSize: '0.85rem', color: '#BFBFBF', letterSpacing: '0.05em' }}>PIXEL PERFECT</span>
              </div>
              <p style={{ fontSize: '0.86rem', color: '#BFBFBF', marginTop: '0.4rem', lineHeight: '1.6' }}>
                Dedicated to responsive layout structure, clean typography hierarchy, and fluid micro-animations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mouse Scroll Indicator (Bottom Center) */}
      <div 
        style={{
          position: 'absolute',
          bottom: '1.8rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      >
        <style>{`
          @keyframes scroll-pulse-travel {
            0% {
              transform: translateY(-10px) scale(0.6);
              opacity: 0;
            }
            20% {
              transform: translateY(0px) scale(1);
              opacity: 1;
            }
            40% {
              transform: translateY(12px) scale(0.9);
              opacity: 0.9;
            }
            80% {
              transform: translateY(38px) scale(0.6);
              opacity: 0.25;
            }
            100% {
              transform: translateY(50px) scale(0.3);
              opacity: 0;
            }
          }
        `}</style>
        <span style={{
          fontSize: '0.65rem',
          color: '#BFBFBF',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-mono)',
          opacity: 0.8
        }}>
          Scroll to explore
        </span>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '80px' }}>
          {/* Sleek SVG Mouse Outline with Gradient */}
          <svg width="22" height="34" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.85 }}>
            <rect x="2" y="2" width="20" height="32" rx="10" stroke="url(#mouseGrad)" strokeWidth="1.8" />
            <line x1="12" y1="8" x2="12" y2="14" stroke="rgba(51, 255, 51, 0.25)" strokeWidth="1.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="mouseGrad" x1="0" y1="0" x2="0" y2="100%">
                <stop offset="0%" stopColor="#33FF33" />
                <stop offset="100%" stopColor="rgba(51, 255, 51, 0.15)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Vertical guide wire */}
          <div style={{
            width: '1.5px',
            height: '35px',
            background: 'linear-gradient(to bottom, #33FF33 0%, rgba(51, 255, 51, 0) 100%)',
            opacity: 0.3,
            marginTop: '4px',
            position: 'relative'
          }} />

          {/* Traveling light particle */}
          <div style={{
            position: 'absolute',
            top: '12px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#33FF33',
            boxShadow: '0 0 10px #33FF33, 0 0 4px #33FF33',
            animation: 'scroll-pulse-travel 2.2s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }} />
        </div>
      </div>
    </section>
  );
};
