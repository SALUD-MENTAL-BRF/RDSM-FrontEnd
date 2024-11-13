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
    <div className="card mb-5">
      <div className="card-body">
        {!activityState ? (
          <div className="container-initActivity">
            <div className="row g-3">
              <div className="col-md-6">
                <select className="form-select" disabled>
                  <option>{settingState ? settingState.genre : "Configuración del profesional"}</option>
                </select>
              </div>
              <div className="col-md-6">
                <select className="form-select" disabled>
                  <option>{settingState ? settingState.age : "Configuración del profesional"}</option>
                </select>
              </div>
              <div className="col-md-6">
                <select className="form-select" disabled>
                  <option>{settingState ? settingState.personality : "Configuración del profesional"}</option>
                </select>
              </div>
              <div className="col-md-6">
                <select className="form-select" disabled>
                  <option>{settingState ? settingState.complexity : "Configuración del profesional"}</option>
                </select>
              </div>
              <div className="col-md-6">
                <select className="form-select" onChange={handleStageSelect} value={selectStage}>
                  <option value="">Selecciona un escenario...</option>
                  <option value="la escuela">Escuela</option>
                  <option value="el trabajo">Trabajo</option>
                  <option value="al azar">Al azar</option>
                </select>
              </div>
              <div className="col-12 text-center">
                <button onClick={initGame} className="btn btn-primary">Iniciar</button>
              </div>
            </div>
          </div>
        ) : responseAI.escenario.length < 1 ? (
          <div className="text-center">
            <h6 className="mt-5">Cargando...</h6>
            <button onClick={stopGame} className="btn btn-outline-danger">Cancelar</button>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-end mb-3">
              <button onClick={stopGame} className="btn btn-outline-danger">
                <i className="bi bi-stop-circle-fill"></i> Detener
              </button>
            </div>
            <h6 className="card-text mb-4">{responseAI.escenario}</h6>
            <div className="list-group">
              {responseAI.respuestas.map((option, index) => (
                <button
                  key={index}
                  className={`list-group-item list-group-item-action mb-2 ${responseSelected === index + 1 ? 'active' : ''}
                    ${!confirmResponse ? "" : index + 1 == Number(responseAI.correcta) ? "list-group-item-success" : "list-group-item-danger"}
                  `}
                  onClick={() => selectResponse(index)}
                >
                  {index + 1}) {option}
                </button>
              ))}
            </div>
            {confirmResponse && (
              <div className="alert alert-info mt-3" role="alert">
                <h6 className="alert-heading">Explicación:</h6>
                <p>{responseAI.explicacion}</p>
              </div>
            )}
            <div className="mt-3">
              {!confirmResponse && (
                <button onClick={saveResponse} className="btn btn-primary">Confirmar</button>
              )}
              {confirmResponse && (
                <button className="btn btn-info" onClick={initGame}>Siguiente</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}