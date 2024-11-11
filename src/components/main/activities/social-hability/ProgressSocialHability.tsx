import { useEffect,useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { socialHabilityHistoryDto } from "../../../../types/activity/socialHability.dto";
import '../../../../assets/style/activities/ProgressSocialHability.css'

export const ProgressSocialHability = () => {
    const [historyPatient, setHistoryPatient]  = useState<Array<socialHabilityHistoryDto>>();
    const navigate = useNavigate();
    const {professionalId, patientId} = useParams();

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${import.meta.env.VITE_API_URL}social-hability/history/${professionalId}/${patientId}`);   
                const history: Array<socialHabilityHistoryDto> = await response.json();                
                setHistoryPatient(history);
            }
        )();
    },[]);

    const modifiedDate = (date:string) => {
        let newDate = new Date(date);
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let day = newDate.getDate();
        let hour = newDate.getHours()
        let minutes = newDate.getMinutes()
    
        return `${day}/${month}/${year} ${hour}:${minutes}`;
    };
    

    return (
        <main className="container-fluid d-flex">
                <div className="col-1 mt-1 ms-5">
                    <div role='button' onClick={() => navigate(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                        </svg>
                        <h6 className='ms-1'>Atrás</h6>
                    </div>
                </div>
            <div className="row">
                <div className="d-flex justify-content-center w-100 me-5">
                    <table className='text-center' id="myTable">
                        <thead>
                            <tr>
                                <th>Actividad</th>
                                <th>Complejidad</th>
                                <th>Respuesta</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td valign="top" width="200" align="center">    
                                <select style={{textTransform: "none"}} className="w-100 text-center" name="disorderId" id="">
                                    <option value="0">--</option>
                                    <option>Primera</option>
                                    <option>Ultima</option>
                                </select>
                            </td>
                            <td valign="top" width="150" align="center">
                                <select style={{textTransform: "none"}} className="w-100 text-center"  name="categoryId" id="">
                                    <option value="0">--</option>
                                    <option value="">Facíl</option>
                                    <option value="">Normal</option>
                                    <option value="">Dificíl</option>
                                </select>
                            </td>
                            <td valign="top" width="150" align="center">
                                <select style={{textTransform: "none"}} className="w-100 text-center"  name="categoryId" id="">
                                    <option value="0">--</option>
                                    <option value="">Correctas</option>
                                    <option value="">Incorrectas</option>
                                </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <section>
                    <div className="row">
                        <div className="col">
                            <div className="row justify-content-end text-end">
                                <h6>Respuesta incorrecta</h6>
                                <div className="recuadro responseIncorrect bg-danger">
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row justify-content-center text-center">
                                <h6>Respuesta correcta</h6>
                                <div className="recuadro bg-success">
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row justify-content-start text-start">
                                <h6>Respuesta del paciente</h6>
                                <div className="recuadro responseCorrect bg-primary">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row me-1 mt-5">
                        {
                            historyPatient?.map((history) => (
                                <div key={history.id} className="card mb-5">
                                    <div className="card-body text-center">
                                        <h6 className="card-text">{history.stage}</h6>
                                        <div className="list-group mt-5">
                                            {history.responses.map((option, index) => (
                                            <div key={index} className='d-flex'>
                                                <p className='mt-4 me-2'>{index + 1})</p>
                                                <button
                                                key={index}
                                                className={`text-white list-group-item list-group-item-action mt-3 mb-3 
                                                    ${index + 1 !== Number(history.correctResponse) && index + 1 !== history.answer ?'bg-danger': 
                                                        Number(history.correctResponse) == history.answer ? 'bg-primary' : 
                                                        index + 1 == Number(history.correctResponse) ? 'bg-success' : ''
                                                    }
                                                    ${index + 1 == history.answer ? 'bg-primary':''}
                                                    `}
                                                >
                                                {option}
                                                </button>
                                            </div>
                                            ))}
                                        </div>
                                        <div className='explanation p-2 mb-3'>
                                            <h6 className='mt-1'>{history.explanation}</h6>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <div className="d-flex align-items-center">
                                                <h6>Fechas:</h6>
                                                <p className="mt-2 ms-1 me-3">
                                                    {modifiedDate(history.createdAt)}
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <h6>Complejidad:</h6>
                                                <p className="mt-2 ms-1">{history.complexity}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </section>
            </div>
        </main> 
    )
};