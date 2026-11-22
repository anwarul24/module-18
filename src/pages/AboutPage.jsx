import React, { useEffect } from 'react';
import {
  Code2,
  Layers,
  Sparkles,
  GitBranch,
  Database,
  Compass,
  CheckCircle2,
  Cpu,
  Palette,
  FileCheck2,
  Zap,
  Globe
} from 'lucide-react';

/**
 * Task 6: Route /about - System Overview & Documentation Page
 */
export default function AboutPage() {
  useEffect(() => {
    document.title = 'About & Documentation | EduPulse';
  }, []);

  const tasks = [
    {
      num: 'Task 1',
      title: 'Project Setup & Components',
      description:
        'Vite React architecture, modular folder organization (components, context, hooks, pages, services), reusable components: Navbar, Sidebar, StudentCard, StudentList, Footer, and JSX rendering.',
      skills: ['Vite', 'JSX', 'Reusable Components', 'Folder Hierarchy']
    },
    {
      num: 'Task 2',
      title: 'JSX, Props & Events',
      description:
        'Displaying student details through Props, conditional rendering with If-Else (department styles & honors classification) and Ternary operators (status badges, empty states, view modes), mapping student arrays with unique keys, and handling button click events.',
      skills: ['Props Passing', 'If-Else & Ternary', 'Array.map()', 'Event Handlers']
    },
    {
      num: 'Task 3',
      title: 'State Management & Lifting',
      description:
        'Using useState to manage student directory, Add, Update, and Delete operations with immutability, real-time multi-field search, State Lifting in StudentListPage to share state across components, and explicit Prop Drilling demonstration.',
      skills: ['useState', 'State Lifting', 'Prop Drilling Demo', 'CRUD Operations']
    },
    {
      num: 'Task 4',
      title: 'Hooks & Form Handling',
      description:
        'useRef to auto-focus the Full Name input field on mount and on command, useEffect to synchronize with LocalStorage and update document titles dynamically, controlled inputs with real-time field validation (name, email, roll, GPA), and immutable state updates.',
      skills: ['useRef Focus', 'useEffect Side Effects', 'Form Validation', 'Immutability']
    },
    {
      num: 'Task 5',
      title: 'API Integration & React Query',
      description:
        'Fetching public student data from JSONPlaceholder API using Fetch API, loading state indicator, custom error handling, and TanStack React Query (@tanstack/react-query) for intelligent query caching and refetching.',
      skills: ['Fetch API', 'TanStack Query', 'Query Caching', 'Custom Error Handler']
    },
    {
      num: 'Task 6',
      title: 'Routing & Context API',
      description:
        'React Router DOM with routes (/, /students, /students/:id, /add-student, /about, *), dynamic parameter lookup with useParams, programmatic navigation with useNavigate, and Context API for global student & theme state.',
      skills: ['React Router DOM', 'useParams & useNavigate', 'Context API', 'Global State']
    }
  ];

  const bonuses = [
    {
      title: 'Pagination (Bonus 1)',
      desc: 'Configurable page size (6, 9, 12, 24) with previous/next, intelligent ellipsis, and item counter.'
    },
    {
      title: 'Sorting (Bonus 2)',
      desc: 'Sort directory by Student Name (A-Z, Z-A), GPA score (High-Low, Low-High), Roll Number, or Attendance.'
    },
    {
      title: 'Filtering by Department (Bonus 3)',
      desc: 'Filter by Computer Science, Data Science, Software Engineering, Electrical Engineering, or Business Administration.'
    },
    {
      title: 'Dark / Light Mode (Bonus 4)',
      desc: 'Instant theme toggle with LocalStorage persistence and full Tailwind dark mode styling across all UI elements.'
    },
    {
      title: 'LocalStorage Persistence (Bonus 5)',
      desc: 'All additions, updates, deletions, and theme selections persist automatically in browser LocalStorage.'
    },
    {
      title: 'Custom API Error Handler (Bonus 6)',
      desc: 'Interactive error simulation switch to test network failure banners, error details, and instant retry recovery.'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Hero section */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-800">
          <Zap className="w-3.5 h-3.5" />
          <span>Module 18 Assignment Implementation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Student Management Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-3xl">
          This project satisfies all 6 core tasks and all 6 bonus challenges outlined in the
          Module 18 assignment specifications. Designed with production-grade React standards,
          clean folder separation, robust state management, and modern UI aesthetic.
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {['React 19', 'Vite 6', 'Tailwind CSS v4', 'React Router DOM', 'TanStack Query', 'Context API', 'Lucide Icons'].map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Assignment Tasks Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Task Implementation Breakdown</span>
          </h2>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            6 of 6 Completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div
              key={task.num}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300">
                  {task.num}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {task.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {task.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {task.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bonus Challenges Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Bonus Challenges Achieved</span>
          </h2>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            All 6 Bonus Features Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bonuses.map((bonus) => (
            <div
              key={bonus.title}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2"
            >
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {bonus.title}
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {bonus.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Architectural Concept Explanations */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-500" />
          <span>Core Concepts Demonstrated in Code</span>
        </h3>

        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
              1. State Lifting vs. Prop Drilling vs. Context API
            </h4>
            <p>
              In <code className="font-mono text-blue-600">StudentListPage</code>, state for search, filter, and sorting is lifted to the common parent and drilled down into <code className="font-mono text-blue-600">StudentList</code> and <code className="font-mono text-blue-600">StudentCard</code>. Meanwhile, application-wide data (student database, theme preferences) are encapsulated into <code className="font-mono text-blue-600">StudentContext</code> and <code className="font-mono text-blue-600">ThemeContext</code>, demonstrating when to use component props versus global context.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
              2. useRef for DOM Element Access
            </h4>
            <p>
              In <code className="font-mono text-blue-600">StudentForm</code>, <code className="font-mono text-blue-600">useRef(null)</code> attaches directly to the Full Name input field. An initial mount effect invokes <code className="font-mono text-blue-600">nameInputRef.current.focus()</code>, providing immediate keyboard focus without triggering unnecessary React component re-renders.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
              3. Immutability in State Updates
            </h4>
            <p>
              All state transitions strictly follow immutable functional programming principles: appending with spread operators <code className="font-mono text-blue-600">[newStudent, ...prev]</code>, filtering with <code className="font-mono text-blue-600">.filter(s =&gt; s.id !== id)</code>, and updating with <code className="font-mono text-blue-600">.map(s =&gt; s.id === updated.id ? {'{...s, ...updated}'} : s)</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
              4. TanStack React Query for Server State
            </h4>
            <p>
              Instead of managing manual loading/error flags with primitive <code className="font-mono text-blue-600">useEffect</code> calls, <code className="font-mono text-blue-600">useQuery</code> manages caching, stale times, request retries, background revalidation, and failure states with full cache inspection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
