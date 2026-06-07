// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import { BrandMark } from './components/common/AgileUI';
import PageTransition from './components/common/PageTransition';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import ProfileBuilderPage from './pages/auth/ProfileBuilderPage';
import DashboardHomePage from './pages/dashboard/DashboardHomePage';
import ProjectsPage from './pages/dashboard/ProjectsPage';
import ProjectDetailPage from './pages/dashboard/ProjectDetailPage';
import DiscoverPage from './pages/dashboard/DiscoverPage';
import ChatPage from './pages/dashboard/ChatPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import SupportPage from './pages/dashboard/SupportPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfileBuilder from './pages/profile/ProfileBuilder';
import EditProfile from './pages/profile/EditProfile';

function AnimatedRoutes() {
  const { currentUser } = useAuth();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={!currentUser ? <PageTransition><LandingPage /></PageTransition> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!currentUser ? <PageTransition><LoginPage /></PageTransition> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!currentUser ? <PageTransition><SignUpPage /></PageTransition> : <Navigate to="/dashboard" />} />
        <Route path="/forgot-password" element={!currentUser ? <PageTransition><ForgotPasswordPage /></PageTransition> : <Navigate to="/dashboard" />} />
        <Route path="/reset-password" element={!currentUser ? <PageTransition><ResetPasswordPage /></PageTransition> : <Navigate to="/dashboard" />} />
        
        {/* Profile Builder */}
        <Route path="/profile-builder" element={currentUser ? <PageTransition><ProfileBuilderPage /></PageTransition> : <Navigate to="/login" />} />
        <Route path="/profile/setup" element={<PageTransition><ProfileBuilder /></PageTransition>} />
        <Route path="/profile/edit" element={<PageTransition><EditProfile /></PageTransition>} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={currentUser ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<PageTransition><DashboardHomePage /></PageTransition>} />
          <Route path="projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
          <Route path="projects/:id" element={<PageTransition><ProjectDetailPage /></PageTransition>} />
          <Route path="chat" element={<PageTransition><ChatPage /></PageTransition>} />
          <Route path="discover" element={<PageTransition><DiscoverPage /></PageTransition>} />
          <Route path="settings" element={<PageTransition><SettingsPage /></PageTransition>} />
          <Route path="support" element={<PageTransition><SupportPage /></PageTransition>} />
        </Route>

        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1f1f1f]">
        <div className="text-center">
          <BrandMark size="lg" className="mx-auto mb-4 animate-pulse" />
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#3fbe8c]">Loading AgileAtlas</p>
        </div>
      </div>
    );
  }

  return <AnimatedRoutes />;
}

export default function App() {
  return <AppContent />;
}
