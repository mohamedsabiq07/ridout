import React, { useState, useEffect } from 'react';
import type { ServiceRequest, BookingStatus } from '../types/booking';
import { fetchAllServiceRequests, updateRequestStatus, isSupabaseConfigured } from '../lib/supabase';
import { generateWhatsAppLink } from '../lib/whatsapp';
import { InvoiceGeneratorModal } from './InvoiceGeneratorModal';
import {
  Search,
  Filter,
  RefreshCw,
  MessageSquare,
  PhoneCall,
  LogOut,
  Camera,
  FileText,
  Database,
  FileArchive
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CustomerExportPDF } from './CustomerExportPDF';
import { DeleteVerificationModal } from './DeleteVerificationModal';
import { StorageManagement } from './StorageManagement';
import { deleteServiceRequests, saveAuditLog } from '../lib/supabase';
import { useReactToPrint } from 'react-to-print';

export const AdminDashboard: React.FC = () => {
  const { signOut } = useAuth();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [currentView, setCurrentView] = useState<'requests' | 'storage'>('requests');

  // Export & Delete State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [currentExportId, setCurrentExportId] = useState('');
  const [isExportingAll, setIsExportingAll] = useState(false);
  const [exportData, setExportData] = useState<ServiceRequest[]>([]);
  const exportPdfRef = React.useRef<HTMLDivElement>(null);

  const STATUS_OPTIONS: BookingStatus[] = [
    'Pending',
    'Contacted',
    'Confirmed',
    'Technician Assigned',
    'In Progress',
    'Completed',
    'Cancelled',
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllServiceRequests();
      setRequests(data);
    } catch (err) {
      console.error('Error fetching admin requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: BookingStatus) => {
    setUpdatingId(id);
    try {
      const updated = await updateRequestStatus(id, newStatus, selectedRequest?.id === id ? internalNotes : undefined);
      if (updated) {
        setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)));
        if (selectedRequest?.id === id) {
          setSelectedRequest(updated);
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedRequest) return;
    setUpdatingId(selectedRequest.id);
    try {
      const updated = await updateRequestStatus(selectedRequest.id, selectedRequest.status, internalNotes);
      if (updated) {
        setRequests((prev) => prev.map((r) => (r.id === selectedRequest.id ? updated : r)));
        setSelectedRequest(updated);
        alert('Internal admin notes saved successfully!');
      }
    } catch (err) {
      console.error('Failed to save internal notes:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Metrics computation
  const totalCount = requests.length;
  const pendingCount = requests.filter((r) => r.status === 'Pending').length;
  const confirmedCount = requests.filter((r) => r.status === 'Confirmed' || r.status === 'Technician Assigned').length;
  const completedCount = requests.filter((r) => r.status === 'Completed').length;
  
  const todayStr = new Date().toISOString().split('T')[0];
  const todayCount = requests.filter((r) => r.created_at.startsWith(todayStr) || r.preferred_date === todayStr).length;

  // Filtering
  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.request_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.mobile.includes(searchQuery) ||
      req.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(req.service_name) ? req.service_name.join(', ') : (req.service_name as unknown as string) || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const triggerPrint = useReactToPrint({
    contentRef: exportPdfRef,
    documentTitle: `Customer_Export_${currentExportId}`,
    onAfterPrint: () => setShowVerificationModal(true)
  });

  const handleExport = (all: boolean = false) => {
    const toExport = all ? filteredRequests : requests.filter(r => selectedIds.includes(r.id));
    if (toExport.length === 0) return;
    
    setExportData(toExport);
    const newExportId = `RID-EXP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setCurrentExportId(newExportId);
    setIsExportingAll(all);

    setTimeout(() => {
      triggerPrint();
    }, 500);
  };

  const handleConfirmDelete = async () => {
    const idsToDelete = exportData.map(r => r.id);
    const success = await deleteServiceRequests(idsToDelete);
    
    await saveAuditLog({
      admin_id: 'Admin',
      action: 'DELETE',
      records_count: idsToDelete.length,
      export_id: currentExportId,
      status: success ? 'Successful' : 'Failed'
    });

    if (success) {
      setRequests(prev => prev.filter(r => !idsToDelete.includes(r.id)));
      setSelectedIds([]);
      setShowVerificationModal(false);
      setExportData([]);
    } else {
      alert('Failed to delete records.');
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selectedIds.length === filteredRequests.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRequests.map(r => r.id));
    }
  };

  const getStatusBadgeStyle = (status: BookingStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-950/80 border-amber-800 text-amber-300';
      case 'Contacted':
        return 'bg-blue-950/80 border-blue-800 text-blue-300';
      case 'Confirmed':
      case 'Technician Assigned':
        return 'bg-[#171717] border-white text-white font-bold';
      case 'In Progress':
        return 'bg-purple-950/80 border-purple-800 text-purple-300';
      case 'Completed':
        return 'bg-emerald-950/80 border-emerald-800 text-emerald-300';
      case 'Cancelled':
        return 'bg-red-950/80 border-red-800 text-red-300';
      default:
        return 'bg-neutral-800 text-neutral-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col overflow-hidden animate-fadeIn">
      
      {/* Top Admin Header Bar */}
      <header className="bg-[#171717] border-b border-[#2A2A2A] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-white text-black font-black flex items-center justify-center font-['Outfit'] text-[15px] tracking-tighter">
            RA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold font-['Outfit'] text-white">
                RIDOUT Admin Dispatch Portal
              </h1>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold ${
                isSupabaseConfigured ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
              }`}>
                {isSupabaseConfigured ? 'Supabase Live DB' : 'Demo Local Storage DB'}
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-mono">
              Manage incoming customer requests, update statuses & dispatch technicians
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView(v => v === 'requests' ? 'storage' : 'requests')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A0A0A] hover:bg-neutral-800 border border-neutral-700 rounded text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            {currentView === 'requests' ? (
              <><Database className="w-3.5 h-3.5" /><span>Storage & DB</span></>
            ) : (
              <><FileText className="w-3.5 h-3.5" /><span>Customer List</span></>
            )}
          </button>

          <button
            onClick={loadData}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A0A0A] hover:bg-neutral-800 border border-neutral-700 rounded text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={signOut}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/30 hover:bg-red-900/50 border border-red-900/50 rounded text-xs font-mono text-red-400 hover:text-red-300 transition-colors cursor-pointer"
            title="Secure Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {currentView === 'storage' ? (
          <StorageManagement 
            requests={requests} 
            onExportAll={() => {
              // Same exact export-before-delete workflow but for ALL records
              if (requests.length === 0) return;
              handleExport(true);
            }} 
          />
        ) : (
          <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
          
          {/* Summary Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            
            <div className="bg-[#171717] border border-[#2A2A2A] p-4 rounded-sm">
              <div className="text-xs text-neutral-400 font-mono">Total Requests</div>
              <div className="text-2xl font-black text-white font-['Outfit'] mt-1">{totalCount}</div>
            </div>

            <div className="bg-[#171717] border border-amber-900/60 p-4 rounded-sm">
              <div className="text-xs text-amber-400 font-mono">Pending Dispatch</div>
              <div className="text-2xl font-black text-amber-300 font-['Outfit'] mt-1">{pendingCount}</div>
            </div>

            <div className="bg-[#171717] border border-blue-900/60 p-4 rounded-sm">
              <div className="text-xs text-blue-400 font-mono">Today's Activity</div>
              <div className="text-2xl font-black text-blue-300 font-['Outfit'] mt-1">{todayCount}</div>
            </div>

            <div className="bg-[#171717] border border-neutral-700 p-4 rounded-sm">
              <div className="text-xs text-white font-mono">Confirmed / Assigned</div>
              <div className="text-2xl font-black text-white font-['Outfit'] mt-1">{confirmedCount}</div>
            </div>

            <div className="bg-[#171717] border border-emerald-900/60 p-4 rounded-sm col-span-2 md:col-span-1">
              <div className="text-xs text-emerald-400 font-mono">Completed Jobs</div>
              <div className="text-2xl font-black text-emerald-300 font-['Outfit'] mt-1">{completedCount}</div>
            </div>

          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#171717] p-4 rounded border border-[#2A2A2A]">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Request ID, customer, area..."
                className="w-full bg-[#0A0A0A] border border-neutral-800 focus:border-white text-white text-xs rounded pl-9 pr-3 py-2 outline-none"
              />
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-xs text-neutral-400 mr-2 font-mono flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {['All', ...STATUS_OPTIONS].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-semibold whitespace-nowrap cursor-pointer ${
                    statusFilter === status
                      ? 'bg-white text-black'
                      : 'bg-[#0A0A0A] text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

          </div>

          {/* Bulk Action Toolbar */}
          {selectedIds.length > 0 && (
            <div className="bg-[#1C2C54] border border-[#2A2A2A] rounded p-3 flex justify-between items-center text-white animate-in slide-in-from-top-2">
              <div className="text-sm font-bold">
                {selectedIds.length} customer(s) selected
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleExport(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-xs font-bold transition-colors cursor-pointer shadow"
                >
                  <FileArchive className="w-3.5 h-3.5" />
                  <span>Export Selected</span>
                </button>
              </div>
            </div>
          )}

          {/* Table Container */}
          <div className="bg-[#171717] border border-[#2A2A2A] rounded-sm overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A0A0A] text-neutral-400 font-mono uppercase border-b border-[#2A2A2A]">
                <tr>
                  <th className="p-3.5 w-10 text-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-neutral-700 bg-[#0A0A0A] checked:bg-blue-600 cursor-pointer"
                      checked={filteredRequests.length > 0 && selectedIds.length === filteredRequests.length}
                      onChange={toggleAll}
                    />
                  </th>
                  <th className="p-3.5">Request ID</th>
                  <th className="p-3.5">Customer & Phone</th>
                  <th className="p-3.5">Service</th>
                  <th className="p-3.5">Property & Area</th>
                  <th className="p-3.5">Preferred Slot</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-neutral-500 font-mono">
                      No service requests match your search filter.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req) => {
                    const isSelected = selectedRequest?.id === req.id;
                    const waLink = generateWhatsAppLink(req, req.request_number);

                    return (
                      <tr
                        key={req.id}
                        onClick={() => {
                          setSelectedRequest(req);
                          setInternalNotes(req.internal_notes || '');
                        }}
                        className={`hover:bg-neutral-900 transition-colors cursor-pointer ${
                          isSelected ? 'bg-neutral-800/80 border-l-4 border-white' : ''
                        }`}
                      >
                        <td className="p-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-neutral-700 bg-[#0A0A0A] checked:bg-blue-600 cursor-pointer"
                            checked={selectedIds.includes(req.id)}
                            onChange={() => toggleSelection(req.id)}
                          />
                        </td>
                        <td className="p-3.5 font-mono font-bold text-white whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span>{req.request_number}</span>
                            {req.photo_name && (
                              <span title={`Photo Attached: ${req.photo_name}`}>
                                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                              </span>
                            )}
                          </div>
                          {req.is_urgent && (
                            <span className="mt-1 inline-block text-[9px] bg-red-950 text-red-400 px-1 py-0.2 border border-red-800 rounded font-sans">
                              URGENT
                            </span>
                          )}
                        </td>

                        <td className="p-3.5 font-medium text-white whitespace-nowrap">
                          <div>{req.customer_name}</div>
                          <div className="text-[11px] text-neutral-400 font-mono">{req.mobile}</div>
                        </td>

                        <td className="p-3.5 text-neutral-300 font-medium whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            {Array.isArray(req.service_id) ? (req.service_id.some(id => id.includes('cleaning')) ? '🧹 ' : '🐜 ') : ((req.service_id as unknown as string).includes('cleaning') ? '🧹 ' : '🐜 ')}
                            <span className="truncate max-w-[200px]" title={Array.isArray(req.service_name) ? req.service_name.join(', ') : (req.service_name as unknown as string)}>
                              {Array.isArray(req.service_name) ? req.service_name.join(', ') : (req.service_name as unknown as string)}
                            </span>
                          </div>
                        </td>

                        <td className="p-3.5 text-neutral-300 whitespace-nowrap">
                          <div>{req.location}</div>
                          <div className="text-[10px] text-neutral-500">{req.property_type}</div>
                        </td>

                        <td className="p-3.5 font-mono text-neutral-400 whitespace-nowrap">
                          <div>{req.preferred_date}</div>
                          <div className="text-[10px] text-neutral-500">{req.preferred_time}</div>
                        </td>

                        {/* Status Select dropdown */}
                        <td className="p-3.5 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={req.status}
                            onChange={(e) => handleStatusChange(req.id, e.target.value as BookingStatus)}
                            disabled={updatingId === req.id}
                            className={`px-2.5 py-1 rounded text-xs font-mono font-bold border outline-none cursor-pointer ${getStatusBadgeStyle(req.status)}`}
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt} value={opt} className="bg-[#0A0A0A] text-white font-sans">
                                {opt}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Action buttons */}
                        <td className="p-3.5 text-right whitespace-nowrap space-x-2" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 rounded text-[11px] font-mono transition-colors"
                            title="Open WhatsApp chat with customer"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${req.mobile.replace(/[^0-9+]/g, '')}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 rounded text-[11px] font-mono transition-colors"
                            title="Call customer mobile"
                          >
                            <PhoneCall className="w-3 h-3" />
                            <span>Call</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>
        )}

        {/* Selected Request Detail Drawer (Right Sidebar) */}
        {selectedRequest && (
          <div className="w-80 lg:w-96 bg-[#171717] border-l border-[#2A2A2A] p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Selected Record</span>
                  <h3 className="text-xl font-mono font-extrabold text-white">{selectedRequest.request_number}</h3>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-neutral-400 hover:text-white text-xs font-mono"
                >
                  Close
                </button>
              </div>

              {/* Status Update Quick Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-neutral-400 uppercase block">
                  Pipeline Status Progress
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedRequest.id, status)}
                      className={`px-2 py-1.5 rounded text-[10px] font-mono font-semibold border transition-all text-left truncate cursor-pointer ${
                        selectedRequest.status === status
                          ? 'bg-white text-black font-bold border-white'
                          : 'bg-[#0A0A0A] text-neutral-400 border-neutral-800 hover:text-white'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-[#0A0A0A] p-4 rounded border border-neutral-800 space-y-2 text-xs">
                <div className="text-neutral-400 font-mono text-[10px] uppercase font-bold">Customer Details</div>
                <div className="text-white font-bold text-sm">{selectedRequest.customer_name}</div>
                <div className="text-neutral-300 font-mono">{selectedRequest.mobile}</div>
                {selectedRequest.email && <div className="text-neutral-400">{selectedRequest.email}</div>}
              </div>

              {/* Booking Info */}
              <div className="bg-[#0A0A0A] p-4 rounded border border-neutral-800 space-y-2 text-xs">
                <div className="text-neutral-400 font-mono text-[10px] uppercase font-bold">Service & Location</div>
                <div className="text-white font-bold">{Array.isArray(selectedRequest.service_name) ? selectedRequest.service_name.join(', ') : (selectedRequest.service_name as unknown as string)}</div>
                <div className="text-neutral-300">{selectedRequest.property_type} • {selectedRequest.location}</div>
                <div className="text-neutral-400 font-mono">Date: {selectedRequest.preferred_date} ({selectedRequest.preferred_time})</div>
                {selectedRequest.notes && (
                  <div className="mt-2 pt-2 border-t border-neutral-900 text-neutral-400 italic">
                    "{selectedRequest.notes}"
                  </div>
                )}
                {selectedRequest.photo_data && (
                  <div className="mt-3 pt-3 border-t border-neutral-800 space-y-1.5">
                    <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 font-bold">
                      <Camera className="w-3.5 h-3.5" /> Attached Inspection Photo ({selectedRequest.photo_name}):
                    </div>
                    <img
                      src={selectedRequest.photo_data}
                      alt="Inspection attachment"
                      className="w-full max-h-48 object-cover rounded border border-neutral-800"
                    />
                  </div>
                )}
              </div>

              {/* Internal Admin Notes */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-neutral-400 uppercase block">
                  Internal Admin Notes
                </label>
                <textarea
                  rows={4}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="e.g. Cleaner Mary assigned for 10 AM. Villa gate pass approved by security."
                  className="w-full bg-[#0A0A0A] border border-neutral-800 text-white text-xs p-3 rounded outline-none focus:border-white"
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={updatingId === selectedRequest.id}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono py-2 rounded border border-neutral-700 transition-colors cursor-pointer"
                >
                  Save Internal Notes
                </button>
              </div>

            </div>

            {/* Quick Actions Footer */}
            <div className="pt-4 border-t border-neutral-800 space-y-2">
              <button
                onClick={() => setShowInvoiceModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-[#F7F5F0] text-[#0A0A0A] hover:bg-white font-bold py-2.5 rounded text-xs transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Quotation / Invoice</span>
              </button>
              <a
                href={generateWhatsAppLink(selectedRequest, selectedRequest.request_number)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded text-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact via WhatsApp</span>
              </a>
            </div>

          </div>
        )}

      </div>

      {showInvoiceModal && selectedRequest && (
        <InvoiceGeneratorModal
          request={selectedRequest}
          onClose={() => setShowInvoiceModal(false)}
        />
      )}

      {/* Hidden Export PDF Component */}
      <CustomerExportPDF 
        ref={exportPdfRef} 
        requests={exportData} 
        exportId={currentExportId} 
      />

      {/* Verification & Deletion Modal */}
      <DeleteVerificationModal
        isOpen={showVerificationModal}
        onClose={() => {
          setShowVerificationModal(false);
          setExportData([]); // Clear export data on cancel
        }}
        onConfirmDelete={handleConfirmDelete}
        exportId={currentExportId}
        recordCount={exportData.length}
        isAllCustomers={isExportingAll}
      />

    </div>
  );
};
