import React, { useRef } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', style = {} }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Mouse coordinates relative to the card dimensions
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates from -0.5 to 0.5
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    // Smooth angle tilt values (max 8 degrees tilt to keep it subtle and elegant)
    const maxTilt = 8;
    const xTilt = -normalizedY * maxTilt;
    const yTilt = normalizedX * maxTilt;
    
    card.style.setProperty('--x-tilt', `${xTilt}deg`);
    card.style.setProperty('--y-tilt', `${yTilt}deg`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.setProperty('--x-tilt', '0deg');
    card.style.setProperty('--y-tilt', '0deg');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card tilt-container tilt-element ${className}`}
      style={{
        transition: 'transform 0.15s ease-out, border-color 0.4s, background-color 0.4s, box-shadow 0.4s',
        ...style
      }}
    >
      {children}
    </div>
  );
};
