import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';
import { HomePage } from '../pages/HomePage';
import { InfoMentalHealthPage } from '../pages/InfoMentalHealthPage';
import { PersonalDiaryPage } from '../pages/PersonalDiaryPage';
import useAuth from '../hooks/useAuth';

export const AppRouters: React.FC = () => {

  const { isLogged } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={ <RegisterPage />  } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={ <ProfilePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/information" element={<InfoMentalHealthPage />} />
        <Route path="/personalDiary" element={<PersonalDiaryPage />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
