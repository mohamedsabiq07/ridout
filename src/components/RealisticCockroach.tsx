import React, { useState, useEffect, useRef } from 'react';

interface RealisticCockroachProps {
  onSpotCockroach?: () => void;
}

export const RealisticCockroach: React.FC<RealisticCockroachProps> = ({ onSpotCockroach }) => {
  const [pos, setPos] = useState({ x: 120, y: 350 });
  const [rotation, setRotation] = useState(45);
  const [isCrawling, setIsCrawling] = useState(false);
  const [isSprinting, setIsSprinting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const targetPos = useRef({ x: 120, y: 350 });
  const currentPos = useRef({ x: 120, y: 350 });
  const isScared = useRef(false);

  // Realistic random wander & burst pause behavior
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const wander = () => {
      if (isScared.current) return;

      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

      // Random target coordinate along the viewport background
      const nextX = Math.max(40, Math.min(screenWidth - 80, currentPos.current.x + (Math.random() - 0.5) * 350));
      const nextY = Math.max(100, Math.min(screenHeight - 120, currentPos.current.y + (Math.random() - 0.5) * 300));

      const dx = nextX - currentPos.current.x;
      const dy = nextY - currentPos.current.y;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90; // Align cockroach head with movement vector

      setRotation(angle);
      setIsCrawling(true);
      targetPos.current = { x: nextX, y: nextY };
      currentPos.current = { x: nextX, y: nextY };
      setPos({ x: nextX, y: nextY });

      // After burst crawl, pause and twitch antennae
      timeoutId = setTimeout(() => {
        setIsCrawling(false);
        // Random pause between 2.5s and 6s
        const pauseTime = 2500 + Math.random() * 3500;
        timeoutId = setTimeout(wander, pauseTime);
      }, 1400 + Math.random() * 800);
    };

    timeoutId = setTimeout(wander, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Mouse evasion: Realistic instinctive sprint when cursor gets near
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = currentPos.current.x - e.clientX;
      const dy = currentPos.current.y - e.clientY;
      const distance = Math.hypot(dx, dy);

      // If cursor is within 140px, trigger realistic fright sprint
      if (distance < 140 && !isScared.current) {
        isScared.current = true;
        setIsSprinting(true);
        setIsCrawling(true);

        // Sprint direction away from cursor
        const angle = Math.atan2(dy, dx);
        const sprintDist = 220 + Math.random() * 100;
        const fleeX = Math.max(30, Math.min(window.innerWidth - 60, currentPos.current.x + Math.cos(angle) * sprintDist));
        const fleeY = Math.max(80, Math.min(window.innerHeight - 80, currentPos.current.y + Math.sin(angle) * sprintDist));

        const rotAngle = (angle * 180) / Math.PI + 90;
        setRotation(rotAngle);
        currentPos.current = { x: fleeX, y: fleeY };
        setPos({ x: fleeX, y: fleeY });

        setTimeout(() => {
          setIsSprinting(false);
          setIsCrawling(false);
          setTimeout(() => {
            isScared.current = false;
          }, 3000);
        }, 600);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = () => {
    if (onSpotCockroach) {
      onSpotCockroach();
    } else {
      document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${rotation}deg)`,
        transition: isSprinting 
          ? 'transform 0.55s cubic-bezier(0.15, 0.9, 0.2, 1)' 
          : isCrawling 
            ? 'transform 1.8s ease-in-out' 
            : 'transform 0.4s ease-out'
      }}
      className="fixed top-0 left-0 z-10 pointer-events-auto cursor-pointer select-none group"
      title="Pest Spotted! Click to book immediate elimination"
    >
      {/* Tooltip on Hover */}
      {isHovered && (
        <div 
          style={{ transform: `rotate(${-rotation}deg)` }}
          className="absolute -top-10 -left-16 bg-[#0A0A0A]/90 text-[#E8871E] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-[#E8871E]/40 shadow-xl whitespace-nowrap backdrop-blur-md pointer-events-none animate-fadeIn"
        >
          🪳 Infestation Spotted! Click to Eliminate
        </div>
      )}

      {/* Realistic Detailed SVG Cockroach (German/American Roach Aesthetic) */}
      <svg
        width="38"
        height="48"
        viewBox="0 0 100 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-opacity duration-500 ${
          isHovered ? 'opacity-90 drop-shadow-[0_4px_12px_rgba(232,135,30,0.4)]' : 'opacity-25 hover:opacity-80'
        }`}
      >
        <defs>
          {/* Exoskeleton realistic chitin gradient */}
          <linearGradient id="chitinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A1E07" />
            <stop offset="35%" stopColor="#7A3912" />
            <stop offset="70%" stopColor="#5C250A" />
            <stop offset="100%" stopColor="#2D1104" />
          </linearGradient>

          {/* Pronotum Shield gradient */}
          <linearGradient id="pronotumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A4215" />
            <stop offset="50%" stopColor="#522008" />
            <stop offset="100%" stopColor="#250C02" />
          </linearGradient>
        </defs>

        {/* --- Antennae with natural curve --- */}
        <path
          d="M44 28 C35 15, 20 8, 8 2"
          stroke="#4A1E07"
          strokeWidth="1.6"
          strokeLinecap="round"
          className={isCrawling ? 'animate-pulse' : ''}
        />
        <path
          d="M56 28 C65 15, 80 8, 92 2"
          stroke="#4A1E07"
          strokeWidth="1.6"
          strokeLinecap="round"
          className={isCrawling ? 'animate-pulse' : ''}
        />

        {/* --- Multi-Jointed Barbed Legs (6 legs) --- */}
        {/* Front Left */}
        <path d="M40 38 L22 26 L12 30" stroke="#3D1806" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Front Right */}
        <path d="M60 38 L78 26 L88 30" stroke="#3D1806" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Middle Left */}
        <path d="M36 55 L16 50 L6 62" stroke="#3D1806" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Middle Right */}
        <path d="M64 55 L84 50 L94 62" stroke="#3D1806" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Hind Left (Longest) */}
        <path d="M36 78 L14 85 L4 110" stroke="#3D1806" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        {/* Hind Right (Longest) */}
        <path d="M64 78 L86 85 L96 110" stroke="#3D1806" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />

        {/* --- Cerci (Rear sensors) --- */}
        <path d="M44 116 L38 126" stroke="#4A1E07" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M56 116 L62 126" stroke="#4A1E07" strokeWidth="1.8" strokeLinecap="round" />

        {/* --- Main Abdomen & Wings --- */}
        <ellipse cx="50" cy="74" rx="17" ry="42" fill="url(#chitinGradient)" />

        {/* Wing Wing Midline split */}
        <path d="M50 40 L50 114" stroke="#250C02" strokeWidth="1.4" opacity="0.7" />

        {/* Wing Sheen Highlight */}
        <path d="M42 48 Q40 80 44 105" stroke="#A85720" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />

        {/* --- Pronotum (Head Shield) --- */}
        <path
          d="M34 38 C34 26, 66 26, 66 38 C66 48, 34 48, 34 38 Z"
          fill="url(#pronotumGradient)"
        />
        {/* Two signature dark spots on pronotum (German cockroach markings) */}
        <ellipse cx="45" cy="36" rx="2.5" ry="5" fill="#150500" opacity="0.85" />
        <ellipse cx="55" cy="36" rx="2.5" ry="5" fill="#150500" opacity="0.85" />

        {/* Small Head */}
        <circle cx="50" cy="27" r="4.5" fill="#2D1104" />
      </svg>
    </div>
  );
};
