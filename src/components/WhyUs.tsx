import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, Leaf, Building, Tag, RotateCcw } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const pillars = [
    {
      title: 'Fast Response',
      desc: 'Rapid 60-minute emergency dispatch across major urban areas in Dubai, Sharjah, and Ajman.',
      icon: Clock,
    },
    {
      title: 'Certified Technicians',
      desc: '100% municipality-licensed pest control engineers trained in high-grade eco-friendly treatment standards.',
      icon: ShieldCheck,
    },
    {
      title: 'Safe Treatment Methods',
      desc: 'Odorous-free, non-toxic formulations safe for children, pets, asthmatics, and indoor environments.',
      icon: Leaf,
    },
    {
      title: 'Residential & Commercial',
      desc: 'Customized solutions for studio apartments, luxury villas, commercial towers, food outlets, and warehouses.',
      icon: Building,
    },
    {
      title: 'Transparent Pricing',
      desc: 'Clear upfront service rates with zero hidden callout fees or unexpected surcharges.',
      icon: Tag,
    },
    {
      title: 'Reliable Follow-Up',
      desc: 'Free re-inspection and secondary treatment guarantee if pests re-emerge within warranty period.',
      icon: RotateCcw,
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-[#F7F5F0] border-b border-[#E2DFD7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-2"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-[#7A9E7E] uppercase">
            Built On UAE Safety Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-[#0A0A0A]">
            Why Customers Choose Us
          </h2>
          <p className="text-[#5A5A5A] text-sm sm:text-base">
            Delivering uncompromised technical pest management for UAE residential and commercial properties.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/60 backdrop-blur-md border border-[#E2DFD7] p-6 rounded-lg space-y-4 hover:border-[#0A0A0A] transition-all hover:shadow-lg group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />
                <div className="w-10 h-10 bg-[#0A0A0A] text-white rounded flex items-center justify-center transition-colors group-hover:bg-[#E8871E] relative z-10">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-['Montserrat'] text-[#0A0A0A] relative z-10">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#5A5A5A] leading-relaxed relative z-10">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>



      </div>
    </section>
  );
};
