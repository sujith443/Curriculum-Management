import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import StudentDashboard from './components/dashboard/StudentDashboard';
import FacultyDashboard from './components/dashboard/FacultyDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import CurriculumUpload from './components/curriculum/CurriculumUpload';
import CurriculumList from './components/curriculum/CurriculumList';
import CurriculumView from './components/curriculum/CurriculumView';
import CurriculumSearch from './components/curriculum/CurriculumSearch';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Protected route component
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on role
      if (user.role === 'student') return <Navigate to="/dashboard/student" />;
      if (user.role === 'faculty') return <Navigate to="/dashboard/faculty" />;
      if (user.role === 'admin') return <Navigate to="/dashboard/admin" />;
      return <Navigate to="/login" />;
    }
    
    return children;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to={`/dashboard/${user.role}`} />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to={`/dashboard/${user.role}`} />} />
          
          <Route path="/" element={<MainLayout />}>
            {/* Dashboard routes based on role */}
            <Route path="dashboard/student" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="dashboard/faculty" element={
              <ProtectedRoute allowedRoles={['faculty']}>
                <FacultyDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="dashboard/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Curriculum routes */}
            <Route path="curriculum/upload" element={
              <ProtectedRoute allowedRoles={['faculty', 'admin']}>
                <CurriculumUpload />
              </ProtectedRoute>
            } />
            
            <Route path="curriculum/list" element={
              <ProtectedRoute allowedRoles={['student', 'faculty', 'admin']}>
                <CurriculumList />
              </ProtectedRoute>
            } />
            
            <Route path="curriculum/view/:id" element={
              <ProtectedRoute allowedRoles={['student', 'faculty', 'admin']}>
                <CurriculumView />
              </ProtectedRoute>
            } />
            
            <Route path="curriculum/search" element={
              <ProtectedRoute allowedRoles={['student', 'faculty', 'admin']}>
                <CurriculumSearch />
              </ProtectedRoute>
            } />
            
            {/* Default redirect */}
            <Route path="/" element={user ? <Navigate to={`/dashboard/${user.role}`} /> : <Navigate to="/login" />} />
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;