import React from 'react';
import type { PestService } from '../types/booking';
import {
  X,
  CheckCircle,
  Clock,
  ShieldAlert,
  ArrowRight,
  ClipboardList
} from 'lucide-react';

interface ServiceModalProps {
  service: PestService | null;
  onClose: () => void;
  onRequestThisService: (serviceId: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onRequestThisService,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-[#E5E5E5] w-full max-w-2xl max-h-[90vh] rounded-md shadow-2xl overflow-y-auto relative text-[#0A0A0A]">
        
        {/* Modal Header */}
        <div className="bg-[#0A0A0A] text-white p-6 sticky top-0 z-10 flex items-center justify-between border-b border-neutral-800">
          <div>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
              Service Specification
            </span>
            <h3 className="text-2xl font-extrabold font-['Outfit'] mt-0.5">
              {service.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Key Quick Info Grid */}
          <div className="grid grid-cols-2 gap-3 bg-[#F7F7F7] p-4 rounded border border-neutral-200 text-center">
            <div className="border-r border-neutral-300">
              <div className="text-xs text-neutral-500 font-medium">Est. Duration</div>
              <div className="text-sm font-bold text-[#0A0A0A] flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{service.duration}</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 font-medium">Suitable For</div>
              <div className="text-xs font-bold text-[#0A0A0A] mt-0.5">
                {service.suitableFor.join(', ')}
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wide mb-1">
              Overview & Methodology
            </h4>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Method Detail */}
          <div className="bg-neutral-900 text-white p-4 rounded border border-neutral-800 space-y-1">
            <div className="text-xs font-mono text-neutral-400 uppercase font-semibold">
              Treatment Protocol
            </div>
            <div className="text-sm font-medium text-neutral-200">
              {service.method}
            </div>
          </div>

          {/* Target Problems Covered */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wide mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-black" />
              <span>Common Target Pests Eliminated</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {service.problems.map((prob) => (
                <div key={prob} className="flex items-center gap-2 text-xs text-neutral-800 bg-neutral-100 p-2.5 rounded font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>{prob}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation Steps */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wide mb-3 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-black" />
              <span>What You Should Prepare Before Technician Arrival</span>
            </h4>
            <ul className="space-y-2 text-xs text-neutral-700">
              {service.preparationSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-[#F7F7F7] p-2.5 rounded border border-neutral-200">
                  <span className="font-mono font-bold text-[#0A0A0A]">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-[#F7F7F7] border-t border-neutral-200 sticky bottom-0 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-neutral-500">Need this service?</div>
            <div className="text-sm font-extrabold text-[#0A0A0A]">
              Instant Scheduling Available
            </div>
          </div>

          <button
            onClick={() => {
              onRequestThisService(service.id);
              onClose();
            }}
            className="flex items-center gap-2 bg-[#0A0A0A] hover:bg-neutral-800 text-white px-6 py-3 rounded-xs font-bold text-sm transition-all cursor-pointer shadow-md"
          >
            <span>Request This Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
