import React, { useState } from 'react';
import { Menu, X, PhoneCall, LayoutDashboard, AlertTriangle } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
  onAdminClick: () => void;
  onEmergencyClick: () => void;
  pendingCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookClick,
  onAdminClick,
  onEmergencyClick,
  pendingCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Pest Control', href: '#services' },
    { label: 'Home Cleaning', href: '#home-cleaning' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'How It Works', href: '#process' },
    { label: 'Areas', href: '#service-areas' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#2A2A2A] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Business Logo */}
          <a href="#hero" className="flex items-center gap-3 group py-1">
            <img
              src="/logo-trimmed.png"
              alt="Rid Out Pest Control Services"
              className="h-11 sm:h-13 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Actions */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Urgent Pest Alert Button */}
            <button
              onClick={onEmergencyClick}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#171717] border border-[#2A2A2A] text-xs font-semibold text-amber-400 hover:bg-neutral-800 transition-all cursor-pointer"
              title="Urgent 24/7 Dispatch Alert"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[#E8871E] animate-pulse" />
              <span>Alert</span>
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={onAdminClick}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded bg-[#171717] border border-[#2A2A2A] text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-500 transition-all cursor-pointer"
              title="Open Admin Service Request Manager"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin</span>
              {pendingCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#E8871E] text-white text-[10px] font-bold flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>

            {/* Primary Book CTA */}
            <button
              onClick={onBookClick}
              className="bg-[#E8871E] hover:bg-[#d47817] text-white px-6 py-2.5 rounded font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer uppercase font-['Montserrat']"
            >
              Get a Free Quote
            </button>
          </div>

          {/* Mobile Menu & Action Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onEmergencyClick}
              className="p-2 text-amber-500 bg-neutral-900 border border-neutral-800 rounded-sm"
              title="Emergency Dispatch Alert"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>

            <button
              onClick={onAdminClick}
              className="p-2 text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-sm"
              title="Admin Portal"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white bg-neutral-900 border border-neutral-800 rounded-sm focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#171717] border-b border-[#2A2A2A] px-4 pt-4 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-neutral-300 hover:text-white px-2 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-neutral-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full bg-white text-[#0A0A0A] font-bold py-3 rounded-sm text-center text-sm"
            >
              Book a Service
            </button>
            <a
              href="tel:+971502364014"
              className="w-full flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-700 text-neutral-300 py-2.5 rounded-sm text-sm font-semibold"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +971 0502364014</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
