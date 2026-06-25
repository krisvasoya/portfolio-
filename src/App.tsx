import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { DomeGallery } from './components/DomeGallery';
import { FlowingMenu } from './components/FlowingMenu';
import Lanyard from './components/Lanyard';
import ClickSpark from './components/ClickSpark';
import SplashCursor from './components/SplashCursor';
import { TimeWarpTunnel } from './components/TimeWarpTunnel';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isTimeTraveling, setIsTimeTraveling] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const handleEnter = () => {
    setIsFadingOut(true);
    setIsTimeTraveling(true);
  };

  useEffect(() => {
    // Global Intersection Observer for viewport scroll-triggered entry animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.07,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [isLoading]); // re-run after loading so main content elements are observed

  const techGalleryImages = [
    { src: 'https://github-readme-stats.vercel.app/api/top-langs/?username=krisvasoya&layout=compact&hide_border=true&theme=transparent&text_color=BFBFBF&title_color=33FF33', alt: 'GitHub Top Languages Stats' },
    { src: 'https://github-readme-stats.vercel.app/api?username=krisvasoya&show_icons=true&hide_border=true&theme=transparent&text_color=BFBFBF&title_color=33FF33&icon_color=00AA00', alt: 'GitHub Profile Analytics' },
    { src: 'https://streak-stats.demolab.com?user=krisvasoya&hide_border=true&theme=transparent&ring=33FF33&fire=00AA00&currStreakLabel=33FF33', alt: 'GitHub Streak Analytics' },
    { src: 'https://skillicons.dev/icons?i=react', alt: 'React' },
    { src: 'https://skillicons.dev/icons?i=ts', alt: 'TypeScript' },
    { src: 'https://skillicons.dev/icons?i=js', alt: 'JavaScript' },
    { src: 'https://skillicons.dev/icons?i=threejs', alt: 'Three.js' },
    { src: 'https://skillicons.dev/icons?i=vite', alt: 'Vite' },
    { src: 'https://skillicons.dev/icons?i=nodejs', alt: 'Node.js' },
    { src: 'https://skillicons.dev/icons?i=git', alt: 'Git' },
    { src: 'https://skillicons.dev/icons?i=figma', alt: 'Figma' },
  ];

  // Marquee Flowing Menu links
  const profileGateways = [
    {
      link: 'https://github.com/krisvasoya',
      text: 'GitHub Repositories',
      image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=600&auto=format&fit=crop',
    },
    {
      link: '#projects',
      text: 'Interactive Projects',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
    },
    {
      link: 'mailto:krisvasoya.dev@gmail.com',
      text: 'Direct Mail Inbox',
      image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=600&auto=format&fit=crop',
    },
  ];

  return (
    <>
      {isLoading && (
        <div className={`preloader-overlay ${isFadingOut ? 'fade-out' : ''} ${isTimeTraveling ? 'warp-active' : ''}`}>
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            frontImage="/kris_photo.png"
            backImage="/kris_photo.png"
            imageFit="cover"
            lanyardColor="#33FF33"
            lanyardWidth={1.2}
          />
          <div className="preloader-content">
            <h1 className="preloader-title">KRIS VASOYA</h1>
            <p className="preloader-subtitle">Creative Full-Stack Developer</p>
            <button className="enter-btn" onClick={handleEnter}>
              Enter Portfolio
            </button>
          </div>
          {isTimeTraveling && (
            <TimeWarpTunnel
              isActive={isTimeTraveling}
              onComplete={() => {
                setIsLoading(false);
                setIsTimeTraveling(false);
                setShowFlash(true);
                setTimeout(() => {
                  setShowFlash(false);
                }, 800);
              }}
            />
          )}
        </div>
      )}

      {/* Fluid simulation cursor trail — CRT green mode */}
      <SplashCursor RAINBOW_MODE={false} COLOR="#33FF33" />

      {/* Global Fixed Background Wave Overlay - Phosphor CRT Colorized Filter */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: 'linear-gradient(rgba(51, 255, 51, 0.04) 50%, rgba(0, 0, 0, 0.18) 50%), url(/contact_bg.png)',
          backgroundSize: '100% 4px, cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.08,
          filter: 'grayscale(100%) contrast(150%) brightness(0.85) sepia(100%) hue-rotate(85deg) saturate(5)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      {/* Floating Social Bar */}
      <div className="floating-social-bar">
        <a href="https://github.com/krisvasoya" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
        </a>
        <a href="https://linkedin.com/in/krisvasoya" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>
        <a href="https://twitter.com/krisvasoya" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
          </svg>
        </a>
      </div>

      <ClickSpark sparkColor="#33FF33" sparkSize={8} sparkRadius={12} sparkCount={7} duration={380}>
        {/* Glassmorphic Navigation Bar */}
        <Navbar />

        {/* Main Website Content */}
        <main style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          
          <Hero />

          {/* Section separator */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)', width: '100%' }} />

          <About />

          {/* Section separator */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)', width: '100%' }} />

          {/* Immersive 3D Tech Orbit Gallery */}
          <section
            id="tech-orbit"
            style={{
              padding: '6rem 0 3rem',
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '620px',
            }}
          >
            <div
              className="container reveal"
              style={{
                position: 'absolute',
                top: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 5,
                pointerEvents: 'none',
                textAlign: 'center',
                width: '100%',
              }}
            >
              <span
                className="gradient-text"
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                01b. Skill Universe
              </span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', marginTop: '0.5rem' }}>
                Drag to Orbit My Tech Stack
              </h2>
            </div>
            <div style={{ width: '100%', height: '540px', marginTop: '5rem' }}>
              <DomeGallery images={techGalleryImages} />
            </div>
          </section>

          {/* Section separator */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)', width: '100%' }} />

          <Projects />

          {/* Section separator */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)', width: '100%' }} />

          {/* Flowing Marquee Gateways */}
          <section
            id="gateways"
            style={{ padding: '6rem 0 3rem', width: '100%' }}
          >
            <div className="container reveal" style={{ marginBottom: '3rem' }}>
              <span
                className="gradient-text"
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                02b. Quick Links
              </span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.3rem)', marginTop: '0.5rem' }}>
                Explore My Work
              </h2>
            </div>
            <div
              style={{
                height: '340px',
                position: 'relative',
                width: '100%',
                borderTop: '1px solid rgba(255,255,255,0.04)',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <FlowingMenu items={profileGateways} />
            </div>
          </section>

          <Contact />
        </main>
      </ClickSpark>

      {/* Portal Time Travel Flash Transition Overlay */}
      {showFlash && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#FFFFFF',
          zIndex: 999999,
          pointerEvents: 'none',
          animation: 'flash-fade-out 0.8s ease-out forwards'
        }} />
      )}
    </>
  );
}

export default App;
