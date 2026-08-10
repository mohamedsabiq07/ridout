import React from 'react';
import { Clock, ShieldCheck, Leaf, Building, Tag, RotateCcw } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const pillars = [
    {
      title: 'Fast Response',
      desc: 'Rapid 60-minute emergency dispatch across major urban areas in Dubai and Sharjah.',
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
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-[#7A9E7E] uppercase">
            Built On UAE Safety Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-[#0A0A0A]">
            Why Customers Choose Us
          </h2>
          <p className="text-[#5A5A5A] text-sm sm:text-base">
            Delivering uncompromised technical pest management for UAE residential and commercial properties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white border border-[#E2DFD7] p-6 rounded-lg space-y-4 hover:border-[#0A0A0A] transition-all hover:shadow-lg group"
              >
                <div className="w-10 h-10 bg-[#0A0A0A] text-white rounded flex items-center justify-center transition-colors group-hover:bg-[#E8871E]">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-['Montserrat'] text-[#0A0A0A]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#5A5A5A] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Visual Inspection Showcase Banner */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-[#E2DFD7] rounded-lg overflow-hidden p-3 shadow-sm">
          
          <div className="relative rounded overflow-hidden h-56 group">
            <img
              src="/pest-commercial-warehouse.png"
              alt="Commercial Warehouse Pest Management"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#7A9E7E]">
                Commercial Facility Coverage
              </span>
              <h4 className="text-base font-extrabold font-['Montserrat'] mt-0.5">
                Industrial & Warehouse Pest Proofing
              </h4>
              <p className="text-xs text-neutral-300">
                Tamper-proof safety baiting stations and architectural exclusion sealing.
              </p>
            </div>
          </div>

          <div className="relative rounded overflow-hidden h-56 group">
            <img
              src="/pest-thermal-steam.png"
              alt="Thermal Dry Steam Treatment"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E8871E]">
                Thermal Elimination
              </span>
              <h4 className="text-base font-extrabold font-['Montserrat'] mt-0.5">
                Superheated Bed Bug Eradication
              </h4>
              <p className="text-xs text-neutral-300">
                180°C dry steam injection paired with micro-encapsulated growth regulators.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
