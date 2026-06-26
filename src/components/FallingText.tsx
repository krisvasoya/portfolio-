/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect, useCallback } from 'react';
import Matter from 'matter-js';
import './FallingText.css';

interface FallingTextProps {
  className?: string;
  text?: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: 'click' | 'hover' | 'auto' | 'scroll';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
  containerHeight?: number;
}

const FallingText = ({
  className = '',
  text = '',
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem',
  containerHeight = 200,
}: FallingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const animFrameRef = useRef<number>(0);

  const [effectStarted, setEffectStarted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const isStarted = trigger === 'auto' ? isReady : effectStarted;

  // Build the word spans HTML
  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(' ');
    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));
        return `<span class="word ${isHighlighted ? highlightClass : ''}">${word}</span>`;
      })
      .join(' ');
    textRef.current.innerHTML = newHTML;
    // Small delay to let DOM paint and calculate positions
    const t = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(t);
  }, [text, highlightWords, highlightClass]);

  // Trigger logic
  useEffect(() => {
    if (!isReady) return;

    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger, isReady]);

  const cleanup = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    if (renderRef.current) {
      Matter.Render.stop(renderRef.current);
      const canvas = renderRef.current.canvas;
      if (canvas && canvasContainerRef.current && canvas.parentNode === canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(canvas);
      }
      renderRef.current = null;
    }
    if (runnerRef.current) {
      Matter.Runner.stop(runnerRef.current);
      runnerRef.current = null;
    }
    if (engineRef.current) {
      Matter.World.clear(engineRef.current.world, false);
      Matter.Engine.clear(engineRef.current);
      engineRef.current = null;
    }
  }, []);

  // Physics simulation
  useEffect(() => {
    if (!isStarted) return;
    if (!containerRef.current || !textRef.current || !canvasContainerRef.current) return;

    cleanup();

    // Give browser a frame to render text layout before measuring
    const startPhysics = () => {
      if (!containerRef.current || !textRef.current || !canvasContainerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const width = containerRect.width;
      const height = containerRect.height;

      if (width <= 0 || height <= 0) return;

      const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

      const engine = Engine.create();
      engine.gravity.y = gravity;
      engineRef.current = engine;

      const render = Render.create({
        element: canvasContainerRef.current,
        engine,
        options: {
          width,
          height,
          background: backgroundColor,
          wireframes,
          pixelRatio: window.devicePixelRatio || 1,
        },
      });
      renderRef.current = render;

      const boundaryOpts: Matter.IChamferableBodyDefinition = {
        isStatic: true,
        render: { fillStyle: 'transparent', strokeStyle: 'transparent', lineWidth: 0 },
        collisionFilter: { category: 0x0002, mask: 0x0001 },
      };

      const floor    = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOpts);
      const leftWall  = Bodies.rectangle(-25, height / 2, 50, height, boundaryOpts);
      const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOpts);

      const wordSpans = Array.from(textRef.current.querySelectorAll<HTMLElement>('.word'));

      const wordBodies = wordSpans.map((elem) => {
        const rect = elem.getBoundingClientRect();
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;

        const body = Bodies.rectangle(x, y, rect.width + 4, rect.height + 2, {
          render: { fillStyle: 'transparent', strokeStyle: 'transparent', lineWidth: 0 },
          restitution: 0.5,
          frictionAir: 0.015,
          friction: 0.3,
          collisionFilter: { category: 0x0001, mask: 0x0002 | 0x0001 },
        });

        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 4,
          y: (Math.random() - 0.5) * 1,
        });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);

        return { elem, body };
      });

      // Switch words to absolute so physics can move them
      wordBodies.forEach(({ elem, body }) => {
        elem.style.position = 'absolute';
        elem.style.left  = `${body.position.x}px`;
        elem.style.top   = `${body.position.y}px`;
        elem.style.transform = 'translate(-50%, -50%)';
        elem.style.margin = '0';
        elem.style.whiteSpace = 'nowrap';
      });

      // Mouse constraint for dragging
      const mouse = Mouse.create(containerRef.current);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: mouseConstraintStiffness,
          render: { visible: false },
        },
      });
      (render as any).mouse = mouse;

      World.add(engine.world, [
        floor, leftWall, rightWall,
        mouseConstraint,
        ...wordBodies.map((wb) => wb.body),
      ]);

      const runner = Runner.create();
      runnerRef.current = runner;
      Runner.run(runner, engine);
      Render.run(render);

      const updateLoop = () => {
        wordBodies.forEach(({ body, elem }) => {
          elem.style.left = `${body.position.x}px`;
          elem.style.top  = `${body.position.y}px`;
          elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
        });
        animFrameRef.current = requestAnimationFrame(updateLoop);
      };
      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    // Delay a frame so layout is complete before measuring
    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(startPhysics);
    });

    return () => {
      cancelAnimationFrame(frameId);
      cleanup();
    };
  }, [isStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness, cleanup]);

  const handleTrigger = () => {
    if (!isStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: `${containerHeight}px`,
        height: `${containerHeight}px`,
      }}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={{ fontSize, lineHeight: 1.5, position: 'relative', zIndex: 2 }}
      />
      <div
        ref={canvasContainerRef}
        className="falling-text-canvas"
        style={{ pointerEvents: isStarted ? 'auto' : 'none' }}
      />
    </div>
  );
};

export default FallingText;
