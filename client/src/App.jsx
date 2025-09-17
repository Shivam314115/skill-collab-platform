import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import OtpPage from './pages/auth/OtpPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import ProfileBuilderPage from './pages/auth/ProfileBuilderPage';
import DashboardHomePage from './pages/dashboard/DashboardHomePage';
import ProjectsPage from './pages/dashboard/ProjectsPage';
import ProjectDetailPage from './pages/dashboard/ProjectDetailPage';
import DiscoverPage from './pages/dashboard/DiscoverPage';
import ChatPage from './pages/dashboard/ChatPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import SupportPage from './pages/dashboard/SupportPage';

// Move ProtectedRoute logic here
const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />

                {/* Authentication Routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/otp" element={<OtpPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/profile-builder" element={<ProfileBuilderPage />} />
                </Route>

                {/* Protected Dashboard Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                    <Route index element={<DashboardHomePage />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="projects/:projectId" element={<ProjectDetailPage />} />
                    <Route path="discover" element={<DiscoverPage />} />
                    <Route path="chat" element={<ChatPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="support" element={<SupportPage />} />
                </Route>

                {/* Catch-all for undefined routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AuthProvider>
    );
}