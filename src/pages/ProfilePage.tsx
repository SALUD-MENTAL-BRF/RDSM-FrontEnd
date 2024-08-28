import React from 'react'
import { Profile } from '../components/profile/Profile'
import { Header } from '../components/headers/Header'
import { Footer } from '../components/footer/Footer'

export const ProfilePage:React.FC = () => {
  return (
    <>
      <Header />
      <Profile />
      <Footer />
    </>
  )
}
