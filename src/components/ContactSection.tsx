import React from 'react';
import { PhoneCall, MessageSquare, Mail, Clock, ArrowRight } from 'lucide-react';

interface ContactSectionProps {
  onBookClick: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onBookClick }) => {
  return (
    <section id="contact" className="py-20 bg-[#0A0A0A] text-white border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Info Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-[#7A9E7E] uppercase">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-white">
              Need Help With a Pest Infestation?
            </h2>
            <p className="text-neutral-300 text-sm leading-relaxed max-w-md">
              Our UAE support center operates 24/7 for emergency bookings, inspection scheduling, and corporate pest management consultations.
            </p>

            <div className="space-y-4 pt-2">
              
              <div className="flex items-center gap-4 bg-[#171717] p-4 rounded-lg border border-[#2A2A2A]">
                <div className="w-10 h-10 bg-[#0A0A0A] text-[#E8871E] rounded flex items-center justify-center border border-neutral-800">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Direct Phone Hotline</div>
                  <a href="tel:+971502364014" className="text-base font-extrabold text-white hover:underline">
                    +971 0502364014
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[#171717] p-4 rounded-lg border border-[#2A2A2A]">
                <div className="w-10 h-10 bg-[#0A0A0A] text-[#7A9E7E] rounded flex items-center justify-center border border-neutral-800">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Instant WhatsApp Support</div>
                  <a
                    href="https://wa.me/971502364014"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-extrabold text-amber-300 hover:underline"
                  >
                    +971 0502364014 (Chat Now)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[#171717] p-4 rounded-lg border border-[#2A2A2A]">
                <div className="w-10 h-10 bg-[#0A0A0A] text-[#7A9E7E] rounded flex items-center justify-center border border-neutral-800">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Official Email</div>
                  <a href="mailto:dispatch@ridoutpest.ae" className="text-base font-extrabold text-white hover:underline">
                    dispatch@ridoutpest.ae
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Callout Box */}
          <div className="lg:col-span-6 bg-[#171717] border border-[#2A2A2A] rounded-lg p-8 text-center space-y-6">
            <div className="w-12 h-12 bg-[#E8871E] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Clock className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold font-['Montserrat'] text-white">
                Working Hours & Dispatch
              </h3>
              <p className="text-xs text-neutral-400 mt-1 font-mono">
                Residential & Commercial Service Operations
              </p>
            </div>

            <div className="bg-[#0A0A0A] p-4 rounded border border-neutral-800 text-xs text-neutral-300 space-y-2 text-left font-mono">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span>Saturday - Thursday:</span>
                <span className="font-bold text-white">07:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span>Friday Operations:</span>
                <span className="font-bold text-white">08:00 AM - 08:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Emergency 24/7 Hotline:</span>
                <span className="font-bold text-amber-300">Always Active</span>
              </div>
            </div>

            <button
              onClick={onBookClick}
              className="w-full flex items-center justify-center gap-2 bg-[#E8871E] hover:bg-[#d47817] text-white font-extrabold py-3.5 rounded text-sm transition-all shadow-xl cursor-pointer uppercase font-['Montserrat']"
            >
              <span>Get a Free Quote Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
