import React from 'react';
import type { ServiceRequest } from '../types/booking';

interface PrintableInvoiceProps {
  request: ServiceRequest;
  documentType: 'Quotation' | 'Invoice';
  lineItems: { name: string; cost: string }[];
  notes: string;
  referenceNumber: string;
  jobNumber: string;
  accountDetails: string;
}

export const PrintableInvoice = React.forwardRef<HTMLDivElement, PrintableInvoiceProps>(
  ({ request, documentType, lineItems, notes, referenceNumber, jobNumber, accountDetails }, ref) => {
    
    const prefix = documentType === 'Invoice' ? 'INV' : 'QUO';
    const documentNumber = `${prefix}-${String(referenceNumber).padStart(4, '0')}`;
    
    const dateCreated = new Date().toLocaleDateString('en-AE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '.');

    // Default terms based on the screenshot
    const defaultTerms = `1) This ${documentType.toLowerCase()} is valid for 15 days from the date of issue.
2) Service includes a 4-month warranty; free re-treatment if pests return within this period.
3) Prices are subject to site inspection and may vary based on actual infestation level.`;

    return (
      <div className="hidden">
        <div 
          ref={ref} 
          className="bg-white w-full max-w-[210mm] mx-auto p-[10mm] box-border font-sans text-[12px] leading-snug flex flex-col"
          style={{ WebkitPrintColorAdjust: 'exact', colorAdjust: 'exact' }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-1">
            <div>
              <img src="/logo-black.png" alt="Rid Out Pest Control" className="h-32 w-auto object-contain" />
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-[#1C2C54] uppercase tracking-wide mb-1">
                RID OUT PEST CONTROL SERVICES
              </h1>
              <p className="italic text-[#1C2C54] font-semibold text-xs mb-1">
                Pest Control & Fumigation Solutions | Dubai • Sharjah • Ajman
              </p>
              <p className="text-[#E8871E] font-bold text-xs">
                Mobile: +971 554720124 &nbsp;|&nbsp; Available 24/7
              </p>
            </div>
          </div>

          {/* Title Bar */}
          <div className="bg-[#1C2C54] text-white text-center py-1 mb-2 border border-[#1C2C54]">
            <h2 className="font-bold text-base uppercase underline tracking-widest">{documentType}</h2>
          </div>

          {/* Info Box */}
          <div className="bg-[#FEFCE8] p-2 mb-2 border border-gray-300 flex justify-between text-[11px]">
            <div className="space-y-0.5">
              <p><span className="font-bold">Ref Number:</span> {documentNumber}</p>
              <p><span className="font-bold">Client Name:</span> {request.customer_name}</p>
              <p><span className="font-bold">Location:</span> {request.location}</p>
            </div>
            <div className="space-y-0.5 text-right">
              <p>Date: {dateCreated}</p>
              <p>Property Type: {request.property_type}</p>
              {documentType === 'Invoice' && jobNumber && (
                <p>Job No.: {jobNumber}</p>
              )}
              <p>Contact No.: {request.mobile}</p>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse mb-0 border border-gray-400 text-[11px]">
            <thead>
              <tr className="bg-[#1C2C54] text-white">
                <th className="border border-gray-400 p-1.5 w-8 text-center">SN</th>
                <th className="border border-gray-400 p-1.5 text-left">Service Description</th>
                <th className="border border-gray-400 p-1.5 w-12 text-center">Qty</th>
                <th className="border border-gray-400 p-1.5 w-12 text-center">Unit</th>
                <th className="border border-gray-400 p-1.5 w-20 text-center">Unit Price<br/>(AED)</th>
                <th className="border border-gray-400 p-1.5 w-20 text-center">Total (AED)</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item, index) => (
                <tr key={index} className="bg-white">
                  <td className="border border-gray-400 p-1.5 text-center">{index + 1}</td>
                  <td className="border border-gray-400 p-1.5 whitespace-pre-wrap">{item.name}</td>
                  <td className="border border-gray-400 p-1.5 text-center">1</td>
                  <td className="border border-gray-400 p-1.5 text-center"></td>
                  <td className="border border-gray-400 p-1.5 text-right">{item.cost || '0'}</td>
                  <td className="border border-gray-400 p-1.5 text-right">{item.cost || '0'}</td>
                </tr>
              ))}
              {/* Fill remaining rows up to min rows if needed, just a spacer */}
              {lineItems.length === 1 && (
                <tr className="bg-white">
                  <td className="border border-gray-400 p-1.5 text-center">2</td>
                  <td className="border border-gray-400 p-1.5"></td>
                  <td className="border border-gray-400 p-1.5 text-center"></td>
                  <td className="border border-gray-400 p-1.5 text-center"></td>
                  <td className="border border-gray-400 p-1.5 text-right"></td>
                  <td className="border border-gray-400 p-1.5 text-right"></td>
                </tr>
              )}
              
              {/* Totals */}
              <tr className="bg-[#F3F4F6] font-bold">
                <td colSpan={5} className="border border-gray-400 p-1.5 text-right">Subtotal (AED)</td>
                <td className="border border-gray-400 p-1.5 text-right">
                  {lineItems.reduce((sum, item) => sum + (Number(item.cost) || 0), 0)}
                </td>
              </tr>
              <tr className="bg-[#1C2C54] text-white font-bold">
                <td colSpan={5} className="border border-gray-400 p-1.5 text-right">GRAND TOTAL (AED)</td>
                <td className="border border-gray-400 p-1.5 text-right bg-white text-black">
                  {lineItems.reduce((sum, item) => sum + (Number(item.cost) || 0), 0)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Banner Text */}
          <div className="text-center text-[#E8871E] font-bold text-[10px] py-1">
            Competitive Pest Solutions &nbsp;•&nbsp; Dedicated After-Sales Service &nbsp;•&nbsp; 4 Months Guarantee &nbsp;•&nbsp; Free Treatment if Pest Returns
          </div>

          {/* Details Box */}
          <div className="bg-[#F9FAFB] p-2.5 text-[10px] border border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold underline mb-0.5">Service Includes:</h3>
                <ul className="mb-2 space-y-0.5 pl-3 list-disc">
                  <li>Complete inspection of the required areas.</li>
                  <li>Application of professional pest control treatments.</li>
                  <li>Initial treatment of all identified infestation areas.</li>
                </ul>

                <h3 className="font-bold underline mb-0.5">Terms & Conditions:</h3>
                <div className="mb-2 whitespace-pre-wrap">
                  {notes || defaultTerms}
                </div>
              </div>
              <div>
                <h3 className="font-bold underline mb-0.5">Follow-Up Service:</h3>
                <ul className="mb-2 space-y-0.5 pl-3 list-disc">
                  <li>After 2 days: Pest control gel will be applied (if applicable).</li>
                  <li>After 1 week: Our technician will revisit for inspection.</li>
                  <li>If any activity is found in a specific area, additional treatment will be applied at no extra charge.</li>
                </ul>
                
                {documentType === 'Invoice' && accountDetails && (
                  <>
                    <h3 className="font-bold underline mb-0.5 mt-2">Account Details:</h3>
                    <div className="mb-2 whitespace-pre-wrap font-mono text-[10px] bg-white p-1.5 border border-gray-300">
                      {accountDetails}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-[#FAE3D9] inline-block px-1.5 py-0.5 border border-[#E8871E] mt-1">
              <strong>Note:</strong> Please follow the attached Pre- and Post-Pest Control Guidelines. ☑
            </div>
          </div>

          {/* Signatures */}
          <div className="mt-4 flex justify-between text-[11px] italic break-inside-avoid">
            <div>
              <p>Authorized by: Rid Out Pest Control Services</p>
              <p className="mt-2">Customer Acceptance / Signature: ___________________</p>
            </div>
          </div>

          {/* Footer naturally flows below */}
          <div className="mt-2 break-inside-avoid">
            <div className="bg-[#FAE3D9] text-center py-1 text-[10px] text-[#1C2C54]">
              <span className="underline">Rid Out Pest Control Services</span> &nbsp;|&nbsp; <span className="underline">+971 554720124</span> &nbsp;|&nbsp; <span className="underline">Available 24/7</span> &nbsp;|&nbsp; <span className="underline">Serving Dubai, Sharjah, Ajman</span>
            </div>
            <div className="text-center text-[9px] text-gray-500 mt-0.5 pb-1">
              This is a computer-generated {documentType.toLowerCase()}. No signature is required.
            </div>
          </div>

        </div>
      </div>
    );
  }
);

PrintableInvoice.displayName = 'PrintableInvoice';
