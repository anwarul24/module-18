import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  UserCheck,
  Edit3,
  Trash2,
  Building2,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';
import DepartmentBadge from '../components/common/DepartmentBadge';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import StudentForm from '../components/students/StudentForm';

/**
 * Task 6: Route /students/:id - Student Details Page
 * Dynamic routing with useParams
 */
export default function StudentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById, updateStudent, deleteStudent } = useStudents();

  const student = getStudentById(id);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Task 4: Dynamic page title based on student name
  useEffect(() => {
    if (student) {
      document.title = `${student.name} | Student Profile`;
    } else {
      document.title = 'Student Not Found | EduPulse';
    }
  }, [student]);

  if (!student) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center max-w-xl mx-auto my-12 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 mx-auto flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Student Record Not Found
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6">
          No student record was found for ID <code className="font-mono text-blue-600 dark:text-blue-400">{id}</code>. The record may have been removed or the link is incorrect.
        </p>
        <Link
          to="/students"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/25 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Students Directory</span>
        </Link>
      </div>
    );
  }

  const handleUpdate = (updatedData) => {
    updateStudent(updatedData);
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    deleteStudent(student.id);
    navigate('/students');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Top Navigation Back Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/students')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student Directory</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Main Student Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={student.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}`}
            alt={student.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-blue-50 dark:ring-blue-950/60 shadow-lg"
          />
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {student.name}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  student.status === 'Active'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : student.status === 'Probation'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {student.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <DepartmentBadge department={student.department} />
              <span>• Roll: <strong className="font-mono text-slate-700 dark:text-slate-200">{student.rollNumber}</strong></span>
              <span>• ID: <strong className="font-mono text-slate-700 dark:text-slate-200">{student.id}</strong></span>
              <span>• Enrolled: <strong>{student.enrollmentYear || 2023}</strong></span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
              {student.bio || 'No personal statement provided.'}
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Academic Performance & Contact Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Academic Details & Enrolled Courses */}
        <div className="md:col-span-2 space-y-6">
          {/* Academic Highlights */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-500" />
              <span>Academic Metrics & Standing</span>
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Cumulative GPA
                </span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {student.gpa.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Scale 4.00</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Attendance
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {student.attendance || 90}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Classes Attended</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Completed Credits
                </span>
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                  {student.completedCredits || 45}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">/ 120 Total</span>
              </div>
            </div>

            {/* Degree Completion Progress Bar */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Degree Completion Progress
                </span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                  {Math.round(((student.completedCredits || 45) / 120) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.round(((student.completedCredits || 45) / 120) * 100))}%`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>Current Enrolled Coursework</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(student.courses || ['Core Fundamentals', 'Algorithm Analysis', 'Web Architectures']).map(
                (course, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {course}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        3 Credit Hours • Active Course
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Contact, Advisor & Faculty Information */}
        <div className="space-y-6">
          {/* Contact Details Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-500" />
              <span>Contact & Identity</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
                  Institutional Email
                </span>
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${student.email}`} className="hover:text-blue-600 truncate">
                    {student.email}
                  </a>
                </div>
              </div>

              {student.phone && (
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
                    Phone Number
                  </span>
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{student.phone}</span>
                  </div>
                </div>
              )}

              {student.address && (
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
                    Campus / Home Address
                  </span>
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{student.address}</span>
                  </div>
                </div>
              )}

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
                  Academic Faculty Advisor
                </span>
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>{student.advisor || 'Assigned by Dean Office'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Student Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Student: ${student.name}`}
      >
        <StudentForm
          initialData={student}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditModalOpen(false)}
          isModal={true}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        studentName={student.name}
      />
    </div>
  );
}
