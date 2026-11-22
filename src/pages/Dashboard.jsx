import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  Award,
  AlertTriangle,
  TrendingUp,
  UserPlus,
  ArrowRight,
  BookOpen,
  Sparkles,
  Building2,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';
import StatCard from '../components/common/StatCard';
import StudentCard from '../components/students/StudentCard';
import DepartmentBadge from '../components/common/DepartmentBadge';
import ApiSyncStatus from '../components/students/ApiSyncStatus';

export default function Dashboard() {
  const { students, stats } = useStudents();
  const navigate = useNavigate();

  // Task 4: useEffect to perform side effects (set document title)
  useEffect(() => {
    document.title = 'Dashboard | EduPulse Student Management';
  }, []);

  // Top 3 highest performing students
  const topStudents = [...students]
    .sort((a, b) => b.gpa - a.gpa)
    .slice(0, 3);

  // Recent 3 students
  const recentStudents = students.slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white p-8 shadow-xl shadow-blue-500/10">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-blue-100 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>EduPulse Academic Intelligence Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Student Management Dashboard
          </h1>
          <p className="text-blue-100 text-sm leading-relaxed">
            Monitor real-time academic analytics, manage student enrollments, inspect departmental performance, and synchronize external university data seamlessly.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/add-student"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-700 text-xs font-bold hover:bg-blue-50 transition-colors shadow-md"
            >
              <UserPlus className="w-4 h-4" />
              <span>Enroll New Student</span>
            </Link>
            <Link
              to="/students"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700/60 hover:bg-blue-700/80 text-white text-xs font-semibold border border-white/20 transition-colors"
            >
              <span>Browse All Records</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Task 1 & 3: Key Statistical Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Students"
          value={stats.total}
          subtitle="Enrolled in university"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Average GPA"
          value={stats.averageGpa}
          subtitle="Across all departments"
          icon={Award}
          color="emerald"
          trend="+0.14"
        />
        <StatCard
          title="Active Students"
          value={stats.activeCount}
          subtitle="In good academic standing"
          icon={CheckCircle2}
          color="purple"
        />
        <StatCard
          title="Academic Probation"
          value={stats.probationCount}
          subtitle="Requires faculty intervention"
          icon={AlertTriangle}
          color="amber"
        />
      </div>

      {/* Task 5: TanStack React Query Public API Sync Explorer */}
      <ApiSyncStatus />

      {/* Middle Section: Department Distribution & Dean's List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Enrollment Breakdown */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-500" />
                <span>Department Breakdown</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {Object.keys(stats.departmentCounts).length} Depts
              </span>
            </div>

            <div className="space-y-3.5">
              {Object.entries(stats.departmentCounts).map(([dept, count]) => {
                const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                return (
                  <div key={dept} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {dept}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 font-mono">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/students"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-between"
            >
              <span>Filter directory by department</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Dean's Honor Roll Top Performers */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Dean's List High Achievers</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Top academic performers across all active semesters
              </p>
            </div>
            <Link
              to="/students"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topStudents.map((student, idx) => (
              <div
                key={student.id}
                onClick={() => navigate(`/students/${student.id}`)}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700/60 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-white dark:ring-slate-800"
                    />
                    <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center shadow-xs">
                      #{idx + 1}
                    </span>
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors truncate">
                      {student.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {student.rollNumber}
                    </p>
                  </div>
                </div>

                <DepartmentBadge department={student.department} size="small" />

                <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">GPA</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {student.gpa.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recently Enrolled Students */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Recently Enrolled Students
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Latest additions to the academic registry
            </p>
          </div>
          <Link
            to="/students"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>See Full Directory ({students.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onView={(id) => navigate(`/students/${id}`)}
              onEdit={() => navigate(`/students`)}
              onDelete={() => navigate(`/students`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
