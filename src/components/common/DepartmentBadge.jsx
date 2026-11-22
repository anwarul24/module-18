import React from 'react';

/**
 * Task 2: Demonstrating Conditional Rendering with If-Else statements
 * Sets distinct styling and theme depending on student department
 */
export default function DepartmentBadge({ department, size = 'normal' }) {
  // Conditional rendering using If-Else constructs
  let badgeStyle = '';
  let dotColor = '';

  if (department === 'Computer Science') {
    badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800';
    dotColor = 'bg-blue-500';
  } else if (department === 'Software Engineering') {
    badgeStyle = 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800';
    dotColor = 'bg-indigo-500';
  } else if (department === 'Data Science') {
    badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
    dotColor = 'bg-emerald-500';
  } else if (department === 'Electrical Engineering') {
    badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
    dotColor = 'bg-amber-500';
  } else if (department === 'Business Administration') {
    badgeStyle = 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800';
    dotColor = 'bg-purple-500';
  } else {
    // Default fallback
    badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    dotColor = 'bg-slate-400';
  }

  // Ternary operator for size conditional rendering
  const sizeClass = size === 'small' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-all ${sizeClass} ${badgeStyle}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {department || 'Unassigned'}
    </span>
  );
}
