import React from 'react';
import { BounceCards } from './BounceCards';
import { Terminal, Coffee, UtensilsCrossed, Puzzle, Crown } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Project {
  title: string;
  tag: string;
  desc: string;
  tech: string[];
  github: string;
  demo: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
}

interface HoverCompareProps {
  premiumSrc: string;
  originalPreview: React.ReactNode;
  altText: string;
}

const HoverCompare: React.FC<HoverCompareProps> = ({ premiumSrc, originalPreview, altText }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        height: '140px',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Premium Generated Artwork */}
      <img 
        src={premiumSrc} 
        alt={`${altText} Premium Render`} 
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 0.6s ease',
          opacity: hovered ? 0 : 1,
          zIndex: 2
        }} 
      />
      {/* Original Capture / Interactive Mockup */}
      <div style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        transition: 'opacity 0.6s ease',
        opacity: hovered ? 1 : 0,
        zIndex: 1
      }}>
        {originalPreview}
      </div>
      {/* Badge showing comparison instructions */}
      <div style={{
        position: 'absolute',
        bottom: '8px',
        right: '8px',
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '9px',
        color: '#fff',
        fontFamily: 'var(--font-mono)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        pointerEvents: 'none',
        transition: 'opacity 0.3s ease',
        zIndex: 3
      }}>
        {hovered ? 'ORIGINAL VIEW' : 'HOVER TO COMPARE'}
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const projectsList: Project[] = [
    {
      title: "FactoryOS",
      tag: "Systems Dashboard",
      desc: "A premium industrial automation and control dashboard. Displays live process monitors, metrics analytics, and status consoles.",
      tech: ["TypeScript", "React", "Chart.js", "CSS Grid"],
      github: "https://github.com/krisvasoya/FactoryOS",
      demo: "https://factoryos-kr.vercel.app/",
      icon: <Terminal size={18} />,
      preview: (
        <HoverCompare 
          premiumSrc="/projects/factoryos-premium.png"
          altText="FactoryOS"
          originalPreview={
            <img 
              src="/projects/factoryos.png" 
              alt="FactoryOS Systems Dashboard" 
              style={{
                width: '100%',
                height: '140px',
                objectFit: 'cover',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }} 
            />
          }
        />
      )
    },
    {
      title: "Obsidian Brew",
      tag: "Immersive 3D Experience",
      desc: "An immersive, cinematic landing web app built for coffee lovers. Integrates scroll-linked coordinate animations and warm organic filters.",
      tech: ["Three.js", "React.js", "Vite", "CSS Keyframes"],
      github: "https://github.com/krisvasoya/cafe-webui",
      demo: "https://obsidianbrew.vercel.app/",
      icon: <Coffee size={18} />,
      preview: (
        <HoverCompare 
          premiumSrc="/projects/obsidianbrew-premium.png"
          altText="Obsidian Brew"
          originalPreview={
            <img 
              src="/projects/obsidianbrew.png" 
              alt="Obsidian Brew Landing Web App" 
              style={{
                width: '100%',
                height: '140px',
                objectFit: 'cover',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }} 
            />
          }
        />
      )
    },
    {
      title: "Restorant Frontend",
      tag: "Responsive Food System",
      desc: "A responsive menu interface with interactive cart states, sliders, and categories list. Focused on clean component layout.",
      tech: ["React.js", "Redux Toolkit", "Custom Hooks", "CSS Flexbox"],
      github: "https://github.com/krisvasoya/restorant-frontend",
      demo: "https://restorant-frontend.vercel.app/",
      icon: <UtensilsCrossed size={18} />,
      preview: (
        <HoverCompare 
          premiumSrc="/projects/restorant-premium.png"
          altText="Restorant Frontend"
          originalPreview={
            <img 
              src="/projects/restorant.png" 
              alt="Restorant Frontend Menu Interface" 
              style={{
                width: '100%',
                height: '140px',
                objectFit: 'cover',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }} 
            />
          }
        />
      )
    },
    {
      title: "Puzzel Alpha",
      tag: "Algorithmic Puzzle Game",
      desc: "A geometric slide puzzle testing user coordination. Designed with modular structures, state resets, and layout transition listeners.",
      tech: ["JavaScript", "HTML5", "CSS Grid Layout", "Game States"],
      github: "https://github.com/krisvasoya",
      demo: "https://puzzel-alpha.vercel.app/",
      icon: <Puzzle size={18} />,
      preview: (
        <HoverCompare 
          premiumSrc="/projects/puzzle-premium.png"
          altText="Puzzel Alpha"
          originalPreview={
            <div style={{
              height: '140px',
              background: '#07090e',
              borderRadius: '10px',
              padding: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(79, 172, 254, 0.08)'
            }}>
              {/* Mini 3x3 slide puzzle layout */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 24px)',
                gridTemplateRows: 'repeat(3, 24px)',
                gap: '3px',
                background: 'rgba(255,255,255,0.02)',
                padding: '4px',
                borderRadius: '6px'
              }}>
                <div style={{ background: 'var(--gradient-primary)', borderRadius: '3px', fontSize: '0.5rem', fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
                <div style={{ background: 'var(--gradient-primary)', borderRadius: '3px', fontSize: '0.5rem', fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</div>
                <div style={{ background: 'var(--gradient-primary)', borderRadius: '3px', fontSize: '0.5rem', fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</div>
                <div style={{ background: 'var(--gradient-primary)', borderRadius: '3px', fontSize: '0.5rem', fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</div>
                <div style={{ background: 'var(--gradient-primary)', borderRadius: '3px', fontSize: '0.5rem', fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>5</div>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '3px', border: '1px dashed rgba(255,255,255,0.1)' }} />
                <div style={{ background: 'var(--gradient-primary)', borderRadius: '3px', fontSize: '0.5rem', fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>7</div>
                <div style={{ background: 'var(--gradient-primary)', borderRadius: '3px', fontSize: '0.5rem', fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>6</div>
                <div style={{ background: 'var(--gradient-primary)', borderRadius: '3px', fontSize: '0.5rem', fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>8</div>
              </div>
            </div>
          }
        />
      )
    },
    {
      title: "ZenForce",
      tag: "Fitness & Training Platform",
      desc: "A sleek fitness training web app focused on performance tracking, workout planning, and smart recovery. Built with a modern dark UI and smooth animations.",
      tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
      github: "https://github.com/krisvasoya",
      demo: "https://zen-force.netlify.app/",
      icon: (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
          <path d="m6.5 6.5 11 11" />
          <path d="m21 21-1-1" />
          <path d="m3 3 1 1" />
          <path d="m18 22 4-4" />
          <path d="m2 6 4-4" />
          <path d="m3 10 7-7" />
          <path d="m14 21 7-7" />
          <path d="M6.5 12.5 12.5 6.5" />
          <path d="m11.5 17.5 6-6" />
        </svg>
      ),
      preview: (
        <HoverCompare 
          premiumSrc="/projects/zenforce-premium.png"
          altText="ZenForce"
          originalPreview={
            <div style={{
              height: '140px',
              background: '#06090f',
              borderRadius: '10px',
              padding: '0.8rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
              position: 'relative',
              width: '100%'
            }}>
              <style>{`
                @keyframes pulse-heart {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.15); }
                }
              `}</style>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem', color: '#ffffff', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>TRACKING ACTIVE</span>
                <span style={{ width: '6px', height: '6px', backgroundColor: '#ffffff', borderRadius: '50%', boxShadow: '0 0 8px #ffffff', animation: 'pulse-green 1.5s infinite' }} />
              </div>
              {/* heart rate & circular progress layout */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.2rem 0' }}>
                <div style={{ position: 'relative', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.03)"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="3.5"
                      strokeDasharray="75, 100"
                    />
                  </svg>
                  <div style={{ position: 'absolute', fontSize: '0.65rem', fontWeight: 700, color: '#fff', animation: 'pulse-heart 1.2s infinite ease-in-out' }}>❤️</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff' }}>134 BPM</span>
                  <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>Cardio Zone</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.6rem', color: '#ffffff', textAlign: 'center', fontWeight: 600 }}>420 kcal</div>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.6rem', color: '#ffffff', textAlign: 'center', fontWeight: 600 }}>45 mins</div>
              </div>
            </div>
          }
        />
      )
    },
    {
      title: "Candy Rain Mania",
      tag: "Browser Game",
      desc: "A fast-paced candy-catching browser game with increasing difficulty, colorful animations, and a high-score system. Pure JavaScript game logic.",
      tech: ["JavaScript", "HTML5 Canvas", "CSS Animations", "Game Loop"],
      github: "https://github.com/krisvasoya/candy-rain-mania",
      demo: "https://krisvasoya.github.io/candy-rain-mania/",
      icon: (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
          <line x1="6" y1="12" x2="10" y2="12" />
          <line x1="8" y1="10" x2="8" y2="14" />
          <line x1="15" y1="13" x2="15.01" y2="13" />
          <line x1="18" y1="11" x2="18.01" y2="11" />
          <rect x="2" y="6" width="20" height="12" rx="3" />
        </svg>
      ),
      preview: (
        <HoverCompare 
          premiumSrc="/projects/candy-premium.png"
          altText="Candy Rain Mania"
          originalPreview={
            <div style={{
              height: '140px',
              background: 'linear-gradient(135deg, #150a21 0%, #080510 100%)',
              borderRadius: '10px',
              padding: '0.8rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(236, 72, 153, 0.15)',
              boxShadow: '0 0 15px rgba(236, 72, 153, 0.05)',
              overflow: 'hidden',
              position: 'relative',
              width: '100%'
            }}>
              <style>{`
                @keyframes candy-fall-1 {
                  0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { transform: translateY(110px) rotate(360deg); opacity: 0; }
                }
              `}</style>
              {/* Score overlay */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
                <span style={{ fontSize: '0.65rem', color: '#ec4899', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>SCORE: 9,450</span>
                <span style={{ fontSize: '0.6rem', color: '#a855f7', fontWeight: 600 }}>LEVEL 4</span>
              </div>

              {/* Mini Falling Emojis / Candy Items */}
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                <span style={{ position: 'absolute', left: '15%', fontSize: '1.1rem', animation: 'candy-fall-1 3s infinite linear' }}>🍬</span>
                <span style={{ position: 'absolute', left: '40%', fontSize: '1.2rem', animation: 'candy-fall-1 2.5s infinite linear', animationDelay: '0.7s' }}>🍭</span>
                <span style={{ position: 'absolute', left: '65%', fontSize: '1.0rem', animation: 'candy-fall-1 3.5s infinite linear', animationDelay: '1.4s' }}>🍩</span>
                <span style={{ position: 'absolute', left: '80%', fontSize: '0.9rem', animation: 'candy-fall-1 2.8s infinite linear', animationDelay: '0.3s' }}>🍫</span>
              </div>

              {/* Catcher Bucket at the bottom */}
              <div style={{ display: 'flex', justifyContent: 'center', zIndex: 1 }}>
                <div style={{
                  width: '60px',
                  height: '14px',
                  background: 'linear-gradient(90deg, #ec4899 0%, #8b5cf6 100%)',
                  borderRadius: '0 0 12px 12px',
                  borderTop: '2px solid #fff',
                  boxShadow: '0 0 10px rgba(236, 72, 153, 0.4)',
                  transform: 'translateY(2px)'
                }} />
              </div>
            </div>
          }
        />
      )
    },
    {
      title: "N-Queens Royal",
      tag: "3D Algorithmic Game",
      desc: "An interactive 3D chess visualizer and solver for the N-Queens puzzle. Features realistic materials, tone mapping, custom audio, and achievements.",
      tech: ["Three.js", "GSAP", "HTML5 Canvas", "Algorithms"],
      github: "https://github.com/krisvasoya/Nqueen-royal",
      demo: "https://nqueen-royal.vercel.app/",
      icon: <Crown size={18} />,
      preview: (
        <HoverCompare 
          premiumSrc="/projects/nqueen-premium.png"
          altText="N-Queens Royal"
          originalPreview={
            <img 
              src="/projects/nqueen-user.png" 
              alt="N-Queens Royal Conquest Original Screenshot" 
              style={{
                width: '100%',
                height: '140px',
                objectFit: 'cover',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }} 
            />
          }
        />
      )
    }
  ];

  return (
    <section id="projects" style={{ padding: '6rem 0', width: '100%' }}>
      <div className="container">
        
        {/* Section Heading */}
        <div style={{ marginBottom: '1rem' }}>
          <span className="gradient-text" style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            02. Code Implementations
          </span>
        </div>

        {/* ScrollReveal tagline */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          rotationEnd="center center"
          wordAnimationEnd="center center"
        >
          Every project is a challenge solved with clean code, creative thinking, and an obsession for detail.
        </ScrollReveal>

        <div style={{ marginBottom: '3rem', marginTop: '1.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
            Featured Projects
          </h2>
        </div>

        {/* Interactive BounceCards Stack Section */}
        <div className="reveal delay-100" style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '1rem' }}>
          <BounceCards 
            projects={projectsList} 
            containerWidth={980}
            transformStyles={[
              'rotate(-14deg) translate(-330px)',
              'rotate(-9deg) translate(-220px)',
              'rotate(-4deg) translate(-110px)',
              'rotate(1deg) translate(0px)',
              'rotate(6deg) translate(110px)',
              'rotate(11deg) translate(220px)',
              'rotate(16deg) translate(330px)'
            ]}
          />
        </div>

      </div>
    </section>
  );
};
