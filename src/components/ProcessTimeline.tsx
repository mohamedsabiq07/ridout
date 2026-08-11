import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, Lock, RotateCcw } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: '1. Inspect',
      desc: 'Our certified UAE engineers conduct a thorough onsite inspection to identify pest species, nest entry pathways, and infestation levels.',
      icon: Search,
    },
    {
      step: '02',
      title: '2. Treat',
      desc: 'We apply targeted, odorless, eco-friendly chemical gels and micro-encapsulated formulations safe for pets and children.',
      icon: ShieldCheck,
    },
    {
      step: '03',
      title: '3. Prevent',
      desc: 'Technicians seal entry cracks, apply barrier perimeter protection, and install tamper-proof monitoring systems to stop return.',
      icon: Lock,
    },
    {
      step: '04',
      title: '4. Follow-up',
      desc: 'We perform scheduled quality re-inspections and offer free secondary re-treatment if pests re-emerge during warranty.',
      icon: RotateCcw,
    },
  ];

  return (
    <section id="process" className="py-20 bg-[#0A0A0A] text-white border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-[#7A9E7E] uppercase">
            Proven 4-Step Technical Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-white">
            Our Treatment Process
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base">
            From initial inspection to complete long-term protection — structured, safe, and guaranteed.
          </p>
        </motion.div>

        {/* Desktop Horizontal Timeline / Mobile Vertical Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div 
                key={item.step} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-start group bg-white/5 bg-noise backdrop-blur-md p-6 rounded-lg border border-white/10 hover:border-[#7A9E7E] transition-all"
              >
                
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between w-full mb-6 border-b border-[#2A2A2A] pb-4">
                  <div className="w-12 h-12 bg-[#0A0A0A] border border-neutral-800 text-[#E8871E] rounded flex items-center justify-center font-mono font-black text-sm transition-colors shadow-lg">
                    <IconComponent className="w-6 h-6 text-[#E8871E]" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#7A9E7E] bg-[#0A0A0A] border border-neutral-800 px-2.5 py-1 rounded">
                    STEP {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-['Montserrat'] text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
