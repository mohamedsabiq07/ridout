import React from 'react';
import { Link } from 'react-router-dom';
import { PEST_CONTROL_SERVICES } from '../data/services';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { generateQuickServiceWhatsAppLink } from '../lib/whatsapp';

interface ServicesCatalogProps {
  onRequestService: (serviceId: string) => void;
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({
  onRequestService,
}) => {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F7F5F0] border-b border-[#E2DFD7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-600/20 text-emerald-800 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Dubai Municipality Public Health Section Approved</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-[#0A0A0A] mt-1">
              Targeted Pest Control Services
            </h2>
            <p className="text-[#5A5A5A] text-base max-w-2xl mt-2">
              Non-hazardous, low-toxicity, and 100% odorless eradication treatments registered with UAE Municipalities. Fast 60-min emergency dispatch.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-[#E2DFD7] text-xs text-neutral-600 shrink-0 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All chemicals non-hazardous for kids &amp; pets</span>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PEST_CONTROL_SERVICES.map((service, index) => {
            const waLink = generateQuickServiceWhatsAppLink(service.name, service.startingPrice);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white border border-[#E2DFD7] hover:border-[#E8871E] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_15px_40px_-5px_rgba(232,135,30,0.3),0_0_0_1px_rgba(232,135,30,0.4)] group relative h-full cursor-pointer"
              >
                <Link to={`/services/${service.slug}`} className="absolute inset-0 z-10" aria-label={`View ${service.name} details`} />
                {service.imageUrl && (
                  <div className="w-full h-44 overflow-hidden bg-[#E2DFD7] relative">
                    <img 
                      src={service.imageUrl} 
                      alt={`Professional ${service.name} in Dubai and Sharjah`} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"></div>
                    <span className="absolute bottom-2.5 left-3 text-[10px] font-mono font-bold bg-black/80 backdrop-blur-md text-[#E8871E] px-2 py-0.5 rounded border border-[#E8871E]/30">
                      Municipality Approved
                    </span>
                  </div>
                )}
                
                {/* Content Area */}
                <div className="p-6 flex flex-col flex-grow justify-between bg-white group-hover:bg-[linear-gradient(135deg,#FFFFFF_0%,#FEF3C7_50%,#E6F4EA_100%)] transition-colors duration-300">
                  <div>
                    {/* Price & Category Pill */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold font-mono text-[#E8871E]">
                        {service.startingPrice}
                      </span>
                      <span className="text-[10px] uppercase font-mono text-neutral-400">
                        Odorless &amp; Safe
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold font-['Montserrat'] text-[#0A0A0A] mb-2 transition-colors">
                      {service.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-[#5A5A5A] group-hover:text-[#2D2D2D] text-xs leading-relaxed mb-4 line-clamp-3 transition-colors">
                      {service.shortDesc}
                    </p>

                    {/* Badges / Problems preview */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.problems.slice(0, 3).map((problem) => (
                        <span
                          key={problem}
                          className="text-[10px] bg-[#F7F5F0] group-hover:bg-white/80 text-[#0A0A0A] border border-[#E2DFD7] group-hover:border-[#E8871E]/40 px-2 py-0.5 rounded font-medium transition-colors"
                        >
                          {problem}
                        </span>
                      ))}
                      {service.problems.length > 3 && (
                        <span className="text-[10px] bg-[#F7F5F0] group-hover:bg-white/80 text-[#5A5A5A] group-hover:text-[#2D2D2D] border border-[#E2DFD7] group-hover:border-[#E8871E]/40 px-2 py-0.5 rounded font-medium transition-colors">
                          +{service.problems.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions: 1-Tap WhatsApp + Request Form + View Specs */}
                  <div className="pt-4 border-t border-[#E2DFD7] group-hover:border-[#E8871E]/30 flex flex-col gap-2 mt-auto transition-colors relative z-20">
                    <div className="flex items-center justify-between gap-2">
                      {/* 1-Tap WhatsApp Consultation Button */}
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                        title="Instant 1-Tap WhatsApp Consultation"
                      >
                        <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>WhatsApp (1-Tap)</span>
                      </a>

                      {/* Request Booking Form button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRequestService(service.id);
                        }}
                        className="animate-shimmer bg-gradient-to-r from-[#E8871E] to-[#d47817] hover:from-[#f0922b] hover:to-[#E8871E] text-white text-[11px] font-bold px-3.5 py-2 rounded-lg transition-all duration-300 shadow-md shadow-[#E8871E]/20 border border-amber-300/30 cursor-pointer font-['Montserrat'] shrink-0 active:scale-95"
                      >
                        Book
                      </button>
                    </div>

                    {/* View Specs Link */}
                    <div className="flex justify-between items-center text-[11px] text-neutral-500 pt-1">
                      <Link
                        to={`/services/${service.slug}`}
                        className="hover:text-[#E8871E] flex items-center gap-1 font-semibold transition-colors"
                      >
                        <span>Detailed Specs &amp; Prep</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                      <span className="text-[10px] font-mono text-emerald-700 font-semibold">4-Mo Warranty</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
