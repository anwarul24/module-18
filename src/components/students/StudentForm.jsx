import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, Phone, Building2, Hash, Award, Check, AlertCircle, Sparkles, Focus } from 'lucide-react';
import { DEPARTMENTS, STATUS_OPTIONS } from '../../data/mockStudents';

/**
 * Task 4: Hooks & Form Handling
 * - Use useRef to access input element (auto-focus student name input on mount)
 * - Use useEffect to perform side effects
 * - Implement student registration form
 * - Handle form input & validation
 * - Follow immutability when updating arrays and objects
 */
export default function StudentForm({ initialData = null, onSubmit, onCancel, isModal = false }) {
  // Task 4: Use useRef to directly access the Name input DOM element
  const nameInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Computer Science',
    rollNumber: '',
    gpa: '3.50',
    semester: '1st',
    enrollmentYear: 2024,
    status: 'Active',
    attendance: '90',
    bio: '',
    avatar: '',
    completedCredits: '30'
  });

  // Form validation errors state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Task 4: Use useEffect to populate form if initialData is provided (for Edit Mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        department: initialData.department || 'Computer Science',
        rollNumber: initialData.rollNumber || '',
        gpa: String(initialData.gpa || '3.50'),
        semester: initialData.semester || '1st',
        enrollmentYear: initialData.enrollmentYear || 2024,
        status: initialData.status || 'Active',
        attendance: String(initialData.attendance || '90'),
        bio: initialData.bio || '',
        avatar: initialData.avatar || '',
        completedCredits: String(initialData.completedCredits || '30')
      });
    }
  }, [initialData]);

  // Task 4: Use useEffect and useRef to automatically focus the name input element on mount
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Validation function
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Full name is required';
        else if (value.trim().length < 3) error = 'Name must be at least 3 characters';
        break;
      case 'email':
        if (!value.trim()) error = 'Email address is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) error = 'Enter a valid email address';
        break;
      case 'rollNumber':
        if (!value.trim()) error = 'Student Roll Number is required';
        break;
      case 'gpa':
        const gpaNum = parseFloat(value);
        if (value === '' || isNaN(gpaNum)) error = 'GPA is required';
        else if (gpaNum < 0.0 || gpaNum > 4.0) error = 'GPA must be between 0.00 and 4.00';
        break;
      case 'phone':
        if (value.trim() && value.trim().length < 7) error = 'Enter a valid contact phone number';
        break;
      default:
        break;
    }
    return error;
  };

  // Handle Input Changes with Immutability
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Follow immutability when updating object state
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation if already touched
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  // Programmatic focus using useRef trigger
  const handleFocusNameInput = () => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({
        name: true,
        email: true,
        rollNumber: true,
        gpa: true
      });
      // Focus the first invalid field using useRef if name is invalid
      if (newErrors.name && nameInputRef.current) {
        nameInputRef.current.focus();
      }
      return;
    }

    // Pass validated data up to parent
    onSubmit({
      ...(initialData || {}),
      ...formData,
      gpa: parseFloat(formData.gpa),
      attendance: parseInt(formData.attendance, 10) || 90,
      completedCredits: parseInt(formData.completedCredits, 10) || 30
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* useRef demo banner */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-700 dark:text-blue-300">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>
            <strong>Task 4 Feature:</strong> Full Name input auto-focused via <code className="font-mono bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">useRef()</code>.
          </span>
        </div>
        <button
          type="button"
          onClick={handleFocusNameInput}
          className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          <Focus className="w-3.5 h-3.5" />
          <span>Refocus</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name (with useRef attached) */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              ref={nameInputRef} // Task 4: useRef attached to DOM input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Samantha Vance"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.name && touched.name
                  ? 'border-rose-300 dark:border-rose-800 focus:ring-rose-400'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
              }`}
            />
          </div>
          {errors.name && touched.name && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            University Email <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. s.vance@university.edu"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.email && touched.email
                  ? 'border-rose-300 dark:border-rose-800 focus:ring-rose-400'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
              }`}
            />
          </div>
          {errors.email && touched.email && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
            </p>
          )}
        </div>

        {/* Department Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Academic Department <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {DEPARTMENTS.slice(1).map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Roll Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Roll / Student ID <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. CS-2024-099"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.rollNumber && touched.rollNumber
                  ? 'border-rose-300 dark:border-rose-800 focus:ring-rose-400'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
              }`}
            />
          </div>
          {errors.rollNumber && touched.rollNumber && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.rollNumber}
            </p>
          )}
        </div>

        {/* GPA */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            GPA (0.00 - 4.00) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="number"
              step="0.01"
              min="0.00"
              max="4.00"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="3.75"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.gpa && touched.gpa
                  ? 'border-rose-300 dark:border-rose-800 focus:ring-rose-400'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
              }`}
            />
          </div>
          {errors.gpa && touched.gpa && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.gpa}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Contact Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+1 (555) 000-0000"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.phone && touched.phone && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Academic Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {STATUS_OPTIONS.slice(1).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Semester & Year */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Semester
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'].map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Attendance %
            </label>
            <input
              type="number"
              min="0"
              max="100"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Bio / Statement */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Academic Interests & Bio
        </label>
        <textarea
          name="bio"
          rows={3}
          value={formData.bio}
          onChange={handleChange}
          placeholder="Brief student description, research focus, or extracurricular activities..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Custom Avatar URL (Optional) */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Avatar Image URL <span className="text-slate-400 font-normal">(Optional, defaults to Unsplash)</span>
        </label>
        <input
          type="url"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          placeholder="https://images.unsplash.com/photo-..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit / Cancel Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-500/25 flex items-center gap-2 transition-all"
        >
          <Check className="w-4 h-4" />
          <span>{initialData ? 'Save Changes' : 'Register Student'}</span>
        </button>
      </div>
    </form>
  );
}
