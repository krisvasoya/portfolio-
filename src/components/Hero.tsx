import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 15;
    const y = (clientY / innerHeight - 0.5) * 15;
    setMouseOffset({ x, y });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '5rem 0',
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
          opacity: 0.12,
          backgroundImage: 'radial-gradient(rgba(28, 25, 23, 0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '4rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          {/* Left Column (Name & Info) */}
          <div style={{
            flex: '1 1 450px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'flex-start',
          }}>
            {/* VT323 Eyebrow Tag */}
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'var(--color-accent-1)',
              letterSpacing: '0.08em',
              fontWeight: 500
            }}>
              // FULL-STACK DEVELOPER & DESIGNER
            </span>

            {/* Giant Title name split into two weights */}
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '0.9' }}>
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '96px',
                fontWeight: 900,
                color: '#1c1917',
                margin: 0,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                animation: 'none'
              }}>
                KRISH
              </h1>
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '42px',
                fontWeight: 900,
                color: 'rgba(28, 25, 23, 0.18)',
                margin: 0,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                animation: 'none'
              }}>
                VASOYA
              </h1>
            </div>

            {/* Accent divider line */}
            <div style={{
              width: '40px',
              height: '2px',
              backgroundColor: 'var(--color-accent-1)',
              margin: '1.2rem 0'
            }} />

            {/* Hierarchy adjusted Description */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: '1.7',
              color: 'var(--text-secondary)',
              maxWidth: '420px',
              margin: '0 0 1.5rem 0'
            }}>
              Building high-performance web experiences at the intersection of design and engineering. React, TypeScript, and a strong obsession with craft.
            </p>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
              <a 
                href="#projects" 
                className="interactive" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'rgba(28, 25, 23, 0.03)',
                  border: '1px solid rgba(28, 25, 23, 0.1)',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--text-primary)';
                  e.currentTarget.style.color = 'var(--bg-dark)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(28, 25, 23, 0.03)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                <span>View Selected Work</span>
                <ArrowRight size={14} />
              </a>

              <a
                href="https://github.com/krisvasoya"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--text-primary)',
                  paddingBottom: '2px',
                  transition: 'color 0.2s, border-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent-1)';
                  e.currentTarget.style.borderColor = 'var(--color-accent-1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.borderColor = 'var(--text-primary)';
                }}
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Right Column (Metrics & Stat Anchor Blocks) */}
          <div style={{
            flex: '1 1 300px',
            maxWidth: '360px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.8rem',
            alignItems: 'flex-start'
          }}>
            {/* Pill badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.15)',
              borderRadius: '6px',
              padding: '0.4rem 0.8rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--color-accent-1)',
              letterSpacing: '0.04em',
              fontWeight: 600
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-accent-1)' }} />
              <span>AVAILABLE FOR PROJECTS</span>
            </div>

            {/* Stat: Years */}
            <div style={{ width: '100%', borderBottom: '1px solid rgba(28, 25, 23, 0.08)', paddingBottom: '0.8rem' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '3rem',
                fontWeight: 900,
                color: 'var(--text-primary)',
                lineHeight: '1'
              }}>
                3+
              </span>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                marginTop: '0.2rem'
              }}>
                YEARS EXPERIENCE
              </span>
            </div>

            {/* Stat: Projects */}
            <div style={{ width: '100%', borderBottom: '1px solid rgba(28, 25, 23, 0.08)', paddingBottom: '0.8rem' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '3rem',
                fontWeight: 900,
                color: 'var(--text-primary)',
                lineHeight: '1'
              }}>
                12
              </span>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                marginTop: '0.2rem'
              }}>
                PROJECTS SHIPPED
              </span>
            </div>

            {/* Stat: Clients */}
            <div style={{ width: '100%', paddingBottom: '0.8rem' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '3rem',
                fontWeight: 900,
                color: 'var(--text-primary)',
                lineHeight: '1'
              }}>
                6
              </span>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                marginTop: '0.2rem'
              }}>
                HAPPY CLIENTS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
