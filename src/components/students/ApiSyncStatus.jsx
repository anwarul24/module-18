import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  RefreshCw,
  CloudDownload,
  AlertTriangle,
  CheckCircle2,
  Database,
  Wifi,
  WifiOff,
  Flame,
  ArrowRight
} from 'lucide-react';
import { fetchStudentsFromApi, setSimulateApiError, getSimulateApiError } from '../../services/studentApi';
import { useStudents } from '../../context/StudentContext';

/**
 * Task 5: API Integration & React Query
 * - Fetch student data from a public API
 * - Display loading message while fetching data
 * - Handle API errors properly
 * - Implement React Query for API data fetching & caching
 * - Bonus 6: Custom error message when API fails & retry button
 */
export default function ApiSyncStatus() {
  const { importApiStudents } = useStudents();
  const [isSimulatedError, setIsSimulatedError] = useState(getSimulateApiError());
  const [hasImported, setHasImported] = useState(false);

  // TanStack React Query implementation (Task 5)
  const {
    data: apiStudents,
    isLoading,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
    dataUpdatedAt
  } = useQuery({
    queryKey: ['public-api-students'],
    queryFn: fetchStudentsFromApi,
    staleTime: 1000 * 60 * 5, // 5 minutes cache lifetime
    retry: 1
  });

  const handleToggleSimulatedError = () => {
    const nextState = !isSimulatedError;
    setIsSimulatedError(nextState);
    setSimulateApiError(nextState);
    // Immediately trigger refetch to observe the error or recovery
    refetch();
  };

  const handleImportToDirectory = () => {
    if (apiStudents && apiStudents.length > 0) {
      importApiStudents(apiStudents);
      setHasImported(true);
      setTimeout(() => setHasImported(false), 3000);
    }
  };

  const formattedUpdateTime = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString()
    : 'Not yet';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Info & React Query Badge */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
              <Flame className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Public API Integration with TanStack React Query
            </h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              QueryKey: ['public-api-students']
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Source: <code className="font-mono text-blue-600 dark:text-blue-400">jsonplaceholder.typicode.com/users</code> (Cached 5 mins • Last Sync: {formattedUpdateTime})
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Error Simulation Toggle (Bonus 6) */}
          <button
            onClick={handleToggleSimulatedError}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isSimulatedError
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
            title="Toggle simulated API network failure"
          >
            {isSimulatedError ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{isSimulatedError ? 'Error Injection: ON' : 'Simulate API Failure'}</span>
          </button>

          {/* Refetch Button */}
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-blue-500' : ''}`} />
            <span>{isFetching ? 'Fetching...' : 'Refetch Query'}</span>
          </button>

          {/* Import to Directory Button */}
          {apiStudents && !isError && (
            <button
              onClick={handleImportToDirectory}
              disabled={hasImported}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs flex items-center gap-1.5 transition-all"
            >
              {hasImported ? <CheckCircle2 className="w-3.5 h-3.5" /> : <CloudDownload className="w-3.5 h-3.5" />}
              <span>{hasImported ? 'Imported to Directory!' : `Import (${apiStudents.length}) to Directory`}</span>
            </button>
          )}
        </div>
      </div>

      {/* Task 5: Loading State conditional rendering */}
      {isLoading && (
        <div className="mt-4 p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-center gap-3">
          <RefreshCw className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
          <div className="text-xs">
            <p className="font-semibold text-blue-900 dark:text-blue-200">
              Fetching remote student records...
            </p>
            <p className="text-blue-600 dark:text-blue-400">
              Querying public student endpoint and parsing academic records with React Query caching.
            </p>
          </div>
        </div>
      )}

      {/* Task 5 & Bonus 6: Custom Error Message UI */}
      {isError && (
        <div className="mt-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 animate-in fade-in duration-200">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/80 text-rose-600 dark:text-rose-300 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1 text-xs">
              <h5 className="font-bold text-rose-900 dark:text-rose-200 text-sm">
                Custom API Error Handler (Task 5 & Bonus 6)
              </h5>
              <p className="text-rose-700 dark:text-rose-300 mt-0.5 leading-relaxed">
                {error?.message || 'An unexpected network error occurred while querying student data from remote server.'}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => {
                    setSimulateApiError(false);
                    setIsSimulatedError(false);
                    refetch();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Disable Failure & Retry Request</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Status banner */}
      {!isLoading && !isError && apiStudents && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Successfully fetched and cached <strong>{apiStudents.length}</strong> public students with TanStack Query.</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400">Status: 200 OK • In-Memory Cache Active</span>
        </div>
      )}
    </div>
  );
}
