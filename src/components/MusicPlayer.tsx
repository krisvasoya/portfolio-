import { useEffect, useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sliders, ChevronDown } from 'lucide-react';
import './MusicPlayer.css';

// Procedural audio synthesis engine for generative ambient music
class AmbientSynthEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying: boolean = false;
  private activeNodes: AudioNode[] = [];
  private chimeTimer: ReturnType<typeof setTimeout> | null = null;
  private padTimer: ReturnType<typeof setTimeout> | null = null;
  private currentChordIndex: number = 0;
  
  // Frequencies for a beautiful, warm ambient chord progression (C Major Pentatonic based)
  private chords = [
    [130.81, 196.00, 261.63, 329.63], // C3 (130.81Hz), G3 (196.00Hz), C4 (261.63Hz), E4 (329.63Hz)
    [174.61, 261.63, 329.63, 440.00], // F3 (174.61Hz), C4 (261.63Hz), E4 (329.63Hz), A4 (440.00Hz)
    [110.00, 164.81, 220.00, 261.63], // A2 (110.00Hz), E3 (164.81Hz), A3 (220.00Hz), C4 (261.63Hz)
    [98.00, 146.83, 196.00, 246.94]   // G2 (98.00Hz), D3 (146.83Hz), G3 (196.00Hz), B3 (246.94Hz)
  ];

  // Chime frequencies (C Pentatonic Scale in octave 4-5) for light sparkling stars
  private scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime); // default volume 0.3
      
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64; // compact bin count for visualizer bars
      
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
  }

  public getAudioContext(): AudioContext | null {
    return this.ctx;
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.1);
    }
  }

  public start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Start pad cycle
    this.currentChordIndex = 0;
    this.playNextPadChord();
    
    // Start chime cycle
    this.scheduleNextChime();
  }

  public stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    
    if (this.chimeTimer) clearTimeout(this.chimeTimer);
    if (this.padTimer) clearTimeout(this.padTimer);

    // Fade out active nodes and stop them
    const now = this.ctx ? this.ctx.currentTime : 0;
    this.activeNodes.forEach(node => {
      if (node instanceof GainNode) {
        node.gain.cancelScheduledValues(now);
        node.gain.linearRampToValueAtTime(0.0, now + 0.5);
      }
    });

    setTimeout(() => {
      this.activeNodes.forEach(node => {
        try {
          if (node instanceof OscillatorNode) {
            node.stop();
          }
        } catch {
          // ignore error
        }
      });
      this.activeNodes = [];
    }, 600);
  }

  private playNextPadChord() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const chord = this.chords[this.currentChordIndex];
    const duration = 12; // each chord lasts 12 seconds
    const fadeTime = 4;  // 4 seconds crossfade
    const now = this.ctx.currentTime;

    // Create pad gain node for envelope
    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    
    // Slow fade-in
    gainNode.gain.linearRampToValueAtTime(0.06, now + fadeTime); // quiet pad volume
    // Hold volume
    gainNode.gain.setValueAtTime(0.06, now + duration - fadeTime);
    // Slow fade-out
    gainNode.gain.linearRampToValueAtTime(0, now + duration);
    gainNode.connect(this.masterGain);
    this.activeNodes.push(gainNode);

    // Add a lowpass filter to make the sound soft and warm
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.setValueAtTime(1.0, now);
    filter.frequency.setValueAtTime(260, now);
    
    // LFO for filter sweep
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.04, now); // very slow sweep
    
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(120, now); // sweep 120Hz above/below 260Hz
    
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start(now);
    lfo.stop(now + duration);
    this.activeNodes.push(lfo);

    chord.forEach((freq, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      // Triangle wave is soft, smooth and analog-sounding
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      
      // Detune voices slightly for natural chorus/width effect
      if (index === 1) osc.detune.setValueAtTime(9, now);
      if (index === 2) osc.detune.setValueAtTime(-9, now);
      
      osc.connect(filter);
      osc.start(now);
      osc.stop(now + duration);
      this.activeNodes.push(osc);
    });

    filter.connect(gainNode);

    // Schedule next chord 4 seconds before the current one finishes (to crossfade)
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
    this.padTimer = setTimeout(() => {
      this.playNextPadChord();
    }, (duration - fadeTime) * 1000);
  }

  private scheduleNextChime() {
    if (!this.isPlaying) return;

    const delay = Math.random() * 2000 + 2000; // random delay between 2s and 4s
    this.chimeTimer = setTimeout(() => {
      this.playChime();
      this.scheduleNextChime();
    }, delay);
  }

  private playChime() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    
    // Select random pentatonic note
    const noteIdx = Math.floor(Math.random() * this.scale.length);
    const freq = this.scale[noteIdx];

    // Chime components
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const delayNode = this.ctx.createDelay();
    const delayFeedback = this.ctx.createGain();
    const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Fast attack, slow exponential release envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.08, now + 0.06);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

    // Echo feedback settings
    delayNode.delayTime.setValueAtTime(0.6, now);
    delayFeedback.gain.setValueAtTime(0.3, now); // 30% feedback

    osc.connect(gainNode);
    
    // Connect to delay and feedback loops
    gainNode.connect(delayNode);
    delayNode.connect(delayFeedback);
    delayFeedback.connect(delayNode); // feedback loop

    // Create 3D spatial panning (left to right)
    if (panner) {
      const panVal = (Math.random() - 0.5) * 1.3; // -0.65 to +0.65 pan
      panner.pan.setValueAtTime(panVal, now);
      gainNode.connect(panner);
      delayNode.connect(panner);
      panner.connect(this.masterGain);
    } else {
      gainNode.connect(this.masterGain);
      delayNode.connect(this.masterGain);
    }

    osc.start(now);
    osc.stop(now + 4);

    this.activeNodes.push(osc);
  }
}

export function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30); // 0 to 100
  const [isMuted, setIsMuted] = useState(false);

  const engineRef = useRef<AmbientSynthEngine | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize synth engine
  if (engineRef.current == null) {
    engineRef.current = new AmbientSynthEngine();
  }

  // Listen to global portfolio entry event to trigger auto-play
  useEffect(() => {
    const handlePortfolioEnter = () => {
      setIsPlaying(true);
      engineRef.current?.start();
    };

    window.addEventListener('portfolio-enter', handlePortfolioEnter);
    return () => {
      window.removeEventListener('portfolio-enter', handlePortfolioEnter);
    };
  }, []);

  // Update volume in engine
  useEffect(() => {
    const targetVolume = isMuted ? 0 : volume / 100;
    if (engineRef.current) {
      engineRef.current.setVolume(targetVolume);
    }
  }, [volume, isMuted]);

  // Toggle play/pause
  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      engineRef.current?.start();
    } else {
      setIsPlaying(false);
      engineRef.current?.stop();
    }
  };

  // Canvas visualizer loop
  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high DPI canvas resolution
    const dpr = window.devicePixelRatio || 1;
    const width = 240;
    const height = 36;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const render = () => {
      animationId = requestAnimationFrame(render);
      const analyser = engineRef.current?.getAnalyser();
      const bufferLength = analyser ? analyser.frequencyBinCount : 32;
      const dataArray = new Uint8Array(bufferLength);

      if (analyser && isPlaying) {
        analyser.getByteFrequencyData(dataArray);
      }

      ctx.clearRect(0, 0, width, height);

      const barSpacing = 3;
      const totalSpacing = barSpacing * (bufferLength - 1);
      const barWidth = (width - totalSpacing) / bufferLength;
      
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = isPlaying && analyser 
          ? (dataArray[i] / 255) * height * 0.9
          : 1.5 + Math.sin(Date.now() * 0.002 + i * 0.3) * 1.5;
        
        const x = i * (barWidth + barSpacing);
        const y = height - barHeight;
        
        // Draw round-capped bars
        ctx.fillStyle = isPlaying 
          ? `rgba(255, 255, 255, ${0.15 + (barHeight / height) * 0.7})`
          : 'rgba(255, 255, 255, 0.15)';
          
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barWidth, barHeight, 2);
        } else {
          ctx.rect(x, y, barWidth, barHeight);
        }
        ctx.fill();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      engineRef.current?.stop();
    };
  }, []);

  return (
    <div className="music-player-container">
      {isOpen && (
        <div className="music-player-card">
          <div className="music-player-header">
            <div>
              <div className="music-player-title">Journey Soundtrack</div>
              <div className="music-player-subtitle">
                Generative Ambient Synthesis
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <ChevronDown size={18} />
            </button>
          </div>

          <div className="music-player-visualizer">
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>

          <div className="music-player-controls">
            <button className="music-btn-play" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <Pause size={18} fill="#000000" /> : <Play size={18} fill="#000000" style={{ marginLeft: '2px' }} />}
            </button>

            <div className="music-volume-section">
              <button 
                onClick={() => setIsMuted(!isMuted)} 
                style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', padding: 0 }}
              >
                {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={isMuted ? 0 : volume} 
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="music-volume-slider" 
                aria-label="Volume slider"
              />
            </div>
          </div>
        </div>
      )}

      {/* Control Bar (horizontal stack) */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {/* Settings Panel Trigger */}
        <button 
          className="music-player-settings-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Sound Settings"
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'rgba(12, 12, 12, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isOpen ? '#ffffff' : 'var(--text-secondary)',
            transition: 'all 0.25s ease'
          }}
        >
          <Sliders size={14} />
        </button>

        {/* Main Play/Pause (Mute/Unmute) Toggle Circle */}
        <button 
          className={`music-player-trigger ${isPlaying ? 'active' : ''}`}
          onClick={togglePlay}
          aria-label={isPlaying ? "Mute Journey Music" : "Play Journey Music"}
        >
          {isPlaying ? (
            <Volume2 size={18} className="music-icon-pulse" />
          ) : (
            <VolumeX size={18} />
          )}
        </button>
      </div>
    </div>
  );
}
