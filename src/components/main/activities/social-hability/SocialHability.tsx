import { useState, useEffect, ChangeEvent } from 'react';
import { CustomFetch } from '../../../../api/CustomFetch';
import { useParams } from 'react-router-dom';
import '../../../../assets/style/activities/HabilitySocial.css'
import { fetchSocialHability } from './fetchSocialHability';
import { socialHabilityResponseDto } from '../../../../types/activity/socialHability.dto';
import { socialHabilitySettingDto } from '../../../../types/activity/socialHability.dto';
import Swal from 'sweetalert2';

export const SocialHability= () => {
  const [selectStage, setSelectStage] = useState<string>("");
  const {patientId,professionalId} = useParams();
  const [activityState, setActivityState] = useState<boolean>(false);
  const [responseAI, setResponseAI] = useState<socialHabilityResponseDto>({
    escenario: "",
    correcta: "",
    respuestas: [],
    explicacion:""
  });
  const [responseSelected, setResponseSelected] = useState<number>(0);
  const [confirmResponse, setConfirmResponse] = useState<boolean>(false);
  const [settingState, setSettingState] = useState<socialHabilitySettingDto>();


  const handleStageSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectStage(e.target.value)
  };


  const initGame = async () => {
    if(!settingState){
      return Swal.fire({
        title: "Error",
        text: "La configuración esta incompleta, consulta a tu profesional asignado para solucionarlo.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ok",
      })
    }
    if (selectStage.length < 1){
      return Swal.fire({
        title: "Error",
        text: "No se seleccionó algún escenario.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ok",
      })
    }
    setActivityState(true)
    setResponseAI({correcta:"",escenario:"",respuestas:[], explicacion: ""})
    setConfirmResponse(false)
    setResponseSelected(0)

    const response = await fetchSocialHability({...settingState,stage:selectStage})
    
    if (response.escenario){
      setResponseAI(response)
    }
  }

  const selectResponse = (index: number) => {
    setResponseSelected(index + 1) 
    console.log(responseAI);
    
  }

  const stopGame = async () => {
    setResponseSelected(0)
    setActivityState(false)
    setResponseAI({correcta:"",escenario:"",respuestas:[], explicacion: ""})
    setConfirmResponse(false)
  }

  useEffect(() => {
    ( 
      async () => {
        const setting:socialHabilitySettingDto = await CustomFetch(`${import.meta.env.VITE_API_URL}social-hability/setting/${professionalId}/${patientId}`, 'GET');
        setSettingState(setting);   
      }
    )()
  },[])

  const saveResponse = async () => {
    if(responseSelected == 0){
      return Swal.fire({
        title: "Error",
        text: "No se seleccionó una respuesta",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ok",
      });
    };
    setConfirmResponse(true);

    const save = await fetch(`${import.meta.env.VITE_API_URL}social-hability/history/${professionalId}/${patientId}`,{
      method:'POST',
      body: JSON.stringify({
        stage:responseAI.escenario,
        responses: responseAI.respuestas,
        answer: responseSelected,
        correctResponse: responseAI.correcta,
        explanation: responseAI.explicacion,
        complexity: settingState?.complexity
      }),
      headers: {
        'content-type':'application/json'
      }
    });

    const data = await save.json();

    console.log(data);
    
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Habilidades Sociales</h1>
      <div className="card mb-5 contaner-stage">
        {
           !activityState ? 
            <div className='container-initActivity '>
              <div className='row'>
                  <div className='row d-flex justify-content-center'>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 container-select-socialHability'>
                        <select disabled className='select-socialHability text-center' name="" id="">
                          {
                            settingState ? <option value="">{settingState.genre}</option> :<option value="">Configuración del profesional</option>
                          }
                        </select>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 container-select-socialHability'>
                        <select disabled className='select-socialHability text-center' name="" id="">
                        {
                            settingState ? <option value="">{settingState.age}</option> :<option value="">Configuración del profesional</option>
                        }
                      </select>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 container-select-socialHability'>
                      <select disabled className='select-socialHability text-center' name="" id="">
                          {
                            settingState ? <option value="">{settingState.personality}</option> :<option value="">Configuración del profesional</option>
                          }
                      </select>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 container-select-socialHability'>
                      <select disabled className='select-socialHability text-center' name="" id="">
                          {
                            settingState ? <option value="">{settingState.complexity}</option> :<option value="">Configuración del profesional</option>
                          }
                      </select>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 container-select-socialHability ms-2'>
                        <select className='select-socialHability' onChange={handleStageSelect} name="" id="">
                          <option value="">Selecciona un escenario...</option>
                          <option value="la escuela">Escuela</option>
                          <option value="el trabajo">Trabajo</option>
                          <option value="al azar">Al azar</option>
                        </select>
                    </div>
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
              <h6 className="card-text">{responseAI.escenario}</h6>
              <div className="list-group mt-5">
                {responseAI.respuestas.map((option, index) => (
                  <div key={index} className='d-flex'>
                    <p className='mt-4 me-2'>{index + 1})</p>
                    <button
                      key={index}
                      className={`list-group-item list-group-item-action mt-3 mb-3 ${responseSelected === index + 1 ? 'active' : ''}
                        ${!confirmResponse  ? "" : index + 1  == Number(responseAI.correcta) ? "bg-success"  :"bg-danger" }

                      `}
                      onClick={() => selectResponse(index)}
                    >
                      {option}
                    </button>
                  </div>
                ))}
              </div>
              { 
              confirmResponse ?    
                <div className='bg-info rounded-4 p-2 mb-3'>
                  <h6 className='mt-1'>{responseAI.explicacion}</h6>
                </div>
                :""
              }
               {confirmResponse ? "" :<button onClick={saveResponse} className='btn btn-primary'>Confimar</button>}
               {confirmResponse ? <button className='btn btn-info ms-1' onClick={initGame}>Siguiente</button> : ""}
               
          </div>
        }
      </div>
    </div>
  );
}