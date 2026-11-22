import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function NotificationToast({ toast, onClose }) {
  if (!toast) return null;

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-50 dark:bg-emerald-950/90 text-emerald-900 dark:text-emerald-100',
      iconColor: 'text-emerald-600 dark:text-emerald-400'
    },
    error: {
      icon: AlertCircle,
      border: 'border-rose-500/30',
      bg: 'bg-rose-50 dark:bg-rose-950/90 text-rose-900 dark:text-rose-100',
      iconColor: 'text-rose-600 dark:text-rose-400'
    },
    info: {
      icon: Info,
      border: 'border-blue-500/30',
      bg: 'bg-blue-50 dark:bg-blue-950/90 text-blue-900 dark:text-blue-100',
      iconColor: 'text-blue-600 dark:text-blue-400'
    }
  };

  const config = typeConfig[toast.type] || typeConfig.info;
  const IconComponent = config.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md ${config.bg} ${config.border} max-w-md`}
      >
        <IconComponent className={`w-5 h-5 shrink-0 ${config.iconColor}`} />
        <span className="text-sm font-medium pr-2">{toast.message}</span>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
