import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';
import { AlertTriangle } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onEmergencyClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onEmergencyClick }) => {
  return (
    <section id="hero" className="relative bg-[#0A0A0A] text-white pt-16 pb-20 lg:pt-20 lg:pb-28 overflow-hidden border-b border-[#2A2A2A]">
      
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Desktop Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90 hidden md:block"
        >
          <source src="/ridout-v1.mp4" type="video/mp4" />
        </video>
        {/* Mobile Portrait Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90 block md:hidden"
        >
          <source src="/portrait-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent" />
      </div>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#2A2A2A_1px,transparent_1px)] [background-size:28px_28px] opacity-30 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        <div className="flex flex-col items-center justify-center w-full min-h-[60vh] lg:min-h-[75vh]">
          
          {/* Main Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto space-y-8 text-center flex flex-col items-center"
          >
            
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#171717] border border-[#2A2A2A] text-xs font-semibold text-neutral-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />
              <img src="/favicon.png" alt="RP Shield" className="w-4 h-4 object-contain shrink-0 relative z-10" />
              <span className="relative z-10">Certified Professional Pest Control • Dubai, Sharjah, and Ajman</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-3 mt-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Montserrat'] tracking-tight leading-[1.05] text-white uppercase"
              >
                <span className="text-[#E8871E]">FAST. EFFECTIVE.</span><br />
                PEST CONTROL.
              </motion.h1>
            </div>

            {/* Subtext */}
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#E2DFD7] max-w-3xl leading-relaxed uppercase tracking-wider font-['Montserrat']"
            >
              RID YOUR HOME OF PESTS TODAY.
            </motion.h2>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4 w-full"
            >
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto flex items-center justify-center bg-[#E8871E] hover:bg-[#d47817] text-white px-8 py-4 rounded font-extrabold text-base tracking-wide transition-all shadow-xl hover:shadow-2xl active:scale-98 cursor-pointer uppercase font-['Montserrat'] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none" />
                <span className="relative z-10">Get a Free Quote</span>
              </button>

              {onEmergencyClick && (
                <button
                  onClick={onEmergencyClick}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-4 rounded bg-[#171717]/90 hover:bg-red-950/40 border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-amber-200 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-98"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8871E]" />
                  </span>
                  <AlertTriangle className="w-4 h-4 text-[#E8871E]" />
                  <span>24/7 Urgent Pest Alert</span>
                </button>
              )}
            </motion.div>

            {/* Certifications Logo Strip */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="pt-6"
            >
              <p className="text-xs text-neutral-400 mb-3 uppercase tracking-wider font-semibold">Trusted & Approved By</p>
              <div className="bg-white/95 px-5 py-3 inline-block rounded shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMCIvPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50 pointer-events-none" />
                <img 
                  src="/certifications.png" 
                  alt="Dubai Municipality Approved, ISO 9001, ISO 14001, NPMA" 
                  className="h-14 sm:h-20 object-contain relative z-10"
                />
              </div>
            </motion.div>

            {/* Consolidated Trust Features as Clean Text */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="pt-12 border-t border-[#2A2A2A] mt-12 w-full"
            >
              <div className="text-center mb-10">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A9E7E]">
                  Why Customers Trust Ridout
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4 w-full">
                
                {/* Stat 1 */}
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-black text-white font-['Montserrat']">
                    <AnimatedCounter value={1000} suffix="+" duration={2.5} />
                  </div>
                  <div className="text-xs text-neutral-400 mt-2 font-medium uppercase tracking-wider">
                    Properties Treated
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-black text-white font-['Montserrat']">
                    100%
                  </div>
                  <div className="text-xs text-neutral-400 mt-2 font-medium uppercase tracking-wider">
                    Eco-Friendly
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-black text-white font-['Montserrat']">
                    Same-Day
                  </div>
                  <div className="text-xs text-neutral-400 mt-2 font-medium uppercase tracking-wider">
                    Dispatch
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-black text-white font-['Montserrat']">
                    <AnimatedCounter value={4} suffix="-Month" duration={1.5} />
                  </div>
                  <div className="text-xs text-neutral-400 mt-2 font-medium uppercase tracking-wider">
                    Guarantee
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
