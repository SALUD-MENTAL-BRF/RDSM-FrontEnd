import React, { useState, useEffect, ChangeEvent } from 'react';
import { CustomFetch } from '../../../../api/CustomFetch';
import { useParams } from 'react-router-dom';
import '../../../../assets/style/activities/HabilitySocial.css'
import { patientDto } from '../../../../types/patients.dto';
import { fetchSocialHability } from './fetchSocialHability';
import { socialHabilityResponseDto } from '../../../../types/activity/socialHability.dto';

type Scenario = {
  id: number;
  description: string;
  options: string[];
  feedback: string[];
};

const scenarios: Scenario[] = [
  {
    id: 1,
    description: "Estás en una fiesta y ves a alguien que te interesa. ¿Cómo te acercas?",
    options: [
      "Te acercas directamente y te presentas.",
      "Esperas a que la persona esté sola y luego te acercas.",
      "Le pides a un amigo que te presente.",
      "No te acercas y esperas que la otra persona dé el primer paso."
    ],
    feedback: [
      "¡Bien! Mostraste confianza y iniciativa.",
      "Es una opción segura, pero podrías perder la oportunidad si esperas demasiado.",
      "Buena estrategia para romper el hielo de manera más cómoda.",
      "Ser proactivo suele dar mejores resultados en situaciones sociales."
    ]
  },

];

export const SocialHability= () => {
  const [selectStage, setSelectStage] = useState<string>("")
  const [genrePatient, setGenrePatient] = useState<string>()
  const {patientId, activityId} = useParams()
  const [activityState, setActivityState] = useState<boolean>(false)
  const [responseAI, setResponseAI] = useState<socialHabilityResponseDto>({
    escenario: "",
    correcta: "",
    respuestas: []
  })

  const handleStageSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectStage(e.target.value)
  };


  const initGame = async () => {
    if (selectStage.length < 1){
      return alert("No se selecciono ningun escenario.")
    }
    setActivityState(true)
    const response = await fetchSocialHability(genrePatient!, selectStage)
    if (response.escenario){
      setResponseAI(response)
    }
    
  }

  const stopGame = async () => {
    setActivityState(false)
    setResponseAI({correcta:"",escenario:"",respuestas:[]})
  }

  useEffect(() => {
    ( 
      async () => {
        const patient = await CustomFetch(`${import.meta.env.VITE_API_URL}patient/${patientId}`, 'GET');
       setGenrePatient(patient.genre)
        
      }
    )()
  },[])

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Habilidades Sociales</h1>
      <div className="card mb-5 contaner-stage">
        {
           !activityState ? 
            <div className='container-initActivity '>
  
            <div className='row d-flex justify-content-center w-100 h-100'>
                <div className='select-stage ms-2'>
                    <select onChange={handleStageSelect} name="" id="">
                      <option value="">Selecciona un escenario...</option>
                      <option value="la escuela">Escuela</option>
                      <option value="el trabajo">Trabajo</option>
                      <option value="al azar">Al azar</option>
                    </select>
                </div>
                    <div className='text-center'>
                      <button onClick={initGame} className='btn btn-primary me-2 mt-2'>Iniciar</button>
                    </div>
                </div> 
            </div>
           :
            responseAI.escenario.length < 1 ? 
            <div className='text-center'>
              <h6 className='mt-5'>Cargando...</h6>
              <button onClick={stopGame} className='btn btn-outline-danger'>Cancelar</button>
            </div> : 

            <div className="card-body text-center">
              <div className='text-end'>
                <svg onClick={stopGame} role='button' xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-stop-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5z"/>
                </svg>
              </div>
              {/* <h5 className="card-title">Escenario {scenario.id}</h5> */}
              <h6 className="card-text">{responseAI.escenario}</h6>
              <div className="list-group mt-5">
                {responseAI.respuestas.map((option, index) => (
                  <button
                    key={index}
                    className={`list-group-item list-group-item-action mt-3 mb-3`}
                    // onClick={() => handleOptionSelect(index)}
                    // ${selectedOption === index ? 'active' : ''
                  >
                    {option}
                  </button>
                ))}
              </div>
          </div>
        }


      </div>
    </div>
  );
}