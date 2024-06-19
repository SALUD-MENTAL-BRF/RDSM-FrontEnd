import { LandingPage } from '../pages/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { Home } from '../pages/Home';
import {InfoMentalHealth} from '../pages/InfoMentalHealth'

export const AppRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/information' element={<InfoMentalHealth/>}/>
      </Routes>
    </BrowserRouter>
  );
};
