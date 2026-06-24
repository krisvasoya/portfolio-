import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ExternalLink } from 'lucide-react';
import './BounceCards.css';

interface ProjectItem {
  title: string;
  tag: string;
  desc: string;
  tech: string[];
  github: string;
  demo: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
}

interface BounceCardsProps {
  className?: string;
  projects: ProjectItem[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}

export const BounceCards: React.FC<BounceCardsProps> = ({
  className = '',
  projects = [],
  containerWidth = 800,
  containerHeight = 420,
  animationDelay = 0.3,
  animationStagger = 0.08,
  easeType = 'elastic.out(1, 0.75)',
  transformStyles = [
    'rotate(-9deg) translate(-220px)',
    'rotate(-3deg) translate(-75px)',
    'rotate(3deg) translate(75px)',
    'rotate(9deg) translate(220px)'
  ],
  enableHover = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bounce-card',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay, isDesktop]);

  const getNoRotationTransform = (transformStr: string) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform: string, offsetX: number) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !isDesktop || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    projects.forEach((_, i) => {
      const target = q(`.bounce-card-${i}`);
      gsap.killTweensOf(target);

      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        const noRotationTransform = getNoRotationTransform(baseTransform);
        gsap.to(target, {
          transform: noRotationTransform,
          scale: 1.05,
          zIndex: 10,
          boxShadow: '0 20px 40px rgba(51, 255, 51, 0.25)',
          borderColor: 'var(--color-accent-1)',
          duration: 0.45,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      } else {
        // Push siblings aside depending on position (left or right relative to hovered index)
        const offsetX = i < hoveredIdx ? -200 : 200;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);

        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.03;

        gsap.to(target, {
          transform: pushedTransform,
          scale: 0.9,
          zIndex: 1,
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
          borderColor: 'rgba(255, 255, 255, 0.03)',
          duration: 0.45,
          ease: 'power3.out',
          delay,
          overwrite: 'auto'
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !isDesktop || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    projects.forEach((_, i) => {
      const target = q(`.bounce-card-${i}`);
      gsap.killTweensOf(target);
      const baseTransform = transformStyles[i] || 'none';
      gsap.to(target, {
        transform: baseTransform,
        scale: 1,
        zIndex: i,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(255, 255, 255, 0.04)',
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    });
  };

  // Mobile viewport: Fallback to a responsive grid of project cards
  if (!isDesktop) {
    return (
      <div className="mobile-projects-grid">
        {projects.map((project, idx) => (
          <div 
            key={idx} 
            className="mobile-project-card glass-card"
            onClick={() => window.open(project.demo, '_blank', 'noopener,noreferrer')}
            style={{ cursor: 'pointer' }}
          >
            <div className="project-card-header">
              <div className="project-card-icon-tag">
                {project.icon}
                <span className="project-card-tag">{project.tag}</span>
              </div>
              <div className="project-card-links">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="GitHub"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </a>
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Demo"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>

            <div className="project-card-preview">
              {project.preview}
            </div>

            <div className="project-card-body">
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-desc">{project.desc}</p>
              <div className="project-card-tech-list">
                {project.tech.map((t, tIdx) => (
                  <span key={tIdx} className="project-card-tech-badge">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop viewport: Interactive bouncable cards stack
  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight,
        margin: '0 auto'
      }}
    >
      {projects.map((project, idx) => (
        <div
          key={idx}
          className={`bounce-card bounce-card-${idx}`}
          style={{
            transform: transformStyles[idx] ?? 'none',
            zIndex: idx
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
          onClick={() => window.open(project.demo, '_blank', 'noopener,noreferrer')}
        >
          {/* Project Details Inner Layout */}
          <div className="project-card-inner">
            
            {/* Header info */}
            <div className="project-card-header">
              <div className="project-card-icon-tag">
                {project.icon}
                <span className="project-card-tag">{project.tag}</span>
              </div>
              <div className="project-card-links">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="interactive" 
                  aria-label="GitHub"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </a>
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="interactive" 
                  aria-label="Demo"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>

            {/* Visual preview */}
            <div className="project-card-preview">
              {project.preview}
            </div>

            {/* Footer details */}
            <div className="project-card-body">
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-desc">{project.desc}</p>
              <div className="project-card-tech-list">
                {project.tech.map((t, tIdx) => (
                  <span key={tIdx} className="project-card-tech-badge">{t}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};
