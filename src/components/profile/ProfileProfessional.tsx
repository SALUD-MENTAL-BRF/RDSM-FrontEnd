import { useNavigate } from "react-router-dom"
import '../../assets/style/profile/profileProfessional.css'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { CustomFetch } from "../../api/CustomFetch"
import { Professional } from "../main/professional/types/profileProfessional"

export const ProfileProfessional = () => {
    const [professionalState, setProfessionalState] = useState<Professional | null>(null)
    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(() => {
        (
            async () => {

                const data = await CustomFetch(`${import.meta.env.VITE_API_URL}professional/${id}`, 'GET')

                setProfessionalState(data)      
                console.log(professionalState?.availability);
                          
            }
        )()
    },[id])

    return(
        <main className='container-fluid container-profileProfessional'>
        <div className="row w-100">
            <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center">
                <div role='button' onClick={() => navigate('/professionals')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                    </svg>
                    <h6 className='ms-1'>Volver</h6>
                </div>
            </section>
            <section className="col-10 col-sm-10 col-md-10 col-lg-11 col-xl-11 col-xxl-11">
                <h1 className="title-profileProfessional text-center">Perfil</h1>
                <div className="row justify-content-center mt-5">
                    <div className="col">
                        <h2 className="title-profileProfessional">Descripción</h2>
                       <p>{professionalState?.description.length == 0   ? "Sin descripción.": professionalState?.description}</p>
                    </div>
                    <div className="col text-center">
                        <img src="/image-example/imageUser.jpg" alt="" className="image-profileProfessional"/>
                    </div>
                    <div className="col mt-2">
                        <div className="row">
                            <div className="col-3">
                                <p className="subtitle-profileProfessional">Nombre/s</p>
                                <p className="dataProfessional ms-1">{professionalState?.professional.firstname}</p>
                                <p className="subtitle-profileProfessional">Apellido</p>
                                <p className="dataProfessional ms-1">{professionalState?.professional.lastname}</p>
                                <p className="subtitle-profileProfessional">Edad</p>
                                <p className="dataProfessional ms-1">{}</p>
                                <p className="subtitle-profileProfessional">Título</p>
                                <p className="dataProfessional ms-1">{professionalState?.professional.title}</p>
                                <p className="subtitle-profileProfessional">Especialización</p>
                                <p className="dataProfessional ms-1">{professionalState?.professional.specialization}</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-5 container-info-professional">
                        <div>
                            <p className="subtitle-profileProfessional">Preferencia de comunicación:</p>
                            <p className="dataProfessional ms-1">{professionalState?.preference_communication}</p>
                        </div>
                        <div className="d-flex">
                            <p className="subtitle-profileProfessional">Disponible:</p>
                            <p className="dataProfessional ms-1">{
                            professionalState?.availability ? "Si" : "No"
                            
                            }</p>
                        </div>
                        <div className="text-end me-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-file-arrow-up" viewBox="0 0 16 16">
                                <path d="M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5"/>
                                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/>
                            </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                            </svg>
                            <div className="text-end">
                                <button className="btn btn-outline-dark">Consultar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
    )
}