import React from 'react';
import { Phone, MessageSquare, Zap } from 'lucide-react';

interface MobileActionDockProps {
  onBookClick: () => void;
}

export const MobileActionDock: React.FC<MobileActionDockProps> = ({ onBookClick }) => {
  const whatsappUrl = `https://wa.me/971554720124?text=${encodeURIComponent(
    'Hello Rid Out UAE, I would like to get a fast quote for pest control / cleaning service.'
  )}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-neutral-800 p-2.5 px-3 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-3 gap-2">
        {/* 1-Tap Direct Call */}
        <a
          href="tel:+971554720124"
          className="flex flex-col items-center justify-center py-2 px-1 bg-[#171717] hover:bg-neutral-800 border border-neutral-700 text-white rounded-lg text-[11px] font-bold transition-all active:scale-95 text-center"
        >
          <Phone className="w-4 h-4 text-[#E8871E] mb-0.5" />
          <span>Call Now</span>
        </a>

        {/* 1-Tap Instant WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-300 rounded-lg text-[11px] font-bold transition-all active:scale-95 text-center"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        {/* 1-Tap Instant Booking Scroll */}
        <button
          onClick={onBookClick}
          className="flex flex-col items-center justify-center py-2 px-1 bg-[#E8871E] hover:bg-[#d47817] text-white rounded-lg text-[11px] font-extrabold transition-all active:scale-95 text-center cursor-pointer shadow-lg shadow-[#E8871E]/20"
        >
          <Zap className="w-4 h-4 text-white mb-0.5" />
          <span>Book in 60s</span>
        </button>
      </div>
    </div>
  );
};
