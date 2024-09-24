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
import { InfoPatientPage } from "../pages/InfoPatientPage";
import { FormPatientPage } from "../pages/FormPatientPage";
import { PatientManagementPage } from "../pages/PatientManagementPage";
import { ActivitiesPage } from "../pages/ActivitiesPage";
import { RequestListPage } from "../pages/RequestListPage";
// Definir constante para los roles
const ROLE_SUPERADMIN = parseInt(import.meta.env.VITE_ROLE_ADMIN);

export const AppRouters: React.FC = () => {
  const { authState } = useAuth();

  console.log(authState.isLogged);

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
            <ProtectedRoute requiredRoleId={ROLE_SUPERADMIN}>
              <SuperAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient"
          element={
            <ProtectedRoute>
             <PatientManagementPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <ActivitiesPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/information-patient"
          element={
            <ProtectedRoute>
              <InfoPatientPage/> 
            </ProtectedRoute> 
          }
        />
        <Route
          path="/form-patient/:id/:userId"
          element={
            <ProtectedRoute>
              <FormPatientPage/> 
            </ProtectedRoute>
          }
        />
        <Route
          path="/request-list"
          element={
            <ProtectedRoute>
              <RequestListPage/> 
            </ProtectedRoute>
          }
        />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
