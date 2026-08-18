import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <section id="hero" className="relative bg-[#0A0A0A] text-white pt-16 pb-20 lg:pt-20 lg:pb-28 overflow-hidden border-b border-[#2A2A2A]">
      
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-center opacity-70"
        >
          <source src="/ridout-v1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/20" />
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
              className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-4"
            >
              <button
                onClick={onBookClick}
                className="flex items-center justify-center bg-[#E8871E] hover:bg-[#d47817] text-white px-8 py-4 rounded font-extrabold text-base sm:text-lg tracking-wide transition-all shadow-xl hover:shadow-2xl active:scale-98 cursor-pointer uppercase font-['Montserrat'] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none" />
                <span className="relative z-10">Get a Free Quote</span>
              </button>

              <div className="flex items-center gap-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="text-[#E8871E]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
                  </div>
                  <span className="text-white font-['Montserrat'] font-semibold text-sm sm:text-base leading-tight">Certified<br/>Technicians</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-[#E8871E]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <span className="text-white font-['Montserrat'] font-semibold text-sm sm:text-base leading-tight">24/7<br/>Response</span>
                </div>
              </div>
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

            {/* Consolidated Trust Features */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="pt-12 border-t border-[#2A2A2A] mt-12 w-full"
            >
              <div className="text-center mb-6">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A9E7E]">
                  Why Customers Trust Ridout
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                
                {/* Card 1 */}
                <div className="bg-[#171717] border border-[#2A2A2A] p-5 rounded flex items-start gap-3 hover:border-[#7A9E7E] transition-colors relative overflow-hidden group text-left">
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />
                  <CheckCircle2 className="w-5 h-5 text-[#7A9E7E] shrink-0 mt-0.5 relative z-10" />
                  <div className="relative z-10">
                    <div className="text-sm font-bold text-white uppercase tracking-wide font-['Montserrat']">
                      1,000+ Properties
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5 font-medium">
                      Treated with success
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-[#171717] border border-[#2A2A2A] p-5 rounded flex items-start gap-3 hover:border-[#7A9E7E] transition-colors relative overflow-hidden group text-left">
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />
                  <CheckCircle2 className="w-5 h-5 text-[#7A9E7E] shrink-0 mt-0.5 relative z-10" />
                  <div className="relative z-10">
                    <div className="text-sm font-bold text-white uppercase tracking-wide font-['Montserrat']">
                      Eco-Friendly
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5 font-medium">
                      Family & pet safe
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-[#171717] border border-[#2A2A2A] p-5 rounded flex items-start gap-3 hover:border-[#7A9E7E] transition-colors relative overflow-hidden group text-left">
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />
                  <CheckCircle2 className="w-5 h-5 text-[#7A9E7E] shrink-0 mt-0.5 relative z-10" />
                  <div className="relative z-10">
                    <div className="text-sm font-bold text-white uppercase tracking-wide font-['Montserrat']">
                      Same-Day Dispatch
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5 font-medium">
                      Dubai, Sharjah & Ajman
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-[#171717] border border-[#2A2A2A] p-5 rounded flex items-start gap-3 hover:border-[#7A9E7E] transition-colors relative overflow-hidden group text-left">
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />
                  <CheckCircle2 className="w-5 h-5 text-[#7A9E7E] shrink-0 mt-0.5 relative z-10" />
                  <div className="relative z-10">
                    <div className="text-sm font-bold text-white uppercase tracking-wide font-['Montserrat']">
                      4-Month Guarantee
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5 font-medium">
                      Free re-treatment included
                    </div>
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
