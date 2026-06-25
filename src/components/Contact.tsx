import React, { useState, useRef } from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export const Contact: React.FC = () => {
  const emailAddress = 'krisvasoya.dev@gmail.com';

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [preset, setPreset] = useState<'greeting' | 'project' | 'career'>('greeting');

  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

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
      color: '#1c1917',
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Smooth subtle parallax tilt
    const rotX = -(y / (rect.height / 2)) * 6;
    const rotY = (x / (rect.width / 2)) * 6;
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    if (!name.trim() || !message.trim()) {
      alert('Please state your identity and message payload before transmission.');
      return;
    }

    setIsSending(true);

    const subjectPrefix = preset === 'career' ? '[CAREER LINK]' : preset === 'project' ? '[PROJECT CO-BUILD]' : '[TRANSMISSION]';
    const mailtoSubject = `${subjectPrefix} from ${name}`;
    const mailtoBody = `Sender Identity: ${name}\nClassification: ${preset}\n\nMessage Payload:\n${message}\n\n---\nTransmitted via Luxury Digital Transmission Core.`;
    const mailLink = `mailto:${emailAddress}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

    // Fake transmission progress sequence
    setTimeout(() => {
      window.location.href = mailLink;
      setIsSending(false);
      setName('');
      setMessage('');
      setIsOpen(false);
    }, 1800);
  };

  return (
    <section id="contact" style={{ padding: '8rem 0 10rem', width: '100%', position: 'relative', overflow: 'hidden' }}>
      
      {/* Volumetric Radial Light Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'blur(80px)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <span
            className="gradient-text"
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)'
            }}
          >
            // 03. CALIBRATION GATEWAY
          </span>
        </div>

        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={1}
          blurStrength={8}
          containerClassName="contact-scroll-reveal"
          rotationEnd="center center"
          wordAnimationEnd="center center"
        >
          Let's Build Something Exceptional
        </ScrollReveal>

        {/* Section Subtitle */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', marginTop: '0.5rem' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', opacity: 0.85 }}>
            Open to collaborations, products, and ambitious ideas.
          </p>
        </div>

        {/* Central Geometric Transmission Interface */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto 4rem',
            perspective: '1000px',
          }}
        >
          <style>{`
            /* Concentric Glassmorphic Rings */
            .transmission-core-wrapper {
              position: relative;
              width: 320px;
              height: 320px;
              margin: 0 auto;
              cursor: pointer;
              transform-style: preserve-3d;
              transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .transmission-ring {
              position: absolute;
              border-radius: 50%;
              border: 1px solid rgba(16, 185, 129, 0.08);
              background: rgba(255, 255, 255, 0.015);
              backdrop-filter: blur(12px);
              transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .ring-outer {
              width: 300px;
              height: 300px;
              border-color: rgba(16, 185, 129, 0.08);
              animation: rotateCW 28s linear infinite;
            }

            .ring-middle {
              width: 220px;
              height: 220px;
              border-color: rgba(16, 185, 129, 0.12);
              animation: rotateCCW 20s linear infinite;
            }

            .ring-inner {
              width: 140px;
              height: 140px;
              border-color: rgba(16, 185, 129, 0.2);
              background: rgba(255, 255, 255, 0.05);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              box-shadow: inset 0 0 20px rgba(16, 185, 129, 0.05);
              animation: rotateCW 12s linear infinite;
            }

            /* Hover states when pre-click */
            .transmission-core-wrapper:hover .ring-outer {
              width: 320px;
              height: 320px;
              border-color: rgba(16, 185, 129, 0.22);
              box-shadow: 0 0 30px rgba(16, 185, 129, 0.05);
            }

            .transmission-core-wrapper:hover .ring-middle {
              width: 240px;
              height: 240px;
              border-color: rgba(16, 185, 129, 0.35);
            }

            .transmission-core-wrapper:hover .ring-inner {
              width: 160px;
              height: 160px;
              border-color: rgba(16, 185, 129, 0.6);
              box-shadow: 
                0 0 40px rgba(16, 185, 129, 0.15),
                inset 0 0 25px rgba(16, 185, 129, 0.1);
            }

            /* Unfolded active form container */
            .terminal-form-panel {
              width: 100%;
              max-width: 580px;
              background: rgba(255, 255, 255, 0.85);
              border: 1px solid rgba(28, 25, 23, 0.15);
              border-radius: 12px;
              backdrop-filter: blur(20px);
              box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(28, 25, 23, 0.05);
              padding: 2.2rem;
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
              opacity: 0;
              transform: translateY(30px) scale(0.98);
              pointer-events: none;
              transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
              margin: 0 auto;
            }

            .terminal-form-panel.active {
              opacity: 1;
              transform: translateY(0) scale(1);
              pointer-events: auto;
            }

            /* Terminal input prompts */
            .terminal-row {
              display: flex;
              flex-direction: column;
              gap: 0.4rem;
            }

            .terminal-prompt {
              font-family: var(--font-mono);
              font-size: 0.85rem;
              color: var(--text-muted);
              letter-spacing: 0.05em;
              display: flex;
              align-items: center;
              gap: 0.4rem;
            }

            .terminal-input, .terminal-textarea {
              background: transparent;
              border: none;
              border-bottom: 1px solid rgba(28, 25, 23, 0.18);
              color: var(--text-primary);
              font-family: var(--font-body);
              font-size: 1rem;
              padding: 0.5rem 0;
              outline: none;
              transition: border-color 0.3s;
              width: 100%;
            }

            .terminal-input:focus, .terminal-textarea:focus {
              border-color: var(--color-accent-1);
            }

            /* Floating particle streams */
            .core-particles {
              position: absolute;
              width: 100%;
              height: 100%;
              pointer-events: none;
              z-index: 2;
            }

            .core-particle {
              position: absolute;
              width: 3px;
              height: 3px;
              background-color: var(--color-accent-1);
              border-radius: 50%;
              opacity: 0;
              animation: core-float 4s infinite linear;
            }

            /* Concentric rings keyframes */
            @keyframes rotateCW {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes rotateCCW {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }

            /* Particle drifting animation path */
            @keyframes core-float {
              0% { transform: translateY(30px) translateX(0) scale(0); opacity: 0; }
              20% { opacity: 0.7; }
              80% { opacity: 0.7; }
              100% { transform: translateY(-40px) translateX(var(--drift-x, 15px)) scale(1.5); opacity: 0; }
            }

            /* Volumetric emerald energy pulse */
            .pulse-wave {
              position: absolute;
              inset: 0;
              border-radius: 50%;
              border: 1px solid var(--color-accent-1);
              opacity: 0;
              animation: pulse-out 6s infinite ease-out;
              pointer-events: none;
            }

            @keyframes pulse-out {
              0% { transform: scale(0.6); opacity: 0; }
              10% { opacity: 0.35; }
              50% { transform: scale(1.4); opacity: 0; }
              100% { transform: scale(1.8); opacity: 0; }
            }

            /* Terminal status signal */
            .terminal-status-glow {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: var(--color-accent-1);
              box-shadow: 0 0 10px var(--color-accent-1);
              display: inline-block;
              animation: signal-blink 2s infinite ease-in-out;
            }

            @keyframes signal-blink {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 1; }
            }

            /* Preset stamp list */
            .terminal-chip {
              background: rgba(28, 25, 23, 0.04);
              border: 1px solid rgba(28, 25, 23, 0.1);
              border-radius: 6px;
              color: var(--text-secondary);
              cursor: pointer;
              font-family: var(--font-mono);
              font-size: 0.8rem;
              padding: 0.4rem 0.9rem;
              transition: all 0.25s;
            }

            .terminal-chip.active {
              background: var(--text-primary);
              border-color: var(--text-primary);
              color: var(--bg-dark);
            }

            .terminal-chip:hover:not(.active) {
              background: rgba(16, 185, 129, 0.06);
              border-color: rgba(16, 185, 129, 0.2);
              color: var(--text-primary);
            }
          `}</style>

          {/* Floating dynamic backdrop */}
          {!isOpen && (
            <div
              className="transmission-core-wrapper"
              onClick={() => setIsOpen(true)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              {/* Radial signal wave pulse */}
              <div className="pulse-wave" />
              <div className="pulse-wave" style={{ animationDelay: '3s' }} />

              {/* Concentric Geometric Rings */}
              <div className="transmission-ring ring-outer" />
              <div className="transmission-ring ring-middle" />
              <div className="transmission-ring ring-inner">
                {/* Floating internal particles */}
                <div className="core-particles">
                  <div className="core-particle" style={{ left: '42%', top: '65%', animationDelay: '0s', '--drift-x': '-18px' } as React.CSSProperties} />
                  <div className="core-particle" style={{ left: '50%', top: '55%', animationDelay: '0.8s', '--drift-x': '12px' } as React.CSSProperties} />
                  <div className="core-particle" style={{ left: '58%', top: '60%', animationDelay: '1.6s', '--drift-x': '-8px' } as React.CSSProperties} />
                  <div className="core-particle" style={{ left: '46%', top: '70%', animationDelay: '2.4s', '--drift-x': '20px' } as React.CSSProperties} />
                </div>

                {/* Core content / CTA */}
                <Terminal size={22} style={{ color: hovered ? 'var(--color-accent-1)' : 'var(--text-primary)', transition: 'color 0.3s', marginBottom: '4px' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.08em',
                    color: hovered ? 'var(--color-accent-1)' : 'var(--text-primary)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    padding: '0 8px',
                    transition: 'color 0.3s'
                  }}
                >
                  {hovered ? 'INITIATE LINK' : 'CORE OFFLINE'}
                </span>
              </div>
            </div>
          )}

          {/* Unfolded Terminal Form Panel */}
          <div className={`terminal-form-panel ${isOpen ? 'active' : ''}`}>
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(28,25,23,0.08)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="terminal-status-glow"></span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                  DIRECT TRANSMISSION SECURED
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  padding: '2px 6px'
                }}
              >
                [ CLOSE ]
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleTransmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              
              {/* Sender Name */}
              <div className="terminal-row">
                <label className="terminal-prompt">
                  <span>&gt; guest_identity:</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter name or agency..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="terminal-input"
                />
              </div>

              {/* Inquiry Reason */}
              <div className="terminal-row">
                <label className="terminal-prompt">
                  <span>&gt; signal_classification:</span>
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                  <button
                    type="button"
                    onClick={() => setPreset('greeting')}
                    className={`terminal-chip ${preset === 'greeting' ? 'active' : ''}`}
                  >
                    GREETING
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreset('project')}
                    className={`terminal-chip ${preset === 'project' ? 'active' : ''}`}
                  >
                    COLLABORATION
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreset('career')}
                    className={`terminal-chip ${preset === 'career' ? 'active' : ''}`}
                  >
                    CAREER
                  </button>
                </div>
              </div>

              {/* Message body */}
              <div className="terminal-row">
                <label className="terminal-prompt">
                  <span>&gt; signal_payload:</span>
                </label>
                <textarea
                  required
                  placeholder="Draft transmission content..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="terminal-textarea"
                  style={{ height: '70px', resize: 'none' }}
                />
              </div>

              {/* Submit btn */}
              <button
                type="submit"
                disabled={isSending}
                style={{
                  background: 'var(--text-primary)',
                  color: 'var(--bg-dark)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.08em',
                  padding: '0.85rem',
                  border: 'none',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  marginTop: '0.5rem'
                }}
              >
                <span>{isSending ? 'TRANSMITTING LINK...' : 'SEND A TRANSMISSION'}</span>
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Integrated terminal-style email address readout */}
        <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '4rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(28, 25, 23, 0.04)',
              border: '1px solid rgba(28, 25, 23, 0.1)',
              borderRadius: '6px',
              padding: '0.5rem 1.2rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              letterSpacing: '0.05em'
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>direct-link:</span>
            <a
              href={`mailto:${emailAddress}`}
              style={{
                color: 'var(--color-accent-1)',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-2)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-accent-1)'}
            >
              {emailAddress}
            </a>
          </div>
        </div>

        {/* Separator line */}
        <div
          style={{
            maxWidth: '840px',
            margin: '0 auto 2.5rem',
            height: '1px',
            background: 'rgba(28, 25, 23, 0.08)',
          }}
        />

        {/* Social Links */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
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
                padding: '0.55rem 1.2rem',
                borderRadius: '8px',
                background: 'rgba(28, 25, 23, 0.03)',
                border: '1px solid rgba(28, 25, 23, 0.08)',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 500,
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = s.color;
                el.style.borderColor = 'var(--text-primary)';
                el.style.background = 'rgba(28, 25, 23, 0.06)';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = 'var(--text-secondary)';
                el.style.borderColor = 'rgba(28, 25, 23, 0.08)';
                el.style.background = 'rgba(28, 25, 23, 0.03)';
                el.style.transform = 'translateY(0)';
              }}
            >
              {s.icon}
              <span>{s.label}</span>
            </a>
          ))}
        </div>

        {/* Footer info */}
        <div
          style={{
            marginTop: '5rem',
            borderTop: '1px solid rgba(28, 25, 23, 0.08)',
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
            Designed &amp; Built with <span style={{ color: 'var(--color-accent-1)' }}>♥</span> by{' '}
            <span style={{ color: 'var(--text-secondary)' }}>Kris Vasoya</span>
          </p>
          <p
            style={{
              marginTop: '0.4rem',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
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
