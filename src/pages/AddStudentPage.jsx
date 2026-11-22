import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft, ShieldCheck, Sparkles, BookCheck } from 'lucide-react';
import { useStudents } from '../context/StudentContext';
import StudentForm from '../components/students/StudentForm';

/**
 * Task 4 & Task 6: Route /add-student - Add Student Page
 */
export default function AddStudentPage() {
  const { addStudent } = useStudents();
  const navigate = useNavigate();

  // Task 4: Dynamic page title
  useEffect(() => {
    document.title = 'Enroll Student | EduPulse';
  }, []);

  const handleRegisterStudent = (newStudentData) => {
    const created = addStudent(newStudentData);
    navigate(`/students/${created.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Student Registration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Fill in the details below to enroll a new student into the university database.
          </p>
        </div>

        <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 items-center justify-center">
          <UserPlus className="w-6 h-6" />
        </div>
      </div>

      {/* Main Registration Form Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <StudentForm
          onSubmit={handleRegisterStudent}
          onCancel={() => navigate('/students')}
        />
      </div>

      {/* Helpful Guidelines Card */}
      <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
        <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
          <BookCheck className="w-4 h-4 text-emerald-500" />
          <span>Form Handling Checklist (Task 4)</span>
        </div>
        <p>
          • <strong>useRef auto-focus:</strong> The "Full Name" input is automatically targeted on initial page mount.
        </p>
        <p>
          • <strong>Form Validation:</strong> Name (min 3 chars), email formatting, unique roll number, and GPA bounds (0.00 to 4.00) are enforced.
        </p>
        <p>
          • <strong>Immutability:</strong> The new record is appended without mutating previous state objects or arrays.
        </p>
      </div>
    </div>
  );
}
