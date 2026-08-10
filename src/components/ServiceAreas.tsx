import React from 'react';
import { UAE_LOCATIONS } from '../data/locations';
import { MapPin, Navigation } from 'lucide-react';

export const ServiceAreas: React.FC = () => {
  return (
    <section id="service-areas" className="py-20 bg-[#0A0A0A] text-white border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#7A9E7E] uppercase">
              Service Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-white mt-2">
              Serving Dubai, Sharjah, and Ajman
            </h2>
            <p className="text-[#5A5A5A] text-sm">
              Active mobile dispatch units covering residential communities, apartments, villas, and commercial premises across Dubai, Sharjah, and Ajman.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#171717] border border-[#2A2A2A] rounded text-xs text-amber-300 font-mono">
            <Navigation className="w-4 h-4 text-[#E8871E]" />
            <span>Fast Dispatch Under 60 Mins</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {UAE_LOCATIONS.map((loc) => (
            <div
              key={loc.emirate}
              className="bg-[#171717] border border-[#2A2A2A] p-6 rounded-lg space-y-4 hover:border-[#7A9E7E] transition-colors"
            >
              <div className="flex items-center gap-2 border-b border-[#2A2A2A] pb-3">
                <MapPin className="w-5 h-5 text-[#7A9E7E]" />
                <h3 className="text-lg font-bold font-['Montserrat'] text-white">
                  {loc.emirate}
                </h3>
              </div>

              <ul className="space-y-2 text-xs text-neutral-300">
                {loc.areas.map((area) => (
                  <li key={area} className="flex items-center gap-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 bg-[#7A9E7E] rounded-full" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
