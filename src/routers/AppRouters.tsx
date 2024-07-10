import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';
import { HomePage } from '../pages/HomePage';
import { InfoMentalHealthPage } from '../pages/InfoMentalHealthPage';
import { AuthContext } from '../context/AuthProvider';

export const AppRouters: React.FC = () => {
  const { authState }: any = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={authState.islogged ? <Navigate to='/home' replace={true}/> : <RegisterPage />} />
        <Route path="/login" element={authState.islogged ? <Navigate to='/home' replace={true} /> : <LoginPage />} />
        <Route path="/home" element={authState.islogged ? <HomePage /> : <Navigate to='/register' replace={true} />} />
        <Route path="/profile" element={ authState.islogged ? <ProfilePage /> : <Navigate to='/register' replace={true} />} />
        <Route path="/information" element={authState.islogged ? <InfoMentalHealthPage /> : <Navigate to='/register' replace={true} />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
