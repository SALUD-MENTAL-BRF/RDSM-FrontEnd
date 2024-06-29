import { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage'
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';
import { HomePage } from '../pages/HomePage';
import {InfoMentalHealthPage} from '../pages/InfoMentalHealthPage'
import { AuthContext } from '../context/AuthProvider'

export const AppRouters = () => {
  const { authState }: any = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/register' element={authState ? <HomePage /> : <RegisterPage />}/>
        <Route path='/login' element={authState ? <HomePage /> : <LoginPage />}/>
        {/* <Route path='/patient' element={<PanelPatient/>} /> */}
        <Route path='/home' element={authState ? <HomePage /> : <LoginPage />}/>
        <Route path='/profile' element={authState ? <ProfilePage /> : <LoginPage />} />
        <Route path='/information' element={authState ? <InfoMentalHealthPage/> : <LoginPage />}/>
      </Routes>
    </BrowserRouter>
  );
};
