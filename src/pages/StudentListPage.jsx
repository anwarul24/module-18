import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserPlus, Download, Sparkles, FilterX } from 'lucide-react';
import { useStudents } from '../context/StudentContext';
import StudentSearchFilter from '../components/students/StudentSearchFilter';
import StudentList from '../components/students/StudentList';
import StudentPagination from '../components/students/StudentPagination';
import PropDrillingDemo from '../components/students/PropDrillingDemo';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import StudentForm from '../components/students/StudentForm';

/**
 * Task 3: State Management & State Lifting
 * Task 6: Route /students - Student List
 * Bonus: Pagination, Sorting, Filtering by Department
 */
export default function StudentListPage() {
  const { students, updateStudent, deleteStudent } = useStudents();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Task 4: Dynamic page title
  useEffect(() => {
    document.title = 'Students Directory | EduPulse';
  }, []);

  // Task 3: State Lifting - Parent Component holds all filter, search, sort, and pagination state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(() => {
    return searchParams.get('dept') || 'All';
  });
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'gpa' | 'rollNumber' | 'attendance'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Bonus 1: Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Modals state for Edit and Delete operations
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  // Sync department filter if query param changes
  useEffect(() => {
    const deptParam = searchParams.get('dept');
    if (deptParam && deptParam !== selectedDepartment) {
      setSelectedDepartment(deptParam);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Handle department change with query param reflection
  const handleDepartmentChange = (dept) => {
    setSelectedDepartment(dept);
    setCurrentPage(1);
    if (dept === 'All') {
      searchParams.delete('dept');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ dept });
    }
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const handleSearchClear = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleSortOrderToggle = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleResetAllFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('All');
    setSelectedStatus('All');
    setSortBy('name');
    setSortOrder('asc');
    setCurrentPage(1);
    searchParams.delete('dept');
    setSearchParams(searchParams);
  };

  // Filter and Sort Pipeline (State Lifting + Memoization)
  const filteredAndSortedStudents = useMemo(() => {
    return students
      .filter((student) => {
        // Multi-field search (Task 3)
        const term = searchTerm.toLowerCase().trim();
        const matchesSearch =
          !term ||
          student.name.toLowerCase().includes(term) ||
          student.email.toLowerCase().includes(term) ||
          student.rollNumber.toLowerCase().includes(term) ||
          student.department.toLowerCase().includes(term);

        // Department filter (Bonus 3)
        const matchesDepartment =
          selectedDepartment === 'All' || student.department === selectedDepartment;

        // Status filter
        const matchesStatus =
          selectedStatus === 'All' || student.status === selectedStatus;

        return matchesSearch && matchesDepartment && matchesStatus;
      })
      .sort((a, b) => {
        // Sorting logic (Bonus 2)
        let compareValue = 0;
        if (sortBy === 'name') {
          compareValue = a.name.localeCompare(b.name);
        } else if (sortBy === 'gpa') {
          compareValue = a.gpa - b.gpa;
        } else if (sortBy === 'rollNumber') {
          compareValue = a.rollNumber.localeCompare(b.rollNumber);
        } else if (sortBy === 'attendance') {
          compareValue = (a.attendance || 0) - (b.attendance || 0);
        }
        return sortOrder === 'asc' ? compareValue : -compareValue;
      });
  }, [students, searchTerm, selectedDepartment, selectedStatus, sortBy, sortOrder]);

  // Pagination slicing (Bonus 1)
  const totalPages = Math.ceil(filteredAndSortedStudents.length / itemsPerPage) || 1;
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedStudents, currentPage, itemsPerPage]);

  // Adjust page number if items reduced
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Action Handlers passed down (Prop Drilling demonstration)
  const handleViewStudent = (id) => {
    navigate(`/students/${id}`);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleDeletePrompt = (id, name) => {
    setDeletingStudent({ id, name });
  };

  const handleConfirmDelete = () => {
    if (deletingStudent) {
      deleteStudent(deletingStudent.id);
      setDeletingStudent(null);
    }
  };

  const handleSaveEdit = (updatedData) => {
    updateStudent(updatedData);
    setEditingStudent(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Student Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse, filter, edit, and manage comprehensive student enrollment records.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/add-student')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 flex items-center gap-2 transition-all active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Student</span>
          </button>
        </div>
      </div>

      {/* Task 3 & State Lifting: Search, Sort and Filter Bar Component */}
      <StudentSearchFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchClear={handleSearchClear}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={handleDepartmentChange}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        sortOrder={sortOrder}
        onSortOrderToggle={handleSortOrderToggle}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalResults={filteredAndSortedStudents.length}
      />

      {/* Task 3: Explicit Prop Drilling & State Lifting Visual Guide */}
      <PropDrillingDemo />

      {/* Task 1 & 2: Student List Component (receives mapped props via prop drilling) */}
      <StudentList
        students={paginatedStudents}
        viewMode={viewMode}
        onViewStudent={handleViewStudent}
        onEditStudent={handleEditStudent}
        onDeleteStudent={handleDeletePrompt}
        onResetFilters={handleResetAllFilters}
      />

      {/* Bonus 1: Pagination Component */}
      <StudentPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(val) => {
          setItemsPerPage(val);
          setCurrentPage(1);
        }}
        totalItems={filteredAndSortedStudents.length}
      />

      {/* Edit Student Modal */}
      <Modal
        isOpen={Boolean(editingStudent)}
        onClose={() => setEditingStudent(null)}
        title={`Edit Student: ${editingStudent?.name || ''}`}
        maxWidth="max-w-2xl"
      >
        {editingStudent && (
          <StudentForm
            initialData={editingStudent}
            onSubmit={handleSaveEdit}
            onCancel={() => setEditingStudent(null)}
            isModal={true}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingStudent)}
        onClose={() => setDeletingStudent(null)}
        onConfirm={handleConfirmDelete}
        studentName={deletingStudent?.name}
      />
    </div>
  );
}
