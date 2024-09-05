import "../../../assets/style/professional/ProfessionalList.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomFetch } from "../../../api/CustomFetch.tsx";
import { Professional } from "../../../types/profileProfessional.dto.ts";
import React from "react";

export const ProfessionalList = () => {
    const [allProfessionalState, setAllProfessionalState] = useState<Array<Professional>>([])
    const [professionalState, setProfessionalState] = useState<Array<Professional>>([])
    const [barSearch, setBarSearch] = useState<string>("")

    useEffect(() => {
        (
            async () => {
                const data = await CustomFetch(`${import.meta.env.VITE_API_URL}professional`, 'GET')
                setAllProfessionalState(data)
                setProfessionalState(data)
                console.log(data);
                
            }
        )()
    },[])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBarSearch(e.target.value)

    }

    // const searchProfessional = (name:string) => {
    //     const professional = professionalState.filter((value) => value.professional.firstname && value.professional.lastname == name)
    //     console.log(professional);
        
    // }


    const navigate = useNavigate()
    return(


        <main>
            <div className="container-ProfessionalList rounded-5">
                <div className="ms-4" role='button' onClick={() => navigate('/home')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                        </svg>
                        <h6 className=''>Atrás</h6>
                </div>
                <div className="row w-100 mt-3 container justify-content-center">
                    <section className="col-10 col-sm-10 col-md-10 col-lg-11 col-xl-11 col-xxl-11 mt-1">
                        <div className="row justify-content-center">
                            <div className="col">
                                <form className="d-flex justify-content-center mb-2" action="">
                                    <input
                                        className="form-control me-2"
                                        style={{ maxWidth: '80%' }}
                                        placeholder="Buscar profesionales"
                                        type="text"
                                        value={barSearch}
                                        onChange={(e)=>handleInputChange(e)}
                                    />
                                    <button className="btn btn-primary">Buscar</button>
                                </form>
                                <table id="myTable">
                                        <th>Título</th>
                                        <th>Especialización</th>
                                <tr>
                                    <td valign="top" width="150" align="center">
                                        <select className="w-100" name="" id=""></select>
                                    </td>
                                    <td valign="top" width="150" align="center">
                                        <select className="w-100" name="" id=""></select>
                                    </td>
                                </tr>
                                </table>
                            </div>
                        </div>
                    <div className="row">
                    {
                        professionalState.map((value) => (
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className="card card-profesional">
                                <img 
                                    className="card-img-top" 
                                    src={
                                        value?.professional?.user?.imageUrl && value.professional.user.imageUrl.length > 1 
                                        ? value.professional.user.imageUrl 
                                        : "/image-example/imageUser.jpg"
                                    } 
                                    alt="Card image cap"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{value.professional.firstname}, {value.professional.lastname}</h5>
                                            <p className="card-text">{value.professional.title}</p>
                                            <p className="card-text">{value.professional.specialization}</p>
                                        <button onClick={() => navigate(`/profile-professional/${value.id}`)} className="btn btn-primary">Ver más</button>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                        </div>
                    </section>
                </div>
            </div>
        </main>

    )
}