import React from 'react'

import { PersonalDiary } from '../components/personal-Diary/PersonalDiary'
import { Header } from '../components/headers/Header'
import { Footer } from '../components/footer/Footer'

export const PersonalDiaryPage:React.FC = () => {
  return (
    <>  

      <Header />

      <PersonalDiary />

      <Footer />
    </>
  )
}
