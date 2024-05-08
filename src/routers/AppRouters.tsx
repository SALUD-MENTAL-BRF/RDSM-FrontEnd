import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { RegisterPage } from '../pages/RegisterPage'

export const AppRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />}/>
      </Routes>
    </BrowserRouter>
  )
}
