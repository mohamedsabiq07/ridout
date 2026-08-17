import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HOME_CLEANING_SERVICES } from '../data/services';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HomeCleaningSectionProps {
  onBookCleaning: (serviceId: string) => void;
}

const SlowVideo: React.FC<{ src: string, className?: string }> = ({ src, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Slows down video to 50% speed
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className={className}
    />
  );
};

export const HomeCleaningSection: React.FC<HomeCleaningSectionProps> = ({
  onBookCleaning,
}) => {
  return (
    <section id="home-cleaning" className="py-20 lg:py-28 bg-[#0A0A0A] text-white border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-[#2A2A2A] text-xs font-mono font-bold text-neutral-300">
            <Sparkles className="w-4 h-4 text-[#E8871E]" />
            <span>Dedicated Specialized Cleaning</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Montserrat'] text-white">
            Home Cleaning Services
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            Professional cleaning for the spaces that matter most.
          </p>
        </motion.div>

        {/* 2 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* 1. Kitchen Cleaning */}
          {HOME_CLEANING_SERVICES.find(s => s.id === 'kitchen-cleaning') && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 bg-noise backdrop-blur-md border border-white/10 hover:border-[#7A9E7E] rounded-lg flex flex-col justify-between transition-all duration-300 hover:shadow-2xl group relative overflow-hidden cursor-pointer"
            >
              <Link to="/services/kitchen-cleaning" className="absolute inset-0 z-10" aria-label="View Kitchen Cleaning details" />
              
              {/* Photo Banner Header */}
              <div className="relative h-48 sm:h-52 overflow-hidden border-b border-[#2A2A2A]">
                <SlowVideo
                  src="/kitchen2.mp4"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/30 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#E8871E] text-white rounded flex items-center justify-center font-bold">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-300">
                    Food-Safe Hygiene
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold font-['Montserrat'] text-white">
                    Kitchen Cleaning
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    Professional kitchen cleaning covering countertops, cabinets, sink, stove area, tiles and other accessible surfaces.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#2A2A2A]">
                  <div className="text-xs font-mono font-bold text-[#7A9E7E] uppercase">Coverage Highlights:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7A9E7E] shrink-0" />
                      <span>Stovetop Degreasing</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7A9E7E] shrink-0" />
                      <span>Sink & Drain Scrub</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7A9E7E] shrink-0" />
                      <span>Countertop Sanitizing</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7A9E7E] shrink-0" />
                      <span>Cabinet Exterior Wipe</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#2A2A2A] flex items-center gap-3">
                  <button
                    onClick={() => onBookCleaning('kitchen-cleaning')}
                    className="flex-1 bg-[#E8871E] hover:bg-[#d47817] text-white font-extrabold text-sm py-3.5 px-4 rounded transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-xl uppercase font-['Montserrat'] relative z-20"
                  >
                    <span>Book Kitchen Cleaning</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    to={`/services/kitchen-cleaning`}
                    className="px-4 py-3.5 bg-[#0A0A0A] border border-[#2A2A2A] hover:border-neutral-500 text-neutral-300 hover:text-white rounded text-xs font-bold transition-colors cursor-pointer text-center relative z-20"
                  >
                    Specs
                  </Link>
                </div>

              </div>
            </motion.div>
          )}

          {/* 2. Bathroom Cleaning */}
          {HOME_CLEANING_SERVICES.find(s => s.id === 'bathroom-cleaning') && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/5 bg-noise backdrop-blur-md border border-white/10 hover:border-[#7A9E7E] rounded-lg flex flex-col justify-between transition-all duration-300 hover:shadow-2xl group relative overflow-hidden cursor-pointer"
            >
              <Link to="/services/bathroom-cleaning" className="absolute inset-0 z-10" aria-label="View Bathroom Cleaning details" />
              
              {/* Photo Banner Header */}
              <div className="relative h-48 sm:h-52 overflow-hidden border-b border-[#2A2A2A]">
                <SlowVideo
                  src="/ridout-bathroom.mp4"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/30 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#7A9E7E] text-white rounded flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-300">
                    Deep Sanitization
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold font-['Montserrat'] text-white">
                    Bathroom Cleaning
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    Thorough bathroom cleaning including tiles, floors, toilet, wash basin, shower area, mirrors and other accessible surfaces.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#2A2A2A]">
                  <div className="text-xs font-mono font-bold text-[#7A9E7E] uppercase">Coverage Highlights:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7A9E7E] shrink-0" />
                      <span>Limescale Scrubbing</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7A9E7E] shrink-0" />
                      <span>Toilet Disinfection</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7A9E7E] shrink-0" />
                      <span>Shower Glass Polish</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7A9E7E] shrink-0" />
                      <span>Tile Floor Scrubbing</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#2A2A2A] flex items-center gap-3">
                  <button
                    onClick={() => onBookCleaning('bathroom-cleaning')}
                    className="flex-1 bg-[#E8871E] hover:bg-[#d47817] text-white font-extrabold text-sm py-3.5 px-4 rounded transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-xl uppercase font-['Montserrat'] relative z-20"
                  >
                    <span>Book Bathroom Cleaning</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    to={`/services/bathroom-cleaning`}
                    className="px-4 py-3.5 bg-[#0A0A0A] border border-[#2A2A2A] hover:border-neutral-500 text-neutral-300 hover:text-white rounded text-xs font-bold transition-colors cursor-pointer text-center relative z-20"
                  >
                    Specs
                  </Link>
                </div>

              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};
