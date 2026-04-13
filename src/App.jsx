import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import LecturerLayout from './layouts/LecturerLayout';
import useStore from './store/useStore';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CourseRegistration from './pages/CourseRegistration';
import Results from './pages/Results';
import Fees from './pages/Fees';
import Profile from './pages/Profile';
import HostelManagement from './pages/HostelManagement';
import Library from './pages/Library';
import Courseware from './pages/Courseware';
import ExamCard from './pages/ExamCard';
import Timetable from './pages/Timetable';
import MissingSessions from './pages/MissingSessions';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentManagement from './pages/admin/StudentManagement';
import SystemSettings from './pages/admin/SystemSettings';
import LibraryManagement from './pages/admin/LibraryManagement';
import NoticeBoardManager from './pages/admin/NoticeBoardManager';
import StaffManagement from './pages/admin/StaffManagement';
import CalendarManager from './pages/admin/CalendarManager';

// Lecturer Pages
import LecturerDashboard from './pages/lecturer/LecturerDashboard';
import CourseRegistrationReview from './pages/lecturer/CourseRegistrationReview';
import MyCourses from './pages/lecturer/MyCourses';
import Grading from './pages/lecturer/Grading';
import CoursewareUpload from './pages/lecturer/CoursewareUpload';

function App() {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Student Protected Routes Wrapper */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="registration" element={<CourseRegistration />} />
          <Route path="results" element={<Results />} />
          <Route path="fees" element={<Fees />} />
          <Route path="profile" element={<Profile />} />
          <Route path="hostel" element={<HostelManagement />} />
          <Route path="library" element={<Library />} />
          <Route path="courseware" element={<Courseware />} />
          <Route path="exam-card" element={<ExamCard />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="missing-sessions" element={<MissingSessions />} />
        </Route>

        {/* Admin Protected Routes Wrapper */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="staff" element={<StaffManagement />} />
          <Route path="notices" element={<NoticeBoardManager />} />
          <Route path="calendar" element={<CalendarManager />} />
          <Route path="library" element={<LibraryManagement />} />
          <Route path="settings" element={<SystemSettings />} />
        </Route>

        {/* Lecturer Protected Routes Wrapper */}
        <Route path="/lecturer" element={<LecturerLayout />}>
          <Route index element={<LecturerDashboard />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="courseware" element={<CoursewareUpload />} />
          <Route path="registrations" element={<CourseRegistrationReview />} />
          <Route path="grading" element={<Grading />} />
        </Route>
        
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
