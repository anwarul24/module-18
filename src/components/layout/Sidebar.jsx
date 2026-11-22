import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Info,
  ShieldCheck,
  Building2,
  Database,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { useStudents } from '../../context/StudentContext';
import { useTheme } from '../../context/ThemeContext';
import { DEPARTMENTS } from '../../data/mockStudents';

export default function Sidebar({ isOpen, onClose }) {
  const { students, stats, resetToDefault } = useStudents();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/students', label: 'All Students', icon: Users, badge: students.length },
    { to: '/add-student', label: 'Add Student', icon: UserPlus },
    { to: '/about', label: 'System Overview', icon: Info }
  ];

  const handleDeptClick = (dept) => {
    if (dept === 'All') {
      navigate('/students');
    } else {
      navigate(`/students?dept=${encodeURIComponent(dept)}`);
    }
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Main Navigation */}
          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Navigation
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.exact}
                    onClick={() => {
                      if (onClose) onClose();
                    }}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Quick Department Shortcuts */}
          <div>
            <div className="px-3 flex items-center justify-between mb-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Departments
              </p>
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="space-y-1">
              {DEPARTMENTS.slice(1).map((dept) => {
                const count = stats.departmentCounts[dept] || 0;
                return (
                  <button
                    key={dept}
                    onClick={() => handleDeptClick(dept)}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 text-left transition-colors"
                  >
                    <span className="truncate">{dept}</span>
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Academic Status Metric */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
              <span>Academic Standing</span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block">Active</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {stats.activeCount}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block">Probation</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {stats.probationCount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Area with Theme Toggle & Reset Data action */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          {/* Theme Mode Toggle Row */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <div className="flex items-center gap-2">
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 text-indigo-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
              <span>Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              {theme === 'dark' ? 'Dark' : 'Light'}
            </span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all student data back to initial mock records?')) {
                resetToDefault();
              }
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Reset students data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </aside>
    </>
  );
}
