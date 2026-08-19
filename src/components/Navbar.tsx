import React, { useState } from 'react';
import { Menu, X, PhoneCall, Sparkles } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
  onEmergencyClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/#hero' },
    { label: 'Pest Control', href: '/#services' },
    { label: 'Cleaning Services', href: '/#home-cleaning' },
    { label: 'Why Us', href: '/#why-us' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10 text-white shadow-lg transition-all duration-300 relative group">
      
      {/* Ambient Mixed Gradient Line along bottom of taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E8871E]/60 to-[#7A9E7E]/60 opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Official Business Logo - Big & Bold */}
          <a href="#hero" className="flex items-center group shrink-0 min-w-[270px] sm:min-w-[310px] py-1">
            <img
              src="/logo-white.png"
              alt="Rid Out Pest Control Services"
              className="h-20 sm:h-24 w-auto object-contain transition-all duration-300 scale-[2.2] sm:scale-[2.4] origin-left -ml-4 sm:-ml-6 group-hover:scale-[2.5] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#E8871E]/15 hover:via-[#7A9E7E]/15 hover:to-[#E8871E]/15 hover:border hover:border-[#E8871E]/30 transform hover:-translate-y-0.5 active:scale-95 group/link"
              >
                <span>{link.label}</span>
                {/* Micro indicator line under each item */}
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#E8871E] rounded-full group-hover/link:w-2/3 transition-all duration-300 opacity-0 group-hover/link:opacity-100" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={onBookClick}
              className="animate-shimmer relative bg-gradient-to-r from-[#E8871E] to-[#d47817] hover:from-[#f0922b] hover:to-[#E8871E] text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold text-xs tracking-wider uppercase font-['Montserrat'] transition-all duration-300 shadow-md shadow-[#E8871E]/25 hover:shadow-lg hover:shadow-[#E8871E]/40 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer border border-amber-300/30 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get a Free Quote</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:border-white transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#171717] border-b border-[#2A2A2A] px-4 pt-3 pb-5 space-y-3 shadow-2xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white px-3 py-2 rounded-lg hover:bg-neutral-800 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2.5 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full bg-[#E8871E] hover:bg-[#d47817] text-white font-extrabold py-2.5 rounded-lg text-center text-xs tracking-wider uppercase font-['Montserrat'] shadow-md shadow-[#E8871E]/20"
            >
              Book a Service
            </button>
            <a
              href="tel:+971554720124"
              className="w-full flex items-center justify-center gap-2 bg-[#0A0A0A] border border-neutral-700 text-neutral-200 py-2 rounded-lg text-xs font-semibold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#E8871E]" />
              <span>Call +971 554720124</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
