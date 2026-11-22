import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { StudentProvider, useStudents } from './context/StudentContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import NotificationToast from './components/common/NotificationToast';

// Pages
import Dashboard from './pages/Dashboard';
import StudentListPage from './pages/StudentListPage';
import StudentDetailsPage from './pages/StudentDetailsPage';
import AddStudentPage from './pages/AddStudentPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

// Initialize TanStack React Query Client (Task 5)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      retry: 1
    }
  }
});

/**
 * Main Layout wrapper with responsive Sidebar and Toast
 */
function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast, closeToast } = useStudents();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 md:pl-64 min-w-0 flex flex-col justify-between">
          <div className="p-4 sm:p-6 lg:p-8">
            <Routes>
              {/* Task 6: React Router Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentListPage />} />
              <Route path="/students/:id" element={<StudentDetailsPage />} />
              <Route path="/add-student" element={<AddStudentPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>

          {/* Reusable Footer Component (Task 1) */}
          <Footer />
        </main>
      </div>

      {/* Global Notification Toast */}
      <NotificationToast toast={toast} onClose={closeToast} />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <StudentProvider>
          <BrowserRouter>
            <MainLayout />
          </BrowserRouter>
        </StudentProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
