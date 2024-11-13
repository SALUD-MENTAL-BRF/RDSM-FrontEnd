import React, { useState } from 'react';
import { SocialHability } from '../components/main/activities/social-hability/SocialHability';
import { useParams } from 'react-router-dom';
import { Header } from '../components/headers/Header';
import { useNavigate } from 'react-router-dom';

export const PlayActivityPage = () => {
  const navigate = useNavigate()
  const {activityId} = useParams()

  return (
    <>
      <Header/>
      <main className='conteiner-fluid'>
        <div className="col-1 mt-1 ms-5">
            <div role='button' onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                </svg>
                <h6 className='ms-1'>Atrás</h6>
            </div>
        </div>
      
      {
        activityId == "3" ? <SocialHability/> :
        activityId == "4" ?"":
            <h6 className='text-center mt-5'>Actividad no disponible</h6>
      }
      </main>
    </>
  );
}