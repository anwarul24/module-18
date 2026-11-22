import React, { useState } from 'react';
import { ArrowDown, Layers, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

/**
 * Task 3 Requirement: Demonstrate Prop Drilling and State Lifting
 * Interactive visualization showing how data flows through component hierarchies
 */
export default function PropDrillingDemo() {
  const [showDemo, setShowDemo] = useState(false);
  const [demoState, setDemoState] = useState('Active');

  return (
    <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200">
              Task 3 Concept: State Lifting & Prop Drilling in Action
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              In this app, search & filter state is lifted to <code className="font-mono text-blue-600 dark:text-blue-400">StudentListPage</code> and drilled through <code className="font-mono text-blue-600 dark:text-blue-400">StudentList</code> down to each <code className="font-mono text-blue-600 dark:text-blue-400">StudentCard</code>.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowDemo(!showDemo)}
          className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          {showDemo ? 'Hide Flow' : 'Inspect Flow'}
        </button>
      </div>

      {showDemo && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            {/* Level 1: Parent Component (Holds Lifted State) */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold block mb-1">
                Level 1: Parent
              </span>
              <p className="font-bold text-slate-800 dark:text-slate-200">StudentListPage</p>
              <p className="text-[10px] text-slate-500 mt-1">
                Owns state: <code className="text-blue-500">searchTerm</code>, <code className="text-blue-500">filters</code>, <code className="text-blue-500">onDelete</code>
              </p>
              <div className="mt-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                State is Lifted Here ↑
              </div>
            </div>

            {/* Level 2: Intermediate Component (Prop Drilling Layer) */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold block mb-1">
                Level 2: Prop Driller
              </span>
              <p className="font-bold text-slate-800 dark:text-slate-200">StudentList</p>
              <p className="text-[10px] text-slate-500 mt-1">
                Receives handlers: <code className="text-indigo-500">onView</code>, <code className="text-indigo-500">onEdit</code>, <code className="text-indigo-500">onDelete</code>
              </p>
              <div className="mt-2 text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                Passes Props Down ↓
              </div>
            </div>

            {/* Level 3: Leaf Component (Consumer) */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold block mb-1">
                Level 3: Leaf
              </span>
              <p className="font-bold text-slate-800 dark:text-slate-200">StudentCard</p>
              <p className="text-[10px] text-slate-500 mt-1">
                Executes: <code className="text-emerald-500">onClick</code>, triggers delete confirmation
              </p>
              <div className="mt-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                Receives & Triggers Events
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
            <strong>Architecture Note:</strong> In this application, local UI actions use State Lifting & Prop Drilling for explicit hierarchy encapsulation, whereas global multi-page data (students list, theme, global stats) use the <strong>Context API</strong> (<code className="font-mono text-blue-600">StudentContext</code> & <code className="font-mono text-blue-600">ThemeContext</code>) to eliminate deep drilling across pages!
          </div>
        </div>
      )}
    </div>
  );
}
