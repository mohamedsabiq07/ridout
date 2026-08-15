import React from 'react';
import type { ServiceRequest } from '../types/booking';

interface PrintableInvoiceProps {
  request: ServiceRequest;
  documentType: 'Quotation' | 'Invoice';
  cost: string;
  notes: string;
}

// ForwardRef is necessary for react-to-print
export const PrintableInvoice = React.forwardRef<HTMLDivElement, PrintableInvoiceProps>(
  ({ request, documentType, cost, notes }, ref) => {
    
    // Generate a unique invoice number based on the booking ID
    const documentNumber = `${documentType === 'Invoice' ? 'INV' : 'QUO'}-${request.id.slice(0, 6).toUpperCase()}`;
    
    // Format dates
    const dateCreated = new Date().toLocaleDateString('en-AE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className="hidden">
        {/* The actual printable area */}
        <div 
          ref={ref} 
          className="bg-white w-[210mm] min-h-[297mm] p-[20mm] mx-auto box-border font-sans text-sm relative"
          style={{ WebkitPrintColorAdjust: 'exact', colorAdjust: 'exact' }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-3xl font-extrabold text-[#0A0A0A] font-['Montserrat'] uppercase tracking-tight">
                Ridout <span className="text-[#E8871E]">Pest Control</span>
              </h1>
              <p className="text-gray-500 text-xs mt-1">Municipality Approved Services</p>
              <div className="mt-4 text-gray-700 text-xs leading-relaxed">
                <p>Dubai, United Arab Emirates</p>
                <p>Phone: +971 50 123 4567</p>
                <p>Email: mohamedsabiq07@gmail.com</p>
                <p>Web: ridoutpestcontrol.ae</p>
              </div>
            </div>
            
            <div className="text-right">
              <h2 className="text-4xl font-black text-gray-200 uppercase tracking-widest mb-4">
                {documentType}
              </h2>
              <div className="space-y-1 text-sm">
                <p><span className="font-semibold text-gray-500 w-24 inline-block text-left">Doc No:</span> <span className="font-mono font-medium">{documentNumber}</span></p>
                <p><span className="font-semibold text-gray-500 w-24 inline-block text-left">Date:</span> <span>{dateCreated}</span></p>
                <p><span className="font-semibold text-gray-500 w-24 inline-block text-left">Booking ID:</span> <span className="font-mono text-xs">{request.id.slice(0, 8)}</span></p>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 mb-8" />

          {/* Customer Details */}
          <div className="flex justify-between mb-12">
            <div className="w-1/2 pr-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Billed To</h3>
              <p className="font-bold text-lg text-gray-900">{request.customer_name}</p>
              <div className="text-gray-700 mt-2 space-y-1">
                <p>{request.mobile}</p>
                {request.email && <p>{request.email}</p>}
              </div>
            </div>
            <div className="w-1/2 pl-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Property Details</h3>
              <p className="font-semibold text-gray-900">{request.property_type}</p>
              <p className="text-gray-700 mt-2">{request.location}</p>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-12">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-900 text-gray-900">
                  <th className="py-3 font-bold uppercase text-xs tracking-wider">Service Description</th>
                  <th className="py-3 font-bold uppercase text-xs tracking-wider text-center w-32">Qty</th>
                  <th className="py-3 font-bold uppercase text-xs tracking-wider text-right w-40">Amount (AED)</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-200">
                  <td className="py-4">
                    <p className="font-bold text-gray-900">
                      {Array.isArray(request.service_name) ? request.service_name.join(', ') : request.service_name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Professional pest control treatment at scheduled property.</p>
                  </td>
                  <td className="py-4 text-center">1</td>
                  <td className="py-4 text-right font-mono">{cost}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-16">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-mono">AED {cost}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>VAT (0%):</span>
                <span className="font-mono">AED 0.00</span>
              </div>
              <div className="flex justify-between font-bold text-xl text-gray-900 pt-3 border-t-2 border-gray-900">
                <span>Total:</span>
                <span className="font-mono">AED {cost}</span>
              </div>
            </div>
          </div>

          {/* Notes & Terms */}
          {notes && (
            <div className="mb-12">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Notes & Terms</h3>
              <div className="bg-gray-50 p-4 rounded text-gray-700 text-sm whitespace-pre-wrap">
                {notes}
              </div>
            </div>
          )}

          {/* Footer (Absolute positioned at the bottom of the page) */}
          <div className="absolute bottom-[20mm] left-[20mm] right-[20mm]">
            <hr className="border-gray-200 mb-6" />
            <div className="flex justify-between text-xs text-gray-500">
              <div className="w-1/2 pr-4">
                <p className="font-bold text-gray-900 mb-1">Bank Transfer Details</p>
                <p>Bank: [Bank Name placeholder]</p>
                <p>IBAN: [IBAN placeholder]</p>
                <p>Account Name: Ridout Pest Control</p>
              </div>
              <div className="w-1/2 text-right">
                <p className="font-bold text-gray-900 mb-1">Thank you for your business!</p>
                <p>For any inquiries regarding this document, please contact us.</p>
                <p className="mt-2 text-[#7A9E7E] font-semibold flex items-center justify-end gap-1">
                  ✓ Dubai Municipality Certified
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PrintableInvoice.displayName = 'PrintableInvoice';
