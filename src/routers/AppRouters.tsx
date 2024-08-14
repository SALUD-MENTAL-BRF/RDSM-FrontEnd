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


export const AppRouters: React.FC = () => {

  const {authState} = useAuth()


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/register"
          element={authState.isLogged ? <Navigate to={"/home"} /> : <RegisterPage />}
          
        />
        <Route
          path="/login"
          element={authState.isLogged ? <Navigate to={"/home"} /> : <LoginPage />}
        />
          <Route
            path="/home"
            element={authState.isLogged ? <HomePage /> : <Navigate to={"/login"} />}

          />
        <Route
          path="/profile"
          element={authState.isLogged ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/information"
          element={
            authState.isLogged ? <InfoMentalHealthPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/personalDiary"
          element={
            authState.isLogged ? <PersonalDiaryPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/chatbot"
          element={
            authState.isLogged ? <ChatbotPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/professionals"
          element={
            authState.isLogged ? <ProfessionalListPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/form-professional"
          element={
            authState.isLogged ? <FormProfessionalPage /> : <Navigate to={"/login"} />
          }
        />
                <Route
          path="/consultation"
          element={
            authState.isLogged ? <ConsultationPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/profile-professional"
          element={
            authState.isLogged ? <ProfileProfessionalPage/> : <Navigate to={"/login"}/>
          }
        />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
