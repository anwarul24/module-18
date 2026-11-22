import React from 'react';
import Modal from './Modal';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, studentName }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion" maxWidth="max-w-md">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
          Delete Student Record?
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Are you sure you want to delete <span className="font-semibold text-slate-800 dark:text-slate-200">{studentName || 'this student'}</span>? This action cannot be undone.
        </p>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-sm flex items-center gap-2 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete Permanently
          </button>
        </div>
      </div>
    </Modal>
  );
}
