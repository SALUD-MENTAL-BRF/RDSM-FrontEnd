import React from "react";
import { Professional } from "../../../types/profileProfessional.dto";
import { User } from "../../../types/user.dto";

interface Props {
    professional: Professional;
    user: User;
}

export const InfoProfessional: React.FC<Props> = ({ professional, user }) => {
    


    return (

            <section className="col-10 col-sm-10 col-md-10 col-lg-11 col-xl-11 col-xxl-11">
                <h1 className="title-profileProfessional text-center">Perfil</h1>
                <div className="row justify-content-center mt-5">
                    <div className="col">
                        <h2 className="title-profileProfessional">Descripción</h2>
                       <p>{professional?.description.length == 0   ? "Sin descripción.": professional?.description}</p>
                    </div>
                    <div className="col text-center">
                        <img src={professional.professional.user.imageUrl.length > 1 ?
                                professional.professional.user.imageUrl :
                                "/image-example/imageUser.jpg"
                        } alt="" className="image-profileProfessional"/>
                    </div>
                    <div className="col mt-2">
                        <div className="row">
                            <div className="col-3">
                                <p className="subtitle-profileProfessional">Nombre/s</p>
                                <p className="dataProfessional ms-1">{professional?.professional.firstname}</p>
                                <p className="subtitle-profileProfessional">Apellido</p>
                                <p className="dataProfessional ms-1">{professional?.professional.lastname}</p>
                                <p className="subtitle-profileProfessional">Edad</p>
                                <p className="dataProfessional ms-1">{}</p>
                                <p className="subtitle-profileProfessional">Título</p>
                                <p className="dataProfessional ms-1">{professional?.professional.title}</p>
                                <p className="subtitle-profileProfessional">Especialización</p>
                                <p className="dataProfessional ms-1">{professional?.professional.specialization}</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-5 container-info-professional">
                        <div>
                            <p className="subtitle-profileProfessional">Preferencia de comunicación:</p>
                            <p className="dataProfessional ms-1">{professional?.preference_communication}</p>
                        </div>
                        <div className="d-flex">
                            <p className="subtitle-profileProfessional">Disponible:</p>
                            <p className="dataProfessional ms-1">{
                            professional?.availability ? "Si" : "No"
                            
                            }</p>
                        </div>
                        <div className="d-flex justify-content-end">
                          <div className="d-flex me-5">
                            <div className="text-center ms-4 me-4">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-arrow-up" viewBox="0 0 16 16">
                                  <path d="M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5"/>
                                  <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/>
                              </svg>
                              <p>0</p>
                              <p className="subtitle-profileProfessional">Publicaciones</p>
                            </div>
                            <div className="text-center ms-3 me-3">
                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                </svg>
                                <p>0</p>
                                <p className="subtitle-profileProfessional">Seguidores</p>
                            </div>
                            
                                
                                {   
                                    user?.roleId == 3 && professional?.availability  ?
                                    <div className="d-flex row text-center mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-raised-hand" viewBox="0 0 16 16">
                                        <path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a1 1 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207"/>
                                        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                     </svg>
                                    <p className="subtitle-profileProfessional mt-4">Consultar</p>
                                    </div>
                                    : ""
        
                                }
                          </div>
                        </div>
                    </div>
                </div>
            </section>  

    );
};
