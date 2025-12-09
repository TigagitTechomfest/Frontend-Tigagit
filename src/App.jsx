// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// ✨ IMPORT HALAMAN RESET PASSWORD YANG BARU
import ResetPasswordPage from './pages/ResetPasswordPage';

// ✨ IMPORT HALAMAN FORGOT PASSWORD YANG BARU (INI YANG KURANG!)
import ForgotPasswordPage from './pages/ForgotPasswordPage';

import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FoodDiaryPage from './pages/FoodDiaryPage';
import ProgressPage from './pages/ProgressPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* ✨ ROUTE BARU: HALAMAN FORGOT PASSWORD (request reset link) */}
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* ✨ ROUTE INI UNTUK HALAMAN RESET PASSWORD DARI LINK EMAIL */}
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/food-diary"
              element={
                <ProtectedRoute>
                  <FoodDiaryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <ProgressPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;