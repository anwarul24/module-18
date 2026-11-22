import React from 'react';
import { Eye, Edit3, Trash2, Mail, Phone, Award, Hash, CheckCircle, AlertCircle } from 'lucide-react';
import DepartmentBadge from '../common/DepartmentBadge';

/**
 * Task 1: Reusable Component (StudentCard)
 * Task 2: Display student information using Props
 * Task 2: Use conditional rendering (If-Else & Ternary)
 * Task 2: Handle button click events
 */
export default function StudentCard({ student, onView, onEdit, onDelete }) {
  if (!student) return null;

  // Task 2: Conditional rendering using If-Else for Academic Honors Tier
  let honorTag = null;
  let honorColor = '';
  if (student.gpa >= 3.8) {
    honorTag = "Dean's Honor List";
    honorColor = 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
  } else if (student.gpa >= 3.0) {
    honorTag = 'Good Academic Standing';
    honorColor = 'text-blue-700 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-800';
  } else {
    honorTag = 'Academic Warning';
    honorColor = 'text-amber-700 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800';
  }

  // Task 2: Conditional rendering using Ternary operator for status styling
  const statusBadge =
    student.status === 'Active' ? (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
        <CheckCircle className="w-3 h-3" /> Active
      </span>
    ) : student.status === 'Probation' ? (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
        <AlertCircle className="w-3 h-3" /> Probation
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400">
        Inactive
      </span>
    );

  // Click Handlers (Task 2)
  const handleCardClick = () => {
    if (onView) onView(student.id);
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // Stop event bubbling
    if (onEdit) onEdit(student);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Stop event bubbling
    if (onDelete) onDelete(student.id, student.name);
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    if (onView) onView(student.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500/60 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Header: Avatar, Name & Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <img
              src={student.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}`}
              alt={student.name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:scale-105 transition-transform"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=3b82f6&color=fff`;
              }}
            />
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {student.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                <Hash className="w-3 h-3 text-slate-400" />
                <span>{student.rollNumber}</span>
              </p>
            </div>
          </div>
          {statusBadge}
        </div>

        {/* Department Badge (Props & If-Else) */}
        <div className="flex items-center gap-2 mb-3">
          <DepartmentBadge department={student.department} size="small" />
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            • {student.semester || '1st'} Sem
          </span>
        </div>

        {/* Bio / Summary (Ternary conditional rendering) */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {student.bio ? student.bio : 'No personal statement provided yet.'}
        </p>

        {/* Performance & Academic Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-4 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">
              Cumulative GPA
            </span>
            <span className={`text-sm font-bold ${student.gpa >= 3.5 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
              {student.gpa.toFixed(2)} <span className="text-[10px] font-normal text-slate-400">/ 4.0</span>
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">
              Attendance
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {student.attendance || 90}%
            </span>
          </div>
        </div>

        {/* Academic Tier Alert Tag */}
        <div className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border flex items-center justify-between mb-4 ${honorColor}`}>
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>{honorTag}</span>
          </span>
          <span className="text-[10px] opacity-75">{student.completedCredits || 0} Cr</span>
        </div>

        {/* Contact Info */}
        <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <div className="flex items-center gap-2 truncate">
            <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{student.email}</span>
          </div>
          {student.phone && (
            <div className="flex items-center gap-2 truncate">
              <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{student.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons (Task 2 & 3: Handle button click events) */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <button
          onClick={handleViewClick}
          className="flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors flex items-center justify-center gap-1.5"
          title="View Student Details"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>
        <button
          onClick={handleEditClick}
          className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Edit Student Info"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={handleDeleteClick}
          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
          title="Delete Student Record"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
