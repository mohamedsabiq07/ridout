import React from 'react';

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

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-[#1F1F1F] flex flex-col items-center justify-center text-center text-neutral-500">
          <p className="text-[11px] font-mono">
            © {new Date().getFullYear()} Rid Out Pest Control Services. All rights reserved. Municipality Certified.
          </p>
        </div>
      </div>
    </footer>
  );
};
