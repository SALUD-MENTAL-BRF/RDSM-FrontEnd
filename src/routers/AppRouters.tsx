import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage'
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';
import { HomePage } from '../pages/HomePage';
import {InfoMentalHealthPage} from '../pages/InfoMentalHealthPage'

export const AppRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        {/* <Route path='/patient' element={<PanelPatient/>} /> */}
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/information' element={<InfoMentalHealthPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};
