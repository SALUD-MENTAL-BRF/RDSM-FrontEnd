import React from 'react'

import { Header } from '../components/headers/Header'
import { PersonalDiary } from '../components/personal-Diary/PersonalDiary'

export const PersonalDiaryPage:React.FC = () => {
  return (
    <>
      <Header />
      <PersonalDiary />
    </>
  )
}
