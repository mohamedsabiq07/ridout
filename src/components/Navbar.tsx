import React, { useState } from 'react';
import { Menu, X, PhoneCall, AlertTriangle, Sparkles } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
  onEmergencyClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookClick,
  onEmergencyClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/#hero' },
    { label: 'Pest Control', href: '/#services' },
    { label: 'Cleaning Services', href: '/#home-cleaning' },
    { label: 'Why Us', href: '/#why-us' },
    { label: 'Calculator', href: '/#pricing-estimator' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-2xl border-b border-white/10 text-white shadow-2xl transition-all duration-300 relative group">
      
      {/* Ambient Mixed Gradient Glowing Line along bottom of taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E8871E] to-[#7A9E7E] opacity-70 group-hover:opacity-100 transition-opacity shadow-[0_0_12px_rgba(232,135,30,0.6)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Business Logo with Smooth Hover Glow */}
          <a href="#hero" className="flex items-center gap-3 group py-1 shrink-0">
            <img
              src="/logo-white.png"
              alt="Rid Out Pest Control Services"
              className="h-20 sm:h-28 w-auto object-contain -ml-6 sm:-ml-8 shrink-0 transition-all duration-500 scale-[2.2] sm:scale-[2.2] origin-left group-hover:scale-[2.35] group-hover:drop-shadow-[0_0_15px_rgba(232,135,30,0.4)]"
            />
          </a>

          {/* Desktop Navigation with Magnetic Mixed-Gradient Pills */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-all duration-300 border border-transparent hover:border-[#E8871E]/40 hover:bg-gradient-to-r hover:from-[#E8871E]/20 hover:via-[#7A9E7E]/20 hover:to-[#E8871E]/20 hover:shadow-lg hover:shadow-[#E8871E]/20 transform hover:-translate-y-0.5 active:scale-95 group/link"
              >
                <span>{link.label}</span>
                {/* Micro glowing indicator line under each item */}
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#E8871E] to-[#7A9E7E] rounded-full group-hover/link:w-3/4 transition-all duration-300 opacity-0 group-hover/link:opacity-100" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Actions */}
          <div className="hidden lg:flex items-center gap-3.5">
            
            {/* Urgent Pest Alert Button with Pulsing Mixed Beacon */}
            <button
              onClick={onEmergencyClick}
              className="group/alert relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#171717] hover:bg-gradient-to-r hover:from-red-950/60 hover:to-amber-950/60 border border-[#2A2A2A] hover:border-[#E8871E] text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-all duration-300 shadow-md hover:shadow-[#E8871E]/20 cursor-pointer transform hover:scale-105 active:scale-95"
              title="Urgent 24/7 Dispatch Alert"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8871E]" />
              </span>
              <AlertTriangle className="w-3.5 h-3.5 text-[#E8871E] group-hover/alert:rotate-12 transition-transform" />
              <span>Alert</span>
            </button>

            {/* Primary Book CTA with Shimmer & Ambient Glow */}
            <button
              onClick={onBookClick}
              className="animate-shimmer relative bg-gradient-to-r from-[#E8871E] to-[#d47817] hover:from-[#f0922b] hover:to-[#E8871E] text-white px-6 py-2.5 rounded-full font-black text-xs sm:text-sm tracking-wider uppercase font-['Montserrat'] transition-all duration-300 shadow-lg shadow-[#E8871E]/30 hover:shadow-xl hover:shadow-[#E8871E]/50 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer border border-amber-300/30 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get a Free Quote</span>
            </button>
          </div>

          {/* Mobile Menu & Action Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onEmergencyClick}
              className="p-2 text-amber-500 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-amber-500 transition-colors"
              title="Emergency Dispatch Alert"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:border-white transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#171717] border-b border-[#2A2A2A] px-4 pt-4 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-neutral-300 hover:text-white px-3 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-[#E8871E]/20 hover:to-transparent border border-transparent hover:border-[#E8871E]/30 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full bg-[#E8871E] hover:bg-[#d47817] text-white font-extrabold py-3 rounded-lg text-center text-xs tracking-wider uppercase font-['Montserrat'] shadow-lg shadow-[#E8871E]/20"
            >
              Book a Service
            </button>
            <a
              href="tel:+971554720124"
              className="w-full flex items-center justify-center gap-2 bg-[#0A0A0A] border border-neutral-700 text-neutral-200 py-2.5 rounded-lg text-xs font-semibold"
            >
              <PhoneCall className="w-4 h-4 text-[#E8871E]" />
              <span>Call +971 554720124</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
