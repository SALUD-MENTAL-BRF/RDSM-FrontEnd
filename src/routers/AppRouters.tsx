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
import { SocialHabilityManagement } from "../pages/SocialHabilityManagement";
import { HospitalPanelPage } from "../pages/HospitalPanelPage";

export const AppRouters: React.FC = () => {
  const { authState } = useAuth();

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
          element={authState.isLogged ? <HomePage /> : <Navigate to={"/login"}/> }
        />
        <Route
          path="/profile"
          element={authState.isLogged ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
        <Route path="/information" element={<InfoMentalHealthPage />} />
        <Route
          path="/personalDiary"
          element={authState.isLogged ? <PersonalDiaryPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/chatbot"
          element={authState.isLogged ? <ChatbotPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/professionals"
          element={authState.isLogged ? <ProfessionalListPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/form-professional"
          element={authState.isLogged ? <FormProfessionalPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/consultation"
          element={authState.isLogged ? <ConsultationPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/profile-professional/:id"
          element={authState.isLogged ? <ProfileProfessionalPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/superAdmin"
          element={authState.isLogged ? <ProtectedRoute><SuperAdmin /></ProtectedRoute> : <Navigate to={"/login"} />}
        />
        <Route
          path="/hospital"
          element={authState.isLogged ? <ProtectedRoute><HospitalPanelPage /></ProtectedRoute> : <Navigate to={"/login"} />}
        />
        <Route
          path="/patient"
          element={authState.isLogged ? <PatientManagementPage /> : <Navigate to={"/login"} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route
          path="/information-patient/:id"
          element={
            <InfoPatientPage/> 
          }
        />
        <Route
          path="/form-patient/:id/:userId"
          element={
              <FormPatientPage/> 
          }
        />
        <Route
          path="/request-list"
          element={
            <RequestListPage/> 
          }
        />
        <Route
          path="/view-request/:professionalId/:requestId"
          element={
            <ViewRequestPatientPage/>
          }
        />
        <Route
          path="/management-activities/:patientId"
          element={
            <ManagementActivitiesPage/>
          }
        />
        <Route 
          path="/activity-list/:patientId/:professionalId"
          element={
            <AddActivityPage/>
          }
        />
        <Route
          path="/assigned-professionals/"
          element={
            <AssignedProfessionalsPage/>
          }
        />
        <Route
          path="/activities/:patientId/:professionalId"
          element={authState.isLogged ? <ActivitiesPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/play-activity/:patientId/:professionalId/:activityId"
          element={<PlayActivityPage/>}
        />
        <Route
          path="/social-hability/:section/:professionalId/:patientId"
          element={
              <SocialHabilityManagement/>
          }
        />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
