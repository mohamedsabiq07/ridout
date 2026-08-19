import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MoveHorizontal, CheckCircle2, Shield } from 'lucide-react';

interface ComparisonItem {
  id: string;
  title: string;
  category: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  guarantee: string;
}

const COMPARISONS: ComparisonItem[] = [
  {
    id: 'kitchen',
    title: 'Kitchen Deep Degreasing & Sanitization',
    category: 'Home Cleaning',
    beforeLabel: 'Heavy Grease & Food Residue',
    afterLabel: 'Spotless 100% Sanitized Finish',
    beforeImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Stubborn stovetop grease, cabinet oil grime, and sink stains thoroughly removed using food-safe industrial degreasers.',
    guarantee: '100% Food-Safe & Odorless Chemicals'
  },
  {
    id: 'bedbug',
    title: 'Bed Bug Thermal Steam & Chemical Flush',
    category: 'Pest Control',
    beforeLabel: 'Active Infestation & Blood Spots',
    afterLabel: '100% Clear & Egg-Free Bedroom',
    beforeImage: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    description: 'High-temperature steam treatment penetrating deep into mattress seams, skirting, and headboards to kill live bugs and hidden eggs.',
    guarantee: '4-Month Free Re-Treatment Guarantee'
  },
  {
    id: 'bathroom',
    title: 'Bathroom Limescale & Mold Eradication',
    category: 'Home Cleaning',
    beforeLabel: 'Limescale, Soap Scum & Mildew',
    afterLabel: 'Sparkling Tiles & Disinfected Fixtures',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
    description: 'Deep scrubbing of ceramic grout, glass shower descaling, and high-pressure steam sanitization for a pristine, hygienic bathroom.',
    guarantee: 'Hospital-Grade Disinfection'
  }
];

interface BeforeAfterSliderProps {
  onBookClick?: (serviceId?: string) => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onBookClick }) => {
  const [activeTab, setActiveTab] = useState<string>('kitchen');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = COMPARISONS.find(c => c.id === activeTab) || COMPARISONS[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0A0A0A] text-white border-b border-[#2A2A2A] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8871E]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717] border border-[#2A2A2A] text-xs font-mono font-semibold text-[#E8871E]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Proven Visual Results</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Montserrat'] tracking-tight"
          >
            See The Transformation
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-sm sm:text-base"
          >
            Drag the interactive slider below to see how our municipality-certified technicians and deep cleaning crew restore your property.
          </motion.p>

          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-4">
            {COMPARISONS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold font-['Montserrat'] transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-[#E8871E] text-white shadow-lg shadow-[#E8871E]/20 scale-105'
                    : 'bg-[#171717] text-neutral-400 border border-[#2A2A2A] hover:text-white hover:border-neutral-600'
                }`}
              >
                {item.title.split(' ')[0]} {item.title.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Viewer Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            
            {/* Interactive Slider Frame (8 Cols) */}
            <div className="lg:col-span-8">
              <div
                ref={containerRef}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative h-[360px] sm:h-[450px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-[#2A2A2A] shadow-2xl bg-neutral-900"
              >
                {/* AFTER Image (Full Background) */}
                <img
                  src={activeItem.afterImage}
                  alt={activeItem.afterLabel}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* AFTER Badge */}
                <div className="absolute top-4 right-4 bg-emerald-950/80 border border-emerald-600/80 text-emerald-300 text-xs font-bold font-mono px-3 py-1 rounded backdrop-blur-md z-10 flex items-center gap-1.5 shadow-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AFTER: {activeItem.afterLabel}</span>
                </div>

                {/* BEFORE Image (Clipped Left Side) */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={activeItem.beforeImage}
                    alt={activeItem.beforeLabel}
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{
                      width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                      height: '100%'
                    }}
                  />
                  {/* BEFORE Badge */}
                  <div className="absolute top-4 left-4 bg-red-950/80 border border-red-700/80 text-red-300 text-xs font-bold font-mono px-3 py-1 rounded backdrop-blur-md z-10 shadow-lg">
                    <span>BEFORE: {activeItem.beforeLabel}</span>
                  </div>
                </div>

                {/* Divider Line & Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#E8871E] text-white flex items-center justify-center shadow-xl border-2 border-white cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
                    <MoveHorizontal className="w-5 h-5" />
                  </div>
                </div>

                {/* Mobile Helper Hint */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-neutral-300 pointer-events-none flex items-center gap-1 font-mono">
                  <MoveHorizontal className="w-3 h-3 text-[#E8871E]" />
                  <span>Drag left / right to compare</span>
                </div>
              </div>
            </div>

            {/* Sidebar Details (4 Cols) */}
            <div className="lg:col-span-4 space-y-6 bg-[#171717] border border-[#2A2A2A] p-6 sm:p-8 rounded-2xl">
              <div>
                <span className="text-xs font-mono font-bold text-[#E8871E] uppercase tracking-wider">
                  {activeItem.category}
                </span>
                <h3 className="text-xl font-bold font-['Montserrat'] mt-1 text-white">
                  {activeItem.title}
                </h3>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {activeItem.description}
              </p>

              <div className="p-3.5 bg-[#0A0A0A] border border-neutral-800 rounded-lg flex items-center gap-3">
                <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-neutral-200">
                  {activeItem.guarantee}
                </span>
              </div>

              <button
                onClick={() => {
                  if (onBookClick) {
                    const serviceMap: Record<string, string> = {
                      kitchen: 'kitchen-cleaning',
                      bedbug: 'bed-bug-treatment',
                      bathroom: 'bathroom-cleaning'
                    };
                    onBookClick(serviceMap[activeItem.id] || 'general-pest-control');
                  } else {
                    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="animate-shimmer w-full py-3.5 bg-gradient-to-r from-[#E8871E] to-[#d47817] hover:from-[#f0922b] hover:to-[#E8871E] text-white rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-xl shadow-[#E8871E]/30 hover:shadow-2xl hover:shadow-[#E8871E]/50 border border-amber-300/30 active:scale-95 cursor-pointer uppercase font-['Montserrat']"
              >
                Book This Service Now
              </button>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
