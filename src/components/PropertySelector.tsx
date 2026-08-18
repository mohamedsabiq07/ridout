import React from 'react';
import { Home, Building2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const PropertySelector: React.FC<{ onSelect: (type: 'residential' | 'commercial') => void }> = ({ onSelect }) => {
  return (
    <section className="bg-[#171717] py-16 border-b border-[#2A2A2A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold font-['Montserrat'] text-white mb-3">
            What type of property needs treatment?
          </h2>
          <p className="text-neutral-400">Select your property type to view tailored pest control solutions.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            onClick={() => onSelect('residential')}
            className="bg-[#232323] border border-[#333] hover:border-[#7A9E7E] rounded-xl p-8 cursor-pointer group transition-all text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7A9E7E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#7A9E7E]/20 text-[#7A9E7E] mb-6 group-hover:scale-110 transition-transform">
              <Home className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-['Montserrat'] text-white mb-2">Residential</h3>
            <p className="text-neutral-400 text-sm mb-6">Villas, Apartments, and Townhouses.</p>
            <div className="inline-flex items-center text-[#7A9E7E] font-bold text-sm uppercase tracking-wide">
              View Services <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            onClick={() => onSelect('commercial')}
            className="bg-[#232323] border border-[#333] hover:border-[#E8871E] rounded-xl p-8 cursor-pointer group transition-all text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#E8871E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E8871E]/20 text-[#E8871E] mb-6 group-hover:scale-110 transition-transform">
              <Building2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-['Montserrat'] text-white mb-2">Commercial</h3>
            <p className="text-neutral-400 text-sm mb-6">Offices, Warehouses, and Restaurants.</p>
            <div className="inline-flex items-center text-[#E8871E] font-bold text-sm uppercase tracking-wide">
              View Services <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
