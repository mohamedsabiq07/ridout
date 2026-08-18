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
    <section id="why-us" className="py-20 relative border-b border-[#2A2A2A] overflow-hidden">
      {/* Background with color and subtle gradients for the glass effect to stand out */}
      <div className="absolute inset-0 bg-[#0A0A0A] z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8871E]/5 via-transparent to-[#7A9E7E]/10 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative rounded-xl overflow-hidden h-64 sm:h-96 lg:h-full lg:min-h-[600px] shadow-2xl border border-white/10"
          >
            <img 
              src="/why-us-team.jpg" 
              alt="Rid Out Pest Control Team" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent pointer-events-none" />
          </motion.div>

          {/* Right: Content */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <span className="text-xs font-mono font-bold tracking-widest text-[#7A9E7E] uppercase">
                Built On UAE Safety Standards
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-white">
                Why Customers Choose Us
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
                Delivering uncompromised technical pest management for UAE residential and commercial properties.
              </p>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, index) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-lg space-y-3 hover:border-white/20 transition-all hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:bg-white/10 group relative overflow-hidden"
                  >
                    <div className="w-8 h-8 bg-white/10 text-[#E8871E] rounded flex items-center justify-center transition-colors group-hover:bg-[#E8871E] group-hover:text-white relative z-10">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold font-['Montserrat'] text-white relative z-10">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-400 relative z-10 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>



      </div>
    </section>
  );
};
