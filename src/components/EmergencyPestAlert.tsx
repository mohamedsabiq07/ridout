import React, { useState } from 'react';
import { AlertTriangle, X, Zap, PhoneCall, ArrowRight } from 'lucide-react';

interface EmergencyPestAlertProps {
  onQuickUrgentBook: (pestType: string) => void;
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export const EmergencyPestAlert: React.FC<EmergencyPestAlertProps> = ({
  onQuickUrgentBook,
  isOpenExternal,
  onCloseExternal,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalOpen;
  const handleClose = () => {
    if (onCloseExternal) onCloseExternal();
    setInternalOpen(false);
  };

  const emergencyOptions = [
    { title: 'Cockroach Nest in Kitchen', id: 'cockroach-control' },
    { title: 'Bed Bug Infestation', id: 'bed-bug-treatment' },
    { title: 'Rats / Rodent Chewing', id: 'rodent-control' },
    { title: 'Termite Damage', id: 'termite-treatment' },
    { title: 'General Pest Emergency', id: 'general-pest-control' },
  ];

  return (
    <>
      {/* Emergency Alert Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-black/60 backdrop-blur-2xl border border-white/20 text-white w-full max-w-md rounded-lg p-6 shadow-2xl space-y-5 relative">
            
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-[#0A0A0A] border border-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
              <div className="p-2.5 bg-[#E8871E]/20 border border-[#E8871E]/40 rounded text-[#E8871E]">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold font-['Montserrat'] text-white">
                  Need Urgent Pest Control?
                </h3>
                <p className="text-xs text-neutral-400">
                  Priority 60-min dispatch across Dubai, Sharjah, and Ajman
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-300">
              Select your emergency infestation type below for instant 1-click priority booking:
            </p>

            <div className="space-y-2">
              {emergencyOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    onQuickUrgentBook(opt.id);
                    handleClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded bg-[#0A0A0A] hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-left text-xs font-semibold text-white transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-[#E8871E] group-hover:scale-110 transition-transform" />
                    <span>{opt.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7A9E7E] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-neutral-800 text-center">
              <a
                href="tel:+971554720124"
                className="inline-flex items-center justify-center gap-2 text-xs font-bold text-amber-300 hover:text-white py-1"
              >
                <PhoneCall className="w-4 h-4 text-[#E8871E]" />
                <span>Or Call Emergency Hotline: +971 554720124</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
