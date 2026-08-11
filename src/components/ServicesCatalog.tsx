import React, { useState } from 'react';
import { PEST_CONTROL_SERVICES } from '../data/services';
import type { PestService } from '../types/booking';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  Bug,
  Search,
  BedDouble,
  Wind,
  Zap,
  Hammer,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface ServicesCatalogProps {
  onSelectService: (service: PestService) => void;
  onRequestService: (serviceId: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldAlert,
  Bug,
  Search,
  BedDouble,
  Wind,
  Zap,
  Hammer,
  Sparkles,
};

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({
  onSelectService,
  onRequestService,
}) => {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  const filteredServices = PEST_CONTROL_SERVICES.filter((service) => {
    if (filter === 'all') return true;
    if (filter === 'residential') return service.suitableFor.includes('Residential') || service.suitableFor.includes('Apartments') || service.suitableFor.includes('Villas');
    if (filter === 'commercial') return service.suitableFor.includes('Commercial') || service.suitableFor.includes('Offices') || service.suitableFor.includes('Restaurants') || service.suitableFor.includes('Warehouses');
    return true;
  });

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

          {/* Filter Tabs */}
          <div className="inline-flex p-1 bg-[#E2DFD7]/60 rounded-md self-start md:self-auto border border-[#E2DFD7]">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded text-xs font-bold transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-[#0A0A0A] text-white shadow-sm' : 'text-[#2D2D2D] hover:text-[#0A0A0A]'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setFilter('residential')}
              className={`px-4 py-2 rounded text-xs font-bold transition-colors cursor-pointer ${
                filter === 'residential' ? 'bg-[#0A0A0A] text-white shadow-sm' : 'text-[#2D2D2D] hover:text-[#0A0A0A]'
              }`}
            >
              Residential
            </button>
            <button
              onClick={() => setFilter('commercial')}
              className={`px-4 py-2 rounded text-xs font-bold transition-colors cursor-pointer ${
                filter === 'commercial' ? 'bg-[#0A0A0A] text-white shadow-sm' : 'text-[#2D2D2D] hover:text-[#0A0A0A]'
              }`}
            >
              Commercial
            </button>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service, index) => {
            const IconComponent = ICON_MAP[service.iconName] || Bug;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/60 backdrop-blur-md border border-[#E2DFD7] hover:border-[#0A0A0A] rounded-lg p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group relative"
              >
                <div>
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 bg-[#0A0A0A] text-white rounded-md flex items-center justify-center group-hover:scale-105 transition-all shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-['Montserrat'] text-[#0A0A0A] mb-2 group-hover:text-[#E8871E] transition-colors">
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
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-[#E2DFD7] flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectService(service)}
                    className="text-xs font-bold text-[#0A0A0A] hover:text-[#E8871E] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onRequestService(service.id)}
                    className="bg-[#E8871E] hover:bg-[#d47817] text-white text-xs font-bold px-3.5 py-2 rounded transition-colors cursor-pointer uppercase font-['Montserrat']"
                  >
                    Request
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
