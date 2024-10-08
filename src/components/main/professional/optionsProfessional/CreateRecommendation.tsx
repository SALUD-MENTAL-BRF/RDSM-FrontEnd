import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { recomendationDto } from "../../../../types/recomendation.dto"
import Swal from "sweetalert2"
import useAuth from "../../../../hooks/useAuth"
import { Professional } from "../../../../types/profileProfessional.dto"

export const CreateRecommendation= () => {
    const navigate = useNavigate()
    const {authState} = useAuth()
    const [formState, setFormSate] = useState<recomendationDto>({
        description:"",
        title: ""
    }) 
    const {patientId} = useParams()
    const [professionalState, setProfessionalState] = useState<Professional>()
    const [recommendationState, setRecommendationState] = useState<Array<recomendationDto>>()

    const createRecommendation = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}recommendation/${patientId}/${professionalState?.id}`,{
            method: 'POST',
            body: JSON.stringify(formState),
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json()

        if(data.statusCode == 400){
            return Swal.fire({
              title: "Error",
              text: data.message[0],
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "ok",
            })
          }
          
      
         return Swal.fire({
            title: "Enviado",
            text: "Recomendación creada.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ok",
        }).then(async () => {
              setFormSate({
                        description:"",
                        title: ""
              })
              await findRecommendations(Number(patientId!), professionalState?.id!)
        })
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setFormSate(prevState => ({
            ...prevState,
            [name]: value
          }));
    }; 


    useEffect(() => {
        (
            async () => {
                const responseUser = await fetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`);
                const user = await responseUser.json();
                const responseProfessional = await fetch(`${import.meta.env.VITE_API_URL}professional/${user.id}`);
                const professional = await responseProfessional.json();
                setProfessionalState(professional)
                await findRecommendations(Number(patientId!), professional.id)

                
            }
        )()
    },[])

    const findRecommendations = async (patientId: number, professionalId: number) => {
        const responseRecommendation = await fetch(`${import.meta.env.VITE_API_URL}recommendation/${patientId}/${professionalId}`)
        const recommendation = await responseRecommendation.json()
        setRecommendationState(recommendation)
    };

    return(
            <div className="row">
                    <div className="recommendations col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 mt-4 rounded-4 ms-2 m-2">
                        <div className="mb-3">
                            <h4 className="text-center h4 fw-bold mb-3 mt-2">Recomendaciones creadas</h4>
                            <div className="row ">
                                    {recommendationState?.map((recommendation) => (
                                        <div>
                                            <h6>{recommendation.title}:</h6>
                                            <p className="ms-4">{recommendation.description}</p>
                                            <div className="text-end">
                                                <svg  role="button" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#059669" className="bi bi-pen me-2" viewBox="0 0 16 16">
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                                </svg>
                                                <svg role="button" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-archive" viewBox="0 0 16 16">
                                                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                                </svg>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        {/* <div  role="button" title="editar" className=" d-flex align-items-end justify-content-end me-1 mb-1">
                            <svg role="button" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                                <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0
                                    1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                                    
                            </svg>
                        </div> */}
                    </div>
                    <div className="activities-designated col mt-4 rounded-4 ms-2 m-2">
                        <div className="row">
                            <div className="d-flex">
                                <div className="w-100">
                                    <h4 className="text-center h4 fw-bold mb-3 mt-2">Crea tu recomendación</h4> 
                                </div>
                            </div>
                            <div className="text-center">
                                <div>
                                    <label className="form-label" htmlFor="title">Título</label>
                                    <input onChange={handleChange} value={formState.title} className="form-control" type="text" name="title" id="title"/>
                                </div>
                                
                                <div className="mt-5">
                                    <label className="form-label" htmlFor="description">Descripción</label>
                                    <textarea onChange={handleChange} value={formState.description} className="form-control" name="description" id="description"></textarea>
                                </div>
                                <button onClick={createRecommendation} className="btn btn-primary">Crear</button>
                            </div>
                        </div>
                </div>
        </div>
        )
}