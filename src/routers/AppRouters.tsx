import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";
import { HomePage } from "../pages/HomePage";
import { InfoMentalHealthPage } from "../pages/InfoMentalHealthPage";
import { PersonalDiaryPage } from "../pages/PersonalDiaryPage";
import useAuth from "../hooks/useAuth";
import { ChatbotPage } from "../pages/ChatbotPage";
import { ProfessionalListPage } from "../pages/ProfessionalsListPage";
import { FormProfessionalPage } from "../pages/FormProfessionalPage";
import { ConsultationPage } from "../pages/ConsultationPage";
import { ProfileProfessionalPage } from "../pages/ProfileProfessionalPage";
import { SuperAdmin } from "../pages/SuperAdmin";
import ProtectedRoute from "./ProtectedRoute";
import { PatientManagementPage } from "../pages/PatientManagementPage";
import { ActivitiesPage } from "../pages/ActivitiesPage";
import { HospitalPanelPage } from "../pages/HospitalPanelPage";

export const AppRouters: React.FC = () => {
  const { authState } = useAuth();
  const VITE_ROLE_ADMIN = import.meta.env.VITE_ROLE_ADMIN
  const VITE_ROLE_HOSPITAL = import.meta.env.VITE_ROLE_HOSPITAL

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/register"
          element={authState.isLogged ? <Navigate to="/home" /> : <RegisterPage />}
        />
        <Route
          path="/login"
          element={authState.isLogged ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
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
        <Route path="/information" element={<InfoMentalHealthPage />} />
        <Route
          path="/personalDiary"
          element={
            <ProtectedRoute>
              <PersonalDiaryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <ChatbotPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professionals"
          element={
            <ProtectedRoute>
              <ProfessionalListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/form-professional"
          element={
            <ProtectedRoute>
              <FormProfessionalPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consultation"
          element={
            <ProtectedRoute>
              <ConsultationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile-professional/:id"
          element={
            <ProtectedRoute>
              <ProfileProfessionalPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superAdmin"
          element={
            <ProtectedRoute VITE_ROLE_ADMIN={VITE_ROLE_ADMIN}>
              <SuperAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital"
          element={
            <ProtectedRoute VITE_ROLE_HOSPITAL={VITE_ROLE_HOSPITAL}>
              <HospitalPanelPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient"
          element={
            <ProtectedRoute>
              <PatientManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <ActivitiesPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
