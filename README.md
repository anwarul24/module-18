# Student Management Dashboard (EduPulse)

An enterprise-grade **Student Management Dashboard** built using **React (Vite)**, **Tailwind CSS**, **Context API**, **TanStack React Query**, and **React Router DOM**.

This application is built for the **Module 18 Assignment** to demonstrate mastery of:
- Components & Reusable Architecture
- JSX, Props & Event Handling
- State Management (useState, State Lifting, Prop Drilling)
- Advanced React Hooks (`useRef`, `useEffect`, Custom Hooks) & Form Validation
- Public API Integration with Fetch & TanStack React Query
- Client-Side Routing with Dynamic URL Parameters (`useParams`, `useNavigate`)
- Global State Management with Context API
- Immutability patterns for Arrays and Objects

---

## 🚀 Live Demo & Quick Start

### 1. Prerequisites
- **Node.js** (v18.x or later recommended)
- **npm** (v9.x or later)

### 2. Installation & Running Locally

```bash
# Clone or navigate to the project directory
cd "Module 18 Assignment"

# Install project dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 3. Production Build

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📋 Comprehensive Assignment Requirements Checklist

### Task 1: Project Setup & Components
- [x] **React Project using Vite:** Scaffolded with Vite 6, React 19, and Tailwind CSS.
- [x] **Organized Folder Structure:**
  - `src/components/layout/` (Navbar, Sidebar, Footer)
  - `src/components/students/` (StudentCard, StudentList, StudentForm, StudentSearchFilter, StudentPagination, PropDrillingDemo, ApiSyncStatus)
  - `src/components/common/` (Modal, ConfirmModal, StatCard, DepartmentBadge, NotificationToast)
  - `src/context/` (StudentContext, ThemeContext)
  - `src/data/` (mockStudents)
  - `src/hooks/` (useStudents, useTheme)
  - `src/pages/` (Dashboard, StudentListPage, StudentDetailsPage, AddStudentPage, AboutPage, NotFoundPage)
  - `src/services/` (studentApi with Fetch API & error simulation)
- [x] **Reusable Components Created:**
  - `Navbar.jsx` (Brand logo, quick search, dark mode toggle, mobile drawer toggle)
  - `Sidebar.jsx` (Navigation links, active route highlight, department shortcuts, reset action)
  - `StudentCard.jsx` (Student card showing photo, name, email, department, roll, GPA, attendance, action buttons)
  - `StudentList.jsx` (List container rendering cards or table rows, empty states, click actions)
  - `Footer.jsx` (System status badge, copyright, quick links)
- [x] **JSX Rendering:** All components are written in clean, modular JSX.

---

### Task 2: JSX, Props & Events
- [x] **Display Student Information Using Props:** Passing student objects, event callbacks (`onView`, `onEdit`, `onDelete`), and configuration props to `StudentCard` and `StudentList`.
- [x] **Conditional Rendering (If-Else & Ternary):**
  - **If-Else:** Used in `DepartmentBadge.jsx` for department badge styles and in `StudentCard.jsx` for Dean's Honor Roll vs Good Standing vs Academic Warning tags.
  - **Ternary Operator:** Used in `StudentCard.jsx` for status badge colors, `StudentList.jsx` for Grid vs Table views, `Navbar.jsx` for theme icons, and `StudentForm.jsx` for edit vs create mode.
- [x] **Render Student Lists Using `map()`:** Dynamic mapping over students array with unique key `key={student.id}` in both Grid and Table view modes.
- [x] **Handle Button Click Events:** View details, edit modal triggers, delete prompt with confirmation, search clearing, sorting toggles, and pagination clicks.
- [x] **Reusable Components:** `DepartmentBadge`, `StatCard`, `Modal`, `ConfirmModal`, `NotificationToast`.

---

### Task 3: State Management
- [x] **`useState` to Manage Student Data:** Initialized in `StudentContext.jsx` with persistent browser LocalStorage fallback.
- [x] **Add a New Student:** Full registration form generating unique ID and prepending immutably.
- [x] **Delete a Student:** Confirm dialog and immutable deletion (`.filter(s => s.id !== id)`).
- [x] **Update Student Information:** Modal dialog pre-populating fields and updating immutably (`.map(...)`).
- [x] **Search Functionality:** Real-time multi-field search across student name, email, roll number, and department.
- [x] **State Lifting:** Lifted search keyword, department filter, status filter, sorting options, and pagination states to parent `StudentListPage.jsx`, passing them down to `StudentSearchFilter` and `StudentList`.
- [x] **Demonstrate Prop Drilling:** Includes an interactive visual explainer component (`PropDrillingDemo.jsx`) and clear prop drilling through `StudentListPage -> StudentList -> StudentCard -> Action Buttons`.

---

### Task 4: Hooks & Form Handling
- [x] **`useRef` to Access an Input Element:** `StudentForm.jsx` binds `nameInputRef = useRef(null)` to the Full Name input field, auto-focusing it on initial mount and providing an on-demand "Refocus" button.
- [x] **`useEffect` to Perform Side Effects:**
  - Synchronizing student state to `localStorage` on any change.
  - Updating dynamic browser document title per route (`document.title`).
  - Auto-dismissing notification toasts after 3.5 seconds.
- [x] **Student Registration Form:** Comprehensive form with Full Name, Email, Phone, Department, Roll Number, GPA, Semester, Enrollment Year, Status, Attendance, and Bio.
- [x] **Form Input & Validation:**
  - Full Name: minimum 3 characters.
  - University Email: regex format verification (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
  - Student Roll Number: required.
  - GPA: required float between 0.00 and 4.00.
  - Real-time inline feedback messages.
- [x] **Immutability:** Strictly enforced across all array and object operations (spread operator, `.filter()`, `.map()`, no direct mutations).

---

### Task 5: API Integration & React Query
- [x] **Fetch Student Data from Public API:** Connects to `https://jsonplaceholder.typicode.com/users` and maps data into rich academic student profiles.
- [x] **Loading Message / Skeleton / Spinner:** Displays animated loading status while fetching remote data.
- [x] **Error Handling:** Custom alert banner with error message and retry action.
- [x] **TanStack React Query:** Wrapped in `QueryClientProvider` with `useQuery`, `queryKey: ['public-api-students']`, 5-minute cache `staleTime`, background caching, refetch button, and last sync timestamp.
- [x] **Simulate API Failure Switch:** An interactive toggle to test network error banners and verify retry capability instantly.

---

### Task 6: Routing & Context API
- [x] **React Router DOM Setup:**
  | Route | Component | Description |
  |---|---|---|
  | `/` | `Dashboard` | Analytics overview, stats, recent students, quick actions |
  | `/students` | `StudentListPage` | Full student directory, search, filter, sort, pagination |
  | `/students/:id` | `StudentDetailsPage` | Dynamic student profile with courses, GPA standing, advisor |
  | `/add-student` | `AddStudentPage` | Registration form with auto-focused input |
  | `/about` | `AboutPage` | Project architecture, concepts & documentation |
  | `*` | `NotFoundPage` | 404 page with navigation return |
- [x] **Context API for Global State:**
  - `StudentContext.jsx`: Provides students list, CRUD functions, stats, and notification toasts.
  - `ThemeContext.jsx`: Manages dark/light theme state and HTML class toggle.
- [x] **Navigation:** `NavLink` with active states, `Link`, `useNavigate()`, `useParams()`.

---

## 🌟 Bonus Challenges (All 6 Completed!)

1. **Pagination (Bonus 1):** Configurable items per page (6, 9, 12, 24), previous/next controls, intelligent page pills, and item range counters.
2. **Sorting (Bonus 2):** Sort directory by Student Name (A-Z, Z-A), Cumulative GPA (Highest-Lowest, Lowest-Highest), Roll Number, or Attendance rate.
3. **Filtering by Department (Bonus 3):** Real-time department filtering (Computer Science, Software Engineering, Data Science, Electrical Engineering, Business Administration).
4. **Dark / Light Mode (Bonus 4):** Full theme toggle with persistent LocalStorage and complete Tailwind dark styling across all cards, modals, tables, and navbars.
5. **LocalStorage Persistence (Bonus 5):** All additions, updates, deletions, and theme changes persist automatically in browser LocalStorage across refreshes.
6. **Custom Error UI (Bonus 6):** Displays a dedicated custom error card with error explanation, retry button, and simulated error injection toggle.

---

## 📂 Project Directory Structure

```
Module 18 Assignment/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── ConfirmModal.jsx        # Delete confirmation dialog
│   │   │   ├── DepartmentBadge.jsx     # If-Else conditional styling badge
│   │   │   ├── Modal.jsx               # Reusable dialog backdrop
│   │   │   ├── NotificationToast.jsx   # Global success/error alert toast
│   │   │   └── StatCard.jsx            # Reusable KPI metric card
│   │   ├── layout/
│   │   │   ├── Footer.jsx              # Reusable footer component
│   │   │   ├── Navbar.jsx              # Reusable navigation bar with theme toggle
│   │   │   └── Sidebar.jsx             # Reusable responsive sidebar
│   │   └── students/
│   │       ├── ApiSyncStatus.jsx       # TanStack Query sync panel & error simulator
│   │       ├── PropDrillingDemo.jsx    # Visual breakdown of Prop Drilling vs Context
│   │       ├── StudentCard.jsx         # Reusable student card with props & actions
│   │       ├── StudentForm.jsx         # Form handling with useRef auto-focus & validation
│   │       ├── StudentList.jsx         # Mapped student list with Grid & Table views
│   │       ├── StudentPagination.jsx   # Bonus pagination controls
│   │       └── StudentSearchFilter.jsx # Multi-field search, department filter, and sorter
│   ├── context/
│   │   ├── StudentContext.jsx          # Context API: Global student state & CRUD
│   │   └── ThemeContext.jsx            # Context API: Global light/dark theme state
│   ├── data/
│   │   └── mockStudents.js             # Initial mock data and department lists
│   ├── hooks/
│   │   ├── useStudentContext.js        # Custom hook for StudentContext
│   │   └── useThemeContext.js          # Custom hook for ThemeContext
│   ├── pages/
│   │   ├── AboutPage.jsx               # Task 6: /about documentation page
│   │   ├── AddStudentPage.jsx          # Task 6: /add-student registration page
│   │   ├── Dashboard.jsx               # Task 6: / dashboard analytics page
│   │   ├── NotFoundPage.jsx            # Route: * 404 page
│   │   ├── StudentDetailsPage.jsx      # Task 6: /students/:id dynamic details page
│   │   └── StudentListPage.jsx         # Task 6: /students directory page
│   ├── services/
│   │   └── studentApi.js               # Fetch API & error injection simulator
│   ├── App.jsx                         # Main router, providers & layout composition
│   ├── index.css                       # Tailwind CSS directives & custom styling
│   └── main.jsx                        # Application root entry point
├── index.html                          # Root HTML template
├── package.json                        # Dependencies & scripts
├── vite.config.js                      # Vite & Tailwind CSS plugins configuration
└── README.md                           # Documentation & assignment guide
```

---

## 🛠️ Technology Stack

- **React 19:** Functional components, Hooks (`useState`, `useEffect`, `useRef`, `useMemo`, `useContext`)
- **Vite 6:** Ultra-fast bundling, HMR, and build optimization
- **Tailwind CSS v4:** Modern styling with Dark Mode support
- **React Router DOM v7:** Client-side SPA routing (`Routes`, `Route`, `useNavigate`, `useParams`, `NavLink`)
- **TanStack React Query v5:** Server state management, caching (`staleTime`), and retry mechanisms
- **Fetch API:** Public API data integration (`jsonplaceholder.typicode.com`)
- **Lucide React:** Clean icon set
- **LocalStorage:** Persistent client-side data storage
