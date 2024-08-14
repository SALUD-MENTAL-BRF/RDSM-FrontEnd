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
import { SuperAdmin } from "../pages/SuperAdmin";

export const AppRouters: React.FC = () => {
  const { isLogged } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/register"
          element={isLogged ? <Navigate to={"/home"} /> : <RegisterPage />}
          
        />
        <Route
          path="/login"
          element={isLogged ? <Navigate to={"/home"} /> : <LoginPage />}
        />
          <Route
            path="/home"
            element={isLogged ? <HomePage /> : <Navigate to={"/login"} />}

          />
        <Route
          path="/profile"
          element={isLogged ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/information"
          element={
            isLogged ? <InfoMentalHealthPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/personalDiary"
          element={
            isLogged ? <PersonalDiaryPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/chatbot"
          element={
            isLogged ? <ChatbotPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/professionals"
          element={
            isLogged ? <ProfessionalListPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/form-professional"
          element={
            isLogged ? <FormProfessionalPage /> : <Navigate to={"/login"} />
          }
        />
                <Route
          path="/consultation"
          element={
            isLogged ? <ConsultationPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/prueba"
          element={<SuperAdmin/>}
        />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
