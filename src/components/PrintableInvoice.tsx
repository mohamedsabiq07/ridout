import React from 'react';
import type { ServiceRequest } from '../types/booking';

interface PrintableInvoiceProps {
  request: ServiceRequest;
  documentType: 'Quotation' | 'Invoice';
  cost: string;
  notes: string;
}

export const PrintableInvoice = React.forwardRef<HTMLDivElement, PrintableInvoiceProps>(
  ({ request, documentType, cost, notes }, ref) => {
    
    const documentNumber = `${documentType === 'Invoice' ? 'INV' : 'QUO'}-${request.id.slice(0, 6).toUpperCase()}`;
    
    const dateCreated = new Date().toLocaleDateString('en-AE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '.');

    // Default terms based on the screenshot
    const defaultTerms = `1) This ${documentType.toLowerCase()} is valid for 15 days from the date of issue.
2) Service includes a 4-month warranty; free re-treatment if pests return within this period.
3) Prices are subject to site inspection and may vary based on actual infestation level.
4) Payment accepted cash only after the services done.`;

    const serviceName = Array.isArray(request.service_name) ? request.service_name.join(', ') : request.service_name;

    return (
      <div className="hidden">
        <div 
          ref={ref} 
          className="bg-white w-[210mm] min-h-[297mm] p-[15mm] mx-auto box-border font-sans text-[13px] relative leading-relaxed"
          style={{ WebkitPrintColorAdjust: 'exact', colorAdjust: 'exact' }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div className="pt-4">
              <h1 className="text-2xl font-bold text-[#1C2C54] uppercase tracking-wide mb-1">
                RID OUT PEST CONTROL SERVICES
              </h1>
              <p className="italic text-[#1C2C54] font-semibold text-sm mb-1">
                Pest Control & Fumigation Solutions | Dubai • Sharjah • Ajman
              </p>
              <p className="text-[#E8871E] font-bold text-sm">
                Mobile: 055 4720124 &nbsp;|&nbsp; Available 24/7
              </p>
            </div>
            <div>
              <img src="/logo-black.png" alt="Rid Out Pest Control" className="h-40 w-auto object-contain" />
            </div>
          </div>

          {/* Title Bar */}
          <div className="bg-[#1C2C54] text-white text-center py-1.5 mb-2 border border-[#1C2C54]">
            <h2 className="font-bold text-lg uppercase underline tracking-widest">{documentType}</h2>
          </div>

          {/* Info Box */}
          <div className="bg-[#FEFCE8] p-3 mb-2 border border-gray-300 flex justify-between">
            <div className="space-y-1">
              <p><span className="font-bold">{documentType}:</span> {documentNumber}</p>
              <p><span className="font-bold">Client Name:</span> {request.customer_name}</p>
              <p><span className="font-bold">Location:</span> {request.location}</p>
            </div>
            <div className="space-y-1 text-right">
              <p>Date: {dateCreated}</p>
              <p>Property Type: {request.property_type}</p>
              <p>Contact No.: {request.mobile}</p>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse mb-0 border border-gray-400 text-xs">
            <thead>
              <tr className="bg-[#1C2C54] text-white">
                <th className="border border-gray-400 p-2 w-8 text-center">SN</th>
                <th className="border border-gray-400 p-2 text-left">Service Description</th>
                <th className="border border-gray-400 p-2 w-16 text-center">Qty</th>
                <th className="border border-gray-400 p-2 w-16 text-center">Unit</th>
                <th className="border border-gray-400 p-2 w-24 text-center">Unit Price<br/>(AED)</th>
                <th className="border border-gray-400 p-2 w-24 text-center">Total (AED)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border border-gray-400 p-2 text-center">1</td>
                <td className="border border-gray-400 p-2">{serviceName}</td>
                <td className="border border-gray-400 p-2 text-center">1</td>
                <td className="border border-gray-400 p-2 text-center"></td>
                <td className="border border-gray-400 p-2 text-right">{cost}</td>
                <td className="border border-gray-400 p-2 text-right">{cost}</td>
              </tr>
              {/* Optional secondary rows can be added here if needed */}
              <tr className="bg-white">
                <td className="border border-gray-400 p-2 text-center">2</td>
                <td className="border border-gray-400 p-2"></td>
                <td className="border border-gray-400 p-2 text-center"></td>
                <td className="border border-gray-400 p-2 text-center"></td>
                <td className="border border-gray-400 p-2 text-right"></td>
                <td className="border border-gray-400 p-2 text-right"></td>
              </tr>
              
              {/* Totals */}
              <tr className="bg-[#F3F4F6] font-bold">
                <td colSpan={5} className="border border-gray-400 p-2 text-right">Subtotal (AED)</td>
                <td className="border border-gray-400 p-2 text-right">{cost}</td>
              </tr>
              <tr className="bg-[#1C2C54] text-white font-bold">
                <td colSpan={5} className="border border-gray-400 p-2 text-right">GRAND TOTAL (AED)</td>
                <td className="border border-gray-400 p-2 text-right bg-white text-black">{cost}</td>
              </tr>
            </tbody>
          </table>

          {/* Banner Text */}
          <div className="text-center text-[#E8871E] font-bold text-xs py-1.5">
            Competitive Pest Solutions &nbsp;•&nbsp; Dedicated After-Sales Service &nbsp;•&nbsp; 4 Months Guarantee &nbsp;•&nbsp; Free Treatment if Pest Returns
          </div>

          {/* Details Box */}
          <div className="bg-[#F9FAFB] p-4 text-xs border border-gray-200">
            <h3 className="font-bold underline mb-1">Service Includes:</h3>
            <ul className="mb-3 space-y-0.5">
              <li>Complete inspection of the required areas.</li>
              <li>Application of professional pest control treatments.</li>
              <li>Initial treatment of all identified infestation areas.</li>
            </ul>

            <h3 className="font-bold underline mb-1">Follow-Up Service:</h3>
            <ul className="mb-3 space-y-0.5">
              <li>After 2 days: Pest control gel will be applied (if applicable).</li>
              <li>After 1 week: Our technician will revisit for inspection.</li>
              <li>If any activity is found in a specific area, additional treatment will be applied at no extra service charge during the follow-up visit.</li>
              <li>General Cleaning Service: <strong>AED 25 per hour</strong> (Labour only – cleaning materials are <strong>not included.</strong>)</li>
            </ul>

            <h3 className="font-bold underline mb-1">Terms & Conditions:</h3>
            <div className="mb-3 whitespace-pre-wrap">
              {notes || defaultTerms}
            </div>

            <div className="bg-[#FAE3D9] inline-block px-2 py-1 border border-[#E8871E]">
              <strong>Note:</strong> Please follow the attached Pre- and Post-Pest Control Guidelines. ☑
            </div>
          </div>

          {/* Signatures */}
          <div className="mt-6 flex justify-between text-xs italic">
            <div>
              <p>Authorized by: Rid Out Pest Control Services</p>
              <p className="mt-4">Customer Acceptance / Signature: ___________________</p>
            </div>
          </div>

          {/* Footer absolute bottom */}
          <div className="absolute bottom-[15mm] left-[15mm] right-[15mm]">
            <div className="bg-[#FAE3D9] text-center py-2 text-xs text-[#1C2C54]">
              <span className="underline">Rid Out Pest Control Services</span> &nbsp;|&nbsp; <span className="underline">055 4720124</span> &nbsp;|&nbsp; <span className="underline">Available 24/7</span> &nbsp;|&nbsp; <span className="underline">Serving Dubai, Sharjah, Ajman</span>
            </div>
            <div className="text-center text-[10px] text-gray-500 mt-1">
              This is a computer-generated {documentType.toLowerCase()}. No signature is required.
            </div>
          </div>

        </div>
      </div>
    );
  }
);

PrintableInvoice.displayName = 'PrintableInvoice';
