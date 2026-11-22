import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = '404 Page Not Found | EduPulse';
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-300">
      <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 shadow-md shadow-blue-500/10">
        <Compass className="w-10 h-10 animate-spin duration-1000" />
      </div>
      <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-2">
        Error 404
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
        Page Not Found
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mb-8 leading-relaxed">
        The destination you are looking for does not exist or has been relocated to another academic portal address.
      </p>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
        <Link
          to="/students"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <span>Student Directory</span>
        </Link>
      </div>
    </div>
  );
}
