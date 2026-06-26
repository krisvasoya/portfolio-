import React from 'react';
import { FileDown } from 'lucide-react';
import { GooeyNav } from './GooeyNav';

export const Navbar: React.FC = () => {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(7, 9, 14, 0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
      width: '100%'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px'
      }}>
        {/* Logo */}
        <a href="#home" className="interactive" style={{
          textDecoration: 'none',
          fontSize: '1.3rem',
          fontWeight: 800,
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-0.03em',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <span className="gradient-text">KRISVASOYA</span>
        </a>

        {/* Liquid Gooey Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <GooeyNav
            items={[
              { label: 'About', href: '#about' },
              { label: 'Projects', href: '#projects' },
              { label: 'Contact', href: '#contact' }
            ]}
          />
          
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
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>

          {/* Resume Download CTA */}
          <a 
            href="/kris_cv.pdf" 
            download="kris_cv.pdf"
            target="_blank" 
            rel="noopener noreferrer"
            className="secondary-btn interactive" 
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <FileDown size={14} />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </nav>
  );
};
