import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

interface SocialProofEvent {
  id: string;
  name: string;
  location: string;
  service: string;
  timeAgo: string;
  icon: string;
}

const SAMPLE_EVENTS: SocialProofEvent[] = [
  {
    id: '1',
    name: 'Fatima Al-Nuaimi',
    location: 'Dubai Marina',
    service: 'Deep Kitchen Cleaning',
    timeAgo: '2 mins ago',
    icon: '🧹'
  },
  {
    id: '2',
    name: 'Tariq Mansoor',
    location: 'Downtown Dubai',
    service: 'Cockroach Gel Treatment',
    timeAgo: '5 mins ago',
    icon: '🪳'
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    location: 'Jumeirah Village Circle (JVC)',
    service: 'Bed Bug Thermal Eradication',
    timeAgo: '7 mins ago',
    icon: '🛏️'
  },
  {
    id: '4',
    name: 'Rashid Al-Mazrouei',
    location: 'Al Nahda, Sharjah',
    service: 'General Pest Fumigation',
    timeAgo: '11 mins ago',
    icon: '🛡️'
  },
  {
    id: '5',
    name: 'Elena Rostova',
    location: 'Palm Jumeirah',
    service: 'Deep Bathroom Sanitization',
    timeAgo: '14 mins ago',
    icon: '✨'
  },
  {
    id: '6',
    name: 'Kareem Abdallah',
    location: 'Business Bay',
    service: 'Termite Prevention Drill',
    timeAgo: '18 mins ago',
    icon: '🐜'
  }
];

export const LiveSocialProof: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show initial message after 5 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);

      // Auto-hide after 6.5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 6500);
    }, 5000);

    // Run every 30 seconds (exactly 2 notifications per minute)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SAMPLE_EVENTS.length);
      setIsVisible(true);

      // Auto-hide after 6.5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 6500);

    }, 30000); // 30s cycle = 2 messages per minute

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = SAMPLE_EVENTS[currentIndex];

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 z-40 max-w-xs sm:max-w-sm pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto bg-[#0A0A0A]/95 text-white border border-neutral-800 backdrop-blur-xl p-3 sm:p-3.5 rounded-xl shadow-2xl flex items-center gap-3 relative overflow-hidden"
          >
            {/* Ambient accent pulse */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#E8871E]" />

            {/* Service Icon */}
            <div className="w-9 h-9 rounded-lg bg-[#171717] border border-neutral-800 flex items-center justify-center text-lg shrink-0">
              {current.icon}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                <span className="font-semibold text-white truncate">{current.name}</span>
                <span>•</span>
                <span className="text-[#E8871E] font-medium truncate">{current.location}</span>
              </div>
              <div className="text-xs font-bold font-['Montserrat'] text-neutral-100 truncate mt-0.5">
                Booked {current.service}
              </div>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-500 font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3 h-3" /> Verified UAE Booking
                </span>
                <span>•</span>
                <span>{current.timeAgo}</span>
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-300 p-1 cursor-pointer transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
