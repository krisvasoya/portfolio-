import React from 'react';
import { ShieldCheck, Calendar, Code2, Zap, Globe } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export const About: React.FC = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code2 size={16} />,
      skills: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'HTML5 / CSS3', 'C / C++'],
    },
    {
      title: 'Frameworks & UI',
      icon: <Zap size={16} />,
      skills: ['React.js', 'Next.js', 'Vite', 'Three.js (WebGL)', 'TailwindCSS'],
    },
    {
      title: 'Tools & Backend',
      icon: <Globe size={16} />,
      skills: ['Node.js', 'Git / GitHub', 'Vercel', 'REST APIs', 'Puppeteer / Cheerio'],
    },
  ];

  const timelineEvents = [
    {
      year: '2026',
      title: 'WebGL Dashboards & 3D Experiences',
      desc: 'Built FactoryOS — an industrial automation dashboard — and Obsidian Brew, an immersive scroll-linked 3D coffee shop, using Vite, TypeScript, and Three.js.',
    },
    {
      year: '2025',
      title: 'Full-Stack & Restaurant Systems',
      desc: 'Architected and deployed Restorant Frontend with interactive cart logic, alongside Puzzel Alpha — a geometric puzzle game. Focused on component reuse and smooth routing.',
    },
    {
      year: '2024',
      title: 'Automation & Algorithm Tools',
      desc: 'Created SiteGrab-Pro for web scraping/automation and designed visual solvers for complex algorithmic problems like N-Queen and pathfinding.',
    },
  ];

  const highlights = [
    { label: 'UI Components', value: '100+' },
    { label: 'Open Source Repos', value: '15+' },
    { label: 'Deployed Projects', value: '5' },
  ];

  return (
    <section
      id="about"
      style={{ padding: '7rem 0', width: '100%', position: 'relative' }}
    >
      {/* Section background accent */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '-5%',
          width: '35vw',
          height: '35vw',
          background: 'radial-gradient(circle, rgba(79,172,254,0.05) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'blur(50px)',
          transform: 'translateY(-50%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Heading */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span
            className="gradient-text"
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            01. Behind the Code
          </span>
        </div>

        {/* ScrollReveal statement — words animate in on scroll */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={4}
          blurStrength={8}
          containerClassName="about-scroll-reveal"
          rotationEnd="center center"
          wordAnimationEnd="center center"
        >
          I craft interfaces where engineering meets artistry — building scalable, immersive digital systems driven by creativity and precision.
        </ScrollReveal>

        <div style={{ marginBottom: '3.5rem', marginTop: '1.5rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)' }}>
            About Me &amp; Tech Stack
          </h2>
        </div>

        {/* Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left: Bio & Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Bio */}
            <div className="reveal delay-100" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem' }}>
                I'm a front-end developer who believes code should be as{' '}
                <strong style={{ color: 'var(--text-primary)' }}>visually engaging</strong> as it
                is performant. I specialize in building interactive systems that blend clean
                architecture with expressive design.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem' }}>
                From crafting immersive 3D scenes with Three.js to building complex dashboard
                logic, I bring strong attention to detail and a passion for the intersection
                of engineering and visual design.
              </p>

              {/* Highlight numbers */}
              <div
                style={{
                  display: 'flex',
                  gap: '2rem',
                  marginTop: '0.5rem',
                  padding: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  flexWrap: 'wrap',
                }}
              >
                {highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                    <span
                      style={{
                        fontSize: '1.6rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-heading)',
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        lineHeight: 1,
                      }}
                    >
                      {h.value}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        fontWeight: 500,
                      }}
                    >
                      {h.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="reveal delay-200" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 700,
                }}
              >
                <Calendar size={18} style={{ color: 'var(--color-accent-1)' }} />
                <span>My Journey</span>
              </h3>

              <div
                style={{
                  borderLeft: '2px solid rgba(255, 255, 255, 0.12)',
                  paddingLeft: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                  marginLeft: '0.5rem',
                }}
              >
                {timelineEvents.map((event, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: '-24px',
                        top: '5px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: 'var(--gradient-primary)',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--color-accent-1)',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {event.year}
                    </span>
                    <h4
                      style={{
                        fontSize: '0.95rem',
                        marginTop: '0.2rem',
                        marginBottom: '0.4rem',
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                      }}
                    >
                      {event.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                      }}
                    >
                      {event.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Tech Stack */}
          <div className="reveal delay-300" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 700,
              }}
            >
              <ShieldCheck size={18} style={{ color: 'var(--color-accent-1)' }} />
              <span>Technical Skills</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {skillCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  }}
                >
                  <h4
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-accent-1)',
                      marginBottom: '1rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontWeight: 600,
                    }}
                  >
                    {cat.icon}
                    {cat.title}
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="badge interactive"
                        style={{
                          fontSize: '0.78rem',
                          padding: '0.28rem 0.65rem',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          color: 'var(--text-secondary)',
                          borderRadius: '6px',
                          fontFamily: 'var(--font-body)',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Currently Learning */}
              <div
                style={{
                  padding: '1.2rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px dashed rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                }}
              >
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-accent-1)',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}
                >
                  Currently Exploring
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['React Native', 'Framer Motion', 'GSAP', 'WebGPU'].map((s, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--color-accent-1)',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '6px',
                        padding: '0.28rem 0.65rem',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
