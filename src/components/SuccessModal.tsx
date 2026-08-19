import React from 'react';
import type { ServiceRequest } from '../types/booking';
import { CheckCircle2, MessageSquare, ArrowLeft, Copy, Check } from 'lucide-react';

interface SuccessModalProps {
  request: ServiceRequest | null;
  whatsappUrl: string;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  request,
  whatsappUrl,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!request) return null;

  const copyRequestId = () => {
    navigator.clipboard.writeText(request.request_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#171717] border border-neutral-700 text-white w-full max-w-lg rounded-lg p-6 sm:p-8 shadow-2xl space-y-6 text-center">
        
        {/* Icon Header */}
        <div className="w-16 h-16 bg-[#0A0A0A] border border-[#7A9E7E] text-[#7A9E7E] rounded-full flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-10 h-10 text-[#7A9E7E]" />
        </div>

        {/* Header Message */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-[#7A9E7E] font-bold uppercase tracking-widest">
            Confirmed & Saved to Database
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-['Montserrat'] text-white">
            Request Submitted Successfully
          </h3>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
            Thank you, <strong className="text-white">{request.customer_name}</strong>. Our dispatch team has received your request and will contact you shortly at <strong className="text-white">{request.mobile}</strong> to confirm your appointment.
          </p>
        </div>

        {/* Request ID Display Box */}
        <div className="bg-[#0A0A0A] border border-neutral-800 p-4 rounded flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] font-mono text-[#7A9E7E] uppercase tracking-widest block">
              Unique Reference Code
            </span>
            <span className="text-xl font-mono font-black text-amber-300 tracking-wider">
              {request.request_number}
            </span>
          </div>

          <button
            onClick={copyRequestId}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#171717] border border-neutral-700 rounded text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#7A9E7E]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Request Summary Breakdown */}
        <div className="text-xs text-left bg-[#0A0A0A]/80 p-3.5 rounded border border-neutral-800 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-[#7A9E7E]">Service:</span>
            <span className="font-semibold text-white">{request.service_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#7A9E7E]">Property & Area:</span>
            <span className="font-semibold text-white">{request.property_type} • {request.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#7A9E7E]">Preferred Date & Time:</span>
            <span className="font-semibold text-white">{request.preferred_date} ({request.preferred_time})</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          
          {/* WhatsApp Direct Dispatch Trigger */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-shimmer w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#E8871E] to-[#d47817] hover:from-[#f0922b] hover:to-[#E8871E] text-white font-extrabold py-3.5 px-6 rounded-full text-sm transition-all duration-300 shadow-xl shadow-[#E8871E]/30 hover:shadow-2xl hover:shadow-[#E8871E]/50 border border-amber-300/30 cursor-pointer uppercase font-['Montserrat'] active:scale-95"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
            <span>Send Direct WhatsApp Alert to Controller</span>
          </a>

          {/* Return Home Button */}
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-[#0A0A0A] hover:bg-neutral-800 text-neutral-300 hover:text-white font-semibold py-3 px-6 rounded text-xs border border-neutral-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

      </div>
    </div>
  );
};
