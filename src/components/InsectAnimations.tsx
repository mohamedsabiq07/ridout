import React, { useState, useEffect } from 'react';
import { Bug } from 'lucide-react';

interface InsectAnimationsProps {
  onInsectClick?: (type: string) => void;
}

export const InsectAnimations: React.FC<InsectAnimationsProps> = ({ onInsectClick }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cockroachOffset, setCockroachOffset] = useState({ x: 0, y: 0 });
  const [antOffset, setAntOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Subtle evasion reaction when mouse is nearby (Cockroach in Hero)
  useEffect(() => {
    const heroCockroach = document.getElementById('hero-cockroach-ref');
    if (heroCockroach) {
      const rect = heroCockroach.getBoundingClientRect();
      const dist = Math.hypot(mousePos.x - (rect.left + rect.width / 2), mousePos.y - (rect.top + rect.height / 2));
      if (dist < 120) {
        const dx = (rect.left - mousePos.x) * 0.15;
        const dy = (rect.top - mousePos.y) * 0.15;
        setCockroachOffset({ x: dx, y: dy });
      } else {
        setCockroachOffset({ x: 0, y: 0 });
      }
    }

    // Ant reaction near footer/services
    const antRef = document.getElementById('ant-ref');
    if (antRef) {
      const rect = antRef.getBoundingClientRect();
      const dist = Math.hypot(mousePos.x - (rect.left + rect.width / 2), mousePos.y - (rect.top + rect.height / 2));
      if (dist < 100) {
        setAntOffset({ x: (rect.left - mousePos.x) * 0.1, y: (rect.top - mousePos.y) * 0.1 });
      } else {
        setAntOffset({ x: 0, y: 0 });
      }
    }
  }, [mousePos]);

  return (
    <>
      {/* 1. Micro Cockroach - Hero / Upper Section */}
      <div
        id="hero-cockroach-ref"
        onClick={() => onInsectClick?.('cockroach')}
        style={{
          transform: `translate(${cockroachOffset.x}px, ${cockroachOffset.y}px)`,
          transition: 'transform 0.4s ease-out'
        }}
        className="absolute top-28 right-8 md:right-24 z-20 cursor-pointer opacity-30 hover:opacity-90 transition-opacity group"
        title="Subtle Pest Inspection Visual (Click to Book)"
      >
        <div className="animate-insect-1 flex items-center gap-1 bg-[#171717]/80 backdrop-blur-xs px-2 py-1 rounded-full border border-white/10 text-[10px] text-neutral-400">
          {/* Cockroach SVG icon */}
          <svg className="w-3.5 h-3.5 fill-neutral-400" viewBox="0 0 24 24">
            <path d="M12 2C10.5 2 9 3 8.5 4.5L7 9H4v2h2.2l-1.4 7H3v2h3.5l1.6-8h7.8l1.6 8H21v-2h-1.8l-1.4-7H20V9h-3l-1.5-4.5C15 3 13.5 2 12 2zm0 2.5c.8 0 1.5.5 1.8 1.5L14.7 8H9.3l.9-2C10.5 5 11.2 4.5 12 4.5z"/>
          </svg>
          <span className="hidden group-hover:inline text-white font-mono text-[9px]">Pest Detected</span>
        </div>
      </div>

      {/* 2. Micro Ant - Services / Middle Section Edge */}
      <div
        id="ant-ref"
        onClick={() => onInsectClick?.('ant')}
        style={{
          transform: `translate(${antOffset.x}px, ${antOffset.y}px)`,
          transition: 'transform 0.5s ease-out'
        }}
        className="fixed bottom-12 left-4 md:left-10 z-20 cursor-pointer opacity-25 hover:opacity-80 transition-opacity group"
        title="Subtle Ant Micro Insect"
      >
        <div className="animate-insect-2 flex items-center gap-1 bg-black/70 backdrop-blur-xs px-2 py-1 rounded-full border border-neutral-700 text-[10px] text-neutral-400">
          <Bug className="w-3.5 h-3.5 text-neutral-400" />
          <span className="hidden group-hover:inline text-neutral-200 font-mono text-[9px]">Target Pest</span>
        </div>
      </div>

      {/* 3. Micro Mosquito - Lower Footer Section */}
      <div
        onClick={() => onInsectClick?.('mosquito')}
        className="absolute top-1/2 left-6 md:left-20 z-10 cursor-pointer opacity-20 hover:opacity-75 transition-opacity"
        title="Subtle Mosquito Visual"
      >
        <div className="animate-insect-3">
          <svg className="w-4 h-4 fill-neutral-500" viewBox="0 0 24 24">
            <path d="M12 2L9 9l-7 1 5 5-2 7 7-4 7 4-2-7 5-5-7-1z"/>
          </svg>
        </div>
      </div>
    </>
  );
};
