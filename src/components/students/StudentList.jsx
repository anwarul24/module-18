import React from 'react';
import StudentCard from './StudentCard';
import DepartmentBadge from '../common/DepartmentBadge';
import { Users, Eye, Edit3, Trash2, Hash, AlertCircle, PlusCircle } from 'lucide-react';

/**
 * Task 1: Reusable Component (StudentList)
 * Task 2: Render student lists using map()
 * Task 2: Conditional rendering (empty state, grid vs table)
 * Task 3: Prop Drilling demonstration (receiving action handlers from parent and passing down)
 */
export default function StudentList({
  students,
  viewMode = 'grid',
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
  onResetFilters
}) {
  // Task 2: Conditional rendering (Ternary / Empty State)
  if (!students || students.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center my-6">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/50 text-blue-500 mx-auto flex items-center justify-center mb-4">
          <Users className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          No Students Found
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-6">
          No student records matched your current search keywords or filters.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors inline-flex items-center gap-2"
          >
            <span>Reset Search & Filters</span>
          </button>
        )}
      </div>
    );
  }

  // Task 2: Conditional rendering - Grid View
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Task 2: Render student lists using map() */}
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onView={onViewStudent}
            onEdit={onEditStudent}
            onDelete={onDeleteStudent}
          />
        ))}
      </div>
    );
  }

  // Task 2: Conditional rendering - Table View
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-4 py-4">Department</th>
              <th className="px-4 py-4">Roll Number</th>
              <th className="px-4 py-4">GPA</th>
              <th className="px-4 py-4">Attendance</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {/* Task 2: Render student lists using map() */}
            {students.map((student) => (
              <tr
                key={student.id}
                onClick={() => onViewStudent(student.id)}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors group"
              >
                {/* Student Avatar & Name */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}`}
                      alt={student.name}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=3b82f6&color=fff`;
                      }}
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {student.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {student.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Department */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <DepartmentBadge department={student.department} size="small" />
                </td>

                {/* Roll Number */}
                <td className="px-4 py-4 whitespace-nowrap font-mono text-xs text-slate-600 dark:text-slate-300">
                  {student.rollNumber}
                </td>

                {/* GPA */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`font-bold text-sm ${
                      student.gpa >= 3.5
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {student.gpa.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1">/ 4.0</span>
                </td>

                {/* Attendance */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          student.attendance >= 90
                            ? 'bg-emerald-500'
                            : student.attendance >= 75
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${Math.min(100, student.attendance || 80)}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      {student.attendance || 80}%
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                      student.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : student.status === 'Probation'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {student.status}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                  <div
                    className="flex items-center justify-end gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onViewStudent(student.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEditStudent(student)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors"
                      title="Edit Student"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteStudent(student.id, student.name)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
