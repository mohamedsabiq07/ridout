import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import type { ServiceRequest } from '../types/booking';
import { PrintableInvoice } from './PrintableInvoice';
import { X, FileText, Download } from 'lucide-react';

interface InvoiceGeneratorModalProps {
  request: ServiceRequest;
  onClose: () => void;
}

export const InvoiceGeneratorModal: React.FC<InvoiceGeneratorModalProps> = ({ request, onClose }) => {
  const [documentType, setDocumentType] = useState<'Quotation' | 'Invoice'>('Quotation');
  
  // Parse service names
  const parsedServices: string[] = React.useMemo(() => {
    try {
      const sn: any = request.service_name;
      if (Array.isArray(sn)) return sn;
      if (typeof sn === 'string') {
        if (sn.startsWith('[')) return JSON.parse(sn);
        return sn.split(',').map((s: string) => s.trim());
      }
    } catch (e) {
      // ignore
    }
    return [String(request.service_name || 'General Service')];
  }, [request.service_name]);

  const [serviceCosts, setServiceCosts] = useState<Record<string, string>>(
    parsedServices.reduce((acc: Record<string, string>, service: string) => ({ ...acc, [service]: '' }), {})
  );

  const [notes, setNotes] = useState<string>('');
  
  // New Fields
  const [referenceNumber, setReferenceNumber] = useState<string>('1');
  const [jobNumber, setJobNumber] = useState<string>(request.request_number || '');
  const [accountDetails, setAccountDetails] = useState<string>('Bank Name: \nAccount Name: \nAccount Number: \nIBAN: ');
  
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${documentType}_${request.customer_name.replace(/\s+/g, '_')}_${request.id.slice(0, 6)}`,
  });

  const lineItems = parsedServices.map((service: string) => ({
    name: service,
    cost: serviceCosts[service] || '0'
  }));
  const totalCost = lineItems.reduce((sum: number, item: any) => sum + (Number(item.cost) || 0), 0);
  const isValid = lineItems.every((item: any) => item.cost && Number(item.cost) > 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#F7F5F0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0A0A0A] text-[#F7F5F0] rounded flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-['Montserrat'] text-[#0A0A0A]">
                Generate Document
              </h2>
              <p className="text-xs text-[#5A5A5A]">
                For {request.customer_name} ({request.id.slice(0, 8)})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto bg-white flex-1">
          <div className="space-y-6">
            
            {/* Type Selection */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Document Type</label>
              <div className="flex gap-4">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    className="peer sr-only"
                    name="documentType"
                    value="Quotation"
                    checked={documentType === 'Quotation'}
                    onChange={() => setDocumentType('Quotation')}
                  />
                  <div className="p-4 border-2 rounded-lg text-center font-bold text-sm transition-all peer-checked:border-[#E8871E] peer-checked:bg-[#E8871E]/10 peer-checked:text-[#E8871E] border-gray-200 text-gray-500 hover:border-gray-300">
                    Quotation
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    className="peer sr-only"
                    name="documentType"
                    value="Invoice"
                    checked={documentType === 'Invoice'}
                    onChange={() => setDocumentType('Invoice')}
                  />
                  <div className="p-4 border-2 rounded-lg text-center font-bold text-sm transition-all peer-checked:border-[#E8871E] peer-checked:bg-[#E8871E]/10 peer-checked:text-[#E8871E] border-gray-200 text-gray-500 hover:border-gray-300">
                    Invoice
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-4 border p-4 rounded-lg bg-gray-50 border-gray-200">
              <h3 className="text-sm font-bold text-gray-700 border-b pb-2">Service Pricing (AED) <span className="text-red-500">*</span></h3>
              {parsedServices.map((service: string) => (
                <div key={service} className="flex items-center gap-4">
                  <label className="text-sm text-gray-700 flex-1 truncate">{service}</label>
                  <div className="relative w-32 shrink-0">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">AED</span>
                    <input
                      type="number"
                      value={serviceCosts[service] || ''}
                      onChange={(e) => setServiceCosts(prev => ({ ...prev, [service]: e.target.value }))}
                      placeholder="e.g. 250"
                      className="w-full pl-10 pr-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8871E] text-gray-900 transition-all font-mono text-sm"
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2 font-bold text-gray-900">
                <span>Total Cost</span>
                <span className="font-mono">AED {totalCost}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">

              {/* Reference Number */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Ref No. (e.g., 1, 2, 3)
                </label>
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="e.g. 1"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8871E] focus:bg-white text-gray-900 transition-all font-mono"
                />
              </div>
            </div>

            {documentType === 'Invoice' && (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Job Number
                  </label>
                  <input
                    type="text"
                    value={jobNumber}
                    onChange={(e) => setJobNumber(e.target.value)}
                    placeholder="e.g. PC-1024"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8871E] focus:bg-white text-gray-900 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Account Details (Payment Info)
                  </label>
                  <textarea
                    value={accountDetails}
                    onChange={(e) => setAccountDetails(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8871E] focus:bg-white text-gray-900 transition-all min-h-[100px] text-sm font-mono"
                  />
                </div>
              </>
            )}

            {/* Notes Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Special Notes / Terms (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any specific terms for this customer..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8871E] focus:bg-white text-gray-900 transition-all min-h-[80px] text-sm"
              />
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePrint}
            disabled={!isValid}
            className="px-6 py-2.5 bg-[#0A0A0A] hover:bg-[#2D2D2D] text-white text-sm font-bold rounded flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        {/* The hidden printable template that react-to-print will use */}
        <PrintableInvoice 
          ref={printRef} 
          request={request} 
          documentType={documentType} 
          lineItems={lineItems}
          notes={notes}
          referenceNumber={referenceNumber}
          jobNumber={jobNumber}
          accountDetails={accountDetails}
        />
        
      </div>
    </div>
  );
};
