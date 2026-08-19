import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Check, ArrowRight, Sparkles } from 'lucide-react';
import { 
  DEFAULT_PRICING_OPTIONS, 
  fetchPricingConfig, 
  type ServicePricingOption, 
  type PropertyTypeKey 
} from '../lib/pricing';

interface PriceEstimatorProps {
  onSelectAndBook: (serviceId: string, propertyType: string) => void;
}

export const PriceEstimator: React.FC<PriceEstimatorProps> = ({ onSelectAndBook }) => {
  const [pricingOptions, setPricingOptions] = useState<ServicePricingOption[]>(DEFAULT_PRICING_OPTIONS);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('cockroach-control');
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyTypeKey>('2 BHK');

  useEffect(() => {
    fetchPricingConfig().then((data) => {
      if (data && data.length > 0) {
        setPricingOptions(data);
      }
    });
  }, []);

  const selectedService = pricingOptions.find(s => s.id === selectedServiceId) || pricingOptions[0];
  const currentRate = (selectedService && selectedService.rates && selectedService.rates[selectedPropertyType]) 
    ? selectedService.rates[selectedPropertyType] 
    : { min: 199, max: 299 };

  const handleBookEstimate = () => {
    onSelectAndBook(selectedServiceId, selectedPropertyType);
  };

  return (
    <section id="pricing-estimator" className="py-20 lg:py-28 bg-[#F7F5F0] border-b border-[#E2DFD7] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E2DFD7] text-xs font-mono font-semibold text-[#0A0A0A] shadow-sm"
          >
            <Calculator className="w-4 h-4 text-[#E8871E]" />
            <span>Transparent Pricing in UAE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Montserrat'] text-[#0A0A0A] tracking-tight"
          >
            Instant Rate Calculator
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#5A5A5A] text-sm sm:text-base"
          >
            No hidden charges or upfront deposits. Select your service and property layout below to view our standard UAE starting estimates.
          </motion.p>
        </div>

        {/* Calculator Box */}
        <div className="bg-white border border-[#E2DFD7] rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Controls Column (7 cols) */}
          <div className="p-6 sm:p-10 lg:col-span-7 space-y-8">
            
            {/* Step 1: Select Service */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A] mb-3">
                1. Select Service Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pricingOptions.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      selectedServiceId === service.id
                        ? 'bg-[#0A0A0A] border-[#0A0A0A] text-white shadow-md'
                        : 'bg-[#F7F5F0] border-[#E2DFD7] text-[#2D2D2D] hover:border-[#0A0A0A]'
                    }`}
                  >
                    <span className="truncate">{service.name}</span>
                    {selectedServiceId === service.id && (
                      <Check className="w-4 h-4 text-[#E8871E] shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Property Layout */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A] mb-3">
                2. Select Property Size
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {(['Studio', '1 BHK', '2 BHK', '3+ BHK', 'Villa', 'Commercial'] as PropertyTypeKey[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedPropertyType(type)}
                    className={`py-2.5 px-2 rounded-lg border text-center text-xs font-bold font-mono transition-all cursor-pointer ${
                      selectedPropertyType === type
                        ? 'bg-[#E8871E] border-[#E8871E] text-white shadow-md'
                        : 'bg-[#F7F5F0] border-[#E2DFD7] text-[#2D2D2D] hover:border-[#0A0A0A]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Features Checklist */}
            <div className="pt-4 border-t border-[#E2DFD7] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5A5A5A]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E8871E]" />
                <span>Municipality-Approved Chemicals</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E8871E]" />
                <span>Zero Advance Deposit Required</span>
              </div>
            </div>

          </div>

          {/* Pricing Result Card (5 cols) */}
          <div className="bg-[#0A0A0A] text-white p-8 sm:p-10 lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#2A2A2A] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#E8871E]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#E8871E] font-bold">
                  Estimated Pricing
                </span>
                <h3 className="text-xl font-bold font-['Montserrat'] mt-1 text-white">
                  {selectedService.name}
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Layout: {selectedPropertyType}
                </p>
              </div>

              {/* Price Display */}
              <div className="bg-[#171717] border border-[#2A2A2A] rounded-xl p-5 text-center">
                <span className="text-xs font-mono text-neutral-400 uppercase">Estimated Total</span>
                <div className="text-3xl sm:text-4xl font-black font-['Montserrat'] text-white mt-1">
                  <span className="text-[#E8871E]">AED {currentRate.min}</span>
                  <span className="text-neutral-500 text-2xl font-light"> - </span>
                  <span>{currentRate.max}</span>
                </div>
                <p className="text-[10px] text-neutral-400 mt-1">
                  *Final quote provided upon rapid on-site inspection
                </p>
              </div>

              {/* Specs & Duration */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-neutral-800">
                  <span className="text-neutral-400">Est. Treatment Time</span>
                  <span className="font-semibold text-white">{selectedService.duration}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-800">
                  <span className="text-neutral-400">Warranty / Guarantee</span>
                  <span className="font-semibold text-emerald-400">{selectedService.guarantee}</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 relative z-10">
              <button
                onClick={handleBookEstimate}
                className="w-full py-4 bg-[#E8871E] hover:bg-[#d47817] text-white rounded-xl font-extrabold text-sm tracking-wide transition-all shadow-xl hover:shadow-2xl active:scale-98 cursor-pointer uppercase font-['Montserrat'] flex items-center justify-center gap-2"
              >
                <span>Lock In This Rate & Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
