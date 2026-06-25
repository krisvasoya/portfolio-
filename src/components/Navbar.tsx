import React, { useEffect, useState } from 'react';
import { FileDown } from 'lucide-react';

const SECTIONS = [
  { id: 'home', label: 'HOME', num: '00' },
  { id: 'about', label: 'ABOUT', num: '01' },
  { id: 'projects', label: 'PROJECTS', num: '02' },
  { id: 'contact', label: 'SIGNAL', num: '03' }
];

export const Navbar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // detects when a section is in the middle of the viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const index = SECTIONS.findIndex((s) => s.id === id);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const navigateTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const prevIndex = (activeIndex - 1 + SECTIONS.length) % SECTIONS.length;
  const prevSection = SECTIONS[prevIndex];

  const nextIndex = (activeIndex + 1) % SECTIONS.length;
  const nextSection = SECTIONS[nextIndex];

  const currentSection = SECTIONS[activeIndex];

  return (
    <nav className="sticky-navbar">
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '60px',
        padding: '0 1rem'
      }}>
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            navigateTo('home');
          }}
          className="interactive" 
          style={{
            textDecoration: 'none',
            fontSize: '1.2rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <span className="gradient-text">KRISVASOYA</span>
        </a>

        {/* Directional Navigation hints (Galekto style) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.95rem'
        }}>
          {/* Previous Section trigger */}
          <button 
            onClick={() => navigateTo(prevSection.id)} 
            className="interactive"
            aria-label={`Scroll to previous section: ${prevSection.label}`}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.3rem 0.6rem',
              borderRadius: '4px',
              transition: 'color 0.2s, background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-accent-1)';
              e.currentTarget.style.background = 'rgba(28, 25, 23, 0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.background = 'none';
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>←</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600 }}>{prevSection.label}</span>
            <span style={{ opacity: 0.5 }}>{prevSection.num}</span>
          </button>

          {/* Current Section / Total */}
          <div style={{ 
            color: 'var(--text-muted)', 
            fontSize: '0.8rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.2rem',
            padding: '0 0.2rem',
            borderLeft: '1px solid rgba(28, 25, 23, 0.1)',
            borderRight: '1px solid rgba(28, 25, 23, 0.1)'
          }}>
            <span style={{ color: 'var(--color-accent-1)', fontWeight: 'bold' }}>{currentSection.num}</span>
            <span>/</span>
            <span>03</span>
          </div>

          {/* Next Section trigger */}
          <button 
            onClick={() => navigateTo(nextSection.id)} 
            className="interactive"
            aria-label={`Scroll to next section: ${nextSection.label}`}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.3rem 0.6rem',
              borderRadius: '4px',
              transition: 'color 0.2s, background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-accent-1)';
              e.currentTarget.style.background = 'rgba(28, 25, 23, 0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.background = 'none';
            }}
          >
            <span style={{ opacity: 0.5 }}>{nextSection.num}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600 }}>{nextSection.label}</span>
            <span style={{ fontSize: '1.1rem' }}>→</span>
          </button>
        </div>

        {/* External Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* GitHub Icon Link */}
          <a 
            href="https://github.com/krisvasoya" 
            target="_blank" 
            rel="noopener noreferrer"
            className="interactive"
            aria-label="GitHub Profile"
            style={{
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>

          {/* Resume Download CTA */}
          <a 
            href="https://github.com/krisvasoya" 
            target="_blank" 
            rel="noopener noreferrer"
            className="interactive" 
            style={{
              padding: '0.4rem 0.8rem',
              fontSize: '0.78rem',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              background: 'transparent',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent-1)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.background = 'rgba(16, 185, 129, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <FileDown size={12} />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </nav>
  );
};
