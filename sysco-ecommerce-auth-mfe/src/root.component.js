import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthAccessRoute from './AuthAccessRoute';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import EmailVerificationScreen from './screens/EmailVerificationScreen';
import AdminAccess from './AdminAccess';
import AdminScreen from './screens/AdminScreen';

const AuthApp = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route 
          path="login" 
          element={
            <AuthAccessRoute>
              <LoginScreen />
            </AuthAccessRoute>
          } 
        />
        <Route 
          path="signup" 
          element={
            <AuthAccessRoute>
              <SignupScreen />
            </AuthAccessRoute>
          } 
        />
        <Route 
          path="admin" 
          element={
            
        <AdminScreen />
            
          } 
        />
        <Route 
          path="verify" 
          element={
            <AuthAccessRoute>
              <EmailVerificationScreen />
            </AuthAccessRoute>
          } 
        />
        <Route 
          path="*" 
          element={<Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default AuthApp;