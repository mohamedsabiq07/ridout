import React from 'react';
import { ArrowRight, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';

interface HeroProps {
  onBookClick: () => void;
  onViewServicesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onViewServicesClick }) => {
  return (
    <section id="hero" className="relative bg-[#0A0A0A] text-white pt-16 pb-20 lg:pt-20 lg:pb-28 overflow-hidden border-b border-[#2A2A2A]">
      
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/60" />
      </div>

      {/* Subtle Background Pattern & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#2A2A2A_1px,transparent_1px)] [background-size:28px_28px] opacity-30 pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E8871E]/15 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8 text-left"
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
            <div className="space-y-3">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="block text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#7A9E7E] font-['Montserrat']"
              >
                PESTS OUT. PEACE IN.
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Montserrat'] tracking-tight leading-tight text-white"
              >
                24 Hours Pest Control Services <br />
                <span className="text-[#E8871E]">Protecting You.</span>
              </motion.h1>
            </div>

            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg sm:text-xl text-neutral-300 max-w-2xl font-normal leading-relaxed"
            >
              Professional, eco-friendly pest management for apartments, villas, offices, and commercial properties across Dubai, Sharjah, and Ajman. Safe for families, pets, and the environment.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={onBookClick}
                className="flex items-center justify-center gap-3 bg-[#E8871E] hover:bg-[#d47817] text-white px-8 py-4 rounded font-extrabold text-base tracking-wide transition-all shadow-xl hover:shadow-2xl active:scale-98 cursor-pointer group uppercase font-['Montserrat'] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none" />
                <span className="relative z-10">Get a Free Quote</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </button>

              <button
                onClick={onViewServicesClick}
                className="flex items-center justify-center gap-2 bg-[#171717] hover:bg-neutral-800 text-white border border-[#2A2A2A] px-7 py-4 rounded font-semibold text-base transition-all cursor-pointer uppercase font-['Montserrat'] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none" />
                <span className="relative z-10">View Services</span>
              </button>
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

            {/* Micro Trust Counters */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="pt-8 border-t border-[#2A2A2A] grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              <div>
                <div className="text-2xl lg:text-3xl font-black text-white font-['Montserrat']">
                  <AnimatedCounter value={1000} suffix="+" duration={2.5} />
                </div>
                <div className="text-xs text-neutral-400 mt-1 font-medium">UAE Properties Treated</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-black text-white font-['Montserrat']">Dubai, Sharjah, and Ajman</div>
                <div className="text-xs text-neutral-400 mt-1 font-medium">Service Coverage</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-black text-white font-['Montserrat']">
                  <AnimatedCounter value={4} suffix=" Months" duration={1.5} />
                </div>
                <div className="text-xs text-neutral-400 mt-1 font-medium">Guarantee Warranty</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-black text-white font-['Montserrat']">Same-Day</div>
                <div className="text-xs text-neutral-400 mt-1 font-medium">Rapid Dispatch</div>
              </div>
            </motion.div>

          </motion.div>

          {/* Hero Visual Card with Real Technician Photo */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#171717] border border-[#2A2A2A] rounded-lg overflow-hidden shadow-2xl space-y-0 group">
              
              {/* Feature Image Header */}
              <div className="relative h-64 sm:h-72 overflow-hidden border-b border-[#2A2A2A]">
                <img
                  src="/pest-technician.jpg"
                  alt="Certified Pest Control Technician Spraying Treatment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-transparent" />
                
                {/* Live Badge Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0A0A]/90 border border-neutral-700 backdrop-blur-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E8871E] animate-ping" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300">
                    Live Dispatch Ready
                  </span>
                </div>

                <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-[#0A0A0A]/90 border border-neutral-800 text-[10px] font-mono text-neutral-300 backdrop-blur-md">
                  Dubai, Sharjah, and Ajman
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <div className="text-sm font-extrabold text-white font-['Montserrat'] tracking-wide">
                    Certified Eco-Safe Treatment
                  </div>
                  <div className="text-xs text-neutral-300 font-medium">
                    Targeted spray & odorless micro-encapsulated gel protection
                  </div>
                </div>
              </div>

              {/* Service Inspection Checklist Graphic */}
              <div className="p-6 space-y-4 bg-[#171717]">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3 bg-[#0A0A0A] p-3 rounded border border-neutral-800 hover:border-[#7A9E7E]/50 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-[#7A9E7E] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">Guaranteed Pest Elimination</div>
                      <div className="text-xs text-neutral-400">Cockroaches, Ants, Bed Bugs & Rodents</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#0A0A0A] p-3 rounded border border-neutral-800 hover:border-[#E8871E]/50 transition-colors">
                    <Clock className="w-5 h-5 text-[#E8871E] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">Same-Day Rapid Dispatch</div>
                      <div className="text-xs text-neutral-400">Morning, Afternoon & Evening booking slots</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#0A0A0A] p-3 rounded border border-neutral-800 hover:border-[#7A9E7E]/50 transition-colors">
                    <MapPin className="w-5 h-5 text-[#7A9E7E] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">Serving Dubai, Sharjah, and Ajman</div>
                      <div className="text-xs text-neutral-400">Fast arrival across all residential & commercial zones</div>
                    </div>
                  </div>
                </div>

                {/* Hero Callout */}
                <div className="bg-[#0A0A0A] border border-neutral-800 p-4 rounded text-center space-y-2">
                  <p className="text-xs text-[#E8871E] uppercase tracking-widest font-mono font-bold">Instant Quote & Scheduling</p>
                  <p className="text-sm font-semibold text-white">No mandatory registration required.</p>
                  <button
                    onClick={onBookClick}
                    className="w-full mt-2 bg-[#E8871E] hover:bg-[#d47817] text-white py-2.5 rounded text-xs font-extrabold transition-colors cursor-pointer uppercase tracking-wider shadow-lg font-['Montserrat']"
                  >
                    Get a Free Quote (60 Sec)
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Section 3: Prominent Service Guarantee / Trust Cards */}
        <div className="pt-8 border-t border-[#2A2A2A]">
          <div className="text-center mb-6">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A9E7E]">
              Why Customers Trust Ridout Pest Control
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1 */}
            <div className="bg-[#171717] border border-[#2A2A2A] p-5 rounded flex items-start gap-3 hover:border-[#7A9E7E] transition-colors relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />
              <CheckCircle2 className="w-5 h-5 text-[#7A9E7E] shrink-0 mt-0.5 relative z-10" />
              <div className="relative z-10">
                <div className="text-sm font-bold text-white uppercase tracking-wide font-['Montserrat']">
                  FREE RE-TREATMENT
                </div>
                <div className="text-xs text-neutral-400 mt-0.5 font-medium">
                  If pests return within warranty
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#171717] border border-[#2A2A2A] p-5 rounded flex items-start gap-3 hover:border-[#7A9E7E] transition-colors relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />
              <CheckCircle2 className="w-5 h-5 text-[#7A9E7E] shrink-0 mt-0.5 relative z-10" />
              <div className="relative z-10">
                <div className="text-sm font-bold text-white uppercase tracking-wide font-['Montserrat']">
                  ECO-FRIENDLY & SAFE
                </div>
                <div className="text-xs text-neutral-400 mt-0.5 font-medium">
                  Family & pet safe products
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#171717] border border-[#2A2A2A] p-5 rounded flex items-start gap-3 hover:border-[#7A9E7E] transition-colors relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />
              <CheckCircle2 className="w-5 h-5 text-[#7A9E7E] shrink-0 mt-0.5 relative z-10" />
              <div className="relative z-10">
                <div className="text-sm font-bold text-white uppercase tracking-wide font-['Montserrat']">
                  SAME-DAY DISPATCH
                </div>
                <div className="text-xs text-neutral-400 mt-0.5 font-medium">
                  Across Dubai, Sharjah, and Ajman
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#171717] border border-[#2A2A2A] p-5 rounded flex items-start gap-3 hover:border-[#7A9E7E] transition-colors relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />
              <CheckCircle2 className="w-5 h-5 text-[#7A9E7E] shrink-0 mt-0.5 relative z-10" />
              <div className="relative z-10">
                <div className="text-sm font-bold text-white uppercase tracking-wide font-['Montserrat']">
                  4-MONTH GUARANTEE
                </div>
                <div className="text-xs text-neutral-400 mt-0.5 font-medium">
                  Backed by full coverage
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
