import { useState, useEffect } from 'react';
import { Database, FileArchive, Trash2 } from 'lucide-react';
import type { ServiceRequest } from '../types/booking';
import { getAuditLogs, isSupabaseConfigured } from '../lib/supabase';

interface StorageManagementProps {
  requests: ServiceRequest[];
  onExportAll: () => void;
}

export function StorageManagement({ requests, onExportAll }: StorageManagementProps) {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  useEffect(() => {
    getAuditLogs().then(logs => setAuditLogs(logs));
  }, []);

  // Calculate estimated size (rough approximation)
  // Assuming 1 char = 1 byte, plus overhead
  const estimateSize = (reqs: ServiceRequest[]) => {
    let bytes = JSON.stringify(reqs).length;
    // Base64 photos take up huge amounts, which are included in the stringify
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const currentSize = estimateSize(requests);
  const totalRecords = requests.length;

  let statusLevel = 'Normal';
  let statusColor = 'text-emerald-400';
  let statusBg = 'bg-emerald-950/40 border-emerald-900';
  if (totalRecords > 500) {
    statusLevel = 'Critical';
    statusColor = 'text-red-400';
    statusBg = 'bg-red-950/40 border-red-900';
  } else if (totalRecords > 300) {
    statusLevel = 'Warning';
    statusColor = 'text-amber-400';
    statusBg = 'bg-amber-950/40 border-amber-900';
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Status */}
        <div className={`p-5 rounded-lg border ${statusBg} flex items-start space-x-4`}>
          <div className={`p-3 rounded-full bg-black/30 ${statusColor}`}>
            <Database className="w-8 h-8" />
          </div>
          <div>
            <h3 className={`font-bold uppercase tracking-wider ${statusColor}`}>{statusLevel} Database State</h3>
            <div className="mt-2 space-y-1 text-sm text-neutral-300">
              <p>Total Records: <span className="text-white font-mono">{totalRecords}</span></p>
              <p>Estimated DB Size: <span className="text-white font-mono">{currentSize}</span></p>
              <p>Storage Engine: <span className="text-white">{isSupabaseConfigured ? 'Supabase' : 'Local Storage'}</span></p>
            </div>
          </div>
        </div>

        {/* Data Cleanup Recommendation */}
        <div className="md:col-span-2 p-5 rounded-lg border border-neutral-800 bg-[#171717]">
          <h3 className="font-bold text-white mb-2 flex items-center">
            <Trash2 className="w-5 h-5 mr-2 text-neutral-400" />
            Storage Cleanup Recommendations
          </h3>
          <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
            Database performance and local browser storage limits are heavily impacted by large Base64 photo attachments. 
            Ensure you export old customer data to PDF archives periodically before safely deleting them.
          </p>
          
          <div className="bg-[#0A0A0A] border border-neutral-800 p-4 rounded flex justify-between items-center">
            <div>
              <p className="text-white font-medium">All Customer Records</p>
              <p className="text-xs text-neutral-500 mt-1">{totalRecords} records currently consuming {currentSize}</p>
            </div>
            <button 
              onClick={onExportAll}
              disabled={totalRecords === 0}
              className="px-4 py-2 bg-neutral-800 hover:bg-white hover:text-black transition-colors rounded text-sm font-bold flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileArchive className="w-4 h-4 mr-2" />
              Export & Delete All
            </button>
          </div>
        </div>
      </div>

      {/* Audit History Log */}
      <div className="bg-[#171717] border border-[#2A2A2A] rounded-lg overflow-hidden mt-8">
        <div className="p-4 bg-[#0A0A0A] border-b border-[#2A2A2A]">
          <h3 className="font-bold text-white">Export & Deletion History</h3>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0A0A0A] text-neutral-500 font-mono uppercase">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Action</th>
              <th className="p-4">Export ID</th>
              <th className="p-4">Admin</th>
              <th className="p-4 text-right">Records Affected</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800 text-neutral-300">
            {auditLogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-neutral-600 font-mono">
                  No destructive actions have been recorded yet.
                </td>
              </tr>
            ) : (
              auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-900 transition-colors">
                  <td className="p-4 font-mono">{new Date(log.timestamp).toLocaleString('en-AE')}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                      log.action === 'DELETE' ? 'bg-red-950 text-red-400' : 'bg-blue-950 text-blue-400'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-neutral-400">{log.export_id}</td>
                  <td className="p-4">{log.admin_id}</td>
                  <td className="p-4 text-right font-mono">{log.records_count}</td>
                  <td className="p-4 text-center">
                    {log.status === 'Successful' ? (
                      <span className="text-emerald-500 font-bold">SUCCESS</span>
                    ) : (
                      <span className="text-red-500 font-bold">FAILED</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
