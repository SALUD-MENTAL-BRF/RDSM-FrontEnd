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
import { ViewRequestPatientPage } from "../pages/ViewRequestPatientPage";
import { ManagementActivitiesPage } from "../pages/ManagementActivitiesPage";
import { AddActivityPage } from "../pages/AddActivityPage";
import { AssignedProfessionalsPage } from "../pages/AssignedProfessionalsPage";
import { PlayActivityPage } from "../pages/PlayActivityPage";
import { OptionActivitiesPage } from "../pages/OptionsActivitiesPage";
// import { DerivarPage } from "../pages/DerivarPage";
import { DashboarActivitiesPage } from "../pages/DashboardActivitiesPage";


// const ROLE_SUPERADMIN = parseInt(import.meta.env.VITE_ROLE_ADMIN);
import { HospitalPanelPage } from "../pages/HospitalPanelPage";
import VideoCallRoom from "../pages/VideoCallRoom";
import { FormRequestForCall } from "../components/videocall/FormRequestForCall";
import { SeeConsultations } from "../components/seeconsultations/SeeConsultations";
import { ProfessionalSeeConsultations } from "../components/seeconsultations/ProfessionalSeeConsultations";
import { ChatPatient } from "../components/main/chat/ChatPatient";
import { ChatProfessional } from "../components/main/chat/ChatProfessional";

export const AppRouters: React.FC = () => {
  const { authState } = useAuth();
  const VITE_ROLE_ADMIN = import.meta.env.VITE_ROLE_ADMIN
  const VITE_ROLE_PATIENT = import.meta.env.VITE_ROLE_PATIENT
  const VITE_ROLE_PROFESSIONAL = import.meta.env.VITE_ROLE_PROFESSIONAL
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
        <Route
          path="/information"
          element={
            <ProtectedRoute>
              <InfoMentalHealthPage />
            </ProtectedRoute>
          }
        />
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
              <ProtectedRoute VITE_ROLE_PROFESSIONAL={VITE_ROLE_PROFESSIONAL}>
                <PatientManagementPage />
              </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route
          path="/information-patient/:id"
          element={
              <ProtectedRoute VITE_ROLE_PROFESSIONAL={VITE_ROLE_PROFESSIONAL}>
                <InfoPatientPage />
              </ProtectedRoute>
          }
        />
        <Route
          path="/form-patient/:id/:userId"
          element={
              <ProtectedRoute>
                <FormPatientPage />
              </ProtectedRoute>
          }
        />
        <Route
          path="/request-list"
          element={
              <ProtectedRoute VITE_ROLE_PROFESSIONAL={VITE_ROLE_PROFESSIONAL}>
                <RequestListPage />
              </ProtectedRoute>
          }
        />
        <Route
          path="/view-request/:professionalId/:requestId"
          element={
              <ProtectedRoute VITE_ROLE_PROFESSIONAL={VITE_ROLE_PROFESSIONAL}>
                <ViewRequestPatientPage />
              </ProtectedRoute>
          }
        />
        <Route
          path="/management-activities/:patientId"
          element={
              <ProtectedRoute VITE_ROLE_PROFESSIONAL={VITE_ROLE_PROFESSIONAL}>
                <ManagementActivitiesPage />
              </ProtectedRoute>

          }
        />
        <Route
          path="/activity-list/:patientId/:professionalId"
          element={
              <ProtectedRoute VITE_ROLE_PROFESSIONAL={VITE_ROLE_PROFESSIONAL}>
                <AddActivityPage />
              </ProtectedRoute>
          }
        />
        <Route
          path="/assigned-professionals/"
          element={
              <ProtectedRoute VITE_ROLE_PATIENT={VITE_ROLE_PATIENT}>
                <AssignedProfessionalsPage />
              </ProtectedRoute>
          }
        />
        <Route
          path="/chat/patient/:patientId/:professionalId"
          element={
              <ProtectedRoute VITE_ROLE_PATIENT={VITE_ROLE_PATIENT}>
                <ChatPatient />
              </ProtectedRoute>
          }
        />
        <Route
          path="/chat/professional/:patientId/:professionalId"
          element={
              <ProtectedRoute VITE_ROLE_PROFESSIONAL={VITE_ROLE_PROFESSIONAL}>
                <ChatProfessional />
              </ProtectedRoute>
          }
        />
        <Route
          path="/meeting/:patientId/:professionalId"
          element={
              <ProtectedRoute>
                <VideoCallRoom />
              </ProtectedRoute>
          }
        />
        <Route
          path="/request-for-call/:patientId/:professionalId"
          element={
              <ProtectedRoute VITE_ROLE_PROFESSIONAL={VITE_ROLE_PATIENT}>
                <FormRequestForCall />
              </ProtectedRoute>
          }
        />
        <Route
          path="/seeconsultations/:patientId/:professionalId"
          element={
              <ProtectedRoute VITE_ROLE_PROFESSIONAL={VITE_ROLE_PATIENT}>
                <SeeConsultations />
              </ProtectedRoute>
          }
        />
        <Route
          path="/Hola/:professionalId/:patientId"
          element={
              <ProtectedRoute VITE_ROLE_PROFESSIONAL={VITE_ROLE_PROFESSIONAL}>
                <ProfessionalSeeConsultations />
              </ProtectedRoute>
          }
        />
        <Route
          path="/activities/:patientId/:professionalId"
          element={
              <ProtectedRoute VITE_ROLE_PROFESSIONAL={VITE_ROLE_PATIENT}>
                <ActivitiesPage />
              </ProtectedRoute>

          }
        />
        <Route
          path="/play-activity/:patientId/:professionalId/:activityId"
          element={
              <ProtectedRoute VITE_ROLE_PATIENT={VITE_ROLE_PATIENT}>
                <PlayActivityPage />
              </ProtectedRoute>
          }
        />
        <Route
          path="/requestForCall"
          element={
              <ProtectedRoute VITE_ROLE_PATIENT={VITE_ROLE_PATIENT}>
                <FormRequestForCall />
              </ProtectedRoute>
          }
        />
        <Route
          path="/options-activity/:activityId/:section/:professionalId/:patientId"
          element={
              <ProtectedRoute VITE_ROLE_PROFESSIONAL={VITE_ROLE_PROFESSIONAL}>
                <OptionActivitiesPage />
              </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-activities/:patientId"
          element={
              <ProtectedRoute VITE_ROLE_PROFESSIONAL={VITE_ROLE_PROFESSIONAL}>
                <DashboarActivitiesPage />
              </ProtectedRoute>
          }
        />
        {/* <Route
          path="/derivar/:professionalId/:patientId"
          element={
            <ProtectedRoute VITE_ROLE_PROFESSIONAL={VITE_ROLE_PROFESSIONAL}>
              <DerivarPage/>
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};
