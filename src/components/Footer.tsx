import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onBookClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookClick }) => {
  return (
    <footer className="bg-[#050505] text-neutral-400 py-12 border-t border-[#1F1F1F] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          
          {/* Official Business Logo */}
          <div className="flex items-center gap-4 shrink-0">
            <img
              src="/logo-white.png"
              alt="Rid Out Pest Control Services"
              className="h-24 sm:h-32 w-auto object-contain -ml-4 sm:-ml-8 shrink-0 transition-transform scale-[1.6] sm:scale-[2] origin-left hover:scale-[1.7] sm:hover:scale-[2.1]"
            />
          </div>

          {/* Footer Quick Links */}
          <div className="flex items-center gap-6">
            <a href="#services" className="hover:text-white transition-colors">
              Pest Services
            </a>
            <a href="#why-us" className="hover:text-white transition-colors">
              Why Us
            </a>
            <span className="hidden sm:inline">Dubai, Sharjah & Ajman</span>
            <button 
              onClick={onBookClick}
              className="text-[#E8871E] hover:text-[#FFA03A] font-bold transition-colors uppercase tracking-wider"
            >
              Get a Free Quote
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 py-8 border-t border-[#1F1F1F]">
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider font-mono">Service Areas (UAE)</h4>
            <ul className="space-y-2">
              <li><Link to="/locations/dubai" className="hover:text-white transition-colors">Pest Control Dubai</Link></li>
              <li><Link to="/locations/sharjah" className="hover:text-white transition-colors">Pest Control Sharjah</Link></li>
              <li><Link to="/locations/ajman" className="hover:text-white transition-colors">Pest Control Ajman</Link></li>
              <li><Link to="/locations/dubai-marina" className="hover:text-white transition-colors">Dubai Marina &amp; JBR</Link></li>
              <li><Link to="/locations/downtown-dubai" className="hover:text-white transition-colors">Downtown &amp; Business Bay</Link></li>
              <li><Link to="/locations/jvc" className="hover:text-white transition-colors">JVC &amp; Dubai Hills</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider font-mono">Pest Treatments</h4>
            <ul className="space-y-2">
              <li><Link to="/services/cockroach-control" className="hover:text-white transition-colors">Cockroach Gel Treatment</Link></li>
              <li><Link to="/services/bed-bug-treatment" className="hover:text-white transition-colors">Bed Bug Thermal &amp; Spray</Link></li>
              <li><Link to="/services/termite-treatment" className="hover:text-white transition-colors">Termite Barrier Treatment</Link></li>
              <li><Link to="/services/mosquito-control" className="hover:text-white transition-colors">Mosquito Misting &amp; Larvicide</Link></li>
              <li><Link to="/services/rodent-control" className="hover:text-white transition-colors">Rodent Pest Control</Link></li>
              <li><Link to="/services/ant-control" className="hover:text-white transition-colors">Ant Elimination</Link></li>
              <li><Link to="/services/general-pest-control" className="hover:text-white transition-colors">General Pest Control</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider font-mono">Property Solutions</h4>
            <ul className="space-y-2">
              <li><Link to="/property/apartments" className="hover:text-[#E8871E] transition-colors">Dubai Apartments</Link></li>
              <li><Link to="/property/villas" className="hover:text-[#E8871E] transition-colors">Villas &amp; Gardens</Link></li>
              <li><Link to="/property/shared-accommodation" className="hover:text-[#E8871E] transition-colors">Shared &amp; Staff Camps</Link></li>
              <li><Link to="/property/restaurants" className="hover:text-[#E8871E] transition-colors">Restaurants &amp; Cafes</Link></li>
              <li><Link to="/property/warehouses" className="hover:text-[#E8871E] transition-colors">Warehouses &amp; Logistics</Link></li>
              <li><Link to="/property/hotels" className="hover:text-[#E8871E] transition-colors">Hotels &amp; Holiday Homes</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider font-mono">Pest Guides (UAE)</h4>
            <ul className="space-y-2">
              <li><Link to="/guide/cockroaches-dubai-apartments" className="hover:text-[#E8871E] transition-colors">Cockroach Apartment Guide</Link></li>
              <li><Link to="/guide/dubai-pest-control-cost" className="hover:text-[#E8871E] transition-colors">Dubai Pest Control Cost</Link></li>
              <li><Link to="/guide/apartment-prep-pest-control" className="hover:text-[#E8871E] transition-colors">Apartment Prep Checklist</Link></li>
              <li><Link to="/guide/bed-bugs-dubai-signs-treatment" className="hover:text-[#E8871E] transition-colors">Bed Bug Signs &amp; Steam</Link></li>
              <li><Link to="/guide/termites-dubai-signs-inspection" className="hover:text-[#E8871E] transition-colors">Termite Warning Signs</Link></li>
              <li><Link to="/guides" className="text-[#E8871E] font-bold hover:underline">View All 8 Guides →</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider font-mono">Deep Cleaning</h4>
            <ul className="space-y-2">
              <li><Link to="/services/kitchen-cleaning" className="hover:text-white transition-colors">Kitchen Degreasing</Link></li>
              <li><Link to="/services/bathroom-cleaning" className="hover:text-white transition-colors">Bathroom Descaling</Link></li>
              <li><Link to="/services/deep-cleaning" className="hover:text-white transition-colors">Move-in / Move-out Cleaning</Link></li>
              <li><Link to="/services/disinfection-sanitization" className="hover:text-white transition-colors">Disinfection &amp; Sanitization</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider font-mono">Contact &amp; Support</h4>
            <ul className="space-y-2">
              <li><a href="tel:+971554720124" className="hover:text-[#E8871E] transition-colors font-semibold">Call: +971 554720124</a></li>
              <li><a href="https://wa.me/971554720124" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors font-semibold">WhatsApp: 24/7 Dispatch</a></li>
              <li>support@ridoutpestcontrol.ae</li>
              <li className="text-neutral-500 pt-2 text-xs">Dubai • Sharjah • Ajman</li>
              <li className="text-emerald-400 text-xs font-mono font-semibold pt-1">Municipality Registered</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-[#1F1F1F] flex flex-col items-center justify-center text-center text-neutral-500">
          <p className="text-[11px] font-mono">
            © {new Date().getFullYear()} RIDOUT Pest Control &amp; Cleaning Services UAE. All rights reserved. Registered with Dubai Municipality Public Health Pest Control Section.
          </p>
        </div>
      </div>
    </footer>
  );
};
