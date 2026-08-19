import React from 'react';
import { Link } from 'react-router-dom';
import { PEST_CONTROL_SERVICES } from '../data/services';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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
            <span className="text-xs font-mono font-bold tracking-widest text-[#7A9E7E] uppercase">
              Targeted Eco-Safe Treatments
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-[#0A0A0A] mt-2">
              Our Pest Control Services
            </h2>
            <p className="text-[#5A5A5A] text-base max-w-xl mt-2">
              Municipality-approved, odorless chemical and biological eradication treatments tailored for UAE properties.
            </p>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PEST_CONTROL_SERVICES.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white hover:bg-gradient-to-br hover:from-white hover:via-[#FEF3C7]/60 hover:to-[#E6F4EA]/60 border border-[#E2DFD7] hover:border-[#E8871E] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_15px_40px_-5px_rgba(232,135,30,0.3),0_0_0_1px_rgba(232,135,30,0.4)] group relative h-full cursor-pointer"
              >
                <Link to={`/services/${service.slug}`} className="absolute inset-0 z-10" aria-label={`View ${service.name} details`} />
                {service.imageUrl && (
                  <div className="w-full h-44 overflow-hidden bg-[#E2DFD7] relative">
                    <img 
                      src={service.imageUrl} 
                      alt={service.name} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                    <span className="absolute bottom-2.5 left-3 text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md text-[#E8871E] px-2 py-0.5 rounded border border-[#E8871E]/30">
                      Municipality Approved
                    </span>
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="text-xl font-bold font-['Montserrat'] text-[#0A0A0A] mb-2 group-hover:text-[#E8871E] transition-colors mt-2">
                      {service.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-[#5A5A5A] text-xs leading-relaxed mb-4 line-clamp-3">
                      {service.shortDesc}
                    </p>

                    {/* Badges / Problems preview */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.problems.slice(0, 3).map((problem) => (
                        <span
                          key={problem}
                          className="text-[10px] bg-[#F7F5F0] text-[#0A0A0A] border border-[#E2DFD7] px-2 py-0.5 rounded font-medium"
                        >
                          {problem}
                        </span>
                      ))}
                      {service.problems.length > 3 && (
                        <span className="text-[10px] bg-[#F7F5F0] text-[#5A5A5A] border border-[#E2DFD7] px-2 py-0.5 rounded font-medium">
                          +{service.problems.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-[#E2DFD7] flex items-center justify-between gap-2 mt-auto">
                    <Link
                      to={`/services/${service.slug}`}
                      className="text-xs font-bold text-[#0A0A0A] hover:text-[#E8871E] flex items-center gap-1 cursor-pointer transition-colors relative z-20"
                    >
                      <span>View Specs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => onRequestService(service.id)}
                      className="animate-shimmer bg-gradient-to-r from-[#E8871E] to-[#d47817] hover:from-[#f0922b] hover:to-[#E8871E] text-white text-[10px] sm:text-xs font-bold px-4 py-2 rounded-full transition-all duration-300 shadow-md shadow-[#E8871E]/30 hover:shadow-lg hover:shadow-[#E8871E]/50 border border-amber-300/30 cursor-pointer uppercase font-['Montserrat'] shrink-0 relative z-20 active:scale-95"
                    >
                      Request
                    </button>
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
