import { useState } from 'react';
import { X, AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';

interface DeleteVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  exportId: string;
  recordCount: number;
  isAllCustomers?: boolean;
}

export function DeleteVerificationModal({
  isOpen,
  onClose,
  onConfirmDelete,
  exportId,
  recordCount,
  isAllCustomers = false
}: DeleteVerificationModalProps) {
  const [hasVerified, setHasVerified] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  if (!isOpen) return null;

  const requiredText = isAllCustomers ? 'DELETE ALL CUSTOMERS' : 'DELETE';
  const isDeleteEnabled = hasVerified && deleteConfirmationText === requiredText;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3 text-green-600">
              <CheckCircle className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">Export Completed</h2>
                <p className="text-sm font-medium">Successfully exported {recordCount} customer records.</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-sm">
            <p className="text-gray-500 mb-1">Export ID:</p>
            <p className="font-mono font-bold text-gray-900 text-lg">{exportId}</p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-orange-800">Critical Verification Step</h3>
                <p className="text-sm text-orange-700 mt-1">
                  You are about to permanently delete {recordCount} customer records. This action cannot be undone. Make sure you have downloaded and verified the exported PDF archive before proceeding.
                </p>
              </div>
            </div>

            <label className="flex items-start space-x-3 cursor-pointer mt-4 p-2 bg-white rounded border border-orange-200 hover:bg-orange-50 transition-colors">
              <input
                type="checkbox"
                className="mt-1 w-5 h-5 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
                checked={hasVerified}
                onChange={(e) => setHasVerified(e.target.checked)}
              />
              <span className="text-sm font-bold text-gray-800">
                I have downloaded and verified the exported customer data.
              </span>
            </label>
          </div>

          {hasVerified && (
            <div className="mb-6 animate-in fade-in slide-in-from-top-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Type <span className="font-mono text-red-600 bg-red-50 px-1 rounded">{requiredText}</span> to confirm permanent deletion:
              </label>
              <input
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                placeholder={requiredText}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-mono text-center text-lg uppercase"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          )}

          <div className="flex space-x-3 pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={!isDeleteEnabled}
              onClick={onConfirmDelete}
              className={`flex-1 py-3 px-4 font-bold rounded-lg transition-all flex items-center justify-center space-x-2
                ${isDeleteEnabled 
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              <Trash2 className="w-5 h-5" />
              <span>{isAllCustomers ? 'PERMANENTLY DELETE ALL' : 'PERMANENTLY DELETE'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
