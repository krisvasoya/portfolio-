import React from 'react';
import { BounceCards } from './BounceCards';
import { Terminal, Coffee, UtensilsCrossed, Puzzle, Crown, Globe } from 'lucide-react';
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
    },
    {
      title: "Digital Friction Analyzer",
      tag: "Behavioral Analytics Platform",
      desc: "Identifies user frustration patterns through click tracking and navigation flow analysis. Features real-time dashboards with live session insights to improve UX and engagement.",
      tech: ["React.js", "Node.js", "MongoDB", "Real-time Analytics"],
      github: "https://github.com/krisvasoya",
      demo: "https://friction-sigma.vercel.app/",
      icon: (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      preview: (
        <HoverCompare
          premiumSrc="/projects/friction-premium.png"
          altText="Digital Friction Analyzer"
          originalPreview={
            <div style={{
              height: '140px',
              background: 'linear-gradient(135deg, #080c14 0%, #0a0f1e 100%)',
              borderRadius: '10px',
              padding: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(0, 255, 200, 0.12)',
              overflow: 'hidden',
              position: 'relative',
              width: '100%'
            }}>
              <style>{`
                @keyframes bar-grow { from { width: 0; } to { width: 100%; } }
                @keyframes pulse-dot { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
              `}</style>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.6rem', color: '#00ffc8', fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>FRICTION INDEX</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.55rem', color: '#aaa' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00ffc8', animation: 'pulse-dot 1.2s infinite' }} />
                  LIVE
                </span>
              </div>
              {/* Metric row */}
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ff4f6e', fontFamily: 'var(--font-mono)' }}>57%</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.5rem', color: '#aaa', marginBottom: '3px' }}>Avg UX Friction Score</div>
                  <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '57%', borderRadius: '2px', background: 'linear-gradient(90deg, #ff4f6e, #ff8c42)' }} />
                  </div>
                </div>
              </div>
              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem' }}>
                <div style={{ background: 'rgba(0,255,200,0.06)', borderRadius: '5px', padding: '3px 5px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#00ffc8' }}>264</div>
                  <div style={{ fontSize: '0.45rem', color: '#888' }}>Sessions</div>
                </div>
                <div style={{ background: 'rgba(139,92,246,0.06)', borderRadius: '5px', padding: '3px 5px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#a78bfa' }}>1470</div>
                  <div style={{ fontSize: '0.45rem', color: '#888' }}>Clicks</div>
                </div>
                <div style={{ background: 'rgba(249,115,22,0.06)', borderRadius: '5px', padding: '3px 5px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#fb923c' }}>100%</div>
                  <div style={{ fontSize: '0.45rem', color: '#888' }}>Engage</div>
                </div>
              </div>
            </div>
          }
        />
      )
    },
    {
      title: "SiteGrab Pro",
      tag: "Frontend Asset Downloader",
      desc: "Input any public URL — SiteGrab Pro crawls every page, collects all assets, and packages them into one clean ZIP. No DevTools. No manual work.",
      tech: ["Next.js", "Node.js", "Puppeteer", "File System API"],
      github: "https://github.com/krisvasoya/SiteGrab-Pro",
      demo: "https://sitegrab-orpin.vercel.app/",
      icon: <Globe size={18} />,
      preview: (
        <HoverCompare
          premiumSrc="/projects/sitegrab-premium.png"
          altText="SiteGrab Pro"
          originalPreview={
            <div style={{
              height: '140px',
              background: 'linear-gradient(135deg, #0d1008 0%, #111a0e 100%)',
              borderRadius: '10px',
              padding: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(134, 239, 172, 0.1)',
              overflow: 'hidden',
              position: 'relative',
              width: '100%'
            }}>
              <style>{`
                @keyframes crawl-scan { 0%{transform:scaleX(0);transform-origin:left} 60%{transform:scaleX(1);transform-origin:left} 61%{transform:scaleX(1);transform-origin:right} 100%{transform:scaleX(0);transform-origin:right} }
              `}</style>
              {/* Header badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.55rem', color: '#86efac', fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', background: 'rgba(134,239,172,0.1)', padding: '2px 6px', borderRadius: '3px' }}>WEBSITE ASSET DOWNLOADER</span>
                <Globe size={11} color="#86efac" />
              </div>
              {/* URL input mockup */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(134,239,172,0.15)', borderRadius: '6px', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Globe size={9} color="#86efac" />
                <span style={{ fontSize: '0.55rem', color: '#888', fontFamily: 'var(--font-mono)' }}>https://example.com</span>
              </div>
              {/* Scanning bar */}
              <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg, #86efac, #4ade80)', animation: 'crawl-scan 2.5s ease-in-out infinite' }} />
              </div>
              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem' }}>
                <div style={{ background: 'rgba(134,239,172,0.05)', borderRadius: '5px', padding: '3px 5px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#86efac' }}>&lt;2min</div>
                  <div style={{ fontSize: '0.45rem', color: '#888' }}>Speed</div>
                </div>
                <div style={{ background: 'rgba(74,222,128,0.05)', borderRadius: '5px', padding: '3px 5px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#4ade80' }}>Full ZIP</div>
                  <div style={{ fontSize: '0.45rem', color: '#888' }}>Output</div>
                </div>
                <div style={{ background: 'rgba(134,239,172,0.05)', borderRadius: '5px', padding: '3px 5px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#86efac' }}>14+</div>
                  <div style={{ fontSize: '0.45rem', color: '#888' }}>Asset Types</div>
                </div>
              </div>
            </div>
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
            containerWidth={1080}
            transformStyles={[
              'rotate(-16deg) translate(-380px)',
              'rotate(-12deg) translate(-285px)',
              'rotate(-8deg) translate(-190px)',
              'rotate(-4deg) translate(-95px)',
              'rotate(0deg) translate(0px)',
              'rotate(4deg) translate(95px)',
              'rotate(8deg) translate(190px)',
              'rotate(12deg) translate(285px)',
              'rotate(16deg) translate(380px)'
            ]}
          />
        </div>

      </div>
    </section>
  );
};
