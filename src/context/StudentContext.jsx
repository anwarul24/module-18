import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_STUDENTS } from '../data/mockStudents';

const LOCAL_STORAGE_KEY = 'edupulse_students_data_v1';

const StudentContext = createContext();

export function StudentProvider({ children }) {
  // Task 3: Use useState to manage student data
  // Bonus: Store student data in LocalStorage
  const [students, setStudents] = useState(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed reading students from LocalStorage:', err);
    }
    return INITIAL_STUDENTS;
  });

  // Global notification toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Task 4: Use useEffect to perform side effects (syncing to localStorage)
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students));
    } catch (err) {
      console.error('Failed saving students to LocalStorage:', err);
    }
  }, [students]);

  // Auto-dismiss toast after 3.5 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Task 3 & 4: Add a new student following immutability
  const addStudent = (newStudentData) => {
    const student = {
      ...newStudentData,
      id: `STU-${Date.now().toString().slice(-4)}`,
      gpa: Number(parseFloat(newStudentData.gpa).toFixed(2)),
      completedCredits: Number(newStudentData.completedCredits || 0),
      attendance: Number(newStudentData.attendance || 90),
      courses: newStudentData.courses && newStudentData.courses.length > 0
        ? newStudentData.courses
        : ['Core Foundations', 'Elective I'],
      avatar: newStudentData.avatar && newStudentData.avatar.trim() !== ''
        ? newStudentData.avatar
        : `https://images.unsplash.com/photo-${1500000000000 + (students.length * 1234567) % 50000000}?w=150&auto=format&fit=crop&q=80`
    };

    // Immutability: Prepend new student into a brand new array reference
    setStudents((prev) => [student, ...prev]);
    showToast(`Student "${student.name}" registered successfully!`, 'success');
    return student;
  };

  // Task 3 & 4: Delete a student following immutability
  const deleteStudent = (id) => {
    const target = students.find((s) => s.id === id);
    // Immutability: Filter out matching id to return a new array
    setStudents((prev) => prev.filter((student) => student.id !== id));
    showToast(`Student "${target?.name || id}" was deleted`, 'info');
  };

  // Task 3 & 4: Update student information following immutability
  const updateStudent = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === updatedStudent.id
          ? {
              ...student,
              ...updatedStudent,
              gpa: Number(parseFloat(updatedStudent.gpa).toFixed(2))
            }
          : student
      )
    );
    showToast(`Updated profile for "${updatedStudent.name}"`, 'success');
  };

  // Helper to query single student
  const getStudentById = (id) => {
    return students.find((student) => String(student.id) === String(id));
  };

  // Reset to default dataset
  const resetToDefault = () => {
    setStudents(INITIAL_STUDENTS);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_STUDENTS));
    showToast('Reset student directory to default mock records', 'info');
  };

  // Sync / Import API data
  const importApiStudents = (apiStudents) => {
    if (!Array.isArray(apiStudents) || apiStudents.length === 0) return;
    setStudents((prev) => {
      // Deduplicate by email
      const existingEmails = new Set(prev.map((s) => s.email.toLowerCase()));
      const newItems = apiStudents.filter((s) => !existingEmails.has(s.email.toLowerCase()));
      return [...newItems, ...prev];
    });
    showToast(`Imported ${apiStudents.length} student profiles from Public API!`, 'success');
  };

  // Global aggregate statistics calculated with useMemo
  const stats = useMemo(() => {
    const total = students.length;
    if (total === 0) {
      return {
        total: 0,
        averageGpa: '0.00',
        activeCount: 0,
        probationCount: 0,
        inactiveCount: 0,
        departmentCounts: {}
      };
    }

    const totalGpa = students.reduce((acc, curr) => acc + (Number(curr.gpa) || 0), 0);
    const averageGpa = (totalGpa / total).toFixed(2);
    const activeCount = students.filter((s) => s.status === 'Active').length;
    const probationCount = students.filter((s) => s.status === 'Probation').length;
    const inactiveCount = students.filter((s) => s.status === 'Inactive').length;

    const departmentCounts = students.reduce((acc, curr) => {
      acc[curr.department] = (acc[curr.department] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      averageGpa,
      activeCount,
      probationCount,
      inactiveCount,
      departmentCounts
    };
  }, [students]);

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        deleteStudent,
        updateStudent,
        getStudentById,
        resetToDefault,
        importApiStudents,
        stats,
        toast,
        showToast,
        closeToast
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
}
