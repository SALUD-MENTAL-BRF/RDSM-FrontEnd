import React, { useState, useEffect, ChangeEvent } from 'react';
import { CustomFetch } from '../../../../api/CustomFetch';
import { useParams } from 'react-router-dom';

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
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectStage, setSelectStage] = useState<string>("")
  // const {patientId, activityId} = useParams()

  const handleStageSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectStage(e.target.value)
    console.log(e.target.value);
    
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      alert("¡Has completado todos los escenarios!");
    }
  };

  const scenario = scenarios[currentScenario];

  const initGame = () => {

    
  }

  useEffect(() => {
    ( 
      async () => {
        // const patient = await CustomFetch(`${import.meta.env.VITE_API_URL}patient/${patientId}`, 'GET');
        // console.log(patient);
        
      }
    )()
  },[])

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Habilidades Sociales</h1>
      <div className="card">
          <div className='row'>
              <div className='col ms-2'>
                <select onChange={handleStageSelect} name="" id="">
                  <option value="">Selecciona un escenario...</option>
                  <option value="Escuela">Escuela</option>
                  <option value="Trabajo">Trabajo</option>
                </select>
              </div>
              <div className='col text-end'>
                <button className='btn btn-primary me-2 mt-2'>Iniciar</button>
              </div>
          </div>
        {/* <div className="card-body">
          <h5 className="card-title">Escenario {scenario.id}</h5>
          <p className="card-text">{scenario.description}</p>
          <div className="list-group mt-3">
            {scenario.options.map((option, index) => (
              <button
                key={index}
                className={`list-group-item list-group-item-action ${selectedOption === index ? 'active' : ''}`}
                onClick={() => handleOptionSelect(index)}
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className="alert alert-info mt-3" role="alert">
              {scenario.feedback[selectedOption!]}
            </div>
          )}
          {showFeedback && (
            <button className="btn btn-primary mt-3" onClick={nextScenario}>
              Siguiente Escenario
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
}